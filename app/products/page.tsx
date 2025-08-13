"use client"

import { useState, useEffect, useMemo } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Leaf, Star, ArrowRight, Search, X, Phone, Mail, MapPin, MessageCircle, Filter, ShoppingCart, User, LogOut } from "lucide-react"
import EnquiryForm from "../components/EnquiryForm"
import ProductCard from "../../components/ProductCard"
import { useAuth } from "../../contexts/AuthContext"
import { useProducts } from "../../hooks/use-api"
import { Product } from "../../lib/types/api"
import { useApi } from "../../hooks/use-api"
import { productService } from "../../lib/services/api"

export default function ProductsPage() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [showEnquiryForm, setShowEnquiryForm] = useState(false)
  const [filters, setFilters] = useState({
    category: "",
    search: "",
    minPrice: "",
    maxPrice: "",
    sortBy: "name",
    sortOrder: "asc" as "asc" | "desc"
  })
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(12)

  const { user, isAuthenticated, logout } = useAuth()
  
  // Memoize the query parameters to prevent infinite loops
  const queryParams = useMemo(() => ({
    ...filters,
    page: currentPage,
    limit: itemsPerPage
  }), [filters, currentPage, itemsPerPage])
  
  // Fetch products and categories
  const { data: productsResponse, loading: productsLoading } = useProducts(queryParams)
  
  // Use public categories endpoint instead of admin-only settings endpoint
  const { data: categoriesResponse, loading: categoriesLoading } = useApi(
    () => productService.getCategories(),
    true
  )

  // Map backend response structure
  const products = (productsResponse as any)?.products || []
  const pagination = (productsResponse as any)?.pagination
  const categories = (categoriesResponse as any)?.data || ["All Products"]

  // Remove the problematic useEffect that was causing infinite loops
  // useProducts already handles parameter changes automatically

  const handleViewDetails = (product: Product) => {
    setSelectedProduct(product)
    setShowModal(true)
  }

  const closeModal = () => {
    setSelectedProduct(null)
    setShowModal(false)
  }

  const handleEnquireNow = (product: Product) => {
    setSelectedProduct(product)
    setShowEnquiryForm(true)
  }

  const closeEnquiryForm = () => {
    setShowEnquiryForm(false)
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
      category: "",
      search: "",
      minPrice: "",
      maxPrice: "",
      sortBy: "name",
      sortOrder: "asc"
    })
    setCurrentPage(1)
  }

  const handleLogout = async () => {
    await logout()
  }

  const totalPages = pagination?.totalPages || 1

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

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-2">
                <Leaf className="h-8 w-8 text-[#0a6650]" />
                <span className="text-2xl font-bold text-[#0a6650]">Greenbeam</span>
              </Link>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-gray-700 hover:text-[#0a6650]">
                Home
              </Link>
              <Link href="/products" className="text-[#0a6650] font-medium">
                Products
              </Link>
              <Link href="/about" className="text-gray-700 hover:text-[#0a6650]">
                About
              </Link>
              <Link href="/contact" className="text-gray-700 hover:text-[#0a6650]">
                Contact
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/cart">
                <Button variant="outline" size="sm">
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Cart (0)
                </Button>
              </Link>
              {isAuthenticated ? (
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-700">Welcome, {user?.name}</span>
                  <Button variant="outline" size="sm" onClick={handleLogout}>
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                </div>
              ) : (
              <Link href="/admin">
                  <Button className="bg-white text-[#0a6650] hover:bg-gray-50">
                    Admin Login
                  </Button>
              </Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Header */}
      <section className="bg-gradient-to-r from-[#0a6650] to-[#084c3d] text-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold mb-4">Our Products</h1>
          <p className="text-xl text-green-100">
            Discover our comprehensive range of sustainable energy solutions
          </p>
        </div>
      </section>

      {/* Filters and Search */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={filters.search}
                    onChange={(e) => handleFilterChange("search", e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                  value={filters.category}
                  onChange={(e) => handleFilterChange("category", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="">All Categories</option>
                  {categories.map((category: string, index: number) => (
                    <option key={index} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Min Price</label>
                <input
                  type="number"
                  placeholder="Min price"
                  value={filters.minPrice}
                  onChange={(e) => handleFilterChange("minPrice", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Max Price</label>
                <input
                  type="number"
                  placeholder="Max price"
                  value={filters.maxPrice}
                  onChange={(e) => handleFilterChange("maxPrice", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <div className="flex flex-wrap items-center justify-between gap-4">
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
              
              <Button variant="outline" size="sm" onClick={clearFilters}>
                <X className="h-4 w-4 mr-2" />
                Clear Filters
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {productsLoading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
              <p className="text-gray-600 mb-4">Try adjusting your search criteria or browse all categories</p>
              <Button onClick={clearFilters} variant="outline">
                Clear Filters
              </Button>
            </div>
          ) : (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map((product: Product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onEnquire={handleEnquireNow}
                    compact={true}
                  />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-12 flex justify-center">
                  <nav className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                    >
                      Previous
                    </Button>
                    
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <Button
                        key={page}
                        variant={page === currentPage ? "default" : "outline"}
                        size="sm"
                        onClick={() => setCurrentPage(page)}
                      >
                        {page}
                      </Button>
                    ))}
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                    >
                      Next
                    </Button>
                  </nav>
                </div>
              )}

              {/* Results Info */}
              {pagination && (
                <div className="mt-4 text-center text-sm text-gray-500">
                  Showing {((pagination.page - 1) * pagination.limit) + 1} to{' '}
                  {Math.min(pagination.page * pagination.limit, pagination.total)} of{' '}
                  {pagination.total} results
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Product Detail Modal */}
      {showModal && selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold">{selectedProduct.name}</h2>
                <Button variant="ghost" size="sm" onClick={closeModal}>
                  <X className="h-6 w-6" />
                </Button>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <div className="relative">
                    <Image
                      src={selectedProduct.image || "/placeholder.svg"}
                      alt={selectedProduct.name}
                      width={400}
                      height={400}
                      className="w-full h-80 object-cover rounded-lg"
                    />
                    {selectedProduct.status && (
                      <Badge 
                        className={`absolute top-2 right-2 ${getStatusColor(selectedProduct.status)}`}
                      >
                        {formatStatus(selectedProduct.status)}
                      </Badge>
                    )}
                  </div>
                </div>
                
                <div>
                  <Badge variant="secondary" className="mb-3">
                    {selectedProduct.category}
                  </Badge>
                  
                  <p className="text-gray-700 mb-4">{selectedProduct.description}</p>
                  
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <Star className="h-5 w-5 text-yellow-400 mr-2" />
                      <span className="text-gray-700">
                        Rating: {selectedProduct.rating || 0}
                      </span>
                    </div>
                    
                    <div className="flex items-center">
                      <Leaf className="h-5 w-5 text-green-600 mr-2" />
                      <span className="text-gray-700">
                        Category: {selectedProduct.category}
                      </span>
                    </div>

                    {selectedProduct.features && selectedProduct.features.length > 0 && (
                      <div>
                        <h4 className="font-medium mb-2">Features:</h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedProduct.features.map((feature, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {feature}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="mt-6 space-y-3">
                    <Button 
                      className="w-full bg-[#0a6650] hover:bg-[#084c3d]"
                      onClick={() => {
                        closeModal()
                        handleEnquireNow(selectedProduct)
                      }}
                    >
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Enquire About This Product
                    </Button>
                    
                    <Link href={`/products/${selectedProduct.id}`}>
                      <Button variant="outline" className="w-full">
                        View Full Details
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Enquiry Form Modal */}
      {showEnquiryForm && selectedProduct && (
        <EnquiryForm 
          isOpen={showEnquiryForm} 
          onClose={closeEnquiryForm} 
          product={selectedProduct}
        />
      )}
    </div>
  )
}
