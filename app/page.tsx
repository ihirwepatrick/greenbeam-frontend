"use client"

import { useState, useEffect, useMemo } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Leaf, Zap, Shield, Truck, MessageCircle, User, LogOut, Menu, X } from "lucide-react"
import EnquiryForm from "./components/EnquiryForm"
import ProductCard from "../components/ProductCard"
import { useAuth } from "../contexts/AuthContext"
import { useProducts, useSettings } from "../hooks/use-api"
import { Product } from "../lib/types/api"
import { productService } from "../lib/services/api"

export default function HomePage() {
  const [showEnquiryForm, setShowEnquiryForm] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  
  const { user, isAuthenticated, logout } = useAuth()
  
  // Full settings (contains general and website)
  const { data: settingsData } = useSettings()
  
  // Memoize the query parameters for featured products
  const featuredProductsParams = useMemo(() => ({
    limit: 6, 
    sortBy: 'rating', 
    sortOrder: 'desc' 
  }), [])
  
  // Fetch featured products and categories
  const { data: productsResponse, loading: productsLoading } = useProducts(featuredProductsParams)
  
  // Custom categories fetch with timeout
  const [categoriesData, setCategoriesData] = useState<any>(null)
  const [categoriesLoadingState, setCategoriesLoadingState] = useState(true)
  const [categoriesErrorState, setCategoriesErrorState] = useState<string | null>(null)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setCategoriesLoadingState(true)
        setCategoriesErrorState(null)
        
        // Add timeout to prevent infinite loading
        const timeoutPromise = new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Request timeout')), 10000)
        )
        
        const categoriesPromise = productService.getCategories()
        const response = await Promise.race([categoriesPromise, timeoutPromise]) as any
        
        if (response.success) {
          setCategoriesData(response.data)
        } else {
          setCategoriesErrorState('Failed to load categories')
        }
      } catch (error) {
        console.error('Categories fetch error:', error)
        setCategoriesErrorState(error instanceof Error ? error.message : 'Failed to load categories')
      } finally {
        setCategoriesLoadingState(false)
      }
    }

    fetchCategories()
  }, [])
  
  // Get featured products (top 3 by rating) - properly map backend structure
  const featuredProducts = (productsResponse as any)?.products?.slice(0, 3) || []
  
  // Get categories with counts - properly handle string[] response with fallback
  const categoryNames = categoriesData || []
  
  // Define category icons and get product counts
  const getCategoryIcon = (categoryName: string) => {
    const iconMap: { [key: string]: string } = {
      'Solar Panels': '☀️',
      'Wind Energy': '💨',
      'Energy Storage': '🔋',
      'Inverters': '⚡',
      'Monitoring': '📊',
      'Accessories': '🔧',
      'Batteries': '🔋',
      'Solar Inverters': '⚡',
      'Solar Mounting': '🏗️',
      'Solar Cables': '🔌',
      'Solar Controllers': '🎛️',
      'Solar Pumps': '💧',
      'LED Lighting': '💡',
      'Smart Home': '🏠',
      'Electric Vehicles': '🚗',
      'Heat Pumps': '🔥',
      'Biomass': '🌿',
      'Hydroelectric': '💧',
      'Geothermal': '🌋',
      'Tidal Energy': '🌊'
    }
    return iconMap[categoryName] || '📦'
  }

  // Get product count for each category
  const getCategoryProductCount = (categoryName: string) => {
    const products = (productsResponse as any)?.products || []
    return products.filter(
      (product: Product) => product.category === categoryName
    ).length
  }

  // Fallback categories if API fails or returns empty
  const fallbackCategories = [
    { name: "Solar Panels", icon: "☀️", count: 0 },
    { name: "Wind Energy", icon: "💨", count: 0 },
    { name: "Energy Storage", icon: "🔋", count: 0 },
    { name: "Inverters", icon: "⚡", count: 0 },
    { name: "Monitoring", icon: "📊", count: 0 },
    { name: "Accessories", icon: "🔧", count: 0 },
  ]

  const categories = categoryNames.length > 0 
    ? categoryNames.map((name: string) => ({ 
        name, 
        icon: getCategoryIcon(name), 
        count: getCategoryProductCount(name) 
      }))
    : fallbackCategories

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
                  height={64}
                  className="h-10 w-auto sm:h-12 object-contain"
                  priority
                  sizes="(max-width: 768px) 120px, 160px"
                />
                {/* <span className="text-2xl font-bold text-[#0a6650]">Greenbeam</span> */}
              </Link>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-[#0a6650] font-medium">
                Home
              </Link>
              <Link href="/products" className="text-gray-700 hover:text-[#0a6650]">
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
                  className="block px-3 py-2 rounded-md text-base font-medium text-[#0a6650] hover:bg-gray-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Home
                </Link>
                <Link 
                  href="/products" 
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50"
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
      <section className="relative bg-gradient-to-r from-[#0a6650] to-[#084c3d] text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">{(settingsData as any)?.data?.website?.content?.homepageHero?.title || "Power Your Future with Clean Energy"}</h1>
              <p className="text-xl mb-8 text-green-100">
                {(settingsData as any)?.data?.website?.content?.homepageHero?.subtitle || "Discover our premium collection of solar panels, wind turbines, and energy storage solutions. Make the switch to sustainable energy today."}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href={(settingsData as any)?.data?.website?.content?.homepageHero?.ctaLink || "/products"}>
                  <Button size="lg" className="bg-white text-[#0a6650] hover:bg-gray-100 active:bg-gray-200 relative overflow-hidden group transition-all duration-300">
                    <span className="relative z-20">{(settingsData as any)?.data?.website?.content?.homepageHero?.ctaText || "Shop Now"}</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-blue-500 transform scale-x-0 group-hover:scale-x-100 group-active:scale-x-100 transition-transform duration-500 origin-left pointer-events-none"></div>
                  </Button>
                </Link>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-green-600 active:bg-white active:text-green-600 bg-transparent relative overflow-hidden group transition-all duration-300"
                >
                  <span className="relative z-20">Learn More</span>
                  <div className="absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 group-active:scale-x-100 transition-transform duration-500 origin-left pointer-events-none"></div>
                </Button>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/solar-panel-3.jpg"
                alt="Solar panels on house"
                width={600}
                height={500}
                className="rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <Zap className="h-12 w-12 text-[#0a6650] mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">High Efficiency</h3>
              <p className="text-gray-600">Premium quality equipment with maximum energy output</p>
            </div>
            <div className="text-center">
              <Shield className="h-12 w-12 text-[#0a6650] mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">25-Year Warranty</h3>
              <p className="text-gray-600">Long-term protection for your investment</p>
            </div>
            <div className="text-center">
              <Truck className="h-12 w-12 text-[#0a6650] mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Free Installation</h3>
              <p className="text-gray-600">Professional installation included with every purchase</p>
            </div>
            <div className="text-center">
              <Leaf className="h-12 w-12 text-[#0a6650] mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Eco-Friendly</h3>
              <p className="text-gray-600">Reduce your carbon footprint and save money</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-gradient-to-br from-green-50 to-blue-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Shop by Category</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover our comprehensive range of sustainable energy solutions
            </p>
          </div>
          
          {categoriesLoadingState && !categoriesErrorState ? (
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
            </div>
          ) : categoriesErrorState ? (
            <div className="text-center py-8">
              <p className="text-gray-600 mb-4">Unable to load categories. Showing default categories.</p>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
                {fallbackCategories.map((category: any, index: number) => (
                  <Link 
                    key={index} 
                    href={`/products?category=${encodeURIComponent(category.name)}`}
                    className="group"
                  >
                    <Card className="h-full hover:shadow-xl transition-all duration-300 cursor-pointer border-0 bg-white/80 backdrop-blur-sm hover:bg-white hover:scale-105 hover:-translate-y-2 group-hover:shadow-2xl group-hover:shadow-green-200/50">
                      <CardContent className="p-6 text-center h-full flex flex-col justify-center">
                        <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                          {category.icon}
                        </div>
                        <h3 className="font-semibold text-gray-900 mb-2 text-sm lg:text-base group-hover:text-green-700 transition-colors duration-300">
                          {category.name}
                        </h3>
                        <div className="flex items-center justify-center space-x-1">
                          <span className="text-xs text-gray-500 group-hover:text-green-600 transition-colors duration-300">
                            {category.count}
                          </span>
                          <span className="text-xs text-gray-400 group-hover:text-green-500 transition-colors duration-300">
                            products
                          </span>
                        </div>
                        
                        {/* Hover indicator */}
                        <div className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="w-8 h-1 bg-gradient-to-r from-green-400 to-blue-500 rounded-full mx-auto"></div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
              {categories.map((category: any, index: number) => (
                <Link 
                  key={index} 
                  href={`/products?category=${encodeURIComponent(category.name)}`}
                  className="group"
                >
                  <Card className="h-full hover:shadow-xl transition-all duration-300 cursor-pointer border-0 bg-white/80 backdrop-blur-sm hover:bg-white hover:scale-105 hover:-translate-y-2 group-hover:shadow-2xl group-hover:shadow-green-200/50">
                    <CardContent className="p-6 text-center h-full flex flex-col justify-center">
                      <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                        {category.icon}
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-2 text-sm lg:text-base group-hover:text-green-700 transition-colors duration-300">
                        {category.name}
                      </h3>
                      <div className="flex items-center justify-center space-x-1">
                        <span className="text-xs text-gray-500 group-hover:text-green-600 transition-colors duration-300">
                          {category.count}
                        </span>
                        <span className="text-xs text-gray-400 group-hover:text-green-500 transition-colors duration-300">
                          products
                        </span>
                      </div>
                      
                      {/* Hover indicator */}
                      <div className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="w-8 h-1 bg-gradient-to-r from-green-400 to-blue-500 rounded-full mx-auto"></div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
          
          {/* View All Categories Button */}
          <div className="text-center mt-12">
            <Link href="/products">
              <Button className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 active:from-green-800 active:to-blue-800 text-white px-8 py-3 rounded-full shadow-lg hover:shadow-xl active:shadow-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 relative overflow-hidden group">
                <span className="relative z-20">View All Categories</span>
                <span className="ml-2 relative z-20">→</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 transform scale-x-0 group-hover:scale-x-100 group-active:scale-x-100 transition-transform duration-500 origin-left pointer-events-none"></div>
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold">Featured Products</h2>
            <Link href="/products">
              <Button variant="outline" className="relative overflow-hidden group transition-all duration-300 hover:shadow-md active:shadow-lg">
                <span className="relative z-20">View All Products</span>
                <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-blue-500 transform scale-x-0 group-hover:scale-x-100 group-active:scale-x-100 transition-transform duration-500 origin-left pointer-events-none"></div>
              </Button>
            </Link>
          </div>
          {productsLoading ? (
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
            </div>
          ) : featuredProducts.length > 0 ? (
            <div className="grid md:grid-cols-3 gap-8">
              {featuredProducts.map((product: Product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onEnquire={handleEnquireNow}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🌱</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Products Available</h3>
              <p className="text-gray-600">Check back soon for our sustainable energy solutions!</p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-[#0a6650] text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="text-xl mb-8 text-green-100">
            Get the latest news on green energy solutions and exclusive offers
          </p>
          <div className="max-w-md mx-auto flex gap-4">
            <input type="email" placeholder="Enter your email" className="flex-1 px-4 py-2 rounded-lg text-gray-900" />
            <Button className="bg-white text-[#0a6650] hover:bg-gray-100 active:bg-gray-200 relative overflow-hidden group transition-all duration-300">
              <span className="relative z-20">Subscribe</span>
              <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-blue-500 transform scale-x-0 group-hover:scale-x-100 group-active:scale-x-100 transition-transform duration-500 origin-left pointer-events-none"></div>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Leaf className="h-8 w-8 text-[#0a6650]" />
                <span className="text-2xl font-bold">{(settingsData as any)?.data?.general?.companyName || 'Greenbeam'}</span>
              </div>
              <p className="text-gray-400">
                {(settingsData as any)?.data?.website?.content?.siteDescription || 'Leading provider of sustainable energy solutions for homes and businesses.'}
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Products</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/products?category=Solar%20Panels">Solar Panels</Link>
                </li>
                <li>
                  <Link href="/products?category=Wind%20Energy">Wind Turbines</Link>
                </li>
                <li>
                  <Link href="/products?category=Energy%20Storage">Battery Storage</Link>
                </li>
                <li>
                  <Link href="/products?category=Inverters">Inverters</Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/about">About Us</Link>
                </li>
                <li>
                  <Link href="/contact">Contact</Link>
                </li>
                <li>
                  <Link href="/careers">Careers</Link>
                </li>
                <li>
                  <Link href="/blog">Blog</Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/help">Help Center</Link>
                </li>
                <li>
                  <Link href="/warranty">Warranty</Link>
                </li>
                <li>
                  <Link href="/installation">Installation</Link>
                </li>
                <li>
                  <Link href="/maintenance">Maintenance</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>{(settingsData as any)?.data?.website?.content?.footer?.copyrightText || '\u00A9 2024 Greenbeam. All rights reserved.'}</p>
          </div>
        </div>
      </footer>

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
