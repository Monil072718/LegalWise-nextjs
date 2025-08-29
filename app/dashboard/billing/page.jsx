"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CreditCard, Download, Eye, Plus, Search, DollarSign, Clock, FileText, Send } from "lucide-react"

export default function BillingPage() {
  const [activeTab, setActiveTab] = useState("invoices")

  const consultationHours = [
    {
      id: 1,
      clientName: "John Doe",
      date: "2024-01-20",
      duration: "2.5 hours",
      rate: 2500,
      total: 6250,
      status: "Billed",
      caseType: "Divorce",
    },
    {
      id: 2,
      clientName: "Jane Smith",
      date: "2024-01-19",
      duration: "1.5 hours",
      rate: 2500,
      total: 3750,
      status: "Pending",
      caseType: "Employment Law",
    },
    {
      id: 3,
      clientName: "Robert Johnson",
      date: "2024-01-18",
      duration: "3 hours",
      rate: 2500,
      total: 7500,
      status: "Billed",
      caseType: "Contract Review",
    },
  ]

  const invoices = [
    {
      id: "INV-001",
      clientName: "John Doe",
      amount: 15000,
      issueDate: "2024-01-15",
      dueDate: "2024-02-15",
      status: "Paid",
      services: ["Divorce Consultation", "Document Preparation"],
    },
    {
      id: "INV-002",
      clientName: "Jane Smith",
      amount: 8000,
      issueDate: "2024-01-10",
      dueDate: "2024-02-10",
      status: "Pending",
      services: ["Employment Law Consultation"],
    },
    {
      id: "INV-003",
      clientName: "Robert Johnson",
      amount: 12000,
      issueDate: "2024-01-05",
      dueDate: "2024-02-05",
      status: "Overdue",
      services: ["Contract Review", "Legal Advice"],
    },
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case "Paid":
        return "bg-green-100 text-green-800"
      case "Pending":
        return "bg-yellow-100 text-yellow-800"
      case "Overdue":
        return "bg-red-100 text-red-800"
      case "Billed":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const generateInvoice = (clientId) => {
    console.log("Generating invoice for client:", clientId)
    // Handle invoice generation
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Billing & Payments</h1>
          <p className="text-gray-600 mt-1">Track consultation hours and manage invoices</p>
        </div>
        <Button className="bg-green-600 hover:bg-green-700 w-full sm:w-auto">
          <Plus className="mr-2 h-4 w-4" />
          Create Invoice
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-green-200">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-gray-600">This Month Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">₹2,85,000</div>
            <p className="text-xs text-green-600">+12% from last month</p>
          </CardContent>
        </Card>
        <Card className="border-green-200">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-gray-600">Consultation Hours</CardTitle>
            <Clock className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">42.5</div>
            <p className="text-xs text-green-600">This month</p>
          </CardContent>
        </Card>
        <Card className="border-green-200">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-gray-600">Pending Invoices</CardTitle>
            <FileText className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">5</div>
            <p className="text-xs text-yellow-600">₹45,000 pending</p>
          </CardContent>
        </Card>
        <Card className="border-green-200">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-gray-600">Average Rate</CardTitle>
            <CreditCard className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">₹2,500</div>
            <p className="text-xs text-green-600">Per hour</p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
        <button
          onClick={() => setActiveTab("hours")}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeTab === "hours" ? "bg-green-600 text-white" : "text-gray-600 hover:text-gray-900"
          }`}
        >
          Consultation Hours
        </button>
        <button
          onClick={() => setActiveTab("invoices")}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeTab === "invoices" ? "bg-green-600 text-white" : "text-gray-600 hover:text-gray-900"
          }`}
        >
          Invoices
        </button>
      </div>

      {/* Search */}
      <Card className="border-green-200">
        <CardHeader>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder={`Search ${activeTab === "hours" ? "consultation records" : "invoices"}...`}
              className="pl-10 border-green-200 focus:border-green-500 focus:ring-green-500"
            />
          </div>
        </CardHeader>
      </Card>

      {/* Content based on active tab */}
      {activeTab === "hours" ? (
        <Card className="border-green-200">
          <CardHeader>
            <CardTitle className="text-gray-900">Consultation Hours</CardTitle>
            <CardDescription>Track your billable consultation hours</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {consultationHours.map((record) => (
                <div
                  key={record.id}
                  className="border border-green-100 rounded-lg p-4 hover:bg-green-50 transition-colors"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <Clock className="h-6 w-6 text-green-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                          <h3 className="font-semibold text-gray-900">{record.clientName}</h3>
                          <Badge className={getStatusColor(record.status)}>{record.status}</Badge>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 text-sm text-gray-600 mb-2">
                          <div>Date: {record.date}</div>
                          <div>Duration: {record.duration}</div>
                          <div>Rate: ₹{record.rate}/hour</div>
                          <div className="font-semibold text-green-600">Total: ₹{record.total}</div>
                        </div>
                        <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded">{record.caseType}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {record.status === "Pending" && (
                        <Button
                          size="sm"
                          onClick={() => generateInvoice(record.id)}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          Generate Invoice
                        </Button>
                      )}
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-green-600 text-green-600 hover:bg-green-50 bg-transparent"
                      >
                        <Eye className="h-3 w-3 mr-1" />
                        View
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="border-green-200">
          <CardHeader>
            <CardTitle className="text-gray-900">Invoices</CardTitle>
            <CardDescription>Manage and track your invoices</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {invoices.map((invoice) => (
                <div
                  key={invoice.id}
                  className="border border-green-100 rounded-lg p-4 hover:bg-green-50 transition-colors"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <FileText className="h-6 w-6 text-green-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                          <h3 className="font-semibold text-gray-900">{invoice.id}</h3>
                          <Badge className={getStatusColor(invoice.status)}>{invoice.status}</Badge>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 text-sm text-gray-600 mb-2">
                          <div>Client: {invoice.clientName}</div>
                          <div>Issue Date: {invoice.issueDate}</div>
                          <div>Due Date: {invoice.dueDate}</div>
                          <div className="font-semibold text-green-600">Amount: ₹{invoice.amount.toLocaleString()}</div>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {invoice.services.map((service, index) => (
                            <span key={index} className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded">
                              {service}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-green-600 text-green-600 hover:bg-green-50 bg-transparent"
                      >
                        <Eye className="h-3 w-3 mr-1" />
                        View
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-green-600 text-green-600 hover:bg-green-50 bg-transparent"
                      >
                        <Download className="h-3 w-3 mr-1" />
                        Download
                      </Button>
                      {invoice.status === "Pending" && (
                        <Button size="sm" className="bg-green-600 hover:bg-green-700">
                          <Send className="h-3 w-3 mr-1" />
                          Send Reminder
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
