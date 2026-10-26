import { useState } from "react"
import { defineWidgetConfig } from "@medusajs/admin-sdk"
import { Container, Text, Button, toast } from "@medusajs/ui"
import { DocumentText, ArrowDownTray } from "@medusajs/icons"

interface OrderData {
  id: string
  display_id?: number | string
  created_at?: string
  currency_code?: string
  status?: string
}

/**
 * Beyond Humans Admin Order Detail Widget
 * Injected into order details sidebar
 * Provides 1-click generation and download of GST-compliant PDF Tax Invoices
 */
const OrderInvoiceWidget = ({ data }: { data: OrderData }) => {
  const [downloading, setDownloading] = useState(false)

  const handleDownloadInvoice = async () => {
    if (!data?.id) return

    try {
      setDownloading(true)
      const res = await fetch(`/admin/orders/${data.id}/invoice`, {
        method: "GET",
        headers: {
          "Accept": "application/pdf",
        },
        credentials: "include",
      })

      if (!res.ok) {
        const errorText = await res.text()
        throw new Error(errorText || `Server responded with ${res.status}`)
      }

      const blob = await res.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `BeyondHumans-TaxInvoice-${data.display_id || data.id}.pdf`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      window.URL.revokeObjectURL(url)

      toast.success("Invoice Downloaded", {
        description: `Tax invoice for Order #${data.display_id || data.id} generated successfully.`,
      })
    } catch (err: unknown) {
      console.error("[BeyondHumans Admin] Invoice download failed:", err)
      toast.error("Download Failed", {
        description: err instanceof Error ? err.message : "Could not generate invoice PDF",
      })
    } finally {
      setDownloading(false)
    }
  }

  const handlePreviewInvoice = () => {
    if (!data?.id) return
    window.open(`/admin/orders/${data.id}/invoice`, "_blank")
  }

  return (
    <Container className="p-4 bg-ui-bg-base border border-ui-border-base rounded-xl shadow-xs">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-ui-bg-subtle text-[#580D1A] border border-ui-border-base">
            <DocumentText className="w-5 h-5" />
          </div>
          <div>
            <Text size="small" leading="compact" weight="plus" className="text-ui-fg-base font-semibold tracking-tight">
              Tax Invoice
            </Text>
            <Text size="small" leading="compact" className="text-ui-fg-subtle text-xs">
              Commercial GST & HSN Compliant
            </Text>
          </div>
        </div>
        <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider bg-ui-bg-subtle text-ui-fg-muted border border-ui-border-base">
          PDF A4
        </span>
      </div>

      <div className="p-2.5 mb-3 bg-ui-bg-subtle/60 rounded-lg border border-ui-border-base/50 text-xs text-ui-fg-subtle space-y-1">
        <div className="flex justify-between items-center">
          <span>Supplier State:</span>
          <span className="font-medium text-ui-fg-base">Chandigarh (04)</span>
        </div>
        <div className="flex justify-between items-center">
          <span>HSN Classes:</span>
          <span className="font-mono text-[11px] text-ui-fg-base">6110 / 6109 / 6201</span>
        </div>
        <div className="flex justify-between items-center">
          <span>Tax Engine:</span>
          <span className="font-medium text-[#580D1A]">CGST+SGST / IGST Auto</span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button
          size="small"
          variant="primary"
          className="w-full flex items-center justify-center gap-1.5 bg-[#580D1A] hover:bg-[#430913] text-white"
          onClick={handleDownloadInvoice}
          isLoading={downloading}
          disabled={downloading}
        >
          <ArrowDownTray className="w-4 h-4" />
          <span>Download Invoice</span>
        </Button>
        <Button
          size="small"
          variant="secondary"
          className="px-3"
          onClick={handlePreviewInvoice}
          disabled={downloading}
          title="Open PDF in new tab"
        >
          Preview
        </Button>
      </div>
    </Container>
  )
}

export const config = defineWidgetConfig({
  zone: "order.details.side.after",
})

export default OrderInvoiceWidget
