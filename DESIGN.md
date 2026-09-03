---
name: Parth Doshi Portfolio
description: A holographic self-introduction — iridescent blobs, film grain and wide outline caps over a lavender-grey ground.
colors:
  # --- Light theme (:root in app/globals.css — normative) ---
  ground: "#e9e6ee"
  ink: "#3f3f68"
  ink-2: "#5a5a7d"
  surface: "#f7f6fa"
  # The media well and the case-study header panel. Aliased to `surface` in
  # both themes so it can never become a value that exists in only one.
  media-well: "#f7f6fa"
  # Not a palette colour: the opaque stencil in the card gradient edge's
  # mask-composite pair. It is never painted, only used to define coverage.
  mask-opaque: "#000"
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
    fontSize: "clamp(28px, 5.1vw, 64px)"
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
  # The enumerated ramp: every literal size shipping in app/globals.css. The
  # named roles above are the six that carry meaning; these are the rest, and a
  # size has to be in one list or the other or it is drift.
  scale:
    micro: "0.6875rem"
    keycap: "0.75rem"
    fine: "0.8125rem"
    label: "0.875rem"
    meta: "0.9375rem"
    small: "1rem"
    body: "1.0625rem"
    sub-max: "1.1875rem"
    lead: "1.25rem"
    case-section-min: "1.5rem"
    title-max: "1.625rem"
    menu-min: "1.75rem"
    display-mobile-max: "1.875rem"
    case-section-max: "2rem"
    contact-min: "2.25rem"
    flagship-max: "2.5rem"
    case-foot-max: "2.75rem"
    headline-max: "3.25rem"
    case-title-max: "4rem"
    contact-max: "4.5rem"
    display-mobile-floor: "14px"
    display-floor: "28px"
    display-mobile-cap: "30px"
    display-cap: "64px"
rounded:
  card: "22px"
  control: "1rem"
  pill: "999px"
  focus: "4px"
  # Two small radii predating the card scale: the monogram's hit area and the
  # pending-note pill's corners.
  mark: "10px"
  note: "6px"
spacing:
  gutter: "24px"
  gutter-mobile: "clamp(14px, 5vw, 20px)"
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

**Two surfaces, not one.** The homepage (`/`) stacks Hero → Work → Experience → Stack → About → Contact. Every project card is an entry point into `/work/[slug]`, a statically generated case study — seven of them. The case study inherits this world without amendment: same wash, same grain, same caps, same single accent, both themes. It adds exactly one new token (`--media-well`), one component vocabulary (`.case__*`), zero new radii and zero shadows.

**Key Characteristics:**

- Iridescent gradient blobs in all four corners, calm ground in the middle
- Wide uppercase display capitals with an outline-and-fill contrast device
- One trustworthy left edge, from the hero's first line to the footer
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
- **Muted Indigo** (`{colors.ink-2}` / `{colors.ink-2-dark}`): every lede, tagline, note, footer line and the pending state. Chosen to clear 4.5:1 rather than sit just under it; the dark value runs brighter than a conventional muted tone because it has to survive sitting over a lit blob. The light value was darkened from `#5f5f82` to `#5a5a7d` when the contrast harness measured it on **real composited pixels** rather than against flat ground: the 4.94:1 it was chosen for assumed a ground the blobs never leave flat, and behind actual text runs it came out at 4.37:1 — under the floor the token exists to clear. It now measures 5.30:1 on ground and 4.73:1 on the worst blob-tinted run.
- **Near-White Surface** (`{colors.surface}` / `{colors.surface-dark}`): the shadcn `--card` / `--popover` / `--sidebar` slot. Opaque surfaces are rare in this world — the frosted glass tokens do the work instead.
- **Frosted Glass** (`{colors.glass}`, `{colors.glass-strong}`, `{colors.glass-edge}` and their `-dark` twins): every floating surface. Rest fill, hover fill, and the 1px edge that declares elevation.

### Named Rules

**The Two Corals Rule.** `--signal` draws shapes; `--signal-ink` writes words. Never swap them. The light accent fails text contrast (2.65:1) and the dark ground makes a second value unnecessary, which is exactly why the split is a token and not a judgement call.

**The One Accent Rule.** Coral appears in eight KINDS of place and no more: the finale phrase, the status dot, the email underline, the scroll-ring fill, the focus outline, the caret/selection tint, the arrow-link hover tint, and the hover edge tint.

Two of those cover more than one element, and that is the rule working rather than being bent. **The status dot** is any dot saying something is live right now — the hero's status line and the live-project pill; only the hero's pulses, because two pulsing dots on one screen compete. **The hover edge tint** is any interactive surface tinting its edge on hover — the project card and the live-link pill.

The rule counts **kinds, not instances** — that distinction is load-bearing. "The email underline" is one kind that appears on two surfaces (Contact and the foot of every case study) through a single CSS rule, and that is not a second accent. Likewise the arrow-link hover tint is one kind covering `.link-arrow`, `.menu__link`, `.exp__link` and `.case__back`.

It was documented as six kinds for some time, which was simply a miscount: the arrow-link hover tint and the card hover edge both predate the count and were missed. Verified by an automated census that classifies every `--signal` / `--signal-ink` use in `app/globals.css` by the selector it sits on and fails on anything unclassified.

**The Calm Centre Rule.** Iridescence lives in the four corners at negative offsets; the middle band of every viewport stays ground. Type is never composited over a gradient peak, which is what lets 4.9:1 ink hold on a coloured page.

