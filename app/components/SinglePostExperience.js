"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Reveal, SmoothScroll } from "./Animations";
import { useRef } from "react";

export default function SinglePostExperience({ post }) {
  const container = useRef(null);
  const contentRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  const { scrollYProgress: contentProgress } = useScroll({
    target: contentRef,
    offset: ["start 80%", "end center"],
  });

  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const progressBarHeight = useTransform(contentProgress, [0, 1], ["0%", "100%"]);

  return (
    <SmoothScroll>
      <div ref={container} className="relative bg-background text-foreground">
        {/* Cinematic Hero */}
        <section className="relative h-screen w-full overflow-hidden">
          <motion.div
            style={{ 
              scale: heroScale,
              backgroundImage: `url(${post.image || ""})`
            }}
            className="absolute inset-0 bg-cover bg-center origin-center"
          />
          <motion.div 
            style={{ opacity: heroOpacity }}
            className="absolute inset-0 bg-black/40" 
          />
          
          <motion.div 
            style={{ opacity: heroOpacity }}
            className="absolute bottom-16 md:bottom-24 left-6 md:left-20 right-6 md:right-20 z-10 text-white"
          >
            <div className="max-w-4xl">
              <Reveal>
                <div className="flex gap-6 mb-8 text-[11px] uppercase tracking-[0.3em] font-medium">
                  <span className="text-white/80">{post.category}</span>
                  <span className="text-white/50">{new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                </div>
              </Reveal>
              <Reveal delay={0.2}>
                <h1 className="text-5xl md:text-7xl lg:text-[6.5rem] font-serif leading-[1.05] tracking-tight">
                  {post.title}
                </h1>
              </Reveal>
            </div>
          </motion.div>
        </section>

        {/* Article Body */}
        <section className="relative py-24 md:py-40 px-6 md:px-0 bg-background" ref={contentRef}>
          <div className="max-w-[760px] mx-auto w-full flex relative">
            
            {/* Reading Progress Indicator */}
            <div className="hidden lg:block absolute -left-32 top-0 bottom-0 w-[1px] bg-foreground/10">
              <motion.div 
                style={{ height: progressBarHeight }}
                className="w-full bg-accent origin-top"
              />
            </div>

            <article className="w-full editorial-content space-y-8 text-lg font-sans leading-[1.8] text-foreground/80">
              {post.excerpt && (
                <Reveal>
                  <p className="text-2xl md:text-3xl font-serif leading-snug tracking-tight text-foreground mb-16">
                    {post.excerpt}
                  </p>
                </Reveal>
              )}
              
              <Reveal delay={0.2}>
                <div 
                  dangerouslySetInnerHTML={{ __html: post.content }} 
                  className="prose prose-lg prose-invert max-w-none prose-p:mb-8 prose-h2:mt-16 prose-h2:mb-8 prose-h2:font-serif prose-h2:text-4xl prose-a:text-accent prose-a:underline-offset-4"
                />
              </Reveal>
            </article>
          </div>
        </section>

        {/* Next Read / Footer CTA */}
        <section className="py-32 px-6 md:px-20 border-t border-foreground/12 bg-background flex flex-col items-center text-center">
            <Reveal>
                <p className="text-[11px] uppercase tracking-[0.3em] font-medium text-foreground/40 mb-6">Ready to start?</p>
                <h2 className="text-4xl md:text-5xl font-serif leading-tight mb-8">
                  Let's bring your<br />ideas to life.
                </h2>
                <div className="flex gap-4 justify-center">
                  <a href="/start" className="bg-foreground text-background px-8 py-4 text-[10px] uppercase tracking-[0.25em] font-medium hover:bg-foreground/90 transition-colors">
                    Get a Free Quote
                  </a>
                  <a href="/advice" className="border border-foreground/20 px-8 py-4 text-[10px] uppercase tracking-[0.25em] font-medium hover:bg-foreground/5 transition-colors">
                    More Advice
                  </a>
                </div>
            </Reveal>
        </section>
      </div>
    </SmoothScroll>
  );
}
