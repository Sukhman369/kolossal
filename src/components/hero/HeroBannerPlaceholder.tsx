// Hero Banner Placeholder
// ──────────────────────────────────────────────────────────────────────────────
// This component holds the space for 3 hero slider banners.
// Once final artwork is ready from the graphic designer, replace each slide
// with an <Image /> (Next.js) or a video element.
//
// DESIGN HANDOFF SPECS (send this to graphic designer):
//   Desktop  → 1440 × 620 px  (aspect ratio ~2.32:1)
//   Tablet   →  768 × 520 px  (aspect ratio ~1.48:1)
//   Mobile   →  430 × 600 px  (aspect ratio ~0.72:1)
//
// File format: WebP preferred (also export PNG fallback)
// Naming convention: banner-slide-1-desktop.webp / banner-slide-1-mobile.webp
// Place final files in: /public/banners/
// ──────────────────────────────────────────────────────────────────────────────

const SLIDES = [
  { id: 1, label: 'Slide 01' },
  { id: 2, label: 'Slide 02' },
  { id: 3, label: 'Slide 03' },
];

const SIZE_SPECS = [
  {
    device: 'Desktop',
    icon: '🖥',
    dimensions: '1440 × 620 px',
    ratio: '2.32 : 1',
    notes: 'Full-bleed. Keep key content within safe zone: centre 1200 px.',
  },
  {
    device: 'Tablet',
    icon: '📱',
    dimensions: '768 × 520 px',
    ratio: '1.48 : 1',
    notes: 'Portrait & landscape. Safe zone: centre 680 px.',
  },
  {
    device: 'Mobile',
    icon: '📲',
    dimensions: '430 × 600 px',
    ratio: '0.72 : 1',
    notes: 'Portrait only. Keep text / logo in top 60% of frame.',
  },
];

export default function HeroBannerPlaceholder() {
  return (
    <section
      aria-label="Hero Banner — Awaiting Final Artwork"
      className="w-full border-b border-neutral-200 bg-neutral-50 select-none"
    >
      {/* ── Slide Stack ─────────────────────────────────────────── */}
      <div className="flex flex-col gap-px">
        {SLIDES.map((slide, index) => (
          <div
            key={slide.id}
            className={`
              relative w-full overflow-hidden
              h-[600px] sm:h-[520px] lg:h-[620px]
              bg-[#faf9f7]
              flex items-center justify-center
              border border-dashed border-neutral-300
              ${index > 0 ? 'mt-3' : ''}
            `}
          >
            {/* Subtle grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000005_1px,transparent_1px),linear-gradient(to_bottom,#00000005_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none" />

            {/* Corner markers */}
            <span className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-[#580D1A]/30" />
            <span className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-[#580D1A]/30" />
            <span className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-[#580D1A]/30" />
            <span className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-[#580D1A]/30" />

            {/* Centre content */}
            <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 space-y-5 max-w-2xl">
              {/* Slide number badge */}
              <span className="inline-block px-3 py-1 rounded-full bg-[#580D1A]/8 border border-[#580D1A]/20 text-[#580D1A] text-[10px] font-mono uppercase tracking-[0.3em]">
                Hero Banner — {slide.label}
              </span>

              <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-neutral-300 leading-tight">
                BANNER ARTWORK
                <br />
                <span className="text-neutral-200">GOES HERE</span>
              </h2>

              {/* Responsive size hints */}
              <div className="grid grid-cols-3 gap-3 w-full mt-2">
                {SIZE_SPECS.map((spec) => (
                  <div
                    key={spec.device}
                    className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-white border border-neutral-200 shadow-xs"
                  >
                    <span className="text-xl">{spec.icon}</span>
                    <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-neutral-500">
                      {spec.device}
                    </span>
                    <span className="text-[11px] font-mono font-semibold text-neutral-800">
                      {spec.dimensions}
                    </span>
                    <span className="text-[9px] font-mono text-neutral-400 uppercase tracking-wider">
                      {spec.ratio}
                    </span>
                  </div>
                ))}
              </div>

              <p className="text-[10px] font-mono text-neutral-400 max-w-sm leading-relaxed">
                Place final artwork in{' '}
                <code className="bg-neutral-100 px-1.5 py-0.5 rounded text-[#580D1A]">
                  /public/banners/
                </code>
                . Preferred format:{' '}
                <strong className="text-neutral-500">WebP + PNG fallback</strong>.
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* ── Designer Notes Footer ────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-12 py-6">
        <div className="rounded-xl border border-dashed border-neutral-300 bg-white p-5 sm:p-6">
          <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-neutral-400 mb-4">
            📐 Graphic Designer Specs — All 3 Slides
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-[11px] font-mono text-left text-neutral-600">
              <thead>
                <tr className="border-b border-neutral-200 text-[10px] uppercase tracking-widest text-neutral-400">
                  <th className="pr-6 pb-2">Device</th>
                  <th className="pr-6 pb-2">Dimensions</th>
                  <th className="pr-6 pb-2">Ratio</th>
                  <th className="pb-2">Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {SIZE_SPECS.map((spec) => (
                  <tr key={spec.device}>
                    <td className="pr-6 py-2.5 font-semibold text-neutral-800">
                      {spec.icon} {spec.device}
                    </td>
                    <td className="pr-6 py-2.5 text-[#580D1A] font-semibold">
                      {spec.dimensions}
                    </td>
                    <td className="pr-6 py-2.5">{spec.ratio}</td>
                    <td className="py-2.5 text-neutral-500">{spec.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-[10px] font-mono text-neutral-400">
            File naming:{' '}
            <code className="bg-neutral-50 border border-neutral-200 px-1.5 py-0.5 rounded text-neutral-600">
              banner-slide-[1|2|3]-[desktop|tablet|mobile].webp
            </code>
          </p>
        </div>
      </div>
    </section>
  );
}
