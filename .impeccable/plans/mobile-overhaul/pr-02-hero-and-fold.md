# PR 02: the hero and the fold on phones

Branch: `mobile/02-hero-and-fold`. Size: M. Motion skill: **yes** (the scroll cue's entrance, the recede's phone values). `/polish`: yes. Real device: no (PR 09 covers the recede on a real thumb).

Depends on PR 01. Decisions: **D1** (two lines), **D2** (the card peeks in).

Baseline to look at first: `home-390-light-fold.png`, `home-320-light-fold.png`, `home-390-light-sheet.png` screen 1.

## 1. Why (measured, 390 x 844)

| | Today |
|---|---|
| `.hero__title` | 23.01px, one line, 311px wide in a 351px column (19px at 320, 27px at 430) |
| `.hero__role` (typewriter) | 14px at every phone width |
| `.hero__avail` | 15px, wraps to two lines with the separator dot orphaned at the end of line 1 |
| Hero height | 620px (`min(100svh, 620px)`), content centred: about 200px of empty ground above the name and 200px below the facts |
| First tappable thing | none until the flagship card, whose top edge is at y=746 |
| At 320 x 568 | the hero is the whole first screen; the name is 19px |

The desktop hero is 64px because the whole line has to clear a 1140 column. On a phone the same one-line rule shrinks the headline to a caption. The name is the memorable moment of this site (surface brief: outline-and-fill headline) and the phone does not get it.

## 2. What it becomes

At 390 x 844, top to bottom: the shell (mark and toggle); empty ground with the two top blobs; then, set low on the screen, `HEY, I'M` in outline on one line and `PARTH DOSHI` filled on the next at 39px with the wave under it; the typewriter at 22px; the three facts stacked one per line at 16px; a small drawn arrow (the scroll cue, also a link to `#work`); then `WORK` and the top 98px of the flagship card inside the fold. The name reads as a headline; the card's edge says there is more.

## 3. Files

- `components/Hero.tsx`: add the scroll cue after the facts.
- `app/globals.css`: the hero phone block (~line 1250 after PR 01 moved it to 760px), the recede keyframe, the `.work__item--flagship` unveil guard, `.section--work` phone padding.
- `components/ScrollScrub.tsx`: read `--recede-shift` beside `--recede-blur`.
- `.impeccable/surfaces/homepage.md`: one paragraph under FIRST VIEWPORT for phones.
- `.impeccable/review/manifest.json` `gates.heroInvariant` text (see section 8).

## 4. The arithmetic (do not skip)

Measured widths of the runs, from the fontTools pass recorded in `.impeccable/plans/recruiter-overhaul/01-hero.md`, all-caps Unbounded at `letter-spacing: 0.005em`:

| Run | Weight | Width |
|---|---|---|
| `HEY, I'M` | 400 (outline) | 4.847em |
| `PARTH DOSHI` | 700 | 8.697em (the live measurement at 390 gives about 8.52em; use 8.697 as the conservative bound) |
| typewriter slot, widest phrase + caret | 700 | 14.43em (the `.hero__role` box is 202px at 14px today) |

The column is `vw - 2 * gutter`, gutter `clamp(14px, 5vw, 20px)`: 252 at 280, 288 at 320, 324 at 360, 351 at 390, 390 at 430, 720 at 760.

**The name line is the binding constraint.** With `font-size: clamp(28px, 10vw, 44px)`:

| vw | column | name px | `PARTH DOSHI` px | of column |
|---|---|---|---|---|
| 280 | 252 | 28.0 | 243.5 | 96.6% |
| 320 | 288 | 32.0 | 278.3 | 96.6% |
| 360 | 324 | 36.0 | 313.1 | 96.6% |
| 390 | 351 | 39.0 | 339.2 | 96.6% |
| 430 | 390 | 43.0 | 374.0 | 95.9% |
| 440 to 760 | 400 to 720 | 44.0 | 382.7 | 95.7% to 53% |

Under 97% everywhere, which leaves the ±2% kerning band inside 100%. Both bounds are px (The Px-Bound Display Rule), so a 20px root font produces the same table. `HEY, I'M` is 56% of the name line and never binds; the no-text-stroke fallback sets it at 700, still under 60%.

