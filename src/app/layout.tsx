import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#080B14",
};

export const metadata: Metadata = {
  title: "MissAlpha AI Lab | Learn AI. Build Skills. Create the Future.",
  description:
    "Master ChatGPT, Google Gemini, Prompt Engineering, Midjourney, AI Video & Automation with MissAlpha AI Lab. Pay ₹99 once for lifetime premium learning access.",
  keywords: [
    "AI Education",
    "MissAlpha AI Lab",
    "Prompt Engineering",
    "ChatGPT Masterclass",
    "Google Gemini",
    "AI Image Generation",
    "AI Automation",
    "Lifetime Access AI Course",
    "Learn AI India",
  ],
  authors: [{ name: "MissAlpha AI Lab" }],
  openGraph: {
    title: "MissAlpha AI Lab - Master Generative AI for ₹99 Lifetime",
    description: "Learn AI. Build Skills. Create the Future. One-time ₹99 payment for lifetime premium access.",
    url: "https://missalpha.ai",
    siteName: "MissAlpha AI Lab",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Space+Grotesk:wght@500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-background text-foreground min-h-screen antialiased flex flex-col selection:bg-brand-600 selection:text-white">
        {children}
        {/* Razorpay Standard Checkout SDK */}
        <Script
          id="razorpay-checkout"
          src="https://checkout.razorpay.com/v1/checkout.js"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}
