import type { Metadata } from "next";
import { Arrow, Button, Pill } from "@/components/Button";
import { OverHero } from "@/components/InsetHero";
import PageHero from "@/components/PageHero";
import { company } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Contact",
  description:
    "Get in touch with Talentbes HR Consultants for your next hire, an HR audit or a recruitment drive. Email us or find our office in Karnataka, India.",
  path: "/contact",
});

const enquiryMailto = `mailto:${company.email}?subject=${encodeURIComponent("Website enquiry")}&body=${encodeURIComponent(
  ["Hello Talentbes,", "", "Name:", "Phone:", "Company (if applicable):", "", "I'm reaching out about:", ""].join("\n"),
)}`;

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Get in touch"
        title="Let's plan your next hire."
        image="/images/contact-office.jpg"
        imageAlt="The Talentbes office"
      >
        <p>
          Whether it&apos;s an HR audit, a single senior hire or a full recruitment drive, tell us what you need and a
          consultant will respond directly.
        </p>
      </PageHero>

      <OverHero>
        <section id="content" className="bg-white px-5 py-28 sm:px-10 sm:py-36">
          <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-6 lg:grid-cols-2">
            <div className="rounded-card bg-bone px-8 py-12 sm:px-12 lg:px-14 lg:py-16">
              <div data-fx="up">
                <Pill tone="white">Contact us</Pill>
              </div>
              <dl data-fx="stagger" className="mt-6 flex flex-col">
                <div className="border-b border-charcoal/15 py-5">
                  <dt className="text-[13px] uppercase tracking-[0.04em] text-pewter">Office</dt>
                  <dd className="font-display mt-2 text-[24px] leading-[1.2]">{company.address}</dd>
                </div>
                <div className="border-b border-charcoal/15 py-5">
                  <dt className="text-[13px] uppercase tracking-[0.04em] text-pewter">Email</dt>
                  <dd className="mt-2">
                    <a href={`mailto:${company.email}`} className="font-display text-[24px] hover:text-forest">
                      {company.email}
                    </a>
                  </dd>
                </div>
                <div className="py-5">
                  <dt className="text-[13px] uppercase tracking-[0.04em] text-pewter">LinkedIn</dt>
                  <dd className="mt-2">
                    <a
                      href={company.founderLinkedIn}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-display inline-flex items-center gap-2 text-[24px] hover:text-forest"
                    >
                      {company.founder}, {company.founderTitle}
                      <Arrow className="-rotate-45" />
                    </a>
                  </dd>
                </div>
              </dl>
            </div>
            <div data-fx="up" className="relative min-h-[360px] overflow-hidden rounded-card bg-sage">
              <iframe
                src={company.mapEmbedUrl}
                title="Talentbes office on Google Maps"
                className="absolute inset-0 h-full w-full border-0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
              />
            </div>
          </div>
        </section>

        <div className="bg-white">
          <section className="rounded-t-[32px] bg-sky px-6 py-24 text-center sm:py-28">
            <h2 data-fx="lines" className="font-display text-[36px] leading-[1.08] sm:text-[48px]">
              Ready to talk?
            </h2>
            <p data-fx="small" className="mx-auto mt-6 max-w-md text-[17px] text-graphite">
              Click to open your email app with a message ready to send, we&apos;ll reply directly from there.
            </p>
            <div data-fx="up" className="mt-12">
              <Button href={enquiryMailto} arrow>
                Email us
              </Button>
            </div>
          </section>
        </div>
      </OverHero>
    </>
  );
}
