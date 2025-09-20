"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

interface User {
  id: string
  name: string
  email: string
  phone: string
  abdmNumber: string
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (credentials: { abdmNumber: string; phone: string; password: string }) => Promise<boolean>
  signup: (userData: {
    name: string
    email: string
    phone: string
    abdmNumber: string
    password: string
  }) => Promise<boolean>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for existing session on mount
    const savedUser = localStorage.getItem("mac-ai-user")
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (credentials: { abdmNumber: string; phone: string; password: string }) => {
    setIsLoading(true)
    try {
      // Simulate API call - replace with actual authentication
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock user data - replace with actual API response
      const userData: User = {
        id: "1",
        name: "Sophia Kumar",
        email: "sophia@example.com",
        phone: credentials.phone,
        abdmNumber: credentials.abdmNumber,
      }

      setUser(userData)
      localStorage.setItem("mac-ai-user", JSON.stringify(userData))
      setIsLoading(false)
      return true
    } catch (error) {
      setIsLoading(false)
      return false
    }
  }

  const signup = async (userData: {
    name: string
    email: string
    phone: string
    abdmNumber: string
    password: string
  }) => {
    setIsLoading(true)
    try {
      // Simulate API call - replace with actual registration
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const newUser: User = {
        id: Date.now().toString(),
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
        abdmNumber: userData.abdmNumber,
      }

      setUser(newUser)
      localStorage.setItem("mac-ai-user", JSON.stringify(newUser))
      setIsLoading(false)
      return true
    } catch (error) {
      setIsLoading(false)
      return false
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("mac-ai-user")
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
