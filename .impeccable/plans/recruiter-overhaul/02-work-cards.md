# Work Section & Card Redesign — Definitive Design

**Dimension owner:** homepage `Work` section, `ProjectCard`, the new `ProjectRow`, the card media frame, the per-project tech row, and the `Project` data shape they read from.

**Project root:** `/Users/ParthDoshi/csProjects/portfolio/.claude/worktrees/impeccable-teach`

Every path below is absolute. Every CSS block is the literal text to write. Where this document departs from the adversarial review, the departure is marked **DISAGREEMENT** and justified in place.

---

## 0. What this section has to do, stated once

A recruiter arrives, scans, and decides in ~20 seconds whether to keep reading. The Work section today fails that test in four specific ways the survey established: (a) the flagship — the largest element on the page — terminates in an apology and has no click target at all; (b) six cards are pixel-identical, so there is no top three and the median project drags the best one down; (c) the largest element on each card is an abstract `aria-hidden` glyph occupying the exact real estate real media needs; (d) the only scannable metadata is a chip of five incompatible taxonomies rendered in the quietest ink on the card.

The redesign answers with: **three tiers with three genuinely different shapes**, **a real media frame whose empty state is a designed state**, **one normalized fact line**, **a per-project tech row that cannot become an icon grid**, and **a click target on every card that goes to the case study, never off-site**.

Everything new is optional at the type level and **omits rather than placeholders**. Real content arrives tomorrow; nothing here invents a fact to fill a slot.

---

## 1. Data shape

### 1.1 `/Users/ParthDoshi/csProjects/portfolio/.claude/worktrees/impeccable-teach/data/projects.ts`

Replace the type entirely. `label`, `href`, `note` and `flagship` are deleted.

```ts
/**
 * Project content.
 *
 * TRUTH RULES — these are defects if broken, not style preferences:
 *
 *  1. OMIT, NEVER GUESS. Every optional field below is absent because the
 *     fact has not been supplied. Leaving it absent renders an honest,
 *     designed state. Filling it from a repo's language, a README, or the
 *     framework you would expect is fabrication (PRODUCT.md, principle 4).
 *
 *  2. `repo` MUST STAY ABSENT ON `operations-agent`. That work is
 *     internship-confidential and no public repo exists. Do not add a
 *     disabled link, an `.is-pending` link, or a "coming soon" note there —
 *     `.is-pending` promises a thing that is arriving, and this one never is.
 *
 *  3. `tech` is the per-project tool mapping. It does not exist yet
 *     (PRODUCT.md: "which project used which tool" is explicitly not
 *     established). Every entry ships `tech: []` until Parth supplies the
 *     lists. `TechRow` renders nothing for an empty array, by design.
 *
 * To add a project: add an entry here, add a mark in components/Artifact.tsx
 * keyed by the same slug, and add a case-study page at app/work/[slug].
 */

/** Who, other than the author, has touched this. The rarest fact the site owns. */
export type Reach =
  | { kind: "in-use"; who: string } // -> "In use by {who}"
  | { kind: "internal" }            // -> "Deployed inside a company" (or {org})
  | { kind: "built" };              // -> renders nothing. No reach claim made.

/**
 * `image`  — a screenshot or GIF of the thing running. Cropped to fill (cover).
 * `diagram`— an architecture or system drawing. Fitted whole (contain), padded.
 * Animated GIFs are detected by extension and served unoptimised.
 * There is deliberately no `video` member yet; see the plan's §7.
 */
export type ProjectMedia = {
  kind: "image" | "diagram";
  src: string;
  /** Written to stand alone: "Screenshot: ScorelyAI's rubric feedback view." */
  alt: string;
};

export type Project = {
  slug: string;
  name: string;
  /** 1 = flagship, full width. 2 = two-up card. 3 = compact ruled row. */
  tier: 1 | 2 | 3;
  /** One sentence. Rendered on every tier. */
  tagline: string;
  /** Longer prose. Rendered on EVERY tier when present — never tier-gated. */
  description?: string;
  /** A confidentiality boundary plus what is still discussable. Every tier. */
  boundary?: string;
  /** Company or lab name. Enriches the reach line; never rendered alone. */
  org?: string;
  /** "Summer 2026". Omit rather than guess. */
  period?: string;
  /** Ownership only. Venue is not ownership; it does not belong in this enum. */
  role?: "Solo" | "With a partner" | "With a team";
  reach: Reach;
  /** Keys into data/tech.ts. [] means the mapping has not been supplied. */
  tech: string[];
  /** Public repo. MUST stay absent on operations-agent. */
  repo?: string;
  /** A live, running URL. Rendered as `Live ↗`, ahead of the repo link. */
  live?: string;
  /** Absent -> the authored Artifact mark renders as the frame's empty state. */
  media?: ProjectMedia;
  /**
   * The partner/team split, in the first person and specific.
   * CONSUMED BY app/work/[slug]/page.tsx ONLY — never by the card, where the
   * measure is too short for it to be anything but a vague "we".
   */
  ownership?: string;
};
```

Seeded entries — exactly this, nothing more:

| slug | tier | reach | period | role | tech | repo | live | media |
|---|---|---|---|---|---|---|---|---|
| `operations-agent` | 1 | `{kind:"internal"}` | *omit* | *omit* | `[]` | **forbidden** | *omit* | *omit* |
| `scorely-ai` | 2 | `{kind:"in-use", who:"high-school DECA competitors"}` | *omit* | *omit* | `[]` | existing URL | *omit* | *omit* |
| `santaclaws` | 2 | `{kind:"built"}` | *omit* | *omit* | `[]` | existing URL | *omit* | *omit* |
| `wave-function-collapse` | 3 | `{kind:"built"}` | *omit* | *omit* | `[]` | existing URL | *omit* | *omit* |
| `pewter-platformer` | 3 | `{kind:"built"}` | *omit* | *omit* | `[]` | existing URL | *omit* | *omit* |
| `gestura` | 3 | `{kind:"built"}` | *omit* | *omit* | `[]` | existing URL | *omit* | *omit* |
| `wordplay` | 3 | `{kind:"built"}` | *omit* | *omit* | `[]` | existing URL | *omit* | *omit* |

`operations-agent.description` keeps its current text unchanged. Its `note` becomes `boundary`, rewritten to:

> `"The code and the company's data stay internal. The architecture and the decisions I can walk through in detail."`

`links` at the bottom of the file is unchanged.

**Two departures from the first proposal, both deliberate:**

