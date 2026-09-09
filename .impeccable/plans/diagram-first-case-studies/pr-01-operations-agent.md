# PR 01: Operations Agent — tree, loop, and hub-and-spoke

Branch: `diagrams/01-operations-agent`. Size: XL. Motion skill: **yes**, for all three new diagram types. `/polish`: yes. Depends on: PR 00. This is the PR that builds `Tree`, `Loop`, and `HubAndSpoke` for the first time; PR 02, 03 reuse what this one builds.

## 1. Why

Operations Agent carries the most prose of any project (all five sections) and is the flagship (weight 1). Its current single `Flow` stepper draws five steps in a line, but the real mechanism — read closely from the existing prose — is three distinct facts, none of which is "a sequence":

1. **One small worker per booking**, and there are many bookings at once, each independent. This is a hub-and-spoke picture (many identical spokes around no real "hub" except the abstraction of "the fleet"), not a line.
2. **Each worker's own cycle**: wakes on a schedule, checks three things in parallel, decides, sleeps. This is a loop, not a line with an end — it repeats until something crosses a threshold.
3. **Supervision and restart isolation**: "every worker is a supervised process... restarts alone if it crashes" is currently one sentence buried in `challenge`. This is a tree with an explicit property (a branch dying does not affect its siblings) that today has no visual at all.

## 2. What changes

### Content mapping (what happens to the existing five prose arrays)

| Existing field | Fact | Destination |
|---|---|---|
| `problem` | "watched bookings by hand... quiet failures... re-reading the same queue" | Mostly dropped as a diagram cannot easily draw an absence-of-a-system; if kept anywhere, it is the loop diagram's own short intro line ("before: a person re-read the queue"), one line, not a paragraph. |
| `build`, sentence 1 | "one small worker per booking, wakes, checks, decides, sleeps" | Becomes the **loop** diagram directly: 4 stages (wake, check, decide, sleep), the three parallel checks as a fan mid-loop (reusing the branch/fan pattern `Flow` already has). |
| `build`, sentence 2 | "OTP... supervised process... restart limits tuned" | Becomes the **tree** diagram: one root ("Supervisor"), children are booking-worker nodes, at least one child marked `isolated: true` with a label conveying "crashes alone, restarts alone." |
| `build`, sentence 3 | "small model at the edge... classifier... runtime does the rest" | A label inside the loop's "decide" stage, not its own diagram. |
| `build`, sentence 4 | "escalates over SMS, voice, email" | The loop's exit stage, reusing the `branches` fan (SMS / Voice / Email), matching what the current stepper already draws for this fact. |
| `outcome` | "queue stopped being something a person re-read... not measured rigorously" | The measured claim is dropped as prose per this plan's rule (P1); the un-measured caveat is not a fact a diagram can draw and does not need to survive — it was already there to preempt a question an interviewer would ask in person, not to inform a diagram viewer. |
| `challenge` | "letting the model drive control flow is disqualifying... failure is local, restarts automatic" | The tree diagram's caption/label carries the "failure is local" half directly; the "letting the model drive control flow is disqualifying" reasoning is an argument, not a mechanism, and is one of the facts this plan expects not to survive (see README, "an open call"). |
| `limitations` | "never formally instrumented," "no evaluation set behind the classifier," "six hand-weighted signals" | The instrumentation and evaluation-set points are arguments, not mechanism, and likely do not survive. The "six hand-weighted signals" point could become a label on the loop's "check" stage ("6 signals, weighted by hand") if it fits without becoming a paragraph; if it does not fit cleanly, drop it rather than force it. |

**Net:** three diagrams (tree, loop, hub-and-spoke fleet view), each carrying two to four short labels total. Every argument-shaped sentence (reasoning about why a design choice was made) is expected not to survive; every mechanism-shaped sentence (what the system actually does) has a home above.

### Components

