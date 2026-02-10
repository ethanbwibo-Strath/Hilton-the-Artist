import type { Metadata } from "next";
import { Playfair_Display, Manrope, Cormorant_Garamond } from "next/font/google";
import { Toaster } from "sonner";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Hilton the Artist | Artist",
  description: "Discover the captivating artwork of Hilton. Original drawings, commissions, and fine art prints.",
  keywords: [
    "artist",
    "portrait commissions",
    "custom artwork",
    "Kenyan artist"
  ],
  authors: [{ name: "Hilton" }],

  openGraph: {
  title: "Hilton the Artist | Artist",
  description:
    "Explore original artwork and commission custom illustrations.",
  url: "https://hiltonstudio.vercel.app",
  siteName: "Hilton the Artist",
  images: [
    {
      url: "/og-image.png",
      width: 1200,
      height: 630,
      alt: "Hilton the Artist - Original Artwork and Commissions",
    },
  ],
  type: "website",
},
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning
        className={`${playfair.variable} ${manrope.variable} ${cormorant.variable} antialiased`}
      >
        {children}
        <Toaster position="bottom-right" richColors />
        <Analytics />
      </body>
    </html>
  );
}
