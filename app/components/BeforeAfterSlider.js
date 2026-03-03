"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Reveal } from "./Animations";

const slides = [
  {
    before: "/images/photo-1484101403633-562f891dc89a.jpg",
    after: "/images/photo-1616486029423-aaa4789e8c9a.jpg",
    label: "Bedroom Wardrobe Transformation",
  },
  {
    before: "/images/photo-1493666438817-866a91353ca9.jpg",
    after: "/images/photo-1615874959474-d609969a20ed.jpg",
    label: "Kitchen Cabinet Upgrade",
  },
];

export default function BeforeAfterSlider() {
  const containerRef = useRef(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const slide = slides[activeSlide];

  const handleMove = (clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * 100;
    setSliderPos(Math.max(2, Math.min(98, x)));
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  };

  useEffect(() => {
    const handleUp = () => setIsDragging(false);
    window.addEventListener("mouseup", handleUp);
    window.addEventListener("touchend", handleUp);
    return () => {
      window.removeEventListener("mouseup", handleUp);
      window.removeEventListener("touchend", handleUp);
    };
  }, []);

  return (
    <section className="py-24 md:py-40 px-6 md:px-20 bg-background" data-cursor-label="Compare" data-cursor-tone="light">
      <div className="max-w-[1400px] mx-auto">
        <Reveal>
          <div className="mb-12 md:mb-20 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <p className="label-upper text-foreground/45 mb-3">Transformations</p>
              <h2 className="text-3xl md:text-6xl font-serif brutal-title">Before & After</h2>
            </div>
            <div className="flex gap-3">
              {slides.map((s, i) => (
                <button
                  key={i}
                  onClick={() => { setActiveSlide(i); setSliderPos(50); }}
                  className={`text-[10px] uppercase tracking-[0.25em] px-4 py-2 border transition-colors duration-300 ${
                    i === activeSlide
                      ? "border-foreground text-foreground"
                      : "border-foreground/20 text-foreground/50 hover:border-foreground/40"
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div
            ref={containerRef}
            className="relative aspect-16/9 md:aspect-21/9 overflow-hidden cursor-col-resize select-none border border-foreground/10"
            onMouseMove={handleMouseMove}
            onTouchMove={handleTouchMove}
            onMouseDown={() => setIsDragging(true)}
            onTouchStart={() => setIsDragging(true)}
          >
            {/* After image (full width, background) */}
            <div className="absolute inset-0">
              <Image
                src={slide.after}
                alt={`${slide.label} — after`}
                fill
                className="object-cover"
                sizes="100vw"
              />
              <div className="absolute bottom-4 right-4 md:bottom-6 md:right-6 text-[10px] uppercase tracking-[0.3em] text-white/80 bg-black/50 backdrop-blur-sm px-3 py-1.5">
                After
              </div>
            </div>

            {/* Before image (clipped to slider position) */}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${sliderPos}%` }}
            >
              <div className="absolute inset-0" style={{ width: `${100 / (sliderPos / 100)}%` }}>
                <Image
                  src={slide.before}
                  alt={`${slide.label} — before`}
                  fill
                  className="object-cover"
                  sizes="100vw"
                />
              </div>
              <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6 text-[10px] uppercase tracking-[0.3em] text-white/80 bg-black/50 backdrop-blur-sm px-3 py-1.5">
                Before
              </div>
            </div>

            {/* Slider handle */}
            <div
              className="absolute top-0 bottom-0 z-10"
              style={{ left: `${sliderPos}%`, transform: "translateX(-50%)" }}
            >
              <div className="h-full w-[2px] bg-white/90 shadow-lg" />
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 bg-white rounded-full shadow-xl flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-5 h-5 text-black" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M8 5l-5 7 5 7M16 5l5 7-5 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
