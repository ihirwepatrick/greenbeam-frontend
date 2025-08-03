import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Leaf, Mail, Phone, MapPin, Clock, Send, Users, Shield, HelpCircle, MessageCircle } from "lucide-react"

const team = [
  {
    name: "Sarah Johnson",
    role: "CEO & Founder",
    email: "sarah@greenbeam.com",
    phone: "+250 788 123 456",
    image: "/placeholder.svg?height=200&width=200",
    bio: "Former renewable energy consultant with 15+ years in the industry."
  },
  {
    name: "Michael Chen",
    role: "CTO",
    email: "michael@greenbeam.com",
    phone: "+250 788 234 567",
    image: "/placeholder.svg?height=200&width=200",
    bio: "Expert in solar technology and energy storage systems."
  },
  {
    name: "Emily Rodriguez",
    role: "Head of Operations",
    email: "emily@greenbeam.com",
    phone: "+250 788 345 678",
    image: "/placeholder.svg?height=200&width=200",
    bio: "Specializes in sustainable business operations and logistics."
  },
  {
    name: "David Kim",
    role: "Head of Engineering",
    email: "david@greenbeam.com",
    phone: "+250 788 456 789",
    image: "/placeholder.svg?height=200&width=200",
    bio: "Mechanical engineer with expertise in renewable energy systems."
  }
]

const faqs = [
  {
    question: "How long does installation take?",
    answer: "Most residential solar installations are completed within 1-3 days, depending on the system size and complexity."
  },
  {
    question: "Do you offer financing options?",
    answer: "Yes, we offer various financing options including solar loans, leases, and power purchase agreements."
  },
  {
    question: "What warranty do you provide?",
    answer: "We provide a 25-year warranty on solar panels and 10-year warranty on inverters and installation work."
  },
  {
    question: "Do you handle permits and inspections?",
    answer: "Yes, our team handles all necessary permits, inspections, and utility interconnection paperwork."
  },
  {
    question: "How much can I save on my energy bills?",
    answer: "Most customers see 70-90% reduction in their electricity bills, with full ROI typically achieved within 5-7 years."
  },
  {
    question: "What happens during power outages?",
    answer: "With battery storage systems, you can continue to power essential appliances during grid outages."
  }
]

const contactInfo = [
  {
    icon: Mail,
    title: "Email Us",
    details: ["info@greenbeam.com", "support@greenbeam.com"],
    description: "We'll respond within 24 hours",
  },
  {
    icon: Phone,
    title: "Call Us",
    details: ["+250 788 123 456", "+250 788 987 654"],
    description: "Mon-Fri 8AM-6PM CAT",
  },
  {
    icon: MapPin,
    title: "Visit Us",
    details: ["Kigali ST RN 1000", "Kigali, Rwanda"],
    description: "By appointment only",
  },
]

export default function ContactPage() {
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
              <Link href="/products" className="text-gray-700 hover:text-[#0a6650]">
                Products
              </Link>
              <Link href="/about" className="text-gray-700 hover:text-[#0a6650]">
                About
              </Link>
              <Link href="/contact" className="text-[#0a6650] font-medium">
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
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Contact Us</h1>
          <p className="text-xl mb-8 text-green-100 max-w-3xl mx-auto">
            Have questions about our renewable energy solutions? We're here to help you make the switch to sustainable energy.
          </p>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {contactInfo.map((info, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <info.icon className="h-12 w-12 text-[#0a6650] mx-auto mb-4" />
                  <CardTitle className="text-xl">{info.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  {info.details.map((detail, detailIndex) => (
                    <p key={detailIndex} className="text-gray-600 mb-1">
                      {detail}
                    </p>
                  ))}
                  <p className="text-sm text-gray-500 mt-2">{info.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Send us a Message</CardTitle>
                <p className="text-gray-600">Fill out the form below and we'll get back to you as soon as possible.</p>
              </CardHeader>
              <CardContent>
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" placeholder="John" />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" placeholder="Doe" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="john@example.com" />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" type="tel" placeholder="+250 788 123 456" />
                  </div>
                  <div>
                    <Label htmlFor="subject">Subject</Label>
                    <Input id="subject" placeholder="How can we help you?" />
                  </div>
                  <div>
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      placeholder="Tell us about your renewable energy needs..."
                      rows={5}
                    />
                  </div>
                  <Button type="submit" className="w-full bg-[#0a6650] hover:bg-[#084c3d]">
                    <Send className="h-4 w-4 mr-2" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Google Maps */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Our Location</h2>
              <div className="bg-gray-200 rounded-lg h-96 mb-6 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="h-12 w-12 text-[#0a6650] mx-auto mb-4" />
                  <p className="text-gray-600">Google Maps Integration</p>
                  <p className="text-sm text-gray-500">Kigali, Rwanda</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold">Address</h3>
                  <p className="text-gray-600">Kigali ST RN 1000, Kigali, Rwanda</p>
                </div>
                <div>
                  <h3 className="font-semibold">Business Hours</h3>
                  <p className="text-gray-600">Monday - Friday: 8:00 AM - 6:00 PM CAT</p>
                  <p className="text-gray-600">Saturday: 9:00 AM - 3:00 PM CAT</p>
                  <p className="text-gray-600">Sunday: Closed</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {faqs.map((faq, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <HelpCircle className="h-5 w-5 text-[#0a6650] mr-2" />
                    {faq.question}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Privacy Policy Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Privacy Policy</h2>
            <Card>
              <CardContent className="p-8">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-3">Information We Collect</h3>
                    <p className="text-gray-600">
                      We collect information you provide directly to us, such as when you contact us, request a quote, 
                      or sign up for our newsletter. This may include your name, email address, phone number, and 
                      project details.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-3">How We Use Your Information</h3>
                    <p className="text-gray-600">
                      We use the information we collect to provide our services, respond to your inquiries, 
                      send you updates about our products and services, and improve our website and services.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-3">Information Sharing</h3>
                    <p className="text-gray-600">
                      We do not sell, trade, or otherwise transfer your personal information to third parties 
                      without your consent, except as described in this policy or as required by law.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-3">Data Security</h3>
                    <p className="text-gray-600">
                      We implement appropriate security measures to protect your personal information against 
                      unauthorized access, alteration, disclosure, or destruction.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-3">Contact Us</h3>
                    <p className="text-gray-600">
                      If you have any questions about this Privacy Policy, please contact us at 
                      <a href="mailto:privacy@greenbeam.com" className="text-[#0a6650] ml-1">privacy@greenbeam.com</a>
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#0a6650] text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8 text-green-100 max-w-3xl mx-auto">
            Schedule a free consultation to discuss your renewable energy needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/products">
              <Button size="lg" className="bg-white text-[#0a6650] hover:bg-gray-100">
                Browse Products
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-[#0a6650]">
              Schedule Consultation
            </Button>
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
                Leading provider of sustainable energy solutions for homes and businesses in Rwanda.
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
            <p>&copy; 2024 Greenbeam. All rights reserved. | Kigali, Rwanda</p>
          </div>
        </div>
      </footer>
    </div>
  )
} 