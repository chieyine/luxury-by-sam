/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'luxury-by-sam.netlify.app',
          },
        ],
        destination: 'https://luxurybysam.com/:path*',
        permanent: true,
      },
      {
        source: '/journal',
        destination: '/advice',
        permanent: true,
      },
      {
        source: '/journal/:slug',
        destination: '/advice/:slug',
        permanent: true,
      },
      {
        source: '/about',
        destination: '/process',
        permanent: true,
      },
    ];
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      // In case WordPress is used for images
      {
        protocol: 'http',
        hostname: 'furniture.local',
      },
      {
        protocol: 'https',
        hostname: '*.wp.com',
      },
    ],
  },
};

export default nextConfig;