The band is measurable, and it is narrower than it looks. With the wash fixed and blob A's core at roughly (115, 101) at 1440 wide, small `--ink-2` text in the left column clears 4.5:1 only between viewport **y ≈ 370 and 640** — verified in both themes by probing the column in 40px steps. Two consequences follow. First, the band moves with viewport size, because the blobs are `vmax`-sized, so no fixed padding can be tuned to clear it. Second, any text pinned to a page extreme — the top of a document, or low in the first viewport — sits outside it by construction and needs a surface, not spacing. That is why the case-study header carries one.

**The Ground-Only Iridescence Rule.** Blob colours are for the wash, the card gradient edge, and the orbit ring tones. They never become body text, a card background, or a button fill.

## Typography

**Display Font:** Unbounded (`--font-display`, via `next/font/google`), falling back to Trebuchet MS, system-ui, sans-serif
**Body Font:** Hanken Grotesk (`--font-body`, via `next/font/google`), falling back to system-ui, -apple-system, sans-serif
**Label/Mono Font:** none — micro-labels are Hanken Grotesk, uppercase, tracked out

**Character:** Unbounded is a wide, geometric, high-contrast display face; set in capitals with positive tracking it gives the page its poster voice. Hanken Grotesk underneath is quiet, humanist and highly legible at 17px, so the display face never has to carry a paragraph.

### Hierarchy

- **Display** (700, `clamp(28px, 5.1vw, 64px)`, line-height 1.12, tracking 0.005em, uppercase): the hero headline only — the name. Drops to `clamp(17px, 5.9vw, 30px)` / line-height 1.18 under 720px.
- **Descriptor** (700, `clamp(14px, 3vw, 32px)`, line-height 1.2, tracking 0.005em, uppercase, display face): the rolling secondary line under the name. See The Name-Then-Descriptor Rule. **Both bounds are px, never rem, and that is a rule rather than a preference** — see The Px-Bound Display Rule.
- **Headline** (700, `clamp(2rem, 4.4vw, 3.25rem)`, line-height 1.02, tracking 0.015em, uppercase): section titles — WORK, EXPERIENCE, STACK, ABOUT. Contact overrides to `clamp(2.25rem, 6.5vw, 4.5rem)`; the case-study title runs `clamp(2.25rem, 6vw, 4rem)` at line-height 1.08; the menu's section links run `clamp(1.75rem, 5vw, 2.5rem)`.
- **Case-study section title** (700, `clamp(1.5rem, 2.6vw, 2rem)`, tracking 0.005em, uppercase): the five case-study section headings. There is no eyebrow, kicker or number above any of them, ever.
- **Title** (700, `clamp(1.25rem, 1.9vw, 1.625rem)`, tracking 0.01em, uppercase): project card names. The flagship card scales up to `clamp(1.625rem, 3vw, 2.5rem)`.
- **Body** (400, 1.0625rem / 17px, line-height 1.5): every paragraph. Measures are capped — 46ch on the hero subline, 42ch on section ledes, 40ch on card taglines and the contact lede, 52ch on the flagship description, 60ch on About (which runs line-height 1.6).
- **Label** (500, 0.875rem, tracking 0.06em, uppercase): the status line. Card notes and the footer use the same size at normal tracking, sentence case.
- **Micro-label** (700, 0.6875rem, tracking 0.1em, uppercase): the orbit's three ring labels. A third micro step — 600 / 0.75rem / tracking 0.08em, uppercase — carries the menu keycaps and the "coming soon" pending flag.

### The outline-and-fill device

`.type-outline` is the signature. It renders **solid ink by default**, then — inside `@supports (-webkit-text-stroke: 1px currentColor)` — switches to `color: transparent` with `-webkit-text-stroke: 0.03em var(--ink)` at `font-weight: 400`. The declaration order is the point: a browser without text-stroke keeps readable solid type instead of invisible text.

The light weight is not a style choice. Unbounded's heavy weights are drawn with self-overlapping contours, so stroking at 700 exposes the construction lines inside H, E, Y and M. At 400 there are no overlaps to reveal, and the slightly heavier 0.03em stroke keeps the outline reading at display size. Under 720px the stroke floors at `max(1.1px, 0.03em)`, because 0.03em is sub-pixel at phone display sizes.

### Named Rules

**The Outline-Lead Rule.** Only the lead-in words are outlined — "HEY, I'M". The subject is always filled. Outline is a contrast device between the greeting and the person, never a decoration applied to a whole heading.

**The Name-Then-Descriptor Rule.** The headline is **one display line — the name**. What Parth *is* follows on its own secondary line (`.hero__role`), at roughly half the name's size on desktop, still in the display face so it reads as part of the headline system rather than as body copy.

An earlier version made this a three-line headline preceded by an outlined "AND I'M", which put the name and the role at the same weight and left the reader to work out which was the point. It also created the arithmetic problem The No-Wrap Slot Rule was built to solve: the slot sat at display size, so the widest phrase set the ceiling for the entire headline clamp. Demoting the descriptor dissolves that — the slot now clears the column by 18.7% at its worst width instead of 7.3%, and the phone headline gained a 17px floor it could not previously afford.

The descriptor is sized by its RATIO to the name, not by an absolute step: ~0.50× at 1440, ~0.59× at 768, ~0.61× at 390, compressing to ~0.82× only at 280 where both are near their floors. A flat rem floor made it *larger* than the name at 280px, which is not a hierarchy — it just looked like the headline had wrapped. Asserted at every width in both themes.

**The Px-Bound Display Rule.** Every bound of a display clamp is expressed in px, never rem. The display size is one side of an invariant whose other side is measured in vw; a root-relative bound lets a large default font size inflate the type without inflating the column, and under `overflow: clip` that is a silent-overflow generator. It applies to the mobile floor exactly as much as to the desktop cap. The assertion suite runs twice — once at the default root size and once at a simulated 20px root — and the two runs must produce identical numbers.

