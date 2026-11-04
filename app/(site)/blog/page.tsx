import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { OverHero } from "@/components/InsetHero";
import PageHero from "@/components/PageHero";
import { getBlogs, resolveImageUrl } from "@/lib/api";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Blog",
  description: "Notes on work, hiring and HR from the Talentbes team.",
  path: "/blog",
});

export const revalidate = 60;

export default async function BlogPage() {
  const posts = await getBlogs();

  return (
    <>
      <PageHero
        eyebrow="The journal"
        title="Notes on work."
        image="/images/remote-wfh.jpg"
        imageAlt="A professional working from a home desk"
      >
        <p>Thinking from the Talentbes desk on hiring, workplace culture, and the way work itself keeps changing.</p>
      </PageHero>

      <OverHero className="bg-bone">
        <section id="content" className="px-6 pb-36 pt-28 sm:px-10 sm:pt-36">
          <div className="mx-auto max-w-[1240px]">
            {posts.length === 0 ? (
              <p data-fx="up" className="font-display text-center text-[32px]">
                New posts are on their way, check back soon.
              </p>
            ) : (
              <div data-fx="stagger" className="grid grid-cols-1 gap-x-8 gap-y-16 md:grid-cols-3">
                {posts.map((post) => {
                  const image = resolveImageUrl(post.coverImage);
                  return (
                    <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
                      <div className="relative aspect-[3/2] overflow-hidden rounded-card bg-sage">
                        {image && (
                          <Image
                            src={image}
                            alt={post.title}
                            fill
                            sizes="(min-width: 768px) 33vw, 100vw"
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                        )}
                        {post.readTime && (
                          <span className="absolute left-4 top-4 rounded-pill bg-white px-4 py-1.5 text-[12px] uppercase">
                            {post.readTime}
                          </span>
                        )}
                      </div>
                      <p className="mt-6 text-[14px] text-pewter">
                        {new Date(post.publishedAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                      </p>
                      <p className="font-display mt-3 text-[26px] leading-[1.2] group-hover:text-forest">{post.title}</p>
                      <p className="mt-3 text-[14px] leading-relaxed text-graphite">{post.excerpt}</p>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </section>
      </OverHero>
    </>
  );
}
