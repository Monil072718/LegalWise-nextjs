import express from "express";
import { requireRole } from "../middlewares/roleMiddleware.js";
import { protect } from "../middlewares/authMiddleware.js";
import {
  createLawyer,
  listLawyers,
  updateLawyerProfile,
  setLawyerAvailability,
  assignClientToLawyer,
  adminDashboard,
  revenueReport,
  getAllLawyers,
  deleteLawyer,
} from "../controllers/adminLawyerController.js";
import { registerAdmin } from "../controllers/adminController.js";

const router = express.Router();

// ✅ Protect all routes & allow only ADMIN role
router.use(protect, requireRole("ADMIN"));

// Admin dashboard
router.get("/dashboard", adminDashboard);

// Lawyer management
router.get("/lawyers", listLawyers);
router.post("/lawyers", createLawyer);
router.get("/lawyers/all", getAllLawyers);
router.delete("/lawyers/:id", deleteLawyer);
router.patch("/lawyers/:id", updateLawyerProfile);
router.patch("/lawyers/:id/availability", setLawyerAvailability);

// Assign client to lawyer
router.post("/assign-client", assignClientToLawyer);

// Reports
router.get("/reports/revenue", revenueReport);

// 🚨 Only for initial setup
router.post("/register", registerAdmin);

export default router;