**The No-Wrap Slot Rule.** The typing slot is `white-space: nowrap`, and the headline must satisfy

```
need(slot)  ≤  0.95 × column,   column = min(viewport − 2·gutter, 1140px)
```

at every width. Measured worst case is 7.3% clearance at 280px, the declared minimum supported width; it holds flat through the phone range because both the type and the gutter are vw-proportional below 400px.

`nowrap` is the load-bearing half. Without it a future violation silently relays out into a two-line-tall slot — the page still looks plausible and nothing fails. With it, the same violation clips against the hero's `overflow: clip`, which is visible and, more usefully, assertable as `scrollWidth > clientWidth`.

**The Sized-Slot Rule.** The slot reserves the width of the widest phrase, declared in the data as `widest: true` and never inferred from character count — a phrase with fewer but wider glyphs would under-size the box. A caret is rendered inside the hidden sizer as well as the live text, so the slot does not grow by 0.12em at the moment the widest phrase finishes typing, and `.roll__caret`'s width rule is deliberately **unscoped** so both copies measure identically. The blink is scoped to the live caret only: a blink on a `visibility: hidden` sizer would be invisible yet still count as a running animation against the ambient-motion budget.

**The Never-Stroke-Bold Rule.** Outlined type runs at weight 400 inside the `@supports` guard, and the solid fallback runs at 700. Raising the outline weight to match the fill re-introduces the self-overlap artefacts the guard exists to avoid.

**The Uppercase Display Rule.** `h1`, `h2` and `h3` are uppercase Unbounded at 700 with positive tracking (0.015em base). Body copy is never uppercase; only the three micro-label steps are, and they always carry ≥0.06em tracking to stay legible.

## Layout

One column, left-aligned, shared by every surface. `.section` is `max-width: calc(1140px + var(--gutter) * 2)`, `margin: 0 auto`, `padding: 80px var(--gutter) 96px`, with `scroll-margin-top: 84px` so anchor jumps clear the fixed header. Under 760px the padding drops to `64px var(--gutter) 72px` and section heads stack from a space-between row to a left-aligned column with a 12px gap.

`--gutter` is a token: **24px**, becoming `clamp(14px, 5vw, 20px)` under 760px. It is fluid below 400px so the column stays scale-proportional instead of taking a fixed 20px bite that grows as a fraction on small phones; at every width ≥400px it evaluates to exactly the documented 20px, so nothing about the existing small-screen layout moved when it was introduced. It exists as a token because the hero's no-wrap invariant is measured against the column it produces, so every surface sharing the left edge has to derive from one number.

The hero is its own grid: `min-height: 100svh`, `align-content: center`, `justify-items: start`, `text-align: left`, `padding: 120px var(--gutter) 56px`, `max-width: calc(1140px + var(--gutter) * 2)`, `margin-inline: auto`, `overflow: clip`. Its column is declared `grid-template-columns: minmax(0, 1fr)` — not left implicit — so children have a width to shrink against and the rolling headline can never overflow the viewport. Under 720px it becomes `96px var(--gutter) 48px` / `min(100svh, 620px)`.

Work is a two-column grid (`repeat(2, minmax(0, 1fr))`, 18px gap) with the flagship spanning `1 / -1`; it collapses to one column at 760px. `.work__item` is itself `display: grid` so `.card { height: 100% }` resolves and a row's cards share a bottom edge. About is `minmax(0, 1fr) minmax(0, 1.5fr)` with a 48px gap, collapsing to one column with a 20px gap at 760px. Experience is the third grid shape (below). Contact is left-aligned like everything else, with 96px/128px vertical padding.

The case study is `max-width: calc(1140px + var(--gutter) * 2)`, `padding: 0 var(--gutter)`, header padding-top 140px (96px under 760px), section rhythm `80px 0 0` collapsing to 64px, prose capped at 70ch, and a foot separated by a 1px rule with 72px/128px padding.

The header is fixed with `pointer-events: none` and re-enabled on its children, so it never blocks the page underneath; padding `22px 28px`, dropping to `16px 18px` at 640px. The scroll ring sits fixed at 28px from the bottom-right corner, 18px at 640px.

Breakpoints in use: **640px** (shell and scroll-ring insets), **720px** (hero type, blob sizing and drift, outline stroke floor), **760px** (grid collapses, section padding, gutter, orbit mobile mode, scroll-motion cutoff at 761px).

### Named Rules

**The 1140 Rule.** Content lives in a **1140px column** with the gutter **outside** it — `max-width: calc(1140px + var(--gutter) * 2)` with `padding: … var(--gutter)`. Writing it as `max-width: 1140px` with border-box padding yields a 1092px column and quietly contradicts the rule; that discrepancy shipped for a while and mattered once the hero's no-wrap invariant needed the full 1140 to clear at the 64px cap. The only full-bleed layers are the fixed wash and the fixed header.

**The Shared-Left-Edge Rule.** The hero headline, subline, availability line, actions, status line and every section head below them sit on the same left edge, asserted to 0.0px at every width in both themes. This is what left-aligning the hero buys, and it is why Contact is no longer centred: with the hero left-aligned, a single centred block reads as an oversight rather than as a finale.

**The Three Grid Shapes Rule.** The system has exactly three: Work's `repeat(2, minmax(0,1fr))`, About's `minmax(0,1fr) minmax(0,1.5fr)`, and Experience's `minmax(0, 18ch) minmax(0, 1fr)` with a 48px column gap. All three live inside The 1140 Rule and all three collapse to one column at 760px. A fourth needs a reason.

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

