import { Router } from "express";
import {
  createSubtask,
  getSubtasks,
  updateSubtask,
  deleteSubtask,
} from "../controllers/subtask.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router({ mergeParams: true });

router.route("/").post(verifyJWT, createSubtask);
router.route("/").get(verifyJWT, getSubtasks);
router.route("/:subtaskId").patch(verifyJWT, updateSubtask);
router.route("/:subtaskId").delete(verifyJWT, deleteSubtask);

export default router;
