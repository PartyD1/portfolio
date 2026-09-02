# Per-project tech icon system — final design

**Dimension owner:** tech icons. **Status:** definitive. Implement exactly as written.

---

## 0. The governing idea

**The chip is the unit. The brand mark is optional ornament inside it. The name is never optional.**

Every tool renders as one `.tech__item` pill carrying its name as visible text. Tools that have a Simple Icons mark get a 14px filled glyph in `currentColor` to the left of the name. Tools that don't (OpenClaw, NemoClaw, and anything the generator 404s on) render the *identical* pill without the glyph. Because the name is always visible:

- there is no tooltip, no `title` attribute, no popover, and therefore no clipping trap inside `.card { overflow: hidden }` (globals.css:1081) or `.orbit-scroll`;
- the `<svg>` is genuinely decorative, so `aria-hidden="true"` is correct rather than a dodge;
- a mixed row containing React, Supabase and a bare OpenClaw chip is coherent by construction, not by patching;
- the row is a Cmd-F-findable keyword surface, which is what a recruiter actually scans for.

One chip. One rule. Every per-project surface.

---

## 1. Decisions

### D1 — Marks appear on **every** per-project surface: homepage card, case-study page, Experience row. No exceptions.

The first proposal exempted homepage cards (text-only `·`-joined line) on register-separation grounds, then re-admitted marks on the Experience row — which is a homepage section. The reviewer is right: that rule was falsified by its own carve-out, and it satisfied the locked wording ("tech icons… shown PER PROJECT") with a string of text on the one surface the locked decision named. **Register separation is abandoned as a placement rule.**

The register collision with the authored stroke marks (`components/Icon.tsx` at `strokeWidth 2.25`, `components/Artifact.tsx` at `2.5`, both `fill: none`) is instead managed by three constraints that hold on every surface:

1. **Monochrome `--ink`** — see D2. A filled ink glyph beside a stroked ink glyph reads as two weights of one ink system, not two vendors.
2. **The chip frame.** A brand mark never appears loose. It always sits inside a bordered pill next to its own name, which makes the row read as a *labelled data row* rather than as iconography competing with the drawn marks.
3. **Adjacency ban.** A `.tech__item` never sits in the same flex cluster as an `ArrowUpRight` or an `Artifact` mark. On the card the tech row is its own full-width grid row (D8); `.card__foot` keeps the arrow one row below.

**Tradeoff:** the homepage now carries up to 28 filled brand silhouettes across seven cards, in the same viewports as seven `Artifact` marks. That is a real, deliberate cost, paid because the locked decision named per-project icons and because a recruiter scanning for "Python / React / FastAPI" gets an answer without opening anything. It is bounded by the four-chip cap (D8) and by the monochrome rule.

### D2 — Monochrome, and in **full `--ink`**, not `--ink-2`. Brand hex never ships — not at rest, not on hover, not on focus.

`fill="currentColor"` on the mark; `color: var(--ink)` on the chip, so mark and name are one ink.

- Twenty-nine official brand colours is twenty-nine accents, which detonates **The One Accent Rule** (coral, in exactly six named places). Brand-colour-on-hover was considered and rejected for the same reason — it makes 29 hover accents, and it also promises interactivity the chip does not have.
- Monochrome solves both themes with **no new colour token**: `--ink` is already defined in `:root` (`#3f3f68`) and `.dark` (`#ecebf4`).
- It renders correctly under `forced-colors: active` with no override, because `currentColor` resolves to `CanvasText`.

**Why `--ink` and not `--ink-2`:** the Work survey's core complaint is that the card is already a stack of small muted `--ink-2` prose that a scanner reads past. A fourth quiet `--ink-2` line makes that worse. The tech row is *data*, not prose, and it is the one thing on the card a keyword-scanning recruiter is hunting. Full ink at 13px/600 gives it the presence of the `.orbit__label` pill (which is also `--ink`) and separates it from the tagline above it. Measured: `#3f3f68` on `#e9e6ee` clears 4.94:1 (the value the CSS comment records for `--ink-2`; `--ink` is higher still); `#ecebf4` on `#191a2e` clears well past 12:1.

**Tradeoff:** loses instant brand recognition at 14px. Fully mitigated — the name is always beside the mark, so recognition never depends on colour.

### D3 — No hover, no tooltip, no `title`, no focus state on the chip. The chip is inert.

The chip is not interactive and must not pretend to be. This closes the brief's "hover/tooltip behaviour for naming a tool" question by removing the need: the name is always rendered.

Three hazards avoided at once: an anchored tooltip inside `.card { overflow: hidden }` is clipped (`operate.md` L37); a hover state on a non-interactive element is the exact false-affordance defect the Work survey already flagged on `.card`; `title` never appears on touch and is a poor tooltip everywhere else.

### D4 — Optical correction is **shrink-only, size-only, baked into the `viewBox`**. Never `scale`, never `transform`, never `opacity`.

The first proposal parked a static layout correction on `scale:`, citing the motion ruleset's Rule 3.1 — which *reserves* `scale:`/`translate:`/`rotate:` for scroll-driven animation precisely so scroll and hover can compose. The reviewer is right that this inverts the rule and would be silently stomped by any future scrubbed rail. **The correction moves into geometry.**

`TechMark` computes the `viewBox` from the tool's `weight` field:

```
w   = 24 / weight
min = (24 - w) / 2
viewBox = `${min} ${min} ${w} ${w}`
```

`weight: 0.9` → `viewBox="-1.333 -1.333 26.667 26.667"` — the drawn 24-unit mark occupies 90% of a fixed 14px box, with no CSS, no animatable property, and the correction visible as data in the `data/stack.ts` diff.

