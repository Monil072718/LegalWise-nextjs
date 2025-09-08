import express from "express";
import userRoutes from "./routes/userRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import appointmentRoutes from "./routes/appointmentRoutes.js";
import contentRoutes from "./routes/contentRoutes.js";
import caseRoutes from "./routes/caseRoutes.js";

const app = express();

app.use(express.json());

// Only use routes that exist
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/content", contentRoutes);
app.use("/api/cases", caseRoutes);

export default app;
