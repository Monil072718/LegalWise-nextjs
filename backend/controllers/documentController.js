import Document from "../models/Document.js";

export const uploadDocument = async (req, res) => {
  try {
    const doc = await Document.create({ ...req.body, user: req.user._id });
    res.status(201).json(doc);
  } catch (err) {
    res.status(400).json({ message: "Failed to upload document" });
  }
};

export const getDocuments = async (req, res) => {
  try {
    const docs = await Document.find({ user: req.user._id });
    res.json(docs);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch documents" });
  }
};

export const deleteDocument = async (req, res) => {
  try {
    const doc = await Document.findByIdAndDelete(req.params.id);
    if (!doc) return res.status(404).json({ message: "Document not found" });
    res.json({ message: "Document deleted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete document" });
  }
};
