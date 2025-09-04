import express from "express";
import { requireRole } from "../middlewares/roleMiddleware.js";
import { protect, adminOnly } from "../middlewares/authMiddleware.js";
import {
  createLawyer,
  listLawyers,
  updateLawyerProfile,
  setLawyerAvailability,
  assignClientToLawyer,
  adminDashboard,
  revenueReport, getAllLawyers, deleteLawyer
} from "../controllers/adminLawyerController.js";

const router = express.Router();

router.use(protect, requireRole("ADMIN"));

router.get("/dashboard", adminDashboard);
router.get("/lawyers", listLawyers);
router.post("/lawyers", protect, adminOnly, createLawyer);
router.get("/lawyers", protect, adminOnly, getAllLawyers);
router.delete("/lawyers/:id", protect, adminOnly, deleteLawyer);
router.patch("/lawyers/:id", updateLawyerProfile);
router.patch("/lawyers/:id/availability", setLawyerAvailability);

router.post("/assign-client", assignClientToLawyer);
router.get("/reports/revenue", revenueReport);

export default router;
