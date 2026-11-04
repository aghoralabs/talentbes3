import type { Metadata } from "next";
import { Pill } from "@/components/Button";
import CtaBand from "@/components/CtaBand";
import FaqAccordion from "@/components/FaqAccordion";
import { OverHero } from "@/components/InsetHero";
import JsonLd from "@/components/JsonLd";
import PageHero from "@/components/PageHero";
import ServiceList from "@/components/ServiceList";
import { faqs, services } from "@/lib/content";
import { faqJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "HR Services",
  description:
    "360-degree HR services from Talentbes: HR auditing, assessments, manpower planning, recruitment, training, performance management and executive search.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Our services"
        title="One HR partner. 360 degree services."
        image="/images/services-hero.jpg"
        imageAlt="A Talentbes client team closing a successful hire"
      >
        <p>We look at all end-to-end Human Resource Services, and clients are happy to have all services under one roof.</p>
      </PageHero>

      <OverHero>
        <section id="content" className="bg-white px-6 py-28 sm:px-10 sm:py-36">
          <div className="mx-auto max-w-[1240px]">
            <div data-fx="up">
              <Pill>{services.length} services</Pill>
            </div>
            <h2 data-fx="lines" className="font-display mt-6 max-w-[20ch] text-[36px] leading-[1.08] sm:text-[48px]">
              Complete, <span className="font-normal">360-degree</span> HR services.
            </h2>
            <div data-fx="up" className="mt-12">
              <ServiceList services={services} />
            </div>
          </div>
        </section>

        <section className="bg-bone px-5 py-28 sm:px-10 sm:py-36">
          <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-6 lg:grid-cols-[1fr_1.6fr]">
            <div className="rounded-card bg-forest px-8 py-12 text-white sm:px-12 lg:px-14 lg:py-16">
              <JsonLd data={faqJsonLd(faqs)} />
              <div data-fx="up">
                <Pill>FAQs</Pill>
              </div>
              <h2 data-fx="lines" className="font-display mt-6 text-[32px] leading-[1.1] sm:text-[40px]">
                Questions about our services
              </h2>
            </div>
            <div className="rounded-card bg-white px-6 py-8 sm:px-12 sm:py-12">
              <FaqAccordion items={faqs} />
            </div>
          </div>
        </section>

        <CtaBand
          title="Not sure which service you need?"
          body="Tell us what you're hiring for and we'll map the right mix of services to your budget and timeline."
          cta="Talk to a consultant"
        />
      </OverHero>
    </>
  );
}
