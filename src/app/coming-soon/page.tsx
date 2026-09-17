'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { ArrowRight, Sun, Moon } from 'lucide-react';
import ComingSoon3DFallback from '../../components/coming-soon/ComingSoon3DFallback';

// Dynamic 3D Scene with SSR disabled for optimal Three.js client loading
const ComingSoon3DScene = dynamic(
  () => import('../../components/coming-soon/ComingSoon3DScene'),
  {
    ssr: false,
    loading: () => <ComingSoon3DFallback />,
  }
);

export default function ComingSoonPage() {
  const [isDark, setIsDark] = useState(true);

  // Initialize theme from localStorage
  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem('kolossal_theme');
      if (savedTheme === 'light') {
        setIsDark(false);
      }
    } catch {
      // ignore
    }
  }, []);

  const toggleTheme = () => {
    const nextMode = !isDark;
    setIsDark(nextMode);
    try {
      localStorage.setItem('kolossal_theme', nextMode ? 'dark' : 'light');
    } catch {
      // ignore
    }
  };

  return (
    <div
      className={`relative w-screen min-h-screen h-[100dvh] flex flex-col justify-between items-center p-6 sm:p-10 select-none overflow-hidden transition-colors duration-500 ${
        isDark ? 'bg-[#0A0A0A] text-[#FAFAFA]' : 'bg-[#FAF9F7] text-[#111111]'
      }`}
    >
      {/* Subtle deep ambient glow behind 3D element */}
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[800px] h-[600px] sm:h-[800px] rounded-full blur-[140px] pointer-events-none transition-all duration-500 ${
          isDark ? 'bg-[#580D1A]/[0.12]' : 'bg-[#580D1A]/[0.05]'
        }`}
      />

      {/* ── Top Bar: Centered Monogram with Top-Right Dark/Light Toggle ── */}
      <header className="relative z-10 w-full flex items-center justify-between max-w-5xl">
        {/* Left balance spacer to ensure logo remains mathematically centered */}
        <div className="w-9 h-9" />

        {/* Center Brand Monogram */}
        <div
          className={`text-sm sm:text-base font-black tracking-[0.4em] uppercase transition-colors duration-300 ${
            isDark ? 'text-neutral-200' : 'text-neutral-900'
          }`}
        >
          KOLOSSAL
        </div>

        {/* Top-Right Theme Toggle */}
        <button
          onClick={toggleTheme}
          aria-label="Toggle Dark and Light mode"
          title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 border cursor-pointer active:scale-90 ${
            isDark
              ? 'bg-white/[0.06] hover:bg-white/[0.12] border-white/15 text-neutral-300 hover:text-white shadow-sm'
              : 'bg-black/[0.04] hover:bg-black/[0.08] border-black/10 text-neutral-700 hover:text-neutral-950 shadow-sm'
          }`}
        >
          {isDark ? (
            <Sun className="w-4 h-4 transition-transform duration-300 hover:rotate-45" />
          ) : (
            <Moon className="w-4 h-4 transition-transform duration-300 hover:-rotate-12" />
          )}
        </button>
      </header>

      {/* ── Center Stage: 3D Monolith Model ── */}
      <main className="relative z-10 w-full max-w-4xl flex-1 flex flex-col items-center justify-center -my-2 sm:my-0">
        
        {/* The 3D Scene */}
        <div className="w-full h-[280px] sm:h-[380px] md:h-[440px] lg:h-[480px] flex items-center justify-center">
          <ComingSoon3DScene isDark={isDark} />
        </div>

        {/* Minimal Editorial Content */}
        <div className="text-center space-y-3 max-w-md px-4 mt-1 sm:mt-3">
          <h1
            className={`text-2xl sm:text-4xl md:text-5xl font-light tracking-tight leading-tight transition-colors duration-300 ${
              isDark ? 'text-white' : 'text-neutral-950'
            }`}
          >
            Pre Launch Form
          </h1>
          <p
            className={`text-xs sm:text-sm font-light leading-relaxed transition-colors duration-300 ${
              isDark ? 'text-neutral-400' : 'text-neutral-600'
            }`}
          >
            Custom-milled 500 GSM organic cotton in architectural proportions. Strictly 150 individually numbered garments.
          </p>
        </div>

        {/* Fancy Pre-Register / Reserve Button redirecting to /early */}
        <div className="mt-7 sm:mt-9">
          <Link
            href="/early"
            className={`group relative inline-flex items-center space-x-3.5 px-8 sm:px-11 py-3.5 sm:py-4 rounded-full transition-all duration-500 font-medium text-xs sm:text-sm uppercase tracking-[0.22em] active:scale-95 ${
              isDark
                ? 'bg-gradient-to-r from-[#171717] via-[#222222] to-[#171717] hover:from-[#580D1A] hover:via-[#851830] hover:to-[#580D1A] text-white border border-white/20 hover:border-[#851830]/80 shadow-[0_4px_25px_rgba(0,0,0,0.6)] hover:shadow-[0_0_40px_rgba(133,24,48,0.5)]'
                : 'bg-[#580D1A] hover:bg-[#3A0811] text-white border border-[#580D1A]/40 shadow-[0_4px_20px_rgba(88,13,26,0.25)] hover:shadow-[0_0_35px_rgba(88,13,26,0.4)]'
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full animate-pulse transition-colors ${
                isDark ? 'bg-[#851830] group-hover:bg-white' : 'bg-white/80'
              }`}
            />
            <span>Pre-Register / Reserve</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

      </main>

      {/* ── Minimal Bottom Provenance ── */}
      <footer
        className={`relative z-10 w-full flex items-center justify-center max-w-5xl text-[10px] sm:text-[11px] font-mono tracking-widest uppercase transition-colors duration-300 ${
          isDark ? 'text-neutral-500' : 'text-neutral-500'
        }`}
      >
        <span>CHANDIGARH, INDIA</span>
      </footer>

    </div>
  );
}
