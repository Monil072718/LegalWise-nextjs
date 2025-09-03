import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import { requireRole } from "../middlewares/roleMiddleware.js";
import {
  startTimer, stopTimer, generateInvoice, listInvoices, markInvoicePaid
} from "../controllers/billingController.js";

const router = express.Router();

// Lawyer-only for timesheet + generating invoices
router.post("/timer/start", protect, requireRole("LAWYER"), startTimer);
router.post("/timer/:id/stop", protect, requireRole("LAWYER"), stopTimer);
router.post("/invoices", protect, requireRole("LAWYER"), generateInvoice);

// Admin & Lawyer can list, Admin can mark paid
router.get("/invoices", protect, requireRole("ADMIN", "LAWYER"), listInvoices);
router.post("/invoices/:id/paid", protect, requireRole("ADMIN"), markInvoicePaid);

export default router;
