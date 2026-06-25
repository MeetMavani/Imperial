import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Aarambh Imperial — Premium Residences in Mulund West, Mumbai",
  description:
    "Discover Aarambh Imperial — premium 2 BHK and 3 BHK residences in Mulund West, Mumbai. 18,000 sq ft of amenities, strategic connectivity, and world-class construction.",
  keywords:
    "Aarambh Imperial, Mulund West flats, 2BHK 3BHK Mumbai, premium residences Mulund, Aarambh builder Mumbai",
  openGraph: {
    title: "Aarambh Imperial — Premium Residences in Mulund West, Mumbai",
    description:
      "Premium 2 BHK and 3 BHK residences in Mulund West, Mumbai by Aarambh Group.",
    url: "https://arambhimperial.com",
    siteName: "Aarambh Imperial",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <body style={{ fontFamily: "var(--font-inter), system-ui, sans-serif" }}>
        {children}
      </body>
    </html>
  );
}