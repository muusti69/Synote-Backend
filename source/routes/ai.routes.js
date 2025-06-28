import { Router } from "express";
import { getNoteSummary } from "../controllers/ai.notes.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

//secured routes
router.route("/notes/:noteId/summarize").get(verifyJWT, getNoteSummary);

export default router;
