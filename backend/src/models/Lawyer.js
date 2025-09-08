import mongoose from "mongoose";

const lawyerSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  password: String,
  phone: String,
  specialization: [String],
  bio: String,
  documents: [{
    name: String,
    url: String,
    verified: { type: Boolean, default: false }
  }],
  availabilityStatus: { type: String, enum: ["online","offline","busy"], default: "offline" },
  subscriptions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Subscription" }],
  isVerified: { type: Boolean, default: false },
  isSuspended: { type: Boolean, default: false },
  metrics: {
    casesHandled: { type: Number, default: 0 },
    consultations: { type: Number, default: 0 },
    rating: { type: Number, default: 0 },
    reviewsCount: { type: Number, default: 0 }
  }
}, { timestamps: true });

export default mongoose.model("Lawyer", lawyerSchema);
