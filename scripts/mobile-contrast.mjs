#!/usr/bin/env node
/**
 * Composited-pixel contrast re-measure. See
 * .impeccable/plans/mobile-overhaul/pr-11-theme-and-a11y.md section 4.
 *
 *   npm install --no-save --no-audit --no-fund playwright-core@1.62   (once per worktree)
 *   npm run build && npx next start -p 3111
 *   node scripts/mobile-contrast.mjs [--port 3111] [--label after-]
 *
 * Method (memory: contrast-measurement-method):
 *  - screenshot the actual composited page at deviceScaleFactor 1, not the
 *    DOM's computed background (glass tints and the wash are drawn, not a
 *    single flat color a computed style could report).
 *  - for a text element, sample one row just inside the top edge and one
 *    just inside the bottom edge (the leading, clear of ascenders/descenders
 *    on typical text), at five x positions spanning the box.
 *  - discard any sample within RGB distance 60 of the element's own text
 *    color (a glyph pixel, not the ground it sits on).
 *  - report min / p20 / median of the WCAG ratio between the text color and
 *    the surviving samples per element.
 *  - a run fails when p20 is under 4.5, or under 3.0 for text at 24px or
 *    larger, or 18.66px and bold.
 */
import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";

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

const args = process.argv.slice(2);
const opt = (name, dflt) => {
  const i = args.indexOf(`--${name}`);
  return i >= 0 && args[i + 1] && !args[i + 1].startsWith("--") ? args[i + 1] : dflt;
};

const PORT = opt("port", "3111");
const BASE = `http://localhost:${PORT}`;
const OUT = path.resolve(opt("out", ".impeccable/review/mobile"));
const LABEL = opt("label", "");

