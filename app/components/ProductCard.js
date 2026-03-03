"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import TransitionLink from "./TransitionLink";

export default function ProductCard({ product, compact = false }) {
  const cardRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * -15;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -15;
    setMousePos({ x, y });
  };

  return (
    <article
      ref={cardRef}
      className="group cursor-pointer relative"
      data-product-card
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => {
        setIsHovering(false);
        setMousePos({ x: 0, y: 0 });
      }}
    >
      <div className={`relative ${compact ? "aspect-square" : "aspect-4/5"} overflow-hidden border border-foreground/15`}>
        <motion.div
          data-shared-image={product.slug}
          className="absolute inset-0 rounded-[2px] bg-linear-to-br from-[#c8c3ba] via-[#e5e2da] to-[#bbb6ad] overflow-hidden"
          animate={{
            x: isHovering ? mousePos.x : 0,
            y: isHovering ? mousePos.y : 0,
            scale: isHovering ? 1.08 : 1,
          }}
          transition={{
            type: "spring",
            stiffness: 150,
            damping: 20,
            mass: 0.5,
          }}
        >
          {product.image ? (
            <Image
              src={product.image}
              alt={product.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : product.palette ? (
            <div className="w-full h-full" style={{ backgroundImage: product.palette, backgroundSize: "cover", backgroundPosition: "center" }} />
          ) : null}
        </motion.div>
        <div className="absolute inset-0 bg-linear-to-t from-foreground/30 via-transparent to-transparent opacity-75 group-hover:opacity-40 transition-opacity duration-700 pointer-events-none" />

        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10 pointer-events-none">
          <span className="text-[10px] uppercase tracking-[0.42em] font-bold bg-black/70 border border-white/30 backdrop-blur-md px-6 py-3 text-white">
            View Product
          </span>
        </div>

        <div className="absolute top-6 left-6">
          <span className="text-[9px] uppercase tracking-[0.38em] text-white/90 font-bold">
            {product.category}
          </span>
        </div>
      </div>

      <div className="mt-6 flex justify-between items-start border-t border-foreground/15 pt-5">
        <div>
          <h3 className="text-xl md:text-2xl font-serif tracking-tight leading-[1.08] transition-all duration-300">
            {product.title}
          </h3>
          <p className="text-[11px] text-foreground/70 mt-2.5 font-sans font-medium uppercase tracking-[0.14em]">
            {product.category} / {product.material}
          </p>
          <p className="text-[11px] text-accent mt-1.5 font-sans font-medium uppercase tracking-[0.12em]">
            From {product.price}
          </p>
        </div>
      </div>

      <TransitionLink href={`/product/${product.slug}`} slug={product.slug} className="absolute inset-0 z-20">
        <span className="sr-only">Open {product.title}</span>
      </TransitionLink>
    </article>
  );
}
