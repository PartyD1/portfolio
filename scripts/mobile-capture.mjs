#!/usr/bin/env node
/**
 * Phone capture and measurement harness. See .impeccable/plans/mobile-overhaul/pr-00-harness.md.
 *
 *   npm install --no-save --no-audit --no-fund playwright-core@1.62   (once per worktree)
 *   npm run build && npx next start -p 3111
 *   node scripts/mobile-capture.mjs [--port 3111] [--out .impeccable/review/mobile]
 *        [--routes /,/work/operations-agent] [--widths 390,320,360,430] [--themes light,dark]
 *        [--landscape] [--tablet] [--no-segments] [--no-sheet] [--menu] [--motion] [--root20]
 *        [--vitals] [--system-theme] [--label after-]
 *
 * --vitals (PR 10): at 390 width, light theme, CPU throttled 4x and network
 * shaped to a fast-4G profile (9 Mbps, 170ms RTT) via CDP, reports LCP
 * (ms + element), CLS (excluding shifts with recent input) and long tasks
 * (count + longest) per route, plus the existing backdrop-filter count.
 * --system-theme (PR 11): a cold visit with no seeded localStorage.theme,
 * at colorScheme dark and light, checks the page follows the OS.
 *
 * playwright-core is NOT a dependency of this project on purpose (CLAUDE.md);
 * it is installed with --no-save and resolved from the worktree's node_modules.
 * The browser is the cached chromium_headless_shell that matches 1.62; set
 * PW_EXE to point at it explicitly if the cache moves.
 */
import fs from "node:fs";
import path from "node:path";

let chromium;
try {
  ({ chromium } = await import("playwright-core"));
} catch {
  console.error(
    "playwright-core is not installed in this worktree.\n" +
      "  npm install --no-save --no-audit --no-fund playwright-core@1.62",
  );
  process.exit(2);
}

/* ---------- arguments ---------- */
const args = process.argv.slice(2);
const flag = (name) => args.includes(`--${name}`);
const opt = (name, dflt) => {
  const i = args.indexOf(`--${name}`);
  return i >= 0 && args[i + 1] && !args[i + 1].startsWith("--") ? args[i + 1] : dflt;
};

const PORT = opt("port", "3111");
const BASE = `http://localhost:${PORT}`;
const OUT = path.resolve(opt("out", ".impeccable/review/mobile"));
const LABEL = opt("label", "");
const ROUTES = opt("routes", "/,/work/operations-agent,/work/scorely-ai,/work/santaclaws").split(",");
const WIDTHS = opt("widths", "390,320,360,430").split(",").map(Number);
const THEMES = opt("themes", "light,dark").split(",");
const SEGMENTS = !flag("no-segments");
const SHEET = !flag("no-sheet");
const MENU = flag("menu");
const MOTION = flag("motion");
const ROOT20 = flag("root20");
const LANDSCAPE = flag("landscape");
const TABLET = flag("tablet");
const VITALS = flag("vitals");
const SYSTEM_THEME = flag("system-theme");

/* Common phone heights for the widths the matrix uses. Anything else gets a
 * 19.5:9 guess, which is what most phones are now. */
const HEIGHTS = { 320: 568, 360: 740, 375: 667, 390: 844, 412: 915, 430: 932, 740: 900, 768: 1024 };
const heightFor = (w) => HEIGHTS[w] ?? Math.round(w * 2.16);

const routeTag = (r) => (r === "/" ? "home" : r.replace(/^\/work\//, "").replace(/\//g, "-") || "root");

fs.mkdirSync(OUT, { recursive: true });

/* ---------- the selector list: the phone type ramp ---------- */
const SEL = [
  "body",
  ".hero__title", ".hero__role", ".roll__text", ".hero__avail", ".hero__cue",
  ".section__title",
  ".card--flagship .card__name", ".card--flagship .card__org", ".card--flagship .card__tagline",
  ".card:not(.card--flagship) .card__name", ".card:not(.card--flagship) .card__tagline",
  ".card__fact", ".card__use", ".live-link",
  ".timeline__period", ".timeline__role", ".timeline__org", ".timeline__ownership", ".timeline__project-name",
  ".about__body p", ".pill",
  ".contact__title", ".contact__lede", ".contact__seeking", ".contact__email", ".link-arrow",
  ".footer__line",
  ".case__back", ".case__title", ".case__tagline", ".case__meta", ".case__note", ".tech__name",
  ".flow__heading", ".flow__title", ".flow__detail", ".flow__branch", ".flow__bus-title", ".flow__bus-detail", ".flow__index",
  ".case__section-title", ".case__points li", ".shots__cap", ".shots__count",
  ".case__foot-title", ".case__foot-lede",
  ".menu__link", ".menu__foot a",
];

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function waitServer() {
  for (let i = 0; i < 90; i++) {
    try {
      const r = await fetch(BASE);
      if (r.ok) return;
    } catch {}
    await sleep(1000);
  }
  throw new Error(`no server at ${BASE}; run: npx next start -p ${PORT}`);
}

async function settle(page) {
  await page.evaluate(async () => {
    const h = document.documentElement.scrollHeight;
    for (let y = 0; y < h; y += innerHeight * 0.8) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 60));
    }
    window.scrollTo(0, 0);
  });
  await sleep(500);
}

