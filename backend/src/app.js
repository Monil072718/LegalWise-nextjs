import express from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
// import chatRoutes from "./routes/chatRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import lawyerRoutes from "./routes/lawyerRoutes.js";
import subscriptionRoutes from "./routes/subscriptionRoutes.js";
import clientRoutes from "./routes/clientRoutes.js";
import caseRoutes from "./routes/caseRoutes.js";
import appointmentRoutes from "./routes/appointmentRoutes.js";
import contentRoutes from "./routes/contentRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/users", userRoutes);
// app.use("/api/chats", chatRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/lawyers", lawyerRoutes);
app.use("/api/subscriptions", subscriptionRoutes);
app.use("/api/clients", clientRoutes);
app.use("/api/cases", caseRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/content", contentRoutes);
app.use("/api/admin/dashboard", dashboardRoutes);

export default app;
