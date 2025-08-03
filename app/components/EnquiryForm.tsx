"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { X, Send, CheckCircle, AlertCircle, Phone, Mail, MapPin } from "lucide-react"
import EmailService from "./EmailService"

interface EnquiryFormProps {
  isOpen: boolean
  onClose: () => void
  product?: {
    id: number
    name: string
    category: string
    description: string
  }
}

export default function EnquiryForm({ isOpen, onClose, product }: EnquiryFormProps) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
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
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Create enquiry object
      const enquiry = {
        id: `ENQ-${Date.now()}`,
        customerName: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        phone: formData.phone,
        product: product?.name || "General Inquiry",
        subject: formData.subject,
        message: formData.message,
        status: "New",
        priority: "Medium",
        createdAt: new Date().toLocaleString(),
        lastUpdated: new Date().toLocaleString(),
        location: "Website Form",
        source: "Product Enquiry"
      }

      // In a real app, you would send this to your API
      console.log("Enquiry submitted:", enquiry)
      
      // Send confirmation email to customer
      const customerEmailSent = await EmailService.sendCustomerConfirmation(
        formData.email,
        `${formData.firstName} ${formData.lastName}`,
        product?.name || "General Inquiry",
        enquiry.id
      )
      
      // Send notification email to admin
      const adminEmailSent = await EmailService.sendAdminNotification(
        "admin@greenbeam.com", // Admin email
        `${formData.firstName} ${formData.lastName}`,
        product?.name || "General Inquiry",
        enquiry.id
      )
      
      if (customerEmailSent) {
        console.log("✅ Confirmation email sent to customer")
      }
      
      if (adminEmailSent) {
        console.log("✅ Notification email sent to admin")
      }
      
      setIsSubmitted(true)
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        subject: "",
        message: ""
      })
    } catch (err) {
      setError("Failed to submit enquiry. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    if (!isSubmitting) {
      onClose()
      setIsSubmitted(false)
      setError("")
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Product Enquiry</h2>
              {product && (
                <div className="flex items-center space-x-2 mt-2">
                  <Badge variant="outline">{product.category}</Badge>
                  <span className="text-gray-600">{product.name}</span>
                </div>
              )}
            </div>
            <Button variant="ghost" size="sm" onClick={handleClose} disabled={isSubmitting}>
              <X className="h-6 w-6" />
            </Button>
          </div>

          {isSubmitted ? (
            <div className="text-center py-8">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Enquiry Submitted!</h3>
              <p className="text-gray-600 mb-6">
                Thank you for your enquiry. We've received your message and will get back to you within 24 hours.
              </p>
              <div className="bg-green-50 p-4 rounded-lg mb-6">
                <h4 className="font-semibold text-green-800 mb-2">What happens next?</h4>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>• You'll receive a confirmation email shortly</li>
                  <li>• Our team will review your enquiry within 24 hours</li>
                  <li>• We'll contact you with detailed information and pricing</li>
                  <li>• You can track your enquiry status in your email</li>
                </ul>
              </div>
              <Button onClick={handleClose} className="bg-[#0a6650] hover:bg-[#084c3d]">
                Close
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center space-x-2">
                  <AlertCircle className="h-5 w-5 text-red-500" />
                  <span className="text-red-700">{error}</span>
                </div>
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
                    placeholder="John"
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
                    placeholder="Doe"
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
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+250 788 123 456"
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
                  placeholder="Product availability and pricing inquiry"
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
                  placeholder="Please provide details about your requirements, timeline, and any specific questions you have..."
                  rows={5}
                />
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Contact Information</h4>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 mr-2" />
                    <span>+250 788 123 456</span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 mr-2" />
                    <span>info@greenbeam.com</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span>Kigali, Rwanda</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 bg-[#0a6650] hover:bg-[#084c3d]"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      Send Enquiry
                    </>
                  )}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleClose}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
} 