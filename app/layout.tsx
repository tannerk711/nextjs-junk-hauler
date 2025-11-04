import type { Metadata } from "next";
import { Inter, Lexend } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const lexend = Lexend({
  variable: "--font-lexend",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Junkyard Gentlemen | Premium Junk Removal in Boise & Treasure Valley",
  description: "Professional, white-glove junk removal service in Boise and Treasure Valley. Stress-free, respectful service with eco-friendly disposal. AI-powered instant quotes. Same-day service available. Licensed & insured.",
  keywords: "junk removal Boise, Treasure Valley hauling, Meridian junk removal, Eagle furniture removal, eco-friendly disposal Idaho, estate cleanout Boise, construction debris removal, professional junk hauling, white-glove service",
  openGraph: {
    title: "Junkyard Gentlemen | Professional Junk Removal Boise",
    description: "Professional, stress-free junk removal with white-glove service throughout the Treasure Valley. Eco-friendly, respectful, and reliable.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          src="https://upload-widget.cloudinary.com/global/all.js"
          strategy="beforeInteractive"
        />
      </head>
      <body
        className={`${inter.variable} ${lexend.variable} antialiased font-sans`}
      >
        {children}
      </body>
    </html>
  );
}
