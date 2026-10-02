const COLORS = {
  "东亚": "#e6c56a",
  "欧洲": "#f0d48a",
  "中东": "#d7b15a",
  "南亚": "#ecd9a0",
  "非洲": "#c9a24a",
  "美洲": "#f3e2b4"
};
const REGIONS = ["全部", "东亚", "欧洲", "中东", "南亚", "非洲", "美洲"];
const TYPES = ["帝国", "王朝"];
const REGION_POV = {
  "全部": { lat: 22, lng: 48, altitude: 2.35 },
  "东亚": { lat: 34, lng: 114, altitude: 1.52 },
  "欧洲": { lat: 49, lng: 14, altitude: 1.48 },
  "中东": { lat: 31, lng: 44, altitude: 1.55 },
  "南亚": { lat: 16, lng: 88, altitude: 1.58 },
  "非洲": { lat: 8, lng: 18, altitude: 1.85 },
  "美洲": { lat: 8, lng: -78, altitude: 2.05 }
};

const byId = Object.fromEntries(HOUSES.map(h => [h.id, h]));
EXTRA_NODES.forEach(n => {
  if (!byId[n.id]) byId[n.id] = n;
});

const thumbs = {};
const thumbWait = {};
function applyThumb(el, src) {
  if (!el) return;
  if (!src) {
    el.remove();
    return;
  }
  el.src = src;
  el.hidden = false;
  const chip = el.closest(".gchip");
  if (chip) chip.classList.add("has-photo");
}

function bindThumb(wiki, img) {
  if (!wiki || !img) return;
  img.hidden = true;
  if (thumbs[wiki]) { applyThumb(img, thumbs[wiki]); return; }
  if (thumbs[wiki] === "") { img.remove(); return; }
  if (!thumbWait[wiki]) thumbWait[wiki] = [];
  thumbWait[wiki].push(img);
  if (thumbWait[wiki].length > 1) return;
  const look = async lang => {
    try {
      const r = await fetch("https://" + lang + ".wikipedia.org/api/rest_v1/page/summary/" + encodeURIComponent(wiki));
      if (!r.ok) return null;
      const j = await r.json();
      const src = j.thumbnail && j.thumbnail.source;
      const title = (j.title || "") + (j.description || "") + (j.extract || "");
      if (!src) return null;
      if (/地图|flag|coat of arms|位置|分布|地图集|地图/i.test(title) && /地图|flag|emblem|map/i.test(src)) return null;
      return src;
    } catch (e) { return null; }
  };
  look("zh").then(src => src || look("en")).then(src => {
    thumbs[wiki] = src || "";
    (thumbWait[wiki] || []).forEach(el => applyThumb(el, src));
    delete thumbWait[wiki];
  });
}

const STORY_ARC_INDEX = {};
STORIES.forEach(s => s.arcs.forEach(a => {
  STORY_ARC_INDEX[`${a.from}|${a.to}`] = a;
  STORY_ARC_INDEX[`${a.to}|${a.from}`] = a;
}));

const state = {
  view: "globe",
  year: 800,
  region: "全部",
  type: "全部类型",
  query: "",
  selected: null,
  story: null,
  showAll: true,
  playing: false,
  timer: null,
  globe: null,
  skipGlobeFly: false,
  lang: "en"
};

const map = L.map("map", {
  worldCopyJump: true,
  minZoom: 2,
  maxZoom: 7,
  zoomControl: true
}).setView([28, 45], 3);

L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png", {
  attribution: "&copy; OSM &copy; CARTO",
  subdomains: "abcd",
  maxZoom: 19
}).addTo(map);

const layer = L.layerGroup().addTo(map);
const linkLayer = L.layerGroup().addTo(map);

function fmtYear(y) {
  if (y < 0) return t("bce") + Math.abs(y);
  if (y === 0) return t("ce1");
  return t("ce") + y;
}
function eraName(y) {
  const eras = t("eras");
  if (y < -1600) return eras[0];
  if (y < -500) return eras[1];
  if (y < 200) return eras[2];
  if (y < 600) return eras[3];
  if (y < 1000) return eras[4];
  if (y < 1450) return eras[5];
  if (y < 1700) return eras[6];
  return eras[7];
}
function alive(h, y) {
  if (h.start == null || h.end == null) return true;
  return h.start <= y && y <= h.end;
}
function houseColor(h) {
  return COLORS[h.region] || "#e8c478";
}

function jitter(h) {
  const s = [...(h.id || "x")].reduce((a, c) => a + c.charCodeAt(0), 0);
  return {
    lat: h.lat + ((s % 7) - 3) * 0.28,
    lng: h.lng + (((s * 3) % 9) - 4) * 0.34
  };
}

