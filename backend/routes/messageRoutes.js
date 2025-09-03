import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import { requireRole } from "../middlewares/roleMiddleware.js";
import {
  sendMessage, getThread, unreadCount, markThreadRead
} from "../controllers/messageController.js";

const router = express.Router();

// both roles can message
router.post("/", protect, requireRole("ADMIN", "LAWYER", "USER"), sendMessage);
router.get("/thread", protect, requireRole("ADMIN", "LAWYER", "USER"), getThread);
router.get("/unread", protect, requireRole("ADMIN", "LAWYER", "USER"), unreadCount);
router.post("/mark-read", protect, requireRole("ADMIN", "LAWYER", "USER"), markThreadRead);

export default router;
