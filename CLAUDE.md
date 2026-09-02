# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Parth Doshi's personal portfolio: a single static page (`/`) built with Next.js 15 App Router, React 19, TypeScript, and plain CSS. No Tailwind, no CSS modules, no tests, no backend. Deploys to Vercel.

## Commands

```
npm install
npm run dev          # http://localhost:3000
npm run build        # production build; also runs the type check and lint — this is the CI-equivalent gate
npm run lint         # next lint on its own
npm run start        # serve the production build
```

There is no test suite. "Does it build" is the check; run `npm run build` before considering a change done.

Screenshots in `.impeccable/review/` (1440 and 390 wide, fold + full page) were captured with `playwright-core` driving the Playwright Chromium headless shell cached in `~/Library/Caches/ms-playwright` against `next start`, with `reducedMotion: "reduce"` and a full-page scroll first so scroll-reveals have fired. Recreate that pattern for any visual verification; don't add Playwright to this project's dependencies for it.

## Architecture

**Rendering.** Everything is a server component except `components/Nav.tsx` (IntersectionObserver for the active section + `1`/`2`/`3` keyboard shortcuts) and `components/Reveal.tsx` (scroll-in rise). `app/page.tsx` just stacks `Hero → Work → About → Contact`; `app/layout.tsx` mounts the fixed gradient `Wash`, the `Nav`, and the `Footer` around it and loads Gabarito via `next/font/google` as `--font-gabarito`.

**Content is data, not JSX.** `data/projects.ts` is the single source for the seven projects and the contact links. `Work.tsx` maps it into `ProjectCard.tsx`; a project's `slug` selects its geometric SVG mark in `components/Artifact.tsx` (unknown slug → no mark, silently). To add a project you need both a data entry and a mark. Card colors come from `tone` and cycle through exactly four values (`lavender | mint | butter | peach`); `flagship: true` switches to the full-width two-column variant, and the spanning is applied to the `Reveal` wrapper (`work__item--flagship`), not the card — the wrapper is the grid item.

**Styling.** All CSS lives in `app/globals.css`: tokens as custom properties on `:root`, BEM-ish class names, one easing (`--ease-out`), breakpoints at 720px (hero), 760px (grid/cards/section heads), 640px (nav). **`DESIGN.md` is the written-down system** — palette roles, type ramp, spacing, motion grammar, component vocabulary, and the rules behind them (one ink, four rotating tones, tracked caps only in a card foot, geometry not illustration, etc.). Read it before touching styles; it was generated from the built code and describes what actually ships. `.impeccable/design.json` is its machine-readable sidecar.

**Motion.** Every animation sits behind `@media (prefers-reduced-motion: no-preference)`. `Reveal` renders visible on the server and only hides elements that are below the viewport at load, so nothing flashes and reduced-motion users see the page complete.

## Product and design constraints

- `PRODUCT.md` is product truth. The parts that bite: never invent metrics, users, or testimonials; **Operations Agent has no public repo** (internship-confidential) and must not be given a link; the resume PDF has not been supplied — don't render a resume link until it exists.
- The visual direction was **pinned by the user** to three reference screenshots in `.impeccable/references/` (Seán's warm-gradient, rounded-type portfolio leads). Light theme only. Don't re-propose a dark or "console/terminal" aesthetic; that direction was explicitly superseded (history in `.impeccable/surfaces/homepage.md`).
- Every copy claim on the page traces to `PRODUCT.md`; when in doubt, soften rather than escalate ("improved", not "rebuilt").

## Design workflow (Impeccable)

Design work on this repo runs through the Impeccable skill (`/impeccable <command>`; `$polish` is pinned as a shortcut). Its artifacts: `PRODUCT.md`, `DESIGN.md`, `.impeccable/surfaces/<surface>.md` (per-surface direction contracts), `.impeccable/config.json` (`buildPath: "code"` — this environment has no image generation, so comp-led builds aren't possible; don't offer that choice). After any visual change of substance, regenerate `DESIGN.md` rather than hand-editing it, so it keeps describing the real system.

Two environment quirks: the skill directories (`.claude/skills/`, `.agents/skills/`) are untracked by git, so inside a worktree call its scripts by absolute path into the main checkout while keeping cwd in the worktree; and the skill's shipped reviewer/documenter agents are Codex-only here, so substitute a fresh `general-purpose` subagent pointed at `reference/degraded/*.md`.
