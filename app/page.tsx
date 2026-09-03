import Hero from "@/components/Hero";
import Work from "@/components/Work";
import Experience from "@/components/Experience";
import About from "@/components/About";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      {/* Work leads. Experience sits directly behind it as the verification
          layer, and its timeline links every role back to the card above.
          There is no Stack section any more: the tools show where they were
          used, on each case study, and nowhere else. */}
      <Work />
      <Experience />
      <About />
      <Contact />
    </>
  );
}
