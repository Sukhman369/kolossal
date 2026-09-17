'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import {
  ArrowRight,
  Check,
  Copy,
  Clock,
  Sparkles,
  ShieldCheck,
  Share2,
  Mail,
  RotateCcw,
} from 'lucide-react';
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

  // Target countdown: Set to 18 days from now for realistic drop momentum
  const [timeLeft, setTimeLeft] = useState({
    days: 18,
    hours: 14,
    minutes: 32,
    seconds: 45,
  });

  // Check localStorage on mount for existing VIP reservation
  useEffect(() => {
    try {
      const saved = localStorage.getItem('kolossal_drop02_vip');
      if (saved) {
        setTicket(JSON.parse(saved));
      }
    } catch {
      // ignore localStorage errors
    }
  }, []);

  // Countdown timer interval
  useEffect(() => {
    // Fixed target date: 18 days from launch initialization
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 18);
    targetDate.setHours(targetDate.getHours() + 6);

    const updateTimer = () => {
      const now = new Date().getTime();
      const diff = targetDate.getTime() - now;

      if (diff > 0) {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((diff % (1000 * 60)) / 1000),
        });
      }
    };

    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!email || !email.includes('@') || !email.includes('.')) {
      setErrorMsg('Please enter a valid email address.');
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
        setErrorMsg(data.error || 'Failed to register. Please try again.');
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
      setErrorMsg('Network error. Please check your connection and retry.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyCode = () => {
    if (!ticket?.vipCode) return;
    navigator.clipboard.writeText(ticket.vipCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const handleResetForm = () => {
    try {
      localStorage.removeItem('kolossal_drop02_vip');
    } catch {
      // ignore
    }
    setTicket(null);
    setEmail('');
    setErrorMsg('');
  };

  return (
    <div className="relative min-h-screen bg-[#FAF9F7] text-neutral-950 pt-28 sm:pt-36 pb-20 overflow-hidden">
      {/* Background architectural grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000006_1px,transparent_1px),linear-gradient(to_bottom,#00000006_1px,transparent_1px)] bg-[size:4.5rem_4.5rem] pointer-events-none" />

      {/* Atmospheric ambient deep maroon backlight aura */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#580D1A]/[0.06] rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        
        {/* Header Breadcrumb / Phase Label */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-neutral-200/80">
          <div className="flex items-center space-x-3">
            <span className="w-2 h-2 rounded-full bg-[#580D1A] animate-pulse" />
            <span className="text-[10px] sm:text-xs font-mono tracking-[0.25em] uppercase text-[#580D1A] font-semibold">
              KOLOSSAL ARCHIVE · DROP 02 PRE-RELEASE
            </span>
          </div>
          <div className="text-[10px] sm:text-xs font-mono tracking-widest text-neutral-500 uppercase">
            CHANDIGARH ATELIER · 500 GSM FORM
          </div>
        </div>

        {/* ── Main Two-Column Stage ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center pt-10 sm:pt-14 pb-12">
          
          {/* Left Column: Headline, Countdown & Submission */}
          <div className="lg:col-span-6 space-y-8 sm:space-y-10">
            
            {/* Monolithic Typography */}
            <div className="space-y-3 sm:space-y-4">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-[#580D1A]/20 bg-[#580D1A]/[0.04]">
                <Sparkles className="w-3.5 h-3.5 text-[#580D1A]" />
                <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-[#580D1A] font-semibold">
                  Private Allocation Waitlist
                </span>
              </div>

              <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tighter uppercase text-neutral-950 leading-[0.92]">
                DROP 002<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#580D1A] via-[#851830] to-neutral-900">
                  MONOLITH
                </span><br />
                COMING SOON.
              </h1>

              <p className="text-neutral-600 text-xs sm:text-sm md:text-base font-light tracking-wide leading-relaxed max-w-lg">
                The next evolutionary chapter in architectural brutalist streetwear. Engineered with proprietary double-faced 500 GSM organic loopback cotton, raw-edge structural seams, and laser-carved titanium accents. Strictly 150 individually numbered garments.
              </p>
            </div>

            {/* Live Drop Countdown Ticker */}
            <div className="p-5 sm:p-6 rounded-2xl bg-white/70 backdrop-blur-md border border-neutral-200/90 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#580D1A]" />
                  Official Drop Countdown
                </span>
                <span className="text-[9px] font-mono uppercase tracking-widest px-2 py-0.5 rounded bg-[#580D1A]/10 text-[#580D1A] font-semibold">
                  Tricity Standard Time
                </span>
              </div>

              <div className="grid grid-cols-4 gap-2 sm:gap-4 text-center">
                <div className="p-3 bg-neutral-100/60 rounded-xl border border-neutral-200/50">
                  <div className="text-2xl sm:text-3xl font-black font-mono text-neutral-950">
                    {String(timeLeft.days).padStart(2, '0')}
                  </div>
                  <div className="text-[9px] font-mono uppercase tracking-widest text-neutral-500 mt-0.5">
                    Days
                  </div>
                </div>

                <div className="p-3 bg-neutral-100/60 rounded-xl border border-neutral-200/50">
                  <div className="text-2xl sm:text-3xl font-black font-mono text-neutral-950">
                    {String(timeLeft.hours).padStart(2, '0')}
                  </div>
                  <div className="text-[9px] font-mono uppercase tracking-widest text-neutral-500 mt-0.5">
                    Hours
                  </div>
                </div>

                <div className="p-3 bg-neutral-100/60 rounded-xl border border-neutral-200/50">
                  <div className="text-2xl sm:text-3xl font-black font-mono text-[#580D1A]">
                    {String(timeLeft.minutes).padStart(2, '0')}
                  </div>
                  <div className="text-[9px] font-mono uppercase tracking-widest text-neutral-500 mt-0.5">
                    Mins
                  </div>
                </div>

                <div className="p-3 bg-neutral-100/60 rounded-xl border border-neutral-200/50">
                  <div className="text-2xl sm:text-3xl font-black font-mono text-neutral-950">
                    {String(timeLeft.seconds).padStart(2, '0')}
                  </div>
                  <div className="text-[9px] font-mono uppercase tracking-widest text-neutral-500 mt-0.5">
                    Secs
                  </div>
                </div>
              </div>
            </div>

            {/* Email Submission Form OR Confirmed VIP Ticket */}
            {!ticket ? (
              <div className="space-y-4">
                <form onSubmit={handleSubmit} className="space-y-3">
                  <label htmlFor="email-input" className="block text-[11px] font-mono uppercase tracking-widest text-neutral-700 font-semibold">
                    Reserve Priority Allocation · Zero Spam Guarantee
                  </label>
                  
                  <div className="relative flex flex-col sm:flex-row items-stretch gap-2.5">
                    <div className="relative flex-1">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" />
                      <input
                        id="email-input"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="ENTER YOUR DIRECT EMAIL"
                        disabled={isLoading}
                        className="w-full pl-11 pr-4 py-3.5 sm:py-4 bg-white/90 border border-neutral-300 rounded-xl text-xs sm:text-sm font-mono tracking-wider text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-[#580D1A] focus:ring-2 focus:ring-[#580D1A]/10 transition-all duration-200 disabled:opacity-60 shadow-sm"
                        required
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="inline-flex items-center justify-center space-x-2.5 px-7 py-3.5 sm:py-4 bg-[#580D1A] text-white font-semibold text-xs uppercase tracking-[0.2em] rounded-xl transition-all duration-300 hover:bg-[#3E0711] hover:shadow-[0_8px_25px_rgba(88,13,26,0.3)] active:scale-95 disabled:opacity-60 cursor-pointer text-center"
                    >
                      {isLoading ? (
                        <>
                          <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>Securing...</span>
                        </>
                      ) : (
                        <>
                          <span>Request VIP Pass</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>

                  {errorMsg && (
                    <p className="text-xs font-mono text-red-600 bg-red-50 border border-red-200 p-2.5 rounded-lg">
                      {errorMsg}
                    </p>
                  )}
                </form>

                {/* Subtext guarantees */}
                <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-1 text-[10px] font-mono text-neutral-500 uppercase tracking-wider">
                  <div className="flex items-center space-x-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#580D1A]" />
                    <span>2-Hour Private Window</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <Check className="w-3.5 h-3.5 text-[#580D1A]" />
                    <span>Size Allocation Lock</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <Check className="w-3.5 h-3.5 text-[#580D1A]" />
                    <span>1-Click Unsubscribe</span>
                  </div>
                </div>
              </div>
            ) : (
              /* VIP Confirmed Ticket Display */
              <div className="p-6 sm:p-7 rounded-2xl bg-white border-2 border-[#580D1A]/30 shadow-xl space-y-6 relative overflow-hidden animate-in fade-in duration-500">
                {/* Decorative background watermark */}
                <div className="absolute -right-8 -bottom-8 text-9xl font-black text-neutral-100 select-none pointer-events-none">
                  02
                </div>

                <div className="flex items-start justify-between relative z-10">
                  <div className="space-y-1">
                    <div className="inline-flex items-center space-x-1.5 text-xs font-mono font-bold text-[#580D1A] uppercase tracking-widest bg-[#580D1A]/10 px-2.5 py-1 rounded-md">
                      <Check className="w-3.5 h-3.5" />
                      <span>VIP Allocation Confirmed</span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-black tracking-tight text-neutral-950 uppercase pt-2">
                      Queue Position: #{ticket.queueNumber}
                    </h3>
                    <p className="text-xs text-neutral-600 font-mono">
                      Registered to: <span className="font-semibold text-neutral-900">{ticket.email}</span>
                    </p>
                  </div>

                  <button
                    onClick={handleResetForm}
                    title="Register different email"
                    className="p-1.5 text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 rounded-lg transition-colors"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </div>

                {/* Secret VIP Code Box */}
                <div className="p-4 bg-neutral-900 rounded-xl text-white space-y-2 relative z-10">
                  <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-widest text-neutral-400">
                    <span>Priority Access Passcode</span>
                    <span>Single-Use Pass</span>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <code className="text-sm sm:text-base font-mono font-bold tracking-wider text-[#FAF9F7] select-all">
                      {ticket.vipCode}
                    </code>
                    <button
                      onClick={handleCopyCode}
                      className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/20 active:bg-white/30 text-white text-xs font-mono uppercase tracking-wider rounded-lg transition-all"
                    >
                      {copied ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span className="text-emerald-400">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* VIP Perks */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 border-t border-neutral-200/80 text-xs font-mono relative z-10">
                  <div className="flex items-center space-x-2 text-neutral-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#580D1A]" />
                    <span>Private Early Access Door</span>
                  </div>
                  <div className="flex items-center space-x-2 text-neutral-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#580D1A]" />
                    <span>Numbered Edition Certificate</span>
                  </div>
                  <div className="flex items-center space-x-2 text-neutral-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#580D1A]" />
                    <span>Tricity Same-Day Delivery</span>
                  </div>
                  <div className="flex items-center space-x-2 text-neutral-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#580D1A]" />
                    <span>Direct Concierge SMS Alert</span>
                  </div>
                </div>

                {/* Social Share / WhatsApp Button */}
                <div className="pt-2 flex flex-col sm:flex-row items-center gap-3 relative z-10">
                  <a
                    href={`https://wa.me/?text=${encodeURIComponent(
                      `I just secured VIP Access #${ticket.queueNumber} for KOLOSSAL Drop 002 (500 GSM Heavyweight Streetwear). Join the private drop: https://kolossal.in/coming-soon`
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full sm:w-auto flex-1 inline-flex items-center justify-center space-x-2 px-4 py-2.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-mono uppercase tracking-wider rounded-xl transition-all"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span>Share With Fellow Collectors</span>
                  </a>
                </div>
              </div>
            )}

          </div>

          {/* Right Column: Interactive 3D Monolith Emblem Decoration */}
          <div className="lg:col-span-6 relative flex flex-col items-center justify-center">
            
            {/* Architectural decorative framing */}
            <div className="relative w-full rounded-3xl border border-neutral-200/90 bg-gradient-to-b from-white/90 via-white/50 to-neutral-50/80 backdrop-blur-md p-4 sm:p-6 shadow-xl">
              
              {/* Frame technical headers */}
              <div className="flex items-center justify-between pb-3 border-b border-neutral-200/80 text-[9px] sm:text-[10px] font-mono tracking-widest uppercase text-neutral-500">
                <div className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#580D1A]" />
                  <span className="font-semibold text-neutral-800">EMBLEM: THE MONOLITH</span>
                </div>
                <span>ROTATIONAL AXIS · 3D WEBGL</span>
              </div>

              {/* 3D Canvas Scene */}
              <div className="relative">
                <ComingSoon3DScene className="relative w-full h-[360px] sm:h-[420px] md:h-[480px] lg:h-[520px] flex items-center justify-center cursor-grab active:cursor-grabbing select-none" />
              </div>

              {/* Frame technical footer */}
              <div className="grid grid-cols-3 gap-2 pt-3 border-t border-neutral-200/80 text-center">
                <div>
                  <span className="block text-[8px] sm:text-[9px] font-mono uppercase text-neutral-400">FINISH</span>
                  <span className="block text-[10px] sm:text-xs font-mono font-bold text-neutral-900">LIQUID CHROME</span>
                </div>
                <div>
                  <span className="block text-[8px] sm:text-[9px] font-mono uppercase text-neutral-400">ORBITAL</span>
                  <span className="block text-[10px] sm:text-xs font-mono font-bold text-[#580D1A]">TITANIUM</span>
                </div>
                <div>
                  <span className="block text-[8px] sm:text-[9px] font-mono uppercase text-neutral-400">STUDIO LIGHT</span>
                  <span className="block text-[10px] sm:text-xs font-mono font-bold text-neutral-900">MAROON AURA</span>
                </div>
              </div>
            </div>

            {/* Quick interactive hint badge */}
            <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-400 mt-4 text-center">
              [ Drag to inspect 3D geometry in 360° space ]
            </p>
          </div>

        </div>

        {/* ── Architectural Capsule Specifications Grid ── */}
        <div className="pt-12 sm:pt-16 border-t border-neutral-200/80 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#580D1A] font-semibold block">
                TECHNICAL DOSSIER
              </span>
              <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-neutral-950">
                DROP 002 Capsule Specifications
              </h2>
            </div>
            <span className="text-xs font-mono text-neutral-500">
              STRICT ARCHITECTURAL TOLERANCE · ZERO SYNTHETICS
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <div className="p-5 rounded-2xl bg-white/80 border border-neutral-200/80 space-y-2 hover:border-[#580D1A]/40 transition-colors">
              <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 block">
                01 / MATERIAL WEIGHT
              </span>
              <div className="text-xl font-bold font-mono text-[#580D1A]">
                500 GSM Double-Faced
              </div>
              <p className="text-xs text-neutral-600 leading-relaxed font-sans">
                Dense organic cotton with tactile French Terry interior, pre-shrunk and stone-washed for sculptured drape.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/80 border border-neutral-200/80 space-y-2 hover:border-[#580D1A]/40 transition-colors">
              <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 block">
                02 / ARCHIVAL EDITION
              </span>
              <div className="text-xl font-bold font-mono text-neutral-900">
                150 Units Total
              </div>
              <p className="text-xs text-neutral-600 leading-relaxed font-sans">
                Each piece features laser-numbered interior neck labels and an archival physical authentication certificate.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/80 border border-neutral-200/80 space-y-2 hover:border-[#580D1A]/40 transition-colors">
              <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 block">
                03 / HARDWARE & DETAILS
              </span>
              <div className="text-xl font-bold font-mono text-neutral-900">
                Titanium Hardware
              </div>
              <p className="text-xs text-neutral-600 leading-relaxed font-sans">
                Cast industrial zinc pulls, reinforced bar-tack joints, and clean raw-edge hems that soften with age.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/80 border border-neutral-200/80 space-y-2 hover:border-[#580D1A]/40 transition-colors">
              <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 block">
                04 / PROVENANCE
              </span>
              <div className="text-xl font-bold font-mono text-neutral-900">
                Chandigarh, India
              </div>
              <p className="text-xs text-neutral-600 leading-relaxed font-sans">
                Sampled, patterned, cut, and stitched in Phase 1 Industrial Area, Chandigarh. Hand-finished before dispatch.
              </p>
            </div>
          </div>
        </div>

        {/* ── Bottom Action Links ── */}
        <div className="mt-14 sm:mt-20 p-8 sm:p-10 rounded-3xl bg-neutral-900 text-white flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-neutral-400">
              CANNOT WAIT FOR DROP 02?
            </span>
            <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight">
              Explore Available Garments in Drop 001
            </h3>
            <p className="text-xs text-neutral-400 max-w-md">
              Limited remaining quantities of our signature boxy heavyweights and architectural cargos are shipping worldwide.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
            <Link
              href="/collections"
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-7 py-3.5 bg-white text-neutral-950 hover:bg-[#FAF9F7] text-xs font-semibold uppercase tracking-[0.2em] rounded-full transition-all duration-300 text-center"
            >
              <span>Shop Drop 001</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/lookbook"
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-7 py-3.5 border border-white/30 text-white hover:bg-white/10 text-xs font-medium uppercase tracking-[0.2em] rounded-full transition-all duration-300 text-center"
            >
              <span>View Lookbook</span>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
