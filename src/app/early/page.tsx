'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Check, ArrowRight, Sparkles } from 'lucide-react';

interface SubmissionResult {
  name: string;
  vipCode: string;
  queueNumber: number;
}

export default function EarlyAccessPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [submittedResult, setSubmittedResult] = useState<SubmissionResult | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!formData.name.trim()) {
      setErrorMsg('Please enter your full name.');
      return;
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }
    if (!formData.phone.trim()) {
      setErrorMsg('Please enter your contact phone number.');
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch('/api/early', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
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
    <div className="relative w-screen min-h-screen h-[100dvh] bg-[#0A0A0A] text-[#FAFAFA] flex flex-col justify-between items-center p-6 sm:p-10 select-none overflow-hidden">
      
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] sm:w-[850px] h-[650px] sm:h-[850px] bg-[#580D1A]/[0.12] rounded-full blur-[160px] pointer-events-none" />

      {/* ── Top Header ── */}
      <header className="relative z-10 w-full flex items-center justify-between max-w-5xl">
        <Link
          href="/coming-soon"
          className="group flex items-center space-x-1.5 text-[10px] sm:text-[11px] font-mono tracking-widest uppercase text-neutral-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5" />
          <span>BACK</span>
        </Link>

        <div className="text-sm sm:text-base font-black tracking-[0.4em] uppercase text-neutral-200">
          KOLOSSAL
        </div>

        <div className="text-[10px] sm:text-[11px] font-mono tracking-widest uppercase text-neutral-500">
          DROP 002
        </div>
      </header>

      {/* ── Center Content Area ── */}
      <main className="relative z-10 w-full max-w-md mx-auto flex-1 flex flex-col items-center justify-center py-6">
        
        {!submittedResult ? (
          /* Small Form: Name, Email, Phone */
          <div className="w-full space-y-6">
            <div className="text-center space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#e06d84] font-semibold block">
                PRIORITY ALLOCATION
              </span>
              <h1 className="text-3xl sm:text-4xl font-light tracking-tight text-white">
                Pre-Register
              </h1>
              <p className="text-xs sm:text-sm font-light text-neutral-400">
                Reserve your numbered piece from the 150-unit physical drop.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5 pt-2">
              <div>
                <label className="block text-[10px] font-mono uppercase tracking-widest text-neutral-400 mb-1.5 pl-1">
                  Your Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Liam Vance"
                  disabled={isLoading}
                  className="w-full bg-white/[0.04] hover:bg-white/[0.06] focus:bg-white/[0.08] border border-white/15 focus:border-[#851830] focus:ring-1 focus:ring-[#851830]/30 rounded-xl px-4 py-3 text-xs sm:text-sm font-sans tracking-wide text-white placeholder:text-neutral-600 focus:outline-none transition-all duration-200 disabled:opacity-50"
                  required
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase tracking-widest text-neutral-400 mb-1.5 pl-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="e.g. liam@kolossal.in"
                  disabled={isLoading}
                  className="w-full bg-white/[0.04] hover:bg-white/[0.06] focus:bg-white/[0.08] border border-white/15 focus:border-[#851830] focus:ring-1 focus:ring-[#851830]/30 rounded-xl px-4 py-3 text-xs sm:text-sm font-sans tracking-wide text-white placeholder:text-neutral-600 focus:outline-none transition-all duration-200 disabled:opacity-50"
                  required
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase tracking-widest text-neutral-400 mb-1.5 pl-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="e.g. +91 98765 43210"
                  disabled={isLoading}
                  className="w-full bg-white/[0.04] hover:bg-white/[0.06] focus:bg-white/[0.08] border border-white/15 focus:border-[#851830] focus:ring-1 focus:ring-[#851830]/30 rounded-xl px-4 py-3 text-xs sm:text-sm font-sans tracking-wide text-white placeholder:text-neutral-600 focus:outline-none transition-all duration-200 disabled:opacity-50"
                  required
                />
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
                  className="group relative w-full flex items-center justify-center space-x-2 py-3.5 px-6 rounded-xl bg-gradient-to-r from-neutral-100 via-white to-neutral-200 hover:from-white hover:to-neutral-100 text-neutral-950 font-medium text-xs sm:text-sm uppercase tracking-[0.2em] shadow-lg hover:shadow-[0_0_25px_rgba(255,255,255,0.2)] active:scale-98 transition-all duration-200 cursor-pointer disabled:opacity-50"
                >
                  {isLoading ? (
                    <span className="w-4 h-4 border-2 border-neutral-400 border-t-neutral-950 rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>Submit Reservation</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </button>
              </div>

              <p className="text-[10px] font-mono text-neutral-500 text-center pt-2">
                Private SMS & email confirmation sent upon submission.
              </p>
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
            <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-white leading-tight">
              Allocation Confirmed.
            </h2>

            {/* Sub-heading Line */}
            <p className="text-sm sm:text-base font-light text-neutral-300 max-w-sm mx-auto leading-relaxed">
              Welcome to the inner circle, {submittedResult.name}. Your private access code and sizing window will be dispatched directly to you prior to the public release.
            </p>

            {/* Passcode snippet */}
            <div className="pt-3">
              <div className="inline-flex items-center space-x-3 px-5 py-2.5 rounded-full bg-white/[0.05] border border-white/10 text-xs font-mono tracking-wider text-neutral-300">
                <span className="text-neutral-500">QUEUE #{submittedResult.queueNumber}</span>
                <span className="text-neutral-600">·</span>
                <span className="text-white font-semibold select-all">{submittedResult.vipCode}</span>
              </div>
            </div>

            <div className="pt-6">
              <Link
                href="/coming-soon"
                className="inline-flex items-center space-x-2 text-xs font-mono uppercase tracking-[0.2em] text-neutral-400 hover:text-white transition-colors"
              >
                <span>Return to Monolith</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        )}

      </main>

      {/* ── Minimal Bottom Provenance ── */}
      <footer className="relative z-10 w-full flex items-center justify-between max-w-5xl text-[10px] sm:text-[11px] font-mono tracking-widest text-neutral-600 uppercase">
        <span>30.7333° N, 76.7794° E</span>
        <span className="text-neutral-500">CHANDIGARH, INDIA</span>
        <span>EDITION OF 150</span>
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
