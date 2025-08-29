import { PrismaClient } from "@prisma/client"
import { hash } from "bcrypt"

const prisma = new PrismaClient()

async function main() {
  try {
    console.log("Starting database seeding...")

    // Create admin user
    const adminPassword = await hash("admin123", 10)

    const admin = await prisma.user.upsert({
      where: { email: "admin@lawgpt.com" },
      update: {},
      create: {
        email: "admin@lawgpt.com",
        name: "Admin User",
        password: adminPassword,
        role: "ADMIN",
      },
    })

    console.log("✅ Admin user created")

    // Create sample lawyer user
    const lawyerPassword = await hash("lawyer123", 10)

    const lawyerUser = await prisma.user.upsert({
      where: { email: "lawyer@lawgpt.com" },
      update: {},
      create: {
        email: "lawyer@lawgpt.com",
        name: "John Lawyer",
        password: lawyerPassword,
        role: "LAWYER",
      },
    })

    console.log("✅ Lawyer user created")

    // Create sample lawyer profile
    const lawyer = await prisma.lawyer.upsert({
      where: { email: "lawyer@lawgpt.com" },
      update: {},
      create: {
        email: "lawyer@lawgpt.com",
        name: "John Lawyer",
        password: lawyerPassword,
        specialization: "Family Law",
        experience: 10,
        bio: "Experienced family law attorney with over 10 years of practice.",
        rating: 4.8,
      },
    })

    console.log("✅ Lawyer profile created")

    // Create sample books
    const books = [
      {
        title: "Constitutional Law: Principles and Policies",
        author: "Erwin Chemerinsky",
        description: "A comprehensive guide to constitutional law principles and their practical applications.",
        price: 89.99,
        category: "Constitutional Law",
        stock: 25,
        imageUrl: "/placeholder.svg?height=300&width=200",
      },
      {
        title: "Contract Law: A Comprehensive Guide",
        author: "Steven Burton",
        description: "Everything you need to know about contract law, from formation to breach.",
        price: 79.99,
        category: "Contract Law",
        stock: 30,
        imageUrl: "/placeholder.svg?height=300&width=200",
      },
      {
        title: "Criminal Law and Procedure",
        author: "Joshua Dressler",
        description: "A detailed examination of criminal law principles and procedural requirements.",
        price: 95.99,
        category: "Criminal Law",
        stock: 20,
        imageUrl: "/placeholder.svg?height=300&width=200",
      },
      {
        title: "Property Law Fundamentals",
        author: "John G. Sprankling",
        description: "Essential concepts in property law for students and practitioners.",
        price: 85.99,
        category: "Property Law",
        stock: 15,
        imageUrl: "/placeholder.svg?height=300&width=200",
      },
      {
        title: "Tort Law: Cases and Materials",
        author: "Dan B. Dobbs",
        description: "Comprehensive coverage of tort law with real-world cases and examples.",
        price: 92.99,
        category: "Tort Law",
        stock: 18,
        imageUrl: "/placeholder.svg?height=300&width=200",
      },
    ]

    for (const book of books) {
      await prisma.book.upsert({
        where: { title: book.title },
        update: {},
        create: book,
      })
    }

    console.log("✅ Sample books created")

    // Create sample articles
    const articles = [
      {
        title: "Understanding Your Rights as a Tenant",
        content: `As a tenant, you have specific rights that are protected by law. This article covers the fundamental rights every tenant should know, including the right to a habitable dwelling, privacy rights, and protection against discrimination.

Key tenant rights include:
1. Right to a habitable dwelling
2. Right to privacy and quiet enjoyment
3. Protection against unlawful eviction
4. Right to have repairs made
5. Protection of security deposits

Understanding these rights can help you navigate rental situations more effectively and know when to seek legal assistance.`,
        author: "Legal Team",
        category: "Property Law",
        imageUrl: "/placeholder.svg?height=200&width=400",
      },
      {
        title: "How to Handle a Divorce: A Step-by-Step Guide",
        content: `Divorce can be a complex and emotional process. This guide will walk you through the essential steps and considerations when going through a divorce.

Steps in the divorce process:
1. Determine grounds for divorce
2. File the divorce petition
3. Serve papers to your spouse
4. Financial disclosure
5. Negotiate settlement or go to trial
6. Finalize the divorce decree

Each step requires careful consideration and often legal guidance to ensure your rights are protected throughout the process.`,
        author: "Family Law Expert",
        category: "Family Law",
        imageUrl: "/placeholder.svg?height=200&width=400",
      },
      {
        title: "Small Business Legal Requirements",
        content: `Starting a small business involves numerous legal considerations. This article outlines the key legal requirements every small business owner should understand.

Essential legal requirements:
1. Business structure selection
2. Business registration and licensing
3. Tax obligations
4. Employment law compliance
5. Contract management
6. Intellectual property protection

Proper legal planning from the start can save significant time and money as your business grows.`,
        author: "Business Law Specialist",
        category: "Business Law",
        imageUrl: "/placeholder.svg?height=200&width=400",
      },
    ]

    for (const article of articles) {
      await prisma.article.upsert({
        where: { title: article.title },
        update: {},
        create: article,
      })
    }

    console.log("✅ Sample articles created")

    // Create sample documents
    const documents = [
      {
        title: "Rental Agreement Template",
        description: "A comprehensive rental agreement template for landlords and tenants.",
        fileUrl: "/documents/rental-agreement.pdf",
        category: "Property Law",
      },
      {
        title: "Power of Attorney Form",
        description: "Legal form to grant someone authority to act on your behalf.",
        fileUrl: "/documents/power-of-attorney.pdf",
        category: "General Legal",
      },
      {
        title: "Employment Contract Template",
        description: "Standard employment contract template for employers.",
        fileUrl: "/documents/employment-contract.pdf",
        category: "Employment Law",
      },
      {
        title: "Non-Disclosure Agreement (NDA)",
        description: "Protect confidential information with this NDA template.",
        fileUrl: "/documents/nda-template.pdf",
        category: "Business Law",
      },
      {
        title: "Last Will and Testament Template",
        description: "Basic will template for estate planning purposes.",
        fileUrl: "/documents/will-template.pdf",
        category: "Estate Law",
      },
    ]

    for (const document of documents) {
      await prisma.document.upsert({
        where: { title: document.title },
        update: {},
        create: document,
      })
    }

    console.log("✅ Sample documents created")

    console.log("\n🎉 Database seeded successfully!")
    console.log("\n📋 Login Credentials:")
    console.log("Admin:")
    console.log("  Email: admin@lawgpt.com")
    console.log("  Password: admin123")
    console.log("\nLawyer:")
    console.log("  Email: lawyer@lawgpt.com")
    console.log("  Password: lawyer123")
  } catch (error) {
    console.error("❌ Error seeding database:", error)
    throw error
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
