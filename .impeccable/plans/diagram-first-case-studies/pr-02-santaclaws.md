# PR 02: Santa Claws — hub-and-spoke

Branch: `diagrams/02-santaclaws`. Size: L. Motion skill: yes (reveal only; the shape itself is inherited from PR 01). `/polish`: yes. Depends on: PR 00, and reuses the `HubAndSpoke` component PR 01 builds — branch this after PR 01 merges, or after PR 01's component exists on a shared branch, so this PR is not the second place inventing the same shape.

## 1. Why

Santa Claws' existing prose is explicit that its five agents "never call each other" and coordinate only by reading and writing one Supabase table on independent heartbeats — a hub-and-spoke fact the current five-step `Flow` stepper actively misrepresents by drawing Scout → Designer → Pitcher → (approval) → Closer as one left-to-right sequence. It reads as a pipeline; it is five independent loops around a shared store.

## 2. What changes

### Content mapping

| Existing field | Fact | Destination |
|---|---|---|
| `problem` | "four jobs, and doing all four by hand is why the lead never gets contacted" | Dropped, same reasoning as Operations Agent's `problem` — an argument for why the project exists, not a mechanism. |
| `build`, sentence 1 | "five claws, one stage each" | The hub-and-spoke's five spokes, one per claw, each keeping its one-line role (already short: "Finds and qualifies leads," etc.) |
| `build`, sentence 2 | "coordination is a database write, not a conversation... claimed from Supabase, results written back" | The hub itself: label it "Supabase" directly (unlike Operations Agent's more abstract "every active booking" hub, this one is a named, concrete system) with a short detail conveying claim-and-write. |
| `build`, sentence 3 | "Designer reads the URL back out of the row it wrote" | Likely drops; a nuance about data flow inside one spoke, not the topology itself. Candidate for a short label on the Designer spoke if it fits without a paragraph. |
| `build`, sentence 4 | "every action writes a human-readable row... approve, skip, edit... autonomous mode" | The Discord approval step becomes a labeled branch off the Pitcher spoke (matching the current stepper's existing branch fan: "Approve, skip or edit in Discord" / "Or autonomous mode") — this one fact already fits the branch vocabulary and should carry over structurally unchanged. |
| `outcome` | "NemoClaw sandbox on NVIDIA Brev... no API key in the environment... durable tables" | The "durable tables" half supports the hub label; the sandbox/runtime detail is infrastructure trivia that likely does not survive (it is true and interesting but not part of "how the five agents coordinate," which is the mechanism this diagram exists to show). |
| `challenge` | "never a single model call... reliable enough to demo... dashboard mattered as much as the agents" | Dropped; this is a retrospective argument about what was hard, not a mechanism fact. |
| `limitations` | "hackathon build... seed data and fallback... nothing measured for volume... meeting booking and voice were stretch" | Dropped, per this plan's general expectation that limitations rarely survive translation into a diagram. |

### Data sketch

```ts
diagrams: [
  {
    kind: "hub-and-spoke",
    hub: { title: "Supabase", detail: "The queue, the memory, and the audit log" },
    spokes: [
      { title: "Scout", detail: "Finds and qualifies leads", cadence: "Own heartbeat" },
      { title: "Designer", detail: "Builds and deploys the mockup", cadence: "Own heartbeat" },
      { title: "Pitcher", detail: "Drafts outreach around the deployed URL", cadence: "Own heartbeat" },
      { title: "Closer", detail: "Classifies replies, books meetings", cadence: "Own heartbeat" },
    ],
  },
]
```

The Discord approval branch (currently `branches: ["Approve, skip or edit in Discord", "Or autonomous mode"]` on the old stepper's fourth step) needs a home on the `HubAndSpoke` type or on the Pitcher spoke specifically; if `HubAndSpoke` as built in PR 01 has no branch/fan concept, this PR is the one that adds it (`spokes[].branches?: string[]`, mirroring `FlowStep.branches`), since Operations Agent's version of this component did not need one.

## 3. Files

- `data/projects.ts`: santaclaws' `study` becomes `{ diagrams: [...] }`; five prose arrays deleted.
- `components/HubAndSpoke.tsx`: extend with an optional `branches` fan per spoke if PR 01 did not already include one (see above).
- `app/globals.css`: reuse PR 01's `.hub` block; extend only if the branch fan needs new rules.

## 4. Gate

- [ ] `npm run build`, detector zero findings.
- [ ] All five prose sections gone from `/work/santaclaws`.
- [ ] The Discord-approval fact is visibly present somewhere in the diagram (not dropped by accident during the shape conversion).
- [ ] Both themes, desktop + phone widths.
- [ ] `/polish` clean.

Commit title: `Santa Claws' case study becomes one diagram: five agents around a shared Supabase table, never calling each other`.
