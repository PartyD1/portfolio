# PR 08: case-study sections, the slideshow and the foot on phones

Branch: `mobile/08-sections-and-slideshow`. Size: L. Motion skill: **yes** (the dialog's entrance and exit, the slide feel). `/polish`: yes. Real device: **yes** (swipe, snap, expand, pinch).

Depends on PR 01 (and PR 05's `(hover: none)` pill rule for the foot links, which this PR adds if PR 05 has not landed). Decision: **D11** (peek the next slide; tall captures expand into a native dialog).

Baseline to look at first: `scorely-390-light-sheet.png` screens 3 to 6, `ops-390-light-sheet.png` screens 3 to 6.

## 1. Why (measured, 390 x 844)

| | Today |
|---|---|
| Sections | five, each with 64px above it, a 24px title, 16px/1.55 bullets with a drawn dot; 267 to 663px each |
| Slideshow stage | `--shots-h` = column / 1.6 = **219px**; the 2.54:1 ScorelyAI landing capture renders 351 x 138 with 81px of air in the stage |
| Slides | 100% wide, 18px apart: the next screenshot is **invisible** until the reader guesses to swipe |
| Dots | 24px targets (36 x 44 after PR 01) |
| Tall captures | cropped to 16:10 and the top; there is no way to see the rest on a phone |
| Caption, count | 14px, 13px (14 after PR 01) |
| Foot | title 28px, lede 17px, email 24px, links as 44px text without their hover underline; 72px margin plus 56px padding above, 96 below |
| Route lengths | Operations Agent 4,311px (5.1 screens), ScorelyAI 4,685, Santa Claws 4,966 |

## 2. What it becomes

Sections one step tighter with body-sized bullets. The slideshow bleeds to the viewport edges, each slide 88% of the column so the next one shows its edge (the universal "there is more" of a phone carousel), snapping to the column's left edge. A tall capture keeps its top crop and gains a 44px expand control that opens the whole screenshot in a native full-screen dialog the reader can scroll and pinch. The foot is one step tighter with the copy control (PR 05) and pill links.

## 3. Files

- `app/globals.css`: case sections, `.shots` phone block, dialog rules, foot phone block.
- `components/Slideshow.tsx`: the expand button on tall slides, the dialog, the `sizes` value.
- `components/Icon.tsx`: `Expand` (two diagonal arrows) and `Cross` if PR 04 has not added it.

## 4. Sections

```css
@media (max-width: 760px) {
  .case__section {
    padding-top: 44px;
  }
  .case__section-title {
    /* 26px at 390. */
    font-size: clamp(24px, 6.7vw, 32px);
  }
  .case__points {
    gap: 10px;
    margin-top: 14px;
  }
  .case__points li {
    padding-left: 20px;
    /* Body parity: the bullets are the body of a case study. */
    font-size: 1.0625rem;
    line-height: 1.5;
  }
  .case__points li::before {
    top: 0.6em;
  }
}
```

The 17px bullets add about 6% to each section's height and the 20px cut from every section's top takes it back; the routes net out about 150px shorter.

## 5. The slideshow

### 5.1 Peek and snap

```css
@media (max-width: 760px) {
  .shots {
    /* The stage is the 16:10 the tall captures fill at 88% of the column;
     * landscape captures sit centred in it as before. */
    --shots-h: calc((100vw - var(--gutter) * 2) * 0.88 / 1.6);
    padding-top: 44px;
  }
  .shots__title {
    margin-bottom: 16px;
  }
  /* The track bleeds to the viewport edges and pads back to the column, so a
   * slide snaps to the column's left edge and the next slide's first 12% is
   * visible past it. Nothing is clipped at the gutter. */
  .shots__track {
    gap: 12px;
    margin-inline: calc(var(--gutter) * -1);
    padding-inline: var(--gutter);
    scroll-padding-inline: var(--gutter);
  }
  .shots__slide {
    flex: 0 0 88%;
  }
  /* Trailing room so the LAST slide can also snap to the start position. */
  .shots__track::after {
    content: "";
    flex: 0 0 calc(12% - 12px);
  }
  .shots__cap {
    margin-top: 10px;
    font-size: 0.9375rem;
  }
  .shots__controls {
    margin-top: 14px;
    gap: 8px;
  }
}
```

`Slideshow.tsx`: `sizes="(max-width: 760px) 84vw, 1140px"` (88% of a column that is about 90vw). `goTo()` already targets `target.offsetLeft - track.offsetLeft`; with the track padded, subtract the padding too: read `parseFloat(getComputedStyle(track).paddingLeft)` once in `goTo` and use `target.offsetLeft - track.offsetLeft - pad`. The IntersectionObserver that reads the active index back out of the scroll position keeps `threshold: 0.6`, which a 88% slide still satisfies.

### 5.2 Tall captures expand (D11)

In `Slideshow.tsx`, for a slide with `m.height > m.width`:

```tsx
<div className="shots__frame" data-tall="" style={{ "--ar": ... }}>
  <Image ... />
  {/* Phones only (CSS): the top crop is the honest phone view of a long
      page, and this is the way to see the rest of it. */}
  <button
    type="button"
    className="shots__expand"
    aria-label={`Expand: ${m.alt}`}
    onClick={() => openDialog(m)}
  >
    <Expand />
  </button>
</div>
```

One dialog per slideshow, after the controls:

```tsx
<dialog
  ref={dialogRef}
  className="shots__dialog"
  aria-label={expanded?.alt}
  onClick={(e) => { if (e.target === e.currentTarget) dialogRef.current?.close(); }}
>
  <button type="button" className="shots__dialog-close" aria-label="Close" onClick={() => dialogRef.current?.close()}>
    <Cross />
  </button>
  <div className="shots__dialog-scroll">
    {expanded && (
      <Image src={expanded.src} alt={expanded.alt} width={expanded.width} height={expanded.height} sizes="100vw" />
    )}
  </div>
</dialog>
```

`openDialog(m)` sets `expanded` state then calls `dialogRef.current?.showModal()` in an effect keyed on `expanded`. `showModal()` gives focus to the close button, makes the page inert, and closes on Escape; on close the browser returns focus to the expand button that opened it. Clear `expanded` on the dialog's `close` event so the image unmounts.

```css
.shots__expand {
  display: none;
}
@media (max-width: 760px) {
  .shots__expand {
    position: absolute;
    right: 10px;
    bottom: 10px;
    display: grid;
    place-items: center;
    width: 44px;
    height: 44px;
    padding: 0;
    border-radius: 999px;
    border: 1px solid var(--glass-edge);
    background: var(--glass-raised);
    -webkit-backdrop-filter: blur(12px);
    backdrop-filter: blur(12px);
    color: var(--ink);
    cursor: pointer;
    transition: transform 160ms var(--ease-out);
  }
  .shots__expand svg {
    width: 18px;
    height: 18px;
    fill: none;
    stroke: currentColor;
    stroke-width: 2.25;
    stroke-linecap: round;
    stroke-linejoin: round;
  }
  .shots__expand:active {
    transform: scale(0.97);
  }
}

/* The dialog: the whole screen, the page's ground, the screenshot at full
 * width scrolling inside it. Native, so focus, Escape and inertness come
 * from the platform. */
.shots__dialog {
  width: 100vw;
  max-width: none;
  height: 100svh;
  max-height: none;
  margin: 0;
  padding: 0;
  border: 0;
  background: var(--ground);
  color: var(--ink);
}
.shots__dialog::backdrop {
  background: var(--ground);
}
.shots__dialog-scroll {
  height: 100%;
  overflow: auto;
  overscroll-behavior: contain;
  padding: max(64px, calc(var(--safe-top) + 56px)) max(12px, var(--safe-right)) max(24px, var(--safe-bottom)) max(12px, var(--safe-left));
}
.shots__dialog-scroll img {
  display: block;
  width: 100%;
  height: auto;
  border-radius: var(--radius-card);
  border: 1px solid var(--glass-edge);
  background: var(--media-well);
}
.shots__dialog-close {
  position: fixed;
  top: max(12px, var(--safe-top));
  right: max(12px, var(--safe-right));
  z-index: 1;
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  padding: 0;
  border-radius: 999px;
  border: 1px solid var(--glass-edge);
  background: var(--glass-strong);
  -webkit-backdrop-filter: blur(16px);
  backdrop-filter: blur(16px);
  color: var(--ink);
  cursor: pointer;
  transition: transform 160ms var(--ease-out);
}
.shots__dialog-close svg {
  width: 18px;
  height: 18px;
  fill: none;
  stroke: currentColor;
  stroke-width: 2.25;
  stroke-linecap: round;
}
.shots__dialog-close:active {
  transform: scale(0.97);
}
/* The page behind must not scroll while the dialog is up. */
html:has(.shots__dialog[open]) {
  overflow: hidden;
}
```

The `Expand` icon: `<path d="M11 3h6v6M17 3l-7 7M9 17H3v-6M3 17l7-7" />` in the 20x20 box.

Pinch-zoom inside the dialog works because the page's viewport meta allows user scaling (the Next default) and `touch-action: manipulation` is only on buttons (PR 01).

### 5.3 Motion (emil-design-eng)

| | Value | Why |
|---|---|---|
| Dialog enter | opacity 0 to 1, `scale` 0.98 to 1, 200ms `--ease-out`, via `@starting-style` | a modal; nothing from `scale(0)`; under 300ms |
| Dialog exit | opacity to 0, 140ms `--ease-out`, `transition-behavior: allow-discrete` on `display` and `overlay` | exits faster |
| Reduced motion | opacity only | fewer and gentler |
| Expand, close, dots | `:active` 0.97 (dots: the drawn dot to 0.9) 160ms | press feedback |
| Slide travel | the existing 260ms `easeOut` on `scrollLeft` for arrows and dots; a swipe is native momentum | the reader is the clock |

```css
.shots__dialog[open] {
  opacity: 1;
  scale: 1;
  transition:
    opacity 200ms var(--ease-out),
    scale 200ms var(--ease-out),
    display 200ms allow-discrete,
    overlay 200ms allow-discrete;
  @starting-style {
    opacity: 0;
    scale: 0.98;
  }
}
.shots__dialog {
  opacity: 0;
  scale: 1;
  transition:
    opacity 140ms var(--ease-out),
    display 140ms allow-discrete,
    overlay 140ms allow-discrete;
}
@media (prefers-reduced-motion: reduce) {
  .shots__dialog[open] {
    scale: 1;
    @starting-style {
      scale: 1;
    }
  }
}
```

Engines without `@starting-style` show the dialog instantly, which is the correct fallback.

Also move the slideshow arrows' `:active` scale **out** of the `prefers-reduced-motion` guard it currently sits in: press feedback is feedback, not motion, and every other pressable on the site has it unconditionally.

## 6. The foot

```css
@media (max-width: 760px) {
  .case__foot {
    margin-top: 56px;
    padding: 44px 0 88px;
  }
  .case__foot-title {
    /* 30px at 390. */
    font-size: clamp(28px, 7.7vw, 44px);
  }
  .case__foot-lede {
    margin-top: 14px;
  }
  .case__foot .address,
  .case__foot .contact__email {
    margin-top: 22px;
  }
  .case__foot-links {
    gap: 10px;
    margin-top: 24px;
  }
}
```

PR 05's `(hover: none)` pill rule already names `.case__foot-links .link-arrow`; if PR 05 has not landed, add that rule here verbatim and note it.

## 7. Accessibility

- The track keeps `role="group"`, its label, the arrow keys, and the per-slide "n of m" labels.
- The expand button's name includes the alt text, so a screen-reader user knows which screen expands; the dialog is labelled with the same alt.
- `showModal()` traps focus natively; Escape closes; focus returns to the expand button.
- The dots are 36 x 44 targets (PR 01), `aria-current` on the active one.

## 8. Gate

`node scripts/mobile-capture.mjs --routes /work/scorely-ai,/work/santaclaws,/work/wordplay,/work/operations-agent --widths 320,390,430 --themes light,dark --motion`, plus a scripted pass on `/work/santaclaws` at 390:

- [ ] At index 0, the second slide's left edge is inside the viewport (its rect's `left` under 390) and the first slide's left edge equals the column's left edge (`gutter`, 19.5px at 390).
- [ ] `goTo(1)` lands the second slide at the same left edge and the dots report index 1; `goTo(last)` lands the last slide at the left edge (the trailing room works).
- [ ] The tall frame (`[data-tall]`) is 16:10 and the full 88% width; `.shots__expand` is 44x44 inside it under 760 and `display: none` at 1440.
- [ ] Clicking expand: `dialog.open` is true, `document.activeElement` is the close button, `html` has `overflow: hidden`, the image inside is at least 1,000px tall (the real capture); closing restores focus to the expand button and `overflow`.
- [ ] Running animations at rest: `blink` only (the dialog's transition is not running once open).
- [ ] `/work/wordplay` (no media) renders no `.shots` section and no dialog.
- [ ] `sections` at 390: every `case__section` at least 20px shorter than baseline; `case__foot` at most 420 on ScorelyAI.
- [ ] `hOverflow` 0 on every route (the track's negative margin must not widen the document: `overflow-x: clip` on `.case` if it does, and say so).
- [ ] Desktop 1440 identical to baseline (no peek, no expand, no dialog rules apply; the `sizes` change only affects which source the browser picks, verify the 1200w source is still chosen).
- [ ] Real device: swipe with momentum snaps cleanly; the expand dialog scrolls and pinch-zooms; the close pill clears the notch.

Commit title: `Case-study body on phones: tighter sections, a slideshow that shows what comes next, tall screens you can open`.
