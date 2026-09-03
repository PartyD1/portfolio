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
    demo: "https://scorelyai.app",
    weight: 3,
    tech: [
      "Python",
      "FastAPI",
      "Next.js",
      "TypeScript",
      "Tailwind",
      "PostgreSQL",
      "OpenAI API",
      "PyMuPDF",
    ],
    media: [],
    study: {
      problem: [
        "A DECA written report is graded against a published rubric, but a competitor only finds out how they did after the competition. Between drafts there is no feedback loop at all — you either know a judge willing to read forty pages, or you guess.",
        "The rubric is public. The scoring is structured. That combination is the whole opportunity: it is a grading problem with an answer key, which makes it tractable in a way that most \u201cAI feedback\u201d products are not.",
      ],
      build: [
        "Upload a PDF, pick your event, get a section-by-section score with comments against the official rubric for that event. It covers sixteen events across three clusters, each with its own rubric and its own required document outline injected into the prompt, so a missing section is actually penalised rather than quietly ignored.",
        "Grading is asynchronous. The upload returns a job ID immediately and the frontend polls, because a synchronous request for a forty-page document is a request that times out.",
        "Two things in it are worth more than the rest. The scoring comes back as schema-validated JSON through OpenAI structured outputs rather than parsed out of prose, so a malformed response is a caught error instead of a plausible-looking wrong score. And text extraction alone misses things a judge would not \u2014 whether the Statement of Assurances is actually signed, whether the document looks presentable \u2014 so key pages are rendered as images and checked visually as well.",
        "The page-count penalty only excludes a title page, table of contents or Statement of Assurances if that page was actually detected in the document, rather than assuming three free pages every time.",
      ],
      outcome: [
        "It is live at scorelyai.app and high-school DECA competitors use it to get feedback on drafts before they submit them. Signed-in users keep a history per event, so a second draft can be compared against the first.",
      ],
      challenge: [
        "Making the model\u2019s output trustworthy enough to show someone a number. An LLM will happily produce a confident score for a rubric it has half-understood, and a wrong score presented as a real one is worse than no score.",
        "The answer was to give it as little room as possible: the rubric and the required outline are injected rather than recalled, the response is schema-validated rather than parsed, and the checks that do not suit a language model \u2014 page counts, signature detection \u2014 are computed separately and merged in.",
      ],
      limitations: [
        "Documents over 25,000 tokens are truncated, with a warning shown to the user. A long report is therefore graded on part of itself, which is a real ceiling rather than a rare edge case.",
        "There is no evaluation set. Scores have never been compared against real judge scores on the same documents, so I can say the output is well-formed and rubric-grounded, but not that it is accurate. That comparison is the obvious next piece of work.",
        "History is capped at five submissions per user per event to keep storage small.",
      ],
    },
  },
  {
    slug: "santaclaws",
    name: "SantaClaws",
    label: "Agentic lead generation",
    tagline:
      "OpenClaw agents that find small businesses with a missing or outdated website, then autonomously build them a mockup.",
    href: "https://github.com/PartyD1/santaclaws",
    weight: 3,
    ownership: "Hackathon project, built with a team",
    tech: [
      "Python",
      "Next.js",
      "TypeScript",
      "OpenClaw",
      "NemoClaw",
      "Nemotron",
      "Supabase",
      "Apify",
      "Resend",
      "Discord",
      "Vercel",
      "NVIDIA Brev",
    ],
    media: [],
    study: {
      problem: [
        "A small business with no website, or a visibly outdated one, is an easy lead to describe and a slow one to act on. Finding them, judging which are worth approaching, building something to show, and writing an email that is not obviously a template are four different jobs, and doing all four by hand is why the lead never gets contacted.",
      ],
      build: [
        "Four agents, each owning one stage: Scout finds and qualifies local businesses through Apify, Designer builds website mockups and deploys the chosen one to Vercel, Pitcher drafts outreach with that exact deployed URL in it, and Closer handles replies and moves warm leads toward a meeting.",
        "The design decision that matters is that the agents never call each other. Supabase is the queue, the shared memory and the audit log, and every agent runs the same loop: select work, claim a row, run a tool, write the result, log the action, sleep until the next heartbeat. Coordination is a database transaction rather than a conversation between models, which is what makes the pipeline restartable and inspectable.",
        "Every meaningful action writes a human-readable row, so a live dashboard can show what the system is doing while it does it. Approvals route through Discord \u2014 approve, skip, edit, or run an agent on demand \u2014 with a fully autonomous mode for demo runs.",
      ],
      challenge: [
        "The hard part was never a single model call. It was making a multi-agent system reliable enough to demo: persistent memory, visible logs, clear queues, exact external links, careful environment loading, and simple human controls.",
        "The dashboard ended up mattering as much as the agents did, because autonomous work that nobody can see reads as broken even when it is working.",
      ],
      limitations: [
        "It is a hackathon build. There are seed-data fallbacks specifically so a failed live API call does not take the demo down with it, which is the right call under a deadline and the wrong one in production.",
        "Nothing here has been run at volume or measured for outreach quality, and lead qualification is rules over an Apify result set rather than anything learned.",
      ],
    },
  },
  {
    slug: "wave-function-collapse",
    name: "Wave Function Collapse",
    label: "Procedural generation",
    /*
     * UNRESOLVED — do not "fix" this by making it more impressive.
     *
     * The linked repo's README says it is a starter scaffold and lists the WFC
     * grid state, tile compatibility checks, and collapse/propagation logic
     * under "Still to build". It also says main.js and JavaScript throughout.
     * So the tagline stays at what the repo can support, and no case study is
     * written, until either the README is updated or the claim is narrowed.
     * A recruiter clicks through; the repo has to agree with the page.
     */
    tagline:
      "A tile-based map generator in Phaser, assembling a map from tile adjacency rules one cell at a time.",
    ownership: "A research probe for the Augmented Design Lab",
    href: "https://github.com/PartyD1/wave-function",
    weight: 3,
    /* JavaScript, per the repo. See the tagline note above. */
    tech: ["JavaScript", "Phaser", "HTML"],
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
    ownership: "Built for BananaBots",
    tech: ["TypeScript", "React", "Vite", "MediaPipe", "Tailwind", "CSS"],
    media: [],
    study: {
      problem: [
        "Someone with a motor impairment who cannot comfortably use a keyboard or a mouse still wants to control their own music. The controls are small, close together, and require precision that the interface simply assumes you have.",
      ],
      build: [
        "A music player driven entirely by how many fingers you hold up to a webcam. MediaPipe Hands tracks landmarks in the browser, the app counts extended fingers, and the count maps to an action: one is volume down, two volume up, three previous, four next, an open hand plays or pauses.",
        "Two decisions do most of the accessibility work. Every gesture is hold-to-confirm \u2014 a ring fills before anything fires \u2014 so a hand passing through a position never triggers playback. And the thresholds are calibrated per person: on first visit you hold a fist, then one through five fingers, then verify, and the result is stored in the browser. A fixed threshold works for the hands it was tuned on and fails for everyone else, which is exactly the wrong failure mode for assistive software.",
        "It runs entirely in the browser \u2014 no backend, no API keys, no accounts \u2014 so the camera feed never leaves the machine. Controls carry ARIA labels and the gesture HUD announces politely, because a tool for this audience that is unusable by a screen reader has missed the point.",
      ],
      limitations: [
        "It needs a webcam, reasonable lighting, and a modern browser; recalibration is manual when conditions change.",
        "Five discrete gestures is a small vocabulary, and finger counting is the least expressive thing MediaPipe can do \u2014 it was chosen because it is legible and forgiving, not because it is capable.",
        "It has not been tested with the users it is designed for. That is the honest gap: everything above is a reasoned guess about what would help, and it needs contact with reality before it is more than that.",
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
    tech: [
      "TypeScript",
      "Next.js",
      "React",
      "Tailwind",
      "Firebase",
      "Nix",
      "HTML",
    ],
    media: [],
    study: {
      problem: [
        "A Wordle clone is a deceptively good exercise. The game is five minutes of work; everything that makes it feel like the real thing is not.",
      ],
      build: [
        "One puzzle a day, the same word for everyone, chosen by a deterministic index derived from the current UTC day against a list of about 2,315 answers \u2014 so the daily is consistent globally without a server deciding it. Guesses are validated against a combined set of roughly 13,000 accepted words, so a real word is never rejected and a keyboard mash never counts as a turn.",
        "Game state and statistics live in localStorage, so a day in progress survives a refresh and the guess distribution builds up over time. Tiles flip on a stagger, an invalid guess shakes, and the on-screen and physical keyboards both work.",
      ],
      limitations: [
        "Everything is client-side. Statistics live in the browser, so they do not follow you to another device and clearing site data clears your history \u2014 fine for a puzzle, not a pattern to carry into anything that matters.",
        "There is no account, no sharing, and no server-side validation, which means the answer is technically discoverable by anyone who wants to look for it.",
      ],
    },
  },
];

export const bySlug = (slug: string): Project | undefined =>
  projects.find((p) => p.slug === slug);
