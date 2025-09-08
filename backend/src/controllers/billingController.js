import Payment from "../models/Payment.js";
import { logAction } from "../middlewares/auditMiddleware.js";

export const listPayments = async (req, res) => {
  const payments = await Payment.find().limit(200);
  res.json(payments);
};

export const refundPayment = async (req, res) => {
  // Placeholder: integrate payment provider refund API here (Stripe / Razorpay)
  const payment = await Payment.findById(req.params.paymentId);
  if (!payment) return res.status(404).json({ message: "Not found" });
  payment.status = "pending"; // or 'refunded' after provider confirms
  await payment.save();
  await logAction(req.admin._id, "Refund requested", { paymentId: payment._id });
  res.json({ message: "Refund initiated", payment });
};