function matchesFilter(h) {
  if (!h.name) return false;
  if (state.region !== "全部" && h.region !== state.region) return false;
  if (h.type && state.type !== "全部类型") {
    if (state.type === "王朝" && h.type !== "王朝" && h.type !== "贵族世家") return false;
    if (state.type === "帝国" && h.type !== "帝国") return false;
  }
  if (state.query) {
    const bag = (h.name + (h.capital || "") + (h.people || []).join("")).toLowerCase();
    if (!bag.includes(state.query.toLowerCase())) return false;
  }
  return true;
}

function visibleHouses() {
  return HOUSES.filter(h => {
    if (!matchesFilter(h)) return false;
    if (!state.showAll && !alive(h, state.year)) return false;
    if (state.story) {
      const story = STORIES.find(s => s.id === state.story);
      const ids = new Set();
      story.arcs.forEach(a => { ids.add(a.from); ids.add(a.to); });
      if (!ids.has(h.id)) return false;
    }
    return true;
  });
}

function slicedAlive() {
  return HOUSES.filter(h => matchesFilter(h) && alive(h, state.year));
}

function relationArcs(list) {
  const ids = new Set(list.map(h => h.id));
  const seen = new Set();
  const arcs = [];

  const push = (from, to, kind, label) => {
    const a1 = byId[from];
    const b1 = byId[to];
    if (!a1 || !b1 || a1.lat == null || b1.lat == null) return;
    if (!ids.has(from) && !EXTRA_NODES.some(n => n.id === from)) return;
    if (!ids.has(to) && !list.some(h => h.id === to) && !byId[to]) return;
    const key = [from, to].sort().join("|");
    if (seen.has(key)) return;
    seen.add(key);
    const p1 = jitter(a1);
    const p2 = jitter(b1);
    const salt = [...key].reduce((n, c) => n + c.charCodeAt(0), 0);
    arcs.push({
      from, to, kind, label,
      startLat: p1.lat, startLng: p1.lng,
      endLat: p2.lat, endLng: p2.lng,
      alt: 0.12 + (salt % 10) * 0.018,
      color: KIND_COLOR[kind] || KIND_COLOR["联姻"]
    });
  };

  if (state.story) {
    const story = STORIES.find(s => s.id === state.story);
    story.arcs.forEach(a => push(a.from, a.to, a.kind, a.label));
    return arcs;
  }

  if (state.selected) {
    const h = byId[state.selected];
    (h?.links || []).forEach(tid => {
      const rich = STORY_ARC_INDEX[`${h.id}|${tid}`];
      push(h.id, tid, rich?.kind || "联姻", rich?.label || `${houseName(h)} ↔ ${houseName(byId[tid]) || tid}`);
    });
    STORIES.forEach(s => s.arcs.forEach(a => {
      if (a.from === h.id || a.to === h.id) push(a.from, a.to, a.kind, a.label);
    }));
    return arcs;
  }

  list.forEach(h => {
    (h.links || []).forEach(tid => {
      if (!ids.has(tid)) return;
      const rich = STORY_ARC_INDEX[`${h.id}|${tid}`];
      push(h.id, tid, rich?.kind || "联姻", rich?.label || `${houseName(h)} ↔ ${houseName(byId[tid])}`);
    });
  });
  return arcs;
}

function hexAlpha(color, a) {
  if (!color) return `rgba(255,229,102,${a})`;
  if (color.startsWith("rgba")) return color;
  const h = color.replace("#", "");
  const n = parseInt(h.length === 3 ? h.split("").map(c => c + c).join("") : h, 16);
  const r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255;
  return `rgba(${r},${g},${b},${a})`;
}

function glowArcs(arcs) {
  const out = [];
  const focus = !!(state.selected || state.story);
  const many = arcs.length > 48;
  arcs.forEach((a, i) => {
    const hot = focus && (a.from === state.selected || a.to === state.selected || state.story);
    out.push({
      ...a,
      color: hexAlpha("#e6c56a", hot ? 0.28 : 0.12),
      stroke: hot ? 1.6 : 1.05,
      glow: true,
      flow: false
    });
    out.push({
      ...a,
      color: hexAlpha("#ffe566", hot ? 1 : 0.92),
      stroke: hot ? 0.7 : 0.42,
      glow: true,
      flow: true,
      hot,
      many,
      gap: (i * 0.31 + (hot ? 0.05 : 0)) % 1
    });
  });
  return out;
}

