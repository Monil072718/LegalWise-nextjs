import Timesheet from "../models/Timesheet.js";
import Invoice from "../models/Invoice.js";
import Lawyer from "../models/Lawyer.js";

export const startTimer = async (req, res) => {
  const { clientId, caseId } = req.body;
  const running = await Timesheet.findOne({ lawyer: req.user._id, client: clientId, endedAt: null });
  if (running) return res.status(400).json({ message: "Timer already running for this client" });

  const row = await Timesheet.create({
    lawyer: req.user._id,
    client: clientId,
    case: caseId || null,
    startedAt: new Date(),
  });
  res.status(201).json(row);
};

export const stopTimer = async (req, res) => {
  const { id } = req.params;
  const t = await Timesheet.findById(id);
  if (!t || t.endedAt) return res.status(404).json({ message: "Timer not found/running" });

  t.endedAt = new Date();
  const minutes = Math.max(1, Math.ceil((t.endedAt - t.startedAt) / (1000 * 60)));
  t.minutes = minutes;
  await t.save();
  res.json(t);
};

export const generateInvoice = async (req, res) => {
  const { clientId, caseId, timesheetIds = [] } = req.body;
  const lawyer = await Lawyer.findById(req.user._id);
  const sheets = await Timesheet.find({ _id: { $in: timesheetIds } });

  const hours = sheets.reduce((acc, s) => acc + s.minutes / 60, 0);
  const rate = lawyer.hourlyRate || 0;
  const amount = parseFloat((hours * rate).toFixed(2));

  const number = "INV-" + Math.random().toString(36).slice(2, 8).toUpperCase();

  const invoice = await Invoice.create({
    number,
    lawyer: req.user._id,
    client: clientId,
    case: caseId || null,
    lines: [{ label: "Consultation Hours", quantity: +hours.toFixed(2), unitPrice: rate, amount }],
    subtotal: amount,
    tax: 0,
    total: amount,
    status: "SENT",
  });

  res.status(201).json(invoice);
};

export const listInvoices = async (req, res) => {
  const filter = {};
  if (req.query.clientId) filter.client = req.query.clientId;
  if (req.query.lawyerId) filter.lawyer = req.query.lawyerId;
  const items = await Invoice.find(filter).sort({ createdAt: -1 });
  res.json(items);
};

export const markInvoicePaid = async (req, res) => {
  const inv = await Invoice.findByIdAndUpdate(
    req.params.id,
    { status: "PAID", paidAt: new Date() },
    { new: true }
  );
  if (!inv) return res.status(404).json({ message: "Invoice not found" });
  res.json(inv);
};
