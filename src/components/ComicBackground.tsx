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
        className="absolute -left-1/5 -top-1/5 h-[80vh] w-[80vw] rounded-full bg-accent/55 blur-[110px]"
      />
      <motion.div
        style={reduced ? undefined : { y: blueY }}
        className="absolute -right-1/5 top-1/4 h-[80vh] w-[80vw] rounded-full bg-accent2/50 blur-[120px]"
      />

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
