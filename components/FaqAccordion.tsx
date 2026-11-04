"use client";

import { useState } from "react";

export default function FaqAccordion({ items }: { items: { question: string; answer: string }[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="border-t border-charcoal/15">
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={item.question} className="border-b border-charcoal/15">
            <button
              className="flex w-full items-center justify-between gap-4 py-5 text-left"
              onClick={() => setOpenIndex(isOpen ? null : i)}
              aria-expanded={isOpen}
            >
              <span className="text-[16px] font-medium text-charcoal">{item.question}</span>
              <svg
                width="14"
                height="14"
                viewBox="0 0 16 16"
                fill="none"
                className={`shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
              >
                <path d="M3 6L8 11L13 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <div
              className="grid transition-[grid-template-rows] duration-300 ease-out"
              style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
            >
              <div className="min-h-0 overflow-hidden">
                <p className="max-w-[60ch] pb-6 text-[16px] leading-relaxed text-graphite">{item.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
