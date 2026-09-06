# Sequence, gates and risks

## 1. Branch posture

**Every PR branches from `origin/main` and is merged alone.** These will be picked up slowly, one at a time, and a stacked branch that waits a week rots. The two exceptions are stated in the table: PR 09 (motion) and PR 10 (performance) tune what PRs 02 to 08 build, so they wait for those to merge; PR 12 (records) is last by definition.

```bash
cd /Users/ParthDoshi/csProjects/portfolio
git fetch origin
# EnterWorktree (or git worktree add) with the branch name below, based on origin/main
git switch -c mobile/02-hero-and-fold origin/main
npm ci --no-audit --no-fund          # the worktree has its own node_modules
```

Branch names: `mobile/00-harness`, `mobile/01-foundations`, `mobile/02-hero-and-fold`, `mobile/03-work-cards`, `mobile/04-navigation`, `mobile/05-experience-about-contact`, `mobile/06-case-study-header`, `mobile/07-flow-stepper`, `mobile/08-sections-and-slideshow`, `mobile/09-motion`, `mobile/10-performance`, `mobile/11-theme-and-a11y`, `mobile/12-records`.

Before any push: `gh pr view --json state,mergedAt` on the branch. A `MERGED` branch never receives another commit; make a fresh branch from `origin/main` and open a new PR (CLAUDE.md, Before pushing, rule 2).

## 2. Order and dependencies

| PR | Title | Depends on | Blocks | Size | Motion skill |
|---|---|---|---|---|---|
| 00 | Capture harness and phone baseline | nothing | everything (the gates use it) | S | no |
| **00b** | **The glass is missing in Chromium** (13-pair reorder, ships first) | nothing | 10, 11 (their measurements need blur to exist in Chromium) and every "1440 identical" gate (compare against the post-00b capture) | XS | no |
| 01 | Mobile foundations | 00, 00b | 02 to 11 (they inherit its tokens and breakpoints) | M | no |
| 02 | Hero and the fold | 01 | 09 (recede tuning) | M | **yes** (the scroll cue, the recede) |
| 03 | Work cards on phones | 01 | 09 (unveil), 11 (contrast re-measure) | L | yes (press states, cue) |
| 04 | Navigation: the bottom sheet | 01 | 09 (sheet motion is designed here, tuned there) | L | **yes** |
| 05 | Experience, About, Contact, footer | 01 | 11 | M | yes (copy control feedback) |
| 06 | Case-study header | 01 | 09 | M | yes (panel recede) |
| 07 | Flow stepper | 01 | 09 | L | **yes** (rail draw, node settle) |
| 08 | Sections and slideshow | 01 | 09, 10 | L | **yes** (peek, dialog) |
| 09 | Motion pass | 02 to 08 merged | 10 | M | **yes** (this is the motion PR) |
| 10 | Performance | 02 to 09 merged | 12 | M | no |
| 11 | Theme and accessibility | 03, 05, 06 merged | 12 | M | no |
| 12 | Records | everything else merged | nothing | S | no |

PRs 02 to 08 are independent of each other and can land in any order once 01 is in. If two are in flight at once and both touch `app/globals.css`, rebase the second onto `origin/main` before pushing; the phone rules live in separate blocks so conflicts are textual, not semantic.

## 3. The ritual for one PR

1. `git fetch origin`, branch from `origin/main`, `npm ci` in the worktree.
2. Read the PR document end to end, then open the baseline sheet(s) it names in `.impeccable/review/mobile-baseline-2026-09-05/`.
3. If the PR document says "Motion skill: yes", invoke `emil-design-eng` **before** writing any CSS. For anything that touches the design system, run the Impeccable context script once: `node /Users/ParthDoshi/csProjects/portfolio/.claude/skills/impeccable/scripts/context.mjs --target <file>` (absolute path; cwd stays in the worktree).
4. Implement exactly what the document specifies. Where it gives a value, use that value. Where it gives a range, pick inside it and write the chosen number into the CSS comment.
5. `npm run build`. Then the detector: `node /Users/ParthDoshi/csProjects/portfolio/.claude/skills/impeccable/scripts/detect.mjs app components data` must report zero findings.
6. Serve and capture: `npx next start -p 3111` (3000 and 3100 belong to the main checkout), then `node scripts/mobile-capture.mjs --label after-` with the matrix in section 4. The script prints the metrics summary; paste it into the PR body.
7. Check the PR's **Gate** section line by line against the summary and the captures. Fix, rebuild, recapture. Bounded: two rounds, not a loop.
8. Run `/polish` on the touched surface. Fix what it raises in the same push.
9. Real-device checklist (section 6) if the PR document flags it.
10. Update the small records the PR made false (a line in `.impeccable/surfaces/homepage.md` or `case-study.md`, a line in `CLAUDE.md`). Do **not** regenerate `DESIGN.md`; PR 12 does that once.
11. Delete any `.probe.tmp.mjs` or `.shots.tmp/` you created inside the worktree. Never commit `node_modules`, `.next`, or the `--no-save` install.
12. Commit with the title from the PR document. Push. `gh pr create --draft` with the body template in section 7. Report the before/after numbers in the hand-off message.

