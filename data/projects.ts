/**
 * The seven projects.
 *
 * Several fields below are typed and empty because the fact does not exist yet,
 * not because nobody got round to it. Those are marked BLOCKED. The rule for
 * every one of them is the same: it ships by ABSENCE. An unwritten case-study
 * section does not render, `tech: []` renders no row, `media: []` renders the
 * authored Artifact mark inside an identical frame. Nothing renders a
 * placeholder, a skeleton, or the words "coming soon" — a visible admission of
 * incompleteness is worse to a recruiter than a shorter page.
 *
 * And nothing here may be inferred. Not the tech list from the repo's language
 * bar, not the dates from the internship, not a metric from a description.
 */

export type ProjectMedia = {
  /** Absent = render the authored Artifact mark as the frame's empty state. */
  src?: string;
  alt: string;
  kind: "image" | "gif" | "diagram";
  width: number;
  height: number;
  caption?: string;
};

/**
 * The case-study body. Each field is an array of paragraphs, and each renders
 * as a section ONLY when present — see app/work/[slug]/page.tsx.
 */
export type CaseStudy = {
  problem?: string[];
  build?: string[];
  outcome?: string[];
  challenge?: string[];
  limitations?: string[];
};

export type Project = {
  slug: string;
  name: string;
  /**
   * ONE taxonomy: the domain of system. Never a role, never a date, never a
   * claim. Facts that used to live here have moved to the field that owns
   * them — `use` for third-party usage, data/experience.ts for employment.
   */
  label: string;
  tagline: string;
  description?: string;
  /**
   * Third-party usage, sourced. Somebody other than the author used the thing,
   * which is the strongest single fact on this site. Never a number that was
   * not supplied, never embellished, never softened.
   */
  use?: string;
  /** BLOCKED — no per-project role has been supplied. */
  role?: string;
  /** BLOCKED — no per-project dates have been supplied. */
  dates?: string;
  /** Who built it, when it was not solely Parth. Renders in the metadata line. */
  ownership?: string;
  /**
   * 1 = flagship. 2 is defined and currently unused. Weight NEVER changes grid
   * span — only weight 1 spans a row — because the gradient-edge parity math
   * depends on exactly one spanning item. Weight 2 changes type scale and media
   * aspect only.
   */
  weight: 1 | 2 | 3;
  /** Slugs into data/stack.ts. BLOCKED: [] until Parth supplies the mapping. */
  tech: string[];
  /** BLOCKED — no screenshots or diagrams supplied yet. */
  media: ProjectMedia[];
  /** Public repo. Absent on operations-agent, permanently. */
  href?: string;
  /** BLOCKED — no project has a confirmed live URL. */
  demo?: string;
  note?: string;
  /** BLOCKED — the prose. Absent sections do not render. */
  study?: CaseStudy;
};

export const projects: Project[] = [
  {
    slug: "operations-agent",
    name: "Operations Agent",
    label: "Agentic operations",
    tagline: "An agentic workflow that keeps a company's bookings healthy.",
    description:
      "Built with a partner for the operations team. It manages bookings, autonomously flags the ones that need attention, and works on fixing them — so the team spends its time on the exceptions, not the queue.",
    ownership: "Built with a partner",
    note: "Internal to the company, so there's no public repo.",
    weight: 1,
    tech: [],
    media: [],
  },
  {
    slug: "scorely-ai",
    name: "ScorelyAI",
    label: "AI evaluation",
    tagline:
      "An AI, rubric-based evaluator for DECA reports — high-school competitors use it to get feedback on their written work.",
    use: "In use by DECA competitors",
    href: "https://github.com/PartyD1/scorely-ai",
    weight: 3,
    tech: [],
    media: [],
  },
  {
    slug: "santaclaws",
    name: "SantaClaws",
    label: "Agentic lead generation",
    tagline:
      "OpenClaw agents that find small businesses with a missing or outdated website, then autonomously build them a mockup.",
    href: "https://github.com/PartyD1/santaclaws",
    weight: 3,
    tech: [],
    media: [],
  },
  {
    slug: "wave-function-collapse",
    name: "Wave Function Collapse",
    label: "Procedural generation",
    tagline:
      "A tile-based map generator in Phaser and JavaScript, assembling every map from adjacency rules one cell at a time.",
    href: "https://github.com/PartyD1/wave-function",
    weight: 3,
    tech: [],
    media: [],
  },
  {
    slug: "pewter-platformer",
    name: "Pewter Platformer",
    label: "Game AI research",
    tagline:
      "Better movement physics, plus tools that let an LLM understand them well enough to design levels that are hard but still playable.",
    href: "https://github.com/PartyD1/Pewter-The-Platformer",
    weight: 3,
    tech: [],
    media: [],
  },
  {
    slug: "gestura",
    name: "Gestura",
    label: "Assistive tech",
    tagline:
      "A browser music player controlled entirely by hand shapes and movement, built for people with motor impairments.",
    href: "https://github.com/PartyD1/gestura",
    weight: 3,
    tech: [],
    media: [],
  },
  {
    slug: "wordplay",
    name: "WordPlay",
    label: "Web game",
    tagline: "A Wordle recreation with full statistics and game history.",
    href: "https://github.com/PartyD1/wordplay",
    weight: 3,
    tech: [],
    media: [],
  },
];

export const bySlug = (slug: string): Project | undefined =>
  projects.find((p) => p.slug === slug);
