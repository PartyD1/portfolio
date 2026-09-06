# PR 04: navigation on phones, the bottom sheet

Branch: `mobile/04-navigation`. Size: L. Motion skill: **yes** (the sheet's entrance and exit, the link stagger, the press states). `/polish`: yes. Real device: **yes** (body scroll lock, safe-area padding, close by overlay).

Depends on PR 01. Decisions: **D5** (bottom sheet), **D12** (the email is the first and loudest foot item; there is no floating email control).

Baseline to look at first: `home-390-light-menu.png`.

## 1. Why (measured, 390 x 844)

| | Today |
|---|---|
| The sheet | a left drawer 343px wide (88%), full height, `side="left"` |
| Closing it on a phone | tap the **47px** strip of overlay on the right, or pick a link. The PD mark, which opens it, is **under** the sheet. There is no close control and no Escape key on a phone. |
| Keycaps `1` to `4` | drawn beside every link; they mean nothing on touch |
| Link rows | 62px tall at 29px type: fine |
| Foot links | 15px, **21px tall**, four of them 8px apart; the address is the first of them but drawn like the other three |
| Reach | the trigger is top-left, the far corner from a right thumb |

## 2. What it becomes

On phones the same Sheet opens **from the bottom**: a glass panel with the 22px card radius on its top corners, a grabber line, a 44px close pill top-right, four link rows at 56px, and a foot where the email address is set in the display face with the coral underline (the Contact treatment) and GitHub, LinkedIn and Résumé are three 44px glass pills in a row. It rises on the drawer curve in 360ms and leaves in 240ms; the overlay is the whole page, so tapping anywhere outside closes it. Desktop keeps the left drawer exactly as it is, except the foot's order (email first) which is better there too.

## 3. Files

- `components/Shell.tsx`: grabber, close control, `onOpenAutoFocus`, foot markup.
- `components/Icon.tsx`: add `Cross` (two strokes, same 2.25 stroke and round caps as the arrows).
- `app/globals.css`: `.menu` phone block, `.menu__close`, `.menu__grab`, foot rules, overlay rule, keyframes.
- `components/ui/sheet.tsx`: unchanged (`showCloseButton={false}` is already passed).

## 4. Markup

```tsx
<SheetContent
  side="left"
  className="menu"
  showCloseButton={false}
  // The first link takes focus, not the close control: opening a menu to
  // read it is the common case.
  onOpenAutoFocus={(e) => {
    e.preventDefault();
    firstLink.current?.focus();
  }}
>
  <span className="menu__grab" aria-hidden="true" />
  <SheetHeader className="sr-only">
    <SheetTitle>Menu</SheetTitle>
    <SheetDescription>Jump to a section of the page.</SheetDescription>
  </SheetHeader>

  <nav className="menu__nav" aria-label="Sections">
    {items.map((item, i) => (
      <a
        key={item.id}
        ref={i === 0 ? firstLink : undefined}
        href={`/#${item.id}`}
        className="menu__link"
        style={{ ["--i" as string]: i }}
        onClick={() => setOpen(false)}
      >
        <span className="menu__label">{item.label}</span>
        <span className="menu__key" aria-hidden="true">{item.key}</span>
      </a>
    ))}
  </nav>

  <div className="menu__foot">
    {/* The address leads, in the same voice as Contact: display face, coral
        rule. On a phone this is the thumb-reachable way to email from
        anywhere on the site. */}
    <a className="menu__email" href={`mailto:${links.email}`}>{links.email}</a>
    <div className="menu__foot-row">
      <a href={links.github} target="_blank" rel="noreferrer">GitHub</a>
      <a href={links.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
      <ResumeLink className="menu__resume" />
    </div>
  </div>

  {/* After the nav in DOM order (so Tab reaches the links first) and drawn
      top-right by CSS. Phones only; the desktop drawer closes by Escape, the
      overlay and the mark. */}
  <SheetClose className="menu__close" aria-label="Close menu">
    <Cross />
  </SheetClose>
</SheetContent>
```

`firstLink` is a `useRef<HTMLAnchorElement>(null)`. `ResumeLink` renders an anchor with `className="menu__resume"` (or the pending span when `resume.ready` is false; that state must also fit a pill row, see 5.4).

`Cross` in `Icon.tsx`: `<path d="M5 5l10 10M15 5L5 15" />` in the same 20x20 box as the arrows.

## 5. CSS

### 5.1 The sheet on phones

```css
@media (max-width: 760px) {
  /* The same Radix sheet, turned into a bottom sheet by geometry alone: a
   * phone's thumb lives at the bottom of the screen, and a panel that rises
   * from under it is one motion away from where the hand already is. The
   * shadcn utilities (w-3/4, inset-y-0, the left slide) are in Tailwind's
   * utilities layer, so these unlayered rules beat them by order. */
  .menu[data-side="left"] {
    inset: auto 0 0 0;
    width: 100%;
    height: auto;
    max-height: min(88svh, 640px);
    border-right: 0;
    border-top: 1px solid var(--glass-edge);
    border-radius: var(--radius-card) var(--radius-card) 0 0;
    padding: 14px 20px max(24px, calc(var(--safe-bottom) + 16px));
    gap: 22px;
    justify-content: flex-start;
    overflow-y: auto;
    overscroll-behavior: contain;
  }
  /* The old 400px rule (88% wide, 40/24 padding) is superseded by this
   * block; delete it. */
}
```

### 5.2 Grabber and close

```css
.menu__grab {
  display: none;
}
.menu__close {
  display: none;
}
@media (max-width: 760px) {
  .menu__grab {
    display: block;
    width: 36px;
    height: 4px;
    margin: 0 auto 2px;
    border-radius: 999px;
    background: color-mix(in oklab, var(--ink) 22%, transparent);
  }
  .menu__close {
    position: absolute;
    top: 12px;
    right: max(12px, var(--safe-right));
    display: grid;
    place-items: center;
    width: 44px;
    height: 44px;
    padding: 0;
    border-radius: 999px;
    border: 1px solid var(--glass-edge);
    background: var(--glass-raised);
    color: var(--ink);
    cursor: pointer;
    transition: transform 160ms var(--ease-out);
  }
  .menu__close svg {
    width: 18px;
    height: 18px;
    fill: none;
    stroke: currentColor;
    stroke-width: 2.25;
    stroke-linecap: round;
  }
  .menu__close:active {
    transform: scale(0.97);
  }
}
```

The grabber is drawn, not functional, in this PR. Drag-to-dismiss is listed under PR 09's deferred items with the reasons; the close pill and the overlay are the two close paths and both are 44px or larger.

### 5.3 Links

```css
@media (max-width: 760px) {
  .menu__link {
    min-height: 56px;
    align-items: center;
    padding: 6px 0;
    font-size: clamp(26px, 8vw, 34px);
  }
}
/* A keycap on a touch screen is a promise the device cannot keep. */
@media (pointer: coarse) {
  .menu__key {
    display: none;
  }
}
```

The `1` to `4` listeners in `Shell.tsx` stay: they are live only while the sheet is open and harmless without a keyboard.

### 5.4 The foot

```css
.menu__foot {
  display: flex;
  flex-direction: column;
  gap: 10px;
  color: var(--ink-2);
}
.menu__email {
  width: fit-content;
  font-family: var(--font-display-stack);
  font-size: 1.125rem;
  font-weight: 600;
  letter-spacing: 0.005em;
  color: var(--ink);
  text-decoration: underline;
  text-decoration-thickness: 3px;
  text-decoration-color: var(--signal);
  text-underline-offset: 8px;
  word-break: break-all;
}
.menu__foot-row {
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-size: 0.9375rem;
}
.menu__foot-row a {
  width: fit-content;
  text-decoration: none;
}

@media (max-width: 760px) {
  .menu__email {
    min-height: 48px;
    display: inline-flex;
    align-items: center;
    font-size: clamp(18px, 5.1vw, 22px);
  }
  /* Three pills in a row, 44px tall, glass-raised on the sheet's own glass:
   * no backdrop-filter of their own (glass on glass is a wasted blur). */
  .menu__foot-row {
    flex-direction: row;
    gap: 8px;
  }
  .menu__foot-row a,
  .menu__foot-row .is-pending {
    flex: 1 1 0;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    min-height: 44px;
    padding: 0 12px;
    border-radius: 999px;
    border: 1px solid var(--glass-edge);
    background: var(--glass-raised);
    font-size: 0.9375rem;
    font-weight: 600;
    color: var(--ink);
    text-decoration: none;
  }
  .menu__foot-row .link-arrow::after {
    content: none;
  }
}
```

The email in the menu is the same element the Contact section and the case foot already set in the display face with the coral rule: a third appearance of one element, not a new accent kind. Note it in the PR body for the accent census.

### 5.5 The overlay

```css
[data-slot="sheet-overlay"] {
  /* Tinted with the ground, not black, so the page behind reads as the same
   * world dimmed rather than a photo under a grey sheet. */
  background: color-mix(in oklab, var(--ground) 45%, transparent);
}
```

Both themes: `--ground` is themed, so one rule.

## 6. Motion (emil-design-eng)

Frequency: a few times per visit. Purpose: spatial consistency (the panel comes from where the thumb is and returns there) and preventing a jarring appearance.

| | Value | Why |
|---|---|---|
| Enter | `translateY(100%)` to `0`, **360ms**, `--ease-drawer` | a drawer curve for a drawer; under the 500ms ceiling for a modal |
| Exit | `0` to `translateY(100%)`, **240ms**, `--ease-out` | exits faster than entrances |
| Overlay | opacity 0 to 1, 200ms in / 140ms out | the existing tw-animate fade, timing overridden |
| Links | `rise` 300ms, 12px, stagger `calc(var(--i) * 30ms + 60ms)` | phones: shorter travel, tighter stagger than the desktop's 420/40 |
| Close pill, links | `:active` scale 0.97 / 0.98 | press feedback, 160ms |
| Reduced motion | the sheet fades 200ms in / 140ms out (the existing `.menu[data-state]` rule) | fewer and gentler |

```css
@media (max-width: 760px) and (prefers-reduced-motion: no-preference) {
  .menu[data-state="open"] {
    animation: sheet-up 360ms var(--ease-drawer) both;
  }
  .menu[data-state="closed"] {
    animation: sheet-down 240ms var(--ease-out) both;
  }
  [data-state="open"] .menu__link {
    animation: rise-sm 300ms var(--ease-out) both;
    animation-delay: calc(var(--i) * 30ms + 60ms);
  }
}
@keyframes sheet-up {
  from {
    transform: translateY(100%);
  }
}
@keyframes sheet-down {
  to {
    transform: translateY(100%);
  }
}
@keyframes rise-sm {
  from {
    opacity: 0;
    transform: translateY(12px);
  }
}
```

Keyframes rather than transitions here because Radix mounts and unmounts the content: there is no persistent element to transition. The animation shorthand replaces tw-animate's `enter`/`exit` wholesale under 760px, so the left slide never runs on a phone.

## 7. Accessibility

- Role and name: Radix gives the panel `role="dialog"` with the sr-only title; the close control is a real button with `aria-label="Close menu"`.
- Focus: opens on the first link; Tab order is links, email, three pills, close; Escape closes on a keyboard; the overlay click closes; on close, focus returns to the mark (Radix).
- Body scroll: Radix locks it (react-remove-scroll); `overscroll-behavior: contain` on the panel stops a scroll inside the sheet from chaining to the page on iOS.
- The grabber and keycaps are `aria-hidden`.
- Target sizes: close 44, links 56, email 48, pills 44.

## 8. Gate

`node scripts/mobile-capture.mjs --routes / --widths 320,390,430 --themes light,dark --menu`, plus one desktop context (`isMobile: false`, 1440) opening the menu.

- [ ] `menu` at 390: `390x<=640` anchored to the bottom (`top = 844 - height`); the overlay covers the rest.
- [ ] `close` 44x44; `keycapsVisible` false; every link at least 56 tall; the email at least 48; the three pills at least 44 and one row at 390 and 320.
- [ ] Focus on open lands on the Work link (assert `document.activeElement.textContent`).
- [ ] Animations during open at 390 (motion on): `sheet-up` on the panel and `rise-sm` on links; none of tw-animate's `enter`; at rest after 500ms, only `blink` (the page's caret) is running.
- [ ] Reduced motion: `menu-fade` only.
- [ ] Desktop 1440: the left drawer, 384px, keycaps visible, no grabber, no close pill; identical to baseline except the foot order.
- [ ] Both themes: the sheet's ground tint and the overlay tint hold in dark (screenshot).
- [ ] Real device: open, scroll inside the sheet (page does not move), close by overlay, close by pill, rotate to landscape (the pill clears the notch).

Commit title: `The menu is a bottom sheet on phones, with a way to close it`.