**The Opaque-Media Rule** — a named amendment to the rule above. A media well is **opaque** (`--media-well`), because its content is opaque. Blur exists to keep *text* legible over the animated wash; a screenshot has no such job, and blurring behind it would be finish rather than function.

An opaque well is also the only surface that may **travel under scroll motion**. A moving `backdrop-filter` element re-samples and re-blurs its backdrop every frame, over a blob wash, under a `mix-blend-mode` grain layer — the single worst thing this page can ask a compositor to do.

The same token carries the case-study header panel, and there the choice is measured rather than aesthetic: frosted at `--glass` left the back link and metadata line still failing contrast at the panel's top edge, because light glass is 0.52 alpha (4.34:1, just short) and **dark glass is 0.07, which cannot mask a lit blob at all** (2.53:1). Opaque is deterministic in both themes at every viewport size.

**The Surface-Not-Spacing Rule.** Text that sits outside the calm band cannot be rescued by moving it. The band is only ~270px tall and moves with viewport size (the blobs are `vmax`-sized), and the case-study header block is taller than the band anyway. Text pinned to a page extreme gets a surface; padding tuned to clear a blob at one width is wrong at every other.

**The Held-Back-Blob Rule.** In dark, `.wash__blob` runs at `opacity: 0.62`. The blobs are far brighter than the deep indigo ground, and body text has to survive over them.

## Shapes

Four radii, and nothing else. **22px** (`--radius-card`) for every glass card — soft, but nowhere near the pillow corners the register rejects. **999px** for pills: badges, orbit labels, ring labels, the pending flag, the icon buttons, the scroll ring, the status dot. **1rem** (shadcn `--radius`) for scaffold controls, with the derived `--radius-sm/md/lg/xl/2xl/3xl/4xl` ramp at 0.6×–2.6×. **4px** on the focus ring.

The recurring silhouettes are the circle and the blob. The circle appears as the scroll ring, the status dot, the orbit's three tracks and its label pills, and the dot-grid menu trigger (nine 1.7r circles on a 4/12/20 lattice, drawn as SVG rather than set as a glyph). The blob appears only in the wash, from four frozen SVG paths in `components/Blob.tsx` — generated once by a seeded Catmull-Rom through jittered radial points, then pasted in. Nothing is computed at runtime.

Borders are hairlines: 1px on cards and orbit labels, 1.5px on orbit tracks, ring labels and menu keycaps, 2px on the card gradient edge and the hero wave, 2–3px on icon strokes.

Icons are authored, not imported: `components/Icon.tsx` exports ArrowRight, ArrowDown and ArrowUpRight on a 20×20 viewBox at `stroke-width: 2.25`, round caps and joins, `currentColor`, `fill: none`. The theme toggle's sun and moon and the monogram match that construction (2, 2.4 stroke). Project marks in `components/Artifact.tsx` are the same language at 2.5 stroke on a 320×240 viewBox: geometric diagrams, never illustration.

### Named Rules

**The One Radius Family Rule.** 22px card, 999px pill, 1rem control, 4px focus. A new value needs a new reason.

**The Drawn-Not-Set Rule.** Every mark on this page is authored SVG in `currentColor` — the monogram, the dot grid, the arrows, the sun and moon, the seven project marks. No icon fonts, no glyph characters standing in for icons, no raster illustration.

**The Simple Icons Bounded Exception** — a named amendment to the rule above, and the only one. Technology brand marks are vendored from Simple Icons so a case study can say what a project was built with in the vocabulary a reader already recognises. The exception is bounded on every axis:

- **One surface.** The case-study header only. Never on homepage cards, which keep the authored stroke vocabulary intact.
- **One size.** `viewBox="0 0 24 24"`, a fixed 20px box, 14px gap, baseline-aligned with a 0.875rem name.
- **One ink.** `fill="currentColor"` — `--ink-2` at rest, `--ink` on row hover. **Brand geometry ships; brand colour does not.** ~25 uncontrolled brand accents would blow The One Accent Rule on a page whose whole identity is having exactly one.
- **Fill, not stroke.** These are silhouettes; stroking them would be a worse lie than importing them.
- **Generated, never hand-edited.** `scripts/vendor-icons.mjs` reads slugs from `data/stack.ts` — the one tool list — pulls paths from a pinned `simple-icons` installed into a throwaway prefix at build time, and writes `components/tech-marks.generated.ts`. The package is never added to `package.json`. There is a grep gate: no six-digit hex may appear in the generated file.
- **Nothing is dropped and nothing is invented.** A tool with no official mark renders as a 999px outline text pill. Four do: OpenAI API, Apify, NemoClaw, OpenClaw. (There is no `siOpenai` and no `siApify` in Simple Icons 16.29.0. `siOpenaigym` exists but is a different product, and using it would be a small lie.)

Icon data is CC0-1.0; the marks remain the trademarks of their owners, used to identify technologies and not as endorsement.

**The Two Claims Rule** — how the orbit and the tech row coexist. The Stack orbit is the site's one claim about the **breadth** of the stack, read as three rings. The per-project tech row is a claim about **what a given project used**. They are different claims on different surfaces, and the page never makes the same claim twice. The orbit is not rewritten, is not rotated on scroll, does not gain per-tool links, and does not collapse to a list on mobile.

## Components

### Cards (project cards)

Frosted panes floating over the wash. Character: quiet, wide, and lit only at their edge.

