"use client"

import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MessageCircle, Eye } from "lucide-react"
import { Product } from "../lib/types/api"

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
  const rating = Number(product.rating) || 0
  const reviews = product.reviews || 0

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
    <Card className="hover:shadow-lg transition-shadow duration-200 h-full flex flex-col">
      <CardHeader className="p-0">
        <div className="relative">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            width={300}
            height={compact ? 200 : 300}
            className={`w-full ${compact ? 'h-48' : 'h-64'} object-cover rounded-t-lg`}
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
      
      <CardContent className={`${compact ? 'p-4' : 'p-6'} flex-1 flex flex-col justify-between`}>
        <div>
          <div className="flex items-center justify-between mb-2">
            <Badge variant="secondary" className="text-xs">
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
          
          <CardTitle className={`${compact ? 'text-base' : 'text-lg'} mb-2 line-clamp-2`}>
            {product.name}
          </CardTitle>
          
          <p className={`text-gray-600 ${compact ? 'text-xs' : 'text-sm'} mb-3 line-clamp-2`}>
            {product.description}
          </p>

          {product.features && product.features.length > 0 && (
            <div className="mb-3">
              <div className="flex flex-wrap gap-1">
                {product.features.slice(0, compact ? 2 : 3).map((feature, index) => (
                  <Badge 
                    key={index} 
                    variant="outline" 
                    className="text-xs px-1.5 py-0.5"
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
          <div className="flex items-center justify-between gap-2 mt-4">
            <Link href={`/products/${product.id}`} className="flex-1">
              <Button variant="outline" size={compact ? "sm" : "default"} className="w-full">
                <Eye className="h-4 w-4 mr-2" />
                View Details
              </Button>
            </Link>
            
            {onEnquire && (
              <Button 
                onClick={() => onEnquire(product)}
                size={compact ? "sm" : "default"}
                className="bg-[#0a6650] hover:bg-[#084c3d] flex-1"
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                Enquire
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
} 