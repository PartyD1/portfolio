# PR 05: Experience, About, Contact and the footer on phones

Branch: `mobile/05-experience-about-contact`. Size: M. Motion skill: yes (the copy control's state change). `/polish`: yes. Real device: no.

Depends on PR 01. Decisions: **D13** (copy control beside the email, its own commit), **D12** (no floating email control; the section is where the address lives, plus the menu).

Baseline to look at first: `home-390-light-sheet.png` screens 5 to 8.

## 1. Why (measured, 390 x 844)

| | Today |
|---|---|
| Section rhythm on phones | 64px top / 72px bottom, head margin 28px; `.section__title` 32px |
| Experience | 1,182px. Period 15px display caps; "Augmented Design Lab, UC Santa Cruz" wraps under the role; ownership 16px/1.55 over seven lines; project chip a 66px pill; rail at 9px; cards padded 22/22/24; 24px between items |
| About | 836px. Three paragraphs at 17px/1.6, four 13px pills (14px after PR 01) |
| Contact | 553px. Title 36px; lede and ask 17px; email 24px in a 48px target (good); GitHub / LinkedIn / Résumé as 44px text links that, without hover, never show the underline they were designed around |
| Footer | a centred pill; at 390 its right edge (x=340) sits **under the scroll ring** (x=328 to 372) whenever the footer is at the bottom of the viewport, so "top" is covered by the ring |
| Email | `mailto:` only; phones without a configured mail client open nothing |

Nothing here is broken the way the hero and the cards are. This PR is rhythm, reach and one conversion detail.

## 2. Files

- `app/globals.css`: the phone section rhythm, timeline, About, Contact, footer blocks.
- `components/Contact.tsx` and `app/work/[slug]/page.tsx`: wrap the address with the copy control.
- `components/CopyEmail.tsx` (new, client): the copy control.
- `components/Icon.tsx`: `Copy` and `Check` (drawn, 2.25 stroke).

## 3. Section rhythm on phones

```css
@media (max-width: 760px) {
  .section {
    padding-block: 56px 64px;
  }
  .section__head {
    margin-bottom: 20px;
  }
  .section__title {
    /* 34px at 390, 30px at 320, 37px at 430: one step above the 32px floor so
     * the section labels keep pace with the two-line hero. Px bounds. */
    font-size: clamp(30px, 8.7vw, 52px);
  }
  .section--exp {
    padding-top: 8px;
  }
}
```

PR 02 owns `.section--work { padding-top: 20px }` and its head margin; keep whichever landed first.

## 4. The timeline

```css
@media (max-width: 760px) {
  .timeline {
    --tl-gap: 34px;
  }
  .timeline__list {
    gap: 20px;
  }
  .timeline__item {
    row-gap: 8px;
  }
  .timeline__period {
    font-size: 1rem;
    letter-spacing: 0.03em;
  }
  .timeline__node {
    top: 4px;
  }
  .timeline__card {
    padding: 18px 18px 20px;
    gap: 4px;
  }
  .timeline__ownership {
    margin-top: 6px;
  }
  /* The chip becomes a row: the full card width, name left, arrow right, so
   * the one link in the card is a thumb-sized bar rather than a small pill
   * a thumb has to find. */
  .timeline__project {
    width: 100%;
    justify-content: space-between;
    margin-top: 14px;
    padding: 6px 14px 6px 6px;
  }
  .timeline__project-mark {
    width: 44px;
    height: 44px;
  }
  .timeline__project .icon {
    margin-left: auto;
  }
}
```

The incoming EduSchool row already renders only role and company; it needs nothing.

## 5. About

```css
@media (max-width: 760px) {
  .about__grid {
    gap: 16px;
  }
  .about__body {
    gap: 16px;
  }
  .about__range {
    margin-top: 6px;
  }
}
```

Paragraph size stays 17px/1.6: it is the best-set text on the phone today. Pills are 14px from PR 01.

## 6. Contact

```css
@media (max-width: 760px) {
  .contact {
    padding-top: 72px;
    padding-bottom: 104px;
  }
  .contact__title {
    /* 40px at 390, 34px at 320, 44px at 430. */
    font-size: clamp(34px, 10.3vw, 44px);
  }
  .contact__lede {
    margin-top: 18px;
  }
  .contact__seeking {
    margin-top: 12px;
  }
  .contact__links {
    gap: 10px;
    margin-top: 28px;
  }
}

/* Where hover does not exist the arrow links have no underline to reveal, so
 * they read as bare words. A pill gives them an edge to be tapped by. The
 * same pill the menu foot uses in PR 04. */
@media (hover: none) {
  .contact__links .link-arrow,
  .case__foot-links .link-arrow {
    padding: 0 16px;
    min-height: 44px;
    border-radius: 999px;
    border: 1px solid var(--glass-edge);
    background: var(--glass-raised);
    font-weight: 600;
  }
  .contact__links .link-arrow::after,
  .case__foot-links .link-arrow::after {
    content: none;
  }
}
```

### 6.1 The copy control (D13, its own commit)

Markup in `Contact.tsx` (and the case foot in `app/work/[slug]/page.tsx`, same three lines):

```tsx
<div className="address">
  <a className="contact__email" href={`mailto:${links.email}`}>{links.email}</a>
  <CopyEmail email={links.email} />
</div>
```

`components/CopyEmail.tsx`:

```tsx
"use client";
import { useEffect, useRef, useState } from "react";
import { Copy, Check } from "@/components/Icon";

/**
 * Copies the address. A phone with no mail client configured opens nothing on
 * mailto:, and a recruiter should not have to retype an address. The control
 * says what it did for 1.6s, then returns; aria-live carries the same word to
 * a screen reader.
 */
export default function CopyEmail({ email }: { email: string }) {
  const [done, setDone] = useState(false);
  const timer = useRef<number | null>(null);
  useEffect(() => () => { if (timer.current) window.clearTimeout(timer.current); }, []);
  return (
    <button
      type="button"
      className="copy"
      data-done={done || undefined}
      aria-label="Copy email address"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(email);
          setDone(true);
          if (timer.current) window.clearTimeout(timer.current);
          timer.current = window.setTimeout(() => setDone(false), 1600);
        } catch {
          /* No clipboard permission: the address is selectable beside it. */
        }
      }}
    >
      <span className="copy__icon copy__icon--copy"><Copy /></span>
      <span className="copy__icon copy__icon--done"><Check /></span>
      <span className="sr-only" aria-live="polite">{done ? "Copied" : ""}</span>
    </button>
  );
}
```

Icons in `Icon.tsx`: `Copy` is two rounded rects offset by 4 units (`<rect x="7" y="7" width="10" height="10" rx="2"/><path d="M13 7V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"/>`); `Check` is `<path d="M4 10.5l4 4 8-9"/>`. Same 20x20 box, 2.25 stroke, round caps.

```css
.address {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px 14px;
  margin-top: 26px;
}
.address .contact__email {
  margin-top: 0;
}
.copy {
  position: relative;
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  padding: 0;
  border-radius: 999px;
  border: 1px solid var(--glass-edge);
  background: var(--glass-raised);
  color: var(--ink-2);
  cursor: pointer;
  transition: transform 160ms var(--ease-out), border-color 200ms var(--ease-out);
}
.copy:active {
  transform: scale(0.97);
}
.copy__icon {
  grid-area: 1 / 1;
  width: 18px;
  height: 18px;
  opacity: 0;
  transition: opacity 160ms var(--ease-out), transform 160ms var(--ease-out);
}
.copy__icon svg {
  width: 100%;
  height: 100%;
  fill: none;
  stroke: currentColor;
  stroke-width: 2.25;
  stroke-linecap: round;
  stroke-linejoin: round;
}
.copy__icon--copy {
  opacity: 1;
}
.copy[data-done] .copy__icon--copy {
  opacity: 0;
}
.copy[data-done] .copy__icon--done {
  opacity: 1;
  color: var(--signal-ink);
}
@media (prefers-reduced-motion: no-preference) {
  .copy__icon--done {
    transform: scale(0.85);
  }
  .copy[data-done] .copy__icon--done {
    transform: none;
  }
}
@media (hover: hover) and (pointer: fine) {
  .copy:hover {
    border-color: color-mix(in oklab, var(--signal) 40%, var(--glass-edge));
    color: var(--ink);
  }
}
```

Motion, per the framework: purpose is state indication; 160ms crossfade with a settle from 0.85 (nothing from `scale(0)`); the check takes `--signal-ink`, which is the text-safe coral, for the 1.6s it shows. Reduced motion keeps the crossfade and drops the settle. The `.contact__email` keeps `margin-top: 26px` when rendered alone (the menu foot does not use this wrapper).

The control renders on every device. If Parth wants it phone-only, wrap the rules in `@media (hover: none)` and render it always; do not branch in JS.

## 7. Footer and the scroll ring

```css
@media (max-width: 760px) {
  /* Left-aligned like everything else, and clear of the scroll ring: the
   * centred pill's right edge sat under the ring at 390. */
  .footer {
    justify-content: flex-start;
    padding-inline: max(var(--gutter), var(--safe-left)) 80px;
  }
}
```

The ring stays bottom-right (the thumb zone). No other change.

## 8. Gate

`node scripts/mobile-capture.mjs --routes /,/work/operations-agent --widths 320,390,430 --themes light,dark`.

- [ ] `sections` at 390: `experience` at most 1,080; `about` at most 800; `contact` at most 540.
- [ ] `.section__title` 34px at 390, 30px at 320; `.contact__title` 40 / 34.
- [ ] `.timeline__project` width equals its card's inner width; the mark 44x44.
- [ ] `.copy` 44x44 beside the email on `/` and on `/work/operations-agent`; with `context.grantPermissions(["clipboard-read", "clipboard-write"])`, clicking it puts the address on the clipboard and `data-done` appears then clears within 2s.
- [ ] `(hover: none)`: the three Contact links are 44px pills on one row at 390 (they may wrap to two rows at 320).
- [ ] Footer pill and scroll ring rects do not intersect at 320, 390 or 430 with the page scrolled to the bottom.
- [ ] Desktop 1440: the copy control appears beside the email (the only desktop change; say so in the PR body); everything else identical.
- [ ] Both themes: the check's `--signal-ink` reads on the raised glass in dark.

Commit titles: `Experience, About, Contact and the footer on phones: rhythm and reach`, then `Copy the address` for the control.
