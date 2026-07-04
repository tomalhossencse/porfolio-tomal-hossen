import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Education from "@/components/Education";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

// Force static generation at build time
export const dynamic = "force-static";
export const revalidate = false;

export default function Home() {
  return (
    <main className="noise-bg">
      <Navbar />
      <Hero />
      <About />
      <Skills />
      {/* <Experience /> */}
      <Projects />
      <Education />
      {/* <Testimonials /> */}
      <Contact />
      <Footer />
    </main>
  );
}
