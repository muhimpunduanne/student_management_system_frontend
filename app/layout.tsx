// app/layout.tsx or app/layout.ts
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Geist_Mono } from "next/font/google";
import "./globals.css";
import { CookieModal } from "@/components/Cookie";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/app/context/AuthContext";

// Fonts
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


export const metadata: Metadata = {
  title: "SMS - Student Management System",
  description:
    "SMS is a Student Management System that enables students and teachers to manage academic progress efficiently worldwide.",
  metadataBase: new URL("https://sms-sable-one.vercel.app"), 
  icons: {
    icon: "/favicon.ico", 
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png", 
  },
  manifest: "/site.webmanifest", 
  openGraph: {
    title: "SMS - Student Management System",
    description:
      "Manage student academic progress with ease. SMS helps students and teachers collaborate effectively, globally.",
    url: "https://sms-sable-one.vercel.app",
    siteName: "SMS",
    images: [
      {
        url: "https://i.postimg.cc/Y0H5JrHX/Chat-GPT-Image-Jul-27-2025-10-47-30-PM.png",
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
    images: [
      "https://i.postimg.cc/Y0H5JrHX/Chat-GPT-Image-Jul-27-2025-10-47-30-PM.png",
    ],
    site: "@yourtwitterhandle",
  },
};


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
        <AuthProvider>
        {children}
        <Toaster position="bottom-center" />
        <CookieModal />
        </AuthProvider>
      </body>
    </html>
  );
}
