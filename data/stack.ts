/**
 * Parth's stack, in his own words and his own grouping (2026-09-01).
 *
 * The three rings of the orbit ARE these three groups — inner to outer runs
 * languages → what's built with them → what it's built in, which is why the
 * order matters. Nothing here is inferred; add a tool by adding it to a group.
 */
export type StackItem = {
  name: string;
  /**
   * Whether this tool appears in the Stack ORBIT.
   *
   * The orbit is Parth's own curated 29 — his claim about the breadth of his
   * stack, and it is already at the density limit of the diagram. Per-project
   * tech rows need a superset (Twilio, Resend, Phaser, MediaPipe and so on),
   * and forking that into a second file would break this file's contract as the
   * one tool list. So the superset lives here and this flag decides display.
   * Absent = in the orbit. `false` = per-project rows only.
   */
  orbit?: false;
  /**
   * Simple Icons slug. Absent = no official mark exists, and the tool renders
   * as a text pill instead so no supplied tool is ever silently dropped.
   *
   * Assigning a slug to a tool Parth listed is NOT an inference — it is a
   * lookup of a mark that either exists or does not. Attaching a tool to a
   * PROJECT is an inference, and that is the thing that stays empty.
   */
  slug?: string;
};

export type StackGroup = {
  id: string;
  label: string;
  /** Short form for the ring itself — the inner arc has little room. */
  short: string;
  /** Ring tone, drawn from the blob palette. */
  tone: string;
  items: StackItem[];
};

export const stack: StackGroup[] = [
  {
    id: "languages",
    label: "Languages",
    short: "Languages",
    tone: "var(--blob-a-3)",
    items: [
      { name: "Python", slug: "python" },
      { name: "Java", slug: "openjdk" },
      { name: "JavaScript", slug: "javascript" },
      { name: "TypeScript", slug: "typescript" },
      { name: "C", slug: "c" },
      { name: "HTML", slug: "html5" },
      { name: "CSS", slug: "css" },
      { name: "Bash", slug: "gnubash" },
      { name: "Tailwind", slug: "tailwindcss" },
      { name: "Elixir", slug: "elixir" },
    ],
  },
  {
    id: "frameworks",
    label: "Frameworks & libraries",
    short: "Frameworks",
    tone: "var(--blob-b-1)",
    items: [
      { name: "FastAPI", slug: "fastapi" },
      { name: "Flask", slug: "flask" },
      { name: "React", slug: "react" },
      { name: "Next.js", slug: "nextdotjs" },
      { name: "PyTorch", slug: "pytorch" },
      { name: "TensorFlow", slug: "tensorflow" },
      { name: "Pandas", slug: "pandas" },
      { name: "Pydantic", slug: "pydantic" },
      { name: "LangChain", slug: "langchain" },
      // Per-project only — see StackItem.orbit.
      { name: "Phoenix LiveView", slug: "phoenixframework", orbit: false },
      { name: "Phaser", orbit: false },
      { name: "MediaPipe", slug: "mediapipe", orbit: false },
    ],
  },
  {
    id: "tools",
    label: "Developer tools",
    short: "Tools",
    tone: "var(--blob-a-2)",
    items: [
      { name: "Node.js", slug: "nodedotjs" },
      { name: "PostgreSQL", slug: "postgresql" },
      { name: "Supabase", slug: "supabase" },
      // No official Simple Icons mark exists for any of these four, so they
      // carry no slug and render as text pills rather than being dropped or
      // given an invented glyph. Verified against simple-icons 16.29.0:
      // there is no siOpenai and no siApify. siOpenaigym exists but is OpenAI
      // GYM, a different product, and using it here would be a small lie.
      { name: "OpenAI API" },
      { name: "NemoClaw" },
      { name: "Vercel", slug: "vercel" },
      { name: "Apify" },
      { name: "Git", slug: "git" },
      { name: "Jupyter", slug: "jupyter" },
      { name: "OpenClaw" },
      // Per-project only — see StackItem.orbit.
      { name: "Twilio", orbit: false },
      { name: "Resend", slug: "resend", orbit: false },
      { name: "PyMuPDF", orbit: false },
      { name: "Nemotron", orbit: false },
      { name: "NVIDIA Brev", slug: "nvidia", orbit: false },
      { name: "Nix", slug: "nixos", orbit: false },
    ],
  },
];
