"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Reveal } from "./Animations";

const steps = [
  {
    title: "What space are you working with?",
    key: "room",
    options: [
      { label: "Bedroom", value: "bedroom", icon: "🛏️" },
      { label: "Kitchen", value: "kitchen", icon: "🍳" },
      { label: "Living Room", value: "living", icon: "📺" },
      { label: "Other", value: "other", icon: "✨" },
    ],
  },
  {
    title: "What's your preferred style?",
    key: "style",
    options: [
      { label: "Modern & Clean", value: "modern", icon: "◼️" },
      { label: "Classic & Warm", value: "classic", icon: "🪵" },
      { label: "Minimalist", value: "minimalist", icon: "◻️" },
      { label: "Not sure yet", value: "unsure", icon: "🤔" },
    ],
  },
  {
    title: "What's your rough budget?",
    key: "budget",
    options: [
      { label: "Under £1,500", value: "low", icon: "💷" },
      { label: "£1,500 – £3,000", value: "mid", icon: "💷💷" },
      { label: "£3,000 – £5,000", value: "high", icon: "💷💷💷" },
      { label: "£5,000+", value: "premium", icon: "👑" },
    ],
  },
];

const recommendations = {
  bedroom: {
    title: "Fitted Wardrobe",
    description: "A made-to-measure wardrobe designed around your space—sliding, hinged or walk-in, with custom internals.",
    link: "/product/sliding-door-wardrobe",
    cta: "View Wardrobes",
  },
  kitchen: {
    title: "Fitted Kitchen Cabinets",
    description: "Durable, practical units with your choice of modern or classic finishes—designed around how you actually cook.",
    link: "/product/shaker-kitchen-cabinets",
    cta: "View Kitchens",
  },
  living: {
    title: "TV Media Wall Unit",
    description: "A tailored media wall that hides cables, adds storage and creates a clean focal point in your living room.",
    link: "/product/tv-media-wall-unit",
    cta: "View Media Walls",
  },
  other: {
    title: "Custom Storage Solution",
    description: "Whether it's under-stairs storage, a home office or bathroom cabinets—we can build it to fit perfectly.",
    link: "/shop",
    cta: "View All Services",
  },
};

const slideVariants = {
  enter: (direction) => ({ x: direction > 0 ? 200 : -200, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (direction) => ({ x: direction > 0 ? -200 : 200, opacity: 0 }),
};

export default function RoomConfigurator() {
  const [currentStep, setCurrentStep] = useState(0);
  const [selections, setSelections] = useState({});
  const [direction, setDirection] = useState(1);
  const [showResult, setShowResult] = useState(false);

  const handleSelect = (key, value) => {
    const newSelections = { ...selections, [key]: value };
    setSelections(newSelections);
    setDirection(1);

    if (currentStep < steps.length - 1) {
      setTimeout(() => setCurrentStep((prev) => prev + 1), 300);
    } else {
      setTimeout(() => setShowResult(true), 300);
    }
  };

  const handleBack = () => {
    if (showResult) {
      setShowResult(false);
      return;
    }
    if (currentStep > 0) {
      setDirection(-1);
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleReset = () => {
    setDirection(-1);
    setShowResult(false);
    setSelections({});
    setCurrentStep(0);
  };

  const step = steps[currentStep];
  const result = recommendations[selections.room] || recommendations.other;

  return (
    <section className="py-24 md:py-40 px-6 md:px-20" data-cursor-label="Configure" data-cursor-tone="accent">
      <div className="max-w-[900px] mx-auto">
        <Reveal>
          <div className="mb-12 md:mb-16 text-center">
            <p className="label-upper text-foreground/45 mb-3">Interactive</p>
            <h2 className="text-3xl md:text-5xl font-serif brutal-title">Find Your Perfect Fit</h2>
            <p className="text-foreground/60 mt-4 max-w-md mx-auto text-[15px] font-light">
              Answer three quick questions and we&apos;ll recommend the best solution for your space.
            </p>
          </div>
        </Reveal>

        {/* Progress bar */}
        <div className="mb-10">
          <div className="flex justify-between text-[10px] uppercase tracking-[0.25em] text-foreground/50 mb-3">
            <span>Step {showResult ? 3 : currentStep + 1} of 3</span>
            {currentStep > 0 && !showResult && (
              <button onClick={handleBack} className="hover:text-foreground transition-colors">← Back</button>
            )}
            {showResult && (
              <button onClick={handleReset} className="hover:text-foreground transition-colors">↻ Start over</button>
            )}
          </div>
          <div className="h-[2px] bg-foreground/10 overflow-hidden">
            <motion.div
              className="h-full bg-accent"
              animate={{ width: showResult ? "100%" : `${((currentStep + 1) / steps.length) * 100}%` }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
        </div>

        {/* Steps or Result */}
        <div className="min-h-[320px] relative">
          <AnimatePresence mode="wait" custom={direction}>
            {!showResult ? (
              <motion.div
                key={currentStep}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <h3 className="text-2xl md:text-3xl font-serif mb-8 text-center">{step.title}</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {step.options.map((option) => {
                    const isSelected = selections[step.key] === option.value;
                    return (
                      <button
                        key={option.value}
                        onClick={() => handleSelect(step.key, option.value)}
                        className={`brutal-panel p-6 md:p-8 text-center border transition-all duration-300 hover:-translate-y-1 ${
                          isSelected
                            ? "border-accent text-foreground bg-accent/5"
                            : "border-foreground/10 text-foreground/80 hover:border-foreground/30"
                        }`}
                      >
                        <span className="text-3xl block mb-3">{option.icon}</span>
                        <span className="text-[11px] uppercase tracking-[0.2em] font-medium">{option.label}</span>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="text-center"
              >
                <p className="text-[10px] uppercase tracking-[0.3em] text-accent mb-4">Our recommendation</p>
                <h3 className="text-3xl md:text-5xl font-serif brutal-title mb-4">{result.title}</h3>
                <p className="text-foreground/60 max-w-lg mx-auto text-[15px] leading-relaxed mb-8 font-light">
                  {result.description}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href={result.link}
                    className="inline-block border border-foreground/20 bg-transparent text-foreground px-8 py-4 text-[10px] uppercase tracking-[0.3em] hover:bg-accent/15 transition-colors"
                  >
                    {result.cta}
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-block border border-foreground/30 px-8 py-4 text-[10px] uppercase tracking-[0.3em] hover:bg-foreground/10 transition-colors"
                  >
                    Get a Free Quote
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
