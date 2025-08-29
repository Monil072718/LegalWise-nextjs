import LawyerHire from "../models/LawyerHire.js";
import Lawyer from "../models/Lawyer.js";

/** POST /api/users/hire  Body: { lawyerId, caseDetails } */
export const createHireRequest = async (req, res) => {
  try {
    const { lawyerId, caseDetails } = req.body;
    if (!lawyerId || !caseDetails)
      return res.status(400).json({ message: "lawyerId and caseDetails are required" });

    const lawyer = await Lawyer.findById(lawyerId);
    if (!lawyer) return res.status(404).json({ message: "Lawyer not found" });

    const hire = await LawyerHire.create({
      user: req.user._id,
      lawyer: lawyer._id,
      caseDetails,
      status: "PENDING",
    });

    const populated = await hire.populate([
      { path: "lawyer", select: "name specialization experience rating imageUrl" }
    ]);
    return res.status(201).json(populated);
  } catch (err) {
    return res.status(500).json({ message: "Failed to create hire request" });
  }
};

/** GET /api/users/hires */
export const listMyHires = async (req, res) => {
  try {
    const hires = await LawyerHire.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .populate("lawyer", "name specialization experience rating imageUrl");
    return res.json(hires);
  } catch (err) {
    return res.status(500).json({ message: "Failed to fetch hires" });
  }
};

/** GET /api/users/hires/:id */
export const getHireById = async (req, res) => {
  try {
    const hire = await LawyerHire.findOne({ _id: req.params.id, user: req.user._id })
      .populate("lawyer", "name specialization experience rating imageUrl");
    if (!hire) return res.status(404).json({ message: "Hire not found" });
    return res.json(hire);
  } catch (err) {
    return res.status(500).json({ message: "Failed to fetch hire" });
  }
};

/** DELETE /api/users/hires/:id  (allow cancel only while pending) */
export const cancelHire = async (req, res) => {
  try {
    const hire = await LawyerHire.findOne({ _id: req.params.id, user: req.user._id });
    if (!hire) return res.status(404).json({ message: "Hire not found" });
    if (hire.status !== "PENDING")
      return res.status(400).json({ message: "Only pending hires can be cancelled" });

    await hire.deleteOne();
    return res.json({ message: "Hire request cancelled" });
  } catch (err) {
    return res.status(500).json({ message: "Failed to cancel hire" });
  }
};
