import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token
    const pathname = req.nextUrl.pathname

    // Admin routes protection
    if (
      pathname.startsWith("/dashboard/admin") ||
      pathname.startsWith("/dashboard/users") ||
      pathname.startsWith("/dashboard/lawyers-management") ||
      pathname.startsWith("/dashboard/books-management") ||
      pathname.startsWith("/dashboard/articles-management") ||
      pathname.startsWith("/dashboard/documents-management") ||
      pathname.startsWith("/dashboard/orders-management")
    ) {
      if (token?.role !== "ADMIN") {
        return NextResponse.redirect(new URL("/dashboard", req.url))
      }
    }

    // Lawyer routes protection
    if (pathname.startsWith("/dashboard/cases") || pathname.startsWith("/dashboard/lawyer-profile")) {
      if (token?.role !== "LAWYER" && token?.role !== "ADMIN") {
        return NextResponse.redirect(new URL("/dashboard", req.url))
      }
    }

    // User routes protection (prevent lawyers/admins from accessing user-specific routes)
    if (
      pathname.startsWith("/dashboard/books") ||
      pathname.startsWith("/dashboard/orders") ||
      pathname.startsWith("/dashboard/lawyers")
    ) {
      if (token?.role === "LAWYER" || token?.role === "ADMIN") {
        return NextResponse.redirect(new URL("/dashboard", req.url))
      }
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Allow access to dashboard only if user is authenticated
        if (req.nextUrl.pathname.startsWith("/dashboard")) {
          return !!token
        }
        return true
      },
    },
  },
)

export const config = {
  matcher: ["/dashboard/:path*"],
}
