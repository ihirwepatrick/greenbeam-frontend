import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export type CurrencyCode = "RWF" | "USD"

/** Format amount as RWF or USD. Default RWF. Used for product prices, cart, checkout. */
export function formatPrice(amount: string | number, currency: CurrencyCode = "RWF"): string {
  const num = typeof amount === "string" ? parseFloat(amount) : Number(amount)
  if (Number.isNaN(num)) return currency === "USD" ? "$0.00" : "RWF 0"
  if (currency === "USD") {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(num)
  }
  return new Intl.NumberFormat("en-RW", {
    style: "currency",
    currency: "RWF",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(num)
}
