import Image from "next/image";

/** A rounded photo or looping clip with a slow parallax drift. */
export default function MediaCard({
  video,
  poster,
  image,
  alt = "",
  className = "",
  sizes = "(min-width: 1024px) 50vw, 100vw",
  position = "center",
}: {
  video?: string;
  poster?: string;
  image?: string;
  alt?: string;
  className?: string;
  sizes?: string;
  position?: string;
}) {
  return (
    <div data-fx="parallax" className={`relative overflow-hidden rounded-card bg-sage ${className}`}>
      {video ? (
        <video
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={poster}
          aria-label={alt}
          style={{ objectPosition: position }}
        >
          <source src={video} type="video/mp4" />
        </video>
      ) : image ? (
        <Image src={image} alt={alt} fill sizes={sizes} className="object-cover" style={{ objectPosition: position }} />
      ) : null}
    </div>
  );
}
