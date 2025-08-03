"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Database, Package, Plus, Users, Eye, Settings, TrendingUp, AlertTriangle, Home, LogOut } from "lucide-react"

const recentProducts = [
  {
    id: "ENQ-001",
    customerName: "John Smith",
    product: "Solar Panel Kit 400W",
    status: "New",
    lastUpdated: "2024-01-15",
    priority: "High"
  },
  {
    id: "ENQ-002", 
    customerName: "Sarah Johnson",
    product: "Wind Turbine Generator 1000W",
    status: "In Progress",
    lastUpdated: "2024-01-14",
    priority: "Medium"
  },
  {
    id: "ENQ-003",
    customerName: "Mike Wilson",
    product: "Battery Storage System 10kWh",
    status: "Responded",
    lastUpdated: "2024-01-13",
    priority: "Low"
  }
]

const quickStats = [
  {
    title: "Total Products",
    value: "24",
    change: "+3",
    icon: Package,
    color: "text-[#0a6650]"
  },
  {
    title: "Available Products",
    value: "18",
    change: "+2",
    icon: TrendingUp,
    color: "text-green-600"
  },
  {
    title: "Categories",
    value: "6",
    change: "+1",
    icon: Database,
    color: "text-blue-600"
  },
  {
    title: "Website Views",
    value: "1,247",
    change: "+12%",
    icon: Eye,
    color: "text-purple-600"
  }
]

const sidebarLinks = [
  { name: "Dashboard", href: "/admin", icon: Home },
  { name: "Products", href: "/admin/products", icon: Package },
  { name: "Enquiries", href: "/admin/enquiries", icon: Users },
  { name: "Website", href: "/admin/website", icon: Eye },
  { name: "Settings", href: "/admin/settings", icon: Settings },
]

export default function AdminDashboard() {
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
          <Button variant="outline" className="w-full justify-start">
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
                <p className="text-gray-600">Welcome back! Here's what's happening with your website.</p>
              </div>
              <div className="flex items-center space-x-4">
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
            {quickStats.map((stat, index) => (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                  <stat.icon className={`h-4 w-4 ${stat.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-green-600">
                    {stat.change} from last month
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Recent Products */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="h-5 w-5 mr-2" />
                  Recent Enquiries
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentProducts.map((enquiry) => (
                    <div key={enquiry.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <h4 className="font-medium">{enquiry.customerName}</h4>
                        <p className="text-sm text-gray-600">{enquiry.product}</p>
                        <p className="text-xs text-gray-500">{enquiry.priority} priority</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge 
                          variant={enquiry.status === "New" ? "default" : enquiry.status === "In Progress" ? "secondary" : "outline"}
                          className={enquiry.status === "New" ? "bg-red-100 text-red-800" : enquiry.status === "In Progress" ? "bg-yellow-100 text-yellow-800" : "bg-green-100 text-green-800"}
                        >
                          {enquiry.status}
                        </Badge>
                        <Link href={`/admin/enquiries/${enquiry.id}`}>
                          <Button variant="outline" size="sm">
                            View
                          </Button>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4">
                  <Link href="/admin/enquiries">
                    <Button variant="outline" className="w-full">
                      View All Enquiries
                    </Button>
                  </Link>
                </div>
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
                  <span className="text-sm">Storage: 2.3GB used</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
