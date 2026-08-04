"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useTheme } from "@/themes/ThemeProvider";
import IntroPops from "./intro/IntroPops";
import Sfx from "./ui/Sfx";

/**
 * Page-load beat: a scatter of small themed motifs pop on one by one and
 * stick — webs for Spider-Man, ink blooms for Panda, goggles for the Minions —
 * then peel away together. Skipped entirely for reduced motion.
 */
export default function IntroCurtain() {
  const { theme } = useTheme();
  const reduced = useReducedMotion();
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (reduced) return; // nothing to tear down — the curtain never renders
    const id = setTimeout(() => setDone(true), 1850);
    return () => clearTimeout(id);
  }, [reduced]);

  if (reduced) return null;

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="curtain"
          exit={{ opacity: 0, transition: { duration: 0.35, delay: 0.15 } }}
          className="pointer-events-none fixed inset-0 z-90 overflow-hidden"
        >
          <motion.div
            exit={{ opacity: 0, transition: { duration: 0.5 } }}
            className="absolute inset-0 bg-ink"
          />

          <IntroPops theme={theme} />

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 0.6 } }}
            exit={{ scale: 1.6, opacity: 0, transition: { duration: 0.35 } }}
            className="absolute inset-0 grid place-items-center"
          >
            <Sfx text={theme.intro} trigger="mount" className="h-44 w-44 md:h-56 md:w-56" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
