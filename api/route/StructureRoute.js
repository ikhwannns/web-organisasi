import express from "express";
import {
  getMembers,
  getMembersById,
  createMembers,
  editMembers,
  deleteMembers,
} from "../controllers/Structure.js";
import { AuthAccess } from "../middleware/AuthAccess.js";

const router = express.Router();

router.get("/members", getMembers);
router.get("/members/:id", AuthAccess, getMembersById);
router.post("/members", AuthAccess, createMembers);
router.put("/members/:id", AuthAccess, editMembers);
router.delete("/members/:id", AuthAccess, deleteMembers);

export default router;
