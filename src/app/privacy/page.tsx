import { Metadata } from "next"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

export const metadata: Metadata = {
  title: "Privacy & Data Protection | SNOOV",
  description:
    "Learn how SNOOV protects your personal data, respects GDPR/CCPA rights, and maintains client privacy across our e-commerce platform and client services.",
  alternates: {
    canonical: "https://snoovlifestyle.com/privacy",
  },
}

export default async function PrivacyPolicyPage() {
  const lastUpdated = "August 31, 2026"
  const legalEntity = "SNOOV"
  const contactEmail = "privacy@snoov.com"

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
        name: "Privacy & Data Protection",
        item: "https://snoovlifestyle.com/privacy",
      },
    ],
  }

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Privacy & Data Protection Policy",
    description:
      "Privacy policy and data governance practices of SNOOV.",
    publisher: {
      "@type": "Organization",
      name: "SNOOV",
      logo: "https://snoovlifestyle.com/logo.png",
    },
    dateModified: "2026-08-31",
  }

  return (
    <div className="bg-snoov-canvas text-snoov-charcoal min-h-screen">
      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
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
            <span className="text-snoov-charcoal font-semibold">Privacy Policy</span>
          </nav>

          <div className="max-w-4xl">
            <span className="inline-block px-2.5 py-1 text-[10px] font-mono tracking-widest uppercase bg-snoov-sand text-snoov-charcoal/90 rounded-sm border border-snoov-border mb-4">
              Legal & Data Governance · Ref 2026.08
            </span>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-light tracking-tight text-snoov-charcoal leading-[1.1] mb-6">
              Privacy & Data Protection
            </h1>
            <p className="text-sm sm:text-base text-snoov-muted leading-relaxed max-w-2xl font-sans">
              At SNOOV, we treat your personal data with the same discretion, precision, and care we apply to our garments. This policy transparently outlines how your information is gathered, secured, and respected.
            </p>
            <div className="flex flex-wrap items-center gap-6 mt-8 pt-6 border-t border-snoov-border/60 text-xs font-mono text-snoov-muted">
              <div>
                <span className="text-snoov-charcoal font-semibold">LAST UPDATED:</span> {lastUpdated}
              </div>
              <div className="hidden sm:block">•</div>
              <div>
                <span className="text-snoov-charcoal font-semibold">DATA CONTROLLER:</span> {legalEntity}
              </div>
              <div className="hidden sm:block">•</div>
              <div>
                <span className="text-snoov-charcoal font-semibold">JURISDICTION:</span> EU (GDPR) / US (CCPA/CPRA) / UK
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Main Policy Content Grid ── */}
      <section className="content-container py-12 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Quick Index / Sticky Sidebar */}
          <aside className="lg:col-span-4">
            <div className="lg:sticky lg:top-28 space-y-6">
              <div className="p-6 bg-snoov-sand/40 border border-snoov-border rounded-base">
                <span className="text-[11px] font-mono uppercase tracking-widest text-snoov-charcoal font-semibold block mb-4">
                  00 / Navigation Index
                </span>
                <nav className="space-y-2.5 text-xs text-snoov-muted">
                  <a href="#principles" className="block hover:text-snoov-green transition-colors">
                    01. Principles of Data Stewardship
                  </a>
                  <a href="#collection" className="block hover:text-snoov-green transition-colors">
                    02. Information We Collect
                  </a>
                  <a href="#purposes" className="block hover:text-snoov-green transition-colors">
                    03. Legal Bases & Processing
                  </a>
                  <a href="#sharing" className="block hover:text-snoov-green transition-colors">
                    04. Third-Party Sharing & Partners
                  </a>
                  <a href="#retention" className="block hover:text-snoov-green transition-colors">
                    05. Storage & Retention Periods
                  </a>
                  <a href="#rights" className="block hover:text-snoov-green transition-colors">
                    06. Your Statutory Privacy Rights
                  </a>
                  <a href="#cookies" className="block hover:text-snoov-green transition-colors">
                    07. Cookies & Tracking
                  </a>
                  <a href="#contact" className="block hover:text-snoov-green transition-colors">
                    08. Contact the Concierge DPO
                  </a>
                </nav>
              </div>

              {/* Concierge Data Box */}
              <div className="p-6 bg-snoov-charcoal text-snoov-canvas rounded-base border border-snoov-charcoal space-y-3">
                <span className="text-[10px] font-mono tracking-widest uppercase text-snoov-sand/70 block">
                  CLIENT PRIVACY DESK
                </span>
                <h4 className="font-serif text-lg font-normal text-snoov-canvas">
                  Exercise Your Rights
                </h4>
                <p className="text-xs text-snoov-sand/80 leading-relaxed font-sans">
                  Request a full export of your personal data or immediate account deletion with zero friction.
                </p>
                <a
                  href={`mailto:${contactEmail}?subject=Data%20Subject%20Access%20Request`}
                  className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-snoov-canvas underline decoration-snoov-sand/40 hover:decoration-snoov-canvas transition-colors pt-2"
                >
                  <span>Submit Data Request</span>
                  <span>↗</span>
                </a>
              </div>
            </div>
          </aside>

          {/* Detailed Legal Clauses */}
          <article className="lg:col-span-8 space-y-16 text-sm text-snoov-muted leading-relaxed font-sans">
            
            {/* 01. Principles */}
            <div id="principles" className="scroll-mt-28 space-y-4 border-b border-snoov-border pb-12">
              <span className="text-[11px] font-mono uppercase tracking-widest text-snoov-green font-semibold block">
                01 / PHILOSOPHY
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif text-snoov-charcoal font-normal">
                1. Principles of Data Stewardship
              </h2>
              <p>
                SNOOV operates on a strict principle of <strong>data minimization</strong>. We only gather and retain information necessary to deliver exceptional streetwear garments, process global commerce transactions securely, and provide personalized client assistance.
              </p>
              <p>
                We do not sell, rent, monetize, or broker your personal information to third-party data brokers under any circumstances.
              </p>
            </div>

            {/* 02. Information Collected */}
            <div id="collection" className="scroll-mt-28 space-y-4 border-b border-snoov-border pb-12">
              <span className="text-[11px] font-mono uppercase tracking-widest text-snoov-green font-semibold block">
                02 / ACQUISITION
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif text-snoov-charcoal font-normal">
                2. Information We Collect
              </h2>
              <p>
                Depending on your interaction with the SNOOV platform and services, we collect information across three primary categories:
              </p>
              
              <div className="space-y-4 pt-2">
                <div className="p-4 bg-snoov-sand/30 border border-snoov-border rounded-base">
                  <h3 className="font-mono text-xs font-bold uppercase text-snoov-charcoal tracking-wide mb-1">
                    A. Client Identity & Order Details
                  </h3>
                  <p className="text-xs text-snoov-muted">
                    Full name, shipping destination, billing address, contact phone number, email address, and order customization preferences.
                  </p>
                </div>

                <div className="p-4 bg-snoov-sand/30 border border-snoov-border rounded-base">
                  <h3 className="font-mono text-xs font-bold uppercase text-snoov-charcoal tracking-wide mb-1">
                    B. Transactional & Payment Security
                  </h3>
                  <p className="text-xs text-snoov-muted">
                    Payment details are tokenized and processed directly by our PCI-DSS Level 1 certified partners (such as Stripe). SNOOV never stores full credit card numbers or CVV codes on our servers.
                  </p>
                </div>

                <div className="p-4 bg-snoov-sand/30 border border-snoov-border rounded-base">
                  <h3 className="font-mono text-xs font-bold uppercase text-snoov-charcoal tracking-wide mb-1">
                    C. Technical & Diagnostic Information
                  </h3>
                  <p className="text-xs text-snoov-muted">
                    IP address, regional location (country code), browser user-agent, operating system, and anonymized interaction paths across the storefront to ensure optimal performance.
                  </p>
                </div>
              </div>
            </div>

            {/* 03. Purposes & Legal Bases */}
            <div id="purposes" className="scroll-mt-28 space-y-4 border-b border-snoov-border pb-12">
              <span className="text-[11px] font-mono uppercase tracking-widest text-snoov-green font-semibold block">
                03 / LAWFUL BASIS
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif text-snoov-charcoal font-normal">
                3. Legal Bases & Processing Purposes
              </h2>
              <p>
                Under Regulation (EU) 2016/679 (GDPR) and related global frameworks, we process your personal data under the following lawful bases:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm">
                <li>
                  <strong className="text-snoov-charcoal">Contractual Performance:</strong> Processing checkout orders, dispatching shipments with couriers, notifying delivery progress, and servicing returns.
                </li>
                <li>
                  <strong className="text-snoov-charcoal">Legitimate Business Interests:</strong> Fraud detection, storefront cybersecurity, enhancing garment fit recommendations, and analyzing site diagnostics.
                </li>
                <li>
                  <strong className="text-snoov-charcoal">Explicit Consent:</strong> Sending the private SNOOV editorial newsletter, lookbook drops, and invitations to private showroom events (revocable at any moment).
                </li>
                <li>
                  <strong className="text-snoov-charcoal">Legal Obligation:</strong> Tax reporting, customs declarations, and audit records mandated by fiscal authorities in France, Portugal, and international delivery destinations.
                </li>
              </ul>
            </div>

            {/* 04. Third-Party Sharing */}
            <div id="sharing" className="scroll-mt-28 space-y-4 border-b border-snoov-border pb-12">
              <span className="text-[11px] font-mono uppercase tracking-widest text-snoov-green font-semibold block">
                04 / INFRASTRUCTURE
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif text-snoov-charcoal font-normal">
                4. Third-Party Sharing & Partners
              </h2>
              <p>
                We only disclose your details to trusted infrastructure providers bound by rigorous Data Processing Agreements (DPAs):
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 border border-snoov-border rounded-base">
                  <span className="text-[10px] font-mono uppercase text-snoov-green font-semibold block mb-1">
                    FULFILLMENT & COURIERS
                  </span>
                  <span className="text-xs font-semibold text-snoov-charcoal block">
                    DHL Express, FedEx & UPS
                  </span>
                  <p className="text-[11px] text-snoov-muted mt-1">
                    To deliver signature-required packages and process customs declarations.
                  </p>
                </div>

                <div className="p-4 border border-snoov-border rounded-base">
                  <span className="text-[10px] font-mono uppercase text-snoov-green font-semibold block mb-1">
                    PAYMENT INFRASTRUCTURE
                  </span>
                  <span className="text-xs font-semibold text-snoov-charcoal block">
                    Stripe, Apple Pay & Klarna
                  </span>
                  <p className="text-[11px] text-snoov-muted mt-1">
                    PCI-DSS Level 1 encrypted payment tokenization and 3D-Secure 2 fraud screening.
                  </p>
                </div>

                <div className="p-4 border border-snoov-border rounded-base">
                  <span className="text-[10px] font-mono uppercase text-snoov-green font-semibold block mb-1">
                    CORE E-COMMERCE ENGINE
                  </span>
                  <span className="text-xs font-semibold text-snoov-charcoal block">
                    MedusaJS & Cloud Hosting
                  </span>
                  <p className="text-[11px] text-snoov-muted mt-1">
                    Encrypted order management, database clusters, and edge caching.
                  </p>
                </div>

                <div className="p-4 border border-snoov-border rounded-base">
                  <span className="text-[10px] font-mono uppercase text-snoov-green font-semibold block mb-1">
                    COMMUNICATIONS
                  </span>
                  <span className="text-xs font-semibold text-snoov-charcoal block">
                    Transactional Mail & SMS
                  </span>
                  <p className="text-[11px] text-snoov-muted mt-1">
                    Dispatching automated tracking codes and client concierge replies.
                  </p>
                </div>
              </div>
            </div>

            {/* 05. Retention */}
            <div id="retention" className="scroll-mt-28 space-y-4 border-b border-snoov-border pb-12">
              <span className="text-[11px] font-mono uppercase tracking-widest text-snoov-green font-semibold block">
                05 / LIFECYCLE
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif text-snoov-charcoal font-normal">
                5. Storage & Retention Periods
              </h2>
              <p>
                Personal data is maintained only for the duration necessary to satisfy the purposes outlined in this policy:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm">
                <li>
                  <strong>Completed Orders:</strong> Retained for 7 to 10 years strictly for fiscal, statutory audit, and tax compliance.
                </li>
                <li>
                  <strong>Client Accounts:</strong> Retained until the client requests closure or after 36 months of account inactivity.
                </li>
                <li>
                  <strong>Newsletter Subscriptions:</strong> Retained until an unsubscribe request is received via 1-click header link.
                </li>
              </ul>
            </div>

            {/* 06. Statutory Rights */}
            <div id="rights" className="scroll-mt-28 space-y-4 border-b border-snoov-border pb-12">
              <span className="text-[11px] font-mono uppercase tracking-widest text-snoov-green font-semibold block">
                06 / CLIENT SOVEREIGNTY
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif text-snoov-charcoal font-normal">
                6. Your Statutory Privacy Rights
              </h2>
              <p>
                Regardless of your country of residence, SNOOV extends global privacy rights to all clients:
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
                <div className="p-3 bg-snoov-sand/20 border border-snoov-border rounded-sm">
                  <strong className="text-snoov-charcoal block mb-0.5">Right of Access (DSAR)</strong>
                  Receive a machine-readable copy of all personal records we hold about you.
                </div>
                <div className="p-3 bg-snoov-sand/20 border border-snoov-border rounded-sm">
                  <strong className="text-snoov-charcoal block mb-0.5">Right to Erasure (To Be Forgotten)</strong>
                  Request complete deletion of your records (barring non-negotiable tax archives).
                </div>
                <div className="p-3 bg-snoov-sand/20 border border-snoov-border rounded-sm">
                  <strong className="text-snoov-charcoal block mb-0.5">Right to Rectification</strong>
                  Instantly correct inaccurate shipping addresses or personal names.
                </div>
                <div className="p-3 bg-snoov-sand/20 border border-snoov-border rounded-sm">
                  <strong className="text-snoov-charcoal block mb-0.5">Right to Restrict & Object</strong>
                  Opt out of direct marketing, profiling, or non-essential automated processing.
                </div>
              </div>
            </div>

            {/* 07. Cookies */}
            <div id="cookies" className="scroll-mt-28 space-y-4 border-b border-snoov-border pb-12">
              <span className="text-[11px] font-mono uppercase tracking-widest text-snoov-green font-semibold block">
                07 / LOCAL STORAGE
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif text-snoov-charcoal font-normal">
                7. Cookies & Tracking
              </h2>
              <p>
                We use strictly essential cookies to maintain your shopping cart state, currency preferences, and session tokens. Non-essential performance telemetry is strictly subject to your consent upon visiting the storefront.
              </p>
              <p>
                For a complete breakdown of specific cookie names, lifetimes, and management tools, please refer to our dedicated{" "}
                <LocalizedClientLink href="/cookie-policy" className="text-snoov-green font-medium underline underline-offset-4 hover:opacity-80">
                  Cookie Policy
                </LocalizedClientLink>.
              </p>
            </div>

            {/* 08. Contact Concierge */}
            <div id="contact" className="scroll-mt-28 space-y-4">
              <span className="text-[11px] font-mono uppercase tracking-widest text-snoov-green font-semibold block">
                08 / INQUIRIES
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif text-snoov-charcoal font-normal">
                8. Contact the Concierge DPO
              </h2>
              <p>
                If you have questions, complaints, or wish to exercise your data protection rights, our dedicated Data Protection Officer and Client Concierge are available:
              </p>
              
              <div className="p-6 bg-snoov-sand/30 border border-snoov-border rounded-base space-y-3 font-mono text-xs text-snoov-charcoal">
                <div>
                  <span className="text-snoov-muted block text-[10px] uppercase">DIRECT EMAIL</span>
                  <a href={`mailto:${contactEmail}`} className="text-snoov-green font-semibold hover:underline">
                    {contactEmail}
                  </a>
                </div>
                <div>
                  <span className="text-snoov-muted block text-[10px] uppercase">POSTAL ADDRESS</span>
                  <span>SNOOV — Data Governance Desk</span>
                  <br />
                  <span>Industrial Area, Chandigarh 160002, India</span>
                </div>
                <div>
                  <span className="text-snoov-muted block text-[10px] uppercase">RESPONSE TIMEFRAME</span>
                  <span>All statutory inquiries are processed and fulfilled within 30 business days.</span>
                </div>
              </div>
            </div>

          </article>
        </div>
      </section>
    </div>
  )
}
