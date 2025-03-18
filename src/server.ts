import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes";
import { connectDB } from "./database";

dotenv.config(); // Load environment variables

const app = express();
app.use(express.json()); // Middleware for parsing JSON

// Connect to Database
connectDB()
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ Database connection error:", err));

app.use("/api", userRoutes); // Register Routes

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
