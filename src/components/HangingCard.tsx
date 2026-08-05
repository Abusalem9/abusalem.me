"use client";

import { motion, useReducedMotion } from "framer-motion";
import { heroCard } from "@/content/portfolio";
import { useTheme } from "@/themes/ThemeProvider";
import Mascot from "./ui/Mascot";

/**
 * The "currently" card, strung from the top of the hero on a thread with the
 * mascot riding it. Fills the right half of the hero, which was dead space,
 * and gives the theme's mascot a reason to be there.
 */
export default function HangingCard() {
  const reduced = useReducedMotion();
  const { theme } = useTheme();

  return (
    <motion.div
      initial={{ y: -520, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 38, damping: 10, delay: 0.7 }}
      className="hidden origin-top justify-center lg:flex"
    >
      <motion.div
        // hangs from the thread, so it sways from the top
        animate={reduced ? undefined : { rotate: [-1.6, 1.6, -1.6] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="flex origin-top flex-col items-center"
      >
        <div className="h-20 w-px bg-gradient-to-b from-transparent via-fg/35 to-fg/60 xl:h-28" />
        <span className="text-fg/85">
          <Mascot size={34} />
        </span>
        <div className="h-5 w-px bg-fg/50" />

        <div className="panel-light relative w-full max-w-[19rem] overflow-hidden bg-ink-soft/85 p-6 backdrop-blur-sm">
          <span
            aria-hidden
            className="halftone pointer-events-none absolute inset-0 opacity-[0.07]"
          />
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
            {heroCard.label}
          </p>

          <p className="mt-3 font-display text-2xl leading-tight text-fg">
            {heroCard.role}
          </p>
          <p className="font-display text-xl leading-tight text-accent">
            @ {heroCard.company}
          </p>

          <p className="mt-3 text-sm text-muted">{heroCard.location}</p>

          <ul className="mt-5 flex flex-wrap gap-1.5">
            {heroCard.stack.map((t) => (
              <li
                key={t}
                className="rounded-full border border-fg/20 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.12em] text-muted"
              >
                {t}
              </li>
            ))}
          </ul>

          <p className="mt-5 flex items-center gap-2 border-t border-fg/10 pt-4 font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
            <motion.span
              aria-hidden
              animate={reduced ? undefined : { opacity: [1, 0.25, 1] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
              className="inline-block h-1.5 w-1.5 rounded-full bg-accent2"
            />
            {heroCard.footnote}
          </p>
        </div>

        <span className="sr-only">{theme.label} theme</span>
      </motion.div>
    </motion.div>
  );
}
