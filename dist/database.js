"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = exports.usersCollection = void 0;
const mongodb_1 = require("mongodb");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017";
const DB_NAME = process.env.DB_NAME || "testDB";
let db;
const connectDB = async () => {
    const client = new mongodb_1.MongoClient(MONGO_URI);
    await client.connect();
    db = client.db(DB_NAME);
    exports.usersCollection = db.collection("users");
    console.log("✅ Database connected");
};
exports.connectDB = connectDB;
