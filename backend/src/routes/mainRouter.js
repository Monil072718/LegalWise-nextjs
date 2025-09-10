import express from "express";
import userRoutes from "./userRoutes.js";
import adminRoutes from "./adminRoutes.js";
import dashboardRoutes from "./dashboardRoutes.js";
import appointmentRoutes from "./appointmentRoutes.js";
import contentRoutes from "./contentRoutes.js";
import caseRoutes from "./caseRoutes.js";
import lawyerRoutes from "./lawyerRoutes.js";
import subscriptionRoutes from "./subscriptionRoutes.js";
import clientRoutes from "./clientRoutes.js";

const router = express.Router();

router.use("/users", userRoutes);
router.use("/admin", adminRoutes);
router.use("/dashboard", dashboardRoutes);
router.use("/appointments", appointmentRoutes);
router.use("/content", contentRoutes);
router.use("/cases", caseRoutes);
router.use("/lawyers", lawyerRoutes);
router.use("/subscriptions", subscriptionRoutes);
router.use("/clients", clientRoutes);

export default router;