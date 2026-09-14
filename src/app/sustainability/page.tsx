import { Metadata } from "next"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

export const metadata: Metadata = {
  title: "Sustainability, Organic Fibers & Traceability | SNOOV",
  description:
    "Explore SNOOV's verified sustainable standards. GOTS certified organic cotton, European Flax®, closed-loop non-toxic dyeing, and supply chain traceability.",
  alternates: {
    canonical: "https://snoovlifestyle.com/sustainability",
  },
}

export default async function SustainabilityPage() {
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
        name: "Sustainability & Traceability",
        item: "https://snoovlifestyle.com/sustainability",
      },
    ],
  }

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "SNOOV Conscious Luxury: Organic Textiles & Traceability Standards",
    description:
      "A comprehensive audit of SNOOV's sustainable supply chain, GOTS certified organic cotton, European Flax® linen, and circular garment life cycles.",
    publisher: {
      "@type": "Organization",
      name: "SNOOV",
      logo: "https://snoovlifestyle.com/logo.png",
    },
    dateModified: "2026-08-31",
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
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
            <span className="text-snoov-charcoal font-semibold">Sustainability & Traceability</span>
          </nav>

          <div className="max-w-4xl">
            <span className="inline-block px-2.5 py-1 text-[10px] font-mono tracking-widest uppercase bg-snoov-sand text-snoov-charcoal/90 rounded-sm border border-snoov-border mb-4">
              Conscious Luxury · GOTS & European Flax® Certified
            </span>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-light tracking-tight text-snoov-charcoal leading-[1.1] mb-6">
              Sustainability & Traceability
            </h1>
            <p className="text-sm sm:text-base text-snoov-muted leading-relaxed max-w-2xl font-sans">
              True luxury is accountability. We reject fast-fashion overproduction in favor of disciplined small-batch drops, certified organic natural textiles, non-toxic botanic dyeing, and complete farm-to-garment traceability.
            </p>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-snoov-border/60 text-xs font-mono">
              <div>
                <span className="text-snoov-muted block text-[10px] uppercase">COTTON STANDARD</span>
                <span className="text-snoov-green font-semibold">100% GOTS Organic</span>
              </div>
              <div>
                <span className="text-snoov-muted block text-[10px] uppercase">FLAX & LINEN</span>
                <span className="text-snoov-charcoal font-semibold">European Flax®</span>
              </div>
              <div>
                <span className="text-snoov-muted block text-[10px] uppercase">DYEING PROCESS</span>
                <span className="text-snoov-charcoal font-semibold">Oeko-Tex Standard 100</span>
              </div>
              <div>
                <span className="text-snoov-muted block text-[10px] uppercase">CIRCULAR PLEDGE</span>
                <span className="text-snoov-green font-semibold">Lifetime Care & Repair</span>
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
                  00 / Audit Index
                </span>
                <nav className="space-y-2.5 text-xs text-snoov-muted">
                  <a href="#philosophy" className="block hover:text-snoov-green transition-colors">
                    01. The Anti-Fast-Fashion Stance
                  </a>
                  <a href="#materials" className="block hover:text-snoov-green transition-colors">
                    02. Certified Material Matrix
                  </a>
                  <a href="#dyeing" className="block hover:text-snoov-green transition-colors">
                    03. Closed-Loop Low-Impact Dyeing
                  </a>
                  <a href="#traceability" className="block hover:text-snoov-green transition-colors">
                    04. Farm-to-Garment Traceability Map
                  </a>
                  <a href="#circularity" className="block hover:text-snoov-green transition-colors">
                    05. Circularity & Repair Pledge
                  </a>
                </nav>
              </div>

              {/* Verified Certificate Card */}
              <div className="p-6 bg-snoov-sand/40 border border-snoov-border rounded-base space-y-3">
                <span className="text-[10px] font-mono tracking-widest uppercase text-snoov-green font-semibold block">
                  GOTS TC AUDIT STANDARD
                </span>
                <p className="text-xs text-snoov-muted leading-relaxed font-sans">
                  We maintain public transaction certificates for every cotton bale and textile bolt processed in our production network.
                </p>
                <a
                  href="mailto:sustainability@snoov.com?subject=Certification%20Verification%20Request"
                  className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-snoov-charcoal underline decoration-snoov-muted/40 hover:decoration-snoov-charcoal transition-colors pt-2"
                >
                  <span>Request Certificate Audit</span>
                  <span>↗</span>
                </a>
              </div>
            </div>
          </aside>

          {/* Detailed Sustainability Articles */}
          <article className="lg:col-span-8 space-y-16 text-sm text-snoov-muted leading-relaxed font-sans">
            
            {/* 01. The Philosophy */}
            <div id="philosophy" className="scroll-mt-28 space-y-4 border-b border-snoov-border pb-12">
              <span className="text-[11px] font-mono uppercase tracking-widest text-snoov-green font-semibold block">
                01 / ETHOS
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif text-snoov-charcoal font-normal">
                1. The Anti-Fast-Fashion Stance
              </h2>
              <p>
                The greatest threat to environmental sustainability in fashion is mindless volume. SNOOV does not adhere to rapid 52-week seasonal retail calendars. 
              </p>
              <p>
                Instead, we craft architectural silhouettes engineered to endure for years. Every capsule drop is produced in disciplined quantities calibrated against real community demand, completely eliminating deadstock landfill waste.
              </p>
            </div>

            {/* 02. Certified Material Matrix */}
            <div id="materials" className="scroll-mt-28 space-y-6 border-b border-snoov-border pb-12">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-widest text-snoov-green font-semibold block">
                  02 / MATERIAL STANDARDS
                </span>
                <h2 className="text-2xl sm:text-3xl font-serif text-snoov-charcoal font-normal mt-1">
                  2. Certified Material Matrix
                </h2>
                <p className="mt-2">
                  We use 100% certified organic and renewable natural fibers across our collections:
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                
                {/* GOTS Cotton */}
                <div className="p-5 bg-snoov-sand/30 border border-snoov-border rounded-base space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-snoov-green uppercase">
                      GOTS ORGANIC COTTON
                    </span>
                    <span className="text-[10px] font-mono text-snoov-muted">100% NON-GMO</span>
                  </div>
                  <h3 className="font-serif text-base font-normal text-snoov-charcoal">
                    Rain-Fed Organic Heavyweight Jersey
                  </h3>
                  <p className="text-xs text-snoov-muted">
                    Cultivated without synthetic chemical pesticides, petroleum fertilizers, or toxic defoliants. Consumes up to 88% less water than industrial conventional cotton.
                  </p>
                </div>

                {/* European Flax */}
                <div className="p-5 bg-snoov-sand/30 border border-snoov-border rounded-base space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-snoov-green uppercase">
                      EUROPEAN FLAX® LINEN
                    </span>
                    <span className="text-[10px] font-mono text-snoov-muted">ZERO IRRIGATION</span>
                  </div>
                  <h3 className="font-serif text-base font-normal text-snoov-charcoal">
                    Western European Heritage Flax
                  </h3>
                  <p className="text-xs text-snoov-muted">
                    Grown naturally with rainwater in France and Belgium. Flax is a natural carbon sink that produces zero agricultural waste, yielding breathable, thermoregulating textiles.
                  </p>
                </div>

                {/* Organic Hemp */}
                <div className="p-5 bg-snoov-sand/30 border border-snoov-border rounded-base space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-snoov-green uppercase">
                      HEMP & TACTILE FIBERS
                    </span>
                    <span className="text-[10px] font-mono text-snoov-muted">SOIL REGENERATIVE</span>
                  </div>
                  <h3 className="font-serif text-base font-normal text-snoov-charcoal">
                    Natural High-Tensile Fibers
                  </h3>
                  <p className="text-xs text-snoov-muted">
                    Hemp actively replenishes soil nutrients during growth and requires minimal land. It creates heavyweight, durable streetwear with an unmistakable vintage drape.
                  </p>
                </div>

                {/* Vegetable Tanned Leather */}
                <div className="p-5 bg-snoov-sand/30 border border-snoov-border rounded-base space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-snoov-green uppercase">
                      VEGETABLE-TANNED
                    </span>
                    <span className="text-[10px] font-mono text-snoov-muted">ZERO CHROMIUM</span>
                  </div>
                  <h3 className="font-serif text-base font-normal text-snoov-charcoal">
                    Natural Bark & Plant Tannins
                  </h3>
                  <p className="text-xs text-snoov-muted">
                    For our leather accessories, we use traditional Italian plant-based tanning extracts (chestnut, mimosa, quebracho) without hazardous heavy metals.
                  </p>
                </div>

              </div>
            </div>

            {/* 03. Closed-Loop Dyeing */}
            <div id="dyeing" className="scroll-mt-28 space-y-4 border-b border-snoov-border pb-12">
              <span className="text-[11px] font-mono uppercase tracking-widest text-snoov-green font-semibold block">
                03 / CLEAN CHEMISTRY
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif text-snoov-charcoal font-normal">
                3. Closed-Loop Low-Impact Dyeing
              </h2>
              <p>
                Textile processing is traditionally the dirtiest phase of garment manufacturing. SNOOV enforces closed-loop wet-processing protocols:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm">
                <li>
                  <strong className="text-snoov-charcoal">Oeko-Tex Standard 100 Certified:</strong> Every pigment, dye lot, and finishing agent is certified completely free from harmful aromatic amines, formaldehyde, and phthalates.
                </li>
                <li>
                  <strong className="text-snoov-charcoal">Water Recycling:</strong> Our dyehouses operate closed-loop reverse-osmosis filtration, capturing and recycling over 92% of water back into subsequent dye batches.
                </li>
                <li>
                  <strong className="text-snoov-charcoal">Zero Toxic Discharge:</strong> Strict compliance with ZDHC (Zero Discharge of Hazardous Chemicals) guidelines ensures no hazardous effluents reach surrounding waterways.
                </li>
              </ul>
            </div>

            {/* 04. Farm-to-Garment Traceability */}
            <div id="traceability" className="scroll-mt-28 space-y-6 border-b border-snoov-border pb-12">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-widest text-snoov-green font-semibold block">
                  04 / TRANSPARENCY
                </span>
                <h2 className="text-2xl sm:text-3xl font-serif text-snoov-charcoal font-normal mt-1">
                  4. Farm-to-Garment Traceability Map
                </h2>
                <p className="mt-2">
                  We maintain direct relationships with every link in our value chain:
                </p>
              </div>

              {/* Traceability Grid */}
              <div className="border border-snoov-border rounded-base overflow-hidden bg-snoov-sand/10 divide-y divide-snoov-border text-xs">
                
                <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <span className="font-mono text-snoov-green font-semibold block text-[10px] uppercase">
                      TIER 4 · RAW FIBER AGRICULTURE
                    </span>
                    <strong className="text-snoov-charcoal block text-xs">Organic Cotton & Flax Farms</strong>
                    <span className="text-snoov-muted text-[11px]">Normandy (France) & Punjab / Gujarat (India)</span>
                  </div>
                  <div className="sm:text-right font-mono text-[11px] text-snoov-charcoal">
                    GOTS & European Flax® Audited
                  </div>
                </div>

                <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <span className="font-mono text-snoov-green font-semibold block text-[10px] uppercase">
                      TIER 3 · SPINNING & WEAVING
                    </span>
                    <strong className="text-snoov-charcoal block text-xs">Heritage Ring-Spinning Mills</strong>
                    <span className="text-snoov-muted text-[11px]">Coimbatore & Ludhiana (India)</span>
                  </div>
                  <div className="sm:text-right font-mono text-[11px] text-snoov-charcoal">
                    ISO 14001 Environmental Standard
                  </div>
                </div>

                <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <span className="font-mono text-snoov-green font-semibold block text-[10px] uppercase">
                      TIER 2 · WET PROCESSING & DYEING
                    </span>
                    <strong className="text-snoov-charcoal block text-xs">Closed-Loop Botanical Dyehouses</strong>
                    <span className="text-snoov-muted text-[11px]">Ludhiana & Ahmedabad (India)</span>
                  </div>
                  <div className="sm:text-right font-mono text-[11px] text-snoov-charcoal">
                    Oeko-Tex Standard 100
                  </div>
                </div>

                <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-mono text-snoov-green uppercase font-semibold block mb-1">
                      TIER 1 · CUT, SEW & GARMENT FINISHING
                    </span>
                    <strong className="text-snoov-charcoal block text-xs">Production Workshops</strong>
                    <span className="text-snoov-muted text-[11px]">Chandigarh Hub — Punjab / Tricity (India)</span>
                  </div>
                  <div className="sm:text-right font-mono text-[11px] text-snoov-charcoal">
                    Fair Wage & Artisan Certified
                  </div>
                </div>

              </div>
            </div>

            {/* 05. Circularity & Lifetime Care */}
            <div id="circularity" className="scroll-mt-28 space-y-4">
              <span className="text-[11px] font-mono uppercase tracking-widest text-snoov-green font-semibold block">
                05 / CIRCULARITY
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif text-snoov-charcoal font-normal">
                5. Circularity & Lifetime Care Pledge
              </h2>
              <p>
                A garment&apos;s journey does not end at checkout. SNOOV actively supports the full lifecycle of your pieces:
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-xs">
                <div className="p-4 bg-snoov-sand/30 border border-snoov-border rounded-base space-y-1.5">
                  <strong className="text-snoov-charcoal block font-mono uppercase">
                    Complimentary Seam Repair
                  </strong>
                  <p className="text-snoov-muted">
                    If your garment experiences a structural seam failure or zipper issue, our team will repair it free of charge. Consult our{" "}
                    <LocalizedClientLink href="/garment-care" className="text-snoov-green underline">
                      Garment Care Guide
                    </LocalizedClientLink>.
                  </p>
                </div>

                <div className="p-4 bg-snoov-sand/30 border border-snoov-border rounded-base space-y-1.5">
                  <strong className="text-snoov-charcoal block font-mono uppercase">
                    Circular Buyback Archive (+10%)
                  </strong>
                  <p className="text-snoov-muted">
                    Return any pre-loved SNOOV piece for recycling or archival curation, and receive 10% in instant bonus store credit toward your next capsule order.
                  </p>
                </div>
              </div>
            </div>

          </article>
        </div>
      </section>
    </div>
  )
}
