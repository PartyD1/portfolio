# PR 06: Wave Function Collapse — grid/lattice, or absence

Branch: `diagrams/06-wave-function-collapse`. Size: L, or **zero** if the interview closes it. Motion skill: yes, if built. `/polish`: yes, if built. Depends on: PR 00, and **a mechanism interview with Parth that has not happened yet.**

## 1. Why this one is different

Every other PR in this plan converts or extends a mechanism that is already documented in this site's own data (`data/projects.ts`, `PRODUCT.md`). Wave Function Collapse is the opposite case: its own linked repo's README, as of this plan's writing, lists the WFC grid state, tile compatibility checks, and collapse/propagation logic under "Still to build." The current site data reflects this by deliberately keeping the tagline narrow ("assembling a map from tile adjacency rules one cell at a time") and shipping no case study at all, with an explicit code comment: **"UNRESOLVED. Do not fix this by making it more impressive."**

A diagram is a stronger, more confident-looking claim than a sentence of prose. Drawing a grid-propagation diagram for an algorithm the repo itself says is not built yet would be a bigger fabrication than the tagline ever was, not a smaller one. This PR cannot start with a plausible-looking diagram; it has to start with the truth.

## 2. The interview (run before writing any code for this PR)

Ask Parth, in this order, stopping as soon as an answer closes the question:

1. "Is the Wave Function Collapse repo's README still accurate — is the collapse/propagation logic still not built?" If yes, skip to step 5.
2. If it is built now: "Walk me through what happens when the generator runs, in your own words — what is a cell, what is a tile, what does 'collapse' mean here, and what makes a neighbor's choice affect the cell next to it?"
3. "Is there a specific, small example you'd point at — a 3x3 or 5x5 grid, or a screenshot/GIF — that shows the propagation actually happening?" (Not required for the diagram itself, but useful for sanity-checking the diagram against something real, and separately relevant to the still-open screenshot question from the earlier project audit.)
4. "Does the current implementation backtrack when a cell has no valid tile left, or does it fail/restart?" This is the one algorithmic detail most likely to matter for what the diagram shows (a clean forward-only propagation vs. a propagation-with-backtracking, which are different pictures).
5. If the answer to step 1 is "still not built" (or Parth is unsure): this PR closes with **no diagram**, `study` stays absent on `data/projects.ts`'s wave-function-collapse entry, and this plan's job here is done — the same "blocked content ships by absence" rule the rest of the site already lives by.

## 3. If the interview confirms a real, working mechanism

Only then: design the grid/lattice diagram shape. This is the one shape with no precedent in the current component set (`Tree`, `Loop`, `HubAndSpoke` from PR 01 are all still fundamentally list-shaped DOM; a grid is the first genuinely 2D layout). Two implementation options, in order of preference:

- **A small static grid** (e.g., 4x4 or 5x5) shown at two or three moments (mostly-uncollapsed, partially collapsed, fully collapsed), laid out with CSS grid, each cell a small glass tile carrying a color or symbol. This stays within the site's existing "HTML and CSS, not SVG, because the content has to be legible and accessible" principle (see `Flow.tsx`'s own header comment) and is a reasonable amount of new work.
- **An animated single grid** that visibly propagates (a cell's collapse triggers a visual ripple to its neighbors). More expressive, meaningfully more build time, and a stronger candidate for `emil-design-eng`'s full attention given it would be the site's most complex piece of diagram motion. Only pursue this if the static version, once built, genuinely under-explains the mechanism.

Do not decide between these two before the interview; the right choice depends on how the real algorithm behaves (a one-pass propagation reads fine as three static frames; a backtracking one may need motion to be honest about what happens when a cell fails).

## 4. Files (only if this PR proceeds past the interview)

- `data/projects.ts`: wave-function-collapse's `study` gains `diagrams`; the deliberately-narrow tagline may also be revisited if the interview reveals the repo now supports a stronger claim (a separate, smaller decision from the diagram itself — do not conflate them).
- `components/Grid.tsx`: new, only if built.

## 5. Gate

- [ ] The interview happened and its answer is recorded in this document (or `data/projects.ts`'s comment for this project) before any diagram code is written.
- [ ] If closed with no diagram: `data/projects.ts` is unchanged for this project, and this PR's branch is deleted without a commit.
- [ ] If built: same visual-world, motion, and accessibility gates as every other PR in this plan.

Commit title (only if built): `Wave Function Collapse gets a case-study diagram: a grid that collapses one cell at a time`. If closed early, no commit — note the outcome in PR 08's records instead.
