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


  return (
    <>
      {/* Top Announcement Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-[#580D1A] text-[#FAF9F7] py-2 px-3 sm:px-4 text-center shadow-sm">
        <p className="text-[9px] sm:text-[10px] md:text-[11px] font-mono tracking-[0.15em] sm:tracking-[0.25em] uppercase font-medium truncate sm:whitespace-normal">
          COMPLIMENTARY WORLDWIDE EXPRESS OVER $250 &bull; DROP 001 ARCHIVES LIVE
        </p>
      </div>

      {/* Main Navigation Header */}
      <header
        className={`fixed top-8 sm:top-9 left-0 right-0 z-40 transition-all duration-300 ${isScrolled
            ? 'bg-[#FAF9F7]/95 backdrop-blur-md border-b border-neutral-200/80 py-3 sm:py-4 shadow-sm'
            : 'bg-[#FAF9F7]/80 backdrop-blur-sm py-4 sm:py-6'
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex items-center justify-between">
          {/* Mobile Menu Trigger */}
          <div className="flex items-center space-x-4 lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-neutral-900 p-1.5 hover:text-[#580D1A] transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

          {/* Desktop Left Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link
              href="/collections"
              className="text-xs uppercase tracking-[0.2em] font-medium text-neutral-600 hover:text-[#580D1A] transition-colors"
            >
              Collections
            </Link>
            <Link
              href="/collections/outerwear"
              className="text-xs uppercase tracking-[0.2em] font-medium text-neutral-600 hover:text-[#580D1A] transition-colors"
            >
              Outerwear
            </Link>
            <Link
              href="/collections/hoodies"
              className="text-xs uppercase tracking-[0.2em] font-medium text-neutral-600 hover:text-[#580D1A] transition-colors"
            >
              Hoodies
            </Link>
            <Link
              href="/lookbook"
              className="text-xs uppercase tracking-[0.2em] font-medium text-neutral-600 hover:text-[#580D1A] transition-colors"
            >
              Lookbook
            </Link>
            <Link
              href="/about"
              className="text-xs uppercase tracking-[0.2em] font-medium text-neutral-600 hover:text-[#580D1A] transition-colors"
            >
              About
            </Link>
          </nav>

          {/* Center Brand Monogram / Logo */}
          <div className="flex items-center justify-center">
            <Link href="/" className="group flex flex-col items-center">
              <span className="text-xl md:text-2xl font-black uppercase tracking-[0.35em] text-neutral-900 transition-all duration-300 group-hover:text-[#580D1A] group-hover:tracking-[0.42em]">
                KOLOSSAL
              </span>
              <span className="text-[8px] font-mono tracking-[0.3em] text-[#580D1A] uppercase font-semibold">
                Street Wear
              </span>
            </Link>
          </div>

          {/* Right Action Icons & Backend Badge */}
          <div className="flex items-center space-x-5">

            {/* Currency selector */}
            <button className="hidden md:flex items-center space-x-1 text-xs font-mono uppercase tracking-wider text-neutral-500 hover:text-[#580D1A] transition-colors">
              <Globe className="w-3.5 h-3.5" />
              <span>USD</span>
            </button>

            {/* Cart Trigger */}
            <button
              onClick={openCart}
              className="relative p-2 text-neutral-800 hover:text-[#580D1A] transition-colors"
              aria-label="Open cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {cart.itemCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#580D1A] text-white text-[9px] font-bold font-mono flex items-center justify-center shadow-md">
                  {cart.itemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 bg-[#FAF9F7]/98 backdrop-blur-2xl flex flex-col justify-between px-6 sm:px-8 space-y-8 lg:hidden pt-28 pb-12 overflow-y-auto overscroll-contain">
            <div className="space-y-4">
              <span className="text-[10px] font-mono tracking-widest text-[#580D1A] uppercase font-semibold">
                01 / CATALOGUE
              </span>
              <div className="flex flex-col space-y-2.5 text-sm uppercase tracking-[0.2em] font-semibold text-neutral-900">
                <Link href="/collections" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#580D1A]">
                  All Collections
                </Link>
                <Link href="/collections?filter=new" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#580D1A]">
                  New Arrivals (SS26)
                </Link>
                <Link href="/collections/outerwear" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#580D1A]">
                  Outerwear & Trench
                </Link>
                <Link href="/collections/hoodies" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#580D1A]">
                  Fine Knitwear & Hoodies
                </Link>
              </div>
            </div>

            <div className="space-y-4">
              <span className="text-[10px] font-mono tracking-widest text-[#580D1A] uppercase font-semibold">
                02 / CLIENT CARE
              </span>
              <div className="flex flex-col space-y-2 text-xs uppercase tracking-[0.18em] font-medium text-neutral-700">
                <Link href="/size-guide" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#580D1A]">
                  Size Guide
                </Link>
                <Link href="/shipping" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#580D1A]">
                  Shipping & Delivery
                </Link>
                <Link href="/returns" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#580D1A]">
                  Exchange & Replacement
                </Link>
                <Link href="/garment-care" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#580D1A]">
                  Garment Care
                </Link>
                <Link href="/faq" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#580D1A]">
                  Frequently Asked Questions
                </Link>
                <Link href="/track-order" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#580D1A]">
                  Track Your Order
                </Link>
              </div>
            </div>

            <div className="space-y-4">
              <span className="text-[10px] font-mono tracking-widest text-[#580D1A] uppercase font-semibold">
                03 / BRAND & LEGAL
              </span>
              <div className="flex flex-col space-y-2 text-xs uppercase tracking-[0.18em] font-medium text-neutral-700">
                <Link href="/about" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#580D1A]">
                  Our Story
                </Link>
                <Link href="/lookbook" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#580D1A]">
                  Seasonal Lookbook
                </Link>
                <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#580D1A]">
                  Client Concierge Desk
                </Link>
                <Link href="/sustainability" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#580D1A]">
                  Sustainability & Audit
                </Link>
                <Link href="/privacy" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#580D1A]">
                  Privacy Policy
                </Link>
                <Link href="/terms-and-conditions" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#580D1A]">
                  Terms & Conditions
                </Link>
              </div>
            </div>

          <div className="pt-6 border-t border-white/10 flex items-center justify-between text-xs font-mono text-neutral-400">
            <span>KOLOSSAL ARCHIVE</span>
            <span>CURRENCY: USD</span>
          </div>
        </div>
      )}
    </>
  );
}
