import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
  lawyer: { type: mongoose.Schema.Types.ObjectId, ref: "Lawyer" },
  plan: { type: mongoose.Schema.Types.ObjectId, ref: "SubscriptionPlan" },
  startDate: Date,
  endDate: Date,
  status: { type: String, enum: ["active","expired","cancelled","trial"], default: "trial" },
  paymentRef: String
}, { timestamps: true });

export default mongoose.model("Subscription", subscriptionSchema);