**The typewriter slot** with `font-size: clamp(16px, 5.6vw, 24px)`:

| vw | column | role px | slot px | of column | ratio to name |
|---|---|---|---|---|---|
| 280 | 252 | 16.0 | 231 | 91.6% | 0.57 |
| 320 | 288 | 17.9 | 259 | 89.8% | 0.56 |
| 390 | 351 | 21.8 | 315 | 89.8% | 0.56 |
| 430 | 390 | 24.0 | 346 | 88.8% | 0.56 |

The slot keeps `white-space: nowrap` and the hero keeps `overflow: clip`, so a violation clips visibly and is assertable, exactly as today. The descriptor stays under 0.85x the name (the existing `heroHierarchy` gate) at every width.

## 5. CSS

Replace the phone hero block with:

```css
@media (max-width: 760px) {
  .hero {
    /* The fold ends with the WORK label and the top of the flagship card:
     * --peek is that slice, and the hero is everything above it. Bottom-set
     * rather than centred, so the empty ground is the sky above the name
     * (where the two top blobs are) and not a gap between the name and the
     * work. 180px = the Work section's 20px top padding + the 34px title +
     * its 20px margin + about 98px of card. */
    --peek: 180px;
    min-height: calc(100svh - var(--peek));
    align-content: end;
    padding-block: 96px 36px;
  }
  .hero__title {
    /* Two lines. Bounds in px (The Px-Bound Display Rule); 10vw is the
     * largest slope at which PARTH DOSHI clears 97% of the column at every
     * width from 280 to 440, where the 44px cap takes over. See the table in
     * .impeccable/plans/mobile-overhaul/pr-02-hero-and-fold.md. */
    font-size: clamp(28px, 10vw, 44px);
    line-height: 1.06;
  }
  /* The name takes its own line. The wave is absolutely positioned inside
   * it, so it follows. */
  .hero__name {
    display: block;
  }
  .hero__role {
    margin-top: 14px;
    /* 0.56x the name at every phone width; the slot (14.43em) stays under
     * 92% of the column down to 280px. */
    font-size: clamp(16px, 5.6vw, 24px);
  }
  .hero__avail {
    flex-direction: column;
    gap: 4px;
    margin-top: 18px;
    font-size: 1rem;
  }
  /* One fact per line: no separator to orphan. */
  .hero__avail li:not(:last-child)::after {
    content: none;
  }
  .type-outline {
    -webkit-text-stroke-width: max(1.1px, 0.03em);
  }
}
```

The Work section's top on phones, so the peek arithmetic holds:

```css
@media (max-width: 760px) {
  .section--work {
    padding-top: 20px;
  }
  .section--work .section__head {
    margin-bottom: 20px;
  }
}
```

(PR 05 sets the general phone section rhythm; these two lines belong to the fold and ship here. If PR 05 lands first, it must keep them.)

## 6. The scroll cue

Markup, in `Hero.tsx` after the `<ul className="hero__avail">`:

```tsx
{/* Phones only (CSS): the one tappable thing in the fold, and the drawn
    hint that the page continues. An anchor, not a decoration, so it is a
    44px target with a name. */}
<a className="hero__cue" href="#work" aria-label="Scroll to the work">
  <ArrowDown />
</a>
```

`ArrowDown` already exists in `components/Icon.tsx`.

```css
.hero__cue {
  display: none;
}
@media (max-width: 760px) {
  .hero__cue {
    display: grid;
    place-items: center;
    width: 44px;
    height: 44px;
    margin: 10px 0 0 -12px; /* the arrow's stem lands on the column's left edge */
    color: var(--ink-2);
    border-radius: 999px;
    transition: transform 160ms var(--ease-out);
  }
  .hero__cue .icon {
    width: 22px;
    height: 22px;
  }
  .hero__cue:active {
    transform: scale(0.97);
  }
}
```

Motion, per the framework (seen once per visit, purpose: affordance):

