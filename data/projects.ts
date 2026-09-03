/**
 * The seven projects.
 *
 * Several fields below are typed and empty because the fact does not exist yet,
 * not because nobody got round to it. Those are marked BLOCKED. The rule for
 * every one of them is the same: it ships by ABSENCE. An unwritten case-study
 * section does not render, `tech: []` renders no row, `media: []` renders no
 * slideshow at all. Nothing renders a placeholder, a skeleton, or the words
 * "coming soon": a visible admission of incompleteness is worse to a recruiter
 * than a shorter page.
 *
 * And nothing here may be inferred. Not the tech list from the repo's language
 * bar, not the dates from the internship, not a metric from a description.
 *
 * A case study is VISUAL FIRST (Parth, 2026-09-02): a flow diagram, then
 * short bullets, then the screenshots as a slideshow at the foot (moved there
 * 2026-09-03). Nobody is reading an essay about a student project. Every
 * bullet below was cut down from prose Parth supplied or from the project's
 * own README; none says anything its source did not.
 */

export type ProjectMedia = {
  src: string;
  alt: string;
  kind: "image" | "gif" | "diagram";
  width: number;
  height: number;
  caption?: string;
};

/**
 * One node in the flow diagram. `branches` renders as a fan of parallel
 * sub-nodes under the title (three checks, five gestures, three channels).
 */
export type FlowStep = {
  title: string;
  detail?: string;
  branches?: string[];
};

export type Flow = {
  steps: FlowStep[];
  /** The thing underneath the whole chain: the runtime, the queue, the rule. */
  bus?: { title: string; detail?: string };
};

/**
 * The case-study body. Each field is an array of short bullets, and each
 * renders as a section ONLY when present. See app/work/[slug]/page.tsx.
 */
export type CaseStudy = {
  flow?: Flow;
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
   * them: `use` for third-party usage, data/experience.ts for employment.
   */
  label: string;
  /**
   * Replaces the project NAME in the card headline when the ENGAGEMENT is the
   * stronger fact. A paid summer internship is what a recruiter scans a card
   * for, and it outranks any title a self-directed project can carry. The
   * organisation printed under it is NOT typed here: it comes from the
   * matching data/experience.ts row, so the company is spelled in one place
   * and the card cannot drift from the timeline. The project keeps its real
   * `name` everywhere else, case study included.
   */
  cardHeadline?: string;
  tagline: string;
  /**
   * Third-party usage, sourced. Somebody other than the author used the thing,
   * which is the strongest single fact on this site. Never a number that was
   * not supplied, never embellished, never softened.
   */
  use?: string;
  /** BLOCKED: no per-project role has been supplied. */
  role?: string;
  /** BLOCKED: no per-project dates have been supplied. */
  dates?: string;
  /** Who built it, when it was not solely Parth. Renders in the metadata line. */
  ownership?: string;
  /**
   * 1 = flagship. 2 is defined and currently unused. Weight NEVER changes grid
   * span (only weight 1 spans a row) because the gradient-edge parity math
   * depends on exactly one spanning item. Weight 2 changes type scale and media
   * aspect only.
   */
  weight: 1 | 2 | 3;
  /** Names into data/stack.ts, the one tool list. Supplied 2026-09-02. */
  tech: string[];
  /** Screenshots. Empty = no media band; never a stand-in. */
  media: ProjectMedia[];
  /** Public repo. Absent on operations-agent, permanently. */
  href?: string;
  /**
   * A live, publicly usable deployment. The strongest single affordance on
   * the site, because it lets a visitor USE the work instead of reading about
   * it, so it leads the case-study header and the card foot. Only ScorelyAI
   * has one so far.
   */
  demo?: string;
  /** One calm sentence for the case-study header. Never an apology. */
  note?: string;
  /** BLOCKED where absent. Absent sections do not render. */
  study?: CaseStudy;
};

