"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import CartToggle from "./CartToggle";
import MobileNav from "./MobileNav";

export default function GlobalNav({ theme = "default", className = "" }) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    // Check initial position
    handleScroll();
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // If theme is 'transparent' AND we haven't scrolled past the hero, text is white.
  // Otherwise, fallback to the standard foreground text mix and solid blurred background.
  const isTransparent = theme === "transparent" && !isScrolled;
  
  // Remove mix-blend-difference and backdrop-blur when mobile menu is open 
  // so it doesn't create a CSS containing block that clips the fixed full-screen overlay to the navbar's height limit.
  const navClass = mobileMenuOpen
    ? "text-foreground" 
    : isTransparent 
      ? "text-white mix-blend-difference" 
      : "text-foreground border-b border-foreground/10 bg-background/90 backdrop-blur-xl";

  return (
    <nav className={`fixed top-0 left-0 w-full px-6 md:px-12 py-7 flex justify-between items-center z-50 transition-colors duration-500 ${navClass} ${className}`}>
      <Link 
        href="/" 
        className="text-2xl md:text-3xl font-serif tracking-tight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        LUXURY BY SAM
      </Link>
      <div className="hidden md:flex gap-10 text-[10px] uppercase tracking-[0.3em] font-sans font-medium">
        <NavLink href="/shop" currentPath={pathname}>Services</NavLink>
        <NavLink href="/advice" currentPath={pathname}>Advice</NavLink>
        <NavLink href="/process" currentPath={pathname}>Our Process</NavLink>
        <NavLink href="/contact" currentPath={pathname}>Contact</NavLink>
        <CartToggle className={isTransparent ? "text-white" : "text-foreground"} />
      </div>
      <div className="md:hidden">
        <MobileNav open={mobileMenuOpen} setOpen={setMobileMenuOpen} />
      </div>
    </nav>
  );
}

function NavLink({ href, currentPath, children }) {
  const isActive = currentPath === href || currentPath.startsWith(`${href}/`);
  return (
    <Link 
      href={href} 
      className={`luxury-link focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background ${isActive ? 'text-accent opacity-100' : 'opacity-80 hover:opacity-100'}`}
    >
      {children}
    </Link>
  );
}
