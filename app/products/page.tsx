"use client"

import { useState, useEffect, useMemo } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { 
  Leaf, 
  Zap, 
  Shield, 
  Truck, 
  MessageCircle, 
  User, 
  LogOut, 
  Search, 
  Filter, 
  Menu, 
  X,
  ChevronDown,
  ChevronUp
} from "lucide-react"
import ProductCard from "../../components/ProductCard"
import { useAuth } from "../../contexts/AuthContext"
import { useProducts } from "../../hooks/use-api"
import { productService } from "../../lib/services/api"
import { Product } from "../../lib/types/api"
import EnquiryForm from "../components/EnquiryForm"

export default function ProductsPage() {
  const [showEnquiryForm, setShowEnquiryForm] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [filtersOpen, setFiltersOpen] = useState(false)
  
  const { user, isAuthenticated, logout } = useAuth()
  
  // Get URL parameters for initial state
  const [searchParams, setSearchParams] = useState<URLSearchParams>(new URLSearchParams())
  
  // Initialize filters from URL params
  const [filters, setFilters] = useState({
    search: searchParams.get('search') || '',
    category: searchParams.get('category') || '',
    sortBy: 'rating',
    sortOrder: 'desc' as 'asc' | 'desc'
  })
  
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(12)
  
  // Memoize query parameters to prevent infinite loops
  const queryParams = useMemo(() => ({
    ...filters,
    page: currentPage,
    limit: itemsPerPage
  }), [filters, currentPage, itemsPerPage])
  
  // Fetch products and categories
  const { data: productsResponse, loading: productsLoading, execute: refetchProducts } = useProducts(queryParams)
  
  // Custom categories fetch with timeout
  const [categoriesData, setCategoriesData] = useState<any>(null)
  const [categoriesLoadingState, setCategoriesLoadingState] = useState(true)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setCategoriesLoadingState(true)
        
        // Add timeout to prevent infinite loading
        const timeoutPromise = new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Request timeout')), 10000)
        )
        
        const categoriesPromise = productService.getCategories()
        const response = await Promise.race([categoriesPromise, timeoutPromise]) as any
        
        if (response.success) {
          setCategoriesData(response.data)
        } else {
          // Fallback to empty array if API fails
          setCategoriesData([])
        }
      } catch (error) {
        console.error('Categories fetch error:', error)
        // Fallback to empty array if API fails
        setCategoriesData([])
      } finally {
        setCategoriesLoadingState(false)
      }
    }

    fetchCategories()
  }, [])
  
  // Map backend response structure
  const products = (productsResponse as any)?.products || []
  const pagination = (productsResponse as any)?.pagination
  
  // Get categories for filtering
  const categoryNames = categoriesData || []
  
  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams()
    if (filters.search) params.set('search', filters.search)
    if (filters.category) params.set('category', filters.category)
    if (filters.sortBy !== 'rating') params.set('sortBy', filters.sortBy)
    if (filters.sortOrder !== 'desc') params.set('sortOrder', filters.sortOrder)
    
    const newUrl = `${window.location.pathname}${params.toString() ? '?' + params.toString() : ''}`
    window.history.replaceState({}, '', newUrl)
    setSearchParams(params)
  }, [filters])
  
  // Refetch products when filters change
  useEffect(() => {
    refetchProducts(queryParams)
  }, [queryParams, refetchProducts])
  
  const handleEnquireNow = (product: Product) => {
    setSelectedProduct(product)
    setShowEnquiryForm(true)
  }
  
  const closeEnquiryForm = () => {
    setShowEnquiryForm(false)
    setSelectedProduct(null)
  }
  
  const handleLogout = async () => {
    await logout()
  }
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }
  
  const toggleFilters = () => {
    setFiltersOpen(!filtersOpen)
  }
  
  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }))
    setCurrentPage(1)
  }
  
  const handleSortChange = (sortBy: string) => {
    setFilters(prev => ({
      ...prev,
      sortBy,
      sortOrder: prev.sortOrder === 'asc' ? 'desc' : 'asc'
    }))
    setCurrentPage(1)
  }
  
  const clearFilters = () => {
    setFilters({
      search: '',
      category: '',
      sortBy: 'rating',
      sortOrder: 'desc'
    })
    setCurrentPage(1)
  }
  
  const totalPages = pagination?.totalPages || pagination?.pages || 1
  
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
      <nav className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 relative z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2 md:space-x-4">
              <Link href="/" className="flex items-center space-x-2">
                <Image 
                  src="/logo.jpg" 
                  alt="Greenbeam Logo" 
                  width={140} 
                  height={72} 
                  className="w-20 h-10 sm:w-24 sm:h-12 md:w-36 md:h-16 lg:w-40 lg:h-20 transition-all duration-300 hover:scale-105"
                  priority
                />
              </Link>
            </div>
            
            {/* Desktop Navigation */}
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
            
            <div className="hidden md:flex items-center space-x-4">
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

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleMobileMenu}
                className="p-2"
              >
                {mobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden border-t bg-white">
              <div className="px-2 py-2 space-y-1">
                <Link 
                  href="/" 
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Home
                </Link>
                <Link 
                  href="/products" 
                  className="block px-3 py-2 rounded-md text-base font-medium text-[#0a6650] hover:bg-gray-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Products
                </Link>
                <Link 
                  href="/about" 
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  About
                </Link>
                <Link 
                  href="/contact" 
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Contact
                </Link>
                <div className="border-t pt-2 mt-2">
                  {isAuthenticated ? (
                    <div className="px-3 py-2">
                      <span className="text-sm text-gray-700">Welcome, {user?.name}</span>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={handleLogout}
                        className="w-full mt-2"
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Logout
                      </Button>
                    </div>
                  ) : (
                    <Link 
                      href="/admin" 
                      className="block px-3 py-2 rounded-md text-base font-medium text-[#0a6650] hover:bg-gray-50"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Admin Login
                    </Link>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#0a6650] to-[#084c3d] text-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Products</h1>
          <p className="text-xl text-green-100 max-w-2xl mx-auto">
            Discover our comprehensive range of sustainable energy solutions and renewable technology
          </p>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-sm border">
            {/* Mobile Filters Toggle */}
            <div className="md:hidden border-b">
              <button
                onClick={toggleFilters}
                className="w-full px-4 py-3 flex items-center justify-between text-left font-medium text-gray-700 hover:bg-gray-50"
              >
                <span className="flex items-center">
                  <Filter className="h-4 w-4 mr-2" />
                  Filters & Search
                </span>
                {filtersOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </button>
            </div>

            {/* Filters Content */}
            <div className={`${filtersOpen ? 'block' : 'hidden'} md:block p-4 md:p-6`}>
              <div className="space-y-4">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search products..."
                    className="pl-10"
                    value={filters.search}
                    onChange={(e) => handleFilterChange("search", e.target.value)}
                  />
                </div>

                {/* Category and Sort */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                    <select
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#0a6650] focus:border-[#0a6650]"
                      value={filters.category}
                      onChange={(e) => handleFilterChange("category", e.target.value)}
                      disabled={categoriesLoadingState}
                    >
                      <option value="">{categoriesLoadingState ? "Loading categories..." : "All Categories"}</option>
                      {categoryNames.map((category: string, index: number) => (
                        <option key={index} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
                    <div className="flex space-x-2">
                      <Button
                        variant={filters.sortBy === "name" ? "default" : "outline"}
                        size="sm"
                        onClick={() => handleSortChange("name")}
                        className="flex-1"
                      >
                        Name {filters.sortBy === "name" && (filters.sortOrder === "asc" ? "↑" : "↓")}
                      </Button>
                      <Button
                        variant={filters.sortBy === "rating" ? "default" : "outline"}
                        size="sm"
                        onClick={() => handleSortChange("rating")}
                        className="flex-1"
                      >
                        Rating {filters.sortBy === "rating" && (filters.sortOrder === "asc" ? "↑" : "↓")}
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Clear Filters */}
                <div className="flex justify-end">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={clearFilters}
                    className="relative overflow-hidden group transition-all duration-300"
                  >
                    <span className="relative z-20">Clear Filters</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-pink-500 transform scale-x-0 group-hover:scale-x-100 group-active:scale-x-100 transition-transform duration-500 origin-left pointer-events-none"></div>
                  </Button>
                </div>
              </div>
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
