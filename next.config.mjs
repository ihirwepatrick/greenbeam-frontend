/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'putkiapvvlebelkafwbe.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
    ],
    // Custom loader: Supabase images load directly in the browser to avoid
    // server-side proxy timeouts (upstream image response timed out).
    loader: 'custom',
    loaderFile: './lib/imageLoader.js',
  },
  // In dev, proxy /api/v1 to the real API to avoid CORS when frontend runs on localhost
  async rewrites() {
    if (process.env.NODE_ENV !== 'development') return [];
    return [
      {
        source: '/api/v1/:path*',
        destination: 'https://api.greenbeam.online/api/v1/:path*',
      },
    ];
  },
}

export default nextConfig
