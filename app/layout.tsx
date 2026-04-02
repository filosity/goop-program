import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

const ag1Regular = localFont({
  src: [
    {
      path: "../public/fonts/AG1-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/AG1-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-serif",
  display: "swap",
});

const ag1Secondary = localFont({
  src: "../public/fonts/AG1-Secondary.woff2",
  variable: "--font-sans",
  display: "swap",
});

const ag1Mono = localFont({
  src: "../public/fonts/AG1-Mono.woff2",
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "goop Rewards",
  description: "goop loyalty rewards program",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${ag1Regular.variable} ${ag1Secondary.variable} ${ag1Mono.variable}`}>
      <body style={{ fontFamily: "var(--font-sans)" }}>
        {children}
      </body>
    </html>
  );
}
