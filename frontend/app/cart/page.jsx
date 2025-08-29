"use client"

import { useState } from "react"
import MainLayout from "@/components/layout/main-layout"
import Link from "next/link"
import { ShoppingCart, Trash2, Plus, Minus, ArrowRight } from "lucide-react"
import Image from "next/image"

export default function CartPage() {
  // Mock cart data with state management
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      type: "book",
      title: "Constitutional Law: Principles and Policies",
      author: "Erwin Chemerinsky",
      price: 89.99,
      quantity: 1,
      image: "/placeholder.svg?height=150&width=100",
    },
    {
      id: 2,
      type: "consultation",
      title: "Family Law Consultation",
      lawyer: "Karan Singhania",
      price: 2500,
      quantity: 1,
      duration: "60 minutes",
      date: "2024-01-20",
      time: "10:00 AM",
    },
  ])

  // CRUD Operations
  const updateQuantity = (id, newQuantity) => {
    if (newQuantity <= 0) {
      removeItem(id)
      return
    }
    setCartItems((items) => items.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
  }

  const removeItem = (id) => {
    setCartItems((items) => items.filter((item) => item.id !== id))
  }

  const addItem = (newItem) => {
    const existingItem = cartItems.find((item) => item.id === newItem.id)
    if (existingItem) {
      updateQuantity(newItem.id, existingItem.quantity + 1)
    } else {
      setCartItems((items) => [...items, { ...newItem, quantity: 1 }])
    }
  }

  const clearCart = () => {
    setCartItems([])
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const tax = subtotal * 0.18 // 18% GST
  const total = subtotal + tax

  const isEmpty = cartItems.length === 0

  if (isEmpty) {
    return (
      <MainLayout>
        <div className="bg-gray-50 min-h-screen">
          <div className="container mx-auto px-4 py-12">
            <div className="max-w-4xl mx-auto">
              <div className="text-center py-16">
                <ShoppingCart className="h-24 w-24 mx-auto mb-6 text-gray-400" />
                <h1 className="text-3xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
                <p className="text-gray-600 mb-8 max-w-md mx-auto">
                  Add some legal books, consultation services, or study materials to get started.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/study-material"
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                  >
                    Browse Study Materials
                  </Link>
                  <Link
                    href="/lawyers"
                    className="border border-green-600 text-green-600 hover:bg-green-50 px-6 py-3 rounded-lg font-medium transition-colors"
                  >
                    Find Lawyers
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </MainLayout>
    )
  }

  return (
    <MainLayout>
      <div className="bg-gray-50 min-h-screen">
        {/* Header */}
        <section className="bg-white border-b py-8">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
                <p className="text-gray-600 mt-2">{cartItems.length} item(s) in your cart</p>
              </div>
              <button onClick={clearCart} className="text-red-600 hover:text-red-700 font-medium">
                Clear Cart
              </button>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm">
                <div className="p-6 border-b">
                  <h2 className="text-xl font-semibold">Cart Items</h2>
                </div>

                <div className="divide-y">
                  {cartItems.map((item) => (
                    <div key={item.id} className="p-6">
                      {item.type === "book" ? (
                        <div className="flex items-start space-x-4">
                          <Image
                            src={item.image || "/placeholder.svg"}
                            alt={item.title}
                            width={80}
                            height={120}
                            className="rounded-md"
                          />
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                            <p className="text-gray-600">by {item.author}</p>
                            <div className="flex items-center justify-between mt-4">
                              <div className="flex items-center space-x-2">
                                <button
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                  className="p-1 rounded-md border border-gray-300 hover:bg-gray-50 transition-colors"
                                >
                                  <Minus className="h-4 w-4" />
                                </button>
                                <span className="px-3 py-1 border border-gray-300 rounded-md min-w-[3rem] text-center">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                  className="p-1 rounded-md border border-gray-300 hover:bg-gray-50 transition-colors"
                                >
                                  <Plus className="h-4 w-4" />
                                </button>
                              </div>
                              <div className="flex items-center space-x-4">
                                <span className="text-lg font-semibold text-green-600">
                                  ₹{(item.price * item.quantity).toFixed(2)}
                                </span>
                                <button
                                  onClick={() => removeItem(item.id)}
                                  className="text-red-600 hover:text-red-700 transition-colors"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-start space-x-4">
                          <div className="w-20 h-20 bg-green-100 rounded-lg flex items-center justify-center">
                            <ShoppingCart className="h-8 w-8 text-green-600" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                            <p className="text-gray-600">with {item.lawyer}</p>
                            <div className="text-sm text-gray-500 mt-1">
                              <p>Duration: {item.duration}</p>
                              <p>
                                Scheduled: {item.date} at {item.time}
                              </p>
                            </div>
                            <div className="flex items-center justify-between mt-4">
                              <div className="flex items-center space-x-2">
                                <button
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                  className="p-1 rounded-md border border-gray-300 hover:bg-gray-50 transition-colors"
                                >
                                  <Minus className="h-4 w-4" />
                                </button>
                                <span className="px-3 py-1 border border-gray-300 rounded-md min-w-[3rem] text-center">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                  className="p-1 rounded-md border border-gray-300 hover:bg-gray-50 transition-colors"
                                >
                                  <Plus className="h-4 w-4" />
                                </button>
                              </div>
                              <div className="flex items-center space-x-4">
                                <span className="text-lg font-semibold text-green-600">
                                  ₹{(item.price * item.quantity).toFixed(2)}
                                </span>
                                <button
                                  onClick={() => removeItem(item.id)}
                                  className="text-red-600 hover:text-red-700 transition-colors"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>₹{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>GST (18%)</span>
                    <span>₹{tax.toFixed(2)}</span>
                  </div>
                  <div className="border-t pt-3">
                    <div className="flex justify-between text-lg font-semibold">
                      <span>Total</span>
                      <span className="text-green-600">₹{total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-medium mt-6 transition-colors flex items-center justify-center">
                  Proceed to Checkout
                  <ArrowRight className="ml-2 h-4 w-4" />
                </button>

                <div className="mt-4 text-center">
                  <Link href="/" className="text-green-600 hover:text-green-700 text-sm">
                    Continue Shopping
                  </Link>
                </div>

                {/* Security Badge */}
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center text-sm text-gray-600">
                    <svg className="h-4 w-4 mr-2 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Secure checkout with 256-bit SSL encryption
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recommended Items */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8">You might also like</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <Image
                    src="/placeholder.svg?height=150&width=200"
                    alt="Recommended item"
                    width={200}
                    height={150}
                    className="w-full h-32 object-cover rounded-md mb-3"
                  />
                  <h3 className="font-semibold mb-2">Legal Study Guide {i}</h3>
                  <p className="text-gray-600 text-sm mb-3">Comprehensive guide for legal studies</p>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-green-600">₹{(i * 25).toFixed(2)}</span>
                    <button
                      onClick={() =>
                        addItem({
                          id: Date.now() + i,
                          type: "book",
                          title: `Legal Study Guide ${i}`,
                          author: "Legal Expert",
                          price: i * 25,
                          image: "/placeholder.svg?height=150&width=200",
                        })
                      }
                      className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm transition-colors"
                    >
                      Add to Cart
                    </button>
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
