import { About } from "@/components/sections/About";
import { CTA } from "@/components/sections/CTA";
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { Testimonials } from "@/components/sections/Testimonials";

export default function Home() {
  return (
    <main>
      <Hero />
      <Projects />
      <About />
      <Testimonials />
      <CTA />
    </main>
  );
}
