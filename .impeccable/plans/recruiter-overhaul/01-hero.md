# Hero Recomposition — Final Design

**Dimension owner:** hero (`components/Hero.tsx`, `components/RoleRoll.tsx`, `app/globals.css` hero + rolling-phrase + status blocks)
**Status:** definitive. Implement exactly as written.

---

## 0. The root cause, restated so the fix is obvious

The headline's line 2 — `AND I'M` + the reserved slot + the caret — is a **21.006em unbreakable run** of uppercase Unbounded. The type size is `clamp(1.75rem, 5.1vw, 4rem)`. `21.006 × 0.051 = 1.071`. The line is wider than the viewport by construction across the entire fluid range and clears the `4rem` cap only above ~1384px. This is arithmetic, not wrapping.

The fix is to stop deriving the type size from the viewport and derive it from **the width the line is actually given**, using container query units on a real 1140 column. Then the fit is a property of the layout, not a coincidence of two independent scales.

Four moves, in dependency order:

1. **Left-align the hero into a real 1140 column.** The anchor becomes geometric (the lead's left edge *is* the column's left edge) instead of being held by a hidden sizer against a re-centring line.
2. **Fit-to-width type in `cqi`, with the old clamp preserved as the `@supports` fallback**, and with the roll line's size *derived from* the name line's size by a fixed ratio so the two lines are exactly the same rendered width at every viewport.
3. **Two compositions, one breakpoint (720px).** Wide: two lines. Narrow: four lines, the phrase reserved at two lines of height at the name's scale rather than crushed onto one line at a third of it.
4. **Fix the slot's two structural defects**: reserve the caret on the sizer so the track stops growing, and resolve the widest phrase by *measurement* (all phrases stacked in one grid cell) instead of `String.length`.

The typewriter message, phrase list, timings, modes, hover-pause, click-to-advance, pre-hydration behaviour, reduced-motion clock and the `.visually-hidden` readable sentence are untouched.

---

## 1. Measured constants and every derived number

All figures from the survey's fontTools measurement of the bundled `Unbounded VF` at `letter-spacing: 0.005em`, all-caps, at the weights the cascade applies. Treat every em figure as ±2% (Unbounded ships `kern`).

| run | weight | width |
|---|---|---|
| `HEY, I'M` | 400 | 4.847em |
| inter-word space | 700 | 0.253em |
| `PARTH DOSHI` | 700 | 8.697em |
| **wide line 1** | | **13.797em** |
| `AND I'M` | 400 | 4.766em |
| flex `column-gap` | — | 0.260em |
| `A COMPUTER SCIENTIST.` | 700 | 15.860em |
| caret (0.06em box + 0.06em margin) | — | 0.120em |
| **wide line 2** | | **21.006em** |

Per-phrase widths (needed for the narrow composition): `A MENTOR.` 7.183 · `AN ATHLETE.` 8.413 · `A DEVELOPER.` 9.199 · `A RESEARCHER.` 10.173 · `OBSESSED WITH AI.` 12.537 · `A COMPUTER SCIENTIST.` 15.860. Longest single wrap unit: `A COMPUTER` 8.543, `SCIENTIST.` 7.065.

### Derived constants

| constant | value | derivation |
|---|---|---|
| **wide divisor** `D_wide` | **15.0** | 13.797em ÷ 15.0 → line occupies **92.0%** of the column. 8% slack absorbs the ±2% kern band *and* the `@supports (-webkit-text-stroke)` fallback, which sets the outlined leads at 700 instead of 400 (≈ +0.29em on each lead → worst case 95.8% of column). |
| **wide roll ratio** `R_wide` | **0.6568** | 13.797 ÷ 21.006. This makes wide line 2's rendered width **identical to line 1's at every viewport**, by construction. |
| **wide cap** | **4.5rem (72px)** | Already the largest step in the ramp (`.contact__title` is `clamp(2.25rem, 6.5vw, 4.5rem)`). At the 1140 column both lines measure **993px = 87% of the column**, so the hero headline spans the measure rather than sitting as a fragment in the left third. |
| **narrow divisor** `D_narrow` | **9.2** | Governed by `PARTH DOSHI` 8.697em → 94.5% of column, 96.4% after kern. |
| **narrow roll ratio** `R_narrow` | **0.852** | Effective divisor 9.2 ÷ 0.852 = **10.80**, governed by the widest *unbreakable* phrase unit `A RESEARCHER.` 10.173em → 94.2% of column, 96.1% after kern. This is what prevents a lone `A` on its own line. |
| **narrow cap** | **2.75rem (44px)** | Chosen so the 720 → 721 name step is +0.87px (44.00 → 44.87), i.e. visually continuous. |

**A `min()` of a rem cap and a `cqi` fit means the cap governs wide viewports and the fit governs narrow ones. Overflow is impossible at any width. It also neutralises the root-font hazard the survey flagged: a visitor at a 20px default gets a 90px cap that simply never wins.**

### Resolved sizes — the full range

Wide (`> 720px`): column `C = min(1140, vw − 48)`; `fit = min(72, C/15)`; name `= fit`; roll `= 0.6568 × fit`; both lines `= 13.797 × fit`.

| vw | column | name px | roll px | line px | line / column |
|---|---|---|---|---|---|
| 721 | 673 | 44.87 | 29.47 | 619 | 92.0% |
| 768 | 720 | 48.00 | 31.53 | 662 | 92.0% |
| 834 | 786 | 52.40 | 34.42 | 723 | 92.0% |
| 1024 | 976 | 65.07 | 42.74 | 898 | 92.0% |
| 1128 | 1080 | 72.00 | 47.29 | 993 | 92.0% |
| 1280 | 1140 | 72.00 | 47.29 | 993 | 87.1% |
| 1366 | 1140 | 72.00 | 47.29 | 993 | 87.1% |
| 1440 | 1140 | 72.00 | 47.29 | 993 | 87.1% |
| 1920 | 1140 | 72.00 | 47.29 | 993 | 87.1% |
| 2560 | 1140 | 72.00 | 47.29 | 993 | 87.1% |

Narrow (`≤ 720px`): column `C = vw − 40`; `fit = min(44, C/9.2)`; name `= fit`; roll `= 0.852 × fit`.

| vw | column | name px | roll px | `PARTH DOSHI` px | widest phrase unit px |
|---|---|---|---|---|---|
| 320 | 280 | 30.43 | 25.93 | 264.6 | 263.8 (`A RESEARCHER.`) |
| 360 | 320 | 34.78 | 29.63 | 302.5 | 301.4 |
| 375 | 335 | 36.41 | 31.02 | 316.6 | 315.6 |
| 390 | 350 | 38.04 | 32.41 | 330.9 | 329.7 |
| 414 | 374 | 40.65 | 34.63 | 353.5 | 352.3 |
| 445–720 | 405–680 | 44.00 | 37.49 | 382.7 | 381.4 |

---

## 2. Decisions

### D1 — Left-align the hero into a 1140 column

`.hero` loses `justify-items: center` and `text-align: center`. A new `.hero__inner` wrapper carries `max-width: 1140px; margin-inline: auto; text-align: left`.

