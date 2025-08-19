"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Leaf, Users, Target, Award, Globe, Heart, Clock, TrendingUp, Zap, Shield } from "lucide-react"
import { useSettings } from "../../hooks/use-api"

const team = [
  {
    name: "Sarah Johnson",
    role: "CEO & Founder",
    image: "/placeholder.svg?height=200&width=200",
    bio: "Former renewable energy consultant with 15+ years in the industry.",
    email: "sarah@greenbeam.com",
    phone: "+250 788 123 456"
  },
  {
    name: "Michael Chen",
    role: "CTO",
    image: "/placeholder.svg?height=200&width=200",
    bio: "Expert in solar technology and energy storage systems.",
    email: "michael@greenbeam.com",
    phone: "+250 788 234 567"
  },
  {
    name: "Emily Rodriguez",
    role: "Head of Operations",
    image: "/placeholder.svg?height=200&width=200",
    bio: "Specializes in sustainable business operations and logistics.",
    email: "emily@greenbeam.com",
    phone: "+250 788 345 678"
  },
  {
    name: "David Kim",
    role: "Head of Engineering",
    image: "/placeholder.svg?height=200&width=200",
    bio: "Mechanical engineer with expertise in renewable energy systems.",
    email: "david@greenbeam.com",
    phone: "+250 788 456 789"
  },
]

const stats = [
  { label: "Years of Experience", value: "15+", icon: Clock },
  { label: "Projects Completed", value: "2,500+", icon: TrendingUp },
  { label: "Happy Customers", value: "10,000+", icon: Users },
  { label: "Energy Saved", value: "50M kWh", icon: Zap },
]

const values = [
  {
    icon: Leaf,
    title: "Sustainability First",
    description: "Every decision we make prioritizes environmental impact and long-term sustainability.",
  },
  {
    icon: Target,
    title: "Innovation",
    description: "We continuously research and adopt the latest renewable energy technologies.",
  },
  {
    icon: Heart,
    title: "Customer Focus",
    description: "Our customers' success and satisfaction drive everything we do.",
  },
  {
    icon: Globe,
    title: "Global Impact",
    description: "We're committed to making renewable energy accessible worldwide.",
  },
]

const journey = [
  {
    year: "2009",
    title: "Company Founded",
    description: "Greenbeam was established with a vision to make renewable energy accessible to everyone in Rwanda and beyond.",
    achievement: "Started with 3 employees"
  },
  {
    year: "2012",
    title: "First Major Project",
    description: "Completed our first large-scale solar installation for a commercial client in Kigali.",
    achievement: "100+ installations completed"
  },
  {
    year: "2015",
    title: "Expansion Phase",
    description: "Expanded operations to include wind energy solutions and energy storage systems.",
    achievement: "500+ projects completed"
  },
  {
    year: "2018",
    title: "Technology Innovation",
    description: "Launched our proprietary monitoring and management systems for renewable energy installations.",
    achievement: "1,000+ customers served"
  },
  {
    year: "2021",
    title: "Regional Leadership",
    description: "Became the leading renewable energy provider in East Africa with operations across multiple countries.",
    achievement: "2,000+ installations"
  },
  {
    year: "2024",
    title: "Future Vision",
    description: "Continuing to innovate and expand, with plans to reach 50,000+ customers by 2030.",
    achievement: "10,000+ customers and growing"
  }
]

