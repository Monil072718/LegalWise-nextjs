import mongoose from "mongoose";
import bcrypt from "bcrypt";

const lawyerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    specialization: { type: String, required: true },
    experience: { type: Number, required: true },
    bio: { type: String, required: true },
    imageUrl: { type: String },
    rating: { type: Number, default: 0 },
    availabilityStatus: {
      type: String,
      enum: ["ONLINE", "OFFLINE", "BUSY"],
      default: "OFFLINE",
    },
    hourlyRate: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// 🔹 Auto-hash password before save
lawyerSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

export default mongoose.model("Lawyer", lawyerSchema);
