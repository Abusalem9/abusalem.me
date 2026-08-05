"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { education, experience } from "@/content/portfolio";
import { useTheme } from "@/themes/ThemeProvider";
import Section from "./ui/Section";
import SectionHeading from "./ui/SectionHeading";

export default function Experience() {
  const { theme } = useTheme();
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start 0.75", "end 0.55"],
  });
  const draw = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 26,
    restDelta: 0.001,
  });

  return (
    <Section id="experience">
      <SectionHeading kicker={`${theme.kicker} 04`} sfx={theme.sfx.experience}>
        {theme.headings.experience}
      </SectionHeading>

      <div ref={trackRef} className="relative ml-2 md:ml-4">
        {/* the strand: faint full-length track + a bright line that pays out as you scroll */}
        <span
          aria-hidden
          className="absolute left-0 top-2 h-[calc(100%-1rem)] w-px bg-[repeating-linear-gradient(180deg,var(--color-muted)_0_5px,transparent_5px_12px)] opacity-30"
        />
        <motion.span
          aria-hidden
          style={{ scaleY: draw }}
          className="absolute left-0 top-2 h-[calc(100%-1rem)] w-px origin-top bg-gradient-to-b from-accent via-accent to-accent2"
        />

        <ol className="space-y-16">
          {experience.map((job) => (
            <li key={job.company} className="relative pl-8 md:pl-12 lg:grid lg:grid-cols-[16rem_1fr] lg:gap-10">
              {/* company node */}
              <motion.span
                aria-hidden
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ type: "spring", stiffness: 320, damping: 16 }}
                className="absolute -left-[9px] top-1 grid h-[19px] w-[19px] place-items-center rounded-full border-2 border-ink bg-accent"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-fg" />
              </motion.span>

              <motion.header
                initial={{ opacity: 0, x: 34 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.55, ease: [0.2, 0.8, 0.2, 1] }}
                // the company stays pinned while its roles scroll past
                className="lg:sticky lg:top-28 lg:self-start"
              >
                <h3 className="font-display text-3xl uppercase tracking-wide text-fg md:text-4xl">
                  {job.company}
                </h3>
                {job.note && (
                  <p className="mt-1 font-comic text-lg text-accent">{job.note}</p>
                )}
                <p className="mt-1.5 font-mono text-[11px] uppercase tracking-[0.25em] text-muted">
                  {job.period}
                  {job.location ? ` · ${job.location}` : ""}
                </p>
              </motion.header>

              <ol className="mt-8 space-y-10 lg:mt-0">
                {job.roles.map((role, r) => (
                  <motion.li
                    key={role.title}
                    initial={{ opacity: 0, y: 26 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.25 }}
                    transition={{ duration: 0.55, delay: r * 0.08 }}
                    className="group relative border-l-2 border-fg/15 pl-6 transition-colors hover:border-accent"
                    data-spidey
                  >
                    <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                      <h4 className="font-display text-xl uppercase tracking-wide text-fg md:text-2xl">
                        {role.title}
                      </h4>
                      <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent2">
                        {role.period}
                      </span>
                    </div>

                    <ul className="mt-4 max-w-3xl space-y-2.5">
                      {role.points.map((pt, k) => (
                        <li
                          key={k}
                          className="relative pl-5 text-sm leading-relaxed text-muted md:text-base"
                        >
                          <span
                            aria-hidden
                            className="absolute left-0 top-[0.65em] h-[6px] w-[6px] -translate-y-1/2 rotate-45 bg-accent2"
                          />
                          {pt}
                        </li>
                      ))}
                    </ul>
                  </motion.li>
                ))}
              </ol>
            </li>
          ))}

          {/* education, on the same strand */}
          <li className="relative pl-8 md:pl-12">
            <motion.span
              aria-hidden
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ type: "spring", stiffness: 320, damping: 16 }}
              className="absolute -left-[9px] top-1 grid h-[19px] w-[19px] place-items-center rounded-full border-2 border-ink bg-accent2"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-fg" />
            </motion.span>

            <h3 className="font-display text-2xl uppercase tracking-wide text-fg md:text-3xl">
              Training
            </h3>

            <ul className="mt-6 grid gap-5 sm:grid-cols-2">
              {education.map((e, i) => (
                <motion.li
                  key={e.title}
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  data-spidey
                  className="panel-light bg-ink-soft/70 p-5 transition-transform duration-300 hover:-translate-y-1"
                >
                  <p className="font-display text-base uppercase tracking-wide text-fg">
                    {e.title}
                  </p>
                  <p className="mt-1.5 text-sm text-muted">{e.place}</p>
                  <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-muted/70">
                    {e.period}
                  </p>
                </motion.li>
              ))}
            </ul>
          </li>
        </ol>
      </div>
    </Section>
  );
}
