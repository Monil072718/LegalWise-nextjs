"use client"

import { useState } from "react"
import MainLayout from "@/components/layout/main-layout"
import { Calendar, Phone, Video, MapPin, Star, Users, Award } from "lucide-react"
import Image from "next/image"

export default function ConsultPage() {
  const [selectedLawyer, setSelectedLawyer] = useState(null)
  const [consultationType, setConsultationType] = useState("")

  const consultationTypes = [
    {
      icon: <Phone className="w-8 h-8" />,
      title: "Phone Consultation",
      description: "Speak directly with our legal experts over the phone",
      duration: "30-60 minutes",
      discount: 0,
    },
    {
      icon: <Video className="w-8 h-8" />,
      title: "Video Call",
      description: "Face-to-face consultation via secure video call",
      duration: "30-60 minutes",
      discount: 0,
    },
    {
      icon: <MapPin className="w-8 h-8" />,
      title: "In-Person Meeting",
      description: "Meet with our lawyers at our office locations",
      duration: "60 minutes",
      discount: 0,
    },
  ]

  const lawyers = [
    {
      id: 1,
      name: "Karan Singhania",
      specialization: "Family Law",
      experience: 12,
      rating: 4.8,
      reviews: 156,
      location: "Mumbai, Maharashtra",
      image: "/placeholder.svg?height=300&width=300",
      consultationFee: 2500,
      languages: ["English", "Hindi", "Marathi"],
      bio: "Experienced family law attorney specializing in divorce, child custody, and domestic relations.",
      achievements: ["Best Family Lawyer 2023", "10+ Years Experience", "150+ Cases Won"],
    },
    {
      id: 2,
      name: "Vikram Patel",
      specialization: "Corporate Law",
      experience: 15,
      rating: 4.6,
      reviews: 203,
      location: "Delhi, NCR",
      image: "/placeholder.svg?height=300&width=300",
      consultationFee: 3000,
      languages: ["English", "Hindi", "Gujarati"],
      bio: "Corporate law expert with extensive experience in mergers, acquisitions, and business compliance.",
      achievements: ["Corporate Lawyer of the Year", "15+ Years Experience", "200+ Corporate Cases"],
    },
    {
      id: 3,
      name: "Ritu Malhotra",
      specialization: "Employment Law",
      experience: 10,
      rating: 4.9,
      reviews: 189,
      location: "Bangalore, Karnataka",
      image: "/placeholder.svg?height=300&width=300",
      consultationFee: 2200,
      languages: ["English", "Hindi", "Kannada"],
      bio: "Employment law specialist focusing on workplace rights, discrimination, and labor disputes.",
      achievements: ["Employment Rights Advocate", "10+ Years Experience", "95% Success Rate"],
    },
    {
      id: 4,
      name: "Maya Gupta",
      specialization: "Environmental Law",
      experience: 8,
      rating: 4.7,
      reviews: 134,
      location: "Chennai, Tamil Nadu",
      image: "/placeholder.svg?height=300&width=300",
      consultationFee: 2800,
      languages: ["English", "Hindi", "Tamil"],
      bio: "Environmental law expert dedicated to protecting natural resources and fighting pollution cases.",
      achievements: ["Environmental Champion 2022", "8+ Years Experience", "Green Lawyer Award"],
    },
    {
      id: 5,
      name: "Arjun Sharma",
      specialization: "Criminal Law",
      experience: 18,
      rating: 4.5,
      reviews: 267,
      location: "Kolkata, West Bengal",
      image: "/placeholder.svg?height=300&width=300",
      consultationFee: 3500,
      languages: ["English", "Hindi", "Bengali"],
      bio: "Criminal defense attorney with a strong track record in defending complex criminal cases.",
      achievements: ["Criminal Defense Expert", "18+ Years Experience", "300+ Cases Handled"],
    },
    {
      id: 6,
      name: "Priya Reddy",
      specialization: "Intellectual Property",
      experience: 9,
      rating: 4.8,
      reviews: 145,
      location: "Hyderabad, Telangana",
      image: "/placeholder.svg?height=300&width=300",
      consultationFee: 2600,
      languages: ["English", "Hindi", "Telugu"],
      bio: "IP law specialist helping businesses protect their intellectual property and trademarks.",
      achievements: ["IP Law Expert", "9+ Years Experience", "Patent Specialist"],
    },
  ]

  const specializations = [
    "Family Law",
    "Corporate Law",
    "Criminal Law",
    "Property Law",
    "Employment Law",
    "Intellectual Property",
    "Tax Law",
    "Environmental Law",
    "Immigration Law",
    "Other",
  ]

  const calculatePrice = (baseFee) => {
    let price = baseFee
    if (consultationType === "Phone Consultation") {
      price = baseFee * 0.8 // 20% discount for phone
    } else if (consultationType === "Video Call") {
      price = baseFee * 0.9 // 10% discount for video
    }
    return price
  }

  return (
    <MainLayout>
      <div className="bg-gray-50 min-h-screen">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Consult an Expert</h1>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Book a consultation with our experienced legal experts. Get personalized advice for your specific legal
              needs.
            </p>
          </div>
        </section>

        {/* Consultation Types */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8">Choose Your Consultation Type</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {consultationTypes.map((type, index) => (
                <div
                  key={index}
                  className={`bg-gray-50 rounded-lg p-6 text-center hover:shadow-lg transition-all duration-300 cursor-pointer border-2 ${
                    consultationType === type.title ? "border-green-500 bg-green-50" : "border-transparent"
                  }`}
                  onClick={() => setConsultationType(type.title)}
                >
                  <div className="bg-green-100 rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <div className="text-green-600">{type.icon}</div>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{type.title}</h3>
                  <p className="text-gray-600 mb-4">{type.description}</p>
                  <div className="text-sm text-gray-500 mb-2">Duration: {type.duration}</div>
                  {consultationType === type.title && <div className="text-green-600 font-semibold">Selected</div>}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Available Lawyers */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8">Choose Your Lawyer</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {lawyers.map((lawyer) => (
                <div
                  key={lawyer.id}
                  className={`bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer border-2 ${
                    selectedLawyer?.id === lawyer.id ? "border-green-500" : "border-transparent"
                  }`}
                  onClick={() => setSelectedLawyer(lawyer)}
                >
                  <div className="relative">
                    <Image
                      src={lawyer.image || "/placeholder.svg"}
                      alt={lawyer.name}
                      width={300}
                      height={300}
                      className="w-full h-64 object-cover"
                    />
                    <div className="absolute top-4 right-4 bg-white rounded-full px-2 py-1 flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="ml-1 text-sm font-medium">{lawyer.rating}</span>
                    </div>
                    {selectedLawyer?.id === lawyer.id && (
                      <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        Selected
                      </div>
                    )}
                  </div>

                  <div className="p-6">
                    <div className="mb-4">
                      <h3 className="text-xl font-bold text-gray-900 mb-1">{lawyer.name}</h3>
                      <p className="text-green-600 font-medium">{lawyer.specialization}</p>
                      <div className="flex items-center text-sm text-gray-500 mt-1">
                        <MapPin className="w-4 h-4 mr-1" />
                        <span>{lawyer.location}</span>
                      </div>
                    </div>

                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{lawyer.bio}</p>

                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <span className="flex items-center">
                        <Award className="w-4 h-4 mr-1" />
                        {lawyer.experience} years exp.
                      </span>
                      <span className="flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        {lawyer.reviews} reviews
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-4">
                      {lawyer.languages.map((lang) => (
                        <span key={lang} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                          {lang}
                        </span>
                      ))}
                    </div>

                    <div className="border-t pt-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-lg font-bold text-green-600">
                          ₹{consultationType ? calculatePrice(lawyer.consultationFee) : lawyer.consultationFee}
                        </span>
                        <span className="text-sm text-gray-500">consultation</span>
                      </div>
                      {consultationType && consultationType !== "In-Person Meeting" && (
                        <p className="text-xs text-green-600">
                          {consultationType === "Phone Consultation" ? "20% discount applied" : "10% discount applied"}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Booking Form */}
        {selectedLawyer && consultationType && (
          <section className="py-12 bg-white">
            <div className="container mx-auto px-4">
              <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8 border">
                <h2 className="text-2xl font-bold text-center mb-8">Book Your Consultation</h2>

                {/* Selected Details */}
                <div className="bg-green-50 rounded-lg p-4 mb-6">
                  <h3 className="font-semibold text-green-800 mb-2">Consultation Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Lawyer: </span>
                      <span className="font-medium">{selectedLawyer.name}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Specialization: </span>
                      <span className="font-medium">{selectedLawyer.specialization}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Type: </span>
                      <span className="font-medium">{consultationType}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Fee: </span>
                      <span className="font-medium text-green-600">
                        ₹{calculatePrice(selectedLawyer.consultationFee)}
                      </span>
                    </div>
                  </div>
                </div>

                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
                      <input
                        type="text"
                        required
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
                        placeholder="Your first name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
                      <input
                        type="text"
                        required
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
                        placeholder="Your last name"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                    <input
                      type="email"
                      required
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
                      placeholder="your.email@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
                      placeholder="+91 1234567890"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Date & Time</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input
                        type="date"
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
                      />
                      <input
                        type="time"
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Describe Your Legal Matter *</label>
                    <textarea
                      required
                      rows={4}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
                      placeholder="Please provide details about your legal matter..."
                    ></textarea>
                  </div>

                  <div className="flex items-start">
                    <input type="checkbox" required className="mt-1 mr-2 text-green-600" />
                    <label className="text-sm text-gray-600">
                      I agree to the{" "}
                      <a href="/terms" className="text-green-600 hover:underline">
                        Terms of Service
                      </a>{" "}
                      and
                      <a href="/privacy" className="text-green-600 hover:underline">
                        {" "}
                        Privacy Policy
                      </a>
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-medium transition-colors flex items-center justify-center"
                  >
                    <Calendar className="w-4 h-4 mr-2" />
                    Book Consultation - ₹{calculatePrice(selectedLawyer.consultationFee)}
                  </button>
                </form>
              </div>
            </div>
          </section>
        )}

        {/* Process Steps */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="bg-green-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                  <span className="text-green-600 font-bold">1</span>
                </div>
                <h3 className="font-semibold mb-2">Choose Consultation Type</h3>
                <p className="text-gray-600 text-sm">Select your preferred consultation method</p>
              </div>
              <div className="text-center">
                <div className="bg-green-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                  <span className="text-green-600 font-bold">2</span>
                </div>
                <h3 className="font-semibold mb-2">Select Lawyer</h3>
                <p className="text-gray-600 text-sm">Choose from our expert lawyers</p>
              </div>
              <div className="text-center">
                <div className="bg-green-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                  <span className="text-green-600 font-bold">3</span>
                </div>
                <h3 className="font-semibold mb-2">Book & Pay</h3>
                <p className="text-gray-600 text-sm">Complete booking and secure payment</p>
              </div>
              <div className="text-center">
                <div className="bg-green-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                  <span className="text-green-600 font-bold">4</span>
                </div>
                <h3 className="font-semibold mb-2">Get Consultation</h3>
                <p className="text-gray-600 text-sm">Receive expert legal advice</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  )
}