function metricsInPage(SEL) {
  const out = {};
  const r2 = (r) => `${Math.round(r.width)}x${Math.round(r.height)}`;
  out.url = location.pathname;
  out.vw = innerWidth;
  out.vh = innerHeight;
  out.rootFont = getComputedStyle(document.documentElement).fontSize;
  out.docH = document.documentElement.scrollHeight;
  out.screens = +(out.docH / innerHeight).toFixed(1);
  out.hOverflow = document.documentElement.scrollWidth - document.documentElement.clientWidth;
  out.mq = {
    coarse: matchMedia("(pointer: coarse)").matches,
    hover: matchMedia("(hover: hover)").matches,
    reduce: matchMedia("(prefers-reduced-motion: reduce)").matches,
    dark: document.documentElement.classList.contains("dark"),
  };
  out.type = {};
  for (const s of SEL) {
    const el = document.querySelector(s);
    if (!el) continue;
    const cs = getComputedStyle(el);
    const r = el.getBoundingClientRect();
    out.type[s] = { fs: parseFloat(cs.fontSize), lh: cs.lineHeight, fw: cs.fontWeight, w: Math.round(r.width), h: Math.round(r.height) };
  }
  const cands = [...document.querySelectorAll('a, button, [role="button"], [tabindex]:not([tabindex="-1"])')];
  out.targets = cands.map((el) => {
    const r = el.getBoundingClientRect();
    const cls = typeof el.className === "string" ? el.className.split(" ").slice(0, 2).join(".") : "";
    return {
      tag: el.tagName.toLowerCase(),
      cls,
      text: (el.getAttribute("aria-label") || el.textContent || "").trim().slice(0, 34),
      w: Math.round(r.width),
      h: Math.round(r.height),
      top: Math.round(r.top + scrollY),
    };
  });
  out.small = out.targets.filter((t) => t.w > 0 && t.h > 0 && (t.w < 44 || t.h < 44));
  out.tiny = out.targets.filter((t) => t.w > 0 && t.h > 0 && (t.w < 24 || t.h < 24));
  out.zero = out.targets.filter((t) => t.w === 0 || t.h === 0);
  out.blur = [...document.querySelectorAll("*")].filter((el) => {
    const cs = getComputedStyle(el);
    const b = cs.getPropertyValue("backdrop-filter") || cs.getPropertyValue("-webkit-backdrop-filter");
    return b && b !== "none";
  }).length;
  out.anims = document
    .getAnimations()
    .filter((a) => a.playState === "running")
    .map((a) => `${a.animationName || a.constructor.name}${a.timeline && a.timeline.constructor.name.includes("View") ? "(view)" : ""}`);
  out.sections = [...document.querySelectorAll("section[id], .case__header, .flow, .case__section, .shots, .case__foot, footer")].map((s) => {
    const r = s.getBoundingClientRect();
    return { id: s.id || String(s.className).split(" ")[0], top: Math.round(r.top + scrollY), h: Math.round(r.height) };
  });
  out.cards = [...document.querySelectorAll(".card")].map((c) => {
    const r = c.getBoundingClientRect();
    const m = c.querySelector(".card__media")?.getBoundingClientRect();
    return { cls: c.className.replace("card ", "").split(" ")[0] || "card", h: Math.round(r.height), media: m ? r2(m) : "" };
  });
  /* Elements whose right edge passes the viewport. The fixed wash (its blobs
   * hang off every corner by design), SVG internals and the slideshow's
   * scroll track are excluded; anything left is a real overflow. */
  out.wide = [...document.querySelectorAll("body *")]
    .filter((el) => {
      if (el instanceof SVGElement || el.closest(".wash") || el.closest(".shots__track")) return false;
      const r = el.getBoundingClientRect();
      return r.right > innerWidth + 1 && r.width > 0 && getComputedStyle(el).position !== "fixed";
    })
    .slice(0, 10)
    .map((el) => el.tagName.toLowerCase() + "." + (el.getAttribute("class") || "").split(" ")[0]);
  const box = (s) => {
    const el = document.querySelector(s);
    if (!el) return "";
    const r = el.getBoundingClientRect();
    return `${r2(r)} @${Math.round(r.left)},${Math.round(r.top)}`;
  };
  out.chrome = { mark: box(".shell__mark"), toggle: box(".theme-toggle"), ring: box(".scroll-ring") };
  out.hero = document.querySelector(".hero") ? Math.round(document.querySelector(".hero").getBoundingClientRect().height) : 0;
  out.imgs = [...document.images].map((i) => ({
    src: i.currentSrc.split("?")[0].slice(-40),
    w: i.naturalWidth,
    dw: Math.round(i.getBoundingClientRect().width),
    loading: i.loading,
    fp: i.getAttribute("fetchpriority"),
  }));
  return out;
}

