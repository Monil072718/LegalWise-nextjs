import Lawyer from "../models/Lawyer.js";

export const getLawyers = async (req, res) => {
  try {
    const lawyers = await Lawyer.find();
    res.json(lawyers);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch lawyers" });
  }
};

export const getLawyerById = async (req, res) => {
  try {
    const lawyer = await Lawyer.findById(req.params.id);
    if (!lawyer) return res.status(404).json({ message: "Lawyer not found" });
    res.json(lawyer);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch lawyer" });
  }
};

export const createLawyer = async (req, res) => {
  try {
    const lawyer = await Lawyer.create(req.body);
    res.status(201).json(lawyer);
  } catch (err) {
    res.status(400).json({ message: "Failed to create lawyer" });
  }
};

export const updateLawyer = async (req, res) => {
  try {
    const lawyer = await Lawyer.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!lawyer) return res.status(404).json({ message: "Lawyer not found" });
    res.json(lawyer);
  } catch (err) {
    res.status(400).json({ message: "Failed to update lawyer" });
  }
};

export const deleteLawyer = async (req, res) => {
  try {
    const lawyer = await Lawyer.findByIdAndDelete(req.params.id);
    if (!lawyer) return res.status(404).json({ message: "Lawyer not found" });
    res.json({ message: "Lawyer deleted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete lawyer" });
  }
};
