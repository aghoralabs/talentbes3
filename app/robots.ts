import type { MetadataRoute } from "next";
import { headers } from "next/headers";
import { SITE_URL } from "@/lib/seo";

// Crawlers may index the public site but not the admin CMS or the internal
// API proxy. The admin subdomain (admin.talentbes.in) serves this same app,
// so there everything is disallowed to keep it out of search entirely.
export default async function robots(): Promise<MetadataRoute.Robots> {
  const host = (await headers()).get("host") ?? "";
  if (host.startsWith("admin.")) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/admin", "/api/"] },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
