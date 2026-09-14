'use client';

import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-snoov-canvas border-t border-snoov-border text-snoov-charcoal overflow-hidden select-none">
      <div className="content-container pt-16 sm:pt-24 pb-8">

        {/* Top Editorial Row: Brand Overview + Directory Columns */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 sm:gap-16 pb-16 border-b border-snoov-border">

          {/* Brand Identity & Mission (4 Columns) */}
          <div className="md:col-span-4 flex flex-col justify-between">
            <div>
              <Link href="/" className="inline-block">
                <span className="text-2xl sm:text-3xl font-black uppercase tracking-[0.3em] text-snoov-charcoal block">
                  KOLOSSAL
                </span>
              </Link>
              <span className="text-[10px] font-mono tracking-widest text-snoov-green uppercase font-semibold block mt-1">
                MILAN / TOKYO · EST. 2026
              </span>
              <p className="mt-4 text-xs text-snoov-muted leading-relaxed font-sans max-w-sm">
                A conscious luxury streetwear brand focused on intentional cuts, tactile organic textiles, and enduring silhouette design.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-snoov-border/60">
              <span className="text-[10px] font-mono text-snoov-charcoal/80 uppercase tracking-widest">
                VERIFIED SUSTAINABLE STANDARDS · GOTS & EUROPEAN FLAX®
              </span>
            </div>
          </div>

          {/* Directory Columns (8 Columns) */}
          <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-8 text-xs">

            {/* Column 1: Shop / Catalogue */}
            <div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-snoov-charcoal font-semibold block mb-4">
                01 / CATALOGUE
              </span>
              <ul className="space-y-3 text-snoov-muted">
                <li>
                  <Link href="/collections" className="hover:text-snoov-green transition-colors">
                    All Collections
                  </Link>
                </li>
                <li>
                  <Link href="/collections?filter=new" className="hover:text-snoov-green transition-colors text-snoov-green font-medium">
                    New Arrivals (SS26)
                  </Link>
                </li>
                <li>
                  <Link href="/collections/pants" className="hover:text-snoov-green transition-colors">
                    Tailoring & Blazers
                  </Link>
                </li>
                <li>
                  <Link href="/collections/hoodies" className="hover:text-snoov-green transition-colors">
                    Fine-Gauge Knitwear
                  </Link>
                </li>
                <li>
                  <Link href="/collections/outerwear" className="hover:text-snoov-green transition-colors">
                    Outerwear & Trench
                  </Link>
                </li>
                <li>
                  <Link href="/collections/accessories" className="hover:text-snoov-green transition-colors">
                    Vegetable-Tanned Leather
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 2: Client Care */}
            <div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-snoov-charcoal font-semibold block mb-4">
                02 / CLIENT CARE
              </span>
              <ul className="space-y-3 text-snoov-muted">
                <li>
                  <Link href="/size-guide" className="hover:text-snoov-green transition-colors">
                    Size Guide
                  </Link>
                </li>
                <li>
                  <Link href="/shipping" className="hover:text-snoov-green transition-colors">
                    Shipping & Delivery (Free &gt; $250)
                  </Link>
                </li>
                <li>
                  <Link href="/returns" className="hover:text-snoov-green transition-colors">
                    Exchange & Replacement Policy
                  </Link>
                </li>
                <li>
                  <Link href="/track-order" className="hover:text-snoov-green transition-colors">
                    Client Account Portal
                  </Link>
                </li>
                <li>
                  <Link href="/garment-care" className="hover:text-snoov-green transition-colors">
                    Garment Care & Longevity
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="hover:text-snoov-green transition-colors">
                    Frequently Asked Questions
                  </Link>
                </li>
                <li>
                  <Link href="/track-order" className="hover:text-snoov-green transition-colors font-medium">
                    Track Your Order
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: Brand & Connect */}
            <div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-snoov-charcoal font-semibold block mb-4">
                03 / BRAND
              </span>
              <ul className="space-y-3 text-snoov-muted">
                <li>
                  <Link href="/about" className="hover:text-snoov-green transition-colors">
                    Our Story
                  </Link>
                </li>
                <li>
                  <Link href="/lookbook" className="hover:text-snoov-green transition-colors">
                    Seasonal Lookbook
                  </Link>
                </li>
                <li>
                  <a href="https://www.instagram.com/kolossal.com/" target="_blank" rel="noreferrer" className="hover:text-snoov-green transition-colors flex items-center gap-1.5">
                    <span>Instagram (@kolossal.official)</span>
                    <span className="text-[10px]">↗</span>
                  </a>
                </li>
                <li>
                  <a href="https://pinterest.com" target="_blank" rel="noreferrer" className="hover:text-snoov-green transition-colors flex items-center gap-1.5">
                    <span>Pinterest</span>
                    <span className="text-[10px]">↗</span>
                  </a>
                </li>
                <li>
                  <a href="https://youtube.com" target="_blank" rel="noreferrer" className="hover:text-snoov-green transition-colors flex items-center gap-1.5">
                    <span>Runway Archive</span>
                    <span className="text-[10px]">↗</span>
                  </a>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-snoov-green transition-colors font-medium">
                    Client Concierge Desk
                  </Link>
                </li>
                <li className="pt-2 text-[11px] font-mono text-snoov-charcoal">
                  concierge@kolossal.com
                </li>
              </ul>
            </div>

          </div>

        </div>


        {/* Bottom Legal & Copyright Bar */}
        <div className="pt-8 mt-4 border-t border-snoov-border flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] font-mono text-snoov-muted uppercase tracking-wider">
          <div>
            © {new Date().getFullYear()} ALL RIGHTS RESERVED.
          </div>
          <div className="flex flex-wrap items-center justify-center gap-6">
            <Link href="/privacy" className="hover:text-snoov-charcoal transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms-and-conditions" className="hover:text-snoov-charcoal transition-colors">
              Terms & Conditions
            </Link>
            <Link href="/cookie-policy" className="hover:text-snoov-charcoal transition-colors">
              Cookie Policy
            </Link>
            <Link href="/accessibility" className="hover:text-snoov-charcoal transition-colors">
              Accessibility
            </Link>
            <Link href="/sustainability" className="hover:text-snoov-charcoal transition-colors">
              Traceability & Audit
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
