import { useEffect } from "react"
import { defineWidgetConfig } from "@medusajs/admin-sdk"

/**
 * Beyond Humans Luxury Streetwear Admin Login Customization
 * Injected into zone: "login.before"
 */
const LoginBranding = () => {
  useEffect(() => {
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
            radial-gradient(circle at 50% 45%, rgba(88, 13, 26, 0.32) 0%, rgba(14, 14, 18, 0.92) 52%, #050507 100%),
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

        /* Hide default Medusa AvatarBox and default text header to replace with Beyond Humans Luxury Header */
        body:has(#bh-admin-login-root) .m-4 > [class*="bg-ui-button-neutral"],
        body:has(#bh-admin-login-root) .m-4 > [class*="shadow-buttons-neutral"],
        body:has(#bh-admin-login-root) .m-4 > svg[viewBox="0 0 400 400"],
        body:has(#bh-admin-login-root) .m-4 > div.mb-4 {
          display: none !important;
        }

        /* Central Architectural Slate Card */
        body:has(#bh-admin-login-root) .m-4.flex.w-full {
          max-width: 390px !important;
          background: rgba(13, 13, 17, 0.88) !important;
          backdrop-filter: blur(28px) saturate(180%) !important;
          -webkit-backdrop-filter: blur(28px) saturate(180%) !important;
          border: 1px solid rgba(88, 13, 26, 0.45) !important;
          border-top: 1px solid rgba(255, 255, 255, 0.22) !important;
          border-radius: 14px !important;
          padding: 32px 28px 28px 28px !important;
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

    return () => {
      // Keep or clean up if navigated away
    }
  }, [])

  return (
    <div id="bh-admin-login-root" className="w-full mb-2">
      {/* =========================================================================
          BEYOND HUMANS SCULPTED EMBLEM & METALLIC CREST
         ========================================================================= */}
      <div className="flex flex-col items-center justify-center text-center">
        {/* Emblem Hexagon with Sculpted B Monogram & Burgundy Neon Rim */}
        <div className="relative mb-5 flex items-center justify-center">
          {/* Subtle Burgundy Aura / Rim Glow */}
          <div className="absolute inset-0 rounded-2xl bg-[#580D1A] opacity-45 blur-xl -z-10 animate-pulse" />

          {/* Architectural Emblem Frame */}
          <div className="relative h-16 w-16 rounded-2xl bg-gradient-to-b from-[#222228] to-[#0d0d11] p-[1.5px] shadow-[0_8px_24px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.25)] border border-[#580D1A]/50">
            <div className="flex h-full w-full items-center justify-center rounded-[14px] bg-gradient-to-b from-[#16161c] via-[#0d0d12] to-[#08080b]">
              {/* Precision Sculpted Monogram SVG */}
              <svg
                viewBox="0 0 100 100"
                className="h-10 w-10 text-[#faf9f7] drop-shadow-[0_2px_8px_rgba(88,13,26,0.8)]"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient id="bh-chrome-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ffffff" />
                    <stop offset="45%" stopColor="#ded9d0" />
                    <stop offset="55%" stopColor="#7a7873" />
                    <stop offset="100%" stopColor="#ffffff" />
                  </linearGradient>
                  <linearGradient id="bh-burgundy-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#a32238" />
                    <stop offset="100%" stopColor="#580D1A" />
                  </linearGradient>
                </defs>

                {/* Outer Architectural Ring */}
                <circle
                  cx="50"
                  cy="50"
                  r="44"
                  stroke="url(#bh-burgundy-grad)"
                  strokeWidth="2"
                  strokeDasharray="4 2"
                  opacity="0.8"
                />

                {/* Corner Cadence Crosshairs */}
                <line x1="50" y1="2" x2="50" y2="8" stroke="#a32238" strokeWidth="1.5" />
                <line x1="50" y1="92" x2="50" y2="98" stroke="#a32238" strokeWidth="1.5" />
                <line x1="2" y1="50" x2="8" y2="50" stroke="#a32238" strokeWidth="1.5" />
                <line x1="92" y1="50" x2="98" y2="50" stroke="#a32238" strokeWidth="1.5" />

                {/* Sculpted Beyond Humans "B" Monogram */}
                <path
                  d="M32 24 H56 C66 24 72 29 72 37 C72 43 68 47 62 49 C70 51 75 56 75 64 C75 73 67 78 56 78 H32 V24 Z M42 33 V46 H54 C59 46 63 43 63 39 C63 35 59 33 54 33 H42 Z M42 55 V69 H56 C61 69 65 66 65 62 C65 58 61 55 56 55 H42 Z"
                  fill="url(#bh-chrome-grad)"
                  stroke="rgba(88,13,26,0.6)"
                  strokeWidth="0.8"
                />

                {/* Burgundy Core Emblem Inset */}
                <rect x="26" y="24" width="2.5" height="54" fill="#a32238" rx="1" />
              </svg>
            </div>
          </div>
        </div>

        {/* Brand Name with Architectural Tracking */}
        <h1 className="text-lg font-black uppercase tracking-[0.24em] text-[#faf9f7] pl-[0.24em] drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
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
        <div className="mt-2.5 mb-5 inline-flex items-center gap-1.5 rounded-full border border-[#580D1A]/40 bg-[#580D1A]/15 px-3 py-1">
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
