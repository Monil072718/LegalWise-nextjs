import Notification from "../models/Notification.js";

export const listNotifications = async (req, res) => {
  const { scope } = req.query; // "LAWYER" or "USER"
  const filter = scope === "LAWYER" ? { lawyer: req.user._id } : { user: req.user._id };
  const items = await Notification.find(filter).sort({ createdAt: -1 });
  res.json(items);
};

export const markNotificationRead = async (req, res) => {
  const { id } = req.params;
  const updated = await Notification.findByIdAndUpdate(id, { readAt: new Date() }, { new: true });
  if (!updated) return res.status(404).json({ message: "Notification not found" });
  res.json(updated);
};
