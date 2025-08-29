import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import { getConversation, sendMessage, markConversationRead } from "../controllers/chatController.js";

const router = express.Router();

router.get("/:lawyerId", protect, getConversation);
router.post("/:lawyerId", protect, sendMessage);
router.put("/:lawyerId/mark-read", protect, markConversationRead);

export default router;
