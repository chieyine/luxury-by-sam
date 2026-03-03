import { getPosts, getPostBySlug } from "../../../lib/wordpress";
import { notFound } from "next/navigation";
import SinglePostExperience from "../../components/SinglePostExperience";
import GlobalNav from "../../components/GlobalNav";

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Post Not Found" };

  const image = post.image || undefined;

  return {
    title: `${post.title} | Luxury by Sam`,
    description: post.excerpt,
    openGraph: {
      title: `${post.title} | Luxury by Sam`,
      description: post.excerpt,
      images: image ? [{ url: image }] : [],
      type: "article",
    },
  };
}

export default async function SingleAdvicePage({ params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: post.image ? [post.image] : undefined,
    datePublished: post.date,
    author: {
      "@type": "Organization",
      name: "Luxury by Sam",
    },
  };

  return (
    <main className="bg-background min-h-screen" data-cursor-label="Read" data-cursor-tone="light">
      <GlobalNav theme="transparent" />

      <SinglePostExperience post={post} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </main>
  );
}

