"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { Reveal, SmoothScroll } from "./Animations";
import Image from "next/image";

export default function JournalExperience({ posts }) {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"]
  });

  return (
    <SmoothScroll>
      <div ref={container} className="pb-32">
        <header className="px-6 md:px-20 pt-32 pb-20 border-b border-foreground/12">
          <div className="max-w-[1400px] mx-auto">
            <Reveal>
              <h1 className="text-[12vw] md:text-[8vw] brutal-title font-serif uppercase leading-none tracking-tighter">
                Advice &<br />
                <span className="italic text-foreground/40">Guides</span>
              </h1>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="mt-12 md:mt-24 max-w-xl">
                <p className="text-foreground/60 leading-[1.6] text-[15px] md:text-base font-sans">
                  Practical tips on fitted wardrobes, kitchens, and custom storage—everything you need to know before you build.
                </p>
              </div>
            </Reveal>
          </div>
        </header>

        <section className="px-6 md:px-20 pt-20">
          <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
            {posts.map((post, i) => {
              // Creating an asymmetric grid pattern
              const isLarge = i % 4 === 0 || i % 4 === 3;
              const gridClass = isLarge 
                ? "md:col-span-8 md:col-start-3" 
                : (i % 2 === 0 ? "md:col-span-5 md:col-start-1" : "md:col-span-5 md:col-start-8 mt-0 md:mt-32");

              return (
                <article key={post.id} className={`${gridClass} group cursor-pointer`}>
                  <Link href={`/advice/${post.slug}`} className="block">
                    <Reveal delay={0.1}>
                      <div className={`relative overflow-hidden ${isLarge ? 'aspect-16/9' : 'aspect-4/5'}`}>
                        <div className={`absolute inset-0 origin-center transition-transform duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105 overflow-hidden`}>
                          {post.image && (
                            <Image
                              src={post.image}
                              alt={post.title || "Journal article image"}
                              fill
                              className="object-cover"
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 66vw"
                            />
                          )}
                        </div>
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-700 pointer-events-none" />
                        
                        <div className="absolute top-4 left-4 right-4 flex justify-between text-[10px] uppercase tracking-[0.2em] text-white/90 drop-shadow-md pointer-events-none">
                          <span>{post.category}</span>
                          <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
                        </div>
                      </div>
                    </Reveal>
                    
                    <div className="mt-6 md:mt-8 space-y-3">
                      <Reveal delay={0.2}>
                        <h2 className={`font-serif leading-tight tracking-tight ${isLarge ? 'text-4xl md:text-5xl' : 'text-3xl'}`}>
                          {post.title}
                        </h2>
                      </Reveal>
                      <Reveal delay={0.3}>
                        <div className="text-foreground/60 leading-relaxed text-sm max-w-lg font-sans line-clamp-2">
                          {post.excerpt}
                        </div>
                      </Reveal>
                    </div>
                  </Link>
                </article>
              );
            })}
          </div>
        </section>
      </div>
    </SmoothScroll>
  );
}
