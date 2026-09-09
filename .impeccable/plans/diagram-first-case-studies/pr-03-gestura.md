# PR 03: Gestura — loop

Branch: `diagrams/03-gestura`. Size: M. Motion skill: yes (reveal only; shape inherited from PR 01). `/polish`: yes. Depends on: PR 00, and the `Loop` component from PR 01.

## 1. Why

Gestura's current stepper already draws the gesture vocabulary well (four steps plus a five-item branch fan for the finger-count actions), but it draws it as a line with an end, when the real mechanism is a loop: watch the hand, count fingers, hold to confirm, fire, and go back to watching. The one-time calibration step is prose-only today (in `build`) and has no visual at all, despite being the first thing a new user actually experiences.

## 2. What changes

### Content mapping

| Existing field | Fact | Destination |
|---|---|---|
| `problem` | "small, close-together controls assume precision the person may not have" | Dropped, argument not mechanism. |
| `build`, sentence 1 | "MediaPipe Hands tracks landmarks in the browser, count maps to an action" | The loop's "watch" and "count" stages. |
| `build`, sentence 2 | "hold-to-confirm, so a hand passing through never triggers playback" | The loop's "hold" stage, and the reason the ring exists — likely a short label ("prevents accidental triggers") rather than the full sentence. |
| `build`, sentence 3 | "calibrated per person on first visit... fixed threshold fails for everyone else" | Becomes a **new first stage**, or a separate small "calibrate once" node feeding into the loop, not a paragraph above it — this is the fact currently most invisible and most worth making visual. |
| `build`, sentence 4 | "ARIA labels... gesture HUD announces politely" | Dropped from the diagram (this is an accessibility implementation detail about the tool itself, not part of "how the gesture loop works" — it belongs in the component's actual ARIA implementation, which already exists in the running app, not in a diagram about it). |
| `limitations` | "needs a webcam... five gestures is a small vocabulary... not yet tested with real users" | Dropped, per this plan's general expectation for limitations. |

The existing `branches` fan (1 · volume down, 2 · volume up, 3 · previous, 4 · next, open hand · play/pause) carries over unchanged into the loop's "count" or "fire" stage — this is the one piece of Gestura's current diagram that already fits perfectly and should not be redesigned.

### Data sketch

```ts
diagrams: [
  {
    kind: "loop",
    stages: [
      { title: "Calibrate once", detail: "Fist, then one through five fingers, then verify" },
      { title: "Watch the hand", detail: "MediaPipe Hands tracks landmarks in the browser" },
      { title: "Count extended fingers" },
      { title: "Hold to confirm", detail: "A ring fills before anything fires" },
    ],
    exit: {
      title: "One count, one action",
      detail: "1 · volume down · 2 · volume up · 3 · previous · 4 · next · open hand · play/pause",
    },
  },
]
```

Whether "calibrate once" belongs inside the loop's closed path (visually implying it repeats, which it does not — it is once per person) or as a distinct node feeding into the loop from outside is a build-time call; the latter is more accurate and is the recommended default, since the loop shape's whole point is "this repeats" and calibration explicitly does not.

## 3. Files

- `data/projects.ts`: gestura's `study` becomes `{ diagrams: [...] }`; prose deleted.
- `components/Loop.tsx`: may need a variant supporting one "before the loop" node distinct from the repeating stages, if PR 01's version does not already support this (Operations Agent's loop has no such pre-stage).

## 4. Gate

- [ ] `npm run build`, detector zero findings.
- [ ] Calibration is visually present and visually distinct from the repeating part of the loop.
- [ ] The five-gesture branch fan survives unchanged in substance (same five mappings, same order).
- [ ] Both themes, desktop + phone widths.
- [ ] `/polish` clean.

Commit title: `Gestura's case study becomes one loop diagram: calibrate once, then watch, count, hold, fire`.
