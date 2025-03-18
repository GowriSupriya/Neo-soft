import { MongoClient, Db, Collection } from "mongodb";
import dotenv from "dotenv";
import { User } from "../models/userModel";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017";
const DB_NAME = process.env.DB_NAME || "testDB";

let db: Db;
export let usersCollection: Collection<User>;

export const connectDB = async () => {
  const client = new MongoClient(MONGO_URI);
  await client.connect();
  db = client.db(DB_NAME);
  usersCollection = db.collection<User>("users");
  console.log("✅ Database connected");
};
