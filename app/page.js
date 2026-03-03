import Link from 'next/link';
import Image from 'next/image';
import { getProducts } from '../lib/wordpress';
import ProductCard from './components/ProductCard';
import { Reveal } from './components/Animations';
import MagneticButton from './components/MagneticButton';
import GlobalNav from './components/GlobalNav';
import StickySceneFlow from './components/StickySceneFlow';
import CartToggle from './components/CartToggle';
import Testimonials from './components/Testimonials';
import BeforeAfterSlider from './components/BeforeAfterSlider';


export default async function Home() {
  const products = await getProducts();
  const featuredProducts = products.slice(0, 4);
  const heroProducts = products.slice(0, 2);
  const craftVisuals = products.slice(0, 3);

  return (
    <main className="min-h-screen relative bg-background">
      <div className="grain-overlay" />
      <GlobalNav theme="transparent" />

      <section className="min-h-screen px-6 md:px-20 pt-32 md:pt-52 pb-24 md:pb-32 flex items-end relative overflow-hidden" data-cursor-label="Hero" data-cursor-tone="default">
        {/* Cinematic background video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="absolute inset-0 w-full h-full object-cover opacity-30"
          aria-hidden="true"
        >
          <source src="https://videos.pexels.com/video-files/6707543/6707543-uhd_2560_1440_30fps.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/40" />
        <div className="max-w-[1400px] w-full mx-auto grid md:grid-cols-[1.4fr_0.6fr] gap-12 md:gap-20 items-end">
          <div>
            <Reveal delay={0.1}>
              <p className="text-[10px] uppercase tracking-[0.4em] text-foreground/75 mb-6">
                Fitted kitchens, wardrobes & bedrooms · Watford · Serving the UK
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <h1 className="text-[12vw] md:text-[7.5vw] lg:text-[90px] brutal-title font-serif uppercase max-w-4xl opacity-90 leading-[0.85] md:leading-[0.85]">
                Quality
                <br />
                Fitted
                <br />
                Furniture
                <br />
                You Can
                <br />
                Afford
              </h1>
            </Reveal>
            <Reveal delay={0.35}>
              <p className="mt-10 max-w-xl text-foreground/70 leading-[1.7] text-[15px] md:text-[17px] font-sans font-light">
                Custom-built wardrobes, fitted bedrooms, media walls and kitchen cabinets—designed around your space, style and budget. From design to installation, we keep it simple, reliable and finished to a high standard.
              </p>
            </Reveal>
            <Reveal delay={0.45}>
              <div className="mt-10">
                <MagneticButton className="inline-block">
                  <Link href="/start" className="inline-flex items-center gap-3 border border-foreground/30 px-8 py-4 text-[10px] uppercase tracking-[0.3em] hover:bg-foreground hover:text-background transition-colors duration-500">
                    Get a free quote
                  </Link>
                </MagneticButton>
                <MagneticButton className="inline-block ml-3">
                  <Link href="/shop" className="inline-flex items-center gap-3 border border-foreground/15 px-8 py-4 text-[10px] uppercase tracking-[0.3em] hover:bg-foreground/10 transition-colors duration-500">
                    See what we build
                  </Link>
                </MagneticButton>
              </div>
            </Reveal>
          </div>

          <div className="space-y-4">
            {heroProducts.map((item, index) => (
              <Reveal key={item.id} delay={0.3 + index * 0.12}>
                <article className="brutal-panel p-3">
                  <div className="aspect-4/3 relative overflow-hidden">
                    {item.image && (
                      <Image
                        src={item.image}
                        alt={`${item.title} hero`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                        priority={index === 0}
                      />
                    )}
                    <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3 text-[10px] uppercase tracking-[0.3em] text-white/90 flex justify-between">
                      <span>{item.category}</span>
                      <span>{item.price}</span>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <StickySceneFlow />

      <section id="collection" className="py-24 md:py-48 px-6 md:px-20" data-cursor-label="Collect" data-cursor-tone="accent">
        <div className="max-w-[1400px] mx-auto">
          <Reveal>
            <div className="mb-24 md:mb-40 flex flex-col md:flex-row md:items-end md:justify-between gap-8 md:gap-12">
              <div className="space-y-4">
                <span className="label-upper text-foreground/75">Featured Work</span>
                <h2 className="text-[3rem] md:text-[6rem] font-serif max-w-3xl brutal-title opacity-95">Kitchens, Bedrooms & Storage</h2>
              </div>
              <p className="max-w-md text-[15px] md:text-[17px] text-foreground/65 leading-[1.7] font-light">
                A few popular builds to give you ideas—wardrobes that fit perfectly, kitchen units that work hard, and storage that makes the room feel bigger.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
            <div className="space-y-20 md:space-y-32 md:mt-28">
              {featuredProducts.slice(0, 2).map((product, idx) => (
                <Reveal key={product.id} delay={idx * 0.2}>
                  <ProductCard product={product} />
                </Reveal>
              ))}
            </div>
            <div className="space-y-24 md:space-y-40">
              {featuredProducts.slice(2, 4).map((product, idx) => (
                <Reveal key={product.id} delay={idx * 0.2}>
                  <ProductCard product={product} />
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <BeforeAfterSlider />

      <Testimonials />

      <section className="px-6 md:px-20 py-32 md:py-56" data-cursor-label="Read" data-cursor-tone="default">
        <div className="max-w-[1400px] mx-auto grid md:grid-cols-3 gap-12 md:gap-20">
          {[
            { index: "01", title: "Skilled local craftsmen", copy: "Careful measuring, clean joins, solid fittings—done properly and built to last." },
            { index: "02", title: "Mid-range prices, high standards", copy: "We focus on value: a great finish without the premium price tag." },
            { index: "03", title: "From design to installation", copy: "Straight answers, clear quotes, tidy work and a final check before we leave." },
          ].map((item) => (
            <Reveal key={item.index} width="100%">
              <article className="brutal-panel p-10 md:p-14 hover:border-foreground/20 transition-all duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-2">
                <p className="text-[10px] uppercase tracking-[0.4em] text-foreground/60 mb-10">{item.index}</p>
                <h3 className="text-[2rem] leading-[1.1] font-serif mb-6 opacity-90">{item.title}</h3>
                <p className="text-foreground/65 leading-[1.7] text-[15px] font-light">{item.copy}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
    </main>
  );
}