export default function AboutPage() {
  const { data: settingsData } = useSettings()
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
              </Link>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-gray-700 hover:text-[#0a6650]">
                Home
              </Link>
              <Link href="/products" className="text-gray-700 hover:text-[#0a6650]">
                Products
              </Link>
              <Link href="/about" className="text-[#0a6650] font-medium">
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
              <Link href="/admin">
                <Button className="bg-white text-[#0a6650] hover:bg-gray-50">
                  Admin Login
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-[#0a6650] to-[#084c3d] text-white py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">{(settingsData as any)?.data?.website?.content?.aboutSection?.title || `About ${((settingsData as any)?.data?.general?.companyName || 'Greenbeam')}`}</h1>
          <p className="text-xl mb-8 text-green-100 max-w-3xl mx-auto">
            {(settingsData as any)?.data?.website?.content?.siteDescription || "We're on a mission to accelerate the world's transition to sustainable energy through innovative renewable energy solutions and exceptional customer service."}
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 mb-6">
                {(settingsData as any)?.data?.website?.content?.aboutSection?.content || 'At Greenbeam, we believe that clean, renewable energy should be accessible to everyone. Our mission is to provide high-quality solar panels, wind turbines, and energy storage solutions that help homes and businesses reduce their carbon footprint while saving money on energy costs.'}
              </p>
              <p className="text-lg text-gray-600 mb-8">
                Founded in 2009, we've been at the forefront of the renewable energy revolution, helping over 10,000
                customers make the switch to sustainable energy solutions across East Africa.
              </p>
              <Link href="/products">
                <Button size="lg" className="bg-[#0a6650] hover:bg-[#084c3d]">Explore Our Products</Button>
              </Link>
            </div>
            <div className="relative">
              <Image
                src="/placeholder.svg?height=400&width=500"
                alt="Solar installation"
                width={500}
                height={400}
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {(((settingsData as any)?.data?.website?.content?.aboutSection?.stats) || stats).map((stat: any, index: number) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  {typeof stat.icon === 'function' ? (
                    <stat.icon className="h-12 w-12 text-[#0a6650]" />
                  ) : (
                    <Leaf className="h-12 w-12 text-[#0a6650]" />
                  )}
                </div>
                <div className="text-3xl md:text-4xl font-bold text-[#0a6650] mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Journey */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Our Journey</h2>
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {journey.map((milestone, index) => (
                <div key={index} className="flex items-start space-x-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-[#0a6650] rounded-full flex items-center justify-center text-white font-bold text-lg">
                      {milestone.year}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2">{milestone.title}</h3>
                    <p className="text-gray-600 mb-2">{milestone.description}</p>
                    <Badge variant="outline" className="bg-[#0a6650]/10 text-[#0a6650] border-[#0a6650]">
                      {milestone.achievement}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <value.icon className="h-12 w-12 text-[#0a6650] mx-auto mb-4" />
                  <CardTitle className="text-xl">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {(settingsData as any)?.data?.website?.content?.aboutSection?.showTeam !== false && (
            <>
              <h2 className="text-3xl font-bold text-center mb-12">Meet Our Team</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {team.map((member, index) => (
                  <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="w-32 h-32 rounded-full bg-gray-200 mx-auto mb-4 flex items-center justify-center">
                        <Users className="h-16 w-16 text-gray-400" />
                      </div>
                      <CardTitle className="text-xl">{member.name}</CardTitle>
                      <Badge variant="secondary" className="bg-[#0a6650]/10 text-[#0a6650]">
                        {member.role}
                      </Badge>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 text-sm mb-4">{member.bio}</p>
                      <div className="space-y-2 text-sm">
                        <p className="flex items-center justify-center text-[#0a6650]">
                          <Users className="h-4 w-4 mr-2" />
                          {member.email}
                        </p>
                        <p className="flex items-center justify-center text-[#0a6650]">
                          <Shield className="h-4 w-4 mr-2" />
                          {member.phone}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#0a6650] text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Go Green?</h2>
          <p className="text-xl mb-8 text-green-100 max-w-3xl mx-auto">
            Join thousands of customers who have already made the switch to renewable energy.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/products">
              <Button size="lg" className="bg-white text-[#0a6650] hover:bg-gray-100">
                Shop Now
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-[#0a6650]">
                Contact Us
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
                <span className="text-2xl font-bold">{(settingsData as any)?.data?.general?.companyName || 'Greenbeam'}</span>
              </div>
              <p className="text-gray-400">
                {(settingsData as any)?.data?.website?.content?.siteDescription || 'Leading provider of sustainable energy solutions for homes and businesses in Rwanda.'}
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
            <p>{(settingsData as any)?.data?.website?.content?.footer?.copyrightText || '\u00A9 2024 Greenbeam. All rights reserved. | Kigali, Rwanda'}</p>
          </div>
        </div>
      </footer>
    </div>
  )
} 