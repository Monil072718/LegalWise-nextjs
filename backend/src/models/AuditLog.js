import mongoose from "mongoose";
const auditSchema = new mongoose.Schema({
  admin: { type: mongoose.Schema.Types.ObjectId, ref: "Admin" },
  action: String,
  meta: Object
}, { timestamps: true });

export default mongoose.model("AuditLog", auditSchema);
