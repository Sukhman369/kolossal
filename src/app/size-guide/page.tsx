import { Metadata } from "next"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import SizeGuideMatrix from "@modules/size-guide/components/size-guide-matrix"

export const metadata: Metadata = {
  title: "Size Guide & Fit Matrix | SNOOV",
  description:
    "Explore SNOOV's international size matrix (US, UK, EU, JP). Detailed garment measurements in CM and Inches for heavyweight t-shirts, hoodies, and overshirts.",
  alternates: {
    canonical: "https://snoovlifestyle.com/size-guide",
  },
}

export default async function SizeGuidePage() {
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
        name: "Size Guide",
        item: "https://snoovlifestyle.com/size-guide",
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

      {/* ── Page Header / Editorial Masthead ── */}
      <section className="border-b border-snoov-border pt-12 sm:pt-20 pb-12 sm:pb-16">
        <div className="content-container">
          
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-snoov-muted mb-6">
            <LocalizedClientLink href="/" className="hover:text-snoov-green transition-colors">
              Home
            </LocalizedClientLink>
            <span>/</span>
            <span className="text-snoov-charcoal font-semibold">Size Guide & Fit Matrix</span>
          </nav>

          <div className="max-w-4xl space-y-6">
            <div className="flex items-center gap-3">
              <span className="px-2.5 py-1 text-[10px] font-mono tracking-widest uppercase bg-snoov-charcoal text-snoov-canvas rounded-sm font-semibold">
                ARCHITECTURAL FIT
              </span>
              <span className="text-[11px] font-mono text-snoov-green font-semibold uppercase tracking-wider">
                INTERNATIONAL CONVERSION MATRIX
              </span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-light tracking-tight text-snoov-charcoal leading-[1.05]">
              Size & Fit Matrix.
            </h1>

            <p className="text-sm sm:text-base text-snoov-muted leading-relaxed max-w-2xl font-sans">
              Every SNOOV piece is tailored with intentional drop-shoulder geometry and heavyweight drape. Use our interactive metric / imperial table below to find your exact silhouette.
            </p>
          </div>
        </div>
      </section>

      {/* ── Interactive Size Matrix Experience ── */}
      <section className="content-container py-12 sm:py-20">
        <SizeGuideMatrix />
      </section>
    </div>
  )
}
