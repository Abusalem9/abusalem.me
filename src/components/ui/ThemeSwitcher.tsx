"use client";

import { motion } from "framer-motion";
import { THEME_IDS, themes } from "@/themes";
import { useTheme } from "@/themes/ThemeProvider";

/** Three little buttons that reskin the whole site. */
export default function ThemeSwitcher({ className = "" }: { className?: string }) {
  const { themeId, setTheme } = useTheme();

  return (
    <div
      role="group"
      aria-label="Theme"
      className={`flex items-center gap-1 rounded-full border border-fg/15 p-1 ${className}`}
    >
      {THEME_IDS.map((id) => {
        const t = themes[id];
        const active = id === themeId;
        return (
          <button
            key={id}
            type="button"
            onClick={() => setTheme(id)}
            aria-pressed={active}
            title={t.label}
            className="relative grid h-8 w-8 place-items-center rounded-full text-base transition-transform hover:scale-110"
          >
            {active && (
              <motion.span
                layoutId="theme-pill"
                className="absolute inset-0 rounded-full bg-accent"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
            <span className={`relative ${active ? "" : "opacity-55"}`}>{t.glyph}</span>
            <span className="sr-only">{t.label}</span>
          </button>
        );
      })}
    </div>
  );
}
