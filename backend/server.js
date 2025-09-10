import express from 'express';
import dotenv from 'dotenv';
import connectDB from './src/config/db.js';
import mainRouter from './src/routes/mainRouter.js';

dotenv.config();

const app = express();

// Connect to database
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use('/api', mainRouter);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});