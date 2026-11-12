import type { NextConfig } from "next";

/**
 * Client-preview build of the revised debt-collection page.
 * Same image settings as the main site; no legacy redirects, no standalone
 * output (Vercel handles that). Links to other site pages are sent to the
 * live vodex.ai by app/[...slug]/page.tsx.
 */
const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75, 90],
    deviceSizes: [640, 828, 1080, 1280, 1600, 1920, 2560],
  },
  async headers() {
    return [
      {
        // Belt-and-braces with the robots metadata: keep the preview out of
        // search results.
        source: "/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
    ];
  },
};

export default nextConfig;
