import { Metadata } from "next"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

export const metadata: Metadata = {
  title: "Accessibility Statement & Inclusivity | SNOOV",
  description:
    "Learn about SNOOV's commitment to digital accessibility, WCAG 2.1 Level AA compliance, screen reader support, and assistive concierge services.",
  alternates: {
    canonical: "https://snoovlifestyle.com/accessibility",
  },
}

export default async function AccessibilityPage() {
  const lastUpdated = "August 31, 2026"
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
        name: "Accessibility Statement",
        item: "https://snoovlifestyle.com/accessibility",
      },
    ],
  }

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Accessibility Statement & Digital Inclusion",
    description:
      "Accessibility statement and WCAG 2.1 Level AA conformance standard for SNOOV.",
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
            <span className="text-snoov-charcoal font-semibold">Accessibility</span>
          </nav>

          <div className="max-w-4xl">
            <span className="inline-block px-2.5 py-1 text-[10px] font-mono tracking-widest uppercase bg-snoov-sand text-snoov-charcoal/90 rounded-sm border border-snoov-border mb-4">
              Digital Inclusivity · WCAG 2.1 Level AA Target
            </span>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-light tracking-tight text-snoov-charcoal leading-[1.1] mb-6">
              Accessibility Statement
            </h1>
            <p className="text-sm sm:text-base text-snoov-muted leading-relaxed max-w-2xl font-sans">
              At SNOOV, we believe conscious luxury streetwear and architectural design should be accessible to all patrons without barriers. We continuously engineer our digital storefront to adhere to global accessibility standards.
            </p>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-snoov-border/60 text-xs font-mono">
              <div>
                <span className="text-snoov-muted block text-[10px] uppercase">CONFORMANCE TARGET</span>
                <span className="text-snoov-green font-semibold">WCAG 2.1 Level AA</span>
              </div>
              <div>
                <span className="text-snoov-muted block text-[10px] uppercase">CONTRAST STANDARD</span>
                <span className="text-snoov-charcoal font-semibold">15:1 High Contrast</span>
              </div>
              <div>
                <span className="text-snoov-muted block text-[10px] uppercase">SCREEN READERS</span>
                <span className="text-snoov-charcoal font-semibold">VoiceOver & NVDA</span>
              </div>
              <div>
                <span className="text-snoov-muted block text-[10px] uppercase">ASSISTIVE SUPPORT</span>
                <span className="text-snoov-green font-semibold">Concierge Assisted</span>
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
                  00 / Accessibility Index
                </span>
                <nav className="space-y-2.5 text-xs text-snoov-muted">
                  <a href="#philosophy" className="block hover:text-snoov-green transition-colors">
                    01. Our Inclusivity Philosophy
                  </a>
                  <a href="#technical-standards" className="block hover:text-snoov-green transition-colors">
                    02. Technical Compliance Standards
                  </a>
                  <a href="#key-measures" className="block hover:text-snoov-green transition-colors">
                    03. Engineered Features & Best Practices
                  </a>
                  <a href="#assistive-tech" className="block hover:text-snoov-green transition-colors">
                    04. Assistive Technology Compatibility
                  </a>
                  <a href="#concierge-support" className="block hover:text-snoov-green transition-colors">
                    05. Assisted Ordering & Feedback
                  </a>
                </nav>
              </div>

              {/* Assistive Concierge Card */}
              <div className="p-6 bg-snoov-charcoal text-snoov-canvas rounded-base border border-snoov-charcoal space-y-3">
                <span className="text-[10px] font-mono tracking-widest uppercase text-snoov-sand/70 block">
                  ASSISTIVE CONCIERGE
                </span>
                <h4 className="font-serif text-lg font-normal text-snoov-canvas">
                  Personal Order Assistance
                </h4>
                <p className="text-xs text-snoov-sand/80 leading-relaxed font-sans">
                  If you encounter any difficulty navigating our collection or completing checkout, our team will happily assist you directly.
                </p>
                <a
                  href={`mailto:${contactEmail}?subject=Accessibility%20Support`}
                  className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-snoov-canvas underline decoration-snoov-sand/40 hover:decoration-snoov-canvas transition-colors pt-2"
                >
                  <span>Request Assisted Checkout</span>
                  <span>↗</span>
                </a>
              </div>
            </div>
          </aside>

          {/* Detailed Accessibility Clauses */}
          <article className="lg:col-span-8 space-y-16 text-sm text-snoov-muted leading-relaxed font-sans">
            
            {/* 01. Philosophy */}
            <div id="philosophy" className="scroll-mt-28 space-y-4 border-b border-snoov-border pb-12">
              <span className="text-[11px] font-mono uppercase tracking-widest text-snoov-green font-semibold block">
                01 / PHILOSOPHY
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif text-snoov-charcoal font-normal">
                1. Our Inclusivity Philosophy
              </h2>
              <p>
                At SNOOV, exceptional design is inherently inclusive. We believe that digital beauty, tactile fashion, and thoughtful craftsmanship should be enjoyable by everyone, regardless of physical ability, sensory perception, or assistive device usage.
              </p>
              <p>
                We view accessibility not as a static checklist, but as an ongoing architectural discipline embedded in our storefront development lifecycle.
              </p>
            </div>

            {/* 02. Technical Standards */}
            <div id="technical-standards" className="scroll-mt-28 space-y-4 border-b border-snoov-border pb-12">
              <span className="text-[11px] font-mono uppercase tracking-widest text-snoov-green font-semibold block">
                02 / GOVERNANCE
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif text-snoov-charcoal font-normal">
                2. Technical Compliance Standards
              </h2>
              <p>
                To provide a seamless experience, our storefront aligns with the following international accessibility benchmarks and legal frameworks:
              </p>
              
              <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm">
                <li>
                  <strong className="text-snoov-charcoal">WCAG 2.1 Level AA:</strong> Web Content Accessibility Guidelines established by the World Wide Web Consortium (W3C).
                </li>
                <li>
                  <strong className="text-snoov-charcoal">European Accessibility Act (EAA):</strong> Directive (EU) 2019/882 ensuring barrier-free e-commerce across Europe.
                </li>
                <li>
                  <strong className="text-snoov-charcoal">Americans with Disabilities Act (ADA):</strong> Title III compliance for non-discriminatory digital public accommodations.
                </li>
                <li>
                  <strong className="text-snoov-charcoal">Section 508:</strong> US Federal accessibility technical standards.
                </li>
              </ul>
            </div>

            {/* 03. Key Measures Built In */}
            <div id="key-measures" className="scroll-mt-28 space-y-6 border-b border-snoov-border pb-12">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-widest text-snoov-green font-semibold block">
                  03 / ENGINEERING
                </span>
                <h2 className="text-2xl sm:text-3xl font-serif text-snoov-charcoal font-normal mt-1">
                  Engineered Features & Best Practices
                </h2>
                <p className="mt-2">
                  Our Next.js storefront architecture incorporates several foundational accessibility layers:
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {/* Contrast */}
                <div className="p-5 bg-snoov-sand/30 border border-snoov-border rounded-base space-y-2">
                  <span className="text-xs font-mono font-bold text-snoov-green uppercase block">
                    HIGH CONTRAST & LEGIBILITY
                  </span>
                  <h3 className="font-serif text-base font-normal text-snoov-charcoal">
                    15:1 Contrast Ratios
                  </h3>
                  <p className="text-xs text-snoov-muted">
                    Our core color pairing (deep charcoal `#1A1A1A` on warm canvas `#FBF9F5`) delivers a 15.4:1 contrast ratio, significantly exceeding the 4.5:1 requirement for effortless reading.
                  </p>
                </div>

                {/* Keyboard Navigation */}
                <div className="p-5 bg-snoov-sand/30 border border-snoov-border rounded-base space-y-2">
                  <span className="text-xs font-mono font-bold text-snoov-green uppercase block">
                    KEYBOARD ACCESSIBILITY
                  </span>
                  <h3 className="font-serif text-base font-normal text-snoov-charcoal">
                    Full Tab & Focus Control
                  </h3>
                  <p className="text-xs text-snoov-muted">
                    All interactive elements (navigation menus, size selectors, cart buttons, and checkout forms) are fully operable via keyboard tabs with visible focus rings.
                  </p>
                </div>

                {/* Screen Readers */}
                <div className="p-5 bg-snoov-sand/30 border border-snoov-border rounded-base space-y-2">
                  <span className="text-xs font-mono font-bold text-snoov-green uppercase block">
                    SEMANTIC STRUCTURE
                  </span>
                  <h3 className="font-serif text-base font-normal text-snoov-charcoal">
                    ARIA Landmarks & Alt Text
                  </h3>
                  <p className="text-xs text-snoov-muted">
                    Clean HTML5 landmarks (`header`, `nav`, `main`, `footer`), strict heading hierarchy, and descriptive alt text for garment imagery and fabric textures.
                  </p>
                </div>

                {/* Motion Sensitivity */}
                <div className="p-5 bg-snoov-sand/30 border border-snoov-border rounded-base space-y-2">
                  <span className="text-xs font-mono font-bold text-snoov-green uppercase block">
                    VESTIBULAR SENSITIVITY
                  </span>
                  <h3 className="font-serif text-base font-normal text-snoov-charcoal">
                    Reduced Motion Support
                  </h3>
                  <p className="text-xs text-snoov-muted">
                    Our interface respects your operating system&apos;s `prefers-reduced-motion` settings, automatically disabling subtle hero parallax and entrance animations.
                  </p>
                </div>
              </div>
            </div>

            {/* 04. Assistive Technology Compatibility */}
            <div id="assistive-tech" className="scroll-mt-28 space-y-4 border-b border-snoov-border pb-12">
              <span className="text-[11px] font-mono uppercase tracking-widest text-snoov-green font-semibold block">
                04 / VERIFICATION
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif text-snoov-charcoal font-normal">
                4. Assistive Technology Compatibility
              </h2>
              <p>
                SNOOV is built on responsive modern web frameworks and tested for compatibility across popular assistive software and browser environments:
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-xs font-mono">
                <div className="p-3 bg-snoov-sand/30 border border-snoov-border rounded-sm text-center">
                  <strong className="text-snoov-charcoal block">Apple VoiceOver</strong>
                  <span className="text-[10px] text-snoov-muted">macOS & iOS</span>
                </div>
                <div className="p-3 bg-snoov-sand/30 border border-snoov-border rounded-sm text-center">
                  <strong className="text-snoov-charcoal block">NVDA</strong>
                  <span className="text-[10px] text-snoov-muted">Windows / Chrome</span>
                </div>
                <div className="p-3 bg-snoov-sand/30 border border-snoov-border rounded-sm text-center">
                  <strong className="text-snoov-charcoal block">JAWS</strong>
                  <span className="text-[10px] text-snoov-muted">Windows / Edge</span>
                </div>
                <div className="p-3 bg-snoov-sand/30 border border-snoov-border rounded-sm text-center">
                  <strong className="text-snoov-charcoal block">Android TalkBack</strong>
                  <span className="text-[10px] text-snoov-muted">Mobile Android</span>
                </div>
              </div>
            </div>

            {/* 05. Assisted Ordering & Feedback */}
            <div id="concierge-support" className="scroll-mt-28 space-y-4">
              <span className="text-[11px] font-mono uppercase tracking-widest text-snoov-green font-semibold block">
                05 / CONCIERGE ASSISTANCE
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif text-snoov-charcoal font-normal">
                5. Assisted Ordering & Feedback
              </h2>
              <p>
                We welcome feedback from patrons and accessibility advocates. If you experience an accessibility barrier on any part of snoovlifestyle.com, or if you would like personalized assistance placing an order, please contact our concierge team:
              </p>

              <div className="p-6 bg-snoov-sand/30 border border-snoov-border rounded-base space-y-3 font-mono text-xs text-snoov-charcoal">
                <div>
                  <span className="text-snoov-muted block text-[10px] uppercase">DIRECT CONCIERGE EMAIL</span>
                  <a href={`mailto:${contactEmail}?subject=Accessibility%20Assistance`} className="text-snoov-green font-semibold hover:underline">
                    {contactEmail}
                  </a>
                </div>
                <div>
                  <span className="text-snoov-muted block text-[10px] uppercase">RESPONSE TIMEFRAME</span>
                  <span>Our accessibility liaison responds to all inquiries within 24 business hours.</span>
                </div>
                <div>
                  <span className="text-snoov-muted block text-[10px] uppercase">ASSISTED CHECKOUT</span>
                  <span>We are pleased to guide you through garment measurements, fabric details, and process manual phone/email orders upon request.</span>
                </div>
              </div>
            </div>

          </article>
        </div>
      </section>
    </div>
  )
}
