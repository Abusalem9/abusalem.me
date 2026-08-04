"use client";

import { motion } from "framer-motion";
import { useTheme } from "@/themes/ThemeProvider";
import CornerWeb from "./CornerWeb";

export type Corner = "tl" | "tr" | "bl" | "br";

type Props = {
  corner?: Corner;
  size?: number;
  className?: string;
  delay?: number;
};

const place: Record<Corner, string> = {
  tl: "top-0 left-0",
  tr: "top-0 right-0",
  bl: "bottom-0 left-0",
  br: "bottom-0 right-0",
};

const flip: Record<Corner, string> = {
  tl: "scale(1,1)",
  tr: "scale(-1,1)",
  bl: "scale(1,-1)",
  br: "scale(-1,-1)",
};

const stroke = {
  hidden: { pathLength: 0, opacity: 0 },
  show: { pathLength: 1, opacity: 1 },
};

/** Bamboo stalks with jointed segments and a few leaves. */
function CornerBamboo({ corner = "tl", size = 340, className = "", delay = 0 }: Props) {
  const stalks = [0.22, 0.46, 0.72].map((f, i) => ({
    x: size * f,
    lean: (i - 1) * 6,
    joints: 5 + i,
  }));

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
        {stalks.map((s, i) => (
          <g key={i}>
            <motion.line
              x1={s.x}
              y1={0}
              x2={s.x + s.lean}
              y2={size * 0.82}
              strokeWidth={5}
              variants={stroke}
              initial="hidden"
              animate="show"
              transition={{ duration: 1, delay: delay + i * 0.12 }}
            />
            {Array.from({ length: s.joints }, (_, j) => {
              const t = (j + 1) / (s.joints + 1);
              return (
                <motion.line
                  key={j}
                  x1={s.x + s.lean * t - 7}
                  y1={size * 0.82 * t}
                  x2={s.x + s.lean * t + 7}
                  y2={size * 0.82 * t}
                  strokeWidth={3}
                  variants={stroke}
                  initial="hidden"
                  animate="show"
                  transition={{ duration: 0.4, delay: delay + 0.5 + i * 0.1 + j * 0.05 }}
                />
              );
            })}
            {/* a leaf off every other stalk */}
            {i % 2 === 0 && (
              <motion.path
                d={`M ${s.x} ${size * 0.3} q ${38 + i * 10} -22 ${64 + i * 12} 4`}
                strokeWidth={3}
                variants={stroke}
                initial="hidden"
                animate="show"
                transition={{ duration: 0.7, delay: delay + 0.9 + i * 0.1 }}
              />
            )}
          </g>
        ))}
      </g>
    </svg>
  );
}

/** Goggle rim + strap, the way it sits on a minion's head. */
function CornerGoggle({ corner = "tl", size = 320, className = "", delay = 0 }: Props) {
  const cx = size * 0.3;
  const cy = size * 0.3;
  const r = size * 0.19;

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
        <motion.circle
          cx={cx}
          cy={cy}
          r={r}
          strokeWidth={8}
          variants={stroke}
          initial="hidden"
          animate="show"
          transition={{ duration: 1, delay }}
        />
        <motion.circle
          cx={cx}
          cy={cy}
          r={r * 0.62}
          strokeWidth={4}
          variants={stroke}
          initial="hidden"
          animate="show"
          transition={{ duration: 0.8, delay: delay + 0.2 }}
        />
        {/* strap running off toward the far corner */}
        <motion.path
          d={`M ${cx + r} ${cy - 8} L ${size} ${cy - 30} M ${cx + r} ${cy + 8} L ${size} ${cy + 18}`}
          strokeWidth={9}
          variants={stroke}
          initial="hidden"
          animate="show"
          transition={{ duration: 0.9, delay: delay + 0.35 }}
        />
        {/* rivets around the rim */}
        {Array.from({ length: 6 }, (_, i) => {
          const a = (i / 6) * Math.PI * 2;
          return (
            <motion.circle
              key={i}
              cx={cx + Math.cos(a) * (r + 9)}
              cy={cy + Math.sin(a) * (r + 9)}
              r={3.2}
              strokeWidth={3}
              variants={stroke}
              initial="hidden"
              animate="show"
              transition={{ duration: 0.4, delay: delay + 0.55 + i * 0.06 }}
            />
          );
        })}
      </g>
    </svg>
  );
}

/** Draws whichever corner motif the active theme calls for. */
export default function Ornament(props: Props) {
  const { theme } = useTheme();
  if (theme.ornament === "bamboo") return <CornerBamboo {...props} />;
  if (theme.ornament === "goggle") return <CornerGoggle {...props} />;
  return <CornerWeb {...props} />;
}
