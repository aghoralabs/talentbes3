import Image from "next/image";

/**
 * Arva's hero: a rounded media card inset 10px from the viewport, pinned
 * (sticky) so the next section slides up over it. The header floats on top.
 */
export default function InsetHero({
  video,
  videoMobile,
  poster,
  image,
  imageAlt = "",
  tall = true,
  children,
}: {
  video?: string;
  videoMobile?: string;
  poster?: string;
  image?: string;
  imageAlt?: string;
  tall?: boolean;
  children: React.ReactNode;
}) {
  return (
    <section className={`sticky top-0 z-0 px-[10px] pb-[10px] pt-[40px] ${tall ? "h-[100svh]" : "h-[88svh] min-h-[600px]"}`}>
      <div className="relative isolate h-full overflow-hidden rounded-card bg-forest-deep text-white">
        <div className="absolute inset-0 -z-10" aria-hidden={!image}>
          {video ? (
            <video
              className="h-full w-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              poster={poster}
            >
              {videoMobile && <source src={videoMobile} type="video/mp4" media="(max-width: 767px)" />}
              <source src={video} type="video/mp4" />
            </video>
          ) : image ? (
            <Image src={image} alt={imageAlt} fill priority sizes="100vw" className="object-cover" />
          ) : null}
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,40,32,0.5)_0%,rgba(5,40,32,0.18)_35%,rgba(5,40,32,0.3)_70%,rgba(5,40,32,0.55)_100%)]" />
        </div>
        {children}
      </div>
    </section>
  );
}

/** Everything after an InsetHero goes in here, so it scrolls over the hero. */
export function OverHero({ children, className = "bg-white" }: { children: React.ReactNode; className?: string }) {
  return <div className={`relative z-10 ${className}`}>{children}</div>;
}

export function ScrollCue({ href }: { href: string }) {
  return (
    <a
      href={href}
      className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 items-center gap-2 text-[13px] text-white/90 hover:text-white sm:flex"
    >
      Scroll to Explore
      <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden className="animate-bounce">
        <path d="M7 2v10M7 12l-4-4M7 12l4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </a>
  );
}