function drawLeafletLinks(list) {
  linkLayer.clearLayers();
  relationArcs(list).forEach(a => {
    const latlngs = [[a.startLat, a.startLng], [a.endLat, a.endLng]];
    L.polyline(latlngs, { color: a.color, weight: 10, opacity: 0.12, className: "glow-line" }).addTo(linkLayer);
    L.polyline(latlngs, { color: a.color, weight: 5, opacity: 0.28 }).addTo(linkLayer);
    L.polyline(latlngs, {
      color: a.color,
      weight: state.story || state.selected ? 2.2 : 1.4,
      opacity: 0.95,
      dashArray: a.kind === "对峙" ? "2 8" : null
    }).addTo(linkLayer);
  });
}

function renderMap() {
  layer.clearLayers();
  const list = visibleHouses();
  list.forEach(h => {
    const color = houseColor(h);
    const on = alive(h, state.year);
    const p = jitter(h);
    const html = `<div class="pin ${state.selected === h.id ? "pulse" : ""}" style="background:${color};color:${color};opacity:${on ? 1 : 0.4}"></div>`;
    const icon = L.divIcon({ className: "marker-wrap", html, iconSize: [14, 14] });
    L.marker([p.lat, p.lng], { icon, title: h.name }).addTo(layer)
      .on("click", () => selectHouse(h.id));
  });
  drawLeafletLinks(list);
}

function globeRecords() {
  return visibleHouses().map(h => {
    const p = jitter(h);
    const on = alive(h, state.year);
    return {
      ...h,
      lat: p.lat,
      lng: p.lng,
      color: houseColor(h),
      onStage: on,
      altitude: state.selected === h.id ? 0.08 : on ? 0.03 : 0.012,
      radius: state.selected === h.id ? 0.62 : on ? 0.38 : 0.18
    };
  });
}

function makePin(d) {
  const el = document.createElement("div");
  const on = d.onStage;
  const selected = state.selected === d.id;
  const leader = rulerAt(d.id, state.year);
  el.className = "gpin" + (on ? " on" : " off") + (selected ? " selected" : "");
  el.style.setProperty("--c", d.color);
  el.innerHTML = `
    <div class="gchip r-${d.region || ""}">
      
      <div>
        <b>${houseName(d)}</b>
        <i>${leader ? [personName(leader.name), capitalName(d.capital)].filter(Boolean).join(" · ") : (capitalName(d.capital) || t(d.region))}</i>
      </div>
    </div>`;
  if (leader) bindThumb(leader.wiki || leader.name, el.querySelector(".gavatar"));
  scrubEl(el);
  el.addEventListener("pointerdown", ev => ev.stopPropagation());
  el.addEventListener("click", ev => {
    ev.stopPropagation();
    ev.preventDefault();
    if (state.selected === d.id) {
      const btn = ev.target.closest("[data-rel]");
      if (btn) selectHouse(btn.dataset.rel);
      return;
    }
    selectHouse(d.id);
  });
  return el;
}

function ensureGlobe() {
  if (state.globe) return state.globe;
  const el = document.getElementById("globe");
  const world = Globe()(el)
    .globeImageUrl("https://unpkg.com/three-globe/example/img/earth-night.jpg")
    .bumpImageUrl("https://unpkg.com/three-globe/example/img/earth-topology.png")
    .backgroundImageUrl("https://unpkg.com/three-globe/example/img/night-sky.png")
    .showAtmosphere(true)
    .atmosphereColor("#e6c56a")
    .atmosphereAltitude(0.22)
    .pointLat("lat")
    .pointLng("lng")
    .pointColor("color")
    .pointAltitude("altitude")
    .pointRadius("radius")
    .pointsMerge(false)
    .pointLabel(d => `${houseName(d)}<br/>${(d.people || []).map(personName).filter(Boolean).join(" · ")}`)
    .onPointClick(d => selectHouse(d.id))
    .arcColor("color")
    .arcAltitude(d => d.alt || 0.18)
    .arcStroke(d => d.stroke || 0.5)
    .arcDashLength(d => d.flow ? (d.hot ? 0.14 : 0.08) : 1)
    .arcDashGap(d => d.flow ? (d.hot ? 0.95 : 1.45) : 0)
    .arcDashInitialGap(d => d.gap || 0)
    .arcDashAnimateTime(d => d.flow ? (d.hot ? 1900 : d.many ? 5200 : 3400) : 0)
    .arcLabel(d => (zhMode() ? (d.label || "") : dropCjk(d.label || "")))
    .htmlLat("lat")
    .htmlLng("lng")
    .htmlAltitude(d => d.altitude + 0.01)
    .htmlElement(d => makePin(d))
    .htmlTransitionDuration(0)
    .width(el.clientWidth)
    .height(el.clientHeight);
  world.controls().autoRotate = true;
  world.controls().autoRotateSpeed = 0.18;
  world.pointOfView({ lat: 28, lng: 60, altitude: 2.2 }, 0);
  state.globe = world;
  window.addEventListener("resize", () => {
    if (!state.globe) return;
    const box = document.getElementById("globe");
    state.globe.width(box.clientWidth);
    state.globe.height(box.clientHeight);
  });
  return world;
}

