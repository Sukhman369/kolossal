import { Metadata } from "next"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

export const metadata: Metadata = {
  title: "Exchange & Replacement Policy | SNOOV",
  description:
    "Discover SNOOV's conscious craftsmanship approach and our damaged goods exchange guarantee. Complimentary courier replacement for transit-damaged or flawed pieces.",
  alternates: {
    canonical: "https://snoovlifestyle.com/returns",
  },
}

export default async function ReturnsAndExchangesPage() {
  const reportingWindow = "Within 48 Hours"
  const verificationTime = "24–48 Business Hours"
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
        name: "Exchange & Replacement Policy",
        item: "https://snoovlifestyle.com/returns",
      },
    ],
  }

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is SNOOV's return and exchange policy?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Because SNOOV crafts in small, limited-batch capsules to ensure every client receives an untouched, brand-new garment, we do not operate on a conventional return model. Instead, we offer a dedicated damaged-goods exchange guarantee: if your parcel arrives damaged or defective in courier transit, our team will promptly coordinate a complimentary pickup and dispatch a pristine replacement.",
        },
      },
      {
        "@type": "Question",
        name: "How do I request an exchange for a damaged product?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Please inspect your order upon delivery and notify our Concierge within 48 hours via WhatsApp or email with your Order ID and clear photographs of the damaged garment and packaging. Our team will arrange a complimentary courier pickup and dispatch a replacement.",
        },
      },
      {
        "@type": "Question",
        name: "Can I exchange an item for a different size or color?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Because each capsule is crafted in strictly limited batches with zero excess stock, we are unable to accommodate post-delivery size or preference swaps. We warmly encourage patrons to consult our detailed Size Guide or reach out to our styling team before placing an order to ensure a confident fit.",
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
            <span className="text-snoov-charcoal font-semibold">Exchange & Replacement Policy</span>
          </nav>

          <div className="max-w-4xl">
            <span className="inline-block px-2.5 py-1 text-[10px] font-mono tracking-widest uppercase bg-snoov-sand text-snoov-charcoal/90 rounded-sm border border-snoov-border mb-4">
              Client Care & Assurance · Conscious Production Standards
            </span>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif text-snoov-charcoal font-normal tracking-tight">
              Exchange & Replacement Policy
            </h1>
            <p className="text-sm sm:text-base text-snoov-muted leading-relaxed max-w-2xl font-sans">
              At SNOOV, every garment is tailored in intentional, small-batch capsules rather than mass-produced inventory. To ensure that every patron receives an untouched, freshly crafted piece and to honor our sustainable craftsmanship model, we focus our exchange policy exclusively on products that arrive damaged or defective in transit. If your piece encounters any issue on its way to you, our brand takes full responsibility and guarantees an immediate, complimentary replacement.
            </p>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-snoov-border/60 text-xs font-mono">
              <div>
                <span className="text-snoov-muted block text-[10px] uppercase">REPORT WINDOW</span>
                <span className="text-snoov-charcoal font-semibold">{reportingWindow}</span>
              </div>
              <div>
                <span className="text-snoov-muted block text-[10px] uppercase">EXCHANGE SHIPPING</span>
                <span className="text-snoov-green font-semibold">100% Complimentary</span>
              </div>
              <div>
                <span className="text-snoov-muted block text-[10px] uppercase">QUALITY AUDIT</span>
                <span className="text-snoov-charcoal font-semibold">{verificationTime}</span>
              </div>
              <div>
                <span className="text-snoov-muted block text-[10px] uppercase">REPLACEMENT DISPATCH</span>
                <span className="text-snoov-charcoal font-semibold">Priority Courier</span>
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
                  <a href="#conscious-philosophy" className="block hover:text-snoov-green transition-colors">
                    01. Small-Batch Crafting & Our Perspective
                  </a>
                  <a href="#damage-guarantee" className="block hover:text-snoov-green transition-colors">
                    02. Damaged Goods Exchange Guarantee
                  </a>
                  <a href="#how-to-report" className="block hover:text-snoov-green transition-colors">
                    03. 3-Step Damage Reporting Protocol
                  </a>
                  <a href="#eligibility" className="block hover:text-snoov-green transition-colors">
                    04. Defect & Quality Verification Standards
                  </a>
                  <a href="#fit-assistance" className="block hover:text-snoov-green transition-colors">
                    05. Pre-Purchase Sizing & Styling Advice
                  </a>
                </nav>
              </div>

              {/* Instant Exchange Desk Trigger Box */}
              <div className="p-6 bg-snoov-charcoal text-snoov-canvas rounded-base border border-snoov-charcoal space-y-4">
                <span className="text-[10px] font-mono tracking-widest uppercase text-snoov-sand/70 block">
                  CONCIERGE DESK
                </span>
                <h4 className="font-serif text-lg font-normal text-snoov-canvas">
                  Report Damaged Arrival
                </h4>
                <p className="text-xs text-snoov-sand/80 leading-relaxed font-sans">
                  Received a piece that was compromised in transit? Have your Order ID (e.g., #SNV-84920) and photos of the package ready for our team.
                </p>
                <div className="pt-2">
                  <LocalizedClientLink
                    href="/contact"
                    className="inline-flex items-center justify-center w-full py-2.5 px-4 bg-snoov-canvas text-snoov-charcoal text-xs font-mono uppercase tracking-wider font-semibold rounded-sm hover:bg-snoov-sand transition-colors"
                  >
                    Open Client Desk
                  </LocalizedClientLink>
                  <a
                    href={`mailto:${contactEmail}?subject=Damaged%20Item%20Exchange%20Request`}
                    className="block text-center text-[11px] font-mono text-snoov-sand/60 hover:text-snoov-canvas transition-colors mt-3"
                  >
                    Or Email Concierge Desk ↗
                  </a>
                </div>
              </div>
            </div>
          </aside>

          {/* Detailed Policy Protocols */}
          <article className="lg:col-span-8 space-y-16 text-sm text-snoov-muted leading-relaxed font-sans">
            
            {/* 01. Small-Batch Crafting & Our Perspective */}
            <div id="conscious-philosophy" className="scroll-mt-28 space-y-6 border-b border-snoov-border pb-12">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-widest text-snoov-green font-semibold block">
                  01 / OUR PERSPECTIVE
                </span>
                <h2 className="text-2xl sm:text-3xl font-serif text-snoov-charcoal font-normal mt-1">
                  Why We Offer Exchanges for Damaged Arrivals
                </h2>
                <p className="mt-2">
                  We believe in complete transparency and want to share the thoughtful care behind how your garments are created and delivered.
                </p>
              </div>

              <div className="p-5 bg-snoov-sand/30 border border-snoov-border rounded-base space-y-3">
                <h3 className="font-serif text-base text-snoov-charcoal font-medium">
                  A More Conscious Way of Crafting & Delivering Fashion
                </h3>
                <p className="text-xs text-snoov-muted leading-relaxed">
                  Unlike conventional fashion brands that rely on mass industrial overproduction and price in high inventory returns, SNOOV creates exclusively in disciplined, limited-run capsules. Every garment is constructed from certified heavy organic textiles (380–550 GSM GOTS organic cotton, natural botanical dyes, and European linen).
                </p>
                <p className="text-xs text-snoov-muted leading-relaxed">
                  When your parcel arrives, you can be certain that your piece is brand-new, hand-inspected, and has never been previously circulated, worn, or repeatedly handled. To preserve this level of hygiene, product integrity, and our commitment to zero-deadstock sustainability, we do not operate a general return-for-refund model.
                </p>
                <p className="text-xs text-snoov-muted leading-relaxed">
                  Instead, we channel all our care into ensuring that every piece that leaves our workshop reaches you in flawless condition—backed by our dedicated, complimentary exchange guarantee if anything ever happens during transit.
                </p>
              </div>
            </div>

            {/* 02. Damaged Goods Exchange Guarantee */}
            <div id="damage-guarantee" className="scroll-mt-28 space-y-4 border-b border-snoov-border pb-12">
              <span className="text-[11px] font-mono uppercase tracking-widest text-snoov-green font-semibold block">
                02 / CLIENT REASSURANCE
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif text-snoov-charcoal font-normal">
                Damaged Goods Exchange Guarantee
              </h2>
              <p>
                Your peace of mind when welcoming a SNOOV piece is sacred to us. In the rare circumstance that your parcel is mishandled by couriers or arrives with an unforeseen flaw:
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-5 border border-snoov-border bg-snoov-sand/10 rounded-base space-y-2">
                  <span className="text-xs font-mono text-snoov-green uppercase font-semibold block">
                    ✓ 100% COMPLIMENTARY REPLACEMENT
                  </span>
                  <p className="text-xs text-snoov-muted">
                    If your item arrives with any transit damage or manufacturing flaw, SNOOV covers all courier pickup and reshipment costs. A pristine, freshly prepared replacement will be dispatched to your doorstep at zero cost to you.
                  </p>
                </div>

                <div className="p-5 border border-snoov-border bg-snoov-sand/10 rounded-base space-y-2">
                  <span className="text-xs font-mono text-snoov-charcoal uppercase font-semibold block">
                    ★ OUT-OF-STOCK COMMITMENT
                  </span>
                  <p className="text-xs text-snoov-muted">
                    If the damaged edition is archived or completely sold out, our team will work personally with you—offering a preferred alternative piece or full store credit so you remain completely satisfied.
                  </p>
                </div>
              </div>
            </div>

            {/* 03. 3-Step Damage Reporting Protocol */}
            <div id="how-to-report" className="scroll-mt-28 space-y-6 border-b border-snoov-border pb-12">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-widest text-snoov-green font-semibold block">
                  03 / PROTOCOL
                </span>
                <h2 className="text-2xl sm:text-3xl font-serif text-snoov-charcoal font-normal mt-1">
                  How We Arrange Your Exchange
                </h2>
                <p className="mt-2">
                  We have made the exchange process simple and supportive so our team can assist you without friction:
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                {/* Step 1 */}
                <div className="p-5 bg-snoov-sand/30 border border-snoov-border rounded-base space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-snoov-green">STEP 01</span>
                    <span className="text-[10px] font-mono text-snoov-muted uppercase">FIRST 48 HOURS</span>
                  </div>
                  <h3 className="font-serif text-base font-normal text-snoov-charcoal">
                    Inspect Your Parcel
                  </h3>
                  <p className="text-xs text-snoov-muted">
                    Upon delivery, take a moment to look over your package. If you notice courier box damage, tears, or garment flaws, take a couple of clear photos or a short video.
                  </p>
                </div>

                {/* Step 2 */}
                <div className="p-5 bg-snoov-sand/30 border border-snoov-border rounded-base space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-snoov-green">STEP 02</span>
                    <span className="text-[10px] font-mono text-snoov-muted uppercase">MESSAGE US</span>
                  </div>
                  <h3 className="font-serif text-base font-normal text-snoov-charcoal">
                    Notify Our Concierge
                  </h3>
                  <p className="text-xs text-snoov-muted">
                    Share your Order ID and photos with our team via WhatsApp or email within 48 hours of delivery so we can immediately hold a replacement piece from our limited reserve.
                  </p>
                </div>

                {/* Step 3 */}
                <div className="p-5 bg-snoov-sand/30 border border-snoov-border rounded-base space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-snoov-green">STEP 03</span>
                    <span className="text-[10px] font-mono text-snoov-muted uppercase">REPLACEMENT</span>
                  </div>
                  <h3 className="font-serif text-base font-normal text-snoov-charcoal">
                    Doorstep Handover
                  </h3>
                  <p className="text-xs text-snoov-muted">
                    Our team coordinates a complimentary courier pickup right from your doorstep and dispatches your pristine replacement piece with priority tracking.
                  </p>
                </div>
              </div>
            </div>

            {/* 04. Defect & Quality Verification Standards */}
            <div id="eligibility" className="scroll-mt-28 space-y-4 border-b border-snoov-border pb-12">
              <span className="text-[11px] font-mono uppercase tracking-widest text-snoov-green font-semibold block">
                04 / COVERAGE & GUIDELINES
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif text-snoov-charcoal font-normal">
                Exchange Coverage & Quality Guidelines
              </h2>
              <p>
                To maintain fair standards for all patrons and ensure our artisan team can promptly process replacements:
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-5 border border-snoov-border bg-snoov-sand/10 rounded-base space-y-3">
                  <span className="text-xs font-mono text-snoov-green uppercase font-semibold block">
                    ✓ COVERED FOR COMPLIMENTARY EXCHANGE
                  </span>
                  <ul className="space-y-2 text-xs text-snoov-muted">
                    <li>• Parcels showing visible transit damage or crushed outer courier packaging that has affected the garment.</li>
                    <li>• Any tears, snags, stains, or hardware faults present upon unboxing.</li>
                    <li>• Any structural craftsmanship defect (stitching irregularities, zipper issues).</li>
                    <li>• Incorrect garment or variation received compared to your order confirmation.</li>
                  </ul>
                </div>

                <div className="p-5 border border-snoov-border bg-snoov-sand/10 rounded-base space-y-3">
                  <span className="text-xs font-mono text-snoov-charcoal uppercase font-semibold block">
                    ⓘ HELPFUL POINTS TO KEEP IN MIND
                  </span>
                  <ul className="space-y-2 text-xs text-snoov-muted">
                    <li>• <strong>Original State:</strong> For hygiene reasons and to verify that damage occurred in transit, pieces must remain unworn, unwashed, and in their original packaging with original brand tags intact.</li>
                    <li>• <strong>48-Hour Window:</strong> Reaching out within 48 hours enables us to quickly raise transit insurance claims with our courier partner and reserve a replacement piece.</li>
                    <li>• <strong>Sizing Confidence:</strong> Since each capsule is strictly limited in volume, we are unable to facilitate post-delivery size or style swaps. We warmly encourage checking our Size Guide or contacting our styling desk before checkout.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 05. Pre-Purchase Sizing & Styling Advice */}
            <div id="fit-assistance" className="scroll-mt-28 space-y-4">
              <span className="text-[11px] font-mono uppercase tracking-widest text-snoov-green font-semibold block">
                05 / CONFIDENCE IN FIT
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif text-snoov-charcoal font-normal">
                Pre-Purchase Sizing & Styling Advice
              </h2>
              <p>
                We want you to feel completely assured of your fit before your piece is tailored and dispatched:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm">
                <li>
                  <strong className="text-snoov-charcoal">Streetwear Size Matrix:</strong> Every piece features exact measurements in both centimeters and inches. Please refer to our{" "}
                  <LocalizedClientLink href="/size-guide" className="text-snoov-green font-medium underline underline-offset-4 hover:opacity-80">
                    Comprehensive Size Guide
                  </LocalizedClientLink>{" "}
                  before completing checkout.
                </li>
                <li>
                  <strong className="text-snoov-charcoal">Stylist Consultation:</strong> Unsure how a specific drop-shoulder hoodie or heavyweight tee drapes? Our Chandigarh styling team is readily accessible via WhatsApp or email to provide personalized sizing guidance based on your height, weight, and preferred aesthetic.
                </li>
                <li>
                  <strong className="text-snoov-charcoal">Lifetime Garment Care:</strong> For long-term care and maintenance of your organic textiles, explore our{" "}
                  <LocalizedClientLink href="/garment-care" className="text-snoov-green font-medium underline underline-offset-4 hover:opacity-80">
                    Garment Care & Longevity Guide
                  </LocalizedClientLink>.
                </li>
              </ul>
            </div>

          </article>
        </div>
      </section>
    </div>
  )
}
