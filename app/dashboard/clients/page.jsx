import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Users, Search, Phone, Mail, Calendar, FileText, Eye } from "lucide-react"
import Link from "next/link"

export default async function ClientsPage() {
  const session = await getServerSession(authOptions)

  if (!session || (session.user.role !== "LAWYER" && session.user.role !== "ADMIN")) {
    redirect("/dashboard")
  }

  // Mock client data
  const clients = [
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@email.com",
      phone: "+91 9876543210",
      joinDate: "2024-01-15",
      status: "Active",
      totalCases: 3,
      activeCases: 1,
      lastContact: "2024-01-20",
      caseTypes: ["Divorce", "Property Dispute"],
      totalBilled: 15000,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@email.com",
      phone: "+91 9876543211",
      joinDate: "2024-01-10",
      status: "Active",
      totalCases: 2,
      activeCases: 2,
      lastContact: "2024-01-19",
      caseTypes: ["Employment Law"],
      totalBilled: 8000,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 3,
      name: "Robert Johnson",
      email: "robert.j@email.com",
      phone: "+91 9876543212",
      joinDate: "2023-12-20",
      status: "Inactive",
      totalCases: 1,
      activeCases: 0,
      lastContact: "2024-01-05",
      caseTypes: ["Contract Review"],
      totalBilled: 5000,
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Client Management</h1>
          <p className="text-gray-600 mt-1">Manage your clients and their case history</p>
        </div>
        <Button className="bg-green-600 hover:bg-green-700 w-full sm:w-auto">
          <Users className="mr-2 h-4 w-4" />
          Add New Client
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-green-200">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-gray-600">Total Clients</CardTitle>
            <Users className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">23</div>
            <p className="text-xs text-green-600">+2 from last month</p>
          </CardContent>
        </Card>
        <Card className="border-green-200">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-gray-600">Active Clients</CardTitle>
            <Users className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">18</div>
            <p className="text-xs text-green-600">Currently engaged</p>
          </CardContent>
        </Card>
        <Card className="border-green-200">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-gray-600">New This Month</CardTitle>
            <Users className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">5</div>
            <p className="text-xs text-green-600">+25% increase</p>
          </CardContent>
        </Card>
        <Card className="border-green-200">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-gray-600">Total Revenue</CardTitle>
            <Users className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">₹2.8L</div>
            <p className="text-xs text-green-600">This month</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card className="border-green-200">
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search clients by name, email, or phone..."
                className="pl-10 border-green-200 focus:border-green-500 focus:ring-green-500"
              />
            </div>
            <div className="flex gap-2">
              <select className="px-3 py-2 border border-green-200 rounded-md focus:border-green-500 focus:ring-green-500">
                <option>All Status</option>
                <option>Active</option>
                <option>Inactive</option>
              </select>
              <select className="px-3 py-2 border border-green-200 rounded-md focus:border-green-500 focus:ring-green-500">
                <option>All Cases</option>
                <option>Family Law</option>
                <option>Corporate Law</option>
                <option>Criminal Law</option>
              </select>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Clients List */}
      <Card className="border-green-200">
        <CardHeader>
          <CardTitle className="text-gray-900">All Clients</CardTitle>
          <CardDescription>Complete list of your clients with case details</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {clients.map((client) => (
              <div
                key={client.id}
                className="border border-green-100 rounded-lg p-4 hover:bg-green-50 transition-colors"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Users className="h-6 w-6 text-green-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                        <h3 className="font-semibold text-gray-900">{client.name}</h3>
                        <Badge
                          variant={client.status === "Active" ? "default" : "secondary"}
                          className={client.status === "Active" ? "bg-green-100 text-green-800" : ""}
                        >
                          {client.status}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 text-sm text-gray-600">
                        <div className="flex items-center">
                          <Mail className="h-3 w-3 mr-1 text-green-600" />
                          <span className="truncate">{client.email}</span>
                        </div>
                        <div className="flex items-center">
                          <Phone className="h-3 w-3 mr-1 text-green-600" />
                          <span>{client.phone}</span>
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1 text-green-600" />
                          <span>Joined: {client.joinDate}</span>
                        </div>
                        <div className="flex items-center">
                          <FileText className="h-3 w-3 mr-1 text-green-600" />
                          <span>{client.activeCases} Active Cases</span>
                        </div>
                      </div>
                      <div className="mt-2">
                        <div className="flex flex-wrap gap-1">
                          {client.caseTypes.map((type, index) => (
                            <span key={index} className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded">
                              {type}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <div className="text-right mb-2 sm:mb-0 sm:mr-4">
                      <div className="text-sm font-semibold text-gray-900">₹{client.totalBilled.toLocaleString()}</div>
                      <div className="text-xs text-gray-500">Total Billed</div>
                    </div>
                    <div className="flex gap-2">
                      <Link href={`/dashboard/clients/${client.id}`}>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-green-600 text-green-600 hover:bg-green-50 bg-transparent"
                        >
                          <Eye className="h-3 w-3 mr-1" />
                          View
                        </Button>
                      </Link>
                      <Button size="sm" className="bg-green-600 hover:bg-green-700">
                        Contact
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
