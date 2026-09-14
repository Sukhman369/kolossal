import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { ArrowRight, Compass, Shield, Layers, Globe } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About The Brand | KOLOSSAL',
  description: 'The story and architectural philosophy behind Kolossal. Custom 500 GSM organic cotton, brutalist silhouettes, and pattern engineering in Tokyo and Milan.',
};

export default function AboutPage() {
  return (
    <div className="pt-28 pb-24 px-6 lg:px-12 max-w-7xl mx-auto text-white space-y-24">
      {/* Editorial Hero */}
      <div className="space-y-6 max-w-4xl">
        <span className="text-[10px] font-mono uppercase tracking-[0.35em] text-neutral-500">
          PROVENANCE & PURPOSE // EST. 2026
        </span>
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tighter leading-[0.92]">
          THE ARCHITECTURE OF HEAVYWEIGHT APPAREL.
        </h1>
        <p className="text-base sm:text-lg font-light text-neutral-400 leading-relaxed max-w-2xl">
          Kolossal was founded on a singular conviction: garments should be engineered with the permanence of monumental architecture, not the disposable lifecycle of seasonal fast-fashion.
        </p>
      </div>

      {/* Hero Visual Collage */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-8 aspect-[16/10] rounded-3xl overflow-hidden bg-neutral-900 border border-white/10 relative">
          <img
            src="https://images.unsplash.com/photo-1509967419530-da38b4704bc6?q=80&w=1400&auto=format&fit=crop"
            alt="Kolossal Cutting Table"
            className="w-full h-full object-cover grayscale opacity-80 hover:opacity-100 transition-opacity duration-700"
          />
          <div className="absolute bottom-6 left-6 px-4 py-2 rounded-full bg-black/60 border border-white/15 backdrop-blur-md text-[10px] font-mono tracking-widest text-neutral-300 uppercase">
            Pattern Studio // Tokyo, Japan
          </div>
        </div>

        <div className="md:col-span-4 aspect-[4/5] rounded-3xl overflow-hidden bg-neutral-900 border border-white/10 relative">
          <img
            src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1000&auto=format&fit=crop"
            alt="Fabric Inspection"
            className="w-full h-full object-cover grayscale opacity-80 hover:opacity-100 transition-opacity duration-700"
          />
          <div className="absolute bottom-6 left-6 px-4 py-2 rounded-full bg-black/60 border border-white/15 backdrop-blur-md text-[10px] font-mono tracking-widest text-neutral-300 uppercase">
            500 GSM Loom // Veneto, Italy
          </div>
        </div>
      </div>

      {/* Manifesto Body */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-8 border-t border-white/[0.08]">
        <div className="lg:col-span-4 space-y-4">
          <span className="text-xs font-mono uppercase tracking-widest text-neutral-500">
            01 // PHILOSOPHY
          </span>
          <h2 className="text-2xl font-bold uppercase tracking-tight text-white">
            Refusal of the 52-Week Fashion Cycle
          </h2>
        </div>
        <div className="lg:col-span-8 space-y-6 text-neutral-400 font-light text-base leading-relaxed">
          <p>
            Modern apparel brands release micro-trends every two weeks, sacrificing fiber density and seams for cheap speed. At Kolossal, we reject seasonal markdowns and excessive production. Every garment is milled in limited numbered batches of 100 to 150 pieces worldwide.
          </p>
          <p>
            When an item sells out, it enters our permanent archive. We only restock when the raw organic harvest allows us to mill without compromising density.
          </p>
        </div>
      </div>

      {/* 4 Pillars Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-8 border-t border-white/[0.08]">
        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-3">
          <Layers className="w-5 h-5 text-white" />
          <h3 className="text-sm font-bold uppercase tracking-wider text-white">500 GSM Density</h3>
          <p className="text-xs text-neutral-400 leading-relaxed font-light">
            Double-faced loopback French Terry woven on custom low-speed looms to eliminate thinning.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-3">
          <Compass className="w-5 h-5 text-white" />
          <h3 className="text-sm font-bold uppercase tracking-wider text-white">Boxy Silhouette</h3>
          <p className="text-xs text-neutral-400 leading-relaxed font-light">
            Engineered drop shoulders with calculated sleeve lengths that maintain drape regardless of body type.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-3">
          <Globe className="w-5 h-5 text-white" />
          <h3 className="text-sm font-bold uppercase tracking-wider text-white">Bespoke Millings</h3>
          <p className="text-xs text-neutral-400 leading-relaxed font-light">
            Certified GOTS organic cotton and Italian gabardine produced in ethical, worker-owned facilities.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-3">
          <Shield className="w-5 h-5 text-white" />
          <h3 className="text-sm font-bold uppercase tracking-wider text-white">Lifetime Guarantee</h3>
          <p className="text-xs text-neutral-400 leading-relaxed font-light">
            Every seam, bar-tack, and zipper is warrantied against manufacturing failure for life.
          </p>
        </div>
      </div>

      {/* Call to action */}
      <div className="p-12 rounded-3xl bg-neutral-900 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
        <div className="space-y-2">
          <h3 className="text-2xl font-bold uppercase tracking-tight text-white">
            Experience Drop 001
          </h3>
          <p className="text-xs text-neutral-400 font-mono">
            Limited numbered production available worldwide with complimentary DHL Express.
          </p>
        </div>
        <Link
          href="/collections"
          className="px-8 py-4 bg-white text-black font-semibold text-xs uppercase tracking-[0.2em] rounded-full hover:bg-neutral-200 transition-colors flex items-center space-x-2 flex-shrink-0"
        >
          <span>View Archive</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
