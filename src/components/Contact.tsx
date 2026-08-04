"use client";

import { motion } from "framer-motion";
import { contact, site } from "@/content/portfolio";
import { useTheme } from "@/themes/ThemeProvider";
import Ornament from "./Ornament";
import Section from "./ui/Section";
import SectionHeading from "./ui/SectionHeading";
import ThwipButton from "./ui/ThwipButton";

export default function Contact() {
  const { theme } = useTheme();

  return (
    <Section id="contact" className="overflow-hidden">
      <Ornament corner="tr" size={320} className="text-accent/20" />

      <SectionHeading kicker={`${theme.kicker} 06`} sfx={theme.sfx.contact}>
        {theme.headings.contact}
      </SectionHeading>

      <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:items-start">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6 }}
            className="max-w-lg text-base leading-relaxed text-muted md:text-lg"
          >
            {contact.blurb}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-9"
          >
            <ThwipButton href={`mailto:${contact.email}`}>{contact.email}</ThwipButton>
            {contact.location && (
              <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.25em] text-muted">
                Based in {contact.location}
              </p>
            )}
          </motion.div>
        </div>

        <ul className="grid grid-cols-2 gap-4">
          {contact.socials.map((s, i) => (
            <motion.li
              key={s.label}
              initial={{ opacity: 0, scale: 0.9, rotate: i % 2 ? 3 : -3 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ type: "spring", stiffness: 220, damping: 20, delay: i * 0.07 }}
            >
              <a
                href={s.href}
                target={s.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                data-spidey
                className="panel-light group relative block overflow-hidden bg-ink-soft/80 px-5 py-6 text-center transition-transform duration-300 hover:-translate-y-1"
              >
                <span
                  aria-hidden
                  className="halftone absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-30"
                />
                <span className="relative font-display text-base uppercase tracking-[0.2em] text-fg transition-colors group-hover:text-accent">
                  {s.label}
                </span>
              </a>
            </motion.li>
          ))}
        </ul>
      </div>

      <footer className="mt-24 flex flex-col items-center gap-3 border-t border-fg/10 pt-8 text-center">
        <p className="font-comic text-2xl text-muted">
          {theme.tagline}
        </p>
        <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted/60">
          © {new Date().getFullYear()} {site.name}
        </p>
      </footer>
    </Section>
  );
}
