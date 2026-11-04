import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { Button, Pill } from "@/components/Button";
import CardSlider from "@/components/CardSlider";
import CtaBand from "@/components/CtaBand";
import { icons } from "@/components/Icons";
import InsetHero, { OverHero, ScrollCue } from "@/components/InsetHero";
import MediaCard from "@/components/MediaCard";
import { company, industries, recruitmentSteps, services, stats } from "@/lib/content";
import { getBlogs, resolveImageUrl } from "@/lib/api";
import { DEFAULT_DESCRIPTION, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  description: DEFAULT_DESCRIPTION,
  path: "/",
});

export const revalidate = 60;

const stepIcons = [icons.clipboard, icons.inbox, icons.funnel, icons.handshake];
const industryIcons = [icons.monitor, icons.bank, icons.factory, icons.store];

const promises = [
  {
    title: "Manpower planning done early",
    body: "We highlight manpower planning to every employer before the crisis hits, hiring the right number of qualified people, in the right job, at the right time.",
    image: "/images/team-meeting.jpg",
    imageAlt: "A team planning headcount around a meeting table",
    tone: "bg-sky/70",
  },
  {
    title: "A customized HR audit",
    body: "A questionnaire built for your company, data gathered from every level, and a strategy report your leadership can actually act on.",
    image: "/images/training-workshop.jpg",
    imageAlt: "Employees in a workplace workshop",
    tone: "bg-sage",
  },
  {
    title: "Guaranteed replacement provision",
    body: "If a selected candidate resigns within the first 3 months, we provide a free replacement, across long-term, probation and health-factor scenarios.",
    image: "/images/about-gallery-1.jpg",
    imageAlt: "A successful hire sealed with a handshake",
    tone: "bg-peach",
  },
];

