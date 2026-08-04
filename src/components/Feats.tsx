"use client";

import { motion } from "framer-motion";
import { achievements, feats } from "@/content/portfolio";
import { useTheme } from "@/themes/ThemeProvider";
import Ornament from "./Ornament";
import Section from "./ui/Section";
import SectionHeading from "./ui/SectionHeading";

export default function Feats() {
  const { theme } = useTheme();

  return (
    <Section id="feats" className="overflow-hidden">
      <Ornament corner="bl" size={280} className="text-accent2/20" />

      <SectionHeading kicker={`${theme.kicker} 05`} sfx={theme.sfx.feats}>
        {theme.headings.feats}
      </SectionHeading>

      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {feats.map((f, i) => (
          <motion.li
            key={`${f.value}-${f.label}`}
            initial={{ opacity: 0, scale: 0.9, rotate: i % 2 ? 2 : -2 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ type: "spring", stiffness: 210, damping: 20, delay: (i % 3) * 0.08 }}
            whileHover={{ y: -6, rotate: i % 2 ? 1 : -1 }}
            data-spidey
            className="panel relative overflow-hidden bg-fg px-6 py-6 text-ink"
          >
            <span
              aria-hidden
              className="halftone pointer-events-none absolute inset-0 opacity-[0.12]"
            />
            <p className="relative font-display text-5xl leading-none text-accent-ink md:text-6xl">
              {f.value}
            </p>
            <p className="relative mt-3 font-display text-sm uppercase tracking-[0.15em] text-ink">
              {f.label}
            </p>
            <p className="relative mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-ink/60">
              {f.detail}
            </p>
          </motion.li>
        ))}
      </ul>

      <ul className="mt-10 grid gap-6 md:grid-cols-2">
        {achievements.map((a, i) => (
          <motion.li
            key={a.title}
            initial={{ opacity: 0, x: i % 2 ? 30 : -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.55, delay: i * 0.08 }}
            data-spidey
            className="panel-light group bg-ink-soft/70 p-6 transition-transform duration-300 hover:-translate-y-1"
          >
            <h3 className="font-display text-xl uppercase tracking-wide text-fg">
              {a.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted md:text-base">
              {a.detail}
            </p>
          </motion.li>
        ))}
      </ul>
    </Section>
  );
}
