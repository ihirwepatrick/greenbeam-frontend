"use client"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Database,
  Package,
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  Eye,
  MoreHorizontal,
  ArrowUpDown,
  Settings,
  Image as ImageIcon,
  CheckCircle,
  XCircle,
} from "lucide-react"

const products = [
  {
    id: "PROD-001",
    name: "Solar Panel Kit 400W",
    category: "Solar Panels",
    description: "High-efficiency solar panel kit perfect for residential installations.",
    status: "Available",
    images: 3,
    lastUpdated: "2024-01-15",
    features: ["400W output", "25-year warranty", "Easy installation"]
  },
  {
    id: "PROD-002",
    name: "Wind Turbine Generator 1000W",
    category: "Wind Energy",
    description: "Residential wind turbine generator designed for optimal energy production.",
    status: "Available",
    images: 2,
    lastUpdated: "2024-01-14",
    features: ["1000W output", "Low noise design", "Automatic braking"]
  },
  {
    id: "PROD-003",
    name: "Battery Storage System 10kWh",
    category: "Energy Storage",
    description: "Advanced lithium-ion battery storage system for storing excess solar energy.",
    status: "Not Available",
    images: 1,
    lastUpdated: "2024-01-13",
    features: ["10kWh capacity", "Smart monitoring", "10-year warranty"]
  },
  {
    id: "PROD-004",
    name: "Hybrid Inverter 5000W",
    category: "Inverters",
    description: "Hybrid inverter that can work with both solar panels and battery storage systems.",
    status: "Available",
    images: 3,
    lastUpdated: "2024-01-12",
    features: ["5000W output", "Hybrid capability", "Grid-tied"]
  },
  {
    id: "PROD-005",
    name: "Solar Panel Kit 600W",
    category: "Solar Panels",
    description: "Premium solar panel kit with higher efficiency and advanced monitoring capabilities.",
    status: "Not Available",
    images: 0,
    lastUpdated: "2024-01-11",
    features: ["600W output", "Premium efficiency", "Smart monitoring"]
  },
  {
    id: "PROD-006",
    name: "Monitoring System Pro",
    category: "Monitoring",
    description: "Professional monitoring system for tracking energy production and system performance.",
    status: "Available",
    images: 2,
    lastUpdated: "2024-01-10",
    features: ["Real-time monitoring", "Mobile app", "Performance alerts"]
  }
]

const categories = [
  "All Categories",
  "Solar Panels",
  "Wind Energy",
  "Energy Storage",
  "Inverters",
  "Monitoring",
  "Accessories"
]

export default function AdminProducts() {
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
            <h1 className="text-3xl font-bold text-gray-900">Product Management</h1>
            <p className="text-gray-600">Manage products to be displayed on the Greenbeam website</p>
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

        {/* Filters and Search */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search products by name, category, or description..."
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
                <Button variant="outline">
                  <ArrowUpDown className="h-4 w-4 mr-2" />
                  Sort
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Category Tabs */}
        <div className="flex space-x-2 mb-6 overflow-x-auto">
          {categories.map((category, index) => (
            <Button
              key={index}
              variant={index === 0 ? "default" : "outline"}
              size="sm"
              className="whitespace-nowrap"
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid gap-6">
          {products.map((product) => (
            <Card key={product.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="h-16 w-16 bg-gray-100 rounded-lg flex items-center justify-center">
                      <Package className="h-8 w-8 text-gray-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{product.name}</h3>
                      <p className="text-sm text-gray-600">ID: {product.id}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge variant="outline">{product.category}</Badge>
                        <Badge
                          variant={
                            product.status === "Available"
                              ? "default"
                              : "secondary"
                          }
                          className={product.status === "Available" ? "bg-green-100 text-green-800" : ""}
                        >
                          {product.status === "Available" ? (
                            <CheckCircle className="h-3 w-3 mr-1" />
                          ) : (
                            <XCircle className="h-3 w-3 mr-1" />
                          )}
                          {product.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <div className="flex items-center space-x-1 text-sm text-gray-600">
                        <ImageIcon className="h-4 w-4" />
                        <span>{product.images}/3 images</span>
                      </div>
                      <p className="text-xs text-gray-500">Updated: {product.lastUpdated}</p>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Link href={`/admin/products/${product.id}/edit`}>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Button variant="outline" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
                
                {/* Product Description */}
                <div className="mt-4">
                  <p className="text-gray-600 text-sm">{product.description}</p>
                </div>
                
                {/* Product Features */}
                <div className="mt-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Key Features:</h4>
                  <div className="flex flex-wrap gap-2">
                    {product.features.map((feature, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-8">
          <p className="text-sm text-gray-600">
            Showing 1-6 of 6 products
          </p>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm" disabled>
              Next
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-6 mt-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Products</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-muted-foreground">
                +3 from last month
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Available Products</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">18</div>
              <p className="text-xs text-muted-foreground">
                +2 from last month
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Not Available</CardTitle>
              <XCircle className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">6</div>
              <p className="text-xs text-muted-foreground">
                -1 from last month
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Categories</CardTitle>
              <Database className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">6</div>
              <p className="text-xs text-muted-foreground">
                +1 from last month
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
