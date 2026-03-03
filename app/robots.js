const baseUrl = "https://luxurybysam.com";

export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${baseUrl}/sitemap.xml`,
    host: "luxurybysam.com",
  };
}