**Shrink only. `weight` is clamped to `[0.86, 1.00]`, default `1.00`.** Enlargement (`weight > 1`) would clip marks whose paths touch the box edge — React's orbits and every filled-square mark do. Relative enlargement is expressed by shrinking the neighbours, and the base `--tech-mark: 14px` is calibrated so the *heaviest* marks sit at 1.00 after the contact-sheet pass. A mark that needs more than 0.86 is a bad mark: set `iconSlug: null` and ship the text chip.

**Stated plainly, because the proposal did not:** *optical **weight** parity across third-party filled marks is unattainable.* Shrinking `c` by 10% does not close the density gap against `react`'s three thin orbits, and the only other lever (opacity) is banned on contrast grounds. This system normalizes optical **size** only. The residual density variance is absorbed by rendering mark and name in the same `--ink` at the same size on every surface, so the row reads as one texture rather than as a set of logos of varying importance.

### D5 — Sizing: mark **14px**, name **0.8125rem / 13px / 600**, chip **≈24px** tall.

The first proposal's 17px mark beside 13px text put 17px of ink against a Hanken Grotesk cap height of ~9.4px — a 1.8× ratio that reads as a logo strip with captions. 14px gives **1.49×**, the conventional labelled-chip ratio.

The type is deliberately identical to `.orbit__label` (`0.8125rem`, weight 600, `line-height: 1.2`, `color: var(--ink)`, `border-radius: 999px`). The tech chip and the orbit label are **one pill vocabulary at one size**, which is what lets the orbit and the case studies read as the same system (D9).

**On the second pill height:** the shadcn `Badge` is `h-5` (20px) and carries the project `label`. The tech chip is ~24px. These are two deliberately different pills and DESIGN.md must say so: **the Badge is the label pill (one categorical fact, 20px, `--ink` on `border-border`); the tech chip is the data pill (one tool, ~24px, ink hairline).** They may appear in the same card but never in the same row — the Badge lives in `.card__foot`, the chips in `.card__tech`.

### D6 — The chip is a **transparent ink hairline**, not glass. No fill, no `backdrop-filter`.

The first proposal's `background: var(--glass)` + `border: 1px solid var(--glass-edge)` stacks translucency inside `.card`, which is *already* `--glass` over the blob wash. In dark that is a 14% white edge over a 7% white surface — roughly a 7% delta, invisible. Fixed:

```
background: transparent;
border: 1px solid var(--tech-edge);
```

with `--tech-edge` defined in **both** themes (DESIGN.md: "a value that only exists in one theme is a bug"):

| | value | resolved | contrast vs its ground |
|---|---|---|---|
| `:root` | `color-mix(in oklab, var(--ink) 18%, transparent)` | ≈ `#c8c8d6` over `#e9e6ee` | **1.34:1** |
| `.dark` | `color-mix(in oklab, var(--ink) 22%, transparent)` | ≈ `#47485a` over `#191a2e` | **1.91:1** |

Both are visible hairlines, both stronger than the shadcn `--border` token (14% / 16% ink), both resolve identically on `--ground`, on `--glass`, and on `--white` because they are ink-derived rather than white-derived. These figures are computed, not asserted, and they are re-verified on the contact sheet (D10) before the CSS is finalized.

**No `backdrop-filter`.** The Blur-Is-Legibility Rule governs *surfaces that float over the wash*. The chip does not float — it is inline content inside an already-blurred `.card`, or inside a case-study text column. Blurring it would be a second blur pass over the same backdrop for zero legibility gain, and motion Rule 3.2 bans moving a `backdrop-filter` element, which would foreclose the chip ever sitting inside a scrubbed section.

### D7 — Fallback: identical chip, `<svg>` omitted, symmetric padding.

No monogram letter (`craft-floor` L40: no glyph standing in for an icon), no generic placeholder box, no greyed slot, no "no icon" state of any kind. Adding a future mark is purely additive and never reflows the row's structure.

```css
.tech__item { padding: 4px 10px; }          /* no mark: symmetric */
.tech__item:has(.tech__mark) { padding-left: 8px; }  /* mark's side bearing pads the left */
```

`:has()` is Baseline 2023; browsers without it get symmetric padding, which is cosmetic, not broken. No JS fallback.

### D8 — Placement, per surface. One component, one cap rule.

| Surface | Component call | Label | Cap | Grid placement |
|---|---|---|---|---|
| Homepage project card (both branches) | `<TechRow ids={project.tech} label={null} max={4} className="card__tech" />` | none | 4, with `+N` when longer | own full-width grid row, above `.card__foot` |
| Case-study page header meta block | `<TechRow ids={project.tech} />` | `Built with` | none — all of them | in normal flow, below role/dates, above the links row |
| Experience row (Operations Agent) | `<TechRow ids={project.tech} label={null} max={4} />` | none | 4, with `+N` | in the row's right-hand ownership column |

The case-study page renders the row **exactly once**. Do not repeat it per section.

**On the `+N` count:** the first proposal banned a "+4 more" affordance. That ban was about hiding a remainder behind a control. A static, non-interactive `+3` in `--ink-2` is honest disclosure, not a hidden affordance — it prevents a four-chip subset from reading as the complete stack, and the full list is one click away on the case study. It ships. It is plain text, not a pill, and it carries `<span class="visually-hidden"> more tools</span>`.

**Card grid placement (the reviewer's major #3 — the proposal's `.card__stack` would have auto-placed into an implicit row 4, *below* the GitHub link).** Exact fix, in `app/globals.css`:

