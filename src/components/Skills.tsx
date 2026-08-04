"use client";

import { motion } from "framer-motion";
import { skillGroups, skills } from "@/content/portfolio";
import { useTheme } from "@/themes/ThemeProvider";
import Section from "./ui/Section";
import SectionHeading from "./ui/SectionHeading";
import Spider from "./ui/Spider";

export default function Skills() {
  const { theme } = useTheme();

  return (
    <Section id="skills">
      <SectionHeading kicker={`${theme.kicker} 02`} sfx={theme.sfx.skills}>
        {theme.headings.skills}
      </SectionHeading>

      <ul className="grid gap-x-14 gap-y-9 md:grid-cols-2">
        {skills.map((skill, i) => (
          <motion.li
            key={skill.name}
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.5, delay: (i % 2) * 0.08 }}
            className="group"
            data-spidey
          >
            <div className="mb-3 flex items-baseline justify-between gap-4">
              <span className="font-display text-lg uppercase tracking-[0.15em] text-fg md:text-xl">
                {skill.name}
              </span>
              <span className="font-mono text-xs text-muted">{skill.level}%</span>
            </div>

            {/* web-strand meter: dashed silk track, solid strand filling in */}
            <div className="relative h-[14px]">
              <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-[repeating-linear-gradient(90deg,var(--color-muted)_0_4px,transparent_4px_10px)] opacity-40" />

              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${skill.level}%` }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 1.1, delay: 0.15, ease: [0.2, 0.8, 0.2, 1] }}
                className="absolute left-0 top-1/2 h-[3px] -translate-y-1/2 rounded-full bg-gradient-to-r from-accent2 via-accent to-accent"
              >
                {/* cross-strands along the filled length */}
                <span
                  aria-hidden
                  className="absolute inset-0 opacity-70 [background:repeating-linear-gradient(90deg,transparent_0_12px,var(--color-fg)_12px_13px)]"
                />
                {/* spider riding the tip */}
                <span className="absolute -right-2 top-1/2 -translate-y-1/2 text-accent transition-transform duration-300 group-hover:scale-125">
                  <Spider size={18} />
                </span>
              </motion.div>
            </div>
          </motion.li>
        ))}
      </ul>

      {/* the full kit, grouped */}
      <div className="mt-20 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((group, i) => (
          <motion.div
            key={group.label}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
            whileHover={{ y: -6 }}
            data-spidey
            className="panel-light group relative overflow-hidden bg-ink-soft/70 p-6 transition-shadow duration-300 hover:shadow-[10px_10px_0_0_var(--color-accent)]"
          >
            <span
              aria-hidden
              className="halftone pointer-events-none absolute inset-0 opacity-[0.06] transition-opacity duration-500 group-hover:opacity-25"
            />
            <h3 className="relative font-display text-lg uppercase tracking-[0.15em] text-accent">
              {group.label}
            </h3>
            <ul className="relative mt-4 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <li
                  key={item}
                  className="rounded-full border border-fg/25 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-muted"
                >
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