function Bullet({ icon, title, body, light }: { icon: React.ReactNode; title: string; body?: string; light?: boolean }) {
  return (
    <li className="flex gap-4">
      <span
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full [&>svg]:h-5 [&>svg]:w-5 ${
          light ? "bg-white/10 text-lime" : "bg-white text-forest"
        }`}
      >
        {icon}
      </span>
      <div>
        <p className={`pt-2 text-[15px] font-medium ${light ? "text-white" : "text-charcoal"}`}>{title}</p>
        {body && <p className={`mt-1 text-[13.5px] leading-relaxed ${light ? "text-white/70" : "text-graphite"}`}>{body}</p>}
      </div>
    </li>
  );
}

export default async function Home() {
  const blogPosts = await getBlogs();

  return (
    <>
      {/* 1. Hero: a three-shot film, pinned while the page slides over it */}
      <InsetHero video="/videos/hero.mp4" videoMobile="/videos/hero-960.mp4" poster="/videos/hero-poster.jpg">
        <div className="flex h-full flex-col items-center justify-center px-6 pb-16 pt-28 text-center">
          <h1
            data-fx="lines"
            className="font-display hero-type text-[46px] leading-[1.04] sm:text-[64px] lg:text-[76px]"
          >
            Hiring, with a
            <br />
            human touch.
          </h1>
          <div data-fx="up" data-delay="0.45" className="mt-10 flex flex-wrap justify-center gap-3">
            <Button href="/contact" variant="sky">
              Request a consultation
            </Button>
            <Button href="/services" variant="forest">
              Explore our services
            </Button>
          </div>
        </div>
        <ScrollCue href="#how-we-recruit" />
      </InsetHero>

      <OverHero>
        {/* 2. Benefits quilt: film / forest card, bone card / film */}
        <section id="how-we-recruit" className="scroll-mt-24 bg-white px-5 py-28 sm:px-10 sm:py-36">
          <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-x-6 lg:gap-y-24">
            <MediaCard
              video="/videos/story/01-interview.mp4"
              poster="/videos/story/01-interview.jpg"
              alt="Two interviewers smiling across the table at candidates"
              position="42% center"
              className="min-h-[260px]"
            />
            <div className="rounded-card bg-forest px-8 py-12 text-white sm:px-12 lg:px-14 lg:py-16">
              <h2 data-fx="lines" className="font-display max-w-[20ch] text-[30px] leading-[1.12] sm:text-[36px]">
                We recruit <span className="font-normal">the best talent</span>, at the right time and cost.
              </h2>
              <p data-fx="small" className="mt-4 max-w-[52ch] text-[15px] leading-relaxed text-white/80">
                Point-blank recruitment: a wide search, narrowed round by round to the one person who fits the role,
                the team and the budget.
              </p>
              <ul data-fx="stagger" className="mt-10 grid grid-cols-1 gap-x-8 gap-y-5 sm:grid-cols-2">
                {recruitmentSteps.map((s, i) => (
                  <Bullet key={s.number} light icon={stepIcons[i]} title={s.title} />
                ))}
              </ul>
            </div>

            <div className="rounded-card bg-bone px-8 py-12 sm:px-12 lg:px-14 lg:py-16">
              <h2 data-fx="lines" className="font-display max-w-[20ch] text-[30px] leading-[1.12] sm:text-[36px]">
                From SMEs to global corporates, <span className="font-normal">across every sector</span>.
              </h2>
              <p data-fx="small" className="mt-4 max-w-[52ch] text-[15px] leading-relaxed text-graphite">
                Junior managers to top management, site teams to boardrooms, sourced and screened by consultants who
                know each vertical.
              </p>
              <ul data-fx="stagger" className="mt-10 grid grid-cols-2 gap-x-8 gap-y-5">
                {industries.map((name, i) => (
                  <Bullet key={name} icon={industryIcons[i]} title={name} />
                ))}
              </ul>
            </div>
            <MediaCard
              video="/videos/story/02-planning.mp4"
              poster="/videos/story/02-planning.jpg"
              alt="Colleagues leaning over plans on a meeting-room table"
              position="78% center"
              className="order-first min-h-[260px] lg:order-none"
            />
          </div>
        </section>

        {/* 3. Impact: numbers, then the services "map" */}
        <section className="bg-paper px-6 py-28 sm:px-10 sm:py-36">
          <div className="mx-auto max-w-[1240px]">
            <div data-fx="up">
              <Pill>By the numbers</Pill>
            </div>
            <dl data-fx="stagger" className="mt-10 grid grid-cols-2 gap-y-14 lg:grid-cols-4">
              {stats.map((stat) => {
                const n = Number(stat.value);
                return (
                  <div key={stat.label} className="flex min-h-[170px] flex-col justify-between border-l border-charcoal/15 px-5 sm:px-8 lg:min-h-[210px]">
                    <dt className="font-display max-w-[14ch] text-[19px] leading-[1.25] sm:text-[21px]">{stat.label}</dt>
                    <dd className="mt-8 text-[48px] font-extralight leading-none tracking-[-0.04em] sm:text-[64px]">
                      {Number.isFinite(n) ? (
                        <span data-fx="count" data-to={n}>
                          {stat.value}
                        </span>
                      ) : (
                        stat.value
                      )}
                      <span className="text-[20px] tracking-[-0.02em] sm:text-[26px]">{stat.suffix}</span>
                    </dd>
                  </div>
                );
              })}
            </dl>

          </div>
        </section>

        {/* 3b. What we do */}
        <section className="bg-white px-6 py-28 sm:px-10 sm:py-36">
          <div className="mx-auto max-w-[1200px]">
            <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-[1.3fr_1fr] lg:gap-24">
              <div>
                <div data-fx="up">
                  <Pill tone="ash">What we do</Pill>
                </div>
                <p data-fx="lines" className="font-display mt-7 text-[26px] leading-[1.3] sm:text-[32px]">
                  Talentbes is a <span className="font-normal">360&deg; HR consultancy</span>: HR auditing, manpower
                  planning, recruitment, training and executive search, delivered by professionals with{" "}
                  <span className="font-normal">three decades</span> in the field.
                </p>
                <div data-fx="up" className="mt-10">
                  <Button href="/services" arrow>
                    View all {services.length} services
                  </Button>
                </div>
              </div>
              <MediaCard
                video="/videos/story/03-culture.mp4"
                poster="/videos/story/03-culture.jpg"
                alt="Employees listening attentively in a workplace training session"
                className="mx-auto aspect-[4/5] w-full max-w-[360px]"
              />
            </div>
          </div>
        </section>

        {/* 4. Promises carousel */}
        <section className="overflow-hidden bg-paper py-28 sm:py-36">
          <div className="px-6 text-center">
            <h2 data-fx="lines" className="font-display text-[36px] leading-[1.08] sm:text-[48px]">
              What clients rely on us for.
            </h2>
            <p data-fx="small" className="mx-auto mt-5 max-w-[34ch] text-[16px] text-graphite">
              Point-blank recruitment, for every vertical, worldwide.
            </p>
          </div>
          <div className="mt-16">
            <CardSlider cards={promises} />
          </div>
        </section>

        {/* 5. Sourcing & executive search: a pastel quilt */}
        <section className="bg-white px-5 py-28 sm:px-10 sm:py-36">
          <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-x-6 lg:gap-y-24">
            <div className="flex flex-col justify-center rounded-card bg-sage px-8 py-12 sm:px-12 lg:px-14 lg:py-16">
              <div data-fx="up">
                <Pill tone="white">Sourcing &amp; headhunt</Pill>
              </div>
              <h2 data-fx="lines" className="font-display mt-6 max-w-[20ch] text-[30px] leading-[1.12] sm:text-[36px]">
                Blue collar to boardroom, <span className="font-normal">one network</span>.
              </h2>
              <p data-fx="small" className="mt-4 max-w-[52ch] text-[15px] leading-relaxed text-graphite">
                Our way to find you the right employee is another way to source talent. We invest in the ways and means
                to get you the right fit in the organization, whether that&apos;s a site team or a senior leadership
                hire.
              </p>
              <div data-fx="up" className="mt-8">
                <Button href="/services#sourcing-headhunting" arrow>
                  See our sourcing platforms
                </Button>
              </div>
            </div>
            <MediaCard
              image="/images/construction-team.jpg"
              alt="On-site construction and industrial team hired through Talentbes"
              className="min-h-[260px]"
            />
            <MediaCard
              image="/images/office-collab.jpg"
              alt="Talentbes consultants collaborating on a hiring plan"
              className="min-h-[260px]"
            />
            <div className="flex flex-col justify-center rounded-card bg-sky/60 px-8 py-12 sm:px-12 lg:px-14 lg:py-16">
              <div data-fx="up">
                <Pill tone="white">Executive search</Pill>
              </div>
              <h2 data-fx="lines" className="font-display mt-6 max-w-[20ch] text-[30px] leading-[1.12] sm:text-[36px]">
                We see leaders as <span className="font-normal">brands</span>, not employees.
              </h2>
              <p data-fx="small" className="mt-4 max-w-[52ch] text-[15px] leading-relaxed text-graphite">
                Executive hiring happens when the right candidate is approached for the right vacancy, not the other
                way around. Their excellence is the resume an organization is really looking for at the time of hiring
                a top management personnel.
              </p>
              <div data-fx="up" className="mt-8">
                <Button href="/services#executive-search" arrow>
                  See headhunting services
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* 6. Founder + journal, on bone */}
        <section className="bg-bone px-6 py-32 sm:px-10 sm:py-40">
          <figure className="mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-12 lg:grid-cols-[480px_1fr] lg:gap-20">
            <div data-fx="up" className="relative mx-auto aspect-[911/1000] w-full max-w-[480px] overflow-hidden rounded-card bg-sage">
              <Image
                src="/images/founder.jpeg"
                alt={`${company.founder}, ${company.founderTitle} of Talentbes`}
                fill
                sizes="(min-width: 1024px) 480px, 100vw"
                className="object-cover object-top"
              />
            </div>
            <div>
              <div data-fx="up">
                <Pill tone="white">From our founder</Pill>
              </div>
              <blockquote data-fx="lines" className="font-display mt-7 text-[26px] leading-[1.26] sm:text-[34px]">
                &ldquo;A dynamic, solution-driven approach keeps us on our toes. We look at all end-to-end human
                resource services so clients are happy to have everything under one roof.&rdquo;
              </blockquote>
              <figcaption data-fx="small" className="mt-10">
                <p className="font-display text-[24px]">{company.founder}</p>
                <p className="text-[14px] text-pewter">{company.founderTitle}, Talentbes</p>
                <Link
                  href="/about"
                  className="mt-6 inline-flex text-[14px] font-semibold text-forest underline-offset-4 hover:underline"
                >
                  Read our story
                </Link>
              </figcaption>
            </div>
          </figure>

          {blogPosts.length > 0 && (
            <div className="mx-auto mt-40 max-w-[1200px]">
              <div className="text-center">
                <h2 data-fx="lines" className="font-display text-[36px] leading-[1.08] sm:text-[48px]">
                  Notes on work.
                </h2>
                <p data-fx="small" className="mt-5 text-[16px] text-graphite">
                  Thinking from the Talentbes desk on hiring, workplace culture, and the way work itself keeps
                  changing.
                </p>
              </div>
              <div data-fx="stagger" className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
                {blogPosts.slice(0, 3).map((post) => {
                  const image = resolveImageUrl(post.coverImage);
                  return (
                    <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
                      <div className="relative aspect-[3/2] overflow-hidden rounded-card bg-sage">
                        {image && (
                          <Image src={image} alt={post.title} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
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
                      <p className="mt-3 line-clamp-2 text-[14px] leading-relaxed text-graphite">{post.excerpt}</p>
                    </Link>
                  );
                })}
              </div>
              <div data-fx="up" className="mt-14 text-center">
                <Button href="/blog" variant="white">
                  View more
                </Button>
              </div>
            </div>
          )}
        </section>

        {/* 7. Closing band */}
        <CtaBand
          title="Hiring, done as an organisation-efficient team."
          body="One HR partner. 360-degree services. Let's plan your next hire together."
        />
      </OverHero>
    </>
  );
}