function renderGlobe() {
  const world = ensureGlobe();
  const recs = globeRecords();
  world.pointsData(recs);
  const arcs = glowArcs(relationArcs(visibleHouses()));
  world.arcsData(arcs);
  if (!state.playing) {
    const labels = recs.filter(d => d.onStage || d.id === state.selected).map(d => Object.assign({}, d, { lang: state.lang }));
    world.htmlElementsData([]);
    world.htmlElementsData(labels);
  } else {
    world.htmlElementsData([]);
  }
  if (!state.skipGlobeFly && state.story) {
    const s = STORIES.find(x => x.id === state.story);
    if (s?.globeView) world.pointOfView(s.globeView, 900);
  }
  state.skipGlobeFly = false;
}

function renderHud() {
  const vis = visibleHouses();
  const live = slicedAlive();
  document.getElementById("stat-n").textContent = vis.length;
  document.getElementById("stat-alive").textContent = live.length;
  document.getElementById("stat-links").textContent = relationArcs(vis).length;
  const lp = document.getElementById("lbl-pins");
  const la = document.getElementById("lbl-alive");
  const ll = document.getElementById("lbl-links");
  if (lp) lp.textContent = t("pins");
  if (la) la.textContent = t("alive");
  if (ll) ll.textContent = t("links");
  const yearEl = document.getElementById("year-label");
  if (yearEl.textContent !== fmtYear(state.year)) {
    yearEl.textContent = fmtYear(state.year);
    yearEl.classList.remove("tick");
    void yearEl.offsetWidth;
    yearEl.classList.add("tick");
  }
  document.getElementById("era-label").textContent = eraName(state.year);
  document.getElementById("subline").textContent = state.story
    ? storyQuote(STORIES.find(s => s.id === state.story))
    : state.showAll ? t("subAll") : t("subNow");
  const allBtn = document.getElementById("toggle-all");
  if (allBtn) allBtn.textContent = state.showAll ? t("onlyNow") : t("allYears");
}

const wikiCache = {};
async function wikiSummary(title) {
  if (!title) return null;
  const host = wikiLangHost();
  const cacheKey = host + ":" + title;
  if (wikiCache[cacheKey]) return wikiCache[cacheKey];
  let use = title;
  if (host !== "zh") {
    try {
      const q = await fetch("https://zh.wikipedia.org/w/api.php?action=query&format=json&origin=*&prop=langlinks&lllang=" + host + "&titles=" + encodeURIComponent(title));
      const j = await q.json();
      const page = j.query && Object.values(j.query.pages)[0];
      if (page && page.langlinks && page.langlinks[0]) use = page.langlinks[0]["*"];
    } catch (e) {}
  }
  try {
    const r = await fetch("https://" + host + ".wikipedia.org/api/rest_v1/page/summary/" + encodeURIComponent(use));
    if (!r.ok) return null;
    const j = await r.json();
    let extract = j.extract || "";
    let description = j.description || "";
    if (host !== "zh") {
      if (hasCjk(extract)) extract = "";
      if (hasCjk(description)) description = "";
    }
    const out = { extract, description, thumb: j.thumbnail && j.thumbnail.source };
    wikiCache[cacheKey] = out;
    return out;
  } catch (e) { return null; }
}

