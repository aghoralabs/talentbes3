import type { Metadata } from "next";
import { company, services } from "./content";

// The site's public origin, used for canonical URLs, the sitemap, robots.txt,
// Open Graph links and structured data. Read on the server (at build time
// for static pages), so set SITE_URL in the build environment if the domain
// ever changes.
export const SITE_URL = (process.env.SITE_URL || "https://talentbes.in").replace(/\/+$/, "");

export const SITE_NAME = company.name;
// Kept within the 25-160 characters search engines show in results.
export const DEFAULT_DESCRIPTION =
  "Talentbes HR Consultants: recruitment, executive search, HR auditing, manpower planning and training for clients across India, the Middle East and worldwide.";

/** Trims a description to at most 160 characters, at a word boundary. */
export function clampDescription(text: string, max = 160) {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max - 1);
  return `${cut.slice(0, cut.lastIndexOf(" ") > 0 ? cut.lastIndexOf(" ") : cut.length).replace(/[,;:.\-–—]+$/, "")}…`;
}

export const KEYWORDS = [
  "Talentbes",
  "HR consultancy",
  "HR consultants",
  "recruitment agency",
  "recruitment consultants",
  "executive search",
  "headhunting",
  "HR auditing",
  "manpower planning",
  "recruitment process outsourcing",
  "training and development",
  "performance management system",
  "jobs in Karnataka",
  "recruitment India",
  "recruitment Middle East",
];

export function absoluteUrl(path = "/") {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

/**
 * Per-page metadata with everything search engines and link previews need:
 * a title (the root layout's template adds "| Talentbes"), description,
 * canonical URL (so filtered/duplicate URLs and the admin subdomain don't
 * compete with the real page), and matching Open Graph / Twitter fields.
 * Pages that don't pass `image` inherit the site's opengraph-image.
 */
export function pageMetadata({
  title,
  description,
  path,
  image,
  type = "website",
  publishedTime,
  modifiedTime,
}: {
  title?: string;
  description: string;
  path: string;
  image?: string | null;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
}): Metadata {
  const images = image ? [{ url: image, alt: title ?? SITE_NAME }] : undefined;
  // Applies to everything, including blog excerpts and job text typed into
  // the admin, so no page ever goes over the length search engines show.
  description = clampDescription(description);
  return {
    ...(title ? { title } : {}),
    description,
    alternates: { canonical: path },
    openGraph: {
      type,
      url: path,
      siteName: SITE_NAME,
      locale: "en_IN",
      title: title ? `${title} | ${SITE_NAME}` : undefined,
      description,
      ...(images ? { images } : {}),
      ...(type === "article" ? { publishedTime, modifiedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: title ? `${title} | ${SITE_NAME}` : undefined,
      description,
      ...(images ? { images } : {}),
    },
  };
}

/** schema.org description of the business, rendered on every site page. */
export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "EmploymentAgency",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    alternateName: "Talentbes HR Consultants",
    url: SITE_URL,
    logo: absoluteUrl("/images/brand/logo-full.png"),
    image: absoluteUrl("/images/brand/og-image.jpg"),
    slogan: company.logoTagline,
    description: DEFAULT_DESCRIPTION,
    email: company.email,
    founder: {
      "@type": "Person",
      name: company.founder,
      jobTitle: company.founderTitle,
      sameAs: [company.founderLinkedIn],
    },
    address: { "@type": "PostalAddress", addressRegion: "Karnataka", addressCountry: "IN" },
    areaServed: ["India", "Middle East", "Worldwide"],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "HR services",
      itemListElement: services.map((s) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: s.title, description: s.short, url: absoluteUrl(`/services#${s.slug}`) },
      })),
    },
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: SITE_NAME,
    url: SITE_URL,
    publisher: { "@id": `${SITE_URL}/#organization` },
    inLanguage: "en-IN",
  };
}

const escapeHtml = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const toHtml = (s: string) => escapeHtml(s.trim()).replace(/\n\s*\n/g, "</p><p>").replace(/\n/g, "<br>");

// Google's JobPosting employmentType values.
function employmentTypeFor(raw: string): string | undefined {
  const t = raw.toLowerCase();
  if (/full/.test(t)) return "FULL_TIME";
  if (/part/.test(t)) return "PART_TIME";
  if (/contract|consult/.test(t)) return "CONTRACTOR";
  if (/temp/.test(t)) return "TEMPORARY";
  if (/intern/.test(t)) return "INTERN";
  if (/volunt/.test(t)) return "VOLUNTEER";
  if (/per\s*diem/.test(t)) return "PER_DIEM";
  return raw ? "OTHER" : undefined;
}

// Best-effort country from a free-text job location (Talentbes hires mainly
// in India and the Gulf); defaults to India, the company's home market.
function countryFor(location: string): string {
  const l = location.toLowerCase();
  const map: [RegExp, string][] = [
    [/dubai|abu dhabi|sharjah|uae|emirates/, "AE"],
    [/saudi|riyadh|jeddah|dammam|ksa/, "SA"],
    [/qatar|doha/, "QA"],
    [/oman|muscat/, "OM"],
    [/kuwait/, "KW"],
    [/bahrain|manama/, "BH"],
  ];
  return map.find(([re]) => re.test(l))?.[1] ?? "IN";
}

/** Google for Jobs: a JobPosting for one open role. */
export function jobPostingJsonLd(job: {
  slug: string;
  title: string;
  location: string;
  employmentType: string;
  industry: string;
  description: string;
  requirements: string;
  postedAt: string;
}) {
  const remote = /remote|work from home|wfh/i.test(job.location);
  const description = [
    `<p>${toHtml(job.description)}</p>`,
    job.requirements ? `<p><strong>Requirements</strong></p><p>${toHtml(job.requirements)}</p>` : "",
  ].join("");
  return {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.title,
    description,
    datePosted: job.postedAt,
    employmentType: employmentTypeFor(job.employmentType),
    industry: job.industry || undefined,
    url: absoluteUrl(`/jobs/${job.slug}`),
    identifier: { "@type": "PropertyValue", name: SITE_NAME, value: job.slug },
    directApply: false,
    hiringOrganization: {
      "@type": "Organization",
      name: SITE_NAME,
      sameAs: SITE_URL,
      logo: absoluteUrl("/images/brand/logo-full.png"),
    },
    ...(remote
      ? {
          jobLocationType: "TELECOMMUTE",
          applicantLocationRequirements: { "@type": "Country", name: countryFor(job.location) },
        }
      : {
          jobLocation: {
            "@type": "Place",
            address: {
              "@type": "PostalAddress",
              addressLocality: job.location || undefined,
              addressCountry: countryFor(job.location),
            },
          },
        }),
  };
}

/** A blog post as a schema.org BlogPosting. */
export function blogPostingJsonLd(post: {
  slug: string;
  title: string;
  excerpt: string;
  coverImage: string;
  publishedAt: string;
  updatedAt: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    url: absoluteUrl(`/blog/${post.slug}`),
    mainEntityOfPage: absoluteUrl(`/blog/${post.slug}`),
    image: post.coverImage ? absoluteUrl(post.coverImage) : absoluteUrl("/images/brand/og-image.jpg"),
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
    author: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
      logo: { "@type": "ImageObject", url: absoluteUrl("/images/brand/logo-full.png") },
    },
    inLanguage: "en-IN",
  };
}

/** The Services page FAQs as a schema.org FAQPage. */
export function faqJsonLd(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}
