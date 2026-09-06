# PR 01: mobile foundations

Branch: `mobile/01-foundations`. Size: M. Motion skill: no (no motion is written here). `/polish`: yes. Real device: yes (safe areas, tap highlight, reduced transparency).

Depends on PR 00. Every later PR assumes this one is in: the breakpoint set, the safe-area tokens, the tap behaviour, the type floor and the target rule.

Decisions implemented: none of D1 to D15 directly; this is the ground they stand on.

## 1. Why (measured)

- No `viewport-fit=cover` and no `env(safe-area-inset-*)` anywhere. In landscape on a notched iPhone the PD mark (left 16px) and the scroll ring (right 18px) can sit under the sensor housing; the footer's last 40px sit behind the home indicator.
- Phone breakpoints are spread over 640 (shell), 720 (hero, blobs, drift), 760 (gutter, sections, cards, timeline, tech, shots, case, flow margin), 400 (menu, pills) and 360 (email). Three "phone" thresholds for one device class means a 740px viewport gets the desktop shell and hero with phone cards.
- Text under 14px on phones: `.pill` 13px, `.flow__branch` 13px, `.shots__count` 13px. Body is 17px, so 13px is 76% of body.
- Targets under 44px: `.shots__dot` 24x24; `.menu__foot a` 21px tall (fixed properly in PR 04, floored here).
- Default iOS tap highlight (a grey flash) fires on every card press over the glass; the card already has its own press state.
- No `prefers-reduced-transparency` handling: on iOS with Reduce Transparency on, the frosted surfaces are still frosted.

## 2. Files

- `app/layout.tsx` (the `viewport` export)
- `app/globals.css` (tokens block, base block, the phone blocks named below)
- No component changes.

## 3. Changes

### 3.1 Viewport and safe areas

`app/layout.tsx`:

```ts
export const viewport: Viewport = {
  viewportFit: "cover",
  themeColor: [ /* unchanged; PR 11 syncs it to the toggle */ ],
};
```

`globals.css` tokens, both themes share them (they are not colours):

```css
:root {
  /* The four insets, as tokens so every fixed thing derives from one name.
   * Zero everywhere except inside a notch or above a home indicator. */
  --safe-top: env(safe-area-inset-top, 0px);
  --safe-right: env(safe-area-inset-right, 0px);
  --safe-bottom: env(safe-area-inset-bottom, 0px);
  --safe-left: env(safe-area-inset-left, 0px);
}
```

Apply them where something is fixed or touches an edge:

```css
.shell {
  /* was: padding: 22px 28px */
  padding: 22px max(28px, var(--safe-right)) 22px max(28px, var(--safe-left));
}
@media (max-width: 760px) {
  .shell {
    /* was 14px 16px under 640px */
    padding: max(14px, var(--safe-top)) max(16px, var(--safe-right)) 14px max(16px, var(--safe-left));
  }
}
.scroll-ring {
  right: max(28px, var(--safe-right));
  bottom: max(28px, var(--safe-bottom));
}
@media (max-width: 760px) {
  .scroll-ring {
    right: max(18px, var(--safe-right));
    bottom: max(18px, calc(var(--safe-bottom) + 6px));
  }
}
.footer {
  /* was: padding: 28px 24px 40px */
  padding: 28px 24px max(40px, calc(var(--safe-bottom) + 24px));
}
```

The column itself: `.hero`, `.section` and `.case` all pad with `var(--gutter)`. Rewrite those three declarations so the horizontal padding is `max(var(--gutter), var(--safe-left))` / `max(var(--gutter), var(--safe-right))` using `padding-inline`, and keep the vertical values exactly as they are (`.hero` 120/56 desktop, 96/48 phone; `.section` 80/96 desktop, 64/72 phone; `.case` 0). The hero's `max-width: calc(1140px + var(--gutter) * 2)` is unchanged; a notch only ever adds padding, never removes column.

The menu sheet's bottom padding is PR 04's; do not touch `.menu` here.

### 3.2 Tap behaviour

In the base block:

```css
a,
button,
[role="button"] {
  /* The site draws its own press state (scale 0.97/0.98); the platform's grey
   * flash on top of it reads as a second, uglier acknowledgement. */
  -webkit-tap-highlight-color: transparent;
  /* Removes the double-tap-to-zoom wait on controls only. The page itself
   * still pinch-zooms; that is an accessibility feature, not a bug. */
  touch-action: manipulation;
}
```

Tailwind v4's preflight already sets `-webkit-text-size-adjust: 100%` on `html`; verify it is in the built CSS (`grep -o 'text-size-adjust' .next/static/css/*.css`) and do not duplicate it.

`.card` is a server-rendered `<article>` whose link is `.card__hit` (an `<a>`); `:active` on the anchor propagates to the article in Safari and Chrome, so the card's press state fires on touch without JavaScript. Confirm on the device (section 6); if it does not fire on iOS, the fix is `cursor: pointer` on `.card`, nothing more.

### 3.3 One phone breakpoint

Move every phone rule to `760px`:

- `@media (max-width: 720px)` blocks (the blob sizing at line ~492, the drift stop at ~601, the hero block at ~1250) become `(max-width: 760px)`.
- `@media (max-width: 640px)` blocks (the shell at ~713, the scroll ring at ~989) become `(max-width: 760px)`.
- `(max-width: 400px)` (menu width, pill wrap) and `(max-width: 360px)` (email step) stay: they are "small phone" and "tiny phone", not a second phone threshold.
- `(max-width: 900px)` (flow to one column) and `(max-width: 1000px)` (grid to one column) stay: they are content-driven, above the phone.

Add one comment block at the top of the Sections area, and reference it from every phone block:

