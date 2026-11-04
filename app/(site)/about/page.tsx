import Image from "next/image";
import type { Metadata } from "next";
import { Button, Pill } from "@/components/Button";
import CtaBand from "@/components/CtaBand";
import { OverHero } from "@/components/InsetHero";
import MediaCard from "@/components/MediaCard";
import PageHero from "@/components/PageHero";
import { company } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "About Us",
  description:
    "Talentbes is a specialist HR consultancy offering Point Blank Recruitment and 360-degree HR services across India, the Middle East and beyond.",
  path: "/about",
});

const values = [
  {
    title: "Point Blank Recruitment",
    description:
      "End-to-end recruitment solutions across every vertical, for every industry, built for both domestic and international clients.",
    tone: "bg-sky/70",
  },
  {
    title: "Cost-savings & standardization",
    description:
      "Structured processes, increased speed, quick response time and consistent quality of service on every mandate we run.",
    tone: "bg-peach",
  },
  {
    title: "A blend of innovation and trend",
    description:
      "Three decades of HR experience combined with a constant read on where the recruitment front is heading next.",
    tone: "bg-sage",
  },
];

const gallery = [
  { src: "/images/about-gallery-1.jpg", alt: "A successful hire sealed with a handshake" },
  { src: "/images/about-gallery-2.jpg", alt: "An engineer reviewing technical drawings for a manufacturing client" },
  { src: "/images/about-gallery-3.jpg", alt: "An IT professional working in a client data center" },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Talentbes"
        title="Your new workstation, your new HR partner."
        image="/images/hero-office-team.jpg"
        imageAlt="Talentbes team at work"
      >
        <Button href="/contact" variant="sky">
          Work with us
        </Button>
      </PageHero>

      <OverHero>
        <section id="content" className="bg-white px-6 py-28 sm:px-10 sm:py-36">
          <div className="mx-auto grid max-w-[1240px] grid-cols-1 gap-12 lg:grid-cols-[1.3fr_1fr] lg:gap-24">
            <div>
              <div data-fx="up">
                <Pill tone="ash">Who we are</Pill>
              </div>
              <p data-fx="lines" className="font-display mt-6 text-[26px] leading-[1.26] sm:text-[31px]">
                Offering HR solutions worldwide. We are enthusiastic and dynamic professionals working to get your job
                search more defined and filtered, a specialist medium-sized company providing{" "}
                <span className="font-normal">HR &amp; recruitment services</span>.
              </p>
            </div>
            <p data-fx="small" className="self-end text-[17px] leading-relaxed text-graphite">
              We cater to various domains of business like IT, banking, finance, manufacturing and SMEs, with a rich
              experience catering to clients across India and the Middle East.
            </p>
          </div>
        </section>

        <section className="bg-white px-5 pb-28 sm:px-10 sm:pb-36">
          <div className="text-center">
            <h2 data-fx="lines" className="font-display text-[36px] leading-[1.08] sm:text-[48px]">
              What clients rely on us for.
            </h2>
          </div>
          <div data-fx="stagger" className="mx-auto mt-16 grid max-w-[1200px] grid-cols-1 gap-6 lg:grid-cols-3">
            {values.map((v, i) => (
              <div key={v.title} className={`flex min-h-[280px] flex-col justify-between rounded-card p-8 sm:p-9 ${v.tone}`}>
                <span className="text-[13px] tabular-nums text-forest">0{i + 1}</span>
                <div>
                  <h3 className="font-display text-[26px] leading-[1.15]">{v.title}</h3>
                  <p className="mt-4 text-[15px] leading-relaxed text-graphite">{v.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-paper px-5 py-28 sm:px-10 sm:py-36">
          <div className="px-6 text-center">
            <div data-fx="up">
              <Pill>Across our client industries</Pill>
            </div>
            <h2 data-fx="lines" className="font-display mt-6 text-[36px] leading-[1.08] sm:text-[48px]">
              Every hire is a partnership.
            </h2>
          </div>
          <div className="mx-auto mt-16 grid max-w-[1200px] grid-cols-1 gap-6 sm:grid-cols-3">
            {gallery.map((g) => (
              <MediaCard key={g.src} image={g.src} alt={g.alt} className="aspect-[4/3]" sizes="(min-width: 640px) 33vw, 100vw" />
            ))}
          </div>
        </section>

        <section className="bg-bone px-5 py-28 sm:px-10 sm:py-36">
          <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-6 lg:grid-cols-[1fr_1.25fr]">
            <div data-fx="parallax" className="relative min-h-[520px] overflow-hidden rounded-card">
              <Image
                src="/images/founder.jpeg"
                alt={`${company.founder}, ${company.founderTitle} of Talentbes`}
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover object-top"
              />
            </div>
            <div className="rounded-card bg-forest px-8 py-12 text-white sm:px-12 lg:px-14 lg:py-16">
              <div data-fx="up">
                <Pill>Founder &amp; CEO</Pill>
              </div>
              <p data-fx="lines" className="font-display mt-6 text-[24px] leading-[1.26] sm:text-[28px]">
                &ldquo;A dynamic, solution-driven approach keeps us on our toes. We look at all end-to-end human
                resource services so clients are happy to have everything under one roof.&rdquo;
              </p>
              <div data-fx="small" className="mt-6 max-w-[64ch] space-y-3 text-[14.5px] leading-relaxed text-white/75">
                <p>
                  At Talentbes, we look at various perspectives that bring value to our clients and potential job
                  seekers. A blend of innovation and current trends keeps us in the forefront at all times.
                </p>
                <p>
                  I have been an HR Management graduate and professional offering various HR services for about three
                  decades, and the experience has been amazing. I&apos;m passionate, dynamic, performance-focused and
                  hardworking, with broad-based experience and hands-on skills across management, implementation,
                  organizational policy development and quality talent.
                </p>
                <p>
                  Building your organization globally gives us a better understanding of different markets, elevating
                  the business standards every day.
                </p>
              </div>
              <p className="font-display mt-7 text-[22px]">{company.founder}</p>
              <p className="text-[14px] text-white/60">{company.founderTitle}, Talentbes</p>
            </div>
          </div>
        </section>

        <CtaBand title="Every hire is a partnership." body="Let's plan your next hire together." cta="Work with us" />
      </OverHero>
    </>
  );
}
