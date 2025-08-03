"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Database,
  Package,
  Users,
  Eye,
  Settings,
  Home,
  LogOut,
  Save,
  Plus,
  X,
  Image as ImageIcon,
  Upload,
  ArrowLeft,
} from "lucide-react"

const categories = [
  "Solar Panels",
  "Wind Energy", 
  "Energy Storage",
  "Inverters",
  "Monitoring",
  "Accessories"
]

const sidebarLinks = [
  { name: "Dashboard", href: "/admin", icon: Home },
  { name: "Products", href: "/admin/products", icon: Package },
  { name: "Enquiries", href: "/admin/enquiries", icon: Users },
  { name: "Website", href: "/admin/website", icon: Eye },
  { name: "Settings", href: "/admin/settings", icon: Settings },
]

export default function CreateProduct() {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
    status: "Available",
    images: 0,
    features: [""]
  })
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = () => {
    setIsSaving(true)
    // Simulate save operation
    setTimeout(() => {
      setIsSaving(false)
      console.log("Product created:", formData)
      // Here you would typically redirect to products list
      window.location.href = "/admin/products"
    }, 2000)
  }

  const addFeature = () => {
    setFormData(prev => ({
      ...prev,
      features: [...prev.features, ""]
    }))
  }

  const removeFeature = (index: number) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }))
  }

  const updateFeature = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.map((feature, i) => i === index ? value : feature)
    }))
  }

  const updateFormData = (field: string, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar - Fixed */}
      <div className="w-64 bg-white border-r shadow-sm flex flex-col h-screen">
        <div className="p-6">
          <Link href="/admin" className="flex items-center space-x-2">
            <Database className="h-8 w-8 text-[#0a6650]" />
            <span className="text-xl font-bold text-[#0a6650]">Admin Portal</span>
            <Badge variant="secondary" className="ml-2">v2.1</Badge>
          </Link>
        </div>
        
        <nav className="flex-1 px-4">
          <div className="space-y-2">
            {sidebarLinks.map((link) => {
              const Icon = link.icon
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    link.href === "/admin/products" 
                      ? "bg-[#0a6650] text-white" 
                      : "text-gray-700 hover:bg-gray-100 hover:text-[#0a6650]"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{link.name}</span>
                </Link>
              )
            })}
          </div>
        </nav>

        <div className="p-4 border-t">
          <Link href="/">
            <Button variant="outline" className="w-full justify-start mb-2">
              <Eye className="h-4 w-4 mr-2" />
              View Website
            </Button>
          </Link>
          <Button variant="outline" className="w-full justify-start">
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>

      {/* Main Content - Scrollable */}
      <div className="flex-1 flex flex-col h-screen">
        {/* Top Navigation - Fixed */}
        <nav className="bg-white border-b shadow-sm">
          <div className="px-8 py-4">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Create New Product</h1>
                <p className="text-gray-600">Add a new product to be displayed on the website</p>
              </div>
              <div className="flex items-center space-x-4">
                <Link href="/admin/settings">
                  <Button variant="outline" size="sm">
                    <Settings className="h-4 w-4 mr-2" />
                    Settings
                  </Button>
                </Link>
                <Link href="/admin/products">
                  <Button variant="outline" size="sm">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Products
                  </Button>
                </Link>
                <Button size="sm" className="bg-[#0a6650] hover:bg-[#084c3d]">
                  Admin
                </Button>
              </div>
            </div>
          </div>
        </nav>

        <div className="flex-1 overflow-y-auto p-8">
          <div className="max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Plus className="h-5 w-5 mr-2" />
                  Product Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Basic Information */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name">Product Name *</Label>
                    <Input
                      id="name"
                      placeholder="Enter product name"
                      value={formData.name}
                      onChange={(e) => updateFormData("name", e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="category">Category *</Label>
                    <select
                      id="category"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md mt-1"
                      value={formData.category}
                      onChange={(e) => updateFormData("category", e.target.value)}
                    >
                      <option value="">Select Category</option>
                      {categories.map((category) => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <Label htmlFor="description">Product Description *</Label>
                  <Textarea
                    id="description"
                    rows={4}
                    placeholder="Describe the product features, specifications, and benefits..."
                    value={formData.description}
                    onChange={(e) => updateFormData("description", e.target.value)}
                    className="mt-1"
                  />
                </div>

                {/* Status and Images */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="status">Status</Label>
                    <select
                      id="status"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md mt-1"
                      value={formData.status}
                      onChange={(e) => updateFormData("status", e.target.value)}
                    >
                      <option value="Available">Available</option>
                      <option value="Not Available">Not Available</option>
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="images">Number of Images (0-3)</Label>
                    <Input
                      id="images"
                      type="number"
                      min="0"
                      max="3"
                      value={formData.images}
                      onChange={(e) => updateFormData("images", parseInt(e.target.value))}
                      className="mt-1"
                    />
                  </div>
                </div>

                {/* Features */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <Label>Key Features</Label>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={addFeature}
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      Add Feature
                    </Button>
                  </div>
                  <div className="space-y-2">
                    {formData.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Input
                          placeholder={`Feature ${index + 1}`}
                          value={feature}
                          onChange={(e) => updateFeature(index, e.target.value)}
                        />
                        {formData.features.length > 1 && (
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => removeFeature(index)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Image Upload Section */}
                <div>
                  <Label>Product Images</Label>
                  <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <ImageIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-2">Upload product images</p>
                    <p className="text-sm text-gray-500 mb-4">Maximum 3 images allowed</p>
                    <Button variant="outline">
                      <Upload className="h-4 w-4 mr-2" />
                      Choose Files
                    </Button>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 pt-6 border-t">
                  <Button 
                    onClick={handleSave}
                    disabled={isSaving || !formData.name || !formData.category || !formData.description}
                    className="bg-[#0a6650] hover:bg-[#084c3d]"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    {isSaving ? "Creating..." : "Create Product"}
                  </Button>
                  <Link href="/admin/products">
                    <Button variant="outline">
                      Cancel
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
