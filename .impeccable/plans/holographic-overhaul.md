# Plan: holographic overhaul (Sharlee world)

Status: PLAN — nothing below is built yet. Branch: `holographic-overhaul` (off `main` after #3/#4 merged). Reference: `.impeccable/references/ref-2-sharlee-holographic-blobs.png` now LEADS (user, 2026-09-01).

This is a visual-world replacement, not a refinement: the editorial-grotesk world is evidence of what the subject is, not authority over what it becomes. Product truth, content, the rolling headline, and the push rules in CLAUDE.md all carry over.

---

## Phase 0 — Facts only Parth can supply (asked before Phase 2 starts)

These are content, not taste. Anything not answered is built with a labelled placeholder, never invented.

1. **Tech stack**, grouped by fluency: *daily* / *often* / *learning*. For each tool, which of the seven projects used it (that link is what makes the section more than a list).
2. **Hobbies**: the real list (3–6), one line each, and which sport "athlete" means. Photos if you have them (one per hobby, any size) — the section is designed to hold them; until then it holds gradient blobs.
3. **Resume**: still pending. The placeholder ships either way.
4. **Dark mode**: the reference has a moon toggle. Yes/no. (Recommendation: yes — the holographic blobs are made for a deep-indigo ground, and it costs one token set.)
5. **Monogram**: the reference has a single-line ribbon "S" top-left. I'll author a "PD" ribbon mark in the same spirit unless you have a mark already.
6. **Register check**: this world is pastel again. It stays adult because of the cool lavender-grey ground, film grain, and condensed/wide *caps* with outline-vs-fill contrast — not the candy cards from round one. Confirm you're good with that reading.

---

## Phase 1 — Records (30 min)

- **PRODUCT.md**: Brand Commitments — pinned reference now Sharlee leads; keep the "adult, never bubbly" register line and add how this world satisfies it; record stack/hobbies/sport facts from Phase 0; dark-mode decision. Evidence on Hand: photo assets (paths) or their absence.
- **Surface brief** `.impeccable/surfaces/homepage.md`: replace the Direction contract (THESIS / OWN-WORLD / STORY / FIRST VIEWPORT / FORM / FINISH). Run `concept-seed.mjs --scope direction --mode experience` for the record; the user pin beats the roll, so the assignment is noted and overridden, not built.
- **DESIGN.md**: NOT rewritten now. The documenter replaces it from the built world at the end (Phase 9). Writing it first would defend intention against reality.

---

## Phase 2 — Foundation (half day)

### 2a. Tailwind v4 + shadcn/ui
- `npx shadcn@latest init` (Tailwind v4, CSS variables, `app/globals.css` as the entry). Use the `vercel:shadcn` skill for the init/add commands and current conventions.
- **Token bridge** — the site's tokens become the shadcn theme, not the other way round: `--background` = lavender-grey ground, `--foreground` = slate-indigo ink, `--primary` = ink, `--accent` = coral-peach (one accent, as before), `--muted` = translucent white, `--radius` = 1rem. Dark set under `.dark`.
- Bespoke parts (blobs, headline, orbit) stay in hand-written CSS; Tailwind utilities are for layout in the new sections; shadcn components only where they carry real behaviour.
- Components to add, and why each earns its place:
  - `Button` — CTAs and the resume placeholder (variants: default, outline, ghost).
  - `Badge` — project labels and status pills (replaces `.card__label`).
  - `Tooltip` — the orbit items ("used in ScorelyAI, SantaClaws") and the resume "coming soon" hint.
  - `Sheet` — the dot-grid menu from the reference opens a full-height menu (Work / Stack / Hobbies / About / Contact / Resume) with the 1–5 key hints kept.
  - `Toggle` — theme switch (moon icon) wired to `next-themes`.
  - `Separator` — section rules where the world wants a hairline.
  - `HoverCard` — optional, project cards on desktop (quick facts without leaving the page). Cut if it feels like chrome.
- Skip: Card (ours is bespoke), Tabs for the stack (a list in disguise), Carousel.

### 2b. Type
- Display: **Unbounded** (variable 200–900, wide caps — the reference's letterforms) via `next/font/google`. Outline words use `-webkit-text-stroke: 1.5px currentColor; color: transparent` with a solid fallback; filled words at 800. Uppercase, tracking +0.02em (wide faces want air, not the tight tracking of the grotesk).
- Body/UI: **Hanken Grotesk** (rounded-neutral, reads like the reference's arrow links without going soft). Both self-hosted through next/font.
- Retire Archivo.

### 2c. Palette (light)
- Ground `#e9e6ee` (lavender-grey), ink `#3f3f68` (slate-indigo), ink-2 `#6b6b8f`, white `#f7f6fa`.
- Blob gradients (four, each a 3-stop): mint→sky→lavender; peach→butter→mint; lavender→rose→peach; sky→mint→butter. Saturation capped so they read iridescent, not candy. Specular highlight = white radial at 30% opacity.
- Accent `#e8907a` (coral-peach) — status dot, finale phrase, email underline. One accent rule stays.
- Dark: ground `#191a2e`, ink `#ecebf4`, blobs +10% saturation with the highlight at 45% (they glow), accent unchanged.

### 2d. Grain
- The craft floor bans `feTurbulence` grain (reads amateur). The reference's grain is real film texture. So: generate a 256×256 monochrome noise tile once (Node script → PNG, committed to `public/textures/grain.png` with its generation prompt/origin embedded per `embed-prompt.mjs`), applied as a fixed full-viewport overlay at ~6% opacity, `mix-blend-mode: multiply` (light) / `screen` (dark), `pointer-events: none`. One asset, no runtime filters.

### 2e. Blobs
- `components/Blob.tsx`: SVG path shapes (four authored organic tubes/arcs like the reference's — a bent tube, a hook, a bean, a small pill), `linearGradient` fill along the tube's axis, a `radialGradient` highlight ellipse, and a soft inner-shadow via one bounded `feGaussianBlur` on the highlight only. Rendered at fixed positions in the hero (two large, two small) and one small each in Stack and Hobbies. Drift = CSS transform keyframes (translate/rotate, 30–45s, alternate) under `no-preference` only; never path morphing.
- Performance budget: four blobs in the hero, none animated on mobile below 720px (static placement), `will-change: transform` only while animating.

### 2f. Shell
- Top-left: authored **"PD" ribbon monogram** (single-stroke outline SVG, like the reference's S).
- Top-right: theme Toggle (moon/sun icon, drawn SVG), dot-grid menu button → Sheet. The reference's "FR" language toggle is dropped (no i18n).
- Bottom-right: scroll-progress ring (the reference's circled dot) — SVG circle whose stroke-dashoffset tracks scroll; click scrolls to top. Reduced motion: static ring.
- The pill nav is retired; keyboard 1–5 shortcuts move into the Sheet's items and still work from the page.

---

## Phase 3 — Hero (half day)

- Composition: centered again (the reference is centered), blobs in the four corners. Two headline lines in Unbounded caps:
  - Line 1: `HEY, I'M` (outline) `PARTH DOSHI` (filled).
  - Line 2: `I'M` (outline) `[rolling phrase]` (filled, uppercase) — the RoleRoll ports unchanged in logic; the finale `OBSESSED WITH AI.` in the accent. The slot reserves the longest phrase; on phones the phrase takes its own line(s) as today.
  - The centering problem from the last round is solved by the reference's own device: the *outline* words absorb the width change — line 2's "I'M" is set on the same line, and the reserved slot width keeps the line stable; short phrases sit left in the slot, which reads as intentional next to a hollow "I'M". Will be verified in the first capture round; fallback is a left-aligned hero.
- The wave squiggle under the name (the reference's grey sine lines) = one SVG path, two strokes, behind the filled words.
- Subline: the current one-sentence positioning, in Hanken.
- Links, not buttons: `→ see my work   → more about me` in the reference's style (arrow + lowercase), plus the status line. The primary "Get in touch" moves to the Sheet and Contact; the hero is calmer.

### 3b. Fix the typed entrance
**Root cause, confirmed 2026-09-01:** the rolling headline is not on `main`. PR #3 (`editorial-grotesk` → `main`) merged at 02:16:15Z; PR #4 (`rolling-headline` → `editorial-grotesk`) merged 13 seconds later, into a branch that had already been merged. GitHub does not retarget a stacked PR unless its base branch is deleted, so commit `8d78655` lives only on `origin/editorial-grotesk`. Whatever was deployed from `main` has the static "I'm Parth Doshi. / I build with AI." hero and no typing at all.
- **Fix:** PR #5 = `editorial-grotesk` → `main` (opened with this plan). Merge it and the typing appears. The overhaul branch is based on `editorial-grotesk` so it carries the roll regardless.
- **Rule added to CLAUDE.md:** never stack a PR on a branch whose PR is open unless "delete branch on merge" is on; otherwise base every PR on `main`.

Then hardening, all of which ship with the overhaul regardless:
1. **macOS "Reduce motion"** (System Settings → Accessibility → Display) skips the typing by design in the current code; check it if the phrase still appears instantly after #5.
2. **Changes:**
   - Typing is *not* spatial motion, so it now runs under reduced motion too; only the roll is disabled there (in-place swaps stay).
   - Kill the hydration race: the SSR markup renders the phrase with `data-pretype` so CSS hides the glyphs (not the box) until the client takes over; if JS never runs, a 1.6s CSS fallback reveals the text. No flash of the full phrase, no blank hero without JS.
   - Start the type-in on `requestAnimationFrame` after fonts are ready (`document.fonts.ready`), so the caret never types in a fallback face and then re-flows.
   - Dev-mode double-effect (StrictMode) guarded with a ref so the first phrase can't type twice.
   - A visible caret during typing *and* the caret phase (currently it only blinks after typing; during typing it was static — that is what makes it read "not working").

---

## Phase 4 — Work (2 hours)

- Cards restyled for the world: translucent frosted surfaces (`white/40` + `backdrop-blur` — bounded to the cards, which sit over blobs so the blur is functional, not decorative), 1.25rem radius, ink text, the existing geometric SVG marks kept (they suit the world), `Badge` for labels. The flagship keeps its full-width two-column layout; one card per row gets a blob-gradient *edge* (a 4px gradient stroke), replacing "one deep-green card per row".
- Dark: cards `white/8` over the indigo ground.

---

## Phase 5 — Stack: "Orbit" (half day) — not a list

- **Information architecture that earns the form:** distance = fluency. A central blob (Parth) with three rings — *daily*, *often*, *learning* — and each tool as a small type label sitting on its ring (no logo tiles: the craft floor bans icon grids and this reads better as typography anyway).
- Rings rotate slowly in opposite directions (60–90s), pause on hover; hovering a tool opens a `Tooltip` naming the projects it was used in (from `data/stack.ts` `usedIn`), and the matching project cards get a brief ring highlight — the section is wired to the Work section, which is the point.
- Mobile: rings collapse into three stacked horizontal bands (still labelled daily/often/learning), labels scroll horizontally with snap; no rotation.
- Reduced motion: rings static; hover/tooltip still works.
- Data: `data/stack.ts` — `{ name, ring: "daily"|"often"|"learning", usedIn: slug[] }`. Populated from Phase 0; until then, seeded with what the projects prove (JavaScript, Phaser, Next.js, LLM APIs, OpenClaw) and labelled placeholder in a code comment, not on the page.

Alternative if the orbit reads gimmicky in the first capture: **Strata** — four translucent slabs (Frontend / Backend / AI & agents / Tools) stacked isometrically, each slab's tools set as a typographic line. Decided at the first capture, not before.

---

## Phase 6 — Hobbies: "Off the clock" (2 hours)

- Each hobby is one of the world's blob shapes used as a **clipPath over a real photo** (the reference's blobs, now carrying content). Caption in Unbounded caps outline, one line of body copy. 3–6 items in a loose, overlapping composition (not a grid) on desktop; a vertical stack on mobile.
- Until photos arrive: the same blobs filled with their gradient and the hobby word set large inside them — designed as a state, not a stopgap, so it can ship.
- Photos get provenance (origin embedded) when supplied; converted to WebP with `cwebp` at 2 sizes.

---

## Phase 7 — Resume placeholder (30 min)

- `data/site.ts`: `resume: { path: "/resume.pdf", ready: false }`.
- Sheet and Contact render a `Button variant="outline"` "Resume" — when `ready` is false it is `aria-disabled`, shows a `Tooltip` "Coming soon", and does nothing. Flip `ready` to `true` and drop `public/resume.pdf` in place → it becomes a real link with `download`. No fake file, no dead link.
- README line under "Still pending" says exactly this.

---

## Phase 8 — About, Contact, footer (1 hour)

- About: keeps its copy; the range pills become `Badge`s; the section gets one small blob.
- Contact: "Let's talk." in Unbounded outline+fill, email underline in the accent, GitHub / LinkedIn / Resume as outline Buttons.
- Footer: monogram + © + back-to-top (the scroll ring already does this; footer keeps a text link for keyboard users).

---

## Phase 9 — Verify, review, document, ship (half day)

1. Build; batched captures: light + dark × desktop (1440) + mobile (390), fold + full; motion frames for typing/roll; the orbit at rest and mid-hover.
2. One fix batch, one confirmation capture. Stop.
3. Detector once; `/polish` (required before pushing frontend changes); embed provenance on `grain.png` and any photos (`embed-prompt.mjs --scan public`).
4. Finish reviewer (fresh general-purpose agent on `degraded/finish-reviewer.md`) → act on the disposition (fix rounds capped at two).
5. Documenter replaces DESIGN.md + sidecar from the built world.
6. Push rules: check `gh pr view --json state` — if the base merged, branch off `main` again. One PR: "Holographic overhaul (Sharlee world)". Stack, Hobbies, Resume ship inside it; if the Phase 0 facts are still missing, the placeholders ship and the PR body lists them.

---

## Craft-floor tensions, decided now

| Reference device | Floor says | Decision |
|---|---|---|
| Film grain | `feTurbulence` reads amateur | Real raster tile, committed with provenance |
| Outline type | (allowed) | `-webkit-text-stroke`, solid fallback, never gradient text |
| Glassy cards | glass as decoration is a refusal | Blur only where cards sit over blobs — functional legibility, bounded to the card |
| Tech logos | icon tiles are a refusal | Typographic labels on rings |
| Pastel palette | "candy" was rejected last round | Cool grey-lavender ground, grain, wide caps outline/fill — adult by construction; register check in Phase 0 |
| Dark mode | none | Real second token set, not an inverted filter |

## Rough size
Foundation ½ day · Hero ½ day · Work 2h · Stack ½ day · Hobbies 2h · Resume ½h · About/Contact 1h · Verify/review/doc ½ day. ~3 working days end to end, one PR.
