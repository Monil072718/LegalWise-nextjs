// models/Message.js
import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema(
  {
    fromUser: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    fromLawyer: { type: mongoose.Schema.Types.ObjectId, ref: "Lawyer" },
    toUser: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    toLawyer: { type: mongoose.Schema.Types.ObjectId, ref: "Lawyer" },
    body: { type: String, required: true },
    readAt: { type: Date, default: null },
    threadKey: { type: String, index: true }, // `${userId}:${lawyerId}`
  },
  { timestamps: true }
);

export default mongoose.model("Message", MessageSchema);
