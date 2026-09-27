import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { resume, tagline } from "@/data/site";
import { ArrowLeft, ArrowRight, Download } from "@/components/Icon";
import ResumeDocument from "@/components/ResumeDocument";

const title = "Résumé";

export const metadata: Metadata = {
  title,
  description: tagline,
  openGraph: {
    type: "profile",
    title: `${title} · Parth Doshi`,
    description: tagline,
    url: resume.page,
  },
  twitter: {
    card: "summary_large_image",
    title: `${title} · Parth Doshi`,
    description: tagline,
  },
};

/**
 * The résumé as a page of the site, not a file beside it: this is the URL
 * that gets pasted into an application or a DM. Whoever opens it gets the
 * résumé first and the portfolio around it (menu, theme, footer), and this
 * page points them onward twice: "See my work" beside Download at the top,
 * then a foot under the last page, where a reader who has read to the end is
 * deciding what to do next.
 *
 * Same vocabulary as a case study (the frosted headline panel, the foot),
 * because it is the same kind of route: one document, then a way back in.
 */
export default function ResumePage() {
  // The flag is the one switch for the résumé everywhere; off, this route is
  // absent rather than an empty page.
  if (!resume.ready) notFound();

  return (
    <article className="case resume">
      <header className="case__header">
        <div className="case__headline resume__headline">
          <Link className="case__back" href="/">
            <ArrowLeft />
            Parth Doshi&rsquo;s portfolio
          </Link>
          <h1 className="case__title">{title}</h1>
          <p className="case__tagline">{tagline}</p>

          <div className="resume__actions">
            <a
              className="live-link resume__download"
              href={resume.path}
              download={resume.filename}
            >
              <Download />
              Download PDF
            </a>
            <Link className="link-arrow" href="/#work">
              See my work
              <ArrowRight />
            </Link>
          </div>
        </div>
      </header>

      <ResumeDocument src={resume.path} label="Résumé, page by page" />

      <section className="case__foot" aria-labelledby="resume-next">
        <h2 className="case__foot-title" id="resume-next">
          Now see the work.
        </h2>
        <p className="case__foot-lede">
          One page only holds so much. The portfolio walks through the projects
          in depth: what each one does and how it is built.
        </p>
        <div className="case__foot-links">
          <Link className="link-arrow" href="/#work">
            The projects
            <ArrowRight />
          </Link>
          <Link className="link-arrow" href="/#experience">
            Experience
            <ArrowRight />
          </Link>
          <Link className="link-arrow" href="/#contact">
            Get in touch
            <ArrowRight />
          </Link>
        </div>
      </section>
    </article>
  );
}
