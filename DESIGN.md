---
name: Parth Doshi Portfolio
description: A holographic self-introduction — iridescent blobs, film grain and wide outline caps over a lavender-grey ground.
colors:
  # --- Light theme (:root in app/globals.css — normative) ---
  ground: "#e9e6ee"
  ink: "#3f3f68"
  ink-2: "#5f5f82"
  surface: "#f7f6fa"
  signal: "#d9705a"
  signal-ink: "#a8412d"
  glass: "rgb(255 255 255 / 0.52)"
  glass-strong: "rgb(255 255 255 / 0.72)"
  glass-edge: "rgb(255 255 255 / 0.68)"
  blob-gloss: "rgb(255 255 255 / 0.7)"
  blob-a-1: "#7fe0b4"
  blob-a-2: "#6fc4ee"
  blob-a-3: "#b295ea"
  blob-b-1: "#f4a97e"
  blob-b-2: "#eed878"
  blob-b-3: "#86ddba"
  blob-c-1: "#b39ceb"
  blob-c-2: "#ee9dc0"
  blob-c-3: "#f4b98c"
  blob-d-1: "#7cc3ee"
  blob-d-2: "#7ddcb5"
  blob-d-3: "#ecd77f"
  # --- Dark theme (.dark in app/globals.css — a second world, not a filter) ---
  ground-dark: "#191a2e"
  ink-dark: "#ecebf4"
  ink-2-dark: "#cbcae2"
  surface-dark: "#23243d"
  signal-dark: "#f0a48f"
  glass-dark: "rgb(255 255 255 / 0.07)"
  glass-strong-dark: "rgb(255 255 255 / 0.11)"
  glass-edge-dark: "rgb(255 255 255 / 0.14)"
  blob-gloss-dark: "rgb(255 255 255 / 0.4)"
  blob-a-1-dark: "#4fd3a0"
  blob-a-2-dark: "#4bb4ec"
  blob-a-3-dark: "#a888ee"
  blob-b-1-dark: "#f2a273"
  blob-b-2-dark: "#e8cf6a"
  blob-b-3-dark: "#63d6ab"
  blob-c-1-dark: "#a98cee"
  blob-c-2-dark: "#ee8ab4"
  blob-c-3-dark: "#f4ad7e"
  blob-d-1-dark: "#59b6ee"
  blob-d-2-dark: "#57d3a7"
  blob-d-3-dark: "#e8d074"
typography:
  display:
    fontFamily: "Unbounded, 'Trebuchet MS', system-ui, sans-serif"
    fontSize: "clamp(1.75rem, 5.1vw, 4rem)"
    fontWeight: 700
    lineHeight: 1.12
    letterSpacing: "0.005em"
  headline:
    fontFamily: "Unbounded, 'Trebuchet MS', system-ui, sans-serif"
    fontSize: "clamp(2rem, 4.4vw, 3.25rem)"
    fontWeight: 700
    lineHeight: 1.02
    letterSpacing: "0.015em"
  title:
    fontFamily: "Unbounded, 'Trebuchet MS', system-ui, sans-serif"
    fontSize: "clamp(1.25rem, 1.9vw, 1.625rem)"
    fontWeight: 700
    lineHeight: 1.02
    letterSpacing: "0.01em"
  body:
    fontFamily: "'Hanken Grotesk', system-ui, -apple-system, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "normal"
  label:
    fontFamily: "'Hanken Grotesk', system-ui, -apple-system, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 500
    lineHeight: 1
    letterSpacing: "0.06em"
  micro-label:
    fontFamily: "'Hanken Grotesk', system-ui, -apple-system, sans-serif"
    fontSize: "0.6875rem"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "0.1em"
rounded:
  card: "22px"
  control: "1rem"
  pill: "999px"
  focus: "4px"
spacing:
  gutter: "24px"
  gutter-mobile: "20px"
  grid-gap: "18px"
  card-pad: "30px"
  card-pad-flagship: "40px"
  section-top: "80px"
  section-bottom: "96px"
  column-gap: "48px"
  shell-pad: "22px 28px"
