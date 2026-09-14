import { Metadata } from "next"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

export const metadata: Metadata = {
  title: "Shipping, Duties & Delivery | SNOOV",
  description:
    "Explore SNOOV's shipping policy. Free delivery on orders of ₹7,000 and above across India, same-day delivery in Tricity, and worldwide shipping launching soon.",
  alternates: {
    canonical: "https://snoovlifestyle.com/shipping",
  },
}

export default async function ShippingAndDutiesPage() {
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
        name: "Shipping & Duties",
        item: "https://snoovlifestyle.com/shipping",
      },
    ],
  }

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What are SNOOV's shipping charges and free delivery threshold?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We offer complimentary delivery across India on all orders of ₹7,000 and above. For orders below ₹7,000, standard carrier shipping charges apply and are calculated at checkout.",
        },
      },
      {
        "@type": "Question",
        name: "Do you offer Same-Day delivery in Chandigarh, Mohali, and Panchkula (Tricity)?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes! SNOOV provides complimentary Same-Day White-Glove Courier Delivery across the entire Tricity region (Chandigarh, Mohali, and Panchkula) for orders placed before 2:00 PM IST.",
        },
      },
      {
        "@type": "Question",
        name: "Do you ship internationally / worldwide?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Worldwide delivery is currently being finalized and will launch very soon. Follow our updates or contact our concierge team for early international delivery access.",
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
            <span className="text-snoov-charcoal font-semibold">Shipping & Delivery</span>
          </nav>

          <div className="max-w-4xl">
            <span className="inline-block px-2.5 py-1 text-[10px] font-mono tracking-widest uppercase bg-snoov-sand text-snoov-charcoal/90 rounded-sm border border-snoov-border mb-4">
              India Domestic & Global Logistics · Tricity Same-Day Available
            </span>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-light tracking-tight text-snoov-charcoal leading-[1.1] mb-6">
              Shipping, Duties & Fulfillment
            </h1>
            <p className="text-sm sm:text-base text-snoov-muted leading-relaxed max-w-2xl font-sans">
              Carefully packaged at our fulfillment hub, SNOOV delivers with precision. Enjoy <strong>Complimentary Delivery on orders over ₹7,000</strong> across India, exclusive <strong>Same-Day VIP Delivery in Tricity</strong>, with worldwide delivery launching soon.
            </p>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-snoov-border/60 text-xs font-mono">
              <div>
                <span className="text-snoov-muted block text-[10px] uppercase">TRICITY (CHD/MOH/PKL)</span>
                <span className="text-snoov-green font-semibold">Same-Day Delivery</span>
              </div>
              <div>
                <span className="text-snoov-muted block text-[10px] uppercase">ALL-INDIA EXPRESS</span>
                <span className="text-snoov-charcoal font-semibold">1 – 3 Business Days</span>
              </div>
              <div>
                <span className="text-snoov-muted block text-[10px] uppercase">FREE SHIPPING</span>
                <span className="text-snoov-green font-semibold">Orders ≥ ₹7,000</span>
              </div>
              <div>
                <span className="text-snoov-muted block text-[10px] uppercase">WORLDWIDE DELIVERY</span>
                <span className="text-snoov-charcoal font-semibold">Finalizing Soon</span>
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
              
              {/* Highlight Card: Tricity Same-Day VIP */}
              <div className="p-6 bg-snoov-sand/80 border-2 border-snoov-green/40 rounded-base space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono tracking-widest uppercase bg-snoov-green text-snoov-canvas px-2 py-0.5 rounded-sm font-semibold">
                    LOCAL PRIORITY
                  </span>
                  <span className="text-[10px] font-mono text-snoov-green font-semibold">
                    TRICITY AREA
                  </span>
                </div>
                <h4 className="font-serif text-lg font-normal text-snoov-charcoal">
                  Same-Day VIP Hand-Delivery
                </h4>
                <p className="text-xs text-snoov-muted leading-relaxed font-sans">
                  Orders placed before <strong>2:00 PM IST</strong> in <strong>Chandigarh, Mohali, or Panchkula</strong> are delivered directly to your doorstep the same evening via dedicated concierge courier.
                </p>
                <div className="pt-1 text-[11px] font-mono text-snoov-charcoal">
                  ✓ Signature handover included
                </div>
              </div>

              {/* Navigation Index */}
              <div className="p-6 bg-snoov-sand/40 border border-snoov-border rounded-base">
                <span className="text-[11px] font-mono uppercase tracking-widest text-snoov-charcoal font-semibold block mb-4">
                  00 / Shipping Index
                </span>
                <nav className="space-y-2.5 text-xs text-snoov-muted">
                  <a href="#tricity-india" className="block hover:text-snoov-green transition-colors font-medium text-snoov-charcoal">
                    01. India & Free Shipping (₹7,000+)
                  </a>
                  <a href="#global-destinations" className="block hover:text-snoov-green transition-colors">
                    02. Worldwide Shipping (Launching Soon)
                  </a>
                  <a href="#ddp-customs" className="block hover:text-snoov-green transition-colors">
                    03. Delivery Duty Paid (DDP) Guarantee
                  </a>
                  <a href="#chain-of-custody" className="block hover:text-snoov-green transition-colors">
                    04. Signature Security & Handover
                  </a>
                  <a href="#packaging" className="block hover:text-snoov-green transition-colors">
                    05. Archival Sustainable Packaging
                  </a>
                  <a href="#tracking" className="block hover:text-snoov-green transition-colors">
                    06. Live Tracking & Logistics Desk
                  </a>
                </nav>
              </div>

              {/* Courier Tracking Action Box */}
              <div className="p-6 bg-snoov-charcoal text-snoov-canvas rounded-base border border-snoov-charcoal space-y-4">
                <span className="text-[10px] font-mono tracking-widest uppercase text-snoov-sand/70 block">
                  REAL-TIME DISPATCH DESK
                </span>
                <h4 className="font-serif text-lg font-normal text-snoov-canvas">
                  Track an Active Order
                </h4>
                <p className="text-xs text-snoov-sand/80 leading-relaxed font-sans">
                  Enter your order confirmation number to view direct tracking status and live delivery milestones.
                </p>
                <div className="pt-2">
                  <LocalizedClientLink
                    href="/track-order"
                    className="inline-flex items-center justify-center w-full py-2.5 px-4 bg-snoov-canvas text-snoov-charcoal text-xs font-mono uppercase tracking-wider font-semibold rounded-sm hover:bg-snoov-sand transition-colors"
                  >
                    Track Shipment
                  </LocalizedClientLink>
                  <a
                    href={`mailto:${contactEmail}?subject=Shipping%20Inquiry`}
                    className="block text-center text-[11px] font-mono text-snoov-sand/60 hover:text-snoov-canvas transition-colors mt-3"
                  >
                    Contact Logistics Concierge ↗
                  </a>
                </div>
              </div>
            </div>
          </aside>

          {/* Detailed Shipping Protocols */}
          <article className="lg:col-span-8 space-y-16 text-sm text-snoov-muted leading-relaxed font-sans">
            
            {/* 01. India & Tricity Same-Day Delivery */}
            <div id="tricity-india" className="scroll-mt-28 space-y-6 border-b border-snoov-border pb-12">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-widest text-snoov-green font-semibold block">
                  01 / DOMESTIC NETWORK · INDIA
                </span>
                <h2 className="text-2xl sm:text-3xl font-serif text-snoov-charcoal font-normal mt-1">
                  India & Tricity Delivery Network
                </h2>
                <p className="mt-2">
                  India is our home and primary market. We offer <strong>complimentary delivery on all orders of ₹7,000 and above</strong>. For orders below ₹7,000, standard carrier shipping charges apply and are calculated at checkout.
                </p>
              </div>

              {/* Tricity Highlight Banner */}
              <div className="p-6 bg-snoov-sand/40 border border-snoov-green/30 rounded-base space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-mono font-bold text-snoov-green uppercase tracking-wider">
                    ★ TRICITY SAME-DAY EXPRESS (CHANDIGARH · MOHALI · PANCHKULA)
                  </span>
                  <span className="text-[11px] font-mono bg-snoov-green/10 text-snoov-green px-2.5 py-1 rounded-sm font-semibold">
                    Cut-off: 2:00 PM IST
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-snoov-charcoal leading-relaxed">
                  For our patrons located in <strong>Chandigarh, Mohali, and Panchkula</strong>, any order placed before <strong>2:00 PM IST (Monday through Sunday)</strong> qualifies for <strong>Complimentary Same-Day Evening Hand-Delivery</strong> directly by our dedicated courier team.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs font-mono">
                  <div className="p-3 bg-snoov-canvas border border-snoov-border rounded-sm">
                    <strong className="text-snoov-charcoal block">CHANDIGARH</strong>
                    <span className="text-[11px] text-snoov-muted">Sectors 1 to 70</span>
                  </div>
                  <div className="p-3 bg-snoov-canvas border border-snoov-border rounded-sm">
                    <strong className="text-snoov-charcoal block">MOHALI</strong>
                    <span className="text-[11px] text-snoov-muted">Phases 1–11 & Aerocity</span>
                  </div>
                  <div className="p-3 bg-snoov-canvas border border-snoov-border rounded-sm">
                    <strong className="text-snoov-charcoal block">PANCHKULA</strong>
                    <span className="text-[11px] text-snoov-muted">Sectors 1 to 32 & MDC</span>
                  </div>
                </div>
              </div>

              {/* All-India Rates Table */}
              <div className="border border-snoov-border rounded-base overflow-hidden bg-snoov-sand/10">
                <div className="divide-y divide-snoov-border text-xs">
                  
                  {/* Metro India */}
                  <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <strong className="text-snoov-charcoal block font-mono uppercase text-[11px]">
                        TIER 1 METROS (DELHI NCR, MUMBAI, BENGALURU, HYDERABAD, KOLKATA)
                      </strong>
                      <span className="text-snoov-muted text-[11px]">Blue Dart Air / Delhivery Express · 24–48 Hours</span>
                    </div>
                    <div className="sm:text-right font-mono">
                      <span className="text-snoov-green font-semibold block">Free on orders ≥ ₹7,000</span>
                      <span className="text-snoov-muted text-[10px]">Standard rates apply below ₹7,000</span>
                    </div>
                  </div>

                  {/* Rest of India */}
                  <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <strong className="text-snoov-charcoal block font-mono uppercase text-[11px]">
                        REST OF INDIA & REGIONAL CAPITALS
                      </strong>
                      <span className="text-snoov-muted text-[11px]">Express Surface & Air Cargo · 2–4 Business Days</span>
                    </div>
                    <div className="sm:text-right font-mono">
                      <span className="text-snoov-green font-semibold block">Free on orders ≥ ₹7,000</span>
                      <span className="text-snoov-muted text-[10px]">Standard rates apply below ₹7,000</span>
                    </div>
                  </div>

                </div>
              </div>
            </div>

            {/* 02. International Destinations & Timelines */}
            <div id="global-destinations" className="scroll-mt-28 space-y-6 border-b border-snoov-border pb-12">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-widest text-snoov-green font-semibold block">
                  02 / GLOBAL EXPANSION
                </span>
                <h2 className="text-2xl sm:text-3xl font-serif text-snoov-charcoal font-normal mt-1">
                  Worldwide Shipping (Finalizing Soon)
                </h2>
                <p className="mt-2">
                  We are actively finalizing our international logistics integrations to make SNOOV available worldwide soon. Global express courier routes (including DHL Express Worldwide and FedEx International Priority with Delivery Duty Paid options) will be enabled shortly.
                </p>
              </div>

              {/* Worldwide Coming Soon Notice */}
              <div className="p-6 bg-snoov-sand/40 border border-snoov-border rounded-base space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-mono font-bold text-snoov-green uppercase tracking-wider">
                    ★ WORLDWIDE COURIER INTEGRATION IN PROGRESS
                  </span>
                  <span className="text-[11px] font-mono bg-snoov-green/10 text-snoov-green px-2.5 py-1 rounded-sm font-semibold">
                    Launching Soon
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-snoov-charcoal leading-relaxed">
                  To ensure that international patrons experience the same impeccable standard as our domestic clients, our operations team is currently completing international customs clearances, duty pre-payment (DDP) protocols, and regional hub partnerships.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs font-mono">
                  <div className="p-3 bg-snoov-canvas border border-snoov-border rounded-sm">
                    <strong className="text-snoov-charcoal block">NORTH AMERICA</strong>
                    <span className="text-[11px] text-snoov-muted">US & Canada (FedEx / DHL)</span>
                  </div>
                  <div className="p-3 bg-snoov-canvas border border-snoov-border rounded-sm">
                    <strong className="text-snoov-charcoal block">UK & EUROPE</strong>
                    <span className="text-[11px] text-snoov-muted">Pre-cleared DDP Courier</span>
                  </div>
                  <div className="p-3 bg-snoov-canvas border border-snoov-border rounded-sm">
                    <strong className="text-snoov-charcoal block">MIDDLE EAST & APAC</strong>
                    <span className="text-[11px] text-snoov-muted">Priority Air Network</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 03. DDP Customs */}
            <div id="ddp-customs" className="scroll-mt-28 space-y-4 border-b border-snoov-border pb-12">
              <span className="text-[11px] font-mono uppercase tracking-widest text-snoov-green font-semibold block">
                03 / DUTIES & TARIFFS
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif text-snoov-charcoal font-normal">
                Delivery Duty Paid (DDP) Guarantee
              </h2>
              <p>
                For all our international patrons, SNOOV operates exclusively on a <strong>Delivery Duty Paid (DDP)</strong> framework.
              </p>
              
              <div className="p-5 bg-snoov-sand/30 border border-snoov-border rounded-base space-y-3 text-xs">
                <div className="flex items-start gap-3">
                  <span className="text-snoov-green text-sm font-bold">✓</span>
                  <div>
                    <strong className="text-snoov-charcoal block mb-0.5">Zero Surprise Invoices</strong>
                    All local VAT, GST, import tariffs, and customs brokerage fees are calculated and prepaid directly during checkout.
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-snoov-green text-sm font-bold">✓</span>
                  <div>
                    <strong className="text-snoov-charcoal block mb-0.5">Fast-Track Clearance</strong>
                    Pre-cleared digital customs manifests ensure your parcel does not experience border holds or processing bottlenecks.
                  </div>
                </div>
              </div>
            </div>

            {/* 04. Signature Security */}
            <div id="chain-of-custody" className="scroll-mt-28 space-y-4 border-b border-snoov-border pb-12">
              <span className="text-[11px] font-mono uppercase tracking-widest text-snoov-green font-semibold block">
                04 / CHAIN OF CUSTODY
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif text-snoov-charcoal font-normal">
                Signature Security & Handover
              </h2>
              <p>
                To safeguard the delivery of our garments, every domestic and international parcel requires an <strong>OTP verification (in India)</strong> or an <strong>adult signature upon delivery (globally)</strong>.
              </p>
              <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm">
                <li>
                  <strong className="text-snoov-charcoal">Tricity Hand-Delivery:</strong> Our dedicated team coordinates exact delivery timings via phone/WhatsApp before departure.
                </li>
                <li>
                  <strong className="text-snoov-charcoal">Domestic Delivery OTP:</strong> You will receive a secure 4-digit OTP via SMS on the morning of delivery to verify handover.
                </li>
              </ul>
            </div>

            {/* 05. Packaging */}
            <div id="packaging" className="scroll-mt-28 space-y-4 border-b border-snoov-border pb-12">
              <span className="text-[11px] font-mono uppercase tracking-widest text-snoov-green font-semibold block">
                05 / UNBOXING EXPERIENCE
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif text-snoov-charcoal font-normal">
                Packaging & Unboxing Standards
              </h2>
              <p>
                Your unboxing experience is an integral part of our brand ethos:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 text-xs">
                <div className="p-4 border border-snoov-border rounded-base bg-snoov-sand/20">
                  <span className="font-mono text-snoov-green font-semibold block mb-1 text-[10px] uppercase">
                    BOX STRUCTURE
                  </span>
                  <strong className="text-snoov-charcoal block mb-1">100% Recycled Kraft</strong>
                  <p className="text-snoov-muted">FSC-certified rigid unbleached structural cardboard.</p>
                </div>
                <div className="p-4 border border-snoov-border rounded-base bg-snoov-sand/20">
                  <span className="font-mono text-snoov-green font-semibold block mb-1 text-[10px] uppercase">
                    GARMENT PROTECTION
                  </span>
                  <strong className="text-snoov-charcoal block mb-1">Organic Cotton Dust Bags</strong>
                  <p className="text-snoov-muted">Reusable GOTS-certified textile storage pouches.</p>
                </div>
                <div className="p-4 border border-snoov-border rounded-base bg-snoov-sand/20">
                  <span className="font-mono text-snoov-green font-semibold block mb-1 text-[10px] uppercase">
                    CIRCULAR PACKAGING
                  </span>
                  <strong className="text-snoov-charcoal block mb-1">Dual Adhesive Strip</strong>
                  <p className="text-snoov-muted">Pre-integrated resealable tape for effortless packaging reuse or exchange transit.</p>
                </div>
              </div>
            </div>

            {/* 06. Tracking */}
            <div id="tracking" className="scroll-mt-28 space-y-4">
              <span className="text-[11px] font-mono uppercase tracking-widest text-snoov-green font-semibold block">
                06 / TRANSPARENCY
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif text-snoov-charcoal font-normal">
                Live Courier Tracking & Logistics Desk
              </h2>
              <p>
                The moment your parcel is prepared and dispatched, you will receive real-time SMS and email tracking links with live courier updates.
              </p>
              <p>
                You can also monitor your active order directly on our{" "}
                <LocalizedClientLink href="/track-order" className="text-snoov-green font-medium underline underline-offset-4 hover:opacity-80">
                  Order Tracking Portal
                </LocalizedClientLink>{" "}
                at any time.
              </p>
            </div>

          </article>
        </div>
      </section>
    </div>
  )
}
