# Recruiter Conversion Surfaces — Definitive Design

**Dimension owner:** conversion layer (email as single primary CTA, résumé/links secondary, scanning path, proof adjacency, page endings).
**Repo root:** `/Users/ParthDoshi/csProjects/portfolio/.claude/worktrees/impeccable-teach`

Everything below is decided. Where I depart from the adversarial review, §12 says so and why.

---

## 1. The scanning path (this is the spec everything else is derived from)

The brief's two halves are not independent: the placement of every email affordance is a *consequence* of the three-state path, not a separate decision. So the path is written first and the surfaces are read off it.

### State A — 20 seconds. One fixed viewport, no scroll, no JS.

**Definition:** everything a recruiter sees before their first scroll gesture, on a 1440×900 desktop and a 390×844 phone, with JavaScript disabled and `prefers-reduced-motion: reduce`.

**Must deliver, in this reading order:**

| # | Element | Content | Source |
|---|---|---|---|
| 1 | `h1.hero__title` | Name + the locked typewriter | unchanged |
| 2 | `ul.hero__credential` | `CS @ UC SANTA CRUZ · [GRAD TERM] · [LOCATION]` — the routing facts | `availability` |
| 3 | `p.hero__sub` | The cashed-proof line: the concrete triple (broken bookings / unscored report / no website) | rewritten, §7 |
| 4 | `div.hero__actions` | **One** labelled action: `→ See the work` | rewritten, §7 |
| 5 | `p.status` | `Open to opportunities` (+ `· {seeking}` when supplied) | extended |
| 6 | `a.shell__cta` | The persistent ask: a filled `Email` pill in the fixed shell | new, §5.1 |

**Hard requirements for State A:**

- Every one of the six is **server-rendered HTML with its final text content**. None is inside `Reveal`. None is inside a pinned or scrubbed container. `curl` on `/` must return all six strings.
- The only motion permitted is the existing `rise` keyframe ladder (§8), which uses `both` fill — the elements are in the DOM, laid out, and at final position under `prefers-reduced-motion: reduce` or with JS off.
- The shell pill is **never scroll-gated** (unlike `.scroll-ring`, which appears past 0.4vh). It is present at first paint. It has no entrance animation of any kind.
- **Allowed to be absent at 20s:** any `availability` field Parth has not supplied (the credential line collapses to what exists — see §4), the copy-to-clipboard control (client-only, §5.4), the résumé (deliberately, §2.3), all project media, all case-study content.
- **Forbidden at 20s:** a second email affordance in flow, a résumé link, an "about me" link, any number or metric, any placeholder frame or "coming soon" chip.

**Failure test:** screenshot `/` at 1440×900 and 390×844 with `reducedMotion: "reduce"`, JS off. If graduation term and location are not legible in that image, State A has failed and the launch blocker in §11 is unresolved.

### State B — 2 minutes. Work + Experience, one card skim, possibly one case-study open.

**Definition:** the reader has scrolled the proof band (`#work` → `#experience`) and may have opened one case study and skimmed its headings.

**Must deliver:**

