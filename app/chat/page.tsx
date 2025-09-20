"use client"

import type React from "react"
import { Navigation } from "@/components/navigation"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Send, LogIn } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import Link from "next/link"

interface Message {
  id: string
  sender: "user" | "ai"
  content: string
  timestamp: Date
}

const healthInsights = [
  {
    metric: "Blood Pressure",
    value: "120/80 mmHg",
    lastChecked: "2 days ago",
  },
  {
    metric: "Cholesterol",
    value: "180 mg/dL",
    lastChecked: "1 week ago",
  },
  {
    metric: "Blood Sugar",
    value: "90 mg/dL",
    lastChecked: "1 month ago",
  },
  {
    metric: "Weight",
    value: "140 lbs",
    lastChecked: "3 months ago",
  },
  {
    metric: "Height",
    value: "5'6\"",
    lastChecked: "6 months ago",
  },
]

export default function ChatPage() {
  const { isAuthenticated, user } = useAuth()

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "ai",
      content: isAuthenticated
        ? `Hi ${user?.name || "there"}! I'm MAC AI, your personal health assistant. How can I help you today?`
        : "Hi there! I'm MAC AI, your health assistant. I can help with general health questions, but please login to save our conversation and get personalized insights.",
      timestamp: new Date(Date.now() - 10000),
    },
    ...(isAuthenticated
      ? [
          {
            id: "2",
            sender: "user" as const,
            content:
              "Hi MAC AI, I've been feeling tired lately and have a persistent cough. Could you help me understand what might be going on?",
            timestamp: new Date(Date.now() - 5000),
          },
          {
            id: "3",
            sender: "ai" as const,
            content:
              "I understand, Sophia. Let's explore some possibilities. Could you tell me more about your symptoms? For example, how long have you had the cough, and are there any other symptoms like fever, shortness of breath, or chest pain?",
            timestamp: new Date(),
          },
        ]
      : []),
  ])

  const [newMessage, setNewMessage] = useState("")

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      sender: "user",
      content: newMessage,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setNewMessage("")

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        sender: "ai",
        content: isAuthenticated
          ? "Thank you for sharing that information. Based on what you've described, I'd recommend consulting with a healthcare professional for a proper evaluation. In the meantime, make sure to stay hydrated and get plenty of rest."
          : "I can provide general health guidance, but for personalized advice and to save our conversation, please consider logging in. For now, I'd recommend consulting with a healthcare professional for any persistent symptoms.",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, aiResponse])
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Chat Section */}
      <div className="flex-1 flex flex-col">
        <Navigation showAuthButtons={!isAuthenticated} showUserMenu={isAuthenticated} />

        {/* Chat Header */}
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-foreground">Chat with MAC AI</h1>
            {!isAuthenticated && (
              <Card className="bg-yellow-50 border-yellow-200 dark:bg-yellow-900/20 dark:border-yellow-800">
                <CardContent className="p-3">
                  <div className="flex items-center gap-2 text-sm">
                    <LogIn className="w-4 h-4 text-yellow-600" />
                    <span className="text-yellow-800 dark:text-yellow-200">
                      Login to save chat history and get personalized insights
                    </span>
                    <Link href="/login">
                      <Button size="sm" variant="outline" className="ml-2 h-7 text-xs bg-transparent">
                        Login
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-4 ${message.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              {message.sender === "ai" && (
                <Avatar className="w-10 h-10 flex-shrink-0">
                  <AvatarImage src="/ai-avatar.png" />
                  <AvatarFallback className="bg-cyan-500 text-white">AI</AvatarFallback>
                </Avatar>
              )}

              <div className={`max-w-2xl ${message.sender === "user" ? "order-first" : ""}`}>
                <div className="text-xs text-muted-foreground mb-2">
                  {message.sender === "ai" ? "MAC AI" : isAuthenticated ? user?.name || "You" : "You"}
                </div>
                <div
                  className={`p-4 rounded-2xl ${
                    message.sender === "user" ? "bg-cyan-500 text-white ml-auto" : "bg-muted text-foreground"
                  }`}
                >
                  {message.content}
                </div>
              </div>

              {message.sender === "user" && (
                <Avatar className="w-10 h-10 flex-shrink-0">
                  <AvatarImage src="/user-avatar.jpg" />
                  <AvatarFallback>{isAuthenticated ? user?.name?.charAt(0) || "U" : "U"}</AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div className="p-6 border-t border-border">
          <form onSubmit={handleSendMessage} className="flex gap-4">
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder={isAuthenticated ? "Type your message..." : "Ask a general health question..."}
              className="flex-1 h-12 bg-muted border-0"
            />
            <Button type="submit" size="icon" className="h-12 w-12 bg-cyan-500 hover:bg-cyan-600">
              <Send className="w-5 h-5" />
            </Button>
          </form>
        </div>
      </div>

      {/* Health Insights Sidebar */}
      <div className="w-80 border-l border-border bg-card">
        <div className="p-6">
          <h2 className="text-xl font-bold text-foreground mb-6">
            {isAuthenticated ? "Personalized Health Insights" : "Health Insights"}
          </h2>

          {isAuthenticated ? (
            <div className="space-y-6">
              {healthInsights.map((insight, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-foreground">{insight.metric}</h3>
                    <span className="text-lg font-bold text-foreground">{insight.value}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Last checked: {insight.lastChecked}</p>
                  {index < healthInsights.length - 1 && <div className="border-b border-border pt-4" />}
                </div>
              ))}
            </div>
          ) : (
            <Card className="bg-muted/50">
              <CardContent className="p-6 text-center">
                <LogIn className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-semibold text-foreground mb-2">Login Required</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Login to view your personalized health insights, track your progress, and save your chat history.
                </p>
                <Link href="/login">
                  <Button className="w-full bg-cyan-500 hover:bg-cyan-600">Login to Access Insights</Button>
                </Link>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
