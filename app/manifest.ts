import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Vodex",
    short_name: "Vodex",
    description: "Enterprise Voice AI agents for debt collection and automated outreach.",
    start_url: "/",
    display: "browser",
    background_color: "#1a1a1a",
    theme_color: "#ff4d00",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
