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
  /** Names into data/stack.ts, the one tool list. Supplied 2026-09-02. */
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
    /*
     * Says the true thing calmly, and turns the absence into an invitation
     * rather than an apology. It is deliberately NOT phrased as "no repo" — the
     * thing a hiring manager wants here was never in the repo anyway.
     */
    note: "The code and the company's data stay internal. The architecture and the decisions I can walk through in detail.",
    weight: 1,
    tech: [
      "Elixir",
      "Erlang/OTP",
      "Phoenix LiveView",
      "Twilio",
      "Resend",
      "Apify",
    ],
    media: [],
    /*
     * Supplied by Parth 2026-09-02.
     *
     * Deliberately carries NO percentages. His résumé bullets quote 70% / 25% /
     * 40% / 90%, and he confirmed those are estimates rather than measurements.
     * An unmeasured number is the one thing on a portfolio an interviewer is
     * guaranteed to probe, and "I estimated it" turns the strongest project on
     * the site into a credibility problem. The mechanism is more convincing
     * than the numbers were, and it is all defensible.
     */
    study: {
      problem: [
        "InstaService's operations team watched its bookings by hand. The failure that actually costs money is never the booking that errors loudly — those get noticed. It is the one that goes quiet: a provider who stops replying, a chat thread that stalls, a job drifting toward its start time with something unresolved.",
        "Nothing surfaces those. Finding them meant a person re-reading the same queue over and over, hoping to notice what had changed since the last pass — and noticing late, usually because a customer called first.",
      ],
      build: [
        "Every booking gets its own small, independent worker. It wakes on a schedule, checks the state of that one booking, decides whether anything needs attention, and goes back to sleep. Three checks run side by side for each booking: risk detection, provider tracking, and chat monitoring.",
        "The part worth explaining is where the autonomy actually comes from, because it is not a prompt-orchestration framework. It is Erlang/OTP — the runtime Elixir is built on. Each booking's worker is a supervised process: it owns its state, schedules its own next check, and if it falls over it is restarted on its own without disturbing any other booking. I tuned the supervisor's restart limits so that a single booking stuck in a crash loop cannot cascade and take the whole tree down with it.",
        "The language model is deliberately small and sits at the edge — two short JSON calls used as a classifier for the judgement calls that are awkward to write as rules, like reading whether a chat thread has gone wrong. Everything structural is the runtime, not the model: scheduling, state, retries, escalation, isolation. The system runs end to end with no API key at all; the classifier degrades and the rest carries on.",
        "When a booking crosses a threshold it escalates itself over whichever channel fits — SMS and voice through Twilio, email through Resend — so the team is told rather than having to look.",
      ],
      outcome: [
        "The queue stopped being something a person had to re-read. Bookings that were failing silently surface on their own, ranked, and the ones that need a human get escalated to one over a channel they will actually see.",
        "I have not measured that rigorously, and I would rather say so than quote a number I cannot defend — see the limitations below.",
      ],
      challenge: [
        "Deciding what the model was allowed to be responsible for. It is tempting to let it drive control flow, and that produces a system that is non-deterministic, awkward to test, and broken the moment the API is slow or down — for something whose entire job is to run unattended, that is disqualifying.",
        "Pushing every structural decision into OTP and demoting the model to a classifier at the boundary is what makes the system trustworthy: failure is local, restarts are automatic, and the worst case when the model is unavailable is that one class of judgement gets less nuanced, not that monitoring stops.",
      ],
      limitations: [
        "The impact was never formally instrumented. I know the workflow it replaced and I can describe what it does, but I did not run a controlled before-and-after, so I will not put a percentage on it. If I picked it up again that is the first thing I would build — the measurement, before any more features.",
        "The classifier is only as good as two short prompts, and it has no evaluation set behind it. I would want a labelled set of real chat threads and a regression check before trusting it with anything heavier than a nudge.",
        "The risk score's six signals are weighted by hand. They were tuned by judgement rather than fitted to outcomes, which is fine at this size and would not survive many more signals.",
      ],
    },
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
    tech: ["Python", "FastAPI", "Next.js", "TypeScript", "PostgreSQL", "OpenAI API", "PyMuPDF"],
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
    tech: ["Python", "Next.js", "OpenClaw", "NemoClaw", "Nemotron", "Supabase", "NVIDIA Brev"],
    media: [],
  },
  {
    slug: "wave-function-collapse",
    name: "Wave Function Collapse",
    label: "Procedural generation",
    tagline:
      "A tile-based map generator in Phaser and TypeScript, assembling every map from adjacency rules one cell at a time.",
    ownership: "A research probe for the Augmented Design Lab",
    href: "https://github.com/PartyD1/wave-function",
    weight: 3,
    tech: ["TypeScript", "Phaser", "HTML"],
    media: [],
  },
  {
    slug: "pewter-platformer",
    name: "Pewter Platformer",
    label: "Game AI research",
    tagline:
      "Better movement physics, plus tools that let an LLM understand them well enough to design levels that are hard but still playable.",
    /* The whole Augmented Design Lab worked on this one. Saying so is not
     * modesty — leaving it implied-solo would be the fabrication. */
    ownership: "Built with the Augmented Design Lab",
    href: "https://github.com/PartyD1/Pewter-The-Platformer",
    weight: 3,
    tech: ["TypeScript", "Phaser", "LangChain", "CSS"],
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
    tech: ["TypeScript", "MediaPipe", "CSS"],
    media: [],
  },
  {
    slug: "wordplay",
    name: "WordPlay",
    label: "Web game",
    tagline: "A Wordle recreation with full statistics and game history.",
    href: "https://github.com/PartyD1/wordplay",
    weight: 3,
    tech: ["TypeScript", "JavaScript", "Nix", "HTML"],
    media: [],
  },
];

export const bySlug = (slug: string): Project | undefined =>
  projects.find((p) => p.slug === slug);
