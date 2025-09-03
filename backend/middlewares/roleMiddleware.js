// middlewares/roleMiddleware.js
export const requireRole = (...roles) => {
  return (req, res, next) => {
    // support both User model role and Lawyer -> mapped role in auth
    const role = req.user?.role || req.lawyer?.role;
    if (!role || !roles.includes(role)) {
      return res.status(403).json({ message: "Forbidden: insufficient role" });
    }
    next();
  };
};
