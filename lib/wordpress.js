const productVisuals = {
  "sliding-door-wardrobe": {
    image: "/images/photo-1616486029423-aaa4789e8c9a.jpg",
    sequenceFrames: [
      "/images/photo-1616486029423-aaa4789e8c9a.jpg",
      "/images/photo-1567016432779-094069958ea5.jpg",
      "/images/photo-1567538096630-e0c55bd6374c.jpg",
      "/images/photo-1616486338812-3dadae4b4ace.jpg",
    ],
  },
  "hinged-door-wardrobe": {
    image: "/images/photo-1555041469-a586c61ea9bc.jpg",
    sequenceFrames: [
      "/images/photo-1555041469-a586c61ea9bc.jpg",
      "/images/photo-1567016432779-094069958ea5.jpg",
      "/images/photo-1567538096630-e0c55bd6374c.jpg",
      "/images/photo-1616593969747-4797dc75033e.jpg",
    ],
  },
  "walk-in-wardrobe-design": {
    image: "/images/photo-1618220179428-22790b461013.jpg",
    sequenceFrames: [
      "/images/photo-1618220179428-22790b461013.jpg",
      "/images/photo-1617103996702-96ff29b1c467.jpg",
      "/images/photo-1616593969747-4797dc75033e.jpg",
      "/images/photo-1616486338812-3dadae4b4ace.jpg",
    ],
  },
  "shaker-kitchen-cabinets": {
    image: "/images/photo-1615874959474-d609969a20ed.jpg",
    sequenceFrames: [
      "/images/photo-1615874959474-d609969a20ed.jpg",
      "/images/photo-1617806118233-18e1de247200.jpg",
      "/images/photo-1493666438817-866a91353ca9.jpg",
      "/images/photo-1484101403633-562f891dc89a.jpg",
    ],
  },
  "handleless-modern-kitchen": {
    image: "/images/photo-1505693416388-ac5ce068fe85.jpg",
    sequenceFrames: [
      "/images/photo-1505693416388-ac5ce068fe85.jpg",
      "/images/photo-1484101403633-562f891dc89a.jpg",
      "/images/photo-1486946255434-2466348c2166.jpg",
      "/images/photo-1493666438817-866a91353ca9.jpg",
    ],
  },
  "tv-media-wall-unit": {
    image: "/images/photo-1484101403633-562f891dc89a.jpg",
    sequenceFrames: [
      "/images/photo-1484101403633-562f891dc89a.jpg",
      "/images/photo-1617806118233-18e1de247200.jpg",
      "/images/photo-1567016432779-094069958ea5.jpg",
      "/images/photo-1616486338812-3dadae4b4ace.jpg",
    ],
  },
};

function withVisuals(product) {
  const visuals = productVisuals[product.slug] || {};
  return {
    ...product,
    image: visuals.image || null,
    sequenceFrames: visuals.sequenceFrames || [],
  };
}

