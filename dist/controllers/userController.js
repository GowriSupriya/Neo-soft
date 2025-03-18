"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addUser = exports.getUserById = exports.deleteUserById = exports.deleteAllUsers = exports.loadUsers = void 0;
const axios_1 = __importDefault(require("axios"));
const database_1 = require("../database");
const JSON_PLACEHOLDER = "https://jsonplaceholder.typicode.com";
// ✅ Load users and store in MongoDB
const loadUsers = async (req, res) => {
    try {
        const [usersResponse, postsResponse, commentsResponse] = await Promise.all([
            axios_1.default.get(`${JSON_PLACEHOLDER}/users`),
            axios_1.default.get(`${JSON_PLACEHOLDER}/posts`),
            axios_1.default.get(`${JSON_PLACEHOLDER}/comments`),
        ]);
        const users = usersResponse.data;
        const posts = postsResponse.data;
        const comments = commentsResponse.data;
        if (!users.length) {
            return res.status(404).json({ message: "No users found in external API" });
        }
        const enrichedUsers = users.map((user) => ({
            ...user,
            posts: posts
                .filter((post) => post.userId === user.id)
                .map((post) => ({
                ...post,
                comments: comments.filter((comment) => comment.postId === post.id),
            })),
        }));
        await database_1.usersCollection.insertMany(enrichedUsers);
        res.status(200).json({ message: "Users loaded successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Error loading users", error: error.message });
    }
};
exports.loadUsers = loadUsers;
// ✅ Delete all users
const deleteAllUsers = async (req, res) => {
    try {
        const result = await database_1.usersCollection.deleteMany({});
        res.status(200).json({ message: "All users deleted successfully", deletedCount: result.deletedCount });
    }
    catch (error) {
        res.status(500).json({ message: "Error deleting users", error: error.message });
    }
};
exports.deleteAllUsers = deleteAllUsers;
// ✅ Delete a user by ID
const deleteUserById = async (req, res) => {
    try {
        const userId = parseInt(req.params.userId);
        if (isNaN(userId)) {
            return res.status(400).json({ message: "Invalid userId" });
        }
        const result = await database_1.usersCollection.deleteOne({ id: userId });
        res.status(200).json({ message: "User deleted successfully", deletedCount: result.deletedCount });
    }
    catch (error) {
        res.status(500).json({ message: "Error deleting user", error: error.message });
    }
};
exports.deleteUserById = deleteUserById;
// ✅ Get user by ID
const getUserById = async (req, res) => {
    try {
        const userId = parseInt(req.params.userId);
        if (isNaN(userId)) {
            return res.status(400).json({ message: "Invalid userId" });
        }
        const user = await database_1.usersCollection.findOne({ id: userId });
        res.status(200).json(user);
    }
    catch (error) {
        res.status(500).json({ message: "Error retrieving user", error: error.message });
    }
};
exports.getUserById = getUserById;
// ✅ Add a new user
const addUser = async (req, res) => {
    try {
        const newUser = req.body;
        if (!newUser.id || !newUser.name || !newUser.email) {
            return res.status(400).json({ message: "Missing required fields (id, name, email)" });
        }
        const existingUser = await database_1.usersCollection.findOne({ id: newUser.id });
        if (existingUser) {
            return res.status(409).json({ message: "User already exists" });
        }
        await database_1.usersCollection.insertOne(newUser);
        res.status(201).json({ message: "User added successfully", user: newUser });
    }
    catch (error) {
        res.status(500).json({ message: "Error adding user", error: error.message });
    }
};
exports.addUser = addUser;
