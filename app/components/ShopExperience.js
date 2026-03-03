"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import ProductCard from "./ProductCard";

export default function ShopExperience({ products, categories }) {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return products.filter((product) => {
      const categoryMatch = activeCategory === "All" || product.category === activeCategory;
      const queryMatch =
        normalizedQuery.length === 0 ||
        `${product.title} ${product.description} ${product.material}`.toLowerCase().includes(normalizedQuery);

      return categoryMatch && queryMatch;
    });
  }, [products, query, activeCategory]);

  return (
    <section className="px-6 md:px-20 pt-6 pb-20 md:pb-28">
      <div className="max-w-[1400px] mx-auto">
        <div className="mb-10 md:mb-14 grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <p className="label-upper text-foreground/45 mb-3">Services & inspiration</p>
            <h1 className="text-[2.75rem] md:text-[5.5rem] font-serif brutal-title mb-4">Browse What We Build</h1>
            <p className="max-w-xl text-foreground/58 leading-[1.6] text-[15px] md:text-base">
              Use this as a starting point—then we’ll tailor everything to your measurements, style and budget.
            </p>
          </div>

          <div className="brutal-panel px-4 py-3 flex items-center gap-3 min-w-[260px]">
            <Search size={16} className="text-foreground/45" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search wardrobes, kitchens, media walls..."
              aria-label="Search products"
              className="bg-transparent outline-none border-none text-sm flex-1 placeholder:text-foreground/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-3 mb-14">
          {["All", ...categories].map((category) => {
            const isActive = category === activeCategory;
            return (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 text-[10px] uppercase tracking-[0.24em] border transition-colors duration-300 ${
                  isActive
                    ? "bg-foreground text-background border-foreground"
                    : "bg-transparent text-foreground/60 border-foreground/25 hover:text-foreground"
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-12 md:gap-14">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} compact />
          ))}
        </div>

        {filteredProducts.length === 0 ? (
          <div className="py-24 text-center border border-dashed border-foreground/20 mt-16 brutal-panel">
            <p className="text-foreground/60 mb-3">No products match this filter.</p>
            <button
              onClick={() => {
                setQuery("");
                setActiveCategory("All");
              }}
              className="text-[10px] uppercase tracking-[0.2em] luxury-link"
            >
              Clear filters
            </button>
          </div>
        ) : null}

        <div className="mt-20 text-center">
          <Link href="/" className="luxury-link text-[10px] uppercase tracking-[0.25em]">
            Back to home
          </Link>
        </div>
      </div>
    </section>
  );
}
