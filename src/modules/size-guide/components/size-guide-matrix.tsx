"use client"

import React, { useState } from "react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

type Unit = "cm" | "in"

interface SizeMeasurement {
  size: string
  intlUS: string
  intlUK: string
  intlEU: string
  intlJP: string
  chest: { cm: number; in: number }
  shoulder: { cm: number; in: number }
  length: { cm: number; in: number }
  sleeve: { cm: number; in: number }
}

interface CategoryData {
  id: string
  name: string
  silhouette: string
  fabricSpec: string
  measurements: SizeMeasurement[]
}

const CATEGORIES: CategoryData[] = [
  {
    id: "tees",
    name: "Heavyweight T-Shirts & Mocknecks",
    silhouette: "Architectural Boxy Cut with Drop Shoulders",
    fabricSpec: "380 GSM Rain-Fed GOTS Certified Organic Jersey",
    measurements: [
      { size: "S", intlUS: "36", intlUK: "36", intlEU: "46", intlJP: "1", chest: { cm: 112, in: 44.1 }, shoulder: { cm: 54, in: 21.3 }, length: { cm: 70, in: 27.6 }, sleeve: { cm: 23, in: 9.1 } },
      { size: "M", intlUS: "38", intlUK: "38", intlEU: "48", intlJP: "2", chest: { cm: 118, in: 46.5 }, shoulder: { cm: 56, in: 22.0 }, length: { cm: 73, in: 28.7 }, sleeve: { cm: 24, in: 9.4 } },
      { size: "L", intlUS: "40", intlUK: "40", intlEU: "50", intlJP: "3", chest: { cm: 124, in: 48.8 }, shoulder: { cm: 58, in: 22.8 }, length: { cm: 76, in: 29.9 }, sleeve: { cm: 25, in: 9.8 } },
      { size: "XL", intlUS: "42", intlUK: "42", intlEU: "52", intlJP: "4", chest: { cm: 130, in: 51.2 }, shoulder: { cm: 60, in: 23.6 }, length: { cm: 79, in: 31.1 }, sleeve: { cm: 26, in: 10.2 } },
      { size: "XXL", intlUS: "44", intlUK: "44", intlEU: "54", intlJP: "5", chest: { cm: 136, in: 53.5 }, shoulder: { cm: 62, in: 24.4 }, length: { cm: 81, in: 31.9 }, sleeve: { cm: 27, in: 10.6 } },
    ],
  },
  {
    id: "hoodies",
    name: "Oversized Hoodies & Sweatshirts",
    silhouette: "Sculptural Heavyweight Fleece with Ribbed Hem",
    fabricSpec: "480–520 GSM Organic French Terry & Brushed Cotton",
    measurements: [
      { size: "S", intlUS: "36", intlUK: "36", intlEU: "46", intlJP: "1", chest: { cm: 118, in: 46.5 }, shoulder: { cm: 58, in: 22.8 }, length: { cm: 68, in: 26.8 }, sleeve: { cm: 61, in: 24.0 } },
      { size: "M", intlUS: "38", intlUK: "38", intlEU: "48", intlJP: "2", chest: { cm: 124, in: 48.8 }, shoulder: { cm: 60, in: 23.6 }, length: { cm: 71, in: 28.0 }, sleeve: { cm: 63, in: 24.8 } },
      { size: "L", intlUS: "40", intlUK: "40", intlEU: "50", intlJP: "3", chest: { cm: 130, in: 51.2 }, shoulder: { cm: 62, in: 24.4 }, length: { cm: 74, in: 29.1 }, sleeve: { cm: 65, in: 25.6 } },
      { size: "XL", intlUS: "42", intlUK: "42", intlEU: "52", intlJP: "4", chest: { cm: 136, in: 53.5 }, shoulder: { cm: 64, in: 25.2 }, length: { cm: 77, in: 30.3 }, sleeve: { cm: 67, in: 26.4 } },
      { size: "XXL", intlUS: "44", intlUK: "44", intlEU: "54", intlJP: "5", chest: { cm: 142, in: 55.9 }, shoulder: { cm: 66, in: 26.0 }, length: { cm: 80, in: 31.5 }, sleeve: { cm: 68, in: 26.8 } },
    ],
  },
  {
    id: "overshirts",
    name: "Heavyweight Overshirts & Outerwear",
    silhouette: "Structured Workwear Silhouette with Layering Room",
    fabricSpec: "100% European Flax® Linen & Organic Heavyweight Canvas",
    measurements: [
      { size: "S", intlUS: "36", intlUK: "36", intlEU: "46", intlJP: "1", chest: { cm: 114, in: 44.9 }, shoulder: { cm: 52, in: 20.5 }, length: { cm: 72, in: 28.3 }, sleeve: { cm: 62, in: 24.4 } },
      { size: "M", intlUS: "38", intlUK: "38", intlEU: "48", intlJP: "2", chest: { cm: 120, in: 47.2 }, shoulder: { cm: 54, in: 21.3 }, length: { cm: 75, in: 29.5 }, sleeve: { cm: 64, in: 25.2 } },
      { size: "L", intlUS: "40", intlUK: "40", intlEU: "50", intlJP: "3", chest: { cm: 126, in: 49.6 }, shoulder: { cm: 56, in: 22.0 }, length: { cm: 78, in: 30.7 }, sleeve: { cm: 66, in: 26.0 } },
      { size: "XL", intlUS: "42", intlUK: "42", intlEU: "52", intlJP: "4", chest: { cm: 132, in: 52.0 }, shoulder: { cm: 58, in: 22.8 }, length: { cm: 81, in: 31.9 }, sleeve: { cm: 68, in: 26.8 } },
      { size: "XXL", intlUS: "44", intlUK: "44", intlEU: "54", intlJP: "5", chest: { cm: 138, in: 54.3 }, shoulder: { cm: 60, in: 23.6 }, length: { cm: 83, in: 32.7 }, sleeve: { cm: 69, in: 27.2 } },
    ],
  },
]

