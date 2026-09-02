**Scope note:** I received C8–C15 plus §5–9. C0–C7 are referenced but not included, so anything below about C3/C4/C5/C6/C7 is inferred from cross-references in the text I got and verified against the live code in `/Users/ParthDoshi/csProjects/portfolio/.claude/worktrees/impeccable-teach`. §8.1's characterization of the current Work section is accurate (verified: flagship has no click target, `card__art` glyph, `Badge` label chip, two-branch `ProjectCard`).

---

# P0 — ships broken, or violates a locked decision

**1. Two incompatible media-frame vocabularies. Never reconciled.**
C7 ships `.case__frame` / `.case__shot` / `.case__placeholder` (`components/case/CaseMedia.tsx`). C12 §12.2 introduces `.frame` / `.frame__clip` / `--frame-ratio` / `MediaFrame.tsx` with its own `aspect-ratio`, `border`, `--media-well` background — a second implementation of the same box. C12 §12.3 then animates `.case__shot img`, and §12.7 animates `.case__head .frame`. C13 uses `.case__shot` again. Nothing says which wins, whether `MediaFrame` wraps or replaces `CaseMedia`'s figure, or which class the case-study header frame carries. **Pick one — `.case__frame`/`.case__shot` (already shipping in C7) — and rewrite C12 §12.2 and §12.7 against it.**

**2. C12's headline claim — "ships live on every case-study route with zero new content" — is false.**
Moment 1 (frame reveal) needs a frame. Moment 2 (media drift) targets `.case__shot img` / `.case__shot .card__mark`. §12.7 targets `.case__head .frame`. On launch day `media: []` for all seven, and C7's only empty-state frame (`.case__placeholder`) is gated behind `NEXT_PUBLIC_SHOW_PLACEHOLDERS=1`, "never in a deployment." So the case-study routes render **no frame at all**, and three of the five authored moments are dead code. Launch-day cinematic inventory is: hero handoff (homepage), email underline, sticky mark. That is not what the commit title claims and not what the verification will measure.

**3. Locked decision partially unmet: "Design real media slots plus placeholder frames until they arrive."**
Cards get a designed empty state (the `Artifact` mark — good). Case studies get *nothing*, because the placeholder is dev-only. The owner asked for placeholder frames on the surface where the media lives. **Fix: ship `.case__placeholder` in production as a real designed empty frame (the `Artifact` mark at 62% height, same as the card), delete the env flag.** This also resurrects Moments 1 and 2, which is how C12 becomes true.

**4. Locked decision at risk: "cinematic."**
Total pins site-wide: one. Gated on `media.length` 2–3, which does not exist. Zero on the homepage — the only page most recruiters will see. The scroll-speed reasoning behind that is sound and I'd keep it, but the plan makes the call silently: there is **no question to Parth** among the seventeen asking whether he accepts a homepage with no scroll choreography. Add it, and add at least one homepage moment that costs **0px of scroll length** — e.g. a `view()`-scrubbed `translate` on the flagship's media *inside its own frame* (same mechanism as §12.3, zero height change, dies correctly with the placeholder), or a `scroll()`-driven `translate` on the Stack orbit. Otherwise the honest summary of this PR is "we declined the cinematic brief," and that should be said out loud, not discovered after merge.

**5. `behavior: "auto"` does not defeat `scroll-behavior: smooth`. The plan asserts the wrong behavior as a passing test.**
Per CSSOM-View, `ScrollBehavior` `"auto"` resolves to the element's computed `scroll-behavior`. `app/globals.css:168–171` sets `html { scroll-behavior: smooth }` under `no-preference`; `components/Shell.tsx:52` calls `scrollIntoView({ behavior: "auto" })` under a comment claiming keyboard jumps "stay instant regardless." **They smooth-crawl today.** C9 verification step 8 (`behavior: "auto"`) and motion-matrix item 13 both certify a behavior that does not happen. Fix: `behavior: "instant"` in `Shell.tsx`, correct the CSS comment, and correct both verification steps. Related: C12 §12.8's `html:has(.case__media[data-pin])` only covers case-study routes, and applies at widths/preferences where no pin exists (`data-pin` is emitted by C7 regardless of the `@media`/`@supports` gates that actually create the pin).

