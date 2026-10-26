/**
 * Indian Standards & Statutory Compliance Utilities for Beyond Humans Medusa Admin
 * Covers GST, State Codes, Legal Metrology, Logistics, and INR Formatting
 */

export interface IndianState {
  code: string // 2-digit GST state code
  name: string
  isUnionTerritory?: boolean
}

export const INDIAN_STATES: IndianState[] = [
  { code: "01", name: "Jammu and Kashmir", isUnionTerritory: true },
  { code: "02", name: "Himachal Pradesh" },
  { code: "03", name: "Punjab" },
  { code: "04", name: "Chandigarh", isUnionTerritory: true },
  { code: "05", name: "Uttarakhand" },
  { code: "06", name: "Haryana" },
  { code: "07", name: "Delhi", isUnionTerritory: true },
  { code: "08", name: "Rajasthan" },
  { code: "09", name: "Uttar Pradesh" },
  { code: "10", name: "Bihar" },
  { code: "11", name: "Sikkim" },
  { code: "12", name: "Arunachal Pradesh" },
  { code: "13", name: "Nagaland" },
  { code: "14", name: "Manipur" },
  { code: "15", name: "Mizoram" },
  { code: "16", name: "Tripura" },
  { code: "17", name: "Meghalaya" },
  { code: "18", name: "Assam" },
  { code: "19", name: "West Bengal" },
  { code: "20", name: "Jharkhand" },
  { code: "21", name: "Odisha" },
  { code: "22", name: "Chhattisgarh" },
  { code: "23", name: "Madhya Pradesh" },
  { code: "24", name: "Gujarat" },
  { code: "26", name: "Dadra and Nagar Haveli and Daman and Diu", isUnionTerritory: true },
  { code: "27", name: "Maharashtra" },
  { code: "29", name: "Karnataka" },
  { code: "30", name: "Goa" },
  { code: "31", name: "Lakshadweep", isUnionTerritory: true },
  { code: "32", name: "Kerala" },
  { code: "33", name: "Tamil Nadu" },
  { code: "34", name: "Puducherry", isUnionTerritory: true },
  { code: "35", name: "Andaman and Nicobar Islands", isUnionTerritory: true },
  { code: "36", name: "Telangana" },
  { code: "37", name: "Andhra Pradesh" },
  { code: "38", name: "Ladakh", isUnionTerritory: true },
]

export const SUPPLIER_ORIGIN = {
  name: "Beyond Humans Collective",
  state: "Chandigarh",
  stateCode: "04",
  gstin: "04AABCB1234F1Z8",
  city: "Chandigarh",
  pinCode: "160017",
  address: "Plot No. 182/40, Industrial Area Phase 1",
  pan: "AABCB1234F",
  phone: "+91 98765 43210",
  country: "India",
}

export function resolveGstState(query?: string): IndianState {
  if (!query) {
    return { code: "04", name: "Chandigarh", isUnionTerritory: true }
  }

  const clean = query.trim().toLowerCase()

  // Match by 2-digit code
  const byCode = INDIAN_STATES.find((s) => s.code === clean)
  if (byCode) return byCode

  // Match by state name
  const byName = INDIAN_STATES.find(
    (s) => s.name.toLowerCase() === clean || s.name.toLowerCase().includes(clean)
  )
  if (byName) return byName

  return { code: "04", name: query, isUnionTerritory: false }
}

export function formatINR(amount: number): string {
  if (isNaN(amount)) return "₹0.00"
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount)
}

export function formatIndianDate(dateInput: string | Date | undefined): string {
  if (!dateInput) return "—"
  const date = new Date(dateInput)
  if (isNaN(date.getTime())) return "—"
  return date.toLocaleDateString("en-IN", {
    timeZone: "Asia/Kolkata",
    day: "2-digit",
    month: "short",
    year: "numeric",
  })
}

export function formatIndianPhone(phone?: string): string {
  if (!phone) return "—"
  const digits = phone.replace(/\D/g, "")
  if (digits.length === 10) {
    return `+91 ${digits.slice(0, 5)} ${digits.slice(5)}`
  }
  if (digits.length === 12 && digits.startsWith("91")) {
    const main = digits.slice(2)
    return `+91 ${main.slice(0, 5)} ${main.slice(5)}`
  }
  return phone
}

export function isValidGstin(gstin?: string): boolean {
  if (!gstin) return false
  // 15 alphanumeric: 2 digits (state) + 10 chars (PAN) + 1 entity num + 1 'Z' + 1 checksum char
  const regex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/
  return regex.test(gstin.trim().toUpperCase())
}

export function isValidPan(pan?: string): boolean {
  if (!pan) return false
  const regex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/
  return regex.test(pan.trim().toUpperCase())
}

export function isValidPinCode(pin?: string): boolean {
  if (!pin) return false
  const regex = /^[1-9][0-9]{5}$/
  return regex.test(pin.trim())
}

export interface CourierPartner {
  id: string
  name: string
  trackingUrl: (awb: string) => string
  serviceType: string
  avgTransitDays: string
}

export const INDIAN_COURIERS: CourierPartner[] = [
  {
    id: "delhivery",
    name: "Delhivery Surface & Express",
    serviceType: "Domestic Surface & Air Express",
    avgTransitDays: "2-3 Days",
    trackingUrl: (awb: string) => `https://www.delhivery.com/track/package/${awb}`,
  },
  {
    id: "bluedart",
    name: "Blue Dart Apex (Air Express)",
    serviceType: "Priority Air Express Delivery",
    avgTransitDays: "1-2 Days",
    trackingUrl: (awb: string) => `https://www.bluedart.com/tracking?trackNumber=${awb}`,
  },
  {
    id: "shiprocket",
    name: "Shiprocket Unified Logistics",
    serviceType: "Multi-Carrier Smart Routing",
    avgTransitDays: "2-4 Days",
    trackingUrl: (awb: string) => `https://shiprocket.co/tracking/${awb}`,
  },
  {
    id: "dtdc",
    name: "DTDC Express Premium",
    serviceType: "Domestic Courier & Cargo",
    avgTransitDays: "2-3 Days",
    trackingUrl: (awb: string) => `https://www.dtdc.in/tracking/shipment-tracking.asp?trkid=${awb}`,
  },
  {
    id: "indiapost",
    name: "India Post (Speed Post)",
    serviceType: "National Postal Speed Network (19,000+ PINs)",
    avgTransitDays: "3-5 Days",
    trackingUrl: (_awb: string) => `https://www.indiapost.gov.in/_layouts/15/dpt.cept.tracking/trackconsignment.aspx`,
  },
  {
    id: "xpressbees",
    name: "Xpressbees Logistics",
    serviceType: "E-Commerce Express Delivery",
    avgTransitDays: "2-4 Days",
    trackingUrl: (awb: string) => `https://www.xpressbees.com/track?awb=${awb}`,
  },
]
