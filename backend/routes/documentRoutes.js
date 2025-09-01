import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import {
  uploadDocument,
  getDocuments,
  deleteDocument,
} from "../controllers/documentController.js";

const router = express.Router();

router.post("/", protect, uploadDocument);
router.get("/", protect, getDocuments);
router.delete("/:id", protect, deleteDocument);

export default router;
