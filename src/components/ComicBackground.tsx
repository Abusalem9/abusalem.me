"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

/**
 * Fixed backdrop: printed-comic halftone dots, two colour washes that
 * drift as you scroll, and a vignette to keep text readable on top.
 */
export default function ComicBackground() {
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll();

  const redY = useTransform(scrollYProgress, [0, 1], ["0%", "35%"]);
  const blueY = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const dotShift = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const hueFilter = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    ["hue-rotate(0deg)", "hue-rotate(24deg)", "hue-rotate(-18deg)"],
  );

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* colour washes */}
      <motion.div
        style={reduced ? undefined : { y: redY }}
        animate={
          reduced
            ? undefined
            : {
                scale: [1, 1.08, 0.96, 1],
                opacity: [0.45, 0.65, 0.45],
              }
        }
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -left-1/5 -top-1/5 h-[85vh] w-[85vw] rounded-full bg-accent/55 blur-[120px]"
      />
      <motion.div
        style={reduced ? undefined : { y: blueY }}
        animate={
          reduced
            ? undefined
            : {
                scale: [1, 0.94, 1.1, 1],
                opacity: [0.4, 0.6, 0.4],
              }
        }
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute -right-1/5 top-1/4 h-[85vh] w-[85vw] rounded-full bg-accent2/50 blur-[130px]"
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
            ? { opacity: 0.35 }
            : { y: dotShift, filter: hueFilter, opacity: 0.35 }
        }
        className="halftone absolute -inset-y-40 inset-x-0 mix-blend-screen"
      />

      {/* vignette — kept light so the colour washes still read */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,color-mix(in_srgb,var(--color-ink)_55%,transparent)_35%,color-mix(in_srgb,var(--color-ink)_92%,transparent)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-ink to-transparent" />
    </div>
  );
}
