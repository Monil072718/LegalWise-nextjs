const { execSync } = require("child_process")

console.log("Installing dependencies...")

try {
  // Install main dependencies
  execSync("npm install", { stdio: "inherit" })

  console.log("✅ Dependencies installed successfully")

  // Generate Prisma client
  console.log("Generating Prisma client...")
  execSync("npx prisma generate", { stdio: "inherit" })

  console.log("✅ Prisma client generated")

  console.log("\n🎉 Installation complete!")
  console.log("\nNext steps:")
  console.log("1. Set up your environment variables in .env.local")
  console.log("2. Run: npm run db:push")
  console.log("3. Run: npm run db:seed")
  console.log("4. Run: npm run dev")
} catch (error) {
  console.error("❌ Installation failed:", error.message)
  process.exit(1)
}
