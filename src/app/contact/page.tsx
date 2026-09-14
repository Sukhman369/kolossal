'use client';

import React, { useState } from 'react';
import { Mail, Clock, MapPin, CheckCircle2, ArrowRight } from 'lucide-react';

export default function ContactPage() {
  const [topic, setTopic] = useState('Order & Allocation');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const topics = ['Order & Allocation', 'Sizing Guidance', 'Press & Styling', 'Hardware Warranty'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && email && message) {
      setSubmitted(true);
    }
  };

  return (
    <div className="pt-28 pb-24 px-6 lg:px-12 max-w-6xl mx-auto space-y-16">
      {/* Header */}
      <div className="border-b border-white/[0.08] pb-8 space-y-3">
        <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-neutral-500">
          DIRECT LINE
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white">
          CLIENT CONCIERGE
        </h1>
        <p className="text-xs sm:text-sm font-light text-neutral-400 max-w-xl leading-relaxed">
          Our client advisory team operates across Tokyo and Milan. Inquiries are reviewed and answered within 12 business hours.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Contact Form (7 cols) */}
        <div className="lg:col-span-7">
          {submitted ? (
            <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/10 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold uppercase tracking-wider text-white">
                Inquiry Logged
              </h3>
              <p className="text-xs font-mono text-neutral-400 max-w-sm mx-auto leading-relaxed">
                Thank you, {name}. A dedicated advisor will review your message regarding {topic} and follow up at {email}.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="px-6 py-2.5 border border-white/20 text-xs font-mono uppercase tracking-wider text-white rounded-full hover:bg-white/10 transition-colors"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Topic chips */}
              <div className="space-y-3">
                <label className="text-xs font-mono uppercase tracking-wider text-neutral-400 block">
                  Inquiry Nature
                </label>
                <div className="flex flex-wrap gap-2">
                  {topics.map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setTopic(t)}
                      className={`px-4 py-2 rounded-lg text-xs font-mono tracking-wider uppercase border transition-colors ${
                        topic === t
                          ? 'border-white bg-white text-black font-semibold'
                          : 'border-white/15 bg-white/[0.02] text-neutral-400 hover:border-white/30'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-mono uppercase tracking-wider text-neutral-400">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="ALEXANDER VANCE"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-white/[0.03] border border-white/15 px-4 py-3 rounded-xl text-xs font-mono text-white placeholder:text-neutral-600 focus:outline-none focus:border-white/40"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-mono uppercase tracking-wider text-neutral-400">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="VANCE@DOMAIN.COM"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white/[0.03] border border-white/15 px-4 py-3 rounded-xl text-xs font-mono text-white placeholder:text-neutral-600 focus:outline-none focus:border-white/40"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-mono uppercase tracking-wider text-neutral-400">
                  Message / Order Reference
                </label>
                <textarea
                  required
                  rows={5}
                  placeholder="SPECIFY GARMENT REFERENCE OR SIZING QUESTION..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-white/[0.03] border border-white/15 p-4 rounded-xl text-xs font-mono text-white placeholder:text-neutral-600 focus:outline-none focus:border-white/40 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-white text-black font-semibold text-xs uppercase tracking-[0.2em] rounded-full hover:bg-neutral-200 transition-colors flex items-center justify-center space-x-2 shadow-[0_0_25px_rgba(255,255,255,0.15)]"
              >
                <span>Transmit Inquiry</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>

        {/* Advisory Details Sidebar (5 cols) */}
        <div className="lg:col-span-5 space-y-8 rounded-2xl border border-white/10 bg-[#0c0c0c] p-6 lg:p-8">
          <div className="space-y-3">
            <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500">
              CONCIERGE DESK
            </span>
            <h3 className="text-lg font-bold uppercase tracking-wider text-white">
              Studio Locations
            </h3>
          </div>

          <div className="space-y-6 text-xs font-mono text-neutral-400">
            <div className="flex items-start space-x-3 pb-4 border-b border-white/[0.06]">
              <MapPin className="w-4 h-4 text-white flex-shrink-0 mt-0.5" />
              <div>
                <span className="text-white font-semibold block">Tokyo Pattern Studio</span>
                <span>Minato-ku, Aoyama 4-Chome, Tokyo 107-0062</span>
              </div>
            </div>

            <div className="flex items-start space-x-3 pb-4 border-b border-white/[0.06]">
              <MapPin className="w-4 h-4 text-white flex-shrink-0 mt-0.5" />
              <div>
                <span className="text-white font-semibold block">Milan Logistics & Archive</span>
                <span>Via Monte Napoleone 8, 20121 Milano, Italy</span>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Clock className="w-4 h-4 text-white flex-shrink-0 mt-0.5" />
              <div>
                <span className="text-white font-semibold block">Operating Clock</span>
                <span>Mon – Fri &bull; 08:00 – 20:00 JST / CET</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
