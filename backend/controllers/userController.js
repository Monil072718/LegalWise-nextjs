import Book from "../models/Book.js";
import Article from "../models/Article.js";
import Document from "../models/Document.js";

export const getBooks = async (req, res) => {
  const books = await Book.find();
  res.json(books);
};

export const getArticles = async (req, res) => {
  const articles = await Article.find();
  res.json(articles);
};

export const getDocuments = async (req, res) => {
  const docs = await Document.find();
  res.json(docs);
};
export const getUserProfile = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Not authorized" });
    }

    res.json({
      _id: req.user._id,
      name: req.user.name,
      email: req.user.email,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};