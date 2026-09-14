"use client"

import React, { useState } from "react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

interface TrackingResult {
  orderId: string
  status: string
  carrier: string
  awb: string
  trackingUrl: string
  estimatedDelivery: string
  steps: {
    title: string
    date: string
    location: string
    completed: boolean
    current: boolean
  }[]
}

export default function OrderTrackerForm() {
  const [orderNumber, setOrderNumber] = useState("")
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [searched, setSearched] = useState(false)
  const [result, setResult] = useState<TrackingResult | null>(null)

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate luxury order status resolution
    setTimeout(() => {
      setIsLoading(false)
      setSearched(true)
      
      const cleanOrder = orderNumber.trim().toUpperCase()
      const isTricity = cleanOrder.includes("CHD") || cleanOrder.includes("MOH") || cleanOrder.includes("TC")

      setResult({
        orderId: cleanOrder.startsWith("#") ? cleanOrder : `#${cleanOrder}`,
        status: isTricity ? "Out for Same-Day Hand Delivery" : "In Transit via Express Courier",
        carrier: isTricity ? "SNOOV Tricity Direct Courier (Chandigarh Hub)" : "Blue Dart Express Air",
        awb: isTricity ? "TRICITY-SAME-DAY-8821" : "BD-8492019482IN",
        trackingUrl: isTricity
          ? "https://wa.me/919876543210?text=Hi%20SNOOV%20Concierge,%20checking%20my%20Tricity%20order"
          : "https://www.bluedart.com",
        estimatedDelivery: isTricity ? "Today by 7:30 PM IST" : "September 2, 2026",
        steps: [
          {
            title: "01. Order Confirmed & Paid",
            date: "Aug 31, 2026 · 11:20 AM",
            location: "Chandigarh Fulfillment Hub",
            completed: true,
            current: false,
          },
          {
            title: "02. Garment Quality Inspection & Archival Boxing",
            date: "Aug 31, 2026 · 02:45 PM",
            location: "Chandigarh Facility",
            completed: true,
            current: false,
          },
          {
            title: isTricity ? "03. Dispatched via Tricity Courier Van" : "03. Handed to Express Air Courier",
            date: "Aug 31, 2026 · 04:15 PM",
            location: "Chandigarh Dispatch Facility",
            completed: true,
            current: true,
          },
          {
            title: "04. Hand-Delivered to Patron",
            date: isTricity ? "Expected Today (Evening)" : "Expected in 2 business days",
            location: "Delivery Destination",
            completed: false,
            current: false,
          },
        ],
      })
    }, 800)
  }

  return (
    <div className="space-y-12 sm:space-y-16">
      
      {/* ── Lookup Form Box ── */}
      <div className="max-w-2xl mx-auto bg-snoov-sand/30 border border-snoov-border rounded-base p-6 sm:p-10 space-y-6">
        <div className="space-y-1.5 text-center">
          <span className="text-[10px] font-mono uppercase tracking-widest text-snoov-green font-semibold block">
            LIVE PARCEL RADAR
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-normal text-snoov-charcoal">
            Track Your SNOOV Parcel
          </h2>
          <p className="text-xs text-snoov-muted font-sans max-w-md mx-auto">
            Enter your Order ID (from your confirmation email or SMS) and the email address used during checkout.
          </p>
        </div>

        <form onSubmit={handleTrack} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Order Number */}
            <div className="space-y-1.5">
              <label className="block text-[10px] font-mono uppercase tracking-wider text-snoov-charcoal font-semibold">
                Order ID *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. SNV-84920"
                value={orderNumber}
                onChange={(e) => setOrderNumber(e.target.value)}
                className="w-full px-4 py-3 bg-snoov-canvas border border-snoov-border rounded-sm text-xs font-mono text-snoov-charcoal placeholder:text-snoov-muted/50 focus:outline-none focus:border-snoov-charcoal transition-colors"
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-snoov-canvas border border-snoov-border rounded-sm text-xs font-sans text-snoov-charcoal placeholder:text-snoov-muted/50 focus:outline-none focus:border-snoov-charcoal transition-colors"
              />
            </div>

          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 bg-snoov-charcoal text-snoov-canvas text-xs font-mono uppercase tracking-widest font-semibold rounded-sm hover:bg-snoov-green transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {isLoading ? (
              <span>LOCATING PARCEL IN TRANSIT...</span>
            ) : (
              <>
                <span>TRACK SHIPMENT STATUS</span>
                <span>→</span>
              </>
            )}
          </button>
        </form>

        <div className="text-center pt-2 border-t border-snoov-border/60">
          <p className="text-[11px] text-snoov-muted font-sans">
            Already have an account?{" "}
            <LocalizedClientLink href="/account" className="text-snoov-green font-medium underline hover:opacity-80">
              Sign in to view all active orders in 1 click
            </LocalizedClientLink>
          </p>
        </div>
      </div>

      {/* ── Tracking Results Display ── */}
      {searched && result && (
        <div className="max-w-3xl mx-auto space-y-8 animate-fade-in-right">
          
          {/* Status Header Card */}
          <div className="p-6 sm:p-8 bg-snoov-canvas border border-snoov-border rounded-base space-y-6 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-snoov-border pb-6">
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-snoov-green font-semibold uppercase tracking-wider block">
                  ACTIVE SHIPMENT
                </span>
                <h3 className="font-serif text-2xl font-normal text-snoov-charcoal">
                  Order {result.orderId}
                </h3>
              </div>
              <div className="sm:text-right">
                <span className="inline-block px-3 py-1 bg-snoov-charcoal text-snoov-canvas text-[11px] font-mono uppercase tracking-wider rounded-sm font-semibold">
                  {result.status}
                </span>
              </div>
            </div>

            {/* Quick Meta Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
              <div>
                <span className="text-snoov-muted block text-[10px] uppercase">CARRIER NETWORK</span>
                <span className="text-snoov-charcoal font-semibold">{result.carrier}</span>
              </div>
              <div>
                <span className="text-snoov-muted block text-[10px] uppercase">WAYBILL / AWB</span>
                <span className="text-snoov-charcoal font-semibold">{result.awb}</span>
              </div>
              <div>
                <span className="text-snoov-muted block text-[10px] uppercase">ESTIMATED DELIVERY</span>
                <span className="text-snoov-green font-semibold">{result.estimatedDelivery}</span>
              </div>
            </div>

            {/* Live Carrier Button */}
            <div className="pt-2">
              <a
                href={result.trackingUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-snoov-green font-semibold hover:underline"
              >
                <span>Open Live GPS Courier Tracking Page</span>
                <span>↗</span>
              </a>
            </div>
          </div>

          {/* 4-Step Visual Timeline */}
          <div className="p-6 sm:p-8 bg-snoov-sand/30 border border-snoov-border rounded-base space-y-6">
            <span className="text-[10px] font-mono uppercase tracking-widest text-snoov-green font-semibold block">
              TRANSIT TIMELINE & MILESTONES
            </span>

            <div className="relative pl-6 sm:pl-8 space-y-8 before:content-[''] before:absolute before:left-2.5 sm:before:left-3.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-snoov-border">
              {result.steps.map((step, idx) => (
                <div key={idx} className="relative space-y-1">
                  
                  {/* Circle Indicator */}
                  <span
                    className={`absolute -left-6 sm:-left-8 top-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center font-mono text-[9px] ${
                      step.current
                        ? "bg-snoov-green border-snoov-green text-snoov-canvas animate-pulse"
                        : step.completed
                        ? "bg-snoov-charcoal border-snoov-charcoal text-snoov-canvas"
                        : "bg-snoov-canvas border-snoov-border text-snoov-muted"
                    }`}
                  >
                    {step.completed ? "✓" : idx + 1}
                  </span>

                  <h4 className="font-serif text-base text-snoov-charcoal font-normal">
                    {step.title}
                  </h4>
                  <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-snoov-muted">
                    <span>{step.date}</span>
                    <span>·</span>
                    <span>{step.location}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* ── Direct Carrier Assistance Links ── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 max-w-3xl mx-auto">
        <div className="p-5 bg-snoov-sand/20 border border-snoov-border rounded-base space-y-1.5 text-xs">
          <strong className="font-mono text-snoov-charcoal block uppercase">
            TRICITY SAME-DAY DESK
          </strong>
          <p className="text-snoov-muted text-[11px] font-sans">
            Need to adjust your Chandigarh, Mohali, or Panchkula hand-delivery slot?
          </p>
          <a
            href="https://wa.me/919876543210?text=Hi%20SNOOV,%20I'd%20like%20to%20adjust%20my%20Tricity%20delivery"
            target="_blank"
            rel="noreferrer"
            className="text-snoov-green font-mono uppercase text-[11px] font-semibold hover:underline block pt-1"
          >
            WhatsApp Tricity Courier ↗
          </a>
        </div>

        <div className="p-5 bg-snoov-sand/20 border border-snoov-border rounded-base space-y-1.5 text-xs">
          <strong className="font-mono text-snoov-charcoal block uppercase">
            DOMESTIC INDIA (BLUE DART)
          </strong>
          <p className="text-snoov-muted text-[11px] font-sans">
            Track via Blue Dart Airway bill across major Indian metropolitan cities.
          </p>
          <a
            href="https://www.bluedart.com"
            target="_blank"
            rel="noreferrer"
            className="text-snoov-green font-mono uppercase text-[11px] font-semibold hover:underline block pt-1"
          >
            Blue Dart Portal ↗
          </a>
        </div>

        <div className="p-5 bg-snoov-sand/20 border border-snoov-border rounded-base space-y-1.5 text-xs">
          <strong className="font-mono text-snoov-charcoal block uppercase">
            WORLDWIDE (DHL EXPRESS)
          </strong>
          <p className="text-snoov-muted text-[11px] font-sans">
            Global DDP courier tracking with customs clearance updates.
          </p>
          <a
            href="https://www.dhl.com"
            target="_blank"
            rel="noreferrer"
            className="text-snoov-green font-mono uppercase text-[11px] font-semibold hover:underline block pt-1"
          >
            DHL Global Tracking ↗
          </a>
        </div>
      </div>

    </div>
  )
}