components:
  card:
    backgroundColor: "{colors.glass}"
    textColor: "{colors.ink}"
    rounded: "{rounded.card}"
    padding: "30px"
  card-hover:
    backgroundColor: "{colors.glass-strong}"
  card-flagship:
    backgroundColor: "{colors.glass}"
    textColor: "{colors.ink}"
    rounded: "{rounded.card}"
    padding: "40px"
  badge-outline:
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "2px 8px"
    height: "20px"
  badge-secondary:
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "2px 8px"
    height: "20px"
  link-arrow:
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    padding: "8px 4px"
  link-arrow-hover:
    textColor: "{colors.signal-ink}"
  link-arrow-pending:
    textColor: "{colors.ink-2}"
  contact-email:
    textColor: "{colors.ink}"
    typography: "{typography.display}"
  orbit-label:
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "3px 9px"
  orbit-ring-label:
    textColor: "{colors.ink}"
    typography: "{typography.micro-label}"
    rounded: "{rounded.pill}"
    padding: "4px 12px"
  icon-button:
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    size: "40px"
  scroll-ring:
    backgroundColor: "{colors.glass-strong}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    size: "44px"
  status-dot:
    backgroundColor: "{colors.signal}"
    rounded: "{rounded.pill}"
    size: "9px"
---

# Design System: Parth Doshi Portfolio

## Overview

**Creative North Star: "The Holographic Introduction"**

A person who is several things at once, introducing himself on a sheet of iridescent film. The ground is a cool lavender-grey with four soft gradient blobs pushed hard into the corners and a real film-grain tile over everything; the centre of the viewport stays calm so wide display capitals can sit on it without fighting colour. The page's whole argument is made twice — once by the words, once by the material: the blobs are three-stop gradients on four different axes, so nothing repeats, and the frosted cards that float over them borrow their colour rather than adding a new one.

Density is low and deliberate. One 1140px column, generous vertical air (80px in, 96px out per section), an 18px grid gap, and long unbroken measures (40–46ch on ledes, 60ch on About). The register is adult and editorial, never bubbly: no sparkles, no candy pastels, no 40px pillow corners, no glossy mascot shapes. Colour lives in the ground; the foreground is ink, glass and one coral.

Two complete themes ship. Dark is not an inverted filter — it is a second token set with a deep indigo ground, a second full set of blob stops mixed brighter, and the blobs held to 62% opacity so body text still survives over them. Every visual decision is expressed as a custom property in `app/globals.css`, which is the normative source for both.

**Key Characteristics:**

- Iridescent gradient blobs in all four corners, calm ground in the middle
- Wide uppercase display capitals with an outline-and-fill contrast device
- Frosted glass surfaces whose blur is legibility, not decoration
- Exactly one accent colour, split into a shape token and a text token
- A real 128px grain raster, not an SVG filter
- Flat by construction: edges and blur convey depth, never shadows
- Two full themes, both first-class

## Colors

A cool lavender-grey world with slate-indigo ink, a mint→sky→lilac→apricot iridescent range reserved for the ground, and a single coral that appears only as a signal.

### Primary

- **Coral Signal** (`{colors.signal}`): The one accent. Reserved for the status dot, the scroll-ring fill, the email underline, the focus ring, the caret and the selection tint. It measures 2.65:1 on the light ground — correct as a mark, unusable as text.
- **Burnt Coral Ink** (`{colors.signal-ink}`): The text-only sibling of the accent (4.92:1 on the light ground). Carries the finale phrase "obsessed with AI." and the arrow-link hover colour. In dark it is aliased straight to `{colors.signal-dark}`, which already clears contrast on the deep ground.

### Secondary

The iridescent blob range — twelve stops in light, twelve in dark, three per blob, each blob on its own gradient axis. These are ground material and accent-edge material only; they never become a text colour or a card fill.

- **Blob A — Mint / Sky / Lilac** (`{colors.blob-a-1}` → `{colors.blob-a-3}`): top-left, axis 8% 0% → 92% 100%.
- **Blob B — Apricot / Butter / Jade** (`{colors.blob-b-1}` → `{colors.blob-b-3}`): top-right, axis 100% 10% → 0% 90%.
- **Blob C — Lilac / Rose / Peach** (`{colors.blob-c-1}` → `{colors.blob-c-3}`): bottom-left, axis 0% 20% → 100% 80%.
- **Blob D — Sky / Mint / Butter** (`{colors.blob-d-1}` → `{colors.blob-d-3}`): bottom-right, axis 20% 100% → 80% 0%.
- **Specular Gloss** (`{colors.blob-gloss}` → transparent): a radial highlight at 34% / 28%, r 46%, clipped to each blob so it reads as an inflated object rather than a flat shape. It is a radial gradient on purpose — same look as a blurred spot, no filter pass.

