import { Router } from "express";
import {
  getNotes,
  createNote,
  getNoteById,
  updateNote,
  deleteNote,
} from "../controllers/notes.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

//Secured Routes
router.route("/").post(verifyJWT, createNote);
router.route("/").get(verifyJWT, getNotes);
router.route("/:id").get(verifyJWT, getNoteById);
router.route("/:id").patch(verifyJWT, updateNote);
router.route("/:id").delete(verifyJWT, deleteNote);

export default router;
