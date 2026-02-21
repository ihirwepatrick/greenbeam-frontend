"use client"

import { createContext, useContext, useState, useCallback, useEffect, ReactNode } from "react"
import type { CurrencyCode } from "../lib/utils"

const STORAGE_KEY = "greenbeam-currency"

interface CurrencyContextValue {
  currency: CurrencyCode
  setCurrency: (c: CurrencyCode) => void
}

const CurrencyContext = createContext<CurrencyContextValue | null>(null)

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrencyState] = useState<CurrencyCode>("RWF")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY) as CurrencyCode | null
      if (stored === "RWF" || stored === "USD") setCurrencyState(stored)
    } catch {
      // ignore
    }
    setMounted(true)
  }, [])

  const setCurrency = useCallback((c: CurrencyCode) => {
    setCurrencyState(c)
    try {
      localStorage.setItem(STORAGE_KEY, c)
    } catch {
      // ignore
    }
  }, [])

  return (
    <CurrencyContext.Provider value={{ currency: mounted ? currency : "RWF", setCurrency }}>
      {children}
    </CurrencyContext.Provider>
  )
}

export function useCurrency() {
  const ctx = useContext(CurrencyContext)
  return ctx ?? { currency: "RWF" as CurrencyCode, setCurrency: () => {} }
}