Three of these stops are re-used as the Stack orbit's ring tones (`data/stack.ts`): lilac `--blob-a-3` for Languages, apricot `--blob-b-1` for Frameworks, sky `--blob-a-2` for Tools.

### Neutral

- **Lavender Grey Ground** (`{colors.ground}` / `{colors.ground-dark}`): the page. Painted on `body` and on the fixed wash behind everything.
- **Slate Indigo Ink** (`{colors.ink}` / `{colors.ink-dark}`): all primary text, all icon strokes, the monogram, the outline stroke. 4.94:1 on the light ground, 5.52:1 over glass.
- **Muted Indigo** (`{colors.ink-2}` / `{colors.ink-2-dark}`): every lede, tagline, note, footer line and the pending state. Chosen to clear 4.5:1 rather than sit just under it; the dark value runs brighter than a conventional muted tone because it has to survive sitting over a lit blob.
- **Near-White Surface** (`{colors.surface}` / `{colors.surface-dark}`): the shadcn `--card` / `--popover` / `--sidebar` slot. Opaque surfaces are rare in this world — the frosted glass tokens do the work instead.
- **Frosted Glass** (`{colors.glass}`, `{colors.glass-strong}`, `{colors.glass-edge}` and their `-dark` twins): every floating surface. Rest fill, hover fill, and the 1px edge that declares elevation.

### Named Rules

**The Two Corals Rule.** `--signal` draws shapes; `--signal-ink` writes words. Never swap them. The light accent fails text contrast (2.65:1) and the dark ground makes a second value unnecessary, which is exactly why the split is a token and not a judgement call.

**The One Accent Rule.** Coral appears in six places and no more: the finale phrase, the status dot and its pulse, the email underline, the scroll-ring fill, the focus outline, and the caret/selection tint. Anything else that wants colour takes it from the blob range instead.

**The Calm Centre Rule.** Iridescence lives in the four corners at negative offsets; the middle band of every viewport stays ground. Type is never composited over a gradient peak, which is what lets 4.9:1 ink hold on a coloured page.

**The Ground-Only Iridescence Rule.** Blob colours are for the wash, the card gradient edge, and the orbit ring tones. They never become body text, a card background, or a button fill.

## Typography

**Display Font:** Unbounded (`--font-display`, via `next/font/google`), falling back to Trebuchet MS, system-ui, sans-serif
**Body Font:** Hanken Grotesk (`--font-body`, via `next/font/google`), falling back to system-ui, -apple-system, sans-serif
**Label/Mono Font:** none — micro-labels are Hanken Grotesk, uppercase, tracked out

**Character:** Unbounded is a wide, geometric, high-contrast display face; set in capitals with positive tracking it gives the page its poster voice. Hanken Grotesk underneath is quiet, humanist and highly legible at 17px, so the display face never has to carry a paragraph.

### Hierarchy

- **Display** (700, `clamp(1.75rem, 5.1vw, 4rem)`, line-height 1.12, tracking 0.005em, uppercase): the hero headline only. Drops to `clamp(1.25rem, 5.9vw, 1.875rem)` / line-height 1.18 under 720px.
- **Headline** (700, `clamp(2rem, 4.4vw, 3.25rem)`, line-height 1.02, tracking 0.015em, uppercase): section titles — WORK, STACK, ABOUT. Contact overrides to `clamp(2.25rem, 6.5vw, 4.5rem)`; the menu's section links run `clamp(1.75rem, 5vw, 2.5rem)`.
- **Title** (700, `clamp(1.25rem, 1.9vw, 1.625rem)`, tracking 0.01em, uppercase): project card names. The flagship card scales up to `clamp(1.625rem, 3vw, 2.5rem)`.
- **Body** (400, 1.0625rem / 17px, line-height 1.5): every paragraph. Measures are capped — 46ch on the hero subline, 42ch on section ledes, 40ch on card taglines and the contact lede, 52ch on the flagship description, 60ch on About (which runs line-height 1.6).
- **Label** (500, 0.875rem, tracking 0.06em, uppercase): the status line. Card notes and the footer use the same size at normal tracking, sentence case.
- **Micro-label** (700, 0.6875rem, tracking 0.1em, uppercase): the orbit's three ring labels. A third micro step — 600 / 0.75rem / tracking 0.08em, uppercase — carries the menu keycaps and the "coming soon" pending flag.

