import GlobalNav from "../components/GlobalNav";

export const metadata = {
  title: "Privacy Policy | Luxury by Sam",
  description: "Learn how Luxury by Sam collects, uses, and protects your personal information.",
};

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-background text-foreground" data-cursor-label="Read" data-cursor-tone="light">
      <GlobalNav theme="dark" />
      <section className="pt-32 md:pt-48 pb-20 px-6 md:px-20 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-serif mb-10 brutal-title">Privacy Policy</h1>
        
        <div className="space-y-8 text-foreground/80 font-light leading-relaxed text-[15px] md:text-base">
          <p>
            At Luxury by Sam, we respect your privacy and are committed to protecting your personal data. 
            This Privacy Policy explains how we collect, use, and safeguard the information you provide 
            when using our website and services.
          </p>

          <div>
            <h2 className="text-2xl font-serif mb-4 text-foreground/95">1. Information We Collect</h2>
            <p className="mb-3">We may collect the following types of information:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Contact details:</strong> Name, email address, phone number, and installation address when you request a quote.</li>
              <li><strong>Project specifics:</strong> Measurements, photos, and preferences related to your custom build.</li>
              <li><strong>Usage data:</strong> Information about how you navigate and use our website, gathered via essential cookies.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-serif mb-4 text-foreground/95">2. How We Use Your Information</h2>
            <p className="mb-3">Your information is strictly used to provide and outline our services, including:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Providing accurate quotes and arranging free consultations.</li>
              <li>Designing, manufacturing, and installing your bespoke furniture.</li>
              <li>Communicating with you regarding your project timeline.</li>
              <li>Improving our website and customer service experience.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-serif mb-4 text-foreground/95">3. Data Sharing and Security</h2>
            <p>
              We do not sell, rent, or trade your personal information to third parties. We only share data with trusted
              subcontractors or partners when necessary to fulfill your specific installation or design requests. We employ 
              standard security measures to protect your data from unauthorized access or disclosure.
            </p>
          </div>
          
          <div>
            <h2 className="text-2xl font-serif mb-4 text-foreground/95">4. Cookies</h2>
            <p>
              Our website uses cookies to distinguish you from other users of our website. This helps us provide you with 
              a good experience when you browse our website and allows us to improve our site. By clicking "Accept All" on 
              our cookie banner, you consent to our use of non-essential cookies.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-serif mb-4 text-foreground/95">5. Your Rights</h2>
            <p>
              You have the right to request access to the personal data we hold about you, to ask for it to be corrected,
              or to request its deletion. If you have any concerns regarding your privacy, please contact us at 
              <a href="mailto:luxurybysam01@gmail.com" className="text-accent underline hover:opacity-80 ml-1">luxurybysam01@gmail.com</a>.
            </p>
          </div>

          <p className="text-sm text-foreground/50 pt-10">Last updated: March 2026</p>
        </div>
      </section>
    </main>
  );
}
