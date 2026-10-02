import { Client } from "basic-ftp";
import { readdir, stat } from "node:fs/promises";
import path from "node:path";

function hostOnly(value) {
  let host = value.trim();
  for (const prefix of ["ftps://", "ftp://"]) {
    if (host.toLowerCase().startsWith(prefix)) host = host.slice(prefix.length);
  }
  return host.split("/")[0];
}

async function walk(dir) {
  const out = [];
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const local = path.join(dir, entry.name);
    if (entry.isSymbolicLink()) {
      const info = await stat(local);
      if (info.isDirectory()) out.push(...(await walk(local)));
      else if (info.isFile()) out.push(local);
      continue;
    }
    if (entry.isDirectory()) out.push(...(await walk(local)));
    else if (entry.isFile()) out.push(local);
  }
  return out;
}

const host = hostOnly(process.env.FTP_SERVER || "");
const user = process.env.FTP_USERNAME || "";
const password = process.env.FTP_PASSWORD || "";
if (!host || !user || !password) {
  console.error("Missing FTP credentials");
  process.exit(1);
}

const localRoot = path.resolve("out");
const client = new Client(60_000);
client.ftp.verbose = false;

try {
  await client.access({
    host,
    user,
    password,
    port: 21,
    secure: true,
    secureOptions: { rejectUnauthorized: false },
  });
  const root = await client.pwd();
  console.log(`remote directory depth ${root.split("/").filter(Boolean).length}`);
  const files = await walk(localRoot);
  let uploaded = 0;
  let skipped = 0;
  for (const local of files) {
    const rel = path.relative(localRoot, local).split(path.sep).join("/");
    if (rel === ".ftp-deploy-sync-state.json") continue;
    const remote = `${root.replace(/\/$/, "")}/${rel}`;
    const info = await stat(local);
    let remoteSize = -1;
    try {
      remoteSize = await client.size(remote);
    } catch {
      remoteSize = -1;
    }
    if (remoteSize === info.size) {
      skipped += 1;
      continue;
    }
    const remoteDir = remote.slice(0, remote.lastIndexOf("/")) || root;
    await client.ensureDir(remoteDir);
    await client.uploadFrom(local, remote);
    uploaded += 1;
    if (uploaded % 50 === 0) console.log(`uploaded ${uploaded}`);
  }
  console.log(`upload complete: ${uploaded} sent, ${skipped} unchanged, ${files.length} local files`);
} finally {
  client.close();
}
