/**
 * Parth's stack, in his own words and his own grouping (2026-09-01, trimmed
 * 2026-09-02).
 *
 * THE ONE TOOL LIST. There is no Stack section any more (removed 2026-09-02:
 * it read as clutter next to the work), so this file exists for exactly one
 * consumer, the per-project tech row on a case study. Nothing here is
 * inferred; add a tool by adding it to a group.
 *
 * A tool without a mark was dropped rather than shipped as a text pill, on
 * Parth's call: a recruiter scans logos, not words. The exceptions are
 * OpenClaw and Twilio, whose marks are drawn locally (see
 * components/tech-marks.local.ts) because Simple Icons carries neither.
 */
export type StackItem = {
  name: string;
  /**
   * Simple Icons slug. Vendored into components/tech-marks.generated.ts by
   * scripts/vendor-icons.mjs, which reads this file.
   */
  slug?: string;
  /**
   * A mark drawn in this repo, for a tool Simple Icons does not carry. Keyed
   * into components/tech-marks.local.ts. Mutually exclusive with `slug`.
   */
  local?: string;
};

export type StackGroup = {
  id: string;
  label: string;
  items: StackItem[];
};

export const stack: StackGroup[] = [
  {
    id: "languages",
    label: "Languages",
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
      { name: "Erlang/OTP", slug: "erlang" },
    ],
  },
  {
    id: "frameworks",
    label: "Frameworks & libraries",
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
      { name: "Phoenix LiveView", slug: "phoenixframework" },
      { name: "MediaPipe", slug: "mediapipe" },
      { name: "Vite", slug: "vite" },
    ],
  },
  {
    id: "tools",
    label: "Developer tools",
    items: [
      { name: "Node.js", slug: "nodedotjs" },
      { name: "PostgreSQL", slug: "postgresql" },
      { name: "Supabase", slug: "supabase" },
      { name: "Vercel", slug: "vercel" },
      { name: "Git", slug: "git" },
      { name: "Jupyter", slug: "jupyter" },
      { name: "OpenClaw", local: "openclaw" },
      { name: "Twilio", local: "twilio" },
      { name: "Resend", slug: "resend" },
      { name: "NVIDIA Brev", slug: "nvidia" },
      { name: "Nix", slug: "nixos" },
      { name: "Discord", slug: "discord" },
      { name: "Firebase", slug: "firebase" },
    ],
  },
];
