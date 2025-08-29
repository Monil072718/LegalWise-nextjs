"use client"

import Link from "next/link"

import { useState } from "react"
import MainLayout from "@/components/layout/main-layout"
import { Download, Eye, ShoppingCart, X, Star, Heart } from "lucide-react"
import Image from "next/image"

export default function StudyMaterialPage() {
  const [selectedBook, setSelectedBook] = useState(null)
  const [activeTab, setActiveTab] = useState("all")

  const materials = [
    {
      id: 1,
      title: "Constitutional Law Fundamentals",
      category: "Constitutional Law",
      description: "Comprehensive study materials on constitutional principles and landmark cases.",
      downloadCount: 1250,
      pages: 45,
      type: "PDF",
      price: 0,
      isPurchasable: false,
      author: "Dr. Legal Expert",
      rating: 4.8,
      reviews: 156,
      image: "/placeholder.svg?height=300&width=200",
    },
    {
      id: 2,
      title: "Criminal Procedure Code",
      category: "Criminal Law",
      description: "In-depth resources on criminal procedures and landmark cases.",
      downloadCount: 980,
      pages: 67,
      type: "PDF",
      price: 0,
      isPurchasable: false,
      author: "Prof. Criminal Law",
      rating: 4.6,
      reviews: 89,
      image: "/placeholder.svg?height=300&width=200",
    },
    {
      id: 3,
      title: "Corporate Law Essentials",
      category: "Corporate Law",
      description: "Essential materials for understanding business legal frameworks.",
      downloadCount: 756,
      pages: 52,
      type: "PDF",
      price: 0,
      isPurchasable: false,
      author: "Business Law Institute",
      rating: 4.7,
      reviews: 234,
      image: "/placeholder.svg?height=300&width=200",
    },
    // Books for purchase
    {
      id: 4,
      title: "Advanced Constitutional Law",
      category: "Constitutional Law",
      description:
        "Deep dive into constitutional law with case studies and practical applications. Perfect for law students and practitioners.",
      downloadCount: 0,
      pages: 450,
      type: "Book",
      price: 1299,
      isPurchasable: true,
      author: "Justice Retired Sharma",
      rating: 4.9,
      reviews: 342,
      image: "/placeholder.svg?height=300&width=200",
      publisher: "Legal Publications",
      isbn: "978-0123456789",
      edition: "3rd Edition",
      language: "English",
      features: ["Hardcover", "Latest Case Laws", "Practice Questions", "Online Resources"],
    },
    {
      id: 5,
      title: "Criminal Law Practice Manual",
      category: "Criminal Law",
      description: "Comprehensive manual for criminal law practice with real case studies and procedural guidelines.",
      downloadCount: 0,
      pages: 380,
      type: "Book",
      price: 999,
      isPurchasable: true,
      author: "Adv. Priya Malhotra",
      rating: 4.8,
      reviews: 198,
      image: "/placeholder.svg?height=300&width=200",
      publisher: "Criminal Law Press",
      isbn: "978-0987654321",
      edition: "2nd Edition",
      language: "English",
      features: ["Paperback", "Updated Procedures", "Case Studies", "Forms & Templates"],
    },
    {
      id: 6,
      title: "Corporate Compliance Guide",
      category: "Corporate Law",
      description:
        "Complete guide to corporate compliance, governance, and regulatory requirements for modern businesses.",
      downloadCount: 0,
      pages: 520,
      type: "Book",
      price: 1599,
      isPurchasable: true,
      author: "Corporate Law Experts",
      rating: 4.7,
      reviews: 276,
      image: "/placeholder.svg?height=300&width=200",
      publisher: "Business Law Publications",
      isbn: "978-0456789123",
      edition: "1st Edition",
      language: "English",
      features: ["Hardcover", "Compliance Checklists", "Regulatory Updates", "Digital Access"],
    },
  ]

  const categories = [
    { id: "all", name: "All Materials", count: materials.length },
    { id: "pdf", name: "Free PDFs", count: materials.filter((m) => !m.isPurchasable).length },
    { id: "books", name: "Books for Purchase", count: materials.filter((m) => m.isPurchasable).length },
    {
      id: "constitutional",
      name: "Constitutional Law",
      count: materials.filter((m) => m.category === "Constitutional Law").length,
    },
    { id: "criminal", name: "Criminal Law", count: materials.filter((m) => m.category === "Criminal Law").length },
    { id: "corporate", name: "Corporate Law", count: materials.filter((m) => m.category === "Corporate Law").length },
  ]

  const filteredMaterials = materials.filter((material) => {
    if (activeTab === "all") return true
    if (activeTab === "pdf") return !material.isPurchasable
    if (activeTab === "books") return material.isPurchasable
    if (activeTab === "constitutional") return material.category === "Constitutional Law"
    if (activeTab === "criminal") return material.category === "Criminal Law"
    if (activeTab === "corporate") return material.category === "Corporate Law"
    return true
  })

  const addToCart = (book) => {
    // In a real app, this would add to cart state/context
    console.log("Added to cart:", book)
    alert(`${book.title} added to cart!`)
  }

  const downloadPDF = (material) => {
    // In a real app, this would trigger download
    console.log("Downloading:", material)
    alert(`Downloading ${material.title}...`)
  }

  return (
    <MainLayout>
      <div className="bg-gray-50 min-h-screen">
        {/* Hero Section */}
        <section className="bg-green-600 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Study Materials & Legal Books</h1>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Access our comprehensive collection of free legal study materials and purchase premium legal books
            </p>
            <div className="flex justify-center">
              <div className="bg-white rounded-lg p-1 flex items-center max-w-md w-full">
                <input
                  type="text"
                  placeholder="Search materials and books..."
                  className="flex-1 px-4 py-2 text-gray-900 bg-transparent outline-none"
                />
                <button className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition-colors">
                  Search
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Categories Filter */}
        <section className="py-8 bg-white border-b">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveTab(category.id)}
                  className={`px-4 py-2 rounded-full border transition-colors ${
                    activeTab === category.id
                      ? "bg-green-600 text-white border-green-600"
                      : "border-gray-300 text-gray-700 hover:bg-green-600 hover:text-white hover:border-green-600"
                  }`}
                >
                  {category.name} ({category.count})
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Materials Grid */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredMaterials.map((material) => (
                <div
                  key={material.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => setSelectedBook(material)}
                >
                  <div className="relative">
                    <Image
                      src={material.image || "/placeholder.svg"}
                      alt={material.title}
                      width={200}
                      height={300}
                      className="w-full h-64 object-cover"
                    />
                    <div className="absolute top-2 left-2">
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          material.isPurchasable ? "bg-blue-100 text-blue-800" : "bg-green-100 text-green-800"
                        }`}
                      >
                        {material.type}
                      </span>
                    </div>
                    {material.isPurchasable && (
                      <div className="absolute top-2 right-2">
                        <button className="bg-white rounded-full p-1 hover:bg-gray-100 transition-colors">
                          <Heart className="w-4 h-4 text-gray-600" />
                        </button>
                      </div>
                    )}
                    <div className="absolute bottom-2 left-2 flex items-center bg-white rounded-full px-2 py-1">
                      <Star className="w-3 h-3 text-yellow-400 fill-current mr-1" />
                      <span className="text-xs font-medium">{material.rating}</span>
                    </div>
                  </div>

                  <div className="p-4">
                    <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">{material.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">by {material.author}</p>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">{material.description}</p>

                    <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                      <span className="flex items-center">
                        <Eye className="w-3 h-3 mr-1" />
                        {material.pages} pages
                      </span>
                      <span>{material.reviews} reviews</span>
                    </div>

                    {material.isPurchasable ? (
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-green-600">₹{material.price}</span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            addToCart(material)
                          }}
                          className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm transition-colors flex items-center"
                        >
                          <ShoppingCart className="w-3 h-3 mr-1" />
                          Add to Cart
                        </button>
                      </div>
                    ) : (
                      <div className="flex space-x-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            downloadPDF(material)
                          }}
                          className="flex-1 bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded text-sm font-medium transition-colors flex items-center justify-center"
                        >
                          <Download className="w-3 h-3 mr-1" />
                          Download
                        </button>
                        <button className="px-3 py-2 border border-gray-300 text-gray-700 rounded text-sm hover:bg-gray-50 transition-colors">
                          Preview
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Book Detail Modal */}
        {selectedBook && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Book Details</h2>
                <button
                  onClick={() => setSelectedBook(null)}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Book Image */}
                  <div>
                    <Image
                      src={selectedBook.image || "/placeholder.svg"}
                      alt={selectedBook.title}
                      width={400}
                      height={600}
                      className="w-full max-w-md mx-auto rounded-lg shadow-lg"
                    />
                  </div>

                  {/* Book Details */}
                  <div>
                    <div className="mb-4">
                      <span
                        className={`inline-block text-xs px-3 py-1 rounded-full mb-2 ${
                          selectedBook.isPurchasable ? "bg-blue-100 text-blue-800" : "bg-green-100 text-green-800"
                        }`}
                      >
                        {selectedBook.type}
                      </span>
                      <h1 className="text-3xl font-bold text-gray-900 mb-2">{selectedBook.title}</h1>
                      <p className="text-lg text-gray-600 mb-2">by {selectedBook.author}</p>
                      <div className="flex items-center mb-4">
                        <div className="flex items-center mr-4">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < Math.floor(selectedBook.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                              }`}
                            />
                          ))}
                          <span className="ml-2 text-sm text-gray-600">
                            {selectedBook.rating} ({selectedBook.reviews} reviews)
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="mb-6">
                      <h3 className="text-lg font-semibold mb-2">Description</h3>
                      <p className="text-gray-700 leading-relaxed">{selectedBook.description}</p>
                    </div>

                    {selectedBook.isPurchasable && (
                      <div className="mb-6">
                        <h3 className="text-lg font-semibold mb-3">Book Details</h3>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-gray-600">Publisher:</span>
                            <span className="ml-2 font-medium">{selectedBook.publisher}</span>
                          </div>
                          <div>
                            <span className="text-gray-600">Edition:</span>
                            <span className="ml-2 font-medium">{selectedBook.edition}</span>
                          </div>
                          <div>
                            <span className="text-gray-600">Pages:</span>
                            <span className="ml-2 font-medium">{selectedBook.pages}</span>
                          </div>
                          <div>
                            <span className="text-gray-600">Language:</span>
                            <span className="ml-2 font-medium">{selectedBook.language}</span>
                          </div>
                          <div className="col-span-2">
                            <span className="text-gray-600">ISBN:</span>
                            <span className="ml-2 font-medium">{selectedBook.isbn}</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {selectedBook.features && (
                      <div className="mb-6">
                        <h3 className="text-lg font-semibold mb-3">Features</h3>
                        <div className="flex flex-wrap gap-2">
                          {selectedBook.features.map((feature, index) => (
                            <span key={index} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="border-t pt-6">
                      {selectedBook.isPurchasable ? (
                        <div>
                          <div className="flex items-center justify-between mb-4">
                            <span className="text-3xl font-bold text-green-600">₹{selectedBook.price}</span>
                            <span className="text-sm text-gray-500">Free shipping on orders over ₹500</span>
                          </div>
                          <div className="flex space-x-3">
                            <button
                              onClick={() => addToCart(selectedBook)}
                              className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-medium transition-colors flex items-center justify-center"
                            >
                              <ShoppingCart className="w-4 h-4 mr-2" />
                              Add to Cart
                            </button>
                            <button className="px-6 py-3 border border-green-600 text-green-600 rounded-lg hover:bg-green-50 transition-colors">
                              Buy Now
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex space-x-3">
                          <button
                            onClick={() => downloadPDF(selectedBook)}
                            className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-medium transition-colors flex items-center justify-center"
                          >
                            <Download className="w-4 h-4 mr-2" />
                            Download PDF
                          </button>
                          <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                            Preview
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* CTA Section */}
        <section className="py-16 bg-green-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Need More Resources?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Join our premium membership to access exclusive study materials and expert guidance
            </p>
            <Link
              href="/register"
              className="inline-block bg-white text-green-600 hover:bg-gray-100 px-8 py-3 rounded-md font-medium transition-colors"
            >
              Upgrade to Premium
            </Link>
          </div>
        </section>
      </div>
    </MainLayout>
  )
}
