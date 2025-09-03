"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import MainLayout from "@/components/layout/main-layout"
import {
  ChevronLeft,
  ChevronRight,
  Star,
  Users,
  BookOpen,
  Scale,
  Briefcase,
  Heart,
  Shield,
  Clock,
  CheckCircle,
  Quote,
} from "lucide-react"

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [currentLawyerSlide, setCurrentLawyerSlide] = useState(0)
  const [currentTestimonialSlide, setCurrentTestimonialSlide] = useState(0)

  // Hero slides data
  const heroSlides = [
    {
      id: 1,
      title: "Revolutionize Your Legal Queries with AI",
      subtitle: "Get instant, AI-powered assistance for all legal questions",
      description: "Access expert legal advice 24/7 with our advanced AI technology",
      image: "/placeholder.svg?height=600&width=800",
      cta: "Ask Question",
      ctaLink: "/ask",
    },
    {
      id: 2,
      title: "Connect with Expert Lawyers",
      subtitle: "Find the perfect legal expert for your needs",
      description: "Browse through our network of verified, experienced lawyers",
      image: "/placeholder.svg?height=600&width=800",
      cta: "Find Lawyers",
      ctaLink: "/lawyers",
    },
    {
      id: 3,
      title: "Comprehensive Legal Resources",
      subtitle: "Access study materials and case studies",
      description: "Enhance your legal knowledge with our extensive library",
      image: "/placeholder.svg?height=600&width=800",
      cta: "Browse Materials",
      ctaLink: "/study-material",
    },
  ]

  // Lawyer categories
  const lawyerCategories = [
    {
      id: 1,
      name: "Family Law",
      icon: <Heart className="w-8 h-8" />,
      description: "Divorce, custody, adoption",
      lawyerCount: 45,
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 2,
      name: "Corporate Law",
      icon: <Briefcase className="w-8 h-8" />,
      description: "Business, contracts, compliance",
      lawyerCount: 67,
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 3,
      name: "Criminal Law",
      icon: <Shield className="w-8 h-8" />,
      description: "Defense, prosecution, appeals",
      lawyerCount: 38,
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 4,
      name: "Property Law",
      icon: <Scale className="w-8 h-8" />,
      description: "Real estate, disputes, transactions",
      lawyerCount: 52,
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 5,
      name: "Employment Law",
      icon: <Users className="w-8 h-8" />,
      description: "Workplace rights, discrimination",
      lawyerCount: 29,
      image: "/placeholder.svg?height=200&width=300",
    },
  ]

  // Membership plans
  const membershipPlans = [
    {
      id: 1,
      name: "Basic",
      price: 999,
      period: "month",
      description: "Perfect for individuals with basic legal needs",
      features: [
        "5 AI consultations per month",
        "Access to basic legal documents",
        "Email support",
        "Basic legal resources",
      ],
      popular: false,
    },
    {
      id: 2,
      name: "Professional",
      price: 2499,
      period: "month",
      description: "Ideal for small businesses and frequent users",
      features: [
        "Unlimited AI consultations",
        "2 lawyer consultations per month",
        "Access to all legal documents",
        "Priority support",
        "Advanced legal resources",
        "Case tracking",
      ],
      popular: true,
    },
    {
      id: 3,
      name: "Enterprise",
      price: 4999,
      period: "month",
      description: "Comprehensive solution for large organizations",
      features: [
        "Unlimited AI consultations",
        "Unlimited lawyer consultations",
        "Custom legal document creation",
        "24/7 dedicated support",
        "Legal compliance monitoring",
        "Team management tools",
        "API access",
      ],
      popular: false,
    },
  ]

  // Top rated lawyers
  const topLawyers = [
    {
      id: 1,
      name: "Karan Singhania",
      specialization: "Family Law",
      rating: 4.9,
      reviews: 156,
      experience: 12,
      image: "/placeholder.svg?height=300&width=300",
      consultationFee: 2500,
      location: "Mumbai",
    },
    {
      id: 2,
      name: "Priya Sharma",
      specialization: "Corporate Law",
      rating: 4.8,
      reviews: 203,
      experience: 15,
      image: "/placeholder.svg?height=300&width=300",
      consultationFee: 3000,
      location: "Delhi",
    },
    {
      id: 3,
      name: "Vikram Patel",
      specialization: "Criminal Law",
      rating: 4.7,
      reviews: 189,
      experience: 18,
      image: "/placeholder.svg?height=300&width=300",
      consultationFee: 3500,
      location: "Bangalore",
    },
    {
      id: 4,
      name: "Ritu Malhotra",
      specialization: "Property Law",
      rating: 4.9,
      reviews: 134,
      experience: 10,
      image: "/placeholder.svg?height=300&width=300",
      consultationFee: 2800,
      location: "Chennai",
    },
  ]

  // Testimonials
  const testimonials = [
    {
      id: 1,
      name: "Rajesh Kumar",
      role: "Business Owner",
      content:
        "LegalWize helped me navigate complex corporate law issues with ease. The AI assistance was incredibly helpful, and when I needed human expertise, the lawyers were top-notch.",
      rating: 5,
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 2,
      name: "Priya Mehta",
      role: "Individual Client",
      content:
        "Going through a divorce was emotionally challenging, but LegalWize's family law experts provided compassionate and professional guidance throughout the process.",
      rating: 5,
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 3,
      name: "Amit Sharma",
      role: "Startup Founder",
      content:
        "The legal resources and AI consultations have been invaluable for my startup. Quick answers to legal questions without the hefty consultation fees.",
      rating: 5,
      image: "/placeholder.svg?height=100&width=100",
    },
  ]

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [heroSlides.length])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonialSlide((prev) => (prev + 1) % testimonials.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [testimonials.length])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)
  }

  const nextLawyerSlide = () => {
    setCurrentLawyerSlide((prev) => (prev + 1) % Math.ceil(topLawyers.length / 3))
  }

  const prevLawyerSlide = () => {
    setCurrentLawyerSlide((prev) => (prev - 1 + Math.ceil(topLawyers.length / 3)) % Math.ceil(topLawyers.length / 3))
  }

  return (
    <MainLayout>
      <div className="min-h-screen">
        {/* Hero Banner with Slider */}
        <section className="relative h-screen overflow-hidden">
          <div className="absolute inset-0">
            {heroSlides.map((slide, index) => (
              <div
                key={slide.id}
                className={`absolute inset-0 transition-transform duration-1000 ease-in-out ${
                  index === currentSlide
                    ? "translate-x-0"
                    : index < currentSlide
                      ? "-translate-x-full"
                      : "translate-x-full"
                }`}
              >
                <div className="relative h-full">
                  <div className="absolute inset-0 bg-black bg-opacity-40"></div>
                  <div className="relative z-10 h-full flex items-center">
                    <div className="container mx-auto px-4">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="text-white">
                          <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">{slide.title}</h1>
                          <p className="text-xl md:text-2xl mb-4 animate-fade-in-delay-1">{slide.subtitle}</p>
                          <p className="text-lg mb-8 opacity-90 animate-fade-in-delay-2">{slide.description}</p>
                          <Link
                            href={slide.ctaLink}
                            className="inline-block bg-white text-green-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 animate-fade-in-delay-3"
                          >
                            {slide.cta}
                          </Link>
                        </div>
                        <div className="hidden lg:block">
                          <Image
                            src={slide.image || "/placeholder.svg"}
                            alt={slide.title}
                            width={600}
                            height={400}
                            className="rounded-lg shadow-2xl animate-float"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-3 rounded-full transition-all duration-300"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-3 rounded-full transition-all duration-300"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Slide Indicators */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide ? "bg-white" : "bg-white bg-opacity-50"
                }`}
              />
            ))}
          </div>
        </section>

        {/* Thanks to AI Section */}
        <section className="py-20 bg-gradient-to-br from-blue-50 to-green-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Powered by Advanced AI Technology</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Our cutting-edge artificial intelligence provides instant, accurate legal guidance, making legal
                assistance accessible to everyone, anytime, anywhere.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mb-6 mx-auto">
                  <Clock className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">24/7 Availability</h3>
                <p className="text-gray-600 text-center">
                  Get instant legal assistance any time of day or night. Our AI never sleeps, ensuring you have access
                  to legal guidance whenever you need it.
                </p>
              </div>

              <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mb-6 mx-auto">
                  <BookOpen className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">Vast Legal Knowledge</h3>
                <p className="text-gray-600 text-center">
                  Trained on extensive legal databases, case law, and regulations. Our AI provides comprehensive answers
                  across all areas of law.
                </p>
              </div>

              <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mb-6 mx-auto">
                  <Shield className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">Secure & Confidential</h3>
                <p className="text-gray-600 text-center">
                  Your legal queries are completely confidential and secure. We use enterprise-grade encryption to
                  protect your sensitive information.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Browse Lawyers by Category */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Browse Lawyers by Specialization</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Find the perfect legal expert for your specific needs from our network of verified, experienced lawyers.
              </p>
            </div>

            <div className="relative">
              <div className="overflow-hidden">
                <div
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${currentLawyerSlide * 100}%)` }}
                >
                  {Array.from({ length: Math.ceil(lawyerCategories.length / 3) }).map((_, slideIndex) => (
                    <div key={slideIndex} className="w-full flex-shrink-0">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {lawyerCategories.slice(slideIndex * 3, (slideIndex + 1) * 3).map((category) => (
                          <div
                            key={category.id}
                            className="group bg-gradient-to-br from-gray-50 to-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-3"
                          >
                            <div className="relative h-48 overflow-hidden">
                              <Image
                                src={category.image || "/placeholder.svg"}
                                alt={category.name}
                                width={300}
                                height={200}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                              <div className="absolute bottom-4 left-4 text-white">
                                <div className="bg-white/20 rounded-full p-2 mb-2">{category.icon}</div>
                              </div>
                            </div>
                            <div className="p-6">
                              <h3 className="text-2xl font-bold text-gray-900 mb-2">{category.name}</h3>
                              <p className="text-gray-600 mb-4">{category.description}</p>
                              <div className="flex items-center justify-between">
                                <span className="text-green-600 font-semibold">{category.lawyerCount} Lawyers</span>
                                <Link
                                  href={`/lawyers?category=${category.name.toLowerCase().replace(" ", "-")}`}
                                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors duration-300"
                                >
                                  Browse
                                </Link>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation Arrows */}
              <button
                onClick={prevLawyerSlide}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white shadow-lg hover:shadow-xl text-gray-800 p-3 rounded-full transition-all duration-300"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextLawyerSlide}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white shadow-lg hover:shadow-xl text-gray-800 p-3 rounded-full transition-all duration-300"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        </section>

        {/* Membership Plans */}
        <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Choose Your Membership Plan</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Select the perfect plan that fits your legal needs and budget. All plans include our AI-powered legal
                assistance.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {membershipPlans.map((plan) => (
                <div
                  key={plan.id}
                  className={`relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 ${
                    plan.popular ? "ring-4 ring-green-500 scale-105" : ""
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className="bg-green-500 text-white px-6 py-2 rounded-full text-sm font-semibold">
                        Most Popular
                      </span>
                    </div>
                  )}

                  <div className="p-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                    <p className="text-gray-600 mb-6">{plan.description}</p>

                    <div className="mb-6">
                      <span className="text-4xl font-bold text-gray-900">₹{plan.price}</span>
                      <span className="text-gray-600">/{plan.period}</span>
                    </div>

                    <ul className="space-y-3 mb-8">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-center">
                          <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <button
                      className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 ${
                        plan.popular
                          ? "bg-green-600 hover:bg-green-700 text-white"
                          : "bg-gray-100 hover:bg-gray-200 text-gray-900"
                      }`}
                    >
                      Choose Plan
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Highest Rated Lawyers */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Our Highest Rated Lawyers</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Meet our top-rated legal experts who have consistently delivered exceptional results for our clients.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {topLawyers.map((lawyer) => (
                <div
                  key={lawyer.id}
                  className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-3 overflow-hidden"
                >
                  <div className="relative">
                    <Image
                      src={lawyer.image || "/placeholder.svg"}
                      alt={lawyer.name}
                      width={300}
                      height={300}
                      className="w-full h-64 object-cover"
                    />
                    <div className="absolute top-4 right-4 bg-white rounded-full px-3 py-1 flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                      <span className="text-sm font-semibold">{lawyer.rating}</span>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{lawyer.name}</h3>
                    <p className="text-green-600 font-semibold mb-2">{lawyer.specialization}</p>
                    <p className="text-gray-600 text-sm mb-4">{lawyer.location}</p>

                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <span>{lawyer.experience} years exp.</span>
                      <span>{lawyer.reviews} reviews</span>
                    </div>

                    <div className="border-t pt-4">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-lg font-bold text-green-600">₹{lawyer.consultationFee}</span>
                        <span className="text-sm text-gray-500">consultation</span>
                      </div>
                      <Link
                        href={`/lawyers/${lawyer.id}`}
                        className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-medium transition-colors duration-300 text-center block"
                      >
                        View Profile
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 bg-gradient-to-br from-green-50 to-blue-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">What Our Clients Say</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Don't just take our word for it. Here's what our satisfied clients have to say about their experience
                with LegalWize.
              </p>
            </div>

            <div className="relative max-w-4xl mx-auto">
              <div className="overflow-hidden">
                {testimonials.map((testimonial, index) => (
                  <div
                    key={testimonial.id}
                    className={`transition-all duration-500 ${
                      index === currentTestimonialSlide ? "opacity-100 translate-x-0" : "opacity-0 absolute inset-0"
                    }`}
                  >
                    <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
                      <Quote className="w-12 h-12 text-green-500 mb-6" />
                      <p className="text-xl text-gray-700 mb-8 leading-relaxed">"{testimonial.content}"</p>
                      <div className="flex items-center">
                        <Image
                          src={testimonial.image || "/placeholder.svg"}
                          alt={testimonial.name}
                          width={60}
                          height={60}
                          className="rounded-full mr-4"
                        />
                        <div>
                          <h4 className="text-lg font-bold text-gray-900">{testimonial.name}</h4>
                          <p className="text-gray-600">{testimonial.role}</p>
                          <div className="flex items-center mt-1">
                            {[...Array(testimonial.rating)].map((_, i) => (
                              <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Testimonial Indicators */}
              <div className="flex justify-center mt-8 space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonialSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentTestimonialSlide ? "bg-green-600" : "bg-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-green-600 to-blue-600">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to Get Started?</h2>
            <p className="text-xl text-white mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied clients who trust LegalWize for their legal needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/register"
                className="bg-white text-green-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105"
              >
                Get Started Free
              </Link>
              <Link
                href="/contact"
                className="border-2 border-white text-white hover:bg-white hover:text-green-600 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </section>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
        
        .animate-fade-in-delay-1 {
          animation: fade-in 1s ease-out 0.2s both;
        }
        
        .animate-fade-in-delay-2 {
          animation: fade-in 1s ease-out 0.4s both;
        }
        
        .animate-fade-in-delay-3 {
          animation: fade-in 1s ease-out 0.6s both;
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </MainLayout>
  )
}
