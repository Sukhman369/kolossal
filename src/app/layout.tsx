import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import { CartProvider } from '../context/CartContext';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.thekolossal.com'),
  title: {
    default: 'KOLOSSAL | Architectural Heavyweight Streetwear',
    template: '%s | KOLOSSAL',
  },
  description: 'Limited edition 500 GSM organic cotton garments engineered in Industrial Area, Chandigarh, India. Brutalist silhouettes, oversized cuts, zero compromise on material integrity.',
  keywords: ['Kolossal', 'Heavyweight Streetwear', '500 GSM Hoodie', 'Luxury Streetwear India', 'Architectural Apparel', 'Chandigarh Streetwear', 'Organic Cotton Hoodie'],
  authors: [{ name: 'KOLOSSAL', url: 'https://www.thekolossal.com' }],
  creator: 'KOLOSSAL',
  publisher: 'KOLOSSAL',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'KOLOSSAL | Architectural Heavyweight Streetwear',
    description: 'Limited edition 500 GSM organic cotton garments engineered in Industrial Area, Chandigarh, India.',
    url: 'https://www.thekolossal.com',
    siteName: 'KOLOSSAL',
    type: 'website',
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'KOLOSSAL | Architectural Heavyweight Streetwear',
    description: 'Limited edition 500 GSM organic cotton garments engineered in Chandigarh, India.',
    site: '@kolossal',
    creator: '@kolossal',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },
};

import AppShell from '../components/layout/AppShell';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-293KFEF59C"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-293KFEF59C', {
              page_path: window.location.pathname,
            });
          `}
        </Script>
      </head>
      <body className="min-h-screen flex flex-col bg-[#FAF9F7] text-[#111111] selection:bg-[#580D1A] selection:text-white">
        <CartProvider>
          <AppShell>{children}</AppShell>
        </CartProvider>
      </body>
    </html>
  );
}
