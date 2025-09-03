import Message from "../models/Message.js";

const key = (userId, lawyerId) => `${userId}:${lawyerId}`;

export const sendMessage = async (req, res) => {
  const { toUserId, toLawyerId, body } = req.body;
  const from = req.user; // for simplicity assume user auth; for lawyer auth you can adapt (req.lawyer)
  const threadKey = key(toUserId || req.user?._id, toLawyerId);

  const doc = await Message.create({
    fromUser: from?.role === "USER" ? from._id : undefined,
    fromLawyer: from?.role === "LAWYER" ? from._id : undefined,
    toUser: toUserId || undefined,
    toLawyer: toLawyerId || undefined,
    body,
    threadKey,
  });

  res.status(201).json(doc);
};

export const getThread = async (req, res) => {
  const { userId, lawyerId } = req.query;
  const threadKey = key(userId, lawyerId);
  const msgs = await Message.find({ threadKey }).sort({ createdAt: 1 });
  res.json(msgs);
};

export const unreadCount = async (req, res) => {
  const { userId, lawyerId, forRole } = req.query; // forRole: "USER" | "LAWYER"
  const threadKey = key(userId, lawyerId);
  const filter =
    forRole === "LAWYER"
      ? { threadKey, toLawyer: lawyerId, readAt: null }
      : { threadKey, toUser: userId, readAt: null };
  const count = await Message.countDocuments(filter);
  res.json({ count });
};

export const markThreadRead = async (req, res) => {
  const { userId, lawyerId, forRole } = req.body;
  const threadKey = key(userId, lawyerId);
  const filter =
    forRole === "LAWYER"
      ? { threadKey, toLawyer: lawyerId, readAt: null }
      : { threadKey, toUser: userId, readAt: null };
  await Message.updateMany(filter, { $set: { readAt: new Date() } });
  res.json({ ok: true });
};
