import mongoose from "mongoose";

export const ORDER_STATUS = ["PENDING","CONFIRMED","DELIVERED","CANCELLED"];

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  status: { type: String, enum: ORDER_STATUS, default: "PENDING" },
  total: { type: Number, required: true },
  address: { type: String, required: true },
  phone: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model("Order", orderSchema);
