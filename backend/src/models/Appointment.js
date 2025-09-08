import mongoose from "mongoose";
const appointmentSchema = new mongoose.Schema({
  client: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  lawyer: { type: mongoose.Schema.Types.ObjectId, ref: "Lawyer" },
  startTime: Date,
  endTime: Date,
  status: { type: String, enum: ["pending","approved","declined","completed"], default: "pending" },
  reason: String,
  flagged: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.model("Appointment", appointmentSchema);
