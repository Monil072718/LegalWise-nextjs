// models/Case.js
import mongoose from "mongoose";

const CaseNoteSchema = new mongoose.Schema(
  {
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // admin/lawyer
    text: { type: String, required: true },
  },
  { timestamps: true }
);

const CaseDocumentSchema = new mongoose.Schema(
  {
    fileUrl: { type: String, required: true },
    label: { type: String },
    uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

const CaseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    client: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    lawyer: { type: mongoose.Schema.Types.ObjectId, ref: "Lawyer", required: true },
    stage: {
      type: String,
      enum: ["NEW", "EVIDENCE", "HEARING", "JUDGMENT", "CLOSED"],
      default: "NEW",
    },
    status: {
      type: String,
      enum: ["OPEN", "ON_HOLD", "CLOSED"],
      default: "OPEN",
    },
    nextHearingAt: { type: Date, default: null },
    notes: [CaseNoteSchema],
    documents: [CaseDocumentSchema],
  },
  { timestamps: true }
);

export default mongoose.model("Case", CaseSchema);
