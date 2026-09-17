import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
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
  title: 'KOLOSSAL | Architectural Heavyweight Streetwear',
  description: 'Limited edition 500 GSM organic cotton garments engineered in Industrial Area, Chandigarh, India. Brutalist silhouettes, oversized cuts, zero compromise on material integrity.',
  keywords: ['Kolossal', 'Heavyweight Streetwear', '500 GSM Hoodie', 'Luxury Streetwear', 'Architectural Apparel'],
  openGraph: {
    title: 'KOLOSSAL | Architectural Heavyweight Streetwear',
    description: 'Limited edition 500 GSM organic cotton garments engineered in Industrial Area, Chandigarh, India.',
    type: 'website',
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
      <body className="min-h-screen flex flex-col bg-[#FAF9F7] text-[#111111] selection:bg-[#580D1A] selection:text-white">
        <CartProvider>
          <AppShell>{children}</AppShell>
        </CartProvider>
      </body>
    </html>
  );
}
