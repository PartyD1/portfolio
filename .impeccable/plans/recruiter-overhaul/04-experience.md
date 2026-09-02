# Experience — Definitive Design

**Dimension owner:** Experience section (homepage).
**Status:** final. Build exactly this.

---

## 0. What this section is, in one sentence

A **ruled employment record** — one `<ol>` of hairline-separated grid rows — that states the summer-2026 internship as a job, sits directly beneath Work, and routes the reader into the Operations Agent case study. It is the only surface on the homepage that is not a glass card, and that is the argument: employment is not a project, so it does not wear the project's container.

---

## 1. Placement — decided: **directly after Work**

`app/page.tsx` order becomes:

```
Hero → Work → Experience → Stack → About → Contact
```

### Why this, and where I depart from both the proposal and the reviewer

The first proposal put Experience **above** Work and then deferred the go/no-go ("if the employer stays unnamed AND no ownership prose arrives, move it below"). The reviewer correctly called that out as pushing a structural call onto whoever is building tomorrow at 11pm, after `page.tsx`, `Shell.tsx`, `.section--work` padding and DESIGN.md §Navigation have all been rewritten around the above-Work order. The reviewer's fix was to build it below Work and *promote it later once content lands*. **I reject the promotion clause and fix the placement permanently below Work.** Reasons:

1. **The routing argument does not survive contact with the facts.** The convert survey's highest-cost omission is that a recruiter cannot map Parth to a req — grad term, target role, location. Experience cannot supply any of those. The employer is unsupplied, the job title is unsupplied. Putting Experience above Work therefore buys none of the routing value that was the entire case for the position, while spending ~400px of the hero → first-project-card path that motion Rule 10.1 protects. The routing fix belongs to the hero-subline dimension.
2. **PRODUCT principle 1 and 2 both point down.** "Lead with applied-AI and agentic-systems work"; the Operations Agent "should carry more weight." The flagship *card* is the strongest single asset on the page. Experience's job is not to introduce the flagship — it is to **verify and re-frame** it. A verification reads best immediately after the claim, not before it. The reader meets the system, then learns it was a job.
3. **It makes the sequence argue.** Work's flagship card says "an agentic workflow inside a company." One section later the ledger says "Summer 2026 · Internship · built with one partner for the company's operations team · read the case study." That is elaboration, in the order a reader would ask for it.
4. **It removes the conditional entirely.** One keycap renumbering, once. No second structural PR tomorrow. The section is correct on launch day with the content that exists, and strictly better tomorrow with no layout change.

**Scroll cost:** heading block (h2 at up to 52px + 28px margin) + one row (30px + ~110px + 30px) + 24px top / 96px bottom padding ≈ **395–420px**. Measure route length before and after; the addition must keep total route growth from *all* dimensions ≤ +25% (motion Rule 4.3).

**Menu keycaps** renumber to document order — Work 1, Experience 2, Stack 3, About 4, Contact 5. This is the only ordering contract that changes, and it changes once.

---

## 2. Visual form — a ruled record, not a timeline and not cards

A semantic `<ol role="list">` with `list-style: none`. Each `<li class="exp__row">` is a three-column CSS grid separated by a 1px hairline, `align-items: baseline`. **No card, no glass, no `backdrop-filter`, no radius, no accent rail, no 01/02/03, no eyebrow, no big-number metric, no spine-and-dot, no company logo.**

Three craft-floor refusals converge on an experience list and all three are satisfied by this shape:

- L25 "same-size cards of icon plus heading plus text as the page structure" — refused by not being cards.
- L28 "section numbers unless the sequence itself carries information the reader needs" — the **dates** are the sequence signal, and nothing decorative is layered on top of them. This is the one place on the site where L28's carve-out genuinely applies.
- L35 "a colored `border-left` or `border-right` above 1px" — refused by using a full-width 1px neutral rule, not a rail.

`operate.md` L60 explicitly permits density when users need it; a recruiter scanning employment history is that case.

