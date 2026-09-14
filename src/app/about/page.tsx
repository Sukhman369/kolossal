import { Metadata } from "next"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

export const metadata: Metadata = {
  title: "Our Story — Architectural Craft & GenZ Collective | KOLOSSAL",
  description:
    "Discover the origins of KOLOSSAL. Architectural silhouettes, custom 500 GSM organic cotton, and a conscious luxury streetwear community for the next generation.",
  alternates: {
    canonical: "https://kolossal.com/about",
  },
}

export default async function AboutStoryPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://kolossal.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Our Story",
        item: "https://kolossal.com/about",
      },
    ],
  }

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "KOLOSSAL",
    url: "https://kolossal.com",
    logo: "https://kolossal.com/logo.png",
    description:
      "A conscious luxury streetwear collective designed for GenZ, inspired by brutalist architecture, raw monochrome elegance, and enduring material integrity.",
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />

      {/* ── 01. Editorial Masthead ── */}
      <section className="border-b border-snoov-border pt-36 sm:pt-40 pb-12 sm:pb-16">
        <div className="content-container">
          
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-snoov-muted mb-6">
            <LocalizedClientLink href="/" className="hover:text-snoov-green transition-colors">
              Home
            </LocalizedClientLink>
            <span>/</span>
            <span className="text-snoov-charcoal font-semibold">Our Story</span>
          </nav>

          <div className="max-w-4xl space-y-6">
            <div className="flex items-center gap-3">
              <span className="px-2.5 py-1 text-[10px] font-mono tracking-widest uppercase bg-snoov-charcoal text-snoov-canvas rounded-sm font-semibold">
                THE BRAND MANIFESTO
              </span>
              <span className="text-[11px] font-mono text-snoov-green font-semibold uppercase tracking-wider">
                GENZ STREETWEAR COLLECTIVE
              </span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-light tracking-tight text-snoov-charcoal leading-[1.05]">
              Instinct Over Tradition.
            </h1>

            <p className="text-base sm:text-xl text-snoov-muted leading-relaxed max-w-3xl font-sans">
              KOLOSSAL is built for the next generation. We are forging a community and a visual dialect shaped by culture, architectural cuts, and structural permanence.
            </p>
          </div>
        </div>
      </section>

      {/* ── 02. Main Hero Wide Banner Image Placeholder ── */}
      <section className="content-container pt-8 sm:pt-12">
        <div className="w-full relative aspect-[16/9] sm:aspect-[21/9] bg-snoov-sand/50 border border-snoov-border rounded-base flex flex-col items-center justify-center text-center p-6 sm:p-12 overflow-hidden select-none">
          <div className="space-y-3 max-w-md">
            <span className="inline-block px-3 py-1 bg-snoov-charcoal text-snoov-canvas text-[10px] font-mono uppercase tracking-widest rounded-sm font-semibold">
              IMAGE SLOT · MAIN BRAND HERO BANNER
            </span>
            <p className="text-xs sm:text-sm font-mono text-snoov-muted uppercase tracking-wider">
              [ 1920 × 820px · WIDE CINEMATIC HERO CAMPAIGN IMAGE ]
            </p>
            <p className="text-[11px] text-snoov-muted/80 font-sans italic">
              Space reserved for high-res brand visual: Architectural monochrome aesthetic / GenZ community campaign banner.
            </p>
          </div>
        </div>
      </section>

      {/* ── 03. Structured Story Chapters (Single Centered Flow) ── */}
      <section className="content-container py-16 sm:py-24">
        <div className="max-w-4xl mx-auto space-y-20">
          
          {/* Chapter 01: Architectural Discipline */}
          <div className="space-y-6 border-b border-snoov-border pb-16">
            <span className="text-[11px] font-mono uppercase tracking-widest text-snoov-green font-semibold block">
              CHAPTER 01 / ARCHITECTURAL DISCIPLINE
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif text-snoov-charcoal font-normal">
              Monumental Form & Architectural Weight
            </h2>
            <p className="text-sm sm:text-base text-snoov-muted leading-relaxed font-sans">
              True luxury does not design with superficial ornamentation; it designs with absolute purpose. KOLOSSAL constructs silhouettes with stark monochrome presence, structured heavyweight drape, and architectural discipline.
            </p>
            
            {/* Story Text Placeholder Block */}
            <div className="p-6 bg-snoov-sand/20 border-2 border-dashed border-snoov-border rounded-base space-y-2">
              <span className="text-[10px] font-mono uppercase text-snoov-green font-semibold block tracking-wider">
                [ EDITORIAL TEXT SPACE: THE FOUNDER & DESIGN PHILOSOPHY STORY ]
              </span>
              <p className="text-xs text-snoov-muted italic">
                *Reserved for your detailed story: The initial spark, our architectural design philosophy, and how structural permanence informs the brand.*
              </p>
            </div>

            {/* Section Image Slot 1 */}
            <div className="w-full aspect-[16/10] bg-snoov-sand/40 border border-snoov-border rounded-base flex flex-col items-center justify-center text-center p-6 overflow-hidden select-none mt-6">
              <span className="px-3 py-1 bg-snoov-sand text-snoov-charcoal text-[10px] font-mono uppercase tracking-widest rounded-sm border border-snoov-border font-semibold mb-2">
                IMAGE SLOT · SECTION 01
              </span>
              <p className="text-xs font-mono text-snoov-muted uppercase tracking-wider">
                [ 1200 × 750px · RAW TEXTILE GEOMETRY / HEAVYWEIGHT CUTS ]
              </p>
              <p className="text-[11px] text-snoov-muted/80 font-sans italic mt-1">
                Space reserved for editorial shot: Textile close-up / monochrome shadow silhouette.
              </p>
            </div>
          </div>

          {/* Chapter 02: The Community Collective */}
          <div className="space-y-6 border-b border-snoov-border pb-16">
            <span className="text-[11px] font-mono uppercase tracking-widest text-snoov-green font-semibold block">
              CHAPTER 02 / THE COLLECTIVE
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif text-snoov-charcoal font-normal">
              More Than Apparel. A Living Collective.
            </h2>
            <p className="text-sm sm:text-base text-snoov-muted leading-relaxed font-sans">
              Great design is never solitary—its power is the collective. KOLOSSAL is engineered as an open creative community where our audience co-creates and steers our capsule drops.
            </p>

            {/* Community Story Placeholder */}
            <div className="p-6 bg-snoov-sand/20 border-2 border-dashed border-snoov-border rounded-base space-y-2">
              <span className="text-[10px] font-mono uppercase text-snoov-green font-semibold block tracking-wider">
                [ COMMUNITY & GENZ MANIFESTO TEXT SPACE ]
              </span>
              <p className="text-xs text-snoov-muted italic">
                *Reserved for community narrative: Drop culture, digital meetups, music and skate influences, and building a genuine youth-led collective.*
              </p>
            </div>

            {/* Section Image Slot 2 */}
            <div className="w-full aspect-[16/10] bg-snoov-sand/40 border border-snoov-border rounded-base flex flex-col items-center justify-center text-center p-6 overflow-hidden select-none mt-6">
              <span className="px-3 py-1 bg-snoov-sand text-snoov-charcoal text-[10px] font-mono uppercase tracking-widest rounded-sm border border-snoov-border font-semibold mb-2">
                IMAGE SLOT · SECTION 02
              </span>
              <p className="text-xs font-mono text-snoov-muted uppercase tracking-wider">
                [ 1200 × 750px · COMMUNITY & LIFESTYLE EDITORIAL ]
              </p>
              <p className="text-[11px] text-snoov-muted/80 font-sans italic mt-1">
                Space reserved for community imagery: Streetwear lookbook, backstage design lab, or skate culture visuals.
              </p>
            </div>
          </div>

          {/* Chapter 03: The Silhouette & Craft */}
          <div className="space-y-6 border-b border-snoov-border pb-16">
            <span className="text-[11px] font-mono uppercase tracking-widest text-snoov-green font-semibold block">
              CHAPTER 03 / SILHOUETTE & ARCHITECTURE
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif text-snoov-charcoal font-normal">
              Architectural Oversized Streetwear
            </h2>
            <p className="text-sm sm:text-base text-snoov-muted leading-relaxed font-sans">
              Heavyweight organic cotton, drop-shoulder geometry, tactile ribbing, and enduring silhouettes designed to be worn with effortless presence.
            </p>

            {/* Craft Placeholder */}
            <div className="p-6 bg-snoov-sand/20 border-2 border-dashed border-snoov-border rounded-base space-y-2">
              <span className="text-[10px] font-mono uppercase text-snoov-green font-semibold block tracking-wider">
                [ CRAFTSMANSHIP & GSM TEXTILE TEXT SPACE ]
              </span>
              <p className="text-xs text-snoov-muted italic">
                *Reserved for craft details: Fabric weights, sustainable European & Indian organic mills, and tactile silhouette draping.*
              </p>
            </div>
          </div>

          {/* Join The Collective CTA Card */}
          <div className="p-8 sm:p-12 bg-snoov-sand/50 border border-snoov-border rounded-base flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-snoov-green font-semibold block">
                JOIN THE COLLECTIVE
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-normal text-snoov-charcoal">
                Be Part of the KOLOSSAL Community
              </h3>
              <p className="text-xs text-snoov-muted font-sans max-w-md">
                Get private access to limited capsule releases, pop-up events, and private seasonal lookbooks.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <a
                href="https://www.instagram.com/kolossal.com/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3.5 bg-snoov-canvas text-snoov-charcoal text-xs font-mono uppercase tracking-wider font-semibold rounded-sm border border-snoov-border hover:border-snoov-charcoal transition-colors"
              >
                <span>Follow @kolossal.official</span>
                <span className="text-[10px]">↗</span>
              </a>

              <LocalizedClientLink
                href="/store"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-snoov-charcoal text-snoov-canvas text-xs font-mono uppercase tracking-wider font-semibold rounded-sm hover:bg-snoov-green transition-colors"
              >
                <span>Explore Collection</span>
                <span>→</span>
              </LocalizedClientLink>
            </div>
          </div>

        </div>
      </section>
    </div>
  )
}