function summarize(tag, m) {
  const lines = [];
  lines.push(`== ${tag} ==`);
  lines.push(`docH ${m.docH}  screens ${m.screens}  hOverflow ${m.hOverflow}  blur ${m.blur}  anims [${m.anims.join(", ")}]  root ${m.rootFont}`);
  lines.push(`${m.hOverflow === 0 ? "PASS" : "FAIL"} overflow      hOverflow=${m.hOverflow}${m.wide.length ? "  wide: " + m.wide.join(" ") : ""}`);
  const low = Object.entries(m.type).filter(([s, t]) => t.fs < 14 && s !== "body" && s !== ".flow__index");
  lines.push(`${low.length ? "FAIL" : "PASS"} text-floor    ${low.length ? low.map(([s, t]) => `${s} ${t.fs}px`).join(", ") + "   (< 14px)" : "no sampled run under 14px"}`);
  const tiny = m.tiny;
  lines.push(`${tiny.length ? "FAIL" : "PASS"} targets<24    ${tiny.length ? tiny.map((t) => `${t.tag}.${t.cls} ${t.w}x${t.h}`).join(", ") : "none"}`);
  const small = m.small;
  lines.push(`${small.length ? "WARN" : "PASS"} targets<44    ${small.length ? small.map((t) => `${t.tag}.${t.cls} ${t.w}x${t.h}`).join(", ") : "none"}`);
  const zeroUnexpected = m.zero.filter((t) => !t.cls.startsWith("card__hit"));
  lines.push(`${zeroUnexpected.length ? "FAIL" : "PASS"} zero-size     ${m.zero.length ? m.zero.map((t) => `${t.tag}.${t.cls}`).join(", ") : "none"}${m.zero.length && !zeroUnexpected.length ? " (the full-card overlay; expected)" : ""}`);
  if (m.cards.length) lines.push(`cards  ${m.cards.map((c) => `${c.cls === "card--flagship" ? "flagship " : ""}${c.h}h${c.media ? " mark " + c.media : ""}`).join(" | ")}`);
  lines.push(`sections ${m.sections.map((s) => `${s.id}@${s.top}(${s.h})`).join("  ")}`);
  const keyType = [".hero__title", ".hero__role", ".section__title", ".card:not(.card--flagship) .card__name", ".card:not(.card--flagship) .card__tagline", ".contact__email", ".case__title", ".flow__title", ".case__points li", ".menu__link"];
  lines.push(`type   ${keyType.filter((s) => m.type[s]).map((s) => `${s} ${m.type[s].fs}px/${m.type[s].lh}`).join(" | ")}`);
  lines.push(`chrome ${JSON.stringify(m.chrome)}`);
  return lines.join("\n");
}

async function segments(page, tag) {
  const { docH, vh } = await page.evaluate(() => ({ docH: document.documentElement.scrollHeight, vh: innerHeight }));
  const bufs = [];
  for (let y = 0, i = 0; y < docH; y += vh, i++) {
    await page.evaluate((y) => window.scrollTo(0, y), y);
    await sleep(240);
    const buf = await page.screenshot({ animations: "disabled", caret: "hide", timeout: 60000 });
    if (SEGMENTS) fs.writeFileSync(path.join(OUT, `${tag}-s${String(i).padStart(2, "0")}.png`), buf);
    bufs.push(buf);
  }
  await page.evaluate(() => window.scrollTo(0, 0));
  return bufs;
}

