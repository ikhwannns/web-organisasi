import express from "express";
import {
  getGalery,
  getGaleryById,
  savePicture,
  updatePicture,
  deletePicture,
} from "../controllers/Dokumentasi.js";
import { AuthAccess } from "../middleware/AuthAccess.js";

const router = express.Router();

router.get("/galery", getGalery);
router.get("/galery/:id", AuthAccess, getGaleryById);
router.post("/galery", AuthAccess, savePicture);
router.put("/galery/:id", AuthAccess, updatePicture);
router.delete("/galery/:id", AuthAccess, deletePicture);

export default router;
