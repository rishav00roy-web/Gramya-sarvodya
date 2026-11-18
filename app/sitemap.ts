import type { MetadataRoute } from "next";
import { LEGAL } from "@/lib/legal";
import { ORG, PROGRAMMES } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "/",
    "/about/",
    "/programmes/",
    ...PROGRAMMES.map((p) => `/programmes/${p.slug}/`),
    "/approach/",
    "/impact/",
    "/get-involved/",
    "/resources/",
    "/contact/",
    ...LEGAL.map((d) => `/legal/${d.slug}/`),
  ];
  return paths.map((path) => ({ url: `${ORG.url}${path}` }));
}
