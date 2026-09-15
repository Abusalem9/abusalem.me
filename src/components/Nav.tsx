"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { nav } from "@/content/portfolio";
import { useTheme } from "@/themes/ThemeProvider";
import Mascot from "./ui/Mascot";
import ThemeSwitcher from "./ui/ThemeSwitcher";

export default function Nav() {
  const { theme } = useTheme();
  const [active, setActive] = useState<string>("");
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
  });

  // Highlight whichever section currently owns the middle of the viewport.
  useEffect(() => {
    const ids = nav.map((n) => n.href.slice(1));
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(e.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );
    for (const id of ids) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* web-strand scroll progress bar */}
      <motion.div
        aria-hidden
        style={{ scaleX: progress }}
        className="fixed inset-x-0 top-0 z-50 h-[3px] origin-left bg-gradient-to-r from-accent via-pop to-accent2"
      />

      <header className="fixed inset-x-0 top-0 z-40 px-4 pt-5 md:px-8">
        <nav className="mx-auto flex max-w-6xl items-center justify-between rounded-full border border-fg/15 bg-ink/70 px-4 py-2.5 backdrop-blur-xl md:px-6">
          <a
            href="#top"
            className="group flex items-center gap-2.5 font-display text-sm tracking-widest text-fg"
            aria-label="Back to top"
          >
            <span className="text-accent transition-transform duration-300 group-hover:rotate-[25deg] group-hover:scale-110">
              <Mascot size={24} />
            </span>
            AM
          </a>

          <ul className="hidden items-center gap-1 md:flex">
            {nav.map((item) => {
              const isActive = active === item.href.slice(1);
              return (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="relative block px-4 py-2 text-sm font-medium text-muted transition-colors hover:text-fg"
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-full bg-accent/90"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    )}
                    <span className={`relative ${isActive ? "text-on-accent" : ""}`}>
                      {theme.navLabels[item.href.slice(1)] ?? item.label}
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            <a
              href="/resume"
              className="rounded-full border border-accent/40 bg-accent/10 px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-accent hover:bg-accent hover:text-on-accent transition-colors"
            >
              Resume
            </a>

            <ThemeSwitcher className="hidden sm:flex" />

            <button
              type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label="Toggle menu"
              className="flex h-9 w-9 flex-col items-center justify-center gap-[5px] rounded-full border border-fg/20 md:hidden"
            >
            <motion.span
              animate={open ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              className="block h-[2px] w-4 bg-fg"
            />
            <motion.span
              animate={open ? { opacity: 0 } : { opacity: 1 }}
              className="block h-[2px] w-4 bg-fg"
            />
            <motion.span
              animate={open ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              className="block h-[2px] w-4 bg-fg"
            />
            </button>
          </div>
        </nav>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="mx-auto mt-3 max-w-6xl overflow-hidden rounded-3xl border border-fg/15 bg-ink/95 p-2 backdrop-blur-xl md:hidden"
            >
              <ul>
                {nav.map((item, i) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <a
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="block rounded-2xl px-4 py-3 font-display tracking-widest text-muted hover:bg-accent/20 hover:text-fg"
                    >
                      {theme.navLabels[item.href.slice(1)] ?? item.label}
                    </a>
                  </motion.li>
                ))}
                <motion.li
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: nav.length * 0.05 }}
                >
                  <a
                    href="/resume"
                    onClick={() => setOpen(false)}
                    className="block rounded-2xl px-4 py-3 font-display tracking-widest text-accent hover:bg-accent/20"
                  >
                    Resume (PDF)
                  </a>
                </motion.li>
              </ul>

              {/* the switcher is too wide for the mobile bar, so it lives here */}
              <div className="mt-2 flex items-center justify-between gap-3 border-t border-fg/10 px-4 pb-1 pt-4 sm:hidden">
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted">
                  Theme
                </span>
                <ThemeSwitcher />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
