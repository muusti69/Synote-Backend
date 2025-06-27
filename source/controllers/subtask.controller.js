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

const getSubtasks = asyncHandler(async (req, res) => {
  const taskId = req.params.id;

  const task = await Task.findOne({ _id: taskId, userId: req.user?._id });

  if (!task) throw new apiError(404, "Task not found or unauthorized");

  const subtasks = await Subtask.find({ taskId }).sort({ updatedAt: -1 });

  return res
    .status(200)
    .json(new apiResponse(200, subtasks, "Subtasks for the task fetched"));
});

const updateSubtask = asyncHandler(async (req, res) => {
  const taskId = req.params.id;
  const subtaskId = req.params.subtaskId;
  const { content } = req.body;

  if (!content?.trim()) {
    return res
      .status(400)
      .json(new apiError(400, "Subtask content is required"));
  }

  const task = await Task.findOne({ _id: taskId, userId: req.user?._id });

  if (!task) throw new apiError(404, "Task not found or unauthorized");

  const subtask = await Subtask.findOne({ _id: subtaskId, taskId });

  if (!subtask) throw new apiError(404, "Subtask not found");

  if (content?.trim() === subtask.content) {
    return res
      .status(200)
      .json(new apiResponse(200, subtask, "No changes detected"));
  }

  subtask.content = content.trim();
  await subtask.save();

  return res
    .status(200)
    .json(new apiResponse(200, subtask, "Subtask updated successfully"));
});

const deleteSubtask = asyncHandler(async (req, res) => {
  const taskId = req.params.id;
  const subtaskId = req.params.subtaskId;

  const task = await Task.findOne({ _id: taskId, userId: req.user?._id });

  if (!task) throw new apiError(404, "Task not found or unauthorized");

  const subtask = await Subtask.findOne({ _id: subtaskId, taskId });

  if (!subtask) {
    throw new apiError(404, "Subtask not found");
  }

  await subtask.deleteOne();

  return res
    .status(200)
    .json(new apiResponse(200, {}, "Subtask deleted successfully"));
});

export { createSubtask, getSubtasks, updateSubtask,deleteSubtask };
