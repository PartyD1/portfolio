# PR 11: theme and accessibility on phones

Branch: `mobile/11-theme-and-a11y`. Size: M. Motion skill: no. `/polish`: yes. Real device: **yes** (status bar colour, VoiceOver, Reduce Motion and Reduce Transparency).

Depends on PRs 03, 05, 06 merged (it re-measures what they moved). Decision: **D8** (follow the phone's theme by default; its own commit, the one assumption that also changes desktop).

## 1. Why (measured)

| | Today |
|---|---|
| Theme default | `ThemeProvider` has `defaultTheme="light"` with `enableSystem`, so a phone set to dark gets the light site until the toggle is pressed |
| `theme-color` | two `<meta>` tags on `prefers-color-scheme`; a phone in system dark showing the light site gets a **dark status bar over a light page**, and toggling never updates it |
| Dark contrast at 390 | measured in the 2026-09-03 audit before the ground-tinted glass landed; DESIGN.md records the worst runs at 4.51:1 light and 4.55:1 dark after it. PRs 03, 05 and 06 move taglines to full width, About and footer pills lose their blur (PR 10), and the tech tiles lose theirs |
| Screen readers | nothing on the new controls (cue, sheet close, copy, expand, dialog) has been heard yet |
| 200% text | the hero clamps, tiles and sheet are new since the last assertion |
| Landscape, 280px | never captured |

## 2. The theme default (D8, its own commit)

`components/ThemeProvider.tsx`: `defaultTheme="system"`. next-themes then follows `prefers-color-scheme` until the visitor presses the toggle, which stores an explicit `light` or `dark` in `localStorage.theme` as it does today. Nothing else changes; the toggle's label and `aria-pressed` are already correct for both states.

Desktop is affected: a visitor whose OS is dark now meets the dark site first. That is the behaviour every OS-aware site has, and the dark theme is a first-class token set here. Say it in the PR body; it is one line to revert.

The harness is unaffected: it seeds `localStorage.theme` explicitly.

## 3. Sync `theme-color` with the page

In `components/ThemeToggle.tsx` (already a client component with `resolvedTheme` and `mounted`):

```ts
useEffect(() => {
  if (!mounted) return;
  // The CSS owns the colour; read it back rather than repeating the hex.
  const ground = getComputedStyle(document.documentElement)
    .getPropertyValue("--ground")
    .trim();
  document
    .querySelectorAll<HTMLMetaElement>('meta[name="theme-color"]')
    .forEach((m) => {
      m.content = ground;
    });
}, [mounted, resolvedTheme]);
```

Keep the two media-scoped metas in `app/layout.tsx` for the first paint: with the default now `system`, they agree with the page before hydration; after a toggle the effect rewrites both so whichever one the browser consults is right. Safari updates the status bar on `content` change.

## 4. Contrast, re-measured on composited pixels

Add `scripts/mobile-contrast.mjs` (playwright-core, same install as the harness). The method is the one that produced trustworthy numbers on this site (memory: `contrast-measurement-method`; audit 2026-09-03):

1. For each route at 390 in both themes, screenshot the viewport at each scroll position (the harness's segments, at `deviceScaleFactor: 1`).
2. In the page, draw the screenshot into a `<canvas>` and `getImageData`. For every element with a direct text node whose box is at least 1.15x its font size tall: sample **one row inside the top edge and one inside the bottom edge, at five x positions** across the box. Those rows are in the leading, so they read the ground the text is printed on.
3. Discard samples within RGB distance 60 of the computed `color`. Compute the WCAG ratio of the text colour against each remaining sample; report min, p20 and median.
4. A run **fails** when p20 is under 4.5, or under 3.0 for text at 24px or larger, or 18.66px and bold.
5. Do not sample outside the box (it reads the wrong ground) and do not sample an interior grid (it hits the glyphs). Both produce false failures; both were tried.

Routes and the runs to watch, at 390, both themes:

| Route | Runs |
|---|---|
| `/` | `.card__tagline` on every card (now full width, over blob C's core on the left cards), `.card__fact`, `.card__use`, `.timeline__ownership`, `.timeline__org`, `.about__body p` (on the raw wash), `.pill` (About, no blur now), `.footer__line`, `.hero__avail`, `.roll__text`, `.contact__lede` |
| `/work/operations-agent` | `.case__back`, `.case__meta`, `.case__note`, `.tech__name` (no blur now), `.flow__detail`, `.flow__branch`, `.flow__bus-detail`, `.case__points li` (on the raw wash), `.case__foot-lede` |
| `/work/santaclaws` | the same plus `.shots__cap` and `.shots__count` |
| the open menu | `.menu__foot-row a` |

Fix order when a run fails, and never the ink: (1) the surface, `--glass` to `--glass-strong` for that phone panel under 760; (2) `--blob-opacity` under 760 (0.86 to 0.78 light, 0.50 to 0.44 dark) with the blob-core chroma measured in the same run so the world does not wash out; (3) a glass pill for a run that has no surface (the site's Surface-Not-Spacing rule). Record every changed value and the before/after p20 in the PR body.

## 5. Screen readers (VoiceOver on iOS; TalkBack if an Android is at hand)

Swipe through and confirm each announcement:

- [ ] Hero: "Hey, I'm Parth Doshi: developer, ...", then "Scroll to the work, link".
- [ ] A card: the name heading, the tagline, "View the ScorelyAI case study, link" (the cue is silent), "Try ScorelyAI live, opens in a new tab, link", "ScorelyAI on GitHub, opens in a new tab, link".
- [ ] The mark: "Open menu, button"; the sheet: "Menu, dialog"; the four links; "pmdoshi@ucsc.edu, link"; the three pills; "Close menu, button". Escape is not on a phone; the close button is.
- [ ] Contact: the address, then "Copy email address, button"; after activation "Copied" is announced once.
- [ ] Case study: "How it works, heading", "list, 5 items", each item's title and detail, the branch lists.
- [ ] Slideshow: "ScorelyAI screens, use the arrow keys, group", "1 of 2, group", "Expand: ... , button" on a tall slide; the dialog announces its label; "Close, button".
- [ ] The theme toggle: "Switch to dark theme, toggle button, not pressed" (unchanged; the audit's P3-18 note about double state encoding is accepted as is).

## 6. 200% text, landscape, the smallest phone

- `node scripts/mobile-capture.mjs --root20` on all four routes at 320, 390, 430: `hOverflow` 0; the hero stays two lines; the tiles wrap; the sheet's links wrap inside their column (`.menu__label` keeps `overflow-wrap: break-word`); the foot pills wrap to a second row rather than overflow (`flex-wrap: wrap` on `.menu__foot-row`, add it if PR 04 did not).
- Landscape 844 x 390 on `/`: the desktop hero rules apply at 844 wide; the name at 43px on one line, role and facts inside 390px of height with the 120px top padding. Capture both themes; nothing to change unless something overflows.
- 280 x 653 (a folded phone's cover screen): `hOverflow` 0 on every route; the hero name 28px; the ScorelyAI foot wraps; the sheet's three foot pills wrap to two rows.

## 7. Forced colours and reduced transparency

```css
@media (forced-colors: active) {
  /* The gradient rails vanish under forced colours; give them the system
   * text colour so the order they draw survives. */
  .timeline__list::before,
  .flow__steps::before {
    background: CanvasText;
  }
}
```

Reduced transparency shipped in PR 01; verify it once on the device with the setting on, on `/` and a case study, both themes.

## 8. Gate

- [ ] `defaultTheme="system"` in its own commit; a phone in system dark opens dark (emulate with `colorScheme: "dark"` and **no** seeded `localStorage.theme`: the harness gains a `--system-theme` flag for this one check).
- [ ] After toggling, every `meta[name="theme-color"]` content equals the computed `--ground`; on the device the status bar follows the toggle.
- [ ] `scripts/mobile-contrast.mjs` output for the four contexts with **no failing run**; every changed token listed with before/after p20; blob-core chroma within 10% of its previous value.
- [ ] Section 5 checklist clean on VoiceOver.
- [ ] Section 6: `--root20` overflow 0 everywhere; landscape and 280 captures attached.
- [ ] Forced colours: rails visible (emulate with CDP `Emulation.setEmulatedMedia`, feature `forced-colors: active`).
- [ ] Desktop 1440: identical to baseline in the light theme with the theme seeded; the only desktop change is the default, stated.

Commit titles: `Follow the phone's theme by default`, then `Theme colour follows the toggle; phone contrast re-measured; forced colours keep the rails`.
