import express from "express";
import protectAdmin from "../middlewares/adminAuthMiddleware.js";
import permit from "../middlewares/roleMiddleware.js";
import { listClients, getClient, suspendClient } from "../controllers/clientController.js";
const router = express.Router();
router.get("/", protectAdmin, permit("superadmin","subadmin","financeAdmin"), listClients);
router.get("/:clientId", protectAdmin, permit("superadmin","subadmin"), getClient);
router.put("/:clientId/suspend", protectAdmin, permit("superadmin","financeAdmin"), suspendClient);
export default router;
