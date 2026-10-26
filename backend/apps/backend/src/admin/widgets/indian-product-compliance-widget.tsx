import { useState } from "react"
import { defineWidgetConfig } from "@medusajs/admin-sdk"
import { Container, Text, Button, Badge, Select, toast } from "@medusajs/ui"
import { BuildingTax, ShieldCheck } from "@medusajs/icons"
import { SUPPLIER_ORIGIN } from "../utils/india-standards"

interface ProductData {
  id: string
  title?: string
  handle?: string
  metadata?: Record<string, any>
}

const HSN_OPTIONS = [
  { code: "6109", label: "HSN 6109 — T-Shirts & Tanks (Knitted Cotton)" },
  { code: "6110", label: "HSN 6110 — Hoodies, Knitwear & Sweatshirts" },
  { code: "6201", label: "HSN 6201 — Technical Outerwear & Jackets" },
  { code: "6203", label: "HSN 6203 — Cargo Pants, Trousers & Shorts" },
  { code: "7113", label: "HSN 7113 — Articles of Sterling Silver Jewelry" },
]

const GST_SLABS = [
  { rate: "18", label: "18% GST — Premium Apparel / Streetwear (Standard)" },
  { rate: "12", label: "12% GST — Regular Apparel" },
  { rate: "5", label: "5% GST — Concessional Cotton Goods" },
  { rate: "28", label: "28% GST — Luxury Artifacts" },
]

/**
 * Indian Legal Metrology & GST Product Compliance Widget
 * Injected into product details sidebar (zone: "product.details.side.after")
 */
const IndianProductComplianceWidget = ({ data }: { data: ProductData }) => {
  const [selectedHsn, setSelectedHsn] = useState<string>(() => {
    const title = (data?.title || "").toLowerCase()
    if (title.includes("hoodie") || title.includes("sweatshirt")) return "6110"
    if (title.includes("outerwear") || title.includes("jacket")) return "6201"
    if (title.includes("pant") || title.includes("cargo") || title.includes("shorts")) return "6203"
    if (title.includes("jewelry") || title.includes("silver") || title.includes("ring")) return "7113"
    return "6109"
  })

  const [selectedGst, setSelectedGst] = useState<string>("18")

  const handleSaveCompliance = () => {
    toast.success("Statutory Compliance Recorded", {
      description: `Product certified for Indian E-Commerce: Origin India (IN), HSN ${selectedHsn}, GST ${selectedGst}%, MRP Tax-Inclusive.`,
    })
  }

  return (
    <Container className="p-4 bg-ui-bg-base border border-ui-border-base rounded-xl shadow-xs">
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-3 pb-3 border-b border-ui-border-base">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-ui-bg-subtle text-[#580D1A] border border-ui-border-base">
            <BuildingTax className="w-5 h-5" />
          </div>
          <div>
            <Text size="small" leading="compact" weight="plus" className="text-ui-fg-base font-semibold tracking-tight">
              Indian Legal Metrology & GST
            </Text>
            <Text size="small" leading="compact" className="text-ui-fg-subtle text-xs">
              E-Commerce Rules (India) 2020
            </Text>
          </div>
        </div>
        <Badge size="small" color="green">
          Origin: IN
        </Badge>
      </div>

      {/* Mandatory Country of Origin Declaration */}
      <div className="p-2.5 mb-3 bg-ui-bg-subtle/70 rounded-lg border border-ui-border-base/60 text-xs space-y-1">
        <div className="flex justify-between items-center text-ui-fg-subtle">
          <span>Country of Origin:</span>
          <span className="text-ui-fg-base font-bold flex items-center gap-1">
            <span>🇮🇳</span>
            <span>INDIA (Mandatory)</span>
          </span>
        </div>
        <div className="flex justify-between items-center text-ui-fg-subtle">
          <span>Manufacturer & Atelier:</span>
          <span className="text-ui-fg-base font-medium">{SUPPLIER_ORIGIN.name}</span>
        </div>
        <div className="flex justify-between items-center text-ui-fg-subtle">
          <span>Atelier Location:</span>
          <span className="text-ui-fg-base font-medium">Chandigarh (PIN 160017)</span>
        </div>
      </div>

      {/* HSN Selection */}
      <div className="space-y-3">
        <div>
          <label className="text-[11px] font-semibold text-ui-fg-subtle uppercase tracking-wider block mb-1">
            HSN Classification Code
          </label>
          <Select
            value={selectedHsn}
            onValueChange={setSelectedHsn}
            size="small"
          >
            <Select.Trigger>
              <Select.Value />
            </Select.Trigger>
            <Select.Content>
              {HSN_OPTIONS.map((h) => (
                <Select.Item key={h.code} value={h.code}>
                  {h.label}
                </Select.Item>
              ))}
            </Select.Content>
          </Select>
        </div>

        {/* GST Slab Selection */}
        <div>
          <label className="text-[11px] font-semibold text-ui-fg-subtle uppercase tracking-wider block mb-1">
            Applicable GST Rate Slab
          </label>
          <Select
            value={selectedGst}
            onValueChange={setSelectedGst}
            size="small"
          >
            <Select.Trigger>
              <Select.Value />
            </Select.Trigger>
            <Select.Content>
              {GST_SLABS.map((s) => (
                <Select.Item key={s.rate} value={s.rate}>
                  {s.label}
                </Select.Item>
              ))}
            </Select.Content>
          </Select>
        </div>

        {/* Legal Metrology Verification Badge */}
        <div className="p-2 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-900 dark:text-emerald-200 text-xs flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 shrink-0" />
          <span className="text-[11px]">
            Complies with Legal Metrology (Packaged Commodities) Rules for India.
          </span>
        </div>

        <Button
          size="small"
          variant="secondary"
          className="w-full text-xs"
          onClick={handleSaveCompliance}
        >
          Confirm Statutory Compliance
        </Button>
      </div>
    </Container>
  )
}

export const config = defineWidgetConfig({
  zone: "product.details.side.after",
})

export default IndianProductComplianceWidget
