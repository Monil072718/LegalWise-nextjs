import express from "express";

const router = express.Router();

// Temporary test route
router.get("/", (req, res) => {
  res.json({ message: "Case routes working!" });
});

export default router;
