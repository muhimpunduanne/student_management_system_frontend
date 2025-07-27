import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/Navigation";
import { CookieModal } from "@/components/Cookie";

// Load fonts with global subsets
const inter = Inter({
  subsets: ["latin", "latin-ext", "cyrillic", "greek"],
  variable: "--font-inter",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin", "latin-ext"],
  variable: "--font-geist-mono",
  display: "swap",
});

// Metadata for SEO and social sharing
export const metadata: Metadata = {
  title: "SMS - Student Management System",
  description:
    "SMS is a Student Management System that enables students and teachers to manage academic progress efficiently worldwide.",
  openGraph: {
    title: "SMS - Student Management System",
    description:
      "Manage student academic progress with ease. SMS helps students and teachers collaborate effectively, globally.",
    url: "https://your-domain.com", // ✅ Replace with your actual domain
    siteName: "SMS",
    images: [
      {
        url: "https://your-domain.com/images/social-banner.png", // ✅ Replace with actual image
        width: 1200,
        height: 630,
        alt: "SMS App - Global Education Management",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SMS - Student Management System",
    description:
      "Global student and teacher collaboration made simple. Track and manage academic progress with SMS.",
    images: ["https://your-domain.com/images/social-banner.png"],
    site: "@yourtwitterhandle", // ✅ Replace with your real handle
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  metadataBase: new URL("https://your-domain.com"),
  manifest: "/site.webmanifest", // Optional for PWA support
};

// ✅ Viewport config moved outside metadata to avoid warning
export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${geistMono.variable}`}>
      <body className="antialiased font-sans">
        <Navigation />
        {children}
        <CookieModal />
      </body>
    </html>
  );
}
