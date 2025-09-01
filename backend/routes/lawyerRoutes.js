import express from "express";
import {
  getLawyers,
  getLawyerById,
  createLawyer,
  updateLawyer,
  deleteLawyer,
} from "../controllers/lawyerController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", getLawyers);
router.get("/:id", getLawyerById);
router.post("/", protect, createLawyer);
router.put("/:id", protect, updateLawyer);
router.delete("/:id", protect, deleteLawyer);

export default router;