**Why.** Centring is what made the hidden sizer load-bearing: when the line re-centres, holding the longest phrase's width constant is the only way to keep the lead still. Left-aligned, the lead's left edge is the column's left edge and the phrase's first glyph is at a constant `lead + gap` offset — the anchor is pinned by geometry for every phrase, in typing, holding, erasing, and the reduced-motion whole-phrase swap, with no measurement involved. It also kills survey defect #3 (with `A MENTOR.` in a 15.86em slot, the centred line's visible ink sat ~4.3em left of true centre and slid per phrase). Separately, `.hero` today has **no** `max-width` — it is the only content block on the page outside The 1140 Rule. The wrapper fixes that and simultaneously gives `cqi` an exact measure.

**Cost.** Contradicts `DESIGN.md` §Layout (`justify-items: center; text-align: center`) and `.impeccable/surfaces/homepage.md` FIRST VIEWPORT, which literally reads "Centred hero." — the block the Impeccable finish review audits. Both must be updated in the same PR (§7) or the review will fail the corrected hero. One extra DOM node.

### D2 — Fit-to-width type in `cqi`, with the current clamp as the declared fallback

`.hero__title` declares `font-size: clamp(1.75rem, 5.1vw, 4rem)` **first, unconditionally**. Only inside `@supports (container-type: inline-size) and (font-size: 1cqi)` does `.hero__inner` become a container and `.hero__title` switch to the fit scale.

**Why the fallback is mandatory, not defensive.** `font-size` is inherited. A custom property containing `100cqi` parses fine in any engine (custom properties accept almost any token stream), but substituting it into `font-size` is invalid at computed-value time — and for an inherited property, invalid-at-computed-value-time means *inherit*. In an engine without container queries the h1 would fall back to the body's 1.0625rem: a 17px hero headline above the fold with no visible error and no console message. The repo already models the correct pattern one screen away (`.type-outline`, globals.css:239–256: solid fallback declared first, switched inside `@supports (-webkit-text-stroke: 1px currentColor)`, with a comment saying exactly why). Four extra lines; the failure they prevent is total.

The fallback branch renders today's behaviour exactly — including today's three-line break below ~1384px. That is correct: the fallback is *readable and complete*, which is the contract, and no engine in the support matrix (Chrome 105+, Safari 16+, Firefox 110+) is in it.

### D3 — The roll line's size is derived from the name line's, not measured independently

```
--h1-fit:  min(4.5rem, calc(100cqi / 15));
--h1-name: var(--h1-fit);
--h1-roll: calc(var(--h1-fit) * 0.6568);
```

**Why.** The first proposal used two independent divisors (14.5 and 22.0) with two independent caps (4rem and 2.5rem). The reviewer is right that this was wrong on two counts: the claimed "883px and 880px" was arithmetically false (line 2 was 840px at that cap, a 43px mismatch), and the two caps engaged at different container widths (880px vs 928px) so the name/roll ratio drifted across a 48px band.

Deriving the roll from the name with the ratio `13.797 / 21.006 = 0.6568` makes **both lines exactly 92.0% of the column at every fluid width and exactly 993px at the cap** — one cap, one threshold, no drift, and the two-line block is genuinely flush-right-edged rather than asserted to be. The "deliberately justified block" reading is now true by construction instead of by coincidence.

### D4 — Two compositions, switched at 720px

**Wide (> 720px), two lines:**

```
HEY, I'M PARTH DOSHI
AND I'M ▮a computer scientist.
```

**Narrow (≤ 720px), four lines with a two-line reserved slot:**

```
HEY, I'M
PARTH DOSHI
AND I'M
▮a computer
 scientist.
```

Switched entirely by `display: inline-block → block` on three spans and `flex → block` on the roll row. Identical DOM, no JS, no hydration branch.

**Why the lead drops to its own line on narrow.** 21.006em of uppercase Unbounded in a 350px column resolves to 16.7px — below the body step. There is no arrangement that keeps the lead and the slot on one line at a readable display size on a phone.

**Why the phrase then gets a two-line reserved slot instead of being crushed onto one.** This is the reviewer's major finding #6 and it is correct. Reserving the longest phrase on *one* line on narrow forces effective divisor 16.4–16.9, putting the typed phrase at 20.7px at 390px — smaller than every `h2` on the site (`clamp(2rem, 4.4vw, 3.25rem)` floors at **32px** below 727px), smaller than "WORK". The page's one authored moment would be its smallest display type. And the premise forcing it had already been abandoned: once the lead has its own line, the caret no longer shares the lead's baseline anyway, so paying that price and *still* insisting on a single-line reservation buys nothing.

Left-alignment — not the sizer — is what pins the anchor now. So on narrow the slot fills the column, the phrase sets at the name's scale, wraps at word boundaries to at most two lines, and the sizer reserves **two lines of height** so nothing below ever moves. The caret follows the last typed glyph across the line break, which is precisely what a real text field does; the survey's "caret must not cross lines" was written to describe the *centred* design's requirement, and the contract's actual intent (caret adjacent to the typed run, trailing space reading as an empty field) is preserved and arguably strengthened.

**The cost, stated:** five of six phrases occupy one line and leave a constant ~44px empty second line between the phrase and the sub. It is constant, never jumps, sits at the bottom-left of a left-aligned block, and reads as breathing room. `.hero__sub`'s narrow `margin-top` drops from 26px to 18px to compensate.

**Hierarchy against `h2`, quantified.** Today's narrow display cap is `1.875rem = 30px`, which is **below the 2rem `h2` floor at every narrow viewport, always**. The new narrow cap is 44px. The name exceeds the section-title floor for viewports ≥ 335px; the roll exceeds it for viewports ≥ 386px. Below 386px the roll runs 25.9–31.0px against a 32px `h2` — a ≤3% difference at 375px, widening to 19% at 320px. **This is a strict improvement over today at every width**, and the residual band is a property of the committed `h2` clamp, not of this fix. Flag it to whoever owns section typography: dropping the `h2` narrow floor to `1.75rem` would restore hero > h2 down to 320px.

**Boundary continuity.** Name: 44.00px at 720 → 44.87px at 721 (+0.87px, visually continuous). Roll: 37.49px at 720 → 29.47px at 721 (−8px). The roll step is real and unavoidable — at 721 the phrase must share a line with the lead and fit 21.006em; at 720 it owns two lines of its own. The whole composition changes at that boundary (five visual lines → two), so a size step there reads as the composition changing, not as a glitch. Do not attempt to unify the caps to smooth it; that reintroduces the overflow.

### D5 — Non-breaking articles in the phrase strings

Phrase text becomes:

```
"a\u00A0developer."
"a\u00A0researcher."
"a\u00A0computer scientist."
"an\u00A0athlete."
"a\u00A0mentor."
"obsessed with\u00A0AI."
```

**Why.** On narrow the phrase wraps. `A RESEARCHER.` is 10.173em and `A DEVELOPER.` is 9.199em; against a 9.2em column (divisor 9.2) both would break after the article, leaving a lone `a` on its own line above the noun. Binding article to noun with `U+00A0` makes the widest unbreakable unit `A RESEARCHER.` at 10.173em, which is what sets `D_narrow`'s effective roll divisor at 10.80. `A COMPUTER SCIENTIST.` still breaks cleanly at the one remaining space: `a computer` (8.543em) / `scientist.` (7.065em), both comfortably inside 10.8em. `obsessed with AI.` breaks to `obsessed` / `with AI.`