export default function SizeGuideMatrix() {
  const [activeCategory, setActiveCategory] = useState(CATEGORIES[0].id)
  const [unit, setUnit] = useState<Unit>("cm")

  const currentCategory = CATEGORIES.find((c) => c.id === activeCategory) || CATEGORIES[0]

  return (
    <div className="space-y-16 sm:space-y-24">
      
      {/* ── Category Tabs & Unit Switcher ── */}
      <div className="space-y-6">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-snoov-border pb-4">
          
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((category) => {
              const isActive = activeCategory === category.id
              return (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-4 py-2 text-xs font-mono rounded-sm transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "bg-snoov-charcoal text-snoov-canvas font-semibold shadow-sm"
                      : "bg-snoov-sand/40 text-snoov-muted hover:text-snoov-charcoal border border-snoov-border"
                  }`}
                >
                  {category.name}
                </button>
              )
            })}
          </div>

          {/* Unit Toggle (CM / IN) */}
          <div className="flex items-center gap-1 bg-snoov-sand/40 p-1 border border-snoov-border rounded-sm self-start md:self-auto">
            <button
              type="button"
              onClick={() => setUnit("cm")}
              className={`px-3 py-1 text-xs font-mono uppercase tracking-wider rounded-xs transition-colors cursor-pointer ${
                unit === "cm"
                  ? "bg-snoov-charcoal text-snoov-canvas font-bold"
                  : "text-snoov-muted hover:text-snoov-charcoal"
              }`}
            >
              Metric (CM)
            </button>
            <button
              type="button"
              onClick={() => setUnit("in")}
              className={`px-3 py-1 text-xs font-mono uppercase tracking-wider rounded-xs transition-colors cursor-pointer ${
                unit === "in"
                  ? "bg-snoov-charcoal text-snoov-canvas font-bold"
                  : "text-snoov-muted hover:text-snoov-charcoal"
              }`}
            >
              Imperial (IN)
            </button>
          </div>

        </div>

        {/* Active Silhouette Spec Banner */}
        <div className="p-5 bg-snoov-sand/30 border border-snoov-border rounded-base flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div>
            <span className="text-[10px] font-mono text-snoov-green uppercase font-semibold block">
              SILHOUETTE PROFILE
            </span>
            <strong className="text-snoov-charcoal font-serif text-base block">
              {currentCategory.silhouette}
            </strong>
          </div>
          <div className="sm:text-right font-mono text-[11px] text-snoov-muted">
            {currentCategory.fabricSpec}
          </div>
        </div>

      </div>

      {/* ── Master Sizing Table ── */}
      <div className="border border-snoov-border rounded-base overflow-hidden bg-snoov-canvas shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono border-collapse">
            <thead>
              <tr className="bg-snoov-sand/50 border-b border-snoov-border text-snoov-charcoal uppercase tracking-wider text-[10px]">
                <th className="py-4 px-4 font-bold">SNOOV Size</th>
                <th className="py-4 px-4 font-semibold text-snoov-muted">US</th>
                <th className="py-4 px-4 font-semibold text-snoov-muted">UK</th>
                <th className="py-4 px-4 font-semibold text-snoov-muted">EU</th>
                <th className="py-4 px-4 font-semibold text-snoov-muted">JP</th>
                <th className="py-4 px-4 font-bold text-snoov-green">Chest / Bust ({unit.toUpperCase()})</th>
                <th className="py-4 px-4 font-semibold text-snoov-charcoal">Shoulders ({unit.toUpperCase()})</th>
                <th className="py-4 px-4 font-semibold text-snoov-charcoal">Length ({unit.toUpperCase()})</th>
                <th className="py-4 px-4 font-semibold text-snoov-charcoal">Sleeve ({unit.toUpperCase()})</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-snoov-border text-snoov-charcoal">
              {currentCategory.measurements.map((row) => (
                <tr key={row.size} className="hover:bg-snoov-sand/20 transition-colors">
                  <td className="py-4 px-4 font-bold text-sm text-snoov-green">{row.size}</td>
                  <td className="py-4 px-4 text-snoov-muted">{row.intlUS}</td>
                  <td className="py-4 px-4 text-snoov-muted">{row.intlUK}</td>
                  <td className="py-4 px-4 text-snoov-muted">{row.intlEU}</td>
                  <td className="py-4 px-4 text-snoov-muted">{row.intlJP}</td>
                  <td className="py-4 px-4 font-semibold">{unit === "cm" ? `${row.chest.cm} cm` : `${row.chest.in}"`}</td>
                  <td className="py-4 px-4">{unit === "cm" ? `${row.shoulder.cm} cm` : `${row.shoulder.in}"`}</td>
                  <td className="py-4 px-4">{unit === "cm" ? `${row.length.cm} cm` : `${row.length.in}"`}</td>
                  <td className="py-4 px-4">{unit === "cm" ? `${row.sleeve.cm} cm` : `${row.sleeve.in}"`}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Fit Profiles & How to Measure Split ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
        
        {/* Left: Model Fit Reference */}
        <div className="lg:col-span-6 space-y-6">
          <div className="space-y-2">
            <span className="text-[10px] font-mono uppercase tracking-widest text-snoov-green font-semibold block">
              01 / REAL FIT REFERENCE
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-normal text-snoov-charcoal">
              Model Measurement Reference
            </h3>
            <p className="text-xs text-snoov-muted font-sans">
              Our streetwear is engineered with deliberate drop-shoulder geometry. Select your standard size for the intended relaxed fit, or size down for a more fitted silhouette.
            </p>
          </div>

          <div className="space-y-4 text-xs font-mono">
            
            {/* Model A */}
            <div className="p-5 bg-snoov-sand/30 border border-snoov-border rounded-base space-y-2">
              <div className="flex items-center justify-between">
                <strong className="text-snoov-charcoal uppercase">
                  PATRON M · OVERSIZED STREETWEAR FIT
                </strong>
                <span className="text-snoov-green font-bold">WEARS SIZE L</span>
              </div>
              <p className="text-snoov-muted text-[11px]">
                Height: 186 cm (6&apos;1&quot;) · Chest: 98 cm (38.5&quot;) · Waist: 81 cm (32&quot;)
              </p>
              <span className="text-[10px] text-snoov-charcoal/80 block italic">
                Fit verdict: Relaxed drop shoulder with ample drape and stack over pants.
              </span>
            </div>

            {/* Model B */}
            <div className="p-5 bg-snoov-sand/30 border border-snoov-border rounded-base space-y-2">
              <div className="flex items-center justify-between">
                <strong className="text-snoov-charcoal uppercase">
                  PATRON F · BOXY CROPPED DRAPE
                </strong>
                <span className="text-snoov-green font-bold">WEARS SIZE S</span>
              </div>
              <p className="text-snoov-muted text-[11px]">
                Height: 172 cm (5&apos;8&quot;) · Chest: 86 cm (34&quot;) · Waist: 68 cm (27&quot;)
              </p>
              <span className="text-[10px] text-snoov-charcoal/80 block italic">
                Fit verdict: Clean wide shoulders with modern tailored torso proportion.
              </span>
            </div>

          </div>
        </div>

        {/* Right: How to Measure 4-Step Guide */}
        <div className="lg:col-span-6 space-y-6">
          <div className="space-y-2">
            <span className="text-[10px] font-mono uppercase tracking-widest text-snoov-green font-semibold block">
              02 / MEASUREMENT INSTRUCTIONS
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-normal text-snoov-charcoal">
              How to Measure at Home
            </h3>
            <p className="text-xs text-snoov-muted font-sans">
              Lay your favorite existing sweatshirt or t-shirt flat on a hard surface and compare dimensions:
            </p>
          </div>

          <div className="space-y-3 font-mono text-xs">
            <div className="p-4 border border-snoov-border rounded-base bg-snoov-sand/20 space-y-1">
              <strong className="text-snoov-charcoal block uppercase text-[11px]">
                1. CHEST CIRCUMFERENCE
              </strong>
              <p className="text-snoov-muted text-[11px] font-sans">
                Measure straight across the chest from armpit to armpit seam, then double the measurement.
              </p>
            </div>

            <div className="p-4 border border-snoov-border rounded-base bg-snoov-sand/20 space-y-1">
              <strong className="text-snoov-charcoal block uppercase text-[11px]">
                2. SHOULDER SPAN
              </strong>
              <p className="text-snoov-muted text-[11px] font-sans">
                Measure horizontally across the back from shoulder point to shoulder point.
              </p>
            </div>

            <div className="p-4 border border-snoov-border rounded-base bg-snoov-sand/20 space-y-1">
              <strong className="text-snoov-charcoal block uppercase text-[11px]">
                3. TOTAL BODY LENGTH
              </strong>
              <p className="text-snoov-muted text-[11px] font-sans">
                Measure vertically from the highest point of the collar seam down to the bottom hem.
              </p>
            </div>

            <div className="p-4 border border-snoov-border rounded-base bg-snoov-sand/20 space-y-1">
              <strong className="text-snoov-charcoal block uppercase text-[11px]">
                4. SLEEVE LENGTH
              </strong>
              <p className="text-snoov-muted text-[11px] font-sans">
                Measure from the top shoulder seam down to the edge of the wrist cuff.
              </p>
            </div>
          </div>

        </div>

      </div>

      {/* ── Custom Sizing Consultation Card ── */}
      <div className="p-8 sm:p-12 bg-snoov-charcoal text-snoov-canvas rounded-base border border-snoov-charcoal flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="space-y-2">
          <span className="text-[10px] font-mono uppercase tracking-widest text-snoov-sand/70 block">
            INDIVIDUAL FIT CONSULTATION
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl font-normal text-snoov-canvas">
            Still Unsure About Your Fit?
          </h3>
          <p className="text-xs text-snoov-sand/80 font-sans max-w-md">
            Transmit your height, weight, and preferred aesthetic to our Chandigarh styling team for personal sizing advice before placing your order.
          </p>
        </div>

        <LocalizedClientLink
          href="/contact"
          className="inline-flex items-center gap-2 px-6 py-3.5 bg-snoov-canvas text-snoov-charcoal text-xs font-mono uppercase tracking-wider font-semibold rounded-sm hover:bg-snoov-sand transition-colors shrink-0"
        >
          <span>Ask A Stylist</span>
          <span>→</span>
        </LocalizedClientLink>
      </div>

    </div>
  )
}
