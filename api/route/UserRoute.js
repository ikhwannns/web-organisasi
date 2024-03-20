import express from "express";
import {
  getAllUser,
  createUser,
  getAllUserById,
  updateUser,
  deleteUser,
} from "../controllers/Users.js";
import { AuthAccess } from "../middleware/AuthAccess.js";

const router = express.Router();

router.get("/users", AuthAccess, getAllUser);
router.get("/users/:id", AuthAccess, getAllUserById);
router.post("/users", AuthAccess, createUser);
router.put("/users/:id", AuthAccess, updateUser);
router.delete("/users/:id", AuthAccess, deleteUser);

export default router;