`RoleRoll` slices by character, so the NBSP is revealed like any other glyph; visually identical to a space. NBSP advance equals space advance in Unbounded; the slack absorbs any deviation. The `.visually-hidden` sentence is separate prose and keeps ordinary spaces — it is unaffected.

### D6 — Reserve the caret on the sizer; resolve the widest phrase by measurement

`.roll__sizer` gains `padding-inline-end: 0.12em` (caret box 0.06em + left margin 0.06em) and becomes a nested single-cell grid rendering **all six phrases** at `grid-area: 1 / 1`.

**Why.** Two survey defects, both structural. (#1) The sizer measured 15.860em while live-text-plus-caret measured 15.980em, so the auto track grew 0.12em at the exact moment the longest phrase finished typing — a visible ~5px twitch on the phrase held longest. Padding the sizer by the caret's footprint makes sizer and live-at-maximum identical, so the track is constant. (#2) `RoleRoll.tsx:41` picks the sizer with `b.text.length > a.text.length`; it works today only because the longest string happens also to be the widest. Stacking every phrase in one grid cell makes the layout engine resolve the maximum by measurement, forever, with zero JS and zero layout reads. The `longest` reduce is deleted.

The sizer is no longer needed for the anchor. It is still needed for: a stable hover/click target, a reserved box pre-hydration so the swap to `count = 0` causes no shift, the two-line height reservation on narrow, and the trailing-field reading on wide. It stays.

### D7 — Overflow guards kept on **both** compositions

The reviewer is right that the first proposal argued for a loud failure mode on wide (`flex-wrap: wrap`) and then deleted the equivalent guard on narrow (`.roll { max-width: 100% }`), calling it a dead duress hack. Same argument, same conclusion, both places.

- **Wide:** `.hero__roll` is `display: flex; flex-wrap: wrap`. `.hero` is `overflow: clip`; with `nowrap`, a wrong divisor would truncate the headline off the right edge with no scrollbar and no symptom — correct on a 1512px author display, silently cut at 1280px. With `wrap`, the same failure drops the slot to its own line, which a reviewer sees immediately. Given 8% engineered headroom the wrap never fires; it exists so the pathological failure is loud instead of invisible.
- **Narrow:** `.roll` keeps `width: 100%` (a *deterministic* full-column measure, not shrink-to-fit) and the sizer/live text drop `white-space: nowrap`, so an over-wide phrase wraps visibly rather than clipping.

The narrow horizontal hit-area bleed (`padding-inline: 0.1em` / `margin-inline: -0.1em`) is zeroed on narrow. With `box-sizing: border-box` in effect, leaving it would shrink the text measure by 0.2em and eat into the divisor slack for no benefit — the slot already spans the full column there, so the horizontal bleed buys nothing. The vertical bleed (`0.14em` / `0.22em`) stays on both compositions; it is what keeps the hit area comfortable and it nets to zero height.

### D8 — Eliminate the font-swap window for the display face

`app/layout.tsx`: change `Unbounded({ … display: "swap" })` to **`display: "block"`**. Hanken Grotesk stays `"swap"`.

**Why.** The reviewer's major finding #5 is correct: the fit guarantee holds only once Unbounded has loaded. `next/font/google` generates a metric-adjusted local fallback from *average* character advance; an all-caps run in a wide geometric display face is exactly where that approximation deviates most, and the engineered margin is 8%. Both proposed checks run after `document.fonts.ready`, so neither can ever observe the swap window — which is the first paint a recruiter sees.

`display: "block"` gives a block period (text laid out but not painted) followed by an infinite swap period. `next/font` self-hosts and preloads the face from the same origin, so the block period is sub-frame in practice and the text always appears. **There is no painted fallback layout at all**, so the swap-window mismatch cannot be seen. Layout still runs with fallback metrics during the block period and may briefly wrap; nothing is visible while it does. The codebase already treats the swap as dangerous — `RoleRoll.tsx:196–203` defers typing until `document.fonts.ready` with the comment "typing in a fallback font reflows mid-word" — so this is consistent with the existing posture, not new caution.

Do not apply `"block"` to the body face: a FOIT on 200 words of prose is a worse trade than on two display lines.

Additionally, `scripts/measure-hero.mjs` runs one pass with `**/_next/static/media/*.woff2` blocked and **records** the fallback-period line widths as a table (report, never fail). The numbers then exist and the claim is measured rather than assumed.

### D9 — The hero carries the locked primary CTA at real primary weight

Actions row, in this order: **the literal email address**, then `see my work →`, then `Résumé`. `more about me` is removed.

```
.hero__email:  var(--font-display-stack), clamp(1.0625rem, 1.9vw, 1.375rem), 600,
               letter-spacing .005em, color var(--ink),
               underline 3px var(--signal), text-underline-offset 10px
.hero__sub:    var(--font-body-stack),    clamp(1rem, 1.2vw, 1.1875rem), 400, --ink-2
.link-arrow:   var(--font-body-stack),    1.0625rem, 500, --ink
```

At 1440px: email **22px display 600 ink + coral underline**; sub 17.3px body 400 ink-2; arrow links 17px body 500 ink. At 320px: email 17px (clamp floor), sub 16px, links 17px — separated there by family, weight, colour and the underline rather than by size.

**Why this and not the first proposal's 1.1875rem body.** The reviewer is right: 1.1875rem/600 in the body face is *exactly* the top of `.hero__sub`'s own clamp, in the same family, three elements below it — the site's single locked conversion action rendered at deck size. Moving to the display face at a distinct step gives a 27% size lead over the sub plus a family change plus a weight change plus the accent underline. It also makes the "same licensed device" claim literally true: `text-decoration-thickness: 3px` and `text-underline-offset: 10px` now match `.contact__email` (globals.css:1499–1513) exactly, where the first proposal used 6px and did not.

Contact stays the terminal, larger instance (`clamp(1rem, 2.6vw, 1.75rem)` → 28px at 1440), so the hero does not deflate it. There is no button vocabulary in this system and none is being invented — no seventh radius, no filled control. Weight comes from face, size, colour and the accent underline, which is the correct constraint to respect.

`more about me` is dropped: three secondaries beside one primary dilute it, and About is reachable from the menu (key 3).

### D10 — The status line becomes a wrapping fact row, and is fixed *before* the data arrives

`.status` moves above the actions and gains two optional segments driven by a new `availability` export in `data/site.ts`, both `null` today.

**Why the placement.** Availability reads before the CTA because that is the order a recruiter decides in — route first, then contact. It stays *below* the h1: a small tracked-caps line above a heading is an eyebrow, and `craft-floor` L27 makes that the one hard ban on the page.

**Why the CSS must change now.** The reviewer's major finding #3 is correct and the failure is exactly the kind this project must not ship. `.status` is `display: inline-flex; align-items: center; gap: 10px; line-height: 1` with **no `flex-wrap`**. Add two segments and "Open to opportunities" becomes a shrinkable flex item that wraps internally into a `line-height: 1` box whose lines collide, while `align-items: center` centres the 9px coral dot against a two-line block. At 390px the column is 350px and `OPEN TO OPPORTUNITIES` alone is ~200px at 14px/0.06em — one added segment already overflows. The row built for the convert survey's highest-cost omission would break on the viewport most recruiters arrive from, and would never be caught because the fields ship null.

Fixed spec: `.status` becomes a wrapping block-level flex with `column-gap: 18px; row-gap: 6px; line-height: 1.3`, and the dot plus "Open to opportunities" are bound into a single `white-space: nowrap` `.status__lead` unit so the dot can never orphan.

**Separators.** None. Facts are separated by an 18px column gap, not by `·`. A middle-dot rendered as a flex item orphans to the start of a wrapped line; uppercase 14px at 0.06em tracking with 18px gaps reads as discrete facts at every wrap point.

**Tested worst case, stated explicitly.** `● OPEN TO OPPORTUNITIES` + `JUNE 2027` + `SANTA CRUZ, CA — OPEN TO RELOCATE`. At 14px Hanken 500 uppercase with 0.06em tracking (≈9.5px/char): 219px / 86px / 314px. At a 320px viewport the column is 280px, so the location segment exceeds the column and must shrink — it does, because each `.status__fact` keeps default `flex-shrink: 1` and `min-width: auto` resolving to min-content (`RELOCATE`, ~76px), so it wraps internally. Result at 320px: three rows, no overflow, no collision. `.status__lead`'s min-content is 209px ≤ 280px, so the lead never wraps.

### D11 — Commit the sub-copy swap now

`.hero__sub` becomes, verbatim:

> CS student at UC Santa Cruz, building AI that takes a real problem off someone's plate — an operations team's broken bookings, a DECA competitor's unscored report, a small business without a website.

The reviewer's minor #11 is correct that deferring this was the wrong call. Every word is **supplied truth already shipping** in `components/About.tsx` lines 20–24; nothing new is invented and nothing waits for tomorrow. The convert survey names that sentence as "the most convincing thing here" and notes it sits below the fold. The replaced text ended "and getting more out of AI than most" — a soft self-assessment sitting directly under a headline that cycles "obsessed with AI", which is exactly the claim a hiring manager discounts. The triad of concrete problems cashes the claim instead of restating it.

199 characters. `.hero__sub`'s `max-width` rises **46ch → 56ch** (a documented amendment to DESIGN.md's measure caps): at 1440 that is 484px, four lines at 17.3px/1.5 = 104px, sitting under a 993px headline. At 46ch it would be 398px and five lines, and the column would look pinched under the display block. 56ch remains a deliberately short deck measure, well inside the 65–75ch prose guidance which governs body copy, not decks.

