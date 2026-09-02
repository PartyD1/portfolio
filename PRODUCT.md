# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Next.js

## Users

Two primary audiences, both browsing to quickly assess Parth Doshi as a software engineer:

- **Recruiters and hiring managers** screening for full-time roles. Job: quickly judge technical depth and real-world impact, especially agentic/AI systems experience.
- **Peers and professional network** (personal showcase / networking). Job: understand what Parth builds and how he thinks, for visibility and connection rather than a hiring decision.

Parth is a student at UC Santa Cruz (email domain `ucsc.edu`).

How Parth describes himself (his words, 2026-09-01, used verbatim in the hero rotation): a developer, a researcher, a computer scientist, an athlete, a mentor — and "obsessed with AI." The sport and the mentoring context were supplied 2026-09-02 (see Evidence on Hand): volleyball, and mentoring younger kids. **No team, league, level or program was supplied — do not invent one.**

## Product Purpose

A personal portfolio site presenting Parth Doshi's software engineering work. It exists to land job opportunities and build professional visibility, anchored by demonstrated experience building autonomous, AI-driven systems that solve real problems (not just "using AI tools").

## Positioning

Parth's differentiator, in his own words: "someone who knows how to leverage AI in building & daily lifestyle better than most." Concretely, this shows up as a track record of shipping autonomous agentic systems — an operations-automation agent deployed inside a real company, an AI evaluator used by actual competitors, and an agentic lead-gen framework — rather than surface-level AI usage. The portfolio's job is to make that distinction legible fast.

## Operating Context

Visitors are doing fast technical screening (recruiters) or casual browsing (peers/network), typically on first contact with Parth's work — no prior context assumed. Projects span applied AI/agentic systems, game development and physics/AI research, full-stack web apps, and assistive technology.

## Capabilities and Constraints

- Static/informational site — no auth or dynamic backend required unless a contact form is added later (undecided; not requested).
- Resume supplied 2026-09-01 and live at `public/resume.pdf`, gated by `resume.ready` in `data/site.ts`.
- The Operations Agent project has no public repository (internship-confidential) and must be presented as a case-study description only, with no code link.
- All other projects link to public GitHub repos (see Evidence on Hand).

## Brand Commitments