function showPerson(house, person, preview) {
  const pane = document.getElementById("d-person");
  if (!pane) return;
  if (!person) {
    pane.hidden = true;
    pane.innerHTML = "";
    return;
  }
  const local = personBio(person.name);
  const wiki = person.wiki || local?.wiki || person.name;
  const years = local?.years || (person.start != null ? `${fmtYear(person.start)}–${fmtYear(person.end)}` : "");
  pane.hidden = false;
  const related = (typeof bondsFor === "function" ? bondsFor(house.id) : []).filter(b =>
    (b.who && person.name && (b.who.includes(person.name) || person.name.includes(b.who.split("（")[0]))) ||
    (b.whom && person.name && b.whom.includes(person.name))
  );
  pane.innerHTML = `
    <div class="pkicker">${t("person")}${preview ? t("clickMore") : ""}</div>
    <div class="phead">
      <img class="pbig" alt="" hidden />
      <div>
        <h3>${personName(person.name)}</h3>
        <div class="pmeta">${[local?.role, years].filter(Boolean).join(" · ")}</div>
      </div>
    </div>
    ${zhMode() && local?.family ? `<p><b>${t("family")}</b>${local.family}</p>` : `<p><b>${t("family")}</b>${houseName(house)}${house.capital ? " · " + house.capital : ""}</p>`}
    ${zhMode() && local?.spouse ? `<p><b>${t("spouse")}</b>${local.spouse}</p>` : ""}
    ${zhMode() && local?.did && !/打开下方|有公开肖像才会/.test(local.did) ? `<p><b>${t("deeds")}</b>${local.did}</p>` : ""}
    ${zhMode() && local?.things ? `<p><b>${t("rooms")}</b>${local.things}</p>` : ""}
    ${zhMode() && local?.rooms ? `<p><b>${t("rooms")}</b>${local.rooms}</p>` : ""}
    <p class="pwiki">${t("loading")}</p>
    ${related.length ? `<div class="prels"><b>${t("net")}</b>${related.map(b => {
      const k = bondKind(b);
      return `<div class="prel"><i class="rk ${k.cls}">${t(k.label)}</i>${personName(b.who)} ${verbT(b.verb)} ${personName(b.whom)}<small>${b.year > 0 ? b.year + t("yearSuffix") : t("bce") + Math.abs(b.year)}${zhMode() ? " · " + b.why : ""}</small></div>`;
    }).join("")}</div>` : ""}
  `;
  bindThumb(wiki, pane.querySelector(".pbig"));
  wikiSummary(wiki).then(info => {
    if (!info || pane.querySelector("h3")?.textContent !== personName(person.name)) return;
    if (info.thumb) {
      const img = pane.querySelector(".pbig");
      if (img) { img.src = info.thumb; img.hidden = false; }
    }
    const extract = info.extract || info.description;
    if (!extract) {
      const slot = pane.querySelector(".pwiki");
      if (slot) slot.remove();
      return;
    }
    let slot = pane.querySelector(".pwiki");
    if (!slot) {
      slot = document.createElement("p");
      slot.className = "pwiki";
      pane.appendChild(slot);
    }
    slot.innerHTML = `<b>${t("record")}</b>${extract}`;
    scrubEl(pane);
  });
  scrubEl(pane);
}

function scrubEl(el) {
  if (zhMode() || !el) return;
  const walk = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
  const nodes = [];
  while (walk.nextNode()) nodes.push(walk.currentNode);
  nodes.forEach(n => {
    if (!/[\u4e00-\u9fff]/.test(n.nodeValue || "")) return;
    n.nodeValue = n.nodeValue.replace(/[\u4e00-\u9fff]+/g, " ").replace(/\s{2,}/g, " ").trim();
  });
}

function bondKind(b) {
  const t = `${b.verb || ""}${b.why || ""}`;
  if (/嫁|娶|和亲|婚/.test(t)) return { label: "联姻", cls: "rk-marry" };
  if (/继承|接替|入主|禅|绝嗣|后裔|接续/.test(t)) return { label: "继承", cls: "rk-heir" };
  if (/灭|攻|战|围|俘|对峙|击败/.test(t)) return { label: "战争", cls: "rk-war" };
  if (/册封|朝贡|藩|事大/.test(t)) return { label: "册封", cls: "rk-fief" };
  if (/同盟|结盟|议和/.test(t)) return { label: "同盟", cls: "rk-ally" };
  return { label: "往来", cls: "rk-link" };
}

function selectHouse(id) {
  const h = HOUSES.find(x => x.id === id) || byId[id];
  if (!h || !h.type) {
    state.selected = id;
    render();
    return;
  }
  state.selected = id;
  openPopup(h);
  if (state.globe) {
    const p = jitter(h);
    state.globe.controls().autoRotate = false;
    state.globe.pointOfView({ lat: p.lat, lng: p.lng, altitude: 1.45 }, 800);
  }
  state.skipGlobeFly = true;
  render();
}

