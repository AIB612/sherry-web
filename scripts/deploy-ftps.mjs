import { Client } from "basic-ftp";
import { readdir, stat } from "node:fs/promises";
import path from "node:path";

function splitServer(value) {
  let raw = value.trim();
  for (const prefix of ["ftps://", "ftp://"]) {
    if (raw.toLowerCase().startsWith(prefix)) raw = raw.slice(prefix.length);
  }
  const slash = raw.indexOf("/");
  const hostPort = slash === -1 ? raw : raw.slice(0, slash);
  const host = hostPort.includes("@") ? hostPort.slice(hostPort.lastIndexOf("@") + 1) : hostPort;
  return { host };
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

const server = splitServer(process.env.FTP_SERVER || "");
const host = server.host;
const user = process.env.FTP_USERNAME || "";
const password = process.env.FTP_PASSWORD || "";
if (!host || !user || !password) {
  console.error("Missing FTP credentials");
  process.exit(1);
}

// Live uploads must land in this directory only. Do not fall back to the
// FTP login jail (/) or to a noble-families subdirectory.
const remoteRoot = (process.env.FTP_REMOTE_DIR || "/it.swisspro.site").replace(/\/+$/, "") || "/";
if (remoteRoot !== "/it.swisspro.site") {
  console.error(`refusing upload target ${remoteRoot}; expected /it.swisspro.site`);
  process.exit(1);
}

const localRoot = path.resolve("out");
const mapRoot = path.resolve("Noble Families");
const client = new Client(60_000);
client.ftp.verbose = false;

const joinRemote = (rel) => `${remoteRoot}/${rel}`.replace(/\/{2,}/g, "/");

try {
  await client.access({
    host,
    user,
    password,
    port: 21,
    secure: true,
    secureOptions: { rejectUnauthorized: false },
  });
  console.log(`upload target: ${remoteRoot}`);
  try {
    await client.cd(remoteRoot);
  } catch (error) {
    console.error(`could not enter ${remoteRoot}: ${error.message}`);
    process.exit(1);
  }
  const entered = (await client.pwd()).replace(/\/$/, "") || "/";
  console.log(`entered ${entered}`);
  if (entered !== remoteRoot) {
    console.error(`FTP session is in ${entered}, not ${remoteRoot}`);
    process.exit(1);
  }

  async function put(local, remote) {
    if (!remote.startsWith(`${remoteRoot}/`) && remote !== remoteRoot) {
      throw new Error(`refusing path outside ${remoteRoot}: ${remote}`);
    }
    const remoteDir = remote.slice(0, remote.lastIndexOf("/")) || remoteRoot;
    await client.ensureDir(remoteDir);
    await client.cd(remoteRoot);
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

  // Restore the map under the site root. public/noble-families is only a symlink.
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
    console.error("Map index.html was not restored in /it.swisspro.site.");
    process.exit(1);
  }
  const toolIndex = await remoteSize(client, joinRemote("digital-tool/index.html"));
  console.log(`after digital-tool/index.html remote=${toolIndex}`);
  if (toolIndex < 0) {
    console.error("digital-tool/index.html is missing in /it.swisspro.site.");
    process.exit(1);
  }

  console.log(`upload complete: ${uploaded} sent, ${skipped} unchanged, ${files.length} local files, target ${remoteRoot}`);
  if (uploaded === 0) {
    console.error("No files were uploaded; the site would stay unchanged.");
    process.exit(1);
  }
} finally {
  client.close();
}