### The outline-and-fill device

`.type-outline` is the signature. It renders **solid ink by default**, then — inside `@supports (-webkit-text-stroke: 1px currentColor)` — switches to `color: transparent` with `-webkit-text-stroke: 0.03em var(--ink)` at `font-weight: 400`. The declaration order is the point: a browser without text-stroke keeps readable solid type instead of invisible text.

The light weight is not a style choice. Unbounded's heavy weights are drawn with self-overlapping contours, so stroking at 700 exposes the construction lines inside H, E, Y and M. At 400 there are no overlaps to reveal, and the slightly heavier 0.03em stroke keeps the outline reading at display size. Under 720px the stroke floors at `max(1.1px, 0.03em)`, because 0.03em is sub-pixel at phone display sizes.

### Named Rules

**The Outline-Lead Rule.** Only the lead-in words are outlined — "HEY, I'M" and the standalone "I'M". The subject is always filled. Outline is a contrast device between the greeting and the person, never a decoration applied to a whole heading.

**The Never-Stroke-Bold Rule.** Outlined type runs at weight 400 inside the `@supports` guard, and the solid fallback runs at 700. Raising the outline weight to match the fill re-introduces the self-overlap artefacts the guard exists to avoid.

**The Uppercase Display Rule.** `h1`, `h2` and `h3` are uppercase Unbounded at 700 with positive tracking (0.015em base). Body copy is never uppercase; only the three micro-label steps are, and they always carry ≥0.06em tracking to stay legible.

## Layout

One centred column. `.section` is `max-width: 1140px`, `margin: 0 auto`, `padding: 80px 24px 96px`, with `scroll-margin-top: 84px` so anchor jumps clear the fixed header. Under 760px the padding drops to `64px 20px 72px` and section heads stack from a space-between row to a left-aligned column with a 12px gap.

The hero is its own grid: `min-height: min(100svh, 720px)`, `align-content: center`, `justify-items: center`, `text-align: center`, `padding: 150px 24px 56px`, `overflow: clip`. Its column is declared `grid-template-columns: minmax(0, 1fr)` — not left implicit — so children have a width to shrink against and the rolling headline can never overflow the viewport. Under 720px it becomes `118px 20px 48px` / `min(100svh, 620px)`.

Work is a two-column grid (`repeat(2, minmax(0, 1fr))`, 18px gap) with the flagship spanning `1 / -1`; it collapses to one column at 760px. About is `minmax(0, 1fr) minmax(0, 1.5fr)` with a 48px gap, collapsing to one column with a 20px gap at 760px. Contact is centred with 96px/128px vertical padding.

The header is fixed with `pointer-events: none` and re-enabled on its children, so it never blocks the page underneath; padding `22px 28px`, dropping to `16px 18px` at 640px. The scroll ring sits fixed at 28px from the bottom-right corner, 18px at 640px.

Breakpoints in use: **640px** (shell and scroll-ring insets), **720px** (hero type, blob sizing and drift, outline stroke floor), **760px** (grid collapses, section padding, orbit mobile mode).

### Named Rules

**The 1140 Rule.** Content lives in a 1140px column with a 24px gutter (20px under 760px). The only full-bleed layers are the fixed wash and the fixed header.

**The Fixed-Ground Rule.** The wash is `position: fixed; inset: 0; z-index: -1`, `aria-hidden`, and `pointer-events: none`. It scrolls with nothing and intercepts nothing.

**The Portrait-vmax Rule.** Blobs are sized in `vmax` on desktop (40–46vmax) but in `vw` under 720px (76–84vw), because on a phone `vmax` is the viewport *height* — which makes the blobs full-bleed and swallows the body copy.

## Elevation & Depth

