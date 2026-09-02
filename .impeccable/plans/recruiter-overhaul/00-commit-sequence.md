# Commit split, sequencing and risk — definitive design

## 0. Merge posture — read this first

**This PR is merge-blocked on Parth's content for exactly two things: three sections of real prose on `/work/operations-agent`, and the employer identity on the Experience row.** Every other commit is independently mergeable and independently sensible. The build is never in a broken state at any commit boundary.

The proposal's headline claim ("the site is complete and truthful with zero new content") and its twelfth risk ("HARD GATE: do not merge with fewer than three sections of real prose") were in direct contradiction. The reviewer is right. The reconciled statement is:

> The **codebase** is complete, type-safe and honest with zero new content — every surface renders correctly, nothing reads as unfinished, and tomorrow is a data edit, not a design edit. The **PR** does not merge until the Operations Agent route and the Experience row carry real facts, because those two are the site's conversion argument and shipping them hollow is worse than shipping today's page.

**Content-blocked commit count: five** — C4, C5, C7, C8, C10. Of those, C4/C8/C10 ship complete and render nothing until data arrives (no merge gate). C5 and C7 carry the merge gate. That is the reconciled count; the proposal's "six" was wrong.

---

## 1. C0 — branch setup (not a commit)

The worktree is on `typewriter-headline`. Verified this session:

```
git merge-base --is-ancestor HEAD origin/main   → true (merged)
origin/main = fcda416 "Merge pull request #12 from PartyD1/typewriter-headline"
```

CLAUDE.md forbids pushing onto a merged PR's branch, and auto-delete-head-branches means a push resurrects a deleted ref.

```bash
cd /Users/ParthDoshi/csProjects/portfolio/.claude/worktrees/impeccable-teach
git fetch origin
git switch -c case-studies-overhaul origin/main
git merge-base --is-ancestor origin/main HEAD && echo OK   # must print OK
```

The three untracked paths (`.agents/`, `.claude/`, `skills-lock.json`) are untracked and carry over untouched. They are never staged.

Worktree quirk that applies to every commit below: the skill directories are untracked here. Call skill scripts by **absolute path into the main checkout** (`/Users/ParthDoshi/csProjects/portfolio/.claude/skills/...`) while keeping cwd in the worktree.

---

## 2. The sequence

| # | Title | Content-blocked | Verification gate after it |
|---|---|---|---|
| C1 | Correct the records that are already false | — | build; docs diff read |
| C2 | Direction contracts for both surfaces | — | none (docs only) |
| C3 | Hero: three-line left-aligned headline, fixed-width slot | — | **full matrix** + hero invariant assertions + detector |
| C4 | Widen the project, stack and site data shapes | fields | build; `use` renders |
| C5 | The `/work/[slug]` route and case-study vocabulary | prose | **full matrix** + detector + keyboard |
| C6 | Cards become entry points | — | **full matrix** + detector + selection/tab pass |
| C7 | Experience section | employer | **full matrix** + detector + contrast |
| C8 | Simple Icons tech marks, vendored | mapping | build; grep gates |
| C9 | Scroll motion: the live layer | — | **motion matrix** (runs for real) |
| C10 | Scroll motion: the pinned media sequence | media | **motion matrix under fixtures** |
| C11 | Email as the single primary CTA | — | accent census + contrast |
| C12 | Polish pass | — | detector + full matrix |
| C13 | Regenerate the records | — | final full matrix, committed |

Ordering rationale, stated once:

- **Records that are already false lead** (C1), because every subsequent commit is written against them.
- **Contracts lead, descriptions follow.** This is the governing principle, replacing the proposal's inconsistently-applied "no commit describes something that does not exist at that commit." A *contract* (a surface brief's FIRST VIEWPORT block) is a specification the build is measured against, so it must precede the build — Impeccable's finish review audits FIRST VIEWPORT per surface, and leaving `homepage.md` saying "Centred hero" would fail a correct hero. A *description* (CLAUDE.md's architecture prose) records what exists, so it follows. C2 rewrites contracts ahead of C3–C10; C1/C13 correct descriptions before and after. The reviewer's minor point is accepted and resolved this way rather than by moving the FIRST VIEWPORT rewrite.
- **Data shape before the UI that consumes it** (C4 before C5–C8). C4 deliberately widens types so `npm run build` enumerates every stale consumer for you.
- **The route before the cards that link to it** (C5 before C6), so no commit contains a dead link.
- **Motion after the structure it animates** (C9/C10 last among code), because Rule 3.1 (`transform:` belongs to interaction, `translate:`/`scale:` to scroll) can only be enforced against final markup, and because `position: sticky` under an `overflow`/`transform`/`filter`/`contain` ancestor fails silently — the ancestor chain must be final before you assert on it.
- **Records regenerated last** (C13), because DESIGN.md is regenerated from what shipped, never hand-patched.

---

## 3. The commits

### C1 — Correct the records that are already false

Title: `Correct CLAUDE.md, PRODUCT.md and the homepage brief against the shipped site`

**`CLAUDE.md`** — fix only what is false *today*:
- "loads Gabarito … as `--font-gabarito`" → Unbounded (`--font-display`) + Hanken Grotesk (`--font-body`), both via `next/font/google`.
- "No Tailwind" → Tailwind v4 + shadcn + radix-ui + next-themes. `app/globals.css` opens with `@import "tailwindcss"; @import "tw-animate-css"; @import "shadcn/tailwind.css";` and `package.json` carries `tailwindcss`, `@tailwindcss/postcss`, `shadcn`, `radix-ui`, `next-themes`.
- "Light theme only. Don't re-propose a dark aesthetic" → dark shipped 2026-09-01 as a first-class second token set redefined under `.dark`; a value that exists in only one theme is a bug.
- `components/Nav.tsx` → `components/Shell.tsx`; client-component list becomes Shell, Reveal, ThemeToggle, ThemeProvider, OrbitScroller, RoleRoll, ScrollRing.
- "the resume PDF has not been supplied" → live at `public/resume.pdf`, gated by `resume.ready` in `data/site.ts` (currently `true`). Never hand-wire a link around the flag.
- Delete the stale `tone` / `lavender | mint | butter | peach` paragraph — no `tone` field exists.
- `1`/`2`/`3` shortcuts → `1`/`2`/`3`/`4`.
- Pinned reference "Seán leading" → Sharlee (re-pinned 2026-09-01).
- **The gate section, corrected honestly.** Verified this session: there is no `eslint`, no `eslint-config-next`, and no eslint config anywhere in the repo. `next build` therefore silently skips linting and `npm run lint` (`next lint`) drops into an interactive install prompt. Rewrite it as: *"There is no test suite and no linter. The gate is `npm run build` — TypeScript type-check plus a production compile — followed by the Impeccable detector (`node .claude/skills/impeccable/scripts/detect.mjs`), which is this repo's static-analysis pass. Run both before considering a change done."*

**`package.json`** — remove the `"lint": "next lint"` script. It cannot run, and `next lint` is deprecated in Next 15. Do **not** add eslint in this PR: introducing a linter to a 13-commit structural PR produces a repo-wide finding set that has nothing to do with this work and would have to be fixed inside it. Record the absence; add the linter in its own PR.

**`PRODUCT.md`**:
- Resolve the line-22 / line-63 self-contradiction. Line 22 ("the sport and the mentoring context have not been supplied") is superseded: volleyball, mentors younger kids, supplied 2026-09-02. **No team, league, level or program was supplied — do not invent one.** Keep that clause.
- Mark the "Editorial grotesk" entry under Brand Commitments as **superseded 2026-09-01** by the holographic system (Unbounded, lavender-grey, 22px radius, two themes).

**`.impeccable/surfaces/homepage.md`** — mark Unresolved Decision #1 (the About sentence grounding athlete/mentor) **RESOLVED**.

Not in this commit: anything this PR invalidates (single-static-page, the section list, the shortcut count). Those are C13.

**Gate:** `npm run build`. Read the docs diff end to end.

---

### C2 — Direction contracts for both surfaces

Title: `Rescope the homepage contract and add the case-study surface contract`

**`.impeccable/surfaces/homepage.md`**:
- Sections: `Hero → Work → Experience → Stack → About → Contact`.
- Audience/Job/Action: rewrite the three co-equal primaries ("opening the Operations Agent case study, downloading the résumé, and reaching GitHub/LinkedIn/email") to **one primary: email.** Résumé and links are secondary. Opening a case study is the *path* to the primary, not a co-primary.
- FIRST VIEWPORT: replace "Centred hero." with the left-aligned three-line headline — line 1 `HEY, I'M PARTH DOSHI`, line 2 the outlined lead `AND I'M`, line 3 the typing slot alone; content on the 1140 column, left edge shared with every section below it; the status line visible in the fold at 1440×900 and 390×844.
- Unresolved Decision #3 restated: *"Per-project tech mapping is blocked on Parth. The slot ships built; the row is absent, not skeletal, until the mapping is supplied. Do not infer it from repo language, README, or the framework you would expect."*

**`.impeccable/surfaces/case-study.md`** — NEW, full direction contract (THESIS / OWN-WORLD / STORY / FIRST VIEWPORT / FORM / FINISH). It states:
- The four locked sections — Problem & context; What I built & how; Outcome & impact; Hardest technical challenge — plus **Current limitations / what I'd do differently** (added: it is rare in student portfolios and reads as seniority) and **Ownership**, folded into the header metadata line rather than given a section.
- **Absent, not empty:** a section with no supplied prose does not render. There is no "coming soon" copy on a case study.
- **No eyebrow, no kicker, no section number, ever.** craft-floor L27 is the one hard ban on the page and L28 refuses 01/02/03 here (the sequence carries no information the reader needs — the headings do).
- **No hero-metric template.** Outcome is prose. Where nothing is documented, the section does not render; it never renders an invented number, a bar, a ring, or a count-up.
- **Operations Agent renders no repo affordance of any kind** — not a disabled link, not a greyed pill. A disabled control implies the thing exists.
- One pin allowance, spent on the media band only, gated on ≥2 media items.
- Email CTA at the foot of every case study.

