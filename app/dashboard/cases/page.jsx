import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Scale, Clock, CheckCircle, XCircle, User } from "lucide-react"

export default async function CasesPage() {
  const session = await getServerSession(authOptions)

  if (!session || (session.user.role !== "LAWYER" && session.user.role !== "ADMIN")) {
    redirect("/dashboard")
  }

  // Mock data - in real app, fetch from database
  const cases = [
    {
      id: 1,
      clientName: "John Doe",
      caseType: "Divorce Consultation",
      status: "PENDING",
      requestDate: "2025-01-06",
      details: "Client needs assistance with divorce proceedings and asset division.",
    },
    {
      id: 2,
      clientName: "Jane Smith",
      caseType: "Property Dispute",
      status: "ACCEPTED",
      requestDate: "2025-01-05",
      details: "Boundary dispute with neighbor regarding property lines.",
    },
    {
      id: 3,
      clientName: "Robert Johnson",
      caseType: "Business Contract Review",
      status: "COMPLETED",
      requestDate: "2025-01-04",
      details: "Review and analysis of partnership agreement terms.",
    },
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case "PENDING":
        return "bg-yellow-100 text-yellow-800"
      case "ACCEPTED":
        return "bg-green-100 text-green-800"
      case "COMPLETED":
        return "bg-blue-100 text-blue-800"
      case "REJECTED":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "PENDING":
        return <Clock className="h-4 w-4" />
      case "ACCEPTED":
        return <CheckCircle className="h-4 w-4" />
      case "COMPLETED":
        return <CheckCircle className="h-4 w-4" />
      case "REJECTED":
        return <XCircle className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Client Cases</h1>

      <div className="grid gap-6 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Total Cases</CardTitle>
            <Scale className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23</div>
            <p className="text-xs text-gray-500">+5 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-gray-500">Awaiting response</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Active</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-gray-500">Currently working</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <CheckCircle className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-gray-500">Successfully closed</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Case Requests</CardTitle>
          <CardDescription>Manage your client consultation requests</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {cases.map((case_) => (
              <div key={case_.id} className="border rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                      <User className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{case_.clientName}</h3>
                      <p className="text-sm text-gray-600">{case_.caseType}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={getStatusColor(case_.status)}>
                      {getStatusIcon(case_.status)}
                      <span className="ml-1">{case_.status}</span>
                    </Badge>
                    <span className="text-xs text-gray-500">{case_.requestDate}</span>
                  </div>
                </div>
                <p className="text-sm text-gray-700 mb-4">{case_.details}</p>
                <div className="flex space-x-2">
                  {case_.status === "PENDING" && (
                    <>
                      <Button size="sm" className="bg-green-600 hover:bg-green-700">
                        Accept Case
                      </Button>
                      <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                        Decline
                      </Button>
                    </>
                  )}
                  {case_.status === "ACCEPTED" && (
                    <>
                      <Button size="sm" variant="outline">
                        View Details
                      </Button>
                      <Button size="sm" className="bg-green-600 hover:bg-green-700">
                        Mark Complete
                      </Button>
                    </>
                  )}
                  {case_.status === "COMPLETED" && (
                    <Button size="sm" variant="outline">
                      View Case File
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
