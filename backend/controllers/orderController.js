import Order from "../models/Order.js";
import OrderItem from "../models/OrderItem.js";
import Book from "../models/Book.js";

/**
 * Create an order for the logged-in user.
 * Body: { items: [{ bookId, quantity }], address, phone }
 */
export const createOrder = async (req, res) => {
  try {
    const { items, address, phone } = req.body;

    if (!Array.isArray(items) || items.length === 0)
      return res.status(400).json({ message: "No items provided" });
    if (!address || !phone)
      return res.status(400).json({ message: "Address and phone are required" });

    // Fetch books & validate stock
    const bookIds = items.map(i => i.bookId);
    const books = await Book.find({ _id: { $in: bookIds } });

    if (books.length !== items.length)
      return res.status(400).json({ message: "Some books not found" });

    // Calculate total and check quantities
    let total = 0;
    for (const item of items) {
      const book = books.find(b => String(b._id) === String(item.bookId));
      if (!book) return res.status(400).json({ message: "Invalid book in cart" });
      if (item.quantity <= 0) return res.status(400).json({ message: "Invalid quantity" });
      total += book.price * item.quantity;
    }

    const order = await Order.create({
      user: req.user._id,
      total,
      address,
      phone,
      status: "PENDING",
    });

    // Create order items, snapshotting price
    const orderItemsPayload = items.map(item => {
      const book = books.find(b => String(b._id) === String(item.bookId));
      return {
        order: order._id,
        book: book._id,
        quantity: item.quantity,
        price: book.price,
      };
    });

    await OrderItem.insertMany(orderItemsPayload);

    const populated = await Order.findById(order._id);
    return res.status(201).json(populated);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Failed to create order" });
  }
};

/** GET /api/users/orders */
export const listMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .sort({ createdAt: -1 });
    return res.json(orders);
  } catch (err) {
    return res.status(500).json({ message: "Failed to fetch orders" });
  }
};

/** GET /api/users/orders/:id  (includes items + book snapshot) */
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findOne({ _id: req.params.id, user: req.user._id });
    if (!order) return res.status(404).json({ message: "Order not found" });

    const items = await OrderItem.find({ order: order._id })
      .populate("book", "title author imageUrl category");

    return res.json({ order, items });
  } catch (err) {
    return res.status(500).json({ message: "Failed to fetch order" });
  }
};
