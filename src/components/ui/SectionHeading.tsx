"use client";

import { motion } from "framer-motion";
import Divider from "./Divider";
import Sfx from "./Sfx";

type Props = {
  children: React.ReactNode;
  /** Optional sound-effect burst pinned beside the heading */
  sfx?: string;
  kicker?: string;
};

export default function SectionHeading({ children, sfx, kicker }: Props) {
  const text = typeof children === "string" ? children : "";
  const words = text ? text.split(" ") : null;

  return (
    <div className="relative mb-12 md:mb-16">
      {kicker && (
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.5 }}
          className="mb-3 font-mono text-xs uppercase tracking-[0.35em] text-accent"
        >
          {kicker}
        </motion.p>
      )}

      <div className="flex flex-wrap items-center gap-5">
        <h2 className="font-display text-fg text-shadow-comic [font-size:clamp(2.2rem,7vw,4.5rem)] leading-[0.95] tracking-wide">
          {words ? (
            <>
              <span className="sr-only">{text}</span>
              {/* word by word, so a long heading lands as a sequence */}
              <span aria-hidden className="flex flex-wrap gap-x-[0.28em]">
                {words.map((w, i) => (
                  <motion.span
                    key={`${w}-${i}`}
                    initial={{ opacity: 0, y: 34, skewY: 5 }}
                    whileInView={{ opacity: 1, y: 0, skewY: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{
                      duration: 0.55,
                      delay: i * 0.07,
                      ease: [0.2, 0.8, 0.2, 1],
                    }}
                    className="inline-block"
                  >
                    {w}
                  </motion.span>
                ))}
              </span>
            </>
          ) : (
            children
          )}
        </h2>

        {/* On narrow screens the heading fills the row, so the burst is
            pinned to the corner instead of costing a whole line. */}
        {sfx && (
          <span className="absolute right-0 top-0 md:static">
            <Sfx
              text={sfx}
              rotate={-9}
              className="h-16 w-16 shrink-0 md:h-28 md:w-28"
            />
          </span>
        )}
      </div>

      <Divider className="mt-5" />
    </div>
  );
}
