import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

// Space Grotesk is similar to Clash Display (geometric, bold, modern)
const spaceGrotesk = Space_Grotesk({
  variable: "--font-clash",
  subsets: ["latin"],
  weight: ["600", "700"],
});


export const metadata: Metadata = {
  title: {
    default: "StudyFlow - The SNBT Toolkit",
    template: "%s | StudyFlow",
  },
  description: "Platform belajar SNBT #1 untuk pejuang PTN. Sistem tracking otomatis, analitik progres, dan bank soal terstruktur dalam satu dashboard.",
  keywords: ["SNBT 2026", "UTBK", "Study Tracker", "Bank Soal SNBT", "Latihan Soal UTBK", "Masuk PTN", "StudyFlow"],
  authors: [{ name: "Antigravity Team" }],
  openGraph: {
    title: "StudyFlow - The SNBT Toolkit",
    description: "Platform belajar SNBT #1 untuk pejuang PTN. Gabung sekarang.",
    url: "https://studyflow.app",
    siteName: "StudyFlow",
    locale: 'id_ID',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "StudyFlow - The SNBT Toolkit",
    description: "Stop belajar tanpa arah. Pakai StudyFlow.",
    creator: "@studyflow",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap" rel="stylesheet" />
      </head>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          inter.variable,
          jetbrainsMono.variable,
          spaceGrotesk.variable
        )}
      >
        {children}
      </body>
    </html>
  );
}
