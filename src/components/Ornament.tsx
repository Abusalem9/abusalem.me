"use client";

import CornerWeb from "./CornerWeb";

export type Corner = "tl" | "tr" | "bl" | "br";

type Props = {
  corner?: Corner;
  size?: number;
  className?: string;
  delay?: number;
};

/** Draws the Spider-Man corner web motif. */
export default function Ornament(props: Props) {
  return <CornerWeb {...props} />;
}
