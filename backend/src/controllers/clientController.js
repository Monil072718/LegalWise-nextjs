import User from "../models/User.js";
import { logAction } from "../middlewares/auditMiddleware.js";

export const listClients = async (req, res) => {
  const clients = await User.find().limit(200).select("-password");
  res.json(clients);
};

export const getClient = async (req, res) => {
  const client = await User.findById(req.params.clientId).select("-password");
  if (!client) return res.status(404).json({ message: "Not found" });
  res.json(client);
};

export const suspendClient = async (req, res) => {
  const client = await User.findById(req.params.clientId);
  if (!client) return res.status(404).json({ message: "Not found" });
  client.isSuspended = true;
  await client.save();
  await logAction(req.admin._id, "Suspended client", { clientId: client._id });
  res.json({ message: "Suspended" });
};
