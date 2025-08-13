"use client"

import { ReactNode } from "react"
import AdminGuard from "../../components/AdminGuard"

export default function AdminLayout({ children }: { children: ReactNode }) {
	return <AdminGuard>{children}</AdminGuard>
} 