```css
.card { grid-template-rows: auto 1fr auto auto; }   /* was: auto 1fr auto */
.card__tech { grid-column: 1 / -1; grid-row: 3; padding-top: 4px; }
.card__foot { grid-column: 1 / -1; grid-row: 4; }   /* was: grid-row: 3 */
```

`.card__art { grid-row: 1 / 3 }` is unchanged and still spans the name+tagline rows. `.card__foot { margin-top: auto }` is now inert but harmless — leave it. The `@media (max-width: 760px)` block at globals.css:1246-1268 touches only columns and padding on `.card`, so it needs **no change**. `.card--flagship` overrides `grid-template-rows: auto` (and `auto auto` at ≤760px) and places `.card__body` as a flex column — the flagship's chips live *inside* `.card__body` and need no placement at all. **`ProjectCard.tsx` renders `<TechRow>` in both branches**; the flagship/standard divergence the Work survey found (`description` and `note` render only in the flagship branch) must not be reproduced here.

### D9 — The Stack orbit **stays**, its role changes from inventory to index, and **no brand marks ever enter it**.

The orbit answers *"what does he know"*; the per-project rows answer *"what did he use here"*. A recruiter asks both. It is the site's signature component and is named in the direction contract's STORY.

Marks in the orbit is a firm no on mechanical grounds: `LABEL_GAP = 44` already leaves the inner ring's ten labels compressed against each other, and the code comment says so ("the circle is small and JavaScript is a long word"). A 14px mark plus a 6px gap adds 20px to every pill on a circle with no arc to spare. Twenty-nine filled marks distributed around three rings is the sponsor wall in its purest form. **Do not touch `LABEL_GAP`. Do not add marks to `.orbit__label`.**

The double-claim risk is resolved with one sentence, not a deletion: rewrite `.section__lede` in `components/Stack.tsx` so the orbit is explicitly the full set of which each case study shows a subset.

**Section ordering is not this dimension's call.** The first proposal instructed "place the section after Work and Experience", which drags `Shell.tsx`'s hardcoded `work/stack/about/contact` items, the fifth menu keycap, the `calc(var(--i) * 40ms + 80ms)` stagger and DESIGN.md §Navigation with it — none of which appear here. That instruction is withdrawn and handed to the Experience/navigation dimension as a one-line note (§7).

### D10 — Calibrate against `data/stack.ts` **today**. The mapping is blocked on Parth; the marks are not.

The reviewer is right that the first proposal shipped a system rendering nothing and then self-blocked the one pass that would have validated it. `data/stack.ts` already enumerates all 29 tools and is already on the page. Every visual question the brief asked — mark size, chip edge on glass in dark, mixed rows with and without a mark, wrap behaviour, forced-colors — is answerable now.

**Two things are decoupled and must stay decoupled:**

- **The MAPPING** (`Project.tech`) is blocked on Parth. It stays *absent* — not `[]` — on every project until he supplies the list. `TechRow` returns `null` on absent or empty, so there is no placeholder frame and no "coming soon" chip to survive to launch.
- **The MARKS** are not blocked. Generate all 29 today, calibrate, ship the calibrated system, and let the mapping be a one-line data edit tomorrow.

**Where I disagree with the reviewer:** the reviewer wants the contact sheet built and then deleted before push. I keep it permanently, as `app/dev/tech/page.tsx` guarded by `notFound()` in production. Rationale: the optical pass is not a one-time event — it must be re-run every time a tool is added or a Simple Icons version is bumped, which is exactly when the correction values go stale. A throwaway harness for a *generated* asset is the wrong shape; `scripts/make-grain.mjs` is the precedent for keeping the tool that produced the artifact. The route is ~50 lines, 404s in production, and is never linked from anywhere.

---

## 2. Data

### `/Users/ParthDoshi/csProjects/portfolio/.claude/worktrees/impeccable-teach/data/stack.ts` — EDIT (the single source of truth)

There is **no** `data/tech.ts`. The first proposal created a parallel flat registry of the same 29 tools and then justified refactoring `stack.ts` to reference it as drift prevention — while creating the drift. The reviewer is right. Tools become objects **in place**, and the flat registry is derived.

Hard constraint: **`data/stack.ts` imports nothing.** The generator loads it through Node's TypeScript stripping, which does not resolve the `@/` path alias.

