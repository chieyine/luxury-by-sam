import { getProducts, getPosts } from "../lib/wordpress";

const baseUrl = "https://luxurybysam.com";

export default async function sitemap() {
  const staticRoutes = ["", "/shop", "/advice", "/process", "/contact", "/checkout"].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
  }));

  const [products, posts] = await Promise.all([getProducts(), getPosts()]);

  const productRoutes =
    products?.map((product) => ({
      url: `${baseUrl}/product/${product.slug}`,
      lastModified: new Date(),
    })) || [];

  const adviceRoutes =
    posts?.map((post) => ({
      url: `${baseUrl}/advice/${post.slug}`,
      lastModified: new Date(),
    })) || [];

  return [...staticRoutes, ...productRoutes, ...adviceRoutes];
}

