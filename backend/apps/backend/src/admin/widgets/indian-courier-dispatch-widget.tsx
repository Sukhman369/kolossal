import { useState } from "react"
import { defineWidgetConfig } from "@medusajs/admin-sdk"
import { Container, Text, Button, Input, Select, toast, Badge } from "@medusajs/ui"
import { TruckFast, ArrowUpRightOnBox } from "@medusajs/icons"
import {
  INDIAN_COURIERS,
  SUPPLIER_ORIGIN,
  isValidPinCode,
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
  shipping_address?: OrderAddress
  metadata?: Record<string, any>
}

/**
 * Indian Domestic Logistics & Courier Dispatch Widget
 * Supports Delhivery, Blue Dart, Shiprocket, DTDC, India Post, Xpressbees
 * Injected into order details sidebar (zone: "order.details.side.after")
 */
const IndianCourierDispatchWidget = ({ data }: { data: OrderData }) => {
  const pinCode = data?.shipping_address?.postal_code || ""
  const isPinValid = isValidPinCode(pinCode)
  const destinationCity = data?.shipping_address?.city || data?.shipping_address?.province || "India"

  const [selectedCourierId, setSelectedCourierId] = useState<string>("delhivery")
  const [awbNumber, setAwbNumber] = useState<string>(
    (data?.metadata?.awb_number as string) || ""
  )

  const activeCourier = INDIAN_COURIERS.find((c) => c.id === selectedCourierId) || INDIAN_COURIERS[0]

  const handleTrackShipment = () => {
    if (!awbNumber.trim()) {
      toast.error("AWB Number Required", {
        description: "Please enter an Air Waybill (AWB) number to track the consignment.",
      })
      return
    }
    const trackingUrl = activeCourier.trackingUrl(awbNumber.trim())
    window.open(trackingUrl, "_blank")
  }

  const handleSaveDispatch = () => {
    if (!awbNumber.trim()) {
      toast.error("Enter AWB Number", {
        description: "Provide an AWB number before updating dispatch status.",
      })
      return
    }

    toast.success("Consignment Dispatched", {
      description: `Dispatched via ${activeCourier.name} (AWB: ${awbNumber}). Origin: ${SUPPLIER_ORIGIN.city} (${SUPPLIER_ORIGIN.pinCode}).`,
    })
  }

  return (
    <Container className="p-4 bg-ui-bg-base border border-ui-border-base rounded-xl shadow-xs">
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-3 pb-3 border-b border-ui-border-base">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-ui-bg-subtle text-[#580D1A] border border-ui-border-base">
            <TruckFast className="w-5 h-5" />
          </div>
          <div>
            <Text size="small" leading="compact" weight="plus" className="text-ui-fg-base font-semibold tracking-tight">
              Indian Domestic Dispatch
            </Text>
            <Text size="small" leading="compact" className="text-ui-fg-subtle text-xs">
              Pan-India Courier Network
            </Text>
          </div>
        </div>
        <Badge size="small" color={isPinValid ? "green" : "orange"}>
          {isPinValid ? `PIN: ${pinCode}` : "Verify PIN"}
        </Badge>
      </div>

      {/* Destination & Transit Status */}
      <div className="p-2.5 mb-3 bg-ui-bg-subtle/70 rounded-lg border border-ui-border-base/60 text-xs space-y-1">
        <div className="flex justify-between items-center text-ui-fg-subtle">
          <span>Dispatch Hub:</span>
          <span className="text-ui-fg-base font-medium">Chandigarh Central (160017)</span>
        </div>
        <div className="flex justify-between items-center text-ui-fg-subtle">
          <span>Destination:</span>
          <span className="text-ui-fg-base font-medium">
            {destinationCity} {pinCode ? `· ${pinCode}` : ""}
          </span>
        </div>
        <div className="flex justify-between items-center text-ui-fg-subtle">
          <span>Avg. Transit:</span>
          <span className="text-[#580D1A] font-semibold">{activeCourier.avgTransitDays}</span>
        </div>
      </div>

      {/* Carrier Selection */}
      <div className="space-y-3">
        <div>
          <label className="text-[11px] font-semibold text-ui-fg-subtle uppercase tracking-wider block mb-1">
            Shipping Partner
          </label>
          <Select
            value={selectedCourierId}
            onValueChange={setSelectedCourierId}
            size="small"
          >
            <Select.Trigger>
              <Select.Value />
            </Select.Trigger>
            <Select.Content>
              {INDIAN_COURIERS.map((c) => (
                <Select.Item key={c.id} value={c.id}>
                  {c.name}
                </Select.Item>
              ))}
            </Select.Content>
          </Select>
        </div>

        {/* AWB Number Input */}
        <div>
          <label className="text-[11px] font-semibold text-ui-fg-subtle uppercase tracking-wider block mb-1">
            AWB Consignment Number
          </label>
          <Input
            size="small"
            placeholder="e.g. 12984920491"
            value={awbNumber}
            onChange={(e) => setAwbNumber(e.target.value.trim())}
            className="font-mono text-xs"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 pt-1">
          <Button
            size="small"
            variant="primary"
            className="w-full flex items-center justify-center gap-1.5 bg-[#580D1A] hover:bg-[#430913] text-white"
            onClick={handleSaveDispatch}
          >
            Update Dispatch
          </Button>
          <Button
            size="small"
            variant="secondary"
            className="shrink-0 flex items-center gap-1 px-3"
            onClick={handleTrackShipment}
            disabled={!awbNumber}
            title="Open tracking page"
          >
            <span>Track</span>
            <ArrowUpRightOnBox className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>
    </Container>
  )
}

export const config = defineWidgetConfig({
  zone: "order.details.side.after",
})

export default IndianCourierDispatchWidget
