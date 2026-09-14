'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShoppingBag, Search, Menu, X, Globe } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export default function Navbar() {
  const { cart, openCart } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const provider = (process.env.NEXT_PUBLIC_COMMERCE_PROVIDER || 'MOCK').toUpperCase();

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-[#0c0c0c] border-b border-white/[0.06] text-white py-2 px-4 text-center">
        <p className="text-[10px] md:text-[11px] font-mono tracking-[0.25em] uppercase text-neutral-400">
          COMPLIMENTARY WORLDWIDE EXPRESS OVER $250 &bull; DROP 001 AVAILABLE WORLDWIDE
        </p>
      </div>

      {/* Main Navigation Header */}
      <header
        className={`fixed top-8 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#080808]/85 backdrop-blur-xl border-b border-white/[0.08] py-4'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between">
          {/* Mobile Menu Trigger */}
          <div className="flex items-center space-x-4 lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white p-1 hover:text-neutral-300"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

          {/* Desktop Left Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link
              href="/collections"
              className="text-xs uppercase tracking-[0.2em] text-neutral-300 hover:text-white transition-colors"
            >
              Collections
            </Link>
            <Link
              href="/collections/outerwear"
              className="text-xs uppercase tracking-[0.2em] text-neutral-400 hover:text-white transition-colors"
            >
              Outerwear
            </Link>
            <Link
              href="/collections/hoodies"
              className="text-xs uppercase tracking-[0.2em] text-neutral-400 hover:text-white transition-colors"
            >
              Hoodies
            </Link>
            <Link
              href="/lookbook"
              className="text-xs uppercase tracking-[0.2em] text-neutral-400 hover:text-white transition-colors"
            >
              Lookbook
            </Link>
            <Link
              href="/about"
              className="text-xs uppercase tracking-[0.2em] text-neutral-400 hover:text-white transition-colors"
            >
              About
            </Link>
          </nav>

          {/* Center Brand Monogram / Logo */}
          <div className="flex items-center justify-center">
            <Link href="/" className="group flex flex-col items-center">
              <span className="text-xl md:text-2xl font-black uppercase tracking-[0.35em] text-white transition-all duration-300 group-hover:tracking-[0.42em]">
                KOLOSSAL
              </span>
              <span className="text-[8px] font-mono tracking-[0.3em] text-neutral-500 uppercase">
                HEAVYWEIGHT APPAREL
              </span>
            </Link>
          </div>

          {/* Right Action Icons & Backend Badge */}
          <div className="flex items-center space-x-5">
            {/* Commerce Provider Badge */}
            <div className="hidden sm:flex items-center space-x-1.5 px-2.5 py-1 rounded-full border border-white/10 bg-white/[0.02] text-[9px] font-mono uppercase tracking-wider text-neutral-400">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              <span>{provider}</span>
            </div>

            {/* Currency selector dummy */}
            <button className="hidden md:flex items-center space-x-1 text-xs font-mono uppercase tracking-wider text-neutral-400 hover:text-white transition-colors">
              <Globe className="w-3.5 h-3.5" />
              <span>USD</span>
            </button>

            {/* Cart Trigger */}
            <button
              onClick={openCart}
              className="relative p-2 text-neutral-300 hover:text-white transition-colors"
              aria-label="Open cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {cart.itemCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-white text-black text-[9px] font-bold font-mono flex items-center justify-center">
                  {cart.itemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 bg-[#080808]/98 backdrop-blur-2xl flex flex-col justify-center px-8 space-y-6 lg:hidden pt-20">
          <nav className="flex flex-col space-y-5 text-lg uppercase tracking-[0.25em] font-semibold text-white">
            <Link
              href="/collections"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-neutral-400"
            >
              Collections
            </Link>
            <Link
              href="/collections/outerwear"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-neutral-400"
            >
              Outerwear
            </Link>
            <Link
              href="/collections/hoodies"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-neutral-400"
            >
              Heavyweights
            </Link>
            <Link
              href="/lookbook"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-neutral-400"
            >
              Lookbook
            </Link>
            <Link
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-neutral-400"
            >
              About Brand
            </Link>
            <Link
              href="/size-guide"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-neutral-400 text-sm font-normal text-neutral-400"
            >
              Size Matrix
            </Link>
            <Link
              href="/track-order"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-neutral-400 text-sm font-normal text-neutral-400"
            >
              Track Order
            </Link>
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-neutral-400 text-sm font-normal text-neutral-400"
            >
              Concierge
            </Link>
          </nav>

          <div className="pt-6 border-t border-white/10 flex items-center justify-between text-xs font-mono text-neutral-400">
            <span>BACKEND: {provider}</span>
            <span>CURRENCY: USD</span>
          </div>
        </div>
      )}
    </>
  );
}