```css
@media (max-width: 760px) and (prefers-reduced-motion: no-preference) {
  /* The fourth rung of the fold's ladder, where the arrow links used to be. */
  .hero__cue {
    animation:
      rise 600ms var(--ease-out) 180ms both,
      cue-nod 1100ms var(--ease-in-out) 1400ms 2;
  }
}
@keyframes cue-nod {
  50% {
    translate: 0 5px;
  }
}
```

Two nods and it is still; `translate:` not `transform:` so it composes with the rise; `--ease-in-out` because it is on-screen movement, not an entrance. Under reduced motion the cue simply exists. It fades with the hero's recede because it is inside the hero.

## 7. The recede on phones

Today `recede` translates the block down 22% of its height as it fades. With the hero bottom-set and the card peeking, that 22% (about 146px) pushes the fading name into the WORK label. Make the shift a variable, like the blur already is:

```css
.hero,
.case__headline {
  --recede-blur: 0px;
  --recede-shift: 22%;
  transform-origin: 50% 45%;
}
@media (max-width: 760px) {
  .hero,
  .case__headline {
    --recede-shift: 8%;
  }
}
@keyframes recede {
  to {
    opacity: 0;
    scale: 0.9;
    translate: 0 var(--recede-shift);
    filter: blur(var(--recede-blur));
  }
}
```

`components/ScrollScrub.tsx` mirrors the keyframe by hand; read the new variable the same way it reads `--recede-blur` and use it in the `translate` value. Change both, per the file's own comment.

**The flagship unveil on phones (risk R3).** The card is already a fifth of the way into the viewport at load, so `card-unveil` would render it clipped and half-transparent in the fold. Inside the existing `@supports (animation-timeline: view())` block add:

```css
@media (max-width: 760px) {
  .work__item--flagship .card {
    animation: none;
  }
}
```

The hero recede is the phone's whole handoff. PR 09 revisits whether the phone wants a lighter unveil on the **second** card instead; do not add one here.

## 8. Rewriting the invariant (risk R1)

`.impeccable/review/manifest.json` records `heroInvariant` as "no wrap at any width". Replace its text with: *"Above 760px: the one-line headline clears the column (unchanged). At 760px and under: the name line `PARTH DOSHI` is at most 97% of the column at 280, 300, 320, 360, 390, 400, 430, 600, 720 and 760, at 16px and 20px root; the typewriter slot is at most 92%; the title box is exactly two lines (height between 2.0x and 2.2x the font size)."* Record the measured numbers from the gate beside it.

## 9. Gate

`node scripts/mobile-capture.mjs --routes / --widths 280,300,320,360,390,400,430,600,720,760 --themes light,dark --root20 --motion --landscape --tablet`.

- [ ] `.hero__title` font-size 28 / 32 / 36 / 39 / 43 / 44 at 280 / 320 / 360 / 390 / 430 / 600; identical under `--root20`.
- [ ] `.hero__name` width at most 97% of `.hero__title` width at every width; `.hero__title` box height between 2.0x and 2.2x its font size (two lines, never three).
- [ ] `.hero__role` 16 / 17.9 / 21.8 / 24 at 280 / 320 / 390 / 430; its box at most 92% of the column; `hOverflow` 0.
- [ ] `.hero__avail` is three rows, no visible dots.
- [ ] At 390 x 844: `section#work` top at most 664 (844 - 180) and the flagship card's top at most 746, so at least 98px of card is in the fold. At 320 x 568 and 430 x 932 the card's top edge is inside the fold.
- [ ] `.hero__cue` 44x44 at 390, absent (`display: none`) at 1440 and at 844 x 390 landscape.
- [ ] Motion probe at 390: at rest, running animations are `blink` and `recede(view)` only (no `card-unveil`); `heroAt300` shows `translate` at most `0px 8%` of the hero height and `opacity` under 0.6.
- [ ] Reduced motion: `blink` only; the cue is visible and still.
- [ ] 1440 light and dark captures identical to baseline (nothing here applies above 760 except the recede variable, which resolves to the same 22%).
- [ ] 768 sanity unchanged.
- [ ] Both themes: the outline lead is visible in dark (stroke `--ink` = `#ecebf4`).

Commit title: `Hero on phones: the name on its own line, the fold ends on the work`.
