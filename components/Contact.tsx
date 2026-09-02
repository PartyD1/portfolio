import { links } from "@/data/projects";
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
        Hiring, collaborating, or just curious about something I built —
        I&rsquo;d love to hear from you.
      </p>
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
