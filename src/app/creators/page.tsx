'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  Gift,
  Tag,
  DollarSign,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Lock,
  ChevronRight,
} from 'lucide-react';

function InstagramIcon({ className = 'w-3.5 h-3.5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function YoutubeIcon({ className = 'w-3.5 h-3.5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
      <polygon points="10 15 15 12 10 9 10 15" fill="currentColor" stroke="none" />
    </svg>
  );
}

function FacebookIcon({ className = 'w-3.5 h-3.5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function LinkedinIcon({ className = 'w-3.5 h-3.5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

interface FormState {
  name: string;
  email: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  seedingSize: string;
  customCode: string;
  instagram: string;
  youtube: string;
  facebook: string;
  linkedin: string;
  portfolioUrl: string;
  note: string;
}

const INITIAL_FORM: FormState = {
  name: '',
  email: '',
  phone: '',
  street: '',
  city: '',
  state: '',
  postalCode: '',
  country: 'United States',
  seedingSize: 'L',
  customCode: '',
  instagram: '',
  youtube: '',
  facebook: '',
  linkedin: '',
  portfolioUrl: '',
  note: '',
};

export default function CreatorsPage() {
  const [formData, setFormData] = useState<FormState>(INITIAL_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [submittedData, setSubmittedData] = useState<{
    applicationId: string;
    customCode: string;
    isExisting?: boolean;
  } | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name === 'customCode') {
      // Auto-uppercase and sanitize
      setFormData((prev) => ({
        ...prev,
        customCode: value.toUpperCase().replace(/[^A-Z0-9_-]/g, ''),
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSubmitting(true);

    try {
      const payload = {
        name: formData.name.trim(),
        email: formData.email?.trim() || undefined,
        phone: formData.phone?.trim() || undefined,
        address: {
          street: formData.street,
          city: formData.city,
          state: formData.state,
          postalCode: formData.postalCode,
          country: formData.country,
        },
        customCode: formData.customCode,
        seedingSize: formData.seedingSize,
        socials: {
          instagram: formData.instagram,
          youtube: formData.youtube || undefined,
          facebook: formData.facebook || undefined,
          linkedin: formData.linkedin || undefined,
        },
        portfolioUrl: formData.portfolioUrl || undefined,
        note: formData.note || undefined,
      };

      const res = await fetch('/api/creators', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit application.');
      }

      setSubmittedData({
        applicationId: data.applicationId,
        customCode: data.customCode,
        isExisting: data.isExisting,
      });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'An unexpected error occurred.';
      setErrorMessage(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-[#FAF9F7] text-neutral-900 min-h-screen pt-28 sm:pt-36 pb-24 sm:pb-36 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center space-x-2 text-[11px] font-mono uppercase tracking-[0.2em] text-neutral-500 mb-8 sm:mb-12">
        <Link href="/" className="hover:text-[#580D1A] transition-colors">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
        <span className="text-neutral-900 font-medium">Creator & Affiliate Circle</span>
      </nav>

      {/* Header Section */}
      <div className="border-b border-neutral-200/80 pb-10 sm:pb-16 mb-12 sm:mb-16">
        <div className="flex items-center space-x-2 text-[#580D1A] font-mono text-[10px] sm:text-xs font-semibold tracking-[0.25em] uppercase mb-3">
          <Sparkles className="w-3.5 h-3.5 text-[#580D1A]" />
          <span>KOLOSSAL ARCHIVAL CIRCLE &bull; CREATOR FELLOWSHIP</span>
        </div>
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-neutral-950 leading-[0.94] max-w-4xl">
          JOIN THE SYNDICATE.
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#580D1A] via-[#851830] to-neutral-900">
            WEAR THE FORM.
          </span>
        </h1>
        <p className="mt-6 text-sm sm:text-base md:text-lg font-light text-neutral-600 max-w-2xl leading-relaxed">
          We collaborate with architects, stylists, creative directors, and digital tastemakers.
          Receive complimentary garment seedings, provide your community with dedicated private
          codes, and earn ongoing royalties on every attributed order.
        </p>
      </div>

      {/* Program Pillars Grid (4 Columns) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-16 sm:mb-20">
        {/* Pillar 1 */}
        <div className="p-6 sm:p-7 rounded-2xl bg-white border border-neutral-200/80 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-full bg-[#580D1A]/10 text-[#580D1A] flex items-center justify-center">
            <Gift className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase block font-semibold">
            01 / SEEDING
          </span>
          <h3 className="text-sm font-bold uppercase tracking-wide text-neutral-950">
            Complimentary Allocations
          </h3>
          <p className="text-xs text-neutral-600 font-light leading-relaxed">
            Approved creators receive hero garments (500 GSM hoodies, outerwear) dispatched directly to your delivery address.
          </p>
        </div>

        {/* Pillar 2 */}
        <div className="p-6 sm:p-7 rounded-2xl bg-white border border-neutral-200/80 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-full bg-[#580D1A]/10 text-[#580D1A] flex items-center justify-center">
            <Tag className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase block font-semibold">
            02 / VANITY CODE
          </span>
          <h3 className="text-sm font-bold uppercase tracking-wide text-neutral-950">
            Personalized Discount
          </h3>
          <p className="text-xs text-neutral-600 font-light leading-relaxed">
            Choose your custom code (e.g. <span className="font-mono font-semibold text-[#580D1A]">ALEX10</span>). Your followers receive 10%–15% off architectural streetwear garments.
          </p>
        </div>

        {/* Pillar 3 */}
        <div className="p-6 sm:p-7 rounded-2xl bg-white border border-neutral-200/80 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-full bg-[#580D1A]/10 text-[#580D1A] flex items-center justify-center">
            <DollarSign className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase block font-semibold">
            03 / COMMISSIONS
          </span>
          <h3 className="text-sm font-bold uppercase tracking-wide text-neutral-950">
            10%–15% Cash Royalties
          </h3>
          <p className="text-xs text-neutral-600 font-light leading-relaxed">
            Earn continuous commissions on every sale tracked to your code or referral link, paid monthly via PayPal, Wise, or direct bank transfer.
          </p>
        </div>

        {/* Pillar 4 */}
        <div className="p-6 sm:p-7 rounded-2xl bg-white border border-neutral-200/80 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-full bg-[#580D1A]/10 text-[#580D1A] flex items-center justify-center">
            <Lock className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase block font-semibold">
            04 / EARLY ACCESS
          </span>
          <h3 className="text-sm font-bold uppercase tracking-wide text-neutral-950">
            Drop 002 Whitelist
          </h3>
          <p className="text-xs text-neutral-600 font-light leading-relaxed">
            Private allocation windows for future small-batch capsule drops before public release.
          </p>
        </div>
      </div>

      {/* Main Form or Success View */}
      {submittedData ? (
        /* Success State */
        <div className="max-w-2xl mx-auto text-center bg-white border border-neutral-200 p-8 sm:p-14 rounded-3xl shadow-xl space-y-6 animate-in fade-in zoom-in-95 duration-300">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#580D1A]/10 text-[#580D1A] flex items-center justify-center mx-auto shadow-inner">
            <CheckCircle2 className="w-8 sm:w-10 h-8 sm:h-10" />
          </div>

          <div className="space-y-2">
            <span className="text-[10px] font-mono tracking-[0.25em] text-[#580D1A] uppercase font-semibold block">
              APPLICATION LODGED &bull; {submittedData.applicationId}
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase text-neutral-950">
              Welcome to the Circle
            </h2>
            <p className="text-xs sm:text-sm font-light text-neutral-600 max-w-md mx-auto leading-relaxed pt-1">
              Your creator profile has been recorded and submitted to our curatorial desk.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-neutral-50 border border-neutral-200/80 text-left font-mono text-xs space-y-3 max-w-md mx-auto">
            <div className="flex justify-between border-b border-neutral-200/60 pb-2">
              <span className="text-neutral-500 uppercase">Application Reference</span>
              <span className="font-semibold text-neutral-900">{submittedData.applicationId}</span>
            </div>
            <div className="flex justify-between border-b border-neutral-200/60 pb-2">
              <span className="text-neutral-500 uppercase">Requested Code</span>
              <span className="font-bold text-[#580D1A]">{submittedData.customCode}</span>
            </div>
            <div className="flex justify-between border-b border-neutral-200/60 pb-2">
              <span className="text-neutral-500 uppercase">Status</span>
              <span className="font-semibold text-amber-700">Under Curatorial Review</span>
            </div>
            <div className="flex justify-between pt-1">
              <span className="text-neutral-500 uppercase">Review Window</span>
              <span className="text-neutral-800">24–48 Business Hours</span>
            </div>
          </div>

          <p className="text-xs text-neutral-500 font-mono max-w-md mx-auto leading-relaxed">
            Upon approval, your vanity code will activate in our Shopify engine, and your first garment allocation package will be prepared for dispatch.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/lookbook"
              className="w-full sm:w-auto px-7 py-3.5 bg-[#580D1A] text-white font-semibold text-xs uppercase tracking-[0.2em] rounded-full hover:bg-[#3f0812] transition-colors shadow-md"
            >
              Explore Runway Lookbook
            </Link>
            <Link
              href="/"
              className="w-full sm:w-auto px-7 py-3.5 border border-neutral-300 text-neutral-800 font-medium text-xs uppercase tracking-[0.2em] rounded-full hover:bg-neutral-100 transition-colors"
            >
              Return to Storefront
            </Link>
          </div>
        </div>
      ) : (
        /* Application Form */
        <div className="max-w-3xl mx-auto bg-white border border-neutral-200/80 rounded-3xl p-6 sm:p-10 lg:p-12 shadow-lg">
          <div className="border-b border-neutral-200/80 pb-6 mb-8">
            <span className="text-[10px] font-mono tracking-widest text-[#580D1A] uppercase font-semibold block mb-1">
              CURATORIAL APPLICATION
            </span>
            <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-neutral-950">
              Creator Information & Allocation Details
            </h2>
            <p className="text-xs font-light text-neutral-500 mt-1">
              Fields marked with an asterisk (<span className="text-[#580D1A] font-bold">*</span>) are mandatory.
            </p>
          </div>

          {errorMessage && (
            <div className="p-4 mb-6 rounded-xl bg-[#580D1A]/10 border border-[#580D1A]/30 text-xs font-mono text-[#580D1A] flex items-center space-x-2">
              <span>✕</span>
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* 1. Identity & Contact */}
            <div className="space-y-4">
              <h3 className="text-xs font-mono uppercase tracking-[0.2em] font-semibold text-neutral-900">
                1. Creator Identity & Contact
              </h3>

              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-700 mb-1.5 font-medium">
                  Full Legal Name <span className="text-[#580D1A]">*</span>
                </label>
                <input
                  type="text"
                  required
                  name="name"
                  placeholder="e.g. Marcus Vance"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full bg-neutral-50 border border-neutral-300 rounded-xl px-4 py-3 text-xs font-sans tracking-wide text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-[#580D1A] focus:bg-white transition-all"
                />
              </div>
            </div>

            {/* 2. Shipping Address & Seeding Size */}
            <div className="space-y-4 pt-6 border-t border-neutral-200/80">
              <h3 className="text-xs font-mono uppercase tracking-[0.2em] font-semibold text-neutral-900">
                2. Garment Seeding Destination
              </h3>

              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-700 mb-1.5 font-medium">
                  Street Address & Apartment / Suite <span className="text-[#580D1A]">*</span>
                </label>
                <input
                  type="text"
                  required
                  name="street"
                  placeholder="e.g. 742 Evergreen Terrace, Apt 4B"
                  value={formData.street}
                  onChange={handleInputChange}
                  className="w-full bg-neutral-50 border border-neutral-300 rounded-xl px-4 py-3 text-xs font-sans text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-[#580D1A] focus:bg-white transition-all"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-700 mb-1.5 font-medium">
                    City <span className="text-[#580D1A]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    name="city"
                    placeholder="New York"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full bg-neutral-50 border border-neutral-300 rounded-xl px-4 py-3 text-xs font-sans text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-[#580D1A] focus:bg-white transition-all"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-700 mb-1.5 font-medium">
                    State / Region
                  </label>
                  <input
                    type="text"
                    name="state"
                    placeholder="NY"
                    value={formData.state}
                    onChange={handleInputChange}
                    className="w-full bg-neutral-50 border border-neutral-300 rounded-xl px-4 py-3 text-xs font-sans text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-[#580D1A] focus:bg-white transition-all"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-700 mb-1.5 font-medium">
                    Postal / ZIP Code <span className="text-[#580D1A]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    name="postalCode"
                    placeholder="10001"
                    value={formData.postalCode}
                    onChange={handleInputChange}
                    className="w-full bg-neutral-50 border border-neutral-300 rounded-xl px-4 py-3 text-xs font-mono text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-[#580D1A] focus:bg-white transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-700 mb-1.5 font-medium">
                    Country / Territory <span className="text-[#580D1A]">*</span>
                  </label>
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    className="w-full bg-neutral-50 border border-neutral-300 rounded-xl px-4 py-3 text-xs font-sans text-neutral-900 focus:outline-none focus:border-[#580D1A] focus:bg-white transition-all"
                  >
                    <option value="United States">United States</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Canada">Canada</option>
                    <option value="Australia">Australia</option>
                    <option value="Germany">Germany</option>
                    <option value="France">France</option>
                    <option value="Italy">Italy</option>
                    <option value="India">India</option>
                    <option value="Japan">Japan</option>
                    <option value="United Arab Emirates">United Arab Emirates</option>
                    <option value="Other">Other Global Destination</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-700 mb-1.5 font-medium">
                    Preferred Garment Fit / Size <span className="text-[#580D1A]">*</span>
                  </label>
                  <div className="grid grid-cols-5 gap-2">
                    {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                      <button
                        key={size}
                        type="button"
                        onClick={() => setFormData((prev) => ({ ...prev, seedingSize: size }))}
                        className={`py-2.5 rounded-lg font-mono text-xs font-semibold transition-all ${
                          formData.seedingSize === size
                            ? 'bg-[#580D1A] text-white shadow-sm'
                            : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                  <span className="text-[10px] font-mono text-neutral-400 mt-1 block">
                    Garments feature an intentional oversized architectural silhouette.
                  </span>
                </div>
              </div>
            </div>

            {/* 3. Custom Coupon Code */}
            <div className="space-y-4 pt-6 border-t border-neutral-200/80">
              <h3 className="text-xs font-mono uppercase tracking-[0.2em] font-semibold text-neutral-900">
                3. Custom Community Coupon Code
              </h3>

              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-700 mb-1.5 font-medium">
                  Requested Vanity Code <span className="text-[#580D1A]">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    name="customCode"
                    maxLength={20}
                    placeholder="e.g. MARCUS10 or ARCHIVE_VANCE"
                    value={formData.customCode}
                    onChange={handleInputChange}
                    className="w-full bg-neutral-50 border border-neutral-300 rounded-xl px-4 py-3 text-sm font-mono tracking-widest uppercase text-[#580D1A] font-bold placeholder:text-neutral-400 placeholder:font-normal focus:outline-none focus:border-[#580D1A] focus:bg-white transition-all"
                  />
                </div>
                <div className="flex items-center justify-between text-[11px] font-mono text-neutral-500 mt-1.5">
                  <span>
                    Your community will enter{' '}
                    <span className="text-[#580D1A] font-bold">
                      {formData.customCode || '[YOUR_CODE]'}
                    </span>{' '}
                    for 10%–15% privilege.
                  </span>
                  <span>{formData.customCode.length}/20</span>
                </div>
              </div>
            </div>

            {/* 4. Social Media Channels */}
            <div className="space-y-4 pt-6 border-t border-neutral-200/80">
              <h3 className="text-xs font-mono uppercase tracking-[0.2em] font-semibold text-neutral-900">
                4. Social Media & Audience Reach
              </h3>

              {/* Instagram */}
              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-700 mb-1.5 font-medium flex items-center space-x-1.5">
                  <InstagramIcon className="w-3.5 h-3.5 text-[#580D1A]" />
                  <span>Instagram Profile Link or @Handle</span>
                  <span className="text-[#580D1A]">*</span>
                </label>
                <input
                  type="text"
                  required
                  name="instagram"
                  placeholder="@yourhandle or instagram.com/yourhandle"
                  value={formData.instagram}
                  onChange={handleInputChange}
                  className="w-full bg-neutral-50 border border-neutral-300 rounded-xl px-4 py-3 text-xs font-mono text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-[#580D1A] focus:bg-white transition-all"
                />
              </div>

              {/* Optional Socials Grid (YouTube, Facebook, LinkedIn) */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* YouTube */}
                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-600 mb-1.5 font-medium flex items-center space-x-1.5">
                    <YoutubeIcon className="w-3.5 h-3.5 text-neutral-500" />
                    <span>YouTube</span>
                  </label>
                  <input
                    type="text"
                    name="youtube"
                    placeholder="youtube.com/@channel"
                    value={formData.youtube}
                    onChange={handleInputChange}
                    className="w-full bg-neutral-50 border border-neutral-300 rounded-xl px-4 py-3 text-xs font-mono text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-[#580D1A] focus:bg-white transition-all"
                  />
                </div>

                {/* Facebook */}
                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-600 mb-1.5 font-medium flex items-center space-x-1.5">
                    <FacebookIcon className="w-3.5 h-3.5 text-neutral-500" />
                    <span>Facebook</span>
                  </label>
                  <input
                    type="text"
                    name="facebook"
                    placeholder="facebook.com/yourpage"
                    value={formData.facebook}
                    onChange={handleInputChange}
                    className="w-full bg-neutral-50 border border-neutral-300 rounded-xl px-4 py-3 text-xs font-mono text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-[#580D1A] focus:bg-white transition-all"
                  />
                </div>

                {/* LinkedIn */}
                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-600 mb-1.5 font-medium flex items-center space-x-1.5">
                    <LinkedinIcon className="w-3.5 h-3.5 text-neutral-500" />
                    <span>LinkedIn</span>
                  </label>
                  <input
                    type="text"
                    name="linkedin"
                    placeholder="linkedin.com/in/profile"
                    value={formData.linkedin}
                    onChange={handleInputChange}
                    className="w-full bg-neutral-50 border border-neutral-300 rounded-xl px-4 py-3 text-xs font-mono text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-[#580D1A] focus:bg-white transition-all"
                  />
                </div>
              </div>

              {/* Portfolio / Media Kit */}
              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-600 mb-1.5 font-medium">
                  Portfolio / Media Kit URL
                </label>
                <input
                  type="url"
                  name="portfolioUrl"
                  placeholder="https://behance.net/you or google drive link"
                  value={formData.portfolioUrl}
                  onChange={handleInputChange}
                  className="w-full bg-neutral-50 border border-neutral-300 rounded-xl px-4 py-3 text-xs font-mono text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-[#580D1A] focus:bg-white transition-all"
                />
              </div>

              {/* Note / Bio */}
              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-600 mb-1.5 font-medium">
                  Styling Vision or Note to Curators
                </label>
                <textarea
                  name="note"
                  rows={3}
                  placeholder="Tell us about your creative focus, upcoming projects, or how you intend to present Kolossal garments..."
                  value={formData.note}
                  onChange={handleInputChange}
                  className="w-full bg-neutral-50 border border-neutral-300 rounded-xl p-4 text-xs font-sans text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-[#580D1A] focus:bg-white transition-all resize-none"
                />
              </div>
            </div>

            {/* Submission Button & Security Guarantee */}
            <div className="pt-6 border-t border-neutral-200/80 space-y-4">
              <button
                type="submit"
                disabled={submitting}
                className="w-full py-4 sm:py-4.5 bg-[#580D1A] text-white font-semibold text-xs sm:text-sm uppercase tracking-[0.22em] rounded-full hover:bg-[#3f0812] active:scale-[0.99] transition-all shadow-lg hover:shadow-xl disabled:opacity-60 flex items-center justify-center space-x-2"
              >
                {submitting ? (
                  <span>LODGING APPLICATION...</span>
                ) : (
                  <>
                    <span>SUBMIT CREATOR APPLICATION</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="flex items-center justify-center space-x-2 text-[10px] font-mono text-neutral-400 uppercase tracking-widest pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#580D1A]" />
                <span>CONFIDENTIAL CREATOR DIRECTORY &bull; DATA PRIVACY ASSURED</span>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