- **Corner Style:** 22px (`{rounded.card}`)
- **Background:** `{colors.glass}` at rest, `{colors.glass-strong}` on hover
- **Border:** 1px `{colors.glass-edge}`; on hover it mixes 40% signal into the edge
- **Shadow Strategy:** none — see Elevation & Depth
- **Internal Padding:** 30px (24px under 760px); the flagship runs 40px (26px under 760px)
- **Layout:** `minmax(0, 1fr) minmax(0, 38%)`. `.card__body` is a flex column in column 1; the media frame sits in column 2. The flagship is `minmax(0, 1.15fr) minmax(0, 1fr)`, `min-height: 400px`, media in a 4/3 box; under 760px it stacks and the media centres at `max-width: 320px`.
- **One structure, always.** Weight changes classes, span, type scale and media aspect. It **never changes which fields render** — a card with two hand-written branches meant a data edit could silently produce nothing on five of seven cards.
- **Media frame** (`.card__media`): the same 1px `--glass-edge`, 22px radius and opaque `--media-well` ground as the case-study well. The authored `Artifact` mark renders inside it as a **designed empty state**, not a grey rectangle standing in for content; a screenshot later replaces the mark inside an identical frame, so neither layout nor choreography changes.
- **Hover:** `translateY(-3px)` plus the background/border swap, all at 200ms `--ease-out`; the mark inside drifts `translate(-3px, -3px)`. Every hover rule sits behind `@media (hover: hover) and (pointer: fine)`.
- **Press:** `.card:active { transform: scale(0.98) }`, deliberately **outside** the hover guard — a touch device gets no hover state, so without it the largest tap target on the page acknowledges nothing. 0.98 is the documented value for a large surface, matching menu links; small controls use 0.97.
- **Gradient edge:** one card per row carries a 2px `linear-gradient(120deg, --blob-c-1, --blob-b-1, --blob-a-2)` painted into `.card::before` and masked with `mask-composite: exclude` so only the border shows. See The Gradient Hand-Off Rule.

**The Card-As-Link Rule.** The whole card opens its case study, via a pseudo-element overlay on the `<Link>` (`.card__hit::after { inset: 0 }`) rather than an anchor wrapping the content — wrapping would nest the repo anchor inside another anchor, which is invalid. The nested repo link sits at `z-index: 1` above the overlay and stays independently clickable.

**`.card__hit` carries no `:active` transform, and that is load-bearing.** The overlay is a pseudo-element *of that anchor*, so a transform on the anchor transforms the overlay with it — scaling a small inline-flex box in the foot drags the full-card overlay toward that box's centre, far enough that a press starting near the top of the card ends outside it. The result: mousedown targets the link, mouseup targets the card, no click is synthesised, and the card silently stops being clickable while still hit-testing correctly. The press response lives on `.card` instead, which is the overlay's containing block rather than its parent.

Note the trade this rule makes: any full-card overlay intercepts the pointer over the text, so text inside a card is not selectable. That is accepted — whole-card clickability is the point — and it is confined to cards; case-study prose remains selectable.

**The Gradient Hand-Off Rule.** Neither language can pick the gradient card alone, so each owns the case it can answer. **JS owns the two-column parity** and proves it: with the flagship spanning its own row, for `k = i − 1`, `row = ⌊k/2⌋`, `col = k % 2`, the edge falls where `col === row % 2` → `i = 1, 4, 5`, one per row alternating left → right → left. **CSS owns the one-column case** via `:nth-child(odd)`, because JS cannot know the column count and duplicating the 760px breakpoint in JS is the coupling worth avoiding. `Work.tsx` emits `data-edge-2col`; every gradient property is declared once on `.card::before` with `content: none`, and the two media queries only flip `content`.

**The Span Invariant.** Only `weight === 1` spans a row. Weight 2 changes type scale and media aspect only. The parity arithmetic above assumes exactly one spanning item, so giving weight 2 a span would silently break the alternation.

*To add a project:* append to `data/projects.ts` (`slug`, `name`, `label`, `tagline`, `weight`, `tech`, `media`, optional `href`/`description`/`note`/`use`/`study`). Add its mark to `components/Artifact.tsx` under the same slug. The route, the gradient parity and the card all follow.

### Badges

shadcn `Badge`, themed by the project's tokens. `outline` carries the factual card label bottom-right (border `--border`, text `--foreground`); `secondary` carries the About range chips (`--secondary` fill = 8% ink in the ground, 12% in dark). Both are 20px tall, `rounded-4xl`, `text-xs`, 500 weight, 2px/8px padding.

### Links

- **Arrow link** (`.link-arrow`): the page's primary action shape — an authored arrow, then a lowercase sentence-case label at 17px/500. Hover moves the arrow 4px and turns the text `{colors.signal-ink}`; `:active` scales to 0.97.

**The Arrow Grammar Rule**, in three cases. A **leading** arrow means the link **stays on the site** — `→ see my work`, `→ case study`, `← back to the work` (which points back, and whose hover moves it left rather than right). A **trailing `ArrowUpRight`** means the link **leaves** — `GitHub ↗`. A **trailing `ArrowDown`** means it downloads — `Résumé ↓`. That distinction is what makes `case study` and `GitHub ↗` read as different promises rather than as two links of equal weight.

- **Pending state** (`.link-arrow.is-pending`): a designed state, not a stopgap. Text drops to `--ink-2`, cursor stays `default`, hover is explicitly suppressed, and a `.pending-note` pill spells out "coming soon". It is inert to pointer, keyboard and screen reader alike (`aria-disabled`). Gated by `resume.ready` in `data/site.ts`.
- **Contact email**: display face, `clamp(1rem, 2.6vw, 1.75rem)` at 600, underlined with a 3px coral rule at 10px offset. Hover swaps the underline to ink — the text colour never moves.
- **Card link** (`.card__hit`): 15px/600 in a pill hit area created with negative margins (`padding: 8px 14px; margin: -8px -14px`), so the tap target is generous without changing layout. It also owns the full-card overlay — see The Card-As-Link Rule.

