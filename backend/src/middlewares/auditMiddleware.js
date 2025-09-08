import AuditLog from "../models/AuditLog.js";

// ✅ Audit Logger Function
export const logAction = async (adminId, action, meta = {}) => {
  try {
    await AuditLog.create({
      admin: adminId,
      action,
      meta,
      createdAt: new Date(),
    });
  } catch (err) {
    console.error("Audit log failed:", err.message);
  }
};
