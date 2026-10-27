"use client";

import { motion } from "framer-motion";

/** Scatter positions, fixed rather than random so SSR and the client agree. */
const SPOTS = [
  { x: 13, y: 20, s: 168, r: -12, d: 0.0 },
  { x: 63, y: 13, s: 190, r: -6, d: 0.08 },
  { x: 35, y: 9, s: 124, r: 9, d: 0.19 },
  { x: 79, y: 60, s: 172, r: -9, d: 0.13 },
  { x: 24, y: 80, s: 182, r: -11, d: 0.22 },
  { x: 88, y: 26, s: 138, r: 14, d: 0.28 },
  { x: 7, y: 55, s: 132, r: 7, d: 0.34 },
  { x: 53, y: 76, s: 130, r: 12, d: 0.4 },
  { x: 93, y: 87, s: 118, r: 10, d: 0.46 },
  { x: 70, y: 90, s: 104, r: -14, d: 0.52 },
];

const draw = {
  hidden: { pathLength: 0, opacity: 0 },
  show: { pathLength: 1, opacity: 1 },
};

const line = (i: number, delay: number) => ({
  variants: draw,
  initial: "hidden" as const,
  animate: "show" as const,
  transition: { duration: 0.32, delay: delay + i * 0.012, ease: [0.16, 1, 0.3, 1] as const },
});

/** A small spider web — spokes plus sagging silk. */
function SmallWeb({ delay }: { delay: number }) {
  const SPOKES = 8;
  const angles = Array.from({ length: SPOKES }, (_, i) => (i / SPOKES) * Math.PI * 2);
  const p = (a: number, r: number) => [50 + Math.cos(a) * r, 50 + Math.sin(a) * r];

  const rings = [0.42, 0.7, 0.96].map((t) => {
    let d = "";
    for (let i = 0; i <= SPOKES; i++) {
      const a1 = angles[i % SPOKES];
      const a2 = angles[(i + 1) % SPOKES];
      const [x1, y1] = p(a1, 46 * t);
      const [x2, y2] = p(a2, 46 * t);
      const [cx, cy] = p(a1 + Math.PI / SPOKES, 46 * t * 0.84);
      if (i === 0) d += `M ${x1.toFixed(2)} ${y1.toFixed(2)} `;
      d += `Q ${cx.toFixed(2)} ${cy.toFixed(2)} ${x2.toFixed(2)} ${y2.toFixed(2)} `;
    }
    return d.trim();
  });

  return (
    <g
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      opacity={0.8}
    >
      {angles.map((a, i) => {
        const [x2, y2] = p(a, 46);
        return (
          <motion.line
            key={i}
            x1={50}
            y1={50}
            x2={x2}
            y2={y2}
            strokeWidth={1.8}
            {...line(i, delay)}
          />
        );
      })}
      {rings.map((d, i) => (
        <motion.path
          key={i}
          d={d}
          strokeWidth={1.4}
          opacity={0.85}
          variants={draw}
          initial="hidden"
          animate="show"
          transition={{ duration: 0.45, delay: delay + 0.18 + i * 0.08 }}
        />
      ))}
      <circle cx={50} cy={50} r={2.4} fill="currentColor" />
    </g>
  );
}

/**
 * The load-in: small web motifs pop on one after another and stick.
 */
export default function IntroPops() {
  return (
    <div className="absolute inset-0">
      {SPOTS.map((spot, i) => (
        <motion.div
          key={i}
          className="absolute text-fg"
          style={{
            left: `${spot.x}%`,
            top: `${spot.y}%`,
            width: spot.s,
            height: spot.s,
            marginLeft: -spot.s / 2,
            marginTop: -spot.s / 2,
          }}
          initial={{ scale: 0, opacity: 0, rotate: spot.r - 30 }}
          animate={{
            scale: [0, 1.18, 1],
            opacity: [0, 1, 0.85],
            rotate: spot.r,
          }}
          exit={{
            scale: 1.5,
            opacity: 0,
            transition: { duration: 0.4, delay: i * 0.022, ease: [0.7, 0, 0.3, 1] },
          }}
          transition={{ duration: 0.5, delay: spot.d, ease: [0.16, 1, 0.3, 1] }}
        >
          <svg viewBox="0 0 100 100" className="h-full w-full">
            <SmallWeb delay={spot.d + 0.05} />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}
