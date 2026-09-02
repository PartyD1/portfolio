/**
 * Parth's stack, in his own words and his own grouping (2026-09-01).
 *
 * The three rings of the orbit ARE these three groups — inner to outer runs
 * languages → what's built with them → what it's built in, which is why the
 * order matters. Nothing here is inferred; add a tool by adding it to a group.
 */
export type StackGroup = {
  id: string;
  label: string;
  /** Ring tone, drawn from the blob palette. */
  tone: string;
  items: string[];
};

export const stack: StackGroup[] = [
  {
    id: "languages",
    label: "Languages",
    tone: "var(--blob-a-3)",
    items: [
      "Python",
      "Java",
      "JavaScript",
      "TypeScript",
      "C",
      "HTML",
      "CSS",
      "Bash",
      "Tailwind",
      "Elixir",
    ],
  },
  {
    id: "frameworks",
    label: "Frameworks & libraries",
    tone: "var(--blob-b-1)",
    items: [
      "FastAPI",
      "Flask",
      "React",
      "Next.js",
      "PyTorch",
      "TensorFlow",
      "Pandas",
      "Pydantic",
      "LangChain",
    ],
  },
  {
    id: "tools",
    label: "Developer tools",
    tone: "var(--blob-a-2)",
    items: [
      "Node.js",
      "PostgreSQL",
      "Supabase",
      "OpenAI API",
      "NemoClaw",
      "Vercel",
      "Apify",
      "Git",
      "Jupyter",
      "OpenClaw",
    ],
  },
];
