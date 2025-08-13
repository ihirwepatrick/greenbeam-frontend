"use client"

import { useAuth } from "../contexts/AuthContext"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

export default function AuthDebug() {
  const { user, isAuthenticated, isLoading, refreshUser } = useAuth()
  const pathname = usePathname()
  const [hasToken, setHasToken] = useState<boolean | null>(null)

  // Check for token on client side only
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setHasToken(!!localStorage.getItem('auth_token'))
    }
  }, [user, isAuthenticated])

  // Only show in development
  if (process.env.NODE_ENV !== 'development') {
    return null
  }

  const handleRefreshUser = async () => {
    console.log("AuthDebug: Manually refreshing user...")
    try {
      await refreshUser()
      console.log("AuthDebug: User refresh complete")
    } catch (error) {
      console.error("AuthDebug: User refresh failed:", error)
    }
  }

  return (
    <div className="fixed top-4 right-4 bg-black bg-opacity-90 text-white p-4 rounded-lg text-xs z-50 max-w-sm">
      <h4 className="font-bold mb-2">Auth Debug</h4>
      <div className="space-y-1 mb-3">
        <div>Path: {pathname}</div>
        <div>Loading: {isLoading.toString()}</div>
        <div>Authenticated: {isAuthenticated.toString()}</div>
        <div>User: {user?.name || 'None'}</div>
        <div>Role: {user?.role || 'None'}</div>
        <div>Role Type: {typeof user?.role}</div>
        <div>Email: {user?.email || 'None'}</div>
        <div>Token: {hasToken === null ? 'Checking...' : hasToken ? 'Yes' : 'No'}</div>
      </div>
      <Button 
        onClick={handleRefreshUser} 
        size="sm" 
        className="w-full text-xs"
        disabled={isLoading}
      >
        Refresh User
      </Button>
    </div>
  )
} 