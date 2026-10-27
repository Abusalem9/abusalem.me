"use client";

import Spider from "./Spider";

type Props = { size?: number; className?: string };

/** The spider that dangles in the hero and sits in the nav. */
export default function Mascot({ size = 40, className = "" }: Props) {
  return <Spider size={size} className={className} />;
}
