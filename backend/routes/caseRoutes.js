import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import { requireRole } from "../middlewares/roleMiddleware.js";
import {
  createCase, updateCase, getCase, listCases, addCaseNote, setNextHearing
} from "../controllers/caseController.js";

const router = express.Router();

// Admin & Lawyer can create/manage cases
router.post("/", protect, requireRole("ADMIN", "LAWYER"), createCase);
router.get("/", protect, requireRole("ADMIN", "LAWYER"), listCases);
router.get("/:id", protect, requireRole("ADMIN", "LAWYER"), getCase);
router.patch("/:id", protect, requireRole("ADMIN", "LAWYER"), updateCase);
router.post("/:id/notes", protect, requireRole("ADMIN", "LAWYER"), addCaseNote);
router.post("/:id/hearing", protect, requireRole("ADMIN", "LAWYER"), setNextHearing);

export default router;
