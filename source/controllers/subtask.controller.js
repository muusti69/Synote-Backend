import { Subtask } from "../models/subtask.model.js";
import { Task } from "../models/task.model.js";
import { apiResponse } from "../utils/apiResponse.js";
import { apiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createSubtask = asyncHandler(async (req, res) => {
  const taskId = req.params.id;
  const { content } = req.body;

  if (!content?.trim()) throw new apiError(400, "Subtask content is required");

  const task = await Task.findOne({ _id: taskId, userId: req.user?._id });

  if (!task) throw new apiError(404, "Task not found or unauthorized");

  const subtask = await Subtask.create({
    content: content.trim(),
    taskId,
  });

  if (!subtask || !subtask._id)
    throw new apiError(500, "Failed to create subtask");

  return res
    .status(200)
    .json(new apiResponse(201, subtask, "Subtask created successfully"));
});

export { createSubtask };