async function sheet(browser, bufs, tag, cssW, cssH) {
  const n = bufs.length;
  const gap = 10;
  const label = 22;
  const W = n * (cssW + gap) + gap;
  const H = cssH + gap * 2 + label;
  const ctx = await browser.newContext({ viewport: { width: Math.min(W, 16000), height: H }, deviceScaleFactor: 1 });
  const page = await ctx.newPage();
  const imgs = bufs
    .map((b, i) => `<figure><figcaption>${tag} · screen ${i + 1}/${n}</figcaption><img src="data:image/png;base64,${b.toString("base64")}" width="${cssW}" height="${cssH}"></figure>`)
    .join("");
  await page.setContent(
    `<style>body{margin:0;background:#2a2a33;font:12px system-ui;color:#ddd}main{display:flex;gap:${gap}px;padding:${gap}px}figure{margin:0}figcaption{height:${label}px;line-height:${label}px}img{display:block;outline:1px solid #555}</style><main>${imgs}</main>`,
  );
  await page.screenshot({ path: path.join(OUT, `${tag}-sheet.png`), fullPage: true });
  await ctx.close();
}

/* The init script runs before any page script, so it never misses an early
 * LCP candidate or a layout shift that fires during hydration. Results land
 * on window.__vitals for a later page.evaluate() to read back. */
function installVitalsObserver() {
  window.__vitals = { lcp: null, lcpEl: null, cls: 0, longtasks: [] };
  try {
    new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const last = entries[entries.length - 1];
      if (last) {
        window.__vitals.lcp = Math.round(last.startTime);
        const el = last.element;
        window.__vitals.lcpEl = el
          ? el.tagName.toLowerCase() + (el.className ? "." + String(el.className).split(" ")[0] : "")
          : last.url
            ? "img:" + last.url.split("/").pop()
            : null;
      }
    }).observe({ type: "largest-contentful-paint", buffered: true });
  } catch {}
  try {
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (!entry.hadRecentInput) window.__vitals.cls += entry.value;
      }
    }).observe({ type: "layout-shift", buffered: true });
  } catch {}
  try {
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        window.__vitals.longtasks.push(Math.round(entry.duration));
      }
    }).observe({ type: "longtask", buffered: true });
  } catch {}
}

async function runVitals(browser) {
  const lines = [];
  for (const route of ROUTES) {
    const ctx = await browser.newContext({
      viewport: { width: 390, height: 844 },
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true,
      reducedMotion: "no-preference",
    });
    await ctx.addInitScript(() => localStorage.setItem("theme", "light"));
    await ctx.addInitScript(installVitalsObserver);
    const page = await ctx.newPage();
    const cdp = await ctx.newCDPSession(page);
    await cdp.send("Network.enable");
    await cdp.send("Network.emulateNetworkConditions", {
      offline: false,
      downloadThroughput: (9 * 1024 * 1024) / 8,
      uploadThroughput: (9 * 1024 * 1024) / 8,
      latency: 170,
    });
    await cdp.send("Emulation.setCPUThrottlingRate", { rate: 4 });

    const start = Date.now();
    await page.goto(BASE + route, { waitUntil: "load" });
    await sleep(1500);
    // A full scroll, so every content-visibility:auto section (PR 10)
    // un-skips and its real height replaces the 600px placeholder guess -
    // exactly where a scroll-triggered shift would show up if the guess is
    // wrong enough to matter.
    await settle(page);
    const vitals = await page.evaluate(() => {
      const v = window.__vitals || { lcp: null, lcpEl: null, cls: 0, longtasks: [] };
      const blur = [...document.querySelectorAll("*")].filter((el) => {
        const cs = getComputedStyle(el);
        const b = cs.getPropertyValue("backdrop-filter") || cs.getPropertyValue("-webkit-backdrop-filter");
        return b && b !== "none";
      }).length;
      return { ...v, blur };
    });
    const loadMs = Date.now() - start;
    await cdp.send("Emulation.setCPUThrottlingRate", { rate: 1 });
    await ctx.close();

    const longtasksOver100 = vitals.longtasks.filter((d) => d > 100);
    // The typewriter's caret moves a sub-pixel amount as it types, which the
    // Layout Instability API reports as a real (if minuscule, ~0.000002 per
    // keystroke) shift. Round to the doc's own stated precision (CLS 0.00)
    // rather than IEEE-754 zero, so a caret mid-type does not fail a route
    // that has no visible shift.
    const clsRounded = Number(vitals.cls.toFixed(3));
    const line =
      `${route}: LCP ${vitals.lcp}ms (${vitals.lcpEl})  CLS ${vitals.cls.toFixed(3)} (raw ${vitals.cls})  ` +
      `longtasks ${vitals.longtasks.length} (over100ms: ${longtasksOver100.length}, longest ${vitals.longtasks.length ? Math.max(...vitals.longtasks) : 0}ms)  ` +
      `blur ${vitals.blur}  loadWall ${loadMs}ms  ` +
      `${vitals.lcp !== null && vitals.lcp < 2000 ? "PASS" : "FAIL"} LCP<2000  ` +
      `${clsRounded === 0 ? "PASS" : "FAIL"} CLS=0.00  ` +
      `${longtasksOver100.length === 0 ? "PASS" : "FAIL"} no-longtask>100ms-after-load`;
    lines.push(line);
    console.error("vitals", route);
  }
  return lines.join("\n");
}