```ts
/**
 * Parth's stack, in his own words and his own grouping (2026-09-01).
 *
 * The three rings of the orbit ARE these three groups — inner to outer runs
 * languages → what's built with them → what it's built in, which is why the
 * order matters. Nothing here is inferred; add a tool by adding it to a group.
 *
 * This file is also the tech-icon registry: `iconSlug` names the Simple Icons
 * mark (null when no official mark exists) and `weight` is the optical size
 * correction. `scripts/sync-tech-icons.mjs` reads this file, so it must not
 * import anything — Node's type stripping does not resolve path aliases.
 */
export type Tool = {
  /** Stable key. Used by `Project.tech`; never rendered. */
  readonly id: string;
  /** Display name, exactly as Parth writes it. Rendered verbatim. */
  readonly name: string;
  /** Simple Icons slug, or null when no official mark exists. */
  readonly iconSlug: string | null;
  /**
   * Optical SIZE correction, 0.86–1.00. Shrink-only: enlargement would clip
   * marks whose paths touch the 24-unit box. Omit for 1. Baked into the
   * rendered viewBox — never into transform, scale or opacity.
   */
  readonly weight?: number;
};

export type StackGroup = {
  readonly id: string;
  readonly label: string;
  /** Short form for the ring itself — the inner arc has little room. */
  readonly short: string;
  /** Ring tone, drawn from the blob palette. */
  readonly tone: string;
  readonly items: readonly Tool[];
};

export const stack = [
  {
    id: "languages",
    label: "Languages",
    short: "Languages",
    tone: "var(--blob-a-3)",
    items: [
      { id: "python",     name: "Python",     iconSlug: "python" },
      { id: "java",       name: "Java",       iconSlug: "openjdk",     weight: 0.96 },
      { id: "javascript", name: "JavaScript", iconSlug: "javascript",  weight: 0.88 },
      { id: "typescript", name: "TypeScript", iconSlug: "typescript",  weight: 0.88 },
      { id: "c",          name: "C",          iconSlug: "c",           weight: 0.92 },
      { id: "html",       name: "HTML",       iconSlug: "html5",       weight: 0.94 },
      { id: "css",        name: "CSS",        iconSlug: "css",         weight: 0.94 },
      { id: "bash",       name: "Bash",       iconSlug: "gnubash",     weight: 0.90 },
      { id: "tailwind",   name: "Tailwind",   iconSlug: "tailwindcss", weight: 0.96 },
      { id: "elixir",     name: "Elixir",     iconSlug: "elixir",      weight: 0.96 },
    ],
  },
  {
    id: "frameworks",
    label: "Frameworks & libraries",
    short: "Frameworks",
    tone: "var(--blob-b-1)",
    items: [
      { id: "fastapi",    name: "FastAPI",    iconSlug: "fastapi",   weight: 0.92 },
      { id: "flask",      name: "Flask",      iconSlug: "flask",     weight: 0.96 },
      { id: "react",      name: "React",      iconSlug: "react" },
      { id: "nextjs",     name: "Next.js",    iconSlug: "nextdotjs", weight: 0.90 },
      { id: "pytorch",    name: "PyTorch",    iconSlug: "pytorch" },
      { id: "tensorflow", name: "TensorFlow", iconSlug: "tensorflow" },
      { id: "pandas",     name: "Pandas",     iconSlug: "pandas" },
      { id: "pydantic",   name: "Pydantic",   iconSlug: "pydantic" },
      { id: "langchain",  name: "LangChain",  iconSlug: "langchain" },
    ],
  },
  {
    id: "tools",
    label: "Developer tools",
    short: "Tools",
    tone: "var(--blob-a-2)",
    items: [
      { id: "node",       name: "Node.js",    iconSlug: "nodedotjs",  weight: 0.94 },
      { id: "postgresql", name: "PostgreSQL", iconSlug: "postgresql", weight: 0.96 },
      { id: "supabase",   name: "Supabase",   iconSlug: "supabase",   weight: 0.96 },
      { id: "openai",     name: "OpenAI API", iconSlug: "openai" },
      { id: "nemoclaw",   name: "NemoClaw",   iconSlug: null },
      { id: "vercel",     name: "Vercel",     iconSlug: "vercel",     weight: 0.94 },
      { id: "apify",      name: "Apify",      iconSlug: "apify" },
      { id: "git",        name: "Git",        iconSlug: "git" },
      { id: "jupyter",    name: "Jupyter",    iconSlug: "jupyter" },
      { id: "openclaw",   name: "OpenClaw",   iconSlug: null },
    ],
  },
] as const satisfies readonly StackGroup[];

/** Flat registry, derived — there is no second list to drift from. */
export const tech: readonly Tool[] = stack.flatMap((g) => g.items);

export type TechId = (typeof stack)[number]["items"][number]["id"];

/**
 * Map, not a Record cast: `.get()` returns `Tool | undefined`, so the guards
 * in TechRow/TechMark stay live to the type checker.
 * Duplicate ids throw at module init, which fails `npm run build`.
 */
export const techById: ReadonlyMap<TechId, Tool> = (() => {
  const m = new Map<string, Tool>();
  for (const t of tech) {
    if (m.has(t.id)) throw new Error(`data/stack.ts: duplicate tool id "${t.id}"`);
    m.set(t.id, t);
  }
  return m as ReadonlyMap<TechId, Tool>;
})();

/**
 * viewBox that renders a 24-unit mark at `weight` of a fixed box.
 * Shrink-only by contract; values outside 0.86–1 are clamped.
 */
export function markViewBox(weight = 1): string {
  const s = Math.min(1, Math.max(0.86, weight));
  const w = 24 / s;
  const min = (24 - w) / 2;
  const r = (n: number) => Number(n.toFixed(3));
  return `${r(min)} ${r(min)} ${r(w)} ${r(w)}`;
}
```

**Slug verification:** the seed slugs above are candidates, not facts. Several move upstream (`html5` vs `html`, `css` vs `css3`, `openjdk` vs `java`, `nodedotjs`, `nextdotjs`). The generator exits non-zero on any 404 for a non-null slug, so a wrong slug fails at generation and never at render. Workflow: write the record with your best guess, run the generator, fix what 404s, commit. If a tool genuinely has no mark in the pinned version (Apify and Pydantic are the two most likely), flip that record to `iconSlug: null` — it becomes a text chip and nothing else changes. **A 404 is never a blocker.**

### `/Users/ParthDoshi/csProjects/portfolio/.claude/worktrees/impeccable-teach/data/projects.ts` — EDIT

```ts
import type { TechId } from "./stack";

export type Project = {
  // …existing fields unchanged…
  /**
   * Tools actually used on this project, in Parth's own priority order.
   * ABSENT until he supplies the mapping — PRODUCT.md: "no tool→project
   * mapping exists; do not infer." Never [], never guessed from repo
   * language or README.
   */
  tech?: readonly TechId[];
};
```

