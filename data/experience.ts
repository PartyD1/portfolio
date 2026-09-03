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

export const experience: ExperienceEntry[] = [
  {
    id: "operations-agent",
    period: "Summer 2026",
    ownership: "Built an agentic booking-operations system with a partner.",
    href: "/work/operations-agent",
  },
];
