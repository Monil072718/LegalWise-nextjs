import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function testConnection() {
  try {
    console.log("Testing MongoDB connection...")

    // Test basic connection
    await prisma.$connect()
    console.log("✅ Successfully connected to MongoDB")

    // Test a simple query
    const userCount = await prisma.user.count()
    console.log(`✅ Found ${userCount} users in database`)

    // Test creating a test record
    const testUser = await prisma.user.create({
      data: {
        name: "Test User",
        email: `test-${Date.now()}@example.com`,
        password: "test123",
        role: "USER",
      },
    })
    console.log("✅ Successfully created test user")

    // Clean up test record
    await prisma.user.delete({
      where: { id: testUser.id },
    })
    console.log("✅ Successfully deleted test user")

    console.log("\n🎉 MongoDB connection test passed!")
  } catch (error) {
    console.error("❌ MongoDB connection test failed:", error.message)

    if (error.message.includes("authentication failed")) {
      console.log("\n💡 Check your username and password in the DATABASE_URL")
    } else if (error.message.includes("network")) {
      console.log("\n💡 Check your network access settings in MongoDB Atlas")
    } else if (error.message.includes("timeout")) {
      console.log("\n💡 Check your internet connection and MongoDB Atlas status")
    }

    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

testConnection()
