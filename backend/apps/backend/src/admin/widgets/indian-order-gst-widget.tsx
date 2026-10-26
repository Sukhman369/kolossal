import { useState } from "react"
import { defineWidgetConfig } from "@medusajs/admin-sdk"
import { Container, Text, Button, Input, toast, Badge } from "@medusajs/ui"
import { BuildingTax, ReceiptPercent, ShieldCheck, CheckCircleSolid } from "@medusajs/icons"
import {
  SUPPLIER_ORIGIN,
  resolveGstState,
  formatINR,
  isValidGstin,
} from "../utils/india-standards"

interface OrderAddress {
  province?: string
  city?: string
  postal_code?: string
  address_1?: string
}

interface OrderData {
  id: string
  display_id?: number | string
  created_at?: string
  currency_code?: string
  total?: number
  subtotal?: number
  tax_total?: number
  shipping_address?: OrderAddress
  metadata?: Record<string, any>
}

/**
 * Indian GST Compliance & Place of Supply (POS) Engine Widget
 * Injected into order details sidebar (zone: "order.details.side.after")
 */
const IndianOrderGstWidget = ({ data }: { data: OrderData }) => {
  const shippingState = data?.shipping_address?.province || data?.shipping_address?.city || "Chandigarh"
  const pos = resolveGstState(shippingState)

  const isIntraState = pos.code === SUPPLIER_ORIGIN.stateCode
  const orderTotal = Number(data?.total || 0)
  const taxTotal = Number(data?.tax_total || Math.round((orderTotal * 18) / 118))
  const isEwayBillRequired = orderTotal >= 50000

  const [customerGst, setCustomerGst] = useState<string>(
    (data?.metadata?.buyer_gstin as string) || ""
  )
  const [gstValid, setGstValid] = useState<boolean | null>(
    data?.metadata?.buyer_gstin ? isValidGstin(data.metadata.buyer_gstin) : null
  )

  const handleValidateGst = () => {
    if (!customerGst.trim()) {
      setGstValid(null)
      return
    }
    const valid = isValidGstin(customerGst)
    setGstValid(valid)
    if (valid) {
      toast.success("Valid GSTIN", {
        description: `Customer GSTIN is compliant. Applicable for B2B Input Tax Credit (ITC).`,
      })
    } else {
      toast.error("Invalid GSTIN Format", {
        description: "Indian GSTIN must be 15 alphanumeric characters (e.g. 07AAAAA0000A1Z5).",
      })
    }
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
              Indian GST Tax Engine
            </Text>
            <Text size="small" leading="compact" className="text-ui-fg-subtle text-xs">
              CGST / SGST / IGST Compliance
            </Text>
          </div>
        </div>
        <Badge size="small" color={isIntraState ? "blue" : "purple"}>
          {isIntraState ? "Intra-State" : "Inter-State"}
        </Badge>
      </div>

      {/* Place of Supply & Tax Jurisdiction Info */}
      <div className="p-2.5 mb-3 bg-ui-bg-subtle/70 rounded-lg border border-ui-border-base/60 text-xs space-y-1.5 font-mono">
        <div className="flex justify-between items-center text-ui-fg-subtle">
          <span>Supplier Origin:</span>
          <span className="text-ui-fg-base font-semibold">
            {SUPPLIER_ORIGIN.state} ({SUPPLIER_ORIGIN.stateCode})
          </span>
        </div>
        <div className="flex justify-between items-center text-ui-fg-subtle">
          <span>Place of Supply (POS):</span>
          <span className="text-ui-fg-base font-semibold">
            {pos.name} ({pos.code})
          </span>
        </div>
        <div className="flex justify-between items-center text-ui-fg-subtle">
          <span>Supplier GSTIN:</span>
          <span className="text-[#580D1A] font-semibold">
            {SUPPLIER_ORIGIN.gstin}
          </span>
        </div>
      </div>

      {/* Tax Component Breakdown */}
      <div className="p-3 mb-3 bg-ui-bg-subtle/40 rounded-lg border border-ui-border-base/50 text-xs space-y-2">
        <div className="flex items-center gap-1.5 text-ui-fg-muted font-medium uppercase tracking-wider text-[10px]">
          <ReceiptPercent className="w-3.5 h-3.5 text-[#580D1A]" />
          <span>Tax Slabs & Breakdown</span>
        </div>

        {isIntraState ? (
          <div className="grid grid-cols-2 gap-2 pt-1 border-t border-ui-border-base/40">
            <div className="p-2 rounded bg-ui-bg-base border border-ui-border-base">
              <span className="text-[10px] text-ui-fg-muted block">CGST (9%)</span>
              <span className="font-semibold text-ui-fg-base">{formatINR(taxTotal / 2)}</span>
            </div>
            <div className="p-2 rounded bg-ui-bg-base border border-ui-border-base">
              <span className="text-[10px] text-ui-fg-muted block">SGST (9%)</span>
              <span className="font-semibold text-ui-fg-base">{formatINR(taxTotal / 2)}</span>
            </div>
          </div>
        ) : (
          <div className="p-2 rounded bg-ui-bg-base border border-ui-border-base pt-1">
            <div className="flex justify-between items-center">
              <div>
                <span className="text-[10px] text-ui-fg-muted block">Integrated GST (IGST 18%)</span>
                <span className="text-xs text-ui-fg-subtle">Inter-State Dispatch to {pos.name}</span>
              </div>
              <span className="font-semibold text-ui-fg-base text-sm">{formatINR(taxTotal)}</span>
            </div>
          </div>
        )}
      </div>

      {/* E-Way Bill Statutory Status */}
      <div className={`p-2.5 mb-3 rounded-lg border text-xs flex items-start gap-2 ${
        isEwayBillRequired 
          ? "bg-amber-500/10 border-amber-500/30 text-amber-900 dark:text-amber-200" 
          : "bg-emerald-500/10 border-emerald-500/30 text-emerald-900 dark:text-emerald-200"
      }`}>
        <ShieldCheck className="w-4 h-4 mt-0.5 shrink-0" />
        <div>
          <span className="font-semibold block">
            {isEwayBillRequired ? "E-Way Bill Generation Required" : "E-Way Bill Exempt"}
          </span>
          <span className="text-[11px] opacity-90 leading-tight block mt-0.5">
            {isEwayBillRequired 
              ? `Consignment value ${formatINR(orderTotal)} exceeds the statutory ₹50,000 threshold under Section 68 of CGST Act.`
              : `Consignment value is under the mandatory ₹50,000 threshold.`
            }
          </span>
        </div>
      </div>

      {/* B2B Customer GSTIN Field */}
      <div className="space-y-1.5 pt-1">
        <label className="text-[11px] font-semibold text-ui-fg-subtle uppercase tracking-wider block">
          Buyer GSTIN (Optional B2B)
        </label>
        <div className="flex items-center gap-1.5">
          <Input
            size="small"
            placeholder="e.g. 07AAAAA0000A1Z5"
            value={customerGst}
            onChange={(e) => setCustomerGst(e.target.value.toUpperCase())}
            className="font-mono text-xs uppercase"
          />
          <Button
            size="small"
            variant="secondary"
            onClick={handleValidateGst}
            className="shrink-0"
          >
            Verify
          </Button>
        </div>
        {gstValid === true && (
          <span className="inline-flex items-center gap-1 text-[11px] text-emerald-600 font-medium">
            <CheckCircleSolid className="w-3.5 h-3.5" />
            Verified Indian GSTIN Format
          </span>
        )}
      </div>
    </Container>
  )
}

export const config = defineWidgetConfig({
  zone: "order.details.side.after",
})

export default IndianOrderGstWidget
