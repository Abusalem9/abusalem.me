"use client";

import { useTheme } from "@/themes/ThemeProvider";
import Spider from "./Spider";

type Props = { size?: number; className?: string };

/** Kung Fu Panda: a paper lantern, the kind that hangs in the Jade Palace. */
function Lantern({ size = 40, className = "" }: Props) {
  return (
    <svg aria-hidden viewBox="-50 -50 100 100" width={size} height={size} className={className}>
      <rect x={-16} y={-34} width={32} height={7} rx={2} fill="currentColor" />
      <ellipse cx={0} cy={0} rx={30} ry={27} fill="currentColor" />
      <g stroke="var(--color-ink)" strokeWidth={1.6} opacity={0.45} fill="none">
        <ellipse cx={0} cy={0} rx={10} ry={27} />
        <ellipse cx={0} cy={0} rx={20} ry={27} />
      </g>
      <rect x={-16} y={26} width={32} height={7} rx={2} fill="currentColor" />
      {/* tassel */}
      <line x1={0} y1={33} x2={0} y2={46} stroke="currentColor" strokeWidth={3} strokeLinecap="round" />
    </svg>
  );
}

/** Minions: one of the little guys, dangling. */
function Minion({ size = 40, className = "" }: Props) {
  return (
    <svg aria-hidden viewBox="-50 -50 100 100" width={size} height={size} className={className}>
      {/* body */}
      <rect x={-24} y={-30} width={48} height={66} rx={24} fill="currentColor" />
      {/* goggle strap */}
      <rect x={-24} y={-16} width={48} height={7} fill="var(--color-ink)" />
      {/* goggle */}
      <circle cx={0} cy={-12} r={13} fill="var(--color-ink)" />
      <circle cx={0} cy={-12} r={9} fill="#ffffff" />
      <circle cx={2} cy={-12} r={4} fill="#5a3a1a" />
      <circle cx={2} cy={-12} r={2} fill="var(--color-ink)" />
      {/* mouth */}
      <path d="M -7 8 q 7 7 14 0" stroke="var(--color-ink)" strokeWidth={3} fill="none" strokeLinecap="round" />
      {/* hair */}
      <path
        d="M -6 -30 q 3 -8 7 -3 M 4 -31 q 4 -7 7 -1"
        stroke="var(--color-ink)"
        strokeWidth={2.5}
        fill="none"
        strokeLinecap="round"
      />
      {/* dungaree line */}
      <path d="M -24 18 h 48" stroke="var(--color-ink)" strokeWidth={3} opacity={0.5} />
    </svg>
  );
}

/** The thing that dangles in the hero and sits in the nav. */
export default function Mascot({ size = 40, className = "" }: Props) {
  const { themeId } = useTheme();
  if (themeId === "panda") return <Lantern size={size} className={className} />;
  if (themeId === "minion") return <Minion size={size} className={className} />;
  return <Spider size={size} className={className} />;
}
