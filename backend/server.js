import dotenv from "dotenv";
import app from "./src/app.js";
import connectDB from "./src/config/db.js";

dotenv.config();
const PORT = process.env.PORT || 8000;

// Connect to DB
connectDB();
console.log("MONGO_URI:", process.env.MONGO_URI);


// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
