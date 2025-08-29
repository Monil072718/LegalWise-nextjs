"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useSession } from "next-auth/react"
import { cn } from "@/lib/utils"
import {
  BookOpen,
  FileText,
  Home,
  MessageSquare,
  Scale,
  Settings,
  ShoppingCart,
  Users,
  Calendar,
  CreditCard,
  BarChart,
  User,
} from "lucide-react"

export default function DashboardSidebar() {
  const pathname = usePathname()
  const { data: session } = useSession()
  const role = session?.user?.role || "USER"

  const userNavItems = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: Home,
    },
    {
      title: "Legal AI Chat",
      href: "/dashboard/chat",
      icon: MessageSquare,
    },
    {
      title: "Books",
      href: "/dashboard/books",
      icon: BookOpen,
    },
    {
      title: "Articles",
      href: "/dashboard/articles",
      icon: FileText,
    },
    {
      title: "Documents",
      href: "/dashboard/documents",
      icon: FileText,
    },
    {
      title: "Lawyers",
      href: "/dashboard/lawyers",
      icon: Users,
    },
    {
      title: "My Orders",
      href: "/dashboard/orders",
      icon: ShoppingCart,
    },
    {
      title: "Settings",
      href: "/dashboard/settings",
      icon: Settings,
    },
  ]

  const lawyerNavItems = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: Home,
    },
    {
      title: "Client Management",
      href: "/dashboard/clients",
      icon: Users,
    },
    {
      title: "Case Management",
      href: "/dashboard/cases",
      icon: Scale,
    },
    {
      title: "Appointments",
      href: "/dashboard/appointments",
      icon: Calendar,
    },
    {
      title: "Messages",
      href: "/dashboard/messages",
      icon: MessageSquare,
    },
    {
      title: "Billing & Payments",
      href: "/dashboard/billing",
      icon: CreditCard,
    },
    {
      title: "Analytics",
      href: "/dashboard/analytics",
      icon: BarChart,
    },
    {
      title: "Profile",
      href: "/dashboard/profile",
      icon: User,
    },
    {
      title: "Settings",
      href: "/dashboard/settings",
      icon: Settings,
    },
  ]

  const adminNavItems = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: Home,
    },
    {
      title: "Users",
      href: "/dashboard/users",
      icon: Users,
    },
    {
      title: "Lawyers",
      href: "/dashboard/lawyers-management",
      icon: Users,
    },
    {
      title: "Books",
      href: "/dashboard/books-management",
      icon: BookOpen,
    },
    {
      title: "Articles",
      href: "/dashboard/articles-management",
      icon: FileText,
    },
    {
      title: "Documents",
      href: "/dashboard/documents-management",
      icon: FileText,
    },
    {
      title: "Orders",
      href: "/dashboard/orders-management",
      icon: ShoppingCart,
    },
    {
      title: "Settings",
      href: "/dashboard/settings",
      icon: Settings,
    },
  ]

  const navItems = role === "ADMIN" ? adminNavItems : role === "LAWYER" ? lawyerNavItems : userNavItems

  return (
    <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
      <div className="flex flex-col flex-1 min-h-0 bg-white border-r border-gray-200">
        <div className="flex items-center h-16 flex-shrink-0 px-4 border-b border-gray-200">
          <Link href="/" className="flex items-center space-x-2">
            <Scale className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">LawGPT</span>
          </Link>
        </div>
        <div className="flex-1 flex flex-col overflow-y-auto pt-5 pb-4">
          <nav className="flex-1 px-2 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "group flex items-center px-2 py-2 text-sm font-medium rounded-md",
                  pathname === item.href ? "bg-primary text-white" : "text-gray-600 hover:bg-gray-100",
                )}
              >
                <item.icon
                  className={cn(
                    "mr-3 flex-shrink-0 h-5 w-5",
                    pathname === item.href ? "text-white" : "text-gray-500 group-hover:text-gray-600",
                  )}
                  aria-hidden="true"
                />
                {item.title}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </div>
  )
}
