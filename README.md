<!-- Back to top link -->
<a id="readme-top"></a>

<!-- PROJECT SHIELDS -->
[![Contributors][contributors-shield]][contributors-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]

<br />
<div align="center">

  <img src="app/icon.svg" alt="PD" height="60">

  <h3 align="center">Parth Doshi</h3>

  <p align="center">
    My portfolio: six projects, each with its own case study, plus experience, about, and contact.
    <br />
    <br />
    <!-- TODO: point at the production domain once it's settled -->
    <a href="https://github.com/PartyD1/portfolio">View Live Site</a>
    &middot;
    <a href="https://github.com/PartyD1/portfolio/issues/new?labels=bug&template=bug-report---.md">Report Bug</a>
    &middot;
    <a href="https://github.com/PartyD1/portfolio/issues/new?labels=enhancement&template=feature-request---.md">Request Feature</a>
  </p>
</div>

---

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li><a href="#about-the-project">About the Project</a></li>
    <li><a href="#features">Features</a></li>
    <li><a href="#featured-projects">Featured Projects</a></li>
    <li><a href="#built-with">Built With</a></li>
    <li><a href="#how-it-works">How It Works</a></li>
    <li><a href="#content-model">Content Model</a></li>
    <li><a href="#project-structure">Project Structure</a></li>
    <li><a href="#running-locally">Running Locally</a></li>
    <li><a href="#adding-a-project">Adding a Project</a></li>
    <li><a href="#troubleshooting">Troubleshooting</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

---

<!-- ABOUT THE PROJECT -->
## About the Project

This is my personal portfolio. The homepage runs top to bottom as **Hero → Work → Experience → About → Contact**, and each project links out to its own case study at `/work/[slug]`.

Everything is statically generated with the Next.js App Router. There's no backend, and all copy lives in typed data files under `data/`, so updating content never means editing JSX.

The site has two full themes. Light and dark each get their own complete set of tokens, and the site follows the OS setting by default. It has been tuned separately for phones, and all motion is built on CSS transitions and the Web Animations API (WAAPI), without a motion library.

<!-- TODO: add the production URL -->
**Live:** deployed on Vercel

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

<!-- FEATURES -->
## Features

- **Case study per project:** `/work/[slug]` pages generated with `generateStaticParams`, with a flow diagram, sections, and a screenshot slideshow
- **Content as data:** projects, tools, experience, and site links each live in exactly one typed file
- **Blocked content ships by absence:** unwritten sections, empty tech lists, and missing media simply don't render. The site never shows "coming soon" placeholders
- **Light & dark themes:** both are first-class, and the theme toggle keeps the browser's `theme-color` in sync
- **Phone-first pass:** one 760px breakpoint, a bottom-sheet menu, safe-area handling, a 14px text floor, and `:active` press feedback on every pressable element
- **Motion that respects the user:** scroll reveals, a pointer spotlight, tilting cards, and a typewriter headline, all behind `prefers-reduced-motion`. Hover effects only apply on devices with a fine pointer
- **Keyboard shortcuts:** `1`–`4` jump between sections, including from a case study back to the homepage
- **Link previews:** generated Open Graph images for the homepage and every case study
- **Résumé toggle:** one flag in `data/site.ts` switches between a real `resume.pdf` download and an inert pending state
- **Copy email:** one-click clipboard copy next to the address in Contact

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

<!-- FEATURED PROJECTS -->
## Featured Projects

