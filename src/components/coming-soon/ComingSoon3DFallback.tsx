'use client';

export default function ComingSoon3DFallback() {
  return (
    <div className="relative w-full h-full min-h-[340px] flex items-center justify-center">
      {/* Ambient subtle maroon aura */}
      <div className="absolute inset-0 bg-radial-[circle_at_center,rgba(88,13,26,0.12)_0%,transparent_70%]" />
      
      {/* Minimal luxury pulse indicator */}
      <div className="relative flex flex-col items-center justify-center space-y-3">
        <div className="w-24 h-24 rounded-full border border-white/10 bg-white/[0.02] backdrop-blur-xl flex items-center justify-center animate-pulse">
          <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-neutral-400">
            KLS
          </span>
        </div>
      </div>
    </div>
  );
}
