# Plan: holographic overhaul (Sharlee world)

Status: PLAN — nothing below is built yet. Branch: `holographic-overhaul` (off `main` after #3/#4 merged). Reference: `.impeccable/references/ref-2-sharlee-holographic-blobs.png` now LEADS (user, 2026-09-01).

This is a visual-world replacement, not a refinement: the editorial-grotesk world is evidence of what the subject is, not authority over what it becomes. Product truth, content, the rolling headline, and the push rules in CLAUDE.md all carry over.

## Confirmed by Parth (2026-09-01)

- **Register: go full holographic.** Four saturated iridescent blobs at reference scale in the hero, grain, outline+fill caps. The boldest of the three options.
- **Dark mode: yes.** Real second token set (deep indigo ground, blobs glow), `next-themes`, moon/sun toggle as in the reference.
- **Hobbies: no photos.** The blob treatment ships as the permanent state — each hobby a gradient blob with the word set large inside.
- **Delivery: build it all, as a GitHub stacked PR chain** (not one mega-PR, not a mid-build checkpoint).
- Still outstanding, and blocking only PRs 4 and 5: the **tech-stack list** (grouped daily/often/learning, with which project used what) and the **hobbies list + which sport "athlete" means**.

## Delivery: the PR stack

Six PRs, each merging into the previous, each leaving the site coherent if merged alone:

| # | Branch | Contents | Blocked on |
|---|---|---|---|
| 1 | `motion-system` | Phase 2g motion tokens + the three standing defects (`:active` on pressables, hover gating, status-dot pulse), and the Phase 3b typewriter rebuild. No visual-world change. | — |
| 2 | `foundation-theming` | Tailwind v4 + shadcn init, token bridge, `next-themes`, dark-mode plumbing and toggle, still expressing today's palette. | — |
| 3 | `holographic-world` | Fonts (Unbounded + Hanken), palette, grain, `Blob`, shell (monogram / Sheet menu / scroll ring), hero, Work cards restyled. The overhaul proper. | — |
| 4 | `stack-orbit` | Phase 5 Orbit section. | stack list |
| 5 | `hobbies` | Phase 6, blob treatment. | hobbies list + sport |
| 6 | `resume-and-finish` | Resume placeholder, About/Contact/footer, detector + `/polish`, finish review, DESIGN.md regeneration. | — |

**Stack safety protocol** (PR #4 missed `main` because this was absent): "Automatically delete head branches" is now enabled on the repo, so GitHub retargets children when a base merges. Merge strictly bottom-up; after each merge rebase every remaining branch onto `main` and force-with-lease; verify each landing with `git merge-base --is-ancestor <sha> origin/main`. Recorded in CLAUDE.md.

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

### 2g. Motion system — built on the `emil-design-eng` skill

**Every animation on this site is designed through Emil Kowalski's framework, the typewriter included.** Load the `emil-design-eng` skill before writing any motion code in any later phase. No animation ships until it answers four questions in order: how often is it seen, what is its purpose, what easing, how fast.

**Easing tokens** (replacing today's single `--ease-out`; the built-in CSS easings are too weak):

```css
--ease-out: cubic-bezier(0.23, 1, 0.32, 1);      /* enter + exit; the default */
--ease-in-out: cubic-bezier(0.77, 0, 0.175, 1);  /* on-screen movement */
--ease-drawer: cubic-bezier(0.32, 0.72, 0, 1);   /* the Sheet */
```

`ease-in` is banned outright: it delays the first frame, which is exactly where the eye is.

**Standing rules, enforced at review.** Several are fixes to what the current site already does wrong:

- Only `transform` and `opacity` animate. *This kills the current `.status__dot` box-shadow pulse* — it becomes a pseudo-element ring that scales and fades.
- Nothing enters from `scale(0)`; `scale(0.95)` + `opacity: 0` is the floor.
- Exit is always faster than enter, roughly half.
- **Transitions, not keyframes, for anything interruptible** (the roll, hover, press) — keyframes restart from zero when retriggered, transitions retarget from where they are. Keyframes only for constant ambient motion (blob drift, ring rotation), which also runs off the main thread.
- Every pressable element gets `:active { transform: scale(0.97) }` at ~160ms — buttons, card links, menu button, theme toggle. **The site has none of this today.**
- Every hover effect is gated behind `@media (hover: hover) and (pointer: fine)`. **Also absent today** — touch taps currently fire the card hover.
- Stagger steps stay 30–80ms.
- `@starting-style` for entrances where supported, `data-mounted` fallback otherwise.
- **No motion library.** CSS transitions + WAAPI only: CSS runs off the main thread and stays smooth while Next.js hydrates, and Framer Motion's `x`/`y` shorthands aren't hardware-accelerated anyway. A spring arrives only if a drag interaction does, and with Apple-style config (`duration`/`bounce`), not raw stiffness.

**Durations by element:** press 100–160ms · tooltip 125–200ms · card hover 160–200ms · Sheet 250–350ms (`--ease-drawer`, `translateY(100%)` percentage-based) · hero entrance 500–600ms · scroll reveal 400–450ms. Nothing routine goes over 300ms.

**shadcn/Radix overrides.** Default `tailwindcss-animate` classes are generic; every added component gets our curves and durations. Tooltips/popovers/hovercards get `transform-origin: var(--radix-*-content-transform-origin)` so they scale from their trigger rather than their center (the Sheet is edge-anchored and exempt). `TooltipProvider` gets `delayDuration={300} skipDelayDuration={150}`, so the second orbit tooltip opens instantly — the toolbar-feels-faster trick.

**Reduced motion = fewer and gentler, not none.** Movement goes; opacity, colour, and state feedback stay. Blobs stop drifting, rings stop rotating, reveals become instant, the roll swaps in place — but the caret still blinks, **the typing still types**, presses still respond, tooltips still fade.

---

## Phase 3 — Hero (half day)

- Composition: centered again (the reference is centered), blobs in the four corners. Two headline lines in Unbounded caps:
  - Line 1: `HEY, I'M` (outline) `PARTH DOSHI` (filled).
  - Line 2: `I'M` (outline) `[rolling phrase]` (filled, uppercase) — the RoleRoll ports unchanged in logic; the finale `OBSESSED WITH AI.` in the accent. The slot reserves the longest phrase; on phones the phrase takes its own line(s) as today.
  - The centering problem from the last round is solved by the reference's own device: the *outline* words absorb the width change — line 2's "I'M" is set on the same line, and the reserved slot width keeps the line stable; short phrases sit left in the slot, which reads as intentional next to a hollow "I'M". Will be verified in the first capture round; fallback is a left-aligned hero.
- The wave squiggle under the name (the reference's grey sine lines) = one SVG path, two strokes, behind the filled words.
- Subline: the current one-sentence positioning, in Hanken.
- Links, not buttons: `→ see my work   → more about me` in the reference's style (arrow + lowercase), plus the status line. The primary "Get in touch" moves to the Sheet and Contact; the hero is calmer.

### 3b. Fix the typed entrance, then rebuild it on the emil framework
**Root cause, confirmed 2026-09-01:** the rolling headline is not on `main`. PR #3 (`editorial-grotesk` → `main`) merged at 02:16:15Z; PR #4 (`rolling-headline` → `editorial-grotesk`) merged 13 seconds later, into a branch that had already been merged. GitHub does not retarget a stacked PR unless its base branch is deleted, so commit `8d78655` lives only on `origin/editorial-grotesk`. Whatever was deployed from `main` has the static "I'm Parth Doshi. / I build with AI." hero and no typing at all.
- **Fix:** PR #5 = `editorial-grotesk` → `main` (opened with this plan). Merge it and the typing appears. The overhaul branch is based on `editorial-grotesk` so it carries the roll regardless.
- **Rule added to CLAUDE.md:** never stack a PR on a branch whose PR is open unless "delete branch on merge" is on; otherwise base every PR on `main`.

**Secondary cause to check once #5 merges:** macOS "Reduce motion" (System Settings → Accessibility → Display) skips the typing by design in the current code — the rebuild below changes that.

**Then rebuild the mechanic through the `emil-design-eng` framework**, because "it runs again" is not the same as "it feels right":

*Decision check first.* Typing is seen once per visit → rare, so delight is permitted. The roll repeats every 2.4s while the page is open → frequent, so it must be short, cheap, and never block interaction. Purpose: the headline's whole claim is that Parth is several things at once, and the roll is the only way to say all six in one line. Both survive the framework.

- **Interruptibility — the biggest feel win.** The roll moves from keyframes to CSS **transitions** driven by `data-state` (`entering` / `active` / `leaving`). Click-to-advance mid-roll currently restarts a keyframe from zero; a transition retargets from wherever it is.
- **Asymmetric timing:** enter 360ms `--ease-out` (was 550ms), exit 200ms (was 400ms). The phrase still holds 2.4s; only the swap tightens.
- **Blur to mask the crossfade.** The overlap defect patched last round by delaying the entrance gets the real fix: `filter: blur(3px)` on both phrases during the swap, clearing as each settles, so two overlapping words read as one morphing word rather than two objects. Far under the 20px Safari ceiling.
- **The caret is visible *during* typing**, not only after — its absence mid-type is most of what reads as "broken". Solid cap-height bar, `steps(2, jump-none)` blink at 1s (constant motion → steps, never eased), removed once the roll starts.
- **Typing survives reduced motion.** It is not spatial movement and does not provoke vestibular symptoms; only the roll degrades to an in-place swap.
- **Hydration.** SSR renders the full first phrase; `data-pretype` hides the glyphs (not the box) until the client takes over, with a 1.6s CSS fallback reveal if JS never runs — no flash of the full phrase, no blank hero without JS. Typing starts on `requestAnimationFrame` after `document.fonts.ready`, so the caret never types in a fallback face and then reflows. StrictMode's double-effect is guarded by a ref.
- **Pause stays and grows.** Hover + `document.hidden` are already right (Sonner's "handle edge cases invisibly"); add pause when the slot scrolls out of view via `IntersectionObserver`, so nothing animates off-screen.

---

## Phase 4 — Work (2 hours)

- Cards restyled for the world: translucent frosted surfaces (`white/40` + `backdrop-blur` — bounded to the cards, which sit over blobs so the blur is functional, not decorative), 1.25rem radius, ink text, the existing geometric SVG marks kept (they suit the world), `Badge` for labels. The flagship keeps its full-width two-column layout; one card per row gets a blob-gradient *edge* (a 4px gradient stroke), replacing "one deep-green card per row".
- Dark: cards `white/8` over the indigo ground.
- **Motion (emil):** hover lift drops to 200ms and moves inside `@media (hover: hover) and (pointer: fine)`, transitioning `transform, box-shadow` explicitly — never `all`. The GitHub link inside each card gets `:active { transform: scale(0.97) }`. Scroll reveal becomes a `clip-path: inset(0 0 100% 0)` → `inset(0 0 0 0)` wipe plus opacity at 450ms (down from 900ms), 50ms stagger, `IntersectionObserver` with `{ once: true, rootMargin: "-100px" }`.

---

## Phase 5 — Stack: "Orbit" (half day) — not a list

- **Information architecture that earns the form:** distance = fluency. A central blob (Parth) with three rings — *daily*, *often*, *learning* — and each tool as a small type label sitting on its ring (no logo tiles: the craft floor bans icon grids and this reads better as typography anyway).
- Rings rotate slowly in opposite directions (60–90s), pause on hover; hovering a tool opens a `Tooltip` naming the projects it was used in (from `data/stack.ts` `usedIn`), and the matching project cards get a brief ring highlight — the section is wired to the Work section, which is the point.
- **Motion (emil):** rotation is constant motion → `linear` easing, CSS keyframes (off main thread), paused via `animation-play-state` inside the hover media query. Each label counter-rotates by the same amount so text never tilts. Tooltips at 150ms, origin-aware via `--radix-tooltip-content-transform-origin`, with `skipDelayDuration` so scanning across tools feels instant. The cross-highlight on project cards animates opacity/transform only, 200ms. Labels enter on scroll with a 40ms stagger, capped at ~600ms total.
- Mobile: rings collapse into three stacked horizontal bands (still labelled daily/often/learning), labels scroll horizontally with snap; no rotation.
- Reduced motion: rings static; hover/tooltip still works.
- Data: `data/stack.ts` — `{ name, ring: "daily"|"often"|"learning", usedIn: slug[] }`. Populated from Phase 0; until then, seeded with what the projects prove (JavaScript, Phaser, Next.js, LLM APIs, OpenClaw) and labelled placeholder in a code comment, not on the page.

Alternative if the orbit reads gimmicky in the first capture: **Strata** — four translucent slabs (Frontend / Backend / AI & agents / Tools) stacked isometrically, each slab's tools set as a typographic line. Decided at the first capture, not before.

---

## Phase 6 — Hobbies: "Off the clock" (2 hours)

- Each hobby is one of the world's blob shapes used as a **clipPath over a real photo** (the reference's blobs, now carrying content). Caption in Unbounded caps outline, one line of body copy. 3–6 items in a loose, overlapping composition (not a grid) on desktop; a vertical stack on mobile.
- Until photos arrive: the same blobs filled with their gradient and the hobby word set large inside them — designed as a state, not a stopgap, so it can ship.
- Photos get provenance (origin embedded) when supplied; converted to WebP with `cwebp` at 2 sizes.
- **Motion (emil):** each blob-clipped photo reveals with a `clip-path` wipe from the bottom on first view (450ms, once), staggered 60ms. Hover gives a 1.02 scale at 200ms inside the hover media query — no rotation, no bounce. The caption does not animate separately; one moment per item.

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
- **Motion (emil) for the shell:** the Sheet uses `--ease-drawer` at 300ms with percentage-based `translateY`/`translateX`, exit at 200ms; its items stagger 40ms. The scroll-progress ring is driven by `animation-timeline: scroll()` where supported (off main thread) with a scroll-listener fallback, and is static under reduced motion. The theme toggle animates only the icon (rotate + fade, 200ms) and specific token properties — never a blanket `transition: all` on `:root`, which would animate the entire page on every theme change.

---

## Phase 9 — Verify, review, document, ship (half day)

1. Build; batched captures: light + dark × desktop (1440) + mobile (390), fold + full; motion frames for typing/roll; the orbit at rest and mid-hover.
2. **Motion audit against the `emil-design-eng` checklist**, reported as its required Before/After/Why table: no `transition: all`, no `scale(0)` entries, no `ease-in`, no ungated hover, no keyframes on interruptible elements, exit faster than enter, every pressable element has `:active`, nothing routine over 300ms. Run animations at 3–5× duration (slow motion) to catch overlap and origin errors invisible at speed, and check the roll's swap frame-by-frame in the DevTools Animations panel. Test the Sheet and any drag on a real phone, not just the 390px viewport.
3. One fix batch, one confirmation capture. Stop.
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
| Ambient blob drift | "one authored moment, not scattered effects" | The drift *is* the world, not an effect on top of it; it stays, but it is the only ambient loop besides the ring rotation, and both stop under reduced motion |
| The roll repeating every 2.4s | emil: frequent animations must be short and cheap | Swap tightened to 360ms in / 200ms out, transitions not keyframes, paused off-screen and off-tab |

## Rough size
Foundation ½ day · Hero ½ day · Work 2h · Stack ½ day · Hobbies 2h · Resume ½h · About/Contact 1h · Verify/review/doc ½ day. ~3 working days end to end, one PR.
