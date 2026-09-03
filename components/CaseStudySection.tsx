/**
 * One section of a case study.
 *
 * The API is exactly { id, title, children }. There is no `label`, `kicker`,
 * `eyebrow`, `number` or `index` prop and NONE MAY BE ADDED.
 *
 * craft-floor L27 marks the eyebrow above a heading as the one ban no brief
 * earns back, and L28 refuses 01/02/03 here specifically: the sequence carries
 * no information the reader needs, because the headings already say what each
 * section is. Making the slot structurally unavailable is stronger than leaving
 * it unused — a future genuine need then costs an API change plus an argument,
 * which is the point.
 */
export default function CaseStudySection({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="case__section" id={id} aria-labelledby={`${id}-t`}>
      <h2 className="case__section-title" id={`${id}-t`}>
        {title}
      </h2>
      <div className="case__prose">{children}</div>
    </section>
  );
}
