import mongoose from "mongoose";

export const HIRE_STATUS = ["PENDING","ACCEPTED","REJECTED","COMPLETED"];

const lawyerHireSchema = new mongoose.Schema({
  user:   { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  lawyer: { type: mongoose.Schema.Types.ObjectId, ref: "Lawyer", required: true },
  caseDetails: { type: String, required: true },
  status: { type: String, enum: HIRE_STATUS, default: "PENDING" },
}, { timestamps: true });

export default mongoose.model("LawyerHire", lawyerHireSchema);
