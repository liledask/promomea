
import type { Metadata, Viewport } from "next";
import { Inter } from 'next/font/google';
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: "Affiliate Ascent",
  description: "Affiliate dashboard for Affiliate Ascent",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1.0,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
          {children}
          <Toaster />
      </body>
    </html>
  );
}
