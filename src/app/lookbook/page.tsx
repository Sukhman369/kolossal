import { Metadata } from "next"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

export const metadata: Metadata = {
  title: "Lookbook & Editorial Archive | SNOOV",
  description:
    "Explore SNOOV's seasonal lookbooks, campaign editorials, architectural tailoring silhouettes, and high-contrast GenZ streetwear archives.",
  alternates: {
    canonical: "https://snoovlifestyle.com/lookbook",
  },
}

export default async function LookbookPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://snoovlifestyle.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Lookbook",
        item: "https://snoovlifestyle.com/lookbook",
      },
    ],
  }

  const looks = [
    {
      id: "LOOK 01",
      title: "The Orca Trench & Heavyweight Mockneck",
      season: "SS26 Collection",
      fabric: "500 GSM Organic French Terry · European Flax®",
      aspect: "aspect-[3/4]",
      tag: "OVERSIZED DRAPE",
    },
    {
      id: "LOOK 02",
      title: "Architectural Drop-Shoulder Hoodie & Relaxed Pant",
      season: "SS26 Collection",
      fabric: "480 GSM Heavy Jersey · Mineral Dye Charcoal",
      aspect: "aspect-[4/5]",
      tag: "MONOCHROME STEALTH",
    },
    {
      id: "LOOK 03",
      title: "Structured Boxy Blazer in Raw Unbleached Hemp",
      season: "SS26 Collection",
      fabric: "100% Organic Hemp & Linen Blend",
      aspect: "aspect-[3/4]",
      tag: "TAILORED RESTRAINT",
    },
    {
      id: "LOOK 04",
      title: "Tactile Fine-Gauge Knit & Pleated Wide Trouser",
      season: "SS26 Collection",
      fabric: "GOTS Certified Organic Merino & Cotton",
      aspect: "aspect-[4/5]",
      tag: "MINIMALIST SILHOUETTE",
    },
    {
      id: "LOOK 05",
      title: "Cropped Heavyweight Blouson & Leather Crossbody",
      season: "SS26 Collection",
      fabric: "Vegetable-Tanned Cowhide · Canvas Canvas",
      aspect: "aspect-[3/4]",
      tag: "STREET ARCHITECTURE",
    },
    {
      id: "LOOK 06",
      title: "Monolithic Overshirt & Distressed Raw Denim",
      season: "SS26 Collection",
      fabric: "14oz Selvedge Organic Cotton",
      aspect: "aspect-[4/5]",
      tag: "ENDURING WEAR",
    },
  ]

  return (
    <div className="bg-snoov-canvas text-snoov-charcoal min-h-screen">
      {/* Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* ── Page Header / Editorial Masthead ── */}
      <section className="border-b border-snoov-border pt-12 sm:pt-20 pb-12 sm:pb-16">
        <div className="content-container">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-snoov-muted mb-6">
            <LocalizedClientLink href="/" className="hover:text-snoov-green transition-colors">
              Home
            </LocalizedClientLink>
            <span>/</span>
            <span className="text-snoov-charcoal font-semibold">Lookbook</span>
          </nav>

          <div className="max-w-4xl space-y-6">
            <div className="flex items-center gap-3">
              <span className="px-2.5 py-1 text-[10px] font-mono tracking-widest uppercase bg-snoov-charcoal text-snoov-canvas rounded-sm font-semibold">
                SEASONAL ARCHIVE · SS26
              </span>
              <span className="text-[11px] font-mono text-snoov-green font-semibold uppercase tracking-wider">
                EDITORIAL CAMPAIGN
              </span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-light tracking-tight text-snoov-charcoal leading-[1.05]">
              The Orca Instinct: Lookbook SS26
            </h1>

            <p className="text-sm sm:text-base text-snoov-muted leading-relaxed max-w-2xl font-sans">
              High contrast, drop-shoulder silhouettes, and tactile organic weights. Sculpted with architectural discipline for the next generation.
            </p>
          </div>
        </div>
      </section>

      {/* ── Featured Campaign Hero Visual Slot ── */}
      <section className="content-container pt-8 sm:pt-12">
        <div className="w-full relative aspect-[16/9] sm:aspect-[21/9] bg-snoov-sand/50 border border-snoov-border rounded-base flex flex-col items-center justify-center text-center p-6 sm:p-12 overflow-hidden select-none">
          <div className="space-y-3 max-w-md">
            <span className="inline-block px-3 py-1 bg-snoov-charcoal text-snoov-canvas text-[10px] font-mono uppercase tracking-widest rounded-sm font-semibold">
              FEATURED EDITORIAL COVER
            </span>
            <p className="text-xs sm:text-sm font-mono text-snoov-muted uppercase tracking-wider">
              [ 1920 × 850px · SS26 CAMPAIGN KEY VISUAL ]
            </p>
            <p className="text-[11px] text-snoov-muted/80 font-sans italic">
              Key seasonal visual: Look 01 & Look 02 duo styling in Atlantic ocean mist.
            </p>
          </div>
        </div>
      </section>

      {/* ── Editorial Looks Gallery Grid ── */}
      <section className="content-container py-16 sm:py-24">
        <div className="space-y-12">
          
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-snoov-border pb-6 gap-4">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-snoov-green font-semibold block mb-1">
                01 / CURATED RUNWAY & STREET EDITORIAL
              </span>
              <h2 className="text-2xl sm:text-4xl font-serif text-snoov-charcoal font-normal">
                Silhouette Gallery
              </h2>
            </div>
            <div className="text-xs font-mono text-snoov-muted">
              6 ARCHIVAL LOOKS · EDITED BY SNOOV
            </div>
          </div>

          {/* Asymmetric Looks Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
            {looks.map((look) => (
              <div key={look.id} className="group space-y-4">
                
                {/* Look Image Placeholder */}
                <div className={`w-full ${look.aspect} bg-snoov-sand/40 border border-snoov-border rounded-base flex flex-col items-center justify-center p-6 text-center transition-all duration-300 group-hover:border-snoov-green/50 group-hover:bg-snoov-sand/60 select-none`}>
                  <span className="px-2.5 py-1 bg-snoov-canvas text-snoov-charcoal text-[10px] font-mono uppercase tracking-widest rounded-sm border border-snoov-border font-semibold mb-2">
                    {look.id}
                  </span>
                  <span className="text-[11px] font-mono text-snoov-green font-semibold uppercase tracking-wider mb-2">
                    {look.tag}
                  </span>
                  <p className="text-xs font-mono text-snoov-muted uppercase tracking-wider">
                    [ EDITORIAL IMAGE SLOT · {look.aspect.replace("aspect-[", "").replace("]", "")} ]
                  </p>
                </div>

                {/* Look Details & Meta */}
                <div className="space-y-1.5 pt-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-snoov-green uppercase font-semibold">
                      {look.id} · {look.season}
                    </span>
                    <LocalizedClientLink
                      href="/store"
                      className="text-[10px] font-mono uppercase text-snoov-charcoal hover:text-snoov-green transition-colors font-semibold flex items-center gap-1"
                    >
                      <span>Shop Look</span>
                      <span>→</span>
                    </LocalizedClientLink>
                  </div>
                  <h3 className="font-serif text-lg font-normal text-snoov-charcoal leading-snug">
                    {look.title}
                  </h3>
                  <p className="text-xs text-snoov-muted font-sans">
                    {look.fabric}
                  </p>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── Backstage Moodboard & Credits ── */}
      <section className="content-container pb-20 sm:pb-28">
        <div className="p-8 sm:p-12 bg-snoov-sand/30 border border-snoov-border rounded-base space-y-8">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-snoov-border pb-6">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-snoov-green font-semibold block mb-1">
                CAMPAIGN CREDITS
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-normal text-snoov-charcoal">
                SS26 Production Credits
              </h3>
            </div>
            <span className="text-xs font-mono text-snoov-muted">
              CHANDIGARH / TRICITY
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-xs font-mono">
            <div>
              <span className="text-snoov-muted text-[10px] uppercase block mb-1">CREATIVE DIRECTION</span>
              <span className="text-snoov-charcoal font-semibold">SNOOV Collective</span>
            </div>
            <div>
              <span className="text-snoov-muted text-[10px] uppercase block mb-1">PHOTOGRAPHY</span>
              <span className="text-snoov-charcoal font-semibold">Editorial Archive</span>
            </div>
            <div>
              <span className="text-snoov-muted text-[10px] uppercase block mb-1">STYLING & CASTING</span>
              <span className="text-snoov-charcoal font-semibold">GenZ Community Pod</span>
            </div>
            <div>
              <span className="text-snoov-muted text-[10px] uppercase block mb-1">DESIGN & PRODUCTION</span>
              <span className="text-snoov-charcoal font-semibold">Chandigarh, India</span>
            </div>
          </div>

          {/* Press / Stylist Download CTA */}
          <div className="pt-6 border-t border-snoov-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <p className="text-xs text-snoov-muted font-sans max-w-lg">
              Stylists, editorial publications, and journalists may request full high-resolution TIFF campaign assets and loan samples directly from our press office.
            </p>
            <LocalizedClientLink
              href="/contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-snoov-charcoal text-snoov-canvas text-xs font-mono uppercase tracking-wider font-semibold rounded-sm hover:bg-snoov-green transition-colors shrink-0"
            >
              <span>Contact Press Desk</span>
              <span>→</span>
            </LocalizedClientLink>
          </div>

        </div>
      </section>
    </div>
  )
}
