const permit = (...allowedRoles) => (req, res, next) => {
  const role = req.admin?.role;
  if (!role || !allowedRoles.includes(role)) {
    return res.status(403).json({ message: "Forbidden: insufficient permissions" });
  }
  next();
};

export default permit;
