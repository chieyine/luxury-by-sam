"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import CartToggle from "./CartToggle";

export default function MobileNav({ open, setOpen }) {
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!open) return;
    const onKey = (event) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, setOpen]);

  return (
    <>
      <button
        type="button"
        className="md:hidden relative z-90 inline-flex items-center justify-center w-10 h-10 border border-foreground/30 text-[10px] uppercase tracking-[0.25em] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        aria-label={open ? "Close navigation" : "Open navigation"}
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        <span>{open ? "Close" : "Menu"}</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: "100%" }}
            animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: "100%" }}
            transition={{ duration: prefersReducedMotion ? 0.2 : 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-100 bg-foreground text-background md:hidden pointer-events-auto"
          >
            <div className="flex items-center justify-between px-6 py-6 border-b border-background/20">
              <Link href="/" className="text-lg font-serif tracking-tight" onClick={() => setOpen(false)}>
                LUXURY BY SAM
              </Link>
              <div className="flex items-center gap-6">
                <CartToggle className="text-background border-background/50 hover:border-background" />
                <button
                  type="button"
                  className="text-[10px] uppercase tracking-[0.25em]"
                  onClick={() => setOpen(false)}
                >
                  Close
                </button>
              </div>
            </div>
            <nav className="px-6 py-8 space-y-6" aria-label="Mobile primary">
              {[
                { href: "/shop", label: "Services", desc: "Wardrobes, kitchens and custom storage." },
                { href: "/advice", label: "Advice", desc: "Helpful guides before you build." },
                { href: "/process", label: "Our Process", desc: "From consultation to installation." },
                { href: "/contact", label: "Contact", desc: "Free quote · UK-wide." },
              ].map((item) => (
                <div key={item.href}>
                  <Link
                    href={item.href}
                    className="block text-2xl font-serif brutal-title mb-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-background focus-visible:ring-offset-2 focus-visible:ring-offset-foreground text-background opacity-90"
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </Link>
                  <p className="text-[12px] text-background/60 font-light">
                    {item.desc}
                  </p>
                </div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

