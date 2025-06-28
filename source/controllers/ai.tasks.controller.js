import { Task } from "../models/task.model.js";
import { summarizeTask } from "../services/ai.tasks.service.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const getTaskSummary = asyncHandler(async (req, res) => {
  const userId = req.user?._id;
  const taskId = req.params.id;

  const task = await Task.findOne({ _id: taskId, userId }).populate("subtasks");

  if (!task) throw new apiError(404, "Task not found");

  const subtasks = task.subtasks?.filter((st) => !!st?.content?.trim());

  if (!subtasks || subtasks.length === 0) {
    throw new apiError(400, "No valid subtasks available for summarization");
  }

  const summary = await summarizeTask(task.title, subtasks);

  return res
    .status(200)
    .json(new apiResponse(200, { summary }, "Task summarized successfully"));
});