**Populate nothing today.** Not one entry.

### `/Users/ParthDoshi/csProjects/portfolio/.claude/worktrees/impeccable-teach/data/tech-icons.generated.ts` — NEW, generated, committed

```ts
/**
 * GENERATED — do not hand-edit.
 *
 * Source:   simple-icons@<VERSION> (node_modules/simple-icons/icons/<slug>.svg)
 * License:  CC0-1.0. The marks remain third-party trademarks, reproduced
 *           nominatively to identify the tool. No endorsement is implied.
 * Regenerate: npm run icons
 */
export const techIcons: Record<string, string> = {
  apify: "M…",
  c: "M…",
  // …sorted by slug, one entry per non-null iconSlug…
};
```

A bare `slug → path` map. **No `title` field** — nothing reads it (the `<svg>` is `aria-hidden` and the name comes from the registry), so it would be dead data in a committed artifact. The generator *uses* the upstream `<title>` as its own cross-check and strips it from the emitted file.

---

## 3. The generator

### `/Users/ParthDoshi/csProjects/portfolio/.claude/worktrees/impeccable-teach/scripts/sync-tech-icons.mjs` — NEW

**Source of bytes: a pinned devDependency, read from disk.** The first proposal fetched from jsDelivr at generation time and presented "no new entry in package.json" as a benefit. The reviewer is right that this inverts the provenance tradeoff: a pinned `simple-icons` devDependency gives a `package-lock.json` integrity hash, an offline reproducible regeneration, and an auditable version bump — strictly better provenance than a URL in a file header. It also corrects the false premise the vendoring rationale rested on: inline `<path d>` is *not* the only form that inherits `currentColor` (`mask-image` + `background-color: currentColor` and a `<symbol>`/`<use>` sprite both do). **Inline paths are still the right call**, for the true reasons: fewest moving parts, zero extra network requests, trivially themeable, and each mark appears at most a handful of times per page so there is nothing to dedupe.

```
npm i -D simple-icons@<pin an exact version, no caret>
```

Add to `package.json` scripts:

```json
"icons": "node scripts/sync-tech-icons.mjs"
```

Script contract, exactly:

1. `const VERSION = "<exact>"` at the top; assert it matches `node_modules/simple-icons/package.json`'s `version` and exit 1 on mismatch, so a `npm update` that moves the package fails loudly instead of silently regenerating different bytes.
2. `import { stack } from "../data/stack.ts";` — Node ≥22.18 (this machine is v24.20) strips types by default. On Node 22.6–22.17 run `node --experimental-strip-types scripts/sync-tech-icons.mjs`. This is why `data/stack.ts` must stay import-free.
3. For every tool with a non-null `iconSlug`, read `node_modules/simple-icons/icons/<slug>.svg`.
4. Extract with strict regexes. **Assert exactly one `<path …d="…">` per file** — Simple Icons guarantees it; assert it rather than trusting it. Exit 1 on: file not found (the 404 equivalent), zero or more than one path, an empty `d`.
5. Cross-check the upstream `<title>` against `tool.name`, case-insensitively ignoring spaces and dots. Mismatch is a **warning, not an error** — "OpenAI API" vs "OpenAI" and "Java" vs "OpenJDK" are deliberate. Print it so a genuinely wrong slug (`c` resolving to something unexpected) is caught by eye.
6. Assert no duplicate `id` across the flat list; exit 1 with the offending id.
7. Assert every `weight` is within `[0.86, 1.00]`; exit 1 otherwise.
8. Write `data/tech-icons.generated.ts` with entries **sorted by slug** so the diff is stable, and the header from §2.
9. `console.log` a summary: `wrote N marks from simple-icons@VERSION; M tools have no mark (<ids>)`.

The build has **zero new inputs** — the generated file is committed, and `npm run build` never invokes the generator.

---

## 4. Components

### `/Users/ParthDoshi/csProjects/portfolio/.claude/worktrees/impeccable-teach/components/TechMark.tsx` — NEW (server component)

```tsx
import { techIcons } from "@/data/tech-icons.generated";
import { markViewBox, type Tool } from "@/data/stack";

/**
 * A Simple Icons brand mark: a single FILLED path in a 24 box, in currentColor.
 *
 * This is the site's one bounded exception to The Drawn-Not-Set Rule, and the
 * attribute pair below is what distinguishes it from every other mark here:
 * `fill="currentColor"` with no stroke. components/Icon.tsx (2.25) and
 * components/Artifact.tsx (2.5) are `fill="none" stroke="currentColor"`.
 * Never mix the two constructions in one element.
 *
 * Optical size correction lives in the viewBox, never in transform/scale —
 * a scroll timeline owns those properties and would stomp it.
 */
export default function TechMark({ tool }: { tool: Tool }) {
  if (!tool.iconSlug) return null;
  const d = techIcons[tool.iconSlug];
  if (!d) return null; // generated file behind the registry — degrade to text chip
  return (
    <svg
      className="tech__mark"
      viewBox={markViewBox(tool.weight)}
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path d={d} />
    </svg>
  );
}
```

### `/Users/ParthDoshi/csProjects/portfolio/.claude/worktrees/impeccable-teach/components/TechRow.tsx` — NEW (server component)

