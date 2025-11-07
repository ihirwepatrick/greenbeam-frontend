"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ShoppingCart, X, Plus, Minus, Trash2, ArrowRight, CreditCard } from "lucide-react"
import { useCart } from "../contexts/CartContext"
import { useAuth } from "../contexts/AuthContext"

export default function CartPreview() {
  const [isOpen, setIsOpen] = useState(false)
  const { cart, getCartCount, updateCartItem, removeFromCart, clearCart, loading } = useCart()
  const { isAuthenticated } = useAuth()

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      // Add a slight delay to prevent scroll jump
      setTimeout(() => {
        document.body.style.paddingRight = '0px'
      }, 0)
    } else {
      document.body.style.overflow = 'unset'
      document.body.style.paddingRight = '0px'
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset'
      document.body.style.paddingRight = '0px'
    }
  }, [isOpen])

  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen])

  const cartCount = getCartCount()
  const cartTotal = cart?.total || '0.00'

  const handleQuantityChange = async (productId: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      await removeFromCart(productId)
    } else {
      await updateCartItem(productId, { quantity: newQuantity })
    }
  }

  const handleRemoveItem = async (productId: number) => {
    await removeFromCart(productId)
  }

  const handleClearCart = async () => {
    if (confirm('Are you sure you want to clear your cart?')) {
      await clearCart()
    }
  }

  return (
    <>
      {/* Cart Button */}
      <Button
        variant="outline"
        size="sm"
        className="relative border-[#0a6650] text-[#0a6650] hover:bg-[#0a6650] hover:text-white transition-colors"
        onClick={() => setIsOpen(true)}
      >
        <ShoppingCart className="h-4 w-4 mr-2" />
        Cart
        {cartCount > 0 && (
          <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
            {cartCount}
          </Badge>
        )}
      </Button>

      {/* Side Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Enhanced Backdrop */}
          <div 
            className="absolute inset-0 bg-black/70 backdrop-blur-md transition-opacity duration-300"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Side Panel - Full height, slides in from right */}
          <div className="relative w-full max-w-lg sm:max-w-md md:max-w-lg lg:max-w-md xl:max-w-lg bg-white shadow-2xl border-l border-gray-200 flex flex-col h-screen transform transition-transform duration-300 ease-in-out animate-in slide-in-from-right">
            {/* Header */}
            <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200 bg-white sticky top-0 z-10">
              <div className="flex-1">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                  Shopping Cart
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  {cartCount} {cartCount === 1 ? 'item' : 'items'}
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="h-10 w-10 p-0 hover:bg-gray-100 rounded-full"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Cart Items - Takes remaining space */}
            <div className="flex-1 overflow-y-auto bg-gray-50 min-h-0">
              {cart?.items && cart.items.length > 0 ? (
                <div className="p-3 sm:p-4 md:p-6 space-y-3 sm:space-y-4">
                  {cart.items.map((item) => (
                    <Card key={item.id} className="p-3 sm:p-4 bg-white shadow-sm border border-gray-200">
                      <div className="flex items-start space-x-3 sm:space-x-4">
                        {/* Product Image */}
                        <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          {item.product.image && item.product.image !== '/placeholder.svg' ? (
                            <Image
                              src={item.product.image}
                              alt={item.product.name}
                              width={64}
                              height={64}
                              className="rounded-lg object-cover w-full h-full"
                            />
                          ) : (
                            <ShoppingCart className="h-5 w-5 sm:h-6 sm:w-6 text-gray-400" />
                          )}
                        </div>

                        {/* Product Details */}
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-gray-900 text-sm sm:text-base line-clamp-2 leading-tight">
                            {item.product.name}
                          </h4>
                          <p className="text-xs sm:text-sm text-gray-500 mt-1">
                            ${parseFloat(item.price).toFixed(2)} each
                          </p>
                          
                          {/* Quantity Controls */}
                          <div className="flex items-center space-x-2 mt-2 sm:mt-3">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleQuantityChange(item.productId, item.quantity - 1)}
                              disabled={loading}
                              className="h-7 w-7 sm:h-8 sm:w-8 p-0 border-gray-300 hover:border-[#0a6650] hover:text-[#0a6650]"
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="text-sm font-medium min-w-[1.5rem] sm:min-w-[2rem] text-center">
                              {item.quantity}
                            </span>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleQuantityChange(item.productId, item.quantity + 1)}
                              disabled={loading}
                              className="h-7 w-7 sm:h-8 sm:w-8 p-0 border-gray-300 hover:border-[#0a6650] hover:text-[#0a6650]"
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>

                        {/* Price and Remove */}
                        <div className="flex flex-col items-end space-y-2">
                          <span className="font-semibold text-[#0a6650] text-sm sm:text-base">
                            ${parseFloat(item.total).toFixed(2)}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveItem(item.productId)}
                            disabled={loading}
                            className="h-7 w-7 sm:h-8 sm:w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full"
                          >
                            <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="flex-1 flex items-center justify-center p-4 sm:p-6 min-h-full">
                  <div className="text-center max-w-sm">
                    <div className="mb-6 sm:mb-8">
                      <ShoppingCart className="h-16 w-16 sm:h-20 sm:w-20 mx-auto text-gray-300 mb-4 sm:mb-6" />
                      <h3 className="text-lg sm:text-xl font-medium text-gray-900 mb-2">Your cart is empty</h3>
                      <p className="text-gray-500 text-sm sm:text-base">
                        Add some products to get started
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      onClick={() => setIsOpen(false)}
                      className="text-[#0a6650] border-[#0a6650] hover:bg-[#0a6650] hover:text-white w-full sm:w-auto px-6 py-2"
                    >
                      Continue Shopping
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Footer - Always at bottom */}
            {cart?.items && cart.items.length > 0 && (
              <div className="border-t border-gray-200 p-4 sm:p-6 bg-white space-y-4 mt-auto">
                {/* Total */}
                <div className="flex items-center justify-between">
                  <span className="text-base sm:text-lg font-semibold text-gray-900">Total:</span>
                  <span className="text-lg sm:text-xl font-bold text-[#0a6650]">
                    ${parseFloat(cartTotal).toFixed(2)}
                  </span>
                </div>


                {/* Action Buttons */}
                <div className="space-y-3">
                  <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                    <Button
                      variant="outline"
                      onClick={handleClearCart}
                      disabled={loading}
                      className="flex-1 text-red-600 border-red-200 hover:bg-red-50 h-10 sm:h-auto"
                    >
                      Clear Cart
                    </Button>
                    <Link href="/cart" className="flex-1" onClick={() => setIsOpen(false)}>
                      <Button
                        variant="outline"
                        className="w-full border-[#0a6650] text-[#0a6650] hover:bg-[#0a6650] hover:text-white h-10 sm:h-auto"
                      >
                        <span className="hidden sm:inline">View Full Cart</span>
                        <span className="sm:hidden">View Cart</span>
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </Link>
                  </div>

                  {/* Checkout Button */}
                  <Link href="/checkout" onClick={() => setIsOpen(false)}>
                    <Button
                      className="w-full bg-[#0a6650] hover:bg-[#0a6650]/90 text-white h-12 sm:h-12 text-base sm:text-lg font-semibold"
                    >
                      <CreditCard className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                      Proceed to Checkout
                    </Button>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}
