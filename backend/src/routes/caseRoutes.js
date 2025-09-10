import express from "express";
import protectAdmin from "../middlewares/adminAuthMiddleware.js";
import permit from "../middlewares/roleMiddleware.js";
import {
  createCase,
  updateCase,
  closeCase
} from "../controllers/caseController.js";

const router = express.Router();

router.post("/", protectAdmin, permit("superadmin", "subadmin"), createCase);
router.put("/:caseId", protectAdmin, permit("superadmin", "subadmin"), updateCase);
router.put("/:caseId/close", protectAdmin, permit("superadmin", "subadmin"), closeCase);

export default router;