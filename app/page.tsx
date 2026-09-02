import Hero from "@/components/Hero";
import Work from "@/components/Work";
import Experience from "@/components/Experience";
import Stack from "@/components/Stack";
import About from "@/components/About";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      {/* Work leads — lead with the work. Experience sits directly behind it as
          the verification layer: the section that says somebody employed him to
          do the thing the flagship card describes. */}
      <Work />
      <Experience />
      <Stack />
      <About />
      <Contact />
    </>
  );
}
