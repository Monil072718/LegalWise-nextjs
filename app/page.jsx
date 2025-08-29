import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, MessageSquare, Scale, Users, Clock, Calendar } from "lucide-react"
import { Badge, Button } from "@/components/ui/button"

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
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Lawyer Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome back! Here's your practice overview</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 bg-green-50 px-3 py-1 rounded-full">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-sm text-green-700 font-medium">Online</span>
          </div>
        </div>
      </div>

      {/* Key Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-green-200">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-gray-600">Active Cases</CardTitle>
            <Scale className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">8</div>
            <p className="text-xs text-green-600">+2 from last month</p>
          </CardContent>
        </Card>
        <Card className="border-green-200">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-gray-600">Pending Requests</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">5</div>
            <p className="text-xs text-yellow-600">Awaiting response</p>
          </CardContent>
        </Card>
        <Card className="border-green-200">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-gray-600">Upcoming Appointments</CardTitle>
            <Calendar className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">3</div>
            <p className="text-xs text-blue-600">Today</p>
          </CardContent>
        </Card>
        <Card className="border-green-200">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-gray-600">Unread Messages</CardTitle>
            <MessageSquare className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">7</div>
            <p className="text-xs text-purple-600">From 4 clients</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Active Cases */}
        <Card className="border-green-200">
          <CardHeader>
            <CardTitle className="text-gray-900 flex items-center">
              <Scale className="mr-2 h-5 w-5 text-green-600" />
              Active Cases
            </CardTitle>
            <CardDescription>Your current ongoing cases</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border-b pb-3">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium text-gray-900">John Doe - Divorce Case</h3>
                  <Badge className="bg-green-100 text-green-800">In Progress</Badge>
                </div>
                <p className="text-sm text-gray-600 mb-2">Document review phase</p>
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: "75%" }}></div>
                  </div>
                  <span className="text-xs text-gray-600">75%</span>
                </div>
              </div>
              <div className="border-b pb-3">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium text-gray-900">Jane Smith - Employment Law</h3>
                  <Badge className="bg-yellow-100 text-yellow-800">Evidence Collection</Badge>
                </div>
                <p className="text-sm text-gray-600 mb-2">Gathering workplace harassment evidence</p>
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div className="bg-yellow-500 h-2 rounded-full" style={{ width: "45%" }}></div>
                  </div>
                  <span className="text-xs text-gray-600">45%</span>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium text-gray-900">Robert Johnson - Contract Review</h3>
                  <Badge className="bg-blue-100 text-blue-800">Final Review</Badge>
                </div>
                <p className="text-sm text-gray-600 mb-2">Business partnership agreement</p>
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: "90%" }}></div>
                  </div>
                  <span className="text-xs text-gray-600">90%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Pending Client Requests */}
        <Card className="border-green-200">
          <CardHeader>
            <CardTitle className="text-gray-900 flex items-center">
              <Clock className="mr-2 h-5 w-5 text-yellow-600" />
              Pending Client Requests
            </CardTitle>
            <CardDescription>New consultation requests</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border-b pb-3">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium text-gray-900">Sarah Wilson</h3>
                  <span className="text-xs text-gray-500">2 hours ago</span>
                </div>
                <p className="text-sm text-gray-600 mb-2">Property boundary dispute consultation</p>
                <div className="flex gap-2">
                  <Button size="sm" className="bg-green-600 hover:bg-green-700">
                    Accept
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-red-600 text-red-600 hover:bg-red-50 bg-transparent"
                  >
                    Decline
                  </Button>
                </div>
              </div>
              <div className="border-b pb-3">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium text-gray-900">Mike Brown</h3>
                  <span className="text-xs text-gray-500">5 hours ago</span>
                </div>
                <p className="text-sm text-gray-600 mb-2">Criminal defense consultation</p>
                <div className="flex gap-2">
                  <Button size="sm" className="bg-green-600 hover:bg-green-700">
                    Accept
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-red-600 text-red-600 hover:bg-red-50 bg-transparent"
                  >
                    Decline
                  </Button>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium text-gray-900">Lisa Anderson</h3>
                  <span className="text-xs text-gray-500">1 day ago</span>
                </div>
                <p className="text-sm text-gray-600 mb-2">Corporate compliance review</p>
                <div className="flex gap-2">
                  <Button size="sm" className="bg-green-600 hover:bg-green-700">
                    Accept
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-red-600 text-red-600 hover:bg-red-50 bg-transparent"
                  >
                    Decline
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Appointments */}
        <Card className="border-green-200">
          <CardHeader>
            <CardTitle className="text-gray-900 flex items-center">
              <Calendar className="mr-2 h-5 w-5 text-blue-600" />
              Today's Appointments
            </CardTitle>
            <CardDescription>Your scheduled meetings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                <div className="w-2 h-12 bg-blue-600 rounded-full"></div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">John Doe</h3>
                  <p className="text-sm text-gray-600">Divorce consultation</p>
                  <p className="text-xs text-blue-600">10:00 AM - Video Call</p>
                </div>
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                  Join
                </Button>
              </div>
              <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                <div className="w-2 h-12 bg-green-600 rounded-full"></div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">Jane Smith</h3>
                  <p className="text-sm text-gray-600">Case update meeting</p>
                  <p className="text-xs text-green-600">2:00 PM - In Person</p>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-green-600 text-green-600 hover:bg-green-50 bg-transparent"
                >
                  Details
                </Button>
              </div>
              <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg">
                <div className="w-2 h-12 bg-yellow-600 rounded-full"></div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">Robert Johnson</h3>
                  <p className="text-sm text-gray-600">Contract review</p>
                  <p className="text-xs text-yellow-600">4:30 PM - Phone Call</p>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-yellow-600 text-yellow-600 hover:bg-yellow-50 bg-transparent"
                >
                  Call
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Messages */}
        <Card className="border-green-200">
          <CardHeader>
            <CardTitle className="text-gray-900 flex items-center">
              <MessageSquare className="mr-2 h-5 w-5 text-purple-600" />
              Recent Messages
            </CardTitle>
            <CardDescription>Latest client communications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Users className="h-4 w-4 text-purple-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-medium text-gray-900 text-sm">John Doe</h3>
                    <span className="text-xs text-gray-500">2 min ago</span>
                  </div>
                  <p className="text-sm text-gray-600 truncate">Thank you for the consultation. When can we...</p>
                  <Badge className="bg-purple-100 text-purple-800 text-xs mt-1">Unread</Badge>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Users className="h-4 w-4 text-green-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-medium text-gray-900 text-sm">Jane Smith</h3>
                    <span className="text-xs text-gray-500">1 hour ago</span>
                  </div>
                  <p className="text-sm text-gray-600 truncate">I've uploaded the employment contract...</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Users className="h-4 w-4 text-blue-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-medium text-gray-900 text-sm">Robert Johnson</h3>
                    <span className="text-xs text-gray-500">3 hours ago</span>
                  </div>
                  <p className="text-sm text-gray-600 truncate">Could you please review the contract terms...</p>
                  <Badge className="bg-blue-100 text-blue-800 text-xs mt-1">Unread</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
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
