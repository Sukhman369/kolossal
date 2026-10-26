import { defineWidgetConfig } from "@medusajs/admin-sdk"

/**
 * Beyond Humans Footer & Architectural Certification
 * Injected into zone: "login.after"
 */
const LoginFooter = () => {
  return (
    <div className="mt-4 flex w-full flex-col items-center justify-center gap-2.5 border-t border-neutral-200/80 pt-4 text-center">
      {/* Return to Storefront Link */}
      <a
        href="http://localhost:3000"
        target="_blank"
        rel="noopener noreferrer"
        className="group inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-[0.16em] text-neutral-600 transition-all duration-300 hover:text-[#580D1A] hover:tracking-[0.20em]"
      >
        <span>← Storefront Archive</span>
        <span className="text-[#580D1A] transition-transform duration-300 group-hover:translate-x-0.5">
          ↗
        </span>
      </a>

      {/* Atelier Origin & Discipline */}
      <div className="flex flex-col items-center gap-0.5">
        <span className="text-[9px] font-mono tracking-[0.14em] text-neutral-500 uppercase">
          CHANDIGARH // 500 GSM ORGANIC COTTON
        </span>
        <span className="text-[8px] font-mono tracking-[0.1em] text-neutral-400 uppercase">
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