There are no shadows in this system. Not "few" — none. Depth comes from three stacked materials: the fixed blob wash at `z-index: -1`, the grain tile over it, and frosted glass surfaces above with `backdrop-filter: blur(22px) saturate(1.35)` (28px / 1.3 on the menu sheet, 12px on the scroll ring). Elevation is declared exactly once per surface, as a 1px `--glass-edge` border. Hover adds a 3px lift and swaps `--glass` for `--glass-strong`; it never adds a shadow.

The grain is a real raster: `public/textures/grain.png`, 128×128, 8-bit grayscale, tiled at `background-size: 128px 128px`, `mix-blend-mode: multiply` at 0.055 opacity in light and `screen` at 0.05 in dark. It is generated by `scripts/make-grain.mjs` (`node scripts/make-grain.mjs public/textures/grain.png`) from a seeded mulberry32 PRNG (seed `20260901`), averaging three samples per pixel so it reads as film grain rather than salt-and-pepper. Same seed, same bytes — the asset is reproducible and carries its provenance in the generator.

### Shadow Vocabulary

None. Do not add one.

### Named Rules

**The Edge-Not-Shadow Rule.** A surface declares its elevation once, as an edge. A 1px border *under* a soft drop shadow is the ghost-card look this world refuses.

**The Blur-Is-Legibility Rule.** Any surface that floats over the wash must carry `backdrop-filter: blur() saturate()`. The blur is what keeps text readable over a saturated blob; it is a functional requirement, not a finish.

**The Held-Back-Blob Rule.** In dark, `.wash__blob` runs at `opacity: 0.62`. The blobs are far brighter than the deep indigo ground, and body text has to survive over them.

## Shapes

Four radii, and nothing else. **22px** (`--radius-card`) for every glass card — soft, but nowhere near the pillow corners the register rejects. **999px** for pills: badges, orbit labels, ring labels, the pending flag, the icon buttons, the scroll ring, the status dot. **1rem** (shadcn `--radius`) for scaffold controls, with the derived `--radius-sm/md/lg/xl/2xl/3xl/4xl` ramp at 0.6×–2.6×. **4px** on the focus ring.

The recurring silhouettes are the circle and the blob. The circle appears as the scroll ring, the status dot, the orbit's three tracks and its label pills, and the dot-grid menu trigger (nine 1.7r circles on a 4/12/20 lattice, drawn as SVG rather than set as a glyph). The blob appears only in the wash, from four frozen SVG paths in `components/Blob.tsx` — generated once by a seeded Catmull-Rom through jittered radial points, then pasted in. Nothing is computed at runtime.

Borders are hairlines: 1px on cards and orbit labels, 1.5px on orbit tracks, ring labels and menu keycaps, 2px on the card gradient edge and the hero wave, 2–3px on icon strokes.

Icons are authored, not imported: `components/Icon.tsx` exports ArrowRight, ArrowDown and ArrowUpRight on a 20×20 viewBox at `stroke-width: 2.25`, round caps and joins, `currentColor`, `fill: none`. The theme toggle's sun and moon and the monogram match that construction (2, 2.4 stroke). Project marks in `components/Artifact.tsx` are the same language at 2.5 stroke on a 320×240 viewBox: geometric diagrams, never illustration.

### Named Rules

**The One Radius Family Rule.** 22px card, 999px pill, 1rem control, 4px focus. A new value needs a new reason.

**The Drawn-Not-Set Rule.** Every mark on this page is authored SVG in `currentColor` — the monogram, the dot grid, the arrows, the sun and moon, the seven project marks. No icon fonts, no glyph characters standing in for icons, no raster illustration.

## Components

### Cards (project cards)

Frosted panes floating over the wash. Character: quiet, wide, and lit only at their edge.

- **Corner Style:** 22px (`{rounded.card}`)
- **Background:** `{colors.glass}` at rest, `{colors.glass-strong}` on hover
- **Border:** 1px `{colors.glass-edge}`; on hover it mixes 40% signal into the edge
- **Shadow Strategy:** none — see Elevation & Depth
- **Internal Padding:** 30px (24px under 760px); the flagship runs 40px (26px under 760px)
- **Layout:** `minmax(0, 1fr) minmax(0, 38%)` with the mark in column 2 spanning rows 1–2 and a footer spanning both columns. The flagship is `minmax(0, 1.15fr) minmax(0, 1fr)`, `min-height: 400px`, mark in a 4/3 box; under 760px it stacks and the mark centres at `max-width: 320px`.
- **Hover:** `translateY(-3px)` plus the background/border swap, all at 200ms `--ease-out`; the mark inside drifts `translate(-3px, -3px)`. Every hover rule sits behind `@media (hover: hover) and (pointer: fine)`.
- **Gradient edge:** one card per row carries `.card--gradient` — a 2px `linear-gradient(120deg, --blob-c-1, --blob-b-1, --blob-a-2)` painted into a `::before` and masked with `mask-composite: exclude` so only the border shows. Selection is by **row/column parity**, not odd index: `column === row % 2` (`components/Work.tsx`). Odd-index selection put it on every left-column card, which reads as a stripe down the page rather than a rhythm.

