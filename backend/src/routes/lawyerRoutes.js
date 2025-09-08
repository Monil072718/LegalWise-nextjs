import express from "express";
import protectAdmin from "../middlewares/adminAuthMiddleware.js";
import permit from "../middlewares/roleMiddleware.js";
import {
  addLawyer, verifyLawyer, removeLawyer, getLawyer, listLawyers, suspendLawyer
} from "../controllers/lawyerController.js";

const router = express.Router();

router.post("/", protectAdmin, permit("superadmin","subadmin"), addLawyer);
router.get("/", protectAdmin, permit("superadmin","subadmin","contentManager"), listLawyers);
router.get("/:lawyerId", protectAdmin, getLawyer);
router.put("/:lawyerId/verify", protectAdmin, permit("superadmin","subadmin"), verifyLawyer);
router.put("/:lawyerId/suspend", protectAdmin, permit("financeAdmin","superadmin"), suspendLawyer);
router.delete("/:lawyerId", protectAdmin, permit("superadmin"), removeLawyer);

export default router;
