"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function AmbientCinematicLayer() {
  const [leakTick, setLeakTick] = useState(0);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches) return;

    const handleSceneChange = () => {
      setLeakTick((value) => value + 1);
    };

    window.addEventListener("atelier-scene-change", handleSceneChange);
    return () => window.removeEventListener("atelier-scene-change", handleSceneChange);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-30 overflow-hidden">
      <div className="cinematic-grain" />

      <AnimatePresence mode="wait">
        <motion.div
          key={leakTick}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.16, 0], rotate: [0, 1.5, -1, 0], scale: [1, 1.04, 1] }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(255,195,132,0.35),transparent_45%),radial-gradient(circle_at_80%_65%,rgba(255,240,190,0.22),transparent_48%)]" />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
