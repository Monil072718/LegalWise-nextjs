import express from "express";
import multer from "multer";
import { protect } from "../middlewares/authMiddleware.js";
import { requireRole } from "../middlewares/roleMiddleware.js";
import Case from "../models/Case.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post(
  "/cases/:id/documents",
  protect,
  requireRole("ADMIN", "LAWYER"),
  upload.single("file"),
  async (req, res) => {
    const c = await Case.findById(req.params.id);
    if (!c) return res.status(404).json({ message: "Case not found" });

    const fileUrl = `/uploads/${req.file.filename}`; // for dev; swap to S3/Cloudinary in prod
    c.documents.push({ fileUrl, label: req.body.label || req.file.originalname, uploadedBy: req.user._id });
    await c.save();
    res.status(201).json(c);
  }
);

export default router;