function findHeadlessShell() {
  if (process.env.PW_EXE) return process.env.PW_EXE;
  try {
    return execSync(
      "find ~/Library/Caches/ms-playwright -name 'headless_shell' 2>/dev/null | head -1",
    ).toString().trim() || undefined;
  } catch {
    return undefined;
  }
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/* ---------- contexts to measure ---------- */
const CONTEXTS = [
  {
    route: "/",
    label: "home",
    selectors: [
      ".card__tagline",
      ".card__fact",
      ".card__use",
      ".timeline__ownership",
      ".timeline__org",
      ".about__body p",
      ".pill",
      ".footer__line",
      ".hero__avail",
      ".roll__text",
      ".contact__lede",
    ],
  },
  {
    route: "/work/operations-agent",
    label: "operations-agent",
    selectors: [
      ".case__back",
      ".case__meta",
      ".case__note",
      ".tech__name",
      ".flow__detail",
      ".flow__branch",
      ".flow__bus-detail",
      ".case__points li",
      ".case__foot-lede",
    ],
  },
  {
    route: "/work/santaclaws",
    label: "santaclaws",
    selectors: [
      ".case__back",
      ".case__meta",
      ".case__note",
      ".tech__name",
      ".flow__detail",
      ".flow__branch",
      ".flow__bus-detail",
      ".case__points li",
      ".case__foot-lede",
      ".shots__cap",
      ".shots__count",
    ],
  },
  { route: "/", label: "menu", selectors: [".menu__foot-row a"], openMenu: true },
];

const THEMES = ["light", "dark"];

/* ---------- WCAG math ---------- */
function luminance([r, g, b]) {
  const a = [r, g, b].map((v) => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2];
}
function ratio(rgb1, rgb2) {
  const l1 = luminance(rgb1),
    l2 = luminance(rgb2);
  const [a, b] = l1 > l2 ? [l1, l2] : [l2, l1];
  return (a + 0.05) / (b + 0.05);
}
function rgbDist(a, b) {
  return Math.sqrt((a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2 + (a[2] - b[2]) ** 2);
}
function parseColor(str) {
  const m = str.match(/rgba?\(([^)]+)\)/);
  if (!m) return [0, 0, 0];
  return m[1].split(",").slice(0, 3).map((n) => parseFloat(n));
}
function percentile(sorted, p) {
  if (sorted.length === 0) return null;
  const idx = Math.min(sorted.length - 1, Math.floor((p / 100) * sorted.length));
  return sorted[idx];
}

/* Scrolls one matched element into view, then measures it in place. Returns
 * null for anything that isn't real leaf text worth sampling. */
function scrollAndMeasure({ selector, index }) {
  const el = document.querySelectorAll(selector)[index];
  if (!el) return null;
  el.scrollIntoView({ block: "center", inline: "nearest" });
  const text = el.textContent.trim();
  if (!text) return null;
  const r = el.getBoundingClientRect();
  if (r.width === 0 || r.height === 0) return null;
  const cs = getComputedStyle(el);
  const fontSize = parseFloat(cs.fontSize);
  if (r.height < fontSize * 1.15) return null;
  return {
    rect: { x: r.x, y: r.y, width: r.width, height: r.height },
    color: cs.color,
    fontSize,
    fontWeight: cs.fontWeight,
    textPreview: text.slice(0, 30),
  };
}

/* Runs in a throwaway page: draw a PNG data URL into a canvas and sample
 * pixels at the given [x, y] points, clipped to image bounds. */
async function samplePixels(page, dataUrl, points) {
  return page.evaluate(
    async ({ dataUrl, points }) => {
      const img = new Image();
      await new Promise((res, rej) => {
        img.onload = res;
        img.onerror = rej;
        img.src = dataUrl;
      });
      const c = document.createElement("canvas");
      c.width = img.width;
      c.height = img.height;
      const ctx = c.getContext("2d");
      ctx.drawImage(img, 0, 0);
      return points.map(([x, y]) => {
        const xi = Math.max(0, Math.min(img.width - 1, Math.round(x)));
        const yi = Math.max(0, Math.min(img.height - 1, Math.round(y)));
        const d = ctx.getImageData(xi, yi, 1, 1).data;
        return [d[0], d[1], d[2]];
      });
    },
    { dataUrl, points },
  );
}

async function measureContext(browser, ctxDef, theme) {
  const results = [];
  const bctx = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 1,
    isMobile: true,
    hasTouch: true,
    reducedMotion: "reduce",
  });
  await bctx.addInitScript((t) => localStorage.setItem("theme", t), theme);
  const page = await bctx.newPage();
  await page.goto(BASE + ctxDef.route, { waitUntil: "load" });
  await sleep(700);
  if (ctxDef.openMenu) {
    await page.click(".shell__mark");
    await sleep(500);
  }

  const helper = await bctx.newPage();
  await helper.setContent("<!doctype html><title>sampler</title>");

  for (const selector of ctxDef.selectors) {
    const count = await page.evaluate((s) => document.querySelectorAll(s).length, selector);
    for (let index = 0; index < count; index++) {
      const c = await page.evaluate(scrollAndMeasure, { selector, index });
      if (!c) continue;
      await sleep(120);
      // scrollIntoView can settle the box a few px off from the measurement above.
      const refreshed = await page.evaluate(
        ({ selector, index }) => {
          const el = document.querySelectorAll(selector)[index];
          const r = el.getBoundingClientRect();
          return { x: r.x, y: r.y, width: r.width, height: r.height };
        },
        { selector, index },
      );
      c.rect = refreshed;
      const buf = await page.screenshot({ clip: { x: 0, y: 0, width: 390, height: 844 } });
      const dataUrl = "data:image/png;base64," + buf.toString("base64");
      const topY = c.rect.y + 1;
      const botY = c.rect.y + c.rect.height - 2;
      const xs = [0.1, 0.3, 0.5, 0.7, 0.9].map((f) => c.rect.x + f * c.rect.width);
      const points = [...xs.map((x) => [x, topY]), ...xs.map((x) => [x, botY])];
      const pixels = await samplePixels(helper, dataUrl, points);
      const textColor = parseColor(c.color);
      const kept = pixels.filter((p) => rgbDist(p, textColor) > 60);
      if (kept.length === 0) continue;
      const ratios = kept.map((p) => ratio(textColor, p)).sort((a, b) => a - b);
      const isLarge = c.fontSize >= 24 || (c.fontSize >= 18.66 && parseInt(c.fontWeight) >= 700);
      const floor = isLarge ? 3.0 : 4.5;
      const p20 = percentile(ratios, 20);
      const median = percentile(ratios, 50);
      const min = ratios[0];
      results.push({
        selector,
        text: c.textPreview,
        fontSize: c.fontSize,
        fontWeight: c.fontWeight,
        isLarge,
        min: +min.toFixed(2),
        p20: +p20.toFixed(2),
        median: +median.toFixed(2),
        floor,
        pass: p20 >= floor,
      });
    }
  }
  await helper.close();
  await bctx.close();
  return results;
}

async function main() {
  const exe = findHeadlessShell();
  const browser = await chromium.launch(exe ? { executablePath: exe } : {});
  const all = {};
  let anyFail = false;
  const lines = [];

  for (const ctxDef of CONTEXTS) {
    for (const theme of THEMES) {
      const key = `${ctxDef.label}-${theme}`;
      const results = await measureContext(browser, ctxDef, theme);
      all[key] = results;
      const fails = results.filter((r) => !r.pass);
      if (fails.length) anyFail = true;
      lines.push(`== ${key} (${results.length} elements sampled) ==`);
      for (const r of results) {
        lines.push(
          `  ${r.pass ? "PASS" : "FAIL"} ${r.selector} "${r.text}" ${r.fontSize}px/${r.fontWeight}` +
            `${r.isLarge ? " (large)" : ""}  min ${r.min}  p20 ${r.p20}  median ${r.median}  floor ${r.floor}`,
        );
      }
      console.error("done", key);
    }
  }

  fs.writeFileSync(path.join(OUT, `${LABEL}contrast.json`), JSON.stringify(all, null, 2));
  fs.writeFileSync(path.join(OUT, `${LABEL}contrast.txt`), lines.join("\n"));
  await browser.close();
  console.log(lines.join("\n"));
  console.log(`\n${anyFail ? "FAIL: at least one run under its floor" : "PASS: every run at or above its floor"}`);
  console.log(`wrote ${OUT}`);
  process.exit(anyFail ? 1 : 0);
}

main();
