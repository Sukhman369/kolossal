import { useEffect, useState, lazy, Suspense } from "react"
import { defineWidgetConfig } from "@medusajs/admin-sdk"

// Dynamic import with client-only execution (WebGL requires the browser)
const DynamicLogin3DScene = lazy(() => import("./login-3d-scene"))

/**
 * Beyond Humans Luxury Streetwear Admin Login Customization
 * Injected into zone: "login.before"
 * Includes real-time 3D Chrome Torus Knot + Orbital Rings
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
        /* Beyond Humans Ambient Architectural Atmosphere */
        body:has(#bh-admin-login-root) {
          background-color: #060608 !important;
          background-image: 
            radial-gradient(circle at 50% 40%, rgba(88, 13, 26, 0.35) 0%, rgba(14, 14, 18, 0.94) 52%, #050507 100%),
            linear-gradient(rgba(255, 255, 255, 0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.025) 1px, transparent 1px) !important;
          background-size: 100% 100%, 36px 36px, 36px 36px !important;
          background-attachment: fixed !important;
          color: #faf9f7 !important;
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

        /* Central Architectural Slate Card */
        body:has(#bh-admin-login-root) .m-4.flex.w-full {
          max-width: 400px !important;
          background: rgba(13, 13, 17, 0.90) !important;
          backdrop-filter: blur(28px) saturate(180%) !important;
          -webkit-backdrop-filter: blur(28px) saturate(180%) !important;
          border: 1px solid rgba(88, 13, 26, 0.45) !important;
          border-top: 1px solid rgba(255, 255, 255, 0.22) !important;
          border-radius: 14px !important;
          padding: 24px 28px 28px 28px !important;
          box-shadow: 
            0 30px 80px -15px rgba(0, 0, 0, 0.95),
            0 0 60px -10px rgba(88, 13, 26, 0.35),
            inset 0 1px 0 rgba(255, 255, 255, 0.15) !important;
          position: relative !important;
          margin: 1.5rem !important;
        }

        /* Top Corner Architectural Accents */
        body:has(#bh-admin-login-root) .m-4.flex.w-full::before {
          content: "";
          position: absolute;
          top: -1px;
          left: 24px;
          right: 24px;
          height: 1px;
          background: linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.4) 50%, transparent 100%);
        }

        /* Input fields - Luxury dark slate */
        body:has(#bh-admin-login-root) input {
          background-color: rgba(6, 6, 9, 0.85) !important;
          border: 1px solid rgba(255, 255, 255, 0.12) !important;
          border-radius: 6px !important;
          color: #faf9f7 !important;
          font-size: 13px !important;
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1) !important;
        }

        body:has(#bh-admin-login-root) input::placeholder {
          color: #716e69 !important;
          text-transform: uppercase !important;
          font-size: 11px !important;
          letter-spacing: 0.08em !important;
        }

        body:has(#bh-admin-login-root) input:focus {
          border-color: #580d1a !important;
          box-shadow: 0 0 0 2px rgba(88, 13, 26, 0.45), 0 0 16px rgba(88, 13, 26, 0.25) !important;
          background-color: rgba(10, 10, 14, 0.95) !important;
        }

        /* Submit Button - Beyond Humans Deep Burgundy with Metallic Highlight */
        body:has(#bh-admin-login-root) button[type="submit"] {
          background: linear-gradient(135deg, #580d1a 0%, #3a0811 100%) !important;
          border: 1px solid rgba(255, 255, 255, 0.22) !important;
          border-radius: 6px !important;
          color: #ffffff !important;
          font-weight: 700 !important;
          text-transform: uppercase !important;
          letter-spacing: 0.18em !important;
          font-size: 11px !important;
          padding-top: 10px !important;
          padding-bottom: 10px !important;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1) !important;
          box-shadow: 
            0 4px 20px rgba(88, 13, 26, 0.5),
            0 1px 3px rgba(0, 0, 0, 0.8),
            inset 0 1px 0 rgba(255, 255, 255, 0.3) !important;
          cursor: pointer !important;
        }

        body:has(#bh-admin-login-root) button[type="submit"]:hover {
          background: linear-gradient(135deg, #761426 0%, #580d1a 100%) !important;
          transform: translateY(-1.5px) !important;
          box-shadow: 
            0 8px 30px rgba(118, 20, 38, 0.65),
            0 2px 5px rgba(0, 0, 0, 0.9),
            inset 0 1px 0 rgba(255, 255, 255, 0.4) !important;
        }

        body:has(#bh-admin-login-root) button[type="submit"]:active {
          transform: translateY(0px) !important;
        }

        /* Forgot password text */
        body:has(#bh-admin-login-root) .txt-small {
          color: #8a8680 !important;
          font-size: 11px !important;
          letter-spacing: 0.04em !important;
          margin-top: 18px !important;
          margin-bottom: 4px !important;
        }

        body:has(#bh-admin-login-root) a[href="/reset-password"] {
          color: #c94056 !important;
          font-weight: 600 !important;
          letter-spacing: 0.06em !important;
          text-transform: uppercase !important;
          transition: color 0.2s ease !important;
        }

        body:has(#bh-admin-login-root) a[href="/reset-password"]:hover {
          color: #ff6b84 !important;
          text-shadow: 0 0 10px rgba(201, 64, 86, 0.6) !important;
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
                <div className="h-14 w-14 rounded-full border border-[#580D1A]/50 bg-[#16161c] animate-pulse" />
              </div>
            }
          >
            <DynamicLogin3DScene />
          </Suspense>
        ) : (
          <div className="h-[175px] w-full" />
        )}

        {/* Brand Name with Architectural Tracking */}
        <h1 className="text-lg font-black uppercase tracking-[0.24em] text-[#faf9f7] pl-[0.24em] drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)] mt-1">
          BEYOND HUMANS
        </h1>

        {/* Architectural Subtitle & Discipline */}
        <div className="mt-1 flex items-center justify-center gap-2">
          <span className="h-[1px] w-6 bg-gradient-to-r from-transparent to-[#580D1A]" />
          <span className="text-[10px] font-semibold uppercase tracking-[0.20em] text-[#a8a49d]">
            ARCHITECTURAL ARCHIVE
          </span>
          <span className="h-[1px] w-6 bg-gradient-to-l from-transparent to-[#580D1A]" />
        </div>

        {/* Security Classification Badge */}
        <div className="mt-2 mb-4 inline-flex items-center gap-1.5 rounded-full border border-[#580D1A]/40 bg-[#580D1A]/15 px-3 py-0.5">
          <span className="h-1.5 w-1.5 rounded-full bg-[#ff3355] animate-ping" />
          <span className="h-1.5 w-1.5 rounded-full bg-[#ff3355] absolute" />
          <span className="text-[9px] font-mono font-medium tracking-[0.14em] text-[#f5ebeb] uppercase pl-1">
            CONTROL CENTER // LEVEL 0
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
