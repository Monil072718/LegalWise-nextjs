// models/Appointment.js
import mongoose from "mongoose";

const AppointmentSchema = new mongoose.Schema(
  {
    client: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    lawyer: { type: mongoose.Schema.Types.ObjectId, ref: "Lawyer", required: true },
    case: { type: mongoose.Schema.Types.ObjectId, ref: "Case" },
    title: { type: String, required: true },
    startsAt: { type: Date, required: true },
    endsAt: { type: Date, required: true },
    status: { type: String, enum: ["PENDING", "ACCEPTED", "DECLINED"], default: "PENDING" },
    location: { type: String, default: "Online" },
  },
  { timestamps: true }
);

export default mongoose.model("Appointment", AppointmentSchema);
