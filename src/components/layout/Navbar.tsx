'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import dynamic from 'next/dynamic';
import { ShoppingBag, Menu, X, Globe, ChevronDown, Check } from 'lucide-react';
import { useCart } from '../../context/CartContext';

const NavBrand3DIntro = dynamic(() => import('./NavBrand3DIntro'), { ssr: false });

const CURRENCIES = ['USD', 'EUR', 'GBP', 'INR'] as const;
type Currency = (typeof CURRENCIES)[number];

const REST_LETTERS = ['O', 'L', 'O', 'S', 'S', 'A', 'L'] as const;

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const { cart, openCart } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currency, setCurrency] = useState<Currency>('USD');
  const [currencyOpen, setCurrencyOpen] = useState(false);
  const currencyRef = useRef<HTMLDivElement>(null);

  // 3D K Letter Intro Animation States
  const [isPlaying3DIntro, setIsPlaying3DIntro] = useState(false);
  const [isDocked, setIsDocked] = useState(!isHome);
  const [isJustDocked, setIsJustDocked] = useState(false);
  const [isRestRevealed, setIsRestRevealed] = useState(!isHome);
  const [isFullySettled, setIsFullySettled] = useState(!isHome);
  const introTimersRef = useRef<NodeJS.Timeout[]>([]);

  const clearIntroTimers = () => {
    introTimersRef.current.forEach((t) => clearTimeout(t));
    introTimersRef.current = [];
  };

  // Trigger 3D intro when visiting or refreshing the homepage
  useEffect(() => {
    clearIntroTimers();
    if (pathname === '/') {
      setIsPlaying3DIntro(true);
      setIsDocked(false);
      setIsRestRevealed(false);
      setIsFullySettled(false);
    } else {
      setIsPlaying3DIntro(false);
      setIsDocked(true);
      setIsRestRevealed(true);
      setIsFullySettled(true);
    }
    return () => clearIntroTimers();
  }, [pathname]);

  const handleIntroComplete = () => {
    clearIntroTimers();
    setIsPlaying3DIntro(false);
    setIsDocked(true);
    setIsJustDocked(true);

    // Trigger smooth slide reveal of 'OLOSSAL' right as K arrives and docks
    const t1 = setTimeout(() => {
      setIsRestRevealed(true);
    }, 40);

    // Settle full wordmark into place; clear transition delays so hover effects respond instantly
    const t2 = setTimeout(() => {
      setIsFullySettled(true);
    }, 850);

    // Glow pulse on K settles back
    const t3 = setTimeout(() => {
      setIsJustDocked(false);
    }, 900);

    introTimersRef.current.push(t1, t2, t3);
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    if (pathname === '/') {
      e.preventDefault();
      clearIntroTimers();
      // Re-trigger 3D animation on demand
      setIsPlaying3DIntro(false);
      setIsDocked(false);
      setIsJustDocked(false);
      setIsRestRevealed(false);
      setIsFullySettled(false);
      const t = setTimeout(() => setIsPlaying3DIntro(true), 50);
      introTimersRef.current.push(t);
    }
  };

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setCurrencyOpen(false);
  }, [pathname]);

  // Handle escape key and body scroll lock
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
        setCurrencyOpen(false);
      }
    };

    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [mobileMenuOpen]);

  // Click outside listener for currency dropdown
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (currencyRef.current && !currencyRef.current.contains(e.target as Node)) {
        setCurrencyOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-8 sm:h-9 bg-[#580D1A] text-[#FAF9F7] flex items-center justify-center px-4 shadow-sm select-none">
        <p className="text-[9px] sm:text-[10px] md:text-[11px] font-mono tracking-[0.18em] sm:tracking-[0.25em] uppercase font-medium truncate sm:whitespace-normal">
          COMPLIMENTARY WORLDWIDE EXPRESS OVER $250 &bull; DROP 001 ARCHIVES LIVE
        </p>
      </div>

      {/* Main Navigation Header */}
      <header
        className={`fixed top-8 sm:top-9 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#FAF9F7]/95 backdrop-blur-md border-b border-neutral-200/80 shadow-xs py-2 sm:py-2.5'
            : 'bg-[#FAF9F7]/85 backdrop-blur-sm border-b border-neutral-200/40 py-3 sm:py-3.5'
        }`}
      >
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex items-center justify-between h-14 sm:h-16">
          {/* =========================================================================
              LEFT COLUMN: Mobile Menu Trigger + Desktop Left Navigation
             ========================================================================= */}
          <div className="flex-1 flex items-center justify-start">
            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 -ml-2 text-neutral-900 hover:text-[#580D1A] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#580D1A]"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            {/* Desktop Left Nav Links */}
            <nav className="hidden lg:flex items-center space-x-7 xl:space-x-9">
              <Link
                href="/collections"
                className={`text-[11px] uppercase tracking-[0.22em] font-medium transition-colors duration-200 relative py-1 ${
                  isActive('/collections')
                    ? 'text-[#580D1A] font-semibold'
                    : 'text-neutral-600 hover:text-[#580D1A]'
                }`}
              >
                Collections
                {isActive('/collections') && (
                  <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#580D1A]" />
                )}
              </Link>
              <Link
                href="/lookbook"
                className={`text-[11px] uppercase tracking-[0.22em] font-medium transition-colors duration-200 relative py-1 ${
                  isActive('/lookbook')
                    ? 'text-[#580D1A] font-semibold'
                    : 'text-neutral-600 hover:text-[#580D1A]'
                }`}
              >
                Lookbook
                {isActive('/lookbook') && (
                  <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#580D1A]" />
                )}
              </Link>
              <Link
                href="/coming-soon"
                className="inline-flex items-center space-x-1.5 text-[11px] uppercase tracking-[0.22em] font-semibold text-[#580D1A] hover:text-[#3a0811] transition-colors group py-1"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#580D1A] animate-pulse group-hover:scale-125 transition-transform" />
                <span>Coming Soon</span>
              </Link>
            </nav>
          </div>

          {/* =========================================================================
              CENTER COLUMN: Brand Monogram & Sub-Title (Absolute Perfection Centering)
             ========================================================================= */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center text-center pointer-events-auto select-none">
            <Link
              href="/"
              onClick={handleLogoClick}
              className="group flex flex-col items-center py-1 focus:outline-none"
              title="KOLOSSAL Street Wear"
            >
              <span className="text-xl sm:text-2xl md:text-[26px] font-black uppercase tracking-[0.38em] sm:tracking-[0.44em] text-neutral-950 transition-all duration-300 group-hover:text-[#580D1A] group-hover:tracking-[0.48em] pl-[0.38em] sm:pl-[0.44em] inline-flex items-baseline">
                <span
                  id="nav-brand-k"
                  className={`inline-block transition-all duration-300 ${
                    !isDocked
                      ? 'opacity-0 pointer-events-none select-none'
                      : 'opacity-100'
                  } ${
                    isJustDocked
                      ? 'text-[#580D1A] scale-110 drop-shadow-[0_0_12px_rgba(88,13,26,0.6)]'
                      : 'scale-100'
                  }`}
                >
                  K
                </span>
                <span
                  className="inline-flex overflow-hidden align-baseline"
                  aria-hidden="true"
                >
                  {REST_LETTERS.map((char, idx) => (
                    <span
                      key={idx}
                      className="inline-block transition-all duration-600 ease-[cubic-bezier(0.16,1,0.3,1)]"
                      style={{
                        opacity: isRestRevealed ? 1 : 0,
                        transform: isRestRevealed ? 'translateX(0)' : 'translateX(-18px)',
                        filter: isRestRevealed ? 'blur(0px)' : 'blur(4px)',
                        transitionDelay: !isFullySettled && isRestRevealed ? `${idx * 45}ms` : '0ms',
                      }}
                    >
                      {char}
                    </span>
                  ))}
                </span>
                <span className="sr-only">OLOSSAL</span>
              </span>
              <span
                className="text-[7.5px] sm:text-[8.5px] font-mono tracking-[0.34em] text-[#580D1A] uppercase font-semibold pl-[0.34em] mt-0.5 transition-all duration-500 ease-out"
                style={{
                  opacity: isRestRevealed ? 1 : 0,
                  transform: isRestRevealed ? 'translateY(0)' : 'translateY(6px)',
                  filter: isRestRevealed ? 'blur(0px)' : 'blur(2px)',
                  transitionDelay: !isFullySettled && isRestRevealed ? '260ms' : '0ms',
                }}
              >
                Street Wear
              </span>
            </Link>
          </div>

          {/* =========================================================================
              RIGHT COLUMN: Desktop Right Navigation + Actions (Currency & Cart)
             ========================================================================= */}
          <div className="flex-1 flex items-center justify-end space-x-6 sm:space-x-8">
            {/* Desktop Right Nav Links */}
            <nav className="hidden lg:flex items-center space-x-7 xl:space-x-9">
              <Link
                href="/about"
                className={`text-[11px] uppercase tracking-[0.22em] font-medium transition-colors duration-200 relative py-1 ${
                  isActive('/about')
                    ? 'text-[#580D1A] font-semibold'
                    : 'text-neutral-600 hover:text-[#580D1A]'
                }`}
              >
                About
                {isActive('/about') && (
                  <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#580D1A]" />
                )}
              </Link>
              <Link
                href="/contact"
                className={`text-[11px] uppercase tracking-[0.22em] font-medium transition-colors duration-200 relative py-1 ${
                  isActive('/contact')
                    ? 'text-[#580D1A] font-semibold'
                    : 'text-neutral-600 hover:text-[#580D1A]'
                }`}
              >
                Contact
                {isActive('/contact') && (
                  <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#580D1A]" />
                )}
              </Link>
            </nav>

            {/* Actions: Currency selector + Cart Trigger */}
            <div className="flex items-center space-x-4 sm:space-x-5">
              {/* Currency Selector Popover */}
              <div className="relative" ref={currencyRef}>
                <button
                  type="button"
                  onClick={() => setCurrencyOpen(!currencyOpen)}
                  className="hidden sm:inline-flex items-center space-x-1.5 text-xs font-mono uppercase tracking-wider text-neutral-600 hover:text-[#580D1A] transition-colors py-1.5 px-2 rounded-sm hover:bg-neutral-100/60"
                  aria-label={`Currency selected: ${currency}`}
                  aria-expanded={currencyOpen}
                >
                  <Globe className="w-3.5 h-3.5" />
                  <span className="font-semibold">{currency}</span>
                  <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${currencyOpen ? 'rotate-180' : ''}`} />
                </button>

                {currencyOpen && (
                  <div className="absolute right-0 top-full mt-2 w-32 bg-[#FAF9F7] border border-neutral-200 rounded shadow-xl py-1 z-50 animate-in fade-in zoom-in-95 duration-150">
                    <div className="px-3 py-1 text-[9px] font-mono tracking-widest text-neutral-400 uppercase border-b border-neutral-100 mb-1">
                      Select Currency
                    </div>
                    {CURRENCIES.map((curr) => (
                      <button
                        key={curr}
                        type="button"
                        onClick={() => {
                          setCurrency(curr);
                          setCurrencyOpen(false);
                        }}
                        className={`w-full px-3 py-1.5 text-xs font-mono uppercase flex items-center justify-between transition-colors ${
                          currency === curr
                            ? 'bg-[#580D1A]/10 text-[#580D1A] font-bold'
                            : 'text-neutral-700 hover:bg-neutral-100 hover:text-neutral-950'
                        }`}
                      >
                        <span>{curr}</span>
                        {currency === curr && <Check className="w-3 h-3 text-[#580D1A]" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Shopping Bag Trigger */}
              <button
                type="button"
                onClick={openCart}
                className="relative p-2 -mr-2 text-neutral-900 hover:text-[#580D1A] transition-colors group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#580D1A]"
                aria-label={`Open shopping cart with ${cart.itemCount} items`}
              >
                <ShoppingBag className="w-5 h-5 transition-transform duration-200 group-hover:scale-110" />
                {cart.itemCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-[#580D1A] text-white text-[9px] font-bold font-mono flex items-center justify-center shadow-md animate-in zoom-in-75 duration-200">
                    {cart.itemCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* =========================================================================
          MOBILE DRAWER MENU (Smooth Slide-In overlay)
         ========================================================================= */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 bg-[#FAF9F7]/98 backdrop-blur-2xl flex flex-col justify-between px-6 sm:px-8 space-y-8 lg:hidden pt-28 pb-10 overflow-y-auto overscroll-contain animate-in fade-in duration-200">
          <div className="space-y-6">
            {/* Catalogue Links */}
            <div className="space-y-3">
              <span className="text-[10px] font-mono tracking-widest text-[#580D1A] uppercase font-semibold">
                01 / CATALOGUE
              </span>
              <div className="flex flex-col space-y-2.5 text-sm uppercase tracking-[0.2em] font-semibold text-neutral-900">
                <Link
                  href="/collections"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`hover:text-[#580D1A] transition-colors ${isActive('/collections') ? 'text-[#580D1A]' : ''}`}
                >
                  All Collections
                </Link>
                <Link
                  href="/coming-soon"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-[#580D1A] font-semibold flex items-center gap-2 hover:text-[#3a0811]"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#580D1A] animate-pulse" />
                  <span>Drop 02 (Coming Soon)</span>
                </Link>
                <Link
                  href="/collections/outerwear"
                  onClick={() => setMobileMenuOpen(false)}
                  className="hover:text-[#580D1A] transition-colors"
                >
                  Outerwear & Trench
                </Link>
                <Link
                  href="/collections/hoodies"
                  onClick={() => setMobileMenuOpen(false)}
                  className="hover:text-[#580D1A] transition-colors"
                >
                  Fine Knitwear & Hoodies
                </Link>
              </div>
            </div>

            {/* Editorial & Story */}
            <div className="space-y-3">
              <span className="text-[10px] font-mono tracking-widest text-[#580D1A] uppercase font-semibold">
                02 / EDITORIAL & CULTURE
              </span>
              <div className="flex flex-col space-y-2 text-xs uppercase tracking-[0.18em] font-medium text-neutral-800">
                <Link
                  href="/lookbook"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`hover:text-[#580D1A] transition-colors ${isActive('/lookbook') ? 'text-[#580D1A]' : ''}`}
                >
                  Seasonal Lookbook
                </Link>
                <Link
                  href="/about"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`hover:text-[#580D1A] transition-colors ${isActive('/about') ? 'text-[#580D1A]' : ''}`}
                >
                  Our Story & Manifesto
                </Link>
                <Link
                  href="/creators"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`hover:text-[#580D1A] transition-colors flex items-center gap-1.5 ${isActive('/creators') ? 'text-[#580D1A] font-semibold' : ''}`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#580D1A]" />
                  <span>Creator & Affiliate Circle</span>
                </Link>
                <Link
                  href="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`hover:text-[#580D1A] transition-colors ${isActive('/contact') ? 'text-[#580D1A]' : ''}`}
                >
                  Client Concierge
                </Link>
              </div>
            </div>

            {/* Client Care & Info */}
            <div className="space-y-3">
              <span className="text-[10px] font-mono tracking-widest text-[#580D1A] uppercase font-semibold">
                03 / CLIENT CARE
              </span>
              <div className="flex flex-col space-y-2 text-xs uppercase tracking-[0.18em] font-medium text-neutral-700">
                <Link href="/size-guide" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#580D1A]">
                  Size Guide
                </Link>
                <Link href="/shipping" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#580D1A]">
                  Shipping & Delivery
                </Link>
                <Link href="/returns" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#580D1A]">
                  Exchange & Returns
                </Link>
                <Link href="/garment-care" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#580D1A]">
                  Garment Care
                </Link>
                <Link href="/faq" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#580D1A]">
                  FAQ
                </Link>
                <Link href="/track-order" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#580D1A]">
                  Track Order
                </Link>
              </div>
            </div>
          </div>

          {/* Bottom Mobile Footer with Currency Switcher */}
          <div className="pt-6 border-t border-neutral-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-mono text-neutral-500">
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase tracking-wider text-neutral-400">CURRENCY:</span>
              <div className="flex items-center space-x-1.5">
                {CURRENCIES.map((curr) => (
                  <button
                    key={curr}
                    type="button"
                    onClick={() => setCurrency(curr)}
                    className={`px-2 py-0.5 rounded text-[11px] font-semibold transition-colors ${
                      currency === curr
                        ? 'bg-[#580D1A] text-white'
                        : 'bg-neutral-200/60 text-neutral-700 hover:bg-neutral-200'
                    }`}
                  >
                    {curr}
                  </button>
                ))}
              </div>
            </div>
            <span className="text-[10px] tracking-wider uppercase text-neutral-400">
              &copy; {new Date().getFullYear()} KOLOSSAL ARCHIVE
            </span>
          </div>
        </div>
      )}

      {/* 3D Animated 'K' Intro Canvas Sequence */}
      {isPlaying3DIntro && <NavBrand3DIntro onComplete={handleIntroComplete} />}
    </>
  );
}

