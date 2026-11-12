import { redirect } from "next/navigation";
import { SITE_URL } from "@/lib/seo";

/**
 * Preview only: this project contains just the debt-collection page (at "/").
 * Every other path the navbar/footer link to (/products, /pricing, /resources/…)
 * is sent to the same page on the live site. Static files in /public and
 * /_next are served before this route, so they're unaffected.
 */
export default async function LiveSiteRedirect({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  redirect(`${SITE_URL}/${slug.map(encodeURIComponent).join("/")}`);
}
