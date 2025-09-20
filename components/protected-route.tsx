"use client"

import type React from "react"

import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Navigation } from "@/components/navigation"

interface ProtectedRouteProps {
  children: React.ReactNode
  showLoginMessage?: boolean
  pageName?: string
}

export function ProtectedRoute({ children, showLoginMessage = false, pageName = "this page" }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !isAuthenticated && !showLoginMessage) {
      router.push("/login")
    }
  }, [isAuthenticated, isLoading, router, showLoginMessage])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated && showLoginMessage) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation showAuthButtons={true} showUserMenu={false} />
        <div className="container mx-auto p-6 flex items-center justify-center min-h-[80vh]">
          <Card className="w-full max-w-md">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-foreground">Login Required</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <p className="text-muted-foreground">Please login to access {pageName}.</p>
              <Button onClick={() => router.push("/login")} className="w-full bg-cyan-500 hover:bg-cyan-600 text-white">
                Go to Login
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return <>{children}</>
}
