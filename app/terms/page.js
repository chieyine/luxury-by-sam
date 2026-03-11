import GlobalNav from "../components/GlobalNav";

export const metadata = {
  title: "Terms of Service | Luxury by Sam",
  description: "Terms and conditions of service for Luxury by Sam custom furniture builds.",
};

export default function TermsOfService() {
  return (
    <main className="min-h-screen bg-background text-foreground" data-cursor-label="Read" data-cursor-tone="light">
      <GlobalNav theme="dark" />
      <section className="pt-32 md:pt-48 pb-20 px-6 md:px-20 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-serif mb-10 brutal-title">Terms of Service</h1>
        
        <div className="space-y-8 text-foreground/80 font-light leading-relaxed text-[15px] md:text-base">
          <p>
            These Terms of Service govern your use of the Luxury by Sam website and the bespoke 
            furniture design, manufacture, and installation services we provide. By requesting a quote 
            or engaging our services, you agree to these terms.
          </p>

          <div>
            <h2 className="text-2xl font-serif mb-4 text-foreground/95">1. Quotes and Pricing</h2>
            <p>
              All initial quotes provide an estimate based on the information and approximate measurements supplied. 
              A final, binding price is only confirmed after an in-person site survey and consultation. 
              Quotes are valid for 30 days from the date of issue.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-serif mb-4 text-foreground/95">2. Payment Terms</h2>
            <p>
              Due to the bespoke nature of our work, a non-refundable deposit is required before manufacturing 
              can commence. The specific deposit amount and installment schedule will be detailed in your final contract. 
              The remaining balance must be paid in full upon satisfactory completion of the installation.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-serif mb-4 text-foreground/95">3. Design and Measurements</h2>
            <p>
              Once a design is finalized and the deposit is paid, materials are cut to order. Any subsequent changes 
              to the design, dimensions, or materials requested by the client may incur additional costs and delay the 
              installation date. It is the client's responsibility to ensure the proposed design meets their requirements 
              before signing off.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-serif mb-4 text-foreground/95">4. Installation</h2>
            <p>
              We pride ourselves on clean, professional installations. However, building work inherently involves some 
              dust and noise. We ask that the installation area be cleared of personal belongings prior to our arrival. 
              We are not responsible for delays caused by the site not being ready or by other tradesmen.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-serif mb-4 text-foreground/95">5. Warranty</h2>
            <p>
              We guarantee the quality of our craftsmanship and the structural integrity of our fitted furniture. 
              Specific warranty periods for hardware (hinges, runners) and materials will be provided upon project completion. 
              This warranty does not cover general wear and tear, accidental damage, or misuse.
            </p>
          </div>

          <p className="text-sm text-foreground/50 pt-10">Last updated: March 2026</p>
        </div>
      </section>
    </main>
  );
}
