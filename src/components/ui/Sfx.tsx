"use client";

import { motion } from "framer-motion";

/** Comic-book starburst points around a 100×100 box. */
function starPoints(spikes: number, outer: number, inner: number) {
  const pts: string[] = [];
  for (let i = 0; i < spikes * 2; i++) {
    const r = i % 2 === 0 ? outer : inner;
    const a = (i / (spikes * 2)) * Math.PI * 2 - Math.PI / 2;
    pts.push(`${50 + Math.cos(a) * r},${50 + Math.sin(a) * r}`);
  }
  return pts.join(" ");
}

type Props = {
  text: string;
  className?: string;
  color?: string;
  rotate?: number;
  /** Pop in when scrolled into view (default) or immediately on mount */
  trigger?: "view" | "mount";
};

/** A THWIP!/BAM! sound-effect burst that springs into place. */
export default function Sfx({
  text,
  className = "",
  color = "var(--color-pop)",
  rotate = -9,
  trigger = "view",
}: Props) {
  const animateProps =
    trigger === "mount"
      ? { animate: { scale: 1, rotate } }
      : {
          whileInView: { scale: 1, rotate },
          viewport: { once: true, amount: 0.6 },
        };

  return (
    <motion.div
      aria-hidden
      initial={{ scale: 0, rotate: rotate - 45 }}
      {...animateProps}
      transition={{ type: "spring", stiffness: 280, damping: 12 }}
      className={`relative grid place-items-center ${className}`}
    >
      {/* The label lives inside the SVG so it scales with the star at any size.
          Words vary a lot across themes (ZAP! vs TULALILOO!), so the type size
          is derived from the word length and clamped to the star's inner width. */}
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
        <polygon
          points={starPoints(11, 50, 33)}
          fill={color}
          stroke="var(--color-ink)"
          strokeWidth={3}
          strokeLinejoin="round"
        />
        <text
          x={50}
          y={50}
          textAnchor="middle"
          dominantBaseline="central"
          fill="var(--color-ink)"
          fontSize={Math.min(27, 58 / (0.58 * Math.max(text.length, 4)))}
          className="font-comic"
        >
          {text}
        </text>
      </svg>
    </motion.div>
  );
}
