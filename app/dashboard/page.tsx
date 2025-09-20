"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts"
import { Printer } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { ProtectedRoute } from "@/components/protected-route"
import { useAuth } from "@/contexts/auth-context"

// Sample data for charts
const symptomData = [
  { day: "Mon", value: 65 },
  { day: "Tue", value: 70 },
  { day: "Wed", value: 60 },
  { day: "Thu", value: 85 },
  { day: "Fri", value: 90 },
  { day: "Sat", value: 75 },
  { day: "Sun", value: 75 },
]

const medicationData = [
  { day: "Mon", value: 85 },
  { day: "Tue", value: 90 },
  { day: "Wed", value: 95 },
  { day: "Thu", value: 80 },
  { day: "Fri", value: 70 },
  { day: "Sat", value: 75 },
  { day: "Sun", value: 90 },
]

const medicationSchedule = [
  { time: "8:00 AM", medication: "Medication A", dosage: "1 tablet", status: "taken" },
  { time: "12:00 PM", medication: "Medication B", dosage: "2 tablets", status: "missed" },
  { time: "8:00 PM", medication: "Medication A", dosage: "1 tablet", status: "upcoming" },
]

const historicalData = [
  {
    date: "2024-07-22",
    symptomSeverity: "70%",
    medicationAdherence: "85%",
    notes: "Mild symptoms, took medication as prescribed.",
  },
  {
    date: "2024-07-23",
    symptomSeverity: "80%",
    medicationAdherence: "95%",
    notes: "Moderate symptoms, took medication on time.",
  },
  {
    date: "2024-07-24",
    symptomSeverity: "65%",
    medicationAdherence: "90%",
    notes: "Improved symptoms, followed treatment plan.",
  },
  {
    date: "2024-07-25",
    symptomSeverity: "75%",
    medicationAdherence: "80%",
    notes: "Moderate symptoms, missed one dose of medication.",
  },
  {
    date: "2024-07-26",
    symptomSeverity: "85%",
    medicationAdherence: "100%",
    notes: "Severe symptoms, took medication as prescribed and consulted doctor.",
  },
]

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("daily")
  const { user } = useAuth()

  return (
    <ProtectedRoute showLoginMessage={true} pageName="Dashboard">
      <div className="min-h-screen bg-background">
        <Navigation showAuthButtons={false} showUserMenu={true} />

        {/* Dashboard Content */}
        <div className="container mx-auto p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                {user?.name ? `${user.name}'s Health Tracker` : "My Health Tracker"}
              </h1>
              <p className="text-muted-foreground">
                Track your health metrics over time to monitor your progress and identify trends.
              </p>
            </div>
            <Button variant="outline" className="flex items-center gap-2 bg-transparent">
              <Printer className="w-4 h-4" />
              Print Report
            </Button>
          </div>

          {/* Time Period Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
            <TabsList className="grid w-full max-w-md grid-cols-3">
              <TabsTrigger value="daily">Daily</TabsTrigger>
              <TabsTrigger value="weekly">Weekly</TabsTrigger>
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Metrics Cards */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* Symptom Severity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Symptom Severity</span>
                  <span className="text-2xl font-bold">75%</span>
                </CardTitle>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>Last 7 Days</span>
                  <Badge variant="secondary" className="text-green-600 bg-green-100">
                    +5%
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={symptomData}>
                    <XAxis dataKey="day" axisLine={false} tickLine={false} />
                    <YAxis hide />
                    <Line type="monotone" dataKey="value" stroke="#06b6d4" strokeWidth={3} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Medication Adherence */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Medication Adherence</span>
                  <span className="text-2xl font-bold">90%</span>
                </CardTitle>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>Last 7 Days</span>
                  <Badge variant="secondary" className="text-red-600 bg-red-100">
                    -2%
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={medicationData}>
                    <XAxis dataKey="day" axisLine={false} tickLine={false} />
                    <YAxis hide />
                    <Bar dataKey="value" fill="#06b6d4" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Medication Timetable */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Medication Timetable</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">Time</th>
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">Medication</th>
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">Dosage</th>
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {medicationSchedule.map((item, index) => (
                      <tr key={index} className="border-b border-border">
                        <td className="py-4 px-4 text-foreground">{item.time}</td>
                        <td className="py-4 px-4 text-foreground">{item.medication}</td>
                        <td className="py-4 px-4 text-foreground">{item.dosage}</td>
                        <td className="py-4 px-4">
                          <Badge
                            variant={
                              item.status === "taken"
                                ? "default"
                                : item.status === "missed"
                                  ? "destructive"
                                  : "secondary"
                            }
                            className={
                              item.status === "taken"
                                ? "bg-green-100 text-green-800"
                                : item.status === "missed"
                                  ? "bg-red-100 text-red-800"
                                  : "bg-blue-100 text-blue-800"
                            }
                          >
                            {item.status === "taken" ? "Taken" : item.status === "missed" ? "Missed" : "Upcoming"}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Historical Data */}
          <Card>
            <CardHeader>
              <CardTitle>Historical Data</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">Date</th>
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">Symptom Severity</th>
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">Medication Adherence</th>
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {historicalData.map((item, index) => (
                      <tr key={index} className="border-b border-border">
                        <td className="py-4 px-4 text-foreground">{item.date}</td>
                        <td className="py-4 px-4 text-foreground">{item.symptomSeverity}</td>
                        <td className="py-4 px-4 text-foreground">{item.medicationAdherence}</td>
                        <td className="py-4 px-4 text-muted-foreground">{item.notes}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </ProtectedRoute>
  )
}