```tsx
import TechMark from "@/components/TechMark";
import { techById, type TechId } from "@/data/stack";

export type TechRowProps = {
  /** Absent until the per-project mapping is supplied. */
  ids?: readonly TechId[];
  /** Visible legend. Pass null to omit it (cards, Experience row). */
  label?: string | null;
  /** Show at most this many, then a plain "+N". Omit for all of them. */
  max?: number;
  className?: string;
};

export default function TechRow({
  ids,
  label = "Built with",
  max,
  className,
}: TechRowProps) {
  const all = (ids ?? [])
    .map((id) => techById.get(id))
    .filter((t): t is NonNullable<typeof t> => Boolean(t));

  // Absent, never an empty frame: a placeholder that survives to launch reads
  // as abandoned, and there is no honest content to put in it.
  if (all.length === 0) return null;

  const shown = typeof max === "number" ? all.slice(0, max) : all;
  const rest = all.length - shown.length;

  return (
    <div className={className ? `tech ${className}` : "tech"}>
      {label ? <p className="tech__label">{label}</p> : null}
      <ul className="tech__list" role="list" aria-label={label ?? "Built with"}>
        {shown.map((t) => (
          <li key={t.id} className="tech__item">
            <TechMark tool={t} />
            {t.name}
          </li>
        ))}
        {rest > 0 ? (
          <li className="tech__more">
            +{rest}
            <span className="visually-hidden"> more tools</span>
          </li>
        ) : null}
      </ul>
    </div>
  );
}
```

`role="list"` is mandatory: `list-style: none` strips list semantics in Safari/VoiceOver, and this row's entire accessibility argument is that the names are real text. Without it a screen-reader user hears loose strings with no count and no boundary.

No `<Reveal>` of its own — it inherits the reveal of whatever block it sits in.

### `/Users/ParthDoshi/csProjects/portfolio/.claude/worktrees/impeccable-teach/components/ProjectCard.tsx` — EDIT

Insert in **both** branches, between the tagline (flagship: between `.card__desc` and `.card__foot`) and the footer:

```tsx
<TechRow ids={project.tech} label={null} max={4} className="card__tech" />
```

Nothing else in this file changes. If the Work dimension restructures the standard branch into a `.card__body` flex column, the grid placement in §5 becomes redundant and should be dropped — but the component call and the cap are unchanged either way.

### `/Users/ParthDoshi/csProjects/portfolio/.claude/worktrees/impeccable-teach/components/Stack.tsx` — EDIT (three changes only)

1. `group.items.map((item, i) => …)` → key on `item.id`, render `{item.name}`.
2. The `.visually-hidden` block → `{group.items.map((t) => t.name).join(", ")}`.
3. Rewrite `.section__lede` so the orbit is an index, not an inventory:
   > *"Everything I build with, from the languages outward to the tools I build them in. Each case study lists the subset it actually used."*

`ariaSummary()` needs no change (it reads `g.items.length`). **Do not touch `LABEL_GAP`. Do not add marks to `.orbit__label`.**

### `/Users/ParthDoshi/csProjects/portfolio/.claude/worktrees/impeccable-teach/app/dev/tech/page.tsx` — NEW (404s in production)

```tsx
import { notFound } from "next/navigation";
import { stack } from "@/data/stack";
import TechRow from "@/components/TechRow";

/**
 * Calibration harness for the tech chips. 404s in production; never linked.
 * Kept rather than thrown away: the optical pass has to be re-run every time a
 * tool is added or simple-icons is bumped.  Toggle the theme with the shell's
 * existing control; check forced-colors in the OS.
 */
export default function TechSheet() {
  if (process.env.NODE_ENV === "production") notFound();
  const all = stack.flatMap((g) => g.items.map((t) => t.id));
  return (
    <main className="section">
      <h1 className="section__title">Tech chips — calibration</h1>
      {["sheet--ground", "sheet--glass", "sheet--white", "sheet--zoom"].map((c) => (
        <div key={c} className={`sheet ${c}`}>
          <TechRow ids={all as never} label={c} />
        </div>
      ))}
    </main>
  );
}
```

with, in `globals.css` (dev block, kept alongside the tech block):

```css
.sheet { padding: 24px; border-radius: var(--radius-card); margin-bottom: 18px; }
.sheet--glass  { background: var(--glass); backdrop-filter: blur(22px) saturate(1.35); border: 1px solid var(--glass-edge); }
.sheet--white  { background: var(--white); }
.sheet--zoom   { --tech-mark: 56px; font-size: 4em; }
```

---

## 5. CSS

Insert as a new block in `/Users/ParthDoshi/csProjects/portfolio/.claude/worktrees/impeccable-teach/app/globals.css`, **after** the Work/card block (ends ~line 1271) and **before** the Stack orbit block.

Tokens. `--tech-mark` is geometry and needs no `.dark` twin; `--tech-edge` is colour and **must** be defined in both:

```css
/* in :root */
--tech-mark: 14px;
--tech-edge: color-mix(in oklab, var(--ink) 18%, transparent);

/* in .dark */
--tech-edge: color-mix(in oklab, var(--ink) 22%, transparent);
```

The block:

