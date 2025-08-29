"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, Send, Search, Phone, Video, Paperclip, MoreVertical, User } from "lucide-react"

export default function MessagesPage() {
  const [selectedChat, setSelectedChat] = useState(1)
  const [newMessage, setNewMessage] = useState("")

  const conversations = [
    {
      id: 1,
      clientName: "John Doe",
      lastMessage: "Thank you for the consultation. When can we schedule the next meeting?",
      timestamp: "2 min ago",
      unread: 2,
      online: true,
      caseType: "Divorce",
    },
    {
      id: 2,
      clientName: "Jane Smith",
      lastMessage: "I've uploaded the employment contract documents as requested.",
      timestamp: "1 hour ago",
      unread: 0,
      online: false,
      caseType: "Employment Law",
    },
    {
      id: 3,
      clientName: "Robert Johnson",
      lastMessage: "Could you please review the contract terms we discussed?",
      timestamp: "3 hours ago",
      unread: 1,
      online: true,
      caseType: "Contract Review",
    },
    {
      id: 4,
      clientName: "Sarah Wilson",
      lastMessage: "The property documents are ready for your review.",
      timestamp: "1 day ago",
      unread: 0,
      online: false,
      caseType: "Property Dispute",
    },
  ]

  const messages = [
    {
      id: 1,
      sender: "client",
      message: "Hello, I wanted to follow up on our discussion about the divorce proceedings.",
      timestamp: "10:30 AM",
      type: "text",
    },
    {
      id: 2,
      sender: "lawyer",
      message: "Hello John, thank you for reaching out. I've reviewed your case and prepared the initial documents.",
      timestamp: "10:35 AM",
      type: "text",
    },
    {
      id: 3,
      sender: "client",
      message: "That's great! Could you please send me the documents for review?",
      timestamp: "10:40 AM",
      type: "text",
    },
    {
      id: 4,
      sender: "lawyer",
      message: "I've attached the divorce petition draft. Please review and let me know if you have any questions.",
      timestamp: "10:45 AM",
      type: "text",
      attachment: "divorce_petition_draft.pdf",
    },
    {
      id: 5,
      sender: "client",
      message: "Thank you for the consultation. When can we schedule the next meeting?",
      timestamp: "11:20 AM",
      type: "text",
    },
  ]

  const selectedConversation = conversations.find((conv) => conv.id === selectedChat)

  const sendMessage = () => {
    if (newMessage.trim()) {
      console.log("Sending message:", newMessage)
      setNewMessage("")
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Messages</h1>
          <p className="text-gray-600 mt-1">Secure communication with your clients</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge className="bg-green-100 text-green-800">
            <div className="w-2 h-2 bg-green-600 rounded-full mr-2"></div>
            Online
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
        {/* Conversations List */}
        <Card className="border-green-200 lg:col-span-1">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg text-gray-900">Conversations</CardTitle>
              <Badge className="bg-green-100 text-green-800">
                {conversations.filter((c) => c.unread > 0).length} unread
              </Badge>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search conversations..."
                className="pl-10 border-green-200 focus:border-green-500 focus:ring-green-500"
              />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-1 max-h-[500px] overflow-y-auto">
              {conversations.map((conversation) => (
                <div
                  key={conversation.id}
                  onClick={() => setSelectedChat(conversation.id)}
                  className={`p-4 cursor-pointer transition-colors border-l-4 ${
                    selectedChat === conversation.id
                      ? "bg-green-50 border-l-green-600"
                      : "hover:bg-gray-50 border-l-transparent"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 flex-1 min-w-0">
                      <div className="relative">
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <User className="h-5 w-5 text-green-600" />
                        </div>
                        {conversation.online && (
                          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="font-medium text-gray-900 truncate">{conversation.clientName}</h3>
                          <span className="text-xs text-gray-500 flex-shrink-0">{conversation.timestamp}</span>
                        </div>
                        <p className="text-sm text-gray-600 truncate mb-1">{conversation.lastMessage}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                            {conversation.caseType}
                          </span>
                          {conversation.unread > 0 && (
                            <Badge className="bg-green-600 text-white text-xs">{conversation.unread}</Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Chat Area */}
        <Card className="border-green-200 lg:col-span-2 flex flex-col">
          {selectedConversation ? (
            <>
              {/* Chat Header */}
              <CardHeader className="border-b border-green-200 pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <User className="h-5 w-5 text-green-600" />
                      </div>
                      {selectedConversation.online && (
                        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{selectedConversation.clientName}</h3>
                      <p className="text-sm text-gray-600">
                        {selectedConversation.online ? "Online" : "Last seen 2 hours ago"} •{" "}
                        {selectedConversation.caseType}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-green-600 text-green-600 hover:bg-green-50 bg-transparent"
                    >
                      <Phone className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-green-600 text-green-600 hover:bg-green-50 bg-transparent"
                    >
                      <Video className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-green-600 text-green-600 hover:bg-green-50 bg-transparent"
                    >
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>

              {/* Messages */}
              <CardContent className="flex-1 p-4 overflow-y-auto">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === "lawyer" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                          message.sender === "lawyer" ? "bg-green-600 text-white" : "bg-gray-100 text-gray-900"
                        }`}
                      >
                        <p className="text-sm">{message.message}</p>
                        {message.attachment && (
                          <div className="mt-2 p-2 bg-white bg-opacity-20 rounded border border-white border-opacity-30">
                            <div className="flex items-center gap-2">
                              <Paperclip className="h-3 w-3" />
                              <span className="text-xs">{message.attachment}</span>
                            </div>
                          </div>
                        )}
                        <p
                          className={`text-xs mt-1 ${message.sender === "lawyer" ? "text-green-100" : "text-gray-500"}`}
                        >
                          {message.timestamp}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>

              {/* Message Input */}
              <div className="border-t border-green-200 p-4">
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-green-600 text-green-600 hover:bg-green-50 bg-transparent"
                  >
                    <Paperclip className="h-4 w-4" />
                  </Button>
                  <Input
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 border-green-200 focus:border-green-500 focus:ring-green-500"
                    onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                  />
                  <Button
                    onClick={sendMessage}
                    disabled={!newMessage.trim()}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-xs text-gray-500 mt-2 text-center">All messages are encrypted and secure</p>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Select a conversation</h3>
                <p className="text-gray-600">Choose a client from the list to start messaging</p>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}
