import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import { createOrder, listMyOrders, getOrderById } from "../controllers/orderController.js";

const router = express.Router();

router.post("/", protect, createOrder);
router.get("/", protect, listMyOrders);
router.get("/:id", protect, getOrderById);

export default router;
