"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Product } from "../lib/types/api"
import { MessageCircle, Eye, ChevronLeft, ChevronRight, ShoppingCart, Plus, Minus, Check } from "lucide-react"
import { useCart } from "../contexts/CartContext"
import { useAuth } from "../contexts/AuthContext"

interface ProductCardProps {
  product: Product
  onEnquire?: (product: Product) => void
  showActions?: boolean
  compact?: boolean
}

export default function ProductCard({ 
  product, 
  onEnquire, 
  showActions = true, 
  compact = false 
}: ProductCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const [quantity, setQuantity] = useState(1)
  const [justAdded, setJustAdded] = useState(false)
  const { addToCart, isInCart, getCartItemQuantity, updateCartItem, loading } = useCart()
  const { isAuthenticated } = useAuth()
  
  
  const rating = Number(product.rating) || 0
  const reviews = product.reviews || 0
  const productId = Number(product.id)
  const isProductInCart = isInCart(productId)
  const cartQuantity = getCartItemQuantity(productId)

  // Reset justAdded state after 2 seconds
  useEffect(() => {
    if (justAdded) {
      const timer = setTimeout(() => {
        setJustAdded(false)
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [justAdded])
  
  
  // Get all available images (thumbnail + gallery)
  const allImages = [
    product.image,
    ...(product.images || [])
  ].filter(Boolean) as string[]

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % allImages.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length)
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
  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault()
    
    try {
      if (isProductInCart) {
        // Update quantity if already in cart
        await updateCartItem(productId, { quantity: cartQuantity + quantity })
      } else {
        // Add new item to cart with full product data
        await addToCart({ 
          productId, 
          quantity,
          product: {
            id: productId,
            name: product.name,
            description: product.description,
            category: product.category,
            image: product.image,
            images: product.images,
            price: '0.00', // Price will be set when product details are loaded
            createdAt: product.createdAt
          }
        } as any)
      }
      
      // Show success state
      setJustAdded(true)
    } catch (error) {
      console.error('Error adding to cart:', error)
    }
  }

  const handleQuantityChange = (delta: number) => {
    setQuantity(Math.max(1, quantity + delta))
  }
  const isAvailable = product.status?.toLowerCase() === 'available' || !product.status

  const formatStatus = (status?: string) => {
    if (!status) return 'Available'
    return status.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
  }


  return (
    <Card 
      className="hover:shadow-xl transition-all duration-300 h-full flex flex-col group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardHeader className="p-0 relative overflow-hidden">
        <div className="relative">
          <Image
            src={allImages[currentImageIndex] || "/placeholder.svg"}
            alt={product.name}
            width={300}
            height={compact ? 200 : 300}
            className={`w-full ${compact ? 'h-48' : 'h-64'} object-cover transition-all duration-500 group-hover:scale-110`}
          />
          
          {/* Image overlay with slideshow controls */}
          {allImages.length > 1 && (
            <div className={`absolute inset-0 bg-black/20 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
              <div className="absolute inset-0 flex items-center justify-between p-2">
                <button
                  onClick={(e) => { e.preventDefault(); prevImage() }}
                  className="bg-white/80 hover:bg-white text-gray-800 p-1 rounded-full"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  onClick={(e) => { e.preventDefault(); nextImage() }}
                  className="bg-white/80 hover:bg-white text-gray-800 p-1 rounded-full"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
              
              {/* Image indicators */}
              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
                {allImages.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all duration-200 ${
                      index === currentImageIndex 
                        ? 'bg-white scale-125' 
                        : 'bg-white/50 hover:bg-white/80'
                    }`}
                  />
                ))}
              </div>
            </div>
          )}
          
          {/* Status badge */}
          {product.status && (
            <Badge 
              className={`absolute top-2 right-2 ${getStatusColor(product.status)} transition-all duration-200 group-hover:scale-110`}
            >
              {formatStatus(product.status)}
            </Badge>
          )}
          
          {/* Image count badge */}
          {allImages.length > 1 && (
            <Badge className="absolute top-2 left-2 bg-black/70 text-white text-xs">
              {currentImageIndex + 1}/{allImages.length}
            </Badge>
          )}
        </div>
      </CardHeader>
      
      <CardContent className={`${compact ? 'p-4' : 'p-6'} flex-1 flex flex-col justify-between`}>
        <div>
          <div className="flex items-center justify-between mb-2">
            <Badge variant="secondary" className="text-xs transition-all duration-200 group-hover:bg-green-100 group-hover:text-green-800">
              {product.category}
            </Badge>
            {rating > 0 && (
              <div className="flex items-center">
                <div className="flex text-yellow-400 text-sm">
                  {"★".repeat(Math.floor(rating))}
                  {"☆".repeat(5 - Math.floor(rating))}
                </div>
                <span className="text-xs text-gray-600 ml-1">
                  ({reviews})
                </span>
              </div>
            )}
          </div>
          
          <CardTitle className={`${compact ? 'text-base' : 'text-lg'} mb-2 line-clamp-2 transition-colors duration-200 group-hover:text-green-700`}>
            {product.name}
          </CardTitle>
          
          <p className={`text-gray-600 ${compact ? 'text-xs' : 'text-sm'} mb-3 line-clamp-2 transition-colors duration-200 group-hover:text-gray-800`}>
            {product.description}
          </p>

          {product.features && product.features.length > 0 && (
            <div className="mb-3">
              <div className="flex flex-wrap gap-1">
                {product.features.slice(0, compact ? 2 : 3).map((feature, index) => (
                  <Badge 
                    key={index} 
                    variant="outline" 
                    className="text-xs px-1.5 py-0.5 transition-all duration-200 hover:bg-green-50 hover:border-green-200"
                  >
                    {feature}
                  </Badge>
                ))}
                {product.features.length > (compact ? 2 : 3) && (
                  <Badge variant="outline" className="text-xs px-1.5 py-0.5">
                    +{product.features.length - (compact ? 2 : 3)} more
                  </Badge>
                )}
              </div>
            </div>
          )}
        </div>

        {showActions && (
          <div className="space-y-3 mt-4">
            {/* Cart functionality - Always show for both guest and authenticated users */}
            <div className="space-y-2">
              {/* Quantity selector */}
              <div className="flex items-center justify-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={(e) => { e.preventDefault(); handleQuantityChange(-1) }}
                  disabled={quantity <= 1}
                  className="h-8 w-8 p-0"
                >
                  <Minus className="h-3 w-3" />
                </Button>
                <span className="text-sm font-medium min-w-[2rem] text-center">
                  {quantity}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={(e) => { e.preventDefault(); handleQuantityChange(1) }}
                  className="h-8 w-8 p-0"
                >
                  <Plus className="h-3 w-3" />
                </Button>
              </div>
              
              {/* Add to Cart button */}
              <Button
                onClick={handleAddToCart}
                disabled={!isAvailable || loading}
                size={compact ? "sm" : "default"}
                className={`w-full transition-all duration-300 ${
                  justAdded 
                    ? 'bg-green-600 hover:bg-green-700 scale-105' 
                    : isProductInCart 
                      ? 'bg-[#0a6650] hover:bg-[#0a6650]/90' 
                      : 'bg-[#0a6650] hover:bg-[#0a6650]/90'
                } text-white`}
              >
                <span className="flex items-center">
                  {justAdded ? (
                    <>
                      <Check className="h-4 w-4 mr-2" />
                      Added!
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      {loading ? 'Adding...' : isProductInCart ? 'Update Cart' : 'Add to Cart'}
                    </>
                  )}
                </span>
              </Button>
              
              {isProductInCart && !justAdded && (
                <p className="text-xs text-[#0a6650] text-center">
                  Already in cart ({cartQuantity} items)
                </p>
              )}
              
              {justAdded && (
                <p className="text-xs text-green-600 text-center font-medium animate-pulse">
                  ✓ Successfully added to cart!
                </p>
              )}
              

            </div>
            
            {/* Action buttons */}
            <div className="flex items-center gap-2">
            <Link href={`/products/${product.id}`} className="flex-1">
              <Button 
                variant="outline" 
                size={compact ? "sm" : "default"} 
                className="w-full"
              >
                <span className="flex items-center">
                  <Eye className="h-4 w-4 mr-2" />
                  View Details
                </span>
              </Button>
            </Link>
            
            {onEnquire && (
              <Button 
                onClick={() => onEnquire(product)}
                size={compact ? "sm" : "default"}
                className="bg-[#0a6650] hover:bg-[#084c3d] active:bg-[#063a2e] flex-1"
              >
                <span className="flex items-center">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Enquire
                </span>
              </Button>
            )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
} 