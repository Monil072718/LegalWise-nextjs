import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import { requireRole } from "../middlewares/roleMiddleware.js";
import {
  createAppointment, respondAppointment, listUpcoming
} from "../controllers/appointmentController.js";

const router = express.Router();

// Admin can create; Lawyer can accept/decline; both can list
router.post("/", protect, requireRole("ADMIN"), createAppointment);
router.patch("/:id/respond", protect, requireRole("LAWYER"), respondAppointment);
router.get("/", protect, requireRole("ADMIN", "LAWYER"), listUpcoming);

export default router;
