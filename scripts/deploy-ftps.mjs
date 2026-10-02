import { Client } from "basic-ftp";
import { readdir, stat, writeFile } from "node:fs/promises";
import path from "node:path";

function splitServer(value) {
  let raw = value.trim();
  for (const prefix of ["ftps://", "ftp://"]) {
    if (raw.toLowerCase().startsWith(prefix)) raw = raw.slice(prefix.length);
  }
  const slash = raw.indexOf("/");
  const hostPort = slash === -1 ? raw : raw.slice(0, slash);
  const remotePath = slash === -1 ? "" : raw.slice(slash);
  const host = hostPort.includes("@") ? hostPort.slice(hostPort.lastIndexOf("@") + 1) : hostPort;
  return { host, remotePath };
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
  if (server.remotePath) {
    console.log(`FTP_SERVER includes a path with ${server.remotePath.split("/").filter(Boolean).length} segments: ${server.remotePath}`);
    try {
      await client.cd(server.remotePath);
    } catch (error) {
      console.log(`could not cd to FTP_SERVER path: ${error.message}`);
    }
  } else {
    console.log("FTP_SERVER has no directory path");
  }
  const loginDir = (await client.pwd()).replace(/\/$/, "") || "/";
  const listing = await client.list(loginDir);
  const names = listing.map((item) => `${item.name}${item.isDirectory ? "/" : ""}`);
  console.log(`login dir entries: ${listing.length}: ${names.join(", ") || "(none)"}`);
  try {
    await client.cd("..");
    const parent = await client.pwd();
    const parentList = await client.list();
    console.log(`parent path: ${parent}`);
    console.log(`parent entries: ${parentList.map((item) => item.name).join(", ") || "(none)"}`);
    await client.cd(loginDir);
  } catch (error) {
    console.log(`parent not listable: ${error.message}`);
    try { await client.cd(loginDir); } catch { /* stay */ }
  }

  const stamp = Date.now().toString();
  const probeLocal = "/tmp/zz-docroot-probe.txt";
  await writeFile(probeLocal, stamp);
  const candidates = [
    loginDir,
    ...listing.filter((item) => item.isDirectory).map((item) => `${loginDir === "/" ? "" : loginDir}/${item.name}`),
    "/public_html",
    "/www",
    "/htdocs",
    "/it.swisspro.site",
    "/public_html/it.swisspro.site",
    "/domains/it.swisspro.site/public_html",
  ];
  let docroot = null;
  const seen = new Set();
  for (const dir of candidates) {
    const normalized = (dir || "/").replace(/\/+$/, "") || "/";
    if (seen.has(normalized)) continue;
    seen.add(normalized);
    const label = normalized.replace(/[^A-Za-z0-9]+/g, "_").replace(/^_+|_+$/g, "") || "root";
    const fileName = `zz-probe-${stamp}-${label}.txt`;
    try {
      await client.cd(normalized);
      await client.uploadFrom(probeLocal, fileName);
    } catch (error) {
      console.log(`probe skip ${normalized}: ${error.message}`);
      continue;
    }
    const url = `https://it.swisspro.site/${fileName}`;
    let status = 0;
    let match = false;
    for (let attempt = 0; attempt < 3 && !match; attempt += 1) {
      try {
        const res = await fetch(url, { cache: "no-store" });
        status = res.status;
        const text = (await res.text()).trim();
        match = status === 200 && text === stamp;
      } catch (error) {
        console.log(`probe fetch ${normalized} attempt ${attempt}: ${error.message}`);
      }
    }
    console.log(`probe ${normalized} status=${status} match=${match}`);
    if (match) {
      docroot = normalized;
      break;
    }
  }
  if (!docroot) {
    console.error("No FTP directory is the LiteSpeed document root for https://it.swisspro.site/.");
    process.exit(1);
  }
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
