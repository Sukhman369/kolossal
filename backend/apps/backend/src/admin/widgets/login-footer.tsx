import { defineWidgetConfig } from "@medusajs/admin-sdk"

/**
 * Beyond Humans Footer & Architectural Certification
 * Injected into zone: "login.after"
 */
const LoginFooter = () => {
  return (
    <div className="mt-4 flex w-full flex-col items-center justify-center gap-3 border-t border-white/5 pt-4 text-center">
      {/* Return to Storefront Link */}
      <a
        href="http://localhost:3000"
        target="_blank"
        rel="noopener noreferrer"
        className="group inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-[0.16em] text-[#a8a49d] transition-all duration-300 hover:text-[#f5ebeb] hover:tracking-[0.20em]"
      >
        <span>← Storefront Archive</span>
        <span className="text-[#580D1A] transition-transform duration-300 group-hover:translate-x-0.5">
          ↗
        </span>
      </a>

      {/* Atelier Origin & Discipline */}
      <div className="flex flex-col items-center gap-0.5">
        <span className="text-[9px] font-mono tracking-[0.14em] text-[#6b6762] uppercase">
          CHANDIGARH // 500 GSM ORGANIC COTTON
        </span>
        <span className="text-[8px] font-mono tracking-[0.1em] text-[#524e49] uppercase">
          © {new Date().getFullYear()} BEYOND HUMANS COLLECTIVE · ZERO COMPROMISE
        </span>
      </div>
    </div>
  )
}

export const config = defineWidgetConfig({
  zone: "login.after",
})

export default LoginFooter
