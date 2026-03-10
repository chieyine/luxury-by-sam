"use client";

import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const consent = Cookies.get("lux_cookie_consent");
    if (!consent) {
      // Small delay so it doesn't immediately flash on screen
      const timer = setTimeout(() => setShowBanner(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    // Set cookie for 1 year
    Cookies.set("lux_cookie_consent", "accepted", { expires: 365, sameSite: 'strict' });
    
    // In a real implementation, you would trigger Google Analytics here
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("consent", "update", {
        ad_storage: "granted",
        analytics_storage: "granted",
      });
    }
    
    setShowBanner(false);
  };

  const handleDecline = () => {
    // Save decline choice so we don't bother them again for a few weeks
    Cookies.set("lux_cookie_consent", "declined", { expires: 30, sameSite: 'strict' });
    
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("consent", "update", {
        ad_storage: "denied",
        analytics_storage: "denied",
      });
    }
    
    setShowBanner(false);
  };

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-6 left-6 right-6 md:left-auto md:right-10 md:bottom-10 md:max-w-[420px] bg-foreground text-background z-120 p-6 md:p-8 flex flex-col shadow-2xl brutal-panel border-background/20"
          role="dialog"
          aria-live="polite"
          aria-label="Cookie consent banner"
        >
          <div className="mb-6">
            <h3 className="font-serif text-xl mb-3">Your Privacy</h3>
            <p className="font-sans text-[13px] leading-relaxed text-background/80 font-light">
              We use cookies to improve your experience and measure how our site is used. 
              By clicking &quot;Accept All&quot;, you consent to our use of cookies. 
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleAccept}
              className="flex-1 bg-background text-foreground py-3 text-[10px] uppercase tracking-[0.25em] font-medium hover:bg-background/90 transition-colors"
            >
              Accept All
            </button>
            <button
              onClick={handleDecline}
              className="flex-1 border border-background/30 text-background py-3 text-[10px] uppercase tracking-[0.25em] font-medium hover:bg-background/10 transition-colors"
            >
              Necessary Only
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
