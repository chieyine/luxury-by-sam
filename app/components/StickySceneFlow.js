"use client";

import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";

const scenes = [
  {
    title: "Free Consultation",
    copy: "We visit your home (across the UK) to understand your space, storage needs and budget.",
    image:
      "/images/photo-1484101403633-562f891dc89a.jpg",
  },
  {
    title: "Design & Quote",
    copy: "You get a practical design and a clear, competitive quote—no confusion, no hidden extras.",
    image:
      "/images/photo-1618220179428-22790b461013.jpg",
  },
  {
    title: "Build & Install",
    copy: "Your wardrobes, cabinets or media wall are built with care and installed cleanly and professionally.",
    image:
      "/images/photo-1555041469-a586c61ea9bc.jpg",
  },
  {
    title: "Final Check",
    copy: "We check alignment, doors and drawers, finishes and fittings—then we only leave when it’s right.",
    image:
      "/images/photo-1615874959474-d609969a20ed.jpg",
  },
];

export default function StickySceneFlow() {
  const ref = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    const nextIndex = Math.min(scenes.length - 1, Math.floor(value * scenes.length));
    setActiveIndex(nextIndex);
  });

  return (
    <section ref={ref} className="px-6 md:px-20 py-20 md:py-28" data-cursor-label="Scenes" data-cursor-tone="accent">
      <div className="section-shell mb-6 md:mb-8">
        <p className="label-upper text-foreground/45 mb-2">How it works</p>
        <h2 className="text-3xl md:text-5xl font-serif brutal-title">Our Process</h2>
      </div>

      <div className="section-shell grid md:grid-cols-[0.85fr_1.15fr] gap-10 md:gap-16">
        <div className="hidden md:block">
          <div className="sticky top-[14vh] h-[72vh] border border-foreground/14 overflow-hidden brutal-panel">
            {scenes.map((scene, index) => (
              <motion.div
                key={scene.title}
                className="absolute inset-0"
                animate={{ opacity: index === activeIndex ? 1 : 0 }}
                transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              >
                <Image
                  src={scene.image}
                  alt={scene.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 0vw, 50vw"
                  priority={index === 0}
                />
              </motion.div>
            ))}
            <div className="absolute inset-0 bg-linear-to-t from-foreground/40 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <p className="text-[10px] uppercase tracking-[0.3em] opacity-70 mb-2">Active scene</p>
              <h3 className="text-4xl font-serif leading-none">{scenes[activeIndex].title}</h3>
            </div>
          </div>
        </div>

        <div>
          {scenes.map((scene, index) => (
            <article key={scene.title} className="min-h-[72vh] md:min-h-[84vh] py-6 md:py-8 border-b border-foreground/12">
              <p className="label-upper text-foreground/45 mb-3">{String(index + 1).padStart(2, "0")}</p>
              <h3 className="text-3xl md:text-5xl font-serif brutal-title mb-4">{scene.title}</h3>
              <p className="text-foreground/60 leading-[1.6] max-w-lg mb-6 text-[15px]">{scene.copy}</p>
              <div className="md:hidden h-[42vh] border border-foreground/14 relative overflow-hidden">
                <Image
                  src={scene.image}
                  alt={scene.title}
                  fill
                  className="object-cover"
                  sizes="100vw"
                />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
