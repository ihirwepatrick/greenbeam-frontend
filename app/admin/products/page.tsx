"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
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
  Home,
  LogOut,
  Grid3X3,
  List,
  X,
  Save,
  AlertTriangle,
  Users,
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

const sidebarLinks = [
  { name: "Dashboard", href: "/admin", icon: Home },
  { name: "Products", href: "/admin/products", icon: Package },
  { name: "Enquiries", href: "/admin/enquiries", icon: Users },
  { name: "Website", href: "/admin/website", icon: Eye },
  { name: "Settings", href: "/admin/settings", icon: Settings },
]

export default function AdminProducts() {
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid")
  const [selectedProduct, setSelectedProduct] = useState<any>(null)
  const [showDetailsModal, setShowDetailsModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [editForm, setEditForm] = useState<any>({})

  const handleViewDetails = (product: any) => {
    setSelectedProduct(product)
    setShowDetailsModal(true)
  }

  const handleEdit = (product: any) => {
    setEditForm(product)
    setShowEditModal(true)
  }

  const handleDelete = (product: any) => {
    setSelectedProduct(product)
    setShowDeleteModal(true)
  }

  const closeModal = () => {
    setShowDetailsModal(false)
    setShowEditModal(false)
    setShowDeleteModal(false)
    setSelectedProduct(null)
    setEditForm({})
  }

  const saveEdit = () => {
    // Here you would typically save to database
    console.log("Saving product:", editForm)
    closeModal()
  }

  const confirmDelete = () => {
    // Here you would typically delete from database
    console.log("Deleting product:", selectedProduct)
    closeModal()
  }

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
                    link.href === "/admin/products" 
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
                <h1 className="text-2xl font-bold text-gray-900">Product Management</h1>
                <p className="text-gray-600">Manage products to be displayed on the Greenbeam website</p>
              </div>
              <div className="flex items-center space-x-4">
                <Link href="/admin/products/new">
                  <Button className="bg-[#0a6650] hover:bg-[#084c3d]">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Product
                  </Button>
                </Link>
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
                  <div className="flex border rounded-lg">
                    <Button
                      variant={viewMode === "grid" ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setViewMode("grid")}
                      className="rounded-r-none"
                    >
                      <Grid3X3 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant={viewMode === "table" ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setViewMode("table")}
                      className="rounded-l-none"
                    >
                      <List className="h-4 w-4" />
                    </Button>
                  </div>
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

          {/* Products Display */}
          {viewMode === "grid" ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <Card key={product.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="p-0">
                    <div className="h-48 bg-gray-100 rounded-t-lg flex items-center justify-center">
                      <Package className="h-16 w-16 text-gray-400" />
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-lg">{product.name}</h3>
                    </div>
                    
                    <div className="flex items-center space-x-2 mb-3">
                      <Badge variant="outline">{product.category}</Badge>
                      <Badge
                        variant={product.status === "Available" ? "default" : "secondary"}
                        className={product.status === "Available" ? "bg-green-100 text-green-800" : ""}
                      >
                        {product.status}
                      </Badge>
                    </div>
                    
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
                    
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <span>{product.images}/3 images</span>
                      <span>Updated: {product.lastUpdated}</span>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1"
                        onClick={() => handleViewDetails(product)}
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleEdit(product)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleDelete(product)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
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
                              variant={product.status === "Available" ? "default" : "secondary"}
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
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleViewDetails(product)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleEdit(product)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleDelete(product)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <p className="text-gray-600 text-sm">{product.description}</p>
                    </div>
                    
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
          )}

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
        </div>
      </div>

      {/* Product Details Modal */}
      {showDetailsModal && selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{selectedProduct.name}</h2>
                  <p className="text-gray-600">{selectedProduct.category}</p>
                </div>
                <Button variant="ghost" size="sm" onClick={closeModal}>
                  <X className="h-6 w-6" />
                </Button>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center mb-4">
                    <Package className="h-16 w-16 text-gray-400" />
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="font-semibold mb-3">Key Features:</h4>
                    <ul className="space-y-2">
                      {selectedProduct.features.map((feature: string, index: number) => (
                        <li key={index} className="flex items-center text-sm text-gray-600">
                          <div className="h-2 w-2 bg-[#0a6650] rounded-full mr-3"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div>
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-3">Product Description</h3>
                    <p className="text-gray-600">{selectedProduct.description}</p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium">Status:</span>
                      <Badge
                        variant={selectedProduct.status === "Available" ? "default" : "secondary"}
                        className={selectedProduct.status === "Available" ? "bg-green-100 text-green-800" : ""}
                      >
                        {selectedProduct.status}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium">Images:</span>
                      <span>{selectedProduct.images}/3</span>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium">Last Updated:</span>
                      <span>{selectedProduct.lastUpdated}</span>
                    </div>
                  </div>

                  <div className="mt-6 flex gap-3">
                    <Button 
                      className="flex-1 bg-[#0a6650] hover:bg-[#084c3d]"
                      onClick={() => {
                        closeModal()
                        handleEdit(selectedProduct)
                      }}
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Product
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={() => {
                        closeModal()
                        handleDelete(selectedProduct)
                      }}
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Product Modal */}
      {showEditModal && editForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Edit Product</h2>
                  <p className="text-gray-600">Update product information</p>
                </div>
                <Button variant="ghost" size="sm" onClick={closeModal}>
                  <X className="h-6 w-6" />
                </Button>
              </div>

              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Product Name</Label>
                    <Input
                      id="name"
                      value={editForm.name || ""}
                      onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <select
                      id="category"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      value={editForm.category || ""}
                      onChange={(e) => setEditForm({...editForm, category: e.target.value})}
                    >
                      <option value="">Select Category</option>
                      <option value="Solar Panels">Solar Panels</option>
                      <option value="Wind Energy">Wind Energy</option>
                      <option value="Energy Storage">Energy Storage</option>
                      <option value="Inverters">Inverters</option>
                      <option value="Monitoring">Monitoring</option>
                      <option value="Accessories">Accessories</option>
                    </select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    rows={4}
                    value={editForm.description || ""}
                    onChange={(e) => setEditForm({...editForm, description: e.target.value})}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="status">Status</Label>
                    <select
                      id="status"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      value={editForm.status || ""}
                      onChange={(e) => setEditForm({...editForm, status: e.target.value})}
                    >
                      <option value="Available">Available</option>
                      <option value="Not Available">Not Available</option>
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="images">Images (0-3)</Label>
                    <Input
                      id="images"
                      type="number"
                      min="0"
                      max="3"
                      value={editForm.images || 0}
                      onChange={(e) => setEditForm({...editForm, images: parseInt(e.target.value)})}
                    />
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button 
                    type="button"
                    className="flex-1 bg-[#0a6650] hover:bg-[#084c3d]"
                    onClick={saveEdit}
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                  <Button 
                    type="button"
                    variant="outline"
                    onClick={closeModal}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center mb-4">
                <AlertTriangle className="h-6 w-6 text-red-600 mr-3" />
                <h2 className="text-xl font-bold text-gray-900">Delete Product</h2>
              </div>
              
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete <strong>{selectedProduct.name}</strong>? This action cannot be undone.
              </p>

              <div className="flex gap-3">
                <Button 
                  variant="destructive"
                  className="flex-1"
                  onClick={confirmDelete}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </Button>
                <Button 
                  variant="outline"
                  className="flex-1"
                  onClick={closeModal}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
