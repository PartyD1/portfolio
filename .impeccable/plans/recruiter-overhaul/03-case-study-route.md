# Case study route and template — final design

**Dimension owner:** routing, URL shape, page template, content data schema, page metadata, navigation back to the homepage, and the NDA project's page.
**Status:** definitive. An implementer follows this without asking questions.
**Blocked-on-Parth items are listed in §14 and are content, not design.**

---

## 0. What changed from the first proposal, and where I disagree with the reviewer

Every blocking and major problem is fixed below. Four places where I did not take the reviewer's suggestion verbatim, stated up front so nobody re-opens them:

1. **The two-column header + "collapse when media is empty" is deleted, not repaired.** The reviewer offered two repairs; I take neither. The header is a fixed two-column grid at all times — narrative on the left, the recruiter's routing facts (`<dl>` + links) in a right rail — and media is always a sibling *below* the header. There is no `--solo` modifier and no media-dependent header state. Rationale: the collapse doubled the header's QA surface to solve a problem that does not exist once the meta rail (not media) owns column 2. The flagship's density argument is satisfied by prose at a 68ch measure and by the architecture diagram, not by a layout that reflows on content absence.
2. **The OG card ships with no custom font.** The reviewer is right that `fs.readFileSync("./Unbounded-Bold.ttf")` is broken and that Unbounded ships variable-only. Rather than instance the font with fontTools and carry a binary with provenance, I drop the custom font entirely and use `ImageResponse`'s built-in face. A broken build blocks seven routes; a system-face OG card costs one aesthetic beat on a surface rendered at thumbnail size. Revisit only if someone commits a static instance.
3. **`status` becomes a two-variant discriminated union, not a four-value enum with a conditional note.** `"archived"` and `"deployed"` are both deleted — `archived` volunteers a negative nobody asked about, and `deployed` says nothing a `live` URL does not already say. See §2.4.
4. **`TechRow` does not throw on an unknown icon slug.** The reviewer inherited that from the proposal without objecting; it is wrong. A build that fails on a content typo the day content lands is hostile. Unknown slug → the text-pill fallback, and `check:content` reports it.

Everything the reviewer did not fault is carried forward unchanged: the `/work/[slug]` URL shape, `dynamicParams = false`, one file per case study collected into `Record<ProjectSlug, CaseStudy>`, the `Source` discriminated union with the `private` variant, `limitations` as the one added section, no eyebrow/kicker/index prop anywhere in the component API, no `<Reveal>` on prose, the opaque media frame, the 68ch long-form measure, no table of contents, and the required email footer with prev/next.

---

## 1. Routing

### 1.1 URL shape

`/work/<slug>` — one dynamic segment at `app/work/[slug]/`.

`/work` already exists as the homepage section id (`components/Work.tsx` renders `id="work"`), so `/work/scorely-ai` reads as "the Work section, opened", and the back link "All work" is literally true. Slugs already exist in `data/projects.ts` and are already the `Artifact` lookup keys — no new identifier is introduced.

There is **no** `/work` index route. `/work` returns the app's 404. The homepage Work section is the index.

### 1.2 Static generation

`export const dynamicParams = false;` plus `generateStaticParams()` over `projects`. Seven fully prerendered HTML files, zero runtime rendering, zero new dependencies. An unknown slug 404s at the router level before the page function runs; the `notFound()` call in the page body exists only to narrow `Project | undefined` to `Project` for the compiler.

Adding a project requires a rebuild. That is correct for this site.

---

## 2. The content schema

### 2.1 File layout

```
data/case-studies/types.ts          the schema (below, verbatim)
data/case-studies/index.ts          barrel + Record<ProjectSlug, CaseStudy> + helpers
data/case-studies/operations-agent.ts
data/case-studies/scorely-ai.ts
data/case-studies/santaclaws.ts
data/case-studies/wave-function-collapse.ts
data/case-studies/pewter-platformer.ts
data/case-studies/gestura.ts
data/case-studies/wordplay.ts
```

One file per project. Each filled record is 80–150 lines of prose; a single 1000-line module is hostile to write and to diff. MDX is rejected: it would add `@next/mdx` and freeform markdown cannot express the typed slots (`Source`, `Team`, `Status`) that carry the truth guarantees — enforcement is the whole point of the schema.

### 2.2 `data/case-studies/types.ts` — verbatim

```ts
/**
 * Case study content schema.
 *
 * Two of the guarantees here are STRUCTURAL — the compiler enforces them and
 * they cannot be bypassed without editing this file:
 *
 *   1. `Source.private` renders prose and no link. There is no code path that
 *      emits an <a>, a chip, a disabled control, or the string "GitHub" for a
 *      project whose source is private. The Operations Agent cannot sprout a
 *      repo affordance by accident.
 *   2. `caseStudies` is typed `Record<ProjectSlug, CaseStudy>`, so a project
 *      in data/projects.ts with no case study file is a build error.
 *
 * Everything else here is a CONVENTION that review has to enforce. In
 * particular: `Section.body` is free prose, so a number written into a
 * sentence carries no source and no type error. `Fact.source` is a free
 * string. `npm run check:content` is the detector for both; it is not a
 * compiler and it is not a build gate.
 *
 * Unsupplied facts are modelled as PENDING rather than as absence. The build
 * stays green, the page renders a designed pending state (the same
 * `.pending-note` treatment ResumeLink already uses), and check:content
 * reports every pending field as a launch blocker. Never write a plausible
 * value into a pending field.
 */

/* -------------------------------------------------------------------------- */
/* Pending                                                                     */
/* -------------------------------------------------------------------------- */

export const PENDING = { pending: true } as const;
export type Pending = typeof PENDING;
export type Maybe<T> = T | Pending;

export function isPending<T>(value: Maybe<T>): value is Pending {
  return typeof value === "object" && value !== null && "pending" in value;
}

/* -------------------------------------------------------------------------- */
/* Header facts                                                                */
/* -------------------------------------------------------------------------- */

export type Period = {
  /** Human display, e.g. "Jun – Sep 2026" or "Spring 2026". */
  label: string;
  /** ISO YYYY-MM. Machine field: ordering, and the Experience section. */
  startISO: string;
  /** ISO YYYY-MM, or null while ongoing. */
  endISO: string | null;
};

export type Team =
  | { kind: "solo" }
  | {
      kind: "with";
      /** e.g. "With one partner", "In a research lab". */
      label: string;
      /**
       * What Parth personally owned. Non-empty by construction when known.
       * PENDING is the only other legal value — a partnered project may not
       * ship with the split silently missing.
       */
      ownership: Maybe<[string, ...string[]]>;
    };

/**
 * Two variants, deliberately. "archived" and "deployed" were considered and
 * rejected: "archived" volunteers a negative about work nobody asked about,
 * and "deployed" says nothing that `live` does not already say with a URL.
 * This enum does not grow — a third value returns this column to the
 * unscannable state the free-text `label` field is in today.
 *
 * "in-use" is the highest-value claim on the whole site, so it is the one
 * status that requires its own note naming who uses it.
 */
export type Status =
  | { kind: "in-use"; note: string }
  | { kind: "prototype"; note?: string };

/** Where the code lives. `private` renders prose and NOTHING clickable. */
export type Source =
  | { kind: "public"; url: string }
  | { kind: "private"; reason: string };

/**
 * `icon` is a Simple Icons slug ("python", "nextdotjs"), or null when no mark
 * exists for the tool. An unknown or null slug renders as an outline text
 * pill on the same row and baseline — never nothing, never a broken mark.
 */
export type Tech = { label: string; icon: string | null };

export type Fact = {
  /** The claim in plain language. Never a bare number. */
  claim: string;
  /** Required. Names where the claim comes from. */
  source: string;
};

/* -------------------------------------------------------------------------- */
/* Media                                                                       */
/* -------------------------------------------------------------------------- */

export type Media = {
  kind: "image" | "video" | "diagram";
  /** Path under /public/media/<slug>/. */
  src: string;
  /** Poster frame. Videos only, and required for them. */
  poster?: string;
  /** Intrinsic size. Required — reserves the frame so nothing shifts, and
   *  makes the scroll choreography identical before and after real media. */
  width: number;
  height: number;
  /** Doubles as alt text. Describe what is happening, not "screenshot". */
  caption: string;
  /** Which theme the capture was taken in. Defaults to "light". Sets the
   *  frame's fixed ground so a light capture does not float on a dark card. */
  theme?: "light" | "dark";
  /** true when the frame shows a mock or a redrawing, not a real capture. */
  illustrative?: boolean;
};

/* -------------------------------------------------------------------------- */
/* Prose                                                                       */
/* -------------------------------------------------------------------------- */

/**
 * A paragraph is a plain string in the common case. The array form exists for
 * the two things "Hardest technical challenge" genuinely needs and cannot say
 * otherwise: a link to a specific file, paper or doc page, and a code
 * identifier set apart from prose.
 */
export type Inline = string | { text: string; href?: string; code?: true };
export type Para = string | Inline[];

export type Section = {
  body: [Para, ...Para[]];
  list?: [Para, ...Para[]];
};

/* -------------------------------------------------------------------------- */
/* The record                                                                  */
/* -------------------------------------------------------------------------- */

export type CaseStudy = {
  /** One or two sentences under the title. Also the meta description. */
  summary: string;

  /** e.g. "Software engineer". PENDING until Parth supplies a title. */
  role: Maybe<string>;
  period: Maybe<Period>;
  team: Team;
  status: Status;
  source: Source;

  /** A running URL, when one exists. */
  live?: { url: string; label?: string };
  /** Off-site verification where there is no repo — LinkedIn for the
   *  internship. This is what turns "trust me" into "check the record". */
  verification?: { label: string; url: string };

  /**
   * Required but may be empty. Writing `tech: []` / `media: []` is a
   * deliberate keystroke; an absent key would be a silent omission.
   * Empty arrays render nothing at all — no placeholder, no "coming soon".
   */
  tech: Tech[];
  media: Media[];

  /** All narrative sections are optional. An absent section renders nothing:
   *  a thin project gets a short complete page, never a long page with
   *  holes. `facts` inside `outcome` follows the tech/media rule. */
  problem?: Section;
  build?: Section;
  outcome?: Section & { facts: Fact[] };
  challenge?: Section;
  limitations?: Section;
};
```

