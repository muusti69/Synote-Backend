import { Router } from "express";
import {
  getNotes,
  createNote,
  getNoteById,
} from "../controllers/notes.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

//Secured Routes
router.route("/").post(verifyJWT, createNote);
router.route("/").get(verifyJWT, getNotes);
router.route("/:id").get(verifyJWT, getNoteById);

export default router;
