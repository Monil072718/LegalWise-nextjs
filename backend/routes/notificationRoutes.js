import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import { requireRole } from "../middlewares/roleMiddleware.js";
import { listNotifications, markNotificationRead } from "../controllers/notificationController.js";

const router = express.Router();

router.get("/", protect, requireRole("ADMIN", "LAWYER", "USER"), listNotifications);
router.post("/:id/read", protect, requireRole("ADMIN", "LAWYER", "USER"), markNotificationRead);

export default router;
