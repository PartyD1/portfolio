---
name: Parth Doshi Portfolio
description: A holographic self-introduction: iridescent blobs, film grain and wide outline caps over a lavender-grey ground, with everything in the foreground made of one frosted glass.
colors:
  # --- Light theme (:root in app/globals.css, normative) ---
  ground: "#e9e6ee"
  ink: "#3f3f68"
  ink-2: "#52527a"
  surface: "#f7f6fa"
  # The case-study media well. Aliased to `surface` in both themes so it can
  # never become a value that exists in only one.
  media-well: "#f7f6fa"
  # Not a palette colour: the opaque stencil in the card gradient edge's
  # mask-composite pair. It is never painted, only used to define coverage.
  mask-opaque: "#000"
  signal: "#d9705a"
  signal-ink: "#a8412d"
  # The glass ladder. Rest, lit, raised, edge. `raised` is the pill and control
  # surface that has to read as a separate object ON glass.
  glass: "rgb(255 255 255 / 0.4)"
  glass-strong: "rgb(255 255 255 / 0.58)"
  glass-raised: "rgb(255 255 255 / 0.74)"
  glass-edge: "rgb(255 255 255 / 0.66)"
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
  # --- Dark theme (.dark in app/globals.css: a second world, not a filter) ---
  ground-dark: "#191a2e"
  ink-dark: "#ecebf4"
  ink-2-dark: "#cbcae2"
  surface-dark: "#23243d"
  signal-dark: "#f0a48f"
  glass-dark: "rgb(255 255 255 / 0.07)"
  glass-strong-dark: "rgb(255 255 255 / 0.11)"
  glass-raised-dark: "rgb(255 255 255 / 0.16)"
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
  descriptor:
    fontFamily: "Unbounded, 'Trebuchet MS', system-ui, sans-serif"
    fontSize: "clamp(14px, 3vw, 32px)"
    fontWeight: 700
    lineHeight: 1.2
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
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "0.08em"
  # The enumerated ramp: every literal size shipping in app/globals.css,
  # including both endpoints of every clamp(). The named roles above are the
  # ones that carry meaning; a size has to be in one list or the other or it
  # is drift.
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
    case-section-max: "2rem"
    contact-min: "2.25rem"
    flagship-max: "2.5rem"
    case-foot-max: "2.75rem"
    headline-max: "3.25rem"
    case-title-max: "4rem"
    contact-max: "4.5rem"
    descriptor-floor: "14px"
    display-mobile-floor: "17px"
    display-floor: "28px"
    display-mobile-cap: "30px"
    descriptor-cap: "32px"
    display-cap: "64px"
rounded:
  card: "22px"
  control: "1rem"
  # shadcn's derived --radius-sm, calc(var(--radius) * 0.6). Flow branches only.
  branch: "0.6rem"
  keycap: "6px"
  focus: "4px"
  pill: "999px"
spacing:
  gutter: "24px"
  gutter-mobile: "clamp(14px, 5vw, 20px)"
  grid-gap: "18px"
  card-pad: "30px"
  card-pad-flagship: "40px"
  pill-pad: "6px 13px"
  section-top: "80px"
  section-bottom: "96px"
  column-gap: "48px"
  case-column-gap: "56px"
  timeline-period: "236px"
  timeline-column-gap: "44px"
  timeline-row-gap: "28px"
  flow-connector: "30px"
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
  card-media:
    backgroundColor: "{colors.glass-strong}"
    textColor: "{colors.ink}"
    rounded: "{rounded.card}"
    padding: "14px"
  pill:
    backgroundColor: "{colors.glass-raised}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "6px 13px"
  card-label:
    backgroundColor: "{colors.glass-raised}"
    textColor: "{colors.ink-2}"
    typography: "{typography.micro-label}"
    rounded: "{rounded.pill}"
    padding: "6px 13px"
  live-link:
    backgroundColor: "{colors.glass-raised}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "9px 15px"
  status:
    backgroundColor: "{colors.glass-raised}"
    textColor: "{colors.ink-2}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "9px 16px 9px 14px"
  status-dot:
    backgroundColor: "{colors.signal}"
    rounded: "{rounded.pill}"
    size: "9px"
  tech-tile:
    backgroundColor: "{colors.glass-raised}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "9px 16px 9px 11px"
  timeline-card:
    backgroundColor: "{colors.glass}"
    textColor: "{colors.ink}"
    rounded: "{rounded.card}"
    padding: "26px 28px 28px"
  timeline-project:
    backgroundColor: "{colors.glass-raised}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "8px 18px 8px 8px"
  flow-node:
    backgroundColor: "{colors.glass}"
    textColor: "{colors.ink}"
    rounded: "{rounded.card}"
    padding: "18px 18px 20px"
  flow-branch:
    backgroundColor: "{colors.glass-raised}"
    textColor: "{colors.ink}"
    rounded: "{rounded.branch}"
    padding: "7px 10px 7px 24px"
  flow-bus:
    backgroundColor: "{colors.glass}"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "16px 20px"
  case-headline:
    backgroundColor: "{colors.glass-strong}"
    textColor: "{colors.ink}"
    rounded: "{rounded.card}"
    padding: "32px 34px 34px"
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
  shell-mark:
    backgroundColor: "{colors.glass-strong}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "0 16px 0 10px"
    height: "58px"
  shell-mark-hover:
    backgroundColor: "{colors.glass-raised}"
  theme-toggle:
    backgroundColor: "{colors.glass-strong}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    size: "44px"
  scroll-ring:
    backgroundColor: "{colors.glass-strong}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    size: "44px"
  menu-link:
    textColor: "{colors.ink}"
    padding: "10px 0"
  menu-key:
    textColor: "{colors.ink-2}"
    rounded: "{rounded.keycap}"
    padding: "2px 6px"
---

# Design System: Parth Doshi Portfolio

## Overview

**Creative North Star: "The Holographic Introduction"**

A person who is several things at once, introducing himself on a sheet of iridescent film. The ground is a cool lavender-grey with four soft gradient blobs pushed hard into the corners and a real film-grain tile over everything; the centre of the viewport stays calm so wide display capitals can sit on it without fighting colour. The page's whole argument is made twice, once by the words and once by the material: the blobs are three-stop gradients on four different axes, so nothing repeats, and the frosted surfaces that float over them borrow their colour rather than adding a new one.

Since 2026-09-02 that frosted glass is the entire material system, not just the card. Every pill, panel, tile, node and control on the site is the same thing at one of four opacities (rest, lit, raised, edge), so a taxonomy pill, a live-link, a tech tile, the shell's menu trigger and a flow-diagram node all read as one family. Opaque surfaces are down to one: the case-study media well, because a screenshot has nothing to keep legible.

Density is low and deliberate. One 1140px column, generous vertical air (80px in, 96px out per section), an 18px grid gap, and long unbroken measures (40 to 46ch on ledes, 60ch on About). The register is adult and editorial, never bubbly: no sparkles, no candy pastels, no 40px pillow corners, no glossy mascot shapes. Colour lives in the ground; the foreground is ink, glass and one coral.

Two complete themes ship. Dark is not an inverted filter: it is a second token set with a deep indigo ground, a second full set of blob stops mixed brighter, and the blobs held to 62% opacity so body text still survives over them. Every visual decision is expressed as a custom property in `app/globals.css`, which is the normative source for both.

**Two surfaces, not one.** The homepage (`/`) stacks Hero → Work → Experience → About → Contact; there is no Stack section any more, so the tools appear only where they were used, on each case study. Every project card is an entry point into `/work/[slug]`, a statically generated case study, seven of them. The case study inherits this world without amendment: same wash, same grain, same caps, same single accent, both themes. It adds one token (`--media-well`), two component vocabularies (`.case__*` and the `.flow__*` diagram), zero new radii and zero shadows.

**Key Characteristics:**

- Iridescent gradient blobs in all four corners, calm ground in the middle
- Wide uppercase display capitals with an outline-and-fill contrast device
- One trustworthy left edge, from the hero's first line to the footer
- One frosted glass at four opacities as the whole material system; blur is legibility, not decoration
- Exactly one accent colour, split into a shape token and a text token
- A real 128px grain raster, not an SVG filter
- Flat by construction: edges and blur convey depth, never shadows
- The world's gradient used twice as a line: the card edge and the timeline rail
- Two full themes, both first-class

## Colors

A cool lavender-grey world with slate-indigo ink, a mint → sky → lilac → apricot iridescent range reserved for the ground, and a single coral that appears only as a signal.

### Primary

