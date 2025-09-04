import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Lawyer from "../models/Lawyer.js";
import Admin from "../models/Admin.js";

export const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(" ")[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Attach user to request based on role
      let user =
        (await User.findById(decoded.id).select("-password")) ||
        (await Lawyer.findById(decoded.id).select("-password")) ||
        (await Admin.findById(decoded.id).select("-password"));

      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }

      req.user = user;
      req.role = decoded.role;

      next();
    } catch (error) {
      console.error(error);
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }
};