**The Live-Link Rule.** A project with a public, working deployment gets a `demo`, and that link is the loudest affordance on its card and repeats at the TOP of its case study — not only in the footer. A thing a visitor can *use* outranks a thing they can read, and burying it below the fold wastes the strongest proof the site has. It renders as a pill (this system has no buttons) on the opaque `--media-well` ground, carrying a static coral dot; on the case-study header, where the panel is already `--media-well`, it takes `--ground` instead so it stays a visibly separate object rather than becoming a border.

**The Email-Is-The-Loudest-Thing Rule.** Email is the only element on the site that gets the display face *and* the coral underline. That combination **is** the CTA hierarchy — there is no button, because an email button above the fold asks for contact before any evidence has been shown. Résumé and social links are never given display type and never given coral at rest; their only coral is the arrow-link hover tint every link shares. The same email treatment repeats at the foot of every case study, which is the highest-intent moment on the site, and that is one kind of accent place on two surfaces rather than a second accent.

### Navigation

There is no persistent nav. The fixed shell carries the monogram (44px, 38px at 640px) on the left and two 40px pill icon buttons on the right: the theme toggle and a dot-grid menu trigger. Both fill with 10% ink on hover and scale to 0.97 on press.

The menu is a shadcn/Radix `Sheet` from the right, styled `.menu`: 86% ground with `blur(28px) saturate(1.3)`, a 1px `--glass-edge` left border, 48px/40px padding. Links are display-face uppercase `clamp(1.75rem, 5vw, 2.5rem)` with a bordered keycap on the right — **five now: 1 Work, 2 Experience, 3 Stack, 4 About, 5 Contact**. Each link rises in on open at 420ms with a `calc(var(--i) * 40ms + 80ms)` stagger, still inside the 30–80ms budget.

**Navigation is route-aware.** Menu hrefs are root-relative (`/#work`), and the global keyboard handler (`components/Shell.tsx`) scrolls when the section exists in this document and otherwise `router.push`es to `/#id`. Before this it called `getElementById(id).scrollIntoView()`, which on a case-study route finds nothing and **silently no-ops** — a shortcut that does nothing is worse than one that does not exist, because the user cannot tell which they are getting. Keyboard-initiated jumps always scroll with `behavior: "auto"`, at any motion preference, including across routes.

### Signature Component: the typewriter headline

The hero's memorable moment. `"HEY, I'M"` in outline plus `PARTH DOSHI` filled over a two-pass sine wave; on a secondary line below it, a slot that **types a phrase, holds it, backspaces it away, and types the next**, cycling six bare descriptors — developer, researcher, computer scientist, athlete, mentor — and landing on "obsessed with AI" in `{colors.signal-ink}`.

The phrases carry no article and no full stop. They used to ("a developer.") because they completed the spoken sentence "And I'm ___"; with the lead gone the roll is a descriptor rather than the end of a sentence, and the punctuation went with it.

Two structural rules make the shape work:

**The slot is a fixed box.** `.roll` is an `inline-grid` with `justify-items: start`; a hidden `.roll__sizer` holding the widest phrase reserves the width, and `.roll__live` sits in the same `1 / 1` cell. The slot is therefore a constant width and nothing after it moves — measured drift across a full cycle is **0.000px**.

**The caret is what licenses the trailing space.** Because text is left-aligned in a fixed slot, short phrases leave room on the right. With a caret at the end of the typed text that reads as a text field rather than a gap — which is exactly why an earlier centred-swap version looked broken and this does not.

Timing (`components/RoleRoll.tsx`): 320ms start delay after `document.fonts.ready`, 52ms per character with 26ms jitter typing, **26ms per character erasing** (backspacing is a correction, not a thought, so it is quicker), 1900ms hold per phrase (4200ms on the finale), 320ms beat between phrases. The caret is solid while the text moves and blinks with `steps(2, jump-none)` only in `data-mode="holding"`. Clicking wipes the current phrase and moves on. The cycle pauses on hover, on a hidden tab, and when scrolled off-screen.

Under `prefers-reduced-motion: reduce` the per-character animation is dropped entirely: phrases swap whole on a 3400ms clock. Typing is not spatial motion, but a continuous churn of characters is still churn.

Before hydration `[data-pretype]` holds the glyphs at `color: transparent` with a 1.6s CSS reveal, so the box never reflows and the phrase still appears if JS never arrives. The whole element is `aria-hidden`; the `h1` carries the full sentence for assistive tech.

*To change the phrases:* edit the `phrases` array in `components/Hero.tsx`. Each entry owns its article and its period; `accent: true` marks the finale, `hold` overrides the dwell.

### Signature Component: the Stack orbit

Three concentric rings running inner → outer as languages → frameworks → tools, sourced from `data/stack.ts`. The orbit box is `--orbit: min(620px, 88vw)`; ring radii are `0.175`, `0.305` and `0.415` of that. Each ring draws a 1.5px track at 92% of its tone, names itself in a pill just *outside* its track (`translateY(calc(var(--r) * -1 - 22px))`), and distributes its items across `360° - 44°` — the gap the ring's own label occupies. Item pills are placed by rotating out to the radius and un-rotating themselves, so the type stays upright at every angle.

It is **deliberately static**. The page already has one authored motion moment and ambient blob drift; a third continuous rotation would compete with both and make 29 labels harder to read.

