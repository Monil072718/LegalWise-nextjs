import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, MessageSquare, Scale, Users } from "lucide-react"

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/login")
  }

  // Different dashboard views based on user role
  if (session.user.role === "ADMIN") {
    return <AdminDashboard />
  } else if (session.user.role === "LAWYER") {
    return <LawyerDashboard />
  }

  return <UserDashboard userName={session.user.name || "User"} />
}

function UserDashboard({ userName }) {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Welcome back, {userName}</h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Legal AI Chats</CardTitle>
            <MessageSquare className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-gray-500">+2 from last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Books Purchased</CardTitle>
            <BookOpen className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-gray-500">+1 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Documents Downloaded</CardTitle>
            <Scale className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7</div>
            <p className="text-xs text-gray-500">+3 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Lawyer Consultations</CardTitle>
            <Users className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-xs text-gray-500">Same as last month</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent AI Chats</CardTitle>
            <CardDescription>Your recent legal AI conversations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border-b pb-2">
                <h3 className="font-medium">Tenant Rights Question</h3>
                <p className="text-sm text-gray-500">Yesterday at 2:30 PM</p>
              </div>
              <div className="border-b pb-2">
                <h3 className="font-medium">Employment Contract Review</h3>
                <p className="text-sm text-gray-500">June 5, 2025</p>
              </div>
              <div>
                <h3 className="font-medium">Small Claims Court Process</h3>
                <p className="text-sm text-gray-500">June 2, 2025</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>Your recent book purchases</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border-b pb-2">
                <h3 className="font-medium">Constitutional Law: Principles and Policies</h3>
                <p className="text-sm text-gray-500">Order #12345 - Delivered</p>
              </div>
              <div>
                <h3 className="font-medium">Contract Law: A Comprehensive Guide</h3>
                <p className="text-sm text-gray-500">Order #12346 - Processing</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function LawyerDashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Lawyer Dashboard</h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Active Cases</CardTitle>
            <Scale className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-gray-500">+2 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Pending Requests</CardTitle>
            <Users className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-gray-500">+1 from yesterday</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Completed Cases</CardTitle>
            <Scale className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-gray-500">+3 from last month</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Client Requests</CardTitle>
          <CardDescription>New client consultation requests</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="border-b pb-2">
              <h3 className="font-medium">John Doe - Divorce Consultation</h3>
              <p className="text-sm text-gray-500">Requested: June 6, 2025</p>
            </div>
            <div className="border-b pb-2">
              <h3 className="font-medium">Jane Smith - Property Dispute</h3>
              <p className="text-sm text-gray-500">Requested: June 5, 2025</p>
            </div>
            <div>
              <h3 className="font-medium">Robert Johnson - Business Contract Review</h3>
              <p className="text-sm text-gray-500">Requested: June 4, 2025</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function AdminDashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">245</div>
            <p className="text-xs text-gray-500">+22 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Registered Lawyers</CardTitle>
            <Scale className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18</div>
            <p className="text-xs text-gray-500">+3 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <BookOpen className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87</div>
            <p className="text-xs text-gray-500">+12 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">AI Chat Sessions</CardTitle>
            <MessageSquare className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">532</div>
            <p className="text-xs text-gray-500">+78 from last month</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent User Registrations</CardTitle>
            <CardDescription>New users in the last 7 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border-b pb-2">
                <h3 className="font-medium">Sarah Williams</h3>
                <p className="text-sm text-gray-500">User - Registered: June 6, 2025</p>
              </div>
              <div className="border-b pb-2">
                <h3 className="font-medium">Michael Brown</h3>
                <p className="text-sm text-gray-500">User - Registered: June 5, 2025</p>
              </div>
              <div className="border-b pb-2">
                <h3 className="font-medium">Jennifer Davis</h3>
                <p className="text-sm text-gray-500">Lawyer - Registered: June 4, 2025</p>
              </div>
              <div>
                <h3 className="font-medium">David Wilson</h3>
                <p className="text-sm text-gray-500">User - Registered: June 3, 2025</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>Latest book purchases</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border-b pb-2">
                <h3 className="font-medium">Order #12350</h3>
                <p className="text-sm text-gray-500">User: John Smith - $59.99</p>
                <p className="text-xs text-gray-500">June 6, 2025 - Pending</p>
              </div>
              <div className="border-b pb-2">
                <h3 className="font-medium">Order #12349</h3>
                <p className="text-sm text-gray-500">User: Emily Johnson - $89.99</p>
                <p className="text-xs text-gray-500">June 5, 2025 - Confirmed</p>
              </div>
              <div>
                <h3 className="font-medium">Order #12348</h3>
                <p className="text-sm text-gray-500">User: Robert Davis - $129.99</p>
                <p className="text-xs text-gray-500">June 4, 2025 - Delivered</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
