import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { CartProvider } from '../context/CartContext';
import Navbar from '../components/layout/Navbar';
import CartDrawer from '../components/cart/CartDrawer';
import Footer from '../components/layout/Footer';

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
  description: 'Limited edition 500 GSM organic cotton garments engineered in Tokyo and Milan. Brutalist silhouettes, oversized cuts, zero compromise on material integrity.',
  keywords: ['Kolossal', 'Heavyweight Streetwear', '500 GSM Hoodie', 'Luxury Streetwear', 'Architectural Apparel'],
  openGraph: {
    title: 'KOLOSSAL | Architectural Heavyweight Streetwear',
    description: 'Limited edition 500 GSM organic cotton garments engineered in Tokyo and Milan.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} dark antialiased`}>
      <body className="min-h-screen flex flex-col bg-[#080808] text-[#f3f3f3] selection:bg-white selection:text-black">
        <CartProvider>
          <Navbar />
          <CartDrawer />
          <main className="flex-1">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
