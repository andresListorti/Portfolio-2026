import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import type React from "react";
import { NAME, SITE_URL, content, type Locale } from "./data";
import "./globals.css";

const sans = Geist({ subsets: ["latin"], variable: "--font-sans" });
const mono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono" });

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
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#09090b" },
    { media: "(prefers-color-scheme: light)", color: "#f8f8f6" },
  ],
};

// Runs before paint so the saved theme applies without a flash. Dark is the default.
const themeScript = `try{if(localStorage.getItem('theme')!=='light')document.documentElement.classList.add('dark')}catch(e){document.documentElement.classList.add('dark')}`;

export function RootShell({ locale, children }: { locale: Locale; children: React.ReactNode }) {
  return (
    <html lang={locale} suppressHydrationWarning className={`${sans.variable} ${mono.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
