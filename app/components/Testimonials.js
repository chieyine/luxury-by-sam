"use client";

import { Reveal } from "./Animations";

const testimonials = [
  {
    name: "James T.",
    location: "Hertfordshire",
    text: "Sam fitted our bedroom wardrobes perfectly—clean work, no mess, and exactly what we asked for. Couldn't be happier.",
    project: "Fitted Wardrobes",
  },
  {
    name: "Sarah M.",
    location: "Hemel Hempstead",
    text: "We wanted a modern kitchen on a sensible budget. Sam delivered something that looks and feels twice the price. Really impressed.",
    project: "Kitchen Cabinets",
  },
  {
    name: "David & Claire",
    location: "St Albans",
    text: "The media wall completely transformed our living room. The cable management is brilliant and the finish is flawless.",
    project: "Media Wall",
  },
  {
    name: "Priya K.",
    location: "Harrow",
    text: "Professional from start to finish. Sam measured everything twice, quoted fairly, and installed in two days. No drama, just quality work.",
    project: "Walk-In Wardrobe",
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 md:py-40 px-6 md:px-20 bg-background" data-cursor-label="Reviews" data-cursor-tone="accent">
      <div className="max-w-[1400px] mx-auto">
        <Reveal>
          <div className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8 mt-12">
            <div>
              <p className="label-upper text-foreground/45 mb-3">Testimonials</p>
              <h2 className="text-4xl md:text-6xl font-serif brutal-title max-w-2xl">
                What Our Customers Say
              </h2>
            </div>
            <p className="text-[15px] font-light text-foreground/60 max-w-md pb-2">
              We take pride in our finish and our service. Here's what people say after we've packed away our tools.
            </p>
          </div>
        </Reveal>

        {/* 2x2 Grid instead of cramped horizontal scroll */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {testimonials.map((item, index) => (
            <Reveal key={item.name} delay={index * 0.15} width="100%">
              <article className="brutal-panel p-8 md:p-14 border border-foreground/10 hover:border-foreground/30 transition-all duration-700 h-full flex flex-col justify-between group hover:-translate-y-2">
                <div>
                  <div className="flex gap-1.5 mb-8 opacity-80 group-hover:opacity-100 transition-opacity">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 fill-accent" viewBox="0 0 20 20" aria-hidden="true">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <blockquote className="text-[1.35rem] md:text-[1.7rem] font-serif leading-[1.4] mb-12">
                    "{item.text}"
                  </blockquote>
                </div>
                <div className="pt-8 border-t border-foreground/10 flex justify-between items-end">
                  <div>
                    <p className="font-sans text-foreground/90 font-medium text-[15px] md:text-base mb-1.5">{item.name}</p>
                    <p className="text-[10px] uppercase tracking-[0.25em] text-foreground/50">
                      {item.location}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-[9px] md:text-[10px] uppercase tracking-[0.25em] text-accent font-bold max-w-[120px]">
                      {item.project}
                    </p>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
