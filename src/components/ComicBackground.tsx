"use client";

/**
 * High-performance fixed comic backdrop:
 * Printed-comic halftone dots, native radial-gradient colour washes,
 * and a vignette to keep text readable on top.
 *
 * Uses zero blur passes and zero continuous scroll transforms for 60/120fps smoothness.
 */
export default function ComicBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden transform-gpu">
      {/* Top-left Red wash: Spider-Man theme color */}
      <div
        className="absolute -left-[10vw] -top-[10vh] h-[75vh] w-[75vw] rounded-full bg-[radial-gradient(circle_at_center,color-mix(in_srgb,var(--color-accent)_40%,transparent)_0%,transparent_70%)]"
      />
      {/* Mid-right Blue wash: Secondary comic tint */}
      <div
        className="absolute -right-[10vw] top-[25vh] h-[75vh] w-[75vw] rounded-full bg-[radial-gradient(circle_at_center,color-mix(in_srgb,var(--color-accent2)_35%,transparent)_0%,transparent_70%)]"
      />

      {/* Static halftone dot field */}
      <div className="halftone absolute inset-0 opacity-20" />

      {/* Vignette — preserves readability while letting colour washes shine */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,color-mix(in_srgb,var(--color-ink)_50%,transparent)_35%,color-mix(in_srgb,var(--color-ink)_90%,transparent)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-ink to-transparent" />
    </div>
  );
}
