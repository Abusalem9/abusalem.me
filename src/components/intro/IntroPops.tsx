"use client";

import { motion } from "framer-motion";
import type { Theme } from "@/themes";

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
  // kept clear of dead centre so it doesn't sit under the sound-effect burst
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
    <g stroke="currentColor" fill="none" strokeLinecap="round">
      {angles.map((a, i) => {
        const [x, y] = p(a, 46);
        return (
          <motion.line
            key={i}
            x1={50}
            y1={50}
            x2={x.toFixed(2)}
            y2={y.toFixed(2)}
            strokeWidth={2.4}
            {...line(i, delay)}
          />
        );
      })}
      {rings.map((d, i) => (
        <motion.path key={i} d={d} strokeWidth={2} {...line(i + 8, delay + 0.12)} />
      ))}
    </g>
  );
}

/**
 * An ensō — the Zen brush circle, drawn in one stroke and left open where the
 * brush lifts. Tapered ends and flicked droplets keep it reading as ink
 * rather than a plain ring.
 */
function InkBloom({ delay }: { delay: number }) {
  // open at the top-right, the way a brush leaves it
  const enso =
    "M 68 12 C 40 2 8 24 8 52 C 8 80 32 96 56 94 C 82 92 96 70 92 48 C 89 31 80 20 66 14";
  const drops = [
    [90, 22, 5.5],
    [18, 88, 4.4],
    [76, 88, 3.4],
  ];

  return (
    <g stroke="currentColor" fill="none" strokeLinecap="round">
      {/* the heavy body of the stroke */}
      <motion.path d={enso} strokeWidth={11} opacity={0.95} {...line(0, delay)} />
      {/* a lighter pass on top gives the stroke some grain */}
      <motion.path
        d={enso}
        strokeWidth={4}
        stroke="var(--color-ink)"
        opacity={0.28}
        {...line(1, delay + 0.06)}
      />
      {/* brush flick trailing out of the opening */}
      <motion.path d="M 66 14 q 12 -6 22 -12" strokeWidth={5} {...line(2, delay + 0.18)} />
      {drops.map(([cx, cy, r], i) => (
        <motion.circle
          key={i}
          cx={cx}
          cy={cy}
          r={r}
          fill="currentColor"
          stroke="none"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: [0, 1.35, 1], opacity: 0.85 }}
          style={{ transformOrigin: `${cx}px ${cy}px` }}
          transition={{ duration: 0.4, delay: delay + 0.24 + i * 0.06 }}
        />
      ))}
    </g>
  );
}

/** A minion goggle — rim, lens, strap and rivets. */
function Goggle({ delay }: { delay: number }) {
  return (
    <g stroke="currentColor" fill="none" strokeLinecap="round">
      <motion.path d="M 4 44 H 20 M 80 44 H 96" strokeWidth={9} {...line(0, delay)} />
      <motion.circle cx={50} cy={48} r={31} strokeWidth={8} {...line(1, delay)} />
      <motion.circle cx={50} cy={48} r={19} strokeWidth={4} {...line(2, delay + 0.1)} />
      <motion.circle
        cx={54}
        cy={48}
        r={8}
        fill="currentColor"
        stroke="none"
        initial={{ scale: 0 }}
        animate={{ scale: [0, 1.4, 1] }}
        style={{ transformOrigin: "54px 48px" }}
        transition={{ duration: 0.4, delay: delay + 0.2 }}
      />
      {[0, 1, 2, 3, 4, 5].map((i) => {
        const a = (i / 6) * Math.PI * 2 + 0.4;
        return (
          <motion.circle
            key={i}
            cx={(50 + Math.cos(a) * 38).toFixed(2)}
            cy={(48 + Math.sin(a) * 38).toFixed(2)}
            r={2.6}
            strokeWidth={3}
            {...line(i + 3, delay + 0.16)}
          />
        );
      })}
    </g>
  );
}

/**
 * The load-in: a scatter of small themed motifs pop on one after another and
 * stick, then peel off together to reveal the page.
 */
export default function IntroPops({ theme }: { theme: Theme }) {
  const Motif =
    theme.ornament === "bamboo" ? InkBloom : theme.ornament === "goggle" ? Goggle : SmallWeb;

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
            // overshoot, then settle — it lands and sticks
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
            <Motif delay={spot.d + 0.05} />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}
