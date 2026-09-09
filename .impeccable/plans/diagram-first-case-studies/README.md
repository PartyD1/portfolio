# Diagram-first case studies: the plan

**Status: PLANNED, not started.** Written 2026-09-07 against `origin/main` at `d59476b` (PR #45, the end of the mobile overhaul). No UI code yet.

**Update, 2026-09-08: Wave Function Collapse is removed from the site entirely** — Parth confirmed it was forked, not original work, so it no longer belongs on the portfolio regardless of this plan. It has been deleted from `data/projects.ts`, its mark from `components/Artifact.tsx`, and every reference to it in `PRODUCT.md` and `CLAUDE.md`, in a commit ahead of this plan's own PRs. This plan is updated throughout to describe **six** projects, not seven; PR 06 (its interview-gated diagram) is deleted rather than kept as a cancelled placeholder, and the grid/lattice diagram shape is dropped from the vocabulary below since no remaining project needs it.

## The goal, in one line

A case study should be understood by looking, not by reading: every project page shows how the thing works as a diagram, and the five prose blocks (Problem, What I built, Outcome, Hardest part, Limitations) are gone, not shortened.

## Decisions, confirmed with Parth (2026-09-07)

| # | Decision | Choice |
|---|---|---|
| P1 | How completely prose disappears | **All of it, everywhere.** `problem`/`build`/`outcome`/`challenge`/`limitations` are deleted from the type and the render path, including on Operations Agent, which currently carries the most prose of any project. A diagram plus short labels/captions is the whole case study body. |
| P2 | Pewter Platformer, which has no `study` at all today (Wave Function Collapse was in this row too, until it was removed from the site entirely on 2026-09-08 for being forked work — see update above) | **In scope.** Gets a diagram built from scratch, not left absent, gated on a short mechanism interview with Parth before its PR is built (see PR 07) — its mechanism isn't documented precisely enough in `PRODUCT.md` or `data/projects.ts` to draw without inventing detail, and "never invent" outranks "always ship a diagram." |
| P3 | Diagram vocabulary | **The mechanism picks its shape.** No single diagram component is forced onto all six projects. `Flow`/`Flow.tsx` (the rail-and-node stepper) stays for the projects it actually fits; projects whose real mechanism is a loop, a tree, or a shared-store/hub-and-spoke topology get a diagram built for that shape instead of being bent into a stepper. See "Diagram vocabulary" below. |

## What every case study carries today (audited 2026-09-07, against `origin/main`)

| Project | Has a diagram? | Prose sections present | Real mechanism shape |
|---|---|---|---|
| Operations Agent (flagship, weight 1) | Yes — `Flow`, 5 steps + a bus note | problem, build, outcome, challenge, limitations (heaviest of any project) | Independent, isolated per-booking supervision (an OTP process tree) with parallel checks and threshold escalation. The current stepper draws it as one line of five boxes; the real shape is one supervisor with many identical children, not a pipeline. |
| ScorelyAI | **None** — no `study` field at all | none | An async job pipeline (upload → poll → grade) with one genuinely two-track step ("schema-validated JSON" vs "key pages checked visually") and a rubric bank behind it (16 events, 3 clusters). |
| Santa Claws | Yes — `Flow`, 5 steps + a bus note | problem, build, outcome, challenge, limitations | Five independent workers around one shared Supabase table — explicitly "never call each other" in the existing prose. The current stepper draws Scout→Designer→Pitcher→(approval)→Closer as a left-to-right sequence, which is roughly true for one lead's lifecycle but hides that the five run concurrently on their own heartbeats. |
| Pewter Platformer | **None** | none | Unconfirmed at the mechanism level. `PRODUCT.md` describes it as "improving the physics of a platformer's movement engine and building tools for an LLM to understand that physics well enough to generate difficult but playable levels" — two coupled systems (a physics tuning loop, and an LLM level-generation tool-calling loop), not detailed enough yet to draw either. |
| Gestura | Yes — `Flow`, 4 steps + branches + a bus note | problem, build, limitations (no outcome/challenge) | A hold-to-confirm gesture loop (count fingers → hold → ring fills → fires) sitting behind a one-time per-person calibration step. The current stepper draws the gesture vocabulary well (the branches list) but the calibration step and the hold-timing loop are prose-only today. |
| WordPlay | Yes — `Flow`, 5 steps | problem, build, outcome, challenge, limitations | A daily deterministic cycle (UTC date → index into ~2,315 answers → validate against ~13,000 accepted words) plus a separate, permanent local-storage loop (stats accumulate across days). Two different diagrams glued into one five-step stepper today. |

Two things every audit row agrees on: nothing here is a small trim. Operations Agent and Santa Claws already have a diagram that has to change shape, not just lose its neighboring prose. WordPlay's stepper is quietly two mechanisms braided into one list. And Pewter Platformer needs a diagram invented before anything can be removed, because there is nothing to lose yet.

## Diagram vocabulary

Four shapes cover all six projects. `Flow` (rail-and-node stepper, shipped 2026-09 in the mobile overhaul as PR 07) is one of the four, not the only one.

| Shape | What it draws | Projects |
|---|---|---|
| **Stepper** (existing `Flow.tsx`) | A strict sequence: this, then this, then this. Branches fan out as parallel sub-nodes under one step. | ScorelyAI (upload → poll → grade), WordPlay's word-selection half only |
| **Hub-and-spoke** (new) | Independent workers around one shared store, each on its own schedule, none calling the others. The store is the visual center; workers are nodes around it, not in a line. | Santa Claws (5 claws around Supabase), Operations Agent's fleet-level view (many bookings, one supervisor) |
| **Loop** (new) | A cycle that repeats until a threshold or condition exits it. Drawn as a closed path, not a line with an end. | Gestura's hold-to-confirm gesture (count → hold → fire), Operations Agent's per-booking cycle (wake → check → sleep) |
| **Tree** (new) | A hierarchy with an explicit failure-isolation property: one branch can die and restart without the others noticing. | Operations Agent's OTP supervision structure specifically (the "restart isolation" fact that is currently a sentence in `challenge`) |

**Operations Agent needs three of the five** (tree, loop, hub-and-spoke) because its real mechanism has three distinct facts that today are flattened into one five-step stepper: the supervision/restart structure, the per-booking check cycle, and the fleet-wide "many independent bookings" picture. This is why it is its own PR (PR 01) rather than a quick prose-removal pass — it is the project where the current diagram is furthest from the real shape, and it is the flagship, so it gets the most scrutiny.

## What replaces the deleted prose

Nothing here is starting from zero. Every fact in the five prose blocks being deleted has to land somewhere: as a diagram node's title or detail, a branch label, a bus/underneath note, or a short caption. A fact that cannot become a label without turning into a paragraph is a signal the diagram is still missing a piece, not a reason to keep the paragraph. Concrete examples worth checking against during build:

- Operations Agent's `challenge` sentence about OTP restart isolation → becomes the **tree** diagram's own labeled behavior, not a caption underneath a stepper.
- Operations Agent's `limitations` about the risk score's six hand-weighted signals → a short label on whichever node represents that check, or it is genuinely dropped (a limitation that cannot be drawn without a paragraph may just not survive the cut, and that is an open call for PR 01, not a foregone one).
- ScorelyAI's `challenge` about trusting a "confident score for a half-understood rubric" → the diagram's dual-check step (schema-validated JSON + visual page check) already shows the mechanism that answers this; the sentence itself may not need to survive.
- Gestura's calibration paragraph → a new first node in the loop diagram ("hold a fist, then 1 through 5, then verify"), not a paragraph above it.
- WordPlay's UTC-determinism paragraph ("no server deciding it") → a label on the stepper's first node, which it almost already has.

## Rules every PR inherits

From `CLAUDE.md`, `DESIGN.md`, `PRODUCT.md`, and this plan's own decisions above.

1. **Never invent a mechanism.** A diagram is not a license to be more confident about how something works than the prose it replaces was. Where the real mechanism is unconfirmed (Pewter Platformer, and any fact flagged above as "an open call"), the PR is gated on confirming it with Parth first, not on a plausible guess.
2. **Blocked content ships by absence.** A project with no confirmed mechanism yet keeps `study` absent — same rule the site already lives by for tech lists, dates, and metrics. No placeholder diagram, no "how it works" skeleton. (This is also the rule that took Wave Function Collapse off the site entirely on 2026-09-08 — not a case of an unconfirmed mechanism, but of the project itself no longer belonging on the page.)
3. **Same visual world.** New diagram shapes (hub-and-spoke, loop, tree) use the existing token set — the gradient rail vocabulary, glass surfaces, `--ease-out`, both themes — not a new visual language. `DESIGN.md`'s component vocabulary gets new entries, not a fork of it.
4. **Motion through `emil-design-eng`.** Every new diagram type gets its own reveal treatment designed the way `Flow`'s rail-draw and node-settle were (see mobile overhaul PR 07): load the skill before writing any motion code for any of them.
5. **`/polish` before every push**, then `npm run build` and the detector.
6. **Accessibility carries over.** `Flow` ships as an `<ol>` with `aria-hidden` decorative indices; every new diagram type needs the equivalent — a real DOM structure a screen reader can read in order, decoration marked hidden, not an unlabeled canvas or SVG-only node.
7. **No em dashes** in diagram labels, captions, or these documents.
8. **Never push onto a merged PR's branch**; each PR here branches from `origin/main` unless `SEQUENCE.md` says otherwise.

## Open questions this plan does not resolve

These are flagged, not answered, because answering them requires either Parth's input or a build-time exploration this plan shouldn't pre-empt:

- **Pewter Platformer's two mechanisms** (physics tuning, LLM level-generation) — PR 07 needs a real walkthrough from Parth before any diagram is drawn; nothing in `PRODUCT.md` today is specific enough.
- **Which Operations Agent limitations survive the cut** — flagged above; likely some hand-weighted-signal detail simply does not survive translation into a diagram, and that is fine, not a gap to patch.
