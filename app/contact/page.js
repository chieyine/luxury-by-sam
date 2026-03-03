import ContactExperience from "../components/ContactExperience";
import GlobalNav from "../components/GlobalNav";

export const metadata = {
  title: "Contact | Luxury by Sam",
  description:
    "Contact Luxury by Sam for fitted wardrobes, bedroom furniture, kitchen cabinets and custom storage. Free consultation & quote.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-background" data-cursor-label="Contact" data-cursor-tone="default">
      <GlobalNav theme="transparent" />

      <ContactExperience />
    </main>
  );
}
