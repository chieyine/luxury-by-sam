"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Reveal, SmoothScroll } from "./Animations";
import Image from "next/image";

export default function AboutExperience() {
  const container = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"]
  });

  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <SmoothScroll>
      <div ref={container} className="bg-background text-foreground">
        
        {/* Massive Hero */}
        <section className="relative h-screen w-full overflow-hidden bg-[#111]">
          <motion.div
            style={{ y: heroY }}
            className="absolute inset-0 origin-center opacity-70"
          >
            <Image
              src="https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=2800&q=80"
              alt="Luxury by Sam fitted furniture"
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
          </motion.div>
          <div className="absolute inset-0 bg-black/30" />
          
          <motion.div 
            style={{ opacity: heroOpacity }}
            className="absolute inset-0 flex flex-col justify-end px-6 md:px-20 pb-20 md:pb-32 z-10 text-white"
          >
            <Reveal>
              <h1 className="text-[15vw] md:text-[11vw] lg:text-[130px] font-serif leading-[0.85] tracking-tighter uppercase max-w-[1200px]">
                Built
                <br />
                <span className="italic font-light text-white/80 ml-[10vw]">to Fit</span>
              </h1>
            </Reveal>
          </motion.div>
        </section>

        {/* Introduction */}
        <section className="py-32 md:py-48 px-6 md:px-20">
          <div className="max-w-[1400px] mx-auto grid md:grid-cols-2 gap-16 md:gap-32 items-center">
            <Reveal>
              <h2 className="text-3xl md:text-5xl font-serif leading-tight">
                Quality fitted furniture at prices you can afford.
              </h2>
            </Reveal>
            <div className="space-y-8 font-sans text-lg text-foreground/70 leading-relaxed max-w-lg">
              <Reveal delay={0.1}>
                <p>
                  Luxury by Sam specialises in custom-built wardrobes, bedroom furniture, media walls and kitchen cabinets designed to suit your space, style and budget.
                </p>
              </Reveal>
              <Reveal delay={0.2}>
                <p>
                  We focus on high quality craftsmanship at mid-range and affordable prices—beautiful, practical storage solutions without the premium price tag.
                </p>
              </Reveal>
              <Reveal delay={0.3}>
                <p>
                  Whether you’re updating your kitchen, transforming your bedroom, or adding smart storage to your home, we provide reliable service from design to installation.
                </p>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Image Grid */}
        <section className="px-6 md:px-20 pb-32 md:pb-48">
          <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12">
            <div className="md:col-span-8 aspect-4/3 relative overflow-hidden brutal-panel p-2">
              <Reveal width="100%" height="100%">
                <div className="w-full h-full relative">
                  <Image
                    src="/images/photo-1493666438817-866a91353ca9.jpg"
                    alt="Material Honesty"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 66vw"
                  />
                </div>
              </Reveal>
            </div>
            <div className="md:col-span-4 mt-6 md:mt-32 space-y-6 md:space-y-12">
              <div className="aspect-square relative overflow-hidden brutal-panel p-2">
                 <Reveal width="100%" height="100%">
                  <div className="w-full h-full relative">
                    <Image
                      src="https://images.unsplash.com/photo-1484101403633-562f891dc89a?auto=format&fit=crop&w=1200&q=80"
                      alt="Joinery Detail"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 50vw, 33vw"
                    />
                  </div>
                </Reveal>
              </div>
              <Reveal delay={0.2}>
                <p className="text-[11px] uppercase tracking-[0.3em] text-foreground/50 font-medium">
                  Material Honesty / 01
                </p>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Manifesto/Values */}
        <section className="py-32 md:py-48 bg-background text-foreground border-t border-foreground/10">
          <div className="max-w-[1400px] mx-auto px-6 md:px-20">
            <Reveal>
              <h2 className="text-[10vw] md:text-[6.5vw] font-serif leading-[0.9] tracking-tighter uppercase mb-24 opacity-90">
                Why Choose
                <br/>
                <span className="italic text-accent font-light">Sam</span>
              </h2>
            </Reveal>

            <div className="grid md:grid-cols-3 gap-16 md:gap-24">
              {[
                { num: "01", title: "Skilled local craftsmen", copy: "We take pride in the details—clean lines, solid fittings and a professional finish." },
                { num: "02", title: "Affordable mid-range pricing", copy: "A great result without the premium price tag. Clear quotes and practical designs." },
                { num: "03", title: "Reliable, friendly service", copy: "From design to installation, we keep your home respected, tidy and on track." }
              ].map((item, idx) => (
                <Reveal key={idx} delay={idx * 0.15}>
                  <div className="border-t border-foreground/15 pt-8 mt-12">
                    <span className="text-sm font-sans block mb-12 text-foreground/50">{item.num}</span>
                    <h3 className="text-3xl font-serif mb-6">{item.title}</h3>
                    <p className="font-sans text-foreground/70 leading-relaxed font-light">{item.copy}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

      </div>
    </SmoothScroll>
  );
}
