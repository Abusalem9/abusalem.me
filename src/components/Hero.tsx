"use client";

import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { hero } from "@/content/portfolio";
import { useTheme } from "@/themes/ThemeProvider";
import HangingCard from "./HangingCard";
import Ornament from "./Ornament";
import ThwipButton from "./ui/ThwipButton";

export default function Hero() {
  const { theme } = useTheme();
  const [roleIndex, setRoleIndex] = useState(0);
  const reduced = useReducedMotion();
  const ref = useRef<HTMLElement>(null);

  // The hero copy drifts up and dims as you scroll past it.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const copyY = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const cardY = useTransform(scrollYProgress, [0, 1], [0, -30]);

  useEffect(() => {
    if (hero.roles.length < 2) return;
    const id = setInterval(
      () => setRoleIndex((i) => (i + 1) % hero.roles.length),
      2800,
    );
    return () => clearInterval(id);
  }, []);

  const letters = [...hero.name];

  return (
    <section
      ref={ref}
      id="top"
      className="relative flex min-h-screen items-center overflow-hidden px-5 pb-24 pt-32 md:px-8"
    >
      <Ornament corner="tl" size={360} className="text-fg/15" delay={0.2} />
      <Ornament corner="br" size={300} className="text-accent/20" delay={0.5} />

      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-10 lg:grid-cols-[1.3fr_0.7fr]">
        <motion.div style={reduced ? undefined : { y: copyY, opacity: copyOpacity }}>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.6 }}
            className="mb-6 font-mono text-[11px] uppercase tracking-[0.4em] text-accent md:text-xs"
          >
            {theme.eyebrow}
          </motion.p>

          <h1 className="font-display leading-[0.85] tracking-tight">
            <span className="sr-only">{hero.name}</span>
            <span aria-hidden className="flex flex-wrap">
              {letters.map((ch, i) => (
                <motion.span
                  key={`${ch}-${i}`}
                  initial={{ opacity: 0, y: 70, rotateX: -80 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{
                    delay: 0.25 + i * 0.045,
                    type: "spring",
                    stiffness: theme.feel.stiffness * 0.6,
                    damping: theme.feel.damping * 0.62,
                  }}
                  whileHover={
                    reduced ? undefined : { y: -12, color: "var(--color-accent)" }
                  }
                  className="inline-block text-shadow-comic [font-size:var(--hero-size)] [transform-style:preserve-3d]"
                >
                  {ch === " " ? " " : ch}
                </motion.span>
              ))}
            </span>
          </h1>

          {/* role rotator */}
          <div className="mt-6 h-11 overflow-hidden md:h-14">
            <AnimatePresence mode="wait">
              <motion.p
                key={roleIndex}
                initial={{ y: 34, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -34, opacity: 0 }}
                transition={{ duration: 0.45, ease: [0.2, 0.8, 0.2, 1] }}
                className="font-display uppercase leading-[1.2] tracking-[0.18em] text-accent2 [font-size:clamp(0.95rem,2.4vw,1.7rem)]"
              >
                {hero.roles[roleIndex]}
              </motion.p>
            </AnimatePresence>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="mt-8 max-w-xl text-base leading-relaxed text-muted md:text-lg"
          >
            {hero.blurb}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 0.6 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <ThwipButton href={hero.ctaPrimary.href}>{hero.ctaPrimary.label}</ThwipButton>
            <ThwipButton href="/resume" variant="ghost">
              View Resume
            </ThwipButton>
            <ThwipButton href={hero.ctaSecondary.href} variant="ghost">
              {hero.ctaSecondary.label}
            </ThwipButton>
          </motion.div>
        </motion.div>

        <motion.div style={reduced ? undefined : { y: cardY }}>
          <HangingCard />
        </motion.div>
      </div>

      {/* scroll cue */}
      <motion.div
        aria-hidden
        style={reduced ? undefined : { opacity: copyOpacity }}
        className="absolute inset-x-0 bottom-8 flex justify-center"
      >
        <motion.div
          animate={reduced ? undefined : { y: [0, 10, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-muted"
        >
          Scroll
          <span className="h-10 w-px bg-gradient-to-b from-fg/60 to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  );
}
