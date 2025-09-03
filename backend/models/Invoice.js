// models/Invoice.js
import mongoose from "mongoose";

const InvoiceLineSchema = new mongoose.Schema(
  {
    label: String,
    quantity: Number,        // hours or items
    unitPrice: Number,
    amount: Number,          // quantity * unitPrice
  },
  { _id: false }
);

const InvoiceSchema = new mongoose.Schema(
  {
    lawyer: { type: mongoose.Schema.Types.ObjectId, ref: "Lawyer", required: true },
    client: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    case: { type: mongoose.Schema.Types.ObjectId, ref: "Case" },
    number: { type: String, unique: true, required: true },
    lines: [InvoiceLineSchema],
    subtotal: Number,
    tax: Number,
    total: Number,
    currency: { type: String, default: "USD" },
    status: { type: String, enum: ["DRAFT", "SENT", "PAID", "VOID"], default: "DRAFT" },
    issuedAt: { type: Date, default: Date.now },
    paidAt: { type: Date },
    notes: String,
  },
  { timestamps: true }
);

export default mongoose.model("Invoice", InvoiceSchema);
