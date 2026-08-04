"use client";

import { motion } from "framer-motion";
import { projects, type Project } from "@/content/portfolio";
import { useTheme } from "@/themes/ThemeProvider";
import Section from "./ui/Section";
import SectionHeading from "./ui/SectionHeading";
import Sfx from "./ui/Sfx";

/** Concentric spider-sense arcs that pulse out while a card is hovered. */
function SpiderSense() {
  return (
    <span aria-hidden className="pointer-events-none absolute -right-3 -top-3 h-24 w-24">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          variants={{
            rest: { scale: 0.3, opacity: 0 },
            hover: {
              scale: [0.3, 1.15],
              opacity: [0.85, 0],
              transition: {
                duration: 1.2,
                repeat: Infinity,
                delay: i * 0.4,
                ease: "easeOut",
              },
            },
          }}
          className="absolute inset-0 rounded-full border-2 border-accent"
        />
      ))}
    </span>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const { theme } = useTheme();
  const sfx = project.sfx ?? theme.projectSfx[index % theme.projectSfx.length];
  return (
    <motion.article
      initial="rest"
      whileInView="rest"
      whileHover="hover"
      whileFocus="hover"
      viewport={{ once: true }}
      data-spidey
      className="group relative"
    >
      <motion.div
        initial={{ opacity: 0, y: 40, rotate: index % 2 ? 1.5 : -1.5 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.6, delay: (index % 2) * 0.1 }}
        variants={{
          rest: { y: 0, rotate: 0 },
          hover: { y: -8, rotate: index % 2 ? 0.8 : -0.8 },
        }}
        className="panel-light relative h-full overflow-hidden bg-ink-soft/90 p-7 backdrop-blur-sm transition-shadow duration-300 group-hover:shadow-[10px_10px_0_0_var(--color-accent)] md:p-9"
      >
        {/* halftone wash that lights up on hover */}
        <span
          aria-hidden
          className="halftone pointer-events-none absolute inset-0 opacity-[0.07] transition-opacity duration-500 group-hover:opacity-25"
        />

        <SpiderSense />

        <span className="relative font-mono text-xs tracking-[0.3em] text-accent">
          #{String(index + 1).padStart(2, "0")}
        </span>

        {/* stamped on hover — absolute so it never reserves layout space */}
        <motion.div
          variants={{
            rest: { scale: 0, rotate: -40, opacity: 0 },
            hover: { scale: 1, rotate: -10, opacity: 1 },
          }}
          transition={{ type: "spring", stiffness: 300, damping: 14 }}
          className="pointer-events-none absolute right-5 top-4"
        >
          <Sfx text={sfx} trigger="mount" className="h-16 w-16" />
        </motion.div>

        <h3 className="relative mt-4 font-display text-3xl leading-none tracking-wide text-fg md:text-4xl">
          {project.title}
        </h3>
        <p className="relative mt-2 text-sm italic text-accent2">
          {project.tagline}
        </p>
        <p className="relative mt-5 text-sm leading-relaxed text-muted md:text-base">
          {project.description}
        </p>

        <ul className="relative mt-6 flex flex-wrap gap-2">
          {project.tags.map((t) => (
            <li
              key={t}
              className="rounded-full border border-fg/25 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.15em] text-muted"
            >
              {t}
            </li>
          ))}
        </ul>

        {(project.href || project.repo) && (
          <div className="relative mt-7 flex flex-wrap gap-5">
            {project.href && (
              <a
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group/link font-display text-sm uppercase tracking-[0.2em] text-fg hover:text-accent"
              >
                Live
                <span className="ml-1 inline-block transition-transform group-hover/link:translate-x-1">
                  →
                </span>
              </a>
            )}
            {project.repo && (
              <a
                href={project.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="group/link font-display text-sm uppercase tracking-[0.2em] text-muted hover:text-accent"
              >
                Code
                <span className="ml-1 inline-block transition-transform group-hover/link:translate-x-1">
                  →
                </span>
              </a>
            )}
          </div>
        )}
      </motion.div>
    </motion.article>
  );
}

export default function Projects() {
  const { theme } = useTheme();

  return (
    <Section id="work">
      <SectionHeading kicker={`${theme.kicker} 03`} sfx={theme.sfx.work}>
        {theme.headings.work}
      </SectionHeading>

      <div className="grid gap-8 md:grid-cols-2 md:gap-10">
        {projects.map((p, i) => (
          <ProjectCard key={p.title} project={p} index={i} />
        ))}
      </div>
    </Section>
  );
}
