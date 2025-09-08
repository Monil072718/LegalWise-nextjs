import mongoose from "mongoose";
const articleSchema = new mongoose.Schema({
  title: String,
  slug: String,
  author: String,
  content: String,
  views: { type: Number, default: 0 },
  featured: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.model("Article", articleSchema);