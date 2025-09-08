import mongoose from "mongoose";
const paymentSchema = new mongoose.Schema({
  payerId: String,
  payeeId: String,
  amount: Number,
  currency: { type: String, default: "INR" },
  method: String,
  status: { type: String, enum: ["success","failed","pending"], default: "pending" },
  reference: String,
  type: { type: String, enum: ["subscription","consultation","book","commission"] }
}, { timestamps: true });

export default mongoose.model("Payment", paymentSchema);

