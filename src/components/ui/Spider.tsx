type Props = { size?: number; className?: string };

/** Stylised spider. Inherits `currentColor` so it can be tinted anywhere. */
export default function Spider({ size = 40, className = "" }: Props) {
  const legs: string[] = [];
  for (const s of [-1, 1]) {
    for (let i = 0; i < 4; i++) {
      const x0 = s * 7;
      const y0 = -4 + i * 6;
      const kx = s * (26 + i * 2);
      const ky = -24 + i * 11;
      const fx = s * (36 + i * 1);
      const fy = -6 + i * 15;
      legs.push(`M ${x0} ${y0} L ${kx} ${ky} L ${fx} ${fy}`);
    }
  }

  return (
    <svg
      aria-hidden
      viewBox="-50 -50 100 100"
      width={size}
      height={size}
      className={className}
      fill="none"
    >
      <g stroke="currentColor" strokeWidth={4.5} strokeLinecap="round" strokeLinejoin="round">
        {legs.map((d, i) => (
          <path key={i} d={d} />
        ))}
      </g>
      <ellipse cx={0} cy={10} rx={13} ry={18} fill="currentColor" />
      <circle cx={0} cy={-12} r={9.5} fill="currentColor" />
      <circle cx={-4} cy={-14} r={2.2} fill="var(--color-fg)" />
      <circle cx={4} cy={-14} r={2.2} fill="var(--color-fg)" />
    </svg>
  );
}