- **`{kind:"shipped"}` is deleted from the `Reach` union.** "It's live" is expressed by the `live` URL and its `Live ↗` link. Encoding the same fact twice guarantees they will eventually disagree.
- **`role` is ownership only** (reviewer major #11, accepted). `"Research lab"` is a venue, not an ownership split, and putting both in one enum recreates the exact five-taxonomies defect the `Reach` union exists to kill. **DISAGREEMENT with the reviewer's remedy:** the reviewer proposed a `context?: string` field to catch the venue. I reject it. A free-text field on the same line reintroduces uncontrolled taxonomy at the one place the design promises a column of comparable facts, and it would be a fourth slot competing for a 0.875rem line. Venue belongs to the case study's role/dates block and, when it is employment, to the Experience section. Pewter Platformer simply loses "Research lab" from the homepage. The reviewer's other half — `ownership?: string` for the partner split — is accepted verbatim and typed above with its consumer named.

### 1.2 `/Users/ParthDoshi/csProjects/portfolio/.claude/worktrees/impeccable-teach/data/tech.ts` — NEW, hand-authored

```ts
/**
 * Per-project tech marks.
 *
 * PROVENANCE. `path` values are the single `d` attribute of a Simple Icons
 * mark (https://simpleicons.org), viewBox "0 0 24 24", copied from the
 * `simple-icons` package at the version recorded beside each entry. Simple
 * Icons is licensed CC0-1.0; the marks themselves remain the trademarks of
 * their respective owners. We render them MONOCHROME in currentColor, which
 * is a modification of the official marks, made so the page keeps exactly one
 * accent colour (DESIGN.md, The One Accent Rule).
 *
 * To add an icon: find the mark on simpleicons.org, copy its path `d`, and add
 * an entry keyed by the slug you use in data/projects.ts `tech`. A tool with no
 * Simple Icons mark (NemoClaw, OpenClaw, "OpenAI API") gets a `name` and NO
 * `path` — it renders as a text pill, which is a designed state, not a gap.
 * A slug with no entry at all renders as a pill showing the raw slug, so the
 * omission is visible in development instead of silently disappearing.
 */
export type TechMark = { name: string; path?: string };

export const tech: Record<string, TechMark> = {
  // Populated when Parth supplies the per-project tool lists.
};
```

**DISAGREEMENT resolved in the reviewer's favour (minor #16, accepted):** the first proposal shipped `scripts/sync-tech-icons.mjs` plus a pinned `simple-icons` devDependency to generate this file from `tech: []` — i.e. build machinery that emits an empty object. That is dead surface area and a silent-drift hazard. **Do not create the script. Do not add the devDependency.** Hand-author entries when the mapping lands. Revisit codegen only if the record exceeds ~25 entries.

---

## 2. Section anatomy

```
section.section.section--work#work
├─ div.section__head          h2 "Work"  +  p.section__lede
└─ div.work__grid                                    (2 cols, 18px gap)
   ├─ Reveal.work__item.work__item--flagship  delay 0     → ProjectCard tier 1
   ├─ Reveal.work__item                       delay 50    → ProjectCard tier 2
   ├─ Reveal.work__item                       delay 100   → ProjectCard tier 2
   └─ Reveal.work__more                       delay 150
      ├─ h3.work__more-title
      └─ ul.work__list  →  li → ProjectRow (tier 3) × 4
```

Four `Reveal`s, not seven. The craft floor names "one identical entrance on every section" as a refusal; seven cards entering in a cascade is a list animating itself. Four is a rhythm. The tier-3 group enters as **one** block because it is one idea.

### 2.1 The lede

Replace the current lede. The new text:

> **Seven projects. The three at the top are the applied-AI work — agents and evaluators. Every one of the seven has its own page.**

**Reviewer major #13, accepted in full.** The first proposal's "three worth walking through, four more with the code out in the open" tells a recruiter, in the section's most-read sentence, that four of seven are not worth reading — on a page whose only job is conversion — and it contradicts the structure, since all seven are walkable. The replacement ranks by an **external, checkable fact** (three of them are applied-AI systems; four are not) rather than by the author's opinion of his own work, and its last clause tells the reader nothing is being hidden.

The old lede's "the one I'm proudest of lives inside a company" clause is not preserved as a caption. Its content moves into the flagship's `boundary` line, where it is an argument rather than an aside.

### 2.2 The tier-3 group heading

```
<h3 className="work__more-title">Games, graphics and interfaces</h3>
```

A heading that names **what the group is**, not where it ranks. This is a heading, not a kicker — it sits above a list, not above another heading — so the craft floor's one hard ban is untouched.

Hard-code it as a named constant in `Work.tsx` with the comment: *if the tier-3 membership changes, this string changes with it, because it is a claim about the four projects in it.*

---

## 3. Card anatomy — precise

### 3.1 Tier 1 — flagship (one card, full width)

```
article.card.card--flagship.card--gradient      [aria-labelledby="operations-agent-name"]
├─ div.card__body                                (grid col 1)
│  ├─ div.card__text
│  │  ├─ h3.card__name#operations-agent-name
│  │  ├─ p.card__tagline
│  │  ├─ p.card__desc          — rendered whenever `description` is present
│  │  ├─ p.card__boundary      — rendered whenever `boundary` is present
│  │  └─ div.card__meta        — rendered when hasMeta
│  │     ├─ p.card__facts      — rendered when facts.length > 0   (grid col 1)
│  │     └─ ul.tech-row        — rendered when tech.length > 0    (grid col 2)
│  └─ div.card__foot           — always
│     └─ a.card__cta           "→ Read the case study"   (NOT stretched)
└─ a.card__media-link          [tabindex=-1] [aria-hidden] (grid col 2)
   └─ div.card__media          → CardMedia
```

The flagship carries **no repo affordance of any kind** and **no off-site link at all**. Its foot holds exactly one control.

### 3.2 Tier 2 — two-up card (two cards)

```
article.card                                     [aria-labelledby="{slug}-name"]
├─ div.card__text          (grid row 2)
│  ├─ h3.card__name#{slug}-name
│  ├─ p.card__tagline
│  ├─ p.card__desc         — whenever present
│  ├─ p.card__boundary     — whenever present
│  └─ div.card__meta       — when hasMeta
│     ├─ p.card__facts
│     └─ ul.tech-row
├─ div.card__media         (grid row 1)  → CardMedia
└─ div.card__foot          (grid row 3)
   ├─ a.card__cta.card__cta--stretch  "→ Read the case study"
   └─ div.card__links      — when live or repo exists
      ├─ a.card__link  "Live ↗"     (first, when `live`)
      └─ a.card__link  "GitHub ↗"   (second, when `repo`)
```

**DOM order is text → media → foot; visual order is media → text → foot**, achieved with explicit `grid-row` on all three. Reviewer minor #17(b), accepted: a real `alt` announced before the reader has been told the project's name is incoherent. Nothing inside the media frame is focusable on tiers 2 and 3, so tab order is unaffected; `alt` strings are written to stand alone.

### 3.3 Tier 3 — compact ruled row (four rows)

```
li
└─ div.work__row                                 [aria-labelledby="{slug}-name"]
   ├─ h4.work__row-name#{slug}-name              (col 1)
   ├─ div.work__row-text                         (col 2)
   │  ├─ p.work__row-tagline
   │  ├─ p.work__row-desc      — whenever present, clamped to 2 lines
   │  ├─ p.work__row-boundary  — whenever present
   │  └─ ul.tech-row (max 3)   — when tech.length > 0
   └─ div.work__row-actions                      (col 3, ALWAYS rendered)
      ├─ a.card__link "Live ↗" / "GitHub ↗"   (0–2, optional)
      └─ a.card__cta.card__cta--stretch  "→ Case study"   (always)
```

No glass, no `backdrop-filter`, no media frame, no lift. A 1px `--glass-edge` hairline above each row is the only chrome — under the craft floor's coloured-rail refusal, and consistent with Edge-Not-Shadow.

**Reviewer major #4 — grid arithmetic — accepted; remedy strengthened.** The reviewer's fix was five explicit columns with explicit `grid-column` on all five children. That still breaks: in CSS Grid, `column-gap` applies between tracks whether or not a track has content, so a `TechRow` that returns `null` leaves a zero-width track *plus* a 24px phantom gap, and the row's columns no longer align with its neighbours'. **Three columns, all three always populated** is the structurally correct answer: the tech row moves inside the text cell (where a keyword scan lands anyway), and the actions cell always exists because every project has a case study. The layout is now byte-identical with `tech: []` and with a populated `tech`, which is what the finding actually demanded.

---

## 4. Rendering rules — the ones that are defects if broken

### 4.1 `description` and `boundary` render on every tier, unconditionally on presence

**Reviewer blocking #1, accepted in full.** The first proposal claimed to fix the two-branch divergence and then re-imposed it as `// tier 1 only`. There is no tier gate on these fields anywhere — not in the type, not in JSX, not in a comment. Measure is controlled by CSS:

- tier 1 `.card__desc`: `max-width: 52ch`, no clamp.
- tier 2 `.card__desc`: `max-width: 46ch`, no clamp. The card-stretch fix (§6.1) means an uneven description between the two cards in a row produces two equal-height cards, not a ragged row.
- tier 3 `.work__row-desc`: `line-clamp: 2` with the standard + `-webkit-` pair. Visible truncation with an ellipsis and a link to the full text is a legible editorial state; refusing to render supplied truth is not.
- `boundary` renders at the same size on all three tiers, unclamped — it is always short and always load-bearing.

### 4.2 `hasMeta` includes tech

**Reviewer blocking #2, accepted in full.** Compute it once, as a named boolean, in shared code:

```ts
const facts = metaFacts(project);              // [] | ["In use by …", "Summer 2026", "Solo"]
const hasMeta = facts.length > 0 || project.tech.length > 0;
```

Gating `.card__meta` on the text slots alone means a project with `reach: {kind:"built"}`, no `period`, no `role` and a **real supplied tech list** renders no meta container and therefore no tech icons — the locked decision's one deliverable, silently failing on five of seven projects.

### 4.3 The flagship has no LinkedIn link and no verification promise

**Reviewer blocking #3, accepted in full.** `Verify on LinkedIn ↗` is deleted from this design. Three independent reasons, all decisive:

1. PRODUCT.md supplies no company, no role title and no dates for the internship, and nothing establishes that the LinkedIn profile lists the role. A link pointing at a bare profile root, labelled "Verify", is a promise the site cannot keep, on its largest element.
2. "Verify" names the recruiter's suspicion rather than the control's action — a craft-floor L16 defect — and plants doubt at the page's highest-attention moment.
3. It ejects the reader off-site from the flagship, which is the precise defect the survey identified.

Employment verification is the **Experience section's** job, in full. The flagship's job is the engineering argument plus one control into the case study. Its foot holds `→ Read the case study` and nothing else. The empty secondary slot is honest; `.card__foot`'s `margin-left: auto` layout means a missing links group leaves no visible hole (§6.4).

The company name, when supplied, enriches the reach string rather than occupying a slot of its own (§4.4), so the flagship's meta line improves the day `org` lands without any layout change.

### 4.4 The fact line

`components/projectMeta.ts` (new, shared by `ProjectCard` and `ProjectRow` — a single source of truth, because divergence between two hand-written renderers is the class of bug this redesign is fixing):

```ts
import type { Project, Reach } from "@/data/projects";

export function reachLabel(reach: Reach, org?: string): string {
  switch (reach.kind) {
    case "in-use":
      return `In use by ${reach.who}`;
    case "internal":
      // `org` enriches the reach claim rather than taking a slot of its own,
      // so the line gets better when the company name lands, with no reflow
      // of the meta grid and no empty slot in the meantime.
      return org ? `Deployed inside ${org}` : "Deployed inside a company";
    case "built":
      return "";
  }
}

/** Ordered, already filtered. facts[0] is the reach claim when there is one. */
export function metaFacts(p: Project): string[] {
  return [reachLabel(p.reach, p.org), p.period ?? "", p.role ?? ""].filter(Boolean);
}

export function hasLeadFact(p: Project): boolean {
  return reachLabel(p.reach, p.org) !== "";
}

export function caseStudyHref(p: Project): string {
  return `/work/${p.slug}`;
}

/** Ordered: a running thing outranks its source. At most two. */
export function secondaryLinks(p: Project): { href: string; label: string }[] {
  const out: { href: string; label: string }[] = [];
  if (p.live) out.push({ href: p.live, label: "Live" });
  if (p.repo) out.push({ href: p.repo, label: "GitHub" });
  return out;
}
```

Rendered as:

```tsx
{facts.length > 0 && (
  <p className="card__facts">
    {facts.map((f, i) => (
      <Fragment key={f}>
        {i > 0 && <span className="card__sep" aria-hidden="true"> · </span>}
        <span className={i === 0 && lead ? "card__fact card__fact--lead" : "card__fact"}>{f}</span>
      </Fragment>
    ))}
  </p>
)}
```

`reach` leads the line at `var(--ink)` / weight 600; `period` and `role` follow at `var(--ink-2)` / 400. Leading with reach puts the site's rarest fact — *somebody other than the author used this* — first on the line and at the heaviest weight on it.

**Reviewer minor #15 (`org` had no slot), accepted; remedy changed.** The reviewer asked for a slot. A slot is worse: on six of seven projects it would be empty, and on the seventh it would push a four-fact line past the measure. Folding it into `reachLabel` gives it a render path with no empty state to design.

### 4.5 `live` has a render path

**Reviewer major #14, accepted in full.** The secondary slot is an ordered list of at most two links, each with its own label: `Live ↗` first, `GitHub ↗` second. A project with a live URL and no repo now renders `Live ↗`, not a link labelled "GitHub" pointing at a demo. Both present renders both, in that order. Wrapping at ≤760px is handled by `flex-wrap: wrap` + `row-gap: 10px` on `.card__foot` — the links group drops below the CTA rather than crushing it.

`aria-label` on each: `` `${name} — live demo` `` / `` `${name} on GitHub` ``.

### 4.6 CTA labels, exactly

| tier | label | icon |
|---|---|---|
| 1 | `Read the case study` | leading `<ArrowRight />` |
| 2 | `Read the case study` | leading `<ArrowRight />` |
| 3 | `Case study` | leading `<ArrowRight />` |

Every CTA carries `<span className="sr-only"> — {name}</span>` so a screen-reader link list is not four identical "Read the case study" entries.

The **leading** arrow is the third case in the site's arrow grammar: *icon leads = this stays on the site*. `GitHub ↗` and `Live ↗` keep the **trailing** `ArrowUpRight`, meaning *this leaves*. Two link shapes, two different promises, distinguishable without reading. This is a DESIGN.md amendment (§9).

Tier 3's shorter label is a density adaptation, not an inconsistency: the row's own name column already supplies the noun, and the row's actions cell is ~40% the width of a card foot. Both strings live in one `ctaLabel` constant keyed by tier so they cannot drift.

---

## 5. The media frame

### 5.1 Material

The frame is **opaque `var(--white)`**, flush to the card edge, with a 1px `--glass-edge` hairline on the side where it meets the text column. It is a deliberately different material from the card's frosted glass, because it holds opaque pixels and a screenshot over a blurred blob wash is unreadable.

**Reviewer minor #18(a), accepted in full.** The first proposal used `color-mix(in oklab, var(--white) 74%, transparent)` and then claimed this "incidentally fixes" `Scorely`'s `stroke="var(--card)"` knockout. It does not — a 74% mix over glass over animated blobs is still not `--card`. Painting the frame at a flat `var(--white)` makes the knockout **literally correct**, because `--card` is aliased to `--white` in both themes. The coupling is now true rather than slightly-less-wrong. No change to `Artifact.tsx` is required.

No radius is declared on the frame. Its corners come from `.card`'s own 22px radius via the card's existing `overflow: hidden`. **No fifth radius is introduced** — an inset frame would have needed one, and concentric-radius arithmetic at 26px padding gives a negative inner radius anyway.

### 5.2 The empty state is the authored mark, sized by height

When `media` is absent, the frame renders the existing `<Artifact>` geometry — real authored content, compliant with The Drawn-Not-Set Rule — centred in the frame. No "coming soon" text, no skeleton, no grey rectangle. The craft floor refuses soft-shadowed rounded rectangles standing in for content, and the recruiter survey is explicit that "media coming soon" reads as abandoned.

**Reviewer major #7 accepted (the sizing rule could not apply); remedy changed. DISAGREEMENT with the reviewer's `width: 56%`.** The reviewer is right that `<Artifact slug={slug} />` with no `className`, plus the deletion of `.card__art svg { width: 100% }`, leaves the mark at its intrinsic size — the designed empty state does not render as designed. But `width: 56%` is the wrong dimension to constrain. Six of the seven marks are square (120×120) and the tier-2 frame is 16:9. At the 1140px container a tier-2 card is ~537px wide, so its frame is ~537 × 302px; a square mark at 56% width is 300 × 300 and **overflows the frame's height**. Size by height instead:

```tsx
<Artifact slug={slug} className="card__mark" />
```
```css
.card__media[data-state="placeholder"] { display: grid; place-items: center; }
.card__mark { display: grid; place-items: center; height: 64%; color: var(--ink); opacity: 0.55; }
.card__mark svg { height: 100%; width: auto; max-width: 100%; }
```

Checked against every frame this design produces:

| frame | frame size | mark | rendered |
|---|---|---|---|
| tier 2, desktop 16:9 | 537 × 302 | 120×120 sq | 193 × 193 ✓ |
| tier 1, desktop stretched | ~520 × 420 | 320×240 (4:3) | 358 × 269 ✓ |
| tier 2, ≤760px 2:1 | 350 × 175 | 120×120 sq | 112 × 112 ✓ |
| tier 1, ≤760px 2:1 | 350 × 175 | 320×240 | 149 × 112 ✓ |

Height-governed sizing is correct for both the 4:3 flagship mark and the square tier-2 marks with one rule, at every frame aspect this design ships.

### 5.3 Real media

`components/CardMedia.tsx`:

```tsx
import Image from "next/image";
import Artifact from "@/components/Artifact";
import type { Project } from "@/data/projects";

export default function CardMedia({ project }: { project: Project }) {
  const { slug, media } = project;

  if (!media) {
    return (
      <div className="card__media" data-state="placeholder">
        <Artifact slug={slug} className="card__mark" />
      </div>
    );
  }

  return (
    <div className="card__media" data-kind={media.kind}>
      <Image
        src={media.src}
        alt={media.alt}
        fill
        sizes="(max-width: 760px) 100vw, 560px"
        // next/image's optimiser strips GIF animation. Serve those untouched.
        unoptimized={media.src.endsWith(".gif")}
        loading="lazy"
        decoding="async"
      />
    </div>
  );
}
```

`data-kind="image"` → `object-fit: cover`. `data-kind="diagram"` → `object-fit: contain` plus 18px padding, because an architecture diagram must not be cropped. This is what makes the flagship's media slot able to accept the scrubbed architecture diagram the recruiter survey identifies as a *better* proof artifact than a UI screenshot for an NDA project.

**Reviewer minor #16, accepted — no `AutoLoopVideo`, no `kind: "video"`.** GIFs are images and render through this path; the dimension's only client component is deleted from scope. Adding video is a separate change that ships its own component with an IntersectionObserver, a `matchMedia` subscription with a `change` listener, and a `visibilitychange` pause, per the site's off-screen-pauses discipline. Building that today for zero videos is inert surface area.

**Reviewer minor #18(b), accepted — `viewTransitionName` is deleted from this dimension.** Next 15's App Router does not run view transitions on client navigation without `experimental.viewTransition`, which this change does not enable, so the names would be inert markup. Cross-route continuity (homepage card → case-study header) belongs to the case-study dimension, which owns the navigation and can enable the flag alongside it.

---

## 6. CSS — the literal replacement for `app/globals.css` lines ~1043–1271

Delete `.card__art`, `.card__art svg`, the `.card:hover .card__art` rule, `.card__note`, and `.card__head`. Everything below replaces the block between the `Work` banner comment and the `Stack orbit` banner comment.

### 6.1 Grid and stretch

```css
/* ==========================================================================
   Work
   ========================================================================== */
.work__grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px;
}

/* The Reveal wrapper is the grid item; the card sits inside it. Making the
 * wrapper a grid container stretches the card to the row height, which is what
 * finally lets .card's own `auto 1fr auto` rows and its bottom-anchored foot
 * do their job. Without this, two cards in a row whose taglines wrap to
 * different line counts end at different y and every footer is misaligned. */
.work__item {
  display: grid;
}

.work__item--flagship,
.work__more {
  grid-column: 1 / -1;
}
```

### 6.2 The card surface

```css
/*
 * Frosted, not decorative: the cards sit directly over saturated blobs, so the
 * blur is what keeps the text legible. Elevation is declared once — an edge,
 * no shadow — because a border under a soft shadow is the ghost-card look.
 *
 * SCROLL MOTION: this element is INELIGIBLE for scroll-driven travel. Moving a
 * backdrop-filtered box re-samples and re-blurs its backdrop every frame, over
 * the animated blob wash, under a mix-blend-mode: multiply grain layer — three
 * expensive layers invalidating together. If a card must travel, animate a
 * non-glass wrapper. Interaction owns `transform` here; any future scroll work
 * uses the individual `translate:` / `scale:` properties so the two compose
 * instead of one silently replacing the other.
 */
.card {
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  grid-template-rows: auto 1fr auto;
  padding: 0;
  border-radius: var(--radius-card);
  border: 1px solid var(--glass-edge);
  background: var(--glass);
  backdrop-filter: blur(22px) saturate(1.35);
  -webkit-backdrop-filter: blur(22px) saturate(1.35);
  color: var(--ink);
  overflow: hidden;
  transition:
    transform 200ms var(--ease-out),
    border-color 200ms var(--ease-out),
    background 200ms var(--ease-out);
}

/* The gradient edge now means one thing: this is the flagship. It replaces the
 * old row/column parity rule, which computed against a hard-coded 2-column
 * assumption and inverted into a stripe in the single-column stack. */
.card--gradient::before {
  content: "";
  position: absolute;
  inset: 0;
  /* Paint order, not decoration: .card__media is a positioned descendant that
   * runs full-bleed to the card edge, and positioned siblings at z-index auto
   * paint in tree order. Without this the media would overpaint the 2px ring
   * along every edge it is flush with. pointer-events: none keeps the ring out
   * of the stretched link's way. */
  z-index: 2;
  border-radius: inherit;
  padding: 2px;
  background: linear-gradient(
    120deg,
    var(--blob-c-1),
    var(--blob-b-1),
    var(--blob-a-2)
  );
  -webkit-mask:
    linear-gradient(#000 0 0) content-box,
    linear-gradient(#000 0 0);
  -webkit-mask-composite: xor;
  mask:
    linear-gradient(#000 0 0) content-box,
    linear-gradient(#000 0 0);
  mask-composite: exclude;
  pointer-events: none;
}
```

Paint stack, decided once and written down: `.card__media` **0** → `.card__cta--stretch::after` **1** → `.card--gradient::before` **2** → `.card__link` **3**. (Reviewer major #6, accepted.)

### 6.3 Media frame

```css
.card__media {
  position: relative;
  z-index: 0;
  grid-row: 1;
  aspect-ratio: 16 / 9;
  /* Opaque by design: this frame holds pixels, and a screenshot over a blurred
   * blob wash is unreadable. --card is aliased to --white in both themes, which
   * is what makes Artifact's knock-out strokes literally correct here. */
  background: var(--white);
  border-bottom: 1px solid var(--glass-edge);
  overflow: hidden;
}

.card__media img {
  object-fit: cover;
  transition: transform 200ms var(--ease-out);
}

.card__media[data-kind="diagram"] img {
  object-fit: contain;
  padding: 18px;
}

.card__media[data-state="placeholder"] {
  display: grid;
  place-items: center;
}

/* Sized by HEIGHT, not width: six of the seven marks are square and the tier-2
 * frame is 16:9, so a width-relative mark overflows the frame vertically. */
.card__mark {
  display: grid;
  place-items: center;
  height: 64%;
  color: var(--ink);
  opacity: 0.55;
}

.card__mark svg {
  height: 100%;
  width: auto;
  max-width: 100%;
}
```

### 6.4 Text, meta, foot

```css
.card__text {
  grid-row: 2;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 22px 26px 20px;
}

.card__name {
  font-size: clamp(1.25rem, 1.9vw, 1.625rem);
  letter-spacing: 0.01em;
}

.card__tagline {
  max-width: 40ch;
  font-size: 1rem;
  line-height: 1.5;
  color: var(--ink-2);
}

.card__desc {
  max-width: 46ch;
  font-size: 0.9375rem;
  line-height: 1.55;
  color: var(--ink-2);
}

.card__boundary {
  max-width: 46ch;
  font-size: 0.875rem;
  line-height: 1.45;
  color: var(--ink-2);
}

/* Two explicit cells, so the tech row is right-aligned whether or not the fact
 * cell has content. `space-between` silently left-aligns the tech row when the
 * facts are absent, which would give the "normalized meta line" two different
 * alignments depending on which project it is. */
.card__meta {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: center;
  column-gap: 14px;
  row-gap: 8px;
  margin-top: 4px;
}

.card__facts {
  grid-column: 1;
  font-size: 0.875rem;
  line-height: 1.4;
  color: var(--ink-2);
}

.card__fact--lead {
  color: var(--ink);
  font-weight: 600;
}

.card__sep {
  opacity: 0.55;
}

/* The hairline lives here, on an element that ALWAYS renders, so two cards in
 * the same row are divided at the same place regardless of whether either has
 * a meta line. On .card__meta it appeared on one card and not its neighbour. */
.card__foot {
  grid-row: 3;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
  row-gap: 10px;
  padding: 16px 26px 20px;
  border-top: 1px solid var(--glass-edge);
}

.card__links {
  display: flex;
  align-items: center;
  gap: 4px;
  margin-left: auto;
  margin-right: -14px;
}
```

`margin-left: auto` on the links group, rather than `space-between` on the foot, is what makes a missing secondary link leave no hole — the old `space-between` shoved the badge to the far left whenever `href` was absent.

**Reviewer major #12, accepted in full**, in both halves: the hairline moved to an always-present element, and `space-between` replaced by an explicit two-cell grid.

### 6.5 Controls

```css
/* Primary: leads with the arrow, because a leading arrow means "stays on the
 * site". GitHub / Live trail their arrow, meaning "this leaves". */
.card__cta {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-left: -14px;
  padding: 8px 14px;
  border-radius: 999px;
  font-weight: 600;
  font-size: 0.9375rem;
  color: var(--ink);
  text-decoration: none;
  transition:
    background 200ms var(--ease-out),
    color 200ms var(--ease-out);
}

.card__cta .icon {
  transition: transform 200ms var(--ease-out);
}

/*
 * Stretched link. .card__cta is deliberately NOT positioned, so this resolves
 * against .card / .work__row. TRADEOFF, stated plainly: a transparent overlay
 * over the card intercepts the drag that starts a text selection, so prose
 * inside a stretched card is not selectable. That is why tier 1 does not carry
 * this class — see .card--flagship below.
 */
.card__cta--stretch::after {
  content: "";
  position: absolute;
  inset: 0;
  z-index: 1;
}

.card__link {
  position: relative;
  z-index: 3;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
  font-size: 0.9375rem;
  text-decoration: none;
  padding: 8px 14px;
  border-radius: 999px;
  transition:
    background 200ms var(--ease-out),
    transform 160ms var(--ease-out);
}

.card__link:active {
  transform: scale(0.97);
}

.card__link .icon {
  transition: transform 200ms var(--ease-out);
}
```

### 6.6 Focus

```css
/*
 * The base ring is the global :focus-visible (3px --signal, 3px offset). It is
 * never clipped, because the CTA sits at least 20px inside .card's padding box.
 * Where :has() is supported the ring is PROMOTED to the whole card — the card
 * is what the link activates, so the card is what should be outlined — and the
 * pill's own ring is suppressed only inside that same :has() block, so support
 * degrades to a ring on the pill and neither state ever shows two rings.
 */
.card:has(.card__cta:focus-visible),
.work__row:has(.card__cta:focus-visible) {
  outline: 3px solid var(--signal);
  outline-offset: 4px;
}

.card:has(.card__cta:focus-visible) .card__cta:focus-visible,
.work__row:has(.card__cta:focus-visible) .card__cta:focus-visible {
  outline: none;
}
```

**Reviewer major #9, accepted in full.** The first proposal's `.card__cta:focus-visible { outline: none }` plus a `:has()` rule whose subject is `.card` was self-contradictory: the `:has()` rule cannot override the pill's own outline, so the plan produced either no ring or two rings. Suppressing the pill's ring *only from inside the `:has()` block* is the correct construction, and it needs no new base rule at all — the site's global `:focus-visible` already supplies it. (The pill keeps its 999px radius under focus because `.card__cta { border-radius: 999px }` is declared after the global rule's `border-radius: 4px`.)

### 6.7 Hover and press

```css
@media (hover: hover) and (pointer: fine) {
  .card:hover {
    transform: translateY(-3px);
    background: var(--glass-strong);
    border-color: color-mix(in oklab, var(--signal) 40%, var(--glass-edge));
  }
  .card:hover .card__cta {
    background: color-mix(in oklab, var(--ink) 10%, transparent);
  }
  .card:hover .card__cta .icon {
    transform: translateX(3px);
  }
  .card:hover .tech-row {
    color: var(--ink);
  }
  .card__link:hover {
    background: color-mix(in oklab, var(--ink) 10%, transparent);
  }
  .card__link:hover .icon {
    transform: translate(2px, -2px);
  }
}

/* Spatial travel on media is the one hover effect that gets a reduced-motion
 * gate: a 3px lift is a state cue, a zooming photograph is not. */
@media (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference) {
  .card:hover .card__media img {
    transform: scale(1.02);
  }
}

/*
 * Press. The rule is CONSTANT ABSOLUTE TRAVEL, computed per breakpoint — not a
 * constant ratio. 0.97 was calibrated for a ~100px control; on a 537px card it
 * is 16px of travel, and on a 350px phone card 0.994 is 2px total, below the
 * perceptual floor. Two values, one intent (~3px of edge movement).
 *
 * The transform is written in FULL in the hover path, because .card:has(...)
 * at (0,3,0) outranks .card:hover at (0,2,0) and both write `transform` — a
 * bare scale() would drop the hovered card 3px down mid-press, which reads as
 * a glitch rather than a press.
 */
@media (hover: hover) and (pointer: fine) {
  .card:has(.card__cta:active) {
    transform: translateY(-3px) scale(0.994);
  }
}

@media (hover: none), (pointer: coarse) {
  .card:has(.card__cta:active) {
    transform: scale(0.985);
  }
}

.card:has(.card__cta:active) {
  transition-duration: 160ms;
}
```

**Reviewer major #8, accepted in full** — both halves: the touch value is now computed against the mobile card width (0.985 × 350px ≈ 5.2px total, ~2.6px per edge), and the press transform composes with the hover lift instead of replacing it. This also finally gives touch users feedback on a card, which the survey listed as defect #5: every hover cue on the current build is gated behind `hover: hover and pointer: fine`, so a phone gets nothing anywhere.

### 6.8 Flagship

```css
.card--flagship {
  grid-template-columns: minmax(0, 1.05fr) minmax(0, 0.95fr);
  grid-template-rows: 1fr;
  min-height: 420px;
}

.card--flagship .card__body {
  grid-column: 1;
  grid-row: 1;
  display: flex;
  flex-direction: column;
}

.card--flagship .card__text {
  flex: 1;
  padding: 36px 40px 24px;
  gap: 12px;
}

.card--flagship .card__foot {
  padding: 18px 40px 34px;
}

.card--flagship .card__name {
  font-size: clamp(1.625rem, 3vw, 2.5rem);
}

.card--flagship .card__tagline {
  font-size: clamp(1.0625rem, 1.4vw, 1.25rem);
  max-width: 30ch;
  color: var(--ink);
}

.card--flagship .card__desc {
  max-width: 52ch;
}

/*
 * The flagship does NOT carry .card__cta--stretch, because its body holds a
 * description, a boundary line and a fact line that a recruiter may want to
 * copy, and a stretched overlay makes all of it unselectable. It keeps a large
 * click target anyway: the media column is itself a link, tabindex="-1" and
 * aria-hidden so it adds no duplicate node to the accessibility tree or the
 * tab order. Tiers 2 and 3 do stretch — their prose is one tagline.
 */
.card--flagship .card__media-link {
  grid-column: 2;
  grid-row: 1;
  display: block;
  min-width: 0;
}

.card--flagship .card__media {
  height: 100%;
  aspect-ratio: auto;
  border-bottom: 0;
  border-left: 1px solid var(--glass-edge);
}

.card--flagship .card__mark {
  height: 62%;
}
```

**Reviewer major #10, accepted — the fact.** The claim that "`user-select` is unaffected by `::after` overlays in Chromium/WebKit/Gecko" is false; it is the documented caveat of the stretched-link pattern. **DISAGREEMENT with one of the reviewer's two proposed remedies:** the reviewer offered "exempt the flagship and keep its click target as the explicit CTA plus a linked `<h3>`". A linked `<h3>` plus a CTA anchor is two links to the same destination in the accessibility tree, which is exactly the noise the stretched-link pattern exists to avoid. The `tabindex="-1" aria-hidden="true"` media link is the standard construction for a redundant pointer target: it gives the flagship ~45% of its own area as a click surface, adds nothing to the tab order or the link list, and leaves every word of prose selectable.

### 6.9 Tech row

```css
/*
 * SANCTIONED EXCEPTION to The Drawn-Not-Set Rule: these are Simple Icons brand
 * marks — third-party, 24×24, single filled path — not authored stroke work.
 * They are confined to this one register and rendered MONOCHROME in
 * currentColor. Official brand hexes would put ~30 uncontrolled accents on a
 * page whose stated identity is exactly one accent colour, and would read as a
 * sponsor logo wall. One line, no wrap, no containers, at most four marks:
 * structurally incapable of becoming the icon-tile grid the craft floor refuses.
 */
.tech-row {
  grid-column: 2;
  justify-self: end;
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  gap: 10px;
  margin: 0;
  padding: 0;
  list-style: none;
  color: var(--ink-2);
  transition: color 200ms var(--ease-out);
}

.tech-row li {
  display: flex;
  align-items: center;
}

.tech-row svg {
  width: 16px;
  height: 16px;
  fill: currentColor;
}

.tech-row__more {
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  line-height: 1;
}

/* A tool with no Simple Icons mark. Borrows .pending-note's geometry but not
 * its --border token, so it never reads as "coming soon". */
.tech-pill {
  font-size: 0.6875rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  line-height: 1;
  white-space: nowrap;
  border: 1px solid var(--glass-edge);
  border-radius: 999px;
  padding: 4px 8px;
}
```

Four 16px marks with three 10px gaps is 94px — it fits the `auto` cell of a 350px-wide mobile card's meta grid with room to spare, so **no additional breakpoint is introduced**. The site keeps exactly three breakpoints (640 / 720 / 760). The first proposal's `@media (max-width: 400px)` rule is deleted.

### 6.10 Tier-3 rows

```css
.work__more {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 10px;
}

.work__more-title {
  font-size: 1.125rem;
  letter-spacing: 0.015em;
}

.work__list {
  list-style: none;
  margin: 0;
  padding: 0;
}

/* No glass, no blur, no lift — rows do not float. A hairline is the only
 * chrome, and it stays neutral at 1px: a coloured rail above 1px is the
 * default timeline shape the craft floor refuses. */
.work__row {
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 13rem) minmax(0, 1fr) auto;
  align-items: start;
  column-gap: 24px;
  padding: 18px 8px;
  border-top: 1px solid var(--glass-edge);
  border-radius: 4px;
  transition: background 200ms var(--ease-out);
}

.work__list > li:last-child .work__row {
  border-bottom: 1px solid var(--glass-edge);
}

.work__row-name {
  grid-column: 1;
  margin: 0;
  font-family: var(--font-display-stack);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.015em;
  line-height: 1.2;
  font-size: 1rem;
}

.work__row-text {
  grid-column: 2;
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 0;
}

.work__row-tagline {
  font-size: 0.9375rem;
  line-height: 1.5;
  color: var(--ink-2);
}

.work__row-desc,
.work__row-boundary {
  font-size: 0.875rem;
  line-height: 1.45;
  color: var(--ink-2);
}

/* Visible truncation with a link to the full text is a legible editorial state.
 * Refusing to render a supplied description is not — that is the two-branch bug
 * this redesign exists to delete. */
.work__row-desc {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  overflow: hidden;
}

/* Always rendered: every project has a case study, so this cell always has at
 * least one child and column 3 never collapses into a phantom gap. */
.work__row-actions {
  grid-column: 3;
  align-self: center;
  display: flex;
  align-items: center;
  gap: 4px;
  justify-self: end;
}

.work__row .tech-row {
  grid-column: auto;
  justify-self: start;
}

@media (hover: hover) and (pointer: fine) {
  .work__row:hover {
    background: color-mix(in oklab, var(--ink) 4%, transparent);
  }
  .work__row:hover .card__cta {
    background: color-mix(in oklab, var(--ink) 10%, transparent);
  }
  .work__row:hover .card__cta .icon {
    transform: translateX(3px);
  }
  .work__row:hover .tech-row {
    color: var(--ink);
  }
}

/* Rows press with colour, not scale — scaling a hairline-divided row makes the
 * rule visibly detach from its neighbours. */
.work__row:has(.card__cta:active) {
  background: color-mix(in oklab, var(--ink) 7%, transparent);
  transition-duration: 160ms;
}
```

### 6.11 The 760px block

```css
@media (max-width: 760px) {
  .work__grid {
    grid-template-columns: 1fr;
  }

  .card__media {
    /* Shorter than 16:9: a large share of these visits are a LinkedIn tap on a
     * phone, and three tall frames push the CTA past a thumb's patience. */
    aspect-ratio: 2 / 1;
  }

  .card__text {
    padding: 18px 22px 16px;
  }

  .card__foot {
    padding: 14px 22px 20px;
  }

  .card--flagship {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto;
    min-height: 0;
  }

  .card--flagship .card__body {
    grid-column: 1;
    grid-row: 1;
  }

  /* Text first on a phone: the flagship's value is its prose, and its media may
   * be an architecture diagram rather than a screenshot. */
  .card--flagship .card__media-link {
    grid-column: 1;
    grid-row: 2;
  }

  /* Without this the flagship media has NO resolvable height on mobile: the
   * desktop `aspect-ratio: auto; height: 100%` at (0,2,0) beats the 2/1 rule at
   * (0,1,0), and `height: 100%` against an auto grid row resolves to nothing.
   * The page's most important element would collapse at the viewport it is
   * most often opened on. */
  .card--flagship .card__media {
    aspect-ratio: 2 / 1;
    height: auto;
    border-left: 0;
    border-top: 1px solid var(--glass-edge);
  }

  .card--flagship .card__text {
    padding: 24px 22px 18px;
  }

  .card--flagship .card__foot {
    padding: 14px 22px 22px;
  }

  /* All three children placed explicitly, so the row is identical whether or
   * not the tech mapping has landed. */
  .work__row {
    grid-template-columns: minmax(0, 1fr) auto;
    column-gap: 16px;
    row-gap: 10px;
  }
  .work__row-name {
    grid-column: 1;
    grid-row: 1;
  }
  .work__row-actions {
    grid-column: 2;
    grid-row: 1;
  }
  .work__row-text {
    grid-column: 1 / -1;
    grid-row: 2;
  }
}
```

**Reviewer major #5, accepted in full.** The missing `.card--flagship .card__media` mobile override was a broken flagship at 390px in both the placeholder and real-image states.

---

## 7. Components

### 7.1 `/…/components/TechRow.tsx` — NEW, server component

```tsx
import { tech as marks } from "@/data/tech";

/**
 * Per-project brand marks. INVARIANTS — breaking any of these is a defect:
 *   - never wraps        (one line, always)
 *   - never gains a container, box, tile or grid
 *   - never renders in brand colour (currentColor only)
 *   - renders NOTHING for an empty list — the absent state is absence, not a
 *     skeleton chip, because the tool→project mapping does not exist yet.
 */
export default function TechRow({
  slugs,
  max = 4,
}: {
  slugs: string[];
  max?: number;
}) {
  if (slugs.length === 0) return null;

  const shown = slugs.slice(0, max);
  const rest = slugs.slice(max);

  return (
    // role="list" survives `list-style: none`, which strips list semantics in
    // Safari/VoiceOver.
    <ul className="tech-row" role="list" aria-label="Built with">
      {shown.map((slug) => {
        const mark = marks[slug];
        const name = mark?.name ?? slug;
        return (
          <li key={slug}>
            {mark?.path ? (
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d={mark.path} />
              </svg>
            ) : (
              <span className="tech-pill" aria-hidden="true">{name}</span>
            )}
            {/* Names exist in the DOM for cmd-F, screen readers and scrapers,
                while the card stays visually quiet. */}
            <span className="sr-only">{name}</span>
          </li>
        );
      })}
      {rest.length > 0 && (
        <li className="tech-row__more">
          <span aria-hidden="true">+{rest.length}</span>
          <span className="sr-only">
            {rest.map((s) => marks[s]?.name ?? s).join(", ")}
          </span>
        </li>
      )}
    </ul>
  );
}
```

`max = 4` on cards, `max = 3` on rows. (Reviewer minor #17(a), accepted.)

### 7.2 `/…/components/ProjectCard.tsx` — rewrite, single branch

```tsx
import { Fragment } from "react";
import type { Project } from "@/data/projects";
import CardMedia from "@/components/CardMedia";
import TechRow from "@/components/TechRow";
import { ArrowRight, ArrowUpRight } from "@/components/Icon";
import {
  caseStudyHref,
  hasLeadFact,
  metaFacts,
  secondaryLinks,
} from "@/components/projectMeta";

export default function ProjectCard({ project }: { project: Project }) {
  const { slug, name, tier, tagline, description, boundary, tech } = project;
  const flagship = tier === 1;

  const facts = metaFacts(project);
  const lead = hasLeadFact(project);
  const hasMeta = facts.length > 0 || tech.length > 0; // tech is NOT optional here
  const links = flagship ? [] : secondaryLinks(project); // flagship: no off-site link

  const classes = ["card", flagship && "card--flagship", flagship && "card--gradient"]
    .filter(Boolean)
    .join(" ");

  const text = (
    <div className="card__text">
      <h3 className="card__name" id={`${slug}-name`}>{name}</h3>
      <p className="card__tagline">{tagline}</p>
      {description && <p className="card__desc">{description}</p>}
      {boundary && <p className="card__boundary">{boundary}</p>}
      {hasMeta && (
        <div className="card__meta">
          {facts.length > 0 && (
            <p className="card__facts">
              {facts.map((f, i) => (
                <Fragment key={f}>
                  {i > 0 && <span className="card__sep" aria-hidden="true"> · </span>}
                  <span className={i === 0 && lead ? "card__fact card__fact--lead" : "card__fact"}>
                    {f}
                  </span>
                </Fragment>
              ))}
            </p>
          )}
          <TechRow slugs={tech} max={4} />
        </div>
      )}
    </div>
  );

  const foot = (
    <div className="card__foot">
      <a
        className={flagship ? "card__cta" : "card__cta card__cta--stretch"}
        href={caseStudyHref(project)}
      >
        <ArrowRight />
        Read the case study
        <span className="sr-only"> — {name}</span>
      </a>
      {links.length > 0 && (
        <div className="card__links">
          {links.map((l) => (
            <a
              key={l.href}
              className="card__link"
              href={l.href}
              target="_blank"
              rel="noreferrer"
              aria-label={`${name} — ${l.label === "Live" ? "live demo" : "on GitHub"}`}
            >
              {l.label}
              <ArrowUpRight />
            </a>
          ))}
        </div>
      )}
    </div>
  );

  if (flagship) {
    return (
      <article className={classes} aria-labelledby={`${slug}-name`}>
        <div className="card__body">
          {text}
          {foot}
        </div>
        {/* Redundant pointer target only: no tab stop, no second link node. */}
        <a
          className="card__media-link"
          href={caseStudyHref(project)}
          tabIndex={-1}
          aria-hidden="true"
        >
          <CardMedia project={project} />
        </a>
      </article>
    );
  }

  return (
    <article className={classes} aria-labelledby={`${slug}-name`}>
      {/* text first in DOM, media first visually — placed by grid-row. */}
      {text}
      <CardMedia project={project} />
      {foot}
    </article>
  );
}
```

Note what is *not* here: no `gradient` prop, no `label`, no `Badge`, no tier gate on `description` or `boundary`, no LinkedIn link. `Badge` and `isGradient` become unused by this section; `Badge` stays in the repo for other surfaces.

### 7.3 `/…/components/ProjectRow.tsx` — NEW

```tsx
import { Fragment } from "react";
import type { Project } from "@/data/projects";
import TechRow from "@/components/TechRow";
import { ArrowRight, ArrowUpRight } from "@/components/Icon";
import {
  caseStudyHref, hasLeadFact, metaFacts, secondaryLinks,
} from "@/components/projectMeta";

export default function ProjectRow({ project }: { project: Project }) {
  const { slug, name, tagline, description, boundary, tech } = project;
  const facts = metaFacts(project);
  const lead = hasLeadFact(project);
  const links = secondaryLinks(project);

  return (
    <div className="work__row" aria-labelledby={`${slug}-name`}>
      <h4 className="work__row-name" id={`${slug}-name`}>{name}</h4>
      <div className="work__row-text">
        <p className="work__row-tagline">{tagline}</p>
        {description && <p className="work__row-desc">{description}</p>}
        {boundary && <p className="work__row-boundary">{boundary}</p>}
        {facts.length > 0 && (
          <p className="card__facts">
            {facts.map((f, i) => (
              <Fragment key={f}>
                {i > 0 && <span className="card__sep" aria-hidden="true"> · </span>}
                <span className={i === 0 && lead ? "card__fact card__fact--lead" : "card__fact"}>{f}</span>
              </Fragment>
            ))}
          </p>
        )}
        <TechRow slugs={tech} max={3} />
      </div>
      <div className="work__row-actions">
        {links.map((l) => (
          <a key={l.href} className="card__link" href={l.href} target="_blank" rel="noreferrer"
             aria-label={`${name} — ${l.label === "Live" ? "live demo" : "on GitHub"}`}>
            {l.label}
            <ArrowUpRight />
          </a>
        ))}
        <a className="card__cta card__cta--stretch" href={caseStudyHref(project)}>
          <ArrowRight />
          Case study
          <span className="sr-only"> — {name}</span>
        </a>
      </div>
    </div>
  );
}
```

Note `.card__facts` is reused verbatim in the row, so the fact taxonomy renders identically in both places. Divergence between two hand-written renderers is the bug this design deletes; sharing the markup and the helper is the guard.

### 7.4 `/…/components/Work.tsx` — rewrite

```tsx
import { projects } from "@/data/projects";
import ProjectCard from "@/components/ProjectCard";
import ProjectRow from "@/components/ProjectRow";
import Reveal from "@/components/Reveal";

/**
 * This heading names WHAT the tier-3 group is, not where it ranks. If the
 * tier-3 membership in data/projects.ts changes, this string changes with it —
 * it is a claim about the projects in the list.
 */
const MORE_TITLE = "Games, graphics and interfaces";

export default function Work() {
  const flagship = projects.filter((p) => p.tier === 1);
  const featured = projects.filter((p) => p.tier === 2);
  const more = projects.filter((p) => p.tier === 3);

  return (
    <section className="section section--work" id="work" aria-labelledby="work-title">
      <div className="section__head">
        <h2 className="section__title" id="work-title">Work</h2>
        <p className="section__lede">
          Seven projects. The three at the top are the applied-AI work &mdash;
          agents and evaluators. Every one of the seven has its own page.
        </p>
      </div>

      <div className="work__grid">
        {flagship.map((p) => (
          <Reveal key={p.slug} className="work__item work__item--flagship">
            <ProjectCard project={p} />
          </Reveal>
        ))}

        {featured.map((p, i) => (
          <Reveal key={p.slug} className="work__item" delay={50 + i * 50}>
            <ProjectCard project={p} />
          </Reveal>
        ))}

        {more.length > 0 && (
          <Reveal className="work__more" delay={150}>
            <h3 className="work__more-title">{MORE_TITLE}</h3>
            <ul className="work__list">
              {more.map((p) => (
                <li key={p.slug}>
                  <ProjectRow project={p} />
                </li>
              ))}
            </ul>
          </Reveal>
        )}
      </div>
    </section>
  );
}
```

`isGradient()` is deleted with its comment. Tier order governs render order; array order is preserved within a tier. Zero tier-1 projects → no flagship, grid still valid. More than one tier-1 → they stack full-width.

### 7.5 `/…/components/Artifact.tsx`

**No change to the file.** Only its consumer changes: `CardMedia` renders it with `className="card__mark"`, and `.card__art` no longer exists. `Scorely`'s `stroke="var(--card)"` knockout becomes literally correct because the frame is now painted at a flat `var(--white)`, which is what `--card` aliases to in both themes.

---

## 8. Motion values — the complete list this dimension owns

| what | property | value | duration | easing | gate |
|---|---|---|---|---|---|
| Reveal (flagship) | existing rise | — | 450ms | `--ease-out` | delay 0 |
| Reveal (tier-2 card A) | existing rise | — | 450ms | `--ease-out` | delay 50ms |
| Reveal (tier-2 card B) | existing rise | — | 450ms | `--ease-out` | delay 100ms |
| Reveal (tier-3 group) | existing rise | — | 450ms | `--ease-out` | delay 150ms |
| card hover lift | `transform` | `translateY(-3px)` | 200ms | `--ease-out` | `hover+fine` |
| card hover surface | `background`, `border-color` | `--glass-strong`, signal 40% | 200ms | `--ease-out` | `hover+fine` |
| CTA hover fill | `background` | `ink 10%` | 200ms | `--ease-out` | `hover+fine` |
| CTA arrow | `transform` | `translateX(3px)` | 200ms | `--ease-out` | `hover+fine` |
| outbound arrow | `transform` | `translate(2px,-2px)` | 200ms | `--ease-out` | `hover+fine` |
| tech row ink | `color` | `--ink-2` → `--ink` | 200ms | `--ease-out` | `hover+fine` |
| media zoom | `transform` | `scale(1.02)` | 200ms | `--ease-out` | `hover+fine` **and** `no-preference` |
| card press (fine) | `transform` | `translateY(-3px) scale(0.994)` | 160ms | `--ease-out` | `hover+fine` |
| card press (coarse) | `transform` | `scale(0.985)` | 160ms | `--ease-out` | `hover:none, coarse` |
| row hover tint | `background` | `ink 4%` | 200ms | `--ease-out` | `hover+fine` |
| row press tint | `background` | `ink 7%` | 160ms | `--ease-out` | none |

Staggers stay inside the 30–80ms band. No keyframes are added. **No scroll-driven motion touches any element in this section** — `.card` carries `backdrop-filter` over the animated blob wash under a `multiply` grain layer, and the CSS comment in §6.2 records that as a standing prohibition for the cinematic-motion dimension.

---

## 9. `DESIGN.md` amendments (regenerate, do not hand-edit)

1. **Simple Icons, sanctioned bounded exception to The Drawn-Not-Set Rule.** Spec: `viewBox "0 0 24 24"`, `fill: currentColor` (never brand colour), 16px, one non-wrapping row, ≤4 marks plus a `+n` token, no container, confined to the project meta line and the case-study page. Provenance and the CC0/trademark note live in `data/tech.ts`.
2. **The third arrow case.** Icon **leads** on an internal route (`→ Read the case study`), **trails** on an outbound link (`GitHub ↗`). Two shapes, two promises, distinguishable without reading.
3. **Press travel is constant absolute distance, not a constant ratio.** ~3px of edge movement: `0.97` on a ~100px control, `0.994` on a 537px desktop card, `0.985` on a ~350px phone card. A press transform written inside a hover-capable block composes with the hover lift explicitly.
4. **The media frame is a distinct material.** Opaque `var(--white)`, flush to the card edge, inheriting the card's 22px radius via `overflow: hidden`. No new radius. This is the one place on the page where an opaque panel sits inside a glass card, because it holds pixels.
5. **`.card` is ineligible for scroll-driven travel** (backdrop-filter + blob wash + multiply grain). Interaction owns `transform`; scroll work uses `translate:` / `scale:`.
6. **The stretched-link selection tradeoff**, stated honestly: tiers 2 and 3 stretch and lose prose selection; tier 1 does not stretch and keeps it, using an `aria-hidden`, `tabindex="-1"` media link as its redundant pointer target.
7. **Grid shape:** the tier-3 ruled row (`13rem / 1fr / auto` → `1fr / auto` at 760px) joins the two documented grid shapes as a third, inside The 1140 Rule.
8. Remove the row/column gradient-parity rule from the documented card vocabulary; the gradient ring now means *flagship*.

---

## 10. Dependencies, sequencing, and what must be verified

**Hard sequencing.** `never ship a dead link` is a standing rule. `/work/[slug]` must exist before this section merges. If the two land in separate PRs, **the case-study route is the first PR and this section is the second.**

**Not a dependency any more:** the Experience section. The first proposal coupled the flagship's credibility to it via `Verify on LinkedIn`; that link is deleted, so this section ships coherently on its own.

**Verify before merge, in this order:**

1. `npm run build` (type check + lint — the CI-equivalent gate).
2. Screenshots at **1440 and 390**, fold + full page, **both themes**, `reducedMotion: "reduce"`, via `playwright-core` against `next start`. Do not add Playwright to dependencies.
3. **Review the fully-empty state first** — no `period`, no `role`, no `tech`, no `media` on any project, which is exactly what ships today. If it looks thin, the fix is longer taglines, never invented fields.
4. Flagship at 390px in **both** the placeholder and a real-image state (drop any temporary local image in to check, do not commit it).
5. Two tier-2 cards with deliberately different tagline lengths — footers must land at the same y.
6. Tab through the section: 3 card CTAs + 4 row CTAs + every secondary link, each with a visible ring, no ring clipped by `overflow: hidden`, no duplicate link nodes.
7. Press-and-hold a card on a touch device (or coarse-pointer emulation) — visible feedback must exist.
8. Press a hovered card on desktop — it must scale without dropping 3px.
9. Text selection: drag across the flagship's boundary sentence (must select) and across a tier-2 tagline (documented not to select).
10. `route scroll length before vs after` — hold it inside the ≤ +25% budget the motion ruleset sets. The three 16:9 frames plus the flagship are the main cost; the `2/1` mobile aspect and the tier-3 rows are the mitigation.
11. Run `/polish` before push, and fix its findings in the same push.
12. Regenerate `DESIGN.md`.

---

## 11. Open questions for Parth, with tomorrow's content

These are blocking on *content*, not on *build*. The skeleton is correct without them.

1. **Can he name the internship company?** Most internship NDAs cover code and customer data, not the fact of employment. `org` improves the flagship's reach line the moment it lands, with no layout change.
2. **Which subsystems on Operations Agent were his vs. his partner's** → `ownership`, consumed by the case study.
3. **Per-project tech lists** → `tech[]` and `data/tech.ts`. Must be supplied, never inferred from repo language, README, or the framework you would expect.
4. **Per-project periods and role** (`Solo` / `With a partner` / `With a team`).
5. **Any sourced usage fact for ScorelyAI** beyond "in use by DECA competitors" — a number needs a source or it does not ship.
6. **Can Gestura / Wave Function Collapse / WordPlay be deployed to live URLs?** Three of the four tier-3 projects are trivially static-deployable, and a `Live ↗` on a row is disproportionate return.
7. **Is a scrubbed architecture diagram of the Operations Agent permissible?** The `kind: "diagram"` media path exists specifically for it, and for an NDA project a diagram is stronger proof than a screenshot.

---

## 12. Risks that remain

1. **The tier-3 demotion is the highest-pushback decision here.** Four of seven projects lose the card surface and the media slot on the homepage. If Parth rejects it, the fallback is to promote all six non-flagship projects to tier 2 and revisit rows later. **Do not fall back to seven identical cards** — that is the shape the craft floor refuses by name, and it is the defect this redesign exists to fix.
2. **The empty state is what ships tomorrow morning.** With no `period`, no `role` and no `tech`, five of seven meta lines render nothing at all and only ScorelyAI and Operations Agent show a fact line. That is honest and still stronger than today's five-taxonomy chips, but it is a visible density regression on launch day, most sharply on the flagship — which currently shows `Internship · Summer 2026` and will show only `Deployed inside a company` until `period` lands.
3. **Two `:has()` selectors are load-bearing** (focus promotion, press scale). Support degrades correctly now — a ring on the pill, no press scale — but the degraded press state is silent, so confirm `:has()` in the target matrix at implementation time.
4. **`line-clamp` on tier-3 descriptions is truncation.** It is visible and linked, but if Parth writes long descriptions for tier-3 projects the row will hide most of them. Flag it to him rather than silently widening the clamp.
5. **Simple Icons rendered monochrome is a modification of official trademarked marks.** Normal practice, required to keep The One Accent Rule, and disclosed in `data/tech.ts`'s provenance header — but it is a disclosure that must actually be written, not assumed.
6. **Three media frames plus the flagship increase mobile page height**, in tension with the recruiter-in-a-hurry constraint and with whatever scroll the cinematic-motion dimension spends. Measure at step 10 above; if the route grows past +25%, the lever is the `2/1` mobile aspect, not deleting the frames.
7. **The `MORE_TITLE` string is a claim about four specific projects.** If tier membership changes and the heading does not, the site says something untrue in a heading. The comment in `Work.tsx` is the only guard; there is no type-level enforcement.