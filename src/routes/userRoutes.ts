import { Router } from "express";
import {
  loadUsers,
  deleteAllUsers,
  deleteUserById,
  getUserById,
  addUser,
} from "../controllers/userController";

const router = Router();

router.get("/load-users", loadUsers);
router.delete("/delete-all-users", deleteAllUsers);
router.delete("/delete-user/:userId", deleteUserById);
router.get("/user/:userId", getUserById);
router.post("/add-user", addUser);

export default router;






