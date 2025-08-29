import MainLayout from "@/components/layout/main-layout"
import Link from "next/link"
import { Clock, User, ArrowRight } from "lucide-react"

export default function CaseStudyPage() {
  const caseStudies = [
    {
      id: 1,
      title: "Landmark Property Rights Case: Sharma vs. State",
      category: "Property Law",
      description:
        "A detailed analysis of the precedent-setting property rights case and its implications for future property disputes.",
      author: "Dr. Rajesh Kumar",
      date: "2024-01-15",
      readTime: "12 min read",
      tags: ["Property Rights", "Supreme Court", "Landmark Case"],
    },
    {
      id: 2,
      title: "Corporate Liability Precedent: Tech Corp vs. Consumers",
      category: "Corporate Law",
      description: "Examining the landmark case that redefined corporate liability standards in the digital age.",
      author: "Adv. Priya Sharma",
      date: "2024-01-10",
      readTime: "15 min read",
      tags: ["Corporate Liability", "Consumer Rights", "Technology"],
    },
    {
      id: 3,
      title: "Constitutional Challenge: Right to Privacy",
      category: "Constitutional Law",
      description:
        "Analysis of the historic case that established privacy as a fundamental right under the Constitution.",
      author: "Justice (Retd.) Meera Nair",
      date: "2024-01-05",
      readTime: "18 min read",
      tags: ["Privacy Rights", "Constitutional Law", "Fundamental Rights"],
    },
  ]

  return (
    <MainLayout>
      <div className="bg-gray-50 min-h-screen">
        {/* Hero Section */}
        <section className="bg-green-600 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Legal Case Studies</h1>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Explore our collection of detailed legal case studies, landmark decisions, and their real-world
              implications
            </p>
          </div>
        </section>

        {/* Case Studies Grid */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8">All Case Studies</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {caseStudies.map((study) => (
                <article
                  key={study.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="relative">
                    <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-400">Case Study Image</span>
                    </div>
                    <div className="absolute top-4 left-4">
                      <span className="bg-green-600 text-white text-xs px-2 py-1 rounded-full">{study.category}</span>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">{study.title}</h3>

                    <p className="text-gray-600 mb-4 line-clamp-3">{study.description}</p>

                    <div className="flex items-center text-sm text-gray-500 mb-4">
                      <User className="w-4 h-4 mr-1" />
                      <span className="mr-4">{study.author}</span>
                      <Clock className="w-4 h-4 mr-1" />
                      <span>{study.readTime}</span>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {study.tags.map((tag) => (
                        <span key={tag} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <Link
                      href={`/case-study/${study.id}`}
                      className="inline-flex items-center text-green-600 hover:text-green-700 font-medium"
                    >
                      Read Case Study
                      <ArrowRight className="ml-1 w-4 h-4" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  )
}
