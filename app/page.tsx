"use client"

import { useState, useEffect, useMemo } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Leaf, Zap, Shield, Truck, MessageCircle, User, Menu, X, Facebook, Instagram, Linkedin } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
const XIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" {...props}>
    <path fill="currentColor" d="M9.294 6.928L14.357 1h-1.2L8.762 6.147L5.25 1H1.2l5.31 7.784L1.2 15h1.2l4.642-5.436L10.751 15h4.05zM7.651 8.852l-.538-.775L2.832 1.91h1.843l3.454 4.977l.538.775l4.491 6.47h-1.843z"/>
  </svg>
)
import EnquiryForm from "./components/EnquiryForm"
import ProductCard from "../components/ProductCard"
import CartPreview from "../components/CartPreview"
import CurrencySwitcher from "../components/CurrencySwitcher"
import SiteLogo from "../components/SiteLogo"
import { useCart } from "../contexts/CartContext"
import { useProducts, useSettings } from "../hooks/use-api"
import { Product } from "../lib/types/api"
import { productService } from "../lib/services/api"

export default function HomePage() {
  const [showEnquiryForm, setShowEnquiryForm] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  
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

  const categories = categoryNames.map((name: string) => ({
    name,
    icon: getCategoryIcon(name),
    count: getCategoryProductCount(name),
  }))

  const CATEGORY_SKELETON_COUNT = 6

  const handleEnquireNow = (product: Product) => {
    setSelectedProduct(product)
    setShowEnquiryForm(true)
  }

  const closeEnquiryForm = () => {
    setShowEnquiryForm(false)
    setSelectedProduct(null)
  }

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2 md:space-x-4">
              <SiteLogo />
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-greenbeam-teal font-medium">
                Home
              </Link>
              <Link href="/products" className="text-gray-700 hover:text-greenbeam-teal">
                Products
              </Link>
              <Link href="/about" className="text-gray-700 hover:text-greenbeam-teal">
                About
              </Link>
              <Link href="/contact" className="text-gray-700 hover:text-greenbeam-teal">
                Contact
              </Link>
            </div>
            
            <div className="hidden md:flex items-center space-x-4">
              <CurrencySwitcher />
              <CartPreview />
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
                  className="block px-3 py-2 rounded-md text-base font-medium text-greenbeam-teal hover:bg-gray-50"
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
                  <div className="px-3 py-2">
                    <CartPreview />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-greenbeam-teal to-greenbeam-teal-dark text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">{(settingsData as any)?.data?.website?.content?.homepageHero?.title || "Power Your Future with Clean Energy"}</h1>
              <p className="text-xl mb-8 text-white/90">
                {(settingsData as any)?.data?.website?.content?.homepageHero?.subtitle || "Discover our premium collection of solar panels, wind turbines, and energy storage solutions. Make the switch to sustainable energy today."}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href={(settingsData as any)?.data?.website?.content?.homepageHero?.ctaLink || "/products"}>
                  <Button size="lg" className="bg-white text-greenbeam-teal hover:bg-gray-100 active:bg-gray-200 transition-all duration-300">
                    <span className="relative z-20">{(settingsData as any)?.data?.website?.content?.homepageHero?.ctaText || "Shop Now"}</span>
                  </Button>
                </Link>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-greenbeam-teal active:bg-white active:text-greenbeam-teal bg-transparent relative overflow-hidden group transition-all duration-300"
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
      <section className="py-16 bg-greenbeam-teal text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <Zap className="h-12 w-12 text-white mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">High Efficiency</h3>
              <p className="text-white/90">Premium quality equipment with maximum energy output</p>
            </div>
            <div className="text-center">
              <Shield className="h-12 w-12 text-white mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">25-Year Warranty</h3>
              <p className="text-white/90">Long-term protection for your investment</p>
            </div>
            <div className="text-center">
              <Truck className="h-12 w-12 text-white mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Free Installation</h3>
              <p className="text-white/90">Professional installation included with every purchase</p>
            </div>
            <div className="text-center">
              <Leaf className="h-12 w-12 text-white mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Eco-Friendly</h3>
              <p className="text-white/90">Reduce your carbon footprint and save money</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-greenbeam-teal text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Shop by Category</h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Discover our comprehensive range of sustainable energy solutions
            </p>
          </div>
          
          {categoriesLoadingState && !categoriesErrorState ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
              {Array.from({ length: CATEGORY_SKELETON_COUNT }).map((_, index) => (
                <Card key={index} className="h-full border-0 bg-white/20">
                  <CardContent className="p-6 text-center h-full flex flex-col justify-center">
                    <Skeleton className="w-14 h-14 rounded-full mx-auto mb-4 bg-white/40" />
                    <Skeleton className="h-5 w-24 mx-auto mb-2 bg-white/40" />
                    <Skeleton className="h-4 w-16 mx-auto bg-white/40" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : categoriesErrorState ? (
            <div className="text-center py-8">
              <p className="text-white/90 mb-4">Unable to load categories. Please try again later.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
              {categories.map((category: any, index: number) => (
                <Link 
                  key={index} 
                  href={`/products?category=${encodeURIComponent(category.name)}`}
                  className="group"
                >
                  <Card className="h-full hover:shadow-xl transition-all duration-300 cursor-pointer border border-transparent bg-white/80 backdrop-blur-sm hover:bg-white hover:scale-105 hover:-translate-y-2 group-hover:shadow-2xl group-hover:shadow-teal-200/50 group-hover:border-teal-200">
                    <CardContent className="p-6 text-center h-full flex flex-col justify-center">
                      <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                        {category.icon}
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-2 text-sm lg:text-base group-hover:text-greenbeam-teal transition-colors duration-300">
                        {category.name}
                      </h3>
                      <div className="flex items-center justify-center space-x-1">
                        <span className="text-xs text-gray-500 group-hover:text-greenbeam-teal transition-colors duration-300">
                          {category.count}
                        </span>
                        <span className="text-xs text-gray-400 group-hover:text-teal-600 transition-colors duration-300">
                          products
                        </span>
                      </div>
                      
                      {/* Hover indicator */}
                      <div className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="w-8 h-1 bg-greenbeam-teal rounded-full mx-auto"></div>
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
              <Button className="bg-white text-greenbeam-teal hover:bg-gray-100 border border-greenbeam-teal px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95">
                <span className="relative z-20">View All Categories</span>
                <span className="ml-2 relative z-20">→</span>
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-greenbeam-teal text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold">Featured Products</h2>
            <Link href="/products">
              <Button className="bg-white text-greenbeam-teal hover:bg-gray-100 border-0">
                View All Products
              </Button>
            </Link>
          </div>
          {productsLoading ? (
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
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
              <h3 className="text-xl font-semibold mb-2">No Products Available</h3>
              <p className="text-white/90">Check back soon for our sustainable energy solutions!</p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-greenbeam-teal text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="text-xl mb-8 text-white/90">
            Get the latest news on green energy solutions and exclusive offers
          </p>
          <div className="max-w-md mx-auto flex gap-4">
            <input type="email" placeholder="Enter your email" className="flex-1 px-4 py-2 rounded-lg text-gray-900" />
            <Button className="bg-white text-greenbeam-teal hover:bg-gray-100 active:bg-gray-200 transition-all duration-300">
              Subscribe
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="mb-4">
                <SiteLogo variant="footer" />
              </div>
              <p className="text-white/90">
                {(settingsData as any)?.data?.website?.content?.siteDescription || 'Leading provider of sustainable energy solutions for homes and businesses.'}
              </p>
              {((settingsData as any)?.data?.website?.social?.showSocialIcons ?? true) && (
                <div className="flex items-center gap-4 mt-6 text-white">
                  <Link href={(settingsData as any)?.data?.website?.social?.facebook || "https://facebook.com"} target="_blank" aria-label="Facebook" className="hover:opacity-80">
                    <Facebook className="h-5 w-5" />
                  </Link>
                  <Link href={(settingsData as any)?.data?.website?.social?.twitter || "https://twitter.com"} target="_blank" aria-label="X (Twitter)" className="hover:opacity-80">
                    <XIcon className="h-5 w-5" />
                  </Link>
                  <Link href={(settingsData as any)?.data?.website?.social?.linkedin || "https://linkedin.com"} target="_blank" aria-label="LinkedIn" className="hover:opacity-80">
                    <Linkedin className="h-5 w-5" />
                  </Link>
                  <Link href={(settingsData as any)?.data?.website?.social?.instagram || "https://instagram.com"} target="_blank" aria-label="Instagram" className="hover:opacity-80">
                    <Instagram className="h-5 w-5" />
                  </Link>
                </div>
              )}
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Products</h3>
              <ul className="space-y-2 text-white">
                <li>
                  <Link href="/products?category=Solar%20Panels" className="hover:opacity-90">Solar Panels</Link>
                </li>
                <li>
                  <Link href="/products?category=Wind%20Energy" className="hover:opacity-90">Wind Turbines</Link>
                </li>
                <li>
                  <Link href="/products?category=Energy%20Storage" className="hover:opacity-90">Battery Storage</Link>
                </li>
                <li>
                  <Link href="/products?category=Inverters" className="hover:opacity-90">Inverters</Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-white">
                <li>
                  <Link href="/about" className="hover:opacity-90">About Us</Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:opacity-90">Contact</Link>
                </li>
                <li>
                  <Link href="/careers" className="hover:opacity-90">Careers</Link>
                </li>
                <li>
                  <Link href="/blog" className="hover:opacity-90">Blog</Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-white">
                <li>
                  <Link href="/help" className="hover:opacity-90">Help Center</Link>
                </li>
                <li>
                  <Link href="/warranty" className="hover:opacity-90">Warranty</Link>
                </li>
                <li>
                  <Link href="/installation" className="hover:opacity-90">Installation</Link>
                </li>
                <li>
                  <Link href="/maintenance" className="hover:opacity-90">Maintenance</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>{(settingsData as any)?.data?.website?.content?.footer?.copyrightText || `© ${new Date().getFullYear()} Greenbeam. All rights reserved.`}</p>
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
