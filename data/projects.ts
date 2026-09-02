export type Project = {
  slug: string;
  name: string;
  /** Small tracked-caps label on the card. Must stay factual. */
  label: string;
  tagline: string;
  description?: string;
  href?: string;
  note?: string;
  flagship?: boolean;
};

export const projects: Project[] = [
  {
    slug: "operations-agent",
    name: "Operations Agent",
    label: "Internship · Summer 2026",
    tagline: "An agentic workflow that keeps a company's bookings healthy.",
    description:
      "Built with a partner for the operations team. It manages bookings, autonomously flags the ones that need attention, and works on fixing them — so the team spends its time on the exceptions, not the queue.",
    note: "Internal to the company, so there's no public repo.",
    flagship: true,
  },
  {
    slug: "scorely-ai",
    name: "ScorelyAI",
    label: "In use by DECA competitors",
    tagline:
      "An AI, rubric-based evaluator for DECA reports — high-school competitors use it to get feedback on their written work.",
    href: "https://github.com/PartyD1/scorely-ai",
  },
  {
    slug: "santaclaws",
    name: "SantaClaws",
    label: "Agentic lead generation",
    tagline:
      "OpenClaw agents that find small businesses with a missing or outdated website, then autonomously build them a mockup.",
    href: "https://github.com/PartyD1/santaclaws",
  },
  {
    slug: "wave-function-collapse",
    name: "Wave Function Collapse",
    label: "Procedural generation",
    tagline:
      "A tile-based map generator in Phaser and JavaScript, assembling every map from adjacency rules one cell at a time.",
    href: "https://github.com/PartyD1/wave-function",
  },
  {
    slug: "pewter-platformer",
    name: "Pewter Platformer",
    label: "Research lab",
    tagline:
      "Better movement physics, plus tools that let an LLM understand them well enough to design levels that are hard but still playable.",
    href: "https://github.com/PartyD1/Pewter-The-Platformer",
  },
  {
    slug: "gestura",
    name: "Gestura",
    label: "Assistive tech",
    tagline:
      "A browser music player controlled entirely by hand shapes and movement, built for people with motor impairments.",
    href: "https://github.com/PartyD1/gestura",
  },
  {
    slug: "wordplay",
    name: "WordPlay",
    label: "Full stack",
    tagline: "A Wordle recreation with full statistics and game history.",
    href: "https://github.com/PartyD1/wordplay",
  },
];

export const links = {
  email: "pmdoshi@ucsc.edu",
  github: "https://github.com/PartyD1",
  linkedin: "https://www.linkedin.com/in/parthmdoshi/",
};
