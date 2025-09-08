import express from "express";
import protectAdmin from "../middlewares/adminAuthMiddleware.js";
import permit from "../middlewares/roleMiddleware.js";
import { createPlan, updatePlan, statsPlans } from "../controllers/subscriptionController.js";

const router = express.Router();

router.post("/plans", protectAdmin, permit("superadmin","financeAdmin"), createPlan);
router.put("/plans/:planId", protectAdmin, permit("superadmin","financeAdmin"), updatePlan);
router.get("/reports", protectAdmin, permit("financeAdmin","superadmin"), statsPlans);

export default router;
