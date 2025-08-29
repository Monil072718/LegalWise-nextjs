import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import {
  createHireRequest, listMyHires, getHireById, cancelHire
} from "../controllers/lawyerHireController.js";

const router = express.Router();

router.post("/", protect, createHireRequest);
router.get("/", protect, listMyHires);
router.get("/:id", protect, getHireById);
router.delete("/:id", protect, cancelHire);

export default router;
