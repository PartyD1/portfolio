---
version: 1
slug: "homepage"
primary_target: "homepage"
related_targets: []
---

# Homepage

## Scope & Mode

Portfolio landing surface, and the entry point to the `/work/[slug]` case-study route. Mode: Experience (portfolio/showcase), carrying Persuade-grade scanability for the recruiter audience. Sections: Hero → Work → Experience → Stack → About → Contact.

## Audience, Job, Action, Proof, Constraints

- Audience: recruiters/hiring managers screening fast; peers/professional network browsing casually. Both must be served at once.
- Job: judge technical depth and agentic-systems credibility quickly.
- **Action — one primary: email.** Résumé and GitHub/LinkedIn are secondary everywhere and are never given display type or the coral accent. Opening a case study is the *path* to the primary, not a co-primary: the bottom of a case study is the highest-intent moment on the site, which is why the email CTA repeats there.
- Proof/content: 7 real projects (Operations Agent flagship — no public repo, case-study only), each with its own page; one employment row; Parth's own 29-tool stack in his own grouping; confirmed GitHub, LinkedIn, email; résumé live at `public/resume.pdf`.
- Constraints: never fabricate metrics/testimonials/adoption numbers; no tool→project mapping and no fluency ordering exist, so neither may be inferred; volleyball and mentoring younger kids are supplied, but no team, league, level or program is.

## Chosen Direction & Memorable Moment

User-pinned reference world — Sharlee's holographic blobs lead (`.impeccable/references/ref-2-sharlee-holographic-blobs.png`). Memorable moment: the outline-and-fill headline, where "HEY, I'M" stays hollow against the filled name, and a secondary line beneath rolls through Parth's six self-descriptions, landing on "obsessed with AI" in the accent.

## Execution Contract

No image generation exists in this environment — code-led (stated, not asked). The FIRST VIEWPORT block and the named signature interaction carry the ambition the finish review audits.

## Superseded

1. Mission Control / Ops Console (seed b925b460) — locked, then superseded by the user's pinned references.
2. Editorial grotesk (Archivo, stone/sand/deep-green) — shipped, then superseded on 2026-09-01 when the user pinned Sharlee's holographic reference and asked to go "full holographic".
3. A Hobbies section — planned, then cut: with no photos or detail it would be the only content-free section, and About plus the hero's rolling phrases already carry the personality.

## Unresolved Decisions

- ~~One About sentence grounding "an athlete" and "a mentor" — blocked on the sport and the mentoring context.~~ **RESOLVED 2026-09-02:** volleyball, and mentoring younger kids. No team, league, level or program was supplied; the sentence stays at that grain.
- Whether Tailwind stays under "Languages" (the user's own grouping) or moves to Frameworks.
- **Per-project tech mapping is blocked on Parth.** The slot ships built; the row is **absent, not skeletal**, until the mapping is supplied. Do not infer it from repo language, from a README, or from the framework you would expect. This also settles the older question about tool→project links in the Stack orbit: the orbit is the site's one claim about the *breadth* of the stack; the per-project row is a claim about *what a given project used*. Different claims, different surfaces — the orbit is not rewritten and does not gain links.
- The employer identity on the Experience row (company, role title, exact dates), and the Operations Agent case-study prose. Both are merge gates, not design questions.

## Direction contract

THESIS: A holographic self-introduction — iridescent blobs, grain and wide outline caps — where the visitor meets a person who is several things at once; refuses the dark-terminal dev portfolio, the sterile résumé page, and the candy-pastel first pass.

OWN-WORLD: Lavender-grey ground with four deterministic iridescent blobs and a real 128px grain tile; slate-indigo ink; Unbounded caps with outline-and-fill contrast; Hanken Grotesk for everything else; coral accent used only for the finale phrase, the email underline and the scroll ring (the status dot was the fourth until 2026-09-03); frosted glass cards with a gradient edge on every other one. Dark is a second world (deep indigo, blobs lit and held to 62%), not an inverted filter.

STORY: Visitor meets Parth by name in outline-and-fill caps, watches the descriptor beneath it roll through developer / researcher / computer scientist / athlete / mentor and land on "obsessed with AI"; scrolls into seven projects with the Operations Agent flagship first, **every card an entry point to its own case study**; sees the employment behind the flagship in a ruled Experience list; reads the stack as three rings; and emails him — from the homepage, or from the foot of whichever case study convinced him.

FIRST VIEWPORT: **Left-aligned hero. One display line, then a secondary descriptor.** The headline is the name: `HEY, I'M` outline + `PARTH DOSHI` filled over a two-pass sine wave. Below it, at roughly half that size and still in the display face, the typing slot rolls through bare descriptors — developer, researcher, computer scientist, athlete, mentor, obsessed with AI. The name is the headline; what he is qualifies it. The slot is a fixed-width box sized to the widest phrase so the caret never moves the layout. Content sits on the 1140 column and **shares its left edge with every section below it**. Then the three facts — specialization, graduation term, location — as one dot-separated line in body ink. Nothing else: no arrow links out of the hero, because the page is one scroll and the work sits directly beneath the fold.

**AMENDED 2026-09-03, by Parth.** The fold previously carried a one-sentence subline, a three-pill availability block whose first pill was the internship ask, and a frosted status pill reading OPEN TO OPPORTUNITIES; the contract required that status line to be visible in the fold at 1440×900 and 390×844. He called the result cluttered and named the three things that matter: graduation date, location, specialization. So the subline, the seeking pill and the status line are gone, the surviving three lost their pill chrome and became one quiet line, and the ask moved to Contact where acting on it is one line away. The fold-visibility requirement is retired with the element it governed. Everything else in this contract stands. Monogram top-left, theme toggle and dot-grid menu top-right, blobs in all four corners with a calm centre.

Neither the name nor the slot wraps at any width, asserted at every breakpoint edge in both themes and again under a 20px root font. Every display bound is px — a root-relative bound inside a vw-measured invariant is a silent-overflow generator. Measured worst clearance: 18.7%.

FIRST VIEWPORT, phones (760px and under, PR 02 of the mobile overhaul, 2026-09): the one-line invariant above does not hold below 760px, by design (D1, D2). `HEY, I'M` sits in outline on its own line; `PARTH DOSHI` fills the line beneath it at `clamp(28px, 10vw, 44px)`, the wave still tracking the name. The hero sits low on the screen (`align-content: end`) rather than centred, so the empty ground is the sky above the name, not a gap beneath the facts. The typewriter drops to its own line at 0.56x the name; the three facts stack one per line instead of a dot-separated row. A small drawn arrow — the one tappable thing in the fold, and a real link to `#work` — sits under the facts. The fold ends with the WORK label and the top of the flagship card breaking the surface, so the page reads as continuing rather than finished. Worst measured name-line clearance against the column: 95.4% (ceiling 97%); worst typewriter-slot clearance: 91.7% (ceiling 92%); title box height 2.12x the font size at every width (exactly two lines, never three).

FORM: User-pinned reference world (beats the roll) — Sharlee leads, Ram donated the status line (retired 2026-09-03; the reference still stands, the borrowing does not), Seán's structure survives in the section rhythm. Supersedes seed b925b460 and the editorial-grotesk pass.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance.
