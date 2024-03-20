import express from "express";
import {
  getArtikel,
  getArtikelById,
  createArtikel,
  updateArtikel,
  deleteArtikel,
} from "../controllers/Artikel.js";
import { AuthAccess } from "../middleware/AuthAccess.js";

const router = express.Router();

router.get("/artikel", getArtikel);
router.get("/artikel/:id", AuthAccess, getArtikelById);
router.post("/artikel", AuthAccess, createArtikel);
router.patch("/artikel/:id", AuthAccess, updateArtikel);
router.delete("/artikel/:id", AuthAccess, deleteArtikel);

export default router;
