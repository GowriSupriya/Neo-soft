"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const database_1 = require("./database");
dotenv_1.default.config(); // Load environment variables
const app = (0, express_1.default)();
app.use(express_1.default.json()); // Middleware for parsing JSON
// Connect to Database
(0, database_1.connectDB)()
    .then(() => console.log("✅ Connected to MongoDB"))
    .catch((err) => console.error("❌ Database connection error:", err));
app.use("/api", userRoutes_1.default); // Register Routes
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
