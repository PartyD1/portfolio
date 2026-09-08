# Sequence, gates and risks

## 1. Branch posture

**Every PR branches from `origin/main` and is merged alone**, same posture as the mobile overhaul. PR 00 (the schema/render foundation) is the one exception every other PR depends on: nothing else can land until it merges, because every later PR writes into the new `diagrams` field PR 00 creates.

```bash
cd /Users/ParthDoshi/csProjects/portfolio
git fetch origin
git switch -c diagrams/00-schema-foundation origin/main
npm ci --no-audit --no-fund
```

Branch names: `diagrams/00-schema-foundation`, `diagrams/01-operations-agent`, `diagrams/02-santaclaws`, `diagrams/03-gestura`, `diagrams/04-wordplay`, `diagrams/05-scorely-ai`, `diagrams/06-wave-function-collapse`, `diagrams/07-pewter-platformer`, `diagrams/08-records`.

Before any push: `gh pr view --json state,mergedAt` on the branch. A `MERGED` branch never receives another commit; make a fresh branch from `origin/main` and open a new PR (CLAUDE.md, Before pushing, rule 2).

## 2. Order and dependencies

| PR | Title | Depends on | Blocks | Size | New component work | Gated on Parth interview |
|---|---|---|---|---|---|---|
| 00 | Schema and render foundation | nothing | everything | M | no (type + page.tsx only) | no |
| 01 | Operations Agent: tree + loop + hub-and-spoke | 00 | nothing | XL | yes, all three new shapes debut here | no (mechanism already documented) |
| 02 | Santa Claws: hub-and-spoke | 00 | nothing | L | reuses 01's hub-and-spoke | no |
| 03 | Gestura: loop | 00 | nothing | M | reuses 01's loop | no |
| 04 | WordPlay: stepper split into two diagrams | 00 | nothing | M | no new shape, but splits one `Flow` into two | no |
| 05 | ScorelyAI: new stepper | 00 | nothing | M | no new shape (existing `Flow`) | no |
| 06 | Wave Function Collapse: grid/lattice, or absence | 00 | nothing | L (or **zero**, see below) | yes, if the interview confirms propagation is real | **yes, blocking** |
| 07 | Pewter Platformer: two coupled diagrams, or absence | 00 | nothing | L (or **zero**) | possibly yes, depends on interview | **yes, blocking** |
| 08 | Records | 01 to 07 merged | nothing | S | no | no |

PRs 01 to 07 are independent of each other once 00 is in, and can land in any order. **01 should go first anyway**, not because anything depends on it, but because it is where the three new diagram shapes (tree, loop, hub-and-spoke) get designed for the first time; 02, 03 and 04 reuse shapes 01 already built rather than re-solving the same visual problem three more times. Building 02 to 05 before 01 risks a second, incompatible hub-and-spoke or loop shape.

**06 and 07 may resolve to zero-diff PRs.** If the interview shows Wave Function Collapse's propagation logic genuinely is not built yet, or Pewter Platformer's mechanism cannot be described without inventing detail, the correct outcome is closing the PR with `study` left absent, per the same rule that already governs `tech: []` and `media: []`. A PR here is a slot to check, not a commitment to ship a diagram no matter what is found.

## 3. The ritual for one PR

1. `git fetch origin`, branch from `origin/main`, `npm ci` in the worktree (EnterWorktree, not the shared checkout).
2. Read the PR document end to end. For 06 and 07, do not write any diagram content until the interview section's questions are answered.
3. Run the Impeccable context script once for the touched files: `node /Users/ParthDoshi/csProjects/portfolio/.claude/skills/impeccable/scripts/context.mjs --target data/projects.ts` (absolute path; cwd stays in the worktree).
4. Invoke `emil-design-eng` before writing any motion/reveal code for a diagram.
5. Implement the diagram: update `data/projects.ts` (or whichever file PR 00 designates for diagram content), build or reuse the component, wire it into `app/work/[slug]/page.tsx`.
6. `npm run build`, then the detector: `node /Users/ParthDoshi/csProjects/portfolio/.claude/skills/impeccable/scripts/detect.mjs app components data`, zero findings.
7. Visually verify the route (`/work/<slug>`, both themes, desktop + the mobile-overhaul's own phone widths) per `CLAUDE.md`'s screenshot pattern; confirm the new diagram's accessible structure (list semantics, `aria-hidden` decoration) the way `Flow` does today.
8. `/polish` on the touched surface; fix findings in the same push.
9. Update `PRODUCT.md`'s per-project prose only if a fact moved or was dropped (see README's "What replaces the deleted prose"). Do not regenerate `DESIGN.md` per PR; PR 08 does that once, the same discipline the mobile overhaul used.
10. Commit with a title describing the diagram shipped, not "remove prose." Push, `gh pr create --draft`.

## 4. Risks

- **R1 — Operations Agent is the highest-risk PR.** It debuts three new shapes at once, on the flagship project, with the most prose being deleted of any project. If 01 takes materially longer than planned, consider shipping the tree and loop shapes first (the per-booking story) and holding the hub-and-spoke fleet view for a follow-up, rather than blocking the whole PR on all three landing together.
- **R2 — A grid/lattice component built for one project (WFC) is expensive relative to its payoff.** If PR 06's interview confirms the mechanism, weigh a simpler stand-in (e.g., a small number of stepper frames showing before/after states of the grid) against a bespoke interactive lattice before committing to the latter.
- **R3 — Reusing a shape across projects can flatten real differences.** Santa Claws' hub-and-spoke (five independent workers, human-in-the-loop approval) and Operations Agent's (many bookings under one supervisor, no human approval step) are structurally similar but not identical; PR 02 should treat 01's component as a starting point, not a template to fill in without checking the fit.
- **R4 — WordPlay's split (PR 04) changes a shipped diagram's meaning, not just its prose neighbors.** The existing single stepper reads as one mechanism; splitting it into two diagrams is a legibility bet that should be checked against a cold read (does a first-time visitor understand two diagrams belong to one project?) before merging.
