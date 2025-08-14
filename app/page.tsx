"use client"

import { useState, useEffect, useMemo } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Leaf, Zap, Shield, Truck, MessageCircle, ShoppingCart, User, LogOut } from "lucide-react"
import EnquiryForm from "./components/EnquiryForm"
import ProductCard from "../components/ProductCard"
import { useAuth } from "../contexts/AuthContext"
import { useProducts } from "../hooks/use-api"
import { Product } from "../lib/types/api"
import { useApi } from "../hooks/use-api"
import { productService } from "../lib/services/api"

export default function HomePage() {
  const [showEnquiryForm, setShowEnquiryForm] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  
  const { user, isAuthenticated, logout } = useAuth()
  
  // Memoize the query parameters for featured products
  const featuredProductsParams = useMemo(() => ({
    limit: 6, 
    sortBy: 'rating', 
    sortOrder: 'desc' 
  }), [])
  
  // Fetch featured products and categories
  const { data: productsResponse, loading: productsLoading } = useProducts(featuredProductsParams)
  
  // Use public categories endpoint instead of admin-only settings endpoint
  const { data: categoriesResponse, loading: categoriesLoading } = useApi(
    () => productService.getCategories(),
    true
  )
  
  // Get featured products (top 3 by rating) - properly map backend structure
  const featuredProducts = (productsResponse as any)?.products?.slice(0, 3) || []
  
  // Get categories with counts - properly handle string[] response
  const categoryNames = (categoriesResponse as any)?.data || []
  
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

  const categories = categoryNames.length > 0 
    ? categoryNames.map((name: string) => ({ 
        name, 
        icon: getCategoryIcon(name), 
        count: getCategoryProductCount(name) 
      }))
    : [
        { name: "Solar Panels", icon: "☀️", count: 0 },
        { name: "Wind Energy", icon: "💨", count: 0 },
        { name: "Energy Storage", icon: "🔋", count: 0 },
        { name: "Inverters", icon: "⚡", count: 0 },
        { name: "Monitoring", icon: "📊", count: 0 },
        { name: "Accessories", icon: "🔧", count: 0 },
      ]

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

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-2">
                <Image src="/logo.png" alt="Greenbeam Logo" width={32} height={32} />
                {/* <span className="text-2xl font-bold text-[#0a6650]">Greenbeam</span> */}
              </Link>
            </div>
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

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-[#0a6650] to-[#084c3d] text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">Power Your Future with Clean Energy</h1>
              <p className="text-xl mb-8 text-green-100">
                Discover our premium collection of solar panels, wind turbines, and energy storage solutions. Make the
                switch to sustainable energy today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/products">
                  <Button size="lg" className="bg-white text-[#0a6650] hover:bg-gray-100">
                    Shop Now
                  </Button>
                </Link>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-green-600 bg-transparent"
                >
                  Learn More
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
          
          {categoriesLoading ? (
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
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
              <Button className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                View All Categories
                <span className="ml-2">→</span>
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
              <Button variant="outline">View All Products</Button>
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
            <Button className="bg-white text-[#0a6650] hover:bg-gray-100">Subscribe</Button>
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
                <span className="text-2xl font-bold">Greenbeam</span>
              </div>
              <p className="text-gray-400">
                Leading provider of sustainable energy solutions for homes and businesses.
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
            <p>&copy; 2024 Greenbeam. All rights reserved.</p>
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