*To add a project:* append to `data/projects.ts` (`slug`, `name`, `label`, `tagline`, optional `href`/`description`/`note`, `flagship`). Add its mark to `components/Artifact.tsx` under the same slug. The gradient parity recalculates itself.

### Badges

shadcn `Badge`, themed by the project's tokens. `outline` carries the factual card label bottom-right (border `--border`, text `--foreground`); `secondary` carries the About range chips (`--secondary` fill = 8% ink in the ground, 12% in dark). Both are 20px tall, `rounded-4xl`, `text-xs`, 500 weight, 2px/8px padding.

### Links

- **Arrow link** (`.link-arrow`): the page's primary action shape — an authored arrow, then a lowercase sentence-case label at 17px/500. Icon leads on in-page navigation (`see my work`), trails on outbound (`GitHub ↗`). Hover moves the arrow 4px and turns the text `{colors.signal-ink}`; `:active` scales to 0.97.
- **Pending state** (`.link-arrow.is-pending`): a designed state, not a stopgap. Text drops to `--ink-2`, cursor stays `default`, hover is explicitly suppressed, and a `.pending-note` pill spells out "coming soon". It is inert to pointer, keyboard and screen reader alike (`aria-disabled`). Gated by `resume.ready` in `data/site.ts`.
- **Contact email**: display face, `clamp(1rem, 2.6vw, 1.75rem)` at 600, underlined with a 3px coral rule at 10px offset. Hover swaps the underline to ink — the text colour never moves.
- **Card link** (`.card__link`): 15px/600 in a pill hit area created with negative margins (`padding: 8px 14px; margin: -8px -14px`), so the tap target is generous without changing layout.

### Navigation

There is no persistent nav. The fixed shell carries the monogram (44px, 38px at 640px) on the left and two 40px pill icon buttons on the right: the theme toggle and a dot-grid menu trigger. Both fill with 10% ink on hover and scale to 0.97 on press.

The menu is a shadcn/Radix `Sheet` from the right, styled `.menu`: 86% ground with `blur(28px) saturate(1.3)`, a 1px `--glass-edge` left border, 48px/40px padding. Links are display-face uppercase `clamp(1.75rem, 5vw, 2.5rem)` with a bordered keycap on the right (1/2/3/4). Each link rises in on open at 420ms with a `calc(var(--i) * 40ms + 80ms)` stagger. The 1/2/3/4 keyboard shortcuts are global (`components/Shell.tsx`) and always scroll with `behavior: "auto"` — keyboard-initiated jumps never animate.

### Signature Component: the typewriter headline

The hero's memorable moment. `"HEY, I'M"` in outline plus `PARTH DOSHI` filled over a two-pass sine wave; below it an outlined `"AND I'M"` and a slot that **types a phrase, holds it, backspaces it away, and types the next**, cycling six self-descriptions and landing on "obsessed with AI." in `{colors.signal-ink}`.

Two structural rules make the shape work:

**The lead sits outside the slot.** `.roll` is an `inline-grid` with `justify-items: start`; a hidden `.roll__sizer` holding the longest phrase reserves the width, and `.roll__live` sits in the same `1 / 1` cell. The slot is therefore a constant width and "And I'm" never moves — measured drift across a full cycle is 4px. `.hero__lead` is `white-space: nowrap` so it can't break into "AND" / "I'M" when the row is squeezed.

**The caret is what licenses the trailing space.** Because text is left-aligned in a fixed slot, short phrases leave room on the right. With a caret at the end of the typed text that reads as a text field rather than a gap — which is exactly why an earlier centred-swap version looked broken and this does not.

