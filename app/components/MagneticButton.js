"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";

export default function MagneticButton({ children, className = "", strength = 45 }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 90, damping: 25, mass: 0.5 });
  const springY = useSpring(y, { stiffness: 90, damping: 25, mass: 0.5 });

  return (
    <motion.div
      style={{ x: springX, y: springY }}
      onMouseMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const relativeX = event.clientX - (rect.left + rect.width / 2);
        const relativeY = event.clientY - (rect.top + rect.height / 2);
        x.set((relativeX / rect.width) * strength);
        y.set((relativeY / rect.height) * strength);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