- Project cards that are **tiered**, not seven equal tiles — the flagship reads as the densest surface on the page, not the deadest. (Card structure belongs to the Work dimension; this dimension's requirement on it is one line: *the flagship card must have the strongest click target on the page, pointing at `/work/operations-agent`, and no repo affordance of any kind.*)
- Role · dates · tech per card, scannable as a column of one kind of fact.
- An Experience row naming the internship as employment, linking to the Operations Agent case study.
- **Zero in-flow email asks in this entire band.** The reader is evaluating; interrupting evaluation with an ask is what makes a portfolio read as a landing page. The chrome pill is on screen the whole time and is the only ask available here — that is precisely what it earns its fixed slot for.
- Case-study headings visible on skim: *Problem & context · What I built & how · Outcome & impact · Hardest technical challenge*. All four heading strings must be in the DOM at load (Cmd-F must find them) regardless of scroll position or scrub state.

**Forbidden in State B:** any pin between the hero and the work grid (motion Rule 10.1); any count-up, meter, ring or bar; any "coming soon" media placeholder that survives to launch.

### State C — 10 minutes. One full case study read to the bottom, then Contact.

**Definition:** the highest-intent moment on the site. The reader has finished the argument and is deciding whether to write.

**Must deliver:**

- The end of every case-study route is `CaseStudyClose` (§5.5): the **primary** email ask with a per-project subject, then `← Back to all work`, then `Next: <project> →`. No repo affordance in this block, ever — not even a disabled one, which would imply a repo exists.
- `#contact` on the homepage is the terminal, densest ask: proof lede → optional fact strip → the display-face address with the coral underline → copy control → secondary links (GitHub · LinkedIn · Résumé).
- The proof adjacent to the ask is the **`.contact__lede` sentence**, built only from `data/projects.ts` supplied truth (Operations Agent deployed inside a company; ScorelyAI used by DECA competitors). The fact strip is additive and collapses entirely when its fields are null. On launch day the strip is absent and the lede alone carries the proof — that is correct, not a gap.
- The footer stays exactly as it is: `© year · Back to the top`. Deliberately inert. No second CTA 100px below the first.

**Forbidden in State C:** the email ask behind a pin or a scrubbed range (motion Rule 10.3); a "next project" link that outranks the ask visually; a contact form.

### Deriving the surfaces from the path

| State | What the reader needs | Surface it gets |
|---|---|---|
| A | ask must be *available*, must not *interrupt* | chrome pill, quietest labelled thing on the fold |
| B | ask must be *out of the way* | chrome pill only; zero in-flow asks |
| C | ask must be *the loudest thing on screen* | `.ask__email` primary, display face + coral underline |

That gradient — availability → absence → dominance — is the whole design.

---

## 2. The conversion inventory and the nag invariant

### 2.1 Three classes of affordance

- **Chrome** — fixed, always present, never in document flow: `a.shell__cta`.
- **Disclosed** — present only when the reader opens something: `.menu__foot` email.
- **In-flow** — occupies document flow and is passed by scrolling: `.ask__email`.

### 2.2 The invariant (replaces the proposal's self-contradicting rule)

> **Exactly one in-flow email affordance per route. The chrome pill is exempt because it is chrome; the disclosed menu affordance is exempt because the reader opened it.**
>
> **Subordination:** whenever the chrome pill and an in-flow ask are on screen together, the in-flow ask's label `font-size` must be **≥ 1.6×** the pill's label `font-size`, and the in-flow ask must be the only email affordance on the page carrying `--signal`.

This is testable and always passes by construction:

| Route | chrome | disclosed | in-flow |
|---|---|---|---|
| `/` | 1 (shell pill) | 1 (menu foot) | **1** (`#contact`) |
| `/work/[slug]` | 1 (shell pill) | 1 (menu foot) | **1** (`CaseStudyClose`) |

Subordination arithmetic (both themes, both breakpoints):

- pill label: `0.875rem` = **14px**, fixed at every width (§5.1).
- `.ask__email`: `clamp(1.5rem, 2.6vw, 1.75rem)` (§6.3) → **24px** at 390px, **28px** at ≥1077px.
- ratio: 24/14 = **1.71** ✓ · 28/14 = **2.00** ✓.

The pill is also smaller than `.link-arrow` (1.0625rem = 17px), so it is quieter than the fold's route-to-evidence link too. That is intentional: at second zero the loudest labelled thing on the page routes to proof, not to the inbox.

### 2.3 Résumé placement, and why it is not in the fold

Résumé appears **twice**: `.contact__links` and `.menu__foot`. Email appears three times across three classes. Weight is explicit: email at Contact gets the display face and the 3px coral underline; résumé stays at `.link-arrow` weight (17px, body face, no accent) at both of its sites and nowhere else.

Résumé is **not** in the hero. A résumé download at second five is a worse outcome than a case-study read: it exports the reader to a PDF and off the site before any proof surface has done its work. Résumé's job is to *close*, not to *open* — so it lives where the reader is already convinced (Contact) and where a reader who went looking will find it in one keystroke or one tap (menu). This is what "résumé is secondary" means operationally.

---

## 3. `data/site.ts` — exact shape

```ts
import { links } from "@/data/projects";

/**
 * Site-level config that isn't project content.
 * (existing `resume` doc comment unchanged)
 */
export const resume = {
  path: "/resume.pdf",
  ready: true,
} as const;

/* ---------------------------------------------------------------------------
 * LAUNCH BLOCKERS — every field below is null until Parth supplies it.
 *
 * A recruiter cannot route a candidate to a requisition without a graduation
 * term, a location, and work authorization. That is the single highest-cost
 * omission on this site. None of these may be inferred from the ucsc.edu
 * domain, from "summer 2026 internship", or from anything else. UCSC offers
 * both a B.S. and a B.A. in Computer Science plus adjacent majors, so even the
 * degree type is unsupplied.
 *
 * Ship state: fields that are null are FILTERED OUT of the rendered list.
 * They never render as an empty slot, a dash, or a "coming soon" chip — a
 * pending graduation date reads as abandoned, not as honest.
 * ------------------------------------------------------------------------- */
export type Availability = {
  /** Confirmed in PRODUCT.md § Evidence on Hand. The only non-null literal. */
  school: string;
  /** "B.S. Computer Science" vs "B.A." — NOT supplied. */
  degree: string | null;
  /** e.g. "Grad June 2027" — NOT supplied. */
  gradTerm: string | null;
  /** e.g. "Santa Cruz, CA · open to relocation" — NOT supplied. */
  location: string | null;
  /** e.g. "New-grad SWE, agentic systems" — NOT supplied. */
  seeking: string | null;
  /** e.g. "Available June 2027" — NOT supplied. */
  startDate: string | null;
  /** e.g. "US citizen" — NOT supplied. */
  workAuth: string | null;
  /** e.g. "Replies within a day" — owner-supplied only. */
  responseTime: string | null;
};

export const availability: Availability = {
  school: "UC Santa Cruz",
  degree: null,
  gradTerm: null,
  location: null,
  seeking: null,
  startDate: null,
  workAuth: null,
  responseTime: null,
};

/**
 * Every email href on the site routes through here.
 *
 * Subject only, never a body: a prefilled body puts words in a recruiter's
 * mouth, breaks signature-block behaviour in several clients, and makes an
 * outreach email read like a form submission.
 *
 * The subject is written in the SENDER's voice, not Parth's. "Hi Parth — …"
 * would title the recruiter's own thread (and, in an ATS or shared inbox,
 * a permanent record) with copy the candidate wrote.
 */
export function mailtoHref(context?: string): string {
  const subject = context
    ? `Portfolio — Parth Doshi (${context})`
    : "Portfolio — Parth Doshi";
  return `mailto:${links.email}?subject=${encodeURIComponent(subject)}`;
}
```

No `as const` on `availability` — it would narrow every `null` to the literal type `null` and make tomorrow's string assignment a type error.

---

## 4. `components/CredentialLine.tsx` — exact spec

One component, two surfaces, **different field sets per surface**. It never renders the same string twice on one page.

```tsx
import { availability, type Availability } from "@/data/site";

type Field = keyof Availability;

const RENDER: Partial<Record<Field, (v: string) => string>> = {
  school: (v) => `CS @ ${v}`,
};

export default function CredentialLine({
  fields,
  className,
}: {
  fields: readonly Field[];
  className: string;
}) {
  const items = fields
    .map((f) => {
      const v = availability[f];
      if (!v) return null;
      return { key: f, text: (RENDER[f] ?? ((s: string) => s))(v) };
    })
    .filter((x): x is { key: Field; text: string } => x !== null);

  if (items.length === 0) return null; // collapse, never an empty element

  return (
    <ul className={`credential ${className}`}>
      {items.map((i) => (
        <li key={i.key}>{i.text}</li>
      ))}
    </ul>
  );
}
```

**Why `ul`/`li` and not a `<p>` with text nodes:** in a flex container every bare text node becomes an anonymous flex item, so a `column-gap` is inserted around each separator and the line can wrap at arbitrary points inside a fact. List items are real flex items with no anonymous siblings.

**Separator mechanics:** the `·` is CSS generated content on `li:not(:last-child)::after`, so it lives *inside* the preceding item. It can never be orphaned onto its own line and can never be pushed away from its neighbour by a gap. `column-gap` is therefore **0** — all horizontal spacing comes from the dot's own margins, which makes both consumer layouts identical in mechanics.

**Call sites:**

| Surface | `fields` | `className` | Launch-day output |
|---|---|---|---|
| Hero | `["school", "gradTerm", "location"]` | `hero__credential` | `CS @ UC SANTA CRUZ` |
| Contact | `["seeking", "startDate", "workAuth", "responseTime"]` | `contact__facts` | *nothing — component returns `null`* |

The two sets are disjoint. Contact never re-prints the fold. On launch day Contact's strip does not render at all, and the proof adjacent to the ask is the `.contact__lede` sentence, which is the design's intent regardless.

---

## 5. Components

### 5.1 `components/EmailCTA.tsx`

No server/client label — the primary consumer (`Shell.tsx`) is `"use client"`, so anything imported there is client-bundled regardless. `CopyEmail` is the only file in this layer carrying `"use client"`.

```tsx
import { links } from "@/data/projects";
import { mailtoHref } from "@/data/site";
import { Mail } from "@/components/Icon";
import CopyEmail from "@/components/CopyEmail";

type Props = {
  /** Required. No default — every call site is a deliberate weight choice. */
  variant: "shell" | "inline" | "primary";
  /** Context for the prefilled subject, e.g. a project name. */
  context?: string;
  className?: string;
};

export default function EmailCTA({ variant, context, className }: Props) {
  const href = mailtoHref(context);

  if (variant === "shell") {
    return (
      <a className={`shell__cta ${className ?? ""}`} href={href}>
        <Mail />
        <span>Email</span>
      </a>
    );
  }

  if (variant === "inline") {
    return (
      <a className={`link-arrow ${className ?? ""}`} href={href}>
        <Mail />
        Email me
      </a>
    );
  }

  return (
    <>
      <a className="ask__email" href={href}>
        {links.email}
      </a>
      <div className="ask__copy-slot">
        <CopyEmail />
      </div>
    </>
  );
}
```

- No `target="_blank"` and no `rel` on any `mailto:`.
- Focus ring is inherited from the global `:focus-visible` (3px `--signal`, offset 3px, radius 4px). Do not override it on any of the three variants.
- `inline` is defined but has **no call site on launch**. It exists so a future in-flow ask cannot be built by copy-pasting `primary` into the middle of a page and silently breaking the invariant in §2.2.

### 5.2 `components/Icon.tsx` — three additions

All three in the house construction exactly as the existing three: `viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"`, `className = "icon"` default. Authored geometry only — no glyph, no emoji, no imported set. These are peers of `ArrowRight`, **not** of the Simple Icons brand-mark register that the Work dimension introduces.

```tsx
export function Mail({ className = "icon" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" stroke="currentColor"
      strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2.5" y="4.5" width="15" height="11" rx="2.5" />
      <path d="M3.5 6.5 10 11l6.5-4.5" />
    </svg>
  );
}

export function Copy({ className = "icon" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" stroke="currentColor"
      strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="7" y="7" width="10" height="10" rx="2.5" />
      <path d="M13 4.5A1.5 1.5 0 0 0 11.5 3H4.5A1.5 1.5 0 0 0 3 4.5v7A1.5 1.5 0 0 0 4.5 13" />
    </svg>
  );
}

export function ArrowLeft({ className = "icon" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" stroke="currentColor"
      strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M17 10H4M9 5 4 10l5 5" />
    </svg>
  );
}
```

`ArrowLeft` is the exact mirror of `ArrowRight`'s path so the pair reads as one drawing.

### 5.3 `components/CopyEmail.tsx`

```tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { links } from "@/data/projects";
import { Copy } from "@/components/Icon";

export default function CopyEmail() {
  const [supported, setSupported] = useState(false);
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Read AFTER mount, in state. Evaluating navigator during render makes the
  // server emit nothing and the hydration render emit a button — a mismatch.
  useEffect(() => {
    setSupported(typeof navigator?.clipboard?.writeText === "function");
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  if (!supported) return null;

  return (
    <button
      type="button"
      className="ask__copy"
      data-copied={copied || undefined}
      onClick={async () => {
        await navigator.clipboard.writeText(links.email); // bare address, never the mailto href
        setCopied(true);
        if (timer.current) clearTimeout(timer.current);
        timer.current = setTimeout(() => setCopied(false), 1600);
      }}
    >
      <Copy />
      <span aria-live="polite">{copied ? "Copied" : "Copy address"}</span>
    </button>
  );
}
```

- The control appears one frame after paint. That is accepted and there is **zero layout shift**, because `EmailCTA` always renders `<div class="ask__copy-slot">` (server-side) with a fixed `min-height: 32px` — the button materialises *into* reserved space. An unsupported context leaves a 32px transparent gap, which is invisible, not an empty state.
- `navigator.clipboard` is secure-context only, so the button is legitimately absent on `http://` LAN previews. This is documented behaviour, not a bug — do not "fix" it into an unguarded version that throws.
- The confirmed state uses full `--ink`, **not** coral, so no seventh entry is needed in The One Accent Rule for a 1600ms micro-state.

### 5.4 `components/Shell.tsx` — exact changes

```tsx
"use client";
import { usePathname, useRouter } from "next/navigation";
import { projects } from "@/data/projects";
import { mailtoHref } from "@/data/site";
import EmailCTA from "@/components/EmailCTA";

const items = [
  { id: "work",       label: "Work",       key: "1" },
  { id: "experience", label: "Experience", key: "2" },
  { id: "stack",      label: "Stack",      key: "3" },
  { id: "about",      label: "About",      key: "4" },
  { id: "contact",    label: "Contact",    key: "5" },
] as const;
```

1. **Route awareness.** `const pathname = usePathname(); const onHome = pathname === "/";`
   `const caseSlug = pathname.startsWith("/work/") ? pathname.slice("/work/".length) : null;`
   `const caseName = caseSlug ? projects.find(p => p.slug === caseSlug)?.name : undefined;`

2. **The pill, first child of `.shell__tools`, before `<ThemeToggle />`** — so the primary action is second in tab order after the monogram:
   `<EmailCTA variant="shell" context={caseName} />`
   On a case-study route the pill's subject carries the project name, so the most likely click reports which case study converted. On the homepage it carries no context.

3. **Monogram href.** `Monogram` gains a `href` prop; `Shell` passes `onHome ? "#top" : "/"`. `href="#top"` is dead on a subroute; this is the shell's back-to-site affordance, alongside the explicit `← Back to all work` in the close block.

4. **Menu hrefs.** `href={onHome ? \`#${item.id}\` : \`/#${item.id}\`}`.

5. **Key handler off-homepage.** After `const item = items.find(...)`:
   ```ts
   const el = document.getElementById(item.id);
   if (el) el.scrollIntoView({ behavior: "auto", block: "start" });
   else router.push(`/#${item.id}`);
   ```
   Keyboard-initiated navigation stays instant (`behavior: "auto"`) on every route, per the standing rule.

6. **Menu foot email.** `<a href={mailtoHref(caseName)}>{links.email}</a>` — replaces the bare `mailto:${links.email}`.

### 5.5 `components/CaseStudyClose.tsx`

```tsx
import type { Project } from "@/data/projects";
import EmailCTA from "@/components/EmailCTA";
import { ArrowLeft, ArrowRight } from "@/components/Icon";

export default function CaseStudyClose({
  project,
  next,
}: {
  project: Project;
  next?: Project;
}) {
  return (
    <section className="section ask" aria-labelledby="ask-title">
      <h2 className="section__title ask__title" id="ask-title">
        Want the details?
      </h2>
      <p className="ask__lede">
        I can walk through the architecture and the decisions behind{" "}
        {project.name} in as much depth as you want.
      </p>

      <EmailCTA variant="primary" context={project.name} />

      <nav className="ask__nav" aria-label="More work">
        <a className="link-arrow" href="/#work">
          <ArrowLeft />
          Back to all work
        </a>
        {next && (
          <a className="link-arrow" href={`/work/${next.slug}`}>
            Next: {next.name}
            <ArrowRight />
          </a>
        )}
      </nav>
    </section>
  );
}
```

- `ArrowLeft` **leads** on Back; `ArrowRight` **trails** on Next. The two opposite navigations are now visually opposite. (The proposal's decisions block and implementation block disagreed with each other and the icon did not exist.)
- **No repo affordance in this block on any project**, and specifically none on Operations Agent — not even `is-pending`, because a disabled GitHub link asserts that a repo exists. That is a PRODUCT constraint 2 violation and a `craft-floor` L48 defect simultaneously.
- No `Reveal`, no scroll timeline, no pin anywhere in this section. Motion Rule 10.3.
- No heading eyebrow, no section number. The template makes the slot structurally unavailable — there is no prop for one.

### 5.6 `components/Contact.tsx` — rewritten body

```tsx
<section className="section contact ask" id="contact" aria-labelledby="contact-title">
  <h2 className="section__title ask__title contact__title" id="contact-title">
    Let&rsquo;s talk.
  </h2>

  <p className="ask__lede">
    I&rsquo;ve shipped an agent inside a company&rsquo;s operations team and an
    evaluator that DECA competitors actually use. If either of those is the kind
    of thing your team needs, write to me.
  </p>

  <CredentialLine
    fields={["seeking", "startDate", "workAuth", "responseTime"]}
    className="contact__facts"
  />

  <EmailCTA variant="primary" />

  <div className="contact__links">
    <a className="link-arrow" href={links.github} target="_blank" rel="noreferrer">GitHub<ArrowUpRight /></a>
    <a className="link-arrow" href={links.linkedin} target="_blank" rel="noreferrer">LinkedIn<ArrowUpRight /></a>
    <ResumeLink />
  </div>
</section>
```

The lede uses only supplied truth: "deployed inside a company's operations team" (PRODUCT.md §Evidence, Operations Agent) and "in use by DECA competitors" (`data/projects.ts` label + PRODUCT.md). **It must be re-derived against the final project labels** when the Work dimension normalises them, and "in use by DECA competitors" must never drift into a count.

---

## 6. Exact CSS — `app/globals.css`

### 6.1 The shell pill (Shell block, after `.shell__tools`)

The pill is a **filled** control, not glass. This is the deliberate fix for the dark-mode failure: the proposal's emphasis mechanism was "the only element in the shell with a 1px `--glass-edge` border", and in dark `--glass-edge` is `rgb(255 255 255 / 0.14)` over `--glass` at `0.07` on `#191a2e` — effectively invisible. A filled `--ink` pill reads at **7.8:1** against the light ground and **14:1** against the dark ground, needs no theme-specific override, needs no blur, and — being solid ink rather than coral or a blob stop — requires no amendment to The One Accent Rule or The Ground-Only Iridescence Rule. It also removes a fourth `backdrop-filter` surface from the page entirely, which retires that whole performance risk.

```css
/* The site's one filled control. Solid ink, not glass: in dark, a
 * --glass-edge border over --glass is invisible, and this pill carries the
 * page's single primary action in both themes. No backdrop-filter — an opaque
 * fill needs none, and this keeps the blurred-surface count at three. */
.shell__cta {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  height: 40px;
  padding: 0 14px;
  border-radius: 999px;
  background: var(--ink);
  color: var(--white);
  font-size: 0.875rem;
  font-weight: 600;
  line-height: 1;
  letter-spacing: 0.01em;
  text-decoration: none;
  white-space: nowrap;
  transition:
    background 200ms var(--ease-out),
    transform 160ms var(--ease-out);
}

.dark .shell__cta {
  /* --ink is near-white here; the label takes the ground so the pill inverts
   * cleanly rather than going transparent. */
  color: var(--ground);
}

.shell__cta .icon {
  width: 18px;
  height: 18px;
}

.shell__cta:active {
  transform: scale(0.97);
}

@media (hover: hover) and (pointer: fine) {
  .shell__cta:hover {
    background: color-mix(in oklab, var(--ink) 88%, var(--ground));
  }
}
```

Width budget at 390px: monogram 38 + gap + pill ≈ 92 + 6 + toggle 40 + 6 + menu 40, inside `padding: 16px 18px` → ≈ 258px of 390px. 132px slack. The label is kept at every width; an icon-only mail button is ambiguous and loses the only word that names the primary action.

### 6.2 Credential line (new block, after `.hero__sub`)

```css
/* One DOM shape, two surfaces. List items rather than text nodes: bare text
 * in a flex container becomes anonymous flex items, which puts the column-gap
 * around every separator and lets the line wrap inside a fact. The separator
 * is generated content INSIDE the preceding item, so it can never be orphaned
 * onto its own line — which is why column-gap is 0 and the dot's own margin
 * does all the spacing. */
.credential {
  display: flex;
  flex-wrap: wrap;
  column-gap: 0;
  row-gap: 6px;
  margin: 0;
  padding: 0;
  list-style: none;
  font-family: var(--font-body-stack);
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1.3;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--ink-2);
}

.credential li:not(:last-child)::after {
  content: "·";
  margin: 0 0.62em;
  color: color-mix(in oklab, var(--ink-2) 55%, transparent);
}

.hero__credential {
  justify-content: var(--hero-align);
  margin-top: 18px;
}

.contact__facts {
  justify-content: center;
  margin: 22px auto 0;
  max-width: 46ch;
}
```

Verify wrap at 320px with all three hero facts present.

### 6.3 The primary ask (replaces the `.contact__email` rule outright)

`.contact__email` is **deleted**. The primary treatment is defined once as `.ask__email` and used by both Contact and `CaseStudyClose`, so the two cannot diverge.

```css
.ask {
  text-align: center;
}

.ask__title {
  font-size: clamp(2.25rem, 6.5vw, 4.5rem);
}

.ask__lede {
  margin: 22px auto 0;
  max-width: 40ch;
  font-size: 1.0625rem;
  color: var(--ink-2);
}

.ask__email {
  display: inline-block;
  max-width: 100%;
  margin-top: 26px;
  font-family: var(--font-display-stack);
  /* Floor raised from 1rem: at 390px the old floor put the primary ask at
   * 16px against the 14px shell pill, which fails the subordination relation
   * (in-flow label >= 1.6x the pill). 24px / 14px = 1.71. */
  font-size: clamp(1.5rem, 2.6vw, 1.75rem);
  font-weight: 600;
  letter-spacing: 0.005em;
  color: var(--ink);
  text-decoration: underline;
  text-decoration-thickness: 3px;
  text-decoration-color: var(--signal);
  text-underline-offset: 10px;
  transition: text-decoration-color 200ms var(--ease-out);
  /* Not `break-all`: that split pmdoshi@ucsc.edu mid-address and made the
   * primary CTA look broken. `anywhere` breaks only when it must, and the
   * 16-character address never must at any width this site supports. */
  overflow-wrap: anywhere;
}

@media (hover: hover) and (pointer: fine) {
  .ask__email:hover {
    text-decoration-color: var(--ink);
  }
}

/* Always rendered, always 32px: CopyEmail mounts into reserved space, so its
 * one-frame-late arrival shifts nothing. */
.ask__copy-slot {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 32px;
  margin-top: 14px;
}

.ask__copy {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 5px 12px;
  border: 1px solid var(--border);
  border-radius: 999px;
  background: transparent;
  color: var(--ink-2);
  font-family: var(--font-body-stack);
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  cursor: pointer;
  transition:
    color 200ms var(--ease-out),
    border-color 200ms var(--ease-out),
    transform 160ms var(--ease-out);
}

.ask__copy .icon {
  width: 14px;
  height: 14px;
}

/* Confirmed state is ink, not coral: a 1600ms micro-state does not earn a
 * seventh entry in The One Accent Rule. */
.ask__copy[data-copied] {
  color: var(--ink);
  border-color: color-mix(in oklab, var(--ink) 40%, transparent);
}

.ask__copy:active {
  transform: scale(0.97);
}

.ask__nav {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 12px 24px;
  max-width: 640px;
  margin: 40px auto 0;
}
```

`.contact { text-align: center; padding-top: 96px; padding-bottom: 128px; }` and `.contact__links` are unchanged. `.contact__title` keeps its selector but its `font-size` rule is now redundant with `.ask__title` — delete the duplicate declaration and leave the class on the element for the ID hook.

### 6.4 The hero alignment seam

```css
.hero {
  /* Set to `start` by the hero-layout dimension when it left-aligns. Every
   * conversion element in the fold reads this one property, so alignment can
   * never desync between the headline and the actions. */
  --hero-align: center;
  ...
  justify-items: var(--hero-align);
  text-align: var(--hero-align);
}

.hero__actions {
  justify-content: var(--hero-align);
}
```

`grid-template-columns: minmax(0, 1fr)` on `.hero` and `max-width: 100%` on `.hero__title` are **load-bearing under both values** and stay exactly as written — the two comments at globals.css:683-685 and 695-697 record the regressions where the h1 returned to `max-content` sizing and the roll slot escaped `overflow: clip`. Verify the `start` path against both at 1280px and 390px.

---

## 7. `components/Hero.tsx` — exact changes

1. Insert immediately after `</h1>`, before `.hero__sub`:
   ```tsx
   <CredentialLine fields={["school", "gradTerm", "location"]} className="hero__credential" />
   ```
   Not inside `Reveal` (the hero does not use it), not inside any pin.

2. **Rewrite `.hero__sub`.** Current copy ends "— and getting more out of AI than most", an unsourced comparative claim that reads as the hype the recruiter survey warns about. Replacement, exact text:

   > CS student at UC Santa Cruz building autonomous agents that take real work off people's plates — an operations team's broken bookings, a DECA competitor's unscored report, a small business without a website.

   This cashes the locked "obsessed with AI" phrase against three shipped systems inside the same viewport as the claim, which is the whole reason the survey flags that phrase as two-way. Every clause traces to `data/projects.ts`. Measure stays at 46ch; at 390px this runs to five lines, so **verify the fold at 390×844** with credential + sub + actions + status all present against `min-height: min(100svh, 620px)`.

3. **Replace `.hero__actions` with one action:**
   ```tsx
   <div className="hero__actions">
     <a className="link-arrow" href="#work">
       <ArrowRight />
       See the work
     </a>
   </div>
   ```
   `more about me` is cut — it competes with the primary route, and About is one keystroke away in the menu and directly in the scroll path. No résumé link, no inline email link (see §2.3 and §12).

4. **Status line:** append `seeking` when supplied.
   ```tsx
   <p className="status">
     <span className="status__dot" aria-hidden="true" />
     Open to opportunities{availability.seeking ? ` · ${availability.seeking}` : ""}
   </p>
   ```

---

## 8. Motion — exact values

The conversion layer adds **no new animation type**. It joins one existing ladder and presses like every other control.

### 8.1 Hero rise ladder, re-indexed

`.hero__credential` joins the existing `rise 600ms var(--ease-out) both` ladder. It is not left static in a stack that rises around it, and it is not excluded on "first paint" grounds — the `both` fill plus server rendering already satisfies the State A requirement, and the reduced-motion block already drops it to static.

```css
@media (prefers-reduced-motion: no-preference) {
  .hero__line,
  .hero__credential,
  .hero__sub,
  .hero__actions,
  .status {
    animation: rise 600ms var(--ease-out) both;
  }
  .hero__line--roll   { animation-delay:  60ms; }
  .hero__credential   { animation-delay: 120ms; }
  .hero__sub          { animation-delay: 180ms; }
  .hero__actions      { animation-delay: 240ms; }
  .status             { animation-delay: 300ms; }
}
```

Steps stay 60ms, inside the 30–80ms stagger rule. Last element completes at 900ms.

### 8.2 Everything else

| Element | Property | Duration | Curve |
|---|---|---|---|
| `.shell__cta` background (hover) | `background` | 200ms | `var(--ease-out)` |
| `.shell__cta` press | `transform: scale(0.97)` | 160ms | `var(--ease-out)` |
| `.ask__email` underline (hover) | `text-decoration-color` | 200ms | `var(--ease-out)` |
| `.ask__copy` color/border | `color, border-color` | 200ms | `var(--ease-out)` |
| `.ask__copy` press | `transform: scale(0.97)` | 160ms | `var(--ease-out)` |
| `.ask__copy` confirmed state | attribute swap, no animation | 1600ms hold | — |

- The shell pill has **no entrance animation and no scroll gate**. It is chrome; chrome that materialises reads as a pop-up prompt.
- Every hover rule sits inside `@media (hover: hover) and (pointer: fine)`.
- No keyframes are added. Nothing here is ambient, so the two-item ambient budget (roll + blob drift) is untouched.
- No conversion surface is inside a pin, a scrubbed range, or a `Reveal`. Motion Rules 10.3 and 6.1 both.

---

## 9. Link grammar — the amendment DESIGN.md § Links needs

Four cases, each visually distinct:

| Case | Arrow | Position | Example |
|---|---|---|---|
| In-page anchor (same document) | `ArrowRight` | **leading** | `→ See the work`, `→ Back to all work`* |
| Route navigation, forward | `ArrowRight` | **trailing** | `Next: SantaClaws →` |
| Route navigation, backward | `ArrowLeft` | **leading** | `← Back to all work` |
| Outbound (leaves the site) | `ArrowUpRight` | **trailing** | `GitHub ↗` |
| Download | `ArrowDown` | **trailing** | `Résumé ↓` |

\* `/#work` from a case study is backward route navigation and takes `ArrowLeft`. The in-page and forward-route cases share a glyph but never a position, and never appear adjacent in the same row.

This resolves the records survey's open item ("an internal *route* link is neither case") and the proposal's internal contradiction in one rule.

---

## 10. Metadata and OG — decided, with the image routes deferred

**Ship now (zero cost, no binary):**

- `app/layout.tsx` `metadata` gains `openGraph: { title, description, type: "website", url }` and `twitter: { card: "summary_large_image" }`, drawing text only from the existing `title`/`description`.
- Each case-study route ships `generateMetadata` returning `title: \`${project.name} — Parth Doshi\`` and `description: project.tagline`, plus the same `openGraph` block from those two fields. No invented tagline, no invented metric.

**Defer to the content pass:** `app/opengraph-image.tsx` and `app/work/[slug]/opengraph-image.tsx`. `ImageResponse` cannot consume `next/font/google` CSS variables, so Unbounded must ship as a fetched-at-build or bundled font buffer — a new binary asset requiring recorded provenance under the repo's asset doctrine. That cost is not worth paying against a card that today would render a name and "CS @ UC SANTA CRUZ". Record the decision and the cost; build the routes once `availability` and the normalised project labels are real, and render in Unbounded from a buffer — never in a system fallback face, which reads worse for a forwarded link than a plain URL.

---

## 11. Section order, and what it costs

`app/page.tsx`:

```tsx
<Hero /> <Work /> <Experience /> <Stack /> <About /> <Contact />
```

**This is an insertion, not a reorder.** The current order is Hero → Work → Stack → About → Contact; inserting Experience directly after Work produces exactly the above. Consequences:

- `#work`, `#stack`, `#about`, `#contact` deep links all survive unchanged.
- Work and Experience are contiguous — the proof band.
- Stack sits after the projects it describes rather than before them.
- **About stays adjacent to Contact**, which is the right emotional adjacency before the ask.
- The only cost is keycaps: work/1 unchanged, experience/2 new, stack 2→3, about 3→4, contact 4→5. That cost is forced by the locked Experience decision regardless of this dimension, so it is not attributable to the conversion layer. It must land in the **same PR** as the Experience section's own keycap decision.
- DESIGN.md § Navigation is regenerated (not hand-edited) in that PR.

---

## 12. Where I depart from the adversarial review

**1. On the hero action row, I take neither of the reviewer's two options.** The review offered "keep a single route and leave résumé to Contact and the menu" *or* "give the hero an explicit inline email ask that outranks résumé visually," and demanded "do not ship a fold where résumé is the loudest labelled action."

I take the first option and reject the framing behind the second. The locked decision is that email is the single primary **conversion action** — it does not say email must be the visually loudest thing in the first viewport. Ranking an email ask above "See the work" at second zero asks a recruiter to make contact before a single piece of evidence has been delivered, which the recruiter survey names explicitly as the classic student-portfolio failure. What makes email primary is that it is the only action present in **every viewport of every route** — that is a stronger claim to primacy than being big once. So: no inline email in the fold, no résumé in the fold, one labelled in-flow action (`See the work`), and the chrome pill re-specified as a filled ink control that reads at ≥7.8:1 in both themes so it is unmistakably a control rather than a decoration. The reviewer's actual defect — a fold where résumé is the loudest label — is fixed by removing résumé from the fold entirely, not by escalating email.

**2. The reviewer's premise correction is accepted in full.** `components/Hero.tsx` lines 69-76 render `see my work` and `more about me`; there is no email link in the hero today. The proposal's "Email is REMOVED from `.hero__actions`" removed nothing and its rationale described a duplication that did not exist. The rationale text above is rewritten from the true starting state.

**3. On the section order, I disagree that a reorder is happening at all.** The reviewer's alternative fix — "leave the order alone: the reorder costs the keycap map, `#stack` deep links, a DESIGN.md regeneration and a collision with the Experience dimension" — is aimed at a change that does not occur under the corrected order. Inserting Experience after Work yields `Hero → Work → Experience → Stack → About → Contact` with no element moved relative to any other, no hash broken, and a keycap shift that the Experience decision already forces. The reviewer's own preferred placement and this one are the same order; I am noting only that its cost is zero rather than substantial.

Everything else in the review — the missing scanning path, the self-contradicting nag budget, the fabricated degree, the flex text-node bug, the duplicated credential line, the `CopyEmail` hydration mismatch, the dark-mode pill, the arrow contradiction and missing `ArrowLeft`, the rise ladder, the `as const` type error, the subject voice and unthreaded shell context, the `nowrap` guard, résumé parity, the server/client mislabel, the deferred OG routes, and the off-homepage menu — is accepted and fixed above.

---

## 13. Launch blockers — questions for Parth, tomorrow, in priority order

These are not nice-to-haves. Without the first three, State A fails and the site's highest-cost omission ships.

1. **Graduation term** (e.g. "June 2027") — `availability.gradTerm`.
2. **Location + relocation posture** — `availability.location`.
3. **Work authorization** — `availability.workAuth`.
4. **Target role and start date** — `availability.seeking`, `availability.startDate`. `seeking` also extends the hero status line.
5. **Degree type** — B.S. or B.A. Computer Science. Not inferable.
6. Can he **name the internship company**? Most internship NDAs cover code and customer data, not the fact of employment. If genuinely not, the fallback is the industry and shape, never a nameless void.
7. Which **subsystems of the Operations Agent were his** vs. his partner's. "We built" with no split is where a hiring manager stops believing.
8. Does he want a **response-time line** at Contact (`availability.responseTime`)? Owner-supplied only.
9. **Approval of the rewritten About first paragraph** (below). The hero now carries the broken-bookings / unscored-report / no-website triple, so About must not repeat it verbatim two sections later. Drafted replacement for the first paragraph, which keeps the thread word and hands the concrete examples to the hero:

   > I'm a computer science student at UC Santa Cruz. The thread through everything I make is **leverage**: pointing AI and solid engineering at a problem that is currently costing a real person real time, and taking it off their plate for good.

   Paragraphs two and three are unchanged. The volleyball/mentoring sentence gains no team, league, level or program. This copy is Parth's register to approve — ship the current paragraph if he prefers it and instead trim the hero sub to a single example.

---

## 14. Risks carried into implementation

1. **`availability` fields 1–5 above are launch blockers.** If unsupplied, `hero__credential` degrades to `CS @ UC SANTA CRUZ` — barely more than the h1 already says — and Contact's fact strip does not render at all. The site is shippable in that state but the recruiter survey's top-ranked defect ships with it.
2. **`mailto:` fails silently with no mail client bound.** `CopyEmail` covers only the `primary` variant; a click on the chrome pill on such a machine produces nothing and no feedback. Accepted deliberately — a copy button in the fixed shell is two controls for one action — but it is a real hole in the always-present affordance.
3. **`navigator.clipboard` is secure-context only.** The copy button will be absent on `http://` LAN previews and a reviewer testing from a phone on the local network will report it missing. This is documented behaviour; do not remove the guard.
4. **The `.contact__lede` proof sentence paraphrases `data/projects.ts` labels**, which the Work dimension is rewriting. Re-derive it against the final labels before ship, and hold "in use by DECA competitors" at exactly that scope — no count, ever.
5. **`--hero-align: start`** must be verified against globals.css:683-685 and 695-697. Left-aligning touches the same grid that produced both recorded regressions. Screenshot at 1280, 1366, 1440 and 390 before accepting.
6. **`.ask__email` floor raise to `1.5rem`** was measured against `pmdoshi@ucsc.edu` (16 chars) at 390px: ≈238px in a 350px column. If the address ever changes, re-measure; `overflow-wrap: anywhere` will wrap rather than overflow, but the underline will then run across two lines.
7. **The `inline` EmailCTA variant has no call site.** A future contributor could use it to add a second in-flow ask and silently break the §2.2 invariant. There is no test suite, so the invariant must be written into DESIGN.md verbatim, in the same PR, as the enforcement mechanism.
8. **Shell now imports `usePathname`/`useRouter` and `projects`.** `Shell` is rendered in `app/layout.tsx` and is client-side on every route, so the project list joins the client bundle. It is a small static array; if it grows, thread only `{slug, name}` through a derived export rather than importing the whole module.
9. **Deleting `.contact__email` in favour of `.ask__email`** touches a rule two dimensions may be editing. Land the CSS rename and the `Contact.tsx`/`CaseStudyClose.tsx` call sites in one commit.

---

## 15. Files touched

| Path | Action |
|---|---|
| `/Users/ParthDoshi/csProjects/portfolio/.claude/worktrees/impeccable-teach/data/site.ts` | add `Availability` type, `availability`, `mailtoHref()` |
| `.../components/Icon.tsx` | add `Mail`, `Copy`, `ArrowLeft` |
| `.../components/EmailCTA.tsx` | **new** |
| `.../components/CopyEmail.tsx` | **new** (`"use client"` — the only one in this layer) |
| `.../components/CredentialLine.tsx` | **new** |
| `.../components/CaseStudyClose.tsx` | **new** |
| `.../components/Monogram.tsx` | accept `href` prop |
| `.../components/Shell.tsx` | pill, route awareness, 5 items, menu hrefs, key fallback, menu-foot subject |
| `.../components/Hero.tsx` | credential line, sub rewrite, single action, status extension |
| `.../components/Contact.tsx` | ask block, proof lede, fact strip, `EmailCTA variant="primary"` |
| `.../components/About.tsx` | first paragraph replaced (pending Parth's approval, §13.9) |
| `.../app/page.tsx` | insert `<Experience />` between Work and Stack |
| `.../app/layout.tsx` | `openGraph` + `twitter` in `metadata` |
| `.../app/globals.css` | `.shell__cta`, `.credential`/`.hero__credential`/`.contact__facts`, `.ask*` block replacing `.contact__email`, `--hero-align` seam, re-indexed rise ladder |
| `.../DESIGN.md` | regenerated — § Links (four-case arrow grammar), § Navigation (five keycaps), the §2.2 invariant, the filled-pill exception to the glass vocabulary |
| `.../PRODUCT.md` | § Evidence on Hand gains the `availability` fields as outstanding; line 22 corrected (it still says the sport and mentoring were not supplied; line 63 says they were, 2026-09-02) |
| `.../.impeccable/surfaces/homepage.md` | § Audience/Job/Action rewritten: email is the single primary, résumé and links secondary — it currently lists three co-equal primaries |