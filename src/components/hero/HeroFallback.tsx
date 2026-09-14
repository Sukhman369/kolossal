'use client';

export default function HeroFallback() {
  return (
    <div className="relative w-full h-[520px] md:h-[640px] flex items-center justify-center overflow-hidden">
      {/* Ambient background maroon glow */}
      <div className="absolute inset-0 bg-radial-[circle_at_center,rgba(88,13,26,0.06)_0%,transparent_70%]" />
      
      {/* Sleek luxury placeholder silhouette */}
      <div className="relative flex flex-col items-center justify-center text-center p-6">
        <div className="w-48 h-64 md:w-64 md:h-80 rounded-3xl border border-[#580D1A]/15 bg-gradient-to-b from-[#580D1A]/[0.04] to-transparent backdrop-blur-xl flex items-center justify-center shadow-xl animate-pulse">
          <div className="flex flex-col items-center space-y-3">
            <div className="w-12 h-12 rounded-full border border-[#580D1A]/30 flex items-center justify-center text-[#580D1A] text-xs font-mono font-bold">
              3D
            </div>
            <span className="text-[11px] uppercase tracking-[0.3em] text-[#580D1A] font-mono">
              Loading Model
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
