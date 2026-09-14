import { Metadata } from "next"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import FAQAccordion from "@modules/faq/components/faq-accordion"

export const metadata: Metadata = {
  title: "Frequently Asked Questions (FAQ) | SNOOV",
  description:
    "Find instant answers to frequently asked questions about SNOOV capsule drops, free delivery on orders above ₹7,000, Tricity same-day delivery, sizing, and damaged goods exchange guarantee.",
  alternates: {
    canonical: "https://snoovlifestyle.com/faq",
  },
}

export default async function FAQPage() {
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
        name: "FAQ",
        item: "https://snoovlifestyle.com/faq",
      },
    ],
  }

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How do limited capsule drops work?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "To eliminate overproduction and deadstock waste, SNOOV releases garments in strictly disciplined capsule editions. Once an edition is archived, it is rarely restocked.",
        },
      },
      {
        "@type": "Question",
        name: "What are your shipping charges and free delivery threshold?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We offer complimentary delivery across India on orders of ₹7,000 and above. For orders under ₹7,000, standard carrier shipping charges apply at checkout. Worldwide shipping is currently being finalized and will launch soon.",
        },
      },
      {
        "@type": "Question",
        name: "How does Tricity Same-Day Delivery work (CHD, Mohali, Panchkula)?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "For patrons located across the Tricity region (Chandigarh, Mohali, and Panchkula), orders placed before 2:00 PM IST qualify for complimentary same-day hand delivery by our dedicated courier.",
        },
      },
      {
        "@type": "Question",
        name: "How do SNOOV garments fit?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Our streetwear is designed with intentional drop-shoulder geometry, wide chest spans, and structured heavyweight drape. We recommend choosing your normal size for our signature relaxed fit.",
        },
      },
      {
        "@type": "Question",
        name: "What is your return and exchange policy?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Because SNOOV crafts in small, limited-batch capsules to ensure every patron receives an untouched, brand-new garment, we do not operate on a conventional return model. Instead, we offer a dedicated damaged-goods exchange guarantee: if your parcel arrives damaged or defective in courier transit, we will promptly coordinate a complimentary pickup and dispatch a pristine replacement.",
        },
      },
      {
        "@type": "Question",
        name: "What fabrics and certifications does SNOOV use?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We use 100% GOTS certified organic rain-fed cotton (380–550 GSM), European Flax® certified natural linen, and non-toxic Oeko-Tex Standard 100 botanical dyes.",
        },
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
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
            <span className="text-snoov-charcoal font-semibold">Frequently Asked Questions</span>
          </nav>

          <div className="max-w-4xl space-y-6">
            <div className="flex items-center gap-3">
              <span className="px-2.5 py-1 text-[10px] font-mono tracking-widest uppercase bg-snoov-charcoal text-snoov-canvas rounded-sm font-semibold">
                KNOWLEDGE BASE
              </span>
              <span className="text-[11px] font-mono text-snoov-green font-semibold uppercase tracking-wider">
                TRANSPARENCY & ASSISTANCE
              </span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-light tracking-tight text-snoov-charcoal leading-[1.05]">
              Frequently Asked Questions.
            </h1>

            <p className="text-sm sm:text-base text-snoov-muted leading-relaxed max-w-2xl font-sans">
              Immediate clarity on ordering protocols, Tricity same-day dispatch, international customs handling, organic fabric longevity, and complimentary size exchanges.
            </p>
          </div>
        </div>
      </section>

      {/* ── Interactive FAQ Accordion Experience ── */}
      <section className="content-container py-12 sm:py-20">
        <FAQAccordion />
      </section>
    </div>
  )
}
