import React from 'react';

export default function BrandManifesto() {
  return (
    <section id="manifesto" className="py-24 border-y border-white/[0.08] bg-[#050505] text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 space-y-16">
        {/* Editorial Heading */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-4">
            <span className="text-[11px] font-mono tracking-[0.3em] text-neutral-500 uppercase block mb-3">
              THE ATELIER MANIFESTO
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tighter uppercase leading-[0.95]">
              PROPORTION<br />OVER TRENDS.
            </h2>
          </div>
          <div className="lg:col-span-8 space-y-6 text-neutral-400 font-light text-base sm:text-lg leading-relaxed">
            <p>
              Kolossal is an independent architectural clothing atelier founded on the refusal of ephemeral fast-fashion cycles. We view garments as habitable structures—engineered with extreme GSM densities, brutalist silhouettes, and Japanese ripstop textiles designed to age gracefully over decades.
            </p>
            <p className="text-sm text-neutral-500 font-mono tracking-wide">
              Milled in limited small-batch runs. No seasonal markdowns. Every piece is numbered.
            </p>
          </div>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-white/[0.08]">
          <div className="space-y-3 p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
            <span className="text-xs font-mono text-neutral-500">01 // MATERIAL WEIGHT</span>
            <h3 className="text-lg font-bold uppercase tracking-wider text-white">500 GSM French Terry</h3>
            <p className="text-xs text-neutral-400 leading-relaxed font-light">
              Custom-twisted organic cotton fibres looped at maximum gauge for a structured, non-collapsing drape that shields against the elements.
            </p>
          </div>

          <div className="space-y-3 p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
            <span className="text-xs font-mono text-neutral-500">02 // TAILORED OVERSIZE</span>
            <h3 className="text-lg font-bold uppercase tracking-wider text-white">Pattern Engineering</h3>
            <p className="text-xs text-neutral-400 leading-relaxed font-light">
              Extreme drop-shoulder ratios paired with mathematically balanced sleeve lengths and cropped hems to elongate the wearer's silhouette.
            </p>
          </div>

          <div className="space-y-3 p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
            <span className="text-xs font-mono text-neutral-500">03 // PROVENANCE</span>
            <h3 className="text-lg font-bold uppercase tracking-wider text-white">Ethical Craftsmanship</h3>
            <p className="text-xs text-neutral-400 leading-relaxed font-light">
              Produced in family-run ateliers between Okayama, Japan and Veneto, Italy with complete trace-to-farm supply chain verification.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
