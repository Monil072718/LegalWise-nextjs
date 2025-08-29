"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, Phone, Video, MapPin, Check, X, ChevronLeft, ChevronRight } from "lucide-react"

export default function AppointmentsPage() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [viewMode, setViewMode] = useState("calendar") // calendar, list

  const appointments = [
    {
      id: 1,
      clientName: "John Doe",
      type: "Video Call",
      date: "2024-01-22",
      time: "10:00 AM",
      duration: "60 min",
      status: "Confirmed",
      caseType: "Divorce Consultation",
      notes: "Initial consultation for divorce proceedings",
    },
    {
      id: 2,
      clientName: "Jane Smith",
      type: "In-Person",
      date: "2024-01-22",
      time: "2:00 PM",
      duration: "90 min",
      status: "Pending",
      caseType: "Employment Law",
      notes: "Workplace harassment case discussion",
    },
    {
      id: 3,
      clientName: "Robert Johnson",
      type: "Phone Call",
      date: "2024-01-23",
      time: "11:00 AM",
      duration: "45 min",
      status: "Confirmed",
      caseType: "Contract Review",
      notes: "Business contract review and advice",
    },
  ]

  const pendingRequests = [
    {
      id: 1,
      clientName: "Sarah Wilson",
      requestedDate: "2024-01-25",
      requestedTime: "3:00 PM",
      type: "Video Call",
      caseType: "Property Dispute",
      message: "Need urgent consultation regarding property boundary dispute with neighbor.",
    },
    {
      id: 2,
      clientName: "Mike Brown",
      requestedDate: "2024-01-24",
      requestedTime: "10:00 AM",
      type: "In-Person",
      caseType: "Criminal Defense",
      message: "Consultation for criminal charges, need immediate legal advice.",
    },
  ]

  const getTypeIcon = (type) => {
    switch (type) {
      case "Video Call":
        return <Video className="h-4 w-4" />
      case "Phone Call":
        return <Phone className="h-4 w-4" />
      case "In-Person":
        return <MapPin className="h-4 w-4" />
      default:
        return <Calendar className="h-4 w-4" />
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "Confirmed":
        return "bg-green-100 text-green-800"
      case "Pending":
        return "bg-yellow-100 text-yellow-800"
      case "Completed":
        return "bg-blue-100 text-blue-800"
      case "Cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const acceptRequest = (requestId) => {
    console.log("Accepting request:", requestId)
    // Handle accept logic
  }

  const declineRequest = (requestId) => {
    console.log("Declining request:", requestId)
    // Handle decline logic
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Appointments & Calendar</h1>
          <p className="text-gray-600 mt-1">Manage your appointments and client requests</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant={viewMode === "calendar" ? "default" : "outline"}
            onClick={() => setViewMode("calendar")}
            className={
              viewMode === "calendar"
                ? "bg-green-600 hover:bg-green-700"
                : "border-green-600 text-green-600 hover:bg-green-50"
            }
          >
            <Calendar className="mr-2 h-4 w-4" />
            Calendar
          </Button>
          <Button
            variant={viewMode === "list" ? "default" : "outline"}
            onClick={() => setViewMode("list")}
            className={
              viewMode === "list"
                ? "bg-green-600 hover:bg-green-700"
                : "border-green-600 text-green-600 hover:bg-green-50"
            }
          >
            List View
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-green-200">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-gray-600">Today's Appointments</CardTitle>
            <Calendar className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">3</div>
            <p className="text-xs text-green-600">2 confirmed, 1 pending</p>
          </CardContent>
        </Card>
        <Card className="border-green-200">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-gray-600">This Week</CardTitle>
            <Calendar className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">12</div>
            <p className="text-xs text-green-600">8 confirmed</p>
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
            <CardTitle className="text-sm font-medium text-gray-600">Hours This Week</CardTitle>
            <Clock className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">18.5</div>
            <p className="text-xs text-green-600">Consultation hours</p>
          </CardContent>
        </Card>
      </div>

      {/* Pending Requests */}
      <Card className="border-green-200">
        <CardHeader>
          <CardTitle className="text-gray-900 flex items-center">
            <Clock className="mr-2 h-5 w-5 text-yellow-600" />
            Pending Client Requests
          </CardTitle>
          <CardDescription>New appointment requests awaiting your response</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {pendingRequests.map((request) => (
              <div key={request.id} className="border border-yellow-200 rounded-lg p-4 bg-yellow-50">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                      <h3 className="font-semibold text-gray-900">{request.clientName}</h3>
                      <Badge className="bg-yellow-100 text-yellow-800 w-fit">{request.caseType}</Badge>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm text-gray-600 mb-2">
                      <div className="flex items-center">
                        <Calendar className="h-3 w-3 mr-1 text-green-600" />
                        <span>{request.requestedDate}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-3 w-3 mr-1 text-green-600" />
                        <span>{request.requestedTime}</span>
                      </div>
                      <div className="flex items-center">
                        {getTypeIcon(request.type)}
                        <span className="ml-1">{request.type}</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-700 bg-white p-2 rounded border">{request.message}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      onClick={() => acceptRequest(request.id)}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <Check className="h-3 w-3 mr-1" />
                      Accept
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => declineRequest(request.id)}
                      className="border-red-600 text-red-600 hover:bg-red-50"
                    >
                      <X className="h-3 w-3 mr-1" />
                      Decline
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Appointments View */}
      {viewMode === "list" ? (
        <Card className="border-green-200">
          <CardHeader>
            <CardTitle className="text-gray-900">Upcoming Appointments</CardTitle>
            <CardDescription>Your scheduled appointments and meetings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {appointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="border border-green-100 rounded-lg p-4 hover:bg-green-50 transition-colors"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                        {getTypeIcon(appointment.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                          <h3 className="font-semibold text-gray-900">{appointment.clientName}</h3>
                          <Badge className={getStatusColor(appointment.status)}>{appointment.status}</Badge>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 text-sm text-gray-600 mb-2">
                          <div className="flex items-center">
                            <Calendar className="h-3 w-3 mr-1 text-green-600" />
                            <span>{appointment.date}</span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-3 w-3 mr-1 text-green-600" />
                            <span>{appointment.time}</span>
                          </div>
                          <div className="flex items-center">
                            {getTypeIcon(appointment.type)}
                            <span className="ml-1">{appointment.type}</span>
                          </div>
                          <div className="flex items-center">
                            <span className="text-green-600">{appointment.duration}</span>
                          </div>
                        </div>
                        <div className="mb-2">
                          <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded">
                            {appointment.caseType}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">{appointment.notes}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-green-600 text-green-600 hover:bg-green-50 bg-transparent"
                      >
                        Reschedule
                      </Button>
                      <Button size="sm" className="bg-green-600 hover:bg-green-700">
                        Join Meeting
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
            <div className="flex items-center justify-between">
              <CardTitle className="text-gray-900">Calendar View</CardTitle>
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="border-green-600 text-green-600 hover:bg-green-50 bg-transparent"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="text-sm font-medium px-4">January 2024</span>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-green-600 text-green-600 hover:bg-green-50 bg-transparent"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-2 mb-4">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <div key={day} className="text-center text-sm font-medium text-gray-600 p-2">
                  {day}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-2">
              {Array.from({ length: 35 }, (_, i) => {
                const day = i - 6 + 1
                const hasAppointment = [22, 23, 25].includes(day)
                return (
                  <div
                    key={i}
                    className={`aspect-square p-2 text-sm border rounded-lg cursor-pointer transition-colors ${
                      day > 0 && day <= 31
                        ? hasAppointment
                          ? "bg-green-100 border-green-300 text-green-800 hover:bg-green-200"
                          : "border-gray-200 hover:bg-gray-50"
                        : "text-gray-300"
                    }`}
                  >
                    {day > 0 && day <= 31 && (
                      <div>
                        <div className="font-medium">{day}</div>
                        {hasAppointment && (
                          <div className="text-xs mt-1">
                            <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
