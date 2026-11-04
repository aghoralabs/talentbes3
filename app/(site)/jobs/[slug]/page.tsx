import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Arrow, Button } from "@/components/Button";
import JsonLd from "@/components/JsonLd";
import { getJobBySlug, resolveImageUrl } from "@/lib/api";
import { company } from "@/lib/content";
import { jobPostingJsonLd, pageMetadata } from "@/lib/seo";

export const revalidate = 30;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const job = await getJobBySlug(slug);
  if (!job) return {};
  const where = job.location ? ` in ${job.location}` : "";
  return {
    ...pageMetadata({ title: `${job.title}${where}`, description: job.description, path: `/jobs/${job.slug}` }),
    ...(job.isActive ? {} : { robots: { index: false, follow: true } }),
  };
}

function Attachment({ url, name, type, title }: { url: string; name: string; type: string; title: string }) {
  const resolved = resolveImageUrl(url);
  if (!resolved) return null;
  if (type.startsWith("image/")) {
    return (
      <div className="relative mt-10 aspect-[3/2] overflow-hidden rounded-card">
        <Image src={resolved} alt={title} fill sizes="(min-width: 768px) 768px, 100vw" className="object-cover" priority />
      </div>
    );
  }
  const ext = name.split(".").pop()?.toUpperCase() || "FILE";
  return (
    <a
      href={resolved}
      download={name || true}
      className="mt-10 flex items-center gap-4 rounded-card bg-white p-5 transition-colors hover:bg-sage"
    >
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-sage text-[11px] font-semibold text-forest">
        {ext}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate text-[15px] font-medium">{name || "Download attachment"}</span>
        <span className="block text-[13px] text-pewter">Click to download</span>
      </span>
    </a>
  );
}

export default async function JobDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const job = await getJobBySlug(slug);
  if (!job) notFound();

  const tags = [job.location, job.role, job.employmentType, job.industry].filter(Boolean);
  const mailBody = [
    `Hello ${company.name},`,
    "",
    `I would like to apply for the ${job.title} role${tags.length ? ` (${tags.join(", ")})` : ""}.`,
    "",
    "Name:",
    "Phone number:",
    "Email:",
    "Current location:",
    "Years of experience:",
    "Current / expected salary:",
    "",
    "I've attached my resume to this email.",
  ].join("\n");
  const mailtoHref = `mailto:${company.email}?subject=${encodeURIComponent(`Application: ${job.title}`)}&body=${encodeURIComponent(mailBody)}`;

  return (
    <article className="mx-auto max-w-[800px] px-5 pb-28 pt-[170px] sm:px-8 sm:pt-[190px]">
      {job.isActive && <JsonLd data={jobPostingJsonLd(job)} />}
      <Link href="/jobs" className="inline-flex items-center gap-1.5 text-[14px] font-medium text-forest">
        <Arrow className="rotate-180" /> Back to open roles
      </Link>

      <div className="mt-10 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span key={tag} className="rounded-pill bg-sage px-3 py-1 text-[12px] font-medium text-forest">
            {tag}
          </span>
        ))}
      </div>
      <h1 className="font-display mt-5 text-[42px] leading-[1.06] sm:text-[57px]">{job.title}</h1>

      {job.image && <Attachment url={job.image} name={job.attachmentName} type={job.attachmentType} title={job.title} />}

      <div className="mt-12 flex flex-col gap-10">
        <div>
          <p className="eyebrow text-pewter">About the role</p>
          <p className="mt-4 whitespace-pre-line text-[17px] leading-[1.8] text-graphite">{job.description}</p>
        </div>
        {job.requirements && (
          <div>
            <p className="eyebrow text-pewter">What we&apos;re looking for</p>
            <p className="mt-4 whitespace-pre-line text-[17px] leading-[1.8] text-graphite">{job.requirements}</p>
          </div>
        )}
      </div>

      <div className="mt-16 rounded-card bg-forest px-8 py-16 text-center text-white sm:px-12">
        <p className="font-display text-[37px]">Ready to apply?</p>
        <p className="mt-2 text-[15px] text-white/70">
          Send us your resume by email and we&apos;ll match it straight to this role.
        </p>
        <Button href={mailtoHref} variant="white" arrow className="mt-8">
          Apply for this role
        </Button>
      </div>
    </article>
  );
}
