/**
 * One section of a case study: a heading and a short list of points.
 *
 * The API is exactly { id, title, children }. There is no `label`, `kicker`,
 * `eyebrow`, `number` or `index` prop and NONE MAY BE ADDED. craft-floor L27
 * marks the eyebrow above a heading as the one ban no brief earns back, and
 * L28 refuses 01/02/03 here specifically: the headings already say what each
 * section is.
 *
 * Children are <li>s. Bullets, not paragraphs, because this is a portfolio
 * and not a blog (Parth, 2026-09-02).
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
      <ul className="case__points">{children}</ul>
    </section>
  );
}
