import express from "express";
import { registerUser, login } from "../controllers/authController.js";
import { protect, authorizeRoles } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Register (Only User Self Registration)
router.post("/register", registerUser);

// Login (Common for User, Lawyer, Admin)
router.post("/login", login);

router.get("/admin-data", protect, authorizeRoles("ADMIN"), (req, res) => {
  res.json({ message: "Welcome Admin" });
});

router.get("/lawyer-data", protect, authorizeRoles("LAWYER"), (req, res) => {
  res.json({ message: "Welcome Lawyer" });
});

export default router;
