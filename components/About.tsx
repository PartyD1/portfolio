export default function About() {
  return (
    <section className="section" id="about" aria-labelledby="about-title">
      <div className="about__grid">
        <h2 className="section__title" id="about-title">
          About
        </h2>
        <div className="about__body">
          <p>
            I&rsquo;m a computer science student at UC Santa Cruz. The thread
            through everything I make is <strong>leverage</strong>: using AI
            and solid engineering to take a real problem off someone&rsquo;s
            plate — an operations team&rsquo;s broken bookings, a DECA
            competitor&rsquo;s unscored report, a small business without a
            website.
          </p>
          <p>
            That thread runs through my game work too. In a research lab I
            improved a platformer&rsquo;s movement physics and gave an LLM the
            tools to understand them well enough to design levels that are hard
            but still playable. And Gestura, a music player you control with
            your hands, came from asking what a browser could do for people
            with motor impairments.
          </p>
          <ul className="about__range" aria-label="Areas of work">
            <li>Autonomous agents</li>
            <li>Game systems &amp; physics</li>
            <li>Assistive tech</li>
            <li>Full-stack web</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
