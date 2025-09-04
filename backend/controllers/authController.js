import User from "../models/User.js";
import Lawyer from "../models/Lawyer.js";
import Admin from "../models/Admin.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { generateToken } from "../utils/jwt.js";

// Generate JWT
// const generateToken = (id, role) => {
//   return jwt.sign({ id, role }, process.env.JWT_SECRET, {
//     expiresIn: "7d",
//   });
// };

// ✅ Register (Only for USERS)
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(400).json({ message: "User already exists" });

    const user = await User.create({
      name,
      email,
      password,
      role: "USER", // Users always get USER role here
    });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id, user.role),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Register Admin
export const registerAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const exists = await Admin.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = new Admin({
      name,
      email,
      password: hashedPassword,
    });

    await admin.save();

    res.status(201).json({
      message: "Admin registered successfully",
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
      },
      token: generateToken(admin),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error registering admin" });
  }
};

// ✅ Single Login for All Roles
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    let account = await User.findOne({ email });
    let role = "USER";

    if (account) {
      // Check user password using schema method
      const isMatch = await account.matchPassword(password);
      if (!isMatch)
        return res.status(401).json({ message: "Invalid credentials" });

      return res.json({
        _id: account._id,
        name: account.name,
        email: account.email,
        role,
        token: generateToken(account._id, role),
      });
    }

    // Check lawyer
    account = await Lawyer.findOne({ email });
    if (account) {
      role = "LAWYER";
      const isMatch = await bcrypt.compare(password, account.password);
      if (!isMatch)
        return res.status(401).json({ message: "Invalid credentials" });

      return res.json({
        _id: account._id,
        name: account.name,
        email: account.email,
        role,
        token: generateToken(account._id, role),
      });
    }

    // Check admin
    // account = await Admin.findOne({ email });
    // if (account) {
    //   role = "ADMIN";
    //   const isMatch = await bcrypt.compare(password, account.password);
    //   if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    //   return res.json({
    //     _id: account._id,
    //     name: account.name,
    //     email: account.email,
    //     role,
    //     token: generateToken(account._id, role),
    //   });
    // }

    return res.status(401).json({ message: "Invalid credentials" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