Timing (`components/RoleRoll.tsx`): 320ms start delay after `document.fonts.ready`, 52ms per character with 26ms jitter typing, **26ms per character erasing** (backspacing is a correction, not a thought, so it is quicker), 1900ms hold per phrase (4200ms on the finale), 320ms beat between phrases. The caret is solid while the text moves and blinks with `steps(2, jump-none)` only in `data-mode="holding"`. Clicking wipes the current phrase and moves on. The cycle pauses on hover, on a hidden tab, and when scrolled off-screen.

Under `prefers-reduced-motion: reduce` the per-character animation is dropped entirely: phrases swap whole on a 3400ms clock. Typing is not spatial motion, but a continuous churn of characters is still churn.

Before hydration `[data-pretype]` holds the glyphs at `color: transparent` with a 1.6s CSS reveal, so the box never reflows and the phrase still appears if JS never arrives. The whole element is `aria-hidden`; the `h1` carries the full sentence for assistive tech.

*To change the phrases:* edit the `phrases` array in `components/Hero.tsx`. Each entry owns its article and its period; `accent: true` marks the finale, `hold` overrides the dwell.

### Signature Component: the Stack orbit

Three concentric rings running inner → outer as languages → frameworks → tools, sourced from `data/stack.ts`. The orbit box is `--orbit: min(620px, 88vw)`; ring radii are `0.175`, `0.305` and `0.415` of that. Each ring draws a 1.5px track at 92% of its tone, names itself in a pill just *outside* its track (`translateY(calc(var(--r) * -1 - 22px))`), and distributes its items across `360° - 44°` — the gap the ring's own label occupies. Item pills are placed by rotating out to the radius and un-rotating themselves, so the type stays upright at every angle.

It is **deliberately static**. The page already has one authored motion moment and ambient blob drift; a third continuous rotation would compete with both and make 29 labels harder to read.

On a phone the orbit keeps its form and scrolls horizontally inside `.orbit-scroll` (`justify-content: safe center`, edges masked 28px, scrollbar hidden), centred on mount and resize by `components/OrbitScroller.tsx`, with a "Swipe the diagram" hint below. Collapsing it into stacked runs would ship the one shape this section exists to avoid. The rings are `aria-hidden`; a visually-hidden list carries the real content.

*To add a tool:* add the string to the right group's `items` array in `data/stack.ts`. Angles redistribute automatically. A fourth group would need a fourth `.orbit__ring--4` radius and a tone from the blob range.

### Signature Component: the scroll ring

The reference's circled dot made functional. A 44px glass pill fixed bottom-right, holding a 36-viewBox SVG rotated −90°: a 22%-ink track, a coral progress arc driven by `stroke-dashoffset` on a `2πr` dasharray, and a solid ink dot at the centre. It fades in past 40% of a viewport of scroll and takes `tabIndex={-1}` while hidden. Visibility is a discrete property, so it transitions with `visibility 0s linear 250ms` on the way out and `transition-delay: 0s` on the way in. Clicking scrolls to top — smoothly, unless the user prefers reduced motion.

### Motion

The motion system is bound to the `emil-design-eng` framework and is not negotiable per-component.

- **Easings:** `--ease-out: cubic-bezier(0.23, 1, 0.32, 1)` for almost everything; `--ease-in-out: cubic-bezier(0.77, 0, 0.175, 1)`; `--ease-drawer: cubic-bezier(0.32, 0.72, 0, 1)` for the sheet. The built-in keywords are too weak, and `ease-in` is banned.
- **Durations:** 160ms press, 200ms colour/background/hover, 250ms scroll-ring fade, 52ms/char typing, 26ms/char erasing, 420ms menu link rise, 450ms reveal, 600ms hero rise.
- **Transitions, not keyframes,** for anything interruptible — a transition retargets from wherever it is; a keyframe restarts from zero. Keyframes are reserved for the ambient loops (blob drift, dot pulse, caret blink) and one-shot entrances.
- **Press feedback:** every pressable element carries `:active { transform: scale(0.97) }` (0.98 on the large menu links).
- **Hover behind capability:** every hover rule sits inside `@media (hover: hover) and (pointer: fine)`.
- **Exits are faster than entrances.** The typewriter backspaces at 26ms/char against 52ms/char typing.
- **Staggers stay 30–80ms** per step (hero 60/120/180/240ms, cards 50ms, menu links 40ms). Longer reads as the page being slow.
- **Reduced motion:** `scroll-behavior: smooth` is gated behind `prefers-reduced-motion: no-preference`; blob drift, the roll's translate/blur, the dot pulse, the toggle's icon rotation, the hero rise and the Reveal all disappear. Typing survives — it is not spatial motion — and only slows. Keyboard-initiated jumps are always instant regardless of preference.
- **Off-screen and hidden work is paused:** the roll checks `document.hidden`, an IntersectionObserver and pointer hover before advancing; the scroll ring reads progress inside a single rAF on a passive listener.
- **Theme switching:** `disableTransitionOnChange` on the provider, so flipping themes doesn't animate every transitioned property at once.
- **Ambient drift:** four blobs on 34s / 41s / 37s / 45s `ease-in-out infinite alternate` loops, each translating 5–7vmax and rotating 7–11°. Disabled outright under 720px — four animated blobs is not a mobile budget — and under reduced motion.

