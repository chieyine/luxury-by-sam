import { getPosts } from "../../lib/wordpress";
import JournalExperience from "../components/JournalExperience";
import GlobalNav from "../components/GlobalNav";

export const metadata = {
  title: "Advice | Luxury by Sam",
  description: "Helpful guides for fitted wardrobes, bedrooms, kitchens and storage—before you build.",
};

export default async function AdvicePage() {
  const posts = await getPosts();

  return (
    <main className="min-h-screen bg-background pt-32" data-cursor-label="Advice" data-cursor-tone="default">
      <GlobalNav />

      <JournalExperience posts={posts} />
    </main>
  );
}

