import type { Metadata } from "next";
import { ORG } from "@/lib/site";

/* What search engines and link previews read about each page.
   Every indexable page gets its own canonical address on
   www.gramyasarvodaya.org, so copies of the site on other hosts
   (the Vercel address) are not counted as separate pages, and its own
   title and description in link previews instead of the home page's. */

/** The home page's description: under 160 characters, so search results
    show it whole. */
export const HOME_DESCRIPTION =
  "Gramya Sarvodaya Foundation, based in Jorhat, Assam, works for self-reliant villages through sustainable farming, rural enterprise, education and conservation.";

export const SHARE_IMAGE = {
  url: "/media/og-image.jpg",
  width: 1200,
  height: 630,
  alt: `${ORG.name}: ${ORG.motto}`,
};

type PageSeo = {
  /** The page's own title; the site name is added after it. */
  title: string;
  description: string;
  /** Path with trailing slash, e.g. "/about/". */
  path: string;
  /** Use the title as written, without the site name after it. */
  absoluteTitle?: boolean;
};

export function pageMeta({ title, description, path, absoluteTitle }: PageSeo): Metadata {
  const full = absoluteTitle ? title : `${title} · ${ORG.name}`;
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "en_IN",
      siteName: ORG.name,
      title: full,
      description,
      url: path,
      images: [SHARE_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: full,
      description,
      images: [SHARE_IMAGE.url],
    },
  };
}

/* Breadcrumb trail for structured data: Home, then each step. */
export function breadcrumbSchema(trail: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", path: "/" }, ...trail].map((step, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: step.name,
      item: `${ORG.url}${step.path}`,
    })),
  };
}
