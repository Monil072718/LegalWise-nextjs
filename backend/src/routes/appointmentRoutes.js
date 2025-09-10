import express from "express";
import protectAdmin from "../middlewares/adminAuthMiddleware.js";
import permit from "../middlewares/roleMiddleware.js";
import {
  listAppointments,
  approveAppointment,
  declineAppointment
} from "../controllers/appointmentController.js";

const router = express.Router();

router.get("/", protectAdmin, permit("superadmin", "subadmin"), listAppointments);
router.put("/:appointmentId/approve", protectAdmin, permit("superadmin", "subadmin"), approveAppointment);
router.put("/:appointmentId/decline", protectAdmin, permit("superadmin", "subadmin"), declineAppointment);

export default router;