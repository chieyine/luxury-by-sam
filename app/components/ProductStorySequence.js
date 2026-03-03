"use client";

import { motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { useMemo, useRef, useState } from "react";

export default function ProductStorySequence({ product }) {
  const ref = useRef(null);
  const [activeFrame, setActiveFrame] = useState(0);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const frameImages = useMemo(() => {
    if (product.sequenceFrames?.length) {
      return product.sequenceFrames;
    }
    if (product.image) {
      return [product.image];
    }
    return [];
  }, [product.sequenceFrames, product.image]);

  const imageParallaxY = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const textureParallaxY = useTransform(scrollYProgress, [0, 1], [35, -35]);
  const frameNumber = useTransform(
    scrollYProgress,
    [0, 1],
    [1, Math.max(frameImages.length, 1)]
  );

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    const totalFrames = Math.max(frameImages.length, 1);
    const nextFrame = Math.min(totalFrames - 1, Math.floor(value * totalFrames));
    setActiveFrame(nextFrame);
  });

  return (
    <section ref={ref} className="px-6 md:px-20 py-20 md:py-28">
      <div className="section-shell grid md:grid-cols-[0.8fr_1.2fr] gap-10 md:gap-16 items-end">
        <div className="space-y-4">
          <p className="label-upper text-foreground/45">Project visuals</p>
          <h2 className="text-3xl md:text-5xl font-serif brutal-title">Details & Finish</h2>
          <p className="text-foreground/60 leading-[1.55] max-w-md text-[15px]">
            A closer look at the style and layout. Use this as inspiration, then we’ll tailor the build to your measurements and budget.
          </p>
          <motion.p className="text-[10px] uppercase tracking-[0.3em] text-foreground/45">
            Frame <motion.span>{frameNumber}</motion.span>
          </motion.p>
        </div>

        <div className="relative h-[66vh] md:h-[72vh] border border-foreground/14 overflow-hidden bg-secondary brutal-panel">
          {frameImages.length > 0 ? (
            frameImages.map((frameImage, index) => (
              <motion.div
                key={`${product.slug}-frame-${index}`}
                className="absolute inset-0"
                style={{
                  y: imageParallaxY,
                  backgroundImage: `url(${frameImage})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
                animate={{ opacity: activeFrame === index ? 1 : 0 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              />
            ))
          ) : (
            <motion.div
              className="absolute inset-0"
              style={{
                y: imageParallaxY,
                backgroundImage: product.palette || "linear-gradient(145deg,#efe9de,#d7c8b0 50%,#9a866e)",
              }}
            />
          )}
          <motion.div
            className="absolute inset-0"
            style={{
              y: textureParallaxY,
              background:
                "radial-gradient(circle at 70% 20%, rgba(255,255,255,0.22), transparent 40%), radial-gradient(circle at 25% 75%, rgba(0,0,0,0.14), transparent 45%)",
            }}
          />
          <div className="absolute inset-0 border border-black/10" />
          <div className="absolute bottom-6 left-6 text-[10px] uppercase tracking-[0.3em] text-white/70">
            Built to measure
          </div>
        </div>
      </div>
    </section>
  );
}
