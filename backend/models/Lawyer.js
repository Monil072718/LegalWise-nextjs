import mongoose from "mongoose";

const lawyerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  specialization: { type: String, required: true },
  experience: { type: Number, required: true },
  bio: { type: String, required: true },
  imageUrl: { type: String },
  rating: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.model("Lawyer", lawyerSchema);
