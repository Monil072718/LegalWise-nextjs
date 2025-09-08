import express from "express";
import protect from "../middlewares/authMiddleware.js";
import { sendMessage, getMessages } from "../controllers/chatController.js";

const router = express.Router();

router.post("/send", protect, sendMessage);
router.get("/:receiverId", protect, getMessages);

export default router;
