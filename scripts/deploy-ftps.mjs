import { Client } from "basic-ftp";
import { createHash } from "node:crypto";
import { readdir, readFile, stat, writeFile } from "node:fs/promises";
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
const stamp = Date.now().toString();

function interesting(name) {
  return /swisspro/i.test(name) || /it/i.test(name);
}

async function httpProbe(fileName, stampBody) {
  const url = `https://it.swisspro.site/${fileName}`;
  let status = 0;
  let match = false;
  for (let attempt = 0; attempt < 3 && !match; attempt += 1) {
    try {
      const res = await fetch(url, { cache: "no-store" });
      status = res.status;
      const text = (await res.text()).trim();
      match = status === 200 && text === stampBody;
    } catch (error) {
      console.log(`fetch ${fileName} attempt ${attempt}: ${error.message}`);
    }
  }
  return { status, match, url };
}

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
    console.log(`FTP_SERVER path segments: ${server.remotePath.split("/").filter(Boolean).length}`);
  } else {
    console.log("FTP_SERVER has no directory path");
  }

  const loginDir = (await client.pwd()).replace(/\/$/, "") || "/";
  console.log(`pwd: ${loginDir}`);
  const listing = await client.list(loginDir);
  const names = listing.map((item) => item.name);
  console.log(`names (${names.length}): ${names.join(", ") || "(none)"}`);
  const indexItem = listing.find((item) => item.name === "index.html");
  if (indexItem) {
    console.log(
      `index.html size=${indexItem.size} modified=${indexItem.modifiedAt ? indexItem.modifiedAt.toISOString() : indexItem.rawModifiedAt || "unknown"}`,
    );
  } else {
    console.log("index.html: not in this listing");
  }

  const dirNames = listing.filter((item) => item.isDirectory).map((item) => item.name);
  const attempts = [];
  const pushAttempt = (label, target) => {
    if (!attempts.some((item) => item.target === target)) attempts.push({ label, target });
  };
  pushAttempt("absolute", "/it.swisspro.site");
  pushAttempt("relative", "it.swisspro.site");
  pushAttempt("dot-relative", "./it.swisspro.site");
  for (const name of dirNames.filter(interesting)) pushAttempt(`listed:${name}`, name);
  for (const name of ["public_html", "domains", "www"]) {
    if (names.includes(name)) pushAttempt(`listed:${name}`, name);
  }

  const probeLocal = "/tmp/zz-docroot-probe.txt";
  await writeFile(probeLocal, stamp);
  let docroot = null;
  const errors = [];

  for (const attempt of attempts) {
    const back = await client.pwd();
    try {
      await client.cd(attempt.target);
      const entered = (await client.pwd()).replace(/\/$/, "") || "/";
      const fileName = `zz-probe-${stamp}.txt`;
      await client.uploadFrom(probeLocal, fileName);
      const probed = await httpProbe(fileName, stamp);
      console.log(`entered ${attempt.label} -> ${entered}; probe ${probed.url} status=${probed.status} match=${probed.match}`);
      let hasGa = false;
      try {
        const localIndex = `/tmp/remote-index-${stamp}.html`;
        await client.downloadTo(localIndex, "index.html");
        const buf = await readFile(localIndex);
        hasGa = buf.includes("G-B2L8Q2SY2P");
        console.log(`index in ${entered}: bytes=${buf.length} ga=${hasGa} sha=${createHash("sha256").update(buf).digest("hex").slice(0, 12)}`);
      } catch (error) {
        console.log(`index in ${entered}: ${error.message}`);
      }
      if (probed.match && !docroot) docroot = entered;
      await client.cd(back);
    } catch (error) {
      const message = `${attempt.label} ${attempt.target}: ${error.message}`;
      errors.push(message);
      console.log(`cd failed ${message}`);
      try { await client.cd(back); } catch { /* stay */ }
    }
  }

  // The login directory may be the document root even when /it.swisspro.site
  // is not a child. Confirm with a probe file LiteSpeed can serve.
  if (!docroot) {
    const back = await client.pwd();
    try {
      await client.cd(loginDir);
      const fileName = `zz-probe-${stamp}-login.txt`;
      await client.uploadFrom(probeLocal, fileName);
      const probed = await httpProbe(fileName, stamp);
      console.log(`login probe ${probed.url} status=${probed.status} match=${probed.match}`);
      if (probed.match) docroot = (await client.pwd()).replace(/\/$/, "") || "/";
    } catch (error) {
      console.log(`login probe failed: ${error.message}`);
    }
    try { await client.cd(back); } catch { /* stay */ }
  }

  if (!docroot) {
    console.error("No enterable FTP directory is the live document root.");
    for (const message of errors) console.error(message);
    process.exit(1);
  }

  console.log(`uploading into document root: ${docroot}`);
  await client.cd(docroot);
  const joinRemote = (rel) => {
    const base = docroot === "/" ? "" : docroot.replace(/\/$/, "");
    return `${base}/${rel}`.replace(/\/{2,}/g, "/");
  };

  async function put(local, remote) {
    const remoteDir = remote.slice(0, remote.lastIndexOf("/")) || docroot;
    await client.ensureDir(remoteDir);
    await client.cd(docroot);
    await client.uploadFrom(local, remote);
  }

  const probes = ["index.html", "digital-tool.html", "digital-tool/index.html", "noble-families/index.html"];
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
    const force = rel.endsWith(".html") || rel.startsWith("noble-families/") || rel === ".htaccess";
    if (!force && existing === info.size) {
      skipped += 1;
    } else {
      await put(local, remote);
      uploaded += 1;
      if (uploaded % 25 === 0) console.log(`uploaded ${uploaded}`);
    }
    if (rel.endsWith(".html") && path.posix.basename(rel) !== "index.html") {
      const mirror = joinRemote(rel.slice(0, -".html".length) + "/index.html");
      await put(local, mirror);
      uploaded += 1;
    }
  }

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
  const mapBytes = await remoteSize(client, joinRemote("noble-families/index.html"));
  console.log(`after noble-families/index.html remote=${mapBytes}`);
  if (mapBytes < 1000 || mapBytes > 100000) {
    console.error("Map index.html was not restored.");
    process.exit(1);
  }
  const toolIndex = await remoteSize(client, joinRemote("digital-tool/index.html"));
  console.log(`after digital-tool/index.html remote=${toolIndex}`);
  if (toolIndex < 0) {
    console.error("digital-tool/index.html is missing.");
    process.exit(1);
  }
  console.log(`upload complete: ${uploaded} sent, ${skipped} unchanged, ${files.length} local files, target ${docroot}`);
  if (uploaded === 0) {
    console.error("No files were uploaded; the site would stay unchanged.");
    process.exit(1);
  }
} finally {
  client.close();
}