## 4. The verification matrix

The harness (`scripts/mobile-capture.mjs`, see `pr-00-harness.md`) runs this by default; each PR document narrows it to the routes that matter.

| Dimension | Values |
|---|---|
| Viewports | 320x568, 360x740, 390x844, 430x932, landscape 844x390, sanity 768x1024 |
| Themes | light, dark (seeded through `localStorage.theme`, because `prefers-color-scheme` does not switch this site until PR 11 lands) |
| Motion | `reducedMotion: "reduce"` for stills (every Reveal fired, no drift); `"no-preference"` for the motion probes |
| Root font | 16px and a simulated 20px (`--root20`), because the display clamps are px-bound and that has to stay true |
| Routes | `/`, `/work/operations-agent`, `/work/scorely-ai`, `/work/santaclaws`; add `/work/wordplay` (no media) for PR 08 and `/nothing-here` (the 404) for PR 06 |
| Emulation | `isMobile: true`, `hasTouch: true`, `deviceScaleFactor: 2` for folds, 1 for sheets |

## 5. Gates shared by every PR

A PR is not done until all of these hold on the routes it touches, at every width in the matrix, in both themes:

- `npm run build` passes; detector reports 0 findings.
- `hOverflow` is 0 (no horizontal scroll) at 16px and 20px root.
- No interactive target under 24x24; nothing the PR touched under 44px on its shorter side.
- No visible text under 14px on phones (the harness samples the selector list in `pr-01-foundations.md`).
- At rest with motion on, `document.getAnimations()` on a phone contains only the caret `blink` plus the view-timeline animations (`recede`, and after PR 03 no `card-unveil` on phones). Under reduced motion: only `blink`.
- Every hover rule the PR adds sits inside `@media (hover: hover) and (pointer: fine)`; every new pressable has an `:active` scale outside it.
- Both themes captured; no value introduced in one theme only (grep the diff for `.dark` pairs).
- Contrast: any text run the PR moved onto a different surface is re-measured with the composited-pixel method (`pr-11-theme-and-a11y.md`, section 3) and clears 4.5:1 (3:1 at 24px or 18.66px bold).
- The desktop capture at 1440 is byte-for-byte unchanged **unless the PR document says otherwise** (only PR 11's theme default and PR 10's grain change touch desktop).
- `DESIGN.md` not hand-edited.

## 6. Real-device checklist (Safari on an iPhone; Chrome on an Android if available)

Run after PRs 01, 03, 04, 08, 09, 10, 11. Visit the Vercel preview URL from the PR.

- [ ] Rubber-band overscroll at the top and bottom: the fixed wash and the shell stay put, nothing white flashes.
- [ ] Press a card: the whole card scales down (0.98) and releases; no grey tap highlight; the case study opens.
- [ ] Open the menu: it rises from the bottom; the page behind does not scroll; the close pill and the overlay both close it; the address is the first foot item.
- [ ] Rotate to landscape: the PD mark and the theme toggle clear the notch; the scroll ring clears the home indicator.
- [ ] The status bar colour matches the page after toggling the theme (PR 11).
- [ ] Scroll the Work grid fast with the thumb: no dropped frames, no blur "swimming" (PR 10).
- [ ] Scroll to Contact and back with the Safari toolbar collapsing and expanding: no layout jump (`svh`).
- [ ] Case study: tap a tall screenshot to expand; pinch-zoom works inside the dialog; close returns focus to the frame (PR 08).
- [ ] Settings > Accessibility > Reduce Motion: the typewriter swaps whole phrases, the sheet fades, nothing travels.
- [ ] Settings > Accessibility > Reduce Transparency: every glass surface is solid; text is still on the right ground (PR 01).
- [ ] VoiceOver: swipe through the fold, one card, the menu, and the slideshow; every control has a name; the slideshow announces "slide 1 of 2".

## 7. PR body template

```
## What
One paragraph. Which PR of the mobile overhaul, which decisions (D1 to D15) it implements.

## Before / after (390x844, light)
| Metric | Before | After |
|---|---|---|
| ... from scripts/mobile-capture.mjs ...

## Captures
fold 320 / 390 / 430, both themes; the 390 sheet; landscape 844x390; 768 sanity.

## Gate
- [ ] build, detector 0
- [ ] hOverflow 0 at 16px and 20px root
- [ ] targets >= 24 (touched >= 44)
- [ ] no text < 14px
- [ ] animations at rest: blink only
- [ ] both themes
- [ ] contrast re-measured on moved runs
- [ ] /polish run, findings fixed
- [ ] real-device checklist (if flagged)

## Records touched
surfaces/*.md lines, CLAUDE.md lines. DESIGN.md untouched (PR 12).
```

## 8. Risk register

