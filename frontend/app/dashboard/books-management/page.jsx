import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BookOpen, Plus, Edit, Trash2 } from "lucide-react"
import Image from "next/image"

export default async function BooksManagementPage() {
  const session = await getServerSession(authOptions)

  if (!session || session.user.role !== "ADMIN") {
    redirect("/dashboard")
  }

  // Mock data - in real app, fetch from database
  const books = [
    {
      id: 1,
      title: "Constitutional Law: Principles and Policies",
      author: "Erwin Chemerinsky",
      price: 89.99,
      category: "Constitutional Law",
      stock: 25,
      imageUrl: "/placeholder.svg?height=150&width=100",
    },
    {
      id: 2,
      title: "Contract Law: A Comprehensive Guide",
      author: "Steven Burton",
      price: 79.99,
      category: "Contract Law",
      stock: 30,
      imageUrl: "/placeholder.svg?height=150&width=100",
    },
    {
      id: 3,
      title: "Criminal Law and Procedure",
      author: "Joshua Dressler",
      price: 95.99,
      category: "Criminal Law",
      stock: 20,
      imageUrl: "/placeholder.svg?height=150&width=100",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Books Management</h1>
        <Button className="bg-green-600 hover:bg-green-700">
          <Plus className="mr-2 h-4 w-4" />
          Add Book
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Total Books</CardTitle>
            <BookOpen className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
            <p className="text-xs text-gray-500">+12 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Categories</CardTitle>
            <BookOpen className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-gray-500">Same as last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Low Stock</CardTitle>
            <BookOpen className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-gray-500">Need restocking</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Books</CardTitle>
          <CardDescription>Manage your book inventory</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {books.map((book) => (
              <Card key={book.id} className="overflow-hidden">
                <div className="aspect-[3/4] relative">
                  <Image src={book.imageUrl || "/placeholder.svg"} alt={book.title} fill className="object-cover" />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-sm mb-1 line-clamp-2">{book.title}</h3>
                  <p className="text-xs text-gray-600 mb-2">by {book.author}</p>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-bold text-green-600">${book.price}</span>
                    <Badge variant={book.stock < 10 ? "destructive" : "secondary"}>Stock: {book.stock}</Badge>
                  </div>
                  <Badge variant="outline" className="text-xs mb-3">
                    {book.category}
                  </Badge>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" className="flex-1">
                      <Edit className="h-3 w-3 mr-1" />
                      Edit
                    </Button>
                    <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
