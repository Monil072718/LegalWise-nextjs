import Case from "../models/Case.js";
import { logAction } from "../middlewares/auditMiddleware.js";

export const createCase = async (req, res) => {
  try {
    const c = await Case.create(req.body);
    await logAction(req.admin._id, "Created case", { caseId: c._id });
    res.status(201).json(c);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

export const updateCase = async (req, res) => {
  try {
    const c = await Case.findByIdAndUpdate(req.params.caseId, req.body, { new: true });
    await logAction(req.admin._id, "Updated case", { caseId: req.params.caseId });
    res.json(c);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

export const closeCase = async (req, res) => {
  try {
    const c = await Case.findById(req.params.caseId);
    c.status = "closed";
    await c.save();
    await logAction(req.admin._id, "Closed case", { caseId: c._id });
    res.json({ message: "Closed", case: c });
  } catch (err) { res.status(500).json({ message: err.message }); }
};
