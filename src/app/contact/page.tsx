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
    <div className="pt-36 pb-36 px-6 lg:px-12 max-w-6xl mx-auto space-y-16">
      {/* Header */}
      <div className="border-b border-neutral-200/80 pb-10 space-y-3">
        <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#580D1A] font-semibold">
          DIRECT LINE
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-neutral-950">
          CLIENT CONCIERGE
        </h1>
        <p className="text-xs sm:text-sm font-light text-neutral-600 max-w-xl leading-relaxed">
          Our client advisory team operates across Tokyo and Milan. Inquiries are reviewed and answered within 12 business hours.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Contact Form (7 cols) */}
        <div className="lg:col-span-7">
          {submitted ? (
            <div className="p-10 rounded-2xl bg-white border border-neutral-200 text-center space-y-5 shadow-lg">
              <div className="w-14 h-14 rounded-full bg-[#580D1A]/10 text-[#580D1A] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-bold uppercase tracking-wider text-neutral-950">
                Inquiry Logged
              </h3>
              <p className="text-xs font-mono text-neutral-600 max-w-sm mx-auto leading-relaxed">
                Thank you, {name}. A dedicated advisor will review your message regarding {topic} and follow up at {email}.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="px-6 py-2.5 border border-[#580D1A] text-xs font-mono uppercase tracking-wider text-[#580D1A] rounded-full hover:bg-[#580D1A] hover:text-white transition-colors font-medium"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Topic chips */}
              <div className="space-y-3">
                <label className="text-xs font-mono uppercase tracking-wider text-neutral-700 block font-medium">
                  Inquiry Nature
                </label>
                <div className="flex flex-wrap gap-2.5">
                  {topics.map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setTopic(t)}
                      className={`px-4 py-2 rounded-xl text-xs font-mono tracking-wider uppercase border transition-all ${
                        topic === t
                          ? 'border-[#580D1A] bg-[#580D1A] text-white font-semibold shadow-xs'
                          : 'border-neutral-200 bg-white text-neutral-700 hover:border-[#580D1A]/40'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-mono uppercase tracking-wider text-neutral-700 font-medium">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="ALEXANDER VANCE"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-white border border-neutral-300 px-4 py-3 rounded-xl text-xs font-mono text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-[#580D1A]"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-mono uppercase tracking-wider text-neutral-700 font-medium">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="VANCE@DOMAIN.COM"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white border border-neutral-300 px-4 py-3 rounded-xl text-xs font-mono text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-[#580D1A]"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-mono uppercase tracking-wider text-neutral-700 font-medium">
                  Message / Order Reference
                </label>
                <textarea
                  required
                  rows={5}
                  placeholder="SPECIFY GARMENT REFERENCE OR SIZING QUESTION..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-white border border-neutral-300 p-4 rounded-xl text-xs font-mono text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-[#580D1A] resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-[#580D1A] text-white font-semibold text-xs uppercase tracking-[0.2em] rounded-full hover:bg-[#430913] transition-colors flex items-center justify-center space-x-2 shadow-md hover:shadow-lg"
              >
                <span>Transmit Inquiry</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>

        {/* Advisory Details Sidebar (5 cols) */}
        <div className="lg:col-span-5 space-y-8 rounded-2xl border border-neutral-200 bg-white p-7 lg:p-9 shadow-lg">
          <div className="space-y-2">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#580D1A] font-semibold">
              CONCIERGE DESK
            </span>
            <h3 className="text-lg font-bold uppercase tracking-wider text-neutral-950">
              Studio Locations
            </h3>
          </div>

          <div className="space-y-6 text-xs font-mono text-neutral-600">
            <div className="flex items-start space-x-3 pb-5 border-b border-neutral-200">
              <MapPin className="w-4 h-4 text-[#580D1A] flex-shrink-0 mt-0.5" />
              <div>
                <span className="text-neutral-950 font-semibold block">Tokyo Pattern Studio</span>
                <span>Minato-ku, Aoyama 4-Chome, Tokyo 107-0062</span>
              </div>
            </div>

            <div className="flex items-start space-x-3 pb-5 border-b border-neutral-200">
              <MapPin className="w-4 h-4 text-[#580D1A] flex-shrink-0 mt-0.5" />
              <div>
                <span className="text-neutral-950 font-semibold block">Milan Logistics & Archive</span>
                <span>Via Monte Napoleone 8, 20121 Milano, Italy</span>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Clock className="w-4 h-4 text-[#580D1A] flex-shrink-0 mt-0.5" />
              <div>
                <span className="text-neutral-950 font-semibold block">Operating Clock</span>
                <span>Mon – Fri &bull; 08:00 – 20:00 JST / CET</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