function openPopup(h) {
  const box = document.getElementById("popup");
  box.classList.add("open");
  box.scrollTop = 0;
  document.getElementById("d-kicker").textContent = t(h.region || "") + (h.type ? " · " + t(h.type) : "");
  document.getElementById("d-title").textContent = houseName(h);
  document.getElementById("d-meta").textContent = h.capital
    ? `${capitalName(h.capital)}  ·  ${fmtYear(h.start)} — ${fmtYear(h.end)}`
    : "";
  const extra = houseMore(h.id);
  const same = extra && h.blurb && extra.indexOf(h.blurb.slice(0, 18)) >= 0;
  const localBlurb = zhMode() ? (h.blurb || "") : houseBlurbText(h);
  const localMore = zhMode() ? extra : "";
  document.getElementById("d-blurb").innerHTML =
    `${localBlurb ? `<p>${localBlurb}</p>` : ""}${localMore && !same ? `<p>${localMore}</p>` : ""}<p class="pwiki" id="d-house-wiki">${t("loading")}</p>`;
  wikiSummary(houseWikiTitle(h)).then(info => {
    const slot = document.getElementById("d-house-wiki");
    if (!slot) return;
    const extract = info && (info.extract || info.description);
    if (extract) slot.innerHTML = extract;
    else slot.remove();
    scrubEl(document.getElementById("popup"));
  });
  const now = rulerAt(h.id, state.year);
  const list = rulersOf(h.id);
  const extraPeople = (h.people || []).filter(n => !list.some(r => r.name === n)).map(name => {
    const bio = personBio(name);
    const wiki = (bio && bio.wiki) || (typeof wikiTitleForPerson === "function" ? wikiTitleForPerson(h, name) : name);
    return { name, wiki };
  });
  const shown = (list.length ? list.concat(extraPeople) : extraPeople.length ? extraPeople : (h.people || []).map(name => ({ name })));
  document.getElementById("d-people").innerHTML = shown.map((p, i) => {
    const on = now && p.name === now.name;
    return `<button type="button" class="tag${on ? " now" : ""}" data-idx="${i}"><img class="pavatar" alt="" hidden /><span>${personName(p.name)}${on ? t("nowReign") : ""}</span></button>`;
  }).join("");
  document.querySelectorAll("#d-people .tag").forEach((tag, i) => {
    const p = shown[i];
    const wiki = p && (p.wiki || p.name);
    if (wiki) bindThumb(wiki, tag.querySelector("img"));
    tag.onclick = () => showPerson(h, Object.assign({}, p, { wiki }));
  });
  showPerson(h, now || shown[0] || null, true);
  const rels = (h.links || []).map(id => byId[id]).filter(Boolean);
  const wrap = document.getElementById("d-rel-wrap");
  const bonds = bondsFor(h.id);
  const seen = new Set(bonds.map(b => [b.a, b.b].sort().join("|")));
  const leftovers = rels.filter(r => !seen.has([h.id, r.id].sort().join("|")));
  wrap.innerHTML = (bonds.length || leftovers.length)
    ? `<h3>${t("net")}</h3>` +
      "" +
      bonds.map(b => {
        const other = byId[b.a === h.id ? b.b : b.a];
        const kind = bondKind(b);
        const year = b.year > 0 ? b.year + t("yearSuffix") : t("bce") + Math.abs(b.year);
        return `<button class="rel bond" data-id="${other?.id || ""}">
          <i class="rk ${kind.cls}">${t(kind.label)}</i>
          <strong>${personName(b.who)}</strong> ${verbT(b.verb)} <strong>${personName(b.whom)}</strong>
          <em>${year} · ${t("other")}: ${houseName(other) || ""}</em>
          ${zhMode() ? `<span>${b.why}</span>` : ""}
        </button>`;
      }).join("") +
      leftovers.map(r =>
        `<button class="rel" data-id="${r.id}"><i class="rk rk-link">${t("往来")}</i><strong>${houseName(h)}</strong> — <strong>${houseName(r)}</strong><em>${capitalName(r.capital || "")} · ${t(r.region || "")}</em></button>`
      ).join("")
    : "";
  scrubEl(box);
  wrap.querySelectorAll(".rel").forEach(btn => {
    btn.onclick = () => {
      if (!btn.dataset.id) return;
      btn.classList.remove("tapped");
      void btn.offsetWidth;
      btn.classList.add("tapped");
      selectHouse(btn.dataset.id);
    };
  });
  renderTree(h.id);
  scrubEl(document.getElementById("tree-pane"));
  box.scrollTop = 0;
  requestAnimationFrame(() => { box.scrollTop = 0; });
}

function closePopup() {
  state.selected = null;
  document.getElementById("popup").classList.remove("open");
  if (state.globe) state.globe.controls().autoRotate = true;
  state.skipGlobeFly = true;
  render();
}

function nodeCard(node, depth) {
  const kids = node.children || [];
  const open = depth < 2 ? "open" : "";
  return `
    <li class="tnode ${open}">
      <button class="tcard" type="button">
        <span class="trole">${node.role || ""}</span>
        <span class="tname">${personName(node.name)}</span>
        <span class="tyears">${node.years || ""}</span>
        ${node.spouse ? `<span class="tspouse">${personName(node.spouse)}</span>` : ""}
        ${kids.length ? `<span class="tcount">${kids.length}</span>` : ""}
      </button>
      ${zhMode() && node.note ? `<p class="tnote">${node.note}</p>` : ""}
      ${kids.length ? `<ul class="tkids">${kids.map(k => nodeCard(k, depth + 1)).join("")}</ul>` : ""}
    </li>`;
}

