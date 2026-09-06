# Mobile overhaul: the plan

**Status: PLAN. No UI code has been written.** The one thing this PR ships beside the documents is the capture harness (`scripts/mobile-capture.mjs`) and the baseline it produced, because every PR below verifies itself with it.

Written 2026-09-05 against `origin/main` at `4319731` (PR #30). Measured, not guessed: every number in these documents comes from a production build of that commit served to headless Chromium with mobile emulation on (`isMobile`, `hasTouch`, so `pointer: coarse` and `hover: none` match, exactly as on a phone). The captures and the metrics file live in `.impeccable/review/mobile-baseline-2026-09-05/`.

## The goal, in one line

A recruiter who opens this site on a phone should meet a headline, not a caption; should know a card opens; should reach the work in one thumb-flick; should be able to close the menu; and should never wait on a frame. Same world, same rules, rethought for the hand instead of scaled down from the desk.

## Found on the way: Chrome has no glass

Measuring the phone build surfaced a production bug that is not phone-specific: the production stylesheet carries only `-webkit-backdrop-filter` for every glass rule (the standard `backdrop-filter` is dropped by Tailwind's production optimizer because the source writes it first), and Chromium does not read the prefixed form. **Desktop Chrome, Edge and Android Chrome have rendered no frosted glass since the glass shipped on 2026-09-01; the dev server shows it, production does not; Safari is unaffected.** The fix is a verified reorder of 13 declaration pairs: `pr-00b-glass-in-chromium.md`. It ships first, because every blur measurement in this plan depends on Chromium actually drawing blur.

## What the phone shows today (390 x 844, light, the baseline)

| Measured | Today | Where it is fixed |
|---|---|---|
| Hero headline (desktop is 64px) | **23px**, one line; 19px at 320 | PR 02 |
| Typewriter descriptor | 14px | PR 02 |
| Empty ground above and below the hero text | about 200px each way; "WORK" enters the fold at y=690 | PR 02 |
| Tappable things in the fold | **none** (the two arrow links came off in PR #31) | PR 02 |
| Visible sign that a card opens a case study | **none** since PR #28; touch has no hover | PR 03 |
| Standard card tagline column | 183px wide beside a 102px mark, taglines run 6 lines | PR 03 |
| Card heights | 275 to 398px; the flagship 491px | PR 03 |
| Homepage length | 6,077px = **7.2 screens** (11.8 screens at 320) | PR 02, 03, 05 |
| Work section alone | 2,772px = 3.3 screens | PR 03 |
| Closing the menu on a phone | only a **47px overlay strip**; the sheet covers the PD mark; keycaps 1 to 4 shown; foot links 21px tall | PR 04 |
| Smallest text | 13px (pills, flow branches, slide count) | PR 01 |
| Santa Claws tech tiles | 11 tiles in 6 rows; header panel 721px tall | PR 06 |
| Flow diagram (Operations Agent) | 5 stacked glass cards + 30px arrows, 1,179px | PR 07 |
| Slideshow dots | 24px targets; next slide invisible until swiped | PR 08 |
| Email on the homepage | 5,700px down, 6.8 screens | PR 04, 05 |
| Ambient motion on phones | none (drift off, no spotlight); only the caret blinks | PR 09 (kept quiet, on purpose) |
| Backdrop-blur surfaces on the homepage | about 25, plus a multiply-blend grain layer over a fixed wash | PR 10 |
| Theme default | light, regardless of the phone's dark setting; `theme-color` follows the OS, not the toggle | PR 11 |
| Safe areas | no `viewport-fit=cover`, no `env()` insets anywhere | PR 01 |
| Horizontal overflow | none at 320, 360, 390, 430 (good) | keep it that way |
| Touch targets under 44px | slideshow dots (24), menu foot links (21 tall) | PR 01 |

The four sheets in the baseline folder (`home-390-light-sheet.png`, `home-390-dark-sheet.png`, `ops-390-light-sheet.png`, `scorely-390-light-sheet.png`) are the whole page as a phone sees it, one screen per column. Look at them once before starting any PR.

## Decisions

Four were made by Parth on 2026-09-05. The rest are **recommended defaults, stated so they can be flipped**; each PR document names the decision it depends on, so flipping one is a bounded change.

| # | Decision | Choice | Status |
|---|---|---|---|
| D1 | Hero headline on phones | **Two lines**: `HEY, I'M` above `PARTH DOSHI`, the name at `clamp(28px, 10vw, 44px)` (39px at 390, 32px at 320, 43px at 430). The typewriter scales with it. | **Parth** |
| D2 | The fold | **The flagship card peeks in.** The hero shrinks to its content, sits low on the screen, and the fold ends with the WORK label and the top of the flagship card. A small drawn scroll cue under the facts, once. | **Parth** |
| D3 | Card tap affordance | **Corner arrow, phones only**: a drawn arrow in a 48px glass circle at the card's bottom-right, gated on `(hover: none)`. Desktop unchanged. | **Parth** |
| D4 | Card layout on phones | **Text full width, mark as a chip**: a 60px glass chip beside the name; the tagline runs the full column. The flagship keeps a (smaller) mark band, because it is the one illustrated card. | **Parth** |
| D5 | Phone navigation | **Bottom sheet** on phones: opens from the bottom edge, a 44px close pill, 56px link rows, keycaps hidden on touch, the email first in the foot. Desktop keeps the left drawer. | Assumed |
| D6 | Ambient motion on phones | **Quiet stays quiet.** No blob drift, no spotlight. The budget goes to press feedback, the sheet, the slideshow and the scroll-linked moments. One optional scroll-linked wash parallax, behind a measurement gate. | Assumed |
| D7 | Glass on phones | **Measure first, trim if it janks.** Blur is dropped only where it is redundant (a blurred pill on an already-blurred panel) regardless; radius and `saturate()` are reduced only if a real device drops frames. | Assumed |
| D8 | Theme default | **Follow the phone's setting** (`defaultTheme="system"`); the toggle still overrides and persists. This is the one assumption that also changes desktop behaviour, and PR 11 isolates it in its own commit. | Assumed |
| D9 | Tech tiles on case-study headers | **Denser wrap**: 18px marks, 14px names, tighter padding, 6px gaps, so 11 tiles fit in 4 rows. Nothing hidden. | Assumed |
| D10 | Flow diagram on phones | **Rail-and-node stepper**: the timeline's own vocabulary (one gradient rail, numbered nodes on it), branches as wrapping chips. About 35% shorter and reads as a diagram, not a stack of cards. | Assumed |
| D11 | Screens slideshow on phones | **Peek the next slide** (88% wide slides bleeding to the viewport edge); tall full-page captures keep the top crop and gain tap-to-expand into a native `<dialog>`. | Assumed |
| D12 | A persistent email control on phones | **No.** Parth has removed every piece of floating chrome offered so far (status pill, subline, CTA links, card labels, taxonomy pills). The thumb-reachable path to email is the bottom sheet, where the address is the first and loudest foot item. | Assumed, deliberately conservative |
| D13 | Tapping the email | **`mailto:` plus a copy control** beside the address in Contact and the case-study foot, because many phones have no mail client configured. Shipped as its own commit inside PR 05 so it can be dropped in review. | Assumed |
| D14 | Devices | **iPhone Safari first, Android Chrome second.** Automated gates run in headless Chromium with mobile emulation; a short real-device checklist (Safari-only behaviours) closes each PR that touches glass, motion or the sheet. | Assumed |
| D15 | Tablets | **Phones only** (760px and under). Every gate includes one 768px capture to prove nothing regressed above the phone breakpoint; tablet layout itself is out of scope. | Assumed |

## The rules every PR inherits

These come from `CLAUDE.md`, `DESIGN.md`, `PRODUCT.md` and the surface briefs; they are restated here because a mobile pass is where they are easiest to break by accident.

1. **Same world.** Lavender ground, iridescent blobs, grain, Unbounded caps, one coral accent, glass everywhere, both themes first-class. A phone-only value must exist in both themes or it is a bug.
2. **Nothing is inferred and nothing is a placeholder.** No new copy claims, no "coming soon", no invented facts. Layout changes only.
3. **Px-bound display clamps.** Every bound of a display `clamp()` is in px, never rem, so 200% text cannot overflow a phone. The plan re-asserts this at a 20px root font in every gate.
4. **Motion through `emil-design-eng`.** Load the skill before writing any motion code. Only `transform`/`opacity` animate; nothing enters from `scale(0)`; exits faster than entrances; transitions for anything interruptible; every pressable has `:active { scale(0.97) }` (0.98 on large surfaces) **outside** the hover guard; hover rules stay behind `(hover: hover) and (pointer: fine)`; reduced motion means fewer and gentler, never none; no motion library.
5. **`svh`, never `vh` or `dvh`.**
6. **`translate:`/`scale:` for scroll-driven animation, `transform:` for interaction**, so the two compose.
7. **Blocked content ships by absence.** A phone layout may reorder or resize; it may not hide a fact.
8. **`/polish` before every push** of a frontend change, and the findings fixed in the same push. Then `npm run build` and the detector (`node /Users/ParthDoshi/csProjects/portfolio/.claude/skills/impeccable/scripts/detect.mjs app components data`, absolute path because the skill directory is untracked in a worktree).
9. **Never push onto a merged PR's branch.** Each PR here branches from `origin/main` (see `SEQUENCE.md`).
10. **No Playwright in `package.json`.** The harness uses `playwright-core` installed with `--no-save` in the worktree and the cached headless shell.
11. **No em dashes** in visible copy or in these documents' copy suggestions.

## What this plan refuses

- A horizontal carousel for the project cards. It hides six of seven entry points behind a gesture a recruiter may never make. The cards get shorter instead.
- Collapsing or truncating any tagline, bullet, or ownership sentence. Length is solved by layout, not by hiding.
- A floating email pill or sticky bar (D12).
- A separate mobile component tree. Every change is CSS under one phone breakpoint plus a handful of markup additions that render on every device and are shown or hidden by capability queries.
- New accents, new radii, new shadows, new fonts.
- Re-introducing the tilt, the spotlight, or the blob drift on touch.

## How to read this

Start with **`SEQUENCE.md`**: the PR order, branch posture, the verification matrix and gates, and the risk register. Then open the numbered document for the PR you are about to build. Each one is written to be executed alone in a fresh session with nothing else loaded: it names the files, the exact values, the markup, the motion decisions, the accessibility checks, and the gate that must pass before `/polish` and the push.

| File | PR | Covers | Size |
|---|---|---|---|
| `SEQUENCE.md` | | Order, dependencies, gates, matrix, risks, budget | |
| `pr-00-harness.md` | 00 | The capture harness and the baseline (**shipped with this plan**) | S |
| `pr-00b-glass-in-chromium.md` | 00b | **Ship first.** The production CSS drops `backdrop-filter`; Chromium renders no glass. A verified 13-pair reorder | XS |
| `pr-01-foundations.md` | 01 | Safe areas, tap behaviour, breakpoints, the phone type ramp, 44px targets, reduced transparency | M |
| `pr-02-hero-and-fold.md` | 02 | Two-line headline, the low-set hero, the card peek, the scroll cue, the recede on phones | M |
| `pr-03-work-cards.md` | 03 | Chip layout, corner arrow, flagship band, heights, the unveil on phones | L |
| `pr-04-navigation.md` | 04 | Bottom sheet, close pill, link rows, foot, shell insets | L |
| `pr-05-experience-about-contact.md` | 05 | Timeline, About, Contact, email copy control, footer, scroll ring | M |
| `pr-06-case-study-header.md` | 06 | Title scale, tagline, denser tech tiles, meta, the panel's recede | M |
| `pr-07-flow-stepper.md` | 07 | The rail-and-node diagram on phones | L |
| `pr-08-sections-and-slideshow.md` | 08 | Section rhythm, bullets, slide peek, dots, tall-capture expand, the case foot | L |
| `pr-09-motion.md` | 09 | Press states, sheet motion, reveal tuning, recede/unveil on phones, slideshow feel, the optional wash parallax | M |
| `pr-10-performance.md` | 10 | Measurement protocol, blur budget, grain, content-visibility, images, fonts | M |
| `pr-11-theme-and-a11y.md` | 11 | System theme, theme-color sync, dark contrast at 390, VoiceOver pass, 200% text, landscape, 280px | M |
| `pr-12-records.md` | 12 | DESIGN.md regeneration, CLAUDE.md, surface briefs, refreshed capture set | S |

Sizes: S is a short session, M is one focused session, L is one long session or two short ones. Nothing here needs more than that, which is the point of splitting it.

## Targets (the "after" the last PR is measured against)

| Metric at 390 wide | Baseline | Target |
|---|---|---|
| Hero name size | 23px | 39px on its own line |
| Typewriter | 14px | 22px |
| Tappable in the fold | 0 | the flagship card (its top edge visible) |
| Standard card height | 275 to 398px | 250px or less (285 for the one card with a live pill and a usage line) |
| Flagship card height | 491px | 480px or less, with its mark as a cover band |
| Work section | 2,772px | 2,200px or less (the arithmetic is in `pr-03-work-cards.md`; dropping the flagship's band would buy another 150px) |
| Homepage | 7.2 screens | 6.5 screens or fewer |
| Menu close target | 47px strip | 44px pill plus the whole overlay |
| Menu foot link height | 21px | 44px or more |
| Smallest text | 13px | 14px |
| Santa Claws tile rows | 6 | 4 or fewer |
| Flow height (Operations Agent) | 1,179px | 800px or less |
| Frosted glass in Chromium | none (production CSS keeps only the prefixed declaration) | present, every glass rule, both forms in the built CSS |
| Backdrop-filter surfaces (homepage) | about 25 in the source; 0 drawn in Chromium | 13 on phones (the seven cards, the three timeline cards, the three fixed controls), all drawn |
| Slideshow dot target | 24px | 44px tall |
| Safe-area aware fixed chrome | 0 of 3 | 3 of 3 (shell, ring, sheet) |
| Theme default | light | system |
| Horizontal overflow at 280 to 430 | 0 | 0 |
| Text contrast (composited, both themes) | worst 4.51:1 | every run 4.5:1 or better, re-measured after the layout moves |