- **Coral Signal** (`{colors.signal}`): The one accent. Reserved for the dots that say something is live, the scroll-ring fill, the email underline, the focus ring, the caret and the selection tint. It measures 2.65:1 on the light ground: correct as a mark, unusable as text.
- **Burnt Coral Ink** (`{colors.signal-ink}`): The text-only sibling of the accent (4.92:1 on the light ground). Carries the finale phrase "obsessed with AI" and the arrow-link hover colour. In dark it is aliased straight to `{colors.signal-dark}`, which already clears contrast on the deep ground.

### Secondary

The iridescent blob range: twelve stops in light, twelve in dark, three per blob, each blob on its own gradient axis. These are ground material and line material only; they never become a text colour or a surface fill.

- **Blob A, Mint / Sky / Lilac** (`{colors.blob-a-1}` → `{colors.blob-a-3}`): top-left, axis 8% 0% → 92% 100%.
- **Blob B, Apricot / Butter / Jade** (`{colors.blob-b-1}` → `{colors.blob-b-3}`): top-right, axis 100% 10% → 0% 90%.
- **Blob C, Lilac / Rose / Peach** (`{colors.blob-c-1}` → `{colors.blob-c-3}`): bottom-left, axis 0% 20% → 100% 80%.
- **Blob D, Sky / Mint / Butter** (`{colors.blob-d-1}` → `{colors.blob-d-3}`): bottom-right, axis 20% 100% → 80% 0%.
- **Specular Gloss** (`{colors.blob-gloss}` → transparent): a radial highlight at 34% / 28%, r 46%, clipped to each blob so it reads as an inflated object rather than a flat shape. It is a radial gradient on purpose: same look as a blurred spot, no filter pass.

Three of these stops form the world's one gradient line, `lilac → apricot → sky` (`--blob-c-1`, `--blob-b-1`, `--blob-a-2`). It is painted exactly twice: at 120° as the 2px card edge, and top-to-bottom as the 2px timeline rail.

### Neutral

- **Lavender Grey Ground** (`{colors.ground}` / `{colors.ground-dark}`): the page. Painted on `body`, on the fixed wash behind everything, and inside every timeline node so the rail visibly passes behind it.
- **Slate Indigo Ink** (`{colors.ink}` / `{colors.ink-dark}`): all primary text, all icon strokes, the monogram, the outline stroke, the case-study metadata line. 4.94:1 on the light ground.
- **Muted Indigo** (`{colors.ink-2}` / `{colors.ink-2-dark}`): every tagline, note, caption, bullet, footer line and the pending state. Darkened one step to `#52527a` on 2026-09-02 when the glass was thinned, so body runs over the thinner glass still clear 4.5:1 on the composited ground (5.30:1 on flat ground, 4.73:1 on the worst blob-tinted run). The dark value runs brighter than a conventional muted tone because it has to survive sitting over a lit blob.
- **Near-White Surface** (`{colors.surface}` / `{colors.surface-dark}`): the shadcn `--card` / `--popover` / `--sidebar` slot, and through `--media-well` the case-study media well. The one opaque surface the page itself paints.
- **Frosted Glass** (`{colors.glass}`, `{colors.glass-strong}`, `{colors.glass-raised}`, `{colors.glass-edge}` and their `-dark` twins): the material ladder. Rest fill (cards, timeline cards, flow nodes, the bus), lit fill (card hover, the case-study header panel, the card media frame, the shell controls, the scroll ring), raised fill (every pill: taxonomy, status, live-link, tech tile, timeline project chip, flow branch), and the 1px edge that declares elevation. Lowered on 2026-09-02 because the light cards read too solid.

### Named Rules

**The Two Corals Rule.** `--signal` draws shapes; `--signal-ink` writes words. Never swap them. The light accent fails text contrast (2.65:1) and the dark ground makes a second value unnecessary, which is exactly why the split is a token and not a judgement call.

**The One Accent Rule.** Coral appears in eight KINDS of place and no more: the finale phrase, the live dot, the email underline, the scroll-ring fill, the focus outline, the caret/selection tint, the arrow-link hover tint, and the hover edge tint.

Three of those cover more than one element, and that is the rule working rather than being bent. **The live dot** is any dot saying something is live right now: the hero's status dot, the live-link's dot, and the timeline's ongoing-role node (coral border plus a static ring). Only the hero's pulses, because two pulsing dots on one screen compete. **The hover edge tint** is any interactive glass surface mixing signal into its edge on hover: the project card (40%), the live-link and timeline project chip (55%), the tech tile (45%), and the shell's two controls (40%). **The arrow-link hover tint** is one kind covering `.link-arrow`, `.menu__link` and `.case__back`.

The rule counts **kinds, not instances**; that distinction is load-bearing. "The email underline" is one kind that appears on two surfaces (Contact and the foot of every case study) through a single CSS rule, and that is not a second accent. Verified by an automated census that classifies every `--signal` / `--signal-ink` use in `app/globals.css` by the selector it sits on and fails on anything unclassified.

**The Calm Centre Rule.** Iridescence lives in the four corners at negative offsets; the middle band of every viewport stays ground. Type is never composited over a gradient peak, which is what lets 4.9:1 ink hold on a coloured page.

The band is measurable, and it is narrower than it looks. With the wash fixed and blob A's core at roughly (115, 101) at 1440 wide, small `--ink-2` text in the left column clears 4.5:1 only between viewport **y ≈ 370 and 640**, verified in both themes by probing the column in 40px steps. Two consequences follow. First, the band moves with viewport size, because the blobs are `vmax`-sized, so no fixed padding can be tuned to clear it. Second, any text pinned to a page extreme (the top of a document, or low in the first viewport) sits outside it by construction and needs a surface, not spacing. That is why the case-study header and the hero's status line each carry one.

**The Ground-Only Iridescence Rule.** Blob colours are for the wash and for the two gradient lines (card edge, timeline rail). They never become body text, a surface background, or a control fill.

## Typography

**Display Font:** Unbounded (`--font-display`, via `next/font/google`), falling back to Trebuchet MS, system-ui, sans-serif
**Body Font:** Hanken Grotesk (`--font-body`, via `next/font/google`), falling back to system-ui, -apple-system, sans-serif
**Label/Mono Font:** none; micro-labels are Hanken Grotesk, uppercase, tracked out

**Character:** Unbounded is a wide, geometric, high-contrast display face; set in capitals with positive tracking it gives the page its poster voice. Hanken Grotesk underneath is quiet, humanist and highly legible at 17px, so the display face never has to carry a paragraph.

### Hierarchy

- **Display** (700, `clamp(28px, 5.1vw, 64px)`, line-height 1.12, tracking 0.005em, uppercase): the hero headline only, the name. Drops to `clamp(17px, 5.9vw, 30px)` / line-height 1.18 under 720px.
- **Descriptor** (700, `clamp(14px, 3vw, 32px)`, line-height 1.2, tracking 0.005em, uppercase, display face): the rolling secondary line under the name. See The Name-Then-Descriptor Rule. **Both bounds are px, never rem, and that is a rule rather than a preference**; see The Px-Bound Display Rule.
- **Headline** (700, `clamp(2rem, 4.4vw, 3.25rem)`, line-height 1.02, tracking 0.015em, uppercase): section titles: WORK, EXPERIENCE, ABOUT. Contact overrides to `clamp(2.25rem, 6.5vw, 4.5rem)`; the case-study title runs `clamp(2.25rem, 6vw, 4rem)` at line-height 1.08; the case-study foot title runs `clamp(1.75rem, 4vw, 2.75rem)`; the menu's section links run `clamp(1.75rem, 5vw, 2.5rem)`.
- **Case-study section title** (700, `clamp(1.5rem, 2.6vw, 2rem)`, tracking 0.005em, uppercase): the five case-study section headings and the flow diagram's "How it works". There is no eyebrow, kicker or number above any of them, ever.
- **Title** (700, `clamp(1.25rem, 1.9vw, 1.625rem)`, tracking 0.01em, uppercase): project card names. The flagship card scales up to `clamp(1.625rem, 3vw, 2.5rem)`.
- **Period** (600, `clamp(0.9375rem, 1.4vw, 1.0625rem)`, line-height 1.2, tracking 0.02em, uppercase, display face): the timeline's date ranges, right-aligned against the rail. The one place the display face runs at 600 below headline size, so the dates read as part of the heading system rather than as body copy.
- **Body** (400, 1.0625rem / 17px, line-height 1.5): every paragraph. Measures are capped: 46ch on the hero subline and the case foot lede, 40ch on card taglines and the contact lede, 30ch on the flagship tagline, 52ch on case-study bullets, 62ch on timeline ownership and the case note, 60ch on About (which runs line-height 1.6).
- **Small** (400, 1rem, line-height 1.5 to 1.55): card taglines, case-study bullets, timeline title and ownership, flow node titles (at 600). The step under body, used wherever copy sits inside a glass surface rather than on the page.
- **Meta** (500 or 600, 0.9375rem): the hairline of facts. The case metadata line, the card's usage fact and its links, the live-link, the tech tile name, the availability line, the back link, the menu foot.
- **Label** (500, 0.875rem, tracking 0.06em, uppercase): the status line. Captions, flow details, the footer and the mobile tech name use the same size at normal tracking, sentence case.
- **Micro-label** (600, 0.6875rem, tracking 0.08em, uppercase): the card's taxonomy label, and nothing else. A second micro step, 600 / 0.75rem / tracking 0.08em uppercase, carries the menu keycaps and the "coming soon" pending flag; the same size at 700 in the display face numbers the flow diagram's nodes.