### 2.3 Why pending is a value and not an absence

`role`, `period` and `team.ownership` for the Operations Agent are not on record in `PRODUCT.md` — no company, no title, no dates, no split. Making them required non-nullable fields leaves exactly three outcomes on launch day: the build fails, Parth fabricates, or somebody quietly loosens the schema under time pressure. The repo already has the sanctioned vocabulary for this (`ResumeLink`'s `.is-pending` / `.pending-note`, gated by `resume.ready`), and this schema uses it.

`PENDING` renders. It does not silently hide the row. A `<dl>` row reading **ROLE — not yet stated** on the live page is deliberately conspicuous: an invisible pending field is how a pending field survives to launch. `npm run check:content` exits non-zero while any `PENDING` remains, and that script is on the pre-push checklist.

The non-empty tuple guarantee on `ownership` is kept for the case where the split *is* known — that guarantee is worth having. It is simply no longer the only representable state.

### 2.4 `data/case-studies/index.ts`

```ts
import type { ProjectSlug } from "../projects";
import type { CaseStudy, Source } from "./types";
import { projects } from "../projects";

import operationsAgent from "./operations-agent";
import scorelyAi from "./scorely-ai";
import santaclaws from "./santaclaws";
import waveFunctionCollapse from "./wave-function-collapse";
import pewterPlatformer from "./pewter-platformer";
import gestura from "./gestura";
import wordplay from "./wordplay";

/** The annotation is the enforcement: a missing or drifted slug is a type
 *  error, and the locked decision is a page per project. */
export const caseStudies: Record<ProjectSlug, CaseStudy> = {
  "operations-agent": operationsAgent,
  "scorely-ai": scorelyAi,
  santaclaws,
  "wave-function-collapse": waveFunctionCollapse,
  "pewter-platformer": pewterPlatformer,
  gestura,
  wordplay,
};

/** The single place that knows whether a repo exists. ProjectCard reads the
 *  homepage's repo affordance through here, never from a local field. */
export function sourceFor(slug: ProjectSlug): Source {
  return caseStudies[slug].source;
}

/** Array order, no wrap-around. Ends render one empty cell. */
export function neighbours(slug: ProjectSlug) {
  const i = projects.findIndex((p) => p.slug === slug);
  return { prev: projects[i - 1], next: projects[i + 1] };
}
```

Relative imports (`../projects`, `./operations-agent`), not the `@/` alias — see §11.2.

`caseStudyDepth()` from the first proposal is **deleted**. It was exported and used nowhere.

### 2.5 `data/projects.ts` — the exact edit

Three changes, all in one commit:

1. `export const projects: Project[] = [...]` becomes `export const projects = [...] as const satisfies readonly Project[];` and gains `export type ProjectSlug = (typeof projects)[number]["slug"];`
2. **Delete `href?: string` from the `Project` type AND delete all six `href` values from the entries in the same edit.** `satisfies` does excess-property checking on object literals; leaving the values in place is six compile errors. The six URLs move into their case study's `source: { kind: "public", url }`. `data/projects.ts` ends with zero URLs.
3. **Delete `note?: string` from the type and the one value that uses it.** `note` on `operations-agent` says "Internal to the company, so there's no public repo" — the second place that asserts something about the repo. `Source` is the only place. `description?` stays; the Work dimension owns it.

`ProjectCard.tsx` currently destructures `href` and `note` and builds a `link` const from `href`. All three go — see §9.2. If they do not, `data/projects.ts` and `components/ProjectCard.tsx` both fail typecheck.

---

## 3. The route

### 3.1 `app/work/[slug]/page.tsx`

```tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projects } from "@/data/projects";
import { caseStudies } from "@/data/case-studies";
import CaseBack from "@/components/case/CaseBack";
import CaseHeader from "@/components/case/CaseHeader";
import CaseMedia from "@/components/case/CaseMedia";
import CaseSection from "@/components/case/CaseSection";
import CaseFooter from "@/components/case/CaseFooter";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  const cs = caseStudies[project.slug];
  const title = `${project.name} — Parth Doshi`;
  const url = `/work/${project.slug}`;
  return {
    title,
    description: cs.summary,
    // Per-route canonical. The root layout deliberately sets none: metadata
    // merges down the segment tree, and a root `alternates` would tell Google
    // every case study is a duplicate of the homepage.
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title,
      description: cs.summary,
      url,
    },
    twitter: { card: "summary_large_image", title, description: cs.summary },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;                    // Next 15: params is a Promise
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();                          // narrowing only; the router
  const cs = caseStudies[project.slug];              // already 404s unknown slugs

  return (
    <article className="case">
      <CaseBack />
      <CaseHeader project={project} cs={cs} />
      <CaseMedia media={cs.media} />
      <CaseSection id="problem"     title="Problem & context"          section={cs.problem} />
      <CaseSection id="build"       title="What I built & how"         section={cs.build} />
      <CaseSection id="outcome"     title="Outcome & impact"           section={cs.outcome} facts={cs.outcome?.facts} />
      <CaseSection id="challenge"   title="Hardest technical challenge" section={cs.challenge} />
      <CaseSection id="limitations" title="Limitations & what I'd change" section={cs.limitations} />
      <CaseFooter slug={project.slug} />
    </article>
  );
}
```

Section ids and titles live in the page, not in the data. Data supplies prose; the page supplies structure. That is what makes it impossible for a content file to invent a sixth heading.

`<article className="case">` must carry **no** `overflow`, `transform`, `filter`, `backdrop-filter` or `contain` — a sticky descendant inside any of those silently does not stick. `.hero` (`overflow: clip`) and `.card` (`overflow: hidden`) both do this today; `.case` must not, and neither may `main` in `app/layout.tsx`. Verify with `grep -n "^main\|main {" app/globals.css` before shipping the pin.

### 3.2 Sections beyond the four locked ones

Exactly **one** is added: `limitations` — "Limitations & what I'd change" — and it is optional.

It is the single element that most reads as seniority in a student portfolio and it is rare enough to differentiate. Five headings is the ceiling for a page a recruiter skims in under a minute, which is why it stays optional and is never padded into existence.

Four candidates were considered and each has a home that is not a heading:

| Candidate | Where it actually goes |
|---|---|
| Ownership / "what I owned" | `team.ownership`, rendered in the header `<dl>` above the fold, where routing decisions get made |
| Architecture | `media.kind: "diagram"` — a frame, not a heading |
| Tech stack | the header `TechRow` |
| Decisions & tradeoffs | this **is** "Hardest technical challenge". Splitting them produces two thin sections instead of one strong one |

### 3.3 `app/work/[slug]/not-found.tsx`

Scoped 404 that teaches rather than apologises. An `h1` ("No case study at that address"), one sentence, then all seven case studies as `next/link` list items using the `.link-arrow` grammar with a leading `ArrowRight`. Reuses `.case` padding.

---

## 4. Page metadata

### 4.1 `app/layout.tsx` — the edit

```ts
export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ??
      (process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : "http://localhost:3000"),
  ),
  title: "Parth Doshi",
  description:
    "Computer science student at UC Santa Cruz building autonomous AI agents that do real work.",
  openGraph: { siteName: "Parth Doshi", locale: "en_US" },
  twitter: { card: "summary_large_image" },
};
```

**No `alternates` and no `openGraph.type` at the root.** Both inherit down the segment tree; `alternates: { canonical: "/" }` at the root would canonicalise all seven case studies to the homepage, defeating the sitemap in the same change, and `type: "website"` is wrong for a case study.

`metadataBase` reads env rather than a hardcoded string. Do **not** put a Vercel preview URL into `data/site.ts` — that pins production's OG images and canonicals to a specific expiring deployment, which is a real break where the current state (Vercel's own `VERCEL_URL` default) is merely ugly. `data/site.ts` gains nothing in this change.

