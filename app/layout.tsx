import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import type React from "react";
import { NAME, ROLE, SITE_URL } from "./data";
import "./globals.css";

const sans = Geist({ subsets: ["latin"], variable: "--font-sans" });
const mono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono" });

const description =
  "Full-stack developer (Next.js, Node, Java/Spring) and lawyer based in Buenos Aires. I ship end-to-end products and review AI-generated code with a lawyer's rigor.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: `${NAME} — ${ROLE}`,
  description,
  authors: [{ name: NAME }],
  openGraph: {
    title: `${NAME} — ${ROLE}`,
    description,
    url: SITE_URL,
    siteName: NAME,
    type: "website",
    locale: "en_US",
  },
  twitter: { card: "summary_large_image", title: NAME, description },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#09090b" },
    { media: "(prefers-color-scheme: light)", color: "#f8f8f6" },
  ],
};

// Runs before paint so the saved theme applies without a flash. Dark is the default.
const themeScript = `try{if(localStorage.getItem('theme')!=='light')document.documentElement.classList.add('dark')}catch(e){document.documentElement.classList.add('dark')}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${sans.variable} ${mono.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