### The outline-and-fill device

`.type-outline` is the signature. It renders **solid ink by default**, then, inside `@supports (-webkit-text-stroke: 1px currentColor)`, switches to `color: transparent` with `-webkit-text-stroke: 0.03em var(--ink)` at `font-weight: 400`. The declaration order is the point: a browser without text-stroke keeps readable solid type instead of invisible text.

The light weight is not a style choice. Unbounded's heavy weights are drawn with self-overlapping contours, so stroking at 700 exposes the construction lines inside H, E, Y and M. At 400 there are no overlaps to reveal, and the slightly heavier 0.03em stroke keeps the outline reading at display size. Under 720px the stroke floors at `max(1.1px, 0.03em)`, because 0.03em is sub-pixel at phone display sizes.

### Named Rules

**The Outline-Lead Rule.** Only the lead-in words are outlined: "HEY, I'M". The subject is always filled. Outline is a contrast device between the greeting and the person, never a decoration applied to a whole heading.

**The Name-Then-Descriptor Rule.** The headline is **one display line, the name**. What Parth *is* follows on its own secondary line (`.hero__role`), at roughly half the name's size on desktop, still in the display face so it reads as part of the headline system rather than as body copy.

The descriptor is sized by its RATIO to the name, not by an absolute step: about 0.50× at 1440, 0.59× at 768, 0.61× at 390, compressing to 0.82× only at 280 where both are near their floors. A flat rem floor made it *larger* than the name at 280px, which is not a hierarchy; it just looked like the headline had wrapped. Asserted at every width in both themes.

**The Px-Bound Display Rule.** Every bound of a display clamp is expressed in px, never rem. The display size is one side of an invariant whose other side is measured in vw; a root-relative bound lets a large default font size inflate the type without inflating the column, and under `overflow: clip` that is a silent-overflow generator. It applies to the mobile floor exactly as much as to the desktop cap. The assertion suite runs twice, once at the default root size and once at a simulated 20px root, and the two runs must produce identical numbers.

**The No-Wrap Slot Rule.** The typing slot is `white-space: nowrap`, and the headline must satisfy

```
need(slot)  ≤  0.95 × column,   column = min(viewport − 2·gutter, 1140px)
```

at every width. `nowrap` is the load-bearing half. Without it a future violation silently relays out into a two-line-tall slot; the page still looks plausible and nothing fails. With it, the same violation clips against the hero's `overflow: clip`, which is visible and, more usefully, assertable as `scrollWidth > clientWidth`.

**The Sized-Slot Rule.** The slot reserves the width of the widest phrase, declared in the data as `widest: true` and never inferred from character count; a phrase with fewer but wider glyphs would under-size the box. A caret is rendered inside the hidden sizer as well as the live text, so the slot does not grow by 0.12em at the moment the widest phrase finishes typing, and `.roll__caret`'s width rule is deliberately **unscoped** so both copies measure identically. The blink is scoped to the live caret only: a blink on a `visibility: hidden` sizer would be invisible yet still count as a running animation against the ambient-motion budget.

**The Never-Stroke-Bold Rule.** Outlined type runs at weight 400 inside the `@supports` guard, and the solid fallback runs at 700. Raising the outline weight to match the fill re-introduces the self-overlap artefacts the guard exists to avoid.

**The Uppercase Display Rule.** `h1`, `h2` and `h3` are uppercase Unbounded at 700 with positive tracking (0.015em base). Body copy is never uppercase; only the status line, the two micro steps and the timeline period are, and they always carry at least 0.02em tracking (0.06em and up below 15px) to stay legible.

**The Tracked-Caps-In-The-Foot Rule.** The `.pill` carries no tracking and no uppercase by default. `.card__label` adds both, because a card foot is the only place this system allows tracked caps as a label. A pill anywhere else (About's range, the status line's own tracking aside) is sentence case at 500.

## Layout

One column, left-aligned, shared by every surface. `.section` is `max-width: calc(1140px + var(--gutter) * 2)`, `margin: 0 auto`, `padding: 80px var(--gutter) 96px`, with `scroll-margin-top: 84px` so anchor jumps clear the fixed header. Work pulls its top padding in to 32px and Experience to 16px, because the two sit tight as one story (what was built, then who paid for it). Under 760px the padding drops to `64px var(--gutter) 72px` and section heads stack from a space-between row to a left-aligned column with a 12px gap. Section heads carry a title only; there are no ledes on Work or Experience.

`--gutter` is a token: **24px**, becoming `clamp(14px, 5vw, 20px)` under 760px. It is fluid below 400px so the column stays scale-proportional instead of taking a fixed 20px bite that grows as a fraction on small phones; at every width at or above 400px it evaluates to exactly the documented 20px. It exists as a token because the hero's no-wrap invariant is measured against the column it produces, so every surface sharing the left edge has to derive from one number.

The hero is its own grid: `min-height: 100svh`, `align-content: center`, `justify-items: start`, `text-align: left`, `padding: 120px var(--gutter) 56px`, `max-width: calc(1140px + var(--gutter) * 2)`, `margin-inline: auto`, `overflow: clip`. Its column is declared `grid-template-columns: minmax(0, 1fr)`, not left implicit, so children have a width to shrink against and the rolling headline can never overflow the viewport. Under 720px it becomes `96px var(--gutter) 48px` / `min(100svh, 620px)`.

Work is a two-column grid (`repeat(2, minmax(0, 1fr))`, 18px gap) with the flagship spanning `1 / -1`; it collapses to one column at 760px. `.work__item` is itself `display: grid` so `.card { height: 100% }` resolves and a row's cards share a bottom edge. Experience is a rail-and-column timeline (below). About is `minmax(0, 1fr) minmax(0, 1.5fr)` with a 48px gap, collapsing to one column with a 20px gap at 760px. Contact is left-aligned like everything else, with 96px/128px vertical padding.

The case study is `max-width: calc(1140px + var(--gutter) * 2)`, `padding: 0 var(--gutter)`, header padding-top 140px (96px under 760px), the flow diagram 64px below the header (48px), then a two-column spread of short sections (`repeat(2, minmax(0, 1fr))`, 56px column gap, one column under 760px), each section `padding: 64px 0 0`, bullets capped at 52ch, and a foot separated by a 1px rule with 72px/128px padding (56px/96px).

The header is fixed with `pointer-events: none` and re-enabled on its children, so it never blocks the page underneath; padding `22px 28px`, dropping to `14px 16px` at 640px. The scroll ring sits fixed at 28px from the bottom-right corner, 18px at 640px.

Breakpoints in use: **640px** (shell padding and mark size, scroll-ring insets), **720px** (hero type, blob sizing and drift, outline stroke floor), **760px** (grid collapses, section padding, gutter, timeline collapse, case-study spread, tech tile size, scroll-motion cutoff at 761px), **900px** (the flow diagram turns from a row into a column).

### Named Rules

**The 1140 Rule.** Content lives in a **1140px column** with the gutter **outside** it: `max-width: calc(1140px + var(--gutter) * 2)` with `padding: … var(--gutter)`. Writing it as `max-width: 1140px` with border-box padding yields a 1092px column and quietly contradicts the rule. The only full-bleed layers are the fixed wash and the fixed header.

**The Shared-Left-Edge Rule.** The hero headline, descriptor, subline, availability line, actions, status line and every section head below them sit on the same left edge, asserted to 0.0px at every width in both themes. This is what left-aligning the hero buys, and it is why Contact is not centred: with the hero left-aligned, a single centred block reads as an oversight rather than as a finale.

**The Three Grid Shapes Rule.** The homepage has exactly three: Work's `repeat(2, minmax(0,1fr))`, About's `minmax(0,1fr) minmax(0,1.5fr)`, and the timeline's `236px minmax(0, 1fr)` with a 44px column gap (the rail runs down the middle of that gap). All three live inside The 1140 Rule and all three collapse to one column at 760px. The case study adds its own two: the sections spread and the flow row. A sixth needs a reason.

