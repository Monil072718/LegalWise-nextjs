import SubscriptionPlan from "../models/SubscriptionPlan.js";
import Subscription from "../models/Subscription.js";
import { logAction } from "../middlewares/auditMiddleware.js";

export const createPlan = async (req, res) => {
  try {
    const plan = await SubscriptionPlan.create(req.body);
    await logAction(req.admin._id, "Created subscription plan", { planId: plan._id });
    res.status(201).json(plan);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

export const updatePlan = async (req, res) => {
  try {
    const plan = await SubscriptionPlan.findByIdAndUpdate(req.params.planId, req.body, { new: true });
    await logAction(req.admin._id, "Updated subscription plan", { planId: plan._id });
    res.json(plan);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

export const statsPlans = async (req, res) => {
  try {
    const totalSubscribers = await Subscription.countDocuments({ status: "active" });
    const revenue = await Subscription.aggregate([
      { $match: { status: "active" } },
      { $group: { _id: null, total: { $sum: "$amount" } } }
    ]);
    res.json({ totalSubscribers, revenue: revenue[0]?.total || 0 });
  } catch (err) { res.status(500).json({ message: err.message }); }
};
