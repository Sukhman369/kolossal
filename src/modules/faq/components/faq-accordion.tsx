"use client"

import React, { useState, useMemo } from "react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

interface FAQItem {
  id: string
  category: string
  question: string
  answer: string
}

const FAQ_DATA: FAQItem[] = [
  // 01. Orders & Drops
  {
    id: "drop-schedule",
    category: "orders",
    question: "How do limited capsule drops work?",
    answer:
      "To eliminate overproduction and deadstock waste, SNOOV releases garments in strictly disciplined capsule editions. Once an edition is archived, it is rarely restocked. Follow @snoov.cm on Instagram or join our community for private drop access.",
  },
  {
    id: "order-modifications",
    category: "orders",
    question: "Can I modify or cancel my order after placement?",
    answer:
      "Because our Chandigarh atelier team begins fulfilling orders promptly, please reach out via our WhatsApp VIP concierge or mail us within 60 minutes of placing your order if you require an address or sizing modification.",
  },
  {
    id: "payment-methods",
    category: "orders",
    question: "What payment methods are accepted?",
    answer:
      "We accept all major Credit/Debit cards (Visa, Mastercard, American Express), UPI, Net Banking, Apple Pay, Google Pay, and verified regional digital wallets. All transactions are protected by 256-bit SSL encryption.",
  },

  // 02. Shipping & Tricity Hand-Delivery
  {
    id: "tricity-delivery",
    category: "shipping",
    question: "How does Tricity Same-Day Delivery work (CHD, Mohali, Panchkula)?",
    answer:
      "For patrons located across the Tricity region (Chandigarh, Mohali, and Panchkula), orders placed before 2:00 PM IST qualify for complimentary same-day hand delivery by our dedicated courier. Orders placed after 2:00 PM arrive the following morning.",
  },
  {
    id: "domestic-transit",
    category: "shipping",
    question: "What are the domestic India shipping timelines?",
    answer:
      "We ship across all pin codes in India via Blue Dart Express and premium couriers. Metro deliveries arrive in 2 to 3 business days; regional deliveries arrive within 3 to 5 business days with full real-time tracking.",
  },
  {
    id: "international-ddp",
    category: "shipping",
    question: "Do you ship internationally, and are customs duties included (DDP)?",
    answer:
      "Yes, we ship globally via DHL Express and FedEx Priority. For the US, UK, EU, UAE, and Canada, orders are dispatched Delivery Duty Paid (DDP)—all import duties and tariffs are prepaid by SNOOV with zero surprise fees on delivery.",
  },

  // 03. Sizing & Silhouettes
  {
    id: "fit-silhouette",
    category: "sizing",
    question: "How do SNOOV garments fit?",
    answer:
      "Our streetwear is designed with intentional drop-shoulder geometry, wide chest spans, and structured heavyweight drape. We recommend choosing your normal size for our signature relaxed fit, or sizing down one size for a more tailored profile. Consult our interactive Size Guide for metric & imperial measurements.",
  },
  {
    id: "custom-sizing",
    category: "sizing",
    question: "Do you offer personal sizing consultations?",
    answer:
      "Yes. If you have unique proportions or want styling advice, transmit your height, weight, and fit preference to our Chandigarh atelier stylists via WhatsApp or our Contact page.",
  },

  // 04. Exchange Policy & Guarantee
  {
    id: "return-window",
    category: "returns",
    question: "What is your return and exchange policy?",
    answer:
      "To preserve our conscious limited-capsule production and zero-deadstock philosophy, SNOOV garments are final sale and we do not accept standard returns or refunds. However, if your piece arrives damaged or defective in transit, we guarantee an immediate, complimentary exchange.",
  },
  {
    id: "damaged-reporting",
    category: "returns",
    question: "What should I do if my order arrives damaged or defective?",
    answer:
      "Please inspect your package upon delivery and notify our Concierge within 48 hours at concierge@snoov.com or via WhatsApp with your Order ID and photos of the damaged garment and packaging. Our atelier will arrange a complimentary courier pickup and dispatch a pristine replacement.",
  },

  // 05. Sustainability & Fabric Care
  {
    id: "fabric-credentials",
    category: "sustainability",
    question: "What fabrics and certifications does SNOOV use?",
    answer:
      "We use 100% GOTS certified organic rain-fed cotton (380–550 GSM), European Flax® certified natural linen, and non-toxic Oeko-Tex Standard 100 botanical dyes with zero harmful chemical runoff.",
  },
  {
    id: "lifetime-repair",
    category: "sustainability",
    question: "Does SNOOV offer complimentary garment repairs?",
    answer:
      "Yes. Every piece is built for years of wear. If a seam relaxes or hardware requires maintenance, our Chandigarh atelier provides complimentary artisan repairs. Visit our Garment Care page to initiate a service.",
  },
]

const CATEGORIES = [
  { id: "all", label: "All Questions" },
  { id: "orders", label: "⚡ Orders & Drops" },
  { id: "shipping", label: "📍 Shipping & Tricity" },
  { id: "sizing", label: "📐 Sizing & Fit" },
  { id: "returns", label: "🔄 Exchange & Guarantee" },
  { id: "sustainability", label: "🌿 Organic Fabrics & Care" },
]

