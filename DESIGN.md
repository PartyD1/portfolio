---
name: Parth Doshi Portfolio
description: An editorial, name-led introduction in a tight grotesk on a quiet stone wash, with projects as flat radius-20 cards in sand, stone, and deep green.
colors:
  ink: "#142e26"
  ink-2: "#3f5c50"
  paper: "#efece3"
  white: "#fbf9f3"
  cream: "#f3efe4"
  sand: "#e2d7bb"
  stone: "#dbd8ce"
  accent: "#b8641f"
  wash-a: "#e1e2c6"
  wash-b: "#d4dcd2"
  wash-c: "#eadbc9"
  wash-d: "#e4ded1"
typography:
  display:
    fontFamily: "Archivo, system-ui, -apple-system, sans-serif"
    fontSize: "clamp(2.75rem, 12vw, 6rem)"
    fontWeight: 800
    lineHeight: 0.94
    letterSpacing: "-0.035em"
    fontVariation: "'wdth' 88"
  display-contact:
    fontFamily: "Archivo, system-ui, -apple-system, sans-serif"
    fontSize: "clamp(3rem, 8vw, 6rem)"
    fontWeight: 800
    lineHeight: 0.94
    letterSpacing: "-0.035em"
    fontVariation: "'wdth' 88"
  headline:
    fontFamily: "Archivo, system-ui, -apple-system, sans-serif"
    fontSize: "clamp(2.5rem, 5vw, 4rem)"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "-0.03em"
    fontVariation: "'wdth' 90"
  title:
    fontFamily: "Archivo, system-ui, -apple-system, sans-serif"
    fontSize: "clamp(1.625rem, 2.4vw, 2.25rem)"
    fontWeight: 800
    lineHeight: 1.02
    letterSpacing: "-0.025em"
    fontVariation: "'wdth' 90"
  title-flagship:
    fontFamily: "Archivo, system-ui, -apple-system, sans-serif"
    fontSize: "clamp(2.25rem, 4vw, 3.5rem)"
    fontWeight: 800
    lineHeight: 1.02
    letterSpacing: "-0.025em"
    fontVariation: "'wdth' 90"
  email:
    fontFamily: "Archivo, system-ui, -apple-system, sans-serif"
    fontSize: "clamp(1.375rem, 3.2vw, 2.25rem)"
    fontWeight: 700
    lineHeight: 1.5
    letterSpacing: "-0.02em"
  lede:
    fontFamily: "Archivo, system-ui, -apple-system, sans-serif"
    fontSize: "1.1875rem"
    fontWeight: 400
    lineHeight: 1.45
    letterSpacing: "normal"
  body:
    fontFamily: "Archivo, system-ui, -apple-system, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "normal"
  small:
    fontFamily: "Archivo, system-ui, -apple-system, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: "normal"
  control:
    fontFamily: "Archivo, system-ui, -apple-system, sans-serif"
    fontSize: "1rem"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "normal"
  label:
    fontFamily: "Archivo, system-ui, -apple-system, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "0.14em"
rounded:
  key: "6px"
  card: "20px"
  pill: "999px"
  dot: "50%"
spacing:
  hair: "2px"
  xxs: "6px"
  xs: "8px"
  sm: "12px"
  md: "16px"
  grid: "16px"
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
    backgroundColor: "color-mix(in oklab, #fbf9f3 55%, transparent)"
    textColor: "{colors.ink}"
  nav-link:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.control}"
    rounded: "{rounded.pill}"
    padding: "10px 18px"
  nav-link-hover:
    backgroundColor: "color-mix(in oklab, #142e26 8%, transparent)"
    textColor: "{colors.ink}"
  nav-link-active:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.white}"
  card-sand:
    backgroundColor: "{colors.sand}"
    textColor: "{colors.ink}"
    rounded: "{rounded.card}"
    padding: "34px"
  card-stone:
    backgroundColor: "{colors.stone}"
    textColor: "{colors.ink}"
    rounded: "{rounded.card}"
    padding: "34px"
  card-ink:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.cream}"
    rounded: "{rounded.card}"
    padding: "34px"
  card-flagship:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.cream}"
    rounded: "{rounded.card}"
    padding: "48px"
  card-link:
    backgroundColor: "transparent"
    textColor: "inherit"
    typography: "{typography.control}"
    rounded: "{rounded.pill}"
    padding: "10px 16px"
  card-link-hover:
    backgroundColor: "color-mix(in oklab, currentColor 12%, transparent)"
    textColor: "inherit"
  range-pill:
    backgroundColor: "color-mix(in oklab, #fbf9f3 70%, transparent)"
    textColor: "{colors.ink}"
    typography: "{typography.small}"
    rounded: "{rounded.pill}"
    padding: "10px 14px"
  status-dot:
    backgroundColor: "{colors.accent}"
    rounded: "{rounded.dot}"
    size: "10px"
