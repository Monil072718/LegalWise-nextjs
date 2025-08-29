"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BarChart, TrendingUp, Users, DollarSign, Clock, Scale, Download } from "lucide-react"

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("month")

  const caseProgress = [
    {
      id: 1,
      clientName: "John Doe",
      caseType: "Divorce",
      progress: 75,
      stage: "Document Review",
      startDate: "2024-01-01",
      expectedCompletion: "2024-03-15",
    },
    {
      id: 2,
      clientName: "Jane Smith",
      caseType: "Employment Law",
      progress: 45,
      stage: "Evidence Collection",
      startDate: "2024-01-10",
      expectedCompletion: "2024-04-10",
    },
    {
      id: 3,
      clientName: "Robert Johnson",
      caseType: "Contract Review",
      progress: 90,
      stage: "Final Review",
      startDate: "2023-12-15",
      expectedCompletion: "2024-02-01",
    },
  ]

  const revenueData = [
    { month: "Oct", amount: 180000 },
    { month: "Nov", amount: 220000 },
    { month: "Dec", amount: 250000 },
    { month: "Jan", amount: 285000 },
  ]

  const clientActivity = [
    {
      clientName: "John Doe",
      lastActivity: "2 hours ago",
      totalSessions: 8,
      documentsShared: 12,
      messagesExchanged: 45,
      status: "Active",
    },
    {
      clientName: "Jane Smith",
      lastActivity: "1 day ago",
      totalSessions: 5,
      documentsShared: 8,
      messagesExchanged: 23,
      status: "Active",
    },
    {
      clientName: "Robert Johnson",
      lastActivity: "3 days ago",
      totalSessions: 12,
      documentsShared: 15,
      messagesExchanged: 67,
      status: "Inactive",
    },
  ]

  const getProgressColor = (progress) => {
    if (progress >= 80) return "bg-green-500"
    if (progress >= 50) return "bg-yellow-500"
    return "bg-red-500"
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Analytics & Reports</h1>
          <p className="text-gray-600 mt-1">Track your practice performance and client insights</p>
        </div>
        <div className="flex gap-2">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-3 py-2 border border-green-200 rounded-md focus:border-green-500 focus:ring-green-500"
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
            <option value="year">This Year</option>
          </select>
          <Button className="bg-green-600 hover:bg-green-700">
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-green-200">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-gray-600">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">₹8,45,000</div>
            <p className="text-xs text-green-600 flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" />
              +15% from last month
            </p>
          </CardContent>
        </Card>
        <Card className="border-green-200">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-gray-600">Active Cases</CardTitle>
            <Scale className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">23</div>
            <p className="text-xs text-green-600">+3 new this month</p>
          </CardContent>
        </Card>
        <Card className="border-green-200">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-gray-600">Billable Hours</CardTitle>
            <Clock className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">156.5</div>
            <p className="text-xs text-green-600">This month</p>
          </CardContent>
        </Card>
        <Card className="border-green-200">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-gray-600">Client Satisfaction</CardTitle>
            <Users className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">4.8/5</div>
            <p className="text-xs text-green-600">Based on 45 reviews</p>
          </CardContent>
        </Card>
      </div>

      {/* Revenue Chart */}
      <Card className="border-green-200">
        <CardHeader>
          <CardTitle className="text-gray-900 flex items-center">
            <BarChart className="mr-2 h-5 w-5 text-green-600" />
            Revenue Trend
          </CardTitle>
          <CardDescription>Monthly revenue over the last 4 months</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {revenueData.map((data, index) => (
              <div key={data.month} className="flex items-center justify-between">
                <div className="flex items-center gap-4 flex-1">
                  <span className="text-sm font-medium text-gray-600 w-12">{data.month}</span>
                  <div className="flex-1 bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-green-600 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${(data.amount / 300000) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-semibold text-gray-900 w-20">₹{(data.amount / 1000).toFixed(0)}K</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Case Progress Tracking */}
      <Card className="border-green-200">
        <CardHeader>
          <CardTitle className="text-gray-900 flex items-center">
            <Scale className="mr-2 h-5 w-5 text-green-600" />
            Case Progress Tracking
          </CardTitle>
          <CardDescription>Monitor the progress of your active cases</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {caseProgress.map((case_) => (
              <div key={case_.id} className="border border-green-100 rounded-lg p-4">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-3">
                      <h3 className="font-semibold text-gray-900">{case_.clientName}</h3>
                      <Badge className="bg-green-100 text-green-800 w-fit">{case_.caseType}</Badge>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-gray-600 mb-3">
                      <div>
                        <span className="font-medium">Current Stage:</span>
                        <div className="text-gray-900">{case_.stage}</div>
                      </div>
                      <div>
                        <span className="font-medium">Start Date:</span>
                        <div className="text-gray-900">{case_.startDate}</div>
                      </div>
                      <div>
                        <span className="font-medium">Expected Completion:</span>
                        <div className="text-gray-900">{case_.expectedCompletion}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-medium text-gray-600">Progress:</span>
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full transition-all duration-500 ${getProgressColor(case_.progress)}`}
                          style={{ width: `${case_.progress}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-semibold text-gray-900">{case_.progress}%</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-green-600 text-green-600 hover:bg-green-50 bg-transparent"
                    >
                      View Details
                    </Button>
                    <Button size="sm" className="bg-green-600 hover:bg-green-700">
                      Update Progress
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Client Activity Report */}
      <Card className="border-green-200">
        <CardHeader>
          <CardTitle className="text-gray-900 flex items-center">
            <Users className="mr-2 h-5 w-5 text-green-600" />
            Client Activity Report
          </CardTitle>
          <CardDescription>Track client engagement and communication patterns</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {clientActivity.map((client, index) => (
              <div key={index} className="border border-green-100 rounded-lg p-4 hover:bg-green-50 transition-colors">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Users className="h-6 w-6 text-green-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                        <h3 className="font-semibold text-gray-900">{client.clientName}</h3>
                        <Badge
                          className={
                            client.status === "Active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                          }
                        >
                          {client.status}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 text-sm text-gray-600">
                        <div>
                          <span className="font-medium">Last Activity:</span>
                          <div className="text-gray-900">{client.lastActivity}</div>
                        </div>
                        <div>
                          <span className="font-medium">Sessions:</span>
                          <div className="text-gray-900">{client.totalSessions}</div>
                        </div>
                        <div>
                          <span className="font-medium">Documents:</span>
                          <div className="text-gray-900">{client.documentsShared}</div>
                        </div>
                        <div>
                          <span className="font-medium">Messages:</span>
                          <div className="text-gray-900">{client.messagesExchanged}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-green-600 text-green-600 hover:bg-green-50 bg-transparent"
                    >
                      View Profile
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-green-200">
          <CardHeader>
            <CardTitle className="text-gray-900">Case Types Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { type: "Family Law", count: 8, percentage: 35 },
                { type: "Corporate Law", count: 6, percentage: 26 },
                { type: "Criminal Law", count: 5, percentage: 22 },
                { type: "Property Law", count: 4, percentage: 17 },
              ].map((item) => (
                <div key={item.type} className="flex items-center justify-between">
                  <div className="flex items-center gap-3 flex-1">
                    <span className="text-sm font-medium text-gray-600 w-24">{item.type}</span>
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{ width: `${item.percentage}%` }}></div>
                    </div>
                    <span className="text-sm text-gray-900 w-12">{item.count}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-green-200">
          <CardHeader>
            <CardTitle className="text-gray-900">Monthly Goals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Revenue Target</span>
                  <span className="text-gray-900">₹2,85,000 / ₹3,00,000</span>
                </div>
                <div className="bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: "95%" }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Billable Hours</span>
                  <span className="text-gray-900">156.5 / 160</span>
                </div>
                <div className="bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: "98%" }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">New Clients</span>
                  <span className="text-gray-900">5 / 8</span>
                </div>
                <div className="bg-gray-200 rounded-full h-2">
                  <div className="bg-yellow-500 h-2 rounded-full" style={{ width: "62%" }}></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