**The Fixed-Ground Rule.** The wash is `position: fixed; inset: 0; z-index: -1`, `aria-hidden`, and `pointer-events: none`. It scrolls with nothing and intercepts nothing.

**The Portrait-vmax Rule.** Blobs are sized in `vmax` on desktop (40 to 46vmax) but in `vw` under 720px (76 to 84vw), because on a phone `vmax` is the viewport *height*, which makes the blobs full-bleed and swallows the body copy.

## Elevation & Depth

There are no shadows in this system. Not "few": none. Depth comes from three stacked materials: the fixed blob wash at `z-index: -1`, the grain tile over it, and frosted glass surfaces above. Elevation is declared once per surface, as a 1px `--glass-edge` border, and its strength is declared by which rung of the glass ladder the surface sits on: `--glass` for the big panels (cards, timeline cards, flow nodes, the bus), `--glass-strong` for a lit or heavier panel (card hover, the case-study header, the card media frame, the shell controls, the scroll ring), `--glass-raised` for the small object that has to read as sitting ON glass (every pill). Hover lifts a card 3px and moves it one rung up the ladder; it never adds a shadow.

Blur is matched to the job. Big panels run `backdrop-filter: blur(24px) saturate(1.4)`; the case-study header runs `blur(30px) saturate(1.4)` because it sits directly on blob A's core; the shell controls `blur(16px) saturate(1.3)`; the menu sheet `blur(28px) saturate(1.3)` over 86% ground; pills and the scroll ring a plain `blur(12px)`, since they are small and mostly sit on a panel that already blurred. The card's media frame carries no blur of its own: it is inside the card, which has.

The grain is a real raster: `public/textures/grain.png`, 128×128, 8-bit grayscale, tiled at `background-size: 128px 128px`, `mix-blend-mode: multiply` at 0.055 opacity in light and `screen` at 0.05 in dark. It is generated by `scripts/make-grain.mjs` (`node scripts/make-grain.mjs public/textures/grain.png`) from a seeded mulberry32 PRNG (seed `20260901`), averaging three samples per pixel so it reads as film grain rather than salt-and-pepper. Same seed, same bytes; the asset is reproducible and carries its provenance in the generator.

### Shadow Vocabulary

None. Do not add one.

### Named Rules

**The Edge-Not-Shadow Rule.** A surface declares its elevation once, as an edge. A 1px border *under* a soft drop shadow is the ghost-card look this world refuses. The scroll ring is the one glass object that carries no edge (`border: 0`); it is a control on the page, not a panel on the wash.

**The Blur-Is-Legibility Rule.** Any surface that carries text over the wash must carry `backdrop-filter: blur() saturate()`. The blur is what keeps text readable over a saturated blob; it is a functional requirement, not a finish.

**The Glass Ladder Rule.** Four opacities and no fifth: `--glass` rest, `--glass-strong` lit, `--glass-raised` for an object on glass, `--glass-edge` for the line. A surface picks its rung by what it sits on, not by taste: a pill inside a card takes `raised` because `glass` on `glass` disappears. There is no `color-mix` of white into anything; the ladder is the whole vocabulary.

**The Opaque-Media Rule**, a named amendment to The Blur-Is-Legibility Rule. The case-study media well is **opaque** (`--media-well`), because its content is opaque. Blur exists to keep *text* legible over the animated wash; a screenshot has no such job, and blurring behind it would be finish rather than function. An opaque well is also the only surface that may **travel under scroll motion**: a moving `backdrop-filter` element re-samples and re-blurs its backdrop every frame, over a blob wash, under a `mix-blend-mode` grain layer, the single worst thing this page can ask a compositor to do.

**The Surface-Not-Spacing Rule.** Text that sits outside the calm band cannot be rescued by moving it. The band is only about 270px tall and moves with viewport size (the blobs are `vmax`-sized), and the case-study header block is taller than the band anyway. Text pinned to a page extreme gets a surface; padding tuned to clear a blob at one width is wrong at every other. The case-study header takes `--glass-strong` at a heavier blur than a card and runs its metadata line in `--ink` rather than `--ink-2` to hold the floor; the hero's status line takes a `--glass-raised` pill for the same reason.

**The Held-Back-Blob Rule.** In dark, `.wash__blob` runs at `opacity: 0.62`. The blobs are far brighter than the deep indigo ground, and body text has to survive over them.

## Shapes

Six radii, and nothing else. **22px** (`--radius-card`) for every glass panel: project cards, the card media frame, timeline cards, flow nodes, the case-study header and media well. **999px** for pills: the taxonomy label, the status line, the live-link, tech tiles, the timeline project chip, the shell's menu trigger, the theme toggle, the scroll ring, the timeline rail's rounded ends, the hit areas on card links. **1rem** (shadcn `--radius`) for the two scaffold-scale containers: the flow bus and the timeline chip's 44px mark box. **0.6rem** (`--radius-sm`, derived at 0.6× from `--radius`) on the flow diagram's branch tags, so a branch reads as a smaller object than the node it hangs under. **6px** on the menu keycap. **4px** on the focus ring. Dots, nodes and index badges are true circles at 50%.

The recurring silhouettes are the circle, the pill and the blob. The circle appears as the scroll ring, the status dot, the live-link dot, the timeline node (14px, 2.5px ink border, ground fill) and the flow diagram's 26px index badge. The pill is the small-object shape everywhere. The blob appears only in the wash, from four frozen SVG paths in `components/Blob.tsx`, generated once by a seeded Catmull-Rom through jittered radial points and then pasted in. Nothing is computed at runtime.

Lines are hairlines: 1px on every glass edge, 1.5px on the menu keycap, the flow index badge and the timeline's live ring, 2px on the card gradient edge, the timeline rail, the flow connector rule and the hero wave, 2.5px on the timeline node, 1px **dashed** on the flow bus only. Icon strokes are 2 to 3px.

Icons are authored, not imported: `components/Icon.tsx` exports ArrowRight, ArrowLeft, ArrowDown and ArrowUpRight on a 20×20 viewBox at `stroke-width: 2.25`, round caps and joins, `currentColor`, `fill: none`. The shell's three-rule menu glyph, the theme toggle's sun and moon (2) and the monogram (2.4) match that construction. Project marks in `components/Artifact.tsx` are the same language at 2.5 stroke: geometric diagrams, never illustration. They render inside the card media frame and, at 44px, inside the timeline's project chip.

### Named Rules

**The One Radius Family Rule.** 22px panel, 999px pill, 1rem control, 0.6rem branch, 6px keycap, 4px focus. A new value needs a new reason.

**The Drawn-Not-Set Rule.** Every mark on this page is authored SVG in `currentColor`: the monogram, the three-rule menu glyph, the arrows, the sun and moon, the seven project marks, the case-study bullet and the flow arrowheads. No icon fonts, no glyph characters standing in for icons, no raster illustration.

**The Simple Icons Bounded Exception**, a named amendment to the rule above, and the only one. Technology brand marks are vendored from Simple Icons so a case study can say what a project was built with in the vocabulary a reader already recognises. The exception is bounded on every axis:

- **One surface.** The case-study header only. Never on homepage cards, which keep the authored stroke vocabulary intact.
- **One size.** A 22px box (19px under 760px), inside a glass tile with a 10px gap to a 0.9375rem name.
- **One ink.** `fill="currentColor"`, `--ink`. **Brand geometry ships; brand colour does not.** Some 25 uncontrolled brand accents would blow The One Accent Rule on a page whose whole identity is having exactly one.
- **Fill, not stroke.** These are silhouettes; stroking them would be a worse lie than importing them.
- **Generated, never hand-edited.** `scripts/vendor-icons.mjs` reads slugs from `data/stack.ts`, the one tool list, pulls paths from a pinned `simple-icons` installed into a throwaway prefix at build time, and writes `components/tech-marks.generated.ts`. The package is never added to `package.json`. There is a grep gate: no six-digit hex may appear in the generated file.
- **Local marks under the same contract.** A tool Simple Icons does not carry may be drawn in `components/tech-marks.local.ts` as a single filled path in `currentColor` with its own viewBox: OpenClaw and Twilio today. Never a brand hex, never a stroke.
- **Nothing is invented, and a tool with no mark is dropped.** `TechRow` filters out any tool that resolves to no mark rather than shipping a text pill, on Parth's call: a recruiter scans logos. The row is absent when nothing is left.

Icon data is CC0-1.0; the marks remain the trademarks of their owners, used to identify technologies and not as endorsement.

## Components

### Cards (project cards)

Frosted panes floating over the wash. Character: quiet, wide, and lit only at their edge.

