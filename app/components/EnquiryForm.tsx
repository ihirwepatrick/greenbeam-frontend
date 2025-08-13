"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { X, Send, CheckCircle, AlertCircle, Phone, Mail, MapPin, Star } from "lucide-react"
import Image from "next/image"
import { Product } from "../../lib/types/api"
import { enquiryService } from "../../lib/services/api"
import { useAuth } from "../../contexts/AuthContext"

interface EnquiryFormProps {
  isOpen: boolean
  onClose: () => void
  product?: Product
}

export default function EnquiryForm({ isOpen, onClose, product }: EnquiryFormProps) {
  const { user, isAuthenticated } = useAuth()
  
  const [formData, setFormData] = useState({
    firstName: user?.name?.split(' ')[0] || "",
    lastName: user?.name?.split(' ').slice(1).join(' ') || "",
    email: user?.email || "",
    phone: "",
    subject: product ? `Enquiry about ${product.name}` : "",
    message: product ? `Hi, I'm interested in learning more about ${product.name}. Could you please provide more information about:\n\n- Pricing and availability\n- Technical specifications\n- Warranty details\n- Installation requirements\n\nThank you!` : "",
    priority: "MEDIUM" as "LOW" | "MEDIUM" | "HIGH"
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState("")

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")

    // Basic validation
    if (!formData.firstName.trim() || !formData.lastName.trim()) {
      setError("Please enter your first and last name.")
      setIsSubmitting(false)
      return
    }

    if (!formData.email.trim()) {
      setError("Please enter your email address.")
      setIsSubmitting(false)
      return
    }

    if (!formData.subject.trim()) {
      setError("Please enter a subject for your enquiry.")
      setIsSubmitting(false)
      return
    }

    if (!formData.message.trim()) {
      setError("Please enter your message.")
      setIsSubmitting(false)
      return
    }

    try {
      // Create enquiry using the enhanced API service
      const enquiryData = {
        customerName: `${formData.firstName} ${formData.lastName}`.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim() || undefined,
        product: product?.name || undefined,
        subject: formData.subject.trim(),
        message: formData.message.trim(),
        priority: formData.priority
      }

      const response = await enquiryService.createEnquiry(enquiryData)
      
      if (response.success) {
        setIsSubmitted(true)
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
          priority: "MEDIUM"
        })
        
        // Auto-close after 3 seconds on successful submission
        setTimeout(() => {
          onClose()
          setIsSubmitted(false)
        }, 3000)
      } else {
        setError("Failed to submit enquiry. Please try again.")
      }
    } catch (error) {
      console.error("Enquiry submission failed:", error)
      setError("An error occurred while submitting your enquiry. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Product Enquiry</h2>
              {product && (
                <p className="text-gray-600 mt-1">Enquiring about: {product.name}</p>
              )}
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-6 w-6" />
            </Button>
          </div>

          {isSubmitted ? (
            <div className="text-center py-8">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Enquiry Submitted Successfully!</h3>
              <p className="text-gray-600 mb-4">
                Thank you for your interest in {product?.name || 'our products'}. We've received your enquiry and our team will get back to you within 24 hours.
              </p>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                <h4 className="font-medium text-green-800 mb-2">What happens next?</h4>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>• A confirmation email has been sent to {formData.email || 'your email'}</li>
                  <li>• Our sales team will review your enquiry</li>
                  <li>• We'll respond with detailed product information and pricing</li>
                  <li>• For urgent matters, call us at +250 788 123 456</li>
                </ul>
              </div>
              <div className="text-center text-sm text-gray-500 mb-4">
                This window will close automatically in a few seconds
              </div>
              <Button onClick={onClose} className="bg-[#0a6650] hover:bg-[#084c3d]">
                Close Now
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {product && (
                <Card className="bg-gradient-to-r from-green-50 to-green-100 border-green-200">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg text-green-800">Product Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-start space-x-4">
                      <div className="w-20 h-20 bg-white rounded-lg overflow-hidden flex items-center justify-center border border-green-200">
                        {product.image ? (
                          <Image
                            src={product.image}
                            alt={product.name}
                            width={80}
                            height={80}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="text-3xl">🔋</span>
                        )}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 mb-1">{product.name}</h4>
                        <div className="flex items-center space-x-2 mb-2">
                          <Badge variant="secondary" className="bg-green-100 text-green-800">
                            {product.category}
                          </Badge>
                          {product.status && (
                            <Badge variant="outline" className="text-xs">
                              {product.status.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                            </Badge>
                          )}
                        </div>
                        {product.rating && (
                          <div className="flex items-center text-sm text-gray-600">
                            <Star className="h-4 w-4 text-yellow-400 mr-1" />
                            <span>{Number(product.rating).toFixed(1)}</span>
                            {product.reviews && <span className="ml-1">({product.reviews} reviews)</span>}
                          </div>
                        )}
                        {product.description && (
                          <p className="text-sm text-gray-600 mt-2 line-clamp-2">{product.description}</p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    className="mt-1"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="e.g., +250 788 123 456"
                    className="mt-1"
                  />
                  <p className="text-xs text-gray-500 mt-1">Optional - For faster response</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="subject">Subject *</Label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="priority">Priority</Label>
                  <select
                    id="priority"
                    name="priority"
                    value={formData.priority}
                    onChange={handleInputChange}
                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="LOW">Low - General inquiry</option>
                    <option value="MEDIUM">Medium - Standard request</option>
                    <option value="HIGH">High - Urgent or time-sensitive</option>
                  </select>
                  <p className="text-xs text-gray-500 mt-1">High priority for urgent requests only</p>
                </div>
              </div>

              <div>
                <Label htmlFor="message">Message *</Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  placeholder="Please provide details about your enquiry, including any specific questions or requirements..."
                  className="mt-1"
                />
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-md p-4">
                  <div className="flex">
                    <AlertCircle className="h-5 w-5 text-red-600 mt-0.5" />
                    <div className="ml-3">
                      <p className="text-sm text-red-800">{error}</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex justify-end space-x-3 pt-4">
                <Button type="button" variant="outline" onClick={onClose}>
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="bg-[#0a6650] hover:bg-[#084c3d]"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      Submit Enquiry
                    </>
                  )}
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
} 