"use client"

import { ReactNode, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { useAuth } from "../contexts/AuthContext"
import AdminLoginForm from "./AdminLoginForm"

interface AdminGuardProps {
	children: ReactNode
}

export default function AdminGuard({ children }: AdminGuardProps) {
	const { user, isAuthenticated, isLoading } = useAuth()
	const router = useRouter()
	const pathname = usePathname()

	useEffect(() => {
		if (isLoading) return
		// If logged in but not admin, send to homepage
		if (isAuthenticated && user && user.role !== "admin") {
			router.replace("/")
		}
	}, [isAuthenticated, isLoading, user, router])

	if (isLoading) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
			</div>
		)
	}

	if (!isAuthenticated) {
		return <AdminLoginForm />
	}

	if (user && user.role !== "admin") {
		return null
	}

	return <>{children}</>
} 