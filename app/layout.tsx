import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

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
    description: "Get a list of product reviews on YouTube just by searching. Search it on Amazon, Walmart, and eBay in just 1 click.",
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
  robots:{
    index: true,
    follow: true,
  } 
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
      <Analytics />
    </html>
  );
}