On a phone the orbit keeps its form and scrolls horizontally inside `.orbit-scroll` (`justify-content: safe center`, edges masked 28px, scrollbar hidden), centred on mount and resize by `components/OrbitScroller.tsx`, with a "Swipe the diagram" hint below. Collapsing it into stacked runs would ship the one shape this section exists to avoid. The rings are `aria-hidden`; a visually-hidden list carries the real content.

*To add a tool:* add `{ name, slug? }` to the right group's `items` array in `data/stack.ts` — the one tool list. Angles redistribute automatically. A fourth group would need a fourth `.orbit__ring--4` radius and a tone from the blob range.

*To add a tech icon:* give the tool a Simple Icons `slug` in `data/stack.ts` and re-run `node scripts/vendor-icons.mjs`. If no official mark exists, leave the slug off and it renders as a text pill — never invent one, and never re-point a slug at a similarly-named product. Do not hand-edit `components/tech-marks.generated.ts`.

### Experience

A **dense ruled list**, not cards and not a timeline. An employment list is the textbook case of the same-size-cards anti-pattern, and a timeline spine is the textbook case of a coloured `border-left` heavier than 1px. Density is correct here because the reader is scanning.

- **Grid:** `minmax(0, 18ch) minmax(0, 1fr)`, 48px column gap, 26px block padding, a 1px `--glass-edge` rule on top of every row and below the last. Collapses to one column with a 10px row gap at 760px.
- **No card, no backdrop-filter, no left rail** — which also keeps the section off the scroll-motion do-not-move list.
- **Columns are period | ownership.** The date range is the sequence signal; there are no 01/02/03 numbers.
- **The role column carries no role.** `company` and `title` render above `ownership` only when supplied. "Internship" is an employment *type*, not a job title, and putting it in the slot a recruiter reads as the title is a soft fabrication.
- Returns `null` when the list is empty, so it can never become a content-free section.
- The row links to the case study, never to a repo.

### Case study (`/work/[slug]`)

Seven statically generated pages. The governing rule is **absent, not empty**: a section whose prose has not been written does not render, and there is no "coming soon", skeleton or greyed placeholder anywhere on a case study. A visible admission of incompleteness is worse to a recruiter than a shorter page.

- **Header panel** (`.case__headline`): back link, title, hairline metadata line, tech row, standfirst — all on one opaque `--media-well` panel with a 1px `--glass-edge` and 22px radius. See The Opaque-Media Rule for why it is opaque rather than frosted.
- **Metadata line:** renders only the fields that exist — label, role, dates, ownership, use — separated by a mid dot. Nothing emits a placeholder.
- **Media well** (`.case__media`): 16/10, `max-height: 62svh`, opaque, 22px radius. Holds a screenshot or, until one exists, the project's authored `Artifact` mark as its designed empty state.
- **Sections:** Problem & context · What I built & how · Outcome & impact · Hardest technical challenge · Current limitations. Prose capped at 70ch.
- **Foot:** the email CTA in the same treatment Contact uses, plus the repo link where one exists.

**The No-Eyebrow Rule.** `CaseStudySection` takes exactly `{ id, title, children }`. There is no `label`, `kicker`, `eyebrow`, `number` or `index` prop and none may be added. The eyebrow above a heading is the one ban no brief earns back, and the section sequence carries no information the reader needs — the headings do. Making the slot structurally unavailable is stronger than leaving it unused: a future genuine need then costs an API change plus an argument.

**The No-Metric-Template Rule.** Outcome & impact is prose. Where nothing is documented the section is absent. It never renders an invented number, a bar, a ring or a count-up. This is the most tempting fabrication on the site and the structure refuses it.

**The No-Disabled-Affordance Rule.** Operations Agent has no public repo and renders **no repo affordance of any kind** — not a link, not a disabled link, not a greyed pill, not a tooltip. A disabled control implies the thing exists and is being withheld from *you*. Its note states the boundary calmly instead, and the Experience row plus LinkedIn carry the off-site verification.

### Technology row

`TechRow` renders the per-project stack in the case-study header only. Returns `null` on an empty list: the row is **absent**, not a skeleton — there is nothing to teach, because the fact does not exist yet. See The Simple Icons Bounded Exception for the mark spec.

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
- **Staggers stay 30–80ms** per step (hero 60/120/180/240/300ms across name → descriptor → subline → availability → actions → status, cards 50ms, menu links 40ms). Longer reads as the page being slow.
- **Reduced motion:** `scroll-behavior: smooth` is gated behind `prefers-reduced-motion: no-preference`; blob drift, the roll's translate/blur, the dot pulse, the toggle's icon rotation, the hero rise and the Reveal all disappear. Typing survives — it is not spatial motion — and only slows. Keyboard-initiated jumps are always instant regardless of preference.
- **Off-screen and hidden work is paused:** the roll checks `document.hidden`, an IntersectionObserver and pointer hover before advancing; the scroll ring reads progress inside a single rAF on a passive listener.
- **Theme switching:** `disableTransitionOnChange` on the provider, so flipping themes doesn't animate every transitioned property at once.
- **Ambient drift:** four blobs on 34s / 41s / 37s / 45s `ease-in-out infinite alternate` loops, each translating 5–7vmax and rotating 7–11°. Disabled outright under 720px — four animated blobs is not a mobile budget — and under reduced motion.
- **The ambient budget** is three *families* at rest, not three animations: the blob drift (four keyframe animations, one motion), the roll's caret blink, and the status dot's pulse. Anything still moving after the finger lifts that is not one of those three is a defect. Counting raw animation objects fails on a correct page, which is why the gate counts families.

#### Scroll motion

**Position-linked motion is exempt from the ambient budget: the user is the clock, and at scroll rest the page is still.** It is governed by its own ruleset:

