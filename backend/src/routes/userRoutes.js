import express from "express";
import { registerUser, loginUser, getUserProfile } from "../controllers/userController.js";
import { protectUser } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", protectUser, getUserProfile);


export default router;
