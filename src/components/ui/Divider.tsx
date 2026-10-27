"use client";

import { motion } from "framer-motion";

const draw = {
  hidden: { pathLength: 0, opacity: 0 },
  show: { pathLength: 1, opacity: 1 },
};

const view = { once: true, amount: 0.2 } as const;

export default function Divider({ className = "" }: { className?: string }) {
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
    </svg>
  );
}
