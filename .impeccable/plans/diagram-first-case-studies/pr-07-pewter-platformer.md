# PR 07: Pewter Platformer — two coupled diagrams, or absence

Branch: `diagrams/07-pewter-platformer`. Size: L, or **zero** if the interview cannot close it. Motion skill: yes, if built. `/polish`: yes, if built. Depends on: PR 00, and **a mechanism interview with Parth that has not happened yet.**

## 1. Why this one is different

Pewter Platformer has no `study` today, and unlike Wave Function Collapse the blocker is not that the mechanism is unbuilt — `PRODUCT.md` describes it as real, ongoing work under the Augmented Design Lab — the blocker is that nothing on file describes it precisely enough to draw. The one-sentence description ("improving the physics of a platformer's movement engine and building tools for an LLM to understand that physics well enough to generate difficult but playable levels") names two coupled systems without saying how either actually works: what "improving the physics" means concretely, and what the LLM's tool-calling loop actually looks like (what tools it has, what it reads, what a generated level consists of, how "playable" is checked).

## 2. The interview (run before writing any code for this PR)

Ask Parth, in this order:

1. "What specifically did you change about the movement physics? Is there a before/after you could describe — a specific mechanic (jump arc, friction, wall-slide, coyote time, something else) that felt wrong and now feels right?"
2. "What does the LLM actually see and do? Does it call tools that read the current physics parameters, generate level geometry, simulate a playthrough, or something else? Walk through one full generation, start to finish."
3. "How is 'playable' actually checked — is there an automated playthrough/solver, or is a human still the check?"
4. "Is there a specific artifact (a generated level, a diff in physics constants, a log of the LLM's tool calls) you could show me, even briefly, so the diagram is drawn from something real rather than from the one-sentence description?"

If these answers stay vague after one round, this PR closes with **no diagram**, same as Wave Function Collapse's fallback — a vague diagram is not better than an absent one.

## 3. If the interview produces two clear mechanisms

The description names two coupled systems, which likely means two diagrams (following WordPlay's precedent of one project, two diagrams, rather than forcing an unrelated physics-tuning process and an LLM tool-calling loop into one picture):

- **Physics tuning**: likely a simple before/after or a short stepper (tune a parameter → playtest → compare against the target feel), shape TBD once the interview answers question 1.
- **LLM level generation**: almost certainly a `stepper` (the existing shape) if it is "the model calls tools in sequence to produce a level" — reuse `Flow`, no new component, once question 2's answer is in hand. If the loop is closer to "iterate until a playability check passes," it may be a `Loop` (reusing PR 01's component) instead.

Do not pre-design either diagram's exact content before the interview; the shape sketch above is provisional on what the interview actually reveals.

## 4. Files (only if this PR proceeds past the interview)

- `data/projects.ts`: pewter-platformer's `study` gains `diagrams` (one or two entries).
- No new components anticipated if both diagrams turn out to be `stepper` or `loop` shapes already built by PR 01/PR 04; revisit only if the interview reveals a mechanism neither shape fits.

## 5. Gate

- [ ] The interview happened and produced answers specific enough to draw without inventing detail; recorded in this document or in `data/projects.ts`'s comment for this project.
- [ ] If closed with no diagram: `data/projects.ts` unchanged, branch deleted without a commit.
- [ ] If built: same visual-world, motion, and accessibility gates as every other PR in this plan; every diagram label traces to something Parth actually said in the interview, not to a plausible inference from the one-sentence `PRODUCT.md` description.

Commit title (only if built): `Pewter Platformer gets case-study diagrams for its two systems: the physics tuning, and how the LLM generates a level`. If closed early, no commit — note the outcome in PR 08's records instead.
