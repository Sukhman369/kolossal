import { useEffect, useState, lazy, Suspense } from "react"
import { defineWidgetConfig } from "@medusajs/admin-sdk"

// Dynamic import with client-only execution (WebGL requires the browser)
const DynamicLogin3DScene = lazy(() => import("../components/login-3d-scene"))

/**
 * Beyond Humans Luxury Architectural Admin Login Customization
 * Injected into zone: "login.before"
 * Light, museum-grade aesthetic with signature burgundy accents
 */
const LoginBranding = () => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)

    // Inject custom styling scoped to the Beyond Humans login page
    const styleId = "beyond-humans-login-custom-styles"
    let styleTag = document.getElementById(styleId) as HTMLStyleElement | null

    if (!styleTag) {
      styleTag = document.createElement("style")
      styleTag.id = styleId
      styleTag.innerHTML = `
        /* Beyond Humans Light Architectural Atmosphere */
        body:has(#bh-admin-login-root) {
          background-color: #FAF9F7 !important;
          background-image: 
            radial-gradient(circle at 50% 35%, rgba(88, 13, 26, 0.05) 0%, rgba(250, 249, 247, 0.4) 45%, #FAF9F7 100%),
            linear-gradient(rgba(0, 0, 0, 0.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 0, 0, 0.035) 1px, transparent 1px) !important;
          background-size: 100% 100%, 36px 36px, 36px 36px !important;
          background-attachment: fixed !important;
          color: #171717 !important;
          min-height: 100vh !important;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif !important;
        }

        /* Outer login container */
        body:has(#bh-admin-login-root) .bg-ui-bg-subtle {
          background: transparent !important;
        }

        /* Hide default Medusa AvatarBox and default text header to replace with Beyond Humans Luxury 3D Header */
        body:has(#bh-admin-login-root) .m-4 > [class*="bg-ui-button-neutral"],
        body:has(#bh-admin-login-root) .m-4 > [class*="shadow-buttons-neutral"],
        body:has(#bh-admin-login-root) .m-4 > svg[viewBox="0 0 400 400"],
        body:has(#bh-admin-login-root) .m-4 > div.mb-4 {
          display: none !important;
        }

        /* Central Architectural Card - Light Museum Grade */
        body:has(#bh-admin-login-root) .m-4.flex.w-full {
          max-width: 420px !important;
          background: #FFFFFF !important;
          border: 1px solid rgba(0, 0, 0, 0.08) !important;
          border-top: 3px solid #580d1a !important;
          border-radius: 18px !important;
          padding: 26px 30px 30px 30px !important;
          box-shadow: 
            0 20px 60px -15px rgba(0, 0, 0, 0.08),
            0 4px 16px -4px rgba(88, 13, 26, 0.06),
            0 1px 3px rgba(0, 0, 0, 0.03) !important;
          position: relative !important;
          margin: 1.5rem !important;
        }

        /* Form Labels */
        body:has(#bh-admin-login-root) label {
          color: #171717 !important;
          font-weight: 600 !important;
          font-size: 12px !important;
          text-transform: uppercase !important;
          letter-spacing: 0.06em !important;
          font-family: monospace, -apple-system, sans-serif !important;
        }

        /* Input fields - Crisp off-white with wine-red focus ring */
        body:has(#bh-admin-login-root) input {
          background-color: #FAFAFA !important;
          border: 1.5px solid #E5E5E5 !important;
          border-radius: 8px !important;
          color: #171717 !important;
          font-size: 13px !important;
          transition: all 0.2s ease !important;
        }

        body:has(#bh-admin-login-root) input::placeholder {
          color: #9CA3AF !important;
          text-transform: uppercase !important;
          font-size: 11px !important;
          letter-spacing: 0.06em !important;
        }

        body:has(#bh-admin-login-root) input:focus {
          border-color: #580d1a !important;
          background-color: #FFFFFF !important;
          box-shadow: 0 0 0 3px rgba(88, 13, 26, 0.12) !important;
        }

        /* Submit Button - Beyond Humans Deep Burgundy with High Contrast */
        body:has(#bh-admin-login-root) button[type="submit"] {
          background: linear-gradient(135deg, #580d1a 0%, #3a0811 100%) !important;
          border: none !important;
          border-radius: 8px !important;
          color: #ffffff !important;
          font-weight: 700 !important;
          text-transform: uppercase !important;
          letter-spacing: 0.16em !important;
          font-size: 11px !important;
          padding-top: 11px !important;
          padding-bottom: 11px !important;
          transition: all 0.25s ease !important;
          box-shadow: 0 4px 14px rgba(88, 13, 26, 0.35) !important;
          cursor: pointer !important;
        }

        body:has(#bh-admin-login-root) button[type="submit"]:hover {
          background: linear-gradient(135deg, #6d1121 0%, #430913 100%) !important;
          transform: translateY(-1px) !important;
          box-shadow: 0 6px 20px rgba(88, 13, 26, 0.45) !important;
        }

        body:has(#bh-admin-login-root) button[type="submit"]:active {
          transform: translateY(0px) !important;
        }

        /* Forgot password text */
        body:has(#bh-admin-login-root) .txt-small {
          color: #6B7280 !important;
          font-size: 11px !important;
          letter-spacing: 0.04em !important;
          margin-top: 18px !important;
          margin-bottom: 4px !important;
        }

        body:has(#bh-admin-login-root) a[href="/reset-password"] {
          color: #580D1A !important;
          font-weight: 600 !important;
          letter-spacing: 0.06em !important;
          text-transform: uppercase !important;
          transition: color 0.2s ease !important;
        }

        body:has(#bh-admin-login-root) a[href="/reset-password"]:hover {
          color: #3a0811 !important;
          text-decoration: underline !important;
        }
      `
      document.head.appendChild(styleTag)
    }
  }, [])

  return (
    <div id="bh-admin-login-root" className="w-full mb-1">
      {/* =========================================================================
          BEYOND HUMANS 3D INTERACTIVE CHROME MONOLITH EMBLEM
         ========================================================================= */}
      <div className="flex flex-col items-center justify-center text-center">
        {/* Dynamic Client-Only 3D Canvas Scene */}
        {isMounted ? (
          <Suspense
            fallback={
              <div className="h-[175px] w-full flex items-center justify-center">
                <div className="h-14 w-14 rounded-full border border-[#580D1A]/30 bg-neutral-100 animate-pulse" />
              </div>
            }
          >
            <DynamicLogin3DScene />
          </Suspense>
        ) : (
          <div className="h-[175px] w-full" />
        )}

        {/* Brand Name with Architectural Tracking - Deep Black */}
        <h1 className="text-xl font-black uppercase tracking-[0.24em] text-neutral-950 pl-[0.24em] mt-1">
          BEYOND HUMANS
        </h1>

        {/* Architectural Subtitle & Discipline - Wine Red */}
        <div className="mt-1 flex items-center justify-center gap-2">
          <span className="h-[1px] w-6 bg-gradient-to-r from-transparent to-[#580D1A]/40" />
          <span className="text-[10px] font-semibold uppercase tracking-[0.20em] text-[#580D1A]">
            CHANDIGARH ATELIER · INDIA
          </span>
          <span className="h-[1px] w-6 bg-gradient-to-l from-transparent to-[#580D1A]/40" />
        </div>

        {/* Security Classification Badge - Light Theme Pill */}
        <div className="mt-2.5 mb-4 inline-flex items-center gap-1.5 rounded-full border border-[#580D1A]/20 bg-[#580D1A]/5 px-3 py-0.5 shadow-2xs">
          <span className="h-1.5 w-1.5 rounded-full bg-[#580D1A] animate-ping" />
          <span className="h-1.5 w-1.5 rounded-full bg-[#580D1A] absolute" />
          <span className="text-[9px] font-mono font-semibold tracking-[0.14em] text-[#580D1A] uppercase pl-1">
            CONTROL CENTER // INDIA (INR ₹)
          </span>
        </div>
      </div>
    </div>
  )
}

export const config = defineWidgetConfig({
  zone: "login.before",
})

export default LoginBranding
