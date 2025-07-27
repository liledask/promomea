
import type { Metadata, Viewport } from "next";
import { PT_Sans, Playfair_Display } from 'next/font/google';
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";

const ptSans = PT_Sans({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-pt-sans',
});

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  weight: ['700'],
  variable: '--font-playfair-display',
});

export const metadata: Metadata = {
  title: "ProMo MEA",
  description: "Affiliate dashboard for ProMo MEA",
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
      <body className={`${ptSans.variable} ${playfairDisplay.variable} font-body antialiased`}>
          {children}
          <Toaster />
      </body>
    </html>
  );
}
