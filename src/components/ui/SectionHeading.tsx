"use client";

import { motion } from "framer-motion";
import Sfx from "./Sfx";

type Props = {
  children: React.ReactNode;
  /** Optional sound-effect burst pinned beside the heading */
  sfx?: string;
  kicker?: string;
};

export default function SectionHeading({ children, sfx, kicker }: Props) {
  return (
    <div className="relative mb-12 md:mb-16">
      {kicker && (
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.5 }}
          className="mb-3 font-mono text-xs uppercase tracking-[0.35em] text-accent"
        >
          {kicker}
        </motion.p>
      )}

      <div className="flex flex-wrap items-center gap-5">
        <motion.h2
          initial={{ opacity: 0, y: 28, skewY: 4 }}
          whileInView={{ opacity: 1, y: 0, skewY: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
          className="font-display text-fg text-shadow-comic [font-size:clamp(2.2rem,7vw,4.5rem)] leading-[0.95] tracking-wide"
        >
          {children}
        </motion.h2>

        {sfx && <Sfx text={sfx} className="h-20 w-20 shrink-0 md:h-28 md:w-28" />}
      </div>

      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.7, delay: 0.15, ease: [0.2, 0.8, 0.2, 1] }}
        className="mt-5 h-[3px] origin-left bg-gradient-to-r from-accent via-accent to-transparent"
      />
    </div>
  );
}