```css
/* ==========================================================================
   Breakpoints (read this before adding one)
   ==========================================================================
   1000px  the Work grid goes to one column (a two-column card needs ~235px of
           text column; see .work__grid)
    900px  the flow diagram turns downward
    760px  THE PHONE. Gutter, sections, hero, blobs, drift, shell, cards,
           timeline, tech tiles, slideshow, case study, flow spacing.
    400px  small phone: the menu widens, pills may wrap
    360px  tiny phone: the email steps down one size
   There is no 720 and no 640 any more (2026-09). A phone is one device class
   and gets one threshold; the two below it are named exceptions.
   ========================================================================== */
```

`components/Reveal.tsx`, `ScrollScrub.tsx`, `Spotlight.tsx`, `FlowGlow.tsx` contain no width queries (they use `hover`/`pointer` and `prefers-reduced-motion`), so nothing in JS moves.

### 3.4 The phone type floor

Rule: **no visible text under 14px on phones.** Body stays 17px. The display and section ramps are set in their own PRs (02, 05, 06, 07, 08); this PR lifts only the floors, so nothing is edited twice.

| Selector | Now (390) | After | Note |
|---|---|---|---|
| `.pill` | 13px | **14px** | `font-size: 0.875rem`; padding stays `6px 13px` |
| `.flow__branch` | 13px | **14px** | `font-size: 0.875rem` |
| `.shots__count` | 13px | **14px** | `font-size: 0.875rem` |
| `.menu__key` | 12px | hidden on touch in PR 04 | leave |
| `.pending-note` | 12px | unchanged | the résumé is live; this state does not render |
| `.footer__line` | 14px | unchanged | at the floor |
| `.tech__name` (phone) | 14px | unchanged | at the floor; PR 06 makes the tile denser by padding, not by type |
| `.flow__index` | 12px | unchanged | a numeral in a 26px circle, not a text run; PR 07 sets it to 13px in a 28px circle |

These are global values (the pill is the pill at every width). `.pill` at 14px on desktop is a 1px step up from 13; DESIGN.md's Label step is 14px, so this is the pill joining the ramp rather than sitting under it.

### 3.5 The target rule

Under `@media (pointer: coarse)` (already the home of `.link-arrow` and `.case__back` at 44px):

```css
@media (pointer: coarse) {
  .menu__foot a,
  .menu__resume {
    min-height: 44px;
    display: inline-flex;
    align-items: center;
  }
  /* The DOT stays 9px; the BUTTON grows to a thumb's width and the row's
   * height. Zero gap between dots is still right: 36px of button per dot
   * holds them 27px apart. */
  .shots__dot {
    width: 36px;
    height: 44px;
  }
}
```

PR 04 replaces the menu foot entirely; the floor here means the site is never shipped between the two PRs with 21px links.

### 3.6 Reduced transparency

A token pair (both themes, or it is a bug):

```css
:root {
  /* What a glass surface becomes when the OS asks for no transparency:
   * the panel colour, nearly opaque, so the text keeps the ground it was
   * measured on. */
  --glass-solid: color-mix(in oklab, var(--white) 92%, var(--ground));
}
.dark {
  --glass-solid: color-mix(in oklab, var(--white) 88%, var(--ground));
}

@media (prefers-reduced-transparency: reduce) {
  .card,
  .card__media,
  .timeline__card,
  .timeline__project,
  .timeline__project-mark,
  .flow__node,
  .flow__branch,
  .flow__bus,
  .case__headline,
  .menu,
  .pill,
  .live-link,
  .card__repo,
  .tech__item,
  .shell__mark,
  .theme-toggle,
  .scroll-ring,
  .shots__arrow {
    -webkit-backdrop-filter: none;
    backdrop-filter: none;
    background: var(--glass-solid);
  }
  /* The screenshot well is already opaque; the wash keeps its blobs: the
   * preference is about surfaces over content, not about the ground. */
}
```

Keep this block at the end of the file, after every component, so it wins by order as well as by intent.

## 4. What this PR does not do

- No display sizes, no spacing rhythm, no card or hero changes (PRs 02 to 08).
- No motion.
- No `overscroll-behavior` on `html`: pull-to-refresh is expected on phones.
- No `dvh`.

## 5. Gate

Run `node scripts/mobile-capture.mjs --widths 390,320,360,430,740 --landscape --tablet --root20 --menu` on all four routes.

- [ ] build passes, detector 0.
- [ ] `hOverflow` 0 everywhere, at 16px and 20px root.
- [ ] `text-floor` PASS on every route at 390 and 320 (no sampled run under 14px).
- [ ] `.shots__dot` 36x44; `.menu__foot a` 44 tall (from `--menu`).
- [ ] `getComputedStyle(document.querySelector('.shell')).paddingLeft` is `16px` at 390 and `28px` at 1440; the rule text contains `env(safe-area-inset-left`.
- [ ] 740x900 capture: phone shell (50px mark), phone hero rules, blobs sized in `vw`, no drift animation running.
- [ ] Reduced transparency: force it through CDP (`Emulation.setEmulatedMedia` with `features: [{ name: "prefers-reduced-transparency", value: "reduce" }]`) and capture `/` and `/work/operations-agent` at 390 in both themes: no `backdrop-filter` in computed styles on the listed selectors; captions and bullets still on their surfaces.
- [ ] 1440 light and dark captures identical to the baseline desktop set except the pill's 1px type step and the shell/ring `max()` (which resolve to the same numbers on a desktop).
- [ ] Real device: the four safe-area items and the tap-highlight item in `SEQUENCE.md` section 6.

Commit title: `Mobile foundations: safe areas, tap behaviour, one phone breakpoint, the 14px floor`.
