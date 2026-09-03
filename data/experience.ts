/**
 * Employment.
 *
 * BLOCKED and therefore ABSENT, never placeholder text: the company name and
 * the role title. PRODUCT.md supplies neither. Do not write "Company pending"
 * into the UI, and do not infer either from the case study.
 *
 * Note what is NOT here: a `role: "Internship"`. "Internship" is an employment
 * TYPE, not a job title, and putting it in the slot a recruiter reads as the
 * title is a soft fabrication of exactly the class this file is otherwise
 * rigorous about. The columns are period | ownership until a real title exists.
 */
export type ExperienceEntry = {
  id: string;
  /** The one sequence signal this section gets. Never 01/02/03. */
  period: string;
  /** BLOCKED — supplied by Parth. */
  company?: string;
  /** BLOCKED — supplied by Parth. A real job title, not "Internship". */
  title?: string;
  /** What he was responsible for, in one sentence. */
  ownership: string;
  /** Always the case study, never a repo — the only PRODUCT-safe target. */
  href?: string;
};

/** Most recent first. The research role is ongoing. */
export const experience: ExperienceEntry[] = [
  {
    id: "augmented-design-lab",
    period: "Apr 2026 — present",
    company: "Augmented Design Lab, UC Santa Cruz",
    title: "Undergraduate Research Assistant",
    ownership:
      "Agent tooling and procedural generation, under Prof. Jim Whitehead — grounding an LLM agent in live data through structured tool-calling, and rebuilding wave-function-collapse constraint propagation from the literature.",
    href: "/work/wave-function-collapse",
  },
  {
    id: "operations-agent",
    period: "Jun — Aug 2026",
    company: "InstaService",
    title: "AI/ML Engineer Intern",
    ownership:
      "Built a booking-monitoring system on Elixir and OTP: every booking gets its own supervised process that checks itself on a schedule, three checks run in parallel, and anything that crosses a threshold escalates over SMS, voice or email on its own.",
    href: "/work/operations-agent",
  },
];
