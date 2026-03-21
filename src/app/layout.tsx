import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Garden Brows | Por Carolina Costa",
    template: "%s | Garden Brows",
  },
  description: "Especialista em Sobrancelhas, Lash Lift e Micropigmentação Labial. Por Carol Garden, em São Paulo.",
  keywords: ["Design de Sobrancelhas", "Lash Lift São Paulo", "Carolina Costa", "Carol Garden", "Micropigmentação Labial", "Beleza Católica"],
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
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Garden Brows Studio",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
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
      className={cn(
        "h-full",
        "antialiased",
        geistSans.variable,
        geistMono.variable,
        playfair.variable,
        inter.variable,
      )}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col" cz-shortcut-listen="true">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <Header />

          <main className="flex-grow">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