async function main() {
  await waitServer();
  const exe = process.env.PW_EXE;
  const browser = await chromium.launch(exe ? { executablePath: exe } : {});
  const all = {};
  const summaries = [];

  async function ctxFor({ width, height, theme, reduce = true, dsf = 2, root20 = false }) {
    const ctx = await browser.newContext({
      viewport: { width, height },
      deviceScaleFactor: dsf,
      isMobile: true,
      hasTouch: true,
      reducedMotion: reduce ? "reduce" : "no-preference",
    });
    if (theme === "dark") await ctx.addInitScript(() => localStorage.setItem("theme", "dark"));
    else await ctx.addInitScript(() => localStorage.setItem("theme", "light"));
    if (root20) {
      await ctx.addInitScript(() => {
        document.addEventListener("DOMContentLoaded", () => {
          document.documentElement.style.fontSize = "20px";
        });
      });
    }
    return ctx;
  }

  const shots = [];
  for (const w of WIDTHS) shots.push({ w, h: heightFor(w), name: String(w) });
  if (LANDSCAPE) shots.push({ w: 844, h: 390, name: "land", firstRouteOnly: true });
  if (TABLET) shots.push({ w: 768, h: 1024, name: "768", firstRouteOnly: true });

  for (const root20 of ROOT20 ? [false, true] : [false]) {
    for (const theme of THEMES) {
      for (const { w, h, name, firstRouteOnly } of shots) {
        for (const route of firstRouteOnly ? ROUTES.slice(0, 1) : ROUTES) {
          const tag = `${LABEL}${routeTag(route)}-${name}-${theme}${root20 ? "-root20" : ""}`;
          const ctx = await ctxFor({ width: w, height: h, theme, root20 });
          const page = await ctx.newPage();
          await page.goto(BASE + route, { waitUntil: "load" });
          await sleep(900);
          await settle(page);
          await page.screenshot({ path: path.join(OUT, `${tag}-fold.png`), animations: "disabled", caret: "hide", timeout: 60000 });
          const m = await page.evaluate(metricsInPage, SEL);
          all[tag] = m;
          if (theme === THEMES[0]) summaries.push(summarize(`${route} ${w}x${h} ${theme}${root20 ? " root20" : ""}`, m));
          if (SEGMENTS || SHEET) {
            const bufs = await segments(page, tag);
            if (SHEET) await sheet(browser, bufs, tag, w, h);
          }
          await ctx.close();
          console.error("done", tag);
        }
      }
    }
  }

  if (MENU) {
    for (const theme of THEMES) {
      const tag = `${LABEL}home-390-${theme}-menu`;
      const ctx = await ctxFor({ width: 390, height: 844, theme });
      const page = await ctx.newPage();
      await page.goto(BASE + "/", { waitUntil: "load" });
      await sleep(900);
      await page.click(".shell__mark");
      await sleep(700);
      await page.screenshot({ path: path.join(OUT, `${tag}.png`), animations: "disabled", caret: "hide", timeout: 60000 });
      all[tag] = await page.evaluate(() => {
        const q = (s) =>
          [...document.querySelectorAll(s)].map((el) => {
            const r = el.getBoundingClientRect();
            return { text: el.textContent.trim().slice(0, 20), w: Math.round(r.width), h: Math.round(r.height), fs: getComputedStyle(el).fontSize };
          });
        const m = document.querySelector(".menu")?.getBoundingClientRect();
        const close = document.querySelector(".menu__close")?.getBoundingClientRect();
        return {
          menu: m ? `${Math.round(m.width)}x${Math.round(m.height)} @${Math.round(m.left)},${Math.round(m.top)}` : "",
          close: close ? `${Math.round(close.width)}x${Math.round(close.height)}` : "none",
          links: q(".menu__link"),
          foot: q(".menu__foot a"),
          keycapsVisible: [...document.querySelectorAll(".menu__key")].some((k) => getComputedStyle(k).display !== "none"),
        };
      });
      summaries.push(`== menu 390 ${theme} ==\n${JSON.stringify(all[tag])}`);
      await ctx.close();
    }
  }

  if (MOTION) {
    for (const route of ROUTES.slice(0, 2)) {
      const tag = `${LABEL}${routeTag(route)}-390-motion`;
      const ctx = await ctxFor({ width: 390, height: 844, theme: THEMES[0], reduce: false });
      const page = await ctx.newPage();
      await page.goto(BASE + route, { waitUntil: "load" });
      await sleep(2500);
      const rest = await page.evaluate(() => ({
        running: document.getAnimations().filter((a) => a.playState === "running").map((a) => `${a.animationName || a.constructor.name}${a.timeline && a.timeline.constructor.name.includes("View") ? "(view)" : ""}`),
        pending: document.querySelectorAll('[data-reveal="pending"]').length,
        supportsTimeline: CSS.supports("animation-timeline: view()"),
      }));
      all[tag] = rest;
      if (route === "/") {
        await page.evaluate(() => window.scrollTo(0, 300));
        await sleep(400);
        await page.screenshot({ path: path.join(OUT, `${tag}-scroll300.png`), caret: "hide", timeout: 60000 });
        all[tag].heroAt300 = await page.evaluate(() => {
          const cs = getComputedStyle(document.querySelector(".hero"));
          return { opacity: cs.opacity, scale: cs.scale, translate: cs.translate, filter: cs.filter };
        });
      }
      summaries.push(`== motion ${route} 390 ==\n${JSON.stringify(all[tag])}`);
      await ctx.close();
    }
  }

  if (VITALS) {
    const vitalsReport = await runVitals(browser);
    summaries.push(`== vitals (390, 4x CPU, fast-4G) ==\n${vitalsReport}`);
    fs.writeFileSync(path.join(OUT, `${LABEL}vitals.txt`), vitalsReport);
  }

  if (SYSTEM_THEME) {
    for (const colorScheme of ["dark", "light"]) {
      const tag = `${LABEL}home-390-system-${colorScheme}`;
      /* No seeded localStorage.theme: this is the one check for whether a
       * phone whose OS is set to dark opens the site dark on a cold visit. */
      const ctx = await browser.newContext({
        viewport: { width: 390, height: 844 },
        deviceScaleFactor: 2,
        isMobile: true,
        hasTouch: true,
        reducedMotion: "reduce",
        colorScheme,
      });
      const page = await ctx.newPage();
      await page.goto(BASE + "/", { waitUntil: "load" });
      await sleep(400);
      const result = await page.evaluate(() => ({
        htmlClass: document.documentElement.className,
        groundMeta: [...document.querySelectorAll('meta[name="theme-color"]')].map((m) => ({
          media: m.media,
          content: m.content,
        })),
        computedGround: getComputedStyle(document.documentElement).getPropertyValue("--ground").trim(),
      }));
      const isDark = result.htmlClass.includes("dark");
      const wants = colorScheme === "dark";
      all[tag] = result;
      summaries.push(
        `== system-theme colorScheme=${colorScheme} ==\n${JSON.stringify(result)}\n${isDark === wants ? "PASS" : "FAIL"} follows-system (expected ${wants ? "dark" : "light"}, got ${isDark ? "dark" : "light"})`,
      );
      await ctx.close();
    }
  }

  fs.writeFileSync(path.join(OUT, `${LABEL}metrics.json`), JSON.stringify(all, null, 2));
  await browser.close();
  console.log(summaries.join("\n\n"));
  console.log(`\nwrote ${OUT}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