### 4.2 `app/page.tsx` — the edit

Add the homepage's own metadata, which is where the site-root canonical belongs:

```ts
export const metadata: Metadata = {
  alternates: { canonical: "/" },
  openGraph: { type: "website", url: "/" },
};
```

### 4.3 `app/work/[slug]/opengraph-image.tsx`

```tsx
import { ImageResponse } from "next/og";
import { projects } from "@/data/projects";
import { caseStudies } from "@/data/case-studies";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Colocated generateStaticParams. The parent's params do reach a colocated
// image route in Next 15, but the interaction with `dynamicParams = false`
// is version-sensitive; declaring it here is deterministic and costs a line.
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) { ... }
```

Composition, in the built-in face (no custom font — see §0.2): `--ground` `#e9e6ee` fill; the project name in uppercase at ~76px, weight 800, `letterSpacing: "0.015em"`, colour `#3f3f68`; beneath it a 0.06em-tracked uppercase line at 24px in `#5f5f82` reading the status label and `period.label` (or "Parth Doshi" alone when `period` is `PENDING`); a 6px `#d9705a` rule 64px wide at the foot. No blobs, no grain — an OG card is composited at thumbnail size and gradients turn to mud.

`alt` is exported per-route: `export const alt = ...` cannot read params, so instead set `openGraph.images[].alt` in `generateMetadata` if wanted; simplest is to omit `alt` and let Next default it.

**Verification, not assumption:** after `npm run build`, confirm seven images exist —
`find .next -path "*work*opengraph-image*" -name "*.png" | wc -l` must print `7`. A silently missing OG image is invisible until somebody pastes a link into Slack.

### 4.4 `app/sitemap.ts` and `app/robots.ts`

```ts
// app/sitemap.ts
import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "/", priority: 1 },
    ...projects.map((p) => ({ url: `/work/${p.slug}`, priority: 0.8 })),
  ];
}
```

`app/robots.ts` returns `{ rules: { userAgent: "*", allow: "/" }, sitemap: "/sitemap.xml" }`. Both resolve against `metadataBase`. This is the cheapest thing available for the Google-search path a recruiter takes after seeing a name on LinkedIn.

No JSON-LD. Out of scope for this dimension.

---

## 5. Component APIs

All under `components/case/`. All are server components except `CaseVideo`.

**No component in this directory accepts an `eyebrow`, `kicker`, `label`, `index`, `number`, or `accent` prop.** The craft floor's one hard ban is the eyebrow above a heading; making the slot structurally absent from the API means a later agent cannot add one without editing a component signature, which is a visible act in a diff.

Note: the route is not "otherwise fully static" — `app/layout.tsx` already mounts `Shell`, `ThemeToggle`, `ThemeProvider` and `ScrollRing` on every route. `CaseVideo` is justified on its own merits in §5.5, not on a hydration-purity argument.

### 5.1 `CaseBack.tsx`

```tsx
<nav className="case__topnav" aria-label="Case study">
  <Link className="link-arrow link-arrow--back" href="/#work">
    <ArrowLeft />
    All work
  </Link>
</nav>
```

`next/link`, not `<a>` — see §8. Not `aria-label="Breadcrumb"`: a single link is not a breadcrumb trail. "All work" rather than "Back": "Back" is ambiguous with browser back.

### 5.2 `CaseHeader.tsx`

`{ project: Project; cs: CaseStudy }`.

```tsx
<header className="case__head">
  <div className="case__intro">
    <h1 className="case__title">{project.name}</h1>
    <p className="case__summary">{cs.summary}</p>
    <TechRow tech={cs.tech} />
  </div>

  <div className="case__facts-rail">
    <dl className="case__meta">
      <dt>Role</dt>
      <dd>{isPending(cs.role) ? <span className="pending-note">not yet stated</span> : cs.role}</dd>

      <dt>Dates</dt>
      <dd>{isPending(cs.period) ? <span className="pending-note">not yet stated</span> : cs.period.label}</dd>

      <dt>Team</dt>
      <dd>{cs.team.kind === "solo" ? "Solo" : cs.team.label}</dd>

      <dt>Status</dt>
      <dd>
        {cs.status.kind === "in-use" ? "In use" : "Prototype"}
        {cs.status.note && <span className="case__meta-note">{cs.status.note}</span>}
      </dd>

      {cs.team.kind === "with" && (
        <>
          <dt>I owned</dt>
          <dd>
            {isPending(cs.team.ownership)
              ? <span className="pending-note">not yet stated</span>
              : <ul className="case__owned">{cs.team.ownership.map((o) => <li key={o}>{o}</li>)}</ul>}
          </dd>
        </>
      )}
    </dl>

    {cs.source.kind === "private" && (
      <p className="case__confidential">{cs.source.reason}</p>
    )}

    <div className="case__links">
      {cs.source.kind === "public" && (
        <a className="link-arrow" href={cs.source.url} target="_blank" rel="noreferrer">
          Source<ArrowUpRight />
        </a>
      )}
      {cs.live && (
        <a className="link-arrow" href={cs.live.url} target="_blank" rel="noreferrer">
          {cs.live.label ?? "Live"}<ArrowUpRight />
        </a>
      )}
      {cs.verification && (
        <a className="link-arrow" href={cs.verification.url} target="_blank" rel="noreferrer">
          {cs.verification.label}<ArrowUpRight />
        </a>
      )}
    </div>
  </div>
</header>
```