`components/Tree.tsx`, `components/Loop.tsx`, `components/HubAndSpoke.tsx` — new, one file each, following `Flow.tsx`'s existing pattern (a server component wrapping a small client component only where a pointer-hover highlight is needed, HTML/CSS not SVG, real list semantics). Reuse `Reveal` for scroll-in, reuse the existing gradient-rail token set (`--blob-c-1`, `--blob-b-1`, `--blob-a-2`) already used by `Flow`'s rail and the homepage timeline, so all diagram shapes read as one visual family.

- **`Tree`**: a root node, a short connector, a row of child nodes below it. A child with `isolated: true` gets a small badge or a distinct connector style (dashed, or a small break-and-reconnect glyph) conveying "can fail without the others noticing" without a caption explaining it.
- **`Loop`**: stages arranged on a closed path (visually: a rounded rectangle or circular arrangement, not a straight rail) with the `exit` stage breaking off the loop toward wherever it leads (in this case, three escalation branches). The mobile/narrow layout question (does the loop stay circular or straighten into a stepper under 760px) is a build-time decision for whoever implements this PR, informed by `emil-design-eng` and by how `Flow`'s own stepper already collapses to one column on phones.
- **`HubAndSpoke`**: spokes arranged around (or, more likely given the site's phone-first layout, a stacked/grid arrangement of) worker nodes, each carrying a `cadence` label ("its own schedule"), with no lines connecting spokes to each other, only to the implied hub, since the whole point is that they do not talk to each other.

### Data

```ts
diagrams: [
  {
    kind: "tree",
    root: { title: "Supervisor" },
    children: [
      { title: "Booking worker", detail: "One per active booking", isolated: true },
    ],
  },
  {
    kind: "loop",
    stages: [
      { title: "Wakes on a schedule" },
      { title: "Three checks, in parallel", detail: "Risk · Provider · Chat" },
      { title: "A small model classifies the edge cases" },
      { title: "Sleeps until the next tick" },
    ],
    exit: {
      title: "Crosses a threshold",
      detail: "Escalates over SMS, voice, or email",
    },
  },
  {
    kind: "hub-and-spoke",
    hub: { title: "Every active booking" },
    spokes: [
      { title: "Booking worker", cadence: "Own schedule, own state" },
    ],
  },
]
```

Exact wording is a build-time decision informed by the table above; this is a shape sketch, not final copy.

## 3. Files

- `data/projects.ts`: operations-agent's `study` becomes `{ diagrams: [...] }`; the five prose arrays are deleted from this project's entry.
- `components/Tree.tsx`, `components/Loop.tsx`, `components/HubAndSpoke.tsx`: new.
- `app/globals.css`: new `.tree`, `.loop`, `.hub` blocks (naming TBD at build time; follow the existing `.flow__*` BEM-ish convention).
- `app/work/[slug]/page.tsx`: wire the three new `switch` cases (see PR 00).

## 4. Open questions for this PR specifically

- Whether all three diagrams render on one page in sequence, or whether two of the three (say, loop and tree) are closely related enough to compose into one combined diagram (a loop where one stage visibly expands into the tree). Try the simple version first (three separate diagrams under one "How it works" heading, or three headings); combine only if the simple version reads as repetitive.
- Whether the fleet-level hub-and-spoke view is worth keeping distinct from the loop, given a viewer might reasonably infer "many of these run at once" from the loop alone plus a single sentence. If build time is tight, this is the one of the three most defensible to cut per README's R1 risk note.

## 5. Gate

- [ ] `npm run build`, detector zero findings.
- [ ] Operations Agent's case study page has zero remaining prose sections; the only text is the diagram headings, node titles/details, and the existing case-study header/foot.
- [ ] Every fact in the content-mapping table above is accounted for as either "kept, in [diagram]" or "dropped, and why" — do not silently lose a fact without a decision.
- [ ] Both themes, desktop 1440 and the mobile-overhaul's phone widths (320/390/430/760).
- [ ] Screen-reader structure: each diagram is a real list (`<ol>`/`<ul>`) with meaningful text nodes; decorative connectors/badges are `aria-hidden`.
- [ ] `/polish` clean.

Commit title: `Operations Agent's case study becomes three diagrams: how a booking is watched, how one worker fails alone, and how the fleet runs`.