### D12 — Cancel the inherited `text-wrap: balance`

`.hero__title { text-wrap: wrap }`. Balance is inert today because both hero lines are `display: block` children with no inline content in the h1 itself. The wide composition reintroduces real inline flow (two inline-blocks sharing a line box), where balance would actively fight a scale that is engineered never to break. Restores the initial value; no other effect.

---

## 3. Where I disagree with the reviewer

**Minor #10 (the 2560px composition) — partially rejected.** I accept the finding and act on it by raising the cap to `4.5rem`, which puts the headline at 993px = 87% of the 1140 column instead of 883px = 77%. I reject the implied remedy of filling the right-hand ground with something. There is nothing truthful to put there: PRODUCT.md supplies no additional hero-eligible fact, and inventing a right-hand element is the failure mode this project already rejected once (Hobbies). The empty ground to the right of the hero at ≥1188px is **The Calm Centre Rule doing its job** — the wash's iridescence lives at negative corner offsets, and a left-aligned block in the 1140 column is what leaves the top-right blob uncrowded. It is also what puts the hero's left edge in exact alignment with the Work grid's left edge, so the whole page reads as one left rail rather than as a centred hero above a left-aligned body. That is a composition decision, stated, not an oversight. A 2560 screenshot is mandated in the measure pass (§6) so it is reviewed, not assumed.

**Everything else in the review is accepted and fixed.** Both blocking items, all five major items, and minors #8, #9 and #11.

---

## 4. Exact CSS

All edits in `/Users/ParthDoshi/csProjects/portfolio/.claude/worktrees/impeccable-teach/app/globals.css`.

### 4.1 Replace the `.hero` block (currently lines ~677–718)

```css
/* ==========================================================================
   Hero
   ========================================================================== */
.hero {
  position: relative;
  min-height: min(100svh, 720px);
  display: grid;
  /* An explicit minmax(0, 1fr) column: place-content: center left the column
   * max-content-sized and the headline could overflow. Load-bearing; keep. */
  grid-template-columns: minmax(0, 1fr);
  align-content: center;
  padding: 150px 24px 56px;
  overflow: clip;
}

/*
 * The measure. Left-aligned in the 1140 column, so the lead's left edge IS
 * the column's left edge: the typing anchor is fixed by geometry, for every
 * phrase and every mode, without measuring anything.
 */
.hero__inner {
  width: 100%;
  max-width: 1140px;
  margin-inline: auto;
  text-align: left;
}

.hero__title {
  /* FALLBACK, declared first and unconditionally. font-size is inherited, so
   * an engine that cannot resolve 100cqi would drop the h1 to the body's
   * 1.0625rem — a 17px headline above the fold, silently. This is the same
   * fallback-first pattern as .type-outline above. It renders today's
   * behaviour exactly, three-line break included: readable, not correct. */
  font-size: clamp(1.75rem, 5.1vw, 4rem);
  max-width: 100%;
  line-height: 1.12;
  letter-spacing: 0.005em;
  /* Cancels text-wrap: balance inherited from h1. Both lines are sized never
   * to wrap; balance only fights that. */
  text-wrap: wrap;
}

/*
 * FIT-TO-WIDTH DISPLAY SCALE — measured constants. Do not hand-tune; run
 * scripts/measure-hero.mjs and re-derive.
 *
 * Both headline lines are unbreakable runs of uppercase Unbounded. Measured
 * against the bundled face at letter-spacing .005em, at the weights the
 * cascade applies:
 *
 *   line 1  "HEY, I'M" 4.847 (400) + space .253 (700)
 *           + "PARTH DOSHI" 8.697 (700)                   = 13.797em
 *   line 2  "AND I'M" 4.766 (400) + column-gap .260
 *           + "A COMPUTER SCIENTIST." 15.860 (700)
 *           + caret reserve .120                          = 21.006em
 *
 *   divisor 15.0  -> line 1 occupies 92.0% of the column. The 8% slack covers
 *                   Unbounded's kern feature (+-2%) and the
 *                   @supports(-webkit-text-stroke) fallback, which sets the
 *                   outlined leads at 700 instead of 400 (worst case 95.8%).
 *   ratio 0.6568  = 13.797 / 21.006. Line 2 is then EXACTLY as wide as line 1
 *                   at every viewport: one cap, one threshold, no ratio drift.
 *
 * 1cqi is 1% of .hero__inner's content box: the 24px padding is already
 * subtracted, a classic scrollbar is already excluded, and 1140 is already
 * capped. min() means the rem cap governs wide viewports and the cqi fit
 * governs narrow ones, so the headline cannot exceed its column at any width
 * from 320 to 2560 — and a 20px root font simply never reaches the cap.
 */
@supports (container-type: inline-size) and (font-size: 1cqi) {
  .hero__inner {
    container-type: inline-size;
  }
  .hero__title {
    --h1-fit: min(4.5rem, calc(100cqi / 15));
    --h1-name: var(--h1-fit);
    --h1-roll: calc(var(--h1-fit) * 0.6568);
    font-size: var(--h1-name);
  }
  .hero__roll {
    font-size: var(--h1-roll);
  }
}

.hero__greet,
.hero__name {
  display: inline-block;
  line-height: 1.08;
}

.hero__name {
  position: relative;
  color: var(--ink);
}

.hero__roll {
  display: flex;
  /* wrap, NOT nowrap: .hero is overflow: clip, so nowrap would truncate a
   * mis-sized line off the right edge with no scrollbar and no symptom. With
   * wrap the same failure drops the slot to its own line, where it is seen.
   * With 8% headroom it never fires. */
  flex-wrap: wrap;
  align-items: baseline;
  column-gap: 0.26em;
  row-gap: 0;
  margin-top: 0.18em;
  line-height: 1.15;
}

/* The lead is one unit and never shrinks: pressure must produce a visible
 * wrap, not a nowrap run overflowing into the clip. */
.hero__lead {
  flex: 0 0 auto;
  white-space: nowrap;
}

/* The wave sits under the name, inside its box, so it tracks the type. */
.hero__wave {
  position: absolute;
  left: 0;
  right: 0;
  bottom: -0.06em;
  width: 100%;
  height: 0.34em;
  color: color-mix(in oklab, var(--ink) 30%, transparent);
  pointer-events: none;
}

.hero__sub {
  /* 56ch, not 46ch: the deck now carries the three concrete problems, and at
   * 46ch it set five ragged lines under a 993px headline. */
  max-width: 56ch;
  margin-top: 26px;
  font-size: clamp(1rem, 1.2vw, 1.1875rem);
  line-height: 1.5;
  color: var(--ink-2);
}

.hero__actions {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  justify-content: flex-start;
  column-gap: 28px;
  /* 18px clears .hero__email's 10px underline offset on a wrapped row. */
  row-gap: 18px;
  margin-top: 28px;
}

/*
 * The primary CTA. Display face at a step above the deck, with the SAME
 * licensed coral underline .contact__email uses (3px / 10px offset) — one
 * device in two places, not a second accent. Contact stays the larger,
 * terminal instance.
 */
.hero__email {
  display: inline-block;
  font-family: var(--font-display-stack);
  font-size: clamp(1.0625rem, 1.9vw, 1.375rem);
  font-weight: 600;
  letter-spacing: 0.005em;
  color: var(--ink);
  text-decoration: underline;
  text-decoration-thickness: 3px;
  text-decoration-color: var(--signal);
  text-underline-offset: 10px;
  transition:
    text-decoration-color 200ms var(--ease-out),
    transform 160ms var(--ease-out);
}

.hero__email:active {
  transform: scale(0.97);
}

@media (hover: hover) and (pointer: fine) {
  .hero__email:hover {
    text-decoration-color: var(--ink);
  }
}
```

