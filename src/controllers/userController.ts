import { Request, Response } from "express";
import axios from "axios";
import { usersCollection } from "../database";
import { User } from "../models/userModel";

const JSON_PLACEHOLDER = "https://jsonplaceholder.typicode.com";

// ✅ Load users and store in MongoDB
export const loadUsers = async (req: Request, res: Response) => {
  try {
    const [usersResponse, postsResponse, commentsResponse] = await Promise.all([
      axios.get(`${JSON_PLACEHOLDER}/users`),
      axios.get(`${JSON_PLACEHOLDER}/posts`),
      axios.get(`${JSON_PLACEHOLDER}/comments`),
    ]);

    const users: User[] = usersResponse.data;
    const posts = postsResponse.data;
    const comments = commentsResponse.data;

    if (!users.length) {
      return res.status(404).json({ message: "No users found in external API" });
    }

    const enrichedUsers = users.map((user) => ({
      ...user,
      posts: posts
        .filter((post: any) => post.userId === user.id)
        .map((post: any) => ({
          ...post,
          comments: comments.filter((comment: any) => comment.postId === post.id),
        })),
    }));

    await usersCollection.insertMany(enrichedUsers);
    res.status(200).json({ message: "Users loaded successfully" });
  } catch (error: any) {
    res.status(500).json({ message: "Error loading users", error: error.message });
  }
};

// ✅ Delete all users
export const deleteAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await usersCollection.deleteMany({});
    res.status(200).json({ message: "All users deleted successfully", deletedCount: result.deletedCount });
  } catch (error: any) {
    res.status(500).json({ message: "Error deleting users", error: error.message });
  }
};

// ✅ Delete a user by ID
export const deleteUserById = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId);
    if (isNaN(userId)) {
      return res.status(400).json({ message: "Invalid userId" });
    }

    const result = await usersCollection.deleteOne({ id: userId });
    res.status(200).json({ message: "User deleted successfully", deletedCount: result.deletedCount });
  } catch (error: any) {
    res.status(500).json({ message: "Error deleting user", error: error.message });
  }
};

// ✅ Get user by ID
export const getUserById = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId);
    if (isNaN(userId)) {
      return res.status(400).json({ message: "Invalid userId" });
    }

    const user = await usersCollection.findOne({ id: userId });
    res.status(200).json(user);
  } catch (error: any) {
    res.status(500).json({ message: "Error retrieving user", error: error.message });
  }
};

// ✅ Add a new user
export const addUser = async (req: Request, res: Response) => {
  try {
    const newUser: User = req.body;

    if (!newUser.id || !newUser.name || !newUser.email) {
      return res.status(400).json({ message: "Missing required fields (id, name, email)" });
    }

    const existingUser = await usersCollection.findOne({ id: newUser.id });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    await usersCollection.insertOne(newUser);
    res.status(201).json({ message: "User added successfully", user: newUser });
  } catch (error: any) {
    res.status(500).json({ message: "Error adding user", error: error.message });
  }
};

