import Lawyer from "../models/Lawyer.js";
import { logAction } from "../middlewares/auditMiddleware.js";

// Create / Add lawyer (admin only)
export const addLawyer = async (req, res) => {
  try {
    const { name, email, phone, specialization, bio } = req.body;
    const exists = await Lawyer.findOne({ email });
    if (exists) return res.status(400).json({ message: "Lawyer with email exists" });
    const lawyer = await Lawyer.create({ name, email, phone, specialization, bio });
    await logAction(req.admin._id, "Added lawyer", { lawyerId: lawyer._id });
    res.status(201).json(lawyer);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const verifyLawyer = async (req, res) => {
  try {
    const { lawyerId } = req.params;
    const lawyer = await Lawyer.findById(lawyerId);
    if (!lawyer) return res.status(404).json({ message: "Not found" });
    lawyer.isVerified = true;
    await lawyer.save();
    await logAction(req.admin._id, "Verified lawyer", { lawyerId });
    res.json({ message: "Verified", lawyer });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const removeLawyer = async (req, res) => {
  try {
    const { lawyerId } = req.params;
    const lawyer = await Lawyer.findByIdAndDelete(lawyerId);
    await logAction(req.admin._id, "Removed lawyer", { lawyerId });
    res.json({ message: "Removed", lawyer });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getLawyer = async (req, res) => {
  try {
    const lawyer = await Lawyer.findById(req.params.lawyerId);
    if (!lawyer) return res.status(404).json({ message: "Not found" });
    res.json(lawyer);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const listLawyers = async (req, res) => {
  try {
    const q = req.query.q || "";
    const lawyers = await Lawyer.find({ name: { $regex: q, $options: "i" } }).limit(100);
    res.json(lawyers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const suspendLawyer = async (req, res) => {
  try {
    const { lawyerId } = req.params;
    const { reason } = req.body;
    const lawyer = await Lawyer.findById(lawyerId);
    if (!lawyer) return res.status(404).json({ message: "Not found" });
    lawyer.isSuspended = true;
    await lawyer.save();
    await logAction(req.admin._id, "Suspended lawyer", { lawyerId, reason });
    res.json({ message: "Suspended", lawyer });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createLawyer = async (req, res) => {
  try {
    // your logic to create lawyer
    await logAction(req.admin._id, "Created a new lawyer", { lawyerId: "12345" });

    res.json({ message: "Lawyer created successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};