- **Corner Style:** 22px (`{rounded.card}`)
- **Background:** `{colors.glass}` at rest, `{colors.glass-strong}` on hover, behind `blur(24px) saturate(1.4)`
- **Border:** 1px `{colors.glass-edge}`; on hover it mixes 40% signal into the edge
- **Shadow Strategy:** none; see Elevation & Depth
- **Internal Padding:** 30px (24px under 760px); the flagship runs 40px (26px under 760px)
- **Layout:** `minmax(0, 1fr) minmax(0, 38%)`, 24px column gap. `.card__body` is a flex column (14px gap) in column 1; the media frame sits in column 2. The flagship is `minmax(0, 1.15fr) minmax(0, 1fr)`, 32px gap, `min-height: 400px`, media in a 4/3 box; under 760px it stacks and the media centres at `max-width: 320px`.
- **Fields, in order:** name, tagline (1rem, `--ink-2`, 40ch), the one usage fact where supplied (`.card__use`, 0.9375rem at 500 in full `--ink`, because somebody other than the author using the thing is the strongest fact on the site), the foot, and the taxonomy pill on its own right-aligned line. **No description and no note:** those came off on 2026-09-02 as clutter, and the case study is one click away.
- **One structure, always.** Weight changes classes, span, type scale and media aspect. It **never changes which fields render**.
- **Media frame** (`.card__media`): a square (4/3 on the flagship) glass well, `{colors.glass-strong}` on the same 1px edge and 22px radius as every other panel, 14px padding. The authored `Artifact` mark renders inside it at 0.72 opacity (0.8 on the flagship) and drifts `translate(-3px, -3px)` on card hover.
- **Foot** (`.card__foot`): a wrapping flex row, 12px/18px gaps, `margin-top: auto` so all feet in a row share a baseline, 18px above. Order: the live-link pill where a `demo` exists, then the `case study` arrow link, then `GitHub ↗`.
- **Hover:** `translateY(-3px)` plus the background/border swap, all at 200ms `--ease-out`. Every hover rule sits behind `@media (hover: hover) and (pointer: fine)`.
- **Press:** `.card:active { transform: scale(0.98) }`, deliberately **outside** the hover guard; a touch device gets no hover state, so without it the largest tap target on the page acknowledges nothing. 0.98 is the documented value for a large surface, matching menu links; small controls use 0.97.
- **Gradient edge:** one card per row carries a 2px `linear-gradient(120deg, --blob-c-1, --blob-b-1, --blob-a-2)` painted into `.card::before` and masked with `mask-composite: exclude` so only the border shows. See The Gradient Hand-Off Rule.

**The Card-As-Link Rule.** The whole card opens its case study, via a pseudo-element overlay on the `<Link>` (`.card__hit::after { inset: 0 }`) rather than an anchor wrapping the content; wrapping would nest the repo anchor inside another anchor, which is invalid. The live-link and the repo link sit at `z-index: 1` above the overlay and stay independently clickable.

**`.card__hit` carries no `:active` transform, and that is load-bearing.** The overlay is a pseudo-element *of that anchor*, so a transform on the anchor transforms the overlay with it: scaling a small inline-flex box in the foot drags the full-card overlay toward that box's centre, far enough that a press starting near the top of the card ends outside it. The press response lives on `.card` instead, which is the overlay's containing block rather than its parent.

**The Gradient Hand-Off Rule.** Neither language can pick the gradient card alone, so each owns the case it can answer. **JS owns the two-column parity** and proves it: with the flagship spanning its own row, for `k = i − 1`, `row = ⌊k/2⌋`, `col = k % 2`, the edge falls where `col === row % 2` → `i = 1, 4, 5`, one per row alternating left → right → left. **CSS owns the one-column case** via `:nth-child(odd)`, because JS cannot know the column count and duplicating the 760px breakpoint in JS is the coupling worth avoiding. `Work.tsx` emits `data-edge-2col`; every gradient property is declared once on `.card::before` with `content: none`, and the two media queries only flip `content`.

**The Span Invariant.** Only `weight === 1` spans a row. Weight 2 changes type scale and media aspect only. The parity arithmetic above assumes exactly one spanning item, so giving weight 2 a span would silently break the alternation.

*To add a project:* append to `data/projects.ts` (`slug`, `name`, `label`, `tagline`, `weight`, `tech`, `media`, optional `use`/`href`/`demo`/`ownership`/`note`/`study`). Add its mark to `components/Artifact.tsx` under the same slug. The route, the gradient parity, the card and the timeline chip all follow.

### Pills

The one small-surface vocabulary, and the thing that replaced the shadcn Badge everywhere.

- **Style:** `{colors.glass-raised}` behind `blur(12px)`, 1px `{colors.glass-edge}`, 999px, `padding: 6px 13px`, 0.8125rem at 500, line-height 1.2, `--ink`, `white-space: nowrap`, `width: fit-content`.
- **Where:** About's four range chips, and the card's taxonomy label (`.pill.card__label`), which alone adds 0.6875rem / 600 / 0.08em uppercase in `--ink-2` and `align-self: flex-end`.
- **State:** none. A pill is a label, not a control; the controls built on the same shape are the live-link, the tech tile, the timeline chip and the shell mark, each documented below.

### Links

- **Arrow link** (`.link-arrow`): the page's primary action shape: an authored arrow, then a lowercase sentence-case label at 17px/500. Hover moves the arrow 4px and turns the text `{colors.signal-ink}`; `:active` scales to 0.97.

**The Arrow Grammar Rule**, in three cases. A **leading** arrow means the link **stays on the site**: `→ see my work`, `→ more about me`, `→ case study`, `← back to the work` (which points back, and whose hover moves it left rather than right). A **trailing `ArrowUpRight`** means the link **leaves**: `GitHub ↗`, `Try ScorelyAI live ↗`. A **trailing `ArrowDown`** means it downloads: `Résumé ↓`. That distinction is what makes `case study` and `GitHub ↗` read as different promises rather than as two links of equal weight.

- **Pending state** (`.link-arrow.is-pending`): a designed state, not a stopgap. Text drops to `--ink-2`, cursor stays `default`, hover is explicitly suppressed, and a `.pending-note` pill (0.75rem / 600 / 0.08em uppercase, 1px `--border`, 999px, `3px 8px`) spells out "coming soon". It is inert to pointer, keyboard and screen reader alike (`aria-disabled`). Gated by `resume.ready` in `data/site.ts`, currently `true`, so today the résumé renders as a real `download` link and the pending state is dormant.
- **Contact email**: display face, `clamp(1rem, 2.6vw, 1.75rem)` at 600, underlined with a 3px coral rule at 10px offset. Hover swaps the underline to ink; the text colour never moves.
- **Card link** (`.card__hit`): 15px/600 in a pill hit area created with negative margins (`padding: 8px 14px; margin: -8px -14px`), so the tap target is generous without changing layout. It also owns the full-card overlay; see The Card-As-Link Rule. **Repo link** (`.card__repo`): the same shape at 500 in `--ink-2`, `8px 12px` / `-8px -12px`, rising to `--ink` on hover.

**The Live-Link Rule.** A project with a public, working deployment gets a `demo`, and that link is the loudest affordance on its card and repeats at the TOP of its case study, not only in the footer. A thing a visitor can *use* outranks a thing they can read. It renders as a raised glass pill (`.live-link`: `{colors.glass-raised}` behind `blur(12px)`, 1px edge, 999px, `9px 15px`, 0.9375rem at 600, 9px gap) carrying a static 8px coral dot, the text "Try it live" on the card and "Try {name} live" on the case study, and a trailing `ArrowUpRight`. Hover mixes 55% signal into the edge and nudges the arrow; press scales 0.97. The case-study instance (`.case__live`) sits 22px under the title, before every other fact. This system has no buttons; the pill is the strongest control shape it owns.

**The Email-Is-The-Loudest-Thing Rule.** Email is the only element on the site that gets the display face *and* the coral underline. That combination **is** the CTA hierarchy: there is no button, because an email button above the fold asks for contact before any evidence has been shown. Résumé and social links are never given display type and never given coral at rest; their only coral is the arrow-link hover tint every link shares. The same email treatment repeats at the foot of every case study, which is the highest-intent moment on the site, and that is one kind of accent place on two surfaces rather than a second accent.

### Navigation

There is no persistent nav. The fixed shell carries **the mark, which IS the menu**, on the left, and the theme toggle on the right. Both are the same glass, so the two corners agree.

