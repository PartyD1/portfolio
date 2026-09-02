# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Parth Doshi's personal portfolio: a statically generated multi-route site — the homepage (`/`) plus a case study per project at `/work/[slug]` (seven of them) — built with Next.js 15 App Router, React 19, TypeScript, and CSS. Tailwind v4 is installed (with shadcn, radix-ui and next-themes) — `app/globals.css` opens with `@import "tailwindcss"; @import "tw-animate-css"; @import "shadcn/tailwind.css";` — but the site itself is written in hand-authored CSS with custom properties and BEM-ish class names, not utility classes. No tests, no backend. Deploys to Vercel.

## Commands

```
npm install
npm run dev          # http://localhost:3000
npm run build        # production build + TypeScript type-check — this is the CI-equivalent gate
npm run start        # serve the production build
```

**There is no test suite and no linter.** There is no `eslint`, no `eslint-config-next` and no eslint config anywhere in the repo, so `next build` silently skips linting. The gate is `npm run build` — TypeScript type-check plus a production compile — followed by the Impeccable detector (`node .claude/skills/impeccable/scripts/detect.mjs`), which is this repo's static-analysis pass. Run both before considering a change done.

Screenshots in `.impeccable/review/` (320/390/768/1280/1366/1440 wide, both themes, fold + full page, on `/`, `/work/operations-agent` and `/work/wordplay`) were captured with `playwright-core` driving the Playwright Chromium headless shell cached in `~/Library/Caches/ms-playwright` against `next start`, with `reducedMotion: "reduce"` and a full-page scroll first so scroll-reveals have fired. Recreate that pattern for any visual verification; don't add Playwright to this project's dependencies for it.

## Architecture

**Rendering.** Everything is a server component except `components/Shell.tsx` (IntersectionObserver for the active section + `1`–`5` keyboard shortcuts, which cross routes: they scroll when the section is in this document and `router.push('/#id')` when it is not), `components/Reveal.tsx` (scroll-in rise), `components/ThemeProvider.tsx` / `components/ThemeToggle.tsx`, `components/OrbitScroller.tsx`, `components/RoleRoll.tsx` and `components/ScrollRing.tsx`. `app/page.tsx` stacks `Hero → Work → Experience → Stack → About → Contact`; `app/work/[slug]/page.tsx` generates the seven case studies via `generateStaticParams`; `app/layout.tsx` mounts the fixed gradient `Wash`, the `Shell`, and the `Footer` around it and loads Unbounded (`--font-display`) and Hanken Grotesk (`--font-body`) via `next/font/google`.

**Content is data, not JSX.** `data/projects.ts` is the single source for the seven projects; `data/stack.ts` holds the tool groups (and is the ONE tool list — there is no `data/tech.ts`); `data/experience.ts` holds employment; `data/site.ts` holds links, the résumé flag and availability. `Work.tsx` maps projects into `ProjectCard.tsx`; a project's `slug` selects its geometric SVG mark in `components/Artifact.tsx` (unknown slug → no mark, silently). To add a project you need both a data entry and a mark; the route follows automatically.

`weight: 1` is the flagship and spans the row, applied to the `Reveal` wrapper (`work__item--flagship`), not the card — the wrapper is the grid item. **Weight never changes grid span** beyond that: the gradient-edge parity assumes exactly one spanning item.

*To add a tool:* add `{ name, slug? }` to a group in `data/stack.ts`. *To add a tech icon:* give it a Simple Icons `slug` and re-run `node scripts/vendor-icons.mjs`; if no official mark exists leave the slug off and it renders as a text pill. Never hand-edit `components/tech-marks.generated.ts`.

**Blocked content ships by ABSENCE, never by placeholder.** An unwritten case-study section does not render, `tech: []` renders no row, `media: []` renders the authored mark. Nothing anywhere says "coming soon" on a case study, and nothing — tech lists, roles, dates, metrics — may be inferred.

**Styling.** All CSS lives in `app/globals.css`: tokens as custom properties on `:root`, redefined under `.dark` for the second theme, BEM-ish class names, one easing (`--ease-out`), breakpoints at 720px (hero), 760px (grid/cards/section heads), 640px (nav). **`DESIGN.md` is the written-down system** — palette roles, type ramp, spacing, motion grammar, component vocabulary, and the rules behind them (one ink, one accent, tracked caps only in a card foot, geometry not illustration, etc.). Read it before touching styles; it was generated from the built code and describes what actually ships. `.impeccable/design.json` is its machine-readable sidecar.

