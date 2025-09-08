import Admin from "../models/Admin.js";
import generateToken from "../utils/generateToken.js";
import { logAction } from "../middlewares/auditMiddleware.js";

export const registerAdmin = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const exists = await Admin.findOne({ email });
    if (exists) return res.status(400).json({ message: "Admin exists" });
    const admin = await Admin.create({ name, email, password, role });
    await logAction(admin._id, "Registered admin", { email });
    res.status(201).json({
      admin: { id: admin._id, name: admin.name, email: admin.email, role: admin.role },
      token: generateToken(admin._id, admin.role)
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });
    if (!admin || !(await admin.matchPassword(password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    await logAction(admin._id, "Login");
    res.json({
      admin: { id: admin._id, name: admin.name, email: admin.email, role: admin.role },
      token: generateToken(admin._id, admin.role)
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getProfile = (req, res) => {
  res.json(req.admin);
};

export const changeRole = async (req, res) => {
  try {
    const { adminId } = req.params;
    const { role } = req.body;
    const admin = await Admin.findById(adminId);
    if (!admin) return res.status(404).json({ message: "Admin not found" });
    admin.role = role;
    await admin.save();
    await logAction(req.admin._id, "Changed admin role", { adminId, role });
    res.json({ message: "Role updated", admin });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