- **Shell mark** (`.shell__mark`): a 58px-tall glass pill (50px at 640px), `{colors.glass-strong}` behind `blur(16px) saturate(1.3)`, 1px edge, `padding: 0 16px 0 10px`, holding the 62px-wide PD monogram (50px at 640px) and, 4px to its right, a 20px three-rule glyph in a 24px box (`.shell__mark-lines`, 2.25 stroke, round caps, the third rule shorter). It is the `SheetTrigger`. Hover moves it to `{colors.glass-raised}` and tints the edge 40% signal; press scales 0.97.
- **Theme toggle** (`.theme-toggle`): a 44px glass circle on the same fill, blur and edge, holding an 18px sun or moon that cross-fades (and, with motion allowed, un-rotates from −45° / 0.9 scale) over 200ms. Same hover and press as the mark.
- **The menu sheet** opens from the **left**, the mark's own edge, so it scales in from its trigger rather than from the far side of the screen. A shadcn/Radix `Sheet` (`side="left"`) styled `.menu`: 86% ground with `blur(28px) saturate(1.3)`, a 1px `--glass-edge` **right** border, 48px/40px padding, 40px gap. Links are display-face uppercase `clamp(1.75rem, 5vw, 2.5rem)` at 0.01em with a bordered keycap on the right (0.75rem / 600 / 0.08em, 1.5px `currentColor`, 6px radius, `2px 6px`, `--ink-2`): **four: 1 Work, 2 Experience, 3 About, 4 Contact**. Each link rises in on open at 420ms with a `calc(var(--i) * 40ms + 80ms)` stagger. Hover turns a link `--signal-ink`; press scales 0.98. The foot lists email, GitHub, LinkedIn and the résumé at 0.9375rem in `--ink-2`.

**Navigation is route-aware.** Menu hrefs are root-relative (`/#work`), and the global keyboard handler (`components/Shell.tsx`) scrolls when the section exists in this document and otherwise `router.push`es to `/#id`. A shortcut that does nothing is worse than one that does not exist, because the user cannot tell which they are getting. Keyboard-initiated jumps always scroll with `behavior: "auto"`, at any motion preference, including across routes.

### Signature Component: the typewriter headline

The hero's memorable moment. `"HEY, I'M"` in outline plus `PARTH DOSHI` filled over a two-pass sine wave; on a secondary line below it, a slot that **types a phrase, holds it, backspaces it away, and types the next**, cycling six bare descriptors (developer, researcher, computer scientist, athlete, mentor) and landing on "obsessed with AI" in `{colors.signal-ink}`.

The phrases carry no article and no full stop. With the "and I'm" lead gone the roll is a descriptor rather than the end of a sentence, and the punctuation went with it.

Two structural rules make the shape work:

**The slot is a fixed box.** `.roll` is an `inline-grid` with `justify-items: start`; a hidden `.roll__sizer` holding the widest phrase reserves the width, and `.roll__live` sits in the same `1 / 1` cell. The slot is therefore a constant width and nothing after it moves; measured drift across a full cycle is **0.000px**.

**The caret is what licenses the trailing space.** Because text is left-aligned in a fixed slot, short phrases leave room on the right. With a caret at the end of the typed text that reads as a text field rather than a gap.

Timing (`components/RoleRoll.tsx`): 320ms start delay after `document.fonts.ready`, 52ms per character with 26ms jitter typing, **26ms per character erasing** (backspacing is a correction, not a thought, so it is quicker), 1900ms hold per phrase (4200ms on the finale), 320ms beat between phrases. The caret is solid while the text moves and blinks with `steps(2, jump-none)` only in `data-mode="holding"`. Clicking wipes the current phrase and moves on. The cycle pauses on hover, on a hidden tab, and when scrolled off-screen. There is no spatial entrance or exit on the phrase itself: characters appear and disappear in place.

Under `prefers-reduced-motion: reduce` the per-character animation is dropped entirely: phrases swap whole on a 3400ms clock. Typing is not spatial motion, but a continuous churn of characters is still churn.

Before hydration `[data-pretype]` holds the glyphs at `color: transparent` with a 1.6s CSS reveal, so the box never reflows and the phrase still appears if JS never arrives. The whole element is `aria-hidden`; the `h1` carries the full sentence for assistive tech.

*To change the phrases:* edit the `phrases` array in `components/Hero.tsx`. `widest: true` sizes the slot, `accent: true` marks the finale, `hold` overrides the dwell.

### Status line

The availability pill under the hero actions: `{colors.glass-raised}` behind `blur(12px)`, 1px edge, 999px, `padding: 9px 16px 9px 14px`, 0.875rem / 500 / 0.06em uppercase in `--ink-2`, with a 9px coral dot 10px to the left. The dot pulses: a `::after` ring scaling 1 → 3 and fading 0.5 → 0 over 2.6s on `--ease-out`, transform and opacity only, never an animated box-shadow. It is a pill because it sits low in the first viewport, outside the calm band, where no ink was dark enough in both themes; see The Surface-Not-Spacing Rule.

### Signature Component: the Experience timeline

One rail, a node per role, the period in display type, a glass card per role that ends in the project it produced. Work says what was built; this says who paid for it, and every card links back to the card it grew out of, with that project's own mark, so a reader walks between the two without hunting. The date range is the sequence signal; there are no 01/02/03 numbers, and the role column carries no role ("Internship" is an employment type, not a title). Returns `null` when the list is empty.

- **Geometry:** `--tl-period: 236px`, `--tl-gap: 44px`, the rail at `period + gap / 2` so it runs down the middle of the gap. Items are `236px minmax(0, 1fr)` grids, 28px apart; the list has 6px of vertical padding so the rail overshoots the first and last node.
- **Rail** (`.timeline__list::before`): 2px wide, 999px ends, `linear-gradient(to bottom, --blob-c-1, --blob-b-1, --blob-a-2)`, the same three stops as the card edge, `transform-origin: top`.
- **Period** (`.timeline__period`): display face, `clamp(0.9375rem, 1.4vw, 1.0625rem)` at 600, uppercase, 0.02em, right-aligned, 24px down so it sits level with the card's first line.
- **Node** (`.timeline__node`): a 14px circle on the rail, 2.5px `--ink` border, `--ground` fill so the rail visibly passes behind it, `translate: -50% 0`. The ongoing role (`data-live`) takes a `--signal` border and a static 1.5px ring 6px outside it at 0.45 opacity. Static, because the pulse belongs to exactly one element and that is the hero's dot.
- **Card** (`.timeline__card`): `{colors.glass}` behind `blur(24px) saturate(1.4)`, 1px edge, 22px, `padding: 26px 28px 28px`, a flex column with a 6px gap: company (1.0625rem / 600), title (1rem, `--ink-2`), ownership (1rem / 1.55, `--ink-2`, 62ch, 8px above), then the project chip 18px below.
- **Project chip** (`.timeline__project`): a raised pill (`{colors.glass-raised}`, 1px edge, 999px, `padding: 8px 18px 8px 8px`, 14px gap) holding the project's `Artifact` mark in a 44px `--radius` box filled `{colors.glass-strong}` with 7px padding, the project name at 0.9375rem / 600, and a trailing `ArrowRight`. Hover tints the edge 55% signal and nudges the arrow 3px; press scales 0.97. It links to the case study, never to a repo.
- **Motion:** the whole timeline is a `Reveal`; each item is its own `Reveal` staggered `120 + i × 70ms`. On reveal the rail draws top-down (`scaleY(0) → 1` over 800ms, opacity over 300ms, both 80ms late) and each node settles in after its card has risen (`scale(0.6) → 1` plus opacity over 260ms, 240ms late). Transitions, not keyframes, so an interrupted scroll retargets instead of restarting. Reduced motion keeps the opacity changes and drops the movement.
- **Under 760px:** the period column collapses (`--tl-period: 0`, `--tl-gap: 36px`, rail at 9px), items become one column with a 10px row gap and 36px of left padding, the period goes left-aligned above the card, the node shrinks to 12px at the period's baseline, the card pads `22px 22px 24px`.

### Signature Component: the Flow diagram

The system, drawn: a chain of glass nodes with connectors, an optional fan of parallel branches under a node, and an optional bus underneath the whole chain for the thing every step sits on. HTML and CSS rather than SVG, deliberately: the nodes carry real text that has to wrap, reflow to one column on a phone, and read to a screen reader. The connectors are pseudo-elements so the DOM stays a plain ordered list. Every node's copy comes from the same supplied prose the bullets do; the diagram claims nothing the prose did not.

