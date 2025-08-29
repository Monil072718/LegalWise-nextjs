"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MessageSquare } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function ChatPage() {
  const { data: session } = useSession()
  const { toast } = useToast()
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [conversations, setConversations] = useState({
    general: [],
    "family-law": [],
    "criminal-law": [],
    "property-law": [],
  })
  const [activeTab, setActiveTab] = useState("general")
  const messagesEndRef = useRef(null)

  useEffect(() => {
    scrollToBottom()
  }, [conversations[activeTab]])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleSendMessage = async (e) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    // Add user message to conversation
    const userMessage = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    }

    setConversations((prev) => ({
      ...prev,
      [activeTab]: [...prev[activeTab], userMessage],
    }))

    setInput("")
    setIsLoading(true)

    try {
      // In a real app, this would be an API call to OpenAI or another LLM
      // For now, we'll simulate a response after a delay
      setTimeout(() => {
        const assistantMessage = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: generateMockResponse(input, activeTab),
          timestamp: new Date(),
        }

        setConversations((prev) => ({
          ...prev,
          [activeTab]: [...prev[activeTab], assistantMessage],
        }))

        setIsLoading(false)
      }, 1000)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to get a response. Please try again.",
        variant: "destructive",
      })
      setIsLoading(false)
    }
  }

  const generateMockResponse = (input, category) => {
    // This is a mock function - in a real app, you would call the OpenAI API
    const responses = {
      general: [
        "Based on general legal principles, I would advise consulting with a lawyer who specializes in this area for personalized advice.",
        "From a legal perspective, this situation typically involves several considerations including jurisdiction, applicable statutes, and case precedent.",
        "While I can provide general information, please note that this isn't legal advice and laws vary by jurisdiction.",
      ],
      "family-law": [
        "In family law matters like this, courts typically prioritize the best interests of any children involved.",
        "Family law varies significantly by jurisdiction, but generally speaking, mediation might be a good first step before litigation.",
        "For divorce proceedings, you'll typically need to consider asset division, potential alimony, and if applicable, child custody arrangements.",
      ],
      "criminal-law": [
        "In criminal cases, the burden of proof is on the prosecution to prove guilt beyond a reasonable doubt.",
        "You have the right to legal representation in criminal proceedings. If you cannot afford an attorney, one may be appointed for you.",
        "Criminal law consequences can include fines, probation, or incarceration depending on the severity of the offense.",
      ],
      "property-law": [
        "Property disputes often involve reviewing deeds, titles, and any existing agreements between parties.",
        "For landlord-tenant issues, both parties have specific rights and responsibilities outlined in your lease and local housing laws.",
        "Zoning laws and regulations can significantly impact what you're allowed to do with your property.",
      ],
    }

    const categoryResponses = responses[category] || responses["general"]
    return categoryResponses[Math.floor(Math.random() * categoryResponses.length)]
  }

  return (
    <div className="container mx-auto max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Legal AI Assistant</h1>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-4 mb-6">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="family-law">Family Law</TabsTrigger>
          <TabsTrigger value="criminal-law">Criminal Law</TabsTrigger>
          <TabsTrigger value="property-law">Property Law</TabsTrigger>
        </TabsList>

        {Object.keys(conversations).map((category) => (
          <TabsContent key={category} value={category} className="mt-0">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageSquare className="mr-2 h-5 w-5" />
                  {category
                    .split("-")
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ")}{" "}
                  Legal Advice
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[500px] overflow-y-auto mb-4 space-y-4 p-4 rounded-lg border">
                  {conversations[category].length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-center text-gray-500">
                      <MessageSquare className="h-12 w-12 mb-4 opacity-20" />
                      <p className="text-lg font-medium">No messages yet</p>
                      <p className="text-sm">Ask any legal question to get started</p>
                    </div>
                  ) : (
                    conversations[category].map((message) => (
                      <div key={message.id} className={`mb-4 ${message.role === "user" ? "text-right" : "text-left"}`}>
                        <span
                          className={`inline-block p-3 rounded-lg ${
                            message.role === "user" ? "bg-green-600 text-white" : "bg-gray-200 text-black"
                          }`}
                        >
                          {message.content}
                        </span>
                      </div>
                    ))
                  )}
                  <div ref={messagesEndRef} />
                </div>
                <form onSubmit={handleSendMessage} className="flex space-x-2">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your legal question..."
                    disabled={isLoading}
                    className="flex-1"
                  />
                  <Button type="submit" disabled={isLoading} className="bg-green-600 hover:bg-green-700">
                    {isLoading ? "Thinking..." : "Send"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
