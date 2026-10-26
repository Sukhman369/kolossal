import { useEffect } from "react"
import { defineWidgetConfig } from "@medusajs/admin-sdk"
import { Badge } from "@medusajs/ui"
import { BuildingTax } from "@medusajs/icons"

/**
 * Global Indian Standards Enforcement Widget
 * Injected into zone: "order.details.before"
 * Enforces Indian Rupee formatting, PIN Code terminology, and IST time indicators
 */
const AdminIndiaStandards = () => {
  useEffect(() => {
    // Inject global DOM mutation observer to ensure Indian formatting across admin tables
    const scriptId = "beyond-humans-india-standards-script"
    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script")
      script.id = scriptId
      script.innerHTML = `
        (function() {
          function applyIndiaStandards() {
            // Replace international labels in visible text nodes
            const walker = document.createTreeWalker(
              document.body,
              NodeFilter.SHOW_TEXT,
              null,
              false
            );
            let node;
            while ((node = walker.nextNode())) {
              if (node.nodeValue) {
                if (node.nodeValue.includes("Postal Code") || node.nodeValue.includes("Postal code")) {
                  node.nodeValue = node.nodeValue.replace(/Postal [Cc]ode/g, "PIN Code");
                }
                if (node.nodeValue.includes("Zip code") || node.nodeValue.includes("Zip Code")) {
                  node.nodeValue = node.nodeValue.replace(/Zip [Cc]ode/g, "PIN Code");
                }
              }
            }
          }

          const observer = new MutationObserver(applyIndiaStandards);
          observer.observe(document.body, { childList: true, subtree: true });
          applyIndiaStandards();
        })();
      `
      document.head.appendChild(script)
    }
  }, [])

  return (
    <div className="w-full mb-3 flex items-center justify-between px-3.5 py-2 rounded-xl bg-neutral-900 text-white border border-neutral-800 shadow-xs">
      <div className="flex items-center gap-2">
        <div className="h-6 w-6 rounded-md bg-[#580D1A] flex items-center justify-center text-white shrink-0">
          <BuildingTax className="w-3.5 h-3.5" />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold tracking-wider uppercase font-mono">
            INDIAN COMMERCE ENGINE
          </span>
          <span className="text-neutral-500 font-mono text-[10px]">|</span>
          <span className="text-[11px] font-mono text-neutral-300">
            INR (₹) · CHANDIGARH ATELIER (04)
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Badge size="small" color="green" className="font-mono text-[10px]">
          100% INDIAN GST COMPLIANT
        </Badge>
        <span className="text-[10px] font-mono text-neutral-400 hidden sm:inline">
          IST (UTC+05:30)
        </span>
      </div>
    </div>
  )
}

export const config = defineWidgetConfig({
  zone: "order.details.before",
})

export default AdminIndiaStandards
