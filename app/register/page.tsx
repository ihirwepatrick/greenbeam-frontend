"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { Leaf } from "lucide-react"

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Logo */}
        <div className="text-center">
          <Link href="/" className="flex items-center justify-center space-x-2">
            <Leaf className="h-12 w-12 text-green-600" />
            <span className="text-3xl font-bold text-green-600">Greenbeam</span>
          </Link>
        </div>

        {/* Register Form */}
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Create your account</CardTitle>
            <CardDescription className="text-center">
              Join Greenbeam and start your green energy journey
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" placeholder="John" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" placeholder="Doe" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="john@example.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input id="confirmPassword" type="password" />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox id="terms" />
              <Label htmlFor="terms" className="text-sm">
                I agree to the{" "}
                <Link href="/terms" className="text-green-600 hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="text-green-600 hover:underline">
                  Privacy Policy
                </Link>
              </Label>
            </div>

            <Button className="w-full">Create Account</Button>

            <Separator />

            <div className="space-y-2">
              <Button variant="outline" className="w-full bg-transparent">
                Continue with Google
              </Button>
              <Button variant="outline" className="w-full bg-transparent">
                Continue with Apple
              </Button>
            </div>

            <div className="text-center text-sm">
              Already have an account?{" "}
              <Link href="/admin" className="text-green-600 hover:underline">
                Already have an account? Admin Login
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
