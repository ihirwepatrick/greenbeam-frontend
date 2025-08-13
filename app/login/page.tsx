"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useSearchParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Leaf, Eye, EyeOff, Lock, Mail, ArrowLeft } from "lucide-react"
import { useAuth } from "../../contexts/AuthContext"

export default function LoginPage() {
	const [showPassword, setShowPassword] = useState(false)
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState("")
	const searchParams = useSearchParams()
	const router = useRouter()
	const { isAuthenticated, login } = useAuth()

	const redirect = searchParams.get("redirect") || "/admin"

	useEffect(() => {
		if (isAuthenticated) {
			router.replace(redirect)
		}
	}, [isAuthenticated, redirect, router])

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setIsLoading(true)
		setError("")
		try {
			const ok = await login(email, password)
			if (ok) {
				router.replace(redirect)
				return
			}
			setError("Invalid credentials")
		} catch (err: any) {
			setError(err?.message || "Login failed")
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
			<div className="max-w-md w-full space-y-8">
				{/* Header */}
				<div className="text-center">
					<Link href="/" className="flex items-center justify-center space-x-2 mb-8">
						<Leaf className="h-12 w-12 text-[#0a6650]" />
						<span className="text-3xl font-bold text-[#0a6650]">Greenbeam</span>
					</Link>
					<h2 className="text-3xl font-bold text-gray-900">Admin Login</h2>
					<p className="mt-2 text-sm text-gray-600">Sign in to access the admin portal</p>
				</div>

				{/* Login Form */}
				<Card className="shadow-lg">
					<CardHeader>
						<CardTitle className="text-xl text-center">Welcome Back</CardTitle>
					</CardHeader>
					<CardContent>
						<form onSubmit={handleSubmit} className="space-y-6">
							{error && (
								<div className="text-sm text-red-600">{error}</div>
							)}
							<div>
								<Label htmlFor="email" className="block text-sm font-medium text-gray-700">
									Email Address
								</Label>
								<div className="mt-1 relative">
									<Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
									<Input
										id="email"
										name="email"
										type="email"
										autoComplete="email"
										required
										value={email}
										onChange={(e) => setEmail(e.target.value)}
										className="pl-10"
										placeholder="admin@greenbeam.com"
									/>
								</div>
							</div>

							<div>
								<Label htmlFor="password" className="block text-sm font-medium text-gray-700">
									Password
								</Label>
								<div className="mt-1 relative">
									<Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
									<Input
										id="password"
										name="password"
										type={showPassword ? "text" : "password"}
										autoComplete="current-password"
										required
										value={password}
										onChange={(e) => setPassword(e.target.value)}
										className="pl-10 pr-10"
										placeholder="Enter your password"
									/>
									<button
										type="button"
										className="absolute right-3 top-1/2 transform -translate-y-1/2"
										onClick={() => setShowPassword(!showPassword)}
									>
										{showPassword ? (
											<EyeOff className="h-4 w-4 text-gray-400" />
										) : (
											<Eye className="h-4 w-4 text-gray-400" />
										)}
									</button>
								</div>
							</div>

							<div className="flex items-center justify-between">
								<div className="flex items-center">
									<input
										id="remember-me"
										name="remember-me"
										type="checkbox"
										className="h-4 w-4 text-[#0a6650] focus:ring-[#0a6650] border-gray-300 rounded"
									/>
									<Label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
										Remember me
									</Label>
								</div>

								<div className="text-sm">
									<a href="#" className="font-medium text-[#0a6650] hover:text-[#084c3d]">
										Forgot your password?
									</a>
								</div>
							</div>

							<div>
								<Button
									type="submit"
									className="w-full bg-[#0a6650] hover:bg-[#084c3d]"
									disabled={isLoading}
								>
									{isLoading ? "Signing in..." : "Sign in"}
								</Button>
							</div>
						</form>
					</CardContent>
				</Card>

				{/* Back to Website */}
				<div className="text-center">
					<Link href="/" className="inline-flex items-center text-sm text-[#0a6650] hover:text-[#084c3d]">
						<ArrowLeft className="h-4 w-4 mr-1" />
						Back to Website
					</Link>
				</div>

				{/* Demo Credentials */}
				<Card className="bg-blue-50 border-blue-200">
					<CardContent className="p-4">
						<h3 className="text-sm font-medium text-blue-900 mb-2">Demo Credentials:</h3>
						<div className="text-xs text-blue-800 space-y-1">
							<p><strong>Email:</strong> admin@greenbeam.com</p>
							<p><strong>Password:</strong> admin123</p>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	)
}
