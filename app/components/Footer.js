import Link from 'next/link';

export default function Footer() {
  return (
    <footer id="contact" className="py-20 md:py-32 px-6 md:px-20 bg-background" data-cursor-label="Contact" data-cursor-tone="accent">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-14 md:gap-20 items-start pb-16 md:pb-24 border-b border-foreground/12">
        <div className="space-y-6">
          <h3 className="text-3xl md:text-4xl font-serif tracking-tight text-foreground">LUXURY BY SAM</h3>
          <p className="text-foreground/60 max-w-xs leading-[1.55] text-[15px]">
            Quality fitted kitchens, wardrobes and bedroom furniture at prices you can afford.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-10 md:gap-16">
          <div className="space-y-4">
            <p className="label-upper text-foreground/40 font-bold">Navigation</p>
            {[
              { label: "Services", href: "/shop" },
              { label: "Our Process", href: "/process" },
              { label: "Advice", href: "/advice" },
              { label: "Contact", href: "/contact" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block text-sm hover:translate-x-2 transition-transform duration-300 text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </div>
          <div className="space-y-5">
            <p className="text-[10px] uppercase tracking-widest text-foreground/40 font-bold">Serving area</p>
            <p className="text-sm text-foreground/70">Across the United Kingdom</p>
            <p className="text-sm text-foreground/70">Free consultation & quotation</p>
          </div>
        </div>

        <div className="md:text-right space-y-2">
          <p className="text-[13px] font-sans text-foreground/70">Get a free quote</p>
          <a href="tel:+447733689409" className="block text-xl md:text-2xl font-serif tracking-tight text-foreground hover:text-accent transition-colors">07733 689409</a>
          <a href="mailto:luxurybysam01@gmail.com" className="block text-[15px] text-foreground/70 hover:text-accent transition-colors">luxurybysam01@gmail.com</a>
          <p className="text-[13px] text-foreground/40">luxurybysam.com</p>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto pt-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-[10px] uppercase tracking-[0.2em] font-bold text-foreground/35">
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
          <span>© {new Date().getFullYear()} Luxury by Sam</span>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-foreground/70 transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-foreground/70 transition-colors">Terms</Link>
          </div>
        </div>
        <span>Made to measure · Clean installation · Friendly service</span>
      </div>
    </footer>
  );
}