- Name: Parth Doshi.
- No existing logo, color system, or typographic identity.
- Pinned visual references (binding). Three portfolio screenshots at `.impeccable/references/`. **`ref-2-sharlee-holographic-blobs.png` leads** (re-pinned 2026-09-01, superseding `ref-1-sean-warm-gradient.png`, whose section rhythm survives); `ref-3-ram-editorial-serif.png` donates the status line. Traits: cool lavender-grey ground, iridescent gradient blobs, film grain, wide display caps with outline-and-fill contrast, a single coral accent.
- Light **and dark** both ship (dark added 2026-09-01 at the user's request). Dark is a real second token set — deep indigo ground, blobs lit and held back — not an inverted filter.
- No hobbies section (decided 2026-09-01). With no photos or detail behind it, it would be the only section with no real content, and it dilutes a page whose argument is applied AI systems. The personality it would have carried is served by the About section and the hero's rolling self-descriptions instead.
- Register (added 2026-09-01 after the first build): adult and editorial, never bubbly — the user said the first pass (candy pastels, 40px corners, sparkles, glossy blob, puffy rounded type) read like a child's site. **The register commitment stands; the specific "Editorial grotesk" refinement below is SUPERSEDED 2026-09-01** by the holographic system that actually shipped (Unbounded display, lavender-grey ground, 22px radius, iridescent blobs, two themes). Recorded for history only:
  > *Chosen refinement, "Editorial grotesk": tight grotesk display in near-black-green, flat radius-20 sand/stone cards with one deep-green card per row, desaturated stone wash, no sparkles or blob. Same structure, still light-only and name-led.*

## Evidence on Hand

- GitHub: https://github.com/PartyD1
- LinkedIn: https://www.linkedin.com/in/parthmdoshi/
- Email/contact: pmdoshi@ucsc.edu
- Resume: supplied by Parth on 2026-09-01 and live at `public/resume.pdf` (gated by `resume.ready` in `data/site.ts`).
- Tech stack (Parth's own list and grouping, 2026-09-01), recorded in `data/stack.ts`:
  - Languages: Python, Java, JavaScript, TypeScript, C, HTML, CSS, Bash, Tailwind, Elixir.
  - Frameworks/libraries: FastAPI, Flask, React, Next.js, PyTorch, TensorFlow, Pandas, Pydantic, LangChain.
  - Developer tools: Node.js, PostgreSQL, Supabase, OpenAI API, NemoClaw, Vercel, Apify, Git, Jupyter, OpenClaw.
  - Not established: which project used which tool, and any fluency ordering. Do not infer either.
- Sport and mentoring (supplied 2026-09-02): the sport is **volleyball**; he **mentors younger kids**, passing on life experience and lessons learned from adulting. Both are grounded in one About sentence. No further detail was given — do not invent a team, league, level, or program.

Real projects to feature:

1. **Operations Agent** — the flagship project. Built during a summer 2026 internship (with a partner): an agentic workflow that manages bookings for the company's operations team and autonomously flags and works to fix bookings needing attention. No public repo (internship-confidential) — do not fabricate or imply one exists.
2. **ScorelyAI** — an AI, rubric-based evaluator of DECA competition reports, currently in use by real high school competitors. https://github.com/PartyD1/scorely-ai
3. **SantaClaws** — an agentic lead-generation and conversion framework (built on OpenClaw) targeting small businesses with no website or outdated/poorly designed ones; agents autonomously build website mockups. https://github.com/PartyD1/santaclaws
4. **Wave Function Collapse** — a Phaser/JavaScript tile-based procedural map generator implementing the wave function collapse algorithm. https://github.com/PartyD1/wave-function
5. **WordPlay** — a full-stack Wordle recreation with full statistics and history tracking. https://github.com/PartyD1/wordplay
6. **Pewter Platformer** — a research-lab project improving the physics of a platformer's movement engine and building tools for an LLM to understand that physics well enough to generate difficult but playable levels. https://github.com/PartyD1/Pewter-The-Platformer
7. **Gestura** — a browser-based music player controlled entirely by hand symbols and movements, built as assistive technology for motor-impaired users. https://github.com/PartyD1/gestura

No other testimonials, metrics, press, or case-study detail beyond what's listed above is confirmed — future work must not invent adoption numbers, user counts, or outcomes not stated here.

### SUPPLIED-TOMORROW — the exact boundary

Everything below is **blocked on Parth and absent from the UI until he supplies it.** The build is complete around each one: the field is typed, the layout is designed and captured, and supplying it is a data edit rather than a design decision. Nothing here may be inferred, approximated, or written into the UI as a placeholder.

**Merge gates — the PR does not ship without these two:**

1. **Operations Agent case-study prose** — at least three of: Problem & context, What I built & how, Outcome & impact, Hardest technical challenge, Current limitations. The flagship card is the biggest promise on the homepage, and terminating it in a near-empty page is worse than today's dead-end card. Almost none of what a hiring manager wants here is confidential: the agent loop, the tool surface, what data it read, how it decided a booking needed attention, what guardrails stopped a bad write, what happened when it was wrong, how correctness was judged.
2. **The employer identity** for the Experience row — company name, role title, exact dates. Most internship NDAs cover code and customer data, not the fact of employment; ask explicitly rather than assuming. "Internship" is an employment type and is **not** an acceptable stand-in for a job title.

**Not gating, and absent until supplied:**

3. Per-project tech lists (the tool→project mapping). Do not infer from repo language, README, or the framework you would expect.
4. Per-project dates and roles.
5. The ownership split on Operations Agent — which subsystems were his vs. his partner's.
6. Graduation term; location, relocation and work authorisation; target role and start date. These three render as the hero availability subline and are, per survey:convert, the single highest-cost omission on the site.
7. Screenshots / GIFs, and whether a scrubbed architecture diagram of the Operations Agent is permissible — a diagram sidesteps confidentiality entirely and is a better proof artifact here than a UI screenshot.
8. Any *sourced* usage fact for ScorelyAI. "In use by DECA competitors" is confirmed and must never be embellished into a number.
9. Whether Gestura / Wave Function Collapse / WordPlay can be deployed to live URLs.
10. Whether any project should be promoted to `weight: 2`.

**Off-repo, and the highest-leverage thing Parth can do next:** a README with one image and one run command on each of the six public repos. A recruiter will click through, and a repo with no README subtracts the credibility the case study just earned.

## Product Principles

1. Lead with applied-AI and agentic-systems work, not generic "I use AI" framing — show autonomous systems that ship and solve real problems.
2. The Operations Agent is the flagship credential (real internship deployment, built with a partner) and should carry more weight than hobby or research projects.
3. Serve both audiences at once: support fast technical scanning for recruiters without losing the personality and story for peers/network visitors.
4. Every project claim must trace to real evidence (a repo link, or an accurately scoped description when no repo is public) — never fabricate metrics, users, or outcomes.
5. The range (AI agents, game/physics research, assistive tech, full-stack apps) should read as one coherent builder instinct — using technical and AI leverage to solve concrete problems for real users — not as a scattered project list.
