import { Button } from "./Button";

/** The sky closing band that sits on the footer, rounded at the top. */
export default function CtaBand({
  title,
  body,
  cta = "Request a consultation",
  href = "/contact",
  above = "bg-bone",
}: {
  title: string;
  body?: string;
  cta?: string;
  href?: string;
  above?: string;
}) {
  return (
    <div className={above}>
      <section className="rounded-t-[32px] bg-sky px-6 py-24 text-center sm:py-28">
        <h2 data-fx="lines" className="font-display mx-auto max-w-[22ch] text-[34px] leading-[1.1] sm:text-[46px]">
          {title}
        </h2>
        {body && (
          <p data-fx="small" className="mx-auto mt-6 max-w-md text-[17px] text-graphite">
            {body}
          </p>
        )}
        <div data-fx="up" data-delay="0.2" className="mt-10">
          <Button href={href} arrow>
            {cta}
          </Button>
        </div>
      </section>
    </div>
  );
}