**6. Motion-matrix item 2 is arithmetically wrong and will fail on its first run.**
"`document.getAnimations().filter(running)` returns **exactly two**." Actual at rest, desktop: four blob drifts (`drift-a`…`drift-d`, `globals.css:352–361`), `.status__dot::after` `pulse` (infinite), and `.roll__caret` `blink` (infinite while holding) = **six**. Someone will hit this, decide the assertion is wrong, and weaken it — losing the check entirely. Restate it as a named allowlist: `{drift-a, drift-b, drift-c, drift-d, pulse, blink}`, assert set equality, and assert `{drift-*}` is empty below 720px.

**7. Product-truth defect in copy the plan authored.**
C11's Contact lede: *"I've shipped an agent inside a company's operations team…"* PRODUCT.md: built **with a partner**. First-person-singular credit for a two-person project is exactly the R16 soft-fabrication class, and it sits three sections above an Experience row whose entire design argument is naming the ownership split honestly. Rewrite to something like *"I've shipped an agent that runs inside a company's operations team, and an evaluator DECA competitors use."* — no authorship claim in the verb.

**8. Performance: no image budget, and the plan lazy-loads the LCP element.**
`CardMedia` hardcodes `loading="lazy"` for every card including the flagship, which becomes the homepage LCP once media lands. `unoptimized` GIFs bypass the optimizer entirely with no stated size ceiling. "Must still feel fast to a recruiter in a hurry" is a locked constraint and the plan budgets *motion* performance meticulously while budgeting *bytes* not at all. Add: `priority` on the flagship's first media and the case-study header frame; a stated per-asset ceiling (e.g. ≤400KB image, ≤1.5MB GIF, else it becomes an MP4/WebM and the pin gate excludes it anyway); and a Lighthouse/LCP number in §6 alongside the frame-rate numbers.

---

# P1 — serious gaps

**9. Commit ordering: `lib/routes.ts` is created in C9 but needed in C7 and duplicated in C8.**
C7 renders `/work/[slug]` and C8's `projectMeta.ts` defines its own `caseStudyHref`. C9 then creates the "one definition per route shape" file with the note "if C8 already created it, use its export" — which is the divergence the file exists to prevent, written into the plan. Move `lib/routes.ts` to C6 or C7; have `projectMeta.ts` re-export, never redefine.

**10. G1/G2 have no shippable degraded mode.**
R1 forbids tier gates on the case-study CTA, so if Operations Agent doesn't clear "≥3 sections of real prose," the largest element on the homepage still routes to a near-empty page — the exact failure R6 names as *worse than today*. §9 says "the PR stays open." That is not a plan, it's a stall. Design the fallback now: either a per-project `hasCaseStudy` derived from section count that swaps the CTA for the boundary line, or an explicit decision that the PR ships with the flagship's page thin and Parth is told so.

**11. The Work lede advertises six pages the plan does not gate.**
*"Every one of the seven has its own page."* Only the flagship carries a content gate. If six pages ship with a tagline, a `<dl>` of `not yet stated`, and nothing else, the section's most-read sentence is pointing recruiters at them. Either gate all seven at a lower bar (one real paragraph each), or cut the last clause until they're populated.

**12. `check:content` cannot be both a pre-push gate and expected to fail.**
"runs before every push; its non-zero exit while `PENDING` remains is expected." Needs two modes: `check:content` (warn, exit 0, lists pendings) for every push, `check:content --strict` (exit 1) as the launch/merge gate. As written, the first push teaches everyone to ignore it.

**13. `MORE_TITLE` mislabels two of its four projects.**
"Games, graphics and interfaces" over {Wave Function Collapse, Pewter Platformer, Gestura, WordPlay}. Gestura is **assistive technology** — one of PRODUCT.md's four named categories, and already a `Badge` in `About.tsx` ("Assistive tech"). WordPlay is full-stack web. The heading erases the assistive-tech story, which is a real differentiator, and it contradicts a taxonomy already on the page. R28 flags the string is unguarded but not that it's currently wrong. Suggest something membership-neutral: "Games, systems and interfaces" is no better — prefer no group heading, or "Four more, code out in the open" reframed to avoid the rejected-alternative problem.

**14. Hero DOM order is asserted twice and never changed.**
§11.1's State A table lists `p.status` (#4) before `div.hero__actions` (#5), and §11.7's rise ladder runs `status 240 / actions 300`. `components/Hero.tsx` renders actions **then** status. No commit instructs the reorder. Decide, and say so in C11.

