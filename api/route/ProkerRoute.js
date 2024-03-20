import express from "express";
import {
  getProker,
  getProkerById,
  createProker,
  updateProker,
  deleteProker,
} from "../controllers/Program.js";
import { AuthAccess } from "../middleware/AuthAccess.js";

const router = express.Router();

router.get("/proker", getProker);
router.get("/proker/:id", AuthAccess, getProkerById);
router.post("/proker", AuthAccess, createProker);
router.patch("/proker/:id", AuthAccess, updateProker);
router.delete("/proker/:id", AuthAccess, deleteProker);

export default router;
