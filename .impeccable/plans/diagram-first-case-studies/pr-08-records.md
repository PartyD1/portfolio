# PR 08: records

Branch: `diagrams/08-records`. Size: S. Motion skill: no. `/polish`: no (no UI change). Depends on: PR 01, 02, 03, 04, 05, and 07 merged (07 may have closed with no diff — that is a valid merged state for this PR's purposes, not a blocker; there is no PR 06, see `README.md`'s update note on Wave Function Collapse).

## 1. What this PR does

Same role the mobile overhaul's PR 12 played: no UI code, only the records that describe what actually shipped.

1. **Remove the temporary migration scaffolding from PR 00**: delete the five prose fields (`problem`/`build`/`outcome`/`challenge`/`limitations`) from the `CaseStudy` type in `data/projects.ts` (they should already be unused by every project's data at this point; this PR removes the type-level door, closing the additive-then-subtractive migration PR 00 opened) and delete the temporary prose-rendering path in `app/work/[slug]/page.tsx`.
2. **Regenerate `DESIGN.md`** via the impeccable `document` command, so its component vocabulary section gains `Tree`, `Loop`, and `HubAndSpoke` alongside the existing `Flow` entry, and so it reflects a site where case studies carry no prose sections.
3. **Update `data/projects.ts`'s own header comment**, which currently reads "A case study is VISUAL FIRST... a flow diagram, then short bullets, then the screenshots" — the "then short bullets" clause is now false and should be corrected to describe diagram-only case studies.
4. **Update `CLAUDE.md`** if any of its own lines describe the five-section case study structure (check the Architecture section's description of `app/work/[slug]/page.tsx` and any mention of `CaseStudySection`).
5. **Update `PRODUCT.md`'s SUPPLIED-TOMORROW section**: item 7 currently frames "a scrubbed architecture diagram" as a hoped-for alternative to a screenshot for Operations Agent specifically; once PR 01 ships, this item is resolved (three diagrams exist) and should move from "blocked" to a note of what shipped, the same way the mobile overhaul's PR 12 marked its own target-table rows SUPERSEDED rather than silently deleting them.
6. **Record the outcome of PR 07's interview**, whichever way it resolved (diagram shipped, or `study` still absent), so a future session reading this plan folder does not re-run an interview that already happened.
7. **A final capture set** for every case-study route, both themes, desktop + the mobile-overhaul's phone widths, replacing whatever capture set predates this plan.
8. **Fill in a targets table** (added to this document or to `README.md`) recording, per project, whether it shipped a diagram, which shape(s), and how many facts from the old prose were judged not to survive translation — useful history for whoever next asks "why doesn't this diagram mention X," the same way the mobile overhaul's README documents its own accepted variances.

## 2. Gate

- [ ] `npm run build`, detector zero findings, across the whole `app`/`components`/`data` tree (not just the touched files, since the type change in step 1 can surface stale references anywhere).
- [ ] No project's `data/projects.ts` entry references a prose field that no longer exists on the type.
- [ ] `DESIGN.md` regenerated and its sidecar (`.impeccable/design.json`) current.
- [ ] Every case-study route captured, both themes, desktop + phone widths, replacing the prior capture set.
- [ ] This document (or `README.md`) carries a final per-project outcome table.

Commit title: `Records: DESIGN.md regenerated for diagram-only case studies, prose fields removed from the type, final captures`.