| # | Risk | Where | Mitigation |
|---|---|---|---|
| R1 | The hero's never-wraps invariant and its assertion suite (`.impeccable/review/manifest.json` gates: `heroInvariant`, `slotConstancy`, `heroHierarchy`) describe a one-line headline. A two-line phone headline fails them as written. | PR 02 | PR 02 rewrites the invariant for phones: **the name line** (`PARTH DOSHI`) must fit 97% of the column at every width from 280 to 760 at 16px and 20px root; the lead line is shorter by construction. Above 760 the old one-line invariant stands unchanged. |
| R2 | The shadcn Sheet's Tailwind utilities (`w-3/4`, `inset-y-0`, `slide-in-from-left-10`) fight the bottom-sheet CSS. | PR 04 | Tailwind v4 puts utilities in `@layer utilities`; unlayered rules in `globals.css` win regardless of specificity. Override `inset`, `width`, `height`, `border-radius` and the whole `animation` shorthand under 760px on `.menu[data-side="left"]`. Assert with `getComputedStyle`. |
| R3 | `card-unveil` runs over `entry 0% to 100%`; a card that is already 20% into the viewport at load renders clipped and half-transparent, which is exactly what the card peek would show. | PR 02 / 03 | Disable the unveil under 760px inside the `@supports` block; the hero recede alone is the phone handoff. Verified by a fold capture with motion on. |
| R4 | `Reveal` writes `transitionDelay` inline from `delay={i * 50}`; on a phone one card is on screen at a time, so the stagger only delays. | PR 09 | `@media (max-width: 760px) { .work__item[data-reveal] { transition-delay: 0ms !important } }` with a comment naming this table row. The `!important` is the documented exception. |
| R5 | Moving card text to full width puts taglines over blob cores that the 183px column used to avoid, in both themes. | PR 03, 11 | The card is `--glass` (ground-tinted in dark). Re-measure with the pixel method at 390 in both themes; if a run fails, the phone card takes `--glass-strong`, not a new token. |
| R6 | A native `<dialog>` inside a page that also uses Radix focus scopes. | PR 08 | The dialog opens only from the slideshow, never while the sheet is open; `showModal()` makes the rest of the page inert, which is the behaviour wanted. Return focus to the frame's expand button on close. |
| R7 | `defaultTheme="system"` changes what desktop visitors see at first load. | PR 11 | Its own commit, its own line in the PR body, easy to revert. The captured desktop set in `.impeccable/review/` is unaffected because the harness seeds the theme explicitly. |
| R8 | The flow's absolutely positioned index circles and rail on phones vs the desktop connector geometry. | PR 07 | All phone rules under `(max-width: 900px)`, the flow's existing one-column breakpoint; the desktop block is untouched and the 1440 capture must be identical. |
| R9 | `playwright-core` version drifts from the cached headless shell (1234). | PR 00 | Pin `playwright-core@1.62` in the install command; the script accepts `PW_EXE` to point at the cached binary explicitly. |
| R10 | A `next dev` in the main checkout owns `.next`; a build there is not a production build. | all | Always build and serve from the worktree (memory: build-in-worktree-not-main-checkout). |
| R11 | Session size. A PR document is long; implementing and verifying one is the whole session's budget. | all | One PR per session. Never start the next PR's work in the same session "while you are there". |
| R12 | The phone breakpoint move (720 and 640 to 760) shifts three rules for viewports 721 to 760 wide. | PR 01 | Capture 740 once in PR 01's gate; that band is portrait tablets in split view and small landscape phones, and the rules that move (blob sizing, drift off, shell size) are all correct for it. |
| R13 | Any new glass rule written standard-first loses its `backdrop-filter` in production and Chromium draws no blur for it (the bug PR 00b fixes). | every PR that adds glass | Prefixed declaration first, always. Gate on the built CSS: the count of `-webkit-backdrop-filter:...;backdrop-filter:...` pairs equals the number of glass rules. The harness's blur count is the second check. |
| R14 | The desktop baseline captures in `.impeccable/review/` were taken without blur (headless Chromium, pre-00b). Every "1440 identical to baseline" gate would fail against them once 00b lands. | PRs 01 to 11 | PR 00b stores a post-fix 1440 set as `.impeccable/review/desktop-after-00b/`; the gates compare against that. |

## 9. Budget notes

- Documents are written so a session can implement without re-reading the codebase: file paths, selectors and values are exact. Trust them; re-derive only when the build or the gate disagrees.
- The harness prints the numbers. Do not hand-measure with ad-hoc scripts; extend the harness if a PR needs a new number and commit the extension.
- `DESIGN.md` is regenerated once, in PR 12. Regenerating it per PR would cost more than the PRs.
- Two verification rounds per PR, then stop and ship (Impeccable's bounded-pass rule).

## 10. Definition of done for the programme

All twelve PRs merged; the targets table in `README.md` met at 390 and holding at 320 and 430; the real-device checklist clean on an iPhone; `DESIGN.md` regenerated and describing the phone rules as shipped; `.impeccable/review/` carrying a fresh phone set beside the desktop set; the homepage and case-study surface briefs carrying a FIRST VIEWPORT paragraph for 390x844.
