import { Router } from "express";
import { createSubtask } from "../controllers/subtask.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router({ mergeParams: true });

router.route("/").post(verifyJWT, createSubtask);

export default router;
