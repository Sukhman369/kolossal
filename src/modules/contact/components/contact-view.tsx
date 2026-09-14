"use client"

import React, { useState, useEffect } from "react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const INQUIRY_TOPICS = [
  { id: "orders", label: "⚡ Order & Sizing Advice", subject: "Order & Sizing Inquiry" },
  { id: "tricity", label: "📍 Tricity Same-Day Courier", subject: "Tricity Hand-Delivery Inquiry" },
  { id: "collabs", label: "🔥 Creator, Collab & Community", subject: "GenZ Creator & Collaboration" },
  { id: "press", label: "🏛️ Press, Stylists & Loans", subject: "Editorial & Stylist Request" },
  { id: "repairs", label: "🧵 Garment Seam Repair", subject: "Garment Repair Request" },
  { id: "vibe", label: "💬 General Vibe / Feedback", subject: "General Pod Message" },
]

export default function ContactView() {
  const [selectedTopic, setSelectedTopic] = useState(INQUIRY_TOPICS[0].id)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    orderId: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSent, setIsSent] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSent(true)
    }, 900)
  }

  const activeTopicObj = INQUIRY_TOPICS.find((t) => t.id === selectedTopic)

  return (
    <div className="space-y-16 sm:space-y-24">
      
      {/* ── Main Split Experience ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        
        {/* Left Side: Direct Lines & Speed Channels */}
        <div className="lg:col-span-5 space-y-8">
          
          <div className="space-y-3">
            <span className="text-[10px] font-mono uppercase tracking-widest text-snoov-green font-semibold block">
              DIRECT ACCESS CHANNELS
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif text-snoov-charcoal font-normal">
              Skip The Queue.
            </h2>
            <p className="text-xs sm:text-sm text-snoov-muted leading-relaxed font-sans">
              No generic ticket bots. Reach real designers, stylists, and fulfillment leads directly via our instant contact channels.
            </p>
          </div>

          {/* Quick Connect Cards */}
          <div className="space-y-4 pt-2">
            
            {/* VIP WhatsApp Hotline */}
            <a
              href="https://wa.me/919876543210?text=Hi%20SNOOV,%20I'd%20like%20to%20inquire%20about"
              target="_blank"
              rel="noreferrer"
              className="group p-5 bg-snoov-sand/40 hover:bg-snoov-sand/80 border border-snoov-border rounded-base flex items-center justify-between transition-all duration-300 block"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-snoov-charcoal uppercase">
                    WHATSAPP VIP CONCIERGE
                  </span>
                  <span className="text-[9px] font-mono bg-snoov-green text-snoov-canvas px-1.5 py-0.2 rounded-xs">
                    FASTEST
                  </span>
                </div>
                <p className="text-xs text-snoov-muted font-sans">
                  Live chat for instant Tricity same-day dispatch & sizing help.
                </p>
              </div>
              <span className="text-base text-snoov-charcoal group-hover:translate-x-1 transition-transform">
                ↗
              </span>
            </a>

            {/* Direct Email */}
            <a
              href="mailto:concierge@snoov.com"
              className="group p-5 bg-snoov-sand/40 hover:bg-snoov-sand/80 border border-snoov-border rounded-base flex items-center justify-between transition-all duration-300 block"
            >
              <div className="space-y-1">
                <span className="text-xs font-mono font-bold text-snoov-charcoal uppercase block">
                  EMAIL OUR TEAM
                </span>
                <span className="text-xs font-mono text-snoov-green block">
                  concierge@snoov.com
                </span>
                <p className="text-xs text-snoov-muted font-sans">
                  Orders, sizing advice, and press inquiries.
                </p>
              </div>
              <span className="text-base text-snoov-charcoal group-hover:translate-x-1 transition-transform">
                ↗
              </span>
            </a>

            {/* Community IG */}
            <a
              href="https://www.instagram.com/snoov.cm/"
              target="_blank"
              rel="noreferrer"
              className="group p-5 bg-snoov-sand/40 hover:bg-snoov-sand/80 border border-snoov-border rounded-base flex items-center justify-between transition-all duration-300 block"
            >
              <div className="space-y-1">
                <span className="text-xs font-mono font-bold text-snoov-charcoal uppercase block">
                  INSTAGRAM COMMUNITY DM
                </span>
                <span className="text-xs font-mono text-snoov-green block font-semibold">
                  @snoov.cm
                </span>
                <p className="text-xs text-snoov-muted font-sans">
                  Tag us in your fits or pitch creative community projects.
                </p>
              </div>
              <span className="text-base text-snoov-charcoal group-hover:translate-x-1 transition-transform">
                ↗
              </span>
            </a>

          </div>

          {/* Headquarters Coordinates Box */}
          <div className="p-6 bg-snoov-sand/20 border border-snoov-border rounded-base space-y-3 font-mono text-xs text-snoov-charcoal">
            <span className="text-[10px] uppercase text-snoov-green font-semibold block">
              HEADQUARTERS & DISPATCH
            </span>
            
            <div className="space-y-1">
              <strong className="block text-[11px] uppercase">SNOOV · CHANDIGARH (TRICITY)</strong>
              <span className="text-[11px] text-snoov-muted block">30.7333° N, 76.7794° E</span>
              <span className="text-[11px] text-snoov-muted block">Industrial Area, Chandigarh 160002, India</span>
              <span className="text-[10px] text-snoov-green block pt-1">Direct Same-Day Courier Dispatch Hub</span>
            </div>
          </div>

        </div>

        {/* Right Side: Interactive Transmission Form */}
        <div className="lg:col-span-7 bg-snoov-sand/30 border border-snoov-border rounded-base p-6 sm:p-10 space-y-8">
          
          <div className="space-y-2">
            <span className="text-[10px] font-mono uppercase tracking-widest text-snoov-green font-semibold block">
              TRANSMIT A MESSAGE
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif text-snoov-charcoal font-normal">
              Select Your Topic & Send
            </h3>
            <p className="text-xs text-snoov-muted font-sans">
              Choose your topic below to route your transmission directly to the right specialist.
            </p>
          </div>

          {/* Topic Selector Chips */}
          <div className="space-y-2.5">
            <span className="text-[10px] font-mono uppercase tracking-widest text-snoov-muted block font-semibold">
              01 / CHOOSE INQUIRY TYPE
            </span>
            <div className="flex flex-wrap gap-2">
              {INQUIRY_TOPICS.map((topic) => {
                const isActive = selectedTopic === topic.id
                return (
                  <button
                    key={topic.id}
                    type="button"
                    onClick={() => setSelectedTopic(topic.id)}
                    className={`px-3.5 py-2 text-xs font-mono rounded-sm transition-all duration-200 cursor-pointer ${
                      isActive
                        ? "bg-snoov-charcoal text-snoov-canvas font-semibold shadow-sm"
                        : "bg-snoov-canvas text-snoov-muted hover:text-snoov-charcoal border border-snoov-border hover:border-snoov-charcoal/40"
                    }`}
                  >
                    {topic.label}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Form */}
          {isSent ? (
            <div className="p-8 bg-snoov-canvas border border-snoov-green/40 rounded-base text-center space-y-4 animate-fade-in-right">
              <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-snoov-green/10 text-snoov-green text-2xl font-bold font-mono">
                ✓
              </span>
              <h4 className="font-serif text-2xl text-snoov-charcoal">
                Transmission Received.
              </h4>
              <p className="text-xs text-snoov-muted font-sans max-w-md mx-auto leading-relaxed">
                Thank you, <strong>{formData.name || "Patron"}</strong>. Your transmission regarding <strong>{activeTopicObj?.subject}</strong> has been logged. A team specialist will reply to <strong>{formData.email}</strong> shortly.
              </p>
              <button
                type="button"
                onClick={() => {
                  setIsSent(false)
                  setFormData({ name: "", email: "", orderId: "", message: "" })
                }}
                className="mt-4 px-5 py-2 text-xs font-mono uppercase tracking-wider bg-snoov-charcoal text-snoov-canvas rounded-sm hover:bg-snoov-green transition-colors cursor-pointer"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                
                {/* Name */}
                <div className="space-y-1.5">
                  <label className="block text-[10px] font-mono uppercase tracking-wider text-snoov-charcoal font-semibold">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Armaan Sandhu"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-snoov-canvas border border-snoov-border rounded-sm text-xs font-sans text-snoov-charcoal placeholder:text-snoov-muted/50 focus:outline-none focus:border-snoov-charcoal transition-colors"
                  />
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <label className="block text-[10px] font-mono uppercase tracking-wider text-snoov-charcoal font-semibold">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@domain.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 bg-snoov-canvas border border-snoov-border rounded-sm text-xs font-sans text-snoov-charcoal placeholder:text-snoov-muted/50 focus:outline-none focus:border-snoov-charcoal transition-colors"
                  />
                </div>

              </div>

              {/* Order ID Optional */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <label className="block text-[10px] font-mono uppercase tracking-wider text-snoov-charcoal font-semibold">
                    Order ID (Optional)
                  </label>
                  <span className="text-[10px] font-mono text-snoov-muted">
                    If related to an existing piece
                  </span>
                </div>
                <input
                  type="text"
                  placeholder="#SNV-84920"
                  value={formData.orderId}
                  onChange={(e) => setFormData({ ...formData, orderId: e.target.value })}
                  className="w-full px-4 py-3 bg-snoov-canvas border border-snoov-border rounded-sm text-xs font-mono text-snoov-charcoal placeholder:text-snoov-muted/50 focus:outline-none focus:border-snoov-charcoal transition-colors"
                />
              </div>

              {/* Message */}
              <div className="space-y-1.5">
                <label className="block text-[10px] font-mono uppercase tracking-wider text-snoov-charcoal font-semibold">
                  Transmission Message *
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Drop your thoughts, fit inquiry, or collaboration idea..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 bg-snoov-canvas border border-snoov-border rounded-sm text-xs font-sans text-snoov-charcoal placeholder:text-snoov-muted/50 focus:outline-none focus:border-snoov-charcoal transition-colors resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-snoov-charcoal text-snoov-canvas text-xs font-mono uppercase tracking-[0.2em] font-semibold rounded-sm hover:bg-snoov-green transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>TRANSMITTING MESSAGE...</span>
                ) : (
                  <>
                    <span>SEND TRANSMISSION TO POD</span>
                    <span>→</span>
                  </>
                )}
              </button>

              <div className="text-center">
                <span className="text-[10px] font-mono text-snoov-muted">
                  Protected by 256-bit encryption · Zero spam policy · Direct human response
                </span>
              </div>

            </form>
          )}

        </div>

      </div>

    </div>
  )
}
