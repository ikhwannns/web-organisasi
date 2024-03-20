import express from "express";
import {
  getSejarah,
  getSejarahById,
  createSejarah,
  updateSejarah,
  deleteSejarah,
} from "../controllers/History.js";
import { AuthAccess } from "../middleware/AuthAccess.js";

const router = express.Router();

router.get("/history", getSejarah);
router.get("/history/:id", AuthAccess, getSejarahById);
router.post("/history", AuthAccess, createSejarah);
router.put("/history/:id", AuthAccess, updateSejarah);
router.delete("/history/:id", AuthAccess, deleteSejarah);

export default router;
