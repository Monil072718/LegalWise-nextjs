import Chat from "../models/Chat.js";

// @desc    Send a chat message
// @route   POST /api/chats/send
// @access  Private
export const sendMessage = async (req, res) => {
  const { receiverId, message } = req.body;

  if (!receiverId || !message) {
    return res.status(400).json({ message: "Receiver and message are required" });
  }

  try {
    const chat = await Chat.create({
      sender: req.user._id,
      receiver: receiverId,
      message,
    });

    res.status(201).json(chat);
  } catch (error) {
    console.error("❌ Chat send error:", error.message);  // <--- log real error
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get chats between logged in user and another user
// @route   GET /api/chats/:receiverId
// @access  Private
export const getMessages = async (req, res) => {
  try {
    const chats = await Chat.find({
      $or: [
        { sender: req.user._id, receiver: req.params.receiverId },
        { sender: req.params.receiverId, receiver: req.user._id },
      ],
    }).sort({ createdAt: 1 });

    res.json(chats);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
