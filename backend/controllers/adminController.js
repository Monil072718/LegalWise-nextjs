import Admin from "../models/Admin.js";
import { generateToken } from "../utils/jwt.js";

// Register Admin (only for first time setup)
export const registerAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if admin already exists
    const adminExists = await Admin.findOne({ email });
    if (adminExists) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    const admin = await Admin.create({ name, email, password });

    res.status(201).json({
      _id: admin._id,
      name: admin.name,
      email: admin.email,
      role: admin.role,
      token: generateToken(admin._id, admin.role),
    });
  } catch (error) {
    console.error("Admin registration error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