**Gate:** none (docs only). Do not run the build for a docs commit.

---

### C3 — Hero: three-line left-aligned headline, fixed-width slot

Title: `Hero: three-line left-aligned headline; the typing slot never wraps at any width`

**The root cause, restated.** Line 2 (`AND I'M` + slot) needs 20.999em. At `5.1vw` that is `1.065 × vw` before the gutter is subtracted — wider than the viewport by construction across the whole fluid range, clearing only above ~1384px. Wrap-tuning cannot fix it. The fix is structural: the lead and the slot stop sharing a line box.

**The new invariant, and it is the thing every assertion checks:**

```
15.980em × font-size  ≤  0.95 × min(viewport − 2·gutter, 1140px)
```

(15.860em for `A COMPUTER SCIENTIST.` + 0.120em for the caret, both at weight 700, all-caps, tracking 0.005em. ±2% for kerning.)

Three changes make it hold at every width, and **every bound is expressed in px, never rem** — mixing a root-relative bound into a vw-measured invariant is precisely the hazard the survey identified, and it applies to the mobile floor exactly as much as to the desktop cap:

1. `--gutter` becomes a token, fluid below 400px, so the column is scale-proportional instead of having a fixed 20px bite that grows as a fraction on small phones.
2. Both display clamps get px bounds.
3. The slot is `white-space: nowrap`, so a future violation **clips** (assertable) instead of silently relaying out to a two-line-tall slot.

**Measured clearance across the full range** (this table goes in the commit message):

| vw | gutter | column | font-size | need | clearance |
|---|---|---|---|---|---|
| 280 | 14 | 252 | 14.56 | 232.7 | 7.7% |
| 320 | 16 | 288 | 16.64 | 265.9 | 7.7% |
| 360 | 18 | 324 | 18.72 | 299.2 | 7.7% |
| 390 | 19.5 | 351 | 20.28 | 324.1 | 7.7% |
| 400 | 20 | 360 | 20.80 | 332.4 | 7.7% |
| 430 | 20 | 390 | 22.36 | 357.3 | 8.4% |
| 577 | 20 | 537 | 30.00 (cap) | 479.4 | 10.7% |
| 720 | 20 | 680 | 30.00 | 479.4 | 29.5% |
| 721 | 20 | 681 | 36.77 | 587.6 | 13.7% |
| 768 | 24 | 720 | 39.17 | 625.9 | 13.1% |
| 1024 | 24 | 976 | 52.22 | 834.5 | 14.5% |
| 1188 | 24 | 1140 (capped) | 60.59 | 968.2 | 15.1% |
| 1280 | 24 | 1140 | 64.00 (cap) | 1022.7 | 10.3% |
| 1366 | 24 | 1140 | 64.00 | 1022.7 | 10.3% |
| 1440 | 24 | 1140 | 64.00 | 1022.7 | 10.3% |
| 1920 | 24 | 1140 | 64.00 | 1022.7 | 10.3% |

Worst case 7.7%, comfortably past the 5% gate even at the −2% kerning edge. Because both type and gutter are vw-proportional below 400px, the clearance is **flat** through the phone range — there is no cliff. The 14px floor binds below vw 269px; **declared minimum supported width is 280px**, and below ~265px the headline clips (no device presents that).

**`app/globals.css` — the gutter token** (new; `:root` and the 760px block, both themes share it since it is not a colour):

```css
:root { --gutter: 24px; }
@media (max-width: 760px) { :root { --gutter: clamp(14px, 5vw, 20px); } }
```

At every width ≥400px this is exactly the documented 20px, so nothing below 400px-wide changes for any existing surface. `.section`, `.hero` and the shell all switch their horizontal padding to `var(--gutter)` in this commit so the left edges stay aligned — which now matters, because the hero is left-aligned.

**`app/globals.css` — `.hero`** (replacing ~679-692):

```css
.hero {
  display: grid;
  grid-template-columns: minmax(0, 1fr); /* load-bearing: keeps the column
                                            from going max-content and
                                            escaping the viewport */
  align-content: center;
  justify-items: start;
  text-align: left;
  padding: 120px var(--gutter) 56px;
  max-width: calc(1140px + var(--gutter) * 2);
  margin-inline: auto;
  min-height: 100svh;
  overflow: clip;
}

@media (max-width: 760px) {
  .hero { padding: 96px var(--gutter) 48px; }
}
```

Top padding drops 150→120 (desktop) and 118→96 (mobile). This is decided, not conditional: the third line adds ~72px at 64px display and the fold must still show the status line.

**`.hero__title`** — keep `max-width: 100%` (load-bearing per the in-file comment). Font sizes:

```css
.hero__title { font-size: clamp(28px, 5.1vw, 64px); line-height: 1.12; letter-spacing: 0.005em; }
@media (max-width: 720px) {
  .hero__title { font-size: clamp(14px, 5.2vw, 30px); line-height: 1.18; }
}
```

**Delete** the `.hero__line--roll { display: flex; flex-wrap: nowrap; column-gap: 0.26em }` mobile rule — line 3 now holds exactly one item. **Delete** `.roll { min-width: 0; max-width: 100% }` from the mobile block: its comment says it exists so the longest phrase "wraps rather than be clipped," and wrapping is now the failure we want to be visible.

**`.roll`** gains `white-space: nowrap;`.

**`components/Hero.tsx`** — the `<h1>` becomes one out-of-flow `.visually-hidden` sentence (unchanged text, exactly one readable copy) plus three `aria-hidden` `.hero__line` blocks:

```tsx
<span className="hero__line" aria-hidden="true">
  <span className="type-outline">Hey, I&rsquo;m</span>{" "}
  <span className="hero__name">Parth Doshi<Wave className="hero__wave" /></span>
</span>
<span className="hero__line" aria-hidden="true">
  <span className="type-outline hero__lead">And I&rsquo;m</span>
</span>
<span className="hero__line hero__line--roll" aria-hidden="true">
  <RoleRoll phrases={phrases} />
</span>
```

`.hero__lead` keeps `white-space: nowrap`. The Outline-Lead Rule and the Never-Stroke-Bold Rule are untouched — the lead is still outlined at weight 400 inside the `@supports` guard, the subject still filled at 700. An orphaned outlined lead-in on its own line reads as composition, which is exactly what left-alignment buys.

The phrase list gains the width flag:

```tsx
{ text: "a computer scientist.", widest: true },
```

**`components/RoleRoll.tsx`**:

```ts
export type Phrase = {
  text: string;
  accent?: boolean;
  hold?: number;
  /** The widest phrase BY MEASURED WIDTH at weight 700, all-caps, 0.005em.
   *  Exactly one phrase carries it. Re-measure when the list changes. */
  widest?: true;
};
```

```ts
const flagged = phrases.filter((p) => p.widest);
if (process.env.NODE_ENV !== "production" && flagged.length !== 1) {
  console.warn(
    `RoleRoll: expected exactly one phrase with widest:true, found ${flagged.length}. ` +
      `Falling back to longest-by-character-count, which under-sizes on wide glyphs.`,
  );
}
const sized =
  flagged[0] ?? phrases.reduce((a, b) => (b.text.length > a.text.length ? b : a));
```

The character-count pick (`b.text.length > a.text.length`, line ~41) is replaced because it under-sizes on any future phrase with fewer but wider glyphs; runtime measurement is not an option because it cannot run at SSR and the box must exist pre-hydration.

Render a caret inside the sizer so both grid children measure identically:

```tsx
<span className="roll__sizer" aria-hidden="true">
  {sized.text}
  <span className="roll__caret" />
</span>
```

