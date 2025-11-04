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
  description: "Experience the gentleman's touch in junk removal. Serving Boise, Meridian, Eagle, Nampa & beyond with respectful, eco-friendly service. AI-powered instant quotes. Same-day service available. Licensed & insured.",
  keywords: "junk removal Boise, Treasure Valley hauling, Meridian junk removal, Eagle furniture removal, eco-friendly disposal Idaho, estate cleanout Boise, construction debris removal",
  openGraph: {
    title: "Junkyard Gentlemen | Premium Junk Removal Boise",
    description: "The gentleman's touch in junk removal. Respectful, professional, eco-friendly service throughout the Treasure Valley.",
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
