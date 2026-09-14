'use client';

import React, { useState } from 'react';
import { Search, Truck, CheckCircle2, Clock, MapPin, Package, ShieldCheck } from 'lucide-react';

export default function TrackOrderPage() {
  const [orderQuery, setOrderQuery] = useState('KOL-78921-EXP');
  const [activeOrder, setActiveOrder] = useState<string | null>('KOL-78921-EXP');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (orderQuery.trim()) {
      setActiveOrder(orderQuery.trim().toUpperCase());
    }
  };

  const STAGES = [
    { title: 'Allocation Confirmed', desc: 'Garment reserved & authenticated in Tokyo atelier', time: 'Sep 12, 14:20 JST', done: true },
    { title: 'Archival Packaging', desc: 'Inspected under high-intensity lighting & boxed', time: 'Sep 13, 09:15 JST', done: true },
    { title: 'In Transit via DHL Express', desc: 'Customs cleared (DDP) & loaded onto international flight', time: 'Sep 14, 02:40 CET', done: true, current: true },
    { title: 'Out for Final Delivery', desc: 'Scheduled delivery to recipient destination', time: 'Estimated Sep 16', done: false },
  ];

  return (
    <div className="pt-28 pb-24 px-6 lg:px-12 max-w-4xl mx-auto space-y-16">
      {/* Header */}
      <div className="border-b border-white/[0.08] pb-8 space-y-3">
        <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-neutral-500">
          LOGISTICS RADAR
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white">
          SHIPMENT TRACKING
        </h1>
        <p className="text-xs sm:text-sm font-light text-neutral-400 max-w-xl leading-relaxed">
          Monitor your international DHL Express consignment from our pattern cutting tables to your address.
        </p>
      </div>

      {/* Tracker Search Box */}
      <form onSubmit={handleSearch} className="flex gap-2">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" />
          <input
            type="text"
            required
            placeholder="ENTER ORDER NUMBER (E.G. KOL-78921-EXP)"
            value={orderQuery}
            onChange={(e) => setOrderQuery(e.target.value)}
            className="w-full bg-white/[0.03] border border-white/15 pl-11 pr-4 py-4 rounded-2xl text-xs font-mono uppercase tracking-wider text-white placeholder:text-neutral-600 focus:outline-none focus:border-white/40"
          />
        </div>
        <button
          type="submit"
          className="px-8 bg-white text-black font-semibold text-xs uppercase tracking-widest rounded-2xl hover:bg-neutral-200 transition-colors"
        >
          Track
        </button>
      </form>

      {/* Active Tracking Result */}
      {activeOrder && (
        <div className="space-y-8 rounded-3xl border border-white/10 bg-[#0c0c0c] p-6 sm:p-10">
          {/* Header row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-white/[0.08] gap-4">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500">
                WAYBILL CONSIGNMENT
              </span>
              <h3 className="text-lg sm:text-xl font-bold font-mono text-white">
                {activeOrder}
              </h3>
            </div>
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              <span>ON SCHEDULE &bull; IN TRANSIT</span>
            </div>
          </div>

          {/* Shipment Meta Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-xs font-mono text-neutral-400 border-b border-white/[0.08] pb-6">
            <div>
              <span className="text-neutral-500 block text-[10px] uppercase">Carrier</span>
              <span className="text-white font-semibold">DHL Express</span>
            </div>
            <div>
              <span className="text-neutral-500 block text-[10px] uppercase">Service</span>
              <span className="text-white font-semibold">DDP Tracked</span>
            </div>
            <div>
              <span className="text-neutral-500 block text-[10px] uppercase">Origin</span>
              <span className="text-white font-semibold">Tokyo / Milan</span>
            </div>
            <div>
              <span className="text-neutral-500 block text-[10px] uppercase">Est. Delivery</span>
              <span className="text-white font-semibold">48 Hours</span>
            </div>
          </div>

          {/* Timeline Milestones */}
          <div className="space-y-8 pt-2">
            {STAGES.map((stage, idx) => (
              <div key={idx} className="flex items-start space-x-4 relative">
                {/* Visual marker */}
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 z-10 ${
                  stage.done
                    ? 'bg-white text-black font-bold'
                    : 'bg-neutral-800 text-neutral-500 border border-white/10'
                }`}>
                  {stage.done ? <CheckCircle2 className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
                </div>

                {/* Milestone Details */}
                <div className="space-y-1">
                  <div className="flex items-baseline space-x-3">
                    <h4 className={`text-xs uppercase tracking-wider font-semibold ${stage.done ? 'text-white' : 'text-neutral-500'}`}>
                      {stage.title}
                    </h4>
                    <span className="text-[10px] font-mono text-neutral-500">{stage.time}</span>
                  </div>
                  <p className="text-xs font-light text-neutral-400">
                    {stage.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
