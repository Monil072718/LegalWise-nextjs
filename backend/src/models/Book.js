import mongoose from "mongoose";
const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  description: String,
  price: Number,
  fileUrl: String,
  downloads: { type: Number, default: 0 },
  featured: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.model("Book", bookSchema);