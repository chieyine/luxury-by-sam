import "./globals.css";
import { Inter, Playfair_Display } from "next/font/google";
import { CartProvider } from "./context/CartContext";
import ExperienceProvider from "./components/ExperienceProvider";
import RouteTransition from "./components/RouteTransition";
import GlobalClientVisuals from "./components/GlobalClientVisuals";
import Footer from "./components/Footer";
import CartDrawer from "./components/CartDrawer";
import FloatingActions from "./components/FloatingActions";
import CookieBanner from "./components/CookieBanner";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--font-sans" });
const playfair = Playfair_Display({ subsets: ["latin"], display: "swap", variable: "--font-serif" });

export const viewport = {
  themeColor: "#f5f1ea",
};

export const metadata = {
  metadataBase: new URL("https://luxurybysam.com"),
  title: "Luxury by Sam | Fitted Kitchens & Bedrooms",
  description:
    "Quality fitted kitchens, wardrobes and bedroom furniture at prices you can afford. Based in the UK. Free consultation & quote.",
  openGraph: {
    title: "Luxury by Sam | Fitted Kitchens & Bedrooms",
    description:
      "Quality fitted kitchens, wardrobes and bedroom furniture at prices you can afford. Serving the UK.",
    url: "/",
    siteName: "Luxury by Sam",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Luxury by Sam | Fitted Kitchens & Bedrooms",
    description:
      "Quality fitted kitchens, wardrobes and bedroom furniture at prices you can afford. Serving the UK.",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="antialiased font-sans">
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga-setup" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
              `}
            </Script>
          </>
        )}
        {/* Hidden form for Netlify Bots to detect the schema at build time */}
        <form name="contact" data-netlify="true" netlify-honeypot="bot-field" hidden>
          <input type="hidden" name="form-name" value="contact" />
          <input type="text" name="name" />
          <input type="email" name="email" />
          <input type="text" name="subject" />
          <textarea name="message"></textarea>
        </form>
        <Script id="json-ld-local-business" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "name": "Luxury by Sam",
          "description": "Quality fitted kitchens, wardrobes and bedroom furniture at prices you can afford. Serving the UK.",
          "url": "https://luxurybysam.com",
          "address": {
            "@type": "PostalAddress",
            "addressRegion": "UK"
          }
        }) }} />
        <CartProvider>
          <ExperienceProvider>
            <div className="relative isolate min-h-screen flex flex-col">
              <GlobalClientVisuals />
              <div className="grow">
                <RouteTransition>{children}</RouteTransition>
              </div>
              <CartDrawer />
              <FloatingActions />
              <CookieBanner />
              <Footer />
            </div>
          </ExperienceProvider>
        </CartProvider>
      </body>
    </html>
  );
}
