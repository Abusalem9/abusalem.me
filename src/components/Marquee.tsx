"use client";

import { motion, useReducedMotion } from "framer-motion";
import { skills } from "@/content/portfolio";
import { useTheme } from "@/themes/ThemeProvider";

/**
 * A full-bleed band of skills scrolling past on a slight tilt. It breaks up
 * the run of left-aligned sections and keeps something moving between them.
 */
export default function Marquee() {
  const reduced = useReducedMotion();
  const { theme } = useTheme();
  const words = skills.map((s) => s.name);

  const row = (
    <span className="flex shrink-0 items-center">
      {words.map((w) => (
        <span key={w} className="flex items-center">
          <span className="px-6 font-display text-lg uppercase tracking-[0.15em] md:text-2xl">
            {w}
          </span>
          <span aria-hidden className="text-sm opacity-70">
            {theme.bullet}
          </span>
        </span>
      ))}
    </span>
  );

  return (
    <div
      aria-hidden
      className="relative left-1/2 my-14 w-screen md:my-20 -translate-x-1/2 -rotate-2 overflow-hidden border-y-[3px] border-ink bg-accent py-3 text-on-accent"
    >
      <motion.div
        className="flex w-max"
        animate={reduced ? undefined : { x: ["0%", "-50%"] }}
        transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
      >
        {/* two identical rows, so the loop point is invisible */}
        {row}
        {row}
      </motion.div>
    </div>
  );
}
