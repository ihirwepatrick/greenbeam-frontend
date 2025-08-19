"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Leaf, Star, ArrowLeft, MessageCircle, User, LogOut, Heart, Share2, CheckCircle2 } from "lucide-react"
import { useAuth } from "../../../contexts/AuthContext"
import { useProduct } from "../../../hooks/use-api"
import { productService } from "../../../lib/services/api"
import EnquiryForm from "../../components/EnquiryForm"
import { Product } from "../../../lib/types/api"
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip"

export default function ProductDetailPage() {
  const routeParams = useParams<{ id: string }>()
  const id = routeParams?.id as string
  const { user, isAuthenticated, logout } = useAuth()
  const [showEnquiryForm, setShowEnquiryForm] = useState(false)
  const [userRating, setUserRating] = useState<number>(0)
  const [submittingRating, setSubmittingRating] = useState<boolean>(false)
  const [currentRating, setCurrentRating] = useState<number>(0)
  const [currentReviews, setCurrentReviews] = useState<number>(0)
  const [showRatingSuccess, setShowRatingSuccess] = useState<boolean>(false)
  
  const { data: product, loading, error } = useProduct(id)

  const handleEnquireNow = () => {
    setShowEnquiryForm(true)
  }

  const closeEnquiryForm = () => {
    setShowEnquiryForm(false)
  }

  const handleLogout = async () => {
    await logout()
  }

  // Sync rating state when product loads
  useEffect(() => {
    if (product) {
      setCurrentRating(Number(product.rating) || 0)
      setCurrentReviews((product as any).reviews || 0)
    }
  }, [product])

  const submitProductRating = async () => {
    if (!userRating) return
    setSubmittingRating(true)
    try {
      const response: any = await productService.rateProduct(id, { rating: userRating })
      if (response?.success) {
        const newRating = response.data?.rating ?? response.data?.newRating ?? currentRating
        const newReviews = response.data?.reviews ?? currentReviews + 1
        setCurrentRating(Number(newRating) || 0)
        setCurrentReviews(Number(newReviews) || 0)
        setUserRating(0)
        setShowRatingSuccess(true)
        setTimeout(() => setShowRatingSuccess(false), 2000)
      }
    } catch (e) {
      // no-op; could add a toast here
    } finally {
      setSubmittingRating(false)
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

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
            <span className="ml-3 text-lg">Loading product...</span>
          </div>
        </div>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-20">
            <div className="text-6xl mb-4">❌</div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
            <p className="text-gray-600 mb-6">The product you're looking for doesn't exist or has been removed.</p>
            <Link href="/products">
              <Button className="bg-[#0a6650] hover:bg-[#084c3d]">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Products
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const rating = currentRating
  const reviews = currentReviews

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
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

      {/* Breadcrumb */}
      <div className="bg-gray-50 py-4">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2">
              <li>
                <Link href="/" className="text-gray-500 hover:text-gray-700">
                  Home
                </Link>
              </li>
              <li className="flex items-center">
                <span className="mx-2 text-gray-400">/</span>
                <Link href="/products" className="text-gray-500 hover:text-gray-700">
                  Products
                </Link>
              </li>
              <li className="flex items-center">
                <span className="mx-2 text-gray-400">/</span>
                <Link href={`/products?category=${encodeURIComponent(product.category)}`} className="text-gray-500 hover:text-gray-700">
                  {product.category}
                </Link>
              </li>
              <li className="flex items-center">
                <span className="mx-2 text-gray-400">/</span>
                <span className="text-gray-900 font-medium">{product.name}</span>
              </li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Product Details */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div>
            <div className="mb-4 relative">
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                width={600}
                height={600}
                className="w-full h-96 object-cover rounded-lg"
              />
              {product.status && (
                <Badge 
                  className={`absolute top-4 right-4 ${getStatusColor(product.status)}`}
                >
                  {formatStatus(product.status)}
                </Badge>
              )}
            </div>
            {product.images && product.images.length > 0 && (
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((image, index) => (
                  <Image
                    key={index}
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    width={150}
                    height={150}
                    className="w-full h-24 object-cover rounded-lg cursor-pointer hover:opacity-80"
                  />
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <Badge variant="secondary">
                  {product.category}
                </Badge>
                {rating > 0 && (
                  <div className="flex items-center">
                    <div className="flex text-yellow-400">
                      {"★".repeat(Math.floor(rating))}
                      {"☆".repeat(5 - Math.floor(rating))}
                    </div>
                    <span className="text-gray-600 ml-2">
                      ({reviews} reviews)
                    </span>
                  </div>
                )}
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
            </div>

            <div className="mb-6">
              <p className="text-gray-700 text-lg leading-relaxed">{product.description}</p>
            </div>

            {/* Rating */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-2">Rate this product</h3>
              <TooltipProvider>
                <Tooltip open={showRatingSuccess}>
                  <div className="flex items-center">
                    <TooltipTrigger asChild>
                      <div className="flex items-center">
                        {[1,2,3,4,5].map((n) => (
                          <button
                            key={n}
                            type="button"
                            onClick={() => setUserRating(n)}
                            className="mr-1"
                            aria-label={`Rate ${n} star${n>1 ? 's' : ''}`}
                          >
                            <Star className={n <= (userRating || Math.round(currentRating)) ? "text-yellow-400 h-6 w-6" : "text-gray-300 h-6 w-6"} />
                          </button>
                        ))}
                        <span className="ml-3 text-sm text-gray-600">{rating.toFixed(1)} ({reviews})</span>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent side="top" className="flex items-center space-x-2 bg-green-600 text-white border-green-700">
                      <CheckCircle2 className="h-4 w-4" />
                      <span>Rating submitted successfully</span>
                    </TooltipContent>
                  </div>
                </Tooltip>
              </TooltipProvider>
              <Button
                size="sm"
                className="mt-3 bg-[#0a6650] hover:bg-[#084c3d]"
                onClick={submitProductRating}
                disabled={!userRating || submittingRating}
              >
                {submittingRating ? "Submitting..." : "Submit Rating"}
              </Button>
            </div>

            {product.features && product.features.length > 0 && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-3">Key Features</h3>
                <div className="grid grid-cols-1 gap-3">
                  {product.features.map((feature, index) => (
                    <div key={index} className="flex items-center text-gray-600">
                      <div className="h-2 w-2 bg-[#0a6650] rounded-full mr-3"></div>
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="space-y-4">
              <Button 
                onClick={handleEnquireNow}
                className="w-full bg-[#0a6650] hover:bg-[#084c3d] py-3"
                size="lg"
              >
                <MessageCircle className="h-5 w-5 mr-2" />
                Enquire About This Product
              </Button>
              
              <div className="flex space-x-3">
                <Button variant="outline" className="flex-1">
                  <Heart className="h-4 w-4 mr-2" />
                  Add to Wishlist
                </Button>
                <Button variant="outline" className="flex-1">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-8">Product Specifications</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Technical Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Category:</span>
                  <span className="font-medium">{product.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Rating:</span>
                  <span className="font-medium">{rating}/5 ({reviews} reviews)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Status:</span>
                  <Badge className={getStatusColor(product.status)}>
                    {formatStatus(product.status)}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Added:</span>
                  <span className="font-medium">
                    {new Date(product.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Installation & Support</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center text-gray-600">
                  <div className="h-2 w-2 bg-green-500 rounded-full mr-3"></div>
                  Professional installation included
                </div>
                <div className="flex items-center text-gray-600">
                  <div className="h-2 w-2 bg-green-500 rounded-full mr-3"></div>
                  24/7 technical support
                </div>
                <div className="flex items-center text-gray-600">
                  <div className="h-2 w-2 bg-green-500 rounded-full mr-3"></div>
                  Maintenance services available
                </div>
                <div className="flex items-center text-gray-600">
                  <div className="h-2 w-2 bg-green-500 rounded-full mr-3"></div>
                  Training and documentation
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Related Products CTA */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold mb-4">Looking for More Options?</h2>
          <p className="text-gray-600 mb-6">
            Explore our complete range of sustainable energy solutions
          </p>
          <Link href="/products">
            <Button variant="outline" size="lg">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Browse All Products
            </Button>
          </Link>
        </div>
      </div>

      {/* Enquiry Form Modal */}
      {showEnquiryForm && (
        <EnquiryForm 
          isOpen={showEnquiryForm} 
          onClose={closeEnquiryForm} 
          product={product}
        />
      )}
    </div>
  )
}
