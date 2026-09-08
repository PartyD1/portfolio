# PR 04: WordPlay — split into two stepper diagrams

Branch: `diagrams/04-wordplay`. Size: M. Motion skill: yes (reveal only; shape is the existing `Flow`). `/polish`: yes. Depends on: PR 00 only (no new component; reuses `Flow`/`"stepper"` as-is).

## 1. Why

WordPlay's current five-step `Flow` braids two unrelated mechanisms into one line: how today's word is picked and validated (a one-time-per-day, deterministic pipeline), and how a player's stats accumulate (a permanent, cross-session loop in `localStorage`). Reading them as one sequence implies the second follows from the first within a single play session, which is not how either works. This is the one PR in the plan that needs no new diagram shape, only two instances of the existing stepper instead of one, plus (for the stats half) an honest look at whether "stepper" is even the right shape for something that has no real end.

## 2. What changes

### Content mapping

| Existing field | Fact | Destination |
|---|---|---|
| `problem` | (not read yet in detail this session; likely a short "why a Wordle clone" framing) | Expected to drop, consistent with every other project's `problem` section so far. |
| Existing steps 1 to 4 (today, in UTC → deterministic index → guess validated → tiles flip) | The word-selection/validation mechanism | **Diagram 1**, a `stepper`, unchanged in substance from the current diagram's first four nodes. |
| Existing step 5 ("Stats build up... game state and guess distribution live in localStorage") | The persistence mechanism | **Diagram 2**, separated out. Consider whether this is better drawn as a `loop` (a session ends, stats update, the loop is "play again tomorrow") once the `Loop` component exists from PR 01, rather than forcing it into a one-node stepper that looks unfinished. Recommended default: hold this as a stepper for now (lowest risk, ships alongside diagram 1 in the same PR) and revisit as a loop only if a later pass judges the single-node stepper reads as thin. |
| `build`, `outcome`, `challenge`, `limitations` (not fully read this session) | Whatever mechanism facts they carry | Same treatment as every other project: mechanism-shaped sentences become diagram labels, argument-shaped sentences are expected to drop. This PR's implementer should re-read WordPlay's full existing prose (`data/projects.ts`, wordplay entry) before starting, since this plan's research pass did not transcribe it in full. |

## 3. Files

- `data/projects.ts`: wordplay's `study` becomes `{ diagrams: [diagram1, diagram2] }`; prose deleted.
- No new components needed if both diagrams stay as `stepper`.

## 4. Open question for this PR specifically

Whether two separate "How it works" headings (one per diagram) read as one project or as two disconnected ones on the page. If it reads as disconnected, a single heading with two visually distinct diagram blocks underneath (a small label above each, e.g. "Today's word" and "Your stats") is the fallback, not a new component.

## 5. Gate

- [ ] `npm run build`, detector zero findings.
- [ ] Re-read WordPlay's full current prose in `data/projects.ts` before starting; confirm every mechanism-shaped fact has a home in one of the two diagrams before deleting the prose.
- [ ] Both themes, desktop + phone widths.
- [ ] `/polish` clean.

Commit title: `WordPlay's case study splits into two diagrams: picking today's word, and how stats persist`.
