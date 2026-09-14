import { Metadata } from "next"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

export const metadata: Metadata = {
  title: "Garment Care & Fabric Longevity Guide | SNOOV",
  description:
    "Master the care of SNOOV garments. Complete washing protocols, flat-drying methods, textile preservation, and complimentary repair guidelines.",
  alternates: {
    canonical: "https://snoovlifestyle.com/garment-care",
  },
}

export default async function GarmentCarePage() {
  const contactEmail = "concierge@snoov.com"

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
        name: "Garment Care",
        item: "https://snoovlifestyle.com/garment-care",
      },
    ],
  }

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Care for Heavyweight Organic SNOOV Garments",
    description:
      "Official care instructions for washing, drying, ironing, and preserving certified organic cotton, European Flax®, and streetwear silhouettes.",
    step: [
      {
        "@type": "HowToStep",
        name: "Turn Garment Inside Out",
        text: "Invert your hoodie or tee to protect the outer textile face, print details, and fiber structure.",
      },
      {
        "@type": "HowToStep",
        name: "Wash at 30°C (Cold)",
        text: "Use a gentle 30°C / 86°F cycle with mild eco-friendly liquid detergent. Avoid harsh powder enzymes or bleach.",
      },
      {
        "@type": "HowToStep",
        name: "Reshape & Flat Air Dry",
        text: "Gently stretch the garment along the seams while damp and lay flat on a clean drying rack away from direct solar heat.",
      },
    ],
  }

  return (
    <div className="bg-snoov-canvas text-snoov-charcoal min-h-screen">
      {/* Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
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
            <span className="text-snoov-charcoal font-semibold">Garment Care</span>
          </nav>

          <div className="max-w-4xl">
            <span className="inline-block px-2.5 py-1 text-[10px] font-mono tracking-widest uppercase bg-snoov-sand text-snoov-charcoal/90 rounded-sm border border-snoov-border mb-4">
              Textile Preservation · Designed for a Decade of Wear
            </span>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-light tracking-tight text-snoov-charcoal leading-[1.1] mb-6">
              Garment Care & Longevity
            </h1>
            <p className="text-sm sm:text-base text-snoov-muted leading-relaxed max-w-2xl font-sans">
              Our heavyweight organic textiles and architectural cuts are engineered to evolve with wear. Proper laundering preserves the fiber density, rich botanical pigments, and sculptural drape for years to come.
            </p>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-snoov-border/60 text-xs font-mono">
              <div>
                <span className="text-snoov-muted block text-[10px] uppercase">WASH TEMPERATURE</span>
                <span className="text-snoov-charcoal font-semibold">Cold Only (30°C / 86°F)</span>
              </div>
              <div>
                <span className="text-snoov-muted block text-[10px] uppercase">DRYING STANDARD</span>
                <span className="text-snoov-green font-semibold">Flat Air Dry Only</span>
              </div>
              <div>
                <span className="text-snoov-muted block text-[10px] uppercase">DETERGENT</span>
                <span className="text-snoov-charcoal font-semibold">Gentle Eco Liquid</span>
              </div>
              <div>
                <span className="text-snoov-muted block text-[10px] uppercase">LIFETIME REPAIRS</span>
                <span className="text-snoov-green font-semibold">Complimentary Seam Care</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Main Content Grid ── */}
      <section className="content-container py-12 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Quick Index / Sticky Sidebar */}
          <aside className="lg:col-span-4">
            <div className="lg:sticky lg:top-28 space-y-6">
              <div className="p-6 bg-snoov-sand/40 border border-snoov-border rounded-base">
                <span className="text-[11px] font-mono uppercase tracking-widest text-snoov-charcoal font-semibold block mb-4">
                  00 / Care Guide Index
                </span>
                <nav className="space-y-2.5 text-xs text-snoov-muted">
                  <a href="#philosophy" className="block hover:text-snoov-green transition-colors">
                    01. The Less-is-More Washing Ethos
                  </a>
                  <a href="#fabric-guides" className="block hover:text-snoov-green transition-colors">
                    02. Material-Specific Care Protocols
                  </a>
                  <a href="#master-rules" className="block hover:text-snoov-green transition-colors">
                    03. Golden Rules: Wash, Dry & Steam
                  </a>
                  <a href="#storage" className="block hover:text-snoov-green transition-colors">
                    04. Storage & Archival Preservation
                  </a>
                  <a href="#repairs" className="block hover:text-snoov-green transition-colors">
                    05. Complimentary Repair Desk
                  </a>
                </nav>
              </div>

              {/* Repair Program Box */}
              <div className="p-6 bg-snoov-charcoal text-snoov-canvas rounded-base border border-snoov-charcoal space-y-3">
                <span className="text-[10px] font-mono tracking-widest uppercase text-snoov-sand/70 block">
                  LIFETIME CIRCULARITY
                </span>
                <h4 className="font-serif text-lg font-normal text-snoov-canvas">
                  Free Seam & Stitch Repair
                </h4>
                <p className="text-xs text-snoov-sand/80 leading-relaxed font-sans">
                  If a seam relaxes or a rivet requires replacement over the life of your garment, our Chandigarh team will repair it free of charge.
                </p>
                <a
                  href={`mailto:${contactEmail}?subject=Garment%20Repair%20Request`}
                  className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-snoov-canvas underline decoration-snoov-sand/40 hover:decoration-snoov-canvas transition-colors pt-2"
                >
                  <span>Request Garment Repair</span>
                  <span>↗</span>
                </a>
              </div>
            </div>
          </aside>

          {/* Detailed Care Articles */}
          <article className="lg:col-span-8 space-y-16 text-sm text-snoov-muted leading-relaxed font-sans">
            
            {/* 01. The Philosophy */}
            <div id="philosophy" className="scroll-mt-28 space-y-4 border-b border-snoov-border pb-12">
              <span className="text-[11px] font-mono uppercase tracking-widest text-snoov-green font-semibold block">
                01 / PHILOSOPHY
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif text-snoov-charcoal font-normal">
                1. The Less-is-More Washing Ethos
              </h2>
              <p>
                Over-washing is the primary cause of fiber breakdown in luxury natural textiles. Certified organic cotton, raw linen, and heavyweight hemp possess natural antibacterial properties and breathe effortlessly.
              </p>
              <p>
                Between wears, we recommend hanging your garments in a well-ventilated space or steaming them lightly. Wash only when genuinely necessary to double the lifespan of your pieces and conserve planetary water.
              </p>
            </div>

            {/* 02. Fabric-Specific Guides */}
            <div id="fabric-guides" className="scroll-mt-28 space-y-6 border-b border-snoov-border pb-12">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-widest text-snoov-green font-semibold block">
                  02 / MATERIAL SPECIFICS
                </span>
                <h2 className="text-2xl sm:text-3xl font-serif text-snoov-charcoal font-normal mt-1">
                  2. Material-Specific Care Protocols
                </h2>
                <p className="mt-2">
                  Follow these customized instructions based on the primary textile of your garment:
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                
                {/* Heavyweight Jersey & Fleece */}
                <div className="p-5 bg-snoov-sand/30 border border-snoov-border rounded-base space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-snoov-charcoal uppercase">
                      HEAVYWEIGHT JERSEY & FLEECE
                    </span>
                    <span className="text-[10px] font-mono text-snoov-green font-semibold">380–550 GSM</span>
                  </div>
                  <h3 className="font-serif text-base font-normal text-snoov-charcoal">
                    T-Shirts, Hoodies & Sweatpants
                  </h3>
                  <ul className="space-y-1 text-xs text-snoov-muted">
                    <li>• Always invert inside out before washing.</li>
                    <li>• Cold wash at max 30°C / 86°F on gentle spin (600–800 RPM).</li>
                    <li>• Reshape damp seams and lay flat on a drying rack.</li>
                    <li>• <strong>Never tumble dry</strong> to avoid shrinking the drop-shoulder cut.</li>
                  </ul>
                </div>

                {/* European Flax Linen */}
                <div className="p-5 bg-snoov-sand/30 border border-snoov-border rounded-base space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-snoov-charcoal uppercase">
                      EUROPEAN FLAX® LINEN
                    </span>
                    <span className="text-[10px] font-mono text-snoov-green font-semibold">HERITAGE WEAVE</span>
                  </div>
                  <h3 className="font-serif text-base font-normal text-snoov-charcoal">
                    Overshirts, Tailored Trousers & Blousons
                  </h3>
                  <ul className="space-y-1 text-xs text-snoov-muted">
                    <li>• Delicate wash cycle with plenty of water.</li>
                    <li>• Avoid wringing or twisting the fabric.</li>
                    <li>• Hang dry on a wide wooden coat hanger while moist.</li>
                    <li>• Warm steam iron while slightly damp for effortless drape.</li>
                  </ul>
                </div>

                {/* Fine Knitwear & Wool */}
                <div className="p-5 bg-snoov-sand/30 border border-snoov-border rounded-base space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-snoov-charcoal uppercase">
                      ORGANIC KNITWEAR
                    </span>
                    <span className="text-[10px] font-mono text-snoov-green font-semibold">FINE-GAUGE</span>
                  </div>
                  <h3 className="font-serif text-base font-normal text-snoov-charcoal">
                    Sweaters, Cardigans & Ribbed Tops
                  </h3>
                  <ul className="space-y-1 text-xs text-snoov-muted">
                    <li>• Hand wash in cool water using specialized wool detergent.</li>
                    <li>• Press out moisture between two clean towels (do not wring).</li>
                    <li>• Dry flat on a horizontal surface.</li>
                    <li>• <strong>Never hang knitwear</strong> (prevents shoulder dimples).</li>
                  </ul>
                </div>

                {/* Vegetable Tanned Leather */}
                <div className="p-5 bg-snoov-sand/30 border border-snoov-border rounded-base space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-snoov-charcoal uppercase">
                      VEGETABLE-TANNED LEATHER
                    </span>
                    <span className="text-[10px] font-mono text-snoov-green font-semibold">NATURAL PATINA</span>
                  </div>
                  <h3 className="font-serif text-base font-normal text-snoov-charcoal">
                    Belts, Bags & Leather Accents
                  </h3>
                  <ul className="space-y-1 text-xs text-snoov-muted">
                    <li>• Wipe clean with a slightly damp microfiber cloth.</li>
                    <li>• Avoid submersion in water or chemical solvents.</li>
                    <li>• Apply a thin coat of natural beeswax balm once yearly.</li>
                    <li>• Store in the provided organic cotton dust pouch.</li>
                  </ul>
                </div>

              </div>
            </div>

            {/* 03. Master Golden Rules */}
            <div id="master-rules" className="scroll-mt-28 space-y-6 border-b border-snoov-border pb-12">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-widest text-snoov-green font-semibold block">
                  03 / PROTOCOLS
                </span>
                <h2 className="text-2xl sm:text-3xl font-serif text-snoov-charcoal font-normal mt-1">
                  3. The Golden Rules: Wash, Dry & Steam
                </h2>
              </div>

              {/* Table */}
              <div className="border border-snoov-border rounded-base overflow-hidden bg-snoov-sand/10 divide-y divide-snoov-border text-xs">
                <div className="p-4 flex flex-col sm:flex-row justify-between gap-2">
                  <strong className="text-snoov-charcoal font-mono uppercase text-[11px]">
                    TEMPERATURE CONTROL
                  </strong>
                  <span className="text-snoov-muted sm:text-right max-w-sm">
                    Always wash in cold water (30°C / 86°F maximum). Hot water breaks natural fiber bonds and causes irreversible shrinkage.
                  </span>
                </div>
                <div className="p-4 flex flex-col sm:flex-row justify-between gap-2">
                  <strong className="text-snoov-charcoal font-mono uppercase text-[11px]">
                    ZERO CHEMICAL BLEACH
                  </strong>
                  <span className="text-snoov-muted sm:text-right max-w-sm">
                    Never use chlorine bleach or stain removers containing harsh sulfates. Use natural oxygen-based spot treatments.
                  </span>
                </div>
                <div className="p-4 flex flex-col sm:flex-row justify-between gap-2">
                  <strong className="text-snoov-charcoal font-mono uppercase text-[11px]">
                    STEAM OVER FLAT IRON
                  </strong>
                  <span className="text-snoov-muted sm:text-right max-w-sm">
                    Garment steamers relax fibers without crushing surface weave textures. If ironing, always iron inside out on low heat.
                  </span>
                </div>
                <div className="p-4 flex flex-col sm:flex-row justify-between gap-2">
                  <strong className="text-snoov-charcoal font-mono uppercase text-[11px]">
                    NO MACHINE TUMBLE DRY
                  </strong>
                  <span className="text-snoov-muted sm:text-right max-w-sm">
                    Tumble dryers subject heavyweight jersey to violent friction and extreme heat. Flat air-drying keeps silhouettes sharp.
                  </span>
                </div>
              </div>
            </div>

            {/* 04. Storage & Archiving */}
            <div id="storage" className="scroll-mt-28 space-y-4 border-b border-snoov-border pb-12">
              <span className="text-[11px] font-mono uppercase tracking-widest text-snoov-green font-semibold block">
                04 / PRESERVATION
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif text-snoov-charcoal font-normal">
                4. Storage & Archival Preservation
              </h2>
              <p>
                When putting your seasonal capsule pieces into storage:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1 text-xs">
                <div className="p-3.5 bg-snoov-sand/20 border border-snoov-border rounded-sm">
                  <strong className="text-snoov-charcoal block font-mono uppercase mb-1">
                    FOLD KNITWEAR
                  </strong>
                  <p className="text-snoov-muted text-[11px]">
                    Always fold sweaters and heavy fleece hoodies flat to prevent neck and shoulder sagging.
                  </p>
                </div>
                <div className="p-3.5 bg-snoov-sand/20 border border-snoov-border rounded-sm">
                  <strong className="text-snoov-charcoal block font-mono uppercase mb-1">
                    CONTOURED HANGERS
                  </strong>
                  <p className="text-snoov-muted text-[11px]">
                    Use wide, contoured wooden hangers for tailored jackets and overcoats to maintain shoulder structure.
                  </p>
                </div>
                <div className="p-3.5 bg-snoov-sand/20 border border-snoov-border rounded-sm">
                  <strong className="text-snoov-charcoal block font-mono uppercase mb-1">
                    CEDAR BLOCKS
                  </strong>
                  <p className="text-snoov-muted text-[11px]">
                    Place natural red cedar blocks in your wardrobe to repel moths without toxic chemical mothballs.
                  </p>
                </div>
              </div>
            </div>

            {/* 05. Repairs */}
            <div id="repairs" className="scroll-mt-28 space-y-4">
              <span className="text-[11px] font-mono uppercase tracking-widest text-snoov-green font-semibold block">
                05 / LIFETIME CARE
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif text-snoov-charcoal font-normal">
                5. Complimentary Repair Service
              </h2>
              <p>
                We stand behind the engineering of every SNOOV silhouette. If a seam loosens, a button falls off, or hardware fails through normal wear, send it to our Chandigarh workshop for a complimentary repair.
              </p>
              
              <div className="p-6 bg-snoov-sand/30 border border-snoov-border rounded-base space-y-2 font-mono text-xs text-snoov-charcoal">
                <div>
                  <span className="text-snoov-muted block text-[10px] uppercase">REPAIR INTAKE EMAIL</span>
                  <a href={`mailto:${contactEmail}`} className="text-snoov-green font-semibold hover:underline">
                    {contactEmail}
                  </a>
                </div>
                <div>
                  <span className="text-snoov-muted block text-[10px] uppercase">REPAIR TURNAROUND</span>
                  <span>7 to 10 business days from parcel receipt.</span>
                </div>
              </div>
            </div>

          </article>
        </div>
      </section>
    </div>
  )
}
