import type { Metadata } from "next";
import { EB_Garamond, Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const display = EB_Garamond({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://asbjornrorvik.com"),
  title: "Asbjørn Rørvik — Fullstack Developer",
  description:
    "Fullstack developer based in Norway. I build products end-to-end — frontend, backend, mobile, infra.",
  openGraph: {
    title: "Asbjørn Rørvik — Fullstack Developer",
    description:
      "Fullstack developer based in Norway. I build products end-to-end — frontend, backend, mobile, infra.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${display.variable} ${sans.variable}`}>
      <body>
        <ThemeProvider attribute="data-theme" defaultTheme="light" enableSystem={false}>
          <div className="grain" aria-hidden />
          {children}
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
