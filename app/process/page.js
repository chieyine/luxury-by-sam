import AboutExperience from "../components/AboutExperience";
import FAQSection from "../components/FAQSection";
import NarrativeBeats from "../components/NarrativeBeats";
import GlobalNav from "../components/GlobalNav";

export const metadata = {
  title: "Our Process | Luxury by Sam",
  description: "How we work: free consultation, design & quote, manufacture & installation, final check. Serving Watford and the UK.",
};

export default function ProcessPage() {
  return (
    <main className="min-h-screen bg-background" data-cursor-label="Process" data-cursor-tone="light">
      <GlobalNav theme="transparent" />

      <AboutExperience />
      <NarrativeBeats />
      <FAQSection />
    </main>
  );
}

