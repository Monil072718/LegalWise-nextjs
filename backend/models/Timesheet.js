// models/Timesheet.js
import mongoose from "mongoose";

const TimesheetSchema = new mongoose.Schema(
  {
    lawyer: { type: mongoose.Schema.Types.ObjectId, ref: "Lawyer", required: true },
    client: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    case: { type: mongoose.Schema.Types.ObjectId, ref: "Case" },
    startedAt: { type: Date, required: true },
    endedAt: { type: Date },           // null if running
    minutes: { type: Number, default: 0 },
    notes: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Timesheet", TimesheetSchema);