| Project | What it is | Links |
|---|---|---|
| **Operations Agent** | An agentic workflow that keeps a company's bookings healthy (internship work) | Case study only |
| **ScorelyAI** | AI, rubric-based feedback on DECA written reports | [Live](https://scorelyai.app) · [Repo](https://github.com/PartyD1/scorely-ai) |
| **Santa Claws** | Five agents that find small businesses with weak websites, build a mockup, and write the pitch | [Repo](https://github.com/PartyD1/santaclaws) |
| **Pewter Platformer** | Better platformer physics, plus tools that let an LLM design levels that are hard but still playable | [Repo](https://github.com/PartyD1/Pewter-The-Platformer) |
| **Gestura** | A browser music player controlled entirely by hand gestures, built for people with motor impairments | [Repo](https://github.com/PartyD1/gestura) |
| **WordPlay** | A Wordle recreation with full statistics and game history | [Repo](https://github.com/PartyD1/wordplay) |

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

<!-- TECH STACK -->
## Built With

[![Next.js][Next.js-badge]][Next-url]
[![React][React-badge]][React-url]
[![TypeScript][TypeScript-badge]][TypeScript-url]
[![TailwindCSS][Tailwind-badge]][Tailwind-url]
[![shadcn/ui][shadcn-badge]][shadcn-url]
[![Vercel][Vercel-badge]][Vercel-url]

Tailwind v4 and shadcn are installed, but the site itself is styled in hand-authored CSS (`app/globals.css`) with custom properties and BEM-style class names. Fonts are Unbounded (display) and Hanken Grotesk (body) via `next/font/google`.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

<!-- HOW IT WORKS -->
## How It Works

```
data/*.ts  ->  Server components render sections  ->  generateStaticParams builds /work/[slug]  ->  Static HTML on Vercel  ->  Small client islands add motion + interaction
```

1. `app/layout.tsx` mounts the fixed gradient `Wash`, the `Shell` (menu + keyboard shortcuts), and the `Footer`, and loads the fonts
2. `app/page.tsx` stacks `Hero`, `Work`, `Experience`, `About`, and `Contact`, all server components reading from `data/`
3. `Work` maps `data/projects.ts` into `ProjectCard`s. The `weight: 1` project is the flagship and spans the full row
4. `app/work/[slug]/page.tsx` generates one static page per project. Case-study sections render only when their data exists
5. `opengraph-image.tsx` routes render share images, with `metadataBase` resolved from Vercel's environment variables
6. Client components handle the interactive parts only: `Reveal`, `Spotlight`, `TiltCard`, `FlowGlow`, `Slideshow`, `ThemeToggle`, `CopyEmail`, and a few others

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

<!-- CONTENT MODEL -->
## Content Model

| File | Owns |
|---|---|
| `data/projects.ts` | The six projects: name, tagline, label, weight, tech, media, repo/demo links, and case-study sections |
| `data/stack.ts` | The one tool list, grouped. Project `tech` entries are names from here |
| `data/experience.ts` | Employment timeline |
| `data/site.ts` | Contact links, the résumé flag, and availability (focus, graduation, location, what I'm seeking) |

Fields marked optional (`role`, `dates`, `use`, `study`, …) render only when present.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

<!-- PROJECT STRUCTURE -->
## Project Structure

```
portfolio/
├── app/
│   ├── layout.tsx                    # Wash, Shell, Footer, fonts, metadata
│   ├── page.tsx                      # Hero → Work → Experience → About → Contact
│   ├── work/[slug]/page.tsx          # Case study per project (static params)
│   ├── work/[slug]/opengraph-image.tsx
│   ├── opengraph-image.tsx           # Homepage share image
│   ├── not-found.tsx                 # 404
│   ├── icon.svg                      # PD favicon
│   └── globals.css                   # All styling: tokens, both themes, components
│
├── components/
│   ├── Hero.tsx / RoleRoll.tsx       # Headline + typewriter role roll
│   ├── Work.tsx / ProjectCard.tsx    # Project grid and cards
│   ├── TiltCard.tsx                  # Pointer-driven card tilt
│   ├── Artifact.tsx                  # Geometric SVG mark per project slug
│   ├── CaseStudyHeader.tsx           # Case-study title, tools, links
│   ├── CaseStudySection.tsx          # One case-study section
│   ├── Flow.tsx / FlowGlow.tsx       # Case-study flow diagram + hover glow
│   ├── Slideshow.tsx                 # Screenshot carousel + full-size dialog
│   ├── Experience.tsx / About.tsx / Contact.tsx
│   ├── Shell.tsx                     # Menu sheet + 1–4 keyboard shortcuts
│   ├── Wash.tsx / Blob.tsx / Spotlight.tsx   # Gradient background + pointer glow
│   ├── Reveal.tsx / ScrollScrub.tsx / ScrollRing.tsx  # Scroll motion
│   ├── ThemeProvider.tsx / ThemeToggle.tsx
│   ├── TechMark.tsx                  # Tool icons (Simple Icons, vendored)
│   ├── tech-marks.generated.ts       # Generated. Don't hand-edit
│   └── ui/                           # shadcn primitives
│
├── data/
│   ├── projects.ts                   # Projects + case studies
│   ├── stack.ts                      # Tool groups
│   ├── experience.ts                 # Timeline
│   └── site.ts                       # Links, résumé flag, availability
│
├── public/
│   ├── resume.pdf
│   ├── textures/grain.png
│   └── work/                         # Case-study screenshots
│
├── scripts/
│   ├── vendor-icons.mjs              # Regenerates tech-marks.generated.ts
│   ├── make-grain.mjs                # Generates the grain texture
│   ├── mobile-capture.mjs            # Phone screenshot harness (Playwright)
│   └── mobile-contrast.mjs           # Measures contrast on phone captures
│
├── DESIGN.md                         # The design system as built
├── PRODUCT.md                        # Product truth: what the copy may claim
└── CLAUDE.md                         # Contributor/agent guide
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

<!-- INSTALLATION -->
## Running Locally

**Prerequisites:** Node.js 18.18+ (Next.js 15's minimum)

```
git clone https://github.com/PartyD1/portfolio.git
cd portfolio
```
```
npm install
```
```
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). No environment variables are needed locally.

To check a change, run a production build. It also runs the TypeScript type-check. There is no test suite or linter.

```
npm run build && npm run start
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

<!-- ADDING A PROJECT -->
## Adding a Project

1. Add an entry to `data/projects.ts`. The `/work/[slug]` route is generated automatically:

```ts
{
  slug: "my-project",
  name: "My Project",
  label: "Web game",
  tagline: "One sentence on what it is.",
  weight: 3,                // 1 = flagship (only one), 3 = standard
  tech: ["Next.js", "TypeScript"],  // names from data/stack.ts
  media: [],                // empty = no screenshot band
  href: "https://github.com/PartyD1/my-project",
}
```

2. Give the slug a geometric mark in `components/Artifact.tsx`. A slug without a mark silently renders no mark.

**To add a tool:** add `{ name, slug? }` to a group in `data/stack.ts`. If it has a [Simple Icons](https://simpleicons.org) slug, regenerate the icons:

```
node scripts/vendor-icons.mjs
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

<!-- TROUBLESHOOTING -->
## Troubleshooting

**Port already in use**
```
npm run dev -- -p 3001
```

**Stale build errors**
```
rm -rf .next
```

**A new phone style doesn't apply**
Phone rules live in the `@media (max-width: 760px)` blocks in `app/globals.css`. Rules of equal specificity resolve by source order, so a new rule has to come *after* every base rule it overrides.

**A tool icon is missing**
Check that the tool has a Simple Icons `slug` in `data/stack.ts`, then re-run `node scripts/vendor-icons.mjs`. Tools without an official mark render as text pills.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

<!-- LICENSE -->
## License

Private repository, not licensed for external use.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

<!-- CONTACT -->
## Contact

**Parth Doshi**

[![LinkedIn][linkedin-shield]][linkedin-url]
[![GitHub][github-shield]][github-url]

Email: [pmdoshi@ucsc.edu](mailto:pmdoshi@ucsc.edu)

Project: [https://github.com/PartyD1/portfolio](https://github.com/PartyD1/portfolio)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

- [Best-README-Template](https://github.com/othneildrew/Best-README-Template) for this README's layout
- [Simple Icons](https://simpleicons.org) for the tool marks
- [shadcn/ui](https://ui.shadcn.com) and [Radix](https://www.radix-ui.com) for UI primitives
- [Unbounded](https://fonts.google.com/specimen/Unbounded) and [Hanken Grotesk](https://fonts.google.com/specimen/Hanken+Grotesk) via Google Fonts
- [Emil Kowalski](https://emilkowal.ski) for the animation principles the motion follows

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

<!-- MARKDOWN LINKS -->
[contributors-shield]: https://img.shields.io/github/contributors/PartyD1/portfolio.svg?style=for-the-badge
[contributors-url]: https://github.com/PartyD1/portfolio/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/PartyD1/portfolio.svg?style=for-the-badge
[forks-url]: https://github.com/PartyD1/portfolio/network/members
[stars-shield]: https://img.shields.io/github/stars/PartyD1/portfolio.svg?style=for-the-badge
[stars-url]: https://github.com/PartyD1/portfolio/stargazers
[issues-shield]: https://img.shields.io/github/issues/PartyD1/portfolio.svg?style=for-the-badge
[issues-url]: https://github.com/PartyD1/portfolio/issues

[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/parthmdoshi/
[github-shield]: https://img.shields.io/badge/-GitHub-black.svg?style=for-the-badge&logo=github&colorB=555
[github-url]: https://github.com/PartyD1

[Next.js-badge]: https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React-badge]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://react.dev/
[TypeScript-badge]: https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white
[TypeScript-url]: https://www.typescriptlang.org/
[Tailwind-badge]: https://img.shields.io/badge/TailwindCSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white
[Tailwind-url]: https://tailwindcss.com/
[shadcn-badge]: https://img.shields.io/badge/shadcn%2Fui-000000?style=for-the-badge&logo=shadcnui&logoColor=white
[shadcn-url]: https://ui.shadcn.com/
[Vercel-badge]: https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white
[Vercel-url]: https://vercel.com/
