import mongoose from "mongoose";
const caseSchema = new mongoose.Schema({
  title: String,
  description: String,
  client: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  lawyer: { type: mongoose.Schema.Types.ObjectId, ref: "Lawyer" },
  status: { type: String, enum: ["open","in_progress","closed"], default: "open" },
  stage: String,
  documents: [{ name: String, url: String }],
  hearingDates: [Date],
  logs: [{ by: String, note: String, at: Date }]
}, { timestamps: true });

export default mongoose.model("Case", caseSchema);
