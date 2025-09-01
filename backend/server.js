import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import hireRoutes from "./routes/lawyerHireRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import bookRoutes from "./routes/bookRoutes.js";
import lawyerRoutes from "./routes/lawyerRoutes.js";
import documentRoutes from "./routes/documentRoutes.js";
import articleRoutes from "./routes/articleRoutes.js";

dotenv.config();

console.log("📂 ENV loaded");
if (!process.env.DATABASE_URL) {
  console.error("❌ DATABASE_URL missing in .env");
  process.exit(1); // exit with failure
}
console.log("📡 DB URL present");

await connectDB(); // make sure DB connects before starting server

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/users/orders", orderRoutes);
app.use("/api/users/hires", hireRoutes);
app.use("/api/users/messages", chatRoutes);
app.use("/api/users", userRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/lawyers", lawyerRoutes);
app.use("/api/documents", documentRoutes);
app.use("/api/articles", articleRoutes);

// Health
app.get("/", (_req, res) => res.send("✅ API is running"));

// Basic error handler so crashes are visible
app.use((err, _req, res, _next) => {
  console.error("💥 Unhandled error:", err);
  res.status(500).json({ message: "Server error" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

// Catch unhandled rejections
process.on("unhandledRejection", (err) => {
  console.error("🔴 Unhandled Rejection:", err);
});
