// models/Notification.js
import mongoose from "mongoose";

const NotificationSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },      // optional (for clients)
    lawyer: { type: mongoose.Schema.Types.ObjectId, ref: "Lawyer" },  // optional (for lawyers)
    title: { type: String, required: true },
    body: { type: String },
    type: {
      type: String,
      enum: ["HEARING_REMINDER", "CLIENT_REQUEST", "DOCUMENT_SUBMISSION", "INVOICE"],
      required: true,
    },
    readAt: { type: Date, default: null },
    meta: { type: Object, default: {} },
  },
  { timestamps: true }
);

export default mongoose.model("Notification", NotificationSchema);
