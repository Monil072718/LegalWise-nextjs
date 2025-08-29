import ChatHistory from "../models/ChatHistory.js";
import Lawyer from "../models/Lawyer.js";

/** Ensure chat doc exists */
const ensureThread = async (userId, lawyerId) => {
  let thread = await ChatHistory.findOne({ user: userId, lawyer: lawyerId });
  if (!thread) {
    thread = await ChatHistory.create({ user: userId, lawyer: lawyerId, messages: [] });
  }
  return thread;
};

/** GET /api/users/messages/:lawyerId */
export const getConversation = async (req, res) => {
  try {
    const { lawyerId } = req.params;
    const lawyer = await Lawyer.findById(lawyerId).select("_id");
    if (!lawyer) return res.status(404).json({ message: "Lawyer not found" });

    const thread = await ensureThread(req.user._id, lawyerId);
    return res.json(thread);
  } catch (err) {
    return res.status(500).json({ message: "Failed to get conversation" });
  }
};

/** POST /api/users/messages/:lawyerId  Body: { text } */
export const sendMessage = async (req, res) => {
  try {
    const { lawyerId } = req.params;
    const { text } = req.body;
    if (!text) return res.status(400).json({ message: "Text is required" });

    const lawyer = await Lawyer.findById(lawyerId).select("_id");
    if (!lawyer) return res.status(404).json({ message: "Lawyer not found" });

    const thread = await ensureThread(req.user._id, lawyerId);
    thread.messages.push({ senderType: "USER", text });
    await thread.save();

    return res.status(201).json(thread);
  } catch (err) {
    return res.status(500).json({ message: "Failed to send message" });
  }
};

/** PUT /api/users/messages/:lawyerId/mark-read  (mark all as read for user-view) */
export const markConversationRead = async (req, res) => {
  try {
    const { lawyerId } = req.params;
    const thread = await ChatHistory.findOne({ user: req.user._id, lawyer: lawyerId });
    if (!thread) return res.status(404).json({ message: "Conversation not found" });

    // Mark all lawyer messages as read
    thread.messages = thread.messages.map(m =>
      m.senderType === "LAWYER" ? { ...m.toObject(), read: true } : m
    );
    await thread.save();
    return res.json({ message: "Conversation marked as read" });
  } catch (err) {
    return res.status(500).json({ message: "Failed to mark as read" });
  }
};
