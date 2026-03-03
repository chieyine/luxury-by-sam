"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";

const wipeVariants = {
  initial: { scaleY: 1 },
  animate: {
    scaleY: 0,
    transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.1 },
  },
  exit: {
    scaleY: 1,
    transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] },
  },
};

const pageVariants = {
  initial: { opacity: 0, y: 30 },
  enter: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.35 },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function RouteTransition({ children }) {
  const pathname = usePathname();
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return children;
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div key={pathname}>
        {/* Full-screen curtain wipe — origin-top so it reveals downward */}
        <motion.div
          className="fixed inset-0 z-[200] bg-foreground origin-top pointer-events-none"
          variants={wipeVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        />

        {/* Secondary accent stripe for depth */}
        <motion.div
          className="fixed inset-0 z-[199] bg-accent/20 origin-top pointer-events-none"
          initial={{ scaleY: 1 }}
          animate={{ scaleY: 0, transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 } }}
          exit={{ scaleY: 1, transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] } }}
        />

        {/* Page content fades in after the curtain pulls away */}
        <motion.div
          variants={pageVariants}
          initial="initial"
          animate="enter"
          exit="exit"
        >
          {children}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
