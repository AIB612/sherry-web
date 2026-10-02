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

async function hasFile(client, remote) {
  try {
    await client.size(remote);
    return true;
  } catch {
    return false;
  }
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

  const candidates = ["", ...names];
  let docroot = null;
  for (const name of candidates) {
    const base = name ? `${loginDir === "/" ? "" : loginDir}/${name}` : loginDir;
    const indexPath = `${base}/index.html`.replace(/\/{2,}/g, "/");
    const noblePath = `${base}/noble-families/index.html`.replace(/\/{2,}/g, "/");
    const index = await hasFile(client, indexPath);
    const noble = await hasFile(client, noblePath);
    console.log(`candidate ${name || "(login)"} index=${index} noble=${noble}`);
    // The live site still has index.html and does not have the new map yet.
    // The previous upload already dropped noble-families into the login directory.
    if (index && !noble) docroot = base || "/";
  }

  if (!docroot) {
    console.error("Could not find the document root (index.html without noble-families).");
    process.exit(1);
  }
  console.log(`uploading into document root candidate with ${docroot.split("/").filter(Boolean).length} path segments`);

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
    if (remoteSize === info.size) {
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
