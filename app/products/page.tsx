"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Leaf, Star, ArrowRight, Search } from "lucide-react"

const products = [
  {
    id: 1,
    name: "Solar Panel Kit 400W",
    category: "Solar Panels",
    description: "High-efficiency solar panel kit perfect for residential installations. Includes mounting hardware and installation guide.",
    image: "/placeholder.svg?height=300&width=400",
    features: ["400W output", "25-year warranty", "Easy installation", "Weather resistant"],
    rating: 4.8,
    reviews: 124,
    status: "Available"
  },
  {
    id: 2,
    name: "Wind Turbine Generator 1000W",
    category: "Wind Energy",
    description: "Residential wind turbine generator designed for optimal energy production in moderate wind conditions.",
    image: "/placeholder.svg?height=300&width=400",
    features: ["1000W output", "Low noise design", "Automatic braking", "10-year warranty"],
    rating: 4.6,
    reviews: 89,
    status: "Available"
  },
  {
    id: 3,
    name: "Battery Storage System 10kWh",
    category: "Energy Storage",
    description: "Advanced lithium-ion battery storage system for storing excess solar energy for later use.",
    image: "/placeholder.svg?height=300&width=400",
    features: ["10kWh capacity", "Smart monitoring", "10-year warranty", "Expandable"],
    rating: 4.9,
    reviews: 67,
    status: "Not Available"
  },
  {
    id: 4,
    name: "Hybrid Inverter 5000W",
    category: "Inverters",
    description: "Hybrid inverter that can work with both solar panels and battery storage systems.",
    image: "/placeholder.svg?height=300&width=400",
    features: ["5000W output", "Hybrid capability", "Grid-tied", "Monitoring included"],
    rating: 4.7,
    reviews: 156,
    status: "Available"
  },
  {
    id: 5,
    name: "Solar Panel Kit 600W",
    category: "Solar Panels",
    description: "Premium solar panel kit with higher efficiency and advanced monitoring capabilities.",
    image: "/placeholder.svg?height=300&width=400",
    features: ["600W output", "Premium efficiency", "Smart monitoring", "30-year warranty"],
    rating: 4.9,
    reviews: 203,
    status: "Not Available"
  },
  {
    id: 6,
    name: "Monitoring System Pro",
    category: "Monitoring",
    description: "Professional monitoring system for tracking energy production and system performance.",
    image: "/placeholder.svg?height=300&width=400",
    features: ["Real-time monitoring", "Mobile app", "Performance alerts", "Data analytics"],
    rating: 4.5,
    reviews: 78,
    status: "Available"
  }
]

const categories = [
  "All Products",
  "Solar Panels",
  "Wind Energy", 
  "Energy Storage",
  "Inverters",
  "Monitoring"
]

export default function ProductsPage() {
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
              <Link href="/contact">
                <Button variant="outline" size="sm">
                  Contact Us
                </Button>
              </Link>
              <Link href="/login">
                <Button size="sm">Login</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-[#0a6650] to-[#084c3d] text-white py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Our Products</h1>
          <p className="text-xl mb-8 text-green-100 max-w-3xl mx-auto">
            Discover our comprehensive range of renewable energy solutions designed to power your sustainable future.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                placeholder="Search for products..."
                className="w-full pl-12 pr-4 py-3 text-lg bg-white text-gray-900 placeholder-gray-500 rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Category Tabs */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-2 overflow-x-auto">
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
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <Card key={product.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="p-0">
                  <div className="relative">
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={400}
                      height={300}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <Badge className="absolute top-4 left-4">
                      {product.category}
                    </Badge>
                    <Badge 
                      variant={product.status === "Available" ? "default" : "secondary"}
                      className={`absolute top-4 right-4 ${
                        product.status === "Available" ? "bg-green-100 text-green-800" : ""
                      }`}
                    >
                      {product.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-lg">{product.name}</h3>
                  </div>
                  
                  <p className="text-gray-600 mb-4">{product.description}</p>
                  
                  <div className="flex items-center mb-4">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(product.rating)
                              ? "text-yellow-400 fill-current"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600 ml-2">
                      {product.rating} ({product.reviews} reviews)
                    </span>
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="font-semibold mb-2">Key Features:</h4>
                    <ul className="space-y-1">
                      {product.features.map((feature, index) => (
                        <li key={index} className="flex items-center text-sm text-gray-600">
                          <div className="h-1.5 w-1.5 bg-[#0a6650] rounded-full mr-2"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button className="flex-1 bg-[#0a6650] hover:bg-[#084c3d]">
                      Learn More
                    </Button>
                    <Button variant="outline">
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#0a6650] text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Go Green?</h2>
          <p className="text-xl mb-8 text-green-100">
            Contact us to learn more about our products and get a custom quote for your renewable energy needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" className="bg-white text-[#0a6650] hover:bg-gray-100">
                Get Quote
              </Button>
            </Link>
            <Link href="/categories">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-[#0a6650]">
                Browse Categories
              </Button>
            </Link>
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
    </div>
  )
}
