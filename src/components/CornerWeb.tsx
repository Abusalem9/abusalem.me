"use client";

import { motion } from "framer-motion";

type Props = {
  /** Which corner the web is anchored to */
  corner?: "tl" | "tr" | "bl" | "br";
  size?: number;
  rings?: number;
  spokes?: number;
  className?: string;
  /** Draw-on delay, in seconds */
  delay?: number;
};

/**
 * A quarter spider-web anchored to a corner. Spokes fan out from the
 * anchor point and the connecting strands sag between them, the way
 * real web silk does. Draws itself in on mount.
 */
export default function CornerWeb({
  corner = "tl",
  size = 340,
  rings = 5,
  spokes = 6,
  className = "",
  delay = 0,
}: Props) {
  // Coordinates are rounded so the markup React renders on the server is
  // byte-identical to the client's — float tails cause hydration warnings.
  const r3 = (n: number) => Number(n.toFixed(3));

  const angles = Array.from(
    { length: spokes },
    (_, i) => (i / (spokes - 1)) * (Math.PI / 2),
  );

  const spokeLines = angles.map((a) => ({
    x: r3(Math.cos(a) * size),
    y: r3(Math.sin(a) * size),
  }));

  // Each ring is a chain of sagging strands between neighbouring spokes.
  const ringPaths = Array.from({ length: rings }, (_, r) => {
    const radius = ((r + 1) / rings) * size * 0.92;
    let d = "";
    for (let i = 0; i < angles.length - 1; i++) {
      const a1 = angles[i];
      const a2 = angles[i + 1];
      const x1 = r3(Math.cos(a1) * radius);
      const y1 = r3(Math.sin(a1) * radius);
      const x2 = r3(Math.cos(a2) * radius);
      const y2 = r3(Math.sin(a2) * radius);
      // Control point pulled toward the anchor → the strand sags inward.
      const mid = (a1 + a2) / 2;
      const cx = r3(Math.cos(mid) * radius * 0.82);
      const cy = r3(Math.sin(mid) * radius * 0.82);
      if (i === 0) d += `M ${x1} ${y1} `;
      d += `Q ${cx} ${cy} ${x2} ${y2} `;
    }
    return d.trim();
  });

  const flip: Record<string, string> = {
    tl: "scale(1,1)",
    tr: "scale(-1,1)",
    bl: "scale(1,-1)",
    br: "scale(-1,-1)",
  };
  const place: Record<string, string> = {
    tl: "top-0 left-0",
    tr: "top-0 right-0",
    bl: "bottom-0 left-0",
    br: "bottom-0 right-0",
  };

  const stroke = {
    hidden: { pathLength: 0, opacity: 0 },
    show: { pathLength: 1, opacity: 1 },
  };

  return (
    <svg
      aria-hidden
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className={`pointer-events-none absolute ${place[corner]} ${className}`}
    >
      <g
        transform={flip[corner]}
        style={{ transformOrigin: "center", transformBox: "fill-box" }}
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
      >
        {spokeLines.map((p, i) => (
          <motion.line
            key={`s-${i}`}
            x1={0}
            y1={0}
            x2={p.x}
            y2={p.y}
            strokeWidth={1}
            variants={stroke}
            initial="hidden"
            animate="show"
            transition={{ duration: 0.9, delay: delay + i * 0.05 }}
          />
        ))}
        {ringPaths.map((d, i) => (
          <motion.path
            key={`r-${i}`}
            d={d}
            strokeWidth={0.9}
            variants={stroke}
            initial="hidden"
            animate="show"
            transition={{ duration: 1.1, delay: delay + 0.25 + i * 0.09 }}
          />
        ))}
      </g>
    </svg>
  );
}
