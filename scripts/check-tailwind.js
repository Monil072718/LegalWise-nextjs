const fs = require("fs")
const path = require("path")

console.log("Checking Tailwind CSS setup...")

// Check if tailwind.config.js exists
const tailwindConfigPath = path.join(process.cwd(), "tailwind.config.js")
if (fs.existsSync(tailwindConfigPath)) {
  console.log("✅ tailwind.config.js found")
} else {
  console.log("❌ tailwind.config.js not found")
}

// Check if postcss.config.js exists
const postcssConfigPath = path.join(process.cwd(), "postcss.config.js")
if (fs.existsSync(postcssConfigPath)) {
  console.log("✅ postcss.config.js found")
} else {
  console.log("❌ postcss.config.js not found")
}

// Check if globals.css has Tailwind directives
const globalsPath = path.join(process.cwd(), "app", "globals.css")
if (fs.existsSync(globalsPath)) {
  const content = fs.readFileSync(globalsPath, "utf8")
  if (content.includes("@tailwind")) {
    console.log("✅ globals.css contains Tailwind directives")
  } else {
    console.log("❌ globals.css does not contain Tailwind directives")
  }
} else {
  console.log("❌ globals.css not found")
}

console.log("\nTailwind CSS check complete!")
