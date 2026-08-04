"use client";

import { motion } from "framer-motion";
import { about } from "@/content/portfolio";
import { useTheme } from "@/themes/ThemeProvider";
import Section from "./ui/Section";
import SectionHeading from "./ui/SectionHeading";

export default function About() {
  const { theme } = useTheme();

  return (
    <Section id="about">
      <SectionHeading kicker={`${theme.kicker} 01`} sfx={theme.sfx.about}>
        {theme.headings.about}
      </SectionHeading>

      <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
        <div className="space-y-6">
          {about.paragraphs.map((p, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className="text-base leading-relaxed text-muted md:text-lg"
            >
              {/* first letter as a comic drop-cap */}
              {i === 0 ? (
                <>
                  <span className="float-left mr-2 mt-1 font-display text-5xl leading-none text-accent">
                    {p.charAt(0)}
                  </span>
                  {p.slice(1)}
                </>
              ) : (
                p
              )}
            </motion.p>
          ))}
        </div>

        <div className="grid gap-5 sm:grid-cols-3 lg:grid-cols-1 lg:justify-items-end">
          {about.stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, x: 40, rotate: 4 }}
              whileInView={{ opacity: 1, x: 0, rotate: i % 2 ? 1 : -1 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ type: "spring", stiffness: 200, damping: 20, delay: i * 0.1 }}
              whileHover={{ rotate: 0, scale: 1.03 }}
              data-spidey
              className="panel w-full bg-fg px-6 py-5 text-ink lg:max-w-[16rem]"
            >
              <p className="font-display text-4xl leading-none text-accent-ink md:text-5xl">
                {s.value}
              </p>
              <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.25em] text-ink/70">
                {s.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
