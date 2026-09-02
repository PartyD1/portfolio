# Cinematic Scroll Motion System — Final Design

**Dimension owner:** scroll motion only. Every requirement this document places on another workstream (hero layout, cards, case-study route, Experience) is called out explicitly under **Cross-workstream contracts** and is written as a contract, not an assumption.

**Binding constraint restated:** CSS + WAAPI only, no motion library, no polyfill, off the main thread where the property allows it, and the recruiter's path from hero to email never gets longer.

---

## 0. The shape of the answer

Cinematic here means **four authored moments, one of which costs scroll distance.**

| # | Moment | Mechanism | Scroll cost | Ships if… |
|---|---|---|---|---|
| 1 | **Frame reveal** — the media slot's content wipes in from its left edge inside a frame that was already there | IntersectionObserver → `clip-path` transition | 0 | always (universal support, placeholder-safe, content-independent) |
| 2 | **Hero handoff** — the headline fades and rises out over the hero's own height as the Work grid takes the screen | `view-timeline` on `.hero`, scrubbed `linear` | 0 | `animation-timeline` supported, ≥721px, no-preference |
| 3 | **Card → case-study morph** — the frame the recruiter clicked becomes the frame they land on | native View Transitions, `view-transition-name` | 0 | `experimental.viewTransition` stable in Next 15.3 |
| 4 | **The architecture pin** — a three-layer diagram draws itself while three beats of engineering narrative cross-fade beside it, on Operations Agent's *Hardest technical challenge* only | `position: sticky` + `view-timeline` + `stroke-dashoffset` | ≤135svh, one route | three real beats + a non-confidential diagram + route ≥480vh |

**Homepage scroll length after this work: +0%.** No pin on the homepage, on any route but one.

The governing structural rule, which decides every ambiguity below: **the stacked, finished, un-pinned layout is the default state; pinning and scrubbing are the enhancement.** Delete the gate and you get the fallback. Three separate fallback paths — no `animation-timeline` support, `prefers-reduced-motion: reduce`, and viewports under 1024×720 — all resolve to byte-identical CSS.

Moment 1 is built **first**, before anything else in this dimension, because it is the only one with zero external conditions. If moments 2–4 all fail their conditions, the site still has an authored scroll moment on every case study.

---

## 1. Decisions

### D1 — Zero pinned sequences on the homepage. Homepage scroll length grows by 0%.

Every homepage pin candidate fails Rule 1.1 ("what does the reader learn while this runs?"). The Stack orbit is banned from rotating and 29 labels in motion is unreadable. An Experience timeline pin is the cheapest cliché on the web. Pinning the Work grid while cards traverse is a slideshow sitting directly on the hero → cards → email conversion path. None of the homepage sections carry ordered content, so any homepage pin is an empty pin dressed as ambition.

**Tradeoff, accepted:** the page a recruiter is most likely to see — possibly the only one — carries the least *durational* cinema. Its cinema is compositional: the diagonal card cadence, the hero handoff, and the morph on click. A homepage traversable in ten seconds of held scroll converts better than one that performs.

### D2 — Exactly one pinned sequence exists site-wide.

Operations Agent, `Hardest technical challenge`, three beats, `E/3` vh each where `E` is the measured extra-scroll allowance (D7). Every other case study, and the homepage, get zero.

Three arguments converge on this location. It is the section a hiring manager reads second and builds the phone screen from — the highest-intent content on the site, so it earns the site's one expensive mechanism. Operations Agent has no public repo and no screenshot that can legally exist; a scrubbed architecture diagram is a *better* proof artifact here than a UI screenshot and sidesteps confidentiality entirely. And it is placeholder-safe: the diagram is authored SVG geometry in `currentColor`, which is what `Artifact.tsx` already does — it does not wait on tomorrow's screenshots.

The beats are ordered content — **the constraint → the decision and its rejected alternative → how correctness was judged** — so each beat delivers a new fact. Giving the flagship a mechanism no other page has is also the structural answer to "a portfolio is judged on its median": the pin is a weighting device.

### D3 — The pin's *scaffolding* lives inside the `@supports` gate, not just its movement.

`height`, `position: sticky` and `view-timeline` are all inside `@supports (animation-timeline: view())`. This deliberately overrides survey:motion Rule 6.2, which would keep the pin and show scrubbed content at its finished state. That produces exactly the Trap #1 failure the whole ruleset exists to prevent: 135vh of scroll during which nothing changes, in Safari 18 and Firefox 143 — browsers a recruiter uses today. `position: sticky` is universally supported, which is precisely why it must be *withheld*: support for the pin is not support for the scrub, and a pin without a scrub is dead scroll.

Those users get the complete diagram and all three captions stacked in reading order, in *less* scroll than the enhanced path. That is a better experience than a degraded pin, and it is not to be patched with JS or a polyfill.

### D4 — One gate, four fallbacks, one stacked layout.

```
@supports (animation-timeline: view()) {
  @media (prefers-reduced-motion: no-preference)
     and (min-width: 1024px)
     and (min-height: 720px) { … }
}
```

