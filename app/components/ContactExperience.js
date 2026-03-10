"use client";

import { useRef, useState } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import { Reveal, SmoothScroll } from "./Animations";

export default function ContactExperience() {
  const container = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"]
  });

  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "general",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const { name, email, subject, message } = formState;

    const subjectLine = `New website enquiry (${subject || "General"}) from ${name || "Unknown"}`;

    const body = [
      "New enquiry from the contact page:",
      "",
      `Name: ${name}`,
      `Email: ${email}`,
      "",
      "Message:",
      message,
    ]
      .filter(Boolean)
      .join("\n");

    const mailtoUrl = `mailto:luxurybysam01@gmail.com?subject=${encodeURIComponent(
      subjectLine
    )}&body=${encodeURIComponent(body)}`;

    window.location.href = mailtoUrl;

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  return (
    <SmoothScroll>
      <div ref={container} className="min-h-screen bg-background text-foreground pb-32">
        <header className="px-6 md:px-20 pt-40 md:pt-48 pb-20">
          <div className="max-w-[1400px] mx-auto grid md:grid-cols-2 gap-16 md:gap-24 items-start">
            <div>
              <Reveal>
                <h1 className="text-[10vw] md:text-[6.5vw] brutal-title font-serif leading-[0.9] tracking-tighter uppercase mb-8">
                  Let&apos;s Talk
                  <br />
                  <span className="italic text-foreground/40 text-[9vw] md:text-[5.5vw]">Your Project</span>
                </h1>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="max-w-md text-foreground/60 leading-relaxed font-sans text-base md:text-lg">
                  Every great space starts with a conversation. Tell us what you have in mind—whether it&apos;s a single wardrobe or a full kitchen re-fit. We&apos;ll get back to you within 48 hours to arrange a free, no-obligation design consultation and quote.
                </p>
              </Reveal>
              
              <div className="mt-16 md:mt-24 space-y-12">
                <Reveal delay={0.3}>
                  <div>
                    <h3 className="text-[10px] uppercase tracking-[0.3em] font-bold text-foreground/40 mb-4">Serving area</h3>
                    <p className="font-serif text-2xl mb-1 mt-2">Serving the UK</p>
                    <p className="font-sans text-foreground/70">Available across the United Kingdom</p>
                  </div>
                </Reveal>
                
                <Reveal delay={0.4}>
                  <div>
                    <h3 className="text-[10px] uppercase tracking-[0.3em] font-bold text-foreground/40 mb-4">Direct Contact</h3>
                    <a href="mailto:luxurybysam01@gmail.com" className="font-serif text-2xl hover:text-accent transition-colors">
                      luxurybysam<span className="text-[1.2em] align-baseline" style={{ fontVariantNumeric: "tabular-nums" }}>01</span>@gmail.com
                    </a>
                    <p className="mt-3 font-sans text-foreground/70">
                      Call:{" "}
                      <a className="hover:text-accent transition-colors" href="tel:+447733689409">
                        07733 689409
                      </a>
                    </p>
                  </div>
                </Reveal>
              </div>
            </div>

            <div className="md:pt-4">
              <Reveal delay={0.5}>
                {isSubmitted ? (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-foreground text-background p-12 md:p-16 h-full flex flex-col justify-center min-h-[500px]"
                  >
                    <h3 className="text-3xl md:text-4xl font-serif mb-6">Inquiry Received</h3>
                    <p className="text-background/70 font-sans leading-relaxed">
                      Thanks — we’ve received your request. We’ll review the details and respond within 48 hours with next steps and a clear quote.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-10 group">
                    <div className="relative">
                      <input
                        type="text"
                        id="name"
                        value={formState.name}
                        onChange={(e) => setFormState({...formState, name: e.target.value})}
                        required
                        className="peer w-full bg-transparent border-b border-foreground/20 py-4 focus:outline-none focus:border-foreground transition-colors font-sans text-lg placeholder-transparent"
                        placeholder="Name"
                      />
                      <label 
                        htmlFor="name" 
                        className="absolute left-0 top-4 text-foreground/40 text-lg transition-all peer-focus:-top-4 peer-focus:text-[11px] peer-focus:uppercase peer-focus:tracking-widest peer-focus:text-foreground/80 peer-valid:-top-4 peer-valid:text-[11px] peer-valid:uppercase peer-valid:tracking-widest peer-valid:text-foreground/80"
                      >
                        Your name
                      </label>
                    </div>

                    <div className="relative">
                      <input
                        type="email"
                        id="email"
                        value={formState.email}
                        onChange={(e) => setFormState({...formState, email: e.target.value})}
                        required
                        className="peer w-full bg-transparent border-b border-foreground/20 py-4 focus:outline-none focus:border-foreground transition-colors font-sans text-lg placeholder-transparent"
                        placeholder="Email"
                      />
                      <label 
                        htmlFor="email" 
                        className="absolute left-0 top-4 text-foreground/40 text-lg transition-all peer-focus:-top-4 peer-focus:text-[11px] peer-focus:uppercase peer-focus:tracking-widest peer-focus:text-foreground/80 peer-valid:-top-4 peer-valid:text-[11px] peer-valid:uppercase peer-valid:tracking-widest peer-valid:text-foreground/80"
                      >
                        Email Address
                      </label>
                    </div>

                    <div className="relative">
                      <select
                        id="subject"
                        value={formState.subject}
                        onChange={(e) => setFormState({...formState, subject: e.target.value})}
                        className="w-full bg-transparent border-b border-foreground/20 py-4 focus:outline-none focus:border-foreground transition-colors font-sans text-lg appearance-none cursor-pointer"
                      >
                        <option value="general">General enquiry</option>
                        <option value="kitchen">Kitchen cabinets / fitted kitchen</option>
                        <option value="wardrobe">Fitted wardrobe / bedroom</option>
                        <option value="storage">Media wall / custom storage</option>
                      </select>
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-[10px] uppercase tracking-widest text-foreground/40">
                        Select
                      </div>
                    </div>

                    <div className="relative">
                      <textarea
                        id="message"
                        value={formState.message}
                        onChange={(e) => setFormState({...formState, message: e.target.value})}
                        required
                        rows={4}
                        className="peer w-full bg-transparent border-b border-foreground/20 py-4 focus:outline-none focus:border-foreground transition-colors font-sans text-lg placeholder-transparent resize-none"
                        placeholder="Message"
                      />
                      <label 
                        htmlFor="message" 
                        className="absolute left-0 top-4 text-foreground/40 text-lg transition-all peer-focus:-top-4 peer-focus:text-[11px] peer-focus:uppercase peer-focus:tracking-widest peer-focus:text-foreground/80 peer-valid:-top-4 peer-valid:text-[11px] peer-valid:uppercase peer-valid:tracking-widest peer-valid:text-foreground/80"
                      >
                        Tell us what you need (sizes, style, budget)
                      </label>
                    </div>

                    <button 
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full border border-foreground/20 bg-transparent text-foreground py-5 text-[11px] uppercase tracking-[0.3em] font-medium hover:bg-accent/15 transition-colors disabled:opacity-50 relative overflow-hidden"
                    >
                      <span className={isSubmitting ? "opacity-0" : "opacity-100"}>Send enquiry</span>
                      {isSubmitting && (
                        <span className="absolute inset-0 flex items-center justify-center">
                          <motion.div 
                            animate={{ rotate: 360 }}
                            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                            className="w-4 h-4 border-2 border-background border-t-transparent rounded-full"
                          />
                        </span>
                      )}
                    </button>
                  </form>
                )}
              </Reveal>
            </div>
          </div>
        </header>

        {/* Full width map */}
        <section className="px-6 md:px-20 mt-12 md:mt-24">
          <Reveal width="100%">
            <div className="w-full aspect-21/9 md:aspect-3/1 relative overflow-hidden border border-foreground/10">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d39640.89!2d-0.42!3d51.655!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48766b441f77d337%3A0x7d287bb175d9e50e!2sHertfordshire!5e0!3m2!1sen!2suk!4v1709000000000"
                width="100%"
                height="100%"
                className="absolute inset-0 w-full h-full border-0 grayscale invert opacity-80"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Luxury by Sam"
              />
            </div>
          </Reveal>
        </section>
      </div>
    </SmoothScroll>
  );
}
