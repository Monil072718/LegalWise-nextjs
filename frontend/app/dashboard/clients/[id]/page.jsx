import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { User, Phone, Mail, Calendar, FileText, MessageSquare, Download } from "lucide-react"
import Link from "next/link"

export default async function ClientDetailPage({ params }) {
  const session = await getServerSession(authOptions)

  if (!session || (session.user.role !== "LAWYER" && session.user.role !== "ADMIN")) {
    redirect("/dashboard")
  }

  // Mock client data - in real app, fetch from database using params.id
  const client = {
    id: params.id,
    name: "John Doe",
    email: "john.doe@email.com",
    phone: "+91 9876543210",
    address: "123 Main Street, Mumbai, Maharashtra 400001",
    joinDate: "2024-01-15",
    status: "Active",
    totalCases: 3,
    activeCases: 1,
    completedCases: 2,
    totalBilled: 45000,
    totalPaid: 30000,
    pendingAmount: 15000,
    lastContact: "2024-01-20",
    avatar: "/placeholder.svg?height=100&width=100",
  }

  const caseHistory = [
    {
      id: 1,
      title: "Divorce Proceedings",
      type: "Family Law",
      status: "Active",
      startDate: "2024-01-15",
      endDate: null,
      description: "Mutual consent divorce case with asset division",
      documents: 8,
      billedAmount: 25000,
      stage: "Document Review",
    },
    {
      id: 2,
      title: "Property Dispute Resolution",
      type: "Property Law",
      status: "Completed",
      startDate: "2023-10-01",
      endDate: "2023-12-15",
      description: "Boundary dispute with neighbor resolved through mediation",
      documents: 12,
      billedAmount: 15000,
      stage: "Closed",
    },
    {
      id: 3,
      title: "Contract Review",
      type: "Corporate Law",
      status: "Completed",
      startDate: "2023-08-01",
      endDate: "2023-09-01",
      description: "Business partnership agreement review and amendments",
      documents: 5,
      billedAmount: 5000,
      stage: "Closed",
    },
  ]

  const documents = [
    {
      id: 1,
      name: "Divorce Petition Draft.pdf",
      type: "Legal Document",
      uploadDate: "2024-01-18",
      size: "2.4 MB",
      caseId: 1,
    },
    {
      id: 2,
      name: "Asset Division Agreement.pdf",
      type: "Agreement",
      uploadDate: "2024-01-17",
      size: "1.8 MB",
      caseId: 1,
    },
    {
      id: 3,
      name: "Property Survey Report.pdf",
      type: "Evidence",
      uploadDate: "2023-11-15",
      size: "5.2 MB",
      caseId: 2,
    },
  ]

  const communications = [
    {
      id: 1,
      type: "Email",
      subject: "Case Update - Divorce Proceedings",
      date: "2024-01-20",
      time: "10:30 AM",
      content: "Sent case update regarding document review progress",
    },
    {
      id: 2,
      type: "Phone Call",
      subject: "Consultation Call",
      date: "2024-01-18",
      time: "2:00 PM",
      content: "45-minute consultation regarding asset division",
    },
    {
      id: 3,
      type: "Meeting",
      subject: "In-Person Consultation",
      date: "2024-01-15",
      time: "11:00 AM",
      content: "Initial consultation and case assessment",
    },
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800"
      case "Completed":
        return "bg-blue-100 text-blue-800"
      case "On Hold":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Client Details</h1>
          <p className="text-gray-600 mt-1">Complete client information and case history</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="border-green-600 text-green-600 hover:bg-green-50 bg-transparent">
            <MessageSquare className="mr-2 h-4 w-4" />
            Message Client
          </Button>
          <Button className="bg-green-600 hover:bg-green-700">
            <Calendar className="mr-2 h-4 w-4" />
            Schedule Meeting
          </Button>
        </div>
      </div>

      {/* Client Overview */}
      <Card className="border-green-200">
        <CardHeader>
          <CardTitle className="text-gray-900">Client Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                  <User className="h-10 w-10 text-green-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">{client.name}</h2>
                  <Badge className={getStatusColor(client.status)}>{client.status}</Badge>
                </div>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-green-600" />
                  <span className="text-gray-600">Email:</span>
                  <span className="text-gray-900">{client.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-green-600" />
                  <span className="text-gray-600">Phone:</span>
                  <span className="text-gray-900">{client.phone}</span>
                </div>
                <div className="flex items-start gap-2">
                  <User className="h-4 w-4 text-green-600 mt-0.5" />
                  <span className="text-gray-600">Address:</span>
                  <span className="text-gray-900">{client.address}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-green-600" />
                  <span className="text-gray-600">Client Since:</span>
                  <span className="text-gray-900">{client.joinDate}</span>
                </div>
              </div>
            </div>
            <div className="lg:col-span-2">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{client.totalCases}</div>
                  <div className="text-sm text-gray-600">Total Cases</div>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{client.activeCases}</div>
                  <div className="text-sm text-gray-600">Active Cases</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">₹{client.totalBilled.toLocaleString()}</div>
                  <div className="text-sm text-gray-600">Total Billed</div>
                </div>
                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                  <div className="text-2xl font-bold text-yellow-600">₹{client.pendingAmount.toLocaleString()}</div>
                  <div className="text-sm text-gray-600">Pending</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Information Tabs */}
      <Tabs defaultValue="cases" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="cases">Case History</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="communications">Communications</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
        </TabsList>

        <TabsContent value="cases">
          <Card className="border-green-200">
            <CardHeader>
              <CardTitle className="text-gray-900">Case History</CardTitle>
              <CardDescription>All cases handled for this client</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {caseHistory.map((case_) => (
                  <div key={case_.id} className="border border-green-100 rounded-lg p-4">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                          <h3 className="font-semibold text-gray-900">{case_.title}</h3>
                          <Badge className={getStatusColor(case_.status)}>{case_.status}</Badge>
                          <Badge variant="outline" className="border-green-600 text-green-600">
                            {case_.type}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">{case_.description}</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 text-sm text-gray-600">
                          <div>Start: {case_.startDate}</div>
                          <div>End: {case_.endDate || "Ongoing"}</div>
                          <div>Documents: {case_.documents}</div>
                          <div>Billed: ₹{case_.billedAmount.toLocaleString()}</div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Link href={`/dashboard/cases/${case_.id}`}>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-green-600 text-green-600 hover:bg-green-50 bg-transparent"
                          >
                            View Case
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents">
          <Card className="border-green-200">
            <CardHeader>
              <CardTitle className="text-gray-900">Documents</CardTitle>
              <CardDescription>All documents related to this client</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {documents.map((doc) => (
                  <div
                    key={doc.id}
                    className="flex items-center justify-between p-4 border border-green-100 rounded-lg hover:bg-green-50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                        <FileText className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{doc.name}</h3>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <span>{doc.type}</span>
                          <span>{doc.uploadDate}</span>
                          <span>{doc.size}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-green-600 text-green-600 hover:bg-green-50 bg-transparent"
                      >
                        <Download className="h-3 w-3 mr-1" />
                        Download
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="communications">
          <Card className="border-green-200">
            <CardHeader>
              <CardTitle className="text-gray-900">Communication History</CardTitle>
              <CardDescription>All interactions with this client</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {communications.map((comm) => (
                  <div key={comm.id} className="flex items-start gap-4 p-4 border border-green-100 rounded-lg">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      {comm.type === "Email" && <Mail className="h-5 w-5 text-green-600" />}
                      {comm.type === "Phone Call" && <Phone className="h-5 w-5 text-green-600" />}
                      {comm.type === "Meeting" && <Calendar className="h-5 w-5 text-green-600" />}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-medium text-gray-900">{comm.subject}</h3>
                        <div className="text-sm text-gray-500">
                          {comm.date} at {comm.time}
                        </div>
                      </div>
                      <p className="text-sm text-gray-600">{comm.content}</p>
                      <Badge variant="outline" className="mt-2 text-xs">
                        {comm.type}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="billing">
          <Card className="border-green-200">
            <CardHeader>
              <CardTitle className="text-gray-900">Billing Information</CardTitle>
              <CardDescription>Payment history and outstanding amounts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">₹{client.totalBilled.toLocaleString()}</div>
                  <div className="text-sm text-gray-600">Total Billed</div>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">₹{client.totalPaid.toLocaleString()}</div>
                  <div className="text-sm text-gray-600">Total Paid</div>
                </div>
                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                  <div className="text-2xl font-bold text-yellow-600">₹{client.pendingAmount.toLocaleString()}</div>
                  <div className="text-sm text-gray-600">Outstanding</div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-green-100 rounded-lg">
                  <div>
                    <h3 className="font-medium text-gray-900">Invoice #INV-001</h3>
                    <p className="text-sm text-gray-600">Divorce consultation and document preparation</p>
                    <p className="text-xs text-gray-500">Due: 2024-02-15</p>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-gray-900">₹25,000</div>
                    <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 border border-green-100 rounded-lg">
                  <div>
                    <h3 className="font-medium text-gray-900">Invoice #INV-002</h3>
                    <p className="text-sm text-gray-600">Property dispute resolution</p>
                    <p className="text-xs text-gray-500">Paid: 2023-12-20</p>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-gray-900">₹15,000</div>
                    <Badge className="bg-green-100 text-green-800">Paid</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