### shadcn/ui

shadcn is installed with **this world as its theme, not the reverse**. `app/globals.css` bridges every shadcn slot to a project token in both `:root` and `.dark` (`--background: var(--ground)`, `--foreground: var(--ink)`, `--ring: var(--signal)`, charts 1–4 to blob stops, chart 5 to the signal). Radix is the interaction base. Components actually in use: **Badge** (outline and secondary), **Sheet** (the menu). **Button** is present as scaffold, used only for the sheet's close control. `--accent` belongs to shadcn; the project's accent is `--signal`.

## Do's and Don'ts

### Do:

- **Do** put every new colour through the token layer in `app/globals.css`, and define it in **both** `:root` and `.dark`. A value that only exists in one theme is a bug.
- **Do** use `--signal` for marks and `--signal-ink` for text (The Two Corals Rule).
- **Do** give any surface that floats over the wash a `backdrop-filter: blur() saturate()` and a 1px `--glass-edge` border.
- **Do** keep new sections inside `.section` (1140px / 24px gutter / 80px–96px vertical) and give them an `id` plus `aria-labelledby`, so the menu and the 1/2/3/4 shortcuts can reach them.
- **Do** wrap below-the-fold content in `<Reveal>` and stagger siblings at 50ms.
- **Do** author new icons as SVG in `currentColor` at the established stroke weights (2.25 for UI arrows, 2.5 for project marks), round caps and joins.
- **Do** put every hover rule behind `@media (hover: hover) and (pointer: fine)` and give every pressable a `:active { scale(0.97) }`.
- **Do** regenerate the grain with `node scripts/make-grain.mjs public/textures/grain.png` rather than hand-editing the PNG; the seed is the provenance.
- **Do** cap measures — 40–46ch for ledes and taglines, 60ch for long-form body.
- **Do** keep the outline device on lead-in words only, at weight 400 inside the `@supports` guard.

### Don't:

- **Don't** add a `box-shadow`. This system has none; elevation is an edge over blur (The Edge-Not-Shadow Rule).
- **Don't** paint blob colours onto text, card fills or buttons. They are ground, gradient edge and orbit tone only.
- **Don't** stroke display type at 700 — Unbounded's heavy contours self-overlap and the stroke exposes the construction lines.
- **Don't** size the blobs in `vmax` below 720px; portrait `vmax` is the viewport height and the blobs swallow the copy.
- **Don't** animate anything interruptible with a keyframe. Use a transition so it can retarget mid-flight.
- **Don't** let a stagger exceed 80ms per step, or an exit run longer than its entrance.
- **Don't** animate a keyboard-initiated scroll, and don't put `scroll-behavior: smooth` outside the reduced-motion guard.
- **Don't** rotate the Stack orbit or add a fourth continuous ambient motion; two (the roll, the blob drift) is the budget.
- **Don't** collapse the orbit into a stacked list on mobile — it scrolls instead.
- **Don't** ship a dead link. An unavailable action takes the designed pending state (`.is-pending` plus a `.pending-note` pill), inert to pointer, keyboard and screen reader.
- **Don't** introduce a fifth radius, a second accent, or a new display face.
- **Don't** override shadcn's `--accent` expecting the page accent; that slot belongs to shadcn, ours is `--signal`.