```css
/* ==========================================================================
   Tech chips — per-project tools
   --------------------------------------------------------------------------
   The chip is the unit; the brand mark is optional ornament inside it. The
   name is always visible, which is why the mark is aria-hidden and why there
   is no tooltip, no title attribute and no hover state: nothing here is
   interactive, and .card is overflow:hidden so an anchored popover would clip.

   The mark is the site's one bounded exception to The Drawn-Not-Set Rule:
   a third-party Simple Icons path, FILLED, in currentColor, never stroked and
   never in brand colour. Monochrome keeps The One Accent Rule intact.

   Transparent + ink hairline, not glass: these sit INSIDE .card, which is
   already --glass over the wash, and stacking translucency makes the edge
   vanish in dark. No backdrop-filter — the chip does not float.
   ========================================================================== */
.tech {
  display: grid;
  gap: 10px;
}

.tech__label {
  font-family: var(--font-body-stack);
  font-size: 0.875rem;
  font-weight: 500;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  line-height: 1;
  color: var(--ink-2);
}

.tech__list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 0;
  padding: 0;
  list-style: none;
}

/* Same pill vocabulary as .orbit__label — same radius, size, weight and ink,
 * so the orbit and the case studies read as one system. */
.tech__item {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  border: 1px solid var(--tech-edge);
  border-radius: 999px;
  background: transparent;
  color: var(--ink);
  font-family: var(--font-body-stack);
  font-size: 0.8125rem;
  font-weight: 600;
  line-height: 1.2;
  white-space: nowrap;
}

/* Asymmetric only when a mark is present: the mark's own side bearing already
 * pads the left, so equal padding reads left-heavy. */
.tech__item:has(.tech__mark) {
  padding-left: 8px;
}

.tech__mark {
  flex: none;
  width: var(--tech-mark);
  height: var(--tech-mark);
}

/* A static count, not an affordance: it stops a 4-chip subset from reading as
 * the whole stack. The case study carries the full list. */
.tech__more {
  align-self: center;
  font-family: var(--font-body-stack);
  font-size: 0.8125rem;
  font-weight: 600;
  line-height: 1.2;
  color: var(--ink-2);
}

.card__tech {
  grid-column: 1 / -1;
  grid-row: 3;
  padding-top: 4px;
}

@media (forced-colors: active) {
  .tech__item {
    border-color: CanvasText;
  }
}
```

Plus the two-line card-grid correction from D8:

```css
.card { grid-template-rows: auto 1fr auto auto; }  /* was auto 1fr auto */
.card__foot { grid-row: 4; }                       /* was grid-row: 3 */
```

**No `@media (max-width: 760px)` override.** 14px marks and 13px names are already at the small end and do not shrink further; a four-chip row wraps to two lines on a 390px phone, which is correct. The `.card` mobile block needs no edit.

**No hover block. No transition. No `transform`, `translate`, `scale`, `rotate` or `opacity` on any `.tech*` selector, ever.**

---

## 6. Motion

**The tech row takes no motion of its own — none — on any surface.**

It inherits whatever `<Reveal>` wraps its parent block and nothing else. Specifically rejected, permanently:

- A horizontal tech-icon rail as a scrubbed `view()` traversal (motion survey §5.3 lists it as a sanctioned *pattern*; it is refused *here*). It fails motion Rule 1.1 outright — the reader learns nothing while it runs — and it would consume the route's single pin/traversal allowance on the least informative element on the page.
- Any per-chip stagger. `animate.md`: never reinterpret a list as a staggered entrance.
- Any hover, press or focus transition. The chip is inert (D3).

Because the correction lives in the `viewBox` and not in `scale:` (D4), the chip touches no property any current or future animation can reach, and motion Rule 3.1's `transform`/`translate` split is respected by simply not participating.

---

## 7. Accessibility

| Concern | Decision |
|---|---|
| Mark semantics | `aria-hidden="true" focusable="false"`. Correct, not a dodge — the name is always adjacent visible text. |
| List semantics | `role="list"` on the `<ul>` (Safari/VoiceOver strips it under `list-style: none`) plus `aria-label` = the label, or `"Built with"` when the label is visually omitted. |
| Truncation | The `+N` chip carries `<span class="visually-hidden"> more tools</span>`, so a screen-reader user hears "and 3 more tools" rather than a silently short list. |
| Contrast | Text and mark are `--ink`: ≥4.94:1 on `--ground` in light, >12:1 in dark, both measured over `--glass` too on the contact sheet. The hairline is decorative (the text carries the meaning), so WCAG 1.4.11's 3:1 does not apply to it; it is nevertheless stronger than the shadcn `--border` token in both themes. |
| Forced colors | `currentColor` → `CanvasText` for the mark; `border-color: CanvasText` for the chip. No other override needed. |
| Keyboard | Nothing focusable. Nothing is added to the tab order. |
| Cmd-F | Every tool name is real, selectable, findable text on every surface it appears on. |

---

## 8. Calibration procedure (run **before** finalizing the CSS, and again on every tool addition)

1. `npm i -D simple-icons@<exact>` then `npm run icons`. Fix every 404 by correcting the slug or setting `iconSlug: null`.
2. `npm run dev`, open `/dev/tech`.
3. At the `.sheet--zoom` band (4× effective), compare optical size across all 29 marks. Adjust `weight` in `data/stack.ts` — shrink-only, clamped `[0.86, 1.00]`. Re-check at 1× on the `.sheet--ground` band; if a mark still reads wrong at 1×, the seed values were wrong, not the system.
4. Toggle the theme. Verify on all four bands: the hairline is visible on `--ground`, on `--glass`, and on `--white`, in light and in dark.
5. Enable OS forced-colors / high-contrast and confirm chips and marks survive.
6. Capture at 1440 and 390, both themes, with `playwright-core` against `next start`, `reducedMotion: "reduce"` — the repo's documented pattern. **Do not add Playwright to dependencies.**
7. Only then finalize `--tech-mark` and the two `--tech-edge` mixes.
8. `npm run build`. It is the CI-equivalent gate: a bad `TechId`, a duplicate id, or an out-of-range `weight` fails here.

---

