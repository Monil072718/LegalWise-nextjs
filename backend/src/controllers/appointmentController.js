import Appointment from "../models/Appointment.js";
import { logAction } from "../middlewares/auditMiddleware.js";

export const listAppointments = async (req, res) => {
  const list = await Appointment.find().populate("client lawyer").limit(200);
  res.json(list);
};

export const approveAppointment = async (req, res) => {
  const ap = await Appointment.findById(req.params.appointmentId);
  ap.status = "approved";
  await ap.save();
  await logAction(req.admin._id, "Approved appointment", { appointmentId: ap._id });
  res.json(ap);
};

export const declineAppointment = async (req, res) => {
  const ap = await Appointment.findById(req.params.appointmentId);
  ap.status = "declined";
  await ap.save();
  await logAction(req.admin._id, "Declined appointment", { appointmentId: ap._id });
  res.json(ap);
};