Delete `.hero__line` and `.hero__line--roll` entirely. `.link-arrow`, `.pending-note` and `.menu__resume` are unchanged and stay where they are.

### 4.2 Replace the `@media (max-width: 720px)` hero block (currently lines ~813–847)

```css
@media (max-width: 720px) {
  .hero {
    padding: 118px 20px 48px;
    min-height: min(100svh, 620px);
  }

  /*
   * Four short lines, with the phrase reserved at TWO lines of its own.
   * 21em of uppercase Unbounded cannot be set at display size in a 350px
   * column — it resolves to 16.7px, below the body step. The lead takes its
   * own line, and the phrase then sets at the NAME's scale (38px at 390,
   * against a 32px h2 floor) and wraps, rather than being crushed to 21px to
   * fit one line. Left alignment — not the sizer — is what pins the anchor
   * now, so the single-line reservation buys nothing here.
   *
   *   divisor 9.2   governed by "PARTH DOSHI" 8.697em -> 94.5% of column.
   *   ratio 0.852   effective roll divisor 9.2/0.852 = 10.80, governed by the
   *                 widest UNBREAKABLE phrase unit, "A RESEARCHER." 10.173em.
   *                 That is what keeps the article bound to its noun instead
   *                 of leaving a lone "a" on a line (see the NBSPs in the
   *                 phrase strings in components/Hero.tsx).
   *   cap 2.75rem   picked so the 720 -> 721 name step is +0.87px.
   */
  @supports (container-type: inline-size) and (font-size: 1cqi) {
    .hero__title {
      --h1-fit: min(2.75rem, calc(100cqi / 9.2));
      --h1-roll: calc(var(--h1-fit) * 0.852);
    }
  }

  .hero__greet,
  .hero__name,
  .hero__lead {
    display: block;
  }

  .hero__roll {
    display: block;
    margin-top: 0.24em;
  }

  /* The slot owns the full column and both the sizer and the live text wrap
   * at the same measure. width: 100% rather than shrink-to-fit so the measure
   * is deterministic; the horizontal hit-area bleed is dropped because under
   * border-box it would shave 0.2em off that measure for no benefit. */
  .roll {
    width: 100%;
    padding-inline: 0;
    margin-inline: 0;
  }

  .roll__sizer > span,
  .roll__live {
    white-space: normal;
  }

  .hero__sub {
    /* Compensates for the phrase's reserved second line. */
    margin-top: 18px;
  }

  .hero__actions {
    margin-top: 24px;
    column-gap: 22px;
  }

  /* 0.03em is sub-pixel at phone display sizes; hold a visible floor. */
  .type-outline {
    -webkit-text-stroke-width: max(1.1px, 0.03em);
  }
}
```

### 4.3 Replace the hero entrance stagger (currently lines ~849–872)

```css
@media (prefers-reduced-motion: no-preference) {
  .hero__greet,
  .hero__name,
  .hero__roll,
  .hero__sub,
  .status,
  .hero__actions {
    animation: rise 600ms var(--ease-out) both;
  }
  /* Stagger steps stay 30–80ms; longer reads as the page being slow.
   * .hero__greet and .hero__name share delay 0 — they are two halves of one
   * line and must not stagger against each other. */
  .hero__roll {
    animation-delay: 60ms;
  }
  .hero__sub {
    animation-delay: 120ms;
  }
  .status {
    animation-delay: 180ms;
  }
  .hero__actions {
    animation-delay: 240ms;
  }
}
```

`@keyframes rise` is unchanged.

### 4.4 Rolling-phrase block (currently lines ~887–931)