There is no `<time>` element. A range label ("Jun – Sep 2026") inside one `<time dateTime>` is semantically wrong, and splitting the label into two halves to get two `<time>`s adds two fields to a schema Parth fills by hand for one machine-readable benefit nobody consumes. `startISO`/`endISO` stay in the data for ordering and for the Experience section.

The `private` branch emits a `<p>` and nothing else. No `<a>`, no chip, no `aria-disabled` control, and the word "GitHub" appears nowhere on that page. A disabled repo affordance asserts that a repo exists and is being withheld, which is a stronger claim than silence.

### 5.3 `CaseSection.tsx`

`{ id: string; title: string; section?: Section; facts?: Fact[] }`. Returns `null` when `section` is undefined.

```tsx
<section className="case__section" id={id} aria-labelledby={`${id}-title`}>
  <h2 className="case__heading" id={`${id}-title`}>{title}</h2>
  <div className="case__body">
    {section.body.map((p, i) => <p key={i}><Prose para={p} /></p>)}
    {section.list && (
      <ul className="case__list">
        {section.list.map((p, i) => <li key={i}><Prose para={p} /></li>)}
      </ul>
    )}
    {facts && facts.length > 0 && (
      <div className="case__facts">
        {facts.map((f) => (
          <div className="fact" key={f.claim}>
            <p className="fact__claim">{f.claim}</p>
            <p className="fact__source">{f.source}</p>
          </div>
        ))}
      </div>
    )}
  </div>
</section>
```

`.case__body` is the class the 68ch measure is applied to, and it is emitted here. No `<Reveal>` wrapper — prose on this route does not animate (§7.1).

### 5.4 `Prose.tsx`

```tsx
export default function Prose({ para }: { para: Para }) {
  if (typeof para === "string") return <>{para}</>;
  return (
    <>
      {para.map((part, i) => {
        if (typeof part === "string") return <span key={i}>{part}</span>;
        const inner = part.code ? <code className="case__code">{part.text}</code> : part.text;
        if (!part.href) return <span key={i}>{inner}</span>;
        const external = /^https?:/.test(part.href);
        return external ? (
          <a key={i} href={part.href} target="_blank" rel="noreferrer">{inner}</a>
        ) : (
          <Link key={i} href={part.href}>{inner}</Link>
        );
      })}
    </>
  );
}
```

Inline links inside prose carry **no arrow glyph** — arrows in running text are clutter. The ↗/→ grammar (§8.3) governs standalone links only. `code` renders in the body face at 0.95em with a glass ground, not monospace: monospace as a costume for "technical" is a refused default, and this is an identifier, not a code block.

### 5.5 `CaseVideo.tsx` — the only client component on the route

```tsx
"use client";
import { useEffect, useRef, useState } from "react";

export default function CaseVideo({ src, poster, width, height }: {
  src: string; poster?: string; width: number; height: number;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const played = useRef(false);
  const [reduced, setReduced] = useState(true);   // SSR-safe: assume reduce, upgrade on mount

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduced(mq.matches);
    apply();
    mq.addEventListener("change", apply);          // live, not a one-shot read
    return () => mq.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.intersectionRatio >= 0.4 && !played.current) {
          played.current = true;
          void el.play().catch(() => {});
        } else if (e.intersectionRatio === 0 && !el.paused) {
          el.pause();                              // off-screen work stops
        }
      },
      { threshold: [0, 0.4] },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduced]);

  return (
    <video ref={ref} src={src} poster={poster} width={width} height={height}
      controls muted playsInline preload="metadata" />
  );
}
```

**It plays once and stops on its final frame.** No `loop`, no `autoPlay` attribute. The proposal's autoplay-loop-on-entry is exactly what Motion Rule 0.2 bans by name ("no autoplaying loop triggered by entering the viewport") and it would make the page-at-rest carry a third moving thing, breaking Rule 0.1's budget of two. The pause-when-hidden doctrine is about not wasting work; it does not satisfy the budget rule, which is about what moves at rest.

Play-once preserves the whole conversion argument — "something running in under 5 seconds" — and `controls` gives replay. Under reduced motion nothing autoplays; the poster and controls are the whole experience.

### 5.6 `TechRow.tsx`

`{ tech: Tech[] }`, returns `null` on empty.

```tsx
<ul className="tech">
  {tech.map((t) => {
    const path = t.icon ? ICONS[t.icon] : undefined;
    return (
      <li className="tech__item" key={t.label}>
        {path ? (
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d={path} /></svg>
        ) : null}
        <span>{t.label}</span>
      </li>
    );
  })}
</ul>
```

An unknown or null slug renders the label alone in the outline-pill treatment (`.tech__item--pill`) on the same row and baseline — **it does not throw**. A build failure on a content typo the day content lands is hostile; `check:content` reports unknown slugs instead.

Marks render `fill="currentColor"` at 20px in `--ink-2`, never in official brand colours: ~30 brand hexes would break the One Accent Rule and the Ground-Only Iridescence Rule at once, and uniform ink makes eight marks read as one system rather than a sponsor wall.

`data/icons.generated.ts` ships as `export const ICONS: Record<string, string> = {};` — an empty map — until real slugs exist, because `tech: []` is locked for all seven on launch (§14). `scripts/fetch-icons.mjs` (mirroring `scripts/make-grain.mjs`: pinned `simple-icons` version, CC0 licence note, trademark note in the header, Node 22+ built-in `fetch`, fails loudly on a 404, output committed, no dependency added) is **written now but first run in the commit that has real slugs**. The DESIGN.md Drawn-Not-Set amendment lands in that same commit — there is no point licensing marks that do not exist yet. When it lands, narrow `Tech.icon` to `keyof typeof ICONS | null` so a bad slug becomes a type error.

### 5.7 `CaseMedia.tsx`

`{ media: Media[] }`.

- `media.length === 0` → returns `null`. **No placeholder frame ever reaches a deployment.** A dashed placeholder renders only when `process.env.NEXT_PUBLIC_SHOW_PLACEHOLDERS === "1"`, so the slot is designed and visible while Parth builds and cannot be seen by a recruiter. An env flag rather than `NODE_ENV`, because Vercel preview builds run as production and the flag needs to be on in previews. "Media coming soon" on a live page reads as abandoned.
- Otherwise renders `<div className="case__media" data-pin={pin || undefined} style={{ "--beats": media.length }}>` → `<div className="case__stage">` → `<div className="case__rail">` → one `<figure className="case__frame">` per item.
- `pin` is true iff **`media.length` is 2 or 3 AND every item's `kind` is `"image"` or `"diagram"`.** A video anywhere in the set disables the pin — a video needs `controls`, controls are focusable, and a focusable element inside a horizontally clipped pinned stage triggers a scroll-into-view that fights the pin. It also honours "one authored moment": the route gets the video *or* the rail, never both.
- Per item: `"image"` → `next/image` with explicit `width`/`height` and `sizes="(max-width: 760px) 100vw, 880px"`; `"video"` → `<CaseVideo>`; `"diagram"` → a plain `<img>` with explicit dimensions when `src` ends `.svg`, `next/image` otherwise.
- `caption` becomes both `alt` and `<figcaption>`. `illustrative: true` prefixes the figcaption with `<span className="case__illustrative">Illustrative</span>`.
- `theme` (default `"light"`) becomes `data-shot` on the shot box.

