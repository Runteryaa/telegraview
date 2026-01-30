import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
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
  description: "telegraph proxy",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* You can add custom scripts or meta tags here if needed */}
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}

        {/* Ad Frame Container */}
        <div 
          id="frame" 
          style={{ 
            width: "100%", 
            margin: "auto", 
            position: "relative", 
            zIndex: 99998 
          }}
        >
          <iframe 
            data-aa='2425973' 
            src='//acceptable.a-ads.com/2425973/?size=Adaptive'
            style={{ 
              border: 0, 
              padding: 0, 
              width: "70%", 
              height: "auto", 
              overflow: "hidden", 
              display: "block", 
              margin: "auto" 
            }}
          />
        </div>
      </body>
    </html>
  );
}
