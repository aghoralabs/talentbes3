import InsetHero, { ScrollCue } from "./InsetHero";

/** Inner-page hero: Arva's inset photo card, headline bottom-left. */
export default function PageHero({
  eyebrow,
  title,
  image,
  imageAlt,
  children,
}: {
  eyebrow: string;
  title: React.ReactNode;
  image: string;
  imageAlt: string;
  children?: React.ReactNode;
}) {
  return (
    <InsetHero image={image} imageAlt={imageAlt} tall={false}>
      <div className="flex h-full flex-col justify-end px-6 pb-14 pt-32 sm:px-12 sm:pb-16">
        <p data-fx="small" className="eyebrow !font-semibold text-white [text-shadow:0_1px_8px_rgba(0,0,0,0.4)]">
          {eyebrow}
        </p>
        <h1 data-fx="lines" className="font-display hero-type mt-5 max-w-[18ch] text-[42px] leading-[1.06] sm:text-[60px]">
          {title}
        </h1>
        {children && (
          <div data-fx="up" data-delay="0.3" className="mt-8 max-w-[52ch] text-[17px] font-medium leading-relaxed text-white [text-shadow:0_1px_10px_rgba(0,0,0,0.45)]">
            {children}
          </div>
        )}
      </div>
      <ScrollCue href="#content" />
    </InsetHero>
  );
}
