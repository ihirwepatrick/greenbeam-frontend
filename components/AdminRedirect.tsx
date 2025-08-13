"use client"

import { useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { useAuth } from "../contexts/AuthContext"

export default function AdminRedirect() {
  const { user, isAuthenticated, isLoading } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // Don't redirect while loading
    if (isLoading) {
      console.log("AdminRedirect: Still loading auth state...")
      return
    }

    // Don't redirect if already on admin pages
    if (pathname.startsWith('/admin')) {
      console.log("AdminRedirect: Already on admin page, skipping redirect")
      return
    }

    // Only redirect if user is authenticated, is admin, and is on a public page
    if (isAuthenticated && user && user.role === "admin") {
      console.log("AdminRedirect: Admin user detected on public page:", pathname, "redirecting to dashboard...")
      router.replace("/admin")
    } else if (isAuthenticated && user) {
      console.log("AdminRedirect: Non-admin user detected:", user.role, "staying on public page")
    } else {
      console.log("AdminRedirect: No authenticated user, staying on public page")
    }
  }, [isAuthenticated, user, isLoading, pathname, router])

  return null
} 