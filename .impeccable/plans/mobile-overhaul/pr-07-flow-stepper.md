# PR 07: the flow diagram on phones, as a rail-and-node stepper

Branch: `mobile/07-flow-stepper`. Size: L. Motion skill: **yes** (the rail draw, the node settle, the stagger). `/polish`: yes. Real device: no.

Depends on PR 01. Decision: **D10** (the timeline's vocabulary: one rail, numbered nodes on it, branches as chips).

Baseline to look at first: `ops-390-light-s01.png`, `ops-390-light-sheet.png` screens 1 to 3, `scorely-390-light-sheet.png` screen 2.

## 1. Why (measured, 390 x 844)

| | Today |
|---|---|
| Operations Agent flow | **1,179px**, 1.4 screens, for five steps |
| Each step | a full glass card (18/18/20 padding, 24px radius), a 26px index circle, title 16px, detail 14px |
| Branches | full-width 33px rows, one per line, 13px text (14 after PR 01): "Three checks" is three rows, "Crosses a threshold" three more |
| Connectors | a 30px vertical rule with a 14px arrowhead at `left: 24px`, sitting in a 30px gap between cards |
| Bus | a dashed panel under the chain, 16/20 padding |

On the desktop the chain runs left to right and the arrows carry the reading order. Stacked, the arrows are 30px of "then" between two large cards, and the diagram reads as a list of cards rather than as a system. The timeline one section up on the homepage already solved this shape: a rail, nodes on it, content beside it.

## 2. What it becomes

Under 900px (the flow's existing one-column threshold) the steps hang off one vertical gradient rail on the left, the same three-stop gradient the timeline and the card edges wear. Each step's index circle sits **on** the rail, ground-filled so the rail passes behind it; the step's glass panel sits to the right with tighter padding; branches become a wrapping row of small pills; the arrows go away because the rail is the connector. The bus keeps its dashed panel under the rail. Height for the Operations Agent flow about 690px (from 1,179).

## 3. Files

- `app/globals.css`: the `(max-width: 900px)` flow block (~line 2901) replaced, the reveal motion block extended.
- `components/Flow.tsx`: no change needed. The index is already inside the node and `aria-hidden`; the list is already an `<ol>`.

## 4. CSS

Replace the existing `@media (max-width: 900px)` flow block with:

```css
@media (max-width: 900px) {
  .flow__steps {
    position: relative;
    grid-template-columns: minmax(0, 1fr);
    row-gap: 14px;
    /* Room for the rail and the index circles that sit on it. */
    padding-left: 44px;
  }
  /* The rail: the timeline's vocabulary, so a reader who scrolled past the
   * homepage recognises "steps in order" without an arrow. */
  .flow__steps::before {
    content: "";
    position: absolute;
    top: 6px;
    bottom: 6px;
    left: 13px;
    width: 2px;
    border-radius: 999px;
    background: linear-gradient(
      to bottom,
      var(--blob-c-1),
      var(--blob-b-1),
      var(--blob-a-2)
    );
    transform-origin: top;
  }
  .flow__step {
    padding-right: 0;
    padding-bottom: 0;
  }
  /* The rail is the connector. */
  .flow__link {
    display: none;
  }
  .flow__node {
    padding: 12px 14px 14px;
    gap: 4px;
  }
  /* On the rail, level with the title, ground-filled so the rail visibly
   * passes behind it: the timeline node, one size up for a numeral. */
  .flow__index {
    position: absolute;
    top: 12px;
    left: -44px;
    width: 28px;
    height: 28px;
    margin: 0;
    border: 2px solid var(--ink);
    background: var(--ground);
    font-size: 0.8125rem;
    color: var(--ink);
  }
  .flow__title {
    font-size: 1.0625rem;
  }
  .flow__detail {
    font-size: 0.9375rem;
  }
  .flow__branches {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin-top: 8px;
  }
  .flow__branch {
    padding: 5px 10px 5px 20px;
    border-radius: 999px;
    font-size: 0.875rem;
    /* On the node's glass already; see PR 06 on glass-on-glass. */
    -webkit-backdrop-filter: none;
    backdrop-filter: none;
  }
  .flow__branch::before {
    left: 8px;
  }
  .flow__bus {
    grid-template-columns: minmax(0, 1fr);
    margin-top: 14px;
    padding: 14px 16px;
  }
  .flow__bus-title {
    font-size: 1rem;
  }
  .flow__bus-detail {
    font-size: 0.9375rem;
  }
}

@media (max-width: 760px) {
  .flow {
    margin-top: 40px;
  }
  .flow__heading {
    margin-bottom: 18px;
    /* 26px at 390. */
    font-size: clamp(24px, 6.7vw, 32px);
  }
}
```

Geometry check: the rail's centre is at `13 + 1 = 14px` from the list's left edge; the index circle spans `-44px` to `-16px` relative to the node, whose left edge is at the list's `44px` padding, so the circle spans `0` to `28px` and its centre is at `14px`. They meet.

`.flow__node` is `position: relative` already (the glow pseudo-element needs it); `.flow__branch` already has its dot on `::before`.

## 5. Motion (emil-design-eng)

Seen once per visit, on scroll-in. Purpose: explanation (the order of the system) and preventing a jarring appearance.

| Element | Pending | In | Timing |
|---|---|---|---|
| Rail (`.flow__steps::before`) | `scaleY(0)`, opacity 0 | `scaleY(1)`, opacity 1 | `transform 700ms var(--ease-out) 80ms, opacity 300ms var(--ease-out) 80ms` (the timeline's rail is 800; the flow's is shorter) |
| Node (`.flow__node`) | `translateY(12px)`, opacity 0 | none, 1 | `400ms var(--ease-out) calc(var(--i) * 60ms)` (existing, travel shortened from 14 to 12) |
| Index (`.flow__index`) | `scale(0.6)`, opacity 0 | none, 1 | `240ms var(--ease-out) calc(var(--i) * 60ms + 200ms)` (settles after its node) |
| Bus | opacity 0 | 1 | existing 400ms at 360ms |
| Reduced motion | opacity only on all four | | |

```css
@media (max-width: 900px) {
  .flow[data-reveal="pending"] .flow__steps::before,
  .flow[data-reveal="pending"] .flow__index {
    opacity: 0;
  }
  .flow[data-reveal="in"] .flow__steps::before {
    opacity: 1;
    transition: opacity 300ms var(--ease-out) 80ms;
  }
  .flow[data-reveal="in"] .flow__index {
    opacity: 1;
    transition: opacity 240ms var(--ease-out) calc(var(--i) * 60ms + 200ms);
  }
  @media (prefers-reduced-motion: no-preference) {
    .flow[data-reveal="pending"] .flow__steps::before {
      transform: scaleY(0);
    }
    .flow[data-reveal="in"] .flow__steps::before {
      transform: scaleY(1);
      transition:
        transform 700ms var(--ease-out) 80ms,
        opacity 300ms var(--ease-out) 80ms;
    }
    .flow[data-reveal="pending"] .flow__index {
      transform: scale(0.6);
    }
    .flow[data-reveal="in"] .flow__index {
      transform: none;
      transition:
        transform 240ms var(--ease-out) calc(var(--i) * 60ms + 200ms),
        opacity 240ms var(--ease-out) calc(var(--i) * 60ms + 200ms);
    }
    /* The existing link transition rules are moot under 900px (display:
     * none); leave them for the desktop. */
  }
}
```

`--i` is set on `.flow__step` by `Flow.tsx` and inherits to the node and the index. Transitions, not keyframes, so an interrupted scroll retargets (the existing pattern).

## 6. Accessibility

- The `<ol>` is unchanged; VoiceOver still reads "list, 5 items" and each item's title and detail.
- The index is `aria-hidden` (decorative numeral); the rail is a pseudo-element.
- Branch pills stay `<li>`s inside their `<ul>`.
- Contrast: the branch text moves from a full-width `--glass-raised` row to a `--glass-raised` pill, same surface; nothing to re-measure. The index numeral at 13px in `--ink` on `--ground` is the flat ground pair (measured 5.3:1 light in DESIGN.md).

## 7. Gate

`node scripts/mobile-capture.mjs --routes /work/operations-agent,/work/scorely-ai,/work/santaclaws,/work/gestura --widths 320,390,430,760,900 --themes light,dark --motion`.

- [ ] `sections`: `flow` height at most 800 on Operations Agent and Gestura, at most 720 on ScorelyAI and Santa Claws at 390; at most 950 at 320.
- [ ] The rail exists under 900 (`getComputedStyle(steps, "::before").width === "2px"`) and not at 1440.
- [ ] Every `.flow__index` centre x equals the rail's centre x within 1px; `.flow__link` has `display: none`.
- [ ] `.flow__title` 17px, `.flow__detail` 15px, `.flow__branch` 14px, `.flow__index` 13px in a 28px circle.
- [ ] Branch pills wrap: "Three checks, side by side" holds its three chips in at most two rows at 390.
- [ ] Motion probe: after scrolling the flow into view with motion on, the rail's `transform` transitions to `scaleY(1)` and every index reaches `scale(1)`; under reduced motion no transform changes, opacity does.
- [ ] 900 and 901 captures agree with each other on everything but the flow's direction (the desktop block is untouched above 900).
- [ ] Desktop 1440 identical to baseline.

Commit title: `The flow on phones hangs off one rail, the way the timeline does`.
