import type { Metadata } from "next";
import { Montserrat, Playfair_Display } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

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
    default: "Garden Brows | Por Carolina Costa",
    template: "%s | Garden Brows",
  },
  alternates: {
    canonical: siteUrl,
  },
  description:
    "Especialista em Sobrancelhas, Lash Lift e Micropigmentação Labial. Por Carol Garden, em São Paulo.",
  keywords: [
    "Design de Sobrancelhas",
    "Lash Lift São Paulo",
    "Carolina Costa",
    "Carol Garden",
    "Micropigmentação Labial",
    "Beleza Católica",
  ],
  authors: [{ name: "Carolina Costa" }],
  creator: "Carolina Costa",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: siteUrl,
    siteName: "Garden Brows Studio",
    title: "Garden Brows | Carolina Costa",
    description: "Realçando a sua beleza natural com propósito e fé.",
    images: [
      {
        url: "/logo-512x512.png",
        width: 512,
        height: 512,
        alt: "Garden Brows Studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Studio Garden Brows",
    description:
      "Links oficiais do Studio Garden Brows. Acesse o e-book O Valor Que Comunica e fique por dentro das novidades de design de sobrancelhas e cílios.",
    images: [`${siteUrl}/logo-192x192.png`],
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
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <Header />

          <main className="grow">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
