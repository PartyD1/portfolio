---
name: Parth Doshi Portfolio
description: A warm, name-led typographic introduction on a drifting pastel wash, with projects as chunky pastel cards.
colors:
  ink: "#1e4d3e"
  ink-2: "#3f6a5c"
  paper: "#f4f0e6"
  white: "#fffdf8"
  lavender: "#cdb0ee"
  lavender-deep: "#8a5cd1"
  mint: "#b4ded4"
  butter: "#f0e2a4"
  peach: "#f6cdb3"
  wash-a: "#dde6a3"
  wash-b: "#c6dfcc"
  wash-c: "#f8ceb3"
  wash-d: "#efdfc3"
typography:
  display:
    fontFamily: "Gabarito, ui-rounded, system-ui, -apple-system, sans-serif"
    fontSize: "clamp(2.875rem, 13vw, 6rem)"
    fontWeight: 800
    lineHeight: 0.98
    letterSpacing: "-0.03em"
  display-contact:
    fontFamily: "Gabarito, ui-rounded, system-ui, -apple-system, sans-serif"
    fontSize: "clamp(3rem, 8vw, 6rem)"
    fontWeight: 800
    lineHeight: 0.98
    letterSpacing: "-0.03em"
  headline:
    fontFamily: "Gabarito, ui-rounded, system-ui, -apple-system, sans-serif"
    fontSize: "clamp(2.5rem, 5vw, 4rem)"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "-0.03em"
  title:
    fontFamily: "Gabarito, ui-rounded, system-ui, -apple-system, sans-serif"
    fontSize: "clamp(1.625rem, 2.4vw, 2.25rem)"
    fontWeight: 800
    lineHeight: 1.02
    letterSpacing: "-0.025em"
  title-flagship:
    fontFamily: "Gabarito, ui-rounded, system-ui, -apple-system, sans-serif"
    fontSize: "clamp(2.25rem, 4vw, 3.5rem)"
    fontWeight: 800
    lineHeight: 1.02
    letterSpacing: "-0.025em"
  lede:
    fontFamily: "Gabarito, ui-rounded, system-ui, -apple-system, sans-serif"
    fontSize: "1.1875rem"
    fontWeight: 400
    lineHeight: 1.45
    letterSpacing: "normal"
  body:
    fontFamily: "Gabarito, ui-rounded, system-ui, -apple-system, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "normal"
  small:
    fontFamily: "Gabarito, ui-rounded, system-ui, -apple-system, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: "normal"
  control:
    fontFamily: "Gabarito, ui-rounded, system-ui, -apple-system, sans-serif"
    fontSize: "1rem"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "normal"
  label:
    fontFamily: "Gabarito, ui-rounded, system-ui, -apple-system, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 700
    lineHeight: 1.3
    letterSpacing: "0.14em"
rounded:
  key: "6px"
  card: "40px"
  pill: "999px"
  dot: "50%"
spacing:
  hair: "2px"
  xxs: "6px"
  xs: "8px"
  sm: "12px"
  md: "16px"
  grid: "20px"
  gutter: "24px"
  lg: "28px"
  xl: "32px"
  card: "34px"
  2xl: "48px"
  section: "72px"
  section-bottom: "88px"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.white}"
    typography: "{typography.control}"
    rounded: "{rounded.pill}"
    padding: "14px 22px"
  button-primary-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.white}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.control}"
    rounded: "{rounded.pill}"
    padding: "14px 22px"
  button-ghost-hover:
    backgroundColor: "color-mix(in oklab, #fffdf8 55%, transparent)"
    textColor: "{colors.ink}"
  nav-link:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.control}"
    rounded: "{rounded.pill}"
    padding: "10px 18px"
  nav-link-hover:
    backgroundColor: "color-mix(in oklab, #1e4d3e 8%, transparent)"
    textColor: "{colors.ink}"
  nav-link-active:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.white}"
  card-lavender:
    backgroundColor: "{colors.lavender}"
    textColor: "{colors.ink}"
    rounded: "{rounded.card}"
    padding: "34px"
  card-mint:
    backgroundColor: "{colors.mint}"
    textColor: "{colors.ink}"
    rounded: "{rounded.card}"
    padding: "34px"
  card-butter:
    backgroundColor: "{colors.butter}"
    textColor: "{colors.ink}"
    rounded: "{rounded.card}"
    padding: "34px"
  card-peach:
    backgroundColor: "{colors.peach}"
    textColor: "{colors.ink}"
    rounded: "{rounded.card}"
    padding: "34px"
  card-flagship:
    backgroundColor: "{colors.lavender}"
    textColor: "{colors.ink}"
    rounded: "{rounded.card}"
    padding: "48px"
  card-link:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.control}"
    rounded: "{rounded.pill}"
    padding: "10px 16px"
  card-link-hover:
    backgroundColor: "color-mix(in oklab, #fffdf8 45%, transparent)"
    textColor: "{colors.ink}"
  range-pill:
    backgroundColor: "color-mix(in oklab, #fffdf8 70%, transparent)"
    textColor: "{colors.ink}"
    typography: "{typography.small}"
    rounded: "{rounded.pill}"
    padding: "10px 14px"
  status-dot:
    backgroundColor: "{colors.lavender-deep}"
    rounded: "{rounded.dot}"
    size: "10px"
