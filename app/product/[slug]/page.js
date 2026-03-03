import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getProductBySlug, getProducts } from "../../../lib/wordpress";
import { Reveal } from "../../components/Animations";
import SharedElementArrival from "../../components/SharedElementArrival";
import ProductStorySequence from "../../components/ProductStorySequence";
import AddToCartButton from "../../components/AddToCartButton";
import GlobalNav from "../../components/GlobalNav";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return {
      title: "Item Not Found | Luxury by Sam",
    };
  }

  const image = product.image || product.sequenceFrames?.[0] || undefined;

  return {
    title: `${product.title} | Luxury by Sam`,
    description: product.description,
    openGraph: image
      ? {
          title: `${product.title} | Luxury by Sam`,
          description: product.description,
          images: [{ url: image }],
        }
      : undefined,
  };
}

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((p) => ({ slug: p.slug }));
}

export default async function ProductDetailPage({ params }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const allProducts = await getProducts();
  const relatedProducts = allProducts.filter((item) => item.slug !== product.slug).slice(0, 3);

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.description,
    image: product.image ? [product.image] : undefined,
    offers: {
      "@type": "Offer",
      price: product.numericPrice || undefined,
      priceCurrency: "GBP",
      availability: "https://schema.org/InStock",
    },
  };

  return (
    <main className="min-h-screen bg-background" data-cursor-label="Detail" data-cursor-tone="default">
      <GlobalNav theme="transparent" />
      <SharedElementArrival slug={product.slug} targetId="product-hero-media" />

      <section className="px-6 md:px-20 pt-10 pb-16 md:pb-24" data-cursor-label="Inspect" data-cursor-tone="accent">
        <div className="max-w-[1400px] mx-auto grid md:grid-cols-[1.1fr_0.9fr] gap-12 md:gap-18 items-start">
          <Reveal width="100%">
            <div id="product-hero-media" className="relative aspect-4/5 overflow-hidden bg-secondary border border-foreground/14">
              {product.image ? (
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 55vw"
                  priority
                />
              ) : (
                <div className="absolute inset-0" style={{ backgroundImage: product.palette, backgroundSize: "cover" }} />
              )}
              <div className="absolute top-6 left-6 text-[10px] uppercase tracking-[0.3em] text-white/70 z-10">
                {product.category}
              </div>
            </div>
          </Reveal>

          <div className="space-y-7 md:space-y-9">
            <Reveal width="100%" delay={0.05}>
              <div>
                <p className="label-upper text-foreground/45 mb-3">{product.material}</p>
                <h1 className="text-[2.5rem] md:text-[4rem] leading-[0.88] font-serif brutal-title">{product.title}</h1>
              </div>
            </Reveal>

            <Reveal width="100%" delay={0.15}>
              <p className="text-foreground/60 leading-[1.6] text-[15px] md:text-base">{product.longDescription}</p>
            </Reveal>

            <Reveal width="100%" delay={0.2}>
              <div className="brutal-panel py-5 px-5 space-y-3 text-[14px]">
                <div className="flex justify-between">
                  <span className="text-foreground/50">Price</span>
                  <span className="text-accent">{product.price}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-foreground/50">Dimensions</span>
                  <span>{product.dimensions}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-foreground/50">Lead time</span>
                  <span>{product.leadTime}</span>
                </div>
                
                <AddToCartButton product={product} />
              </div>
            </Reveal>

            <Reveal width="100%" delay={0.25}>
              <div className="space-y-3">
                <p className="text-[10px] uppercase tracking-[0.3em] text-foreground/45">Highlights</p>
                <ul className="space-y-2 text-foreground/70">
                  {product.features.map((feature) => (
                    <li key={feature}>- {feature}</li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <ProductStorySequence product={product} />

      <section className="px-6 md:px-20 py-20 md:py-28" data-cursor-label="Story" data-cursor-tone="light">
        <div className="max-w-[1400px] mx-auto">
          <p className="text-[10px] uppercase tracking-[0.3em] text-foreground/55 mb-8">How we approach it</p>
          <h2 className="text-4xl md:text-6xl leading-[0.9] font-serif brutal-title max-w-4xl mb-6">
            Measured properly. Built to fit. Finished cleanly.
          </h2>
          <p className="max-w-2xl text-foreground/62 leading-[1.6] text-[15px]">
            We’ll talk through your space, how you use it day to day, and what you want it to feel like. Then we design around your budget and install professionally—no awkward gaps, no wasted space.
          </p>
        </div>
      </section>

      <section className="px-6 md:px-20 py-20 md:py-28" data-cursor-label="Related" data-cursor-tone="default">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex justify-between items-end mb-10 md:mb-14">
            <h3 className="text-3xl md:text-5xl font-serif leading-none">More Ideas</h3>
            <Link href="/shop" className="luxury-link text-[10px] uppercase tracking-[0.3em]">
              View all
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8 md:gap-10">
            {relatedProducts.map((item) => (
              <Link key={item.id} href={`/product/${item.slug}`} className="group block">
                <div className="aspect-square bg-secondary overflow-hidden relative">
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  ) : (
                    <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: item.palette, backgroundSize: "cover" }} />
                  )}
                </div>
                <div className="pt-4 border-t border-foreground/12 mt-4">
                  <p className="text-[11px] text-foreground/50 mb-1.5 uppercase tracking-[0.12em]">{item.category}</p>
                  <h4 className="text-xl font-serif leading-[1.08]">{item.title}</h4>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
    </main>
  );
}
