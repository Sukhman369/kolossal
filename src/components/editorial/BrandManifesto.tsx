import React from 'react';

export default function BrandManifesto() {
  return (
    <section id="manifesto" className="py-32 border-y border-neutral-200/80 bg-white text-neutral-900">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 space-y-20">
        {/* Editorial Heading */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-4">
            <span className="text-[11px] font-mono tracking-[0.3em] text-[#580D1A] uppercase font-semibold block mb-3">
              THE BRAND MANIFESTO
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tighter uppercase leading-[0.95] text-neutral-950">
              PROPORTION<br />OVER TRENDS.
            </h2>
          </div>
          <div className="lg:col-span-8 space-y-6 text-neutral-600 font-light text-base sm:text-lg leading-relaxed">
            <p>
              Kolossal is an independent architectural clothing label founded on the refusal of ephemeral fast-fashion cycles. We view garments as habitable structures—engineered with extreme GSM densities, brutalist silhouettes, and Japanese ripstop textiles designed to age gracefully over decades.
            </p>
            <p className="text-sm text-[#580D1A] font-mono tracking-wide font-medium">
              Milled in limited small-batch runs. No seasonal markdowns. Every piece is numbered.
            </p>
          </div>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-neutral-200/80">
          <div className="space-y-3 p-8 rounded-3xl bg-[#FAF9F7] border border-neutral-200/80 hover:border-[#580D1A]/40 transition-colors shadow-xs">
            <span className="text-xs font-mono text-[#580D1A] font-bold">01 // MATERIAL WEIGHT</span>
            <h3 className="text-lg font-bold uppercase tracking-wider text-neutral-950">500 GSM French Terry</h3>
            <p className="text-xs text-neutral-600 leading-relaxed font-light">
              Custom-twisted organic cotton fibres looped at maximum gauge for a structured, non-collapsing drape that shields against the elements.
            </p>
          </div>

          <div className="space-y-3 p-8 rounded-3xl bg-[#FAF9F7] border border-neutral-200/80 hover:border-[#580D1A]/40 transition-colors shadow-xs">
            <span className="text-xs font-mono text-[#580D1A] font-bold">02 // TAILORED OVERSIZE</span>
            <h3 className="text-lg font-bold uppercase tracking-wider text-neutral-950">Pattern Engineering</h3>
            <p className="text-xs text-neutral-600 leading-relaxed font-light">
              Extreme drop-shoulder ratios paired with mathematically balanced sleeve lengths and cropped hems to elongate the wearer's silhouette.
            </p>
          </div>

          <div className="space-y-3 p-8 rounded-3xl bg-[#FAF9F7] border border-neutral-200/80 hover:border-[#580D1A]/40 transition-colors shadow-xs">
            <span className="text-xs font-mono text-[#580D1A] font-bold">03 // PROVENANCE</span>
            <h3 className="text-lg font-bold uppercase tracking-wider text-neutral-950">Ethical Craftsmanship</h3>
            <p className="text-xs text-neutral-600 leading-relaxed font-light">
              Produced in family-run workshops between Okayama, Japan and Veneto, Italy with complete trace-to-farm supply chain verification.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
