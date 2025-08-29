import mongoose from "mongoose";

const DocumentSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    fileUrl: { type: String, required: true },
    category: { type: String, required: true },
  },
  { timestamps: true }
);

const Document = mongoose.model("Document", DocumentSchema);
export default Document;