### 5.8 `CaseFooter.tsx`

`{ slug: ProjectSlug }`.

```tsx
<section className="case__cta" aria-labelledby="case-cta-title">
  <h2 className="sr-only" id="case-cta-title">Get in touch</h2>
  <p className="case__cta-lede">I&rsquo;m happy to walk through any of this.</p>
  <a className="case__email" href={`mailto:${links.email}`}>{links.email}</a>
</section>

<nav className="case__more" aria-label="More work">
  {prev ? (
    <Link className="case__more-item" href={`/work/${prev.slug}`}>
      <span className="case__more-label"><ArrowLeft />Previous</span>
      <span className="case__more-name">{prev.name}</span>
    </Link>
  ) : <span />}
  {next ? (
    <Link className="case__more-item case__more-item--next" href={`/work/${next.slug}`}>
      <span className="case__more-label">Next<ArrowRight /></span>
      <span className="case__more-name">{next.name}</span>
    </Link>
  ) : <span />}
</nav>
```

Required on every case study. The bottom of a case study is the highest-intent moment on the site and is currently the one place a reader can reach with nothing to do — the same defect the flagship card has today. Prev/next is the cheapest lever on the site's median quality: a recruiter who liked one page reads a second instead of leaving. Array order, no wrap-around; an end renders one empty cell.

The email is sized `clamp(1.0625rem, 1.4vw, 1.25rem)` — deliberately one step below `.contact__email`'s `clamp(1rem, 2.6vw, 1.75rem)`, so the homepage Contact block stays the loudest occurrence of the address.

---

## 6. CSS — append to `app/globals.css` after the Work block

```css
/* ==========================================================================
   Case study
   ========================================================================== */
.case {
  max-width: 1140px;
  margin: 0 auto;
  padding: 104px 24px 0;
  /* No overflow, transform, filter or contain here: a sticky descendant
     inside any of those silently does not stick. */
}

.case__topnav {
  margin-bottom: 28px;
}

.link-arrow--back .icon {
  transform: translateX(0);
}

@media (hover: hover) and (pointer: fine) {
  .link-arrow--back:hover .icon {
    transform: translateX(-4px);
  }
}

/* --- header ------------------------------------------------------------- */
.case__head {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 320px);
  column-gap: 48px;
  align-items: start;
  padding-bottom: 40px;
  border-bottom: 1px solid var(--glass-edge);
}

.case__title {
  font-size: clamp(2rem, 4.4vw, 3.25rem);
  letter-spacing: 0.015em;
  /* uppercase / 700 / balance / line-height 1.02 inherit from the base h1 */
}

.case__summary {
  margin-top: 20px;
  max-width: 46ch;
  font-size: clamp(1.0625rem, 1.4vw, 1.25rem);
  line-height: 1.5;
  color: var(--ink);
}

.case__meta {
  display: grid;
  grid-template-columns: max-content minmax(0, 1fr);
  column-gap: 20px;
  row-gap: 12px;
}

.case__meta dt {
  font-size: 0.875rem;
  font-weight: 500;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  line-height: 1.5;
  color: var(--ink-2);
}

.case__meta dd {
  font-size: 1.0625rem;
  line-height: 1.5;
  color: var(--ink);
}

.case__meta-note {
  display: block;
  margin-top: 2px;
  font-size: 0.875rem;
  line-height: 1.5;
  color: var(--ink-2);
}

.case__owned {
  display: grid;
  gap: 6px;
}

.case__owned li {
  position: relative;
  padding-left: 16px;
  font-size: 1.0625rem;
  line-height: 1.5;
}

/* Drawn, not a glyph. Ink, not coral — the accent has exactly six homes. */
.case__owned li::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0.72em;
  width: 8px;
  height: 1px;
  background: var(--ink-2);
}

/* Floats over the wash and carries text, so the blur is functional here —
   this is the Blur-Is-Legibility case, unlike .case__shot below. */
.case__confidential {
  margin-top: 22px;
  padding: 16px 18px;
  max-width: 46ch;
  border: 1px solid var(--glass-edge);
  border-radius: var(--radius-card);
  background: var(--glass);
  backdrop-filter: blur(22px) saturate(1.35);
  font-size: 0.9375rem;
  line-height: 1.5;
  color: var(--ink-2);
}

.case__links {
  display: flex;
  flex-wrap: wrap;
  gap: 4px 24px;
  margin-top: 20px;
}

/* --- tech row ----------------------------------------------------------- */
.tech {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px 18px;
  margin-top: 24px;
}

.tech__item {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 0.9375rem;
  font-weight: 500;
  color: var(--ink-2);
}

.tech__item svg {
  width: 20px;
  height: 20px;
  flex: 0 0 auto;
}

.tech__item--pill {
  padding: 3px 10px;
  border: 1px solid var(--border);
  border-radius: 999px;
}

/* --- body --------------------------------------------------------------- */
.case__section {
  padding-top: 64px;
  scroll-margin-top: 84px;
}

.case__heading {
  font-size: clamp(1.25rem, 1.9vw, 1.625rem);
  letter-spacing: 0.01em;
  margin-bottom: 16px;
}

/* The site's first long-form measure. Every existing cap (42ch ledes, 46ch
   hero subline, 52ch flagship desc, 60ch About) is tuned for a short block;
   running prose wants 65–75ch. Do not "correct" this to 60ch. */
.case__body {
  max-width: 68ch;
}

.case__body p {
  font-size: 1.0625rem;
  line-height: 1.6;
  color: var(--ink);
}

.case__body p + p {
  margin-top: 1.05em;
}

.case__body a {
  color: var(--ink);
  text-decoration: underline;
  text-decoration-thickness: 1px;
  text-decoration-color: var(--ink-2);
  text-underline-offset: 3px;
  transition: text-decoration-color 200ms var(--ease-out);
}

@media (hover: hover) and (pointer: fine) {
  .case__body a:hover {
    text-decoration-color: var(--ink);
  }
}

/* Body face, not monospace: this is an identifier, not a code block. */
.case__code {
  font-family: inherit;
  font-size: 0.95em;
  padding: 0.1em 0.4em;
  border-radius: 4px;
  background: var(--glass-strong);
  border: 1px solid var(--glass-edge);
}

.case__list {
  margin-top: 20px;
  display: grid;
  gap: 10px;
}

.case__list li {
  position: relative;
  padding-left: 20px;
  font-size: 1.0625rem;
  line-height: 1.6;
  color: var(--ink-2);
}

.case__list li::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0.78em;
  width: 10px;
  height: 1px;
  background: var(--ink-2);
}

/* --- facts -------------------------------------------------------------- */
/* .fact font-size NEVER exceeds 1.25rem and NEVER takes --signal. This is
   exactly where the hero-metric template (big number / small label /
   supporting stats / accent) would otherwise appear, and it is refused. */
.case__facts {
  margin-top: 28px;
}

.fact {
  border-top: 1px solid var(--glass-edge);
  padding: 14px 0;
}

.fact__claim {
  font-size: 1.0625rem;
  line-height: 1.5;
  color: var(--ink);
}

.fact__source {
  margin-top: 4px;
  font-size: 0.875rem;
  line-height: 1.5;
  color: var(--ink-2);
}

/* --- media -------------------------------------------------------------- */
.case__media {
  padding-top: 64px;
}

/* Base state = the finished state (Motion Rule 6.1). Everything about the
   pin lives inside the @supports block below, so no-support, reduced-motion
   and mobile all land here without a collapse rule. */
.case__rail {
  display: grid;
  gap: 28px;
}

.case__frame {
  margin: 0;
}

/* The site's first opaque surface. No backdrop-filter and no shadow:
   Blur-Is-Legibility licenses blur where text must stay readable over the
   wash, and there is no text behind an opaque capture — so blur here would
   be decoration. It is also the one element the scroll budget wants to
   travel, and moving a backdrop-filter is a compositor-buster. */
.case__shot {
  border: 1px solid var(--glass-edge);
  border-radius: var(--radius-card);
  overflow: hidden;
  background: var(--white);
}

/* Captures are taken in one theme and the frame paints that theme's ground
   in both site themes. A light screenshot is an accepted light island in
   dark mode; the alternative is a capture floating on a mismatched card. */
.case__shot[data-shot="light"] {
  background: #f7f6fa;
  border-color: rgb(63 63 104 / 0.14);
}

.case__shot[data-shot="dark"] {
  background: #23243d;
  border-color: rgb(236 235 244 / 0.16);
}

.case__shot img,
.case__shot video {
  display: block;
  width: 100%;
  height: auto;
}

.case__caption {
  margin-top: 12px;
  max-width: 60ch;
  font-size: 0.9375rem;
  line-height: 1.5;
  color: var(--ink-2);
}

.case__illustrative {
  margin-right: 8px;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--ink-2);
}

/* Dev only. NEXT_PUBLIC_SHOW_PLACEHOLDERS=1 — never in a deployment. */
.case__placeholder {
  display: grid;
  place-items: center;
  aspect-ratio: 16 / 10;
  border: 1px dashed var(--glass-edge);
  border-radius: var(--radius-card);
  font-size: 0.875rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--ink-2);
}

/* --- footer ------------------------------------------------------------- */
.case__cta {
  padding-top: 88px;
  max-width: 68ch;
}

.case__cta-lede {
  font-size: 1.0625rem;
  line-height: 1.6;
  color: var(--ink-2);
}

.case__email {
  display: inline-block;
  margin-top: 18px;
  font-family: var(--font-display-stack);
  font-size: clamp(1.0625rem, 1.4vw, 1.25rem);
  font-weight: 600;
  letter-spacing: 0.005em;
  color: var(--ink);
  text-decoration: underline;
  text-decoration-thickness: 3px;
  text-decoration-color: var(--signal);
  text-underline-offset: 10px;
  transition: text-decoration-color 200ms var(--ease-out);
  word-break: break-all;
}

@media (hover: hover) and (pointer: fine) {
  .case__email:hover {
    text-decoration-color: var(--ink);
  }
}

.case__more {
  margin-top: 72px;
  padding: 28px 0 96px;
  border-top: 1px solid var(--glass-edge);
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}

.case__more-item {
  display: grid;
  gap: 4px;
  text-decoration: none;
  transition: color 200ms var(--ease-out);
}

.case__more-item:active {
  transform: scale(0.97);
}

.case__more-item--next {
  justify-items: end;
  text-align: right;
}

.case__more-label {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 0.875rem;
  font-weight: 500;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--ink-2);
}

.case__more-label .icon {
  width: 1em;
  height: 1em;
}

.case__more-name {
  font-family: var(--font-display-stack);
  font-size: 1.0625rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.01em;
  color: var(--ink);
}

@media (hover: hover) and (pointer: fine) {
  .case__more-item:hover .case__more-name {
    color: var(--signal-ink);
  }
}

/* --- responsive --------------------------------------------------------- */
@media (max-width: 760px) {
  .case {
    padding: 88px 20px 0;
  }
  .case__head {
    grid-template-columns: minmax(0, 1fr);
    row-gap: 28px;
    padding-bottom: 32px;
  }
  .case__section {
    padding-top: 48px;
  }
  .case__heading {
    margin-bottom: 14px;
  }
  .case__media {
    padding-top: 48px;
  }
  .case__cta {
    padding-top: 64px;
  }
  .case__more {
    grid-template-columns: minmax(0, 1fr);
    padding-bottom: 72px;
  }
  .case__more-item--next {
    justify-items: start;
    text-align: left;
  }
}
```

