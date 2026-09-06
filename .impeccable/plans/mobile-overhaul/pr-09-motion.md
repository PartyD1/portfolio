# PR 09: the motion pass for phones

Branch: `mobile/09-motion`. Size: M. Motion skill: **yes, first thing** (this whole PR is designed through `emil-design-eng`; report the Before/After/Why table in the PR body). `/polish`: yes. Real device: **yes** (this PR is about feel; the emulator cannot judge it).

Depends on PRs 02 to 08 merged. Decision: **D6** (quiet ambient, better touch feedback; one optional scroll-linked wash move behind a measurement gate).

## 1. The phone's motion today

| Family | Phone today | Verdict |
|---|---|---|
| Ambient (blob drift, spotlight) | off under 760px; none on touch | correct, keep |
| Caret blink | runs | keep (it is the one resting motion) |
| Typewriter | 52ms/char, pauses off-screen and on hidden tab | keep |
| Hero rise (four rungs) | 600ms, 60ms stagger | keep; PR 02 added the cue as the fourth rung |
| Hero recede | scroll-driven; PR 02 set the phone shift to 8% | tune here |
| Flagship unveil | disabled on phones by PR 02 | decide here (kept off) |
| Reveal rise | 24px, 450ms, `i * 50ms` stagger on cards | too much travel and a pointless stagger on a one-card-wide screen |
| Timeline rail, nodes, flow rail, nodes | draw and settle on scroll-in | keep; PR 07 designed the flow's |
| Sheet | PR 04: 360ms up, 240ms down, 30ms link stagger | tune on device |
| Slideshow | native swipe; 260ms `easeOut` for arrows and dots; dialog 200/140 | keep |
| Press states | most pressables at 0.97/0.98; slideshow arrows' press is inside the reduced-motion guard; dots have none | fix |
| Hover states | all gated behind `(hover: hover) and (pointer: fine)` | correct |

## 2. Decisions, per the framework

**Should it animate at all?** The phone visitor sees each of these once per visit (rises, draws, the sheet) or continuously while reading (caret). Nothing here fires a hundred times a day. Keyboard-initiated actions (the `1` to `4` shortcuts) already scroll with `behavior: "auto"`.

