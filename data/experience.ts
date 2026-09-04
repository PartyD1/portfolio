/**
 * Employment.
 *
 * Note what is NOT here: a `role: "Internship"`. "Internship" is an employment
 * TYPE, not a job title, and putting it in the slot a recruiter reads as the
 * title is a soft fabrication of exactly the class this file is otherwise
 * rigorous about.
 *
 * Entries point at a project where one exists, because the two sections are
 * the same story told twice: Work says what was built, Experience says who
 * paid for it. The timeline renders the linked project's mark and name so a
 * reader can walk from one to the other without hunting.
 *
 * An INCOMING role has no project, no ownership and no dates yet: the role is
 * agreed, the work has not started. It ships as company + title + "Incoming"
 * and nothing else, per the absence-not-placeholder rule. Nothing is inferred
 * to fill the gaps.
 */
export type ExperienceEntry = {
  id: string;
  /** Display form of the range. Never 01/02/03. */
  period: string;
  /**
   * Start and end, for the timeline's own arithmetic. `end` absent = ongoing,
   * unless the role is `incoming`, in which case `start` is absent too.
   */
  start?: string;
  end?: string;
  /** Agreed but not started. Never rendered as "live". */
  incoming?: true;
  company: string;
  title: string;
  /** What he was responsible for, in one sentence. Absent until known. */
  ownership?: string;
  /** Slug into data/projects.ts. Always a case study, never a repo. */
  project?: string;
};

/** Most recent first. The research role is ongoing; EduSchool is incoming. */
export const experience: ExperienceEntry[] = [
  {
    id: "eduschool",
    period: "Incoming",
    incoming: true,
    company: "EduSchool",
    title: "Full Stack Engineer Intern",
  },
  {
    id: "augmented-design-lab",
    period: "Apr 2026 - present",
    start: "2026-04",
    company: "Augmented Design Lab, UC Santa Cruz",
    title: "Undergraduate Research Assistant",
    ownership:
      "Agent tooling and procedural generation under Prof. Jim Whitehead: grounding an LLM agent in live data through structured tool-calling, and rebuilding wave-function-collapse constraint propagation from the literature.",
    project: "pewter-platformer",
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
