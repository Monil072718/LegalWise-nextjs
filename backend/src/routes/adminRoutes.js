import express from "express";
import { registerAdmin, loginAdmin, getProfile, changeRole } from "../controllers/adminController.js";
// import protectAdmin from "../middlewares/adminAuthMiddleware.js";
import permit from "../middlewares/roleMiddleware.js";

const router = express.Router();

// Public - only superadmin should create via UI; we still protect via permit on route usage
router.post("/register", protectAdmin, permit("superadmin"), registerAdmin);
router.post("/login", loginAdmin);
router.get("/profile", protectAdmin, getProfile);
router.put("/:adminId/role", protectAdmin, permit("superadmin"), changeRole);

export default router;