export const projects: Project[] = [
  {
    slug: "operations-agent",
    name: "Operations Agent",
    label: "Agentic operations",
    cardHeadline: "Summer 2026 Internship",
    tagline: "An agentic workflow that keeps a company's bookings healthy.",
    ownership: "Built with a partner",
    /*
     * Says the true thing calmly, and turns the absence into an invitation
     * rather than an apology. It is deliberately NOT phrased as "no repo";
     * the thing a hiring manager wants here was never in the repo anyway.
     */
    note: "The code and the company's data stay internal. The architecture and the decisions I can walk through in detail.",
    weight: 1,
    tech: ["Elixir", "Erlang/OTP", "Phoenix LiveView", "Twilio", "Resend"],
    media: [],
    /*
     * Supplied by Parth 2026-09-02.
     *
     * Deliberately carries NO percentages. His resume bullets quote 70% / 25% /
     * 40% / 90%, and he confirmed those are estimates rather than measurements.
     * An unmeasured number is the one thing on a portfolio an interviewer is
     * guaranteed to probe. The mechanism is more convincing than the numbers
     * were, and it is all defensible.
     */
    study: {
      flow: {
        steps: [
          { title: "A booking", detail: "Gets its own small, independent worker" },
          {
            title: "Wakes on a schedule",
            detail: "Checks that one booking, then goes back to sleep",
          },
          {
            title: "Three checks, side by side",
            branches: ["Risk detection", "Provider tracking", "Chat monitoring"],
          },
          {
            title: "A small model at the edge",
            detail: "Two short JSON calls classify the awkward judgement calls",
          },
          {
            title: "Crosses a threshold",
            detail: "Escalates itself over whichever channel fits",
            branches: ["SMS", "Voice", "Email"],
          },
        ],
        bus: {
          title: "Erlang/OTP underneath",
          detail:
            "Every worker is a supervised process. It owns its state, schedules its own next check, and restarts alone if it crashes.",
        },
      },
      problem: [
        "The operations team watched bookings by hand, and the failures that cost money were the quiet ones: a provider who stops replying, a chat thread that stalls, a job drifting toward its start time with something unresolved.",
        "Finding them meant re-reading the same queue over and over, and noticing late, usually because a customer called first.",
      ],
      build: [
        "One small worker per booking. It wakes on a schedule, checks the state of that booking, decides whether anything needs attention, and sleeps.",
        "The autonomy is Erlang/OTP, not a prompt framework. Each worker is a supervised process, and the supervisor's restart limits are tuned so one booking stuck in a crash loop cannot take the tree down.",
        "The language model is small and sits at the edge, as a classifier. Scheduling, state, retries, escalation and isolation are all the runtime. The system runs end to end with no API key at all.",
        "Past a threshold, a booking escalates itself: SMS and voice through Twilio, email through Resend.",
      ],
      outcome: [
        "The queue stopped being something a person had to re-read. Silently failing bookings surface on their own, ranked, and the ones that need a human reach one.",
        "Not measured rigorously, and I would rather say so than quote a number I cannot defend.",
      ],
      challenge: [
        "Deciding what the model was allowed to be responsible for. Letting it drive control flow produces a system that is non-deterministic, hard to test, and broken the moment the API is slow. For something that runs unattended, that is disqualifying.",
        "Every structural decision went into OTP and the model became a classifier at the boundary. Failure is local, restarts are automatic, and an unavailable model costs nuance, not monitoring.",
      ],
      limitations: [
        "The impact was never formally instrumented. No controlled before-and-after, so no percentage. If I picked it up again, the measurement comes before any more features.",
        "The classifier is two short prompts with no evaluation set behind it.",
        "The risk score's six signals are weighted by hand, which is fine at this size and would not survive many more signals.",
      ],
    },
  },
  {
    slug: "scorely-ai",
    name: "ScorelyAI",
    label: "AI evaluation",
    tagline:
      "An AI, rubric-based evaluator for DECA reports. High-school competitors use it to get feedback on their written work.",
    use: "In use by DECA competitors",
    href: "https://github.com/PartyD1/scorely-ai",
    demo: "https://scorelyai.app",
    weight: 3,
    tech: ["Python", "FastAPI", "Next.js", "TypeScript", "Tailwind", "PostgreSQL"],
    media: [
      {
        src: "/work/scorely-ai/home.png",
        alt: "The ScorelyAI landing page: Audit your DECA report, with a Start Audit button.",
        kind: "image",
        width: 1600,
        height: 629,
        caption: "Upload a report, pick the event, get a score in under twenty seconds.",
      },
      {
        src: "/work/scorely-ai/audit.png",
        alt: "A completed ScorelyAI audit: an overall score, a section breakdown with per-section scores, and a DECA penalty checklist.",
        kind: "image",
        width: 1133,
        height: 1600,
        caption: "A finished audit: section scores against the official rubric, then the penalty checklist.",
      },
    ],
    study: {
      flow: {
        steps: [
          { title: "Upload a PDF", detail: "And pick the event" },
          {
            title: "Graded asynchronously",
            detail: "The upload returns a job ID and the frontend polls",
          },
          {
            title: "Rubric injected",
            detail: "That event's official rubric and required outline go into the prompt",
          },
          {
            title: "Two kinds of check",
            branches: ["Schema-validated JSON score", "Key pages checked visually"],
          },
          {
            title: "Section scores",
            detail: "Comments per section, then the penalty checklist",
          },
        ],
        bus: {
          title: "Sixteen events, three clusters",
          detail: "Each with its own rubric and its own document outline, so a missing section is penalised rather than ignored.",
        },
      },
      problem: [
        "A DECA report is graded against a published rubric, but a competitor only finds out how they did after the competition. Between drafts there is no feedback loop.",
        "The rubric is public and the scoring is structured. That makes it a grading problem with an answer key.",
      ],
      build: [
        "Upload a PDF, pick the event, get a section-by-section score with comments against that event's official rubric.",
        "Grading is asynchronous: a job ID comes back immediately and the frontend polls, because a synchronous request for a forty-page document times out.",
        "Scores come back as schema-validated JSON through structured outputs, so a malformed response is a caught error rather than a plausible wrong score.",
        "Key pages are rendered as images and checked visually, for the things text extraction misses: whether the Statement of Assurances is actually signed, whether the document looks presentable.",
        "The page-count penalty only exempts a title page, table of contents or Statement of Assurances when that page was actually detected.",
      ],
      outcome: [
        "Live at scorelyai.app, and high-school DECA competitors use it on drafts before they submit.",
        "Signed-in users keep a history per event, so a second draft can be compared against the first.",
      ],
      challenge: [
        "Making the output trustworthy enough to show someone a number. A confident score for a half-understood rubric is worse than no score.",
        "So the model gets as little room as possible: rubric and outline injected rather than recalled, response schema-validated rather than parsed, page counts and signature detection computed separately and merged in.",
      ],
      limitations: [
        "Documents over 25,000 tokens are truncated, with a warning. A long report is graded on part of itself.",
        "No evaluation set. Scores have never been compared against real judge scores on the same documents.",
        "History is capped at five submissions per user per event.",
      ],
    },
  },
  {
    /* Two words, per the project's own README (2026-09-03). */
    slug: "santaclaws",
    name: "Santa Claws",
    label: "Agentic lead generation",
    tagline:
      "Five agents that find small businesses with a weak or missing website, build them a mockup, deploy it, and write the pitch that links to it.",
    href: "https://github.com/PartyD1/santaclaws",
    weight: 3,
    ownership: "A 24-hour hackathon, built with a team",
    tech: [
      "Python",
      "Next.js",
      "TypeScript",
      "OpenClaw",
      "Supabase",
      "PostgreSQL",
      "Resend",
      "Discord",
      "Docker",
      "Vercel",
      "NVIDIA Brev",
    ],
    media: [
      {
        src: "/work/santaclaws/dashboard.png",
        alt: "The Santa Claws dashboard: four agent cards named Rudolph Scout, Workshop Elves, Snowball Pitcher and Cookie Closer, all active, above a row of live counts.",
        kind: "image",
        width: 1600,
        height: 812,
        caption: "The workshop: four agents, each owning one stage, with live counts from Supabase.",
      },
      {
        src: "/work/santaclaws/mockup.png",
        alt: "A landscaping company website generated and deployed by the Designer agent.",
        kind: "image",
        width: 1600,
        height: 956,
        caption: "A site Designer built and deployed for a lead, before Pitcher wrote the email.",
      },
      {
        src: "/work/santaclaws/leads.png",
        alt: "The nice-list leads table with scores and statuses beside the workshop activity log.",
        kind: "image",
        width: 892,
        height: 1600,
        caption: "Every lead, its score, and which agent has it, next to the audit log.",
      },
    ],
    study: {
      flow: {
        steps: [
          {
            title: "Scout",
            detail:
              "Finds local businesses, scores their site, qualifies the email-ready ones",
          },
          {
            title: "Designer",
            detail:
              "Builds mockup variants, critiques them, deploys the winner to Vercel",
          },
          {
            title: "Pitcher",
            detail: "Drafts several angles around that exact deployed URL",
          },
          {
            title: "Approved, then sent",
            branches: ["Approve, skip or edit in Discord", "Or autonomous mode"],
          },
          {
            title: "Closer",
            detail: "Classifies replies and moves warm leads toward a meeting",
          },
        ],
        bus: {
          title: "Supabase is the queue, the memory and the audit log",
          detail:
            "The agents never call each other. Each claw is a heartbeat on a fixed interval: it claims one row, runs a tool, writes the result, logs the action, and sleeps until the next tick.",
        },
      },
      problem: [
        "A small business with no website, or a visibly outdated one, is an easy lead to describe and a slow one to act on. Finding them, judging them, building something to show, and writing an email that is not obviously a template are four jobs, and doing all four by hand is why the lead never gets contacted.",
      ],
      build: [
        "Five claws, one stage each: Scout finds and qualifies leads, Designer builds mockups and deploys the chosen one, Pitcher drafts outreach around that URL, Closer handles replies, and a Discord worker carries the approvals.",
        "Coordination is a database write, not a conversation between models. Nothing calls anything: work is claimed from Supabase and results are written back, which is what makes the pipeline restartable and inspectable.",
        "Designer pastes nothing from memory. The deployed Vercel URL is read back out of the row it was written to, so the link in the email is the link that exists.",
        "Every meaningful action writes a human-readable row, and the dashboard streams those rows, so the system is legible while it runs. Approve, skip, edit or run any claw on demand from Discord; autonomous mode approves and sends for a hands-off run.",
      ],
      outcome: [
        "The demo runtime is the five claws inside a NemoClaw sandbox on an NVIDIA Brev instance, reaching Nemotron through the sandbox's managed inference route with no API key in the environment and outbound access limited to named policies.",
        "Leads, generated sites, outreach, replies, meetings and per-agent memory are all durable tables rather than process state, so a claw can be restarted mid-pipeline without losing its place.",
      ],
      challenge: [
        "Never a single model call. The hard part was making a multi-agent system reliable enough to demo: persistent memory, visible logs, clear queues, exact links, careful environment loading, simple human controls.",
        "The dashboard mattered as much as the agents. Autonomous work nobody can see reads as broken even when it is working.",
      ],
      limitations: [
        "A hackathon build. Seed data and fallback behaviour keep a failed live API call from taking the demo down, which is right under a deadline and wrong in production.",
        "Nothing has run at volume or been measured for outreach quality. Lead qualification is rules over a result set, not anything learned.",
        "Meeting booking and the voice path were scoped as stretch work, and the reply handler has a demo fallback behind it.",
      ],
    },
  },
  {
    slug: "wave-function-collapse",
    name: "Wave Function Collapse",
    label: "Procedural generation",
    /*
     * UNRESOLVED. Do not "fix" this by making it more impressive.
     *
     * The linked repo's README says it is a starter scaffold and lists the WFC
     * grid state, tile compatibility checks, and collapse/propagation logic
     * under "Still to build". It also says main.js and JavaScript throughout.
     * So the tagline stays at what the repo can support, and no case study is
     * written, until either the README is updated or the claim is narrowed.
     * A recruiter clicks through; the repo has to agree with the page.
     */
    tagline:
      "A tile-based map generator, assembling a map from tile adjacency rules one cell at a time.",
    ownership: "A research probe for the Augmented Design Lab",
    href: "https://github.com/PartyD1/wave-function",
    weight: 3,
    /* JavaScript, per the repo. See the tagline note above. */
    tech: ["JavaScript", "HTML"],
    media: [],
  },
  {
    slug: "pewter-platformer",
    name: "Pewter Platformer",
    label: "Game AI research",
    tagline:
      "Better movement physics, plus tools that let an LLM understand them well enough to design levels that are hard but still playable.",
    /* The whole Augmented Design Lab worked on this one. Saying so is not
     * modesty; leaving it implied-solo would be the fabrication. */
    ownership: "Built with the Augmented Design Lab",
    href: "https://github.com/PartyD1/Pewter-The-Platformer",
    weight: 3,
    tech: ["TypeScript", "LangChain", "CSS"],
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
    ownership: "Built for BananaBots",
    tech: ["TypeScript", "React", "Vite", "MediaPipe", "Tailwind", "CSS"],
    media: [],
    study: {
      flow: {
        steps: [
          { title: "Webcam", detail: "MediaPipe Hands tracks landmarks in the browser" },
          { title: "Count extended fingers" },
          {
            title: "Hold to confirm",
            detail: "A ring fills before anything fires",
          },
          {
            title: "One count, one action",
            branches: [
              "1 · volume down",
              "2 · volume up",
              "3 · previous",
              "4 · next",
              "open hand · play / pause",
            ],
          },
        ],
        bus: {
          title: "Calibrated per person, and nothing leaves the machine",
          detail:
            "On first visit you hold a fist, then one through five fingers, then verify. The thresholds are stored in the browser. No backend, no keys, no accounts.",
        },
      },
      problem: [
        "Someone with a motor impairment who cannot comfortably use a keyboard or a mouse still wants to control their own music. The controls are small, close together, and assume a precision the person may not have.",
      ],
      build: [
        "A music player driven by how many fingers you hold up to a webcam. MediaPipe Hands tracks landmarks in the browser and the count maps to an action.",
        "Every gesture is hold-to-confirm, so a hand passing through a position never triggers playback.",
        "Thresholds are calibrated per person on first visit. A fixed threshold works for the hands it was tuned on and fails for everyone else, which is the wrong failure mode for assistive software.",
        "Controls carry ARIA labels and the gesture HUD announces politely. A tool for this audience that a screen reader cannot use has missed the point.",
      ],
      limitations: [
        "Needs a webcam, reasonable lighting, and a modern browser. Recalibration is manual when conditions change.",
        "Five gestures is a small vocabulary. Finger counting was chosen because it is legible and forgiving, not because it is expressive.",
        "Not yet tested with the users it is designed for. Everything above is a reasoned guess until it meets reality.",
      ],
    },
  },
  {
    slug: "wordplay",
    name: "WordPlay",
    label: "Web game",
    tagline: "A Wordle recreation with full statistics and game history.",
    href: "https://github.com/PartyD1/wordplay",
    weight: 3,
    tech: ["TypeScript", "Next.js", "React", "Tailwind", "Firebase", "Nix", "HTML"],
    media: [],
    study: {
      flow: {
        steps: [
          { title: "Today, in UTC", detail: "The same word for everyone, no server deciding it" },
          {
            title: "Deterministic index",
            detail: "Into a list of about 2,315 answers",
          },
          {
            title: "Guess validated",
            detail: "Against roughly 13,000 accepted words",
          },
          {
            title: "Tiles flip on a stagger",
            detail: "An invalid guess shakes; both keyboards work",
          },
          {
            title: "Stats build up",
            detail: "Game state and the guess distribution live in localStorage",
          },
        ],
      },
      problem: [
        "A Wordle clone is a deceptively good exercise. The game is five minutes of work; everything that makes it feel like the real thing is not.",
      ],
      build: [
        "One puzzle a day, chosen by a deterministic index derived from the current UTC day, so the daily is consistent globally without a server.",
        "Guesses are validated against a combined set of about 13,000 accepted words, so a real word is never rejected and a keyboard mash never counts as a turn.",
        "Game state and statistics live in localStorage, so a day in progress survives a refresh and the guess distribution builds up over time.",
      ],
      limitations: [
        "Everything is client-side. Statistics do not follow you to another device, and clearing site data clears your history.",
        "No account, no sharing, no server-side validation, so the answer is discoverable by anyone who looks.",
      ],
    },
  },
];

export const bySlug = (slug: string): Project | undefined =>
  projects.find((p) => p.slug === slug);
