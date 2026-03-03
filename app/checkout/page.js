"use client";

import { useCart } from "../context/CartContext";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Reveal } from "../components/Animations";
import GlobalNav from "../components/GlobalNav";

const inputClass =
  "w-full bg-transparent border-b border-foreground/20 py-4 outline-none focus:border-foreground transition-colors font-sans placeholder:text-foreground/30 peer";

function LabeledInput({ id, label, type = "text", required = false, placeholder, autoComplete }) {
  return (
    <div className="relative">
      <input
        id={id}
        name={id}
        type={type}
        required={required}
        placeholder={placeholder || label}
        autoComplete={autoComplete}
        aria-label={label}
        className={inputClass}
      />
    </div>
  );
}

export default function CheckoutPage() {
  const { items, cartTotal, cartCount, clearCart } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);

    if (items.length === 0) {
      setError("Your quote list is empty. Please add at least one item before sending a request.");
      return;
    }

    setIsSubmitting(true);

    const formData = new FormData(e.target);
    const firstName = formData.get("first_name") || "";
    const lastName = formData.get("last_name") || "";
    const email = formData.get("email") || "";
    const address = formData.get("address") || "";
    const city = formData.get("city") || "";
    const postalCode = formData.get("postal_code") || "";

    const subject = `New quote request from ${firstName} ${lastName}`.trim();

    const itemsLines =
      items
        .map(
          (item) =>
            `- ${item.title} (Qty: ${item.quantity}) – est. £${(item.numericPrice * item.quantity).toLocaleString()}`
        )
        .join("\n") || "No items listed.";

    const addressBlock =
      [address, city, postalCode].filter(Boolean).length > 0
        ? `\nAddress:\n${[address, city, postalCode].filter(Boolean).join(", ")}\n`
        : "";

    const body = [
      "New quote request from the website:",
      "",
      `Name: ${firstName} ${lastName}`.trim(),
      `Email: ${email}`,
      addressBlock,
      "Requested items:",
      itemsLines,
      "",
      `Estimated total (for guidance only): £${cartTotal.toLocaleString()}`,
      "",
      "Please reply to confirm a home visit, measurements and a final quote.",
    ]
      .filter(Boolean)
      .join("\n");

    const mailtoUrl = `mailto:luxurybysam01@gmail.com?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    window.location.href = mailtoUrl;
    setIsSubmitting(false);
    setIsSuccess(true);
    clearCart();
  };

  if (isSuccess) {
    return (
      <main className="min-h-screen bg-background flex flex-col items-center justify-center px-6">
        <GlobalNav />
        <Reveal>
          <div className="text-center space-y-6 max-w-lg">
            <h1 className="text-4xl md:text-5xl font-serif brutal-title">Request Sent</h1>
            <p className="text-foreground/60 leading-relaxed font-sans">
              Thanks — we’ve received your details. We’ll review your request and get back to you within 48 hours to confirm measurements, finishes and a final quote.
            </p>
            <div className="pt-8">
              <Link
                href="/shop"
                className="inline-block border-b border-foreground/30 pb-2 text-[10px] uppercase tracking-[0.3em] hover:text-foreground/60 transition-colors"
              >
                Back to services
              </Link>
            </div>
          </div>
        </Reveal>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background pb-32 pt-28 print:pt-8 print:bg-white text-foreground print:text-black">
      <GlobalNav />

      <div className="max-w-[1400px] mx-auto px-6 md:px-20 pt-16 md:pt-24 grid md:grid-cols-[1.2fr_0.8fr] gap-16 md:gap-24 print:block print:pt-0 print:px-0">
        {/* Quote Request Form */}
        <div className="print:hidden">
          <Reveal>
            <h1 className="text-4xl md:text-6xl font-serif brutal-title mb-10">Request a Quote</h1>
          </Reveal>

          {error && (
            <div role="alert" className="mb-6 p-4 border border-red-800/50 bg-red-950/30 text-red-400 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-12">
            <Reveal delay={0.1}>
              <fieldset className="space-y-6 border-none p-0 m-0">
                <legend className="text-sm uppercase tracking-[0.2em] font-bold text-foreground/40 border-b border-foreground/15 pb-3 w-full">
                  Your details
                </legend>
                <div className="space-y-4">
                  <LabeledInput id="email" label="Email Address" type="email" required autoComplete="email" />
                  <div className="grid grid-cols-2 gap-6">
                    <LabeledInput id="first_name" label="First Name" required autoComplete="given-name" />
                    <LabeledInput id="last_name" label="Last Name" required autoComplete="family-name" />
                  </div>
                </div>
              </fieldset>
            </Reveal>

            <Reveal delay={0.2}>
              <fieldset className="space-y-6 border-none p-0 m-0">
                <legend className="text-sm uppercase tracking-[0.2em] font-bold text-foreground/40 border-b border-foreground/15 pb-3 w-full">
                  Address (optional)
                </legend>
                <div className="space-y-4">
                  <LabeledInput id="address" label="Address" autoComplete="street-address" />
                  <LabeledInput id="address2" label="Apartment, suite, etc. (optional)" autoComplete="address-line2" />
                  <div className="grid grid-cols-2 gap-6">
                    <LabeledInput id="city" label="City" autoComplete="address-level2" />
                    <LabeledInput id="postal_code" label="Postcode" autoComplete="postal-code" />
                  </div>
                </div>
              </fieldset>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="space-y-6">
                <h2 className="text-sm uppercase tracking-[0.2em] font-bold text-foreground/40 border-b border-foreground/15 pb-3">
                  Next steps
                </h2>
                <div className="bg-secondary/30 p-6 border border-foreground/10 text-sm text-foreground/60">
                  No payment online. We’ll confirm your measurements, finishes and installation details, then send a clear final quote.
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.4}>
              <button
                type="submit"
                disabled={isSubmitting || items.length === 0}
                aria-busy={isSubmitting}
                className="w-full py-5 border border-foreground/20 bg-transparent text-foreground text-[10px] uppercase tracking-[0.3em] font-sans hover:bg-accent/15 transition-colors disabled:opacity-50 flex justify-center items-center"
              >
                {isSubmitting ? "Sending..." : `Send request • est. £${cartTotal.toLocaleString()}`}
              </button>
              {items.length === 0 && (
                <p className="text-[10px] text-foreground/40 text-center mt-3 uppercase tracking-widest">
                  Your quote list is empty.{" "}
                  <Link href="/shop" className="underline hover:text-foreground/60">Browse services</Link>
                </p>
              )}
              {items.length > 0 && (
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="w-full mt-3 py-4 border border-foreground/10 text-[10px] uppercase tracking-[0.3em] font-sans hover:bg-foreground/5 transition-colors flex justify-center items-center gap-2"
                >
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current stroke-2" aria-hidden="true">
                    <path d="M12 3v12m0 0l-4-4m4 4l4-4M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Download Quote as PDF
                </button>
              )}
            </Reveal>
          </form>
        </div>

        {/* Quote Summary */}
        <div className="relative print:w-full print:block">
          <div className="sticky top-10 space-y-8 brutal-panel p-8 md:p-10 print:p-0 print:border-none print:shadow-none print:bg-transparent">
            {/* Print Header */}
            <div className="hidden print:block mb-12 border-b border-black/20 pb-6">
              <h2 className="text-3xl font-serif brutal-title tracking-tight text-black">Luxury by Sam</h2>
              <p className="text-xs uppercase tracking-[0.2em] text-black/60 mt-2 font-bold">Estimated Quote Summary</p>
            </div>

            <h2 className="text-sm uppercase tracking-[0.2em] font-bold text-foreground/40 print:text-black/50 border-b border-foreground/15 print:border-black/15 pb-3">
              Quote items ({cartCount})
            </h2>

            <div className="space-y-6 max-h-[50vh] overflow-y-auto pr-2">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <div className="w-16 h-20 shrink-0 border border-foreground/10 relative overflow-hidden">
                    {item.image ? (
                      <Image src={item.image} alt={item.title} fill className="object-cover" sizes="64px" />
                    ) : (
                      <div className="w-full h-full" style={{ backgroundImage: item.palette }} />
                    )}
                  </div>
                  <div className="flex-1 flex flex-col justify-center">
                    <div className="flex justify-between items-start">
                      <span className="font-serif text-lg leading-tight">{item.title}</span>
                      <span className="text-sm font-medium tracking-tight">
                        £{(item.numericPrice * item.quantity).toLocaleString()}
                      </span>
                    </div>
                    <span className="text-[10px] text-foreground/50 uppercase tracking-widest mt-1">
                      Qty: {item.quantity}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-foreground/15 pt-6 space-y-4 text-sm">
              <div className="flex justify-between text-foreground/60">
                <span>Estimated items total</span>
                <span>£{cartTotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-foreground/60">
                <span>Survey / installation</span>
                <span>Quoted after consultation</span>
              </div>
              <div className="flex justify-between font-serif text-xl pt-4 border-t border-foreground/15">
                <span>Estimate</span>
                <span>£{cartTotal.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
