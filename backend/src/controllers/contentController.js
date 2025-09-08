import Book from "../models/Book.js";
import Article from "../models/Article.js";
import { logAction } from "../middlewares/auditMiddleware.js";

export const createBook = async (req, res) => {
  const book = await Book.create(req.body);
  await logAction(req.admin._id, "Created book", { bookId: book._id });
  res.status(201).json(book);
};

export const createArticle = async (req, res) => {
  const a = await Article.create(req.body);
  await logAction(req.admin._id, "Created article", { articleId: a._id });
  res.status(201).json(a);
};

export const listBooks = async (req, res) => {
  const books = await Book.find().limit(200);
  res.json(books);
};

export const listArticles = async (req, res) => {
  const arts = await Article.find().limit(200);
  res.json(arts);
};
