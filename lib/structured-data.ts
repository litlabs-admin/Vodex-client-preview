import { SITE_NAME, SITE_URL } from "@/lib/seo";

/**
 * schema.org builders. Organization data carried over from the old Webflow
 * site's homepage JSON-LD (logo re-hosted at /logo.png instead of Google
 * Drive; dead youtube.com/@vodexsocial replaced with the live channel).
 */

const abs = (path: string) => (path.startsWith("http") ? path : `${SITE_URL}${path}`);

export const SOCIAL_PROFILES = [
  "https://www.linkedin.com/company/vodexai/",
  "https://x.com/vodexsocial",
  "https://www.youtube.com/@vodexai",
  "https://www.instagram.com/vodexai/",
];

const ORG_ID = `${SITE_URL}/#organization`;

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORG_ID,
    name: SITE_NAME,
    legalName: "Lilchirp AI Technologies Private Limited",
    url: SITE_URL,
    logo: abs("/logo.png"),
    description:
      "Vodex provides enterprise-grade Voice AI agents for debt collection, enabling automated right-party contact, payment reminders, promise-to-pay capture, and compliant outreach at scale.",
    foundingDate: "2022",
    founders: [
      { "@type": "Person", name: "Anshul Shrivastava", jobTitle: "CEO" },
      { "@type": "Person", name: "Virat Joshi", jobTitle: "COO" },
    ],
    contactPoint: {
      "@type": "ContactPoint",
      email: "contact@vodex.ai",
      telephone: "+1 302 627 2108",
      contactType: "customer support",
    },
    address: [
      {
        "@type": "PostalAddress",
        streetAddress: "8 The Green",
        addressLocality: "Dover",
        addressRegion: "DE",
        postalCode: "19901",
        addressCountry: "US",
      },
      {
        "@type": "PostalAddress",
        streetAddress: "1592 Union St #473",
        addressLocality: "San Francisco",
        addressRegion: "CA",
        postalCode: "94123",
        addressCountry: "US",
      },
      {
        "@type": "PostalAddress",
        streetAddress:
          "WeWork, Salarpuria Symbiosis, Arakere Bannerghatta Rd, Venugopal Reddy Layout, Arekere",
        addressLocality: "Bengaluru",
        addressRegion: "Karnataka",
        postalCode: "560076",
        addressCountry: "IN",
      },
      {
        "@type": "PostalAddress",
        streetAddress:
          "Aurum Q Parć, Thane - Belapur Rd, Reliance Corporate Park, MIDC Industrial Area, Ghansoli",
        addressLocality: "Navi Mumbai",
        addressRegion: "Maharashtra",
        postalCode: "400710",
        addressCountry: "IN",
      },
    ],
    sameAs: SOCIAL_PROFILES,
    knowsAbout: [
      "Debt Collection",
      "Promise-to-Pay Capture",
      "Payment Reminder Automation",
      "Right-Party Contact Verification",
      "Voice AI for Collections",
    ],
    award: [
      "Featured in Inc42's 30 Startups to Watch - 2024",
      "Recognized by Forbes India",
      "Selected for Google for Startups Accelerator AI First - 2024",
    ],
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    publisher: { "@id": ORG_ID },
  };
}

export function faqPageSchema(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map(({ question, answer }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  };
}

export function breadcrumbSchema(crumbs: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map(({ name, path }, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name,
      item: abs(path),
    })),
  };
}

export function articleSchema(article: {
  headline: string;
  description: string;
  path: string;
  image: string;
  datePublished?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.headline,
    description: article.description,
    image: abs(article.image),
    mainEntityOfPage: abs(article.path),
    ...(article.datePublished ? { datePublished: article.datePublished } : {}),
    author: { "@id": ORG_ID, "@type": "Organization", name: SITE_NAME },
    publisher: { "@id": ORG_ID, "@type": "Organization", name: SITE_NAME, logo: abs("/logo.png") },
  };
}
