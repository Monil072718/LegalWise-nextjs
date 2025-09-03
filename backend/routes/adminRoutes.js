import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import { requireRole } from "../middlewares/roleMiddleware.js";
import {
  createLawyer,
  listLawyers,
  updateLawyerProfile,
  setLawyerAvailability,
  assignClientToLawyer,
  adminDashboard,
  revenueReport,
} from "../controllers/adminLawyerController.js";

const router = express.Router();

router.use(protect, requireRole("ADMIN"));

router.get("/dashboard", adminDashboard);
router.get("/lawyers", listLawyers);
router.post("/lawyers", createLawyer);
router.patch("/lawyers/:id", updateLawyerProfile);
router.patch("/lawyers/:id/availability", setLawyerAvailability);

router.post("/assign-client", assignClientToLawyer);
router.get("/reports/revenue", revenueReport);

export default router;