```css
/*
 * The slot reserves the widest phrase and the live text is left-aligned
 * inside it. The space that leaves on the right reads as a text field rather
 * than a gap, because the caret sits at the end of whatever has been typed.
 */
.roll {
  display: inline-grid;
  justify-items: start;
  vertical-align: baseline;
  padding: 0.14em 0.1em 0.22em;
  margin: -0.14em -0.1em -0.22em;
  cursor: default;
  /* Blockified to `grid` as a flex item on the wide composition; the
   * padding/margin bleed still nets zero, so the first typed glyph sits
   * exactly one column-gap from the lead. Never shrinks: pressure must wrap
   * the flex line, not squeeze the track. */
  flex: 0 0 auto;
  max-width: 100%;
}

/*
 * Reserves the widest phrase. Every phrase occupies grid-area 1 / 1, so the
 * track resolves to the widest by MEASUREMENT. The previous
 * `b.text.length > a.text.length` in RoleRoll worked only because the longest
 * string happens also to be the widest, and would silently under-size for any
 * future phrase with fewer, wider glyphs.
 */
.roll__sizer {
  grid-area: 1 / 1;
  display: grid;
  visibility: hidden;
  pointer-events: none;
  /* Caret box (.06em) plus its left margin (.06em). Without this the track
   * grew .12em at the exact moment the longest phrase finished typing. */
  padding-inline-end: 0.12em;
}

.roll__sizer > span {
  grid-area: 1 / 1;
  white-space: nowrap;
}

.roll__live {
  grid-area: 1 / 1;
  display: inline;
  white-space: nowrap;
}
```

`.roll__text--accent`, `.roll[data-pretype]`, `@keyframes pretype-reveal`, `.roll__caret`, `.roll[data-mode="holding"]` and `@keyframes blink` are **unchanged**.

### 4.5 Status block (currently lines ~944–961)

```css
.status {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  column-gap: 18px;
  row-gap: 6px;
  margin-top: 24px;
  font-size: 0.875rem;
  font-weight: 500;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  /* 1.3, not 1: with wrap enabled a long fact wraps internally, and at 1 the
   * lines collide. */
  line-height: 1.3;
  color: var(--ink-2);
}

/* The dot and its label are one unit so the dot can never orphan onto a row
 * of its own. Its min-content is 209px at 14px, inside a 280px column. */
.status__lead {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  white-space: nowrap;
}

/* Facts shrink to min-content and wrap internally rather than overflowing the
 * column. No separator glyphs: a middle dot as a flex item orphans to the
 * start of a wrapped row. 18px of gap does the separating. */
.status__fact {
  min-width: 0;
}
```

`.status__dot`, `.status__dot::after`, the `@media (prefers-reduced-motion: no-preference)` pulse and `@keyframes pulse` are unchanged.

---

## 5. Exact component changes

### 5.1 `components/Hero.tsx`

```tsx
import RoleRoll, { type Phrase } from "@/components/RoleRoll";
import ResumeLink from "@/components/ResumeLink";
import { ArrowRight } from "@/components/Icon";
import { links } from "@/data/projects";
import { availability } from "@/data/site";

/**
 * Parth's own words. The slot owns the article and the period.
 *
 * The U+00A0 after each article is load-bearing on the narrow composition,
 * where the phrase wraps: without it "a researcher." (10.173em) breaks after
 * the article and leaves a lone "a" on a line. Binding article to noun makes
 * "A RESEARCHER." the widest unbreakable unit, which is what sets the narrow
 * roll divisor (10.80) in globals.css.
 *
 * TO ADD OR CHANGE A PHRASE: re-run scripts/measure-hero.mjs. The headline's
 * fit divisors are measured constants derived from these exact strings.
 */
const phrases: Phrase[] = [
  { text: "a\u00A0developer." },
  { text: "a\u00A0researcher." },
  { text: "a\u00A0computer scientist." },
  { text: "an\u00A0athlete." },
  { text: "a\u00A0mentor." },
  { text: "obsessed with\u00A0AI.", accent: true, hold: 4200 },
];

// Wave() — unchanged.

export default function Hero() {
  const facts = [availability.gradTerm, availability.location].filter(
    (f): f is string => Boolean(f),
  );

  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="hero__inner">
        <h1 className="hero__title" id="hero-title">
          <span className="visually-hidden">
            Hey, I&rsquo;m Parth Doshi, and I&rsquo;m a developer, a researcher,
            a computer scientist, an athlete, a mentor — and obsessed with AI.
          </span>

          <span className="hero__greet type-outline" aria-hidden="true">
            Hey, I&rsquo;m
          </span>{" "}
          <span className="hero__name" aria-hidden="true">
            Parth Doshi
            <Wave className="hero__wave" />
          </span>

          {/*
            The lead sits OUTSIDE the typing slot so it never moves: only the
            phrase after it changes width. Left-aligned, the lead's left edge
            is the column's left edge, so the anchor is fixed by geometry
            rather than by the sizer. Under 720px the lead takes its own line
            and the phrase wraps to two — 21em of uppercase Unbounded will not
            fit a phone column at display size.
          */}
          <span className="hero__roll" aria-hidden="true">
            <span className="type-outline hero__lead">And I&rsquo;m</span>
            <RoleRoll phrases={phrases} />
          </span>
        </h1>

        <p className="hero__sub">
          CS student at UC Santa Cruz, building AI that takes a real problem off
          someone&rsquo;s plate — an operations team&rsquo;s broken bookings, a
          DECA competitor&rsquo;s unscored report, a small business without a
          website.
        </p>

        <p className="status">
          <span className="status__lead">
            <span className="status__dot" aria-hidden="true" />
            Open to opportunities
          </span>
          {facts.map((f) => (
            <span className="status__fact" key={f}>
              {f}
            </span>
          ))}
        </p>

        <div className="hero__actions">
          <a className="hero__email" href={`mailto:${links.email}`}>
            {links.email}
          </a>
          <a className="link-arrow" href="#work">
            <ArrowRight />
            see my work
          </a>
          <ResumeLink />
        </div>
      </div>
    </section>
  );
}
```

**Whitespace rules, both load-bearing:**

- The JSX `{" "}` **between `.hero__greet` and `.hero__name` is required**. On the wide composition they are inline-blocks sharing a line box and that space is the 0.253em in the 13.797em measure. On narrow they are blocks and the whitespace node is discarded.
- There is deliberately **no** space between `.hero__lead` and `<RoleRoll>`. On wide, `.hero__roll` is a flex container and a whitespace-only text node generates no flex item; the deterministic `column-gap: 0.26em` supplies the space and is what the 21.006em measure counts. On narrow both are blocks and the whitespace would be discarded anyway.

### 5.2 `components/RoleRoll.tsx`

Three changes. **Every timing constant, mode, pause condition, IntersectionObserver, `document.fonts.ready` gate, pre-hydration path and reduced-motion path is untouched.**

**(a)** Delete the `longest` computation at lines 41–43. The layout engine now resolves the widest phrase.

**(b)** Replace the sizer render:

```tsx
{/* Every phrase in one grid cell: the track takes the widest by measurement,
    not by String.length. */}
<span className="roll__sizer">
  {phrases.map((p) => (
    <span key={p.text}>{p.text}</span>
  ))}
</span>
```

The six hidden copies live inside an already-`aria-hidden` subtree with `visibility: hidden; pointer-events: none`. Negligible bytes; invisible to AT; the single readable copy is still the `.visually-hidden` span in the h1.

**(c)** Add the dev-only fit assertion. It is dead-code-eliminated in production and ships nothing to users. It is the standing guard against the divisors drifting out of date.

