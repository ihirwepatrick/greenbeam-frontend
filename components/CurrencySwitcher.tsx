"use client"

import { useCurrency } from "../contexts/CurrencyContext"
import { Button } from "@/components/ui/button"
export default function CurrencySwitcher() {
  const { currency, setCurrency } = useCurrency()

  return (
    <div className="flex items-center border border-gray-200 rounded-md overflow-hidden bg-white">
      <Button
        type="button"
        variant={currency === "RWF" ? "default" : "ghost"}
        size="sm"
        className="rounded-none h-8 px-2 text-xs font-medium"
        onClick={() => setCurrency("RWF")}
      >
        RWF
      </Button>
      <Button
        type="button"
        variant={currency === "USD" ? "default" : "ghost"}
        size="sm"
        className="rounded-none h-8 px-2 text-xs font-medium"
        onClick={() => setCurrency("USD")}
      >
        USD
      </Button>
    </div>
  )
}