**Motion.** Every animation sits behind `@media (prefers-reduced-motion: no-preference)`. `Reveal` renders visible on the server and only hides elements that are below the viewport at load, so nothing flashes and reduced-motion users see the page complete.

## Product and design constraints

- `PRODUCT.md` is product truth. The parts that bite: never invent metrics, users, or testimonials; **Operations Agent has no public repo** (internship-confidential) and must not be given a link — not even a disabled one, because a disabled control implies the thing exists. The résumé is live at `public/resume.pdf`, gated by `resume.ready` in `data/site.ts` (currently `true`); that single flag switches the Contact and menu entries between an inert "coming soon" and a real download link. Never hand-wire a résumé link around the flag.
- The visual direction was **pinned by the user** to three reference screenshots in `.impeccable/references/` (Sharlee's holographic-blob portfolio leads, re-pinned 2026-09-01). **Both themes are first-class:** dark shipped 2026-09-01 as a second token set redefined under `.dark`, and a value that exists in only one theme is a bug. Don't re-propose a "console/terminal" aesthetic; that direction was explicitly superseded (history in `.impeccable/surfaces/homepage.md`).
- Every copy claim on the page traces to `PRODUCT.md`; when in doubt, soften rather than escalate ("improved", not "rebuilt").

## Before pushing

1. **Frontend changes get a polish pass first.** Any change to `app/`, `components/`, `data/`, or `DESIGN.md` runs `/polish` (the pinned shortcut for `/impeccable polish`) before it is pushed, and the findings it raises are fixed in the same push. Docs-only or config-only changes skip this.
2. **Never push onto a merged PR's branch.** Before pushing, check the current branch's PR: `gh pr view --json state,mergedAt` (or `gh pr list --head <branch> --state all`). If it is `MERGED`, do not push to that branch — create a fresh branch from `main` (`git fetch origin && git switch -c <new-branch> origin/main`, bring the changes over), push that, and open a new PR. Only an `OPEN` PR receives additional commits.
3. **Stacked PRs are allowed, but only with these guardrails.** A PR stacked on another branch is retargeted when its base merges *only if the base branch is deleted* — otherwise its commits silently miss `main` (this happened with PR #4; fixed by PR #5). "Automatically delete head branches" is now enabled on this repo, which makes GitHub retarget children automatically. On top of that:
   - Merge a stack strictly **bottom-up**; never merge a middle PR before its parent.
   - After each merge, rebase every remaining branch in the stack onto the new `main` (`git rebase origin/main`) and `git push --force-with-lease`.
   - Verify a merge actually landed before moving on: `git merge-base --is-ancestor <sha> origin/main`.
   - Each PR in a stack must leave the site coherent on its own, since it may be merged alone.
   - For unrelated work, still base on `main`.

## Animation

**Every animation in this project is designed through the `emil-design-eng` skill — load it before writing any motion code**, including the hero typewriter/roll. It supplies the decision framework (how often is it seen → should it animate at all; what purpose; which easing; how fast), the custom easing curves (the built-in CSS easings are too weak, and `ease-in` is banned), and the rules this project follows: only `transform`/`opacity` animate, nothing enters from `scale(0)`, exits are faster than entrances, transitions (not keyframes) for anything interruptible, `:active { scale(0.97) }` on every pressable element, hover effects gated behind `@media (hover: hover) and (pointer: fine)`, stagger 30–80ms, and reduced motion meaning *fewer and gentler*, not none. No motion library: CSS transitions plus WAAPI, because CSS runs off the main thread and stays smooth during hydration.

## Design workflow (Impeccable)

Design work on this repo runs through the Impeccable skill (`/impeccable <command>`; `$polish` is pinned as a shortcut). Its artifacts: `PRODUCT.md`, `DESIGN.md`, `.impeccable/surfaces/<surface>.md` (per-surface direction contracts), `.impeccable/config.json` (`buildPath: "code"` — this environment has no image generation, so comp-led builds aren't possible; don't offer that choice). After any visual change of substance, regenerate `DESIGN.md` rather than hand-editing it, so it keeps describing the real system.

Two environment quirks: the skill directories (`.claude/skills/`, `.agents/skills/`) are untracked by git, so inside a worktree call its scripts by absolute path into the main checkout while keeping cwd in the worktree; and the skill's shipped reviewer/documenter agents are Codex-only here, so substitute a fresh `general-purpose` subagent pointed at `reference/degraded/*.md`.
