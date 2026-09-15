"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Mascot from "./ui/Mascot";

export default function IntroCurtain() {
  const reduced = useReducedMotion();
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (reduced) return;
    const timer = setTimeout(() => {
      setDone(true);
    }, 1100);
    return () => clearTimeout(timer);
  }, [reduced]);

  if (reduced) return null;

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="curtain"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
          }}
          className="pointer-events-none fixed inset-0 z-90 flex items-center justify-center overflow-hidden bg-ink select-none"
        >
          {/* Subtle radial glow matching theme accent */}
          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1.2, opacity: 0.3 }}
            exit={{ scale: 1.8, opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="absolute h-96 w-96 rounded-full bg-accent blur-[110px]"
          />

          {/* Center Brand Identity reveal */}
          <div className="relative flex flex-col items-center">
            <motion.div
              initial={{ scale: 0.7, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 1.15, opacity: 0, y: -12 }}
              transition={{
                duration: 0.5,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="flex items-center gap-3.5"
            >
              <span className="text-accent">
                <Mascot size={42} />
              </span>
              <span className="font-display text-4xl md:text-5xl tracking-wider text-fg">
                ABUSALEM
              </span>
            </motion.div>

            {/* Smooth animated progress line */}
            <div className="mt-5 h-[2px] w-36 overflow-hidden rounded-full bg-fg/15">
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{
                  repeat: Infinity,
                  duration: 0.85,
                  ease: "easeInOut",
                }}
                className="h-full w-full bg-gradient-to-r from-transparent via-accent to-accent2"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