---

# Design System: Parth Doshi Portfolio

<!-- Recorded from the built homepage (app/globals.css, components/*.tsx) on 2026-09-01. The build is ground truth; where it departs from the pinned references or the direction contract, the build wins and the departure is noted. Light theme only. -->

## Overview

**Creative North Star: "The Sunlit Greeting"**

The site is a friendly, monumental self-introduction: a two-line rounded display headline in one deep green ink, standing on a cream page over four slowly drifting pastel wash blobs (chartreuse, sage, peach, sand). Nothing on the page is a hard edge. Every control is a pill, every card is a 40px-radius pastel slab, every decoration is soft: white four-point sparkles, one blurred gradient blob at the hero's edge, and one pulsing lavender dot. The world reads as warm and hand-set, closer to a well-made greeting card than a dashboard, while the type is confident enough (800-weight Gabarito, tight tracking, 0.98 line-height) to carry a recruiter's fast scan.

Density is generous. Sections breathe at 72px/88px, the hero owns the first viewport, cards carry a single sentence plus a geometric mark rather than a paragraph, and the About column caps at 62ch. Color does two jobs and only two: the deep green is the sole voice for text and primary controls; the four card tones (lavender, mint, butter, peach) rotate as surfaces, and lavender's deeper cousin is the one true accent (the status dot, the email underline on hover). There is no dark mode and no grain; the ground is a live gradient wash, not a texture.

The build refuses the dark-terminal developer portfolio and the sterile résumé page. It also refuses illustration: project art is flat inline SVG geometry drawn in `currentColor`, so every mark inherits the card's green ink and sits on the card's pastel.

**Key Characteristics:**
- One typeface (Gabarito, variable) at three jobs: 800 display, 400 body, 700 tracked-caps labels and controls.
- One ink (`ink`) for all text and the primary button; a softened ink (`ink-2`) for secondary prose.
- Four pastel card tones rotated in a fixed order; lavender-deep is the only saturated accent.
- Everything rounded: pills at 999px, cards at 40px, key hints at 6px.
- Motion is slow and eased-out (`cubic-bezier(0.16, 1, 0.3, 1)`), rises on entry, lifts on hover, and fully disables under `prefers-reduced-motion`.
- Light theme only (`color-scheme: light`); the page never inverts.

## Colors

A cream page under a chartreuse-to-peach wash, a single deep green ink, four pastel surfaces, and one lavender accent.

### Primary
- **Deep Green Ink** (`ink`, #1e4d3e): Every heading, every body paragraph on cards, the primary button fill, the active nav pill, the focus ring, the caret, the scrollbar thumb, and the `currentColor` of every SVG mark. It is the only text color on pastel surfaces.
- **Softened Ink** (`ink-2`, #3f6a5c): Secondary prose on the page ground only: hero subline, section ledes, About body, contact lede, footer. Never used on a pastel card (cards use full ink for contrast against the tint).

### Secondary
- **Lavender** (`lavender`, #cdb0ee): The flagship card surface, the first pastel in rotation, the text-selection highlight, the resting email underline, and the start of the hero blob gradient.
- **Lavender Deep** (`lavender-deep`, #8a5cd1): The single saturated accent. The status dot (and its pulse ring at 55% alpha) and the email underline on hover. Used nowhere else; its rarity is the point.

### Tertiary (card tones)
- **Mint** (`mint`, #b4ded4): Second card tone; also the midpoint of the hero blob gradient.
- **Butter** (`butter`, #f0e2a4): Third card tone; also the end of the hero blob gradient.
- **Peach** (`peach`, #f6cdb3): Fourth card tone.

### Neutral
- **Cream Paper** (`paper`, #f4f0e6): The page ground and the `.wash` base. Also the fallback card tone when no `card--*` modifier is set.
- **Warm White** (`white`, #fffdf8): Text on ink surfaces (primary button, active nav), the nav shell (at 82% over blur), sparkles, the hero blob's highlight, and the translucent hover/pill fills built with `color-mix()`.
- **Wash Chartreuse / Sage / Peach / Sand** (`wash-a` #dde6a3, `wash-b` #c6dfcc, `wash-c` #f8ceb3, `wash-d` #efdfc3): The four radial blobs that make up the fixed background wash (top-left, top-right, bottom-right, bottom-left respectively). Never used as fills elsewhere.

### Named Rules
**The One Ink Rule.** All text is `ink` or `ink-2`; there is no third text color, no gray, and no colored text. On a pastel card, text is always full `ink`.

**The Rotation Rule.** Card tones cycle lavender → mint → butter → peach in data order (`data/projects.ts` sets `tone` per project); the flagship is always lavender. Adjacent cards in a row never share a tone.

**The Translucent Fill Rule.** Hover and chip fills are never new colors; they are `color-mix(in oklab, var(--white) N%, transparent)` (45%, 55%, 70%) or `color-mix(in oklab, var(--ink) 8%, transparent)`, so they tint whatever surface they sit on.

## Typography

**Display Font:** Gabarito (variable weight, via `next/font/google`, CSS var `--font-gabarito`; fallback `ui-rounded, system-ui, -apple-system, sans-serif`)
**Body Font:** Gabarito (same family)
**Label Font:** Gabarito at 700, tracked caps

**Character:** One rounded geometric sans doing every job. At 800 with negative tracking it is chunky and warm; at 400 it is a clean, slightly wide reader. The pairing is a weight contrast, not a family contrast.

### Hierarchy
- **Display** (800, `clamp(2.875rem, 13vw, 6rem)`, 0.98, -0.03em): The hero headline only. Two lines, each a `<span>` set to `display: block`; `text-wrap: balance`.
- **Display, contact** (800, `clamp(3rem, 8vw, 6rem)`, 0.98, -0.03em): The "Say hi." closer. Same voice as the hero, slower viewport ramp.
- **Headline** (800, `clamp(2.5rem, 5vw, 4rem)`, 1, -0.03em): Section titles (Work, About).
- **Title** (800, `clamp(1.625rem, 2.4vw, 2.25rem)`, 1.02, -0.025em): Project card names. Drops to a fixed 1.5rem under 760px.
- **Title, flagship** (800, `clamp(2.25rem, 4vw, 3.5rem)`, 1.02, -0.025em): The Operations Agent card name.
- **Email display** (800, `clamp(1.375rem, 3.2vw, 2.25rem)`, -0.02em): The contact email link; underlined 4px in lavender, offset 10px.
- **Lede** (400, 1.1875rem, 1.45, `ink-2`): Section ledes (max 44ch) and About body (max 62ch, line-height 1.55). The hero subline is the same role on a viewport ramp: `clamp(1.125rem, 1.4vw, 1.375rem)`, max 54ch; 1.0625rem under 720px. Contact lede is 1.25rem, max 40ch.
- **Body** (400, 1.125rem, 1.5): The `body` default and the card tagline (1.45, max 42ch; 1.0625rem under 760px). Flagship tagline steps up to `clamp(1.25rem, 1.6vw, 1.5rem)` at max 30ch; its description stays body-size at max 52ch.
- **Control** (700, 1rem, 1): Buttons, nav links, and card links. Nav links drop to 0.9375rem under 640px.
- **Small** (0.9375rem): Status line (600), card note (400, 1.4), range pills (700), footer (400).
- **Label** (700, 0.75rem, 0.14em, uppercase, 1.3): Card labels in the card foot, right-aligned. The only uppercase text in the system.
- **Key hint** (700, 0.6875rem, 1): The nav's keyboard-shortcut badge.

### Named Rules
**The Weight-Not-Family Rule.** Hierarchy is made with weight (800 vs 700 vs 400) and size, never with a second typeface, italics, or color changes beyond `ink`/`ink-2`.

**The Tracked-Caps-Only-In-The-Foot Rule.** Uppercase tracked text appears in exactly one place: the project card's foot label, right-aligned. It is a tag, never an eyebrow above a heading.

**The Measured Prose Rule.** Every paragraph carries a `max-width` in `ch` (30, 40, 42, 44, 52, 54, 62) and `text-wrap: pretty`; headings carry `text-wrap: balance`.

## Layout

**Container.** Sections are centered at `max-width: 1200px` with 24px horizontal gutters and `padding: 72px 24px 88px`; `scroll-margin-top: 72px` clears the fixed nav on anchor jumps. The Work section tightens its top to 28px so the flagship card sits close under the hero. Contact is a section with `padding-top: 120px; padding-bottom: 140px`, centered text.

**Hero.** A CSS grid with `place-content: center`, `min-height: min(100svh, 640px)`, `padding: 140px 24px 32px` (116px top under 720px), `overflow: clip`. Internal rhythm: subline `margin-top: 28px`, actions 32px, status 22px. Decorations are absolutely positioned: sparkle A at `top 22% / right 16%` (72px wide), sparkle B at `bottom 34% / left 14%` (52px), the blob at `right 6% / bottom 6%` (260px square). Under 720px the sparkles shrink to 48px/34px and move outward, and the blob shrinks to 150px and bleeds off the right edge (`right: -40px`).

**Section head.** Flex row, `align-items: flex-end`, `justify-content: space-between`, `gap: 32px`, `margin-bottom: 24px`; title left, lede right. Stacks to a column with 14px gap under 760px.

**Work grid.** Two equal columns (`repeat(2, minmax(0, 1fr))`) with a 20px gap; the flagship spans both (`grid-column: 1 / -1`). One column under 760px.

**Card internals.** A standard card is a grid of `minmax(0, 1fr) minmax(0, 40%)` columns and `auto 1fr auto` rows, `column-gap: 24px`, `row-gap: 14px`, `padding: 34px`: head (row 1, col 1), tagline (row 2, col 1), art (col 2, rows 1–2, `aspect-ratio: 1`, `align-self: center`), foot spanning both columns in row 3 with `padding-top: 18px`. Under 760px the art column narrows to 36%, column-gap 16px, padding 26px. The flagship is `minmax(0, 1.15fr) minmax(0, 1fr)`, `column-gap: 32px`, `min-height: 440px`, `padding: 48px`, body as a flex column with 14px gap, art at `aspect-ratio: 4 / 3`; under 760px it becomes one column with the art below (max 360px, centered) and 30px padding.

**About.** Two columns `minmax(0, 1fr) minmax(0, 1.4fr)` with 48px gap, title left, prose right; body paragraphs stack with 20px gap; the range pill list follows with 8px top margin and 8px wrap gap. One column with 24px gap under 760px.

**Nav.** Fixed at `top: 16px`, horizontally centered by `left: 50%; transform: translateX(-50%)`, `z-index: 10`; 12px from the top under 640px.

**Wash.** A `position: fixed; inset: 0; z-index: -1` layer holding four 80vmax radial blobs anchored off-canvas at each corner (negative `vmax` offsets), so the gradient is viewport-locked and content scrolls over it.

**Breakpoints.** Three, all `max-width`: **720px** (hero padding, subline size, decoration positions), **760px** (section head stack, work grid to one column, card padding and art column, flagship stacks, About stacks), **640px** (nav padding shrinks, key hints hide).

**Spacing rhythm.** Values in use, smallest to largest: 2 (nav item gap), 6 (nav shell padding), 8 (icon/pill gaps), 10 (status and button icon gaps), 12 (action gaps), 14 (card row gap), 16 (foot gap), 18 (foot top padding), 20 (grid gap, About paragraph gap), 22, 24 (gutter, card column gap, head margin), 28, 32, 34 (card padding), 40, 48 (flagship padding, About gap), 72/88 (section), 120/140 (contact). The base step is 4px; card and section values are deliberately off-grid (34, 22, 18) and should be reused as-is rather than rounded.

### Named Rules
**The Peek Rule.** The Work section's 28px top padding exists so the flagship card's top edge shows above the fold on desktop. Keep the first card within reach of the hero.

## Elevation & Depth

Depth is tonal first, shadow second. Surfaces are flat pastel slabs on a cream ground; the only ambient shadows are soft, large-blur, negative-spread green-tinted casts that appear on the floating nav, the primary button, and cards on hover. All shadows are built from one RGB triple token, `--shadow-ink: 30 77 62` (the ink color), so they read as the ink's own tint rather than gray.

### Shadow Vocabulary
- **Nav float** (`box-shadow: 0 10px 30px -14px rgb(var(--shadow-ink) / 0.35)`): The fixed pill nav, at rest.
- **Primary button rest** (`box-shadow: 0 12px 26px -14px rgb(var(--shadow-ink) / 0.6)`): The ink-filled CTA.
- **Primary button hover** (`box-shadow: 0 18px 30px -14px rgb(var(--shadow-ink) / 0.65)`): Paired with `translateY(-2px)`.
- **Card hover** (`box-shadow: 0 28px 44px -26px rgb(var(--shadow-ink) / 0.4)`): Paired with `translateY(-4px)`. Cards have no shadow at rest.
- **Sparkle glow** (`filter: drop-shadow(0 6px 14px rgb(var(--shadow-ink) / 0.12))`): Lifts the white sparkle off the wash.
- **Status pulse** (`box-shadow: 0 0 0 0 → 0 0 0 10px rgb(138 92 209 / 0.55 → 0)`): Not a depth shadow; an expanding lavender ring.

**Glass.** The nav is the one translucent material: `color-mix(in oklab, var(--white) 82%, transparent)` over `backdrop-filter: blur(14px)`.

### Named Rules
**The Ink-Tinted Shadow Rule.** Every shadow uses `rgb(var(--shadow-ink) / alpha)`, never neutral black. Negative spread (-14px, -26px) keeps the cast beneath the element, not around it.

**The Flat-At-Rest Card Rule.** Cards carry no shadow or border at rest; they are distinguished by tone alone. Shadow is a hover response only.

## Shapes

The form language is fully rounded. Controls (buttons, nav shell, nav links, card links, range pills, focus rings on those) are pills (`999px`). Cards are slabs at `--radius-card: 40px` (with `overflow: hidden`). The nav key hint is the one small-radius element (`6px`, 1.5px `currentColor` border at 78% opacity). The status dot is a 10px circle. The hero blob is an organic ellipse (`border-radius: 46% 54% 52% 48% / 55% 45% 55% 45%`) with a 135deg lavender→mint→butter gradient and a white radial highlight at 32%/28%. Sparkles are a single four-point star path in a 24-unit viewBox, filled `currentColor` (white).

Borders are rare: the ghost button's `2px solid color-mix(in oklab, var(--ink) 30%, transparent)` (solid ink on hover) and the key hint's 1.5px are the only ones. Nothing uses a 1px hairline.

Project art follows one grammar: inline SVG in a 120-unit square (320×240 for the flagship), `stroke: currentColor`, `stroke-width: 2.5` (3 for emphasis), round caps and joins, `rx: 5` on 18–19px cells, `rx: 10–15` on larger rects, filled shapes at `opacity 0.3–0.6` for "secondary" state and dashed strokes (`6 8`, `5 6`, `4 6`) for "pending/ghost" state. Checkmarks inside filled cells are stroked in `var(--card)` so they cut through to the card tone. The art container sits at `opacity: 0.9` (0.8 on the flagship).

### Named Rules
**The No-Corner Rule.** Nothing on the page has a square corner. New elements are pills, 40px slabs, or circles; 6px is reserved for the key-hint badge.

**The Geometry-Not-Illustration Rule.** Card art is stroked/filled vector geometry in the card's ink, never a raster, screenshot, gradient, or illustration. A new project needs a new mark added to `components/Artifact.tsx` following the stroke preset.

## Components

### Buttons (`.btn`)
Chunky, confident, pill-shaped; the only ink-filled surfaces on the page.
- **Shape:** Pill (`999px`), `padding: 14px 22px`, `inline-flex` with 10px gap, 700 / 1rem / line-height 1.
- **Primary** (`.btn--primary`): `ink` fill, `white` text, rest shadow `0 12px 26px -14px`. Hover: `translateY(-2px)` and the deeper shadow. Used once on the page (hero "Get in touch"); it is the mailto.
- **Ghost** (`.btn--ghost`): transparent, `ink` text, `2px` border at 30% ink. Hover: border to solid ink, fill `color-mix(white 55%)`. Used for GitHub / LinkedIn.
- **Icon:** A 1em stroked arrow (`ArrowRight` in the hero, `ArrowUpRight` for external links; `stroke-width 2.25`, round caps). On hover the icon slides `translateX(3px)`.
- **Transitions:** transform and box-shadow 0.45s, background and border-color 0.3s, all on `--ease-out`.
- **Focus:** the global 3px ink outline at 4px offset, rounded to a pill.

### Status line (`.status`)
A small live signal, not an eyebrow. `inline-flex`, 10px gap, 600 / 0.9375rem, `ink`, `margin-top: 22px` under the CTA pair. The dot is 10px, `lavender-deep`, and pulses a 10px lavender ring every 2.6s (`ease-out`, infinite) when motion is allowed.

### Pill nav (`.nav`)
A floating frosted capsule with keyboard hints.
- **Shell:** fixed, centered, `padding: 6px`, 2px item gap, `white` at 82% over `blur(14px)`, nav-float shadow.
- **Link:** pill, `padding: 10px 18px`, 700 / 1rem, ink; hover fills `ink` at 8%; the section currently in view (`aria-current="location"`, set by an IntersectionObserver with `rootMargin: -35% 0px -55% 0px`) inverts to `ink` fill / `white` text. Transitions 0.35s.
- **Key hint** (`.nav__key`): a 6px-radius badge showing the digit that scrolls to that section (`1`, `2`, `3`; global keydown, ignored inside inputs and with modifiers). Hidden under 640px.
- **Mobile:** `top: 12px`, links `9px 14px` at 0.9375rem.

### Section head (`.section__head`)
Headline left, `ink-2` lede right, bottom-aligned, 24px below to content. Stacks under 760px. About uses `.about__grid` instead (title left column, prose right).

### Project card (`.card`)
A pastel slab holding a name, one sentence, a geometric mark, and a tagged foot.
- **Corner Style:** `40px` (`--radius-card`), `overflow: hidden`.
- **Background:** one of `card--lavender | mint | butter | peach`, set via the `--card` custom property (which the art may reference for knockouts). Text is always `ink`.
- **Shadow Strategy:** none at rest; card-hover shadow with `translateY(-4px)` over 0.55s. On hover the art also nudges `translate(-3px, -3px) rotate(-3deg)` over 0.7s.
- **Border:** none.
- **Internal Padding:** `34px` (26px under 760px); flagship `48px` (30px under 760px).
- **Foot** (`.card__foot`): flex, space-between, bottom-aligned, `padding-top: 18px`. Left: the GitHub card link, or the confidential note (`.card__note`, 0.9375rem) when there is no repo. Right: the tracked-caps label.
- **Card link** (`.card__link`): a 700-weight "GitHub ↗" with a negative-margin pill hit area (`padding: 10px 16px; margin: -10px -16px`) that fills `white` at 45% on hover; icon slides `translate(2px, -2px)`.
- **Flagship** (`.card--flagship`): spans the grid, body/art side by side at 1.15fr/1fr, larger name and tagline, an extra description paragraph, art at 4:3. Only the flagship has a description.
- **Entry:** wrapped in `Reveal` with `delay = index * 70ms`.

### Range pills (`.about__range li`)
Non-interactive chips listing areas of work: pill, `padding: 10px 14px`, 700 / 0.9375rem, `ink` on `white` at 70%. No hover state; they are labels, not filters.

### Contact email (`.contact__email`)
The page's largest link: 800 weight, `clamp(1.375rem, 3.2vw, 2.25rem)`, -0.02em, `ink`, underlined `4px` in `lavender` at `10px` offset; underline turns `lavender-deep` on hover (0.3s). `word-break: break-all` so it never overflows on narrow screens.

### Footer (`.footer`)
Centered, `padding: 32px 24px 40px`, 0.9375rem `ink-2`; the "Back to the top" link is 700 `ink` with the global 2px underline at 0.2em offset.

### Reveal (`components/Reveal.tsx`)
A one-shot scroll entrance. Elements render visible on the server; on mount, only elements below the viewport (and only when `prefers-reduced-motion` is not `reduce`) are set to `data-reveal="pending"` (`opacity: 0; translateY(28px)`), then to `"in"` at 12% intersection, transitioning opacity and transform over 0.9s `--ease-out` with an optional `transitionDelay`.

### Motion grammar
All timing uses `--ease-out: cubic-bezier(0.16, 1, 0.3, 1)` unless noted; everything below is gated behind `@media (prefers-reduced-motion: no-preference)` or the matching JS check, so reduced-motion users see a fully static, fully visible page (the wash blobs simply hold their resting positions).
- **Hero rise:** `rise` keyframe (`opacity 0, translateY(28px)` → rest), 1.1s, `both`. Stagger: title line 1 at 0s, line 2 at 0.08s, subline 0.2s, actions 0.3s, status 0.38s.
- **Wash drift:** each blob translates 8–12vmax on `ease-in-out infinite alternate` at 28s / 34s / 31s / 37s (a, b, c, d), so the ground never repeats visibly.
- **Sparkle twinkle:** `scale(1) rotate(0)` ↔ `scale(0.82) rotate(12deg)` at 85% opacity, 4.2s `ease-in-out infinite`; sparkle B runs 5.1s with a -1.7s offset.
- **Blob bob:** `translate(-14px, -18px) rotate(8deg)`, 14s `ease-in-out infinite alternate`.
- **Status pulse:** 2.6s `ease-out infinite` expanding ring.
- **Card reveal:** 0.9s rise, 70ms per-card stagger.
- **Hover lift:** buttons -2px / 0.45s, cards -4px / 0.55s, art nudge 0.7s, icons 3px / 0.45s, nav and link fills 0.3–0.35s.
- **Scroll:** `scroll-behavior: smooth` on `html`; key-hint navigation uses `scrollIntoView({ behavior: "smooth" })`.

### Browser surface
- **Selection:** `lavender` background, `ink` text.
- **Caret:** `ink`.
- **Scrollbar:** `scrollbar-color: var(--ink) transparent`.
- **Focus ring:** `3px solid ink`, `outline-offset: 4px`; pill-rounded on `.btn`, `.nav__link`, `.card__link`.
- **Links:** inherit color, `text-underline-offset: 0.2em`, `text-decoration-thickness: 2px`.
- **Color scheme:** `color-scheme: light` on `:root`. No dark tokens exist.

## Do's and Don'ts

### Do:
- **Do** set every text element in `ink` (#1e4d3e) or `ink-2` (#3f6a5c), and use full `ink` on any pastel card.
- **Do** make every new control a `999px` pill and every new container a `40px` slab; reuse `--radius-card`.
- **Do** build hover and chip fills with `color-mix(in oklab, var(--white) N%, transparent)` at 45 / 55 / 70%, or `var(--ink)` at 8%, rather than introducing a new flat color.
- **Do** tint every shadow with `rgb(var(--shadow-ink) / alpha)` and a negative spread; keep cards shadowless at rest.
- **Do** gate every animation behind `prefers-reduced-motion: no-preference` (CSS) or a `matchMedia` check (JS), and run it on `--ease-out`.
- **Do** keep the tone rotation lavender → mint → butter → peach and give any new project both a `tone` in `data/projects.ts` and a `currentColor` SVG mark in `components/Artifact.tsx`.
- **Do** cap prose with a `ch` max-width and `text-wrap: pretty`; balance headings.
- **Do** use the same three breakpoints (720px hero, 760px grid/cards/sections, 640px nav) for new surfaces.
- **Do** keep the page light-only; `color-scheme: light` is a brand commitment, not a default.

### Don't:
- **Don't** add a dark mode, a `prefers-color-scheme: dark` block, or dark-surface variants.
- **Don't** add grain, noise, `feTurbulence`, or texture overlays; the ground is the live gradient wash.
- **Don't** introduce a second typeface, italics, or colored text; hierarchy is weight (800 / 700 / 400) and size in Gabarito.
- **Don't** put tracked-caps text above a heading as an eyebrow or kicker; uppercase lives only in the card foot label.
- **Don't** use `lavender-deep` for anything but the status dot and the email underline hover; it is the sole saturated accent.
- **Don't** use neutral black or gray shadows, 1px hairline borders, or square corners.
- **Don't** replace card art with screenshots, rasters, gradients, or illustrations; draw geometry in `currentColor`.
- **Don't** fabricate labels: card labels are factual tags from `data/projects.ts` (`Internship · Summer 2026`, `In use by DECA competitors`), not status badges.
