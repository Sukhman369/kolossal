'use client';

export default function ComingSoon3DFallback() {
  return (
    <div className="relative w-full h-[360px] sm:h-[440px] md:h-[500px] lg:h-[560px] flex items-center justify-center overflow-hidden">
      {/* Ambient background maroon glow */}
      <div className="absolute inset-0 bg-radial-[circle_at_center,rgba(88,13,26,0.06)_0%,transparent_70%]" />
      
      {/* Brutalist placeholder frame */}
      <div className="relative flex flex-col items-center justify-center text-center p-6">
        <div className="w-52 h-52 sm:w-64 sm:h-64 rounded-full border border-[#580D1A]/20 bg-gradient-to-b from-[#580D1A]/[0.05] to-transparent backdrop-blur-md flex items-center justify-center shadow-2xl animate-pulse">
          <div className="flex flex-col items-center space-y-3">
            <div className="w-14 h-14 rounded-full border border-[#580D1A]/30 flex items-center justify-center text-[#580D1A] text-xs font-mono font-bold tracking-wider">
              KLS
            </div>
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#580D1A] font-mono">
              Loading 3D Monolith
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
