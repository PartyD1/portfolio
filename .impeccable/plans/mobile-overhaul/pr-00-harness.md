# PR 00: the capture harness and the phone baseline

**Shipped with the plan.** `scripts/mobile-capture.mjs` and `.impeccable/review/mobile-baseline-2026-09-05/` are in the same PR as these documents. This file explains how to run it and how to read what it prints, so every later PR can verify itself in one command.

Branch: `mobile/00-harness` (already the plan's branch). Size: S. Motion skill: no. `/polish`: not needed (no UI change).

## 1. What it does

For each route x viewport x theme it:

1. Loads the production build with **mobile emulation on** (`isMobile`, `hasTouch`), so `pointer: coarse` and `hover: none` match like a phone, and the page's `@media (pointer: coarse)` rules apply.
2. Seeds the theme through `localStorage.theme` (the site's `ThemeProvider` uses `defaultTheme="light"`, so Playwright's `colorScheme` alone does not switch it; see the memory note `visual-verification-playwright`).
3. Scrolls the whole page once so every `Reveal` fires, returns to the top, then captures the fold at 2x and one screenshot per viewport-height "screen" at 1x, stitched into a contact sheet (`<route>-<width>-<theme>-sheet.png`) so a whole route reads left to right in one image.
4. Measures, in the light theme at each width, and writes `metrics.json`:
   - document height and screens (`docH / innerHeight`), horizontal overflow,
   - computed `font-size` / `line-height` / weight / box for a fixed selector list (the phone type ramp),
   - every interactive target with its box, the ones under 44px, the ones under 24px, and the zero-size ones,
   - the count of `backdrop-filter` surfaces, the running animations, the section offsets, each card's height and mark size,
   - elements wider than the viewport, the fixed chrome positions, the images and their `loading` / `fetchpriority`.
5. Optionally (`--menu`) opens the sheet and measures its links and foot; (`--motion`) reloads with motion on and reports the running animations at rest plus the hero's `recede` state at 300px scroll; (`--root20`) repeats the matrix at a simulated 20px root font.
6. Prints a markdown summary with PASS / WARN / FAIL lines for the shared gates in `SEQUENCE.md` section 5.

## 2. Running it

```bash
# in the worktree, once per worktree; leaves package.json and the lockfile alone
npm install --no-save --no-audit --no-fund playwright-core@1.62

npm run build
npx next start -p 3111 &        # restart this after EVERY build (a running server keeps its old BUILD_ID)

node scripts/mobile-capture.mjs                       # the default matrix
node scripts/mobile-capture.mjs --routes / --widths 390,320 --themes light --menu --motion
node scripts/mobile-capture.mjs --label after- --out .impeccable/review/mobile-after
node scripts/mobile-capture.mjs --root20              # the 200%-text pass
```

Options: `--port` (3111), `--out` (default `.impeccable/review/mobile`), `--routes` (comma list, default the four), `--widths` (default `390,320,360,430`), `--themes` (default `light,dark`), `--landscape` (adds 844x390 for the first route), `--tablet` (adds 768x1024), `--no-segments`, `--no-sheet`, `--menu`, `--motion`, `--root20`, `--label <prefix>`.

The browser: `chromium.launch()` resolves the cached `chromium_headless_shell-1234` for `playwright-core@1.62`. If the cache moves, set `PW_EXE=/path/to/chrome-headless-shell`.

Do not add Playwright to `package.json` (CLAUDE.md). Do not run it from the main checkout (`.next` there belongs to the dev server).

## 3. Reading the summary

```
== / 390x844 light ==
docH 6077  screens 7.2  hOverflow 0  blur 25  anims [blink]
PASS overflow      hOverflow=0
FAIL text-floor    .pill 13px, .flow__branch 13px, .shots__count 13px   (< 14px)
WARN targets<44    button.shots__dot 24x24 (x2)
PASS targets<24    none
PASS zero-size     a.card__hit x7 (the full-card overlay; expected)
cards  flagship 491h | 375h | 316h | 295h | 398h | 316h | 275h
type   .hero__title 23px/27.2 700 | .hero__role 14px | .section__title 32px | ...
```

`a.card__hit` reports 0x0 by design (its `::after` is the whole card); it is listed so a future change that breaks the overlay is visible. Everything else at 0x0 is a bug.

`blur` reads **0** on the current site. That is not a harness fault: the production CSS carries only the prefixed `-webkit-backdrop-filter`, which Chromium ignores, so no element has a computed `backdrop-filter` (see `pr-00b-glass-in-chromium.md`). After PR 00b the count is real (about 25 on `/` at 390 before PR 10's budget, 13 after).

## 4. The baseline

`.impeccable/review/mobile-baseline-2026-09-05/` holds the captures every PR document quotes: four 390 sheets (home light and dark, Operations Agent, ScorelyAI, Santa Claws), the 320 home sheet, the 390 and 320 home folds, the open menu at 390, the Santa Claws header at 390, one Operations Agent flow screen, and `metrics.json`.

Before/after in a PR body: run with `--label after-` into a separate `--out`, then quote the two summaries. Do not commit the after-set; PR 12 refreshes the review folder once.

## 5. Gate for this PR

- The script runs against the current `origin/main` and reproduces the baseline numbers in `README.md` (docH 6077 at 390, hero title 23px, 0 overflow).
- `npm run build` still passes (no code under `app/`, `components/`, `data/` changed).
- The script is under `scripts/`, imports `playwright-core` only, and has no runtime argument that is computed by another process.
