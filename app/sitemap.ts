import type { MetadataRoute } from "next";
import { getBlogs, getJobs } from "@/lib/api";
import { SITE_URL } from "@/lib/seo";

// Rebuilt at most hourly, so new blog posts and job openings from the CMS
// show up without a redeploy. If the API can't be reached, the static pages
// are still listed.
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [blogs, jobs] = await Promise.all([getBlogs(), getJobs()]);
  const now = new Date();

  const pages: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/services`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/jobs`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: `${SITE_URL}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/contact`, lastModified: now, changeFrequency: "yearly", priority: 0.7 },
    { url: `${SITE_URL}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.6 },
  ];

  const blogPages: MetadataRoute.Sitemap = blogs.map((b) => ({
    url: `${SITE_URL}/blog/${b.slug}`,
    lastModified: new Date(b.updatedAt || b.publishedAt),
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  const jobPages: MetadataRoute.Sitemap = jobs
    .filter((j) => j.isActive)
    .map((j) => ({
      url: `${SITE_URL}/jobs/${j.slug}`,
      lastModified: new Date(j.postedAt),
      changeFrequency: "weekly",
      priority: 0.8,
    }));

  return [...pages, ...jobPages, ...blogPages];
}
