# PR 06: the case-study header on phones

Branch: `mobile/06-case-study-header`. Size: M. Motion skill: yes (the panel's recede values). `/polish`: yes. Real device: no.

Depends on PR 01 (and PR 02's `--recede-shift` token; if PR 02 has not landed, add the token here exactly as PR 02 section 7 specifies). Decision: **D9** (denser tiles, nothing hidden).

Baseline to look at first: `claws-390-light-fold.png`, `ops-390-light-sheet.png` screen 1, `scorely-390-light-sheet.png` screen 1.

## 1. Why (measured, 390 x 844)

| | Today |
|---|---|
| The panel | `case__header` padding-top 96; panel padding 24/22; header block 600 (ScorelyAI) to **721px** (Santa Claws) tall, so "How it works" starts under the first screen on every route |
| Title | 32px; "OPERATIONS AGENT" on two lines (69px box); "SANTACLAWS" on one |
| Tagline | 17px |
| Tech tiles | 46px tall pills, 10px gaps, 14px names, 19px marks. Operations Agent: 5 tiles in **3 rows**. ScorelyAI: 6 in 3. Santa Claws: 11 in **6 rows** (326px of the panel) |
| Meta and note | 15px and 16px, fine |
| Back link | 15px, 44px target (good) |
| Blur | every tile carries its own `blur(12px)` on top of the panel's `blur(30px)` |

## 2. What it becomes

The same panel, tighter: the back link, the title one step larger, the tagline one step larger, the live pill, then the tiles as a dense wrap of 32px pills at 6px gaps (11 tiles in four rows), then the meta line and the note. Header block about 540 to 560px on every route, so the flow's heading is in the first screen on the shorter ones.

## 3. Files

- `app/globals.css` only: the case header phone rules (~line 3142 and ~3279) and the recede token.

## 4. CSS

```css
@media (max-width: 760px) {
  .case__header {
    padding-top: 92px;
  }
  .case__headline {
    padding: 22px 20px 24px;
  }
  .case__back {
    margin-bottom: 8px;
    font-size: 1rem;
  }
  .case__title {
    /* 34px at 390, 30px at 320 (the floor), 37px at 430. The longest single
     * word, OPERATIONS, is about 7.2em: 245px at 34px inside a 309px panel
     * column. overflow-wrap: anywhere stays as the net. Px bounds. */
    font-size: clamp(30px, 8.7vw, 64px);
    line-height: 1.06;
  }
  .case__tagline {
    margin-top: 12px;
    /* 18px at 390: the one sentence that says what this is, a step above
     * body. */
    font-size: clamp(17px, 4.6vw, 20px);
  }
  .case__live {
    margin-top: 18px;
  }
  .case__meta {
    margin-top: 18px;
  }
  .case__note {
    margin-top: 12px;
  }
}
```

The tiles (D9):

```css
@media (max-width: 760px) {
  .tech {
    gap: 6px;
    margin-top: 20px;
  }
  .tech__item {
    gap: 7px;
    padding: 6px 11px 6px 8px;
    /* The panel behind the tiles is already blurred at 30px; a second blur
     * on each of eleven tiles re-samples the same backdrop eleven times for
     * no visible gain. Glass on glass is an edge and a fill, not a filter. */
    -webkit-backdrop-filter: none;
    backdrop-filter: none;
  }
  .tech__mark {
    width: 18px;
    height: 18px;
  }
  .tech__name {
    font-size: 0.875rem;
  }
}
```

Tile height becomes 32px (6 + 18 + 6 + the 2px border... measure and record). Santa Claws: 11 tiles at an average of about 95px each in a 309px column fit three per row: four rows, 146px instead of 326.

The panel's recede uses `--recede-shift` (PR 02): at 8% on phones the panel falls back 45px as the flow heading arrives instead of 58px into it.

## 5. The 404

`app/not-found.tsx` is built from `.case__headline`; it inherits every rule above and needs nothing, but it is in the gate because it is the one route nobody looks at.

## 6. Gate

`node scripts/mobile-capture.mjs --routes /work/operations-agent,/work/scorely-ai,/work/santaclaws,/work/wave-function-collapse,/nothing-here --widths 320,390,430 --themes light,dark --root20`.

- [ ] `sections`: `case__header` height at most 560 on every route at 390 (Santa Claws at most 580); at most 660 at 320.
- [ ] `.case__title` 34 / 30 / 37 at 390 / 320 / 430; `hOverflow` 0 at 16px and 20px root on `/work/santaclaws` and `/work/wave-function-collapse` (the two hardest titles).
- [ ] `.tech__item` height at most 34; Santa Claws tiles in at most four rows (count distinct `top` values); every tile's name fully visible (no clipping).
- [ ] `.tech__item` has no `backdrop-filter` under 760 and keeps it at 1440.
- [ ] `/nothing-here` renders the same panel and the same back link at 390.
- [ ] Desktop 1440 identical to baseline.
- [ ] Both themes captured; the tiles' `--glass-raised` on the panel's `--glass-strong` still read as raised in dark without the blur (screenshot).

Commit title: `Case-study header on phones: a bigger name, a denser tool row`.
