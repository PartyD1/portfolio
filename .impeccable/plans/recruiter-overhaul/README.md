# Recruiter-conversion overhaul — plan

**Status: PLAN. No implementation code has been written.**

## The goal

Every decision in these documents is measured against one thing: **converting a recruiter or hiring manager into reaching out or offering an interview.** Not decoration, not novelty. Where a design choice is pretty but doesn't move that needle, it is cut.

## Locked decisions (from Parth, 2026-09-01/02)

| Decision | Choice |
|---|---|
| Project depth | **A dedicated case-study page per project.** Homepage cards become entry points. |
| Media | He **has screenshots/GIFs for most** projects. Real media slots ship now with designed empty frames. |
| Tech icons | **Simple Icons brand marks**, self-hosted, **per project** — not a standalone list. |
| Primary action | **Email.** Résumé and links are secondary everywhere. |
| Experience | **Yes — a separate section.** The summer-2026 internship as employment, linked to its case study. |
| Scroll motion | **Cinematic.** Pinning and scrubbing permitted, subject to the constraints in `06-scroll-motion.md`. |
| Hero | Typewriter message and mechanic **unchanged**. Only its broken layout is fixed. Left-aligning is permitted. |
| Case-study sections | Problem & context · What I built & how · Outcome & impact · Hardest technical challenge — plus anything else that earns its place. |
| Delivery | **One PR, split into clean commits.** |

## Content still owed by Parth

The build ships as an honest skeleton without these. Two of them gate the merge.

1. **Operations Agent case-study prose** — three sections of real content. *Merge gate.*
2. **The employer identity** for the Experience row (company, exact dates). *Merge gate.*
3. Per-project field content for the other six case studies.
4. The tool→project mapping (which technologies each project actually used). Nothing here infers it.
5. Screenshots / GIFs.

Nothing in this plan invents any of the above. Missing content renders as a designed empty state, never as a fabricated fact.

## How to read this

Start with **`00-commit-sequence.md`** — that is the build instruction: C0 through C13, each with exact files, contents, and the verification gate that follows it. The numbered documents are the reference designs it draws on; open one when you reach the commit that needs it.

| File | Covers |
|---|---|
| `00-commit-sequence.md` | **The build order.** Merge posture, C0–C13, verification matrix, risk register. |
| `01-hero.md` | Why the hero breaks to three lines, and the fixed-width-slot recomposition. |
| `02-work-cards.md` | The Work section rebuilt in three tiers so hierarchy encodes ranking. |
| `03-case-study-route.md` | `/work/[slug]`, the page template, and the content data shape. |
| `04-experience.md` | Experience as a ruled ledger above Work — not a timeline, not a card grid. |
| `05-tech-icons.md` | Vendored Simple Icons, the chip unit, and the no-mark fallbacks. |
| `06-scroll-motion.md` | The cinematic layer, its property split, and what it deliberately refuses. |
| `07-conversion.md` | Email as the single primary action, weighted by how much proof precedes it. |
| `08-completeness-gaps.md` | An independent critic's findings. **Read its scope note** — see below. |

## How this plan was produced, and one honest caveat

33 agents across three phases: six parallel surveys of the codebase, records, craft floor, motion framework and recruiter perspective; then eight design dimensions, each **proposed, adversarially critiqued, and rewritten** against that critique; then synthesis.

**The synthesis stage failed and I did not use its output.** The merging agent produced a ~148K-character document that exceeded its output limit and lost its opening half — commits C0–C7 simply weren't in it. Both downstream agents then worked from that damaged document; the completeness critic said so itself ("I received C8–C15 plus §5–9. C0–C7 are referenced but not included").

So this plan is assembled from the **eight per-dimension final designs**, which are complete and individually adversarially reviewed — a higher-fidelity source than a lossy merge of them. Two consequences you should know:

- `08-completeness-gaps.md` critiques only the surviving tail. Its findings are valid but **partial**; it has not audited C0–C7.
- Cross-dimension contradictions have **not** been machine-resolved into a single voice. `00-commit-sequence.md` reconciles the big ones explicitly (it overrules its own proposal in several places), but where two reference documents disagree on a detail, the commit sequence wins.

## The decision I'd push back on

**Cinematic scroll is the riskiest thing in here.** Pinned and scrubbed sections are the classic way to make a site feel slow to someone in a hurry — which is precisely the visitor this site exists to convert. `06-scroll-motion.md` takes this seriously: it concludes there should be **one** pinned sequence on the entire site and that it does **not** belong on the homepage. I think that's the right call, and it's worth reading before you confirm the ambition level.
