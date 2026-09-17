'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Check, ArrowRight, Sun, Moon } from 'lucide-react';

interface SubmissionResult {
  name: string;
  vipCode: string;
  queueNumber: number;
}

export default function EarlyAccessPage() {
  const [isDark, setIsDark] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [submittedResult, setSubmittedResult] = useState<SubmissionResult | null>(null);

  // Initialize theme from localStorage so it matches coming-soon
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!formData.name.trim()) {
      setErrorMsg('Please enter your full name.');
      return;
    }
    if (!formData.email.trim()) {
      setErrorMsg('Please enter your email address.');
      return;
    }
    if (!formData.email.includes('@') || !formData.email.includes('.')) {
      setErrorMsg('Please provide a valid email format.');
      return;
    }
    if (!formData.phone.trim()) {
      setErrorMsg('Please enter your contact phone number.');
      return;
    }

    setIsLoading(true);

    const rawPhone = formData.phone.trim();
    const formattedPhone = rawPhone.startsWith('+') ? rawPhone : `+91 ${rawPhone}`;

    try {
      const res = await fetch('/api/early', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          phone: formattedPhone,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error || 'Failed to submit reservation. Please try again.');
        setIsLoading(false);
        return;
      }

      setSubmittedResult({
        name: data.name,
        vipCode: data.vipCode,
        queueNumber: data.queueNumber,
      });
    } catch (err) {
      console.error(err);
      setErrorMsg('Network error. Please check your connection.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={`relative w-screen min-h-screen h-[100dvh] flex flex-col justify-between items-center p-6 sm:p-10 select-none overflow-hidden transition-colors duration-500 ${
        isDark ? 'bg-[#0A0A0A] text-[#FAFAFA]' : 'bg-[#FAF9F7] text-[#111111]'
      }`}
    >
      {/* Ambient background glow */}
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] sm:w-[850px] h-[650px] sm:h-[850px] rounded-full blur-[160px] pointer-events-none transition-all duration-500 ${
          isDark ? 'bg-[#580D1A]/[0.12]' : 'bg-[#580D1A]/[0.05]'
        }`}
      />

      {/* ── Top Header: Centered Monogram with Theme Toggle ── */}
      <header className="relative z-10 w-full flex items-center justify-between max-w-5xl">
        {/* Left balance spacer */}
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

      {/* ── Center Content Area ── */}
      <main className="relative z-10 w-full max-w-md mx-auto flex-1 flex flex-col items-center justify-center py-6">
        
        {!submittedResult ? (
          /* Small Form: Name, Email, Phone */
          <div className="w-full space-y-6">
            <div className="text-center space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#e06d84] font-semibold block">
                PRE-REGISTER
              </span>
              <h1
                className={`text-3xl sm:text-4xl font-light tracking-tight transition-colors duration-300 ${
                  isDark ? 'text-white' : 'text-neutral-950'
                }`}
              >
                Priority Allocation
              </h1>
              <p
                className={`text-xs sm:text-sm font-light transition-colors duration-300 ${
                  isDark ? 'text-neutral-400' : 'text-neutral-600'
                }`}
              >
                Reserve your numbered piece from the 150-unit physical drop.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5 pt-2">
              <div>
                <label
                  className={`block text-[10px] font-mono uppercase tracking-widest mb-1.5 pl-1 transition-colors duration-300 ${
                    isDark ? 'text-neutral-400' : 'text-neutral-600'
                  }`}
                >
                  Your Name <span className="text-[#e06d84]">*</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Liam Vance"
                  disabled={isLoading}
                  className={`w-full border rounded-xl px-4 py-3 text-xs sm:text-sm font-sans tracking-wide focus:outline-none transition-all duration-200 disabled:opacity-50 ${
                    isDark
                      ? 'bg-white/[0.04] hover:bg-white/[0.06] focus:bg-white/[0.08] border-white/15 focus:border-[#851830] focus:ring-1 focus:ring-[#851830]/30 text-white placeholder:text-neutral-600'
                      : 'bg-black/[0.03] hover:bg-black/[0.05] focus:bg-black/[0.06] border-black/15 focus:border-[#851830] focus:ring-1 focus:ring-[#851830]/30 text-neutral-900 placeholder:text-neutral-400'
                  }`}
                  required
                />
              </div>

              <div>
                <label
                  className={`block text-[10px] font-mono uppercase tracking-widest mb-1.5 pl-1 transition-colors duration-300 ${
                    isDark ? 'text-neutral-400' : 'text-neutral-600'
                  }`}
                >
                  Email Address <span className="text-[#e06d84]">*</span>
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="e.g. liam@kolossal.in"
                  disabled={isLoading}
                  className={`w-full border rounded-xl px-4 py-3 text-xs sm:text-sm font-sans tracking-wide focus:outline-none transition-all duration-200 disabled:opacity-50 ${
                    isDark
                      ? 'bg-white/[0.04] hover:bg-white/[0.06] focus:bg-white/[0.08] border-white/15 focus:border-[#851830] focus:ring-1 focus:ring-[#851830]/30 text-white placeholder:text-neutral-600'
                      : 'bg-black/[0.03] hover:bg-black/[0.05] focus:bg-black/[0.06] border-black/15 focus:border-[#851830] focus:ring-1 focus:ring-[#851830]/30 text-neutral-900 placeholder:text-neutral-400'
                  }`}
                  required
                />
              </div>

              <div>
                <label
                  className={`block text-[10px] font-mono uppercase tracking-widest mb-1.5 pl-1 transition-colors duration-300 ${
                    isDark ? 'text-neutral-400' : 'text-neutral-600'
                  }`}
                >
                  Phone Number <span className="text-[#e06d84]">*</span>
                </label>
                <div className="flex items-center space-x-2">
                  <div
                    className={`flex items-center justify-center border rounded-xl px-3.5 py-3 text-xs sm:text-sm font-mono font-medium select-none transition-colors duration-300 ${
                      isDark
                        ? 'bg-white/[0.04] border-white/15 text-neutral-300'
                        : 'bg-black/[0.03] border-black/15 text-neutral-700'
                    }`}
                  >
                    +91
                  </div>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="98765 43210"
                    disabled={isLoading}
                    className={`flex-1 border rounded-xl px-4 py-3 text-xs sm:text-sm font-sans tracking-wide focus:outline-none transition-all duration-200 disabled:opacity-50 ${
                      isDark
                        ? 'bg-white/[0.04] hover:bg-white/[0.06] focus:bg-white/[0.08] border-white/15 focus:border-[#851830] focus:ring-1 focus:ring-[#851830]/30 text-white placeholder:text-neutral-600'
                        : 'bg-black/[0.03] hover:bg-black/[0.05] focus:bg-black/[0.06] border-black/15 focus:border-[#851830] focus:ring-1 focus:ring-[#851830]/30 text-neutral-900 placeholder:text-neutral-400'
                    }`}
                    required
                  />
                </div>
              </div>

              {errorMsg && (
                <p className="text-[11px] font-mono text-rose-400 text-center pt-1">
                  {errorMsg}
                </p>
              )}

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`group relative w-full flex items-center justify-center space-x-2 py-3.5 px-6 rounded-xl font-medium text-xs sm:text-sm uppercase tracking-[0.2em] transition-all duration-300 cursor-pointer disabled:opacity-50 active:scale-98 ${
                    isDark
                      ? 'bg-gradient-to-r from-neutral-100 via-white to-neutral-200 hover:from-white hover:to-neutral-100 text-neutral-950 shadow-lg hover:shadow-[0_0_25px_rgba(255,255,255,0.2)]'
                      : 'bg-[#580D1A] hover:bg-[#3A0811] text-white shadow-[0_4px_20px_rgba(88,13,26,0.25)] hover:shadow-[0_0_35px_rgba(88,13,26,0.4)]'
                  }`}
                >
                  {isLoading ? (
                    <span
                      className={`w-4 h-4 border-2 rounded-full animate-spin ${
                        isDark ? 'border-neutral-400 border-t-neutral-950' : 'border-white/40 border-t-white'
                      }`}
                    />
                  ) : (
                    <>
                      <span>Submit Reservation</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        ) : (
          /* ── Slide-Up Text Animation on Successful Submission ── */
          <div className="w-full text-center space-y-6 animate-[slideUp_0.75s_cubic-bezier(0.16,1,0.3,1)_forwards]">
            
            {/* Subtle icon badge */}
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full border border-[#851830]/40 bg-[#851830]/10 text-[#e06d84] mb-2">
              <Check className="w-5 h-5" />
            </div>

            {/* Heading Line with slide-up reveal */}
            <h2
              className={`text-3xl sm:text-5xl font-light tracking-tight leading-tight transition-colors duration-300 ${
                isDark ? 'text-white' : 'text-neutral-950'
              }`}
            >
              Allocation Confirmed.
            </h2>

            {/* Sub-heading Line */}
            <p
              className={`text-sm sm:text-base font-light max-w-sm mx-auto leading-relaxed transition-colors duration-300 ${
                isDark ? 'text-neutral-300' : 'text-neutral-700'
              }`}
            >
              Welcome to the inner circle, {submittedResult.name}. Your private access code and sizing window will be dispatched directly to you prior to the public release.
            </p>

            {/* Passcode snippet */}
            <div className="pt-3">
              <div
                className={`inline-flex items-center space-x-3 px-5 py-2.5 rounded-full border text-xs font-mono tracking-wider transition-colors duration-300 ${
                  isDark
                    ? 'bg-white/[0.05] border-white/10 text-neutral-300'
                    : 'bg-black/[0.05] border-black/10 text-neutral-800'
                }`}
              >
                <span className="text-neutral-500">QUEUE #{submittedResult.queueNumber}</span>
                <span className="text-neutral-600">·</span>
                <span
                  className={`font-semibold select-all ${
                    isDark ? 'text-white' : 'text-neutral-950'
                  }`}
                >
                  {submittedResult.vipCode}
                </span>
              </div>
            </div>

            <div className="pt-6">
              <Link
                href="/coming-soon"
                className={`inline-flex items-center space-x-2 text-xs font-mono uppercase tracking-[0.2em] transition-colors ${
                  isDark ? 'text-neutral-400 hover:text-white' : 'text-neutral-600 hover:text-neutral-950'
                }`}
              >
                <span>Return to Monolith</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        )}

      </main>

      {/* ── Minimal Bottom Provenance ── */}
      <footer className="relative z-10 w-full flex items-center justify-center max-w-5xl text-[10px] sm:text-[11px] font-mono tracking-widest text-neutral-500 uppercase">
        <span>CHANDIGARH, INDIA</span>
      </footer>

      {/* CSS keyframe for slide-up text animation */}
      <style jsx>{`
        @keyframes slideUp {
          0% {
            opacity: 0;
            transform: translateY(36px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

    </div>
  );
}
