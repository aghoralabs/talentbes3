import { Button } from "@/components/Button";

export default function NotFound() {
  return (
    <section className="mx-auto flex max-w-[1200px] flex-col items-center px-5 pb-40 pt-[220px] text-center sm:px-8">
      <p className="eyebrow text-forest">404</p>
      <h1 className="font-display mt-5 text-[48px] leading-[1.02] sm:text-[68px]">This page has moved on.</h1>
      <p className="mt-6 max-w-md text-[17px] text-graphite">
        The page you&apos;re looking for doesn&apos;t exist. Let&apos;s get you back on track.
      </p>
      <div className="mt-10 flex flex-wrap justify-center gap-3">
        <Button href="/" arrow>Back to home</Button>
        <Button href="/jobs" variant="ghost">
          Browse open roles
        </Button>
      </div>
    </section>
  );
}
