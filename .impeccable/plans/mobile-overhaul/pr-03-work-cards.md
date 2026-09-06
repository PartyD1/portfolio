# PR 03: the Work cards on phones

Branch: `mobile/03-work-cards`. Size: L. Motion skill: yes (press feedback on the cue). `/polish`: yes. Real device: **yes** (card press, cue tap, corner control reach).

Depends on PR 01. Decisions: **D3** (corner arrow, phones only), **D4** (text full width, mark as a chip). Interacts with PR 02 (the flagship's top edge is in the fold; the unveil is disabled there) and PR 11 (contrast re-measure of the moved taglines).

Baseline to look at first: `home-390-light-sheet.png` screens 2 to 4, `home-390-light-fold.png`, `home-320-light-sheet.png`.

## 1. Why (measured, 390 x 844)

| | Today |
|---|---|
| Standard card grid | `minmax(0,1fr) minmax(0,34%)`: the text column is **183px**, the mark **102x102** |
| Taglines | 16px in 183px: ScorelyAI's runs **6 lines**, Santa Claws' 7 at 320 |
| Card heights | flagship 491; standard 275, 295, 316, 316, 375, 398 |
| Work section | 2,772px, 3.3 screens; 3,081px at 320 |
| Tap affordance | none visible; `.card__hit` is a 0x0 anchor whose `::after` covers the card; the desktop hover lift does not exist on touch |
| Repo control | 64px corner circle 16px from the left and bottom edges (the ScorelyAI card keeps a 56px in-flow one beside the live pill) |
| Press feedback | `.card:active { --press: 0.98 }` exists and fires on touch (good) |

The two-column card was designed for a 370px desktop card whose text column is about 235px. On a phone the same split starves the text and shrinks the mark to a thumbnail. And since PR #28 the only signal that a card opens is a hover state phones do not have.

## 2. What it becomes

A phone card is one column with a header row: a 60px glass chip carrying the mark, the name beside it; then the tagline across the full 351px (about three lines); then the facts where they exist; then the foot, which is the card's bottom edge with two corner controls: the GitHub circle bottom-left where it already lives, and a new drawn-arrow circle bottom-right that says "this opens". The whole card is still the link; the arrow is inside the link. The flagship is the one card that keeps a picture: its mark band moves to the **top** of the card as a 16:9 cover, then the same stack.

Target heights at 390: standard cards 244 (277 with a facts line), flagship about 477. Work section about 2,150px (from 2,772).

## 3. Files

- `components/ProjectCard.tsx`: add the cue span inside `.card__hit`; drop the `card__repo--corner` conditional's desktop meaning nothing changes there.
- `components/Artifact.tsx`: mark the lobster's fine detail (eyes, legs, pom-pom) with `className="mark__fine"` so the chip can hide it.
- `app/globals.css`: replace the phone card block (~line 2360 to 2400), add `.card__cue`, phone type rules.

## 4. Markup

```tsx
<Link className="card__hit" href={`/work/${slug}`}>
  <span className="sr-only">View the {name} case study</span>
  {/* Phones only (CSS, hover: none): the drawn arrow in the card's corner.
      Inside the link, so it IS the link; decorative to assistive tech, which
      already has the name above. */}
  <span className="card__cue" aria-hidden="true">
    <ArrowRight />
  </span>
</Link>
```

`.card__hit` stays a non-positioned block. That is load-bearing: its `::after` overlay is `position: absolute; inset: 0` and resolves against `.card` only while the anchor itself is not positioned. The cue is positioned against `.card` for the same reason.

In `Artifact.tsx`, on the `SantaClaws` mark, add `className="mark__fine"` to the two eye circles, the three leg paths, and the pom-pom circle. Nothing else changes; desktop renders them as before.

## 5. CSS

### 5.1 The phone card

Replace the `@media (max-width: 760px)` card rules with:

```css
@media (max-width: 760px) {
  .card {
    /* One column with a header row: the mark as a chip beside the name, the
     * tagline across the whole card. The old 34% mark column gave the text
     * 183px and the taglines ran six lines (2026-09-05 measurement). */
    grid-template-columns: 60px minmax(0, 1fr);
    grid-template-rows: auto auto auto;
    column-gap: 14px;
    row-gap: 12px;
    --card-pad: 18px;
  }
  .card__media {
    grid-column: 1;
    grid-row: 1;
    width: 60px;
    aspect-ratio: 1;
    padding: 9px;
    /* --radius (16px) is the chip radius the timeline's project mark
     * already uses; 22px on a 60px square reads as a circle. */
    border-radius: var(--radius);
    align-self: start;
  }
  .card__head {
    grid-column: 2;
    grid-row: 1;
    align-self: center;
    gap: 4px;
  }
  .card__body {
    grid-column: 1 / -1;
    grid-row: 2;
    gap: 10px;
  }
  .card__tagline {
    max-width: none;
  }
  .card__foot {
    grid-column: 1 / -1;
    grid-row: 3;
    min-height: 52px;
    padding-top: 10px;
    gap: 10px 12px;
  }
  /* The lobster's eyes, legs and pom-pom are 1px at chip size; at 42px of
   * art the silhouette is the mark. */
  .card__art .mark__fine {
    display: none;
  }
}
```

### 5.2 The corner controls on phones

```css
@media (max-width: 760px) {
  /* Every repo button is a corner control on a phone, ScorelyAI's included:
   * with the live pill beside it there is still room (16 + 52 + 12 + 150 +
   * 12 + 52 + 16 = 310 of 351). One size for a corner circle on a phone. */
  .card__repo,
  .card__repo--corner {
    --corner-inset: 16px;
    width: 52px;
    height: 52px;
    order: -1;
    margin-left: calc(var(--corner-inset) - var(--card-pad));
    margin-bottom: calc(var(--corner-inset) - var(--card-pad));
  }
  .card__repo .gh-mark {
    width: 26px;
    height: 26px;
  }
}

/* The cue: hidden wherever hover exists, because the hover lift already
 * says the card is live there. */
.card__cue {
  display: none;
}
@media (hover: none) {
  .card__cue {
    position: absolute;
    right: 16px;
    bottom: 16px;
    z-index: 1;
    display: grid;
    place-items: center;
    width: 52px;
    height: 52px;
    border-radius: 999px;
    border: 1px solid var(--glass-edge);
    background: var(--glass-raised);
    color: var(--ink);
  }
  .card__cue .icon {
    width: 22px;
    height: 22px;
    transition: transform 160ms var(--ease-out);
  }
  /* Press feedback on the arrow, on top of the card's own 0.98 press. */
  .card:active .card__cue .icon {
    transform: translateX(3px);
  }
}
```

No `backdrop-filter` on the cue: it sits on the card's glass, which is already blurred (the glass-on-glass rule PR 10 formalises). The GitHub circle keeps its blur for now; PR 10 decides.

At 320 the ScorelyAI foot (52 + 138 pill + 52 plus gaps) exceeds the 288px column by about 20px, so the live pill wraps to a second row on that one card at that one width. That is the foot working, not a bug; do not shrink the pill's type.

### 5.3 The flagship on phones

```css
@media (max-width: 760px) {
  .card--flagship {
    grid-template-columns: minmax(0, 1fr);
    grid-template-rows: auto auto auto auto;
    min-height: 0;
    --card-pad: 20px;
    row-gap: 14px;
  }
  /* The cover: the one picture on the page, first. */
  .card--flagship .card__media {
    grid-column: 1;
    grid-row: 1;
    width: 100%;
    max-width: none;
    aspect-ratio: 16 / 9;
    max-height: 176px;
    margin: 0;
    padding: 14px;
    border-radius: var(--radius-card);
    justify-self: stretch;
  }
  .card--flagship .card__head {
    grid-row: 2;
  }
  .card--flagship .card__body {
    grid-row: 3;
    padding-top: 0;
  }
  .card--flagship .card__foot {
    grid-row: 4;
  }
  .card--flagship .card__name {
    font-size: clamp(24px, 7.2vw, 40px);
  }
  .card--flagship .card__org {
    font-size: clamp(18px, 5.1vw, 24px);
  }
  .card--flagship .card__tagline {
    max-width: none;
  }
}
```

The Operations Agent mark's viewBox is 320 x 240 (4:3); inside a 16:9 well it letterboxes to the well's height, which is what the 14px padding is for. It keeps `opacity: 0.8`.

### 5.4 Phone card type

| Selector | Now (390) | After | Rule |
|---|---|---|---|
| `.card__name` (standard) | 20px | `clamp(20px, 5.6vw, 26px)` = 22px | `line-height: 1.04` |
| `.card__tagline` (standard) | 16px | 16px | unchanged; the width is the fix |
| `.card__fact`, `.card__use` | 15px | 15px | unchanged |
| `.card--flagship .card__name` | 26px | 28px | above |
| `.card--flagship .card__org` | 20px | 20px | above (the clamp gives 20 at 390) |
| `.card--flagship .card__tagline` | 17px | 17px | unchanged |

`.card__name` in the chip row: "WAVE FUNCTION COLLAPSE" at 22px in a 277px column wraps to two lines; the row is `auto` and the chip stays top-aligned to the first line (`align-self: start` on the chip, `center` on the head; with a two-line name the head is taller than the chip and centres against it, which is right).

## 6. What does not change

- The desktop card, the two-column grid at 1001px and up, the gradient-edge parity, the hover lift and glow, the GitHub mark's hover colour.
- `Reveal` and its delays (PR 09 zeroes them on phones).
- The `card-unveil` (PR 02 disables it on phones).
- Which fields render. Every card still shows name, tagline, facts, links.

## 7. Accessibility

- The cue is `aria-hidden`; the link's accessible name is the sr-only span, unchanged.
- Keyboard: `.card:focus-within` already lifts and glows; the cue does not need a focus style of its own (the anchor gets the 3px ring).
- The chip is `aria-hidden` via the Artifact's SVG `aria-hidden`, unchanged.

## 8. Gate

`node scripts/mobile-capture.mjs --routes / --widths 320,360,390,430 --themes light,dark --tablet`.

- [ ] `cards` line at 390: flagship at most 480; every standard card at most 250 except ScorelyAI (at most 285).
- [ ] `sections`: `work` height at most 2,200 at 390; at most 2,450 at 320.
- [ ] `.card__cue` is 52x52 at 16px from the card's right and bottom edges on every card at 390 and 320 (`getBoundingClientRect` against the card's rect); `display: none` at 1440 (the harness runs with hover emulated off, so add a desktop context with `isMobile: false` for this one check and confirm no cue paints).
- [ ] `.card__repo` 52x52 at 16px from the left and bottom edges on every card that has one; the ScorelyAI foot holds the pill and both circles on one row at 390.
- [ ] `.card__media` 60x60 on standard cards; the flagship's band at most 176px tall and the full card width.
- [ ] `.card:not(.card--flagship) .card__tagline` box width at least 300px at 390 (it was 183).
- [ ] `hOverflow` 0 at every width; nothing in `wide`.
- [ ] Both themes: the chip's `--glass-strong` on the card's `--glass` reads as a raised object in dark (compare against the timeline's project chip, which is the same pair).
- [ ] Desktop 1440 and 768 captures identical to baseline.
- [ ] Contrast spot-check (full method in PR 11): the Santa Claws and Gestura taglines at 390 in dark, which now sit over blob C's core at the left edge, clear 4.5:1; if not, the phone card takes `background: var(--glass-strong)` under 760px and the check is repeated.
- [ ] Real device: press a card (scales, no grey flash, opens); tap the arrow (opens the same page); tap the GitHub circle (opens the repo, not the case study).

Commit title: `Cards on phones: the mark becomes a chip, the text takes the width, the corner says it opens`.
