"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal } from "./Animations";
import Script from "next/script";

const faqs = [
  {
    question: "Do you charge for the first visit?",
    answer:
      "No. The initial visit and consultation are free. We use it to understand your space, take rough measurements and talk through ideas and budget.",
  },
  {
    question: "Which areas do you cover?",
    answer:
      "We are based in Hertfordshire and regularly work across the surrounding areas and wider UK. Tell us where you are and we'll confirm availability.",
  },
  {
    question: "What does a typical project cost?",
    answer:
      "Every room is different, but most fitted wardrobes and smaller storage projects start from around the lower thousands, and full kitchens from a few thousand upwards. We'll always give you a clear written quote before any work begins.",
  },
  {
    question: "How long does installation usually take?",
    answer:
      "Smaller wardrobe or storage installs can often be completed in 1–2 days. Kitchens and larger projects may take longer. We'll confirm timings once we've finalised your design.",
  },
  {
    question: "Can you remove old wardrobes or cabinets?",
    answer:
      "Yes. We can remove and dispose of old units as part of the project. We'll include this clearly in your quote so there are no surprises.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="px-6 md:px-20 py-24 md:py-32 bg-background" data-cursor-label="FAQ" data-cursor-tone="default">
      <Script
        id="json-ld-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className="max-w-[1400px] mx-auto grid md:grid-cols-[0.8fr_1.2fr] gap-12 md:gap-20 items-start">
        <Reveal>
          <div>
            <p className="label-upper text-foreground/45 mb-3">Questions</p>
            <h2 className="text-3xl md:text-5xl font-serif brutal-title mb-4">Common Things People Ask</h2>
            <p className="text-foreground/60 text-[15px] md:text-base leading-[1.6] max-w-md">
              If you&apos;re not sure where to start, these answers will give you a feel for how we work. If anything isn&apos;t
              covered, just send us a quick message.
            </p>
          </div>
        </Reveal>

        <div className="space-y-4">
          {faqs.map((item, index) => {
            const isOpen = index === openIndex;
            return (
              <Reveal key={item.question} width="100%">
                <div className="brutal-panel border border-foreground/14 hover:border-foreground/30 transition-colors overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? -1 : index)}
                    className="w-full text-left p-5 md:p-6"
                    aria-expanded={isOpen}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <h3 className="font-serif text-lg md:text-xl">{item.question}</h3>
                      <motion.span
                        className="text-[10px] uppercase tracking-[0.25em] text-foreground/50 shrink-0"
                        animate={{ rotate: isOpen ? 45 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        {isOpen ? "✕" : "+"}
                      </motion.span>
                    </div>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="px-5 md:px-6 pb-5 md:pb-6 text-sm md:text-[15px] text-foreground/70 leading-relaxed">
                          {item.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
