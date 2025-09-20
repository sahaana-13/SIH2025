"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Navigation } from "@/components/navigation"

export default function SignUpPage() {
  const { signup, isLoading } = useAuth()
  const router = useRouter()
  const [error, setError] = useState("")

  const [formData, setFormData] = useState({
    fullName: "",
    abdmNumber: "",
    phoneNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      return
    }

    const success = await signup({
      name: formData.fullName,
      email: formData.email,
      phone: formData.phoneNumber,
      abdmNumber: formData.abdmNumber,
      password: formData.password,
    })

    if (success) {
      router.push("/dashboard")
    } else {
      setError("Failed to create account. Please try again.")
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation showAuthButtons={false} showUserMenu={false} />

      {/* Signup Form */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-4">Create Account</h1>
            <p className="text-muted-foreground text-balance">
              Join MAC AI to get personalized health insights and connect with healthcare professionals.
            </p>
          </div>

          <Card className="bg-card border border-border">
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                    <p className="text-red-400 text-sm">{error}</p>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="fullName" className="sr-only">
                    Full Name
                  </Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    type="text"
                    placeholder="Full Name"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="bg-muted border-0 h-12 text-foreground placeholder:text-muted-foreground"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="abdmNumber" className="sr-only">
                    ABDM Number
                  </Label>
                  <Input
                    id="abdmNumber"
                    name="abdmNumber"
                    type="text"
                    placeholder="ABDM Number"
                    value={formData.abdmNumber}
                    onChange={handleInputChange}
                    className="bg-muted border-0 h-12 text-foreground placeholder:text-muted-foreground"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phoneNumber" className="sr-only">
                    Phone Number
                  </Label>
                  <Input
                    id="phoneNumber"
                    name="phoneNumber"
                    type="tel"
                    placeholder="Phone Number"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    className="bg-muted border-0 h-12 text-foreground placeholder:text-muted-foreground"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="sr-only">
                    Email
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="bg-muted border-0 h-12 text-foreground placeholder:text-muted-foreground"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="sr-only">
                    Password
                  </Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="bg-muted border-0 h-12 text-foreground placeholder:text-muted-foreground"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="sr-only">
                    Confirm Password
                  </Label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="bg-muted border-0 h-12 text-foreground placeholder:text-muted-foreground"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-12 bg-cyan-500 hover:bg-cyan-600 text-white font-semibold disabled:opacity-50"
                >
                  {isLoading ? "Creating Account..." : "Create Account"}
                </Button>
              </form>

              <div className="text-center mt-6">
                <Link href="/login" className="text-muted-foreground hover:text-foreground transition-colors underline">
                  Already have an account? Login
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
