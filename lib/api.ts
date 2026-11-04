// Server-side client for the talentbes-api Go backend. Only used from
// Server Components / route handlers, never bundled to the client, so the
// API URL never needs a NEXT_PUBLIC_ prefix.

const API_URL = process.env.TALENTBES_API_URL || "http://localhost:8080";

export type Blog = {
  id: string; // PocketBase record id
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  readTime: string;
  published: boolean;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
};

export type Job = {
  id: string; // PocketBase record id
  slug: string;
  title: string;
  location: string;
  role: string;
  employmentType: string;
  industry: string;
  description: string;
  requirements: string;
  image: string;
  attachmentName: string;
  attachmentType: string;
  isActive: boolean;
  postedAt: string;
};

export type JobFilters = {
  location?: string;
  role?: string;
  type?: string;
  industry?: string;
  q?: string;
};

export type JobFacets = {
  locations: string[];
  roles: string[];
  types: string[];
  industries: string[];
};

async function apiFetch<T>(path: string, revalidateSeconds = 60): Promise<T | null> {
  try {
    const res = await fetch(`${API_URL}${path}`, {
      next: { revalidate: revalidateSeconds },
    });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

export async function getBlogs(): Promise<Blog[]> {
  return (await apiFetch<Blog[]>("/api/blogs")) ?? [];
}

export async function getBlogBySlug(slug: string): Promise<Blog | null> {
  return apiFetch<Blog>(`/api/blogs/${encodeURIComponent(slug)}`);
}

export async function getJobs(filters: JobFilters = {}): Promise<Job[]> {
  const params = new URLSearchParams();
  if (filters.location) params.set("location", filters.location);
  if (filters.role) params.set("role", filters.role);
  if (filters.type) params.set("type", filters.type);
  if (filters.industry) params.set("industry", filters.industry);
  if (filters.q) params.set("q", filters.q);
  const qs = params.toString();
  return (await apiFetch<Job[]>(`/api/jobs${qs ? `?${qs}` : ""}`, 30)) ?? [];
}

export async function getJobBySlug(slug: string): Promise<Job | null> {
  return apiFetch<Job>(`/api/jobs/${encodeURIComponent(slug)}`, 30);
}

export async function getJobFacets(): Promise<JobFacets> {
  return (
    (await apiFetch<JobFacets>("/api/jobs/facets", 30)) ?? {
      locations: [],
      roles: [],
      types: [],
      industries: [],
    }
  );
}

// Blog/job images can be either a bundled static asset
// ("/images/...", shipped with this app) or a file uploaded through the
// admin CMS ("/uploads/..."). Uploaded paths are already same-origin: this
// app's own "/uploads/[...path]" route proxies them from the private API
// server-to-server, so the browser never talks to that API directly.
export function resolveImageUrl(path: string | undefined | null): string | null {
  if (!path) return null;
  return path;
}
