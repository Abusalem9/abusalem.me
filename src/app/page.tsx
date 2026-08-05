import About from "@/components/About";
import ComicBackground from "@/components/ComicBackground";
import Contact from "@/components/Contact";
import Experience from "@/components/Experience";
import Feats from "@/components/Feats";
import Hero from "@/components/Hero";
import IntroCurtain from "@/components/IntroCurtain";
import Marquee from "@/components/Marquee";
import Nav from "@/components/Nav";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import ThemeCursor from "@/components/ThemeCursor";

export default function Home() {
  return (
    <>
      <IntroCurtain />
      <ComicBackground />
      <ThemeCursor />
      <Nav />

      <main className="relative">
        <Hero />
        <Marquee />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Feats />
        <Contact />
      </main>
    </>
  );
}
