import Image from "next/image";
import Link from "next/link";
import { company, services } from "@/lib/content";

const columns = [
  {
    heading: "Company",
    links: [
      { href: "/about", label: "About Us" },
      { href: "/blog", label: "Blog" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    heading: "Services",
    links: services.slice(0, 4).map((s) => ({ href: `/services#${s.slug}`, label: s.title })),
  },
  {
    heading: "For Talent",
    links: [
      { href: "/jobs", label: "Browse Jobs" },
      { href: "/services#executive-search", label: "Executive Search" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="relative z-10 bg-forest text-white">
      <div className="mx-auto max-w-[1400px] px-6 pb-10 pt-28 sm:px-10">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-[1.3fr_2fr_auto]">
          <p className="font-display max-w-[13ch] text-[38px] leading-[1.1] sm:text-[45px]">
            Your new workstation is a busy desk that keeps you rising and shining, every moment.
          </p>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-4">
            {columns.map((col) => (
              <div key={col.heading}>
                <p className="text-[13px] uppercase tracking-[0.04em]">{col.heading}</p>
                <ul className="mt-5 flex flex-col gap-3">
                  {col.links.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="text-[14px] text-white/75 transition-colors hover:text-lime">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div>
              <p className="text-[13px] uppercase tracking-[0.04em]">Contact us</p>
              <ul className="mt-5 flex flex-col gap-3 text-[14px] text-white/75">
                <li>{company.address}</li>
                <li>
                  <a href={`mailto:${company.email}`} className="underline underline-offset-4 hover:text-lime">
                    Send us a message
                  </a>
                </li>
                <li>
                  <a href={company.founderLinkedIn} target="_blank" rel="noopener noreferrer" className="hover:text-lime">
                    LinkedIn
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <Image
            src="/images/brand/logo-mark-white.png"
            alt="Talentbes"
            width={462}
            height={361}
            className="hidden h-auto w-[92px] lg:block"
          />
        </div>

        <div className="mt-24 flex flex-col gap-4 border-t border-white/20 pt-8 text-[12px] uppercase tracking-[0.03em] text-white/70 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {company.name}. All rights reserved.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
            <a href={`mailto:${company.email}`} className="normal-case hover:text-white">
              {company.email}
            </a>
            <p>
              Designed &amp; Developed by{" "}
              <a href="https://www.aghoralabs.com" target="_blank" rel="noopener" className="text-lime hover:underline">
                aghoralabs
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
