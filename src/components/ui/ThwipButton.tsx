"use client";

import { motion } from "framer-motion";

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: "solid" | "ghost";
  external?: boolean;
};

/**
 * Comic-panel button. The label shifts and a colour panel sweeps in
 * from the left on hover — like a frame cutting to the next beat.
 */
export default function ThwipButton({
  href,
  children,
  variant = "solid",
  external = false,
}: Props) {
  const solid = variant === "solid";

  return (
    <motion.a
      href={href}
      data-spidey
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      whileHover={{ y: -3 }}
      whileTap={{ y: 1, scale: 0.97 }}
      transition={{ type: "spring", stiffness: 420, damping: 22 }}
      className={`group relative inline-flex items-center gap-2 overflow-hidden px-7 py-3.5 font-display text-sm uppercase tracking-[0.2em] transition-shadow ${
        solid
          ? "panel bg-accent text-on-accent hover:shadow-[9px_9px_0_0_var(--color-ink)]"
          : "panel-light bg-transparent text-fg hover:shadow-[9px_9px_0_0_color-mix(in_srgb,var(--color-fg)_35%,transparent)]"
      }`}
    >
      <span
        aria-hidden
        className={`absolute inset-0 origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100 ${
          solid ? "bg-accent2-deep" : "bg-fg"
        }`}
      />
      <span
        className={`relative transition-colors duration-300 ${
          solid ? "" : "group-hover:text-ink"
        }`}
      >
        {children}
      </span>
      <span
        aria-hidden
        className={`relative transition-transform duration-300 group-hover:translate-x-1 ${
          solid ? "" : "group-hover:text-ink"
        }`}
      >
        →
      </span>
    </motion.a>
  );
}
