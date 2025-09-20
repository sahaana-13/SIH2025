"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Bell, User, Menu, Languages } from "lucide-react"
import { useState } from "react"

interface NavigationProps {
  showAuthButtons?: boolean
  showUserMenu?: boolean
}

export function Navigation({ showAuthButtons = true, showUserMenu = false }: NavigationProps) {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = useState("English")

  const isActive = (path: string) => pathname === path

  const languages = [
    { code: "en", name: "English", native: "English" },
    { code: "hi", name: "Hindi", native: "हिंदी" },
    { code: "bn", name: "Bengali", native: "বাংলা" },
    { code: "te", name: "Telugu", native: "తెలుగు" },
    { code: "mr", name: "Marathi", native: "मराठी" },
    { code: "ta", name: "Tamil", native: "தமிழ்" },
    { code: "gu", name: "Gujarati", native: "ગુજરાતી" },
    { code: "kn", name: "Kannada", native: "ಕನ್ನಡ" },
  ]

  return (
    <nav className="flex items-center justify-between p-6 border-b border-border bg-background">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2">
        <div className="w-8 h-8 bg-cyan-500 rounded-md flex items-center justify-center">
          <span className="text-white font-bold text-sm">M</span>
        </div>
        <span className="text-xl font-bold text-foreground">MAC AI</span>
      </Link>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center gap-8">
        <Link
          href="/"
          className={`transition-colors ${
            isActive("/") ? "text-cyan-500 font-medium" : "text-foreground hover:text-cyan-500"
          }`}
        >
          Home
        </Link>
        <Link
          href="/dashboard"
          className={`transition-colors ${
            isActive("/dashboard") ? "text-cyan-500 font-medium" : "text-foreground hover:text-cyan-500"
          }`}
        >
          Dashboard
        </Link>
        <Link
          href="/chat"
          className={`transition-colors ${
            isActive("/chat") ? "text-cyan-500 font-medium" : "text-foreground hover:text-cyan-500"
          }`}
        >
          Chat
        </Link>
      </div>

      {/* Right Side Actions */}
      <div className="flex items-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Languages className="w-5 h-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            {languages.map((language) => (
              <DropdownMenuItem
                key={language.code}
                onClick={() => setSelectedLanguage(language.name)}
                className={`flex items-center justify-between cursor-pointer ${
                  selectedLanguage === language.name ? "bg-cyan-50 text-cyan-600" : ""
                }`}
              >
                <span>{language.name}</span>
                <span className="text-sm text-muted-foreground">{language.native}</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <Menu className="w-5 h-5" />
        </Button>

        {/* User Menu (for authenticated pages) */}
        {showUserMenu && (
          <>
            <Button variant="ghost" size="icon">
              <Bell className="w-5 h-5" />
            </Button>
            <Avatar className="w-8 h-8">
              <AvatarImage src="/user-avatar.jpg" />
              <AvatarFallback>
                <User className="w-4 h-4" />
              </AvatarFallback>
            </Avatar>
          </>
        )}

        {/* Auth Buttons (for public pages) */}
        {showAuthButtons && (
          <>
            <Button variant="outline" asChild>
              <Link href="/login">Login</Link>
            </Button>
            <Button className="bg-cyan-500 hover:bg-cyan-600" asChild>
              <Link href="/signup">Sign Up</Link>
            </Button>
          </>
        )}
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-background border-b border-border md:hidden">
          <div className="flex flex-col p-6 space-y-4">
            <Link
              href="/"
              className={`transition-colors ${
                isActive("/") ? "text-cyan-500 font-medium" : "text-foreground hover:text-cyan-500"
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/dashboard"
              className={`transition-colors ${
                isActive("/dashboard") ? "text-cyan-500 font-medium" : "text-foreground hover:text-cyan-500"
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Dashboard
            </Link>
            <Link
              href="/chat"
              className={`transition-colors ${
                isActive("/chat") ? "text-cyan-500 font-medium" : "text-foreground hover:text-cyan-500"
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Chat
            </Link>
            <div className="pt-4 border-t border-border">
              <p className="text-sm font-medium text-foreground mb-2">Language</p>
              <div className="grid grid-cols-2 gap-2">
                {languages.slice(0, 4).map((language) => (
                  <Button
                    key={language.code}
                    variant={selectedLanguage === language.name ? "default" : "ghost"}
                    size="sm"
                    onClick={() => {
                      setSelectedLanguage(language.name)
                      setIsMobileMenuOpen(false)
                    }}
                    className="justify-start text-xs"
                  >
                    {language.native}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
