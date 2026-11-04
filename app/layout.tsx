import type { Metadata, Viewport } from "next";
import { fontVariables } from "./fonts";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollFx from "@/components/ScrollFx";
import JsonLd from "@/components/JsonLd";
import { company } from "@/lib/content";
import { DEFAULT_DESCRIPTION, KEYWORDS, SITE_NAME, SITE_URL, organizationJsonLd, websiteJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME}: HR & Recruitment Consultants | ${company.logoTagline}`,
    template: `%s | ${SITE_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: KEYWORDS,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "business",
  openGraph: {
    type: "website",
    url: "/",
    siteName: SITE_NAME,
    locale: "en_IN",
    title: `${SITE_NAME}: HR & Recruitment Consultants`,
    description: DEFAULT_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME}: HR & Recruitment Consultants`,
    description: DEFAULT_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  formatDetection: { telephone: false, email: false, address: false },
};

export const viewport: Viewport = {
  themeColor: "#07503f",
};

// Hide reveal targets before first paint (motion allowed only). If the
// animation code never starts, show everything again after a moment.
const fxBoot = `(function(){try{if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;var d=document.documentElement;d.classList.add('fx');setTimeout(function(){if(!window.__fxReady)d.classList.remove('fx')},3500)}catch(e){}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={fontVariables} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: fxBoot }} />
      </head>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
        <ScrollFx />
        <JsonLd data={[organizationJsonLd(), websiteJsonLd()]} />
      </body>
    </html>
  );
}
