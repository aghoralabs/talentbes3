"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { Service, ServiceDetail } from "@/lib/content";

function Detail({ block }: { block: ServiceDetail }) {
  return (
    <div>
      {block.heading && <h4 className="text-[16px] font-medium text-charcoal">{block.heading}</h4>}
      {block.kind === "text" && (
        <p className={`${block.heading ? "mt-2" : ""} text-[16px] leading-relaxed text-graphite`}>{block.body}</p>
      )}
      {block.kind === "list" && (
        <ul className={`${block.heading ? "mt-3" : ""} flex flex-col gap-2`}>
          {block.items.map((item) => (
            <li key={item} className="flex gap-3 text-[15px] leading-relaxed text-graphite">
              <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-forest" />
              {item}
            </li>
          ))}
        </ul>
      )}
      {block.kind === "steps" && (
        <ol className={`${block.heading ? "mt-3" : ""} flex flex-col gap-5`}>
          {block.items.map((item, i) => (
            <li key={item.title} className="grid grid-cols-[32px_1fr] gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-sage text-[12px] font-medium text-forest">
                {i + 1}
              </span>
              <div>
                <p className="text-[15px] font-medium text-charcoal">{item.title}</p>
                <p className="mt-1 text-[15px] leading-relaxed text-graphite">{item.body}</p>
              </div>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}

export default function ServiceList({ services }: { services: Service[] }) {
  const [openSlug, setOpenSlug] = useState<string | null>(null);

  // /services#<slug> links land on that service, already open.
  useEffect(() => {
    function applyHash() {
      const hash = window.location.hash.slice(1);
      if (services.some((s) => s.slug === hash)) {
        setOpenSlug(hash);
        // Wait for the router's own scroll handling to settle first.
        setTimeout(() => {
          const el = document.getElementById(hash);
          if (!el) return;
          if (window.__lenis) window.__lenis.scrollTo(el, { offset: -120 });
          else el.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 250);
      }
    }
    applyHash();
    window.addEventListener("hashchange", applyHash);
    return () => window.removeEventListener("hashchange", applyHash);
  }, [services]);

  function toggle(slug: string) {
    const next = openSlug === slug ? null : slug;
    setOpenSlug(next);
    window.history.replaceState(null, "", next ? `#${next}` : window.location.pathname);
  }

  return (
    <ul className="border-t border-charcoal/15">
      {services.map((service) => {
        const isOpen = openSlug === service.slug;
        return (
          <li key={service.slug} id={service.slug} className="scroll-mt-24 border-b border-charcoal/15">
            <button
              type="button"
              onClick={() => toggle(service.slug)}
              aria-expanded={isOpen}
              className="group flex w-full items-center gap-5 py-5 text-left sm:gap-8"
            >
              <span className="w-6 shrink-0 text-[13px] tabular-nums text-pewter">{service.number}</span>
              <span className="flex-1">
                <span className="font-display block text-[22px] leading-[1.2] text-charcoal group-hover:text-forest sm:text-[26px]">
                  {service.title}
                </span>
                <span className="mt-1 block text-[15px] text-pewter">{service.short}</span>
              </span>
              <span
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-colors ${
                  isOpen ? "border-forest bg-forest text-white" : "border-graphite/40 text-charcoal"
                }`}
                aria-hidden
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M1 6h10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                  {!isOpen && <path d="M6 1v10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />}
                </svg>
              </span>
            </button>
            <div
              className="grid transition-[grid-template-rows] duration-300 ease-out"
              style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
            >
              <div className="min-h-0 overflow-hidden">
                <div className="grid grid-cols-1 gap-10 pb-12 pt-2 sm:pl-14 lg:grid-cols-[1fr_240px] lg:gap-16">
                  <div className="flex max-w-[64ch] flex-col gap-7">
                    {service.detail.map((block, i) => (
                      <Detail key={i} block={block} />
                    ))}
                  </div>
                  <div className="relative hidden aspect-square overflow-hidden rounded-card bg-sage lg:block">
                    <Image src={service.image} alt="" fill sizes="240px" className="object-cover" />
                  </div>
                </div>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
