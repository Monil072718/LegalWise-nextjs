import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

// Routes
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import hireRoutes from "./routes/lawyerHireRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import bookRoutes from "./routes/bookRoutes.js";
import lawyerRoutes from "./routes/lawyerRoutes.js";
import documentRoutes from "./routes/documentRoutes.js";
import articleRoutes from "./routes/articleRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import caseRoutes from "./routes/caseRoutes.js";
import appointmentRoutes from "./routes/appointmentRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";
import billingRoutes from "./routes/billingRoutes.js";

dotenv.config();
console.log("📂 ENV loaded");

if (!process.env.DATABASE_URL) {
  console.error("❌ DATABASE_URL missing in .env");
  process.exit(1);
}
console.log("📡 DB URL present");

try {
  await connectDB();
  console.log("✅ DB connected");
} catch (err) {
  console.error("❌ DB connection failed:", err);
  process.exit(1);
}

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/users/orders", orderRoutes);
app.use("/api/users/hires", hireRoutes);
app.use("/api/users/messages", chatRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/lawyers", lawyerRoutes);
app.use("/api/documents", documentRoutes);
app.use("/api/articles", articleRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/cases", caseRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/billing", billingRoutes);
app.use("/uploads", express.static("uploads"));

// Health
app.get("/", (_req, res) => res.send("✅ API is running"));

// Error handler
app.use((err, _req, res, _next) => {
  console.error("💥 Unhandled error:", err);
  res.status(500).json({ message: "Server error", error: err.message });
});

// Start server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

// Global crash handlers
process.on("unhandledRejection", (err) => {
  console.error("🔴 Unhandled Rejection:", err);
});
process.on("uncaughtException", (err) => {
  console.error("🔴 Uncaught Exception:", err);
  process.exit(1);
});