The header grid is the **third** grid shape in the system (after Work's `repeat(2, minmax(0,1fr))` and About's `minmax(0,1fr) minmax(0,1.5fr)`), declared under The 1140 Rule with the 760px collapse. Add it to DESIGN.md § Layout.

There are no horizontal rules between sections, no section numbering, and no accent rails. The h1→h2 scale step plus 64px of space above each heading (against 16px below it) carries the separation.

---

## 7. Motion

### 7.1 Prose does not animate

No `<Reveal>`, no scrub, no stagger, no entrance on any case-study section. The motion ruleset puts zero pins in Problem, Build and Outcome — those are read, not watched — and the craft floor names "every section fading and rising on entry" as the refused default by hand. Prose that waits to appear is prose a recruiter on candidate forty does not read.

This restraint is recorded in `.impeccable/surfaces/case-study.md` (§12.3) so the next polish pass does not "even it out" against the homepage.

### 7.2 The one pinned sequence — fully specified

The route's single pin allowance goes to the media rail, and only when there is content to choreograph: **2 or 3 items, all images or diagrams**. One item is the empty pin the budget exists to prevent. Four or more, or any video, and the rail stays a plain vertical stack.

The pattern is horizontal traversal inside a sticky stage (Motion Ruleset §5.3), driven by a named view timeline on the pin container. Every pin rule is inside a positive gate, so the base cascade *is* the finished readable state and no reduced-motion collapse rule is needed.

```css
@supports (animation-timeline: view()) {
  @media (prefers-reduced-motion: no-preference) and (min-width: 761px) {
    /* One beat of travel per transition: (beats - 1) × 70svh of extra scroll.
       2 media → 70svh; 3 media → 140svh. Both inside the 40–80vh per-beat
       window and under the 150vh total-pin ceiling. */
    .case__media[data-pin] {
      height: calc(100svh + (var(--beats) - 1) * 70svh);
      view-timeline: --case-rail block;
    }

    /* svh only. vh makes the pin jump when the mobile URL bar hides; dvh
       resizes during the scroll, which is jitter. */
    .case__media[data-pin] .case__stage {
      position: sticky;
      top: 0;
      height: 100svh;
      display: flex;
      align-items: center;
      /* clip, not hidden: clip creates no scroll container, so a clipped
         figcaption cannot be programmatically scrolled into view and fight
         the pin. Same reason .hero uses clip. */
      overflow: clip;
    }

    .case__media[data-pin] .case__rail {
      display: flex;
      gap: 40px;
      width: max-content;
      animation: case-rail linear both;
      animation-timeline: --case-rail;
      animation-range: contain 0% contain 100%;
      /* linear, always. An eased scrub means the content lags the finger,
         which is the exact mechanism by which cinematic scroll feels slow. */
    }

    .case__media[data-pin] .case__frame {
      flex: 0 0 min(880px, 72vw);
    }

    .case__media[data-pin] .case__shot img {
      max-height: 62svh;
      width: auto;
      margin-inline: auto;
    }

    /* One property, one keyframe pair, monotonic. No overshoot: a bounce
       curve on a reversible timeline oscillates when the user scrolls
       slowly across it. Individual `translate`, never `transform` —
       interaction owns transform on this site. */
    @keyframes case-rail {
      to {
        translate: calc(-1 * (var(--beats) - 1) * (min(880px, 72vw) + 40px)) 0;
      }
    }
  }
}
```

`--beats` is set inline by `CaseMedia` as `style={{ "--beats": media.length }}`. The `contain` range spans exactly the period the stage is pinned, because the container is taller than the viewport.

No `will-change`: Chromium already promotes elements driven by a scroll timeline, and adding it costs memory and can reduce mobile framerate.

No polyfill. Unsupported engines get the vertical stack, which loses choreography and no information.

Anchor targets never land inside the pin: the pin container carries no `id`, and every `id` on the route is on a `.case__section` with `scroll-margin-top: 84px`.

