"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger, SplitText);

declare global {
  interface Window {
    __lenis?: Lenis;
    __fxReady?: boolean;
  }
}

const REDUCED = "(prefers-reduced-motion: reduce)";

/**
 * Scroll choreography, modelled on arva.com:
 *  data-fx="lines"    headings rise line by line, tipping forward (rotateX)
 *  data-fx="up"       a block fades up 30px
 *  data-fx="small"    a block fades up 10px (supporting copy)
 *  data-fx="stagger"  each child rises 80px, one after another
 *  data-fx="parallax" the photo/video inside drifts against the scroll
 *  data-fx="count"    a number counts up to data-to
 * Optional data-delay (seconds) on any of them.
 */
export default function ScrollFx() {
  const pathname = usePathname();

  // Smooth scrolling, once for the whole session.
  useEffect(() => {
    if (window.matchMedia(REDUCED).matches) return;
    const lenis = new Lenis({ lerp: 0.09, wheelMultiplier: 1 });
    window.__lenis = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      delete window.__lenis;
    };
  }, []);

  // Reveal animations, rebuilt for each page.
  useEffect(() => {
    const root = document.documentElement;
    if (window.matchMedia(REDUCED).matches) {
      root.classList.remove("fx");
      return;
    }
    if (!window.location.hash) window.__lenis?.scrollTo(0, { immediate: true });

    const delay = (el: HTMLElement) => Number(el.dataset.delay ?? 0);
    const trigger = (el: Element, start = "top 88%") => ({ trigger: el, start, once: true });

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('[data-fx="lines"]').forEach((el) => {
        SplitText.create(el, {
          type: "lines",
          linesClass: "fx-line",
          autoSplit: true,
          onSplit(self) {
            gsap.set(el, { visibility: "visible", perspective: 700 });
            return gsap.from(self.lines, {
              opacity: 0,
              y: 22,
              rotateX: -20,
              transformOrigin: "50% 0%",
              duration: 1.15,
              ease: "power3.out",
              stagger: 0.12,
              delay: delay(el),
              scrollTrigger: trigger(el),
            });
          },
        });
      });

      gsap.utils.toArray<HTMLElement>('[data-fx="up"], [data-fx="small"]').forEach((el) => {
        gsap.fromTo(
          el,
          { autoAlpha: 0, y: el.dataset.fx === "up" ? 30 : 12 },
          { autoAlpha: 1, y: 0, duration: 1, ease: "power2.out", delay: delay(el), scrollTrigger: trigger(el) },
        );
      });

      gsap.utils.toArray<HTMLElement>('[data-fx="stagger"]').forEach((el) => {
        gsap.fromTo(
          el.children,
          { autoAlpha: 0, y: 80 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 1.1,
            ease: "power3.out",
            stagger: 0.12,
            delay: delay(el),
            scrollTrigger: trigger(el, "top 90%"),
          },
        );
      });

      gsap.utils.toArray<HTMLElement>('[data-fx="parallax"]').forEach((el) => {
        const media = el.querySelector("img, video");
        if (!media) return;
        gsap.fromTo(
          media,
          { yPercent: -7, scale: 1.16 },
          {
            yPercent: 7,
            scale: 1.16,
            ease: "none",
            scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
          },
        );
      });


      gsap.utils.toArray<HTMLElement>('[data-fx="count"]').forEach((el) => {
        const to = Number(el.dataset.to);
        if (!Number.isFinite(to)) return;
        const state = { v: 0 };
        el.textContent = "0";
        gsap.to(state, {
          v: to,
          duration: 1.6,
          ease: "power2.out",
          scrollTrigger: trigger(el),
          onUpdate: () => {
            el.textContent = String(Math.round(state.v));
          },
        });
      });
    });

    window.__fxReady = true;
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    document.fonts?.ready.then(refresh);

    return () => {
      window.removeEventListener("load", refresh);
      ctx.revert();
    };
  }, [pathname]);

  return null;
}