- **Placement:** on a case study, between the header and the sections, 64px below the header (48px under 760px), under a "How it works" heading at the case-section size.
- **Row:** `.flow__steps` is `repeat(var(--n), minmax(0, 1fr))` for 3 to 6 steps (`data-steps` sets `--n`); each step owns the 30px connector to its right in its own padding.
- **Node** (`.flow__node`): `{colors.glass}` behind `blur(24px) saturate(1.4)`, 1px edge, 22px, `padding: 18px 18px 20px`, a 6px-gap column: a 26px index badge (1.5px `currentColor` circle, display face 0.75rem / 700, `--ink-2`, `aria-hidden`), the title (1rem / 600 / 1.3), the detail (0.875rem / 1.45, `--ink-2`).
- **Branches** (`.flow__branches`): a 6px-gap stack 10px under the detail. Each branch is a raised tag: `{colors.glass-raised}`, 1px edge, `--radius-sm`, `padding: 7px 10px 7px 24px`, 0.8125rem / 500 / 1.3, with a 6px `--signal` dot at 10px from the left.
- **Connector** (`.flow__link`): a 30×20 box at the node's title height (top 44px), `--ink` at 55%, holding a 2px rounded rule and a 14px `ArrowRight` head. Under 900px the chain turns downward: steps stack with 30px of bottom padding, the connector becomes 20×30 at `left: 24px`, the rule turns vertical and the head rotates 90°.
- **Bus** (`.flow__bus`): 16px under the row, `{colors.glass}` behind the panel blur, **1px dashed** `--ink` at 32% (dashed so it reads as a substrate rather than a sixth node), `--radius` (1rem), `padding: 16px 20px`, a `max-content minmax(0, 1fr)` grid with a `4px 22px` gap: title 0.9375rem / 600 in `--ink`, detail 0.875rem / 1.5 in `--ink-2`. One column under 900px.
- **Motion:** seen once, on scroll-in. Nodes rise `translateY(14px) → 0` and fade over 400ms on a `var(--i) × 60ms` stagger; each connector draws after the node it leaves (`scaleX(0.3) → 1` from the left, 300ms, `var(--i) × 60ms + 200ms`; `scaleY` from the top when vertical); the bus fades last over 400ms at 360ms. Transform and opacity only; reduced motion keeps the fades.

### Case study (`/work/[slug]`)

Seven statically generated pages. The governing rule is **absent, not empty**: a section whose bullets have not been written does not render, a project with no media renders no media band, and there is no "coming soon", skeleton or greyed placeholder anywhere on a case study. A visible admission of incompleteness is worse to a recruiter than a shorter page. It is visual first: header, screenshots where they exist, the flow diagram, then short bullets. Nobody is reading an essay about a student project.

- **Header panel** (`.case__headline`): glass like every other panel on the site, `{colors.glass-strong}` behind `blur(30px) saturate(1.4)`, 1px edge, 22px, `padding: 32px 34px 34px` (`24px 22px 26px` under 760px), 140px from the top of the page (96px). Order, top to bottom: back link, title, live-link, tech tiles, metadata line, note. **No standfirst, no eyebrow, no metric band.**
- **Back link** (`.case__back`): `← back to the work`, 0.9375rem / 500 in `--ink-2`, pulled 4px left to sit on the panel's text edge, 10px above the title. Hover turns it `--signal-ink` and moves the arrow 4px left.
- **Title:** `clamp(2.25rem, 6vw, 4rem)`, line-height 1.08, 0.005em.
- **Tech tiles** (`.tech`): a wrapping row 26px under the title (or the live-link), 10px gaps. Each tile is a raised glass pill (`{colors.glass-raised}` behind `blur(12px)`, 1px edge, 999px, `padding: 9px 16px 9px 11px`; `8px 13px 8px 9px` under 760px) holding a 22px mark (19px) and the name at 0.9375rem / 600 (0.875rem), 10px apart. Hover tints the edge 45% signal. The list is `aria-label="Built with"`. See The Simple Icons Bounded Exception for the mark contract and why a tool without a mark is dropped.
- **Metadata line** (`.case__meta`): 22px below, 0.9375rem / 500 / 1.6 in full `--ink`, rendering only the fields that exist (label, role, dates, ownership, use) separated by a middle dot at 0.55 opacity with 10px each side. Nothing emits a placeholder.
- **Note** (`.case__note`): one calm sentence, 1rem / 1.55 in `--ink-2`, 62ch, 14px below.
- **Media well** (`.case__media`): 40px under the header. Opaque `--media-well`, 1px edge, 22px, `max-height: 62svh`. A landscape screenshot sets the frame to its own aspect ratio (inline `aspect-ratio: w / h`) so nothing is cropped; a portrait one keeps the 16/10 frame and shows its top (`data-tall`: `object-fit: cover; object-position: top`), where the page's own header is. Captions run 0.875rem in `--ink-2`, 12px below. With no media the band does not render at all.
- **Sections** (`.case__sections`): a two-column spread (56px gap, one column under 760px) of Problem · What I built · Outcome · Hardest part · Limitations, each `padding: 64px 0 0`, the heading at the case-section size and the bullets (`.case__points`) 18px below: a 12px-gap list capped at 52ch, each item 1rem / 1.55 in `--ink-2` with 22px of left padding and a drawn 7px bullet in `--ink` at 45% (`left: 2px; top: 0.62em`). A dot that says "here is a point" is not a dot that says "this is live", so the bullet is ink and not the accent.
- **Foot:** 96px below the sections, a 1px `--glass-edge` rule, then `padding: 72px 0 128px` (56px/96px): "Want the detail?" at `clamp(1.75rem, 4vw, 2.75rem)`, a 46ch lede at 1.0625rem / 1.55, the email CTA in the same treatment Contact uses (28px below), and 34px under that an arrow-link row (24px gaps) with `Try {name} live ↗` where a demo exists and `{name} on GitHub ↗` where a repo exists.

**The No-Eyebrow Rule.** `CaseStudySection` takes exactly `{ id, title, children }`. There is no `label`, `kicker`, `eyebrow`, `number` or `index` prop and none may be added. The eyebrow above a heading is the one ban no brief earns back, and the section sequence carries no information the reader needs; the headings do. Making the slot structurally unavailable is stronger than leaving it unused.

**The No-Metric-Template Rule.** Outcome is bullets of supplied prose. Where nothing is documented the section is absent. It never renders an invented number, a bar, a ring or a count-up. This is the most tempting fabrication on the site and the structure refuses it.

**The No-Disabled-Affordance Rule.** Operations Agent has no public repo and renders **no repo affordance of any kind**: not a link, not a disabled link, not a greyed pill, not a tooltip. A disabled control implies the thing exists and is being withheld from *you*. Its note states the boundary calmly instead, and the timeline row plus LinkedIn carry the off-site verification.

### Signature Component: the scroll ring

The reference's circled dot made functional. A 44px glass pill (`{colors.glass-strong}`, `blur(12px)`, no edge) fixed bottom-right, holding a 36-viewBox SVG rotated −90°: a 22%-ink track, a coral progress arc driven by `stroke-dashoffset` on a `2πr` dasharray, and a solid ink dot at the centre. It fades in past 40% of a viewport of scroll and takes `tabIndex={-1}` while hidden. Visibility is a discrete property, so it transitions with `visibility 0s linear 250ms` on the way out and `transition-delay: 0s` on the way in. Clicking scrolls to top, smoothly unless the user prefers reduced motion.

### Motion

The motion system is bound to the `emil-design-eng` framework and is not negotiable per-component.

- **Easings:** `--ease-out: cubic-bezier(0.23, 1, 0.32, 1)` for almost everything; `--ease-in-out: cubic-bezier(0.77, 0, 0.175, 1)`; `--ease-drawer: cubic-bezier(0.32, 0.72, 0, 1)` for the sheet. The built-in keywords are too weak, and `ease-in` is banned.
- **Durations:** 160ms press, 200ms colour/background/border/icon nudge, 250ms scroll-ring fade, 260ms timeline node settle, 300ms flow connector and rail fade, 400ms flow node and bus, 420ms menu link rise, 450ms reveal, 600ms hero rise, 800ms rail draw; 52ms/char typing, 26ms/char erasing.
- **Transitions, not keyframes,** for anything interruptible: a transition retargets from wherever it is; a keyframe restarts from zero. The timeline and flow reveals are transitions on `data-reveal` for exactly this reason. Keyframes are reserved for the ambient loops (blob drift, dot pulse, caret blink) and the one-shot entrances (hero rise, menu links).
- **Press feedback:** every pressable element carries `:active { transform: scale(0.97) }` (0.98 on the large card and menu links).
- **Hover behind capability:** every hover rule sits inside `@media (hover: hover) and (pointer: fine)`.
- **Exits are faster than entrances.** The typewriter backspaces at 26ms/char against 52ms/char typing.
- **Staggers stay 30 to 80ms** per step: hero 60/120/180/240/300ms across name → descriptor → subline → availability → actions → status, cards 50ms, timeline items 70ms, flow nodes 60ms, menu links 40ms. Longer reads as the page being slow.
- **Reduced motion means fewer and gentler, not none.** `scroll-behavior: smooth` is gated behind `prefers-reduced-motion: no-preference`; blob drift, the dot pulse, the toggle's icon rotation, the hero rise, the Reveal rise, the rail draw, the node settle and the flow rise all drop to opacity-only or nothing. Typing survives (it is not spatial motion) and only slows. Keyboard-initiated jumps are always instant regardless of preference.
- **Off-screen and hidden work is paused:** the roll checks `document.hidden`, an IntersectionObserver and pointer hover before advancing; the scroll ring reads progress inside a single rAF on a passive listener; Reveal only hides elements that are below the viewport at load, so nothing flashes.
- **Theme switching:** `disableTransitionOnChange` on the provider, so flipping themes doesn't animate every transitioned property at once.
- **Ambient drift:** four blobs on 34s / 41s / 37s / 45s `ease-in-out infinite alternate` loops, each translating 5 to 7vmax and rotating 7 to 11°. Disabled outright under 720px (four animated blobs is not a mobile budget) and under reduced motion.
- **The ambient budget** is three *families* at rest, not three animations: the blob drift (four keyframe animations, one motion), the roll's caret blink, and the status dot's pulse. Anything still moving after the finger lifts that is not one of those three is a defect. The timeline's live ring and the live-link's dot are static for this reason.