export default function FAQAccordion() {
  const [activeCategory, setActiveCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({
    "drop-schedule": true,
    "tricity-delivery": true,
  })

  const toggleItem = (id: string) => {
    setOpenItems((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const filteredFAQs = useMemo(() => {
    return FAQ_DATA.filter((item) => {
      const matchesCategory = activeCategory === "all" || item.category === activeCategory
      const matchesSearch =
        searchQuery.trim() === "" ||
        item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesCategory && matchesSearch
    })
  }, [activeCategory, searchQuery])

  return (
    <div className="space-y-12 sm:space-y-16">

      {/* ── Search & Filter Controls ── */}
      <div className="space-y-6">

        {/* Instant Search Bar */}
        <div className="relative max-w-2xl">
          <input
            type="text"
            placeholder="Search questions (e.g. Tricity delivery, sizing, returns, organic cotton)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-5 py-4 pl-12 bg-snoov-sand/40 border border-snoov-border rounded-base text-xs font-sans text-snoov-charcoal placeholder:text-snoov-muted focus:outline-none focus:border-snoov-charcoal transition-colors shadow-xs"
          />
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-snoov-muted text-sm select-none">
            🔍
          </span>
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[11px] font-mono text-snoov-muted hover:text-snoov-charcoal uppercase cursor-pointer"
            >
              Clear
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-2 pt-1">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 text-xs font-mono rounded-sm transition-all duration-200 cursor-pointer ${isActive
                  ? "bg-snoov-charcoal text-snoov-canvas font-semibold shadow-sm"
                  : "bg-snoov-sand/30 text-snoov-muted hover:text-snoov-charcoal border border-snoov-border"
                  }`}
              >
                {cat.label}
              </button>
            )
          })}
        </div>

      </div>

      {/* ── Accordion List ── */}
      <div className="space-y-4">
        {filteredFAQs.length === 0 ? (
          <div className="p-12 text-center border border-dashed border-snoov-border rounded-base bg-snoov-sand/20 space-y-3">
            <p className="font-serif text-xl text-snoov-charcoal">No questions found matching &quot;{searchQuery}&quot;</p>
            <p className="text-xs text-snoov-muted font-sans max-w-md mx-auto">
              Our Chandigarh concierge is available to answer any custom inquiries directly.
            </p>
            <LocalizedClientLink
              href="/contact"
              className="inline-block mt-2 px-5 py-2.5 bg-snoov-charcoal text-snoov-canvas text-xs font-mono uppercase tracking-wider rounded-sm hover:bg-snoov-green transition-colors"
            >
              Ask Atelier Concierge →
            </LocalizedClientLink>
          </div>
        ) : (
          filteredFAQs.map((item) => {
            const isOpen = !!openItems[item.id]
            return (
              <div
                key={item.id}
                className={`border rounded-base overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${isOpen
                  ? "border-snoov-charcoal/40 bg-snoov-sand/20 shadow-xs"
                  : "border-snoov-border bg-snoov-canvas hover:border-snoov-border/80 hover:bg-snoov-sand/10"
                  }`}
              >
                <button
                  type="button"
                  onClick={() => toggleItem(item.id)}
                  aria-expanded={isOpen}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 transition-colors cursor-pointer select-none"
                >
                  <span className="font-serif text-lg sm:text-xl text-snoov-charcoal font-normal">
                    {item.question}
                  </span>
                  <span
                    className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-mono text-sm border transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${isOpen
                      ? "bg-snoov-charcoal text-snoov-canvas rotate-45 border-snoov-charcoal"
                      : "bg-snoov-sand/50 text-snoov-charcoal border-snoov-border hover:bg-snoov-sand"
                      }`}
                  >
                    +
                  </span>
                </button>

                {/* Smooth CSS Grid Expanding Container */}
                <div
                  className={`grid transition-[grid-template-rows,opacity] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-6 pb-6 pt-2 text-xs sm:text-sm text-snoov-muted leading-relaxed font-sans border-t border-snoov-border/40">
                      <p>{item.answer}</p>
                    </div>
                  </div>
                </div>
              </div>
            )
          })
        )}
      </div>

      {/* ── Still Have Questions Card ── */}
      <div className="p-8 sm:p-12 bg-snoov-sand/40 border border-snoov-border rounded-base flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="space-y-2">
          <span className="text-[10px] font-mono uppercase tracking-widest text-snoov-green font-semibold block">
            NEED MORE INFORMATION?
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl font-normal text-snoov-charcoal">
            Connect Directly with the Studio
          </h3>
          <p className="text-xs text-snoov-muted font-sans max-w-md">
            Our Chandigarh team answers all tailoring, sizing, and shipping inquiries directly.
          </p>
        </div>

        <LocalizedClientLink
          href="/contact"
          className="inline-flex items-center gap-2 px-6 py-3.5 bg-snoov-charcoal text-snoov-canvas text-xs font-mono uppercase tracking-wider font-semibold rounded-sm hover:bg-snoov-green transition-colors shrink-0"
        >
          <span>Open Concierge Desk</span>
          <span>→</span>
        </LocalizedClientLink>
      </div>

    </div>
  )
}
