import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Shield, Brain, MessageSquare, Clock, Lock, Database } from "lucide-react"
import { Navigation } from "@/components/navigation"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation showAuthButtons={true} showUserMenu={false} />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 via-blue-500 via-purple-500 to-pink-500 opacity-90" />
        <div className="relative z-10 container mx-auto px-6 py-24 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 text-balance">Welcome to MAC AI</h1>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto text-pretty">
            Your AI-driven chatbot for disease awareness. Get personalized health insights and connect with healthcare
            professionals.
          </p>
          <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 text-lg" asChild>
            <Link href="/login">Login</Link>
          </Button>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">Key Features</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Explore the powerful features of MAC AI that make it your ideal health companion.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Ayushman Bharat Integration */}
            <Card className="bg-card border-2 border-cyan-500/20 hover:border-cyan-500/40 transition-colors">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center mb-6">
                  <Shield className="w-6 h-6 text-cyan-500" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-4">Ayushman Bharat Integration</h3>
                <p className="text-muted-foreground">
                  Seamlessly integrates with Ayushman Bharat Digital Mission (ABDM) for easy access to your health
                  records.
                </p>
              </CardContent>
            </Card>

            {/* AI-Powered NLP Engine */}
            <Card className="bg-card border-2 border-purple-500/20 hover:border-purple-500/40 transition-colors">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-6">
                  <Brain className="w-6 h-6 text-purple-500" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-4">AI-Powered NLP Engine</h3>
                <p className="text-muted-foreground">
                  Utilizes advanced Natural Language Processing (NLP) to understand and respond to your health queries
                  effectively.
                </p>
              </CardContent>
            </Card>

            {/* Multi-Channel Access */}
            <Card className="bg-card border-2 border-orange-500/20 hover:border-orange-500/40 transition-colors">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center mb-6">
                  <MessageSquare className="w-6 h-6 text-orange-500" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-4">Multi-Channel Access</h3>
                <p className="text-muted-foreground">
                  Access MAC AI through multiple channels including web, mobile app, and messaging platforms.
                </p>
              </CardContent>
            </Card>

            {/* 24/7 Health Assistant */}
            <Card className="bg-card border-2 border-green-500/20 hover:border-green-500/40 transition-colors">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mb-6">
                  <Clock className="w-6 h-6 text-green-500" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-4">24/7 Health Assistant</h3>
                <p className="text-muted-foreground">
                  Get instant health information and support anytime, anywhere with our round-the-clock assistant.
                </p>
              </CardContent>
            </Card>

            {/* Privacy-First Design */}
            <Card className="bg-card border-2 border-pink-500/20 hover:border-pink-500/40 transition-colors">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-pink-500/20 rounded-lg flex items-center justify-center mb-6">
                  <Lock className="w-6 h-6 text-pink-500" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-4">Privacy-First Design</h3>
                <p className="text-muted-foreground">
                  Your privacy is our priority. MAC AI ensures the highest standards of data security and
                  confidentiality.
                </p>
              </CardContent>
            </Card>

            {/* Medical History Integration */}
            <Card className="bg-card border-2 border-blue-500/20 hover:border-blue-500/40 transition-colors">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-6">
                  <Database className="w-6 h-6 text-blue-500" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-4">Medical History Integration</h3>
                <p className="text-muted-foreground">
                  Integrates with your medical history to provide personalized and accurate health insights.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
