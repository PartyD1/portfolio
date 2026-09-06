# PR 00b: the glass is missing in Chromium (ship this first)

Branch: `mobile/00b-glass-in-chromium`. Size: **XS** (a reorder of 13 declaration pairs). Motion skill: no. `/polish`: yes (it is a frontend change; the polish pass should confirm nothing else moved). Real device: an Android with Chrome if one is at hand; a desktop Chrome is enough.

Depends on nothing. **Not a phone-only change**: it fixes every Chromium browser, desktop and Android. It is in this plan because the phone harness found it, and because every later measurement of blur cost on phones is meaningless until it lands.

## 1. The finding (2026-09-05, verified)

The production stylesheet does not contain the unprefixed `backdrop-filter` for any of the site's own glass rules. It contains only the `-webkit-backdrop-filter` twin. Chromium never implemented the prefixed form, so **Chrome, Edge and Android Chrome render no frosted glass anywhere on the live site**: the cards, the timeline, the flow nodes, the case-study panel, the menu, the mark, the toggle, the ring and every pill are their translucent fill and nothing else. Safari (iOS and macOS) is unaffected because it honours the prefix.

Evidence, all reproducible from a worktree:

```
# the production build's own .card rule
$ npm run build && grep -o '\.card{[^}]*}' .next/static/css/*.css | grep -o '[-a-z]*backdrop-filter:[^;]*'
-webkit-backdrop-filter:blur(24px)saturate(1.4)

# what Chromium computes for it (playwright-core, headless shell 1234, mobile emulation or not)
CSS.supports("backdrop-filter", "blur(2px)")            -> true
getComputedStyle(card).getPropertyValue("backdrop-filter") -> "none"
```

Why nobody saw it: `next dev` does not run the optimizer, so the dev server on port 3000 shows the glass. The 2026-09-03 audit and critique measured contrast on production builds in headless Chromium, which is why their numbers were taken **without** blur (pessimistic, so they still hold).

## 2. The mechanism (verified by three builds)

`@tailwindcss/postcss` runs its optimizer whenever `NODE_ENV` is `production` (`optimize ?? process.env.NODE_ENV === "production"` in its bundle). That pass normalises vendor prefixes and treats a later `-webkit-backdrop-filter` as superseding an earlier `backdrop-filter`, so with the source order as written today (standard first, then the prefix):

```css
backdrop-filter: blur(24px) saturate(1.4);         /* dropped by the optimizer */
-webkit-backdrop-filter: blur(24px) saturate(1.4); /* the only one that ships */
```

only the second survives.

| Test | Change | Result |
|---|---|---|
| A | `"browserslist": ["defaults"]` in `package.json` | still only the prefixed declaration |
| C | `{ optimize: false }` on the Tailwind PostCSS plugin | both survive, but the whole stylesheet loses its minification |
| **B** | **prefixed declaration first, unprefixed second, in the source** | **both survive: `-webkit-backdrop-filter:blur(24px)saturate(1.4)` then `backdrop-filter:blur(24px)saturate(1.4)`** |

Test B is the fix. It is also the conventional order (prefixed first, standard last) that every prefix-aware tool assumes.

## 3. The change

In `app/globals.css`, for every pair, put the `-webkit-backdrop-filter` line **before** the `backdrop-filter` line. There are 13 pairs today (`grep -n '^  backdrop-filter:' app/globals.css` lists them): `.shell__mark`, `.theme-toggle`, `.menu`, `.scroll-ring`, `.pill`, `.card`, `.live-link`, `.card__repo`, `.timeline__card`, `.flow__node`, `.flow__bus`, `.case__headline`, `.tech__item`. Nothing else changes. Add one comment above the first pair:

```css
/* -webkit- FIRST, then the standard property, in every pair. The production
 * CSS optimizer treats a prefixed declaration that follows the standard one
 * as superseding it and drops the standard one, and Chromium only reads the
 * standard one: written the other way round, Chrome shipped no glass at all
 * from 2026-09-01 to this fix. */
```

Every later PR that adds a glass surface (`.card__cue`, `.menu__close`, `.shots__expand`, `.shots__dialog-close`, `.copy`) writes its pair in this order; the plan documents already do.

## 4. Consequences for the rest of the plan

- **Contrast**: the composited-pixel numbers in `DESIGN.md` and the audit were measured without blur in Chromium. Blur averages the backdrop under a text run, which lowers the extremes; the measured floor is therefore the pessimistic case and stays valid. PR 11 re-measures with blur present.
- **Performance**: Chromium has been paying nothing for 25 backdrop-filter surfaces because it was not drawing them. After this PR it will. PR 10's measurements must be taken **after** this lands, and the phone blur budget (PR 10 section 4) matters more than it did.
- **The harness**: `scripts/mobile-capture.mjs` counts `backdrop-filter` surfaces from computed style. It reads 0 on the current site because there are none in Chromium; after this PR it reports the real count (expect about 25 on `/` at 390 before PR 10, 13 after).
- **Desktop captures**: the 1440 baseline set in `.impeccable/review/` was taken by headless Chromium and shows no blur. After this PR every desktop capture will differ from it (the glass is finally there). Regenerate the desktop set in PR 12 and say so; do not treat the difference as a regression in PRs 01 to 11 (their "1440 identical" gates compare against a post-00b capture; take one when this lands and keep it beside the baseline).

## 5. Gate

- [ ] `npm run build`, then: every `backdrop-filter:` in `.next/static/css/*.css` that belongs to a site rule is immediately preceded by its `-webkit-backdrop-filter:` twin (`grep -o '\-webkit-backdrop-filter:[^;]*;backdrop-filter:[^;}]*' .next/static/css/*.css | wc -l` equals 13).
- [ ] Headless Chromium at 1440 and 390: `getComputedStyle(document.querySelector(".card")).getPropertyValue("backdrop-filter")` is `blur(24px) saturate(1.4)`; the harness reports about 25 blur surfaces on `/`.
- [ ] Desktop Chrome by eye: the cards are frosted over the blobs; the menu sheet is frosted over the page; the theme toggle is frosted over the top-right blob.
- [ ] Safari unchanged (the prefix still comes first, so Safari 17 and under keep it; Safari 18+ reads the standard one).
- [ ] Detector 0; `/polish` run.
- [ ] Take the post-fix 1440 light and dark captures and store them as `.impeccable/review/desktop-after-00b/`; the later PRs compare against those.

Commit title: `Write the -webkit- backdrop-filter first so the production optimizer keeps the standard one: Chrome gets its glass back`.