**Caret selector scoping — specified, not assumed** (this is the reviewer's minor #16 and it is real: if caret width lived under a `.roll__live`-scoped rule, the sizer copy would contribute zero width and the fix would silently do nothing):

- `.roll__caret` itself owns `width: .06em; height: .78em; margin-left: .06em; background: currentColor; vertical-align: -.04em;` — **unscoped**, so both copies measure identically. It already is unscoped today; keep it that way and add a comment saying why.
- Blink narrows to the live caret only: `.roll[data-mode="holding"] .roll__live .roll__caret { animation: blink 1s steps(2, jump-none) infinite; }`. The sizer copy is `visibility: hidden` so an animation on it would be invisible but would still be a running animation in `document.getAnimations()`, which C9's ambient-budget assertion counts.
- The sizer's `visibility: hidden; pointer-events: none` is unchanged.

This kills the 0.120em anchor drift that fired exactly when the longest phrase finished typing.

Everything else in `RoleRoll.tsx` is untouched: 320ms `document.fonts.ready` delay, 52ms/char ±26ms jitter, 26ms/char erase, 1900ms hold / 4200ms finale, 320ms beat, 3400ms reduced-motion whole-phrase swap, `document.hidden` + IntersectionObserver + hover pause, `[data-pretype]` transparent-glyph pre-hydration with the 1.6s reveal. The hover-pause and click-to-advance hit target survives because the slot still reserves the widest phrase's width.

**What is deliberately retired, and recorded:** the lead and the caret no longer share a baseline, because they no longer share a line. The caret contract that survives — and the one that licenses the trailing space — is that the caret sits immediately after the last typed glyph, on the slot's own line, with the live text left-aligned in a fixed-width box. That is intact and is now *stronger*, because on a left-aligned line the reader has a trustworthy left edge; the survey argued exactly this.

**Gate:** full capture matrix + the hero invariant assertions (§4.3) + detector.

---

### C4 — Widen the project, stack and site data shapes

Title: `Widen the project, stack and site data shapes; one list per fact`

**`data/projects.ts`**:

```ts
export type ProjectMedia = {
  /** Absent = render the authored Artifact mark as the frame's empty state. */
  src?: string;
  alt: string;
  kind: "image" | "gif" | "diagram";
  width: number;
  height: number;
};

export type CaseStudy = {
  problem?: string[];
  build?: string[];
  outcome?: string[];
  challenge?: string[];
  limitations?: string[];
};

export type Project = {
  slug: string;
  name: string;
  /** ONE taxonomy: the domain of system. Never a role, a date, or a claim. */
  label: string;
  tagline: string;
  description?: string;
  /** Third-party usage, sourced. Never a number that was not supplied. */
  use?: string;
  role?: string;    // BLOCKED
  dates?: string;   // BLOCKED
  /** 1 = flagship. 2 is defined and currently unused. Weight NEVER changes
   *  grid span — only the flagship spans a row. See C6. */
  weight: 1 | 2 | 3;
  /** Slugs into data/stack.ts. [] until Parth supplies the mapping. */
  tech: string[];   // BLOCKED
  media: ProjectMedia[]; // BLOCKED
  /** Public repo. Absent on operations-agent, permanently. */
  href?: string;
  demo?: string;    // BLOCKED
  note?: string;
  study?: CaseStudy; // BLOCKED
};
```

`flagship` is deleted; `weight === 1` replaces it.

**Label normalisation to one taxonomy** (domain of system), with the facts that were living in `label` relocated rather than lost:

| slug | new `label` | relocated to |
|---|---|---|
| operations-agent | `Agentic operations` | `Internship · Summer 2026` → `data/experience.ts` |
| scorely-ai | `AI evaluation` | `In use by DECA competitors` → `use` |
| santaclaws | `Agentic lead generation` | — |
| wave-function-collapse | `Procedural generation` | — |
| pewter-platformer | `Game AI research` | — |
| gestura | `Assistive tech` | — |
| wordplay | `Web game` | — |

**`ProjectCard.tsx` renders `use` in this commit** — a one-line addition to both existing branches:

```tsx
{project.use && <p className="card__use">{project.use}</p>}
```

with `.card__use { font-size: 0.9375rem; color: var(--ink); font-weight: 500; }`. The reviewer is right that deferring this to C6 would leave two commits where the site's single strongest fact — somebody other than the author used the thing — is absent. Each commit must be independently sensible, and a commit that deletes the site's best fact is not.

**`data/stack.ts` — widened, and it stays the single source of truth for tools.** The reviewer is right that a parallel `data/tech.ts` would fork the list and silently break the file's own documented contract ("add a tool by adding it to a group"). `data/tech.ts` is **not created.**

```ts
export type StackItem = {
  name: string;
  /** Simple Icons slug. Absent = no official mark exists; renders as a pill. */
  slug?: string;
};

export type StackGroup = {
  id: string; label: string; short: string; tone: string;
  items: StackItem[];
};
```

All 29 tools become `{ name, slug? }`. Slugs are assigned only where an official Simple Icons mark exists — `python`, `openjdk`, `javascript`, `typescript`, `c`, `html5`, `css`, `gnubash`, `tailwindcss`, `elixir`, `fastapi`, `flask`, `react`, `nextdotjs`, `pytorch`, `tensorflow`, `pandas`, `pydantic`, `langchain`, `nodedotjs`, `postgresql`, `supabase`, `openai`, `vercel`, `apify`, `git`, `jupyter`. **NemoClaw and OpenClaw carry no slug** and render as text pills. Assigning a slug to a supplied tool is not an inference; attaching a tool to a *project* is, and that is what stays empty.

`components/Stack.tsx` and `components/OrbitScroller.tsx` update to read `item.name`. The compiler enumerates them.

**`data/site.ts`**:
- Receives `links = { email, github, linkedin }`, moved out of `projects.ts` (`components/Shell.tsx` and `components/Contact.tsx` update their imports — mechanical; the build lists them).
- Adds:

```ts
/** BLOCKED — supplied by Parth. Each renders ONLY when non-null.
 *  Never invent, never approximate, never write "TBD" into the UI. */
export const availability = {
  gradTerm: null as string | null,
  location: null as string | null,
  target: null as string | null,
};
```

**`data/fixtures.ts` — NEW.** This is the mechanism that makes C10's pin and the availability subline verifiable **before** their content exists, which is the reviewer's blocking #1 and major #10.

```ts
/** Local verification only. Never set in any committed env file, never in
 *  production. Fixture content is labelled and is not project content. */
export const FIXTURES = process.env.NEXT_PUBLIC_FIXTURES === "1";

export const fixtureMedia: ProjectMedia[] = [
  { alt: "FIXTURE — not real content", kind: "diagram", width: 1600, height: 1000 },
  { alt: "FIXTURE — not real content", kind: "diagram", width: 1600, height: 1000 },
];

export const fixtureAvailability = {
  gradTerm: "FIXTURE — June 2027",
  location: "FIXTURE — Santa Cruz, CA · open to relocation",
  target: "FIXTURE — Software engineering, applied AI",
};
```

Fixture media carry no `src`, so they render the same authored `Artifact` mark the real empty state uses — which is precisely why the choreography is identical with fixtures, with a placeholder, and with tomorrow's screenshot (survey:motion Rule 10.4). `process.env.NEXT_PUBLIC_FIXTURES` is inlined at build time, so with the variable unset the entire branch is dead code. **Grep gate (C9/C10/C13):** after a plain `npm run build`, `grep -r "FIXTURE — not real content" .next/` must return nothing.

**Gate:** `npm run build`; confirm `use` renders on the ScorelyAI card at 1440 light.

---

### C5 — The `/work/[slug]` route and case-study vocabulary

Title: `A page per project: /work/[slug], case-study sections, route-aware nav`

**`app/work/[slug]/page.tsx`** — NEW.
- `generateStaticParams()` over `projects` → 7 static routes.
- `generateMetadata()` per project: `title = "${name} — Parth Doshi"`, `description = tagline`.
- `notFound()` on an unknown slug.
- Order: `<CaseStudyHeader>` → media band → sections → foot.
- Sections render **only when their `study` field exists**:

```tsx
{p.study?.problem && <CaseStudySection id="problem" title="Problem & context">…</CaseStudySection>}
{p.study?.build && <CaseStudySection id="build" title="What I built & how">…</CaseStudySection>}
{p.study?.outcome && <CaseStudySection id="outcome" title="Outcome & impact">…</CaseStudySection>}
{p.study?.challenge && <CaseStudySection id="challenge" title="Hardest technical challenge">…</CaseStudySection>}
{p.study?.limitations && <CaseStudySection id="limitations" title="Current limitations">…</CaseStudySection>}
```

- Foot: the email CTA, in the same treatment Contact uses (display face + 3px coral underline). The bottom of a case study is the highest-intent moment on the site.
- Operations Agent: no repo affordance in any form. Its `note` renders as calm prose in the header — *"The code and the company's data stay internal. The architecture and the decisions I can walk through in detail."* — and the Experience row plus LinkedIn carry the off-site verification.

**`components/CaseStudySection.tsx`** — NEW. The API is exactly:

```tsx
export default function CaseStudySection({
  id, title, children,
}: { id: string; title: string; children: React.ReactNode }): JSX.Element
```

**There is no `label`, `kicker`, `eyebrow`, `number`, or `index` prop, and none may be added.** craft-floor L27 marks the eyebrow above a heading as the one ban no brief earns back; L28 refuses 01/02/03 here. Making the slot structurally unavailable is stronger than leaving it unused, and a future genuine need requires an API change plus an argument — which is the point. Renders `<section className="section case__section" id={id} aria-labelledby={`${id}-t`}>` with `scroll-margin-top: 84px`. Prose measure capped at **70ch** (craft-floor 65–75ch).

**`components/CaseStudyHeader.tsx`** — NEW.
- `.case__back`: a **leading** arrow to `/#work`, reading `back to the work`. This is the third arrow-grammar case, and it is decided here: **leading arrow = stays on the site; trailing arrow = leaves the site.** So `← back to the work` and `case study →`… no: an internal route link takes the *leading* arrow, an outbound link takes the *trailing* `ArrowUpRight`. That distinction is what makes `case study` and `GitHub ↗` read as different promises.
- `.case__meta`: a hairline metadata line rendering only the fields that exist — `label`, `role`, `dates`, `use`. Nothing renders a placeholder.
- `<TechRow>` slot (populated in C8; renders nothing until then and nothing after, until the mapping arrives).
- The media band.

**The media well — and the DESIGN.md rule it amends.** The band is **opaque**, not glass:

```css
.case__media {
  position: relative;
  overflow: clip;
  aspect-ratio: 16 / 10;
  max-height: 62svh;
  border-radius: var(--radius-card);
  border: 1px solid var(--glass-edge);
  background: var(--media-well);
}
.case__media__inner { position: absolute; inset: -3% 0; display: grid; place-items: center; }
```

with a new token, defined once against an already-themed value so it is correct in both themes:

```css
:root { --media-well: var(--white); }
```

This **breaks The Blur-Is-Legibility Rule**, which says anything floating over the wash carries `backdrop-filter`. The reviewer is right that the proposal shipped that violation silently. It is now a named, recorded amendment, added to C13's DESIGN.md list:

> **The Opaque-Media Rule.** A media well is opaque, because its content is opaque. Blur exists to keep *text* legible over the animated wash; a screenshot has no such job, and blurring behind it would be finish rather than function. An opaque well is also the only surface that may travel under scroll motion — a moving `backdrop-filter` element re-samples and re-blurs its backdrop every frame over the blob wash with a `mix-blend-mode: multiply` grain layer on top, which is the single worst thing this page could ask a compositor to do (survey:motion Rule 3.2).

**`components/Shell.tsx`** — route-aware navigation:
- `usePathname()`; menu hrefs become `/#work`, `/#experience`, `/#stack`, `/#about`, `/#contact`.
- Keydown handler: `const el = document.getElementById(id); el ? el.scrollIntoView({ behavior: "auto" }) : router.push('/#' + id)`. Keyboard-initiated scroll is **never** animated, at any motion preference — the existing house rule, extended to cross-route jumps.

**`app/globals.css`** — a `.case__*` block: header, back link, metadata line, media band, section rhythm (`80px var(--gutter) 96px`, `max-width: 1140px`, collapsing to `64px var(--gutter) 72px` at 760px). No `box-shadow`. No fifth radius value.

**Gate:** full capture matrix on `/`, `/work/operations-agent`, `/work/wordplay`; detector on the new files and globals.css; keyboard pass (1–5 from a case study must push to `/#id`, never no-op).

---

### C6 — Cards become entry points

Title: `Cards link to their case study; one card structure; footers align`

**`components/ProjectCard.tsx`** — the two hand-written branches collapse into **one** structure. Weight changes classes, grid span and type scale; it never changes *which fields render*. Today `description` and `note` render only in the flagship branch, which means tomorrow's content would silently vanish on the other six — that is the defect being fixed.

The whole card is the link:

```tsx
<article className={cx("card", weight === 1 && "card--flagship")}>
  <Link href={`/work/${slug}`} className="card__hit">
    <ArrowRight /> case study
  </Link>
  …name, tagline, use, meta…
  {href && <a className="card__repo" href={href} target="_blank" rel="noreferrer"
              aria-label={`${name} on GitHub`}>GitHub <ArrowUpRight /></a>}
</article>
```

```css
.card { position: relative; height: 100%; }
.card__hit::after { content: ""; position: absolute; inset: 0; z-index: 0; }
.card__repo { position: relative; z-index: 1; }
```

The overlay is a **pseudo-element on the link**, not an anchor wrapping the content, so the tagline stays selectable. Operations Agent renders no `.card__repo` at all.

**Card stretch — the ragged-bottom fix.** The `Reveal` `<div>` is the grid item and `.card` sits inside it as a plain block, so `grid-template-rows: auto 1fr auto` and `margin-top: auto` on the foot are both inert today. Fix:

```css
.work__item { display: grid; }
.card { height: 100%; }
```

**Touch feedback.** Add, **outside** the `hover:hover and pointer:fine` guard:

```css
.card:active { transform: scale(0.98); }
```

`0.98` — the documented value for a large surface (menu links), not a third value. The proposal's `0.995` is a 2.8px inset on a ~561px card, below the perceptual threshold the press rule exists to clear, and it would be a fifth press value against a documented pair with no reason given.

**`.card__foot`** holds only the two links. The `whitespace-nowrap` `shrink-0` `Badge` moves out of the `space-between` row (where "In use by DECA competitors" overflowed and was silently clipped by `overflow: hidden` at ~761px) and becomes the metadata line.

**The gradient edge — the honest fix.** The reviewer is right that "CSS knows the column count" is false: `:nth-child()` does not know it either, and with 7 items where the flagship spans `1 / -1`, no simple nth formula produces one-per-row alternation. The fix is a **hand-off**, and both halves are stated:

- The **two-column parity is computed in JS** — it is correct today and provably so. With the flagship spanning its own row, the remaining six occupy rows `(1,2) (3,4) (5,6)`. For `k = i − 1`, `row = ⌊k/2⌋`, `col = k % 2`, edge when `col === row % 2` → `k = 0, 3, 4` → `i = 1, 4, 5`, which is one per row, alternating left → right → left. Plus the flagship at `i = 0`. This is exactly the existing rule and it is not the bug.
- The **single-column case is chosen in CSS**, because JS cannot know the column count and duplicating the breakpoint in JS is the thing to avoid.

`Work.tsx` emits the fact; CSS picks the rule:

```tsx
<Reveal
  key={p.slug}
  delay={i * 50}
  className={cx("work__item", p.weight === 1 && "work__item--flagship")}
  data-edge-2col={edge2col(i) ? "" : undefined}
>
```

```css
@media (min-width: 761px) {
  .work__item[data-edge-2col] .card::before { /* the 2px masked gradient ring */ }
}
@media (max-width: 760px) {
  .work__item:nth-child(odd) .card::before { /* every other card down the stack */ }
}
```

At one column, `:nth-child(odd)` = items 1, 3, 5, 7 = indices 0, 2, 4, 6 — perfect alternation down the stack, which is exactly what the original code comment wanted and what `isGradient` failed to deliver (it produced 0, 1, 4, 5: two adjacent, a gap, two adjacent).

**And the invariant that keeps it true: `weight` never changes grid span.** Only `weight === 1` spans `1 / -1`. Weight 2, when it is ever used, changes type scale and media aspect only. This removes the "promoting a card to weight 2 silently breaks the parity math" failure the reviewer identified.

**The media frame.** `.card__art` becomes `.card__media`, an aspect-ratio frame with the same 1px `--glass-edge` border and 22px radius as the case-study well, on `--media-well`. The authored `Artifact` mark renders inside it as the **designed empty state** — not a soft-shadowed rounded rectangle standing in for content (craft-floor L37), but authored SVG in `currentColor` under The Drawn-Not-Set Rule. When a screenshot arrives it replaces the mark inside an identical frame, so nothing about the layout or the choreography changes.

**`components/Artifact.tsx` line ~84 — the knockout coupling, fixed.** The Scorely checkmark is knocked out with `stroke="var(--card)"`, a token that has nothing to do with what is painted behind the mark. Change it to `stroke="var(--media-well)"`, which is now the frame's actual background token in both the card and the case-study well. Captured in both themes in this commit.

**`components/Work.tsx`** — delete `isGradient()` and the `gradient` prop entirely. Update the section lede so it promises the pages the cards lead to, not just the repos: the current sentence ("Seven things I've made. Six have the code out in the open; the one I'm proudest of lives inside a company.") stays true but must now also say the cards open.

**Gate:** **full capture matrix** (this is the largest visual change on the highest-traffic surface — the reviewer's coverage inversion is corrected here) + detector + a tab pass + a drag-select of a card tagline to prove the stretched `::after` did not eat text selection.

---

### C7 — Experience section

Title: `Experience: a dense ruled list of supplied facts`

**`data/experience.ts`** — NEW.

```ts
/** BLOCKED and therefore ABSENT, never placeholder text: the company name and
 *  the role title. PRODUCT.md supplies neither. Do not write "Company pending"
 *  into the UI and do not infer either from the case study. */
export type ExperienceEntry = {
  id: string;
  period: string;
  company?: string;   // BLOCKED
  title?: string;     // BLOCKED
  ownership: string;
  href?: string;
};

export const experience: ExperienceEntry[] = [
  {
    id: "operations-agent",
    period: "Summer 2026",
    ownership: "Built an agentic booking-operations system with a partner.",
    href: "/work/operations-agent",
  },
];
```

**`components/Experience.tsx`** — NEW. Returns `null` when `experience.length === 0`, so it can never become the content-free section that got Hobbies cut.

A **dense two-column ruled list, not cards.** An experience list is the textbook case of craft-floor L25 ("same-size cards of icon plus heading plus text as the page structure") and a timeline spine is the textbook case of L35 (a coloured `border-left` above 1px). `operate` L60 explicitly permits density for a scanning reader, and date ranges are the legitimate sequence signal L28 asks for — **no 01/02/03**.

```css
.exp__row {
  display: grid;
  grid-template-columns: minmax(0, 18ch) minmax(0, 1fr);
  column-gap: 48px;
  padding-block: 26px;
  border-top: 1px solid var(--glass-edge);
}
.exp__row:last-child { border-bottom: 1px solid var(--glass-edge); }
@media (max-width: 760px) {
  .exp__row { grid-template-columns: minmax(0, 1fr); row-gap: 10px; column-gap: 0; }
}
```

No card, no backdrop-filter, no left rail — which also keeps the section off survey:motion Rule 3.2's do-not-move list. This is a **third grid shape** in a system that had exactly two (Work `repeat(2, minmax(0,1fr))`, About `minmax(0,1fr) minmax(0,1.5fr)`), defined inside The 1140 Rule with the 760px collapse and recorded in C13.

**The role column carries no role.** The reviewer is right: "Internship" is an employment *type*, not a job title, and putting it in the slot a recruiter reads as the title is a soft fabrication of exactly the class this plan is otherwise rigorous about. The columns are **period | ownership**. `company` and `title` render above `ownership` when supplied, and are absent until then — the same handling the company name gets. The proposal's "role: 'Internship'" is dropped.

The row links to `/work/operations-agent` — never to a repo, which is the only PRODUCT-safe target as well as the locked decision.

**`app/page.tsx`** — `<Experience />` between `<Work />` and `<Stack />`. Work leads (lead with the work); Experience sits directly behind it as the verification layer.

**`components/Shell.tsx`** — `items` gains `{ id: "experience", label: "Experience", key: "2" }`; stack/about/contact renumber to 3/4/5. The `calc(var(--i) * 40ms + 80ms)` stagger is unchanged and still inside the 30–80ms budget.

**Merge gate:** this section ships with one row, no employer, no title. That is thin, and thinness is not solved by the absent-not-empty policy — the policy solves emptiness. It is listed alongside the Operations Agent prose as **fill-before-ship**.

**Gate:** **full capture matrix** + detector (both added here per the reviewer's coverage correction — this commit introduces a new component, a third grid shape, a new breakpoint collapse and new contrast pairs) + contrast on the two new text pairs.

---

### C8 — Simple Icons tech marks, vendored

Title: `Vendor Simple Icons as a bounded exception; per-project tech row ships empty`

**`scripts/vendor-icons.mjs`** — NEW, matching the `make-grain.mjs` precedent exactly: a committed generator, a generated artifact, provenance in the header, "regenerate, never hand-edit."
- Reads slugs from `data/stack.ts` — **the one list**. There is no second vocabulary file.
- Pulls paths from a pinned `simple-icons` version via a one-shot `npx`; the package is **never** added to `package.json`.
- Writes `components/tech-marks.generated.ts` with a header recording: source, exact package version, resolution date, CC0-1.0 licence of the icon data, the note that the marks remain third-party trademarks, and the regeneration command.
- Emits **path data only, never a brand hex.** Grep gate: `#[0-9A-Fa-f]{6}` matches nothing in the generated file.

**`components/TechMark.tsx`** — NEW.

```tsx
export function TechRow({ slugs }: { slugs: string[] }): JSX.Element | null
```

Returns `null` on an empty array — the row is **absent**, not a skeleton, not an "empty state that teaches the interface." There is nothing to teach; the fact does not exist yet.

Each mark: `viewBox="0 0 24 24"`, `fill="currentColor"` (never a brand colour), a fixed 20px box, 14px gap, baseline-aligned with a 0.875rem name, `--ink-2` at rest and `--ink` on row hover/focus. A tool with no `slug` renders the 999px outline pill, so no supplied tool is ever silently dropped.

**Rendered in the case-study header only.** Never on homepage cards, which keep the authored stroke vocabulary intact.

**The reconciliation, stated as a decision.** Simple Icons are solid single-path 24px silhouettes; every other mark on this site is 2.25–2.5px open stroke in `currentColor`. Dropping filled brand glyphs beside `ArrowUpRight` is two icon styles on one surface (`operate` L36) and a head-on break of The Drawn-Not-Set Rule. The reconciliation is: **one bounded register, one surface, one size, one ink.** Brand *geometry* — which is what the locked decision asked for — ships; brand *colour* does not, because ~30 uncontrolled accents would blow The One Accent Rule and The Ground-Only Iridescence Rule on a page whose identity is "exactly one accent colour." Documented as a named amendment in C13. **Fallback, if the amendment cannot be written cleanly: ship the text-pill treatment for all tools and no marks at all.**

**The mapping ships empty.** `tech: []` on all seven projects. PRODUCT.md is explicit — no tool→project mapping and no fluency ordering exist, do not infer either. Populating from repo language, README, or the framework you would expect is fabrication under Principle 4.

**Gate:** `npm run build` + the grep gates. **No full capture matrix** — this commit renders nothing new on any surface (the reviewer's coverage correction: do not spend a capture matrix on dead code).

---

### C9 — Scroll motion: the live layer

Title: `Scroll motion: the case-study media well drifts inside its frame`

**Load the `emil-design-eng` skill before writing a line of this commit.** CLAUDE.md binds every animation in this project to it, and DESIGN.md says the system is not negotiable per-component. The cinematic ceiling is an owner-authorised amendment on top of it, not a bypass of it.

This commit exists because of the reviewer's blocking #1, and the reviewer is right: gating the entire motion layer on `media.length >= 2` would have shipped it permanently dormant and made every one of its verification steps unrunnable at the gate. The split is:

- **C9 — live now, on every case-study route, with zero new content.** The media well always exists (the `Artifact` mark is its empty state), so the effect runs at merge and can be measured.
- **C10 — the pin**, gated on media, verified under fixtures.

The effect is a **traversal driven by the frame's aspect ratio, not by pixel content** (survey:motion 5.3 and Rule 10.4), so it is bit-identical with the placeholder mark, with a fixture, and with tomorrow's screenshot:

```css
@supports (animation-timeline: view()) {
  @media (prefers-reduced-motion: no-preference) and (min-width: 761px) {
    .case__band:not(.case__band--pinned) .case__media__inner {
      animation: media-drift linear both;
      animation-timeline: view();
      animation-range: cover 0% cover 100%;
    }
  }
}

@keyframes media-drift {
  from { translate: 0 -3%; }
  to   { translate: 0  3%; }
}
```

Every value is deliberate:
- `translate:`, never `transform:` — Rule 3.1. `transform` on any element that also has a hover transform silently replaces it.
- 6% total differential on the inner layer, against Rule 4.3's 8% ceiling. The inner is `inset: -3% 0` so it is 106% tall and no edge is ever exposed at either end of the range.
- `linear`, always — Rule 4.1. An eased scrub is the mechanism by which cinematic scroll starts feeling laggy.
- `min-width: 761px` — mobile gets less by rule, not by accident (Rule 8.6). The site already disables blob drift under 720px.
- The start state lives **only inside** the `@supports` + `no-preference` guard, so the finished state is the default (Rule 6.1). No JS, no scroll listener, no polyfill (Rule 2.2).
- `.case__media` is opaque and carries no `backdrop-filter`, so nothing re-blurs per frame (Rule 3.2).
- The `:not(.case__band--pinned)` scope is what keeps the route at **one** authored scroll moment when C10 lands — the drift is replaced by the pin, never stacked under it.

`will-change` is not set. Chromium promotes scroll-timeline-driven elements already, and blanket `will-change` costs memory and can reduce framerate on mobile (Rule 3.4).

**Gate:** the full motion matrix (§4.6) — and it runs for real, on live code, at this commit.

---

### C10 — Scroll motion: the pinned media sequence

Title: `Scroll motion: one pinned media sequence per case study, gated on media`

The route's single pin allowance, spent on the media band — never on Problem & context, What I built & how, or Outcome & impact, which are read, not watched (Rule 10.2). **Zero pins on the homepage**, ever: the hero → cards → email path is the conversion path and nothing choreographed may lengthen it (Rule 10.1).

Renders when `media.length >= 2`; caps at **3 beats** (any further media render in a static strip below the pin).

```css
/* Default — no guard. A readable, stacked band. This is what ships to every
   engine without view() and to every reduced-motion reader, and it is why
   there is no "undo" block below. */
.case__stage { display: grid; gap: 18px; }
.case__pin { scroll-margin-top: 84px; }

@supports (animation-timeline: view()) {
  @media (prefers-reduced-motion: no-preference) and (min-width: 761px) {
    .case__pin   { height: 250svh; }
    .case__stage { position: sticky; top: 0; height: 100svh;
                   align-content: center; gap: 0; overflow: clip;
                   padding-block: 84px 24px; }
    .case__beat  { grid-area: 1 / 1; animation: beat linear both;
                   animation-timeline: view(); }

    .case__pin[data-beats="2"] .case__beat:nth-child(1) { animation-range: contain 0%     contain 50%; }
    .case__pin[data-beats="2"] .case__beat:nth-child(2) { animation-range: contain 50%    contain 100%; }
    .case__pin[data-beats="3"] .case__beat:nth-child(1) { animation-range: contain 0%     contain 33.34%; }
    .case__pin[data-beats="3"] .case__beat:nth-child(2) { animation-range: contain 33.33% contain 66.67%; }
    .case__pin[data-beats="3"] .case__beat:nth-child(3) { animation-range: contain 66.66% contain 100%; }
  }
}

@keyframes beat {
  0%   { opacity: 0; translate: 0  6%; scale: 0.985; }
  22%  { opacity: 1; translate: 0  0;  scale: 1; }
  78%  { opacity: 1; translate: 0  0;  scale: 1; }
  100% { opacity: 0; translate: 0 -6%; scale: 0.985; }
}
```

Every number checked against the budget:
- `250svh` container around a `100svh` sticky child = **150svh** of sticky travel — exactly Rule 4.3's ceiling, not over it.
- 2 beats → 75svh each; 3 beats → 50svh each. Both inside the 40–80vh window; nothing twitches, nothing feels stuck.
- `svh`, never `vh` or `dvh` — `vh` jumps when the mobile URL bar hides, `dvh` resizes continuously *during* the scroll, which is jitter. The site already standardises on `svh`.
- The pin is **additive inside the guard**, so there is no reduced-motion undo block to get wrong: without the guard the stage is a plain stacked grid at final state, at normal length. That satisfies Rule 6.1 and Rule 7.2 with one structure instead of two.
- `scroll-margin-top: 84px` on the pin container, and the anchor target sits at the pin's **top edge**, never inside it, so the 1–5 shortcuts and any deep link land at the start with context.
- **No focusable element ever goes inside `.case__stage`.** Media frames carry captions, not links. This is what licenses the beat's opacity dipping to 0 without violating Rule 7.3, and it is an assertion (§4.6), not an assumption.

**Sticky preconditions, asserted rather than assumed.** `.case__pin` is a direct child of the page flow — never inside `.hero` (`overflow: clip`) or `.card` (`overflow: hidden`), where sticky dies with no error. The capture script walks the ancestor chain and fails on any `overflow` other than `visible`, or any `transform`, `filter`, `backdrop-filter` or `contain` (§4.6).

**Verified at merge, with no content, via fixtures.** With `NEXT_PUBLIC_FIXTURES=1`, `/work/operations-agent` renders two src-less frames, `data-beats="2"`, and the full pin. Every C10 check — reduced-motion end-to-end read, `scrollHeight` growth, sticky `top: 0` across the range, paint flashing, layer borders, keyboard traversal, ambient-budget-at-rest — runs against real pinned DOM before the gate.

**The cross-route View Transition is dropped from this PR.** The proposal's `@view-transition { navigation: auto }` is a *cross-document* rule and Next's App Router `<Link>` does client-side navigation, so it would never have fired; making it fire requires `experimental: { viewTransition: true }` in `next.config.ts` (verified this session: the config contains only `reactStrictMode` and `outputFileTracingRoot`), and the proposal's single `view-transition-name: card__media` would have been duplicated across seven homepage cards, aborting the transition in any browser that did run it. Both are real. **I am not taking the reviewer's "or fix it" branch.** It is the only item in this PR that would require an experimental Next flag; it is the only item whose verification depends on a browser feature the cached headless shell may or may not drive reliably; and it contributes nothing to conversion. Continuity is a valid purpose (Rule 1.2) but it is the *fourth* of four, and it is not worth an experimental framework flag on a PR that already lands a route, a data reshape, an icon system and a motion layer. Recorded in `.impeccable/surfaces/case-study.md` as a named follow-up with the exact requirements (config flag, `view-transition-name: card-${slug}` on both ends, per-slug uniqueness).

**Gate:** the full motion matrix under fixtures, plus the plain (no-fixture) build to confirm the pin is absent from the DOM and the fixture string is absent from `.next/`.

---

### C11 — Email as the single primary CTA

Title: `Email is the one loudest action; résumé and links stay quiet`

Email's primacy is expressed as a **type rule**, not by bolting a button into the hero: **email is the only element on the site that gets the display face plus the 3px coral underline. Résumé and social links are never given display type and never given coral.** An email CTA above the fold asks for contact before any evidence has been shown; the locked decision is about relative weight, and weight here is a typographic fact the system already owns.

- `components/Contact.tsx` — confirm the email keeps display face + coral underline.
- `components/ResumeLink.tsx` — audit and strip any `--font-display` or coral. The `resume.ready` gate stays wired exactly as-is; never hand-wire a link around the flag.
- `app/work/[slug]/page.tsx` — the case-study foot carries the same email treatment. **This is not a seventh accent.** The One Accent Rule counts *kinds* of place, not instances; "the email underline" is one kind, and it now appears on two surfaces. Recorded in C13.
- `components/Hero.tsx` — render the availability subline from `site.availability`, each field only when non-null. Layout is specified and captured **now**, under fixtures, at 390/1280/1440 in both themes, so tomorrow's values are a data edit and not a design edit under time pressure. This is the reviewer's major #10 and it is accepted in full: survey:convert calls graduation term / location / role target the single highest-cost omission on the site, and leaving its layout undesigned would have re-created exactly the problem this plan claims to eliminate.

```tsx
const a = FIXTURES ? fixtureAvailability : availability;
…
{(a.gradTerm || a.target || a.location) && (
  <p className="hero__avail">
    {[a.gradTerm, a.target, a.location].filter(Boolean).join(" · ")}
  </p>
)}
```

`.hero__avail`: body face, 0.9375rem, `--ink-2`, `max-width: 46ch`, `margin-top: 10px`. It renders directly under `.hero__sub` and above `.hero__actions`.

**The hero keeps both arrow links.** The proposal's C10 quietly reduced `see my work` + `more about me` to one, with no rationale — the reviewer is right to flag an unargued change, and I am reversing it rather than justifying it. About is now section 4 of 5 and holds the sentence survey:convert calls the most convincing thing on the site ("an operations team's broken bookings, a DECA competitor's unscored report, a small business without a website"). Removing its only above-the-fold path to serve a CTA hierarchy that is already carried by type would cost more than it buys.

**Gate:** the accent census (§4.5) + contrast on `.hero__avail` in both themes.

---

### C12 — Polish pass

Title: `Polish pass across the case-study route, cards, Experience and the hero`

Run `/polish` (the pinned shortcut for `/impeccable polish`) across the **full diff** and fix every finding **in this commit**. The repo rule is that any change to `app/`, `components/`, `data/` or `DESIGN.md` runs the polish pass before push and its findings ship in the same push; this PR touches all four.

**Gate:** detector on every touched file + full capture matrix.

---

### C13 — Regenerate the records

Title: `Regenerate DESIGN.md; close out CLAUDE.md, PRODUCT.md and the capture set`

**`DESIGN.md` — REGENERATE, do not hand-edit.** CLAUDE.md's own rule: after any visual change of substance, regenerate. Thirteen commits of visual change against a hand-maintained doc is exactly the drift that rule exists to prevent. It must now carry:

1. The left-aligned three-line hero, the `--gutter` token and the fluid mobile gutter below 400px, and the no-wrap invariant written as a checkable formula.
2. The display clamps expressed in px, and **why**: a root-relative bound inside a vw-measured invariant is a silent-overflow generator at large default font sizes.
3. **The third arrow-grammar case**: leading arrow = stays on the site; trailing `ArrowUpRight` = leaves it.
4. The card-as-link pattern (pseudo-element overlay on the link; nested repo anchor at `z-index: 1`; selection preserved).
5. The media frame, with the authored `Artifact` mark as its designed empty state, and the `--media-well` token.
6. **The Opaque-Media Rule** — the named amendment to The Blur-Is-Legibility Rule, with its justification (§C5).
7. The Experience ruled-list pattern and its grid shape, as the **third** shape inside The 1140 Rule, with the 760px collapse.
8. **The Simple Icons bounded exception** as a named amendment to The Drawn-Not-Set Rule, with the full spec: viewBox 24, `fill` not `stroke`, 20px box, 14px gap, `currentColor` (`--ink-2` rest / `--ink` hover), case-study header only, generated by `scripts/vendor-icons.mjs`, CC0 icon data, third-party trademarks, regenerate never hand-edit.
9. **The orbit / tech-mark coexistence paragraph** (survey:records D.6, which the proposal omitted): the Stack orbit is the site's one claim about the *breadth* of the stack, read as three rings; the per-project tech row is a claim about *what a given project used*. They are different claims on different surfaces and the page never makes the same claim twice. The orbit is not rewritten, is not rotated on scroll, and does not collapse to a list on mobile.
10. **The scroll-motion amendment**, verbatim: *"Position-linked motion is exempt from the ambient budget: the user is the clock, and at scroll rest the page is still. It is governed by the Scroll Motion Ruleset — one authored scroll moment per route, `linear` scrub, `translate`/`scale`/`opacity` only, `@supports`-gated with the finished state as the default, pins collapsed under reduced motion and below 761px, ≤150svh sticky travel, ≤+25% route length."* Plus the numeric ceiling so "cinematic" is testable rather than a vibe.
11. §Navigation rewritten for five keycaps and route-aware jumps.
12. The back affordance and the case-study section vocabulary.
13. The One Accent Rule note that it counts kinds of place, not instances.
14. `.card:active { scale(0.98) }` recorded against the documented press pair.

**`PRODUCT.md`** — §Evidence on Hand gains an explicit **SUPPLIED-TOMORROW** list, so the next agent knows the exact boundary and cannot infer across it: internship company, role title, exact dates; per-project tech lists; per-project dates; the ownership split on Operations Agent (which subsystems were his); graduation term; location / relocation / work authorisation; target role and start date; any *sourced* usage fact for ScorelyAI; whether Gestura / Wave Function Collapse / WordPlay can be deployed to live URLs; whether a scrubbed architecture diagram of the Operations Agent is permissible.

**`CLAUDE.md`** — the lines this PR invalidated: "single static page (`/`)" → multi-route App Router (`/` plus `/work/[slug]`); the `page.tsx` section list → five sections; `1/2/3/4` → `1/2/3/4/5`; extend the documented screenshot list to the per-project routes at every matrix width, both themes, fold and full; add the "to add a tech icon" note beside "to add a project" / "to add a tool", and correct the "to add a tool" note for the widened `StackItem` shape.

**`.impeccable/review/`** — commit the final capture set and a `manifest.json` recording the resolved `playwright-core` version, the browser build (`chromium_headless_shell-1234`), the widths, the themes, and the commit SHA.

**Gate:** final full matrix; the whole PR body written.

---

## 4. Verification apparatus

### 4.1 The build gate — stated honestly

`npm run build` after **every** commit. It is a TypeScript type-check plus a production compile. **It is not a lint pass**: there is no eslint, no eslint-config-next and no eslint config in this repo (verified). The static-analysis gate is the Impeccable detector, run at the points listed in §2.

C4 deliberately widens types so the compiler enumerates every stale consumer for you. Never defer the build to the end of the PR.

### 4.2 The capture harness — exact

Do not add Playwright to `package.json`. Do not commit a driver script. The harness lives in `/private/tmp` (a writable additional working directory) and reuses the already-cached browser.

```bash
mkdir -p /private/tmp/portfolio-capture && cd /private/tmp/portfolio-capture
npm init -y >/dev/null
npm i playwright-core@latest --no-save
npm ls playwright-core          # record the exact resolved version in the PR body
```

`playwright-core`, not `playwright`, because it never attempts a browser download. Launch with an **explicit** `executablePath`, which decouples the driver version from the browser revision entirely:

```js
import { chromium } from "playwright-core";
const EXE = "/Users/ParthDoshi/Library/Caches/ms-playwright/" +
  "chromium_headless_shell-1234/chrome-headless-shell-mac-arm64/chrome-headless-shell";
const browser = await chromium.launch({ executablePath: EXE });
```

(Path verified this session.) **On the reviewer's "pin the exact version whose revision matches build 1234": I am not doing version archaeology.** With `executablePath` set, the revision-matching problem does not exist — that is the point of setting it. Pinning is therefore a *provenance* requirement, not a correctness one, and it is satisfied by recording the resolved version in the PR body and in `.impeccable/review/manifest.json`. The reviewer's other two points on this item are accepted and fixed: `PLAYWRIGHT_BROWSERS_PATH` is dropped (it is already the macOS default and setting it does nothing), and the assertions run as a Node script under a resolvable module rather than through the `playwright screenshot` CLI, which cannot evaluate page JS.

Serve against `npm run build && npm run start`, not `next dev`. Scroll the full page first so `Reveal` fires. Capture with `reducedMotion: "reduce"` for the reduced-motion pass and with `reducedMotion: "no-preference"` for the motion pass.

### 4.3 Widths, themes, and what is asserted where

**Screenshot widths** — `{320, 390, 768, 1280, 1366, 1440}` × `{light, dark}` × `{fold, full page}`, on `/`, `/work/operations-agent`, `/work/wordplay`. 320 is new and mandatory (the reviewer is right that the proposal's matrix could never have seen its own small-width failure). 1280 and 1366 remain mandatory — they are exactly the widths the hero bug lived at.

**Assertion-only widths** (measurements, no images) — `{280, 300, 360, 400, 430, 720, 721, 760, 761, 1023, 1188, 1255, 1329, 1384, 1568, 1920}`. These are the breakpoint edges and the arithmetic inflection points.

**The hero invariant, asserted at every one of those widths, in both themes:**

```js
const t = document.querySelector(".hero__title");
const r = document.querySelector(".roll");
// clearance ≥ 5%, not ≥ 0 — the survey measured 1366 failing by 18px, inside
// the ±2% kerning error bar.
assert(t.scrollWidth <= t.clientWidth * 0.95);
assert(r.scrollWidth <= r.clientWidth + 1);           // nowrap ⇒ clip, not reflow
assert(t.getClientRects().length === 3);              // exactly three lines
```

**Run the whole assertion set a second time with a simulated 20px root font**, at **mobile widths as well as desktop** — the reviewer is right that the proposal applied that check only to the `4rem` desktop cap while the mobile floor was equally root-relative. After C3 both clamps are px-bounded, so the second run should be identical; if it is not, a rem bound crept back in.

**Slot width constancy** (C3): drive the widest phrase from `count = 0` to `holding` and assert `document.querySelector(".roll").getBoundingClientRect().width` is constant to within 0.5px across the whole transition. This is what proves the caret-in-sizer fix actually works rather than being defeated by selector scoping.

### 4.4 Contrast — the worst case, measured correctly

The proposal measured the **best** case. Hiding `.wash` yields flat `--ground`; the worst case is the most saturated blob stop sitting behind a translucent glass surface, which is what the Calm Centre Rule manages and what the blur is justified by. Dark is the acute theme, at 0.07 glass alpha, where the blob dominates the composite.

Plain Node, no dependency. For each new text/background pair, in **both** themes:

1. Start from `--ground` (`#e9e6ee` light / `#191a2e` dark).
2. Composite the blob stop over it — **light** at full strength, **dark** at `opacity: 0.62` (The Held-Back-Blob Rule). Iterate all **12** stops per theme and keep the worst result.
3. Composite the surface over that: `--glass` `rgb(255 255 255 / 0.52)` light, `/ 0.07` dark; or `--media-well` = `--white`, opaque.
4. Apply the grain as a final perturbation of the background only — `multiply` at 0.055 light, `screen` at 0.05 dark. It moves the ratio by under 2%; record it, do not ignore it.
5. Relative luminance per WCAG; ratio `(L1 + .05) / (L2 + .05)`.

**Record two numbers per pair: ground-only (the sanity floor) and worst-blob (the gate).** Thresholds: body and placeholder ≥ **4.5:1**; large text (≥24px, or ≥18.66px bold) ≥ **3:1**.

Pairs to measure:

| # | pair | surface |
|---|---|---|
| 1 | `.exp__period` `--ink-2` | ground |
| 2 | `.exp__ownership` `--ink` | ground |
| 3 | `.case__back` `--ink-2` | ground |
| 4 | `.case__meta` `--ink-2` | `--media-well` / `--white` (opaque) |
| 5 | case-study prose `--ink` | `--white` |
| 6 | tech-mark name `--ink-2` | `--white` |
| 7 | `.card__use` `--ink` | `--glass` over worst blob |
| 8 | `.card__label` `--ink-2` | `--glass` over worst blob |
| 9 | `.hero__avail` `--ink-2` | ground |
| 10 | hero display, `.type-outline` 0.03em `--ink` stroke | ground over worst blob |

Pair 10 is new and it is **not** a formality. Left-aligning the hero moves the headline off the calm centre toward the left edge, where the blobs sit at negative offsets — the Calm Centre Rule exists precisely because the middle band is the safe one. Measure it at 1440 in both themes at the actual composited pixels behind the glyphs. **If it falls below 3:1, the fix is to narrow the hero column** (`max-width: calc(960px + var(--gutter) * 2)`), pulling type back toward the centre — not to touch the wash, not to add a scrim layer over it.

### 4.5 The accent census (C11)

Coral appears in exactly six **kinds** of place: the finale phrase, the status dot + pulse, the email underline, the scroll-ring fill, the focus outline, the caret/selection tint. After every new surface, grep for `--signal` and `--signal-ink` in `app/globals.css` and every component, and confirm each hit maps to one of the six. The case-study email is the *same kind* as the Contact email — two instances, one kind, and that distinction is recorded in DESIGN.md.

Also confirm The Two Corals Rule: `--signal` draws shapes, `--signal-ink` writes words. Never swapped.

### 4.6 The motion matrix (C9 live; C10 under `NEXT_PUBLIC_FIXTURES=1`)

- **Ambient budget at rest.** After scrolling stops, `document.getAnimations().filter(a => a.playState === "running")` returns exactly two: the roll and the blob drift. Anything still moving after the finger lifts has become a third ambient motion and is a defect (Rule 0.2). Note this is why the sizer's caret must not carry the blink.
- **Reduced-motion end-to-end read.** Load `/work/operations-agent` with `reducedMotion: "reduce"` and read the whole route. Same content, same order, no empty pinned space, route no longer than the plain page. **If the reduced version is worse than a plain page, the sequence had no content and must be deleted** (Rule 7.2).
- **Scroll budget.** `document.documentElement.scrollHeight` with and without the pin: growth ≤ **+25%**. Sticky travel ≤ **150svh**.
- **Sticky preconditions.** Walk `.case__stage`'s ancestor chain to `<html>`; fail on any computed `overflow` other than `visible`, or any non-`none` `transform`, `filter`, `backdrop-filter` or `contain`. Then assert `.case__stage.getBoundingClientRect().top === 0` (±1px) at 10 sampled scroll positions across the pin's span.
- **No focusables in the stage.** `document.querySelectorAll('.case__stage a, .case__stage button, .case__stage [tabindex]').length === 0`. This is what licenses beat opacity reaching 0.
- **Compositor.** DevTools ▸ Rendering ▸ *Paint flashing* + *Layer borders* during a full manual scroll: no full-rect repaint on any scrubbed element; every moving element is composited; **no moving element carries `backdrop-filter`**.
- **Profile.** Performance trace of a full scroll at 4× CPU throttle: no long tasks attributable to motion, no forced-reflow warnings.
- **Hover regression (Rule 3.1).** `.card:hover` still lifts `translateY(-3px)` and `.card__media` still nudges `translate(-3px,-3px)`. No scroll animation anywhere touches `transform:`.
- **Keyboard.** 1–5 from both routes; Tab through both routes; PageDown/Space advances through the pinned sequence; no focus lands mid-pin; no focus trap.
- **Slow-motion review** at 4× duration, and again the next day: nothing overshoots, lags the finger, or desyncs.
- **Removal test.** For each effect: would removing it lose *meaning*? If not, remove it.

### 4.7 Grep gates (cheap; run before every push)

```bash
grep -n "box-shadow" app/globals.css            # only the existing explanatory comment
grep -rn "var(--[a-z-]*-dark)" app components   # must be empty — those vars do not exist
grep -n "#[0-9A-Fa-f]\{6\}" components/tech-marks.generated.ts   # must be empty
grep -rn "addEventListener(\"scroll\"" components | wc -l        # exactly 1 (ScrollRing)
grep -rn "getBoundingClientRect" components                      # none inside scroll/rAF paths
grep -rn "transform" app/globals.css | grep -n "animation-timeline" # no transform in scrubbed keyframes
grep -rn "FIXTURE — not real content" .next/    # must be empty after a plain build
grep -rn "scroll-timeline-polyfill\|gsap\|lenis\|framer-motion" package.json  # must be empty
```

### 4.8 The detector

```bash
node /Users/ParthDoshi/csProjects/portfolio/.claude/skills/impeccable/scripts/detect.mjs <files>
node /Users/ParthDoshi/csProjects/portfolio/.claude/skills/impeccable/scripts/detect.mjs \
  --url http://localhost:3000/ --viewport 1280x800
node .../detect.mjs --url http://localhost:3000/work/operations-agent --viewport 390x844
```

Run after **C3, C5, C6, C7, C9, C10, C12**. Not after C8 (renders nothing).

The shipped reviewer/documenter agents are Codex-only in this environment — substitute a fresh `general-purpose` subagent pointed at `/Users/ParthDoshi/csProjects/portfolio/.claude/skills/impeccable/reference/degraded/*.md` for the finish review.

---

## 5. Content-blocked map

| Commit | Blocked field | How it ships today | Merge gate? |
|---|---|---|---|
| C4 | `role`, `dates`, `tech`, `media`, `demo`, `study` | typed and empty; nothing renders | no |
| C5 | every case-study section body | the section does not render at all | **yes — Operations Agent needs ≥3 sections of real prose** |
| C7 | `company`, `title` | absent fields, never placeholder copy | **yes — the employer identity** |
| C8 | the tool→project mapping | `TechRow` returns `null`; the row is absent | no |
| C10 | `media` (needs ≥2) | the pin is not in the DOM; C9's drift runs instead | no |

**Everything ships by absence, never by placeholder copy.** An unwritten case-study section does not render. `tech: []` renders no row. `media: []` renders the authored `Artifact` mark inside an identical frame. The pin is absent below two media. A visible "Company name pending" would ship an admission of incompleteness to a recruiter, which is worse than an absent field — the `.is-pending` / `.pending-note` vocabulary exists for links that would otherwise be dead, not for facts that are missing.

**Questions for Parth, in the PR body:** graduation term; target role and start date; location / relocation / work authorisation; whether he can name the internship company (most internship NDAs cover code and customer data, not the fact of employment — ask explicitly); his role title; which subsystems on Operations Agent were his vs. his partner's; per-project tech lists; per-project dates; a sourced usage fact for ScorelyAI; whether Gestura / WFC / WordPlay can go to live URLs; whether a scrubbed architecture diagram of the Operations Agent is permissible; and whether any project should be promoted to `weight: 2`.

---

## 6. Risk register

| # | Risk | Mitigation |
|---|---|---|
| R1 | **The worktree branch is spent.** `typewriter-headline` is merged (PR #12, `fcda416`); committing there violates CLAUDE.md and resurrects a deleted head ref. | C0 branches off `origin/main` and verifies with `git merge-base --is-ancestor origin/main HEAD` before the first commit. |
| R2 | **The hero fix pushes the fold.** Three title lines at 64px adds ~72px. | Top padding drops to 120px / 96px in C3, decided not conditional. **Gate:** the status line must be visible in the fold capture at 1440×900 and 390×844, both themes. If it still overflows, cut `.hero__sub`'s margin before touching type. |
| R3 | **Left-aligning moves display type off the calm centre**, toward the corner where the blobs live. | Contrast pair #10 (§4.4), measured on composited pixels. Fallback: narrow the hero column to 960 + gutters, pulling type back toward centre. Never modify the wash. |
| R4 | **The no-wrap invariant fails silently.** `.hero` is `overflow: clip` — an over-wide headline is cut with no scrollbar and no dev-time symptom; it would look correct on a 1512px display and be truncated at 1280. | `white-space: nowrap` on `.roll` converts any future violation from a silent relayout into a clip, and the ≥5% clearance assertion runs at 22 widths including 280/300/320/360 plus a 20px-root pass. Both clamps are px-bounded so a large root font cannot inflate them. |
| R5 | **Content does not arrive, or arrives partial.** | Five commits ship by absence (§5). The codebase is complete and honest with zero new content; only the merge is gated, on two named items. |
| R6 | **The flagship case study becomes the site's weakest page.** No repo, no media, and on day one no prose — the biggest promise on the homepage terminating in a near-empty page is worse than today's dead-end card. | It must be the **densest** page, carried by text: the agent loop, the tool surface, what data it read, how it decided a booking needed attention, what guardrails stopped a bad write, what happened when it was wrong, how correctness was judged — almost none of which is confidential, and all of which is what a hiring manager wants and could not get from a repo anyway. Plus the ownership split, the boundary stated calmly with the invitation, the Experience row and LinkedIn as off-site verification of the employment, and a media slot designed to accept an **architecture diagram**, which sidesteps confidentiality entirely and is a better proof artifact here than a UI screenshot. **HARD GATE: ≥3 sections of real prose.** |
| R7 | **Experience is thin, not just empty.** One row, no employer, no title. | Absence handles the emptiness; only content handles the thinness. It is on the merge gate alongside R6. |
| R8 | **Simple Icons vs The Drawn-Not-Set Rule.** | Case-study header only, one size, `currentColor`, never on the homepage; named bounded exception in C13. Fallback if the amendment cannot be written cleanly: text pills for all tools, no marks. |
| R9 | **`position: sticky` silently dead** under an `overflow` / `transform` / `filter` / `backdrop-filter` / `contain` ancestor. `.hero` is `overflow: clip`; `.card` is `overflow: hidden`. | Pin containers are direct children of the page flow, and the ancestor chain plus `top === 0` across the span are **asserted**, not eyeballed (§4.6). |
| R10 | **Scroll motion silently kills the card hover lift** — a scroll animation on `transform` replaces the hover transition (last animation in the cascade wins). | Scroll animates only `translate:` / `scale:`; interaction keeps `transform:`. Explicit regression check after C9 and C10, plus a grep gate for `transform` inside any keyframe referenced by an `animation-timeline`. |
| R11 | **Cinematic scroll lengthens the recruiter path.** | Zero pins on the homepage, by rule. One authored scroll moment per case-study route, replaced not stacked. ≤150svh sticky travel, ≤+25% route growth, both measured. Reduced-motion path read end to end before merge. |
| R12 | **The card-as-link pattern breaks AT or text selection.** | The overlay is a pseudo-element on the `<Link>`, not an anchor wrapping content, so the tagline stays selectable; the repo anchor sits at `z-index: 1`. Verified by a tab pass and a drag-select. |
| R13 | **The gradient parity breaks again** when the layout changes. | JS owns the 2-column parity (proven for 7 items with the flagship spanning); CSS owns the 1-column rule via `:nth-child(odd)`. And `weight` **never** changes grid span — only `weight === 1` spans — which removes the promotion failure mode. |
| R14 | **The label normalisation deletes the site's strongest fact.** "In use by DECA competitors" — somebody other than the author used the thing — currently lives in the label being rewritten. | It moves to `use` **and renders in the same commit** (C4), so it is never absent for even one commit. Verified present in the C4, C5 and C6 captures. Never deleted, never softened, never embellished into a number. |
| R15 | **Fixture content leaks into production.** | `NEXT_PUBLIC_FIXTURES` is never set in any committed env file; the branch is dead code when unset; grep gate on `.next/` after a plain build; all fixture strings are prefixed `FIXTURE —`. |
| R16 | **DESIGN.md drift across thirteen commits.** | No commit between C1 and C12 hand-edits DESIGN.md; C13 regenerates it wholesale. Mid-PR reviewers read the C2 surface briefs as the live contract, and the PR body says so. |
| R17 | **The finish review fails a correct hero**, because `homepage.md`'s FIRST VIEWPORT still says "Centred hero" and that block carries the ambition the review audits. | C2 rewrites it before C3. Contracts lead, descriptions follow. |
| R18 | **Soft fabrication drift.** The realistic failure is quiet: "in use by DECA competitors" becoming "hundreds of students"; "Internship" occupying the role slot; a tech row filled from what you'd expect the framework to be. | Every number gets a source or does not ship. Role stays absent until supplied. `tech: []` stays empty. The C13 SUPPLIED-TOMORROW list draws the boundary explicitly for the next agent. |
| R19 | **Repo click-through disappoints.** A recruiter will open the GitHub links; a repo with no README, no screenshot and no run command subtracts credibility the case study earned. | Off-repo, but it is the highest-leverage task Parth can do tomorrow and it goes in the PR body: a README with one image and one run command on each of the six public repos. |
| R20 | **Worktree skill paths.** `.claude/skills/` and `.agents/skills/` are untracked here. | Call every skill script by absolute path into the main checkout while keeping cwd in the worktree. |

---

## 7. Where I disagree with the reviewer, and why

1. **View Transitions: dropped, not fixed.** The reviewer's diagnosis is entirely correct (cross-document rule, missing `experimental.viewTransition`, duplicated `view-transition-name`) and offered "drop or fix." I am dropping it. It is the only item in this PR needing an experimental framework flag, it is the only one whose verification depends on a browser feature the cached headless shell may not drive reliably, and continuity is the fourth of four valid motion purposes with no conversion value. Recorded as a follow-up with exact requirements so it is cheap to pick up later.

2. **ESLint: not added in this PR.** The reviewer offered "add eslint + eslint-config-next in C1, or record that lint does not run." I am recording it, removing the dead `lint` script, and naming the detector as the real static gate. Introducing a linter into a thirteen-commit structural PR produces a repo-wide finding set unrelated to this work that would then have to be fixed inside it — which is precisely the scope creep the commit split exists to prevent. It gets its own PR.

3. **Playwright version pinning: satisfied by provenance, not by archaeology.** The reviewer asked to "pin the exact playwright version whose revision matches build 1234." Setting `executablePath` to the cached binary removes the revision-matching problem entirely, which is a better fix than finding the matching version. Pinning is then a provenance obligation, discharged by recording the resolved version in the PR body and the capture manifest. The reviewer's other two points on that item — dropping the no-op `PLAYWRIGHT_BROWSERS_PATH`, and running assertions through a resolvable Node script rather than the CLI — are accepted and fixed.

4. **"CSS knows the column count" — the reviewer is right that it was false, but the conclusion is not "drive it all from data."** `:nth-child(odd)` genuinely is the correct single-column rule and JS genuinely cannot know when it applies. The fix is a hand-off with both halves named, plus the span invariant that keeps the 2-column math stable. Claiming CSS solves the coupling was wrong; abandoning CSS for the case it does solve would be wrong too.

5. **Hero actions: the proposal's reduction is reversed, not justified.** The reviewer flagged it as unargued; rather than argue for it, I am keeping both arrow links. About is now section 4 of 5 and holds the strongest sentence on the site; removing its only above-the-fold path to serve a CTA hierarchy already carried by type costs more than it buys.

6. **No pin on the homepage, and I am not adding one to satisfy "the ceiling ships as nothing."** The reviewer's underlying complaint — that the motion layer shipped dormant and unverified — is blocking and is fixed by C9 shipping live. But the cure is not a homepage pin. Rule 10.1 protects hero → cards → email, and that path is the entire point of the site. The cinematic ceiling is realised on the case-study route, which is where the sequential argument actually lives.