**Purpose.** Feedback (press), spatial consistency (the sheet from the thumb's edge), explanation (the rails draw in order), preventing jarring changes (the rises). No "it looks cool" motion is added; the one candidate (section 7) is scroll-linked, where the finger is the clock.

**Easing and duration.** `--ease-out` for entrances and press, `--ease-drawer` for the sheet, `--ease-in-out` for the cue's nod, `linear` for anything scroll-driven. Everything under 300ms except the sheet (360) and the reveal (380).

## 3. Press states

```css
/* Every pressable acknowledges the finger. These are feedback, so they live
 * OUTSIDE the motion preference, like every other press on the site. */
.shots__arrow:not(:disabled):active {
  transform: scale(0.94);
}
.shots__dot:active::before {
  transform: scale(0.9);
}
.shots__dot[aria-current]:active::before {
  transform: scale(1.2);
}
.menu__foot-row a:active,
.shots__expand:active,
.copy:active {
  transform: scale(0.97);
}
.contact__email:active,
.menu__email:active {
  text-decoration-color: var(--ink);
  transition-duration: 120ms;
}
```

Move the slideshow arrows' press rule out of the `@media (prefers-reduced-motion: no-preference)` block (PR 08 may have done it; verify). The transitions stay at 160ms `--ease-out`.

**The card press on iOS.** The press rule is `.card:active`, and the finger lands on `.card__hit` (an anchor descendant). If, on a real iPhone, the article does not take `:active` from its descendant, replace the selector with `.card:has(.card__hit:active)` (Safari 15.4 and up), which is unambiguous. Verify on the device before deciding; do not add a `touchstart` listener.

## 4. Reveal on phones

`components/Reveal.tsx`: the observer's `rootMargin` becomes `"0px 0px -8% 0px"` on phones, so an element rises once it is 8% into the viewport rather than at the very edge, where a phone's rounded corner and the browser's toolbar hide it:

```ts
const phone = window.matchMedia("(max-width: 760px)").matches;
const io = new IntersectionObserver(cb, {
  threshold: 0.12,
  rootMargin: phone ? "0px 0px -8% 0px" : "0px",
});
```

One `matchMedia` read in the effect; no listener (a rotation re-runs nothing here, and the difference is 8%).

```css
@media (max-width: 760px) {
  [data-reveal="pending"] {
    transform: translateY(16px);
  }
  [data-reveal="in"] {
    transition:
      opacity 380ms var(--ease-out),
      transform 380ms var(--ease-out);
  }
  /* Risk R4: Reveal writes the card stagger inline (delay = i * 50ms). On a
   * phone one card is on screen at a time, so the stagger is only a wait.
   * The one documented !important on the site. */
  .work__item[data-reveal] {
    transition-delay: 0ms !important;
  }
}
```

The timeline items keep their `120 + i * 70` delays: two or three of them are on screen together at 390.

## 5. The scroll-linked moments

- **Hero recede (PR 02).** Confirm on the device that the name leaves before the WORK label reaches mid-screen and that the 8% shift never overlaps the label. If the fade feels early on a tall phone, move the range end from `exit 85%` to `exit 100%` on phones only; do not touch the desktop range. Add `--recede-scale: 0.9` beside the other two tokens and set it to `0.94` under 760px: a 39px name shrinking to 90% reads as a wobble, at 94% it reads as depth.
- **Flagship unveil.** Stays off on phones. The card is in the fold at load; an unveil on the second card instead would be decoration seen once, and the phone budget (D6) says no. Record the decision in the CSS comment.
- **Case headline recede (PR 06).** Same tokens; nothing further.

## 6. The sheet, after the device

PR 04 ships 360ms up on `--ease-drawer`, 240ms down, links at 300ms with a 30ms stagger from 60ms. On the device, judge three things and adjust within these bounds only: entrance 320 to 400ms; exit 200 to 260ms; stagger 24 to 40ms. Write the chosen numbers back into PR 04's CSS comments.

**Drag-to-dismiss: deferred, deliberately.** It needs pointer capture, a velocity threshold (about 0.11 px/ms), damping past the top, multi-touch protection and a spring on release, roughly 150 lines of gesture code for a sheet with four links that already closes by pill and by overlay. If the sheet ever carries more content, build it then, on the framework's gesture rules.

## 7. Optional: the wash follows the finger (measure first)

The phone's world is frozen: no drift, no spotlight. One scroll-linked move would let the blobs answer the finger without any ambient budget, because the reader is the clock. **Do not ship without the measurement in section 9.**

```css
@supports (animation-timeline: scroll()) {
  @media (max-width: 760px) and (prefers-reduced-motion: no-preference) {
    /* The two bottom blobs drift up a little over the whole document; the
     * two top ones drift down. Transform only, on the compositor. The drift
     * stop rule below must become animation-NAME: none, or it kills this. */
    .wash__blob--c,
    .wash__blob--d {
      animation: wash-scroll-up linear both;
      animation-timeline: scroll(root);
    }
    .wash__blob--a,
    .wash__blob--b {
      animation: wash-scroll-down linear both;
      animation-timeline: scroll(root);
    }
  }
}
@keyframes wash-scroll-up {
  to {
    translate: 0 -8vh;
  }
}
@keyframes wash-scroll-down {
  to {
    translate: 0 6vh;
  }
}
```

The existing phone rule `.wash__blob { animation: none !important }` (the drift stop) has to change to `animation-name: none` scoped to the drift keyframes, or this cannot run. If a real iPhone 12-class device drops frames while scrolling the Work grid with this on, remove it and keep the frozen wash; the blobs are 82vw SVGs with gradients and a clip, and four of them moving under twenty blurred cards is exactly the compositor load PR 10 is trying to lower.

## 8. Reduced motion, audited on the phone

| Animation | `reduce` behaviour | Verified by |
|---|---|---|
| Caret blink | runs (opacity only) | `getAnimations()` |
| Typewriter | whole-phrase swap, 3.4s | `RoleRoll` `data-mode` |
| Hero rise, cue nod | none; the cue is still | fold capture |
| Recede, unveil | none | motion probe |
| Reveal | none (elements visible at once) | `[data-reveal]` absent |
| Rails, nodes | opacity only | flow and timeline probes |
| Sheet | fade 200/140 | PR 04 gate |
| Dialog | opacity only | PR 08 gate |
| Press states | still run (feedback) | tap |

## 9. Gate

`node scripts/mobile-capture.mjs --routes /,/work/operations-agent,/work/scorely-ai --widths 320,390,430 --themes light --motion`, then the device.

- [ ] Every pressable in the harness's target list has a computed `transform` change on `:active` (script: `dispatchEvent(new PointerEvent("pointerdown"))` is not enough; use Playwright's `page.mouse.down()` over the element with `hasTouch` and read `getComputedStyle().transform` while held).
- [ ] Motion probe at rest: `blink` and the view-timeline animations only; with section 7 on, plus the two `wash-scroll-*` (scroll timelines).
- [ ] `[data-reveal="pending"]` cards have `transitionDelay` `0s` at 390 and `i * 50ms` at 1440.
- [ ] Reduced motion table (section 8) confirmed on the emulator, then on the device with Reduce Motion on.
- [ ] Device: 60fps scrolling the Work grid, before and after section 7 (Safari Web Inspector, Timelines, Rendering Frames); the sheet's feel signed off with the three numbers written down.
- [ ] Desktop 1440 identical to baseline except the slideshow arrow press rule now outside the guard.

Commit title: `Motion on phones: feedback under the finger, quieter rises, the recede at phone scale`.