```tsx
useEffect(() => {
  if (process.env.NODE_ENV === "production") return;
  const slot = rootRef.current;
  if (!slot) return;
  const line = slot.closest(".hero__roll") as HTMLElement | null;
  const inner = slot.closest(".hero__inner") as HTMLElement | null;
  const lead = line?.querySelector(".hero__lead") as HTMLElement | null;
  if (!line || !inner || !lead) return;

  const check = () => {
    /*
     * Structural wrap test, by HEIGHT.
     *
     * Do NOT compare box tops. .roll carries padding: .14em .1em .22em with
     * matching negative margins, so its border box sits 0.14em above the
     * lead's content rect permanently — at the 47px roll size that is a
     * standing 6.6px delta and a top-comparison guard fires on every load
     * forever, which is how a guard gets deleted.
     *
     * Unwrapped, the flex line is exactly one line box tall (the slot's
     * padding is cancelled by its negative margins, so it contributes no
     * height). Wrapped, it is two. 1.5x separates them with no ambiguity.
     */
    const lineH = line.getBoundingClientRect().height;
    const leadH = lead.getBoundingClientRect().height;
    const wrapped = window.innerWidth > 720 && lineH > leadH * 1.5;
    // Catches narrow overflow too, where there is no flex line to wrap.
    const overflows = inner.scrollWidth > inner.clientWidth + 1;

    if (wrapped || overflows) {
      console.warn(
        "[hero] the headline no longer fits its column — re-measure the fit " +
          "divisors in app/globals.css (.hero__title --h1-fit / --h1-roll) " +
          "with scripts/measure-hero.mjs",
        { column: inner.clientWidth, scrollWidth: inner.scrollWidth, lineH, leadH, wrapped },
      );
    }
  };

  if (typeof document !== "undefined" && document.fonts) {
    void document.fonts.ready.then(check);
  } else {
    check();
  }
  window.addEventListener("resize", check);
  return () => window.removeEventListener("resize", check);
}, []);
```

> **Mandatory verification step, not optional.** Before this lands, the implementer must (1) temporarily set `--h1-fit: min(4.5rem, calc(100cqi / 12))` and confirm the warning fires at 1280px, then (2) restore 15 and confirm the console is silent at all twenty widths in §6, in both themes, after `document.fonts.ready`. A guard that has not been proven to fire *and* to stay silent is not a guard. Record the result in the PR description.

### 5.3 `data/site.ts`

Append:

```ts
/**
 * Recruiter routing facts for the hero status line.
 *
 * BOTH ARE UNSUPPLIED as of 2026-09-02 — PRODUCT.md records no graduation
 * term and no location. `null` renders NOTHING; it does not render a
 * placeholder, a chip, or a "coming soon". Never guess either value: a wrong
 * graduation term routes the candidate to the wrong requisition, which is
 * worse than routing to none.
 *
 * Worst case the layout is built for and tested against:
 *   gradTerm: "June 2027"
 *   location: "Santa Cruz, CA — open to relocate"
 */
export const availability: {
  gradTerm: string | null;
  location: string | null;
} = {
  gradTerm: null,
  location: null,
};
```

### 5.4 `app/layout.tsx`

```ts
const display = Unbounded({
  subsets: ["latin"],
  variable: "--font-display",
  /*
   * block, not swap. The hero headline's fit is derived from measured
   * Unbounded advances; next/font's metric-adjusted fallback is fitted to
   * AVERAGE character width, and an all-caps run in a wide geometric display
   * face is exactly where that approximation deviates most. `block` means the
   * fallback layout is never painted — the face is self-hosted and preloaded
   * from the same origin, so the block period is sub-frame in practice, and
   * the swap period after it is infinite so text always appears. The body
   * face stays `swap`: a FOIT on 200 words of prose is a worse trade.
   */
  display: "block",
});
```

`body` (Hanken Grotesk) is unchanged at `display: "swap"`.

---

## 6. `scripts/measure-hero.mjs` — the CI-equivalent gate for the divisors

New file. This is the mitigation that makes the hardcoded divisors maintainable; its runnability is load-bearing, so the invocation is specified exactly.

### Resolving Playwright without adding a dependency

`playwright-core` is in neither `dependencies` nor `devDependencies` and is **not** in `node_modules` — the first proposal's claim that it "adds no dependency" was true but its claim that the script could import it was false. The browser binaries *are* cached. Verified paths on this machine:

```
~/Library/Caches/ms-playwright/chromium_headless_shell-1234/chrome-headless-shell-mac-arm64/chrome-headless-shell
~/Library/Caches/ms-playwright/chromium-1234/chrome-mac-arm64/
```

The driver is installed to a scratch prefix **outside the repo** and resolved explicitly. `NODE_PATH` does not work for ESM, so the script uses `createRequire` (playwright-core is CJS, so directory resolution via `require` works):

```js
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const { chromium } = require(
  process.env.PLAYWRIGHT_CORE ?? "playwright-core",
);
```

Documented invocation, to be added to `CLAUDE.md` alongside the screenshot pass:

```sh
npm run build
npm run start &                       # :3000

npm install --no-save --no-package-lock \
  --prefix /tmp/hero-measure playwright-core@latest

PLAYWRIGHT_CORE=/tmp/hero-measure/node_modules/playwright-core \
CHROMIUM="$HOME/Library/Caches/ms-playwright/chromium_headless_shell-1234/chrome-headless-shell-mac-arm64/chrome-headless-shell" \
node scripts/measure-hero.mjs
```

`chromium.launch({ executablePath: process.env.CHROMIUM })` — passing the path explicitly means the `playwright-core` version need not match the cached revision. If launch fails with a protocol error, the escape hatch is `npx playwright-core@latest install chromium-headless-shell`, which populates the shared browser cache and does **not** add a repo dependency; `CLAUDE.md`'s prohibition is on adding Playwright to `dependencies`, which this does not do. `/tmp/hero-measure` is outside the repo and is never committed.

### What the script asserts

Viewports: **320, 360, 375, 390, 414, 480, 600, 700, 720, 721, 768, 834, 1024, 1128, 1180, 1280, 1366, 1440, 1512, 1728, 1920, 2560**. Each at `deviceScaleFactor: 1`, both themes, after `document.fonts.ready`.

