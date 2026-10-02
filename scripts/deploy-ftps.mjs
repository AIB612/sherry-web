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
  const loginDir = (await client.pwd()).replace(/\/$/, "") || "/";
  const listing = await client.list(loginDir);
  const names = listing.filter((item) => item.isDirectory).map((item) => item.name);
  console.log(`login dir entries: ${listing.length}, directories: ${names.join(", ") || "(none)"}`);

  // pwd is the LiteSpeed document root for https://it.swisspro.site/.
  // Do not pick a child. noble-families/index.html is the map page, so the
  // old "index.html and no nested noble-families" test selected that child
  // and the whole export overwrote the map.
  const docroot = loginDir;
  try {
    const parent = loginDir === "/" ? null : loginDir.replace(/\/[^/]+$/, "") || "/";
    if (parent && parent !== loginDir) {
      const parentList = await client.list(parent);
      const parentDirs = parentList.filter((item) => item.isDirectory).map((item) => item.name);
      console.log(`parent entries: ${parentList.length}, directories: ${parentDirs.join(", ") || "(none)"}`);
    }
  } catch {
    console.log("parent directory is not listable");
  }
  console.log(`uploading into document root: ${docroot}`);

  const files = await walk(localRoot);
  let uploaded = 0;
  let skipped = 0;
  for (const local of files) {
    const rel = path.relative(localRoot, local).split(path.sep).join("/");
    if (rel === ".ftp-deploy-sync-state.json") continue;
    const remote = `${docroot.replace(/\/$/, "")}/${rel}`;
    const info = await stat(local);
    let remoteSize = -1;
    try {
      remoteSize = await client.size(remote);
    } catch {
      remoteSize = -1;
    }
    const force = rel.endsWith(".html") || rel.startsWith("noble-families/") || rel === ".htaccess";
    if (!force && remoteSize === info.size) {
      skipped += 1;
      continue;
    }
    const remoteDir = remote.slice(0, remote.lastIndexOf("/")) || docroot;
    await client.ensureDir(remoteDir);
    await client.uploadFrom(local, remote);
    uploaded += 1;
    if (uploaded % 25 === 0) console.log(`uploaded ${uploaded}`);
  }
  console.log(`upload complete: ${uploaded} sent, ${skipped} unchanged, ${files.length} local files`);
  if (uploaded === 0) {
    console.error("No files were uploaded; the site would stay unchanged.");
    process.exit(1);
  }
} finally {
  client.close();
}
