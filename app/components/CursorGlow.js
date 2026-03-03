"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export default function CursorGlow() {
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const glowX = useMotionValue(-300);
  const glowY = useMotionValue(-300);
  
  // Fast precision dot
  const x = useSpring(mouseX, { stiffness: 800, damping: 50, mass: 0.1 });
  const y = useSpring(mouseY, { stiffness: 800, damping: 50, mass: 0.1 });
  
  // Slow trailing ambient glow
  const gX = useSpring(glowX, { stiffness: 100, damping: 30, mass: 0.8 });
  const gY = useSpring(glowY, { stiffness: 100, damping: 30, mass: 0.8 });
  
  const [cursorLabel, setCursorLabel] = useState("");
  const [cursorTone, setCursorTone] = useState("default");
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    // Disable custom cursor on touch devices
    if ("ontouchstart" in window || navigator.maxTouchPoints > 0) {
      return;
    }

    const handleMove = (event) => {
      // Small dot position (fast)
      mouseX.set(event.clientX - 4);
      mouseY.set(event.clientY - 4);
      
      // Large glow position (slower trailing)
      glowX.set(event.clientX - 160);
      glowY.set(event.clientY - 160);

      const hovered = document.elementFromPoint(event.clientX, event.clientY)?.closest("[data-cursor-label]");
      const label = hovered?.getAttribute("data-cursor-label") || "";
      const tone = hovered?.getAttribute("data-cursor-tone") || "default";

      setCursorLabel(label);
      setCursorTone(tone);
      setIsHovering(!!label);
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [mouseX, mouseY, glowX, glowY]);

  const toneClass =
    cursorTone === "light"
      ? "bg-[radial-gradient(circle,rgba(255,255,255,0.85)_0%,rgba(255,255,255,0.15)_45%,transparent_70%)]"
      : cursorTone === "accent"
        ? "bg-[radial-gradient(circle,rgba(212,175,55,0.9)_0%,rgba(212,175,55,0.12)_46%,transparent_72%)]"
        : "bg-[radial-gradient(circle,rgba(250,250,250,0.55)_0%,rgba(250,250,250,0.08)_46%,transparent_72%)]";

  return (
    <div className="pointer-events-none fixed inset-0 z-50 hidden md:block mix-blend-difference">
      {/* Large trailing glow */}
      <motion.div
        style={{ x: gX, y: gY }}
        className={`h-80 w-80 rounded-full opacity-30 blur-3xl transition-colors duration-700 ${toneClass}`}
      />
      
      {/* Precision Dot / Label Container */}
      <motion.div
        style={{ x, y }}
        animate={{
          scale: isHovering ? 4 : 1,
          backgroundColor: isHovering ? "rgba(250,250,250,0.1)" : "rgba(250,250,250,0.8)",
          borderColor: isHovering ? "rgba(250,250,250,0.3)" : "rgba(250,250,250,0)",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="absolute h-2 w-2 rounded-full border border-transparent backdrop-blur-[1px] flex items-center justify-center transform-gpu"
      >
        <motion.span 
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovering ? 1 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-[2.5px] uppercase tracking-[0.2em] font-medium text-white whitespace-nowrap"
        >
          {cursorLabel}
        </motion.span>
      </motion.div>
    </div>
  );
}
