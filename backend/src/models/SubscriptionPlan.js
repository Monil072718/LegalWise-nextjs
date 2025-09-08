import mongoose from "mongoose";

const planSchema = new mongoose.Schema({
  name: String,
  price: Number,
  interval: { type: String, enum: ["monthly","quarterly","yearly"] },
  features: [String],
  maxCases: Number,
  docStorageMB: Number,
  consultationLimit: Number,
  active: { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.model("SubscriptionPlan", planSchema);
