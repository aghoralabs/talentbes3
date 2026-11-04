import Link from "next/link";

type Variant = "forest" | "sky" | "white" | "ghost" | "ghostLight";

const styles: Record<Variant, string> = {
  forest: "bg-forest text-white hover:bg-forest-deep",
  sky: "bg-sky text-charcoal hover:bg-white",
  white: "bg-white text-charcoal hover:bg-lime",
  ghost: "border border-charcoal/70 text-charcoal hover:bg-charcoal hover:text-white",
  ghostLight: "border border-white/80 text-white hover:bg-white hover:text-charcoal",
};

/** Pill button. `arrow` adds Arva's round arrow chip at the end. */
export function Button({
  href,
  variant = "forest",
  arrow = false,
  className = "",
  children,
}: {
  href: string;
  variant?: Variant;
  arrow?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  const cls = `group inline-flex items-center justify-center gap-3 rounded-pill text-[13px] font-semibold uppercase tracking-[0.03em] transition-colors duration-300 ${
    arrow ? "py-[7px] pl-7 pr-[7px]" : "px-7 py-[14px]"
  } ${styles[variant]} ${className}`;
  const inner = (
    <>
      {children}
      {arrow && (
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-charcoal transition-transform duration-300 group-hover:translate-x-0.5">
          <Arrow />
        </span>
      )}
    </>
  );
  if (href.startsWith("mailto:") || href.startsWith("http")) {
    return (
      <a href={href} className={cls}>
        {inner}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  );
}

export function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden className={className}>
      <path d="M3 7H11M11 7L7.5 3.5M11 7L7.5 10.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Small rounded label, like Arva's "IMPACT SINCE 2023". */
export function Pill({ children, tone = "lime" }: { children: React.ReactNode; tone?: "lime" | "ash" | "white" }) {
  const bg = tone === "lime" ? "bg-lime" : tone === "ash" ? "bg-ash" : "bg-white";
  return (
    <span className={`inline-flex rounded-pill px-4 py-1.5 text-[12px] uppercase tracking-[0.02em] text-charcoal ${bg}`}>
      {children}
    </span>
  );
}
