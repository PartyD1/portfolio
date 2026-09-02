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
      { name: "OpenAI API", slug: "openai" },
      // NemoClaw and OpenClaw have no official Simple Icons mark. They render
      // as text pills rather than being dropped or given an invented glyph.
      { name: "NemoClaw" },
      { name: "Vercel", slug: "vercel" },
      { name: "Apify", slug: "apify" },
      { name: "Git", slug: "git" },
      { name: "Jupyter", slug: "jupyter" },
      { name: "OpenClaw" },
    ],
  },
];