## 9. Document amendments (same PR — non-optional)

**`DESIGN.md`** — REGENERATE, never hand-edit (CLAUDE.md). Required contents:

1. **The Drawn-Not-Set Rule (L304) gains a bounded exception**, verbatim:
   > *One exception, bounded: third-party brand marks from Simple Icons, used only inside `.tech__item`, only as a single filled path in a 24 viewBox at `fill="currentColor"`, at 14px, never stroked, never in brand colour, never in UI chrome, never adjacent to an authored mark in the same cluster. Every other mark on this page remains authored stroke work in `currentColor` — 2.25 for UI arrows, 2.5 for project marks, `fill: none`.*
2. **A Components entry for the tech chip**: 999px radius (One Radius Family), ~24px tall, `padding 4px 10px` / `8px` left with a mark, `1px solid --tech-edge`, transparent fill, no blur, no shadow, no hover, `--ink` text and mark at `0.8125rem/600`, 14px mark, 6px gap.
3. **The two-pill rule**: *the shadcn `Badge` at `h-5` (20px) is the label pill — one categorical fact, in `.card__foot`. The tech chip at ~24px is the data pill — one tool, in `.card__tech` and in case-study meta. They may share a card; they never share a row.*
4. **A "To add a tool" note** beside the existing "To add a project": add the object to the right group in `data/stack.ts`, run `npm run icons`, commit the regenerated file, calibrate `weight` at `/dev/tech`. A tool with no mark takes `iconSlug: null` and needs nothing else.
5. **The Stack section's role**: index, not inventory. Its lede says so. The orbit carries no marks and `LABEL_GAP` is unchanged.
6. **Motion**: the tech row is explicitly excluded from scroll motion.

**`PRODUCT.md`** — under *Evidence on Hand*, add the **per-project tech mapping** as a named outstanding input alongside the internship's company/role/dates. Keep the existing *"Not established: which project used which tool… Do not infer either"* line until Parth's real lists land, then **replace** it with the supplied mapping rather than deleting it.

**`.impeccable/surfaces/homepage.md`** — Unresolved Decision #3 ("a tool→project link needs a mapping that does not exist yet") moves from *unresolved* to *resolved-in-mechanism, pending-content*: the mechanism ships now, the content is blocked on Parth. Record the Stack section's role change.

**`package.json`** — `simple-icons` pinned in `devDependencies`; `"icons": "node scripts/sync-tech-icons.mjs"` in scripts.

---

## 10. Dependencies handed to other dimensions

1. **Work / cards.** `.card` gains a fourth grid row (`auto 1fr auto auto`); `.card__foot` moves to `grid-row: 4`; `.card__tech` occupies `grid-row: 3` at `grid-column: 1 / -1`. If that dimension restructures the standard branch into a `.card__body` flex column (which it should — it also fixes the ragged-bottom defect, since `.card` has no `height: 100%` inside its `Reveal` wrapper), drop the grid placement and keep the component call and the `max={4}` cap.
2. **Experience.** The Operations Agent row renders `<TechRow ids={…} label={null} max={4} />` in its ownership column, same chip, same cap. No text-line variant exists.
3. **Case study.** One `<TechRow ids={project.tech} />` with the `Built with` label, in the header meta block below role/dates and above the links row. Not repeated per section.
4. **Navigation / section order.** This dimension makes **no** claim about where the Stack section sits. Note handed over: *if Stack moves, it must move as part of the Experience/navigation change that also updates `Shell.tsx`'s items array, the fifth keycap, the `calc(var(--i) * 40ms + 80ms)` stagger and DESIGN.md §Navigation.*
5. **Motion.** The tech row is off-limits to scroll choreography. State it in the motion dimension's rejected list.

---

## 11. Risks

1. **Seed slugs are candidates.** Several rename upstream. The generator exits non-zero on any miss, so the failure is at generation, never at render. Run it before trusting any record.
2. **Apify and Pydantic may have no mark in the pinned version.** The system is indifferent: flip to `iconSlug: null`, ship the text chip, change nothing else. A 404 is not a blocker.
3. **The DESIGN.md amendment is the highest-probability follow-on failure.** If DESIGN.md is not regenerated in the same PR, the next agent reads The Drawn-Not-Set Rule as an absolute ban and either reverts the marks or ignores the rule wholesale.
4. **Weight seeds are provisional.** They are informed guesses about relative mass and at least two will look wrong. The contact sheet exists to fix that before the CSS is finalized — do not skip step 8.3. Hold the 0.86 floor: a mark needing more correction should become a text chip.
5. **The temptation tomorrow** will be to fill `Project.tech` from repo languages and READMEs. That is a PRODUCT.md fabrication defect *and* a `craft-floor` L48 defect. The `TechId` union makes wrong ids fail the build; it cannot make plausible-but-unsourced ids fail. **Only Parth's own list populates this field.**
6. **A project with more than ~10 tools** makes the case-study row a wall. The fix is Parth trimming to what actually mattered, not truncation — the case study is the one place the list is complete.
7. **Node version floor.** The generator needs type stripping (≥22.18 default, or `--experimental-strip-types` on 22.6–22.17). This machine is v24.20. `data/stack.ts` must stay import-free or the generator breaks.
8. **Day-one appearance.** With `Project.tech` absent everywhere, no chip renders on the site until the mapping lands. That is correct and deliberate — an honest absence collapses cleanly; a row of plausible guessed logos is a lie a hiring manager catches in the phone screen. The system is nevertheless *fully calibrated and verified* on day one via `/dev/tech`, so tomorrow's work is a data edit and nothing else.