"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { hero } from "@/content/portfolio";
import Ornament from "./Ornament";
import { useTheme } from "@/themes/ThemeProvider";
import Mascot from "./ui/Mascot";
import ThwipButton from "./ui/ThwipButton";

export default function Hero() {
  const { theme } = useTheme();
  const [roleIndex, setRoleIndex] = useState(0);
  const reduced = useReducedMotion();

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
      id="top"
      className="relative flex min-h-screen items-center overflow-hidden px-5 pb-24 pt-32 md:px-8"
    >
      <Ornament corner="tl" size={360} className="text-fg/15" delay={0.2} />
      <Ornament corner="br" size={300} className="text-accent/20" delay={0.5} />

      {/* the mascot, dropping in on a line */}
      <motion.div
        aria-hidden
        initial={{ y: -420 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 40, damping: 9, delay: 0.8 }}
        className="absolute right-[14%] top-0 hidden origin-top lg:block"
      >
        <motion.div
          animate={reduced ? undefined : { rotate: [-4, 4, -4] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
          className="flex origin-top flex-col items-center"
        >
          <div className="h-64 w-px bg-gradient-to-b from-transparent via-fg/40 to-fg/70 xl:h-80" />
          <span className="text-fg/80">
            <Mascot size={38} />
          </span>
        </motion.div>
      </motion.div>

      <div className="relative mx-auto w-full max-w-6xl">
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
                  stiffness: 220,
                  damping: 16,
                }}
                whileHover={reduced ? undefined : { y: -12, color: "var(--color-accent)" }}
                className="inline-block text-shadow-comic [font-size:clamp(3.2rem,15vw,11rem)] [transform-style:preserve-3d]"
              >
                {ch === " " ? " " : ch}
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
          <ThwipButton href={hero.ctaSecondary.href} variant="ghost">
            {hero.ctaSecondary.label}
          </ThwipButton>
        </motion.div>
      </div>

      {/* scroll cue */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
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
