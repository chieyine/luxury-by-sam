"use client";

import { useCart } from "../context/CartContext";
import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function CartDrawer() {
  const { items, isDrawerOpen, closeDrawer, removeFromCart, updateQuantity, cartTotal } = useCart();
  const drawerRef = useRef(null);
  const pathname = usePathname();

  // Close when clicking outside
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (isDrawerOpen && drawerRef.current && !drawerRef.current.contains(event.target)) {
        closeDrawer();
      }
    };
    
    if (isDrawerOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
      document.addEventListener("touchstart", handleOutsideClick);
    }
    
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("touchstart", handleOutsideClick);
    };
  }, [isDrawerOpen, closeDrawer]);

  // Close on route change
  useEffect(() => {
    closeDrawer();
  }, [pathname, closeDrawer]);

  // Lock body scroll
  useEffect(() => {
    if (isDrawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isDrawerOpen]);

  return (
    <AnimatePresence>
      {isDrawerOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-110 bg-background/80 backdrop-blur-sm"
          />

          <motion.div
            ref={drawerRef}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-background border-l border-foreground/15 z-120 flex flex-col shadow-2xl"
          >
            <div className="flex items-center justify-between px-6 md:px-10 py-8 border-b border-foreground/15">
              <h2 className="text-2xl font-serif tracking-tight">Quote list ({items.length})</h2>
              <button
                onClick={closeDrawer}
                className="text-[10px] uppercase tracking-[0.2em] font-sans hover:text-foreground/50 transition-colors"
              >
                Close
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 md:px-10 py-6 space-y-8">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4 text-foreground/50">
                  <p className="text-sm font-sans uppercase tracking-widest">Your quote list is empty.</p>
                  <Link href="/shop" className="luxury-link text-[10px] tracking-[0.3em] uppercase">
                    Browse services
                  </Link>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="flex gap-5 relative group">
                    <div
                      className="w-24 h-32 bg-secondary bg-cover bg-center shrink-0"
                      style={{ backgroundImage: item.image ? `url(${item.image})` : item.palette }}
                    />
                    <div className="flex-1 flex flex-col justify-between py-1">
                      <div>
                        <div className="flex justify-between items-start gap-3">
                          <Link href={`/product/${item.slug}`} className="font-serif text-[20px] leading-tight hover:text-foreground/70 transition-colors">
                            {item.title}
                          </Link>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-[10px] text-foreground/40 hover:text-red-900 transition-colors"
                            aria-label="Remove item"
                          >
                            Remove
                          </button>
                        </div>
                        <p className="text-[11px] text-foreground/50 uppercase tracking-widest mt-2">
                          {item.material}
                        </p>
                      </div>

                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center border border-foreground/20">
                          <button
                            className="px-3 py-1 text-foreground/50 hover:text-foreground transition-colors"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            aria-label="Decrease quantity"
                          >
                            -
                          </button>
                          <span className="text-[12px] w-6 text-center">{item.quantity}</span>
                          <button
                            className="px-3 py-1 text-foreground/50 hover:text-foreground transition-colors"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            aria-label="Increase quantity"
                          >
                            +
                          </button>
                        </div>
                        <p className="text-[14px] font-medium tracking-tight">
                          £{(item.numericPrice * item.quantity).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {items.length > 0 && (
              <div className="p-6 md:px-10 md:py-8 bg-foreground text-background">
                <div className="flex justify-between items-center mb-6">
                  <span className="font-serif text-xl">Estimated total</span>
                  <span className="font-serif text-xl">£{cartTotal.toLocaleString()}</span>
                </div>
                <p className="text-center text-[11px] text-background/60 mb-6 font-sans">
                  Estimates only. Final quote depends on measurements, finish and installation.
                </p>
                <Link
                  href="/checkout"
                  className="block w-full py-5 text-center bg-background text-foreground text-[10px] uppercase tracking-[0.3em] font-sans hover:bg-background/90 transition-colors"
                >
                  Request a free quote
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
