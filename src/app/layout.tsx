import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
// 1. Import the Script component
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Telegraph Viewer",
  description: "Telegraph proxy",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}

        {/* 2. Place the script here, just before the closing body tag */}
        <Script id="aclib-auto-tag" strategy="afterInteractive">
          {`
            aclib.runAutoTag({
                zoneId: 'silgmbd0e0',
            });
          `}
        </Script>
      </body>
    </html>
  );
}