1. `.hero__inner` — `scrollWidth <= clientWidth`. Nothing in the hero exceeds the column. **Fail on violation.**
2. `.hero__title` — `scrollWidth <= clientWidth`. **Fail.**
3. **Wide only (> 720):** `.hero__roll` `getBoundingClientRect().height <= .hero__lead` height × 1.5. The roll line did not wrap. **Fail.** (The first proposal's `line.scrollWidth > inner.clientWidth` term is dropped: with `flex-wrap: wrap` the flex line can never overflow horizontally, so that condition can never fire — the reviewer is right that it was dead code.)
4. **Anchor regression, the core test.** Click-to-advance through all six phrases and, for each, sample at `count = 0`, `count = len − 1`, and `count = len`:
   - **wide:** `.roll` `offsetWidth` and `.roll__live` `getBoundingClientRect().left` are identical (±0.5px) across every sample. This proves the reserved track is constant, which is exactly what the caret reserve and the multi-phrase sizer exist to guarantee. **Fail.**
   - **narrow:** `.roll` `offsetHeight` is identical across every sample, and `.roll__live` `.left` is identical. This proves the two-line height reservation holds and no caret orphans onto a third line. **Fail.**
5. **Report table (never fails):** computed `font-size` of `.hero__title` and `.hero__roll`, `.hero__roll` and `.hero__greet` rendered widths, the column width, and the width/column ratio, so the two compositions can be eyeballed for continuity across 720 → 721 and the 92.0% / 87.1% figures verified against this document's tables.
6. **Fallback-font pass (never fails, always reported).** One additional pass per viewport with `route.abort()` on `**/_next/static/media/*.woff2`, recording the same widths under the metric-adjusted fallback face. This is the swap-window layout that `document.fonts.ready` can never observe. It is reported rather than asserted because D8 (`display: "block"`) means that layout is never painted — but the numbers now exist, so the claim is measured and not assumed.
7. **Screenshots** at 320, 390, 768, 1280 and **2560** (fold only), both themes, written to `.tmp/hero/`. The 2560 shot exists specifically so the wide composition's right-hand ground is reviewed rather than asserted.

Non-zero exit on any failure in 1–4. Run after any change to the phrase list, the lead, the name, `letter-spacing`, the caps, or the font.

---

## 7. Document updates required in the same PR

Non-optional. Shipping the code without these makes the finish review fail a correct hero, or leaves a builder reading a description of a page that no longer exists.

**`.impeccable/surfaces/homepage.md`**
- **FIRST VIEWPORT** currently reads "Centred hero." — this is the block the finish review audits. Rewrite to: left-aligned in the 1140 column; two-line composition above 720px and four-line (with a two-line reserved phrase slot) below; the fit-to-width guarantee; the email address as the single primary action.
- **Audience / Job / Action** currently lists three co-equal primaries ("opening the Operations Agent case study, downloading the résumé, and reaching GitHub/LinkedIn/email"). Per the locked decision, **email is the single primary**; résumé and links are secondary. The hero now reflects that and the contract must say so.

**`DESIGN.md`** — regenerate, do not hand-edit. Four sections are now wrong:
- **§Layout** — the hero paragraph documents `justify-items: center; text-align: center`. It is now a left-aligned 1140 column with `container-type: inline-size` on `.hero__inner`.
- **§Type ramp** — the Display step `clamp(1.75rem, 5.1vw, 4rem)` becomes: fallback `clamp(1.75rem, 5.1vw, 4rem)`; wide `--h1-fit: min(4.5rem, 100cqi/15)`, name `= fit`, roll `= fit × 0.6568`; narrow (≤720) `--h1-fit: min(2.75rem, 100cqi/9.2)`, roll `= fit × 0.852`. **Record the divisors and their provenance**, the way the grain PNG's seed is recorded — they are measured constants, not taste. Also record the measure-cap change: hero subline **46ch → 56ch**.
- **§Color, The One Accent Rule** — the email underline now appears in two places (hero + contact). Restate the rule as six licensed **uses** with "the email link, wherever it appears", not six instances. Without this amendment a polish pass will correctly flag the hero email as a seventh accent and remove it, undoing the locked primary-CTA decision.
- **§Type, The Outline-Lead Rule** — unchanged in substance, but note that on the narrow composition the two outlined leads ("HEY, I'M", "AND I'M") each hold their own line. Neither is an eyebrow: they are clauses of one sentence, set at the same size as (or larger than) what follows them, not labels above a heading. `craft-floor` L27 is not engaged.

**`PRODUCT.md` §Evidence on Hand / Unresolved** — add: graduation term and location/relocation status are **not supplied** and are required for the hero status line (`availability` in `data/site.ts`). Both are on tomorrow's question list. Until supplied they render as nothing — never as a guess, never as a "coming soon" chip.

**`CLAUDE.md`** — add `scripts/measure-hero.mjs` and its exact invocation to the verification section, beside the existing screenshot pass, and add a "to add or change a hero phrase" note beside the existing "to add a project" / "to add a tool" notes stating that the fit divisors must be re-measured.

---

## 8. Standing risks, stated plainly

1. **The divisors are hardcoded font measurements.** Adding a phrase wider than `A COMPUTER SCIENTIST.` (15.860em) or than `A RESEARCHER.` (10.173em, the narrow governor), or changing the lead, the name, `letter-spacing` or the font, invalidates them. Mitigated three ways — the provenance comments, `scripts/measure-hero.mjs`, and the dev-only assertion — but this is a permanent maintenance obligation and it must be written into the phrase-list comment and into `CLAUDE.md`.

2. **`container-type: inline-size` makes `.hero__inner` a containing block for absolutely positioned descendants and disables `position: sticky` inside it.** Verified safe today: `.hero__wave` is positioned against `.hero__name` (`position: relative`), and `.visually-hidden` is clipped by `clip: rect(0 0 0 0)` so its containing block is irrelevant. The cinematic-motion ruleset already gives the hero **no** scroll motion (Rule 10.1) and names overflow/containment ancestors as the classic sticky-killer (Rule 5.1 / trap 3), so this is a documentation item, not a conflict — but it must be documented, because a later "pin the hero" idea would silently do nothing.

3. **The wide composition depends on `.hero__greet` and `.hero__name` sharing a line box as inline-blocks.** If the fit arithmetic is ever wrong for line 1, the name drops to its own line — the narrow composition at the wide scale, a tall three-line block. The dev assertion currently watches the roll line and the container's `scrollWidth`; the latter does not catch a *wrap* of line 1 (a wrap does not overflow). `measure-hero.mjs` catches it via the reported `.hero__greet` / `.hero__title` height. If this ever fires in practice, extend the dev assertion with the same height test applied to the h1's first line box.

4. **The roll size steps down 8px across the 720 → 721 boundary** (37.49 → 29.47) while the name is continuous (44.00 → 44.87). Inherent: at 721 the phrase must share a line with the lead and fit 21.006em; at 720 it owns two lines. The whole composition changes there, so it reads as a composition change. Do not "fix" it by unifying the caps — that reintroduces the overflow.

5. **Below 386px viewport the typed phrase (25.9–31.0px) is smaller than the 32px `h2` floor.** This is a strict improvement over today, where the narrow display cap of 30px puts the hero headline below `h2` at *every* narrow width. The residual band is a property of the committed `h2` clamp, not of this fix; it is flagged to whoever owns section typography, where a `1.75rem` narrow floor would close it.

6. **The `.roll` hit target is large and has no keyboard or AT affordance.** On wide it is ~756px × one line; on narrow it is now the full column × two lines. It is `cursor: default`, pointer-only (hover-pause, click-to-advance), and lives inside an `aria-hidden` subtree. This is a pre-existing defect, unchanged by this work, but it is more consequential now that a conversion action sits below it and the narrow target spans the column. Documented decision: **accept it as a pointer-only easter egg** and record it in DESIGN.md rather than inventing a button affordance for a decorative control. If it is ever promoted to a real control, it needs a `<button>`, a visible focus ring, and a label — which is a separate dimension.

7. **The coral underline now appears twice on the homepage.** If `DESIGN.md`'s One Accent Rule is not amended in the same PR, a polish pass will correctly flag the hero email as a seventh accent and remove it, undoing the locked primary-CTA decision. This is the single highest-probability regression in this dimension.

8. **The status row ships with one segment on launch day.** If graduation term and location do not arrive tomorrow, the convert survey's highest-cost omission survives to ship. The row is not empty — it already carries "Open to opportunities" — and the layout is built and tested for the populated case, so this is a **content blocker, not a build blocker**. Flag it; do not paper over it, and do not guess either value.