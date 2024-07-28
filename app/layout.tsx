import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Preview - Product review",
  description: "A review of a product",
  openGraph: {
    title: "Preview - Product review",
    description: "A review of a product",
    url: "https://preview-bay.vercel.app/",
    siteName: "My Website",
    images: [
      {
        url: "https://preview-bay.vercel.app/",
        width: 800,
        height: 600,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Preview - Product review",
    description:
      "Get a list of product reviews on YouTube just by searching. Search it on Amazon, Walmart, and eBay in just 1 click.",
    site: "@yourwebsite",
    images: [
      {
        url: "https://preview-bay.vercel.app/product-image.jpg",
        alt: "A product image",
        width: 1200,
        height: 630,
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
    <html lang="en">
      <Script
        src="https://cdn.amplitude.com/libs/analytics-browser-2.7.4-min.js.gz"
        strategy="lazyOnload"
      />
      <Script
        src="https://cdn.amplitude.com/libs/plugin-session-replay-browser-1.6.8-min.js.gz"
        strategy="lazyOnload"
      />
      <Script
        src="https://cdn.amplitude.com/libs/plugin-autocapture-browser-0.9.0-min.js.gz"
        strategy="lazyOnload"
      />
      <Script
        id="preview-amplitude"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{
          __html: `
            window.amplitude.add(window.sessionReplay.plugin({sampleRate: 1})).promise.then(function() {
              window.amplitude.add(window.amplitudeAutocapturePlugin.plugin());
              window.amplitude.init('bfd14c50871b8816479467dbb3350fa9');
            });
          `,
        }}
      />
      <body className={inter.className}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
