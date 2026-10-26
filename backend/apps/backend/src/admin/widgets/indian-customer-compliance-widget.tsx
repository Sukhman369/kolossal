import { useState } from "react"
import { defineWidgetConfig } from "@medusajs/admin-sdk"
import { Container, Text, Button, Input, Badge, toast } from "@medusajs/ui"
import { BuildingTax, CheckCircleSolid } from "@medusajs/icons"
import {
  resolveGstState,
  formatIndianPhone,
  isValidGstin,
  isValidPan,
  isValidPinCode,
} from "../utils/india-standards"

interface CustomerAddress {
  province?: string
  city?: string
  postal_code?: string
  phone?: string
}

interface CustomerData {
  id: string
  first_name?: string
  last_name?: string
  email?: string
  phone?: string
  addresses?: CustomerAddress[]
  metadata?: Record<string, any>
}

/**
 * Indian Customer Profile & Tax Compliance Widget
 * Injected into customer details sidebar (zone: "customer.details.side.after")
 */
const IndianCustomerComplianceWidget = ({ data }: { data: CustomerData }) => {
  const defaultAddress = data?.addresses?.[0]
  const stateQuery = defaultAddress?.province || defaultAddress?.city || ""
  const gstState = resolveGstState(stateQuery)
  const phone = data?.phone || defaultAddress?.phone || ""
  const pinCode = defaultAddress?.postal_code || ""

  const [panNumber, setPanNumber] = useState<string>(
    (data?.metadata?.pan_number as string) || ""
  )
  const [gstin, setGstin] = useState<string>(
    (data?.metadata?.buyer_gstin as string) || ""
  )

  const isPhoneValid = phone.replace(/\D/g, "").length >= 10
  const isPinValid = isValidPinCode(pinCode)

  const handleVerifyTaxInfo = () => {
    let panValid = false
    let gstValid = false

    if (panNumber.trim()) {
      panValid = isValidPan(panNumber)
      if (!panValid) {
        toast.error("Invalid PAN Format", {
          description: "Permanent Account Number (PAN) must be 10 characters (e.g. ABCDE1234F).",
        })
        return
      }
    }

    if (gstin.trim()) {
      gstValid = isValidGstin(gstin)
      if (!gstValid) {
        toast.error("Invalid GSTIN Format", {
          description: "GSTIN must be 15 alphanumeric characters (e.g. 07AAAAA0000A1Z5).",
        })
        return
      }
    }

    toast.success("Indian Tax Details Verified", {
      description: `Customer certified with State Code ${gstState.code} (${gstState.name}). Ready for GST invoices.`,
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
              Indian Customer Profile
            </Text>
            <Text size="small" leading="compact" className="text-ui-fg-subtle text-xs">
              GST State Code & Verification
            </Text>
          </div>
        </div>
        <Badge size="small" color={isPinValid && isPhoneValid ? "green" : "blue"} className="flex items-center gap-1">
          {isPinValid && isPhoneValid && <CheckCircleSolid className="w-3 h-3 text-emerald-600" />}
          <span>State: {gstState.code}</span>
        </Badge>
      </div>

      {/* Customer Location & Standard Phone Details */}
      <div className="p-2.5 mb-3 bg-ui-bg-subtle/70 rounded-lg border border-ui-border-base/60 text-xs space-y-1.5 font-mono">
        <div className="flex justify-between items-center text-ui-fg-subtle">
          <span>Mobile (+91):</span>
          <span className="text-ui-fg-base font-semibold">
            {formatIndianPhone(phone)} {isPhoneValid ? "✓" : ""}
          </span>
        </div>
        <div className="flex justify-between items-center text-ui-fg-subtle">
          <span>State / UT:</span>
          <span className="text-ui-fg-base font-semibold">
            {gstState.name} ({gstState.code})
          </span>
        </div>
        <div className="flex justify-between items-center text-ui-fg-subtle">
          <span>PIN Code:</span>
          <span className="text-ui-fg-base font-semibold">
            {pinCode || "Not provided"} {isPinValid ? "✓" : ""}
          </span>
        </div>
      </div>

      {/* Tax Identifiers Input */}
      <div className="space-y-3">
        <div>
          <label className="text-[11px] font-semibold text-ui-fg-subtle uppercase tracking-wider block mb-1">
            PAN (Permanent Account Number)
          </label>
          <Input
            size="small"
            placeholder="e.g. ABCDE1234F"
            value={panNumber}
            onChange={(e) => setPanNumber(e.target.value.toUpperCase().trim())}
            className="font-mono text-xs uppercase"
            maxLength={10}
          />
        </div>

        <div>
          <label className="text-[11px] font-semibold text-ui-fg-subtle uppercase tracking-wider block mb-1">
            GSTIN (For B2B Billing)
          </label>
          <Input
            size="small"
            placeholder="e.g. 07AAAAA0000A1Z5"
            value={gstin}
            onChange={(e) => setGstin(e.target.value.toUpperCase().trim())}
            className="font-mono text-xs uppercase"
            maxLength={15}
          />
        </div>

        <Button
          size="small"
          variant="secondary"
          className="w-full text-xs"
          onClick={handleVerifyTaxInfo}
        >
          Verify Indian Tax Clearance
        </Button>
      </div>
    </Container>
  )
}

export const config = defineWidgetConfig({
  zone: "customer.details.side.after",
})

export default IndianCustomerComplianceWidget
