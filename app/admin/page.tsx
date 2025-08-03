"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Database, Package, Plus, Users, Eye, Settings, TrendingUp, AlertTriangle } from "lucide-react"

const recentProducts = [
  {
    id: "PROD-001",
    name: "Solar Panel Kit 400W",
    category: "Solar Panels",
    status: "Available",
    lastUpdated: "2024-01-15",
    images: 3
  },
  {
    id: "PROD-002", 
    name: "Wind Turbine Generator 1000W",
    category: "Wind Energy",
    status: "Available",
    lastUpdated: "2024-01-14",
    images: 2
  },
  {
    id: "PROD-003",
    name: "Battery Storage System 10kWh",
    category: "Energy Storage",
    status: "Not Available",
    lastUpdated: "2024-01-13",
    images: 1
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

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Portal Navigation */}
      <nav className="bg-white border-b shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link href="/admin" className="flex items-center space-x-2">
                <Database className="h-8 w-8 text-[#0a6650]" />
                <span className="text-2xl font-bold text-[#0a6650]">Admin Portal</span>
                <Badge variant="secondary" className="ml-2">v2.1</Badge>
              </Link>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <Link href="/admin/products" className="text-[#0a6650] font-medium">
                Products
              </Link>
              <Link href="/admin/website" className="text-gray-700 hover:text-[#0a6650]">
                Website
              </Link>
              <Link href="/admin/settings" className="text-gray-700 hover:text-[#0a6650]">
                Settings
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="outline" size="sm">
                  <Eye className="h-4 w-4 mr-2" />
                  View Website
                </Button>
              </Link>
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
              <Button size="sm" className="bg-[#0a6650] hover:bg-[#084c3d]">
                Admin
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600">Manage products and content for the Greenbeam website</p>
          </div>
          <div className="flex gap-4">
            <Link href="/admin/products/new">
              <Button className="bg-[#0a6650] hover:bg-[#084c3d]">
                <Plus className="h-4 w-4 mr-2" />
                Add Product
              </Button>
            </Link>
          </div>
        </div>

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
                <Package className="h-5 w-5 mr-2" />
                Recent Products
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentProducts.map((product) => (
                  <div key={product.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <h4 className="font-medium">{product.name}</h4>
                      <p className="text-sm text-gray-600">{product.category}</p>
                      <p className="text-xs text-gray-500">{product.images} images</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge 
                        variant={product.status === "Available" ? "default" : "secondary"}
                        className={product.status === "Available" ? "bg-green-100 text-green-800" : ""}
                      >
                        {product.status}
                      </Badge>
                      <Link href={`/admin/products/${product.id}`}>
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <Link href="/admin/products">
                  <Button variant="outline" className="w-full">
                    View All Products
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
              <div className="space-y-4">
                <Link href="/admin/products/new">
                  <Button className="w-full justify-start bg-[#0a6650] hover:bg-[#084c3d]">
                    <Plus className="h-4 w-4 mr-2" />
                    Add New Product
                  </Button>
                </Link>
                <Link href="/admin/products">
                  <Button variant="outline" className="w-full justify-start">
                    <Package className="h-4 w-4 mr-2" />
                    Manage Products
                  </Button>
                </Link>
                <Link href="/admin/website">
                  <Button variant="outline" className="w-full justify-start">
                    <Eye className="h-4 w-4 mr-2" />
                    Website Settings
                  </Button>
                </Link>
                <Link href="/">
                  <Button variant="outline" className="w-full justify-start">
                    <Eye className="h-4 w-4 mr-2" />
                    Preview Website
                  </Button>
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
  )
}