### 7.3 Cross-route continuity

Not specified here. If a homepage-card → case-header shared element is wanted it is `view-transition-name` and nothing else, and it belongs to the motion dimension. It must no-op silently where unsupported, and it must never be a JS FLIP library.

---

## 8. Navigation and link grammar

### 8.1 Internal navigation uses `next/link`

Every internal destination — the back link to `/#work`, both prev/next links, the seven links in `not-found.tsx`, and the homepage card's stretched anchor to `/work/${slug}` — uses `next/link`. Raw `<a>` is a full document reload: new HTML, re-download, re-hydrate `Shell` / `ScrollRing` / `ThemeProvider`, and a `next-themes` boot flash. Prev/next is justified as the cheapest lever on the site's median quality; shipping it as the slowest link on the site defeats it. `Link` prefetches the sibling case study on viewport entry, which is the entire point.

Raw `<a target="_blank" rel="noreferrer">` stays for outbound (`source.url`, `live`, `verification`) and for `mailto:`. That distinction is also what makes the glyph grammar honest.

### 8.2 `components/Shell.tsx` becomes route-aware

```tsx
import { usePathname, useRouter } from "next/navigation";
...
const pathname = usePathname();
const router = useRouter();
const onHome = pathname === "/";
```

- Menu `href` becomes `onHome ? `#${item.id}` : `/#${item.id}``.
- The `onKey` handler branches: on the homepage keep `document.getElementById(item.id)?.scrollIntoView({ behavior: "auto", block: "start" })`; off it, `router.push(`/#${item.id}`)`.

Without this, all four shortcuts and all four menu links are dead controls on every case-study route — `getElementById` resolves to nothing there. A hash navigation to another route is a load-and-jump rather than a scroll; that is the honest behaviour and it stays instant, which is the actual rule ("keyboard-initiated scroll is never animated").

DESIGN.md § Navigation must be rewritten — it currently asserts there is no persistent nav and no second route. The Experience dimension owns adding a fifth `items` entry and keycap.

### 8.3 The link grammar's third case

DESIGN.md's current rule — "icon leads on in-page navigation, trails on outbound" — has no case for an internal route link. Amend it so meaning keys to the **glyph**, not the position:

- `ArrowUpRight` (↗) means **this leaves the site**, and it trails the label.
- `ArrowLeft` / `ArrowRight` mean **this stays on the site**, and the arrow sits on the side it travels toward.

So `Source ↗` and `← All work` and `Next →` read as three different promises. The position half of the old rule is demoted to a consequence of direction.

`components/Icon.tsx` gains `ArrowLeft`, matching the existing three exactly (`viewBox="0 0 20 20"`, `fill="none"`, `stroke="currentColor"`, `strokeWidth="2.25"`, round caps and joins, `aria-hidden`):

```tsx
<path d="M17 10H4M9 5l-5 5 5 5" />
```

### 8.4 No table of contents

No in-page TOC, no section numbering, no sticky section rail. Five headings on a page that scrolls past in seconds needs no wayfinding device, and both a numbered list and a sticky rail are eyebrow-adjacent devices the craft floor refuses. Deep linking is served by the stable ids `#problem`, `#build`, `#outcome`, `#challenge`, `#limitations` with `scroll-margin-top: 84px` — free, and it works for Cmd+F, keyboard and a pasted link.

If the Operations Agent page grows past roughly four screens, revisit — but not with a numbered list.

---

## 9. The NDA project's page

`operations-agent` is the page most likely to have no repo and no screenshots, and the page that can least afford to look empty. Four mechanisms, all already specified above:

1. **No repo affordance exists in any code path.** `source: { kind: "private", reason: "The code and the company's data stay internal. The architecture and the decisions I can walk through in detail." }`. `CaseHeader`'s links row has no branch that renders a link for `private`. The word "GitHub" never appears. That last clause of the reason is an interview-request generator on its own.
2. **Verification moves off-site.** `verification: { label: "Employment on LinkedIn", url: links.linkedin }` renders as a normal outbound `↗` link. That converts "trust me" into "check the employment record", and it is the honest substitute for a repo.
3. **Media becomes a diagram, not a screenshot.** `media.kind: "diagram"` accepts an authored architecture drawing — the agent loop, the tool surface, what it read, how it decided a booking needed attention, what guardrails stopped a bad write, how correctness was judged. Almost none of that is confidential; the customer data is. A scrubbed architecture diagram is a *better* proof artifact for a hiring manager than a UI screenshot and it sidesteps confidentiality entirely. Requires Parth's sign-off (§14).
4. **Density comes from prose at 68ch**, not from a layout that reflows when media is absent. If `media: []`, `CaseMedia` returns `null` and the page is header → five sections → footer, with the reading column at its full 68ch measure. No gap, no apology, no "coming soon" frame.

The failure mode to watch: if the four sections arrive as one paragraph each, the site's most emphasised project becomes its shortest page and the whole structure inverts. That is a content risk, not a design one — see §14.

---

## 10. How missing content degrades

| Field | Missing state | What renders |
|---|---|---|
| `role`, `period` | `PENDING` | The `<dl>` row renders with a `.pending-note` pill reading "not yet stated". Conspicuous on purpose. `check:content` exits 1. |
| `team.ownership` (on `with`) | `PENDING` | Same treatment under the "I owned" term. |
| `tech` | `[]` | The whole `TechRow` is absent. No empty row, no "TBD". |
| `Tech.icon` null or unknown slug | — | The label alone in an outline pill on the same baseline. Never a broken mark, never a dropped tool. |
| `media` | `[]` | The whole media region is absent in any deployment. Dashed placeholder only under `NEXT_PUBLIC_SHOW_PLACEHOLDERS=1`. |
| `outcome.facts` | `[]` | The facts block is absent; the outcome prose stands alone. |
| any narrative section | `undefined` | `CaseSection` returns `null`. Nothing renders, no heading, no gap. A thin project gets a short complete page. |
| `live`, `verification` | absent | The link is absent. Nothing implies one exists. |
| `source` | never absent — it is a required union | `public` → one `Source ↗` link. `private` → prose in a glass block and nothing clickable. |

There is no compiler pressure toward completeness, deliberately: a build gate would block work tomorrow while seven files are half-written. `npm run check:content` is the launch checklist instead.

---

## 11. Scripts

### 11.1 `scripts/check-content.mjs` — `npm run check:content`

Plain Node, no dependency, **not** wired into `next build`.

**It reads the case-study files as text and regexes them.** It does not import them. `scripts/make-grain.mjs` is not a precedent for reading the data layer — it imports only `node:zlib` and `node:fs`. Node 24 strips types but resolves neither the `@/` tsconfig alias nor TypeScript's extensionless relative specifiers, so `import`ing `data/case-studies/index.ts` fails.

For each of `data/case-studies/*.ts` except `types.ts` and `index.ts` it reports:

- every occurrence of `PENDING` and which field it is on — **exit code 1**
- `tech: []`, `media: []`, `facts: []`
- which of the five narrative keys are absent
- `fs.existsSync` for every `src:` and `poster:` string under `public/` — **exit code 1** on a missing file
- any `icon: "…"` slug that is not a key in `data/icons.generated.ts`
- any `Fact.source` string under 10 characters
- any sentence inside a `body:` array containing a digit where the record has no non-empty `facts` array — the actual detector for an unsourced number in prose, which the type system cannot catch

Run it before every push alongside `npm run build`. Add to `package.json`: `"check:content": "node scripts/check-content.mjs"`.

### 11.2 Import style in the data layer

`data/case-studies/index.ts` uses **relative** imports (`../projects`, `./operations-agent`), not `@/`. This keeps the module directly loadable by Node if a future script wants to import rather than regex, and costs nothing today.

