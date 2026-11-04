import type { MetadataRoute } from "next";
import { company } from "@/lib/content";
import { DEFAULT_DESCRIPTION } from "@/lib/seo";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${company.name} HR Consultants`,
    short_name: company.name,
    description: DEFAULT_DESCRIPTION,
    start_url: "/",
    display: "standalone",
    background_color: "#f1efdf",
    theme_color: "#07503f",
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
