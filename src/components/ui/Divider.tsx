"use client";

import { motion } from "framer-motion";
import { useTheme } from "@/themes/ThemeProvider";

/**
 * Stroke reveal. Children carry only variants — the parent <g> owns the
 * viewport trigger and propagates it down. Putting whileInView on each path
 * individually is unreliable here: these elements are only a few pixels tall,
 * so the intersection threshold isn't dependable.
 */
const draw = {
  hidden: { pathLength: 0, opacity: 0 },
  show: { pathLength: 1, opacity: 1 },
};

/** For strokes that need their dash pattern kept, so pathLength is out. */
const wipe = {
  hidden: { scaleX: 0, opacity: 0 },
  show: { scaleX: 1, opacity: 1 },
};

const pop = {
  hidden: { scale: 0 },
  show: { scale: 1 },
};

const view = { once: true, amount: 0.2 } as const;

export default function Divider({ className = "" }: { className?: string }) {
  const { theme } = useTheme();

  const group = {
    initial: "hidden" as const,
    whileInView: "show" as const,
    viewport: view,
    fill: "none",
    strokeLinecap: "round" as const,
  };

  return (
    <svg
      aria-hidden
      viewBox="0 0 1000 24"
      preserveAspectRatio="none"
      className={`h-5 w-full ${className}`}
    >
      {theme.divider === "web" && (
        <motion.g {...group} stroke="var(--color-accent)">
          <motion.line
            x1={0}
            y1={12}
            x2={1000}
            y2={12}
            strokeWidth={3}
            variants={draw}
            transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
          />
          {/* silk crossing the strand, thinning out to the right */}
          {Array.from({ length: 22 }, (_, i) => {
            const x = 30 + i * 44;
            const h = Math.max(2, 9 - i * 0.34);
            return (
              <motion.line
                key={i}
                x1={x}
                y1={12 - h}
                x2={x}
                y2={12 + h}
                strokeWidth={1.6}
                opacity={Math.max(0.15, 0.8 - i * 0.033)}
                variants={draw}
                transition={{ duration: 0.3, delay: 0.25 + i * 0.02 }}
              />
            );
          })}
        </motion.g>
      )}

      {theme.divider === "brush" && (
        <motion.g {...group} stroke="var(--color-accent)">
          {/* the loaded body of the stroke */}
          <motion.path
            d="M 4 13 C 220 5 420 19 640 11 C 790 6 900 15 996 10"
            strokeWidth={9}
            variants={draw}
            transition={{ duration: 0.9, ease: [0.3, 0.9, 0.3, 1] }}
          />
          {/* a second, lighter pass where the brush starts to run dry */}
          <motion.path
            d="M 620 12 C 760 8 880 16 990 12"
            strokeWidth={2.5}
            opacity={0.55}
            variants={draw}
            transition={{ duration: 0.7, delay: 0.35 }}
          />
        </motion.g>
      )}

      {theme.divider === "stitch" && (
        <motion.g {...group} stroke="var(--color-accent)">
          <motion.line
            x1={0}
            y1={12}
            x2={1000}
            y2={12}
            strokeWidth={4}
            strokeDasharray="18 12"
            variants={wipe}
            style={{ transformOrigin: "left center" }}
            transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
          />
          {/* rivets, like the ones on a pair of dungarees */}
          {[0.06, 0.5, 0.94].map((t, i) => (
            <motion.circle
              key={i}
              cx={t * 1000}
              cy={12}
              r={5}
              fill="var(--color-accent)"
              stroke="none"
              variants={pop}
              style={{ transformOrigin: `${t * 1000}px 12px` }}
              transition={{ type: "spring", stiffness: 400, damping: 12, delay: 0.4 + i * 0.08 }}
            />
          ))}
        </motion.g>
      )}
    </svg>
  );
}
