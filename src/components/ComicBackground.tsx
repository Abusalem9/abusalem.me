"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

/**
 * Fixed backdrop: printed-comic halftone dots, two colour washes that
 * drift as you scroll, and a vignette to keep text readable on top.
 */
export default function ComicBackground() {
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll();

  const redY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const blueY = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);
  const dotShift = useTransform(scrollYProgress, [0, 1], [0, -80]);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden transform-gpu">
      {/* colour washes */}
      <motion.div
        style={reduced ? undefined : { y: redY }}
        className="absolute -left-1/5 -top-1/5 h-[80vh] w-[80vw] rounded-full bg-accent/45 blur-[90px] will-change-transform"
      />
      <motion.div
        style={reduced ? undefined : { y: blueY }}
        className="absolute -right-1/5 top-1/4 h-[80vh] w-[80vw] rounded-full bg-accent2/40 blur-[100px] will-change-transform"
      />

      {/* Floating dynamic energy nodes */}
      {!reduced && (
        <>
          <motion.div
            animate={{
              x: ["0vw", "10vw", "-5vw", "0vw"],
              y: ["0vh", "15vh", "-10vh", "0vh"],
              opacity: [0.15, 0.35, 0.15],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
            className="absolute left-1/4 top-1/3 h-64 w-64 rounded-full bg-accent/30 blur-[90px]"
          />
          <motion.div
            animate={{
              x: ["0vw", "-12vw", "6vw", "0vw"],
              y: ["0vh", "-18vh", "12vh", "0vh"],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{ duration: 24, repeat: Infinity, ease: "easeInOut", delay: 3 }}
            className="absolute right-1/4 bottom-1/3 h-72 w-72 rounded-full bg-accent2/25 blur-[100px]"
          />
        </>
      )}

      {/* halftone dot field */}
      <motion.div
        style={
          reduced
            ? { opacity: 0.3 }
            : { y: dotShift, opacity: 0.3 }
        }
        className="halftone absolute -inset-y-40 inset-x-0 will-change-transform"
      />

      {/* vignette — kept light so the colour washes still read */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,color-mix(in_srgb,var(--color-ink)_55%,transparent)_35%,color-mix(in_srgb,var(--color-ink)_92%,transparent)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-ink to-transparent" />
    </div>
  );
}
