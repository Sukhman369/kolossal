'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { ArrowRight, Check, Sparkles } from 'lucide-react';
import ComingSoon3DFallback from '../../components/coming-soon/ComingSoon3DFallback';

// Dynamic 3D Scene with SSR disabled for optimal Three.js client loading
const ComingSoon3DScene = dynamic(
  () => import('../../components/coming-soon/ComingSoon3DScene'),
  {
    ssr: false,
    loading: () => <ComingSoon3DFallback />,
  }
);

interface VipTicket {
  email: string;
  vipCode: string;
  queueNumber: number;
}

export default function ComingSoonPage() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [ticket, setTicket] = useState<VipTicket | null>(null);
  const [copied, setCopied] = useState(false);

  // Check localStorage for existing VIP reservation
  useEffect(() => {
    try {
      const saved = localStorage.getItem('kolossal_drop02_vip');
      if (saved) {
        setTicket(JSON.parse(saved));
      }
    } catch {
      // ignore
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!email || !email.includes('@') || !email.includes('.')) {
      setErrorMsg('Please provide a valid email address.');
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch('/api/coming-soon', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error || 'Failed to submit. Please try again.');
        setIsLoading(false);
        return;
      }

      const newTicket: VipTicket = {
        email: email.trim().toLowerCase(),
        vipCode: data.vipCode,
        queueNumber: data.queueNumber,
      };

      setTicket(newTicket);
      try {
        localStorage.setItem('kolossal_drop02_vip', JSON.stringify(newTicket));
      } catch {
        // ignore
      }
    } catch (err) {
      console.error(err);
      setErrorMsg('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyCode = () => {
    if (!ticket?.vipCode) return;
    navigator.clipboard.writeText(ticket.vipCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative w-screen min-h-screen h-[100dvh] bg-[#0A0A0A] text-[#FAFAFA] flex flex-col justify-between items-center p-6 sm:p-10 select-none overflow-hidden">
      
      {/* Subtle deep ambient glow behind 3D element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[800px] h-[600px] sm:h-[800px] bg-[#580D1A]/[0.12] rounded-full blur-[140px] pointer-events-none" />

      {/* ── Top Bar: Minimal Monogram ── */}
      <header className="relative z-10 w-full flex items-center justify-between max-w-5xl">
        <div className="flex items-center space-x-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#851830] animate-pulse" />
          <span className="text-[10px] sm:text-[11px] font-mono tracking-[0.3em] uppercase text-neutral-400">
            DROP 002 · PRE-RELEASE
          </span>
        </div>

        <div className="text-sm sm:text-base font-black tracking-[0.4em] uppercase text-neutral-200">
          KOLOSSAL
        </div>

        <div className="text-[10px] sm:text-[11px] font-mono tracking-widest uppercase text-neutral-500 hidden sm:block">
          500 GSM · CHANDIGARH
        </div>
      </header>

      {/* ── Center Stage: 3D Monolith Model ── */}
      <main className="relative z-10 w-full max-w-4xl flex-1 flex flex-col items-center justify-center -my-2 sm:my-0">
        
        {/* The 3D Scene */}
        <div className="w-full h-[280px] sm:h-[380px] md:h-[440px] lg:h-[480px] flex items-center justify-center">
          <ComingSoon3DScene />
        </div>

        {/* Minimal Editorial Content */}
        <div className="text-center space-y-3 max-w-md px-4 mt-1 sm:mt-3">
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-light tracking-tight text-white leading-tight">
            Heavyweight Form.
          </h1>
          <p className="text-xs sm:text-sm font-light text-neutral-400 leading-relaxed">
            Custom-milled 500 GSM organic cotton in architectural proportions. Strictly 150 individually numbered garments.
          </p>
        </div>

        {/* Minimalist Email Input or Confirmed Ticket */}
        <div className="w-full max-w-md px-4 mt-6">
          {!ticket ? (
            <form onSubmit={handleSubmit} className="space-y-2">
              <div className="relative flex items-center bg-white/[0.05] hover:bg-white/[0.08] focus-within:bg-white/[0.08] border border-white/15 focus-within:border-[#851830] rounded-full p-1.5 backdrop-blur-xl transition-all duration-300">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  disabled={isLoading}
                  className="flex-1 bg-transparent px-4 sm:px-5 py-2.5 text-xs sm:text-sm font-sans tracking-wide text-white placeholder:text-neutral-500 focus:outline-none disabled:opacity-50"
                  required
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  className="group flex items-center space-x-1.5 px-5 sm:px-6 py-2.5 bg-neutral-100 hover:bg-white text-neutral-950 font-medium text-[11px] sm:text-xs uppercase tracking-wider rounded-full transition-all duration-200 active:scale-95 disabled:opacity-50 cursor-pointer shadow-md"
                >
                  {isLoading ? (
                    <span className="w-3.5 h-3.5 border-2 border-neutral-400 border-t-neutral-900 rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>Join</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                    </>
                  )}
                </button>
              </div>

              {errorMsg && (
                <p className="text-[11px] font-mono text-rose-400 text-center pt-1">
                  {errorMsg}
                </p>
              )}
            </form>
          ) : (
            /* Confirmed Status */
            <div className="flex flex-col items-center space-y-2 bg-white/[0.04] border border-[#851830]/40 rounded-2xl p-4 sm:p-5 backdrop-blur-xl animate-in fade-in duration-300">
              <div className="flex items-center space-x-1.5 text-xs font-mono text-[#e06d84] uppercase tracking-widest">
                <Check className="w-3.5 h-3.5" />
                <span>Allocation Reserved · Queue #{ticket.queueNumber}</span>
              </div>
              
              <div className="flex items-center space-x-3 pt-1">
                <code className="text-xs sm:text-sm font-mono tracking-wider text-neutral-300 select-all">
                  {ticket.vipCode}
                </code>
                <button
                  onClick={handleCopyCode}
                  className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 hover:text-white underline underline-offset-4 cursor-pointer"
                >
                  {copied ? 'Copied' : 'Copy Code'}
                </button>
              </div>

              <p className="text-[10px] font-mono text-neutral-500 pt-1">
                Private drop access link will be dispatched to {ticket.email}
              </p>
            </div>
          )}
        </div>

      </main>

      {/* ── Minimal Bottom Provenance ── */}
      <footer className="relative z-10 w-full flex items-center justify-between max-w-5xl text-[10px] sm:text-[11px] font-mono tracking-widest text-neutral-600 uppercase">
        <span>30.7333° N, 76.7794° E</span>
        <span className="text-neutral-500">CHANDIGARH, INDIA</span>
        <span>EDITION OF 150</span>
      </footer>

    </div>
  );
}
