import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Arrow, Button } from "@/components/Button";
import JsonLd from "@/components/JsonLd";
import { getBlogBySlug, getBlogs, resolveImageUrl } from "@/lib/api";
import { blogPostingJsonLd, pageMetadata } from "@/lib/seo";

export const revalidate = 60;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogBySlug(slug);
  if (!post) return {};
  return pageMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    image: resolveImageUrl(post.coverImage),
    type: "article",
    publishedTime: post.publishedAt,
    modifiedTime: post.updatedAt,
  });
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getBlogBySlug(slug);
  if (!post) notFound();

  const otherPosts = (await getBlogs()).filter((p) => p.slug !== slug).slice(0, 3);
  const image = resolveImageUrl(post.coverImage);
  const paragraphs = post.content.split(/\n\s*\n/).filter(Boolean);

  return (
    <article className="mx-auto max-w-[760px] px-5 pb-28 pt-[170px] sm:px-8 sm:pt-[190px]">
      <JsonLd data={blogPostingJsonLd(post)} />
      <Link href="/blog" className="inline-flex items-center gap-1.5 text-[14px] font-medium text-forest">
        <Arrow className="rotate-180" /> Back to the journal
      </Link>

      <span className="eyebrow mt-10 block text-pewter">
        {new Date(post.publishedAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
        {post.readTime && ` · ${post.readTime}`}
      </span>
      <h1 className="font-display mt-4 text-[42px] leading-[1.06] sm:text-[57px]">{post.title}</h1>

      {image && (
        <div className="relative mt-12 aspect-[3/2] overflow-hidden rounded-card">
          <Image src={image} alt={post.title} fill sizes="(min-width: 768px) 760px, 100vw" className="object-cover" priority />
        </div>
      )}

      <div className="mt-12 flex flex-col gap-6">
        {paragraphs.map((paragraph, i) => (
          <p key={i} className="text-[18px] leading-[1.8] text-graphite">
            {paragraph}
          </p>
        ))}
      </div>

      <div className="mt-16 rounded-card bg-forest px-8 py-16 text-center text-white sm:px-12">
        <p className="font-display text-[37px] leading-[1.15]">Let&apos;s talk about your next hire.</p>
        <Button href="/contact" variant="white" arrow className="mt-8">
          Request a consultation
        </Button>
      </div>

      {otherPosts.length > 0 && (
        <div className="mt-20 border-t border-charcoal/15 pt-10">
          <p className="eyebrow text-pewter">Keep reading</p>
          <div className="mt-6 flex flex-col gap-4">
            {otherPosts.map((p) => (
              <Link key={p.slug} href={`/blog/${p.slug}`} className="font-display text-[26px] hover:text-forest">
                {p.title}
              </Link>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}
