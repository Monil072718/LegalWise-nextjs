import mongoose from "mongoose";

// NOTE: Prisma's ChatHistory only had `user`. For per-lawyer threads, we add `lawyer`.
const messageSchema = new mongoose.Schema({
  senderType: { type: String, enum: ["USER","LAWYER"], required: true },
  text: { type: String, required: true },
  read: { type: Boolean, default: false },
  sentAt: { type: Date, default: Date.now },
}, { _id: false });

const chatHistorySchema = new mongoose.Schema({
  user:   { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  lawyer: { type: mongoose.Schema.Types.ObjectId, ref: "Lawyer", required: true },
  messages: { type: [messageSchema], default: [] },
}, { timestamps: true });

chatHistorySchema.index({ user: 1, lawyer: 1 }, { unique: true });

export default mongoose.model("ChatHistory", chatHistorySchema);