No support, reduced motion, narrow viewport, and short/landscape viewport all land on the same stacked section. This is one implementation of four separate requirements (Rules 6.1, 7.2, 8.6, and the reviewer's viewport-height finding), which is why they get one gate.

**Practical consequence for the implementer: build and read the stacked version first.** If the stacked version is not a good section on its own, the sequence had no content and Rule 1.1 already rejected it.

**`min-width: 1024px`, not 761px.** The stage is a two-column grid: a ≤640px figure beside a 22rem beat column with a 40px gap. At 761px the figure column resolves to 249px — the diagram would be unreadable and the stage would overflow. 1024px is also the `.case__mark` rail breakpoint, so the case-study route has one desktop threshold, not two.

**`min-height: 720px`.** At 720px the stage's content box is `720 − 104 − 32 = 584px`, the figure caps at 56svh = 403px, and the tallest beat runs ~180px in the adjacent column. It fits. Below 720px — a 1280×720 laptop with browser chrome, a landscape tablet, a restored 1000×640 window — it does not, and the stage would overflow with no scroll escape because the page scroll is being consumed by the scrub. Those viewports get the stacked section, which is free: it is the same collapse.

### D5 — The pinned sequence ships zero JavaScript.

`components/Pin.tsx` is a React Server Component. There are no inline custom properties, no `calc()` in an `animation-range`, and no client boundary. Everything is expressible in `position: sticky`, `view-timeline`, `animation-timeline`, `animation-range` and three keyframe sets. Adding a client component here would put hydration cost on the heaviest route for no capability.

### D6 — All three beats share one `animation-range`; their schedule lives entirely in keyframe offsets.

This is the fix for the cross-fade dead zone the reviewer found, and it is a better mechanism than patching per-beat ranges. Per-beat ranges plus per-beat ramps means the ramps must be reconciled against the range boundaries by hand, and the arithmetic silently breaks whenever either changes. With one shared `contain 0% contain 100%` range and three distinct keyframe sets, every hand-off is a single number in a single file and the overlap is inspectable by reading the offsets:

- beat 1 holds `opacity: 1` from `0%` and fades out `28% → 36%`
- beat 2 fades in `28% → 36%` and out `62% → 70%`
- beat 3 fades in `62% → 70%` and holds to `100%`

The out-ramp and the in-ramp occupy the *same* scroll interval, so ink is present at every scroll position. Cross-fade window = 8% of E ≈ 11vh. Verified by scrubbing to 32% and 66% and confirming both beats are partially visible.

**Consequence:** the beat count is fixed at exactly three, enforced by the type being a 3-tuple. Four beats at E=135 would be 33.75vh each, under the 40vh floor the ruleset itself sets — the component must not silently permit a configuration its own rules reject. Four beats is now a compile error.

### D7 — The pin's extra scroll is measured, not assumed.

survey:motion Rule 4.3 caps route scroll-length growth at +25%, and the first proposal never applied it to the one route that grows. It is applied here as a build step:

1. Build the Operations Agent route **with `<StackedFigure>` in place of `<Pin>`**.
2. Measure `L = document.documentElement.scrollHeight / window.innerHeight` at 1440×900 with `next start`.
3. `E = min(135, floor(0.25 × L))`, in vh.
4. **If `E < 120`, the pin does not ship.** Three beats at the 40vh floor is 120vh; below that, `StackedFigure` is the shipped section and this is not a failure state — see D14.
5. Set `--pin-extra: <E>svh` in the gated block. Container height is `calc(100svh + var(--pin-extra))`.

So a 540vh route gets the full 135svh (+25%). A 480vh route gets 120svh (+25%). A 400vh route gets nothing, because a 400vh case study is a route that needs more prose, not more choreography.

This is a real gate, not a formality: the flagship case study is meant to be the densest page on the site, text carrying what media legally cannot. `E ≥ 120` is the numeric statement of that intent.

### D8 — The sticky stage stays `top: 0; height: 100svh`; the fixed shell is cleared with padding, not with `top`.

The reviewer is right that the fixed shell is a blocking omission and wrong about the fix. `.shell` is `position: fixed; padding: 22px 28px` around a 44px mark — an 88px band that, for a pinned stage, is a **static** overlap for the whole sequence. That must be cleared.

But setting `top: 88px; height: calc(100svh - 88px)` desynchronises the sticky span from the `contain` phase. `contain 0%` is when the container's top edge reaches the *scrollport* top; sticky with `top: 88px` engages 88px earlier in the scroll. The result is 88px of stuck-but-not-scrubbing stage at the start — a small empty pin, the exact defect being fixed. Recovering the alignment requires a mixed-phase range like `entry calc(100% - 88px) → contain 100%`, which is clever, fragile, and depends on the band value in two places.

**Instead:** the stage stays `top: 0; height: 100svh; box-sizing: border-box` with `padding-top: calc(var(--shell-band) + 16px)` and `padding-bottom: 32px`, and `align-content: center` centres within the padding box. `contain 0% → 100%` then maps to the sticky span exactly, with no arithmetic to keep in sync, and nothing is ever drawn under the shell.

**The band becomes a token,** because `scroll-margin-top: 84px` and the real 88px band currently disagree and every anchor jump on the site lands its section title 4px under the shell mark:

```css
:root { --shell-band: 88px; }               /* 22px pad + 44px mark + 22px pad */
@media (max-width: 640px) { :root { --shell-band: 76px; } }  /* 16 + 44 + 16 */
.section { scroll-margin-top: calc(var(--shell-band) + 12px); }  /* 100px / 88px */
```

### D9 — The hero handoff is driven by `.hero`, not by `.hero__title`.

The reviewer is correct that `animation-timeline: view(block)` on `.hero__title` with `exit 0% exit 100%` spans only the title's own ~150px height, entirely while the title is already sliding off under `overflow: clip`. It is an invisible blip, not a handoff.

The corrected form declares the timeline on `.hero` and drives the title from it:

```css
.hero { view-timeline-name: --hero; view-timeline-axis: block; }
.hero__title { animation-timeline: --hero; animation-range: exit 0% exit 100%; }
```

For a subject that begins at document top, `exit 0%` is scrollY 0 (hero top at scrollport top) and `exit 100%` is scrollY = hero height (hero bottom at scrollport top). The scrub therefore spans the hero's full `min(100svh, 720px)` and runs while the headline is on screen — which is what the effect claimed to do.

This is not a coordination cost. `view-timeline-name` has zero layout effect and is declared **inside this dimension's own gated block**, not inside the hero's rule, so the hero-layout workstream edits nothing. Its only contract is C1 below.

The reviewer also notes the 0.30 opacity floor's rationale is wrong at `exit 100%`. Correct — at the end of the range the title is off-screen and the pointer-target argument is vacuous. The floor is kept at **0.25** for the mid-range, where the roll slot is still hoverable and clickable, and the opacity is held flat at 1 for the first 40% of the range so the headline is fully readable through the first ~290px of scroll.

### D10 — `ScrollRing.tsx` is not touched. The site keeps exactly one scroll listener; this dimension adds zero.

This reverses the first proposal's decision 11, and the reviewer's finding is the reason. That rewrite would have animated a registered `@property` feeding `stroke-dashoffset` — paint-tier by its own admission — on **every route, on every viewport, ungated by reduced motion**, inside an element carrying `backdrop-filter: blur(12px)`. It was the one scroll-driven paint animation that would run on phones, in the one blurred element on screen at all times, upgraded from survey:motion §5.4's explicit "optional, only if the existing rAF read is measured as a problem" to required with no measurement. And it would have contradicted D11's own single-metered-region rule on the same page it was written.

The existing implementation is a passive, single-rAF-coalesced listener reading `scrollHeight` once per frame to drive a 44px element. That is not a measured problem. It stays. Two side benefits: Safari <26 and Firefox <144 keep the progress arc rather than losing it, and the honest claim becomes "this dimension adds zero scroll listeners and zero layout reads," which is enforceable.

Delete nothing from it, including `transition: stroke-dashoffset 120ms linear` — no timeline competes with it now.

### D11 — One metered-paint region on the whole site, and it is desktop-only by construction.

The pin's diagram — two `<g>` layers animating `stroke-dashoffset`, inside a ≤640×400 CSS-px SVG — is the entire paint-tier budget. Nothing else on any route may animate a paint-tier property on scroll. Because the pin only runs at ≥1024×720 with `no-preference`, this paint never reaches a phone and never needs the mid-tier-device measurement the tier normally demands.

`pathLength="100"` + `stroke-dasharray: 100` means the un-animated default is *fully drawn* (offset 0, the whole path sits inside the first dash), so the fallback needs no separate rule. Drawing linework is also the one form of scroll motion that is unambiguously geometry rather than illustration, satisfying craft-floor L46 and the Drawn-Not-Set Rule without an amendment.

**`stroke-dasharray: 100` is declared, not implied** — in the ungated block, next to the default offset. Without the declaration the animation is inert.

**Layers 2 and 3 contain geometry only. Every `<text>` label lives in layer 1, which never animates.** This makes all diagram labels permanently visible and Cmd+F-findable, and it means the only animated property is `stroke-dashoffset`.

### D12 — The wash and the grain get zero scroll-driven motion. Hard no, not a deferral.

A scroll-reactive ground is the most obviously cinematic thing available, costs zero scroll distance, and the `transform`/`translate` split would let it coexist with the existing `drift-*` keyframes. It is cut for one mechanical reason: `.card` carries `backdrop-filter: blur(22px) saturate(1.35)`, and six to eight glass cards sit over the wash on the Work grid. Moving the backdrop means every one of them re-samples and re-blurs its own rect every frame, over four 42vmax SVGs with three-stop gradients and a clipped radial gloss, with the grain's `mix-blend-mode` composited into the same stack — paid on the exact section the recruiter is reading.

Checked and clear on the adjacent hazard: `.wash` is `position: fixed; z-index: -1` and `.grain` is inside it, so the blend affects the blobs only and never disqualifies content above it from compositor fast paths.

The ground's job is to be the calm centre that type sits on. Making it react would fight The Calm Centre Rule as well as the compositor.

### D13 — Project cards keep `Reveal`. They are not rebuilt on `view()`.

A `view()`-driven card entry is reversible by definition: the recruiter scrolls back up to compare two projects and the cards fade out again. Scroll timelines cannot express "once." `Reveal.tsx` already has the correct discipline — server-rendered visible, above-fold never hidden, reduced motion bails before any state is set — and adding a second reveal vocabulary is exactly what craft-floor L13 refuses.

What changes is one line: the delay function becomes column-aware so the eye is led left → right → down instead of the grid landing flat.

**Honest accounting of craft-floor L13, correcting the first proposal's overclaim:** the seven-card reveal *is* this site's one repeated entrance. The diagonal differentiates its **timing**, not its vocabulary. That is a real but modest improvement, and the claim that excluding headings "structurally kills" L13 is withdrawn.

### D14 — `StackedFigure` is a designed section, not a degraded one.

On current odds — the pin needs three beats of real narrative, diagram permission Parth has not yet given, and a ≥480vh route — `StackedFigure` is at least as likely to ship as `Pin`. It is therefore specified at the same level of detail as `Pin` and built first, and `Pin` is specified as a wrapper that renders `StackedFigure`'s content in a sticky stage. There is no "fallback" code path that nobody designed.

### D15 — Interaction owns `transform`. Scroll owns `translate` / `scale` / `rotate`. Enforced by grep.

`.card:hover` sets `transform: translateY(-3px)` and `.card:hover .card__art` sets `transform: translate(-3px,-3px)`. An animation on `transform` on the same element wins over the transition in the cascade and the hover lift dies silently — it looks fine on the author's machine because they were testing scroll, not hover. The individual properties compose instead of stomping, and they are supported everywhere `animation-timeline` is.

One existing near-collision to watch: `[data-reveal="pending"]` uses `transform: translateY(24px)`, but on the `Reveal` wrapper `<div>`, not on `.card`. It becomes a collision the moment anyone moves the reveal onto the card itself.

The one sanctioned `transform` in this dimension is `.contact__email::after`'s `scaleX` (D16) — a pseudo-element with no hover transform of its own and no scroll timeline.

### D16 — The email underline ships **visible by default** and is drawn only when JS confirms it starts below the fold.

The reviewer's blocking finding is correct on every count and the effect is rebuilt from scratch.

The coral underline is not an element — it is `text-decoration` on `.contact__email` (globals.css:1499-1513). `clip-path` on that element clips the *text*. The first proposal also made the invisible state the default, JS-gating the one coral signal pointing at the site's only primary CTA.

The corrected build:

- The underline becomes a real `::after` rule on `.contact__email`, which is `display: inline-block` and therefore, with `position: relative`, a valid containing block for it. (The reviewer's claim that a pseudo-element cannot work is wrong for this specific reason.)
- The offset stops depending on font metrics: `padding-bottom: 0.34em` on the anchor, rule at `bottom: 0`. At the 1.75rem cap that is 9.5px, matching the current `text-underline-offset: 10px`. `.contact__links` drops from `margin-top: 36px` to `26px` to absorb the growth.
- `word-break: break-all` is replaced by `white-space: nowrap`. Measured: the email is 16 characters; at the clamp floor (16px, viewports ≤615px) it renders ~159px in a ≥280px column, and at the 28px cap (viewports ≥1077px) ~278px in a ≥1029px column. It cannot wrap at any viewport, so the single-rule-vs-multi-line-underline problem is eliminated by construction rather than by hope.
- **Default is `transform: scaleX(1)` — drawn.** A client component sets `data-drawn="false"` at mount *only if* the element's `getBoundingClientRect().top >= window.innerHeight`, then an IntersectionObserver sets `data-drawn="true"`. Identical discipline to `Reveal.tsx`. JS off, hydration error, IO failure, reduced motion → the underline is simply there.
- `scaleX` with `transform-origin: left center` replaces `clip-path`: composited, and it frees the one clip-path idiom for the frame reveal (D17).
- Hover is ported: `.contact__email:hover::after { background: var(--ink) }`, `transition: background-color 200ms var(--ease-out)`, inside the existing `@media (hover: hover) and (pointer: fine)` guard.

### D17 — Exactly one `clip-path` idiom on the site: the media frame reveal. It is the guaranteed authored moment.

This is the answer to the reviewer's "every condition is outside this workstream's control." It has no conditions: IntersectionObserver, `clip-path` and CSS transitions are universal; it is placeholder-safe because the **frame** is the subject and the wipe is driven by the frame's aspect ratio, not by the pixels inside it; and it is identical the day a real GIF replaces the placeholder.

The meaning is exact: the frame is always present (it is an honest slot, with a designed empty state), and its *contents* wipe in from the left edge. Architecture first, content arriving. 620ms `--ease-out`, 60ms stagger between frames in the same section, case-study routes only — never on the homepage, so the homepage's one entrance vocabulary stays `Reveal`.

620ms is longer than `Reveal`'s 450ms; that is deliberate and is what makes it read as authored rather than as a list entrance.

### D18 — The case-study project mark is `position: sticky` with no animation whatsoever.

`.case__mark { position: sticky; top: 42svh }` at ≥1024px. An element that holds the viewport while the document travels past it — the felt quality the cinematic brief asks for — from one line of layout CSS, zero animation, zero scroll cost, zero compositor risk. Named in DESIGN.md as "the cinema you get for free."

A `scroll()`-driven ±5deg rotation on it was designed and cut: the only thing rotation communicated was reading progress, which the scroll ring already communicates, and two progress indicators is one too many.

### D19 — The card → case-study morph uses native View Transitions via Next's flag, with a guaranteed non-VT floor. No `CaseLink` component.

The first proposal's hand-rolled client wrapper is deleted. With `experimental: { viewTransition: true }` in `next.config.ts`, Next wraps the router navigation itself and the entire effect is CSS plus one inline `view-transition-name` per media frame. Hand-rolling `startViewTransition` around `router.push` with a cross-boundary promise breaks intermittently, and intermittent is worse than absent.

`view-transition-name` goes on `.card__media` and on the case-study header frame — **never on `.card`**, which carries `backdrop-filter` and `overflow: hidden`, both of which snapshot badly. Per the reviewer's correct finding, a descendant's snapshot is taken **without the ancestor's clip applied**, so `.card__media` must carry its own `overflow: hidden` and `border-radius` (C3) or it will pop to unclipped geometry the instant the transition starts.

Names are per-slug and unique per document (`media-operations-agent`); the two elements never coexist. Duration is overridden to 320ms `--ease-out`, because VT's 250ms default `ease` is too weak for a morph this large.

**If the flag proves unstable in the pinned Next 15.3, ship the floor and drop the morph — nothing else depends on it.** The floor is `@starting-style { opacity: 0; scale: .98 }` → 320ms on the case-study header frame at mount: no JS, no config, universal.

### D20 — Headings never animate. Stated as a preserved invariant, not a change.

The reviewer is right that `.section__head` is not inside a `Reveal` anywhere today — `Work.tsx` wraps only the cards, `Stack.tsx` only the orbit. So this costs nothing and changes nothing. It is written down anyway, because the Experience section lands tomorrow and this is the rule that keeps every anchor target, every `1/2/3/4/5` shortcut and every menu jump readable at the instant of arrival, with no transition delay between landing and knowing where you are.

### D21 — Explicitly NOT doing

Each with its reason, because an unreasoned refusal comes back next sprint.

| Not doing | Why |
|---|---|
| Any motion library — GSAP/ScrollTrigger, Framer Motion, Lenis, ScrollSmoother | Contradicts CLAUDE.md §Animation and needs owner sign-off that does not exist. Everything specified here is native. |
| Any scroll-timeline polyfill | It runs the whole thing on the main thread via rAF, reproducing exactly the jank this system exists to prevent. Unsupported engines get the finished state (D3). |
| rAF smoothing, lerp, damping of scroll position | Puts the sequence on the main thread, decouples content from the finger, and **keeps moving after the finger lifts** — which makes it a third ambient motion and breaks the "at rest, exactly two things move" invariant. |
| Parallax, anywhere, on any layer, at any viewport | On the reading column it is the cheap-site tell and collides at unpredictable viewport heights. Over the wash it forces the glass cards to blur a moving backdrop. Inside a media frame it is banned by the same rule; there is no third place to put it. |
| Count-up numbers, odometers, progress bars, fluency meters, filling rings | **Motion that implies a quantity is a fabrication mechanism.** PRODUCT.md has no metrics, no adoption numbers and no fluency ordering, so a filling bar invents data in the motion layer — a defect under both PRODUCT.md and craft-floor L48. This is the single most likely thing to be added to an "Outcome & impact" section by reflex. |
| Per-character or per-word text assembly on scroll | Fights `text-wrap: balance` and Cmd+F. |
| Scroll-jacking, `preventDefault` on wheel, `scroll-snap-type` on any route containing a pin | Scroll-affordance reinvention (operate L50); snap fights a scrub. |
| Rotating the Stack orbit | Already banned in DESIGN.md; 29 labels in motion is unreadable. |
| A Simple-Icons rail traversal | Designed and cut: a drifting logo row matches none of the four valid purposes. It is decoration, and the gate has to be real or it is not a gate. |
| Scroll motion on any `backdrop-filter` element | Re-samples and re-blurs the backdrop every frame. |
| `content-visibility: auto` on a pin container | Skipped subtrees don't run animations or fire reliable IO callbacks until rendered. |
| A scroll-reactive wash | D12. |
| A lightbox/modal for media | craft-floor L29; and `.card`'s `overflow: hidden` clips any in-card overlay. Media links out or expands in place on the case-study route. |
| Elements literally traversing the viewport on scroll | Every candidate failed "what does the reader learn while this runs?" The one genuine traversal on the site is the **morph** (D19), where an element travels from card position to header position across a route boundary and the travel *is* the explanation of where the reader went. |

---

## 2. Implementation

### 2.1 `/Users/ParthDoshi/csProjects/portfolio/app/globals.css`

Three edits to existing rules, then one new block.

**Edit 1 — publish the shell band as a token** (in `:root`, beside `--radius-card`):

```css
  /* The fixed shell's occupied band: 22px pad + 44px mark + 22px pad.
   * Anchors and the pinned stage both clear it from this one value. */
  --shell-band: 88px;
```

and, inside the existing `@media (max-width: 640px)` block that already reduces `.shell` padding to `16px 18px`:

```css
  :root { --shell-band: 76px; }
```

**Edit 2 — line 1006**, `.section`:

```css
  scroll-margin-top: calc(var(--shell-band) + 12px);   /* was: 84px */
```

100px desktop / 88px mobile. The old 84px was 4px short of the real band and landed every section title under the shell mark.

**Edit 3 — lines 1499-1526**, the contact email, replacing the `text-decoration` underline with a real rule:

```css
.contact__email {
  position: relative;
  display: inline-block;
  margin-top: 26px;
  padding-bottom: 0.34em;          /* the rule's offset, font-metric independent */
  font-family: var(--font-display-stack);
  font-size: clamp(1rem, 2.6vw, 1.75rem);
  font-weight: 600;
  letter-spacing: 0.005em;
  color: var(--ink);
  text-decoration: none;
  white-space: nowrap;             /* measured: never wraps at any viewport */
}

.contact__email::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 3px;
  border-radius: 999px;
  background: var(--signal);
  transform: scaleX(1);            /* DRAWN IS THE DEFAULT */
  transform-origin: left center;
  transition: background-color 200ms var(--ease-out);
}

.contact__email[data-drawn="false"]::after { transform: scaleX(0); }

.contact__email[data-drawn="true"]::after {
  transform: scaleX(1);
  transition:
    transform 520ms var(--ease-out),
    background-color 200ms var(--ease-out);
}

@media (hover: hover) and (pointer: fine) {
  .contact__email:hover::after { background: var(--ink); }
}

.contact__links { margin-top: 26px; }   /* was 36px; absorbs the rule's padding */
```

`data-drawn` is never `"false"` unless JS ran, confirmed reduced motion is off, and the element was below the fold at mount.

**New block**, appended after the existing `Reveal` rules (~line 1556):

```css
/* ==========================================================================
   Scroll-driven motion
   --------------------------------------------------------------------------
   CONTRACT. The stacked, finished, un-pinned layout is the DEFAULT. Pinning
   and scrubbing are the enhancement. Delete the gated blocks below and every
   route is still complete and readable — that is the fallback, and it is the
   same layout that reduced-motion, sub-1024px and short viewports get.

   PROPERTY SPLIT (load-bearing). Interaction owns `transform`; scroll owns
   `translate` / `scale` / `rotate`. `.card:hover` sets transform:translateY(-3px);
   an animation on `transform` on the same element wins over the transition in
   the cascade and the hover lift dies with no visible symptom. Never scroll-
   animate `transform`.

   NEVER scroll-animate a backdrop-filter element (.card, .menu, .scroll-ring),
   and never touch .wash / .wash__blob / .grain.
   ========================================================================== */

/* --- Pin: default (stacked) state -------------------------------------- */
.pin {
  position: relative;
  scroll-margin-top: calc(var(--shell-band) + 12px);
}
.pin__stage {
  display: grid;
  gap: 40px;
}
.pin__beat + .pin__beat { margin-top: 8px; }
.pin__figure { width: 100%; }
.pin__figure svg { display: block; width: 100%; height: auto; max-width: 640px; }

/* pathLength="100" + dasharray 100 => the whole path sits in the first dash,
 * so offset 0 is FULLY DRAWN. This is the fallback state; do not remove. */
.pin__layer {
  stroke-dasharray: 100;
  stroke-dashoffset: 0;
}

/* --- Pin: enhanced (sticky + scrubbed) state ---------------------------- */
@supports (animation-timeline: view()) {
  @media (prefers-reduced-motion: no-preference)
     and (min-width: 1024px)
     and (min-height: 720px) {

    .pin {
      /* --pin-extra is set per-route from the D7 measurement. */
      height: calc(100svh + var(--pin-extra, 135svh));
      view-timeline-name: --pin;
      view-timeline-axis: block;
    }

    .pin__stage {
      position: sticky;
      top: 0;
      height: 100svh;
      box-sizing: border-box;
      /* Clears the fixed shell without desyncing sticky from `contain`. */
      padding-top: calc(var(--shell-band) + 16px);
      padding-bottom: 32px;
      grid-template-columns: minmax(0, 1fr) minmax(0, 22rem);
      grid-template-rows: minmax(0, 1fr);
      align-content: center;
      align-items: center;
      column-gap: 40px;
      gap: 0;
      overflow: clip;
    }

    .pin__figure { grid-area: 1 / 1; max-height: 56svh; }
    .pin__figure svg { max-height: 56svh; }

    /* All three beats share one cell and one range; their schedule is in the
     * keyframe offsets, so the cross-fades cannot develop a gap. */
    .pin__beat {
      grid-area: 1 / 2;
      margin-top: 0;
      animation: linear both;
      animation-timeline: --pin;
      animation-range: contain 0% contain 100%;
    }
    .pin__beat--1 { animation-name: pin-beat-1; }
    .pin__beat--2 { animation-name: pin-beat-2; }
    .pin__beat--3 { animation-name: pin-beat-3; }

    .pin__layer--2,
    .pin__layer--3 {
      animation: linear both;
      animation-timeline: --pin;
      animation-range: contain 0% contain 100%;
    }
    .pin__layer--2 { animation-name: pin-layer-2; }
    .pin__layer--3 { animation-name: pin-layer-3; }
  }
}

@keyframes pin-beat-1 {
  0%,  28% { opacity: 1; translate: 0 0; }
  36%, 100% { opacity: 0; translate: 0 -18px; }
}
@keyframes pin-beat-2 {
  0%,  28% { opacity: 0; translate: 0 18px; }
  36%, 62% { opacity: 1; translate: 0 0; }
  70%, 100% { opacity: 0; translate: 0 -18px; }
}
@keyframes pin-beat-3 {
  0%,  62% { opacity: 0; translate: 0 18px; }
  70%, 100% { opacity: 1; translate: 0 0; }
}
/* Layer 1 never animates: it is the substrate and carries every <text> label,
 * so all diagram text is permanently visible and Cmd+F-findable. */
@keyframes pin-layer-2 {
  0%,  26% { stroke-dashoffset: 100; }
  46%, 100% { stroke-dashoffset: 0; }
}
@keyframes pin-layer-3 {
  0%,  60% { stroke-dashoffset: 100; }
  80%, 100% { stroke-dashoffset: 0; }
}

/* --- Hero handoff ------------------------------------------------------- */
/* Declared here, not in the .hero rule, so the hero-layout workstream edits
 * nothing. view-timeline-name has no layout effect. Subject is .hero, whose
 * `exit` phase spans its own min(100svh, 720px) — the title is on screen for
 * most of it, which is the whole point of the effect. */
@supports (animation-timeline: view()) {
  @media (prefers-reduced-motion: no-preference) and (min-width: 721px) {
    .hero {
      view-timeline-name: --hero;
      view-timeline-axis: block;
    }
    .hero__title {
      animation: hero-exit linear both;
      animation-timeline: --hero;
      animation-range: exit 0% exit 100%;
    }
  }
}
@keyframes hero-exit {
  0%   { opacity: 1;   translate: 0 0; }
  40%  { opacity: 1;   translate: 0 -2%; }
  100% { opacity: .25; translate: 0 -16%; }
}

/* --- Media frame reveal (universal; no scroll timeline) ------------------ */
.frame {
  position: relative;
  aspect-ratio: var(--frame-ratio, 16 / 10);
  border: 1px solid var(--glass-edge);
  border-radius: var(--radius-card);
  background: var(--white);          /* opaque: media does not sit on glass */
  overflow: hidden;
}
.frame__clip {
  position: absolute;
  inset: 0;
  clip-path: inset(0 0 0 0);         /* FINISHED STATE IS THE DEFAULT */
}
.frame[data-frame="pending"] .frame__clip { clip-path: inset(0 100% 0 0); }
.frame[data-frame="in"] .frame__clip {
  clip-path: inset(0 0 0 0);
  transition: clip-path 620ms var(--ease-out);
}
@media (prefers-reduced-motion: reduce) {
  .frame__clip { clip-path: inset(0 0 0 0) !important; transition: none; }
}

/* --- Case-study mark: the cinema you get for free ------------------------ */
@media (min-width: 1024px) {
  .case__mark { position: sticky; top: 42svh; }
}

/* --- Anchors must not smooth-crawl through a pin ------------------------- */
/* A native <a href="#challenge"> cannot pass behavior:"auto"; it obeys
 * scroll-behavior on the scrolling element. Scope it off wherever a pin exists. */
@media (prefers-reduced-motion: no-preference) {
  html:has(.pin) { scroll-behavior: auto; }
}

/* --- View transitions (only with next.config experimental.viewTransition) - */
::view-transition-group(*) {
  animation-duration: 320ms;
  animation-timing-function: var(--ease-out);
}
@media (prefers-reduced-motion: reduce) {
  ::view-transition-old(*),
  ::view-transition-new(*) { animation-duration: 1ms; }
}
```

### 2.2 `/Users/ParthDoshi/csProjects/portfolio/components/StackedFigure.tsx` — NEW

React Server Component. **Build this first.** It is the section that ships whenever the pin's conditions fail, and it is the content `Pin` wraps.

```tsx
export type Beat = { title: string; body: string };
export type Beats = [Beat, Beat, Beat];

export default function StackedFigure({
  figure,
  beats,
}: {
  figure: React.ReactNode;
  beats: Beats;
}) {
  return (
    <>
      <div className="pin__figure">{figure}</div>
      {beats.map((b, i) => (
        <div key={b.title} className={`pin__beat pin__beat--${i + 1}`}>
          <h3 className="pin__beat-title">{b.title}</h3>
          <p className="pin__beat-body">{b.body}</p>
        </div>
      ))}
    </>
  );
}
```

`.pin__beat-title` uses the existing Title step (`clamp(1.25rem, 1.9vw, 1.625rem)`, Unbounded 700, uppercase); `.pin__beat-body` uses Body (1.0625rem/1.5, `--ink-2`, `max-width: 42ch`). No new type steps.

### 2.3 `/Users/ParthDoshi/csProjects/portfolio/components/Pin.tsx` — NEW

React Server Component. No `"use client"`, no imports beyond React and `StackedFigure`. Zero inline styles, zero JS in the bundle.

```tsx
import StackedFigure, { type Beats } from "@/components/StackedFigure";

export default function Pin({
  id,
  extra,
  figure,
  beats,
}: {
  id: string;
  /** Extra scroll in vh, from the D7 measurement. Must be >= 120. */
  extra: 120 | 125 | 130 | 135;
  figure: React.ReactNode;
  beats: Beats;
}) {
  return (
    <div
      className="pin"
      id={id}
      style={{ "--pin-extra": `${extra}svh` } as React.CSSProperties}
    >
      <div className="pin__stage">
        <StackedFigure figure={figure} beats={beats} />
      </div>
    </div>
  );
}
```

Three invariants, enforced structurally rather than by review:

1. **`beats` is a 3-tuple.** Four beats is a compile error, not a beat that twitches below the 40vh floor.
2. **`extra` is a union of four literals ≥ 120.** A sub-floor pin cannot be expressed.
3. **`Beat` is `{ title: string; body: string }`, not `ReactNode`.** No focusable element can exist inside `.pin__stage`, which kills the focus-fights-the-pin trap and the tab-into-invisible-content trap at the type level.

Header comment to write into the file:

> **Content rule.** Beats 2 and 3 sit at `opacity: 0` for most of the pin. Browser find will locate their text and scroll to it inside a sticky stage, where scrolling does nothing. Therefore: **every term a reader might Cmd+F for must appear in the diagram's own always-visible `<text>` labels (layer 1) or in prose outside the pin.** Beat bodies elaborate; they never introduce.
>
> **Figure rule.** The `figure` prop is one authored SVG at `viewBox="0 0 640 400"`, `stroke-width: 2.5`, round caps/joins, `fill: none`, `currentColor` — matching `Artifact.tsx`. Author at display size: the figure is capped at `max-width: 640px`, so 1 user unit = 1 CSS px and the stroke renders at exactly 2.5px, matching every other mark on the site. Do **not** use `vector-effect: non-scaling-stroke`; it interacts badly with the dash pattern. The SVG carries `role="img"` and a `<title>`. It contains exactly three `<g class="pin__layer pin__layer--N">` groups; every `<path>` inside carries `pathLength="100"`; **layers 2 and 3 contain no `<text>`.**

### 2.4 `/Users/ParthDoshi/csProjects/portfolio/components/MediaFrame.tsx` — NEW

`"use client"`. ~35 lines. The guaranteed authored moment (D17). Same discipline as `Reveal.tsx`.

```tsx
"use client";
import { useEffect, useRef, useState } from "react";

export default function MediaFrame({
  ratio = "16 / 10",
  delay = 0,
  name,
  children,
}: {
  ratio?: string;
  delay?: number;
  /** view-transition-name, e.g. "media-operations-agent". Omit off-route. */
  name?: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<"idle" | "pending" | "in">("idle");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight) return;
    setState("pending");
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setState("in"); io.disconnect(); } },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="frame"
      data-frame={state === "idle" ? undefined : state}
      style={{
        "--frame-ratio": ratio,
        ...(name ? { viewTransitionName: name } : {}),
        ...(delay ? { transitionDelay: `${delay}ms` } : {}),
      } as React.CSSProperties}
    >
      <div className="frame__clip">{children}</div>
    </div>
  );
}
```

`transitionDelay` on `.frame` does not reach `.frame__clip`; set the stagger on the clip instead by moving the delay into a second custom property — `--frame-delay` on `.frame`, consumed as `transition-delay: var(--frame-delay, 0ms)` in the `[data-frame="in"] .frame__clip` rule. Use 60ms increments; never exceed 180ms total.

### 2.5 `/Users/ParthDoshi/csProjects/portfolio/components/EmailLink.tsx` — NEW

`"use client"`. ~25 lines. Replaces the inline `<a className="contact__email">` in `Contact.tsx`.

Identical mount logic to `MediaFrame` — bail on reduced motion, bail if `getBoundingClientRect().top < window.innerHeight`, otherwise set `data-drawn="false"` and let a `threshold: 0.6` IntersectionObserver flip it to `"true"`. Renders:

```tsx
<a className="contact__email" data-drawn={state} href={`mailto:${links.email}`}>
  {links.email}
</a>
```

where `state` is `undefined` in the idle case, so the drawn default (D16) applies with no attribute at all.

`Contact.tsx` changes by exactly two lines: import `EmailLink`, swap the anchor.

### 2.6 `/Users/ParthDoshi/csProjects/portfolio/components/Work.tsx`

One change. Replace `delay={i * 50}`:

```tsx
const row = i === 0 ? 0 : Math.floor((i - 1) / 2);
const col = i === 0 ? 0 : (i - 1) % 2;
const delay = i === 0 ? 0 : row * 60 + col * 30 + 40;
```

Delays across seven projects: **0, 40, 70, 100, 130, 160, 190 — max 190ms** (the first proposal's 220ms figure was wrong; corrected). Per-sibling stagger is 30ms or 40ms, inside DESIGN.md's 30–80ms band. `Reveal`'s semantics are untouched.

Below 760px the grid is single-column and the sequence degrades to 0, 40, 70, 100, 130, 160, 190 — a monotonic uniform 30ms cascade with a 40ms head. That is not a regression from `i * 50` and needs no `matchMedia` gate; the diagonal simply has no spatial meaning in one column, and a uniform cascade is the correct thing there anyway. (Explicit disagreement with the reviewer, who called this "irregular": it is strictly monotonic.)

Also: `.section__head` stays outside every `Reveal` on this and every section — a preserved invariant to re-verify when Experience lands.

### 2.7 `/Users/ParthDoshi/csProjects/portfolio/next.config.ts`

```ts
const nextConfig: NextConfig = {
  reactStrictMode: true,
  outputFileTracingRoot: __dirname,
  experimental: { viewTransition: true },
};
```

Verify against the installed Next 15.3. If `npm run build` warns that the key is unrecognised, or the morph flickers/duplicates on repeat navigation, **remove the flag and ship without the morph.** The `@starting-style` floor on the case-study header frame (C4) carries the arrival either way. Do not hand-roll `startViewTransition`.

---

## 3. Cross-workstream contracts

These are requirements, not assumptions. Each names the workstream that owns the element.

**C1 — Hero layout workstream.** `.hero` must remain a single element wrapping the headline, and `.hero__title` must remain a single element containing both visual lines. `.hero`'s `overflow: clip` must stay — it clips the departing title against the hero's own top edge, which is what makes the handoff read as the headline sliding *under* the fold rather than over the Work section. This dimension adds `view-timeline-name` to `.hero` from its own gated block; the hero's rule is not edited. Left-aligning the hero is entirely compatible and requires no change here.

**C2 — Cards workstream: class names.** `ProjectCard.tsx` currently renders `<Artifact className="card__art">`. The media slot must be renamed `.card__media` and rendered through `MediaFrame`.

**C3 — Cards workstream: the snapshot clip.** `.card__media` must carry its own `overflow: hidden` and `border-radius: 14px`. A `view-transition-name`d descendant is snapshotted **without** its ancestor's clip, so a frame relying on `.card`'s `overflow: hidden` will pop to unclipped geometry the instant the morph starts. It must carry its own clip. `view-transition-name` goes on `.card__media` via inline style, value `media-${slug}` — never on `.card`.

**C4 — Case-study route workstream** (`app/work/[slug]/page.tsx`):

1. The header media frame carries `view-transition-name: media-${slug}` and, as the guaranteed floor, `@starting-style { opacity: 0; scale: .98 }` → `transition: opacity 320ms var(--ease-out), scale 320ms var(--ease-out)`.
2. `<Pin>` appears **only** when `slug === "operations-agent"`, inside *Hardest technical challenge*. *Problem & context*, *What I built & how* and *Outcome & impact* contain no pins and no scrubs — those are read, not watched. Every other slug renders `<StackedFigure>` or nothing.
3. `id="challenge"` goes on `.pin` (its top edge), never on `.pin__stage`.
4. The email CTA sits **after** the pin in document order, and is reachable from the fixed shell without traversing it.
5. `.pin` and `.case__mark` must be direct children of the page flow. **Check the full ancestor chain, not the parent:** any `transform`, `filter`, `backdrop-filter`, `contain`, or `overflow: clip/hidden` on any ancestor kills `position: sticky` silently, with no error and no symptom other than the thing not sticking. `.hero` has `overflow: clip` and `.card` has `overflow: hidden`; never nest either construct inside them. Re-check whenever the case-study layout changes.
6. Media frames use `MediaFrame` with 60ms stagger, max three per section.

**C5 — Shell workstream.** `.shell`'s padding and mark size define `--shell-band`. If either changes, update the token; the pinned stage's clearance and every section's `scroll-margin-top` both read from it.

**C6 — Content, from Parth, tomorrow.** The pin needs (a) three beats of real engineering narrative — the constraint, the decision and its rejected alternative, how correctness was judged — and (b) explicit confirmation that a three-layer architecture diagram of the Operations Agent is not confidential. Ask for both before writing a line of sticky CSS. Absent either, `<StackedFigure>` ships and that is a designed outcome, not a failure.

---

## 4. Performance budget

Numbers, measured, not aspirational.

| Budget | Value | How verified |
|---|---|---|
| Scroll listeners site-wide | **1** (existing `ScrollRing`, passive, rAF-coalesced). This dimension adds **0**. | `grep -rn "addEventListener(\"scroll\"" components app` |
| `getBoundingClientRect` / `scrollHeight` / `getComputedStyle` inside any scroll or rAF path | **0 added.** Existing: one `scrollHeight` per rAF in `ScrollRing`. The three new IO components read `getBoundingClientRect()` exactly once each, at mount, never during scroll. | grep + Performance panel "Forced reflow" warnings |
| JS shipped by the pin | **0 bytes** | `Pin.tsx` / `StackedFigure.tsx` have no `"use client"` |
| JS added total | `MediaFrame` ≈ 0.7 KB + `EmailLink` ≈ 0.6 KB gzipped | `npm run build` route report |
| Composited properties | `opacity`, `translate` on beats; `translate`/`opacity` on the hero title; `transform: scaleX` on the underline | DevTools ▸ Rendering ▸ Layer borders |
| Metered-paint regions site-wide | **1** — the pin diagram, ≤640×400 CSS px, desktop ≥1024×720 only, never on a phone | DevTools ▸ Rendering ▸ Paint flashing: repaint confined to the figure's rect, never spilling to the page |
| Elements with `backdrop-filter` under scroll motion | **0** | grep `backdrop-filter` against every selector in the scroll-motion block |
| Homepage `scrollHeight / innerHeight` growth | **0.0%** | measure at 1440×900 before and after |
| Operations Agent route growth | **≤ 25%**, and `E ≥ 120vh` or no pin | D7 measurement procedure |
| Beat duration | `E/3` vh, ≥ 40vh | arithmetic; enforced by the `extra` literal union |
| Total sticky travel | ≤ 135svh, one route | `--pin-extra` |
| Long tasks attributable to motion during a full-page scroll at 4× CPU throttle | **0** | Performance panel |
| Frame rate over the 135vh pin scrub, 4× CPU throttle | ≥ 55fps average. Below that, drop `pin-layer-2/3` to a plain `opacity: .25 → 1` reveal and delete the draw. | Performance panel |
| Ambient motions at scroll rest | **exactly 2** (the roll, the blob drift). Nothing coasts. | stop scrolling, watch |

---

## 5. Reduced motion, progressive enhancement, accessibility

**Reduced motion means fewer and gentler, not none — and it must collapse the scaffolding, not just the movement.**

- `.pin` → `height: auto`, `.pin__stage` → static, `grid` stacks, all beats at `opacity: 1`. The reader gets the same content in the same order, in **less** scroll than the motion path. This is the whole point of putting `height` and `position: sticky` inside the gate.
- Hero handoff: absent. The headline scrolls normally.
- Media frames: `clip-path: inset(0 0 0 0)`, `transition: none`, enforced with `!important` in a reduced-motion block because `MediaFrame` bails before setting any attribute and the `!important` guards against a future editor's inline style.
- Email underline: drawn, no transition. `EmailLink` bails at mount.
- View transitions: `::view-transition-old/new(*) { animation-duration: 1ms }` — the morph resolves instantly rather than the elements jumping without a transition.
- `ScrollRing` keeps working: a progress indicator carries *information*, not spatial travel, and is correctly exempt (Rule 7.1).
- Keyboard-initiated scroll stays `behavior: "auto"` in `Shell.tsx`, regardless of preference. Native hash navigation is handled by `html:has(.pin) { scroll-behavior: auto }` — the case the JS shortcuts do not cover, and the one most likely to occur (a shared URL, a browser Back).

**Enhancement path, one gate at a time:**

| Tier | Gets |
|---|---|
| Chromium 115+, Safari 26+, Firefox 144+, ≥1024×720, no-preference | Everything: pin, scrub, layer draw, hero handoff, frame reveal, underline, morph. |
| Same engines, <1024px or <720px tall | Everything except the pin, which is a stacked figure-plus-captions section. Hero handoff still runs above 721px wide. |
| Safari 18, Firefox 143, anything without `animation-timeline` | Frame reveal, email underline, sticky case mark, `Reveal` cards, the stacked pin section, the `@starting-style` header arrival. No hero handoff, no scrub. Every route complete and readable. |
| JS off, or hydration failed | Frame contents visible, underline drawn, cards visible, stacked pin section visible. Nothing is stuck invisible anywhere on any route. |
| `:has()` unsupported (Firefox <121) | Anchor jumps to `#challenge` smooth-crawl. Cosmetic; these engines also have no pin, so the crawl is through a normal-length section. |

**Accessibility invariants:**

- Nothing focusable exists inside `.pin__stage`, enforced by the `Beat` type. No focus-scroll can fight the scrub.
- Beat text is in normal DOM order and is read by screen readers regardless of opacity. Three `h3`s under the section's `h2`.
- Diagram `<text>` labels live in the never-animated layer 1 and are always visible.
- Scrubbed opacity floors: hero title 0.25, beats 0 — permitted because beats contain no links or focus targets and the content rule keeps searchable terms out of them.
- `1/2/3/4/5` shortcuts and menu jumps land at `.pin`'s top edge with `calc(var(--shell-band) + 12px)` of margin, never mid-sequence.
- PageDown/Space advances through the pin normally — `position: sticky` never touches the scrollbar and never calls `preventDefault`.

---

## 6. DESIGN.md amendments

Regenerate, do not hand-edit. These are normative additions under § Motion, plus two amendments to existing rules that would otherwise be silently contradicted.

**Scroll-driven motion is exempt from the ambient budget.** The budget of two counts motion that runs *without the user*. Scroll motion is not autonomous — the user is the clock. At scroll rest the page still contains exactly two moving things: the roll and the blob drift. Corollary and hard rule: **nothing may keep moving after scrolling stops.** No inertia, no easing-out after the finger lifts, no rAF smoothing or lerp of scroll position, no autoplay-on-enter loop. A scroll effect that coasts has become a third ambient motion and is a defect.

**The scroll motion ceiling.** One pinned sequence on the whole site — Operations Agent, *Hardest technical challenge*. Zero on the homepage; homepage scroll length growth is 0%. Total sticky travel ≤135svh, and no more than 25% of the route's own measured length. Scrubbed timelines are always `linear`; shaping goes into keyframe offsets or `animation-range`, never into a timing function, because an eased scrub means the content lags the finger and that is the exact mechanism by which cinematic scroll starts feeling slow.

**`animation-range` is the duration token,** published alongside `--ease-out`: `entry 0% entry 60%` (enter as it arrives) · `cover 0% cover 100%` (traverse) · `exit 0% exit 100%` (depart) · `contain 0% contain 100%` (a pinned beat's body).

**Interaction owns `transform`; scroll owns `translate`/`scale`/`rotate`.** States the `.card:hover` regression this prevents.

**The finished state is the default.** Start states live only inside `@supports (animation-timeline: view())` and `@media (prefers-reduced-motion: no-preference)`. Pin *scaffolding* is inside that gate too, not just the movement — a pin without a scrub is dead scroll.

**Headings never animate.** Every anchor target is readable at the instant of arrival.

**Two effects are permanently refused, with reasons, so they do not come back:** a scroll-reactive wash (moving the backdrop makes every glass card re-blur its own rect each frame over four 42vmax gradient blobs plus a blend-moded grain layer), and a Simple-Icons rail traversal (matches none of the four valid purposes for scroll motion on this site — it is decoration).

**Motion that implies a quantity is a fabrication mechanism.** No count-ups, odometers, progress bars, fluency meters or filling rings, anywhere, ever. PRODUCT.md has no metrics, no adoption numbers and no fluency ordering; a filling bar would invent data in the motion layer.

**The material rule for media.** Media frames are opaque `--white` with a 1px `--glass-edge` border and no `backdrop-filter`. The Blur-Is-Legibility Rule justifies blur where type floats over the wash; a screenshot is not type and does not need separating from a background it covers.

**`--shell-band` is the token for the fixed header's occupied height.** Anchors (`scroll-margin-top: calc(var(--shell-band) + 12px)`) and the pinned stage's `padding-top` both derive from it. The old literal 84px was 4px short of the real band.

Also update § Navigation for the fifth menu keycap, and `.impeccable/surfaces/homepage.md`'s FIRST VIEWPORT and Audience/Job/Action blocks (email as the single primary), so the finish review does not fail correct work for contradicting a stale contract. Add `.impeccable/surfaces/case-study.md` with the pin named as that surface's signature interaction.

---

## 7. Pre-ship verification

Run in this order. Do not skip step 1; it is the one that decides whether the rest is worth building.

1. **Read the stacked path end-to-end first.** Load `/work/operations-agent` before adding the gate. If the stacked figure-plus-captions section is not a good section on its own, the sequence has no content — stop, and ship `StackedFigure`.
2. **Measure `L`** on the pinless route at 1440×900 against `next start`: `document.documentElement.scrollHeight / window.innerHeight`. Compute `E = min(135, floor(0.25 × L))`. If `E < 120`, the pin does not ship.
3. **Verify `contain` maps to the sticky span.** Ten minutes in Chrome DevTools before 235svh of layout depends on it: scrub to 0%, 50%, 100% and confirm the stage locks and releases at exactly the range boundaries. If it does not, the fallback is a `view-timeline` on `.pin` with explicit `entry-crossing`/`exit-crossing` offsets — harder to read, same behaviour.
4. **Scrub to 32% and 66%.** Ink must be present in the beat column at every position. This is the dead-zone regression test.
5. **Shell overlap.** At 1024×720, 1440×900 and 1920×1080: nothing in the pinned stage is ever under the shell mark or the menu button, at any scroll position.
6. **DevTools ▸ Rendering ▸ Paint flashing** across the full pin scrub. Repaint must be confined to the figure's rect. If it spills, drop the layer draw to opacity-only.
7. **DevTools ▸ Rendering ▸ Layer borders.** Beats and the hero title get their own layers. No moving element carries `backdrop-filter`.
8. **Performance profile, 4× CPU throttle, full-page scroll on both routes.** Zero long tasks attributable to motion. Zero forced-reflow warnings.
9. **`.card:hover` regression.** Hover-lift every card on every route touched by scroll motion; confirm the −3px lift and the `.card__art` −3/−3 nudge still fire. This is the D15 test and it is the one most likely to be silently broken.
10. **Reduced motion, loaded with the preference set** (not toggled — `Reveal.tsx` reads `matchMedia` once at mount and does not subscribe). Read both routes end-to-end. Same content, same order, no empty pinned space, route not longer than a plain page.
11. **`@supports` false.** Force it by temporarily changing the condition to something unsupported. Every route complete and readable; nothing stuck invisible; no 135vh of dead scroll.
12. **JS disabled.** Frame contents visible, email underline drawn, cards visible.
13. **Keyboard.** `1/2/3/4/5` and Tab traverse both routes; never land mid-pin; never trap. PageDown and Space advance through the pin. `<a href="#challenge">` pasted into the address bar lands at the pin's top with no smooth crawl.
14. **Cmd+F.** Search a term that appears only in beat 2's body. Confirm it is not the only occurrence — every searchable term must also be in a layer-1 `<text>` label or in prose outside the pin.
15. **Mobile, 390 wide, both themes, fold and full page**, against `next start` with `playwright-core` and the cached Chromium shell, `reducedMotion: "reduce"` and again without. The pin must be **absent** — not collapsed-but-tall, absent. URL-bar show/hide must cause no jump; every height is `svh`, never `vh` or `dvh`.
16. **Short-viewport check at 1280×720 and 1000×640.** Both must land on the stacked section, not an overflowing stage.
17. **Route length, after.** Homepage unchanged to 0.0%. Operations Agent within +25%.
18. **`npm run build`** — type check plus lint, the CI-equivalent gate — then `/polish`, then push.
19. **Slow-motion review at 4× duration, and again the next day.** Does anything overshoot, lag the finger, or desync?
20. **The removal test.** Delete each effect in turn. If removing it loses only polish and not meaning, it stays deleted.

---

## 8. Residual risks, unhedged

1. **The pin is content-conditional and content arrives tomorrow.** Three real beats plus diagram permission. The `Beats` 3-tuple and the `extra` literal union make a half-built pin unrepresentable, and `StackedFigure` is a designed section rather than a degradation — but the mitigation that matters is asking for the beats and the permission explicitly, tomorrow, before writing sticky CSS.
2. **`experimental.viewTransition` is the one version-dependent piece.** If it is unstable in the installed Next 15.3, the morph does not ship and the `@starting-style` floor carries the arrival. Do not attempt a cross-boundary `startViewTransition` promise; intermittent is worse than absent.
3. **`contain`-phase behaviour is the load-bearing assumption of the entire pin** and is verified in step 3, before any layout depends on it.
4. **`stroke-dashoffset` scrubbing is the only paint-tier work in the system.** Verified in step 6; the drop-to-opacity path is specified.
5. **Sticky dies silently.** No error, no symptom. The ancestor-chain check (C4.5) must be repeated whenever the case-study layout changes, not just once.
6. **`prefers-reduced-motion` is read live by CSS and once at mount by `Reveal.tsx`, `MediaFrame` and `EmailLink`.** Every CSS effect here updates when the user changes the setting mid-session; the three IO components do not. This predates the work and is not worth fixing — but it is why step 10 says *load* with the preference set, not toggle it.
7. **`--shell-band` is a literal derived from two other literals.** If `.shell`'s padding or the mark's size changes and the token does not, the pinned stage and every anchor land wrong together. C5 exists for this; there is no automated check.