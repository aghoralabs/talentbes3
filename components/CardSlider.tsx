"use client";

import Image from "next/image";
import { useRef } from "react";

export type SlideCard = { title: string; body: string; image: string; imageAlt: string; tone: string };

/** Arva's "Valued partners" carousel: pastel cards, photo inset on the right. */
export default function CardSlider({ cards }: { cards: SlideCard[] }) {
  const track = useRef<HTMLDivElement>(null);

  function go(dir: 1 | -1) {
    const el = track.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    el.scrollBy({ left: dir * ((card?.offsetWidth ?? 600) + 20), behavior: "smooth" });
  }

  return (
    <div>
      <div
        ref={track}
        data-lenis-prevent-horizontal
        className="flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-2 [scrollbar-width:none] sm:px-[max(2.5rem,calc((100vw-1240px)/2))] [&::-webkit-scrollbar]:hidden"
      >
        <div data-fx="stagger" className="flex gap-5">
          {cards.map((card) => (
            <article
              key={card.title}
              data-card
              className={`grid w-[min(86vw,600px)] shrink-0 snap-center grid-cols-1 overflow-hidden rounded-card p-2.5 sm:grid-cols-[1fr_42%] ${card.tone}`}
            >
              <div className="flex flex-col justify-between gap-8 p-6 sm:p-7">
                <h3 className="font-display text-[26px] leading-[1.15] sm:text-[29px]">{card.title}</h3>
                <p className="text-[14px] leading-relaxed text-graphite">{card.body}</p>
              </div>
              <div className="relative aspect-[4/5] overflow-hidden rounded-[12px] sm:aspect-auto sm:min-h-[300px]">
                <Image src={card.image} alt={card.imageAlt} fill sizes="(min-width: 640px) 340px, 86vw" className="object-cover" />
              </div>
            </article>
          ))}
        </div>
      </div>
      <div className="mt-8 flex justify-center gap-3">
        {([-1, 1] as const).map((dir) => (
          <button
            key={dir}
            onClick={() => go(dir)}
            aria-label={dir === -1 ? "Previous" : "Next"}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-forest text-white transition-colors hover:bg-forest-deep"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className={dir === -1 ? "rotate-180" : ""}>
              <path d="M3 7H11M11 7L7.5 3.5M11 7L7.5 10.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        ))}
      </div>
    </div>
  );
}
