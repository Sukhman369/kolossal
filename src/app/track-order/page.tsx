import { Metadata } from "next"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import OrderTrackerForm from "@modules/order/components/order-tracker-form"

export const metadata: Metadata = {
  title: "Shipment & Order Tracking Radar | SNOOV",
  description:
    "Track your active SNOOV streetwear order in real time. Live milestone status for Tricity same-day delivery, Blue Dart Express domestic transit, and global DHL shipments.",
  alternates: {
    canonical: "https://snoovlifestyle.com/track-order",
  },
}

export default async function TrackOrderPage() {
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
        name: "Track Order",
        item: "https://snoovlifestyle.com/track-order",
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
            <span className="text-snoov-charcoal font-semibold">Shipment Tracking</span>
          </nav>

          <div className="max-w-4xl space-y-6">
            <div className="flex items-center gap-3">
              <span className="px-2.5 py-1 text-[10px] font-mono tracking-widest uppercase bg-snoov-charcoal text-snoov-canvas rounded-sm font-semibold">
                CHAIN OF CUSTODY
              </span>
              <span className="text-[11px] font-mono text-snoov-green font-semibold uppercase tracking-wider">
                REAL-TIME FULFILLMENT RADAR
              </span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-light tracking-tight text-snoov-charcoal leading-[1.05]">
              Track Your Order.
            </h1>

            <p className="text-sm sm:text-base text-snoov-muted leading-relaxed max-w-2xl font-sans">
              Follow your garment&apos;s journey from our Chandigarh fulfillment hub and archival packaging suite directly to your doorstep.
            </p>
          </div>
        </div>
      </section>

      {/* ── Interactive Order Tracking Radar ── */}
      <section className="content-container py-12 sm:py-20">
        <OrderTrackerForm />
      </section>
    </div>
  )
}