**15. The accent census (§6.5) doesn't match shipping code.**
`--signal` also appears at `globals.css:1092` (`.card:hover` border-color mix — **retained verbatim in C8's CSS**), and `--signal-ink` at `:776` (`.link-arrow:hover`, `.menu__link:hover`) and `:908` (`.roll__text--accent`). The six-kind list covers the roll accent and focus/selection but not the two hover uses. A census that produces two false positives on its first run will get someone to delete a correct rule. Restate the six kinds to include "hover state on a text control" and "card hover edge," or drop those uses.

**16. The flagship's media has no accessible description.**
`.card__media-link` is `aria-hidden`, and `CardMedia` renders `<Image alt={media.caption}>` inside it. The flagship's single visual proof is invisible to AT, and its caption exists nowhere else on the card. Either move the caption into the card text, or drop `aria-hidden` and give the link `tabindex="-1"` + `aria-label` only (duplicate-link noise is the lesser cost than an undescribed hero image).

**17. §12.7's `@starting-style` floor is not reduced-motion gated.**
"universal, no config flag" — and it animates `scale`, which is spatial motion. CLAUDE.md: *every animation sits behind `prefers-reduced-motion`.* Wrap it, or drop `scale` and keep opacity.

**18. Multi-route accessibility is unhandled.**
The site becomes multi-route in C7 and nothing addresses focus management or announcement on navigation (Next App Router does not do this for you), there's no skip link, and `app/layout.tsx`'s `<main>` has no `tabIndex={-1}` target. Pressing `1` from a case study now `router.push`es — focus stays on `body` and a screen-reader user hears nothing.

**19. `components/Footer.tsx` is never mentioned in any commit.**
It renders `<a href="#top">Back to the top</a>`. `#top` is `.hero`'s id — it exists only on `/`. Every case-study route ships a dead anchor in the footer. It also duplicates `ScrollRing`.

**20. Metadata: no `metadataBase`, and the canonical fallback is undefined.**
`app/layout.tsx` has none today. C7 verifies "exactly one `<link rel=canonical>` pointing at itself" without saying what it resolves to when `NEXT_PUBLIC_SITE_URL` is absent (it's question #16, i.e. unanswered on launch day). Define the fallback explicitly or the check passes against `localhost:3000`.

**21. No handling for an unknown `/work/<slug>`.** Needs `export const dynamicParams = false` (or `notFound()`), or a typo'd URL renders a crash instead of a 404.

**22. The type safety C5 buys is thrown away by four casts.**
`projectMeta.ts` uses `caseStudies[p.slug as ProjectSlug]` in `metaFacts`, `hasLeadFact`, `boundaryOf`, `summaryOf`, `secondaryLinks`; `CardMedia` does the same. A slug present in `projects.ts` and absent from `case-studies` is then a runtime `undefined.status` throw, not a compile error. Type `Project.slug` as `ProjectSlug` and delete every cast — that's the whole point of C5's widening.

**23. The pinned rail has no horizontal placement.**
`.case__stage` is `display: flex; align-items: center` and `.case__rail` starts at x=0. At 1440 with `flex: 0 0 min(880px, 72vw)` the first beat sits flush-left with ~500px of dead stage to its right, and the last beat ends flush-left too. Specify stage `padding-inline` or an initial offset so each beat is centered; otherwise the "cinematic" moment is an off-center slab.

**24. The verification apparatus is real but not affordable as scheduled.**
Full matrix = 6 widths × 2 themes × 2 captures × 3 routes = 72 images, run after ten commits, plus 17 assertion widths × 2 themes × 3 routes, with the harness explicitly **not** committed ("do not commit a driver script"). That's ~700 images and a re-authored harness each time. Fix: author the harness once in C0 into `/private/tmp/portfolio-capture/` (uncommitted, persistent for the PR's life), define a **smoke** subset (390/1440 × 2 themes × fold, one route) for mid-PR commits, and reserve the full matrix for C3/C4/C8/C14. Also say what actually lands in `.impeccable/review/` — the existing set is 17 files; 72+ PNGs per route is a repo-weight decision nobody made.

**25. Homepage scroll-length target contradicts itself.**
§9 checklist: "homepage scroll growth **0.0%**." C8 step 12: "≤+25% budget from all dimensions combined." The 0.0% figure is motion-only; the actual homepage gains 3 media frames, a `min-height: 420px` flagship, ~400px of Experience and a credential line, offset by demoting four cards to ~110px rows. Nobody does the arithmetic anywhere. State the real target (a measured before/after number for the *page*, not for motion) and put it in the checklist.

**26. `npm i -D simple-icons@1.2.3` does not pin.** npm writes `^1.2.3`. Use `--save-exact` (or `save-exact=true`), or C10's step-1 assertion fails on the next `npm i` for reasons nobody will diagnose quickly.

**27. Mobile touch targets are below floor and never mentioned.**
`.card__cta` and `.card__link` are `padding: 8px 14px` on `0.9375rem` text ≈ 34px tall. At 390px, tier-3 rows put up to three of them side by side in `.work__row-actions` with `gap: 4px`. No 44px rule appears anywhere in the plan, on a site whose own copy says a large share of visits are a LinkedIn tap on a phone.

---

# P2 — what an implementer hits that this plan does not answer

- **`mailto:` subject**: `EmailCTA`'s `context` "→ the prefilled subject" — no string, no `encodeURIComponent`, no body. Specify both, and note that an unencoded `'` / `—` in a project name breaks the href.
- **`.card__meta` markup never appears.** §8.6's anatomy lists `.card__text`, `.card__foot`, `CardMedia` — but R2 computes `hasMeta` and the CSS defines `.card__meta`, `.card__facts`, `.card__fact--lead`, `.card__sep`. Where `TechRow` and the fact line sit in the JSX is left to the implementer to guess, on the commit whose stated purpose is eliminating divergence between renderers.
- **`components/EmailLink.tsx` "(folded into EmailCTA)"** appears in C12's Files list. That file doesn't exist. Delete the line.
- **`Reveal` + `MediaFrame` double entrance.** `Reveal` applies an inline `transitionDelay`; `MediaFrame` uses `--frame-delay`. A case-study section wrapped in `Reveal` containing a frame will run both. Say explicitly that case-study sections are **not** wrapped in `Reveal` (C12 implies it, never states it).
- **`.case__head` with no media**: the `minmax(0, 320px)` column's behavior when the header frame is absent is unspecified — collapse, or a 320px hole next to the h1?
- **`--beats` in `@keyframes`**: works, but note it must be set on `.case__media` (the element carrying the `animation-timeline` is `.case__rail`, a descendant — inheritance carries it, fine, but say so; an implementer who moves it to the rail's parent-sibling breaks it silently).
- **About rewrite (C11) is nearly a no-op.** `About.tsx` already reads *"The thread through everything I make is leverage: using AI and solid engineering to take a real problem off someone's plate — an operations team's broken bookings, a DECA competitor's unscored report, a small business without a website."* The proposed replacement deletes the three concrete examples and adds "and taking it off their plate for good." That's a net loss of specificity, framed as a rewrite requiring Parth's approval. Either drop the change or justify it on the repetition ground with the hero text side by side.
- **CLAUDE.md close-out (C15) misses three false statements it will leave standing**: "No Tailwind" (Tailwind 4 + shadcn are installed; `globals.css:1` is `@import "tailwindcss"`), "`npm run build` … also runs the type check and **lint** … `npm run lint`" (no eslint installed — `npm run lint` fails, and §6.1 correctly says so), and `components/Nav.tsx` (now `Shell.tsx`). C15's list only covers the route/section/keycap lines.

---

# P3 — missing from the questions for Parth

Add, at roughly priority 2–4:

- **Does he accept a homepage with no scroll choreography?** This is the single largest interpretive gamble in the PR against a locked decision, and it isn't asked.
- **Will he supply at least one image or GIF for the flagship tomorrow?** The pin (C13), the drift (§12.3) and the frame reveal (§12.2) all die without it. Question #13 asks about a *diagram* for NDA reasons; it never asks the simpler question.
- **Approval of the tier-3 grouping name and membership** (R13 names the demotion as the highest-pushback decision but doesn't put it in the question list; #15 asks about tiers generically, not about the heading that makes a claim about four projects).
- **Is he OK that body prose on tier-2/3 cards will not be selectable?** (§8.6's stated tradeoff, never surfaced to him.)
- **Does he want the résumé in the hero?** C11 rules it out unilaterally and calls that "what 'résumé is secondary' means operationally." That's a defensible read of his instruction, not a stated one.

And one thing nobody is measuring: **the site's job is conversion and nothing about it is observable.** No analytics is in scope and shouldn't be, but distinct `mailto:` subjects per surface (shell pill / Contact / each case study) is free, already half-built by `EmailCTA`'s `context` prop, and gives Parth the only signal he'll ever get about which page produced the email. Make it deliberate rather than incidental.

**Finally**: CLAUDE.md binds *every* animation in the repo to `emil-design-eng`, and only C12 is told to load it. C4 (hero motion), C8 (hover lift, press scale, media zoom) and C11 (the copy-confirm micro-state) are all motion work under the same rule.