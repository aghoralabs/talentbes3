"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const navLeft = [
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/jobs", label: "Jobs" },
];
const navRight = [{ href: "/blog", label: "Blog" }];

// Pages that open on a full-bleed hero: the header floats over it,
// transparent, until the visitor scrolls.
const HERO_ROUTES = ["/", "/about", "/services", "/contact", "/jobs", "/blog"];

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const overHero = HERO_ROUTES.includes(pathname);
  const solid = !overHero || scrolled || open;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (open) window.__lenis?.stop();
    else window.__lenis?.start();
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  const link = (href: string) =>
    `text-[14px] font-semibold transition-opacity duration-300 hover:opacity-100 ${
      pathname.startsWith(href) ? "opacity-100" : "opacity-90"
    }`;

  return (
    <div className="fixed inset-x-0 top-0 z-50">
      {/* Announcement bar */}
      <div className="flex h-[30px] items-center justify-center bg-lime px-4 text-center text-[12px] text-charcoal">
        <Link href="/services#replacement-provision" className="font-display truncate !font-normal">
          Every hire is backed by a 3-month free replacement.{" "}
          <span className="hidden underline underline-offset-2 sm:inline">How it works here.</span>
        </Link>
      </div>

      <header
        className={`text-white transition-[background-color,padding] duration-500 ease-out ${
          solid ? "bg-forest py-2.5" : "bg-transparent py-5"
        }`}
      >
        <div className="relative mx-auto flex h-[52px] max-w-[1480px] items-center justify-between px-6 sm:px-10">
          <nav className="hidden items-center gap-8 lg:flex">
            {navLeft.map((l) => (
              <Link key={l.href} href={l.href} className={link(l.href)}>
                {l.label}
              </Link>
            ))}
          </nav>

          <Link
            href="/"
            onClick={() => setOpen(false)}
            className={`flex items-center gap-2.5 transition-transform duration-500 ease-out lg:absolute lg:left-1/2 lg:top-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2 ${
              solid && scrolled ? "lg:scale-[0.85]" : ""
            }`}
          >
            <Image src="/images/brand/logo-mark-white.png" alt="" width={462} height={361} className="h-8 w-auto" priority />
            <span className="text-[19px] font-semibold tracking-[0.08em]">TALENTBES</span>
          </Link>

          <div className="flex items-center gap-8">
            <nav className="hidden items-center gap-8 lg:flex">
              {navRight.map((l) => (
                <Link key={l.href} href={l.href} className={link(l.href)}>
                  {l.label}
                </Link>
              ))}
            </nav>
            <Link
              href="/contact"
              className="hidden rounded-pill bg-white px-6 py-3 text-[13px] font-bold uppercase tracking-[0.02em] text-charcoal transition-colors hover:bg-lime sm:inline-flex"
            >
              Get in touch
            </Link>
            <button
              className="flex h-10 w-12 flex-col items-end justify-center gap-[6px] lg:hidden"
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle menu"
              aria-expanded={open}
            >
              <span className={`block h-[2px] w-9 bg-white transition-transform ${open ? "translate-y-[4px] rotate-45" : ""}`} />
              <span className={`block h-[2px] w-9 bg-white transition-transform ${open ? "-translate-y-[4px] -rotate-45" : ""}`} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 -z-10 bg-forest px-8 pb-10 pt-[130px] text-white transition-[opacity,transform] duration-500 ease-out lg:hidden ${
          open ? "translate-x-0 opacity-100" : "pointer-events-none translate-x-full opacity-0"
        }`}
      >
        <nav className="flex flex-col">
          {[...navLeft, ...navRight].map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="border-b border-white/80 py-5 text-[23px] font-medium">
              {l.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/contact"
          onClick={() => setOpen(false)}
          className="mt-14 inline-flex rounded-pill bg-white px-8 py-4 text-[15px] font-bold text-charcoal"
        >
          Get in touch
        </Link>
      </div>
    </div>
  );
}
