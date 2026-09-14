'use client';

import dynamic from 'next/dynamic';
import HeroFallback from './HeroFallback';
import { ArrowRight, Sparkles } from 'lucide-react';

// Dynamic import with SSR disabled ensures Three.js WebGL only executes on the client
const Hero3DScene = dynamic(() => import('./Hero3DScene'), {
  ssr: false,
  loading: () => <HeroFallback />,
});

export default function HeroSection() {
  const scrollToCollection = () => {
    const el = document.getElementById('featured-drop');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-[95vh] flex flex-col justify-center overflow-hidden border-b border-neutral-200/80 bg-[#FAF9F7] pt-36 pb-24">
      {/* Background architectural grid lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000006_1px,transparent_1px),linear-gradient(to_bottom,#00000006_1px,transparent_1px)] bg-[size:4.5rem_4.5rem] pointer-events-none" />

      {/* Ambient glowing radial maroon aura */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#580D1A]/[0.05] rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10">
        {/* Left Column: Brand Statement & Actions */}
        <div className="lg:col-span-6 flex flex-col justify-center space-y-6 md:space-y-8">
          {/* Drop Badge */}
          <div className="inline-flex items-center space-x-2.5 px-3.5 py-1.5 rounded-full border border-[#580D1A]/20 bg-[#580D1A]/5 w-fit backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-[#580D1A]" />
            <span className="text-[11px] font-mono uppercase tracking-[0.25em] font-semibold text-[#580D1A]">
              COLLECTION 001 // DROP NOW LIVE
            </span>
          </div>

          {/* Heavyweight Hero Headline */}
          <div className="space-y-3">
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter uppercase text-neutral-950 leading-[0.92]">
              HEAVY<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#580D1A] via-[#851830] to-neutral-900">
                WEIGHT
              </span><br />
              FORM.
            </h1>
            <p className="text-neutral-600 text-sm sm:text-base max-w-md font-light tracking-wide pt-2 leading-relaxed">
              Architectural proportions, custom-milled 500 GSM organic cotton, and precision-tailored oversized cuts engineered between Tokyo and Milan.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={scrollToCollection}
              className="group relative inline-flex items-center space-x-3 px-8 py-4 bg-[#580D1A] text-white font-semibold text-xs uppercase tracking-[0.2em] rounded-full transition-all duration-300 hover:bg-[#3E0711] hover:shadow-[0_8px_30px_rgba(88,13,26,0.3)] active:scale-95 shadow-md"
            >
              <span>Explore Drop</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>

            <a
              href="/lookbook"
              className="inline-flex items-center px-8 py-4 border border-[#580D1A]/30 text-[#580D1A] font-medium text-xs uppercase tracking-[0.2em] rounded-full transition-all duration-300 hover:bg-[#580D1A]/5 hover:border-[#580D1A] active:scale-95"
            >
              Lookbook
            </a>
          </div>

          {/* Quick specs metadata */}
          <div className="grid grid-cols-3 gap-6 pt-6 border-t border-neutral-200/80 max-w-md">
            <div>
              <div className="text-[10px] font-mono uppercase tracking-widest text-neutral-500">Weight</div>
              <div className="text-base font-semibold text-[#580D1A] font-mono">500 GSM</div>
            </div>
            <div>
              <div className="text-[10px] font-mono uppercase tracking-widest text-neutral-500">Edition</div>
              <div className="text-base font-semibold text-neutral-900 font-mono">100 Pcs</div>
            </div>
            <div>
              <div className="text-[10px] font-mono uppercase tracking-widest text-neutral-500">Origin</div>
              <div className="text-base font-semibold text-neutral-900 font-mono">Tokyo/Milan</div>
            </div>
          </div>
        </div>

        {/* Right Column: 3D Interactive Canvas */}
        <div className="lg:col-span-6 relative flex items-center justify-center">
          <Hero3DScene />
        </div>
      </div>
    </section>
  );
}