It also scales: a second and third role stack as more rows with zero layout rethink.

### Column model (≥760px)

```
grid-template-columns: minmax(8ch, 0.6fr) minmax(0, 1.5fr) minmax(0, 2fr);
column-gap: 40px;
```

At 1440 the section is 1140 wide → 1092 content − 80 gaps = 1012 distributed 0.6 : 1.5 : 2 → **col 1 ≈ 148px, col 2 ≈ 370px, col 3 ≈ 494px.**

Column 2 is deliberately wider than the proposal's 1.3fr. The reviewer's arithmetic on the old 329px column was right and the old heading did not fit; the string is fixed below (§3), but the column also has to hold a real company name tomorrow. At 370px, uppercase Unbounded 700 at the Title step (26px, letter-spacing 0.015em, ≈0.79em/char from the hero survey's measured metrics) holds **~18 characters on one line**. If tomorrow's employer name exceeds 18 characters, widen column 2 to `1.9fr` and narrow column 3 to `1.6fr`. **Never fork the type ramp with a per-element clamp floor, and never truncate.**

1. `.exp__when` — dates. Label ramp step (Hanken 0.875rem / 500 / 0.06em / uppercase), `--ink-2`, `font-variant-numeric: tabular-nums` (craft-floor L15: numerals in tabular data must not ship with browser defaults).
2. `.exp__who` — `h3.exp__company` at the Title ramp step (inherits uppercase Unbounded 700 / 1.02 / 0.015em from the base `h3` rule at globals.css:203–213), and an optional `p.exp__role` beneath at body / `--ink-2`.
3. `.exp__what` — team context, first-person ownership prose, then the links. `max-width: 52ch` (the existing flagship-description measure — not a new value).

`align-items: baseline` across a 14px label, a 26px display heading and 17px prose is what makes it read as a ledger. **Constraint: `h3.exp__company` must remain the first child of `.exp__who`.** A wrapper div, or anything hoisted above the h3, silently retargets the grid's baseline and the alignment collapses.

---

## 3. What it states — and the honest placeholder state

### 3.1 The heading string (fixes blocking problem 1)

The proposal seeded `heading: "Software engineering internship"` and claimed it traced to PRODUCT.md. It does not: PRODUCT.md §Evidence on Hand item 1 says only *"Built during a summer 2026 internship (with a partner)."* The words "software engineering" are nowhere in the source, and printing a job-title-shaped phrase as the largest type in the section while setting `role: null` on the grounds that no title was supplied is self-contradicting. A recruiter reads that h3 as the role classification. Deleted.

The reviewer offered two replacements — `"Summer 2026 internship"` (which forces dropping or demoting the date column) or `"Operations Agent"`. **I take neither.** `"Operations Agent"` turns the row back into a project entry and defeats the locked decision that this is employment, not a side project; it also duplicates the Work card's h3 verbatim one section above. `"Summer 2026 internship"` costs the date column, which is the one thing craft-floor L28 says a career list is *entitled* to.

**Decision: the h3 is the employer slot. Until the employer is named, it prints the single word PRODUCT.md supplies for the engagement — `"Internship"`.**

- It is 100% supplied truth. No adjective, no discipline, no classification.
- Read across the row with the date column it says exactly and only: *Summer 2026 · Internship*.
- It fits trivially — 10 uppercase characters ≈ 205px in a 370px column, one line, at 1440 and at 1024.
- When the employer lands it is a one-field edit and the heading becomes a proper noun with no other change.

The resolution rule, implemented as two lines in the component:

```
heading = employer ?? engagement
subline = role ?? (employer ? engagement : null)
```

So: today → **INTERNSHIP** with no subline. Tomorrow with a name only → **ACME LOGISTICS** / "Internship". Tomorrow with a name and a title → **ACME LOGISTICS** / "Software engineering intern". No boolean flag, no dead state, no field that prints a stand-in.

### 3.2 The employer-absence state (fixes blocking problem 2)

The proposal's `"Employer name on request"` pill is **deleted outright.** The reviewer is right: it asserts an unsupplied fact — that Parth is willing and able to name the company privately — at the exact moment the site is trying to generate an email, and a recruiter who takes the invitation and gets "I can't say" has been converted into a disappointment. PRODUCT.md records no permission either way.

**Decision: the page states no policy about the employer at all.** There is no pill, no flag, no dash, no "confidential" chip, no disabled anything. The absence of a company name in a row that prints a period, an engagement type, team context and a route is legible on its own, and every word that *does* print is true.

Consequence: `.pending-note` is not used by this section. The reviewer's minor finding about its box model inside a `<p>` line box, and the DESIGN.md amendment for a second sanctioned use, are both **moot and dropped**. `.pending-note` keeps its single documented meaning as the `.link-arrow.is-pending` annotation.

### 3.3 The lede (fixes major problem 6)

`"One role so far — and the work I'd most like to walk through"` is deleted. It opens the section with a quantity apology, and combined with a missing employer it would state two absences before stating anything verifiable.

**Lede: `Operations Agent wasn't a side project. It was the job.`**

54 characters, fits the 42ch measure at two lines, invents nothing, and states the frame the locked decision asked for. `.section__head` is a flex row with `gap` and renders correctly with an h2 alone if this line ever needs to go.

### 3.4 Confirmed content shipping on launch day

| Field | Value | Source |
|---|---|---|
| `period` | `"Summer 2026"` | PRODUCT.md §Evidence item 1 |
| `engagement` | `"Internship"` | PRODUCT.md §Evidence item 1 |
| `employer` | `null` | not supplied |
| `role` | `null` | not supplied |
| `team` | `"Built with one partner, for the company's operations team."` | PRODUCT.md §Evidence item 1 + the flagship description in `data/projects.ts` |
| `owned` | `null` | not supplied — the his-vs-partner split does not exist |
| `projectSlug` | `"operations-agent"` | `data/projects.ts` |

**There is no GitHub affordance on this row — not disabled, not greyed, absent.** A disabled repo link implies a repo exists (PRODUCT constraint 2, craft-floor L48).

---

## 4. Files

### 4.1 `/Users/ParthDoshi/csProjects/portfolio/.claude/worktrees/impeccable-teach/lib/routes.ts` — NEW

The case-study route must have exactly one definition shared with the case-study-page dimension. This dimension creates it; the case-study dimension adopts it. If that dimension has already created the file, use its export and do not add a second.

```ts
/**
 * Route helpers. One definition per route shape — a second copy of a path
 * string is how a link silently 404s.
 */
export function caseStudyHref(slug: string) {
  return `/work/${slug}`;
}
```

### 4.2 `/Users/ParthDoshi/csProjects/portfolio/.claude/worktrees/impeccable-teach/data/experience.ts` — NEW

```ts
/**
 * Employment record. One row per role, most recent first.
 *
 * Rules for this file — violating any of them is a defect, not a style call:
 *
 * 1. Nothing here is written unless Parth supplied it. `null` is the correct
 *    value for an unsupplied field; a plausible-sounding stand-in is not.
 *    In particular: no job title, no discipline ("software engineering",
 *    "data", "ops"), and no employer name until he supplies one AND says it
 *    may be printed.
 * 2. `owned` is first person singular and specific. "We", "helped", and
 *    "worked on" are defects. PRODUCT.md's register rule applies: soften
 *    rather than escalate.
 * 3. No metric, adoption number, user count or outcome may enter this file.
 * 4. The page states no policy about disclosure. If Parth cannot be named,
 *    `employer` stays null and the row simply prints no company. Nothing on
 *    the page says why.
 *
 * To add a role: append an entry, most recent first. `projectSlug` must match
 * a slug in data/projects.ts or the case-study link will not render.
 */
export type Experience = {
  id: string;

  /**
   * The employer's name. Prints as the row heading when present.
   * null until Parth supplies it and clears it for print.
   */
  employer: string | null;

  /**
   * Engagement type, in PRODUCT.md's own word. Prints as the heading while
   * `employer` is null, and moves to the sub-line once the employer is named
   * and no job title has been supplied.
   */
  engagement: string;

  /** Dates, as coarse as the supplied truth. Upgrade in place to "Jun – Aug 2026". */
  period: string;

  /** Job title exactly as the employer gave it. null until supplied. */
  role: string | null;

  /** Team context. One sentence. */
  team: string | null;

  /** What HE owned. First person, singular, specific. */
  owned: string | null;

  /** Slug into data/projects.ts. Renders the internal case-study link. */
  projectSlug: string | null;
};

export const experience: Experience[] = [
  {
    id: "operations-agent-internship",
    employer: null,
    engagement: "Internship",
    period: "Summer 2026",
    role: null,
    team: "Built with one partner, for the company's operations team.",
    owned: null,
    projectSlug: "operations-agent",
  },
];
```

Cut from the proposal, per the reviewer's minor 7: `named`, `precise`, `verify`, and the `data-cols` two-column variant. Three optional state flags and an unreachable branch is more machinery than one row warrants, and `precise` is a second field for a value that should be edited in place.

### 4.3 `/Users/ParthDoshi/csProjects/portfolio/.claude/worktrees/impeccable-teach/components/Experience.tsx` — NEW

Server component. No `"use client"`.

```tsx
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { ArrowRight, ArrowUpRight } from "@/components/Icon";
import { caseStudyHref } from "@/lib/routes";
import { experience } from "@/data/experience";
import { links, projects } from "@/data/projects";

export default function Experience() {
  // A section with no rows does not render an empty shell.
  if (experience.length === 0) return null;

  return (
    <section
      className="section section--experience"
      id="experience"
      aria-labelledby="experience-title"
    >
      <div className="section__head">
        <h2 className="section__title" id="experience-title">
          Experience
        </h2>
        <p className="section__lede">
          Operations Agent wasn&rsquo;t a side project. It was the job.
        </p>
      </div>

      <Reveal>
        {/*
          role="list" is required: WebKit drops list semantics when
          list-style is none, which is the whole reason the <ol> is here.
        */}
        <ol className="exp__list" role="list">
          {experience.map((e) => {
            const project = e.projectSlug
              ? projects.find((p) => p.slug === e.projectSlug)
              : undefined;

            // The heading is the employer slot. Until the employer is named it
            // prints the engagement type — the one word PRODUCT.md supplies.
            // Never a job title, never a discipline.
            const heading = e.employer ?? e.engagement;
            const subline = e.role ?? (e.employer ? e.engagement : null);

            return (
              <li className="exp__row" key={e.id}>
                <p className="exp__when">{e.period}</p>

                <div className="exp__who">
                  <h3 className="exp__company">{heading}</h3>
                  {subline && <p className="exp__role">{subline}</p>}
                </div>

                <div className="exp__what">
                  {e.team && <p>{e.team}</p>}
                  {e.owned && <p>{e.owned}</p>}

                  <div className="exp__links">
                    {project && (
                      <Link
                        className="link-arrow exp__link"
                        href={caseStudyHref(project.slug)}
                      >
                        <ArrowRight />
                        {project.name} case study
                      </Link>
                    )}
                    <a
                      className="link-arrow exp__link exp__link--quiet"
                      href={links.linkedin}
                      target="_blank"
                      rel="noreferrer"
                    >
                      LinkedIn profile
                      <ArrowUpRight />
                    </a>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      </Reveal>
    </section>
  );
}
```

Notes binding on the implementer:

- **There is no eyebrow slot in this markup and none may be added.** Craft-floor L27 is the page's one hard ban.
- No GitHub link, no disabled repo affordance, no `is-pending` anything.
- The case-study link renders only when the slug resolves in `data/projects.ts` — never-ship-a-dead-link, enforced structurally.
- Column 3 always has content today (`team` + links). If a future row has none of `team`, `owned` or a resolving project, `.exp__what` renders an empty div; that is acceptable and invisible, and is cheaper than a `data-cols` variant that cannot fire.
- Both icons are imported. The proposal's build-breaking `ArrowUpRight`-without-import is fixed by the LinkedIn link actually shipping (§4.3.1).

#### 4.3.1 The LinkedIn link (fixes minor 8)

The proposal rejected off-site verification wholesale. The reviewer is right that this conflated the *label* with the *link*. `https://www.linkedin.com/in/parthmdoshi/` is confirmed evidence in PRODUCT.md, and a label naming only the destination — **"LinkedIn profile ↗"** — asserts no fact that could be false. It ships as the secondary link on the row, quieter than the case-study link, and it is the strongest available answer to an unnamed employer: the reader who wants to check the employment record has one click to the place where it would live. When Parth confirms the role is listed there, the label upgrades to "Employment record on LinkedIn" — copy change only.

#### 4.3.2 Arrow grammar (fixes minor 10)

The proposal claimed to establish a *third* arrow case. It does not: `components/Hero.tsx` already renders `<a className="link-arrow" href="#work"><ArrowRight />see my work</a>` — leading `ArrowRight`, same class, same size. **I accept the reviewer's correction and write the grammar honestly as two cases:** a leading arrow means *stays on the site* (in-page anchor or internal route), a trailing `ArrowUpRight` means *leaves it*. The route-vs-anchor distinction is carried by the link copy — "Operations Agent case study" cannot be mistaken for a jump to a heading — not by a new icon.

### 4.4 `/Users/ParthDoshi/csProjects/portfolio/.claude/worktrees/impeccable-teach/app/page.tsx`

```tsx
import Hero from "@/components/Hero";
import Work from "@/components/Work";
import Experience from "@/components/Experience";
import Stack from "@/components/Stack";
import About from "@/components/About";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <Work />
      <Experience />
      <Stack />
      <About />
      <Contact />
    </>
  );
}
```

`.section--work` is **not touched.** Its `padding-top: 32px` exists because Work sits under the hero, and it still does.

### 4.5 `/Users/ParthDoshi/csProjects/portfolio/.claude/worktrees/impeccable-teach/components/Shell.tsx`

```ts
const items = [
  { id: "work", label: "Work", key: "1" },
  { id: "experience", label: "Experience", key: "2" },
  { id: "stack", label: "Stack", key: "3" },
  { id: "about", label: "About", key: "4" },
  { id: "contact", label: "Contact", key: "5" },
] as const;
```

Nothing else changes. Update the stale comment on the `useEffect` from "The 1/2/3 shortcuts" to "The 1–5 shortcuts". The `--i` stagger `calc(var(--i) * 40ms + 80ms)` puts the fifth link at 280ms — inside the 30–80ms stagger rule, under the 420ms link-rise duration. `behavior: "auto"` for keyboard jumps is unchanged.

Hand-off note for the case-study-route dimension (not this dimension's edit): on a case-study route these five ids do not exist and `document.getElementById(...)?.scrollIntoView()` silently no-ops — a dead keyboard shortcut, same defect class as a dead link. That dimension must route them to `/#work` etc.

### 4.6 `/Users/ParthDoshi/csProjects/portfolio/.claude/worktrees/impeccable-teach/app/globals.css`

**Edit 1 — the hairline token.** `--border` (14% ink light / 16% dark) measures ~1.25:1 against `--ground`; it is a shadcn bridge token and it is too faint to be the sole visual structure of a section standing beside 22px glass cards. Add a dedicated rule token, defined in **both** themes (DESIGN.md: a value that exists in one theme only is a bug). Add to the `:root` block beside `--border` (globals.css:76) and to the `.dark` block beside its `--border` (globals.css:148):

```css
/* :root */
--rule: color-mix(in oklab, var(--ink) 26%, transparent);
```
```css
/* .dark */
--rule: color-mix(in oklab, var(--ink) 20%, transparent);
```

Computed against `--ground`: **≈1.52:1 in light, ≈1.77:1 in dark.** That is the acceptance criterion (§7), not a vibe.

**Edit 2 — the Experience block.** Insert after the Work block's `@media (max-width: 760px)` rule (ends near line 1042) and before `/* Cards */`, so section CSS stays in document order.

```css
/* ==========================================================================
   Experience
   ========================================================================== */

/* Work's 96px bottom already separates the two; Experience elaborates the
   flagship rather than opening a new argument, so it sits closer than the
   page's 176px section rhythm. */
.section--experience {
  padding-top: 24px;
}

.exp__list {
  margin: 0;
  padding: 0;
  list-style: none;
  border-bottom: 1px solid var(--rule);
}

/* A ruled record, not a card: no glass, no radius, no backdrop-filter, no
   rail. Employment is a different kind of fact from a project, so it does
   not wear the project's container. */
.exp__row {
  display: grid;
  grid-template-columns:
    minmax(8ch, 0.6fr)
    minmax(0, 1.5fr)
    minmax(0, 2fr);
  column-gap: 40px;
  align-items: baseline;
  padding-block: 30px;
  border-top: 1px solid var(--rule);
}

/* Label ramp step. Dates are the sequence signal — nothing decorative is
   layered on top of them. */
.exp__when {
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  font-variant-numeric: tabular-nums;
  color: var(--ink-2);
}

/* Title ramp step. Uppercase Unbounded 700 / 1.02 / 0.015em come from the
   base h3 rule — this element does not fork the ramp. */
.exp__company {
  font-size: clamp(1.25rem, 1.9vw, 1.625rem);
}

.exp__role {
  margin-top: 8px;
  font-size: 1.0625rem;
  line-height: 1.5;
  color: var(--ink-2);
}

.exp__what {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 14px;
  max-width: 52ch;
  font-size: 1.0625rem;
  line-height: 1.6;
  color: var(--ink-2);
}

.exp__links {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 4px 24px;
  margin-top: 2px;
}

/* .link-arrow ships padding: 8px 4px; drop the inline padding so the arrow
   sits flush to the column edge. The vertical hit area is kept. */
.exp__link {
  padding-inline: 0;
}

/* Secondary weight, matching .menu__resume. */
.exp__link--quiet {
  font-size: 0.9375rem;
  color: var(--ink-2);
}

@media (max-width: 760px) {
  .section--experience {
    padding-top: 16px;
  }
  .exp__row {
    grid-template-columns: minmax(0, 1fr);
    row-gap: 14px;
    padding-block: 24px;
  }
  .exp__what {
    max-width: none;
  }
}
```

**No hover rule on `.exp__row`.** The row is not a control. The Work survey's single biggest finding is that the card's hover lift is a false promise — a whole surface signalling interactivity when only a 100px anchor is clickable. That defect is not reproduced here. All feedback comes from the existing `.link-arrow` rules, which are already inside `@media (hover: hover) and (pointer: fine)` and already carry `:active { transform: scale(0.97) }`.

`row-gap` is declared only in the mobile block; on the desktop single-row grid it would be inert.

---

## 5. Motion

**One `<Reveal>` around the whole `<ol>`. No per-row stagger. No scroll-driven anything. No parallax. No pin.**

- Values are the existing ones and are not restated per element: `[data-reveal="pending"]` → `opacity: 0; translateY(24px)`; `[data-reveal="in"]` → 450ms `var(--ease-out)` on opacity and transform; `delay` unset (0ms).
- Motion Rule 1.1: a scrub-drawn hairline or a travelling rule teaches the reader nothing. Craft-floor L13 names "one identical entrance on every section" as the refusal; one Reveal on the list keeps this section at the same weight as the Stack orbit rather than adding a second reveal vocabulary.
- The section carries no `backdrop-filter`, so it is exempt from motion Rule 3.2's compositor hazard by construction.
- When a second role lands, a 50ms per-row stagger via `delay={i * 50}` on per-row Reveals is within doctrine. It is **not** pre-built for a row count that does not exist.
- Reduced motion: handled by `Reveal` itself, which bails before setting any state. Nothing further is needed.

---

## 6. Cross-dimension dependencies (fixes minor 11)

This dimension's file set is exactly: `lib/routes.ts`, `data/experience.ts`, `components/Experience.tsx`, `app/page.tsx`, the Experience block + `--rule` token in `app/globals.css`, `components/Shell.tsx`, and the Experience-specific entries in `DESIGN.md` / `PRODUCT.md` / `.impeccable/surfaces/homepage.md`. It touches nothing else. Handed off:

1. **BLOCKING — Work dimension owns the duplication.** `data/projects.ts` still carries `label: "Internship · Summer 2026"` on the flagship. With Experience directly beneath Work, the same two facts print twice within one viewport, and the ledger is now the canonical home for them. Work's `label` taxonomy rework must retire the employment fact from the card. If Work does not act, the duplication ships and it is a defect on this section's ledger. Work also owns its own `.section__lede` ("...the one I'm proudest of lives inside a company") — that clause is now Experience's job and stating it twice weakens both, but the string belongs to Work.
2. **BLOCKING — case-study route.** `caseStudyHref` must be the single definition of the route shape, shared with the case-study-page dimension. If that dimension chooses explicit routes over `/work/[slug]`, it edits `lib/routes.ts` and this component needs no change.
3. **Prerequisite, raised not owned — `CLAUDE.md` is stale.** Its "single static page", "light theme only", "No Tailwind", `components/Nav.tsx`, Gabarito, "page.tsx just stacks Hero → Work → About → Contact", "resume PDF has not been supplied", `tone` field and "1/2/3 shortcuts" claims are all false. A builder obeying it would ship this section with no `.dark` values, which DESIGN.md classifies as a bug. This is its own task, not folded in here.
4. **Not this dimension's edit:** PRODUCT.md line 22's volleyball/mentoring contradiction, and homepage.md §Audience/Job/Action's three co-equal primaries (the CTA dimension's call).

---

## 7. Documentation updates (Experience-scoped only)

**`DESIGN.md`** — regenerate, do not hand-edit (CLAUDE.md rule). Four entries:

- **§Color** — record `--rule` in both themes with its reason: `--glass-edge` is a white highlight that only reads over a glass fill and is nearly invisible on bare `--ground`; `--border` is a shadcn bridge token and measures ~1.25:1. `--rule` is the hairline token for non-glass structure, defined in `:root` and `.dark`, targeting ≥1.5:1 against `--ground`.
- **§Layout** — the third grid shape, inside The 1140 Rule: "Experience is a three-column record grid, `minmax(8ch, 0.6fr) minmax(0, 1.5fr) minmax(0, 2fr)`, 40px column gap, baseline-aligned, collapsing to one column at 760px." Plus `.section--experience { padding-top: 24px }` (16px ≤760px).
- **§Components** — new entry after Cards, "Records (Experience rows)": no glass, no radius, no shadow, no backdrop-filter; elevation is one 1px `var(--rule)` per row plus a closing rule on the list; the only non-card surface on the homepage, and why. Add the "*To add a role*" note beside the existing "*To add a project*" one. State that the row is not a control and carries no hover.
- **§Links** — the arrow grammar, honestly as two cases: "The icon leads when the link stays on the site (an in-page anchor or an internal route) and trails when it leaves (`GitHub ↗`, `LinkedIn profile ↗`). Route links are distinguished from anchors by their copy, not by a third icon."
- **§Navigation** — five menu links, keycaps 1–5, in document order.

**`PRODUCT.md` §Evidence on Hand, item 1** — append an explicit not-established list so the gap cannot be read as an invitation:

> Not supplied: the employer's name, whether Parth is cleared to name it, his job title, the exact start/end months, and which subsystems were his versus his partner's. Do not infer any of these. `data/experience.ts` ships them as `null`, and the page states no policy about disclosure.

**`.impeccable/surfaces/homepage.md`**:

- §Scope & Mode — sections become Hero → Work → Experience → Stack → About → Contact.
- §Unresolved Decisions — add: employer name and permission to print it; job title; exact months; the ownership split with the partner; whether the role is listed on LinkedIn (gates upgrading the secondary link's label). Mark this as the section that must be filled **before** ship, not after — the Hobbies section was cut for exactly the objection a permanently thin Experience section would invite.

---

## 8. Verification — numeric, before this is called done

Captures at **1440** and **390** wide, fold and full page, **both themes**, via `playwright-core` against `next start` with `reducedMotion: "reduce"`, full-page scroll first so the Reveal fires. Do not add Playwright to dependencies.

1. **Rule legibility.** Sample the computed `--rule` color and `--ground` with the DevTools color picker. Required: **≥1.5:1** in both themes. If it fails, raise the mix (28% light / 22% dark) — **never** add row padding, which makes a thin section taller without making it look decided, and never add the card treatment back.
2. **Heading fit.** `INTERNSHIP` renders on **one line** at 1440, 1280, 1024 and 390. If a supplied employer name later wraps to three lines, widen column 2 to `1.9fr` / column 3 to `1.6fr`. No clamp fork, no truncation.
3. **Baseline.** The date label, the h3 and the first prose line share a first baseline at 1440 and 1280. Confirm `h3.exp__company` is the first child of `.exp__who`.
4. **Decided vs unfinished.** Screenshot the Work→Experience boundary at 1440 in both themes. The ledger must read as a deliberate second material, not an unstyled block. This is the one judgment call in the section; if it fails, the fix is rule weight (§8.1) and row padding to 36px, in that order.
5. **Semantics.** VoiceOver on Safari announces "list, 1 item". If it does not, `role="list"` is missing.
6. **Links.** Tab order: case-study link, then LinkedIn. Focus ring (3px `--signal`, 3px offset, 4px radius) is not clipped — the section has no `overflow` constraint, so it must not gain one. The case-study link resolves; `/work/operations-agent` does not 404 once the case-study dimension lands. No GitHub affordance exists anywhere in the section's DOM.
7. **Truth audit.** Grep the rendered section for any string not traceable to PRODUCT.md §Evidence item 1 or `data/projects.ts`. Expected strings and nothing else: "Experience", the lede, "Summer 2026", "Internship", the team sentence, "Operations Agent case study", "LinkedIn profile".
8. **Keycaps.** 1–5 each land at the top of their section, `behavior: "auto"`, from both the menu and the keyboard. No keycap says 4 and scrolls to Contact.
9. **Route length.** Measure `document.body.scrollHeight` before and after. Combined with every other dimension, total growth ≤ +25%.
10. `npm run build` passes — the project's CI-equivalent gate. Then `/polish` before push, with findings fixed in the same push.

---

## 9. Known risks, stated plainly

- **The section is thin on launch day.** Four true facts and two links. Mitigated by placement (it elaborates Work rather than opening the page), by the lede stating the frame confidently, and by the absence of any visible empty slot. If tomorrow's content brings neither an employer name nor ownership prose, the correct response is **more content or no section** — never a placeholder that stands in for one. Do not resurrect the pill.
- **Soft fabrication drift in `owned`.** This is the most likely place on the site for "built with a partner" to become "led the design of." When tomorrow's content lands, `owned` gets reviewed against Parth's literal words, not paraphrased upward.
- **`--rule` is a new token.** DESIGN.md says a new value needs a new reason; the reason is written into §7 and must survive into the regenerated DESIGN.md, or the next agent will "consolidate" it back to `--border` and the ledger loses its only structure.
- **Column-2 width is sized for a name nobody has supplied.** 18 characters is the ceiling at 1440. A long employer name is a layout change, and the fix is the grid ratio, not the type ramp.