const fallbackProducts = [
  {
    id: 1,
    title: "Sliding Door Wardrobe",
    slug: "sliding-door-wardrobe",
    price: "£1,200",
    numericPrice: 1200,
    category: "Wardrobes",
    material: "Made to measure",
    palette: "linear-gradient(140deg,#d8cec0,#c9b9a2 45%,#8b7a63)",
    description: "A clean, space-saving wardrobe design tailored to your room.",
    longDescription:
      "Sliding doors are ideal where space is tight. We build around your exact measurements, with internal shelving, drawers and rails designed for how you actually use the space.",
    dimensions: "Built to fit your room",
    leadTime: "Lead time confirmed on quote",
    features: ["Sliding doors", "Custom internals", "Clean finish & fitting"],
    permalink: "/product/sliding-door-wardrobe",
  },
  {
    id: 2,
    title: "Hinged Door Wardrobe",
    slug: "hinged-door-wardrobe",
    price: "£950",
    numericPrice: 950,
    category: "Wardrobes",
    material: "Made to measure",
    palette: "linear-gradient(140deg,#ddd5ca,#b8ab96 45%,#85745f)",
    description: "Classic hinged doors with smart internal storage.",
    longDescription:
      "A simple, practical option that suits most bedrooms. Choose your finish, handles and internal layout—then we install it properly with no awkward gaps.",
    dimensions: "Built to fit your room",
    leadTime: "Lead time confirmed on quote",
    features: ["Hinged doors", "Soft-close options", "Shelves, drawers & rails"],
    permalink: "/product/hinged-door-wardrobe",
  },
  {
    id: 3,
    title: "Walk-in Wardrobe Design",
    slug: "walk-in-wardrobe-design",
    price: "£1,800",
    numericPrice: 1800,
    category: "Wardrobes",
    material: "Made to measure",
    palette: "linear-gradient(140deg,#d9d9d5,#a9a392 45%,#575247)",
    description: "A walk-in layout planned for easy access and organisation.",
    longDescription:
      "We design a walk-in wardrobe around your room shape and storage needs—rails at the right height, drawers where you want them, and shelves that make sense.",
    dimensions: "Designed to your space",
    leadTime: "Lead time confirmed on quote",
    features: ["Walk-in layouts", "Custom shelving", "Mirrors optional"],
    permalink: "/product/walk-in-wardrobe-design",
  },
  {
    id: 4,
    title: "Shaker Kitchen Cabinets",
    slug: "shaker-kitchen-cabinets",
    price: "£2,500",
    numericPrice: 2500,
    category: "Kitchens",
    material: "Durable cabinet build",
    palette: "linear-gradient(140deg,#c8b49b,#7f624d 55%,#47372c)",
    description: "Timeless shaker-style cabinets built for daily life.",
    longDescription:
      "Your kitchen is the heart of the home. We build practical base and wall units, pantry cupboards and soft-close drawers with finishes that suit your style and budget.",
    dimensions: "Designed to your kitchen",
    leadTime: "Lead time confirmed on quote",
    features: ["Base & wall units", "Pantry options", "Soft-close drawers"],
    permalink: "/product/shaker-kitchen-cabinets",
  },
  {
    id: 5,
    title: "Handleless Modern Kitchen",
    slug: "handleless-modern-kitchen",
    price: "£3,200",
    numericPrice: 3200,
    category: "Kitchens",
    material: "Modern finishes",
    palette: "linear-gradient(140deg,#d8c59a,#a18656 45%,#5f4e2d)",
    description: "Clean lines, modern finishes, and smart storage.",
    longDescription:
      "A modern look with practical storage. We can upgrade parts of your kitchen or handle a full transformation, including worktop installation.",
    dimensions: "Designed to your kitchen",
    leadTime: "Lead time confirmed on quote",
    features: ["Modern or classic finishes", "Worktop installation", "Practical layout planning"],
    permalink: "/product/handleless-modern-kitchen",
  },
  {
    id: 6,
    title: "TV Media Wall Unit",
    slug: "tv-media-wall-unit",
    price: "£900",
    numericPrice: 900,
    category: "Storage",
    material: "Custom storage build",
    palette: "linear-gradient(140deg,#e1dbce,#bfb39f 45%,#8a7b66)",
    description: "A media wall with storage that keeps the room tidy.",
    longDescription:
      "A tailored media wall can hide cables, add shelving and create a clean focal point. We build to your room and the size of your TV setup.",
    dimensions: "Designed to your space",
    leadTime: "Lead time confirmed on quote",
    features: ["Cable management", "Shelving & cupboards", "Built to measure"],
    permalink: "/product/tv-media-wall-unit",
  },
].map(withVisuals);

function normalizeWooProduct(product) {
  // Extract custom attributes if available, otherwise use defaults
  let dimensions = "Dimensions available on request";
  let leadTime = "Lead time available on request";
  let material = "Material varies";
  let features = ["Hand-finished construction", "Premium materials", "Craft-led detailing"];

  if (product.attributes && product.attributes.length > 0) {
    product.attributes.forEach((attr) => {
      const name = attr.name.toLowerCase();
      if (name === 'dimensions') dimensions = attr.options[0];
      if (name === 'lead time' || name === 'leadtime') leadTime = attr.options[0];
      if (name === 'material') material = attr.options[0];
      if (name === 'highlights' || name === 'features') {
        // If the user separated features by commas or newlines
        features = attr.options[0].split(/[,\n]/).map(f => f.trim()).filter(Boolean);
      }
    });
  }

  // Strip HTML entities as well as tags, and trim
  const cleanHtml = (str) => {
    if (!str) return "";
    return str.replace(/<[^>]*>?/gm, "").replace(/&nbsp;/g, " ").replace(/&pound;/g, "£").replace(/&amp;/g, "&").trim();
  };

  return {
    id: product.id,
    title: product.name,
    slug: product.slug,
    price: product.price_html
      ? cleanHtml(product.price_html)
      : `£${product.price || "0"}`,
    category: product.categories?.[0]?.name || "Collection",
    material: material,
    image: product.images?.[0]?.src || null,
    sequenceFrames: product.images?.slice(0, 6).map((imageItem) => imageItem.src) || [],
    palette: "linear-gradient(140deg,#ddd5ca,#b8ab96 45%,#85745f)",
    description: cleanHtml(product.short_description) || "Designed with timeless proportions and premium materials.",
    longDescription: cleanHtml(product.description) || "Designed with timeless proportions and premium materials.",
    dimensions: dimensions,
    leadTime: leadTime,
    features: features,
    numericPrice: Number(product.price || 0),
    permalink: product.permalink || "#",
  };
}

async function fetchWithRetry(url, options, maxRetries = 2) {
  for (let i = 0; i <= maxRetries; i++) {
    try {
      const response = await fetch(url, options);
      if (response.ok) return response;
      if (response.status < 500 && response.status !== 429) {
        return response; // Client error, do not retry
      }
    } catch (e) {
      if (i === maxRetries) throw e;
    }
    // Exponential backoff
    await new Promise((r) => setTimeout(r, 500 * Math.pow(2, i)));
  }
  throw new Error(`Request failed after ${maxRetries} retries: ${url}`);
}

