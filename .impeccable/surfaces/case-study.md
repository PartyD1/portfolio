---
version: 1
slug: "case-study"
primary_target: "app/work/[slug]/page.tsx"
related_targets:
  - "components/CaseStudyHeader.tsx"
  - "components/CaseStudySection.tsx"
  - "components/TechMark.tsx"
---

# Case study — `/work/[slug]`

## Scope & Mode

One statically-generated page per project, seven in all. Mode: Persuade — this is where a recruiter who is already interested goes to find out whether the interest was warranted. The homepage argues that Parth builds real systems; the case study is the evidence, and it is the page that has to survive being read slowly.

## Audience, Job, Action, Proof, Constraints

- Audience: a recruiter or hiring manager who has clicked a card, and an engineer who will read the technical section properly.
- Job: judge depth. Not "did he ship something" — the card already said that — but "does he understand what he shipped."
- **Action: email.** The foot of a case study is the highest-intent moment on the site, and it carries the same email treatment Contact does (display face, 3px coral underline). This is the *same kind* of accent place as the homepage email, not a seventh one.
- Proof: real prose in the four locked sections, real media, a real repo link where one exists.
- Constraints: nothing on this page may be inferred. No tool→project mapping exists. No per-project dates exist. No metrics exist beyond "in use by DECA competitors", which is a sourced fact and is never embellished into a number.

## The section vocabulary

Four locked sections, in this order:

1. **Problem & context**
2. **What I built & how**
3. **Outcome & impact**
4. **Hardest technical challenge**

Plus one added section that earns its place:

5. **Current limitations / what I'd do differently** — rare in a student portfolio and reads as seniority. It is the section that proves the author has a view of his own work rather than only a memory of it.

**Ownership** is not a section. It folds into the header metadata line, beside label / role / dates / use, because "built with a partner" is a fact about the project, not an argument that needs three paragraphs.

## The hard rules of this surface

**Absent, not empty.** A section with no supplied prose does not render. There is no "coming soon", no skeleton, no greyed placeholder, no "content pending" on a case study. A visible admission of incompleteness is worse to a recruiter than a shorter page.

**No eyebrow, no kicker, no section number, ever.** `CaseStudySection` takes exactly `{ id, title, children }`. There is no `label`, `kicker`, `eyebrow`, `number` or `index` prop and none may be added — making the slot structurally unavailable is stronger than leaving it unused, and a future genuine need should cost an API change plus an argument. The section sequence carries no information the reader needs; the headings do.

**No hero-metric template.** Outcome & impact is prose. Where nothing is documented, the section does not render. It never renders an invented number, a bar, a ring, or a count-up. This is the single most tempting fabrication on the site and it is banned outright.

**Operations Agent renders no repo affordance of any kind** — not a link, not a disabled link, not a greyed pill, not a tooltip. A disabled control implies the thing exists and is being withheld from *you*. Its `note` renders instead as calm prose in the header: the code and the company's data stay internal; the architecture and the decisions can be walked through in detail. The Experience row and LinkedIn carry the off-site verification of the employment.

**The screenshot frame is opaque.** See The Opaque-Media Rule below.

**The screens come LAST, and they are a slideshow** (2026-09-03). They used to hang under the header as a scroll-pinned band, which spent the reader's first screen on pictures before the argument and spent the route's one pin allowance on them. Words first; the screens are what you look at once you have decided to care. The pin is now unspent, and it is not to be spent on Problem & context, What I built & how, or Outcome & impact — those are read, not watched.

**The slideshow is scrolled, not translated,** and the reader drives it. A native scroll-snap track buys touch swipe, momentum and a focusable region; the arrows animate `scrollLeft` on the site's one easing rather than handing the curve to `scrollTo({ behavior: "smooth" })`; and the active index is read back out of the scroll position so no input can desync the dots.

## Direction contract

THESIS: The page that makes the card's promise good. It is dense, text-carried and quiet, because the thing being sold here is judgement, and judgement does not photograph. It refuses the marketing case-study genre — the full-bleed hero shot, the three-metric band, the pull-quote from nobody.

OWN-WORLD: Inherited from the homepage without amendment — same wash, same grain, same Unbounded caps, same one coral accent, both themes. The single new element is the **screenshot frame**: opaque `--media-well`, 22px radius, 1px `--glass-edge`, taking the picture's own shape inside a stage every slide shares the height of, so the border is drawn around the screenshot and not around a box it sits in.

STORY: Reader arrives from a card, is told in one metadata line what this was and when; reads how it works, then the problem, the build, the outcome, the hardest part, and what he would do differently; then sees the screens, having been told what he is looking at; and finds an email link exactly where the argument finishes.

FIRST VIEWPORT: Back affordance (`← back to the work`) on the 1140 column at the same left edge as everything else; the project name in display caps; the hairline metadata line rendering only fields that exist; the tech row when a mapping exists; then the flow diagram beginning to enter. No eyebrow above the name. No metric band. **No screenshot** — that is the 2026-09-03 change, and it is the whole point of it.

FORM: The homepage's system, one new component vocabulary (`.case__*`), one new token (`--media-well`), one named amendment (Opaque-Media), zero new radii, zero `box-shadow`.

FINISH: Every section reads correctly with its prose absent. The reduced-motion route is read end to end and must not be worse than a plain page. Contrast measured against the worst blob stop, not against flat ground.

## Named amendments this surface introduces

**The Opaque-Media Rule** — an amendment to The Blur-Is-Legibility Rule. A screenshot frame is opaque, because its content is opaque. Blur exists to keep *text* legible over the animated wash; a screenshot has no such job, and blurring behind it would be finish rather than function. The rule's second clause said an opaque surface is the only one that may travel under scroll motion — a moving `backdrop-filter` element re-samples and re-blurs its backdrop every frame over the blob wash with a `mix-blend-mode: multiply` grain layer on top, which is the single worst thing this page could ask a compositor to do. Nothing travels since the band became a slideshow, but the clause stands for whatever asks next.

**The Simple Icons bounded exception** — an amendment to The Drawn-Not-Set Rule, spelled out in full in DESIGN.md. Brand *geometry* ships; brand *colour* does not. Case-study header only, one size, `currentColor`.

**Arrow grammar, third case** — leading arrow means the link stays on the site; trailing `ArrowUpRight` means it leaves. `← back to the work` and `GitHub ↗` are different promises and read as such.

## Named follow-up (deliberately not in this PR)

**Cross-route View Transitions on the card → case-study navigation.** Dropped, not deferred by accident. `@view-transition { navigation: auto }` is a *cross-document* rule, and Next's App Router `<Link>` does client-side navigation, so it would never fire as written. Making it fire requires:

1. `experimental: { viewTransition: true }` in `next.config.ts` (the config currently carries only `reactStrictMode` and `outputFileTracingRoot`);
2. `view-transition-name: card-${slug}` on **both** ends — a single shared name duplicated across seven homepage cards aborts the transition in any browser that does run it;
3. per-slug uniqueness verified, since duplicate names are the failure mode.

It is the only item that would need an experimental framework flag, the only one whose verification depends on a browser feature the cached headless shell may not drive reliably, and continuity is the fourth of four valid motion purposes with no conversion value. Cheap to pick up later with the requirements written down.