function renderTree(houseId) {
  const tree = TREES[houseId];
  const pane = document.getElementById("tree-pane");
  if (!tree) {
    pane.innerHTML = zhMode()
      ? `<div class="tree-empty">这座家族的世系主干尚未收录。仍可在上方查看成员与联姻飞线。</div>`
      : `<div class="tree-empty">${state.lang === "de" ? "Stammbaum noch nicht erfasst." : "Lineage not catalogued yet."}</div>`;
    return;
  }
  pane.innerHTML = `
    <div class="tree-head">
      <div class="kicker">${tree.subtitle}</div>
      <h2>${tree.title}</h2>
    </div>
    <ul class="tree">${tree.roots.map(r => nodeCard(r, 0)).join("")}</ul>
  `;
  pane.querySelectorAll(".tcard").forEach(btn => {
    btn.addEventListener("click", () => btn.parentElement.classList.toggle("open"));
  });
}

function setStory(id) {
  state.story = state.story === id ? null : id;
  document.querySelectorAll(".story-btn").forEach(b => {
    b.classList.toggle("active", b.dataset.story === state.story);
  });
  const card = document.getElementById("story-card");
  const story = STORIES.find(s => s.id === state.story);
  if (story) {
    card.hidden = false;
    card.innerHTML = `<div class="kicker">${t("era")}</div><h3>${storyTitle(story)}</h3><p>${storyQuote(story)}</p>`;
    state.year = story.year;
    document.getElementById("year").value = story.year;
    if (state.globe && story.globeView) {
      state.globe.pointOfView(story.globeView, 900);
    }
  } else {
    card.hidden = true;
    card.innerHTML = "";
  }
  render();
}

function render() {
  renderHud();
  renderGlobe();
}

function buildChips() {
  const chips = document.getElementById("chips");
  REGIONS.concat(TYPES).forEach(label => {
    const el = document.createElement("button");
    el.className = "chip" + (label === "全部" ? " active" : "");
    el.dataset.key = label;
    el.textContent = t(label);
    el.onclick = () => {
      if (REGIONS.includes(label)) {
        state.region = label;
        if (state.globe && REGION_POV[label]) {
          state.skipGlobeFly = true;
          state.globe.pointOfView(REGION_POV[label], 900);
        }
      } else {
        state.type = (state.type === label ? "全部类型" : label);
        state.skipGlobeFly = true;
      }
      [...chips.children].forEach(c => {
        c.classList.toggle("active", c.dataset.key === state.region || c.dataset.key === state.type);
        c.classList.remove("tapped");
        void c.offsetWidth;
        if (c.classList.contains("active")) c.classList.add("tapped");
      });
      render();
    };
    chips.appendChild(el);
  });
}

function buildStories() {
  const row = document.getElementById("stories");
  STORIES.forEach(s => {
    const b = document.createElement("button");
    b.className = "story-btn";
    b.dataset.story = s.id;
    b.textContent = storyTitle(s);
    b.onclick = () => {
      b.classList.remove("tapped");
      void b.offsetWidth;
      b.classList.add("tapped");
      setStory(s.id);
    };
    row.appendChild(b);
  });
  const all = document.createElement("button");
  all.className = "story-btn";
  all.id = "toggle-all";
  all.textContent = t("onlyNow");
  all.onclick = () => {
    state.showAll = !state.showAll;
    state.skipGlobeFly = true;
    render();
  };
  row.appendChild(all);
  const clear = document.createElement("button");
  clear.className = "story-btn ghost";
  clear.textContent = t("allArcs");
  clear.onclick = () => {
    state.story = null;
    state.selected = null;
    state.showAll = true;
    state.region = "全部";
    state.type = "全部类型";
    state.query = "";
    document.getElementById("q").value = "";
    document.querySelectorAll(".story-btn").forEach(b => b.classList.remove("active"));
    document.querySelectorAll(".chip").forEach(c => {
      c.classList.toggle("active", c.dataset.key === "全部");
    });
    document.getElementById("story-card").hidden = true;
    document.getElementById("popup").classList.remove("open");
    if (state.globe) {
      state.globe.controls().autoRotate = true;
      state.globe.pointOfView(REGION_POV["全部"], 900);
    }
    state.skipGlobeFly = true;
    render();
  };
  row.appendChild(clear);
}

function buildTreeList() {}

let yearTick;
document.getElementById("year").addEventListener("input", e => {
  state.year = Number(e.target.value);
  renderHud();
  clearTimeout(yearTick);
  yearTick = setTimeout(() => {
    state.skipGlobeFly = true;
    render();
  }, 50);
});

