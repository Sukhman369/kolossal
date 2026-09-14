import { Metadata } from "next"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import ContactView from "@modules/contact/components/contact-view"

export const metadata: Metadata = {
  title: "Client Concierge, VIP Lines & Direct Inquiries | SNOOV",
  description:
    "Direct contact with the SNOOV team. Instant VIP WhatsApp hotline, Tricity same-day support, press loans, and creator collaboration requests.",
  alternates: {
    canonical: "https://snoovlifestyle.com/contact",
  },
}

export default async function ContactPage() {
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
        name: "Client Concierge",
        item: "https://snoovlifestyle.com/contact",
      },
    ],
  }

  const contactPointSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "SNOOV",
    url: "https://snoovlifestyle.com",
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+91-98765-43210",
        contactType: "customer support",
        email: "concierge@snoov.com",
        areaServed: ["IN", "FR", "US", "GB", "AE"],
        availableLanguage: ["English", "French", "Hindi", "Punjabi"],
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPointSchema) }}
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
            <span className="text-snoov-charcoal font-semibold">Concierge & Contact</span>
          </nav>

          <div className="max-w-4xl space-y-6">
            <div className="flex items-center gap-3">
              <span className="px-2.5 py-1 text-[10px] font-mono tracking-widest uppercase bg-snoov-charcoal text-snoov-canvas rounded-sm font-semibold">
                TALK TO THE POD
              </span>
              <span className="text-[11px] font-mono text-snoov-green font-semibold uppercase tracking-wider">
                REAL HUMANS · ZERO CHATBOTS
              </span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-light tracking-tight text-snoov-charcoal leading-[1.05]">
              Direct Transmission.
            </h1>

            <p className="text-sm sm:text-base text-snoov-muted leading-relaxed max-w-2xl font-sans">
              Have questions regarding sizing, custom tailoring, your active order, or pitching a creative collaboration? Drop us a line below or reach out on our direct VIP lines.
            </p>
          </div>
        </div>
      </section>

      {/* ── Interactive Contact Experience ── */}
      <section className="content-container py-12 sm:py-20">
        <ContactView />
      </section>
    </div>
  )
}
