"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Database, Package, Plus, Users, Eye, Settings, TrendingUp, AlertTriangle, Home, LogOut, Bell } from "lucide-react"
import NotificationSystem from "../components/NotificationSystem"
import { useAuth } from "../../contexts/AuthContext"
import { useDashboardStats, useEnquiries } from "../../hooks/use-api"
import { notificationService } from "../../lib/services/api"

const sidebarLinks = [
	{ name: "Dashboard", href: "/admin", icon: Home },
	{ name: "Products", href: "/admin/products", icon: Package },
	{ name: "Enquiries", href: "/admin/enquiries", icon: Users },
	// { name: "Orders", href: "/admin/orders", icon: Package },
	{ name: "Website", href: "/admin/website", icon: Eye },
	{ name: "Settings", href: "/admin/settings", icon: Settings },
]

export default function AdminDashboard() {
	const [showNotifications, setShowNotifications] = useState(false)
	const [unreadNotifications, setUnreadNotifications] = useState<number>(0)
	const { logout, user } = useAuth()

	const { data: statsResponse, loading: statsLoading } = useDashboardStats()
	const { data: enquiriesResponse, loading: enquiriesLoading } = useEnquiries({ limit: 5 })

	// Normalize stats for cards
	const cards = {
		totalEnquiries: statsResponse?.enquiries?.total ?? 0,
		pendingEnquiries: statsResponse?.enquiries?.new ?? 0,
		totalProducts: statsResponse?.products?.total ?? 0,
		totalUsers: 0,
	}

	const recentEnquiries = enquiriesResponse?.data || []

	useEffect(() => {
		let mounted = true
		notificationService.getNotificationStats()
			.then((res) => {
				if (mounted && res.success) setUnreadNotifications(res.data.unread)
			})
			.catch(() => {})
		return () => { mounted = false }
	}, [])

	return (
		<div className="min-h-screen bg-gray-50 flex">
			{/* Sidebar - Fixed */}
			<div className="w-64 bg-white border-r shadow-sm flex flex-col h-screen">
				<div className="p-6">
					<Link href="/admin" className="flex items-center space-x-2">
						<Database className="h-8 w-8 text-[#0a6650]" />
						<span className="text-xl font-bold text-[#0a6650]">Admin Portal</span>
						<Badge variant="secondary" className="ml-2">v2.1</Badge>
					</Link>
				</div>
				
				<nav className="flex-1 px-4">
					<div className="space-y-2">
						{sidebarLinks.map((link) => {
							const Icon = link.icon
							return (
								<Link
									key={link.name}
									href={link.href}
									className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
										link.href === "/admin" 
											? "bg-[#0a6650] text-white" 
											: "text-gray-700 hover:bg-gray-100 hover:text-[#0a6650]"
									}`}
								>
									<Icon className="h-5 w-5" />
									<span>{link.name}</span>
								</Link>
							)
						})}
					</div>
				</nav>

				<div className="p-4 border-t">
					<Link href="/">
						<Button variant="outline" className="w-full justify-start mb-2">
							<Eye className="h-4 w-4 mr-2" />
							View Website
						</Button>
					</Link>
					<Button variant="outline" className="w-full justify-start" onClick={() => logout()}>
						<LogOut className="h-4 w-4 mr-2" />
						Logout
					</Button>
				</div>
			</div>

			{/* Main Content - Scrollable */}
			<div className="flex-1 flex flex-col h-screen">
				{/* Top Navigation - Fixed */}
				<nav className="bg-white border-b shadow-sm">
					<div className="px-8 py-4">
						<div className="flex justify-between items-center">
							<div>
								<h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
								<p className="text-gray-600">Welcome {user?.name ? `back, ${user.name}` : "back"}! Here's what's happening.</p>
							</div>
							<div className="flex items-center space-x-4">
								<Button
									variant="outline"
									size="sm"
									onClick={() => setShowNotifications(true)}
									className="relative"
								>
									<Bell className="h-4 w-4 mr-2" />
									Notifications
									{unreadNotifications > 0 && (
										<Badge className="absolute -top-2 -right-2 h-5 w-5 bg-red-500 text-white text-xs">
											{unreadNotifications}
										</Badge>
									)}
								</Button>
								<Link href="/admin/settings">
									<Button variant="outline" size="sm">
										<Settings className="h-4 w-4 mr-2" />
										Settings
									</Button>
								</Link>
								<Button size="sm" className="bg-[#0a6650] hover:bg-[#084c3d]">
									Admin
								</Button>
							</div>
						</div>
					</div>
				</nav>

				<div className="flex-1 overflow-y-auto p-8">
					{/* Quick Stats */}
					<div className="grid md:grid-cols-4 gap-6 mb-8">
						<Card>
							<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
								<CardTitle className="text-sm font-medium">Total Enquiries</CardTitle>
								<Users className="h-4 w-4 text-[#0a6650]" />
							</CardHeader>
							<CardContent>
								<div className="text-2xl font-bold">{cards.totalEnquiries}</div>
								<p className="text-xs text-green-600">Live</p>
							</CardContent>
						</Card>
						<Card>
							<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
								<CardTitle className="text-sm font-medium">Pending Enquiries</CardTitle>
								<TrendingUp className="h-4 w-4 text-green-600" />
							</CardHeader>
							<CardContent>
								<div className="text-2xl font-bold">{cards.pendingEnquiries}</div>
								<p className="text-xs text-green-600">Live</p>
							</CardContent>
						</Card>
						<Card>
							<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
								<CardTitle className="text-sm font-medium">Total Products</CardTitle>
								<Package className="h-4 w-4 text-blue-600" />
							</CardHeader>
							<CardContent>
								<div className="text-2xl font-bold">{cards.totalProducts}</div>
								<p className="text-xs text-green-600">Live</p>
							</CardContent>
						</Card>
						<Card>
							<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
								<CardTitle className="text-sm font-medium">Total Users</CardTitle>
								<Database className="h-4 w-4 text-purple-600" />
							</CardHeader>
							<CardContent>
								<div className="text-2xl font-bold">{cards.totalUsers}</div>
								<p className="text-xs text-green-600">Live</p>
							</CardContent>
						</Card>
					</div>

					<div className="grid lg:grid-cols-2 gap-8">
						{/* Recent Enquiries */}
						<Card>
							<CardHeader>
								<CardTitle className="flex items-center">
									<Users className="h-5 w-5 mr-2" />
									Recent Enquiries
								</CardTitle>
							</CardHeader>
							<CardContent>
								{enquiriesLoading ? (
									<div className="flex justify-center py-6">
										<div className="animate-spin rounded-full h-6 w-6 border-b-2 border-green-600"></div>
									</div>
								) : (
									<>
										<div className="space-y-4">
											{recentEnquiries.map((enquiry: any) => (
												<div key={enquiry.id} className="flex items-center justify-between p-3 border rounded-lg">
													<div>
														<h4 className="font-medium">{enquiry.name}</h4>
														<p className="text-sm text-gray-600">{enquiry.email}</p>
														<p className="text-xs text-gray-500">{enquiry.subject}</p>
													</div>
													<div className="flex items-center space-x-2">
														<Badge className="bg-green-100 text-green-800">{enquiry.status || "pending"}</Badge>
														<Link href={`/admin/enquiries`}>
															<Button variant="outline" size="sm">View</Button>
														</Link>
													</div>
												</div>
											))}
										</div>
										<div className="mt-4">
											<Link href="/admin/enquiries">
												<Button variant="outline" className="w-full">View All Enquiries</Button>
											</Link>
										</div>
									</>
								)}
							</CardContent>
						</Card>

						{/* Quick Actions */}
						<Card>
							<CardHeader>
								<CardTitle>Quick Actions</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="grid grid-cols-2 gap-3">
									<Link href="/admin/products/new">
										<div className="p-6 rounded-lg border bg-gradient-to-br from-[#0a6650] to-[#084c3d] text-white hover:shadow-md transition-all duration-200 hover:scale-105 h-24 flex items-center justify-center">
											<div className="flex flex-col items-center text-center space-y-2">
												<Plus className="h-6 w-6" />
												<span className="text-sm font-medium">Add Product</span>
											</div>
										</div>
									</Link>
									<Link href="/admin/products">
										<div className="p-6 rounded-lg border bg-white hover:shadow-md transition-all duration-200 hover:scale-105 h-24 flex items-center justify-center">
											<div className="flex flex-col items-center text-center space-y-2">
												<Package className="h-6 w-6 text-[#0a6650]" />
												<span className="text-sm font-medium text-[#0a6650]">Manage Products</span>
											</div>
										</div>
									</Link>
									<Link href="/admin/enquiries">
										<div className="p-6 rounded-lg border bg-white hover:shadow-md transition-all duration-200 hover:scale-105 h-24 flex items-center justify-center">
											<div className="flex flex-col items-center text-center space-y-2">
												<Users className="h-6 w-6 text-blue-600" />
												<span className="text-sm font-medium text-blue-600">View Enquiries</span>
											</div>
										</div>
									</Link>
									<Link href="/admin/website">
										<div className="p-6 rounded-lg border bg-white hover:shadow-md transition-all duration-200 hover:scale-105 h-24 flex items-center justify-center">
											<div className="flex flex-col items-center text-center space-y-2">
												<Eye className="h-6 w-6 text-purple-600" />
												<span className="text-sm font-medium text-purple-600">Website Settings</span>
											</div>
										</div>
									</Link>
								</div>
							</CardContent>
						</Card>
					</div>

					{/* System Status */}
					<Card className="mt-8">
						<CardHeader>
							<CardTitle className="flex items-center">
								<AlertTriangle className="h-5 w-5 mr-2 text-yellow-600" />
								System Status
							</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="grid md:grid-cols-3 gap-4">
								<div className="flex items-center space-x-2">
									<div className="h-2 w-2 bg-green-500 rounded-full"></div>
									<span className="text-sm">Website: Online</span>
								</div>
								<div className="flex items-center space-x-2">
									<div className="h-2 w-2 bg-green-500 rounded-full"></div>
									<span className="text-sm">Database: Connected</span>
								</div>
								<div className="flex items-center space-x-2">
									<div className="h-2 w-2 bg-green-500 rounded-full"></div>
									<span className="text-sm">Storage: Healthy</span>
								</div>
							</div>
						</CardContent>
					</Card>
				</div>

				{/* Notification System */}
				<NotificationSystem 
					isOpen={showNotifications} 
					onClose={() => setShowNotifications(false)} 
				/>
			</div>
		</div>
	)
}