async function fetchWooProducts() {
  const baseUrl = process.env.WORDPRESS_URL;
  const consumerKey = process.env.WC_CONSUMER_KEY;
  const consumerSecret = process.env.WC_CONSUMER_SECRET;

  if (!baseUrl || !consumerKey || !consumerSecret) {
    return fallbackProducts;
  }

  const url = new URL("/wp-json/wc/v3/products", baseUrl);
  url.searchParams.set("per_page", "8");
  url.searchParams.set("status", "publish");
  url.searchParams.set("orderby", "date");
  url.searchParams.set("order", "desc");

  const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString("base64");
  const response = await fetchWithRetry(url.toString(), {
    headers: {
      Authorization: `Basic ${auth}`,
    },
    next: { revalidate: 120 },
  });

  if (!response.ok) {
    throw new Error(`WooCommerce request failed: ${response.status}`);
  }

  const data = await response.json();
  return data.map(normalizeWooProduct);
}

export async function getProducts() {
  try {
    const products = await fetchWooProducts();
    console.log(`[WP FETCH] Successfully fetched ${products.length} products from WooCommerce`);
    return products;
  } catch (err) {
    console.error("[WP FETCH ERROR] Falling back to mock products:", err.message);
    if (err.cause) console.error("[WP FETCH CAUSE]:", err.cause);
    if (err.stack) console.error("[WP FETCH STACK]:", err.stack);
    return fallbackProducts;
  }
}

export async function getProductBySlug(slug) {
  const products = await getProducts();
  return products.find((product) => product.slug === slug);
}

export async function getProductCategories() {
  const products = await getProducts();
  return [...new Set(products.map((product) => product.category))];
}

const fallbackPosts = [
  {
    id: 1,
    title: "Sliding vs Hinged Wardrobes: What’s Best?",
    slug: "sliding-vs-hinged-wardrobes",
    excerpt: "A quick way to choose the right wardrobe doors for your room size and layout.",
    content:
      "<p>If your bedroom feels tight around the bed, <strong>sliding doors</strong> can be a smart choice because they don’t swing out into the room.</p><p>If you want the easiest access to the full wardrobe width, <strong>hinged doors</strong> are often better—especially in larger rooms.</p><p>Either way, the biggest difference is inside: shelves, drawers and rails should be planned around how you actually store clothes.</p>",
    date: "2026-02-15T10:00:00",
    image: "/images/photo-1618220179428-22790b461013.jpg",
    category: "Wardrobes",
  },
  {
    id: 2,
    title: "Kitchen Cabinets: A Simple Planning Checklist",
    slug: "kitchen-cabinet-planning-checklist",
    excerpt: "Five practical things to decide before you choose a finish or a style.",
    content:
      "<p>Start with how you cook and move around the kitchen. Then plan:</p><ul><li>Base and wall unit storage</li><li>Pantry space</li><li>Soft-close drawers where you need them</li><li>Worktop height and material</li><li>Lighting and sockets</li></ul><p>Once the layout works, choosing modern or classic finishes becomes easy.</p>",
    date: "2026-01-28T14:30:00",
    image: "/images/photo-1615874959474-d609969a20ed.jpg",
    category: "Kitchens",
  },
  {
    id: 3,
    title: "Media Walls: The Clean Way to Hide Cables",
    slug: "media-walls-hide-cables",
    excerpt: "How to keep your TV setup tidy with smart storage and cable routes.",
    content:
      "<p>A good media wall does two jobs: it looks sharp <em>and</em> keeps everything organised.</p><p>Plan cable routes early, decide what needs cupboards vs open shelves, and keep access to sockets simple. We can build in storage for consoles, routers and sound systems—without making the room feel heavy.</p>",
    date: "2025-12-10T09:15:00",
    image: "/images/photo-1484101403633-562f891dc89a.jpg",
    category: "Storage",
  },
];

function normalizeWpPost(post) {
  return {
    id: post.id,
    title: post.title?.rendered || "Untitled",
    slug: post.slug,
    excerpt: post.excerpt?.rendered?.replace(/<[^>]*>?/gm, "") || "",
    content: post.content?.rendered || "",
    date: post.date,
    image: post._embedded?.['wp:featuredmedia']?.[0]?.source_url || null,
    category: post._embedded?.['wp:term']?.[0]?.[0]?.name || "Uncategorized"
  };
}

async function fetchWpPosts() {
  const baseUrl = process.env.WORDPRESS_URL;

  if (!baseUrl) {
    return fallbackPosts;
  }

  const url = new URL("/wp-json/wp/v2/posts", baseUrl);
  url.searchParams.set("_embed", "1"); // For featured images and categories
  url.searchParams.set("per_page", "10");

  const response = await fetchWithRetry(url.toString(), {
    next: { revalidate: 120 },
  });

  if (!response.ok) {
    throw new Error(`WordPress posts request failed: ${response.status}`);
  }

  const data = await response.json();
  return data.map(normalizeWpPost);
}

export async function getPosts() {
  try {
    return await fetchWpPosts();
  } catch {
    return fallbackPosts;
  }
}

export async function getPostBySlug(slug) {
  const posts = await getPosts();
  return posts.find((post) => post.slug === slug);
}