#### Scroll motion

**Position-linked motion is exempt from the ambient budget: the user is the clock, and at scroll rest the page is still.** It is governed by its own ruleset:

- **One authored scroll moment per route.** The case-study media well drifts inside its frame (`media-drift`, ±3% on a layer that is 106% tall, so no edge is ever exposed); when a project has 2 or more media the drift is **replaced** by a pinned cross-fade sequence, never stacked under it.
- **Zero pins on the homepage, ever.** Hero → cards → email is the conversion path and nothing choreographed may lengthen it.
- **The pin is spent on media only**, never on the sections, which are read, not watched. Caps at 3 beats; further media fall to a static strip.
- **`translate:` and `scale:`, never `transform:`.** A scroll animation on `transform` is last in the cascade and silently replaces the hover transform on any element that has one. Interaction keeps `transform:`; scroll gets `translate:`/`scale:`, so they compose instead of fighting. Grep gate: no `transform:` inside any keyframe referenced by an `animation-timeline`.
- **`linear` scrub, always.** An eased scrub is how cinematic scroll starts feeling laggy: the element stops tracking the finger.
- **`@supports (animation-timeline: view())` gated, with the finished state as the default.** The pin is purely additive inside the guard, so there is no reduced-motion undo block to keep in sync.
- **Collapsed under reduced motion and below 761px.** Mobile gets less by rule, not by accident.
- **Numeric ceilings:** at most 150svh of sticky travel (100svh sticky child + 50svh per beat → 200svh at 2 beats, 250svh at 3), 40 to 80svh of travel per beat, at most +25% route length, at most 8% drift on any layer.
- **`svh`, never `vh` or `dvh`.** `vh` jumps when the mobile URL bar hides; `dvh` resizes continuously *during* the scroll, which is jitter.
- **No focusable element inside a pinned stage.** That is what licenses a beat's opacity reaching 0; frames carry captions, never links.
- **No `backdrop-filter` on anything that moves.** See The Opaque-Media Rule.
- **No motion library and no polyfill.** CSS scroll-driven animations only; `package.json` is grepped for gsap / lenis / framer-motion / scroll-timeline-polyfill.

### shadcn/ui

shadcn is installed with **this world as its theme, not the reverse**. `app/globals.css` bridges every shadcn slot to a project token in both `:root` and `.dark` (`--background: var(--ground)`, `--foreground: var(--ink)`, `--ring: var(--signal)`, charts 1 to 4 to blob stops, chart 5 to the signal). Radix is the interaction base. The only component actually in use is **Sheet** (the menu). **Badge** and **Button** remain in `components/ui/` as scaffold but nothing renders them: the `.pill` class replaced Badge everywhere, and Button is used only by the sheet's own close control. `--accent` belongs to shadcn; the project's accent is `--signal`. `--radius` and its derived `--radius-sm` are the two shadcn radii the page borrows.

## Do's and Don'ts

### Do:

- **Do** put every new colour through the token layer in `app/globals.css`, and define it in **both** `:root` and `.dark`. A value that only exists in one theme is a bug.
- **Do** use `--signal` for marks and `--signal-ink` for text (The Two Corals Rule).
- **Do** build every new surface from the glass ladder: `--glass` for a panel, `--glass-strong` for a lit or heavy one, `--glass-raised` for a pill or control sitting on glass, always with a 1px `--glass-edge` and a `backdrop-filter` matched to its size.
- **Do** reach for `.pill` before inventing a small surface; it is the taxonomy label, the range chip and the base shape for every small control.
- **Do** keep new sections inside `.section` (a 1140px column with `var(--gutter)` outside it, 80px to 96px vertical) and give them an `id` plus `aria-labelledby`, so the menu and the number shortcuts can reach them.
- **Do** wrap below-the-fold content in `<Reveal>` and stagger siblings at 50 to 70ms; drive any choreography inside it off `data-reveal` with transitions, the way the timeline and the flow do.
- **Do** author new icons as SVG in `currentColor` at the established stroke weights (2.25 for UI arrows, 2.5 for project marks), round caps and joins.
- **Do** put every hover rule behind `@media (hover: hover) and (pointer: fine)` and give every pressable a `:active { scale(0.97) }`, 0.98 on large surfaces, and **outside** the hover guard, since touch devices have no hover state.
- **Do** ship blocked content by ABSENCE. An unwritten case-study section does not render, `tech: []` renders no row, `media: []` renders no band. Never a placeholder, a skeleton or "coming soon" on a case study.
- **Do** put text that sits outside the calm band on a surface rather than trying to move it (The Surface-Not-Spacing Rule).
- **Do** write copy with commas, colons, periods, middle dots and hyphens. There are no em dashes anywhere in user-visible text.
- **Do** regenerate the grain with `node scripts/make-grain.mjs public/textures/grain.png` rather than hand-editing the PNG; the seed is the provenance.
- **Do** cap measures: 40 to 46ch for ledes and taglines, 52 to 62ch for bullets and notes, 60ch for long-form body.
- **Do** keep the outline device on lead-in words only, at weight 400 inside the `@supports` guard.

### Don't:

- **Don't** add a `box-shadow`. This system has none; elevation is an edge over blur (The Edge-Not-Shadow Rule).
- **Don't** paint blob colours onto text, surfaces or controls. They are ground and the two gradient lines (card edge, timeline rail) only.
- **Don't** mix white into a surface by hand or add a fifth glass opacity; the ladder is the whole vocabulary (The Glass Ladder Rule).
- **Don't** stroke display type at 700; Unbounded's heavy contours self-overlap and the stroke exposes the construction lines.
- **Don't** size the blobs in `vmax` below 720px; portrait `vmax` is the viewport height and the blobs swallow the copy.
- **Don't** animate anything interruptible with a keyframe. Use a transition so it can retarget mid-flight.
- **Don't** let a stagger exceed 80ms per step, or an exit run longer than its entrance.
- **Don't** animate a keyboard-initiated scroll, and don't put `scroll-behavior: smooth` outside the reduced-motion guard.
- **Don't** add a fourth continuous ambient motion; three families (the blob drift, the caret blink, the status pulse) is the budget. A second live indicator stays static.
- **Don't** bring the Stack section or its orbit back. Tools appear only on the case study where they were used, as tiles, and `data/stack.ts` has exactly that one consumer.
- **Don't** ship a dead link. An unavailable action takes the designed pending state (`.is-pending` plus a `.pending-note` pill), inert to pointer, keyboard and screen reader.
- **Don't** introduce a seventh radius, a second accent, or a new display face.
- **Don't** put tracked caps anywhere but a card foot. A pill is sentence case by default.
- **Don't** animate `transform:` from a scroll timeline. Scroll gets `translate:`/`scale:`; interaction keeps `transform:`, or the scroll animation silently eats the hover.
- **Don't** put a `:active` transform on an element that owns a full-card overlay pseudo-element; it drags the overlay out from under the cursor and the card stops being clickable (The Card-As-Link Rule).
- **Don't** infer a tool→project mapping, a role, a date, or a metric. If it was not supplied, the field stays empty and the UI omits it.
- **Don't** add a `label`, `kicker`, `eyebrow` or `number` prop to `CaseStudySection`, and don't add a standfirst or a description paragraph back to the header or the card.
- **Don't** give Operations Agent a repo affordance of any kind, including a disabled one.
- **Don't** render a shadcn `Badge`; the `.pill` class is the badge.
- **Don't** override shadcn's `--accent` expecting the page accent; that slot belongs to shadcn, ours is `--signal`.
