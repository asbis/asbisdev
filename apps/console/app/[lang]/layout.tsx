import type { Metadata, Viewport } from "next";
import { Archivo, IBM_Plex_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { SITE, hasLang, LANGS, META } from "@/lib/content";
import "../globals.css";

const sans = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  axes: ["wdth"],
  display: "swap",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plex-mono",
  display: "swap",
});

export const viewport: Viewport = { themeColor: "#0b0b09" };

export function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  const l = hasLang(lang) ? lang : "no";
  return {
    metadataBase: new URL(SITE.url),
    title: META.title[l],
    description: META.description[l],
    alternates: { canonical: `/${l}`, languages: { nb: "/no", en: "/en" } },
    openGraph: {
      title: META.title[l],
      description: META.description[l],
      type: "website",
      locale: l === "no" ? "nb_NO" : "en_US",
      siteName: SITE.name,
    },
  };
}

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang: raw } = await params;
  const lang = hasLang(raw) ? raw : "no";
  return (
    <html lang={lang === "no" ? "nb" : "en"} className={`${sans.variable} ${mono.variable}`}>
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
