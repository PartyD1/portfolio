# PR 10: performance on phones

Branch: `mobile/10-performance`. Size: M. Motion skill: no. `/polish`: yes (it touches surfaces). Real device: **yes, before and after** (the emulator cannot measure a phone's compositor).

Depends on PRs 02 to 09 merged (measure the final layout, not an intermediate one). Decision: **D7** (measure first; drop only redundant blur unconditionally; trim radius and `saturate()` only if a device drops frames).

## 1. What the phone is asked to do today

| | Value | Source |
|---|---|---|
| `backdrop-filter` surfaces on the homepage | about 25 (7 cards, the About pills, the timeline cards and pills, the live pill, the mark, the toggle, the ring, the footer pill) | audit 2026-09-03; the harness will count them once the CSSOM read is fixed (see section 3) |
| Card blur | `blur(24px) saturate(1.4)` | `globals.css` |
| The wash | four 76 to 84vw SVG blobs with gradients and a clip, a radial veil, a 128px grain tile at `mix-blend-mode: multiply` (light) / `screen` (dark); **static on phones** (drift off under 760, no spotlight on touch) | `globals.css`, `Wash.tsx` |
| JS, first load | 107 kB gz on `/`, 113 kB on a case study | `next build` |
| CSS | 82 kB raw (about 14 kB gz) | `.next/static/css` |
| Fonts | nine woff2 files in the build (two preloaded, 51 kB and 35 kB; one 118 kB file not preloaded); `display: swap`; the typewriter waits for `document.fonts.ready` | `.next/static/media` |
| Images | `next/image` WebP, 13 to 65 kB, lazy, `sizes` correct after PR 08 | audit |
| Scroll-driven work | the hero recede (view timeline), the Reveal observers, the scroll ring's rAF | code |

The static wash is the important fact: because nothing in it moves on a phone, the compositor can rasterise the ground once. What it cannot cache is every blurred card re-sampling that ground as it scrolls. That is where a phone spends its frames, and it is what this PR measures.

## 2. Measurement protocol (do this first, then again at the end)

### 2.1 Headless, repeatable

Extend `scripts/mobile-capture.mjs` with `--vitals`:

- CDP `Emulation.setCPUThrottlingRate` 4 and `Network.emulateNetworkConditions` (4G: 9 Mbps down, 170 ms RTT).
- A `PerformanceObserver` installed by `addInitScript` for `largest-contentful-paint` (element and time), `layout-shift` (CLS sum, excluding those with `hadRecentInput`), and `longtask` (count and longest).
- Report per route at 390: LCP ms and element, CLS, long tasks, plus the `backdrop-filter` count.

Budgets: LCP under 2,000 ms; CLS 0.00; no long task over 100 ms after load; at most one during load.

### 2.2 The device (the one that matters)

On an iPhone (Safari 17 or later), on the Vercel preview:

1. Web Inspector, Timelines, Rendering Frames. Record while flicking through the Work grid twice, then through a case-study flow.
2. Note the frame rate and the share of time in Composite. Anything under 60 fps sustained, or a Composite share over half, is the signal to apply section 4.
3. Repeat with section 4 applied.

On an Android (Chrome), Performance panel with 4x CPU throttling, the same two scrolls; look at the Frames track and Long tasks.

Write the numbers into the PR body. Without them the gated changes in section 4 do not ship.

## 3. The premise changed on 2026-09-05

Until PR 00b lands, Chromium draws **no** backdrop blur on this site (the production CSS keeps only the prefixed declaration; see `pr-00b-glass-in-chromium.md`). Every Chrome and Android Chrome visitor has been getting the translucent fills with no filter cost at all, and the harness's blur count reads 0 for that reason, not because of a CSSOM quirk. This PR's measurements are taken **after** 00b, when Chromium pays for every one of the 25 surfaces for the first time, which is exactly why the budget below matters. Safari has been paying all along.

## 4. The blur budget

**The rule: a surface blurs only when it sits directly on the wash.** A pill on a card, a chip on a pill, a tile on a panel re-samples a backdrop that is already blurred, for no legible gain.

| Surface | On | Phones | Count on `/` |
|---|---|---|---|
| `.card` x7 | the wash | keep | 7 |
| `.timeline__card` x3 | the wash | keep | 3 |
| `.timeline__project`, `.timeline__project-mark` | a card | drop | 0 |
| `.pill` (About x4) | the wash, but 14px text on a 74% fill | drop | 0 |
| `.footer__line` | the wash, 14px on the same fill | drop | 0 |
| `.live-link`, `.card__repo`, `.card__cue` | a card | drop | 0 |
| `.shell__mark`, `.theme-toggle`, `.scroll-ring` | float over scrolling content | keep | 3 |
| `.case__headline` | the wash | keep | (case) |
| `.tech__item` | the headline panel | dropped in PR 06 | (case) |
| `.flow__node`, `.flow__bus` | the wash | keep | (case) |
| `.flow__branch` | a node | dropped in PR 07 | (case) |
| `.shots__expand` | the opaque well | drop | (case) |
| `.shots__dialog-close` | the screenshot | keep | (case) |
| `.menu` | the page | keep | (open only) |
| `.menu__foot-row a` | the sheet | none by design in PR 04 | 0 |

Homepage after: **13** surfaces (from about 25). Unconditional; ship it regardless of the measurement.

```css
@media (max-width: 760px) {
  /* Glass on glass is an edge and a fill, not a second filter. */
  .timeline__project,
  .timeline__project-mark,
  .pill,
  .footer__line,
  .live-link,
  .card__repo,
  .card__cue,
  .shots__expand {
    -webkit-backdrop-filter: none;
    backdrop-filter: none;
  }
}
```

`--glass-raised` is 74% white in light and 78% ground-tint in dark: the About pills and the footer pill lose nothing legible. PR 11 re-measures them anyway.

### 4.1 Gated: radius and saturation

Only if section 2.2 shows the frame rate under 60 or Composite over half:

```css
@media (max-width: 760px) {
  /* GATED on the device measurement in pr-10-performance.md section 2.2:
   * a 16px blur re-samples 44% fewer pixels than a 24px one, and the
   * saturate() pass is a second full-surface operation the eye cannot find
   * on a 6 inch screen. */
  .card,
  .timeline__card,
  .flow__node,
  .flow__bus,
  .case__headline {
    -webkit-backdrop-filter: blur(16px);
    backdrop-filter: blur(16px);
  }
}
```

If that is not enough, the next lever is `--blob-opacity` under 760 (a dimmer ground needs less blur to be legible; 0.86 to 0.78 light, 0.5 to 0.44 dark), and only then the card blur to 12px. Never remove the blur from a surface that sits on the wash: The Blur-Is-Legibility Rule.

### 4.2 The grain

Leave it. The wash is static on phones, so the blend composites once; measure the wash's paint events in the Safari timeline to confirm nothing re-rasterises the ground on scroll. If it does (it should not), the cause is elsewhere in the wash, not the grain.

## 5. Below-the-fold rendering

```css
@media (max-width: 760px) {
  /* The phone's first paint is the fold; everything below it is laid out
   * lazily as it approaches. contain-intrinsic-size keeps the document
   * height (and the scroll ring's progress) stable before a section renders. */
  .section--exp,
  #about,
  .contact,
  .case__section,
  .shots,
  .case__foot {
    content-visibility: auto;
    contain-intrinsic-size: auto 600px;
  }
}
```

Two checks before this ships: `Reveal` inside a skipped section still fires (the observer sees the section's placeholder box, then the real one; scroll once and confirm every `[data-reveal]` reaches `in`), and `/#about` from the menu lands on the section (browsers render the target on navigation). CLS must stay 0.00 through a full scroll with `--vitals`.

## 6. Fonts

Measure, then decide:

1. On a phone, Network panel: which of the nine woff2 files load on `/`? Record names and sizes.
2. If the 118 kB file is Unbounded's variable latin face and it loads on `/`, add `weight: ["400", "700"]` to the `Unbounded()` call in `app/layout.tsx` (the site uses exactly those two) and re-measure: two static instances are typically about 30 kB each.
3. Keep `display: "swap"`: the display face is the identity, and the typewriter already waits for it.

## 7. Things checked and left alone

- JavaScript: 107 kB gz is the framework floor; `Spotlight` and `FlowGlow` bail on touch in their first line; `ScrollScrub` returns where `animation-timeline` exists; `Slideshow` is 7 kB and only on case studies. Nothing to cut.
- Images: correct `sizes`, lazy at the foot, WebP. The source PNGs (0.3 to 1.3 MB) only cost repo size (audit P3-15); compress them when the next screenshot is added, not here.
- `will-change`: only on the blobs, and only under the motion preference on desktop.
- `scroll-behavior: smooth` on `html` for anchor jumps: the engine's curve, accepted since day one for anchors.

## 8. Gate

- [ ] Section 2 numbers, before and after, in the PR body (headless LCP / CLS / long tasks at 390 with 4x CPU and 4G; device fps for the two scrolls).
- [ ] Harness `blur` count at 390 on `/`: 13; on `/work/santaclaws`: the headline, five nodes, the bus, the three fixed controls.
- [ ] Section 4.1 applied only if the device numbers demanded it, and said so.
- [ ] `--vitals`: CLS 0.00 on every route with section 5 on; every `[data-reveal]` reaches `in` after one scroll; `/#about` lands.
- [ ] Fonts: the measured list, and the weight change only if it measured smaller.
- [ ] Contrast spot-check on the About pills and the footer pill without blur (both themes); the full re-measure is PR 11.
- [ ] Desktop 1440 identical to baseline (every rule here is under 760 or is the harness).

Commit title: `Performance on phones: blur only on the wash, lazy sections below the fold`.
