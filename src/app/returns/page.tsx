import { Metadata } from "next"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

export const metadata: Metadata = {
  title: "Exchange & Replacement Policy | KOLOSSAL",
  description:
    "Discover KOLOSSAL's conscious craftsmanship approach and our damaged goods exchange guarantee. Complimentary courier replacement for transit-damaged or flawed pieces.",
  alternates: {
    canonical: "https://kolossal.com/returns",
  },
}

export default async function ReturnsAndExchangesPage() {
  const contactEmail = "concierge@kolossal.com"

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
        name: "Exchange & Replacement Policy",
        item: "https://kolossal.com/returns",
      },
    ],
  }

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is Kolossal's return and exchange policy?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "At Kolossal, we pay close attention to every detail, with every stitch crafted to meet our standards of quality and perfection. We do not offer returns. However, if you have received a damaged or defective product, we will arrange an exchange.",
        },
      },
      {
        "@type": "Question",
        name: "How do I request an exchange for a damaged product?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Please contact us at the email address or phone number provided on our contact page. Ensure all tags remain attached and the product is kept in the same condition as received. The product must be handed over to the delivery personnel at the time of exchange.",
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
      <section className="border-b border-snoov-border pt-36 sm:pt-40 pb-12 sm:pb-16">
        <div className="content-container">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-snoov-muted mb-6">
            <LocalizedClientLink href="/" className="hover:text-snoov-green transition-colors">
              Home
            </LocalizedClientLink>
            <span>/</span>
            <span className="text-snoov-charcoal font-semibold">Returns &amp; Exchange Policy</span>
          </nav>

          <div className="max-w-4xl">
            <span className="inline-block px-2.5 py-1 text-[10px] font-mono tracking-widest uppercase bg-snoov-sand text-snoov-charcoal/90 rounded-sm border border-snoov-border mb-4">
              Client Care &amp; Policy
            </span>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif text-snoov-charcoal font-normal tracking-tight">
              Returns &amp; Exchange Policy
            </h1>
            <p className="text-sm sm:text-base text-snoov-muted leading-relaxed max-w-2xl font-sans">
              At Kolossal, we pay close attention to every detail, with every stitch crafted to meet our standards of quality and perfection. If you have received a damaged or defective product, we sincerely apologize for the inconvenience — please contact us to discuss and initiate an exchange.
            </p>

            {/* Quick Info Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-8 pt-6 border-t border-snoov-border/60 text-xs font-mono">
              <div>
                <span className="text-snoov-muted block text-[10px] uppercase">POLICY TYPE</span>
                <span className="text-snoov-charcoal font-semibold">Exchange Only</span>
              </div>
              <div>
                <span className="text-snoov-muted block text-[10px] uppercase">ELIGIBLE FOR</span>
                <span className="text-snoov-charcoal font-semibold">Damaged / Defective</span>
              </div>
              <div>
                <span className="text-snoov-muted block text-[10px] uppercase">CONTACT</span>
                <span className="text-snoov-green font-semibold">Email or Phone</span>
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
                  00 / Policy Overview
                </span>
                <nav className="space-y-2.5 text-xs text-snoov-muted">
                  <a href="#our-commitment" className="block hover:text-snoov-green transition-colors">
                    01. Our Commitment to Quality
                  </a>
                  <a href="#exchange-policy" className="block hover:text-snoov-green transition-colors">
                    02. Exchange Policy
                  </a>
                  <a href="#how-to-request" className="block hover:text-snoov-green transition-colors">
                    03. How to Request an Exchange
                  </a>
                  <a href="#exchange-conditions" className="block hover:text-snoov-green transition-colors">
                    04. Exchange Conditions
                  </a>
                </nav>
              </div>

              {/* Contact Box */}
              <div className="p-6 bg-snoov-charcoal text-snoov-canvas rounded-base border border-snoov-charcoal space-y-4">
                <span className="text-[10px] font-mono tracking-widest uppercase text-snoov-sand/70 block">
                  CONTACT US
                </span>
                <h4 className="font-serif text-lg font-normal text-snoov-canvas">
                  Received a Damaged Product?
                </h4>
                <p className="text-xs text-snoov-sand/80 leading-relaxed font-sans">
                  We sincerely apologize. Please reach out via email or phone and we&apos;ll make it right for you.
                </p>
                <div className="pt-2">
                  <LocalizedClientLink
                    href="/contact"
                    className="inline-flex items-center justify-center w-full py-2.5 px-4 bg-snoov-canvas text-snoov-charcoal text-xs font-mono uppercase tracking-wider font-semibold rounded-sm hover:bg-snoov-sand transition-colors"
                  >
                    Contact Us
                  </LocalizedClientLink>
                  <a
                    href={`mailto:${contactEmail}?subject=Exchange%20Request`}
                    className="block text-center text-[11px] font-mono text-snoov-sand/60 hover:text-snoov-canvas transition-colors mt-3"
                  >
                    Email Us Directly ↗
                  </a>
                </div>
              </div>
            </div>
          </aside>

          {/* Policy Content */}
          <article className="lg:col-span-8 space-y-16 text-sm text-snoov-muted leading-relaxed font-sans">

            {/* 01. Our Commitment to Quality */}
            <div id="our-commitment" className="scroll-mt-28 space-y-6 border-b border-snoov-border pb-12">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-widest text-snoov-green font-semibold block">
                  01 / OUR COMMITMENT
                </span>
                <h2 className="text-2xl sm:text-3xl font-serif text-snoov-charcoal font-normal mt-1">
                  Quality &amp; Craftsmanship
                </h2>
                <p className="mt-2">
                  At Kolossal, we pay close attention to every detail, with every stitch crafted to meet our standards of quality and perfection.
                </p>
              </div>

              <div className="p-5 bg-snoov-sand/30 border border-snoov-border rounded-base">
                <p className="text-xs text-snoov-muted leading-relaxed">
                  Every garment that leaves our workshop is carefully inspected before dispatch. We take immense pride in our craft and hold ourselves to the highest standards — so in the rare event something is not right, we will take full responsibility and make it right for you.
                </p>
              </div>
            </div>

            {/* 02. Exchange Policy */}
            <div id="exchange-policy" className="scroll-mt-28 space-y-4 border-b border-snoov-border pb-12">
              <span className="text-[11px] font-mono uppercase tracking-widest text-snoov-green font-semibold block">
                02 / POLICY
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif text-snoov-charcoal font-normal">
                Exchange Policy
              </h2>
              <p>
                If you have received a damaged or defective product, we sincerely apologize for the inconvenience. Please contact us at the email address or phone number provided below to discuss the issue and initiate an exchange.
              </p>

              <div className="p-5 border border-snoov-border bg-snoov-sand/10 rounded-base space-y-3">
                <span className="text-xs font-mono text-snoov-charcoal uppercase font-semibold block">
                  ⓘ Exchange Note
                </span>
                <p className="text-xs text-snoov-muted leading-relaxed">
                  Please ensure that all tags remain attached and the product is kept in the same condition as received. The product must be handed over to the delivery personnel at the time of exchange.
                </p>
              </div>
            </div>

            {/* 03. How to Request an Exchange */}
            <div id="how-to-request" className="scroll-mt-28 space-y-6 border-b border-snoov-border pb-12">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-widest text-snoov-green font-semibold block">
                  03 / PROCESS
                </span>
                <h2 className="text-2xl sm:text-3xl font-serif text-snoov-charcoal font-normal mt-1">
                  How to Request an Exchange
                </h2>
                <p className="mt-2">
                  Getting an exchange is straightforward. Here&apos;s how:
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-5 bg-snoov-sand/30 border border-snoov-border rounded-base space-y-2">
                  <span className="text-xs font-mono font-bold text-snoov-green">STEP 01</span>
                  <h3 className="font-serif text-base font-normal text-snoov-charcoal">Contact Us</h3>
                  <p className="text-xs text-snoov-muted">
                    Reach out to us at the email address or phone number on our contact page and describe the issue with your product.
                  </p>
                </div>

                <div className="p-5 bg-snoov-sand/30 border border-snoov-border rounded-base space-y-2">
                  <span className="text-xs font-mono font-bold text-snoov-green">STEP 02</span>
                  <h3 className="font-serif text-base font-normal text-snoov-charcoal">Keep Tags On</h3>
                  <p className="text-xs text-snoov-muted">
                    Ensure all tags remain attached and the product is in the same condition as received — unworn, unwashed, and in original packaging.
                  </p>
                </div>

                <div className="p-5 bg-snoov-sand/30 border border-snoov-border rounded-base space-y-2">
                  <span className="text-xs font-mono font-bold text-snoov-green">STEP 03</span>
                  <h3 className="font-serif text-base font-normal text-snoov-charcoal">Hand Over to Delivery</h3>
                  <p className="text-xs text-snoov-muted">
                    The product must be handed over to the delivery personnel at the time of exchange. Our team will coordinate the rest.
                  </p>
                </div>
              </div>
            </div>

            {/* 04. Exchange Conditions */}
            <div id="exchange-conditions" className="scroll-mt-28 space-y-4">
              <span className="text-[11px] font-mono uppercase tracking-widest text-snoov-green font-semibold block">
                04 / CONDITIONS
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif text-snoov-charcoal font-normal">
                Exchange Conditions
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-5 border border-snoov-border bg-snoov-sand/10 rounded-base space-y-3">
                  <span className="text-xs font-mono text-snoov-green uppercase font-semibold block">
                    ✓ ELIGIBLE FOR EXCHANGE
                  </span>
                  <ul className="space-y-2 text-xs text-snoov-muted">
                    <li>• Product received in a damaged condition.</li>
                    <li>• Product received with a manufacturing defect.</li>
                    <li>• Incorrect item delivered against your order.</li>
                  </ul>
                </div>

                <div className="p-5 border border-snoov-border bg-snoov-sand/10 rounded-base space-y-3">
                  <span className="text-xs font-mono text-snoov-charcoal uppercase font-semibold block">
                    ⓘ IMPORTANT CONDITIONS
                  </span>
                  <ul className="space-y-2 text-xs text-snoov-muted">
                    <li>• All original tags must remain attached.</li>
                    <li>• Product must be in the same condition as received — unworn and unwashed.</li>
                    <li>• Product must be handed over to the delivery personnel at the time of exchange.</li>
                  </ul>
                </div>
              </div>

              <p className="text-sm text-snoov-muted pt-4">
                Thank you for choosing Kolossal.
              </p>
            </div>

          </article>
        </div>
      </section>
    </div>
  )
}