document.getElementById("play").onclick = () => {
  state.playing = !state.playing;
  document.getElementById("play").textContent = state.playing
    ? (state.lang === "de" ? "Pause" : state.lang === "en" ? "Pause" : "暂停")
    : (state.lang === "de" ? "Play" : state.lang === "en" ? "Play" : "播放");
  if (state.playing) {
    state.timer = setInterval(() => {
      state.year = Math.min(1918, state.year + (state.year < 0 ? 20 : 8));
      document.getElementById("year").value = state.year;
      state.skipGlobeFly = true;
      render();
      if (state.year >= 1918) {
        state.playing = false;
        document.getElementById("play").textContent = state.lang === "de" ? "Play" : state.lang === "en" ? "Play" : "播放";
        clearInterval(state.timer);
      }
    }, 260);
  } else clearInterval(state.timer);
};

document.getElementById("now").onclick = () => {
  const presets = [-2500, -1600, -1000, -500, 1, 220, 618, 800, 1206, 1453, 1644, 1789, 1894, 1918];
  state.year = presets.find(y => y > state.year) ?? presets[0];
  document.getElementById("year").value = state.year;
  state.skipGlobeFly = true;
  render();
};

document.getElementById("close").onclick = closePopup;
document.getElementById("q").oninput = e => {
  state.query = e.target.value;
  state.skipGlobeFly = true;
  render();
};
document.addEventListener("keydown", e => {
  if (e.key === "Escape") closePopup();
});

function applyLang() {
  document.documentElement.lang = state.lang === "zh" ? "zh-CN" : state.lang;
  const title = document.querySelector(".title");
  if (title) title.textContent = t("title");
  const sub = document.getElementById("subline");
  if (sub && !state.story) sub.textContent = t("sub");
  const q = document.getElementById("q");
  if (q) q.placeholder = t("search");
  const legend = document.querySelector(".legend h4");
  if (legend) legend.textContent = t("legend");
  document.querySelectorAll(".legend-row").forEach((row, i) => {
    const keys = ["东亚", "欧洲", "中东 / 北非", "南亚 / 东南亚", "非洲", "美洲"];
    const span = row.childNodes[row.childNodes.length - 1];
    if (keys[i]) {
      const dot = row.querySelector(".dot");
      row.textContent = "";
      if (dot) row.appendChild(dot);
      row.appendChild(document.createTextNode(" " + t(keys[i])));
    }
  });
  const eraHud = document.querySelector(".year-hud .era");
  if (eraHud) eraHud.textContent = t("era");
  const treeLab = document.querySelector(".tree-label");
  if (treeLab) treeLab.textContent = t("tree");
  document.querySelectorAll(".langs button").forEach(b => {
    b.classList.toggle("active", b.dataset.lang === state.lang);
  });
  const chips = document.getElementById("chips");
  if (chips) chips.innerHTML = "";
  buildChips();
  const stories = document.getElementById("stories");
  if (stories) stories.innerHTML = "";
  buildStories();
  if (state.selected && byId[state.selected] && byId[state.selected].type) {
    openPopup(byId[state.selected]);
  }
  const play = document.getElementById("play");
  if (play) play.textContent = state.playing ? (state.lang === "zh" ? "暂停" : "Pause") : (state.lang === "zh" ? "播放" : "Play");
  const nowBtn = document.getElementById("now");
  if (nowBtn) nowBtn.textContent = state.lang === "zh" ? "此刻切片" : state.lang === "de" ? "Jetzt" : "This year";
  const ticks = document.querySelectorAll(".ticks span");
  const tickText = state.lang === "zh"
    ? ["前2500", "前1000", "元年", "800", "1453", "1918"]
    : state.lang === "de"
      ? ["2500 v.Chr.", "1000 v.Chr.", "1", "800", "1453", "1918"]
      : ["2500 BCE", "1000 BCE", "1 CE", "800", "1453", "1918"];
  ticks.forEach((s, i) => { if (tickText[i]) s.textContent = tickText[i]; });
  const seal = document.querySelector(".seal");
  if (seal) seal.textContent = state.lang === "zh" ? "脉" : "Y";
  if (state.globe) {
    state.globe.htmlElementsData([]);
  }
  renderHud();
}

document.querySelectorAll(".langs button").forEach(b => {
  b.onclick = () => {
    state.lang = b.dataset.lang;
    applyLang();
    render();
  };
});

applyLang();
ensureGlobe();
setTimeout(() => {
  const box = document.getElementById("globe");
  if (state.globe) {
    state.globe.width(box.clientWidth);
    state.globe.height(box.clientHeight);
  }
  render();
}, 40);
