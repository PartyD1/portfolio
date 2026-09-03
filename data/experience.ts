/**
 * Employment.
 *
 * Note what is NOT here: a `role: "Internship"`. "Internship" is an employment
 * TYPE, not a job title, and putting it in the slot a recruiter reads as the
 * title is a soft fabrication of exactly the class this file is otherwise
 * rigorous about.
 *
 * Every entry points at a project, because the two sections are the same
 * story told twice: Work says what was built, Experience says who paid for
 * it. The timeline renders the linked project's mark and name so a reader can
 * walk from one to the other without hunting.
 */
export type ExperienceEntry = {
  id: string;
  /** Display form of the range. Never 01/02/03. */
  period: string;
  /** Start and end, for the timeline's own arithmetic. `end` absent = ongoing. */
  start: string;
  end?: string;
  company: string;
  title: string;
  /** What he was responsible for, in one sentence. */
  ownership: string;
  /** Slug into data/projects.ts. Always a case study, never a repo. */
  project: string;
};

/** Most recent first. The research role is ongoing. */
export const experience: ExperienceEntry[] = [
  {
    id: "augmented-design-lab",
    period: "Apr 2026 - present",
    start: "2026-04",
    company: "Augmented Design Lab, UC Santa Cruz",
    title: "Undergraduate Research Assistant",
    ownership:
      "Agent tooling and procedural generation under Prof. Jim Whitehead: grounding an LLM agent in live data through structured tool-calling, and rebuilding wave-function-collapse constraint propagation from the literature.",
    project: "wave-function-collapse",
  },
  {
    id: "operations-agent",
    period: "Jun - Aug 2026",
    start: "2026-06",
    end: "2026-08",
    company: "InstaService",
    title: "AI/ML Engineer Intern",
    ownership:
      "Built a booking-monitoring system on Elixir and OTP: every booking gets its own supervised process that checks itself on a schedule, three checks run in parallel, and anything that crosses a threshold escalates over SMS, voice or email on its own.",
    project: "operations-agent",
  },
];
