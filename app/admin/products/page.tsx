"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Database,
  Package,
  Users,
  Eye,
  Settings,
  Home,
  LogOut,
  Search,
  Filter,
  Plus,
  Edit,
  Trash2,
  Star,
  Calendar,
  Tag,
  Bell,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import NotificationSystem from "../../components/NotificationSystem"
import { useAuth } from "../../../contexts/AuthContext"
import { useProducts } from "../../../hooks/use-api"
import { productService } from "../../../lib/services/api"
import { Product } from "../../../lib/types/api"

const sidebarLinks = [
  { name: "Dashboard", href: "/admin", icon: Home },
  { name: "Products", href: "/admin/products", icon: Package },
  { name: "Enquiries", href: "/admin/enquiries", icon: Users },
  { name: "Website", href: "/admin/website", icon: Eye },
  { name: "Settings", href: "/admin/settings", icon: Settings },
]

export default function AdminProducts() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [showDetailsModal, setShowDetailsModal] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const [showEdit, setShowEdit] = useState(false)
  const [savingEdit, setSavingEdit] = useState(false)
  const [editForm, setEditForm] = useState({
    name: "",
    category: "",
    description: "",
    status: "AVAILABLE",
    features: [""] as string[],
    specifications: "",
  })
  const [categoriesList, setCategoriesList] = useState<string[]>([])
  const [newCategory, setNewCategory] = useState("")
  const [editThumbnail, setEditThumbnail] = useState<File | null>(null)
  const [editGallery, setEditGallery] = useState<File[]>([])

  const [filters, setFilters] = useState({
    search: "",
    category: "",
    status: "",
    sortBy: "createdAt",
    sortOrder: "desc" as "asc" | "desc"
  })
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(12)

  const { logout, user } = useAuth()
  
  const { data: productsResponse, loading: productsLoading, execute: refetchProducts } = useProducts({
    ...filters,
    page: currentPage,
    limit: itemsPerPage
  })

  // Map backend response structure
  const products = (productsResponse as any)?.products || []
  const pagination = (productsResponse as any)?.pagination

  useEffect(() => {
    refetchProducts({
      ...filters,
      page: currentPage,
      limit: itemsPerPage
    })
  }, [filters, currentPage, itemsPerPage, refetchProducts])

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const resp = await productService.getCategories()
        if (resp.success) setCategoriesList(resp.data || [])
      } catch (e) {
        console.error("Failed to load categories", e)
      }
    }
    fetchCategories()
  }, [])

  const handleViewDetails = (product: Product) => {
    setSelectedProduct(product)
    setShowDetailsModal(true)
  }

  const handleOpenEdit = (product: Product) => {
    setSelectedProduct(product)
    setEditForm({
      name: product.name || "",
      category: product.category || "",
      description: product.description || "",
      status: (product.status || "AVAILABLE").toUpperCase(),
      features: product.features && product.features.length ? [...product.features] : [""],
      specifications: product as any && (product as any).specifications ? JSON.stringify((product as any).specifications) : "",
    })
    setEditThumbnail(null)
    setEditGallery([])
    setShowEdit(true)
  }

  const closeModal = () => {
    setShowDetailsModal(false)
    setSelectedProduct(null)
  }

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }))
    setCurrentPage(1)
  }

  const handleSortChange = (sortBy: string) => {
    setFilters(prev => ({
      ...prev,
      sortBy,
      sortOrder: prev.sortOrder === "asc" ? "desc" : "asc"
    }))
    setCurrentPage(1)
  }

  const clearFilters = () => {
    setFilters({
      search: "",
      category: "",
      status: "",
      sortBy: "createdAt",
      sortOrder: "desc"
    })
    setCurrentPage(1)
  }

  const handleDeleteProduct = async (productId: string | number) => {
    if (!confirm("Are you sure you want to delete this product?")) return
    
    try {
      await productService.deleteProduct(String(productId))
      refetchProducts({
        ...filters,
        page: currentPage,
        limit: itemsPerPage
      })
    } catch (error) {
      console.error("Failed to delete product:", error)
    }
  }

  const getStatusColor = (status?: string) => {
    switch (status?.toLowerCase()) {
      case 'available':
        return 'bg-green-100 text-green-800'
      case 'out_of_stock':
      case 'out-of-stock':
        return 'bg-red-100 text-red-800'
      case 'discontinued':
        return 'bg-gray-100 text-gray-800'
      case 'pre_order':
      case 'pre-order':
        return 'bg-blue-100 text-blue-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const formatStatus = (status?: string) => {
    if (!status) return 'Available'
    return status.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
  }

  const totalPages = pagination?.totalPages || pagination?.pages || 1

  // Type-safe helper functions for filtering
  const getAvailableCount = () => {
    return products.filter((p: Product) => p.status?.toLowerCase() === 'available').length
  }

  const getOutOfStockCount = () => {
    return products.filter((p: Product) => p.status?.toLowerCase().includes('out')).length
  }

  const getUniqueCategories = (): string[] => {
    return Array.from(new Set(products.map((p: Product) => p.category).filter(Boolean)))
  }

  const updateEditForm = (key: string, value: any) => {
    setEditForm(prev => ({ ...prev, [key]: value }))
  }

  const addEditFeature = () => {
    setEditForm(prev => ({ ...prev, features: [...prev.features, ""] }))
  }

  const removeEditFeature = (index: number) => {
    setEditForm(prev => ({ ...prev, features: prev.features.filter((_, i) => i !== index) }))
  }

  const updateEditFeature = (index: number, value: string) => {
    setEditForm(prev => ({ ...prev, features: prev.features.map((f, i) => i === index ? value : f) }))
  }

  const handleEditThumbSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0] ? e.target.files[0] : null
    setEditThumbnail(file)
  }

  const handleEditGallerySelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : []
    if (files.length === 0) return
    setEditGallery(prev => [...prev, ...files].slice(0, 3))
  }

  const saveEdit = async () => {
    if (!selectedProduct) return
    setSavingEdit(true)
    try {
      const nonEmptyFeatures = editForm.features.map(f => f.trim()).filter(Boolean)
      let specs: any = undefined
      if (editForm.specifications && editForm.specifications.trim()) {
        try { specs = JSON.parse(editForm.specifications) } catch { specs = editForm.specifications }
      }

      const payload: any = {
        name: editForm.name,
        description: editForm.description,
        category: editForm.category,
        status: editForm.status,
        features: nonEmptyFeatures.length ? nonEmptyFeatures : undefined,
        specifications: specs,
      }
      if (editThumbnail) payload.image = editThumbnail
      if (editGallery.length) payload.images = editGallery

      const res = await productService.updateProduct(String(selectedProduct.id), payload)
      if (res.success) {
        setShowEdit(false)
        setSelectedProduct(null)
        await refetchProducts({
          ...filters,
          page: currentPage,
          limit: itemsPerPage
        })
      } else {
        console.error("Update failed", res)
      }
    } catch (e) {
      console.error("Update error", e)
    } finally {
      setSavingEdit(false)
    }
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
                <h1 className="text-2xl font-bold text-gray-900">Product Management</h1>
                <p className="text-gray-600">Manage your product catalog and inventory</p>
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
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 bg-red-500 text-white text-xs">
                    2
                  </Badge>
                </Button>
                <Link href="/admin/products/new">
                  <Button className="bg-[#0a6650] hover:bg-[#084c3d] relative overflow-hidden group">
                    <span className="relative z-20 flex items-center">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Product
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-blue-500 transform scale-x-0 group-hover:scale-x-100 group-active:scale-x-100 transition-transform duration-500 origin-left pointer-events-none"></div>
                  </Button>
                </Link>
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
                <Package className="h-4 w-4 text-[#0a6650]" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{pagination?.total || 0}</div>
                <p className="text-xs text-green-600">Live count</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Available</CardTitle>
                <Eye className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {getAvailableCount()}
                </div>
                <p className="text-xs text-green-600">In stock</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Out of Stock</CardTitle>
                <Package className="h-4 w-4 text-red-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {getOutOfStockCount()}
                </div>
                <p className="text-xs text-red-600">Need restock</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Categories</CardTitle>
                <Tag className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {getUniqueCategories().length}
                </div>
                <p className="text-xs text-blue-600">Unique categories</p>
              </CardContent>
            </Card>
          </div>

          {/* Filters and Search */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4 mb-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search products by name or description..."
                      className="pl-10"
                      value={filters.search}
                      onChange={(e) => handleFilterChange("search", e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <select
                    className="px-3 py-2 border border-gray-300 rounded-md"
                    value={filters.category}
                    onChange={(e) => handleFilterChange("category", e.target.value)}
                  >
                    <option value="">All Categories</option>
                    {getUniqueCategories().map((category: string) => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                  <select
                    className="px-3 py-2 border border-gray-300 rounded-md"
                    value={filters.status}
                    onChange={(e) => handleFilterChange("status", e.target.value)}
                  >
                    <option value="">All Status</option>
                    <option value="available">Available</option>
                    <option value="out_of_stock">Out of Stock</option>
                    <option value="discontinued">Discontinued</option>
                    <option value="pre_order">Pre Order</option>
                  </select>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <span className="text-sm font-medium text-gray-700">Sort by:</span>
                  <Button
                    variant={filters.sortBy === "name" ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleSortChange("name")}
                  >
                    Name {filters.sortBy === "name" && (filters.sortOrder === "asc" ? "↑" : "↓")}
                  </Button>
                  <Button
                    variant={filters.sortBy === "rating" ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleSortChange("rating")}
                  >
                    Rating {filters.sortBy === "rating" && (filters.sortOrder === "asc" ? "↑" : "↓")}
                  </Button>
                  <Button
                    variant={filters.sortBy === "createdAt" ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleSortChange("createdAt")}
                  >
                    Date {filters.sortBy === "createdAt" && (filters.sortOrder === "asc" ? "↑" : "↓")}
                  </Button>
                </div>
                <Button variant="outline" size="sm" onClick={clearFilters} className="relative overflow-hidden group">
                  <span className="relative z-20">Clear Filters</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-pink-500 transform scale-x-0 group-hover:scale-x-100 group-active:scale-x-100 transition-transform duration-500 origin-left pointer-events-none"></div>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Products Grid */}
          {productsLoading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-12">
              <Package className="h-24 w-24 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
              <p className="text-gray-600 mb-4">Get started by adding your first product</p>
              <Link href="/admin/products/new">
                <Button className="bg-[#0a6650] hover:bg-[#084c3d] relative overflow-hidden group">
                  <span className="relative z-20 flex items-center">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Product
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-blue-500 transform scale-x-0 group-hover:scale-x-100 group-active:scale-x-100 transition-transform duration-500 origin-left pointer-events-none"></div>
                </Button>
              </Link>
            </div>
          ) : (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map((product: Product) => (
                  <Card key={product.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader className="p-0">
                      <div className="relative">
                        <Image
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          width={300}
                          height={200}
                          className="w-full h-48 object-cover rounded-t-lg"
                        />
                        {product.status && (
                          <Badge 
                            className={`absolute top-2 right-2 ${getStatusColor(product.status)}`}
                          >
                            {formatStatus(product.status)}
                          </Badge>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="secondary" className="text-xs">
                          {product.category}
                        </Badge>
                        {Number(product.rating) > 0 && (
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-yellow-400 fill-current" />
                            <span className="text-sm text-gray-600 ml-1">
                              {product.rating}
                            </span>
                          </div>
                        )}
                      </div>
                      
                      <h3 className="font-semibold text-sm mb-2 line-clamp-2">{product.name}</h3>
                      <p className="text-gray-600 text-xs mb-3 line-clamp-2">{product.description}</p>
                      
                      <div className="flex items-center text-xs text-gray-500 mb-3">
                        <Calendar className="h-3 w-3 mr-1" />
                        {new Date(product.createdAt).toLocaleDateString()}
                      </div>

                      <div className="flex items-center justify-between gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleViewDetails(product)}
                          className="flex-1"
                        >
                          <Eye className="h-3 w-3 mr-1" />
                          View
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="w-full flex-1"
                          onClick={() => handleOpenEdit(product)}
                        >
                          <Edit className="h-3 w-3 mr-1" />
                          Edit
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleDeleteProduct(product.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-8 flex items-center justify-center">
                  <nav className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                    >
                      <ChevronLeft className="h-4 w-4" />
                      Previous
                    </Button>
                    
                    {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                      const page = currentPage <= 3 ? i + 1 : currentPage - 2 + i
                      if (page > totalPages) return null
                      return (
                        <Button
                          key={page}
                          variant={page === currentPage ? "default" : "outline"}
                          size="sm"
                          onClick={() => setCurrentPage(page)}
                        >
                          {page}
                        </Button>
                      )
                    })}
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                    >
                      Next
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </nav>
                </div>
              )}

              {/* Results Info */}
              {pagination && (
                <div className="mt-4 text-center text-sm text-gray-500">
                  Showing {((pagination.page - 1) * pagination.limit) + 1} to{' '}
                  {Math.min(pagination.page * pagination.limit, pagination.total)} of{' '}
                  {pagination.total} products
                </div>
              )}
            </>
          )}
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
                  <div className="flex items-center space-x-2 mt-2">
                    <Badge variant="secondary">{selectedProduct.category}</Badge>
                    <Badge className={getStatusColor(selectedProduct.status)}>
                      {formatStatus(selectedProduct.status)}
                    </Badge>
                  </div>
                </div>
                <Button variant="ghost" size="sm" onClick={closeModal}>
                  ×
                </Button>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <Image
                    src={selectedProduct.image || "/placeholder.svg"}
                    alt={selectedProduct.name}
                    width={400}
                    height={400}
                    className="w-full h-80 object-cover rounded-lg"
                  />
                </div>

                <div>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-gray-900">Description</h3>
                      <p className="text-gray-600">{selectedProduct.description}</p>
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-900">Details</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Rating:</span>
                          <span>{selectedProduct.rating || 0}/5</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Reviews:</span>
                          <span>{selectedProduct.reviews || 0}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Created:</span>
                          <span>{new Date(selectedProduct.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>

                    {selectedProduct.features && selectedProduct.features.length > 0 && (
                      <div>
                        <h3 className="font-semibold text-gray-900">Features</h3>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {selectedProduct.features.map((feature, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {feature}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="flex gap-3 mt-6">
                      <Button className="w-full bg-[#0a6650] hover:bg-[#084c3d]" onClick={() => handleOpenEdit(selectedProduct)}>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit Product
                      </Button>
                      <Link href={`/products/${selectedProduct.id}`} className="flex-1">
                        <Button variant="outline" className="w-full">
                          <Eye className="h-4 w-4 mr-2" />
                          View Public
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Overlay */}
      <Dialog open={showEdit} onOpenChange={setShowEdit}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
            <DialogDescription>Update product details. Leave fields empty to keep unchanged.</DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-name">Name</Label>
                <Input id="edit-name" value={editForm.name} onChange={(e) => updateEditForm("name", e.target.value)} className="mt-1" />
              </div>
              <div>
                <Label htmlFor="edit-category">Category</Label>
                <div className="mt-1 space-y-2">
                  <select
                    id="edit-category"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    value={editForm.category}
                    onChange={(e) => updateEditForm("category", e.target.value)}
                  >
                    <option value="">Select Category</option>
                    {categoriesList.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                  <div className="flex gap-2">
                    <Input placeholder="Add new category" value={newCategory} onChange={(e) => setNewCategory(e.target.value)} />
                    <Button
                      variant="outline"
                      onClick={() => {
                        if (newCategory.trim()) {
                          if (!categoriesList.includes(newCategory.trim())) setCategoriesList(prev => [...prev, newCategory.trim()])
                          updateEditForm("category", newCategory.trim())
                          setNewCategory("")
                        }
                      }}
                    >
                      Add
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <Label htmlFor="edit-description">Description</Label>
              <Textarea id="edit-description" rows={4} value={editForm.description} onChange={(e) => updateEditForm("description", e.target.value)} className="mt-1" />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-status">Status</Label>
                <select id="edit-status" className="w-full px-3 py-2 border border-gray-300 rounded-md mt-1" value={editForm.status} onChange={(e) => updateEditForm("status", e.target.value)}>
                  <option value="AVAILABLE">AVAILABLE</option>
                  <option value="OUT_OF_STOCK">OUT_OF_STOCK</option>
                  <option value="DISCONTINUED">DISCONTINUED</option>
                  <option value="PRE_ORDER">PRE_ORDER</option>
                </select>
              </div>
              <div>
                <Label htmlFor="edit-specs">Specifications (JSON)</Label>
                <Textarea id="edit-specs" rows={4} value={editForm.specifications} onChange={(e) => updateEditForm("specifications", e.target.value)} className="mt-1" />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <Label>Features</Label>
                <Button variant="outline" size="sm" onClick={addEditFeature}>
                  <Plus className="h-4 w-4 mr-1" /> Add Feature
                </Button>
              </div>
              <div className="space-y-2">
                {editForm.features.map((f, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <Input value={f} onChange={(e) => updateEditFeature(i, e.target.value)} />
                    {editForm.features.length > 1 && (
                      <Button variant="outline" size="sm" onClick={() => removeEditFeature(i)}>Remove</Button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label>Thumbnail (image)</Label>
                <Input type="file" accept="image/*" onChange={handleEditThumbSelected} className="mt-1" />
                {editThumbnail && <p className="text-xs text-gray-600 mt-1">Selected: {editThumbnail.name}</p>}
              </div>
              <div>
                <Label>Gallery (images)</Label>
                <Input type="file" accept="image/*" multiple onChange={handleEditGallerySelected} className="mt-1" />
                {editGallery.length > 0 && <p className="text-xs text-gray-600 mt-1">{editGallery.length} selected</p>}
              </div>
            </div>
          </div>

          <DialogFooter className="sm:justify-start gap-2 mt-4">
            <Button className="bg-[#0a6650] hover:bg-[#084c3d]" onClick={saveEdit} disabled={savingEdit}>
              {savingEdit ? "Saving..." : "Save Changes"}
            </Button>
            <Button variant="outline" onClick={() => setShowEdit(false)}>Cancel</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Notification System */}
      <NotificationSystem 
        isOpen={showNotifications} 
        onClose={() => setShowNotifications(false)} 
      />
    </div>
  )
}
