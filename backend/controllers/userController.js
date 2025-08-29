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
