import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, JetBrains_Mono } from "next/font/google";
import type React from "react";
import { NAME, SITE_URL, content, type Locale } from "./data";
import "./globals.css";

const sans = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-sans" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export function buildMetadata(locale: Locale): Metadata {
  const { title, description, ogLocale } = content[locale].meta;
  const path = locale === "en" ? "/" : "/es";
  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    authors: [{ name: NAME }],
    alternates: { canonical: path, languages: { en: "/", es: "/es", "x-default": "/" } },
    openGraph: {
      title,
      description,
      url: path,
      siteName: NAME,
      type: "website",
      locale: ogLocale,
      images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
    },
    twitter: { card: "summary_large_image", title: NAME, description, images: ["/opengraph-image"] },
  };
}

export const viewport: Viewport = {
  themeColor: "#070A12",
  colorScheme: "dark",
};

export function RootShell({ locale, children }: { locale: Locale; children: React.ReactNode }) {
  return (
    <html lang={locale} className={`${sans.variable} ${mono.variable}`}>
      <body className="grain">{children}</body>
    </html>
  );
}