### 11.3 `scripts/fetch-icons.mjs`

Written now, first run when real tech slugs exist. Reads the union of `icon:` slugs by regexing `data/case-studies/*.ts` (same reason as above), fetches `https://cdn.jsdelivr.net/npm/simple-icons@<PINNED>/icons/<slug>.svg` with Node's built-in `fetch`, extracts the single `d` attribute, writes `data/icons.generated.ts` under a provenance header recording the pinned version, the CC0 licence, and the note that the marks remain third-party trademarks. Output is committed. Fails loudly on a 404 rather than emitting an empty path.

---

## 12. Documentation edits — same commit as the first route

### 12.1 `CLAUDE.md`

Must land in the same commit. It currently asserts six things the shipped code contradicts: "a single static page (`/`)", "Light theme only", "No Tailwind", `components/Nav.tsx`, Gabarito, and an unsupplied résumé. An implementer reading it while building `/work/[slug]` ships a route with no `.dark` values, which DESIGN.md calls a bug outright.

Rewrite "What this is", "Architecture" and "Product and design constraints" against the actual App Router shape. Extend the documented screenshot capture list to `/work/<slug>` at 1440 and 390, fold and full, both themes.

### 12.2 `DESIGN.md`

Regenerate (do not hand-edit) after the route ships. It must gain:

- § Layout: the third grid shape (`minmax(0,1fr) minmax(0,320px)`, 48px gap, collapsing at 760px) under The 1140 Rule.
- § Type: the 68ch long-form measure, with its justification, in the measure table.
- § Material: the opaque-frame exception. `--white` acquires a second job beyond the shadcn `--card` slot. Write down *why* `.case__shot` carries no `backdrop-filter`, or the next agent reads Blur-Is-Legibility, sees an unblurred floating surface, and "fixes" it — which both breaks the material argument and turns the media rail into a compositor-buster.
- § Links: the third case (§8.3).
- § Navigation: rewritten — there is now a second route and menu links change shape off the homepage.
- § Motion: the scroll-driven exemption from the ambient budget, and the case-study pin's exact ceiling (2–3 image/diagram media, 70svh per beat, ≤140svh extra scroll, none on mobile, none under reduced motion, none when a video is present).

The Simple Icons / Drawn-Not-Set amendment does **not** land here. It lands in the commit that first ships a real mark (§5.6).

### 12.3 `.impeccable/surfaces/case-study.md` — new

Impeccable requires a per-surface direction contract and its finish review audits the FIRST VIEWPORT and signature interaction of each surface. Without this file the case-study route is reviewed against `homepage.md`, whose FIRST VIEWPORT is "Centred hero" and whose scope is "Single-page portfolio landing surface" — a correct case-study page would be failed for being correct.

- **FIRST VIEWPORT:** back link, project name, summary deck, tech row, and the full meta `<dl>` (role, dates, team, status, ownership) all above the fold, with the first media frame just breaking it.
- **SIGNATURE INTERACTION:** the media rail's pinned horizontal traversal, where two or three image/diagram items exist. Nothing else on the route moves.
- **EXPLICIT NON-GOALS:** no entrance animation on prose; no table of contents; no section numbers; no eyebrows; no big-number outcome block; no placeholder frames in a deployment.

---

## 13. Homepage contract (owned by the Work dimension, binding on it)

Two obligations follow from this dimension and must be honoured whichever way the cards are redesigned:

1. **The whole card becomes a link to `/work/${slug}`** via a stretched pseudo-element on a `next/link` wrapping the card name: `.card { position: relative }` plus `.card__name a::after { content: ""; position: absolute; inset: 0 }`, with `.card__link { position: relative; z-index: 1 }` so an outbound repo link stays separately clickable. This is what finally gives the flagship a target — today it is the largest element on the page and the only one with nothing to click, and its footer holds an apology where every other card holds an action. Known cost, named so nobody rediscovers it: a stretched link makes the card's tagline text unselectable.
2. **`Project.href` and `Project.note` no longer exist.** Read the repo through `sourceFor(slug)` and render nothing at all when `kind === "private"`.

**Sequence these two changes; do not parallelise them.** Both dimensions edit `components/ProjectCard.tsx`. If they land independently the merge drops one contract — most likely `sourceFor(slug)` — which duplicates the repo URL in two places and reopens exactly the failure mode the `Source` union exists to prevent.

---

## 14. Blocked on Parth (content, not design)

Ask all of these tomorrow, in this order:

1. **The internship's company, role title, and exact dates.** Nothing on record supplies them. Most internship NDAs cover code and customer data, not the fact of employment — ask directly whether he can name the employer. If he genuinely cannot, the fallback is the industry and shape ("a [X]-person operations company"), never a nameless void, which is the current state and reads as thin. Until then: `PENDING`, which renders visibly and fails `check:content`.
2. **Which subsystems on Operations Agent were his versus his partner's.** `team.ownership` is `PENDING` until he answers. "We built" with no split is a top-five credibility failure and it is on the flagship.
3. **Per-project tech lists.** `tech: []` for all seven on launch day, because `PRODUCT.md` states outright that no tool→project mapping exists and that it may not be inferred — per-project icons *are* that mapping, and populating them from repo language or an expected framework is fabrication, not placeholder. The cost is real: the site has zero keyword surface until he answers, and keyword scanning is real recruiter behaviour. This is the highest-value item after #1.
4. **Whether a redrawn architecture diagram of the Operations Agent is permissible under his NDA.** It is the intended answer to that page's missing media and it sidesteps confidentiality entirely.
5. **Per-project dates and status.** `status` is required for all seven and takes seconds to fill; `in-use` requires a note naming who.
6. **Whether ScorelyAI has a sourceable usage fact.** "In use by DECA competitors" currently lives as a free-text card label with no source. It is the site's strongest claim and it needs a `status.note` he can stand behind.
7. **The production domain**, for `NEXT_PUBLIC_SITE_URL`.

---

## 15. Ship checklist for this dimension

- [ ] `npm run build` passes; `next build` output lists seven `/work/<slug>` static routes.
- [ ] `find .next -path "*work*opengraph-image*" -name "*.png" | wc -l` prints `7`.
- [ ] `npm run check:content` runs and its exit code is understood (non-zero while any `PENDING` remains is expected until §14 lands).
- [ ] View source on `/work/scorely-ai`: exactly one `<link rel="canonical">`, pointing at `/work/scorely-ai`, and `og:type` is `article`.
- [ ] `/work/operations-agent` contains no `<a>` to any repo host and the string "GitHub" appears nowhere in its DOM.
- [ ] `grep -rn "overflow\|transform\|filter\|contain" app/globals.css` — confirm no clipping/containing ancestor above `.case__media` (`main`, `body`, `.case`).
- [ ] With JS disabled: every section, every caption, the email and prev/next are all readable and reachable.
- [ ] `prefers-reduced-motion: reduce`: no pin, no sticky, no scrub, no autoplay; the route is shorter than the motion path, same content in the same order.
- [ ] At ≤760px: no pin, no horizontal rail, no parallax; URL-bar show/hide causes no jump.
- [ ] Keyboard: 1/2/3/4 navigate home from a case study; Tab reaches the back link, every outbound link, the video controls, the email and both neighbour links; nothing focusable sits clipped inside the pinned stage.
- [ ] DevTools ▸ Rendering ▸ Paint flashing during the rail scrub: no full-rect repaint; Layer borders confirms the rail is composited; nothing moving carries `backdrop-filter`.
- [ ] Screenshots at 1440 and 390, fold and full, both themes, on `/work/operations-agent` (the no-media, private-source case) and one media-bearing route.
- [ ] `npm run lint` clean; `/polish` run and its findings fixed in the same push.