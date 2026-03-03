"use client";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function Reveal({ children, width = "fit-content", height, delay = 0.25 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="relative overflow-hidden" style={{ width, height }}>
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 56 },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
        style={{ height }}
      >
        {children}
      </motion.div>
    </div>
  );
}

export function ParallaxImage({ src, alt, speed = 0.2 }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", `${Math.round(speed * 100)}%`]);

  return (
    <div ref={ref} className="relative overflow-hidden w-full h-full">
      <motion.img
        src={src}
        alt={alt}
        style={{ y, scale: 1.1 }}
        className="object-cover w-full h-full"
      />
    </div>
  );
}

export function SmoothScroll({ children }) {
  // We use Lenis globally in ScrollChoreography, 
  // so this just acts as a semantic wrapper for individual long-scroll pages
  return <div className="smooth-scroll-container">{children}</div>;
}
