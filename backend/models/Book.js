import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  description: String,
  price: Number,
  imageUrl: String,
  category: String,
  stock: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.model("Book", bookSchema);
