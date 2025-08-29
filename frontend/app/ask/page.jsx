"use client"

import { useState } from "react"
import MainLayout from "@/components/layout/main-layout"
import { Send, Bot, Lightbulb, MessageSquare } from "lucide-react"

export default function AskPage() {
  const [question, setQuestion] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [response, setResponse] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!question.trim()) return

    setIsLoading(true)

    // Simulate AI response
    setTimeout(() => {
      setResponse(
        `Thank you for your question: "${question}". Based on general legal principles, I would recommend consulting with a qualified attorney for personalized advice. However, I can provide some general information that might be helpful. This is general information and should not be considered as legal advice.`,
      )
      setIsLoading(false)
    }, 2000)
  }

  const sampleQuestions = [
    "What are my rights as a tenant in India?",
    "How do I file for divorce in India?",
    "What is the process for registering a company?",
    "Can I sue for workplace harassment?",
    "What are the steps in filing a consumer complaint?",
    "How do I protect my intellectual property?",
  ]

  return (
    <MainLayout>
      <div className="bg-gray-50 min-h-screen">
        {/* Hero Section */}
        <section className="bg-green-600 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-white bg-opacity-20 rounded-full p-4">
                <MessageSquare className="w-12 h-12" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Ask a Legal Question</h1>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Get instant AI-powered answers to your legal questions. Our advanced AI provides general legal guidance
              24/7.
            </p>
          </div>
        </section>

        {/* Main Question Interface */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-bold text-center mb-8">Ask Your Legal Question</h2>

                <form onSubmit={handleSubmit} className="mb-8">
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Your Legal Question</label>
                    <textarea
                      value={question}
                      onChange={(e) => setQuestion(e.target.value)}
                      placeholder="Type your legal question here in detail..."
                      rows={6}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading || !question.trim()}
                    className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white py-3 rounded-lg font-medium transition-colors flex items-center justify-center"
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full w-4 h-4 border-b-2 border-white mr-2"></div>
                        Processing...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Ask AI
                      </>
                    )}
                  </button>
                </form>

                {/* Response Section */}
                {response && (
                  <div className="border-t pt-8">
                    <h3 className="text-lg font-semibold mb-4 flex items-center">
                      <Bot className="w-5 h-5 text-green-600 mr-2" />
                      AI Response
                    </h3>
                    <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                      <p className="text-gray-700 leading-relaxed">{response}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Sample Questions */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-center mb-8">Popular Legal Questions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {sampleQuestions.map((q, index) => (
                  <button
                    key={index}
                    onClick={() => setQuestion(q)}
                    className="text-left p-4 border border-gray-200 rounded-lg hover:border-green-600 hover:bg-green-50 transition-colors"
                  >
                    <div className="flex items-start">
                      <Lightbulb className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                      <p className="text-gray-700">{q}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Disclaimer */}
        <section className="py-8 bg-yellow-50 border-t border-yellow-200">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h3 className="text-lg font-semibold text-yellow-800 mb-2">Important Legal Disclaimer</h3>
              <p className="text-yellow-700">
                The AI provides general legal information and should not be considered as legal advice. For specific
                legal matters, please consult with a qualified attorney. The information provided is for educational
                purposes only and does not create an attorney-client relationship.
              </p>
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  )
}
