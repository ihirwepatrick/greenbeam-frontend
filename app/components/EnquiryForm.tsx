"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { X, Send, CheckCircle, AlertCircle, Phone, Mail, MapPin } from "lucide-react"
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
    message: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState("")

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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

    try {
      // Create enquiry using the API service
      const enquiryData = {
        name: `${formData.firstName} ${formData.lastName}`.trim(),
        email: formData.email,
        subject: formData.subject,
        message: formData.message
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
          message: ""
        })
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
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Enquiry Submitted!</h3>
              <p className="text-gray-600 mb-6">
                Thank you for your enquiry. We'll get back to you within 24 hours.
              </p>
              <Button onClick={onClose} className="bg-[#0a6650] hover:bg-[#084c3d]">
                Close
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {product && (
                <Card className="bg-gray-50">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Product Details</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                        <span className="text-2xl">🔋</span>
                      </div>
                      <div>
                        <h4 className="font-semibold">{product.name}</h4>
                        <Badge variant="secondary">{product.category}</Badge>
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
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="mt-1"
                  />
                </div>
              </div>

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