---

# Design System: Parth Doshi Portfolio

<!-- Recorded from the built homepage (app/globals.css, app/layout.tsx, components/*.tsx, data/projects.ts) on 2026-09-01, after the "Editorial grotesk" refinement. The build is ground truth; where it departs from the pinned references or the direction contract, the build wins and the departure is noted. Light theme only. Replaces the earlier "Sunlit Greeting" record (Gabarito, pastel cards, sparkles, blob), which the user rejected as too bubbly. -->

## Overview

**Creative North Star: "The Editorial Grotesk"**

The site is a confident self-introduction set like a magazine opener: a two-line display headline in a tight, narrowed grotesk (Archivo at 800 weight, width axis pulled to 88), one near-black-green ink, standing on a quiet stone-colored page over four slowly drifting desaturated wash blobs. Nothing decorates. There are no sparkles, no gradient blob, no grain, no illustration. The only ornament is structural: a floating pill nav, a pulsing burnt-ochre dot beside "Open to opportunities", and a thick ochre underline under the email. The register is adult and editorial; the type carries the personality, and the palette stays out of its way.

Density is generous but not soft. Sections breathe at 72px/88px, the hero owns the first viewport, and project cards are flat radius-20 slabs in three materials: sand, stone, and the ink itself (deep green with cream text). Every row of the work grid holds exactly one deep-green card, so the grid reads as a deliberate rhythm rather than a color rotation. Cards carry a name, one sentence, a geometric mark, and a tagged foot; only the flagship gets a description. The About column caps at 62ch.

Color does three jobs and no more. The deep green is the sole voice for text, the primary button, the active nav pill, and one card per row. Sand and stone are the two quiet card materials. Burnt ochre is the single accent, spent on the status dot, the email underline, and the text-selection tint, and nowhere else. The build refuses the dark-terminal developer portfolio, the sterile résumé page, and its own candy-pastel first pass.

**Key Characteristics:**
- One typeface (Archivo, variable with the `wdth` axis) at four jobs: 800 narrowed display, 700 for the email and inline emphasis, 600 controls and labels, 400 body.
- One ink (`ink`) for all text and primary surfaces; a softened ink (`ink-2`) for secondary prose on the page ground; cream (`cream`) for text on ink cards.
- Three card materials (sand, stone, ink), with one ink card per row of the work grid.
- One accent (`accent`, burnt ochre) used in exactly three places.
- Pills at 999px, cards at 20px, key hints at 6px; nothing larger than 20px on a container.
- Motion is slow and eased-out (`cubic-bezier(0.16, 1, 0.3, 1)`), rises on entry, lifts on hover, and fully disables under `prefers-reduced-motion`.
- Light theme only (`color-scheme: light`); the page never inverts.

## Colors

A stone page under a desaturated olive-sage-peach wash, one deep green ink, two quiet card materials, and one burnt-ochre accent.

### Primary
- **Deep Green Ink** (`ink`, #142e26): Every heading, every body paragraph on sand and stone cards, the primary button fill, the active nav pill, the focus ring, the caret, the scrollbar thumb, the email underline on hover, the `currentColor` of every SVG mark on a light card, and the surface of every `card--ink` card. It is both the text color and the darkest material.
- **Softened Ink** (`ink-2`, #3f5c50): Secondary prose on the page ground only: hero subline, section ledes, About body, contact lede, footer. Never used on a card.

### Secondary (the accent)
- **Burnt Ochre** (`accent`, #b8641f): The single accent. The status dot (and its pulse ring at 50% alpha), the resting email underline (4px), and the text-selection background (mixed 32% into `paper`). Used nowhere else; its rarity is the point.

### Tertiary (card materials)
- **Sand** (`sand`, #e2d7bb): The warm light card material; ink text.
- **Stone** (`stone`, #dbd8ce): The cool light card material; ink text.
- **Ink card** (`ink` as surface): The deep-green card material; `cream` text and cream marks. One per row.

### Neutral
- **Stone Paper** (`paper`, #efece3): The page ground and the `.wash` base. Also the fallback `--card` value when no `card--*` modifier is set.
- **Warm White** (`white`, #fbf9f3): Text on ink surfaces (primary button, active nav), the nav shell (at 84% over blur), and the translucent hover and chip fills built with `color-mix()`.
- **Cream** (`cream`, #f3efe4): Text and mark color on ink cards (`--card-fg`). Slightly warmer than `white` so cream-on-green reads as paper, not as a screen.
- **Wash Olive / Sage / Peach / Warm Gray** (`wash-a` #e1e2c6, `wash-b` #d4dcd2, `wash-c` #eadbc9, `wash-d` #e4ded1): The four radial blobs of the fixed background wash (top-left, top-right, bottom-right, bottom-left). All four sit within a few points of `paper` in lightness; the wash is a tint, not a gradient statement. Never used as fills elsewhere.

### Named Rules
**The One Ink Rule.** All text is `ink`, `ink-2`, or (on an ink card) `cream`; there is no gray, no colored text, and no third light color. On a sand or stone card, text is always full `ink`.

**The One Green Per Row Rule.** The work grid's `tone` values in `data/projects.ts` are set so each two-column row holds exactly one `ink` card and one `sand` or `stone` card, and the ink card alternates sides row to row (right, left, right). The full-width flagship is ink. Adding a project means choosing its tone to keep this pattern, not picking a favorite.

**The One Accent Rule.** `accent` appears on the status dot, the email underline, and the selection tint. It is never a button, a heading, a border, or a card. A fourth use needs a reason the first three do not already serve.

**The Translucent Fill Rule.** Hover and chip fills are never new colors; they are `color-mix(in oklab, var(--white) N%, transparent)` (55%, 70%), `color-mix(in oklab, var(--ink) 8%, transparent)`, or, on cards, `color-mix(in oklab, var(--card-fg) 12%, transparent)`, so they tint whatever surface they sit on and work on both light and ink cards.

## Typography

**Display Font:** Archivo (variable, `wdth` axis loaded, via `next/font/google` as `--font-archivo`; fallback `system-ui, -apple-system, sans-serif`)
**Body Font:** Archivo (same family)
**Label Font:** Archivo at 600, tracked caps

**Character:** One grotesk doing every job, with the width axis as the second dial. Headings are pulled narrow (`font-variation-settings: "wdth" 90`; the two largest displays go to 88) at 800 with tight negative tracking, which gives them an editorial density a plain bold could not. At 400 and full width it is a clean, slightly technical reader. The hierarchy is made with weight, size, and width, never with a second family.

### Hierarchy
- **Display** (800, `clamp(2.75rem, 12vw, 6rem)`, 0.94, -0.035em, `wdth` 88): The hero headline only. Two lines, each a `<span>` set to `display: block`; `text-wrap: balance`.
- **Display, contact** (800, `clamp(3rem, 8vw, 6rem)`, 0.94, -0.035em, `wdth` 88): The "Let's talk." closer. Same voice as the hero, slower viewport ramp.
- **Headline** (800, `clamp(2.5rem, 5vw, 4rem)`, 1, -0.03em, `wdth` 90): Section titles (Work, About).
- **Title** (800, `clamp(1.625rem, 2.4vw, 2.25rem)`, 1.02, -0.025em, `wdth` 90): Project card names. Fixed 1.5rem under 760px.
- **Title, flagship** (800, `clamp(2.25rem, 4vw, 3.5rem)`, 1.02, -0.025em, `wdth` 90): The Operations Agent card name.
- **Email** (700, `clamp(1.375rem, 3.2vw, 2.25rem)`, -0.02em): The contact email link; underlined 4px in `accent`, offset 10px. The one 700-weight display element.
- **Lede** (400, 1.1875rem, 1.45, `ink-2`): Section ledes (max 44ch) and About body (max 62ch, line-height 1.55; inline `<strong>` is 700 in full `ink`). The hero subline is the same role on a viewport ramp: `clamp(1.125rem, 1.4vw, 1.375rem)`, max 54ch; 1.0625rem under 720px. Contact lede is 1.25rem, max 40ch.
- **Body** (400, 1.125rem, 1.5): The `body` default and the card tagline (1.45, max 42ch; 1.0625rem under 760px). Flagship tagline steps up to `clamp(1.25rem, 1.6vw, 1.5rem)` at max 30ch; its description stays body-size at max 52ch.
- **Control** (600, 1rem, 1): Buttons, nav links, and card links. Nav links drop to 0.9375rem under 640px.
- **Small** (0.9375rem): Status line (600), card note (400, 1.4), range pills (600), footer (400, `ink-2`; its link 600 `ink`).
- **Label** (600, 0.75rem, 0.14em, uppercase, 1.3): Card labels in the card foot, right-aligned, in the card's foreground color. The only uppercase text in the system.
- **Key hint** (600, 0.6875rem, 1): The nav's keyboard-shortcut badge.

### Named Rules
**The Width-Axis Display Rule.** Every heading carries `font-variation-settings: "wdth" 90`; the hero and contact displays go to 88. A heading at default width (100) is off-system. Body and controls stay at default width; the narrowing is reserved for 800-weight type.

**The Weight-Not-Family Rule.** Hierarchy is made with weight (800 / 700 / 600 / 400), size, and width, never with a second typeface, italics, or color changes beyond `ink` / `ink-2` / `cream`.

**The Tracked-Caps-Only-In-The-Foot Rule.** Uppercase tracked text appears in exactly one place: the project card's foot label, right-aligned. It is a tag, never an eyebrow or kicker above a heading.

**The Measured Prose Rule.** Every paragraph carries a `max-width` in `ch` (30, 40, 42, 44, 52, 54, 62) and `text-wrap: pretty`; headings carry `text-wrap: balance`.

## Layout

**Container.** Sections are centered at `max-width: 1200px` with 24px horizontal gutters and `padding: 72px 24px 88px`; `scroll-margin-top: 72px` clears the fixed nav on anchor jumps. The Work section tightens its top to 28px so the flagship card sits close under the hero. Contact is a section with `padding-top: 120px; padding-bottom: 140px`, centered text; its lede sits 24px under the title, the email 28px under the lede, the link pair 40px under the email.

**Hero.** A CSS grid with `place-content: center`, `justify-items: center`, `text-align: center`, `min-height: min(100svh, 640px)`, `padding: 140px 24px 32px` (116px top under 720px), `overflow: clip`. Internal rhythm: subline `margin-top: 28px`, actions 32px, status 22px. There are no decorations in the hero; the wash is the only thing behind the type.

**Section head.** Flex row, `align-items: flex-end`, `justify-content: space-between`, `gap: 32px`, `margin-bottom: 24px`; title left, lede right. Stacks to a column with 14px gap under 760px.

**Work grid.** Two equal columns (`repeat(2, minmax(0, 1fr))`) with a 16px gap; the flagship spans both (`grid-column: 1 / -1`). One column under 760px.

**Card internals.** A standard card is a grid of `minmax(0, 1fr) minmax(0, 40%)` columns and `auto 1fr auto` rows, `column-gap: 24px`, `row-gap: 14px`, `padding: 34px`: head (row 1, col 1), tagline (row 2, col 1), art (col 2, rows 1–2, `aspect-ratio: 1`, `align-self: center`), foot spanning both columns in row 3 with `padding-top: 18px`. Under 760px the art column narrows to 36%, column-gap 16px, padding 26px. The flagship is `minmax(0, 1.15fr) minmax(0, 1fr)`, `column-gap: 32px`, `min-height: 440px`, `padding: 48px`, `align-items: center`, body as a flex column with 14px gap, art at `aspect-ratio: 4 / 3`; under 760px it becomes one column with the art below (max 360px, centered) and 30px padding.

**About.** Two columns `minmax(0, 1fr) minmax(0, 1.4fr)` with 48px gap, title left, prose right; body paragraphs stack with 20px gap; the range pill list follows with 8px top margin and 8px wrap gap. One column with 24px gap under 760px.

**Nav.** Fixed at `top: 16px`, horizontally centered by `left: 50%; transform: translateX(-50%)`, `z-index: 10`; 12px from the top under 640px.

**Wash.** A `position: fixed; inset: 0; z-index: -1` layer on `paper`, holding four 80vmax radial blobs (`closest-side`, fading to transparent at 64%) anchored off-canvas at each corner (a: top -34vmax / left -26vmax; b: top -20vmax / right -30vmax; c: bottom -40vmax / right -10vmax; d: bottom -30vmax / left -20vmax), so the gradient is viewport-locked and content scrolls over it.

**Breakpoints.** Three, all `max-width`: **720px** (hero padding, subline size), **760px** (section head stack, work grid to one column, card padding and art column, card name and tagline sizes, flagship stacks, About stacks), **640px** (nav top and padding shrink, key hints hide).

**Spacing rhythm.** Values in use, smallest to largest: 2 (nav item gap), 6 (nav shell padding), 8 (icon/pill gaps), 10 (status and button icon gaps), 12 (action gaps), 14 (card row gap), 16 (grid gap, foot gap), 18 (foot top padding), 20 (About paragraph gap), 22, 24 (gutter, card column gap, head margin, contact lede), 28, 32, 34 (card padding), 40, 48 (flagship padding, About gap), 72/88 (section), 120/140 (contact). The base step is 4px; card and section values are deliberately off-grid (34, 22, 18) and should be reused as-is rather than rounded.

### Named Rules
**The Peek Rule.** The Work section's 28px top padding exists so the deep-green flagship card's top edge shows above the fold on desktop. Keep the first card within reach of the hero.

## Elevation & Depth

Depth is tonal first, shadow second. Surfaces are flat slabs on a stone ground, and the strongest depth cue on the page is material contrast: the ink card against sand and stone. The only ambient shadows are soft, large-blur, negative-spread green-tinted casts that appear on the floating nav, the primary button, and cards on hover. All shadows are built from one RGB triple token, `--shadow-ink: 20 46 38` (the ink color), so they read as the ink's own tint rather than gray.

### Shadow Vocabulary
- **Nav float** (`box-shadow: 0 10px 30px -14px rgb(var(--shadow-ink) / 0.35)`): The fixed pill nav, at rest.
- **Primary button rest** (`box-shadow: 0 12px 26px -14px rgb(var(--shadow-ink) / 0.6)`): The ink-filled CTA.
- **Primary button hover** (`box-shadow: 0 18px 30px -14px rgb(var(--shadow-ink) / 0.65)`): Paired with `translateY(-2px)`.
- **Card hover** (`box-shadow: 0 26px 40px -26px rgb(var(--shadow-ink) / 0.45)`): Paired with `translateY(-3px)`. Cards have no shadow at rest.
- **Status pulse** (`box-shadow: 0 0 0 0 → 0 0 0 10px rgb(184 100 31 / 0.5 → 0)`): Not a depth shadow; an expanding ochre ring.

**Glass.** The nav is the one translucent material: `color-mix(in oklab, var(--white) 84%, transparent)` over `backdrop-filter: blur(14px)`.

### Named Rules
**The Ink-Tinted Shadow Rule.** Every shadow uses `rgb(var(--shadow-ink) / alpha)`, never neutral black. Negative spread (-14px, -26px) keeps the cast beneath the element, not around it.

**The Flat-At-Rest Card Rule.** Cards carry no shadow or border at rest; they are distinguished by material alone. Shadow is a hover response only.

## Shapes

The form language is rounded but restrained. Controls (buttons, nav shell, nav links, card links, range pills, and the focus rings on those) are pills (`999px`). Cards are slabs at `--radius-card: 20px` (with `overflow: hidden`); this is the largest container radius in the system. The nav key hint is the one small-radius element (`6px`, 1.5px `currentColor` border at 78% opacity). The status dot is a 10px circle. The wash blobs are 50% circles but read only as a tint. There is no organic blob shape and no star shape anywhere.

Borders are rare: the ghost button's `2px solid color-mix(in oklab, var(--ink) 30%, transparent)` (solid ink on hover) and the key hint's 1.5px are the only ones. Nothing uses a 1px hairline.

Project art follows one grammar: inline SVG in a 120-unit square (320×240 for the flagship), `stroke: currentColor`, `stroke-width: 2.5` (3 for emphasis), round caps and joins, `rx: 5` on 18–19px cells, `rx: 6–15` on larger rects, filled shapes at `opacity 0.3–0.65` for "secondary" state and dashed strokes (`6 8`, `5 6`, `4 6`) for "pending/ghost" state. Checkmarks inside filled cells are stroked in `var(--card)` so they cut through to the card material. The art container takes `color: var(--card-fg)`, so the same mark is ink on sand or stone and cream on an ink card; it sits at `opacity: 0.9` (0.85 on the flagship).

### Named Rules
**The Twenty-Not-Forty Rule.** Containers round at 20px, controls at 999px, and nothing in between. A 40px card corner is the rejected first pass; a square corner is off-world. New containers reuse `--radius-card`.

**The Geometry-Not-Illustration Rule.** Card art is stroked/filled vector geometry in the card's foreground color, never a raster, screenshot, gradient, or illustration. A new project needs a new mark added to `components/Artifact.tsx` following the `stroke` preset and registered in the `marks` map by slug.

## Components

### Buttons (`.btn`)
Firm, quiet, pill-shaped; the only ink-filled control on the page.
- **Shape:** Pill (`999px`), `padding: 14px 22px`, `inline-flex` with 10px gap, 600 / 1rem / line-height 1.
- **Primary** (`.btn--primary`): `ink` fill, `white` text, rest shadow `0 12px 26px -14px`. Hover: `translateY(-2px)` and the deeper shadow. Used once on the page (hero "Get in touch"); it is the mailto.
- **Ghost** (`.btn--ghost`): transparent, `ink` text, `2px` border at 30% ink. Hover: border to solid ink, fill `color-mix(white 55%)`. Used for GitHub (hero, no icon) and GitHub / LinkedIn (contact, with icon).
- **Icon:** A 1em stroked arrow (`ArrowRight` in the hero, `ArrowUpRight` for external links; `stroke-width 2.25`, round caps). On hover the icon slides `translateX(3px)`.
- **Transitions:** transform and box-shadow 0.45s, background and border-color 0.3s, all on `--ease-out`.
- **Focus:** the global 3px ink outline at 4px offset, rounded to a pill.

### Status line (`.status`)
A small live signal, not an eyebrow. `inline-flex`, 10px gap, 600 / 0.9375rem, `ink`, `margin-top: 22px` under the CTA pair. The dot is 10px, `accent`, and pulses a 10px ochre ring every 2.6s (`ease-out`, infinite) when motion is allowed.

### Pill nav (`.nav`)
A floating frosted capsule with keyboard hints.
- **Shell:** fixed, centered, `padding: 6px`, 2px item gap, `white` at 84% over `blur(14px)`, nav-float shadow.
- **Link:** pill, `padding: 10px 18px`, 600 / 1rem, ink; hover fills `ink` at 8%; the section currently in view (`aria-current="location"`, set by an IntersectionObserver with `rootMargin: -35% 0px -55% 0px`) inverts to `ink` fill / `white` text. Transitions 0.35s.
- **Key hint** (`.nav__key`): a 6px-radius badge showing the digit that scrolls to that section (`1`, `2`, `3`; global keydown, ignored inside inputs and with modifiers). Hidden under 640px.
- **Mobile:** `top: 12px`, links `9px 14px` at 0.9375rem.

### Section head (`.section__head`)
Headline left, `ink-2` lede right, bottom-aligned, 24px below to content. Stacks under 760px. About uses `.about__grid` instead (title left column, prose right).

### Project card (`.card`)
A flat slab in one of three materials holding a name, one sentence, a geometric mark, and a tagged foot.
- **Corner Style:** `20px` (`--radius-card`), `overflow: hidden`.
- **Material:** `card--sand`, `card--stone`, or `card--ink`, set via two custom properties: `--card` (surface) and `--card-fg` (text and mark color; `ink` on light materials, `cream` on ink). Every text element inside the card reads `var(--card-fg)`, so a card never needs per-element color overrides.
- **Shadow Strategy:** none at rest; card-hover shadow with `translateY(-3px)` over 0.55s. On hover the art nudges `translate(-3px, -3px)` over 0.7s (no rotation).
- **Border:** none.
- **Internal Padding:** `34px` (26px under 760px); flagship `48px` (30px under 760px).
- **Foot** (`.card__foot`): flex, space-between, bottom-aligned, `padding-top: 18px`. Left: the GitHub card link, or the confidential note (`.card__note`, 0.9375rem) when there is no repo. Right: the tracked-caps label.
- **Card link** (`.card__link`): a 600-weight "GitHub ↗" with a negative-margin pill hit area (`padding: 10px 16px; margin: -10px -16px`) that fills `color-mix(var(--card-fg) 12%)` on hover; icon slides `translate(2px, -2px)`.
- **Flagship** (`.card--flagship`): spans the grid, body/art side by side at 1.15fr/1fr, larger name and tagline, an extra description paragraph, art at 4:3. Only the flagship has a description; it is always `ink`.
- **Entry:** wrapped in `Reveal` with `delay = index * 70ms`.
- **Adding a project:** append to `data/projects.ts` with a `tone` that keeps one `ink` card per row (see The One Green Per Row Rule) and a factual `label`; add a `currentColor` mark to `components/Artifact.tsx` and register it in `marks` under the same slug.

### Range pills (`.about__range li`)
Non-interactive chips listing areas of work: pill, `padding: 10px 14px`, 600 / 0.9375rem, `ink` on `white` at 70%. No hover state; they are labels, not filters.

### Contact email (`.contact__email`)
The page's largest link: 700 weight, `clamp(1.375rem, 3.2vw, 2.25rem)`, -0.02em, `ink`, underlined `4px` in `accent` at `10px` offset; underline turns `ink` on hover (0.3s). `word-break: break-all` so it never overflows on narrow screens.

### Footer (`.footer`)
Centered, `padding: 32px 24px 40px`, 0.9375rem `ink-2`; the "Back to the top" link is 600 `ink` with the global 2px underline at 0.2em offset.

### Reveal (`components/Reveal.tsx`)
A one-shot scroll entrance. Elements render visible on the server; on mount, only elements below the viewport (and only when `prefers-reduced-motion` is not `reduce`) are set to `data-reveal="pending"` (`opacity: 0; translateY(28px)`), then to `"in"` at 12% intersection, transitioning opacity and transform over 0.9s `--ease-out` with an optional `transitionDelay`.

### Motion grammar
All timing uses `--ease-out: cubic-bezier(0.16, 1, 0.3, 1)` unless noted; everything below is gated behind `@media (prefers-reduced-motion: no-preference)` or the matching JS check, so reduced-motion users see a fully static, fully visible page (the wash blobs simply hold their resting positions).
- **Hero rise:** `rise` keyframe (`opacity 0, translateY(28px)` → rest), 1.1s, `both`. Stagger: title line 1 at 0s, line 2 at 0.08s, subline 0.2s, actions 0.3s, status 0.38s.
- **Wash drift:** each blob translates 8–12vmax on `ease-in-out infinite alternate` at 28s / 34s / 31s / 37s (a, b, c, d), so the ground never repeats visibly.
- **Status pulse:** 2.6s `ease-out infinite` expanding ochre ring.
- **Card reveal:** 0.9s rise, 70ms per-card stagger.
- **Hover lift:** buttons -2px / 0.45s, cards -3px / 0.55s, art nudge 0.7s, icons 3px / 0.45s, nav and link fills 0.3–0.35s.
- **Scroll:** `scroll-behavior: smooth` on `html`; key-hint navigation uses `scrollIntoView({ behavior: "smooth" })`.

### Browser surface
- **Selection:** `color-mix(in oklab, var(--accent) 32%, var(--paper))` background, `ink` text.
- **Caret:** `ink`.
- **Scrollbar:** `scrollbar-color: var(--ink) transparent`.
- **Focus ring:** `3px solid ink`, `outline-offset: 4px`; pill-rounded on `.btn`, `.nav__link`, `.card__link`.
- **Links:** inherit color, `text-underline-offset: 0.2em`, `text-decoration-thickness: 2px`.
- **Color scheme:** `color-scheme: light` on `:root`. No dark tokens exist.

## Do's and Don'ts

### Do:
- **Do** set every text element in `ink` (#142e26) or `ink-2` (#3f5c50) on the page ground, and read `var(--card-fg)` inside a card so it resolves to `ink` on sand/stone and `cream` on ink.
- **Do** make every new control a `999px` pill and every new container a `20px` slab; reuse `--radius-card`.
- **Do** narrow every heading with `font-variation-settings: "wdth" 90` (88 for the two largest displays) at weight 800 with negative tracking; keep body and controls at default width.
- **Do** keep the work grid at one `ink` card per row, alternating sides, with `sand` and `stone` as the partner materials; set a new project's `tone` in `data/projects.ts` to preserve that, and give it a `currentColor` SVG mark in `components/Artifact.tsx`.
- **Do** build hover and chip fills with `color-mix(in oklab, var(--white) N%, transparent)` at 55 / 70%, `var(--ink)` at 8%, or `var(--card-fg)` at 12% on cards, rather than introducing a new flat color.
- **Do** tint every shadow with `rgb(var(--shadow-ink) / alpha)` and a negative spread; keep cards shadowless at rest.
- **Do** gate every animation behind `prefers-reduced-motion: no-preference` (CSS) or a `matchMedia` check (JS), and run it on `--ease-out`.
- **Do** cap prose with a `ch` max-width and `text-wrap: pretty`; balance headings.
- **Do** use the same three breakpoints (720px hero, 760px grid/cards/sections, 640px nav) for new surfaces.
- **Do** keep the page light-only; `color-scheme: light` is a brand commitment, not a default.

### Don't:
- **Don't** add a dark mode, a `prefers-color-scheme: dark` block, or dark-surface variants; the ink card is the only dark surface and it lives inside the light page.
- **Don't** bring back the first pass: no candy pastels (lavender, mint, butter, peach), no sparkles, no gradient blob, no 40px corners, no rounded or "friendly" display face. The register is adult and editorial.
- **Don't** add grain, noise, `feTurbulence`, or texture overlays; the ground is the desaturated live wash.
- **Don't** introduce a second typeface, italics, or colored text; hierarchy is weight (800 / 700 / 600 / 400), size, and width in Archivo.
- **Don't** put tracked-caps text above a heading as an eyebrow or kicker; uppercase lives only in the card foot label.
- **Don't** use `accent` for anything but the status dot, the email underline, and the selection tint; it is the sole accent.
- **Don't** put two `ink` cards in the same row, or a row with none; the rhythm is the point.
- **Don't** use neutral black or gray shadows, 1px hairline borders, or square corners.
- **Don't** replace card art with screenshots, rasters, gradients, or illustrations; draw geometry in `currentColor` so it takes the card's foreground.
- **Don't** fabricate labels: card labels are factual tags from `data/projects.ts` (`Internship · Summer 2026`, `In use by DECA competitors`), not status badges.
