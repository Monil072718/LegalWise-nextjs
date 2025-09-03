import Lawyer from "../models/Lawyer.js";
import User from "../models/User.js";
import Case from "../models/Case.js";
import Appointment from "../models/Appointment.js";
import Invoice from "../models/Invoice.js";

// ADMIN: create lawyer (email/password already created by admin in your flow)
export const createLawyer = async (req, res) => {
  try {
    const { name, email, password, specialization, experience, hourlyRate } = req.body;
    const exists = await Lawyer.findOne({ email });
    if (exists) return res.status(400).json({ message: "Lawyer already exists" });

    const lawyer = await Lawyer.create({
      name, email, password, specialization, experience, hourlyRate
    });

    return res.status(201).json(lawyer);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Failed to create lawyer" });
  }
};

export const listLawyers = async (_req, res) => {
  const items = await Lawyer.find().sort({ createdAt: -1 });
  res.json(items);
};

export const updateLawyerProfile = async (req, res) => {
  const { id } = req.params;
  const payload = req.body;
  const updated = await Lawyer.findByIdAndUpdate(id, payload, { new: true });
  if (!updated) return res.status(404).json({ message: "Lawyer not found" });
  res.json(updated);
};

export const setLawyerAvailability = async (req, res) => {
  const { id } = req.params;
  const { availabilityStatus } = req.body; // ONLINE/OFFLINE/BUSY
  const updated = await Lawyer.findByIdAndUpdate(id, { availabilityStatus }, { new: true });
  if (!updated) return res.status(404).json({ message: "Lawyer not found" });
  res.json(updated);
};

// ADMIN: assign a client to a lawyer (creates a "connection")
export const assignClientToLawyer = async (req, res) => {
  const { lawyerId, clientId } = req.body;
  const lawyer = await Lawyer.findById(lawyerId);
  const client = await User.findById(clientId);
  if (!lawyer || !client) return res.status(404).json({ message: "Lawyer or client not found" });

  // You can store connections in Case or a separate collection. We'll create a blank case shell:
  const existing = await Case.findOne({ lawyer: lawyerId, client: clientId, status: { $ne: "CLOSED" } });
  if (existing) return res.status(200).json({ message: "Already connected", caseId: existing._id });

  const shell = await Case.create({
    title: "General Consultation",
    description: "Auto-created connection by admin",
    client: clientId,
    lawyer: lawyerId,
    stage: "NEW",
    status: "OPEN",
  });

  res.status(201).json({ message: "Client assigned", caseId: shell._id });
};

// ADMIN: dashboard KPIs
export const adminDashboard = async (_req, res) => {
  const [activeCases, pendingReq, upcoming, unread] = await Promise.all([
    Case.countDocuments({ status: "OPEN" }),
    // treat PENDING appointments as "client requests"
    Appointment.countDocuments({ status: "PENDING" }),
    Appointment.countDocuments({ startsAt: { $gte: new Date() } }),
    // rough unread: messages with readAt null (you can scope further if needed)
    // Using Message model would be better here; return 0 if not needed
    Promise.resolve(0),
  ]);

  res.json({
    activeCases,
    pendingClientRequests: pendingReq,
    upcomingAppointments: upcoming,
    unreadMessages: unread,
  });
};

// ADMIN: revenue/reporting (very simple aggregate)
export const revenueReport = async (_req, res) => {
  const invoices = await Invoice.aggregate([
    { $match: { status: { $in: ["SENT", "PAID"] } } },
    { $group: { _id: "$status", total: { $sum: "$total" }, count: { $sum: 1 } } },
  ]);
  res.json({ invoices });
};
