import Appointment from "../models/Appointment.js";

export const createAppointment = async (req, res) => {
  try {
    const { clientId, lawyerId, caseId, title, startsAt, endsAt, location } = req.body;
    const appt = await Appointment.create({
      client: clientId,
      lawyer: lawyerId,
      case: caseId || null,
      title,
      startsAt,
      endsAt,
      location: location || "Online",
    });
    res.status(201).json(appt);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Failed to create appointment" });
  }
};

export const respondAppointment = async (req, res) => {
  const { id } = req.params;
  const { action } = req.body; // "ACCEPT" | "DECLINE"
  const status = action === "ACCEPT" ? "ACCEPTED" : "DECLINED";
  const updated = await Appointment.findByIdAndUpdate(id, { status }, { new: true });
  if (!updated) return res.status(404).json({ message: "Appointment not found" });
  res.json(updated);
};

export const listUpcoming = async (req, res) => {
  const q = { startsAt: { $gte: new Date() } };
  if (req.query.lawyerId) q.lawyer = req.query.lawyerId;
  if (req.query.clientId) q.client = req.query.clientId;
  const items = await Appointment.find(q).sort({ startsAt: 1 });
  res.json(items);
};