- **One authored scroll moment per route.** The case-study media well drifts inside its frame (`media-drift`, ±3% on a layer that is 106% tall, so no edge is ever exposed); when a project has ≥2 media the drift is **replaced** by a pinned cross-fade sequence, never stacked under it.
- **Zero pins on the homepage, ever.** Hero → cards → email is the conversion path and nothing choreographed may lengthen it.
- **The pin is spent on media only** — never on Problem & context, What I built & how, or Outcome & impact, which are read, not watched. Caps at 3 beats; further media fall to a static strip.
- **`translate:` and `scale:`, never `transform:`.** A scroll animation on `transform` is last in the cascade and silently replaces the hover transform on any element that has one. Interaction keeps `transform:`; scroll gets `translate:`/`scale:`, so they compose instead of fighting. Grep gate: no `transform:` inside any keyframe referenced by an `animation-timeline`.
- **`linear` scrub, always.** An eased scrub is how cinematic scroll starts feeling laggy — the element stops tracking the finger.
- **`@supports (animation-timeline: view())` gated, with the finished state as the default.** The pin is purely additive inside the guard, so there is no reduced-motion undo block to keep in sync — without the guard the stage is a plain stacked grid at full opacity and normal length.
- **Collapsed under reduced motion and below 761px.** Mobile gets less by rule, not by accident.
- **Numeric ceilings, so "cinematic" is testable rather than a vibe:** ≤150svh of sticky travel (100svh sticky child + 50svh per beat → 200svh at 2 beats, 250svh at 3), 40–80svh of travel per beat, ≤+25% route length, ≤8% drift on any layer.
- **`svh`, never `vh` or `dvh`.** `vh` jumps when the mobile URL bar hides; `dvh` resizes continuously *during* the scroll, which is jitter.
- **No focusable element inside a pinned stage.** That is what licenses a beat's opacity reaching 0 — frames carry captions, never links.
- **No `backdrop-filter` on anything that moves.** See The Opaque-Media Rule.
- **Sticky preconditions are asserted, not assumed.** `position: sticky` dies silently under an `overflow` / `transform` / `filter` / `backdrop-filter` / `contain` ancestor, so the gate walks the full ancestor chain and samples the stage's offset across the pin's span.
- **No motion library and no polyfill.** CSS scroll-driven animations only; `package.json` is grepped for gsap / lenis / framer-motion / scroll-timeline-polyfill.

### shadcn/ui

shadcn is installed with **this world as its theme, not the reverse**. `app/globals.css` bridges every shadcn slot to a project token in both `:root` and `.dark` (`--background: var(--ground)`, `--foreground: var(--ink)`, `--ring: var(--signal)`, charts 1–4 to blob stops, chart 5 to the signal). Radix is the interaction base. Components actually in use: **Badge** (outline and secondary), **Sheet** (the menu). **Button** is present as scaffold, used only for the sheet's close control. `--accent` belongs to shadcn; the project's accent is `--signal`.

## Do's and Don'ts

### Do:

- **Do** put every new colour through the token layer in `app/globals.css`, and define it in **both** `:root` and `.dark`. A value that only exists in one theme is a bug.
- **Do** use `--signal` for marks and `--signal-ink` for text (The Two Corals Rule).
- **Do** give any surface that floats over the wash a `backdrop-filter: blur() saturate()` and a 1px `--glass-edge` border.
- **Do** keep new sections inside `.section` (a 1140px column with `var(--gutter)` outside it, 80px–96px vertical) and give them an `id` plus `aria-labelledby`, so the menu and the 1–5 shortcuts can reach them.
- **Do** wrap below-the-fold content in `<Reveal>` and stagger siblings at 50ms.
- **Do** author new icons as SVG in `currentColor` at the established stroke weights (2.25 for UI arrows, 2.5 for project marks), round caps and joins.
- **Do** put every hover rule behind `@media (hover: hover) and (pointer: fine)` and give every pressable a `:active { scale(0.97) }` — 0.98 on large surfaces, and **outside** the hover guard, since touch devices have no hover state.
- **Do** ship blocked content by ABSENCE. An unwritten case-study section does not render, `tech: []` renders no row, `media: []` renders the authored mark. Never a placeholder, a skeleton or "coming soon" on a case study.
- **Do** put text that sits outside the calm band on a surface rather than trying to move it (The Surface-Not-Spacing Rule).
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
- **Don't** rotate the Stack orbit or add a fourth continuous ambient motion; three families (the blob drift, the caret blink, the status pulse) is the budget.
- **Don't** collapse the orbit into a stacked list on mobile — it scrolls instead.
- **Don't** ship a dead link. An unavailable action takes the designed pending state (`.is-pending` plus a `.pending-note` pill), inert to pointer, keyboard and screen reader.
- **Don't** introduce a fifth radius, a second accent, or a new display face.
- **Don't** animate `transform:` from a scroll timeline. Scroll gets `translate:`/`scale:`; interaction keeps `transform:`, or the scroll animation silently eats the hover.
- **Don't** put a `:active` transform on an element that owns a full-card overlay pseudo-element — it drags the overlay out from under the cursor and the card stops being clickable (The Card-As-Link Rule).
- **Don't** infer a tool→project mapping, a role, a date, or a metric. If it was not supplied, the field stays empty and the UI omits it.
- **Don't** add a `label`, `kicker`, `eyebrow` or `number` prop to `CaseStudySection`.
- **Don't** give Operations Agent a repo affordance of any kind, including a disabled one.
- **Don't** override shadcn's `--accent` expecting the page accent; that slot belongs to shadcn, ours is `--signal`.
