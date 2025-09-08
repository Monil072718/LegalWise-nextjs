import User from "../models/User.js";
import Lawyer from "../models/Lawyer.js";
import Appointment from "../models/Appointment.js";
import Case from "../models/Case.js";
import Subscription from "../models/Subscription.js";

export const quickStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalLawyers = await Lawyer.countDocuments();
    const activeCases = await Case.countDocuments({ status: { $ne: "closed" } });
    const pendingRequests = await Appointment.countDocuments({ status: "pending" });
    const upcomingAppointments = await Appointment.countDocuments({ startTime: { $gte: new Date() } });
    const pendingClientRequests = pendingRequests;

    // total revenue example (assumes payments collection)
    // const revenue = await Payment.aggregate([...])

    res.json({
      totalUsers,
      totalLawyers,
      activeCases,
      pendingRequests,
      upcomingAppointments,
      pendingClientRequests,
      totalRevenue: 0
    });
  } catch (err) { res.status(500).json({ message: err.message }); }
};
