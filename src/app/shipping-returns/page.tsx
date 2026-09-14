import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { Truck, RotateCcw, ShieldCheck, Globe, Clock, PackageCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Shipping & Returns | KOLOSSAL',
  description: 'Worldwide express shipping via DHL, pre-paid customs duties (DDP), and 30-day returns policy.',
};

export default function ShippingReturnsPage() {
  return (
    <div className="pt-28 pb-24 px-6 lg:px-12 max-w-5xl mx-auto space-y-16">
      {/* Header */}
      <div className="border-b border-white/[0.08] pb-8 space-y-3">
        <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-neutral-500">
          CLIENT SERVICES
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white">
          SHIPPING & RETURNS
        </h1>
        <p className="text-xs sm:text-sm font-light text-neutral-400 max-w-xl leading-relaxed">
          Every order is fulfilled in protective archival garment dustbags and shipped via priority DHL Express with full tracking and insurance.
        </p>
      </div>

      {/* 3 Core Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3">
          <Truck className="w-5 h-5 text-white" />
          <h3 className="text-sm font-bold uppercase tracking-wider text-white">Complimentary Delivery</h3>
          <p className="text-xs font-light text-neutral-400 leading-relaxed">
            All orders exceeding $250 qualify for complimentary DHL Express worldwide delivery. Orders below $250 carry a flat $25 shipping fee.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3">
          <ShieldCheck className="w-5 h-5 text-white" />
          <h3 className="text-sm font-bold uppercase tracking-wider text-white">100% Duties Paid (DDP)</h3>
          <p className="text-xs font-light text-neutral-400 leading-relaxed">
            All international taxes, VAT, and custom brokerage fees are absorbed directly by Kolossal. You will never face surprise import bills.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3">
          <RotateCcw className="w-5 h-5 text-white" />
          <h3 className="text-sm font-bold uppercase tracking-wider text-white">30-Day Returns</h3>
          <p className="text-xs font-light text-neutral-400 leading-relaxed">
            Unworn items in original condition with security ribbons attached may be returned or exchanged within 30 days of arrival.
          </p>
        </div>
      </div>

      {/* Global Delivery Matrix Table */}
      <div className="space-y-6 pt-6 border-t border-white/[0.08]">
        <h2 className="text-xl font-bold uppercase tracking-tight text-white">
          Regional Delivery Times & Carriers
        </h2>

        <div className="overflow-x-auto rounded-2xl border border-white/10 bg-[#0c0c0c]">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-white/10 text-neutral-500 uppercase tracking-widest bg-white/[0.02]">
                <th className="p-4 sm:p-5">Region</th>
                <th className="p-4 sm:p-5">Carrier Partner</th>
                <th className="p-4 sm:p-5">Transit Time</th>
                <th className="p-4 sm:p-5">Customs Duties</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.06] text-neutral-300">
              <tr>
                <td className="p-4 sm:p-5 font-bold text-white">North America (US & Canada)</td>
                <td className="p-4 sm:p-5">DHL Express Worldwide</td>
                <td className="p-4 sm:p-5">2 – 3 Business Days</td>
                <td className="p-4 sm:p-5 text-emerald-400">Pre-Paid (DDP)</td>
              </tr>
              <tr>
                <td className="p-4 sm:p-5 font-bold text-white">United Kingdom & Europe</td>
                <td className="p-4 sm:p-5">DHL Express On Demand</td>
                <td className="p-4 sm:p-5">1 – 2 Business Days</td>
                <td className="p-4 sm:p-5 text-emerald-400">Pre-Paid (DDP)</td>
              </tr>
              <tr>
                <td className="p-4 sm:p-5 font-bold text-white">Asia Pacific & Japan</td>
                <td className="p-4 sm:p-5">DHL Express Air Priority</td>
                <td className="p-4 sm:p-5">2 – 4 Business Days</td>
                <td className="p-4 sm:p-5 text-emerald-400">Pre-Paid (DDP)</td>
              </tr>
              <tr>
                <td className="p-4 sm:p-5 font-bold text-white">Australia & New Zealand</td>
                <td className="p-4 sm:p-5">DHL Express Worldwide</td>
                <td className="p-4 sm:p-5">3 – 5 Business Days</td>
                <td className="p-4 sm:p-5 text-emerald-400">Pre-Paid (DDP)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Return Instructions */}
      <div className="space-y-6 pt-6 border-t border-white/[0.08]">
        <h2 className="text-xl font-bold uppercase tracking-tight text-white">
          Return Protocol
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-neutral-900/40 border border-white/10 space-y-2">
            <span className="text-xs font-mono text-neutral-500">STEP 01</span>
            <h4 className="text-sm font-semibold uppercase text-white">Initiate Portal</h4>
            <p className="text-xs font-light text-neutral-400 leading-relaxed">
              Email our concierge at <span className="text-white">care@kolossal.com</span> with your order number to receive a pre-paid DHL return label.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-neutral-900/40 border border-white/10 space-y-2">
            <span className="text-xs font-mono text-neutral-500">STEP 02</span>
            <h4 className="text-sm font-semibold uppercase text-white">Secure Packaging</h4>
            <p className="text-xs font-light text-neutral-400 leading-relaxed">
              Place the unwashed garment inside its original dust bag and protective box with all authentication tags attached.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-neutral-900/40 border border-white/10 space-y-2">
            <span className="text-xs font-mono text-neutral-500">STEP 03</span>
            <h4 className="text-sm font-semibold uppercase text-white">Instant Refund</h4>
            <p className="text-xs font-light text-neutral-400 leading-relaxed">
              Once scanned at our logistics hub, refunds are credited back to your original payment method within 48 business hours.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
