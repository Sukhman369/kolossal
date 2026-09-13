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
    <footer className="bg-[#050505] text-white border-t border-white/[0.08] pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 space-y-16">
        {/* Upper Grid: Newsletter + Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Newsletter Box */}
          <div className="md:col-span-5 space-y-4">
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-neutral-500">
              INNER CIRCLE ARCHIVE
            </span>
            <h3 className="text-xl sm:text-2xl font-bold uppercase tracking-tight">
              ACCESS PRIVATE DROPS FIRST
            </h3>
            <p className="text-xs text-neutral-400 font-light leading-relaxed max-w-sm">
              Subscribers receive password-protected private drop links 24 hours prior to global public release.
            </p>

            <form onSubmit={handleSubmit} className="flex max-w-sm pt-2">
              <input
                type="email"
                required
                placeholder="ENTER EMAIL ADDRESS"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-white/[0.04] border border-white/15 px-4 py-3 rounded-l-full text-xs font-mono tracking-wider text-white placeholder:text-neutral-600 focus:outline-none focus:border-white/40"
              />
              <button
                type="submit"
                className="px-6 bg-white text-black text-xs font-semibold uppercase tracking-[0.2em] rounded-r-full hover:bg-neutral-200 transition-colors flex items-center justify-center"
              >
                {subscribed ? <Check className="w-4 h-4 text-emerald-600" /> : <ArrowRight className="w-4 h-4" />}
              </button>
            </form>
            {subscribed && (
              <p className="text-[11px] font-mono text-emerald-400">
                ✓ You have been indexed for private drop allocations.
              </p>
            )}
          </div>

          {/* Links Column 1 */}
          <div className="md:col-span-2 md:col-start-7 space-y-4">
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-neutral-500">
              CATALOG
            </span>
            <ul className="space-y-2.5 text-xs uppercase tracking-wider text-neutral-400">
              <li><Link href="#featured-drop" className="hover:text-white transition-colors">Drop 001</Link></li>
              <li><Link href="#featured-drop" className="hover:text-white transition-colors">Outerwear</Link></li>
              <li><Link href="#featured-drop" className="hover:text-white transition-colors">Hoodies</Link></li>
              <li><Link href="#featured-drop" className="hover:text-white transition-colors">Tailored Pants</Link></li>
              <li><Link href="#featured-drop" className="hover:text-white transition-colors">Accessories</Link></li>
            </ul>
          </div>

          {/* Links Column 2 */}
          <div className="md:col-span-2 space-y-4">
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-neutral-500">
              BRAND
            </span>
            <ul className="space-y-2.5 text-xs uppercase tracking-wider text-neutral-400">
              <li><Link href="#manifesto" className="hover:text-white transition-colors">Manifesto</Link></li>
              <li><span className="text-neutral-500">Material Guide (500 GSM)</span></li>
              <li><span className="text-neutral-500">Sizing Architecture</span></li>
              <li><span className="text-neutral-500">Global Shipping</span></li>
            </ul>
          </div>

          {/* Links Column 3 */}
          <div className="md:col-span-2 space-y-4">
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-neutral-500">
              CLIENT CARE
            </span>
            <ul className="space-y-2.5 text-xs uppercase tracking-wider text-neutral-400">
              <li><span className="text-neutral-500">Track Order</span></li>
              <li><span className="text-neutral-500">Returns & Exchanges</span></li>
              <li><span className="text-neutral-500">Concierge Desk</span></li>
              <li><span className="text-neutral-500">Authentication</span></li>
            </ul>
          </div>
        </div>

        {/* Large Monogram Backdrop */}
        <div className="border-t border-white/[0.08] pt-12 flex flex-col md:flex-row items-center justify-between text-[11px] font-mono text-neutral-500 gap-4">
          <div className="flex items-center space-x-4">
            <span className="text-white font-bold tracking-[0.2em]">K O L O S S A L</span>
            <span>&copy; {new Date().getFullYear()} ALL RIGHTS RESERVED</span>
          </div>

          <div className="flex items-center space-x-6 text-[10px] tracking-widest uppercase">
            <span>TOKYO &bull; MILAN</span>
            <span>HEADLESS COMMERCE ENGINE</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
