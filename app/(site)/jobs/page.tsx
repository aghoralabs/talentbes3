import Link from "next/link";
import type { Metadata } from "next";
import { Suspense } from "react";
import { Arrow, Button } from "@/components/Button";
import { OverHero } from "@/components/InsetHero";
import PageHero from "@/components/PageHero";
import JobFilters from "@/components/JobFilters";
import { getJobFacets, getJobs } from "@/lib/api";
import { company } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

const generalApplicationMailto = `mailto:${company.email}?subject=${encodeURIComponent(
  "General application",
)}&body=${encodeURIComponent(
  [
    `Hello ${company.name},`,
    "",
    "I didn't see an open role that's an exact fit, but I'd like to be considered for future opportunities.",
    "",
    "Name:",
    "Phone number:",
    "Email:",
    "Current location:",
    "Area of interest:",
    "Years of experience:",
    "",
    "I've attached my resume to this email.",
  ].join("\n"),
)}`;

export const metadata: Metadata = pageMetadata({
  title: "Jobs & Open Roles",
  description:
    "Browse current job openings placed by Talentbes HR Consultants, filterable by location, role, employment type and industry.",
  path: "/jobs",
});

export const revalidate = 30;

export default async function JobsPage({
  searchParams,
}: {
  searchParams: Promise<{ location?: string; role?: string; type?: string; industry?: string; q?: string }>;
}) {
  const params = await searchParams;
  const [jobs, facets] = await Promise.all([getJobs(params), getJobFacets()]);

  return (
    <>
      <PageHero
        eyebrow="Open roles"
        title="Current openings."
        image="/images/careers-office-team.jpg"
        imageAlt="A team at work in a bright office"
      >
        <p>
          Roles we&apos;re actively hiring for, placed directly by Talentbes consultants. Don&apos;t see a fit?{" "}
          <a href={generalApplicationMailto} className="text-lime underline underline-offset-4">
            Send us your resume anyway
          </a>
          .
        </p>
      </PageHero>

      <OverHero>
        <section id="content" className="bg-white px-6 pb-36 pt-28 sm:px-10 sm:pt-36">
          <div className="mx-auto max-w-[1240px]">
            <div data-fx="up">
              <Suspense>
                <JobFilters facets={facets} />
              </Suspense>
            </div>

            {jobs.length === 0 ? (
              <div data-fx="up" className="mt-12 rounded-card bg-bone px-8 py-14 text-center">
                <p className="font-display text-[30px]">No open roles match right now.</p>
                <p className="mx-auto mt-3 max-w-md text-[16px] text-graphite">
                  Send us your resume and we&apos;ll reach out the moment a matching role opens.
                </p>
                <Button href={generalApplicationMailto} arrow className="mt-10">
                  Send your resume
                </Button>
              </div>
            ) : (
              <ul data-fx="stagger" className="mt-14 border-t border-charcoal/15">
                {jobs.map((job) => (
                  <li key={job.slug} className="border-b border-charcoal/15">
                    <Link
                      href={`/jobs/${job.slug}`}
                      className="group flex flex-col gap-3 py-8 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div>
                        <p className="font-display text-[28px] leading-[1.2] group-hover:text-forest">{job.title}</p>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {[job.location, job.role, job.employmentType, job.industry].filter(Boolean).map((tag) => (
                            <span key={tag} className="rounded-pill bg-ash px-4 py-1.5 text-[12px]">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-forest text-white transition-transform group-hover:translate-x-1">
                        <Arrow />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      </OverHero>
    </>
  );
}
