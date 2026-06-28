import type { Metadata } from "next";
import { Manrope, Fraunces } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Aarambh Imperial — Premium Residences in Mulund West, Mumbai",
  description:
    "Discover Aarambh Imperial — premium 2 BHK and 3 BHK residences in Mulund West, Mumbai. 18,000 sq ft of amenities, strategic connectivity, and world-class construction.",
  keywords:
    "Aarambh Imperial, Mulund West flats, 2BHK 3BHK Mumbai, premium residences Mulund, Aarambh builder Mumbai",
  icons: {
    icon: "/assets/favicon-150x150.png",
  },
  openGraph: {
    title: "Aarambh Imperial — Premium Residences in Mulund West, Mumbai",
    description:
      "Premium 2 BHK and 3 BHK residences in Mulund West, Mumbai by Aarambh Group.",
    url: "https://aarambhimperial.com",
    siteName: "Aarambh Imperial",
    images: [
      {
        url: "https://www.aarambhimperial.com/assets/logo.webp",
        width: 1200,
        height: 1200,
        alt: "Aarambh Imperial Logo",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aarambh Imperial — Premium Residences in Mulund West, Mumbai",
    description:
      "Discover Aarambh Imperial — premium 2 BHK and 3 BHK residences in Mulund West, Mumbai.",
    images: ["https://www.aarambhimperial.com/assets/logo.webp"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${manrope.variable} ${fraunces.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
