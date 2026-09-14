'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
    }
  };

  return (
    <footer className="bg-[#F5F2EF] text-neutral-900 border-t border-neutral-200/80 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 space-y-16">
        {/* Upper Grid: Newsletter + Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Newsletter Box */}
          <div className="md:col-span-5 space-y-4">
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#580D1A] font-semibold">
              INNER CIRCLE ARCHIVE
            </span>
            <h3 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-neutral-950">
              ACCESS PRIVATE DROPS FIRST
            </h3>
            <p className="text-xs text-neutral-600 font-light leading-relaxed max-w-sm">
              Subscribers receive password-protected private drop links 24 hours prior to global public release.
            </p>

            <form onSubmit={handleSubmit} className="flex max-w-sm pt-2">
              <input
                type="email"
                required
                placeholder="ENTER EMAIL ADDRESS"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-white border border-neutral-300 px-4 py-3 rounded-l-full text-xs font-mono tracking-wider text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-[#580D1A]"
              />
              <button
                type="submit"
                className="px-6 bg-[#580D1A] text-white text-xs font-semibold uppercase tracking-[0.2em] rounded-r-full hover:bg-[#3F0712] transition-colors flex items-center justify-center shadow-md shadow-[#580D1A]/20"
              >
                {subscribed ? <Check className="w-4 h-4 text-white" /> : <ArrowRight className="w-4 h-4" />}
              </button>
            </form>
            {subscribed && (
              <p className="text-[11px] font-mono text-[#580D1A] font-semibold">
                ✓ You have been indexed for private drop allocations.
              </p>
            )}
          </div>

          {/* Links Column 1 */}
          <div className="md:col-span-2 md:col-start-7 space-y-4">
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#580D1A] font-semibold">
              CATALOG
            </span>
            <ul className="space-y-2.5 text-xs uppercase tracking-wider text-neutral-600">
              <li><Link href="/collections" className="hover:text-[#580D1A] transition-colors">All Archives</Link></li>
              <li><Link href="/collections/outerwear" className="hover:text-[#580D1A] transition-colors">Outerwear</Link></li>
              <li><Link href="/collections/hoodies" className="hover:text-[#580D1A] transition-colors">Hoodies</Link></li>
              <li><Link href="/collections/pants" className="hover:text-[#580D1A] transition-colors">Tailored Pants</Link></li>
              <li><Link href="/collections/accessories" className="hover:text-[#580D1A] transition-colors">Hardware & Chains</Link></li>
            </ul>
          </div>

          {/* Links Column 2 */}
          <div className="md:col-span-2 space-y-4">
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#580D1A] font-semibold">
              BRAND
            </span>
            <ul className="space-y-2.5 text-xs uppercase tracking-wider text-neutral-600">
              <li><Link href="/about" className="hover:text-[#580D1A] transition-colors">Brand Story</Link></li>
              <li><Link href="/lookbook" className="hover:text-[#580D1A] transition-colors">Campaign Lookbook</Link></li>
              <li><Link href="/size-guide" className="hover:text-[#580D1A] transition-colors">Size Matrix (500 GSM)</Link></li>
              <li><Link href="/shipping-returns" className="hover:text-[#580D1A] transition-colors">Worldwide Shipping</Link></li>
            </ul>
          </div>

          {/* Links Column 3 */}
          <div className="md:col-span-2 space-y-4">
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#580D1A] font-semibold">
              CLIENT CARE
            </span>
            <ul className="space-y-2.5 text-xs uppercase tracking-wider text-neutral-600">
              <li><Link href="/track-order" className="hover:text-[#580D1A] transition-colors">Track Order</Link></li>
              <li><Link href="/shipping-returns" className="hover:text-[#580D1A] transition-colors">Returns & Refunds</Link></li>
              <li><Link href="/contact" className="hover:text-[#580D1A] transition-colors">Concierge Desk</Link></li>
              <li><Link href="/faq" className="hover:text-[#580D1A] transition-colors">FAQ Knowledge Base</Link></li>
            </ul>
          </div>
        </div>

        {/* Large Monogram Backdrop */}
        <div className="border-t border-neutral-300/80 pt-12 flex flex-col md:flex-row items-center justify-between text-[11px] font-mono text-neutral-500 gap-4">
          <div className="flex items-center space-x-4">
            <span className="text-neutral-950 font-black tracking-[0.25em]">K O L O S S A L</span>
            <span>&copy; {new Date().getFullYear()} ALL RIGHTS RESERVED</span>
          </div>

          <div className="flex items-center space-x-6 text-[10px] tracking-widest uppercase text-neutral-500">
            <span>TOKYO &bull; MILAN</span>
            <span className="text-[#580D1A] font-semibold">HEADLESS COMMERCE ENGINE</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
