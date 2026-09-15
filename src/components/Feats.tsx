"use client";

import { motion } from "framer-motion";
import { achievements, feats, repoContributions } from "@/content/portfolio";
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

      {/* 40+ Repositories Breakdown Showcase */}
      <div className="mt-14 border-t border-fg/10 pt-10">
        <div className="mb-8 flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-accent">
              Platform Footprint
            </span>
            <span className="rounded-full bg-accent/15 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-accent">
              40+ Repositories
            </span>
          </div>
          <h3 className="font-display text-2xl uppercase tracking-wide text-fg md:text-3xl">
            Systems & Repositories Contributed
          </h3>
          <p className="max-w-2xl text-sm leading-relaxed text-muted md:text-base">
            From zero-to-one microservices to real-time shop-floor agents, shared platform starters, 
            and automated test suites — here is a snapshot across the repository ecosystem I helped build and scale.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {repoContributions.map((cat, idx) => (
            <motion.div
              key={cat.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -4, transition: { duration: 0.25 } }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              data-spidey
              className="panel-light bg-ink-soft/80 p-6 backdrop-blur-sm transition-all duration-300 hover:border-accent/40 hover:shadow-[6px_6px_0_0_var(--color-accent)]"
            >
              <h4 className="border-b border-fg/10 pb-3 font-display text-base uppercase tracking-wider text-accent">
                {cat.category}
              </h4>
              <ul className="mt-4 divide-y divide-fg/5 space-y-3">
                {cat.repos.map((r) => (
                  <motion.li
                    key={r.name}
                    whileHover={{ x: 4 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    className="pt-3 first:pt-0 group/item cursor-default"
                  >
                    <div className="flex flex-wrap items-baseline justify-between gap-1.5">
                      <span className="font-mono text-xs font-semibold text-fg tracking-wide group-hover/item:text-accent transition-colors">
                        {r.name}
                      </span>
                      <span className="font-mono text-[10px] uppercase tracking-wider text-accent2">
                        {r.role}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-muted leading-relaxed">
                      {r.desc}
                    </p>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
