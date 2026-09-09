# PR 05: ScorelyAI — new stepper

Branch: `diagrams/05-scorely-ai`. Size: M. Motion skill: yes (reveal only; shape is the existing `Flow`). `/polish`: yes. Depends on: PR 00 only.

## 1. Why

ScorelyAI has no `study` field at all today — the case study page currently shows only the header, the screenshots, and the foot CTA, with the mechanism nowhere. Unlike Operations Agent/Santa Claws/Gestura/WordPlay, there is no existing diagram to reshape and no prose to delete; this PR only adds. That also makes it the lowest-risk PR in the plan (nothing can regress that exists today).

## 2. What the diagram draws

ScorelyAI's own `PRODUCT.md`/`data/projects.ts` description is already specific enough to draw without an interview: upload a PDF and pick the event; grading is asynchronous (a job ID returns immediately, the frontend polls); the event's rubric and required outline are injected into the prompt; two checks run — a schema-validated JSON score, and key pages checked visually for things text extraction misses; section scores and a penalty checklist come back. A rubric bank of 16 events across 3 clusters sits behind the whole thing.

This is a strict sequence with one genuinely two-track step (the JSON-score / visual-check split), which is exactly what `Flow`'s existing `branches` fan already draws — no new component needed.

### Data sketch

```ts
diagrams: [
  {
    kind: "stepper",
    steps: [
      { title: "Upload a PDF", detail: "And pick the event" },
      { title: "Graded asynchronously", detail: "A job ID returns immediately; the frontend polls" },
      { title: "Rubric injected", detail: "That event's official rubric and outline go into the prompt" },
      {
        title: "Two kinds of check",
        branches: ["Schema-validated JSON score", "Key pages checked visually"],
      },
      { title: "Section scores and a penalty checklist" },
    ],
    bus: {
      title: "Sixteen events, three clusters",
      detail: "Each with its own rubric and outline, so a missing section is penalised, not ignored",
    },
  },
]
```

This is close to verbatim the flow data that already exists in the site's own research notes for this project (the same steps were already drafted in prose form during this plan's audit pass) — the work here is confirming it against the current, real prose in `data/projects.ts` (which this plan has not yet fully transcribed for ScorelyAI beyond the flow-shaped facts) before shipping, and building the `study.diagrams` entry since none exists.

## 3. Files

- `data/projects.ts`: add `study: { diagrams: [...] }` to the scorely-ai entry (currently absent).
- No new components.

## 4. Gate

- [ ] `npm run build`, detector zero findings.
- [ ] `/work/scorely-ai` now shows a "How it works" diagram between the header and the screenshots, matching every other project's section order.
- [ ] The two-track check (JSON score vs visual page check) renders as a branch fan, not two separate top-level steps.
- [ ] Both themes, desktop + phone widths.
- [ ] `/polish` clean.

Commit title: `ScorelyAI gets a case-study diagram for the first time: upload, poll, grade, check twice`.
