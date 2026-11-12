import type { Metadata } from "next";

export const SITE_URL = "https://www.vodex.ai";
export const SITE_NAME = "Vodex";
export const DEFAULT_OG_IMAGE = "/og-default.png";

type PageMetadataInput = {
  title: string;
  description: string;
  /** Route path, e.g. "/pricing" — becomes the canonical URL and og:url. */
  path: string;
  /** Social preview image; defaults to the site-wide card. */
  image?: string;
  type?: "website" | "article";
  publishedTime?: string;
};

/**
 * Next shallow-merges `openGraph`/`twitter` per segment and never derives
 * og:title from `title`, so every page builds the full set here rather than
 * relying on the root layout's defaults. Mirrors what the old Webflow site
 * emitted (og/twitter title + description, summary_large_image) plus the
 * canonical and image it lacked.
 */
export function pageMetadata({
  title,
  description,
  path,
  image = DEFAULT_OG_IMAGE,
  type = "website",
  publishedTime,
}: PageMetadataInput): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      siteName: SITE_NAME,
      locale: "en_US",
      type,
      images: [image],
      ...(publishedTime ? { publishedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      site: "@vodexsocial",
      title,
      description,
      images: [image],
    },
  };
}
