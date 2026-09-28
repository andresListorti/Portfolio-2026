import { ThemeProvider } from "@/components/theme-provider";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import type React from "react"; // Import React

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://portfolio25-seven-nu.vercel.app"),
  title: "Andrés Antonio Listorti — Full-Stack Developer · AI-Native Engineer · Lawyer",
  description:
    "Full-stack developer (Next.js, React, Node/Express, Java/Spring) working AI-first with Claude Code, Copilot and Codex. Former business lawyer: rigorous code review and clear technical writing in English and Spanish.",
  generator: "Andrés Antonio Listorti",
  openGraph: {
    title: "Andrés Antonio Listorti — Full-Stack Developer · AI-Native Engineer",
    description:
      "Production e-commerce, AI agent SaaS and business tools. AI-native workflow, careful review of AI-generated code, EN C1 / ES native.",
    url: "https://portfolio25-seven-nu.vercel.app",
    siteName: "AndresListorti.dev",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          inter.className
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
