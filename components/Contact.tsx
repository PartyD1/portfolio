import { availability, links } from "@/data/site";
import { ArrowUpRight } from "@/components/Icon";
import ResumeLink from "@/components/ResumeLink";

export default function Contact() {
  return (
    <section
      className="section contact"
      id="contact"
      aria-labelledby="contact-title"
    >
      <h2 className="section__title contact__title" id="contact-title">
        Let&rsquo;s talk.
      </h2>
      <p className="contact__lede">
        Hiring, collaborating, or just curious about something I built?
        I&rsquo;d love to hear from you.
      </p>
      {/*
        The ask, moved off the hero and onto the section where acting on it is
        one line away. It gets its own paragraph rather than a tail on the
        lede: appended, it was the fourth line of a 40ch block and a recruiter
        scanning for a date would not find it.
      */}
      {availability.seeking && (
        <p className="contact__seeking">{availability.seeking}</p>
      )}
      <a className="contact__email" href={`mailto:${links.email}`}>
        {links.email}
      </a>
      <div className="contact__links">
        <a
          className="link-arrow"
          href={links.github}
          target="_blank"
          rel="noreferrer"
        >
          GitHub
          <ArrowUpRight />
        </a>
        <a
          className="link-arrow"
          href={links.linkedin}
          target="_blank"
          rel="noreferrer"
        >
          LinkedIn
          <ArrowUpRight />
        </a>
        <ResumeLink />
      </div>
    </section>
  );
}
