import MainLayout from "@/components/layout/main-layout"
import Link from "next/link"
import { Star, MapPin, Calendar, Award, Users } from "lucide-react"

export default function LawyersPage() {
  const lawyers = [
    {
      id: 1,
      name: "Karan Singhania",
      specialization: "Family Law",
      experience: 12,
      rating: 4.8,
      reviews: 156,
      location: "Mumbai, Maharashtra",
      consultationFee: 2500,
      languages: ["English", "Hindi", "Marathi"],
    },
    {
      id: 2,
      name: "Vikram Patel",
      specialization: "Corporate Law",
      experience: 15,
      rating: 4.6,
      reviews: 203,
      location: "Delhi, NCR",
      consultationFee: 3000,
      languages: ["English", "Hindi", "Gujarati"],
    },
    {
      id: 3,
      name: "Ritu Malhotra",
      specialization: "Employment Law",
      experience: 10,
      rating: 4.9,
      reviews: 189,
      location: "Bangalore, Karnataka",
      consultationFee: 2200,
      languages: ["English", "Hindi", "Kannada"],
    },
  ]

  return (
    <MainLayout>
      <div className="bg-gray-50 min-h-screen">
        {/* Hero Section */}
        <section className="bg-green-600 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Find Expert Lawyers</h1>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Connect with experienced lawyers specialized in various legal domains across India
            </p>
          </div>
        </section>

        {/* Lawyers Grid */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {lawyers.map((lawyer) => (
                <div
                  key={lawyer.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="relative">
                    <div className="w-full h-64 bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-400">Lawyer Photo</span>
                    </div>
                    <div className="absolute top-4 right-4 bg-white rounded-full px-2 py-1 flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="ml-1 text-sm font-medium">{lawyer.rating}</span>
                    </div>
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
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-lg font-bold text-green-600">₹{lawyer.consultationFee}</span>
                        <span className="text-sm text-gray-500">per consultation</span>
                      </div>

                      <div className="flex space-x-2">
                        <Link
                          href={`/lawyers/${lawyer.id}`}
                          className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md font-medium text-center transition-colors"
                        >
                          View Profile
                        </Link>
                        <button className="px-4 py-2 border border-green-600 text-green-600 rounded-md hover:bg-green-50 transition-colors">
                          <Calendar className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  )
}
