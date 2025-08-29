import express from "express";
import { getBooks, getArticles, getDocuments } from "../controllers/userController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/books", protect, getBooks);
router.get("/articles", protect, getArticles);
router.get("/documents", protect, getDocuments);

export default router;
