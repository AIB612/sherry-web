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

async function remoteSize(client, remote) {
  try {
    return await client.size(remote);
  } catch {
    return -1;
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
const mapRoot = path.resolve("Noble Families");
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

  // The FTPS session is chrooted. Its root is the LiteSpeed document root:
  // uploads into /noble-families are what https://it.swisspro.site/noble-families serves.
  // Never pick the noble-families child; that folder is the map, and a previous
  // run unpacked the whole export there and replaced the map index.
  const docroot = loginDir || "/";
  const joinRemote = (rel) => {
    const base = docroot === "/" ? "" : docroot.replace(/\/$/, "");
    return `${base}/${rel}`.replace(/\/{2,}/g, "/");
  };
  console.log(`uploading into document root: ${docroot}`);

  async function put(local, remote) {
    const remoteDir = remote.slice(0, remote.lastIndexOf("/")) || "/";
    await client.ensureDir(remoteDir);
    await client.uploadFrom(local, remote);
  }

  const probes = [
    "index.html",
    "digital-tool.html",
    "digital-tool/index.html",
    "noble-families/index.html",
  ];
  for (const rel of probes) {
    let localBytes = -1;
    try {
      localBytes = (await stat(path.join(localRoot, rel))).size;
    } catch {
      localBytes = -1;
    }
    const remoteBytes = await remoteSize(client, joinRemote(rel));
    console.log(`before ${rel} local=${localBytes} remote=${remoteBytes}`);
  }

  const files = await walk(localRoot);
  let uploaded = 0;
  let skipped = 0;
  for (const local of files) {
    const rel = path.relative(localRoot, local).split(path.sep).join("/");
    if (rel === ".ftp-deploy-sync-state.json") continue;
    const info = await stat(local);
    const remote = joinRemote(rel);
    const existing = await remoteSize(client, remote);
    const force =
      rel.endsWith(".html") || rel.startsWith("noble-families/") || rel === ".htaccess";
    if (!force && existing === info.size) {
      skipped += 1;
    } else {
      await put(local, remote);
      uploaded += 1;
      if (uploaded % 25 === 0) console.log(`uploaded ${uploaded}`);
    }
    // LiteSpeed redirects /digital-tool to /digital-tool/ because the export
    // also creates that directory, which then 404s without an index.html.
    if (rel.endsWith(".html") && path.posix.basename(rel) !== "index.html") {
      const mirror = joinRemote(rel.slice(0, -".html".length) + "/index.html");
      await put(local, mirror);
      uploaded += 1;
    }
  }

  // Restore the map from the repo folder. public/noble-families is only a symlink,
  // and the last deploy overwrote /noble-families/index.html with the homepage.
  let mapFiles = [];
  try {
    mapFiles = await walk(mapRoot);
  } catch (error) {
    console.error(`map folder missing: ${error.message}`);
    process.exit(1);
  }
  for (const local of mapFiles) {
    const rel = path.relative(mapRoot, local).split(path.sep).join("/");
    await put(local, joinRemote(`noble-families/${rel}`));
    uploaded += 1;
  }
  const mapIndex = joinRemote("noble-families/index.html");
  const mapBytes = await remoteSize(client, mapIndex);
  console.log(`after noble-families/index.html remote=${mapBytes}`);
  if (mapBytes < 1000 || mapBytes > 100000) {
    console.error("Map index.html was not restored on the document root.");
    process.exit(1);
  }
  const toolIndex = await remoteSize(client, joinRemote("digital-tool/index.html"));
  console.log(`after digital-tool/index.html remote=${toolIndex}`);
  if (toolIndex < 0) {
    console.error("digital-tool/index.html is missing on the document root.");
    process.exit(1);
  }

  console.log(`upload complete: ${uploaded} sent, ${skipped} unchanged, ${files.length} local files`);
  if (uploaded === 0) {
    console.error("No files were uploaded; the site would stay unchanged.");
    process.exit(1);
  }
} finally {
  client.close();
}
