import type { Metadata } from "next";
import { Montserrat, Playfair_Display } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CookieConsent from "@/components/CookieConsent";

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-serif",
  style: ["italic", "normal"],
  weight: ["400", "700"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Garden Brows Studio | Por Carol Garden",
    template: "%s | Garden Brows Studio",
  },
  alternates: {
    canonical: siteUrl,
  },
  description:
    "Explore o Journal da Garden Brows. Tendências de Lash Lifting, Design de Sobrancelhas, Micropigmentação e rituais de beleza natural por Carolina Costa..",
  keywords: [
    "Design de Sobrancelhas",
    "Lash Lifting",
    "Lash Lifting São José dos Campos",
    "LASH LIFTING E SOBRANCELHAS SJC",
    "Carolina Costa",
    "Carol Garden",
    "Micropigmentação Labial",
    "Beleza Natural",
  ],
  authors: [{ name: "Carolina Costa" }],
  creator: "Gabriel Costa",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: siteUrl,
    siteName: "Garden Brows Studio",
    title: "Garden Brows Studio | Carol Garden",
    description:
      "Realçando a sua beleza natural com propósito e fé. Explore o Journal da Garden Brows. Tendências de Lash Lifting, Design de Sobrancelhas, Micropigmentação e rituais de beleza natural por Carolina Costa.",
    images: [
      {
        url: `${siteUrl}/og-logo.png`,
        width: 1200,
        height: 630,
        alt: "Garden Brows Studio Logotipo",
      },
      {
        url: `${siteUrl}/logo-192x192.png`,
        width: 192,
        height: 192,
        alt: "Garden Brows Studio Logotipo",
      },
      {
        url: `${siteUrl}/logo-512x512.png`,
        width: 512,
        height: 512,
        alt: "Garden Brows Studio Logotipo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Studio Garden Brows",
    description:
      "Realçando a sua beleza natural com propósito e fé. Explore o Journal da Garden Brows. Tendências de Lash Lifting, Design de Sobrancelhas, Micropigmentação e rituais de beleza natural por Carolina Costa.",
    images: [`${siteUrl}/og-logo.png`],
    creator: "@acarolgarden",
    site: "@acarolgarden",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/logo-192x192.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={cn(playfair.variable, montserrat.variable)}
      suppressHydrationWarning
    >
      <body
        className="min-h-full flex flex-col font-sans bg-garden-dark text-garden-text antialiased"
        cz-shortcut-listen="true"
      >
        <Header />
        <main className="grow">{children}</main>
        <Footer />
        <CookieConsent />
      </body>
    </html>
  );
}
