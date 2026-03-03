"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollChoreography() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 150,
    damping: 24,
    mass: 0.3,
  });

  return (
    <>
      <motion.div
        style={{ scaleX, transformOrigin: "0% 50%" }}
        className="fixed top-0 left-0 right-0 h-[2px] z-80 bg-accent/80"
      />
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-35 hidden md:block"
      >
        <motion.div
          className="absolute left-[8vw] top-[16vh] h-[52vh] w-px bg-foreground/10"
          style={{ scaleY: scaleX, transformOrigin: "top center" }}
        />
      </div>
    </>
  );
}
