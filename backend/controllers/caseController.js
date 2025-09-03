import Case from "../models/Case.js";

export const createCase = async (req, res) => {
  try {
    const { title, description, clientId, lawyerId } = req.body;
    const doc = await Case.create({
      title,
      description,
      client: clientId || req.user?._id, // admin can pass clientId; lawyer can default to authenticated client if needed
      lawyer: lawyerId,
    });
    res.status(201).json(doc);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Failed to create case" });
  }
};

export const updateCase = async (req, res) => {
  const { id } = req.params;
  const updated = await Case.findByIdAndUpdate(id, req.body, { new: true });
  if (!updated) return res.status(404).json({ message: "Case not found" });
  res.json(updated);
};

export const getCase = async (req, res) => {
  const item = await Case.findById(req.params.id).populate("client lawyer");
  if (!item) return res.status(404).json({ message: "Case not found" });
  res.json(item);
};

export const listCases = async (req, res) => {
  const filter = {};
  if (req.query.lawyerId) filter.lawyer = req.query.lawyerId;
  if (req.query.clientId) filter.client = req.query.clientId;
  const items = await Case.find(filter).sort({ updatedAt: -1 });
  res.json(items);
};

export const addCaseNote = async (req, res) => {
  const { id } = req.params;
  const { text } = req.body;
  const caseDoc = await Case.findById(id);
  if (!caseDoc) return res.status(404).json({ message: "Case not found" });

  caseDoc.notes.push({ text, author: req.user._id });
  await caseDoc.save();
  res.json(caseDoc);
};

export const setNextHearing = async (req, res) => {
  const { id } = req.params;
  const { nextHearingAt, stage, status } = req.body;
  const updated = await Case.findByIdAndUpdate(
    id,
    { nextHearingAt, ...(stage && { stage }), ...(status && { status }) },
    { new: true }
  );
  if (!updated) return res.status(404).json({ message: "Case not found" });
  res.json(updated);
};
