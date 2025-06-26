import { Task } from "../models/task.model.js";
import { apiResponse } from "../utils/apiResponse.js";
import { apiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createTask = asyncHandler(async (req, res) => {
  const userId = req.user?._id;
  const { title, dueDate } = req.body;

  if (!title?.trim()) throw new apiError(400, "Task title is required");

  const task = await Task.create({
    title: title.trim(),
    userId,
    dueDate: dueDate ? new Date(dueDate) : null,
  });

  if (!task || !task._id) throw new apiError(500, "Failed to create task");

  return res
    .status(200)
    .json(new apiResponse(201, task, "Task created successfully"));
});

const getTasks = asyncHandler(async (req, res) => {
  const userId = req.user?._id;

  const tasks = await Task.find({ userId }).sort({ upatedAt: -1 });

  return res
    .status(200)
    .json(new apiResponse(200, tasks, "All tasks for the user fetched"));
});

const getTaskById = asyncHandler(async (req, res) => {
  const taskId = req.params.id;
  const userId = req.user?._id;

  const task = await Task.findOne({ _id: taskId, userId });

  if (!task) {
    throw new apiError(404, "Task not found");
  }

  return res
    .status(200)
    .json(new apiResponse(200, task, "Fetched the specific task"));
});

const updateTask = asyncHandler(async (req, res) => {
  const taskId = req.params.id;
  const userId = req.user?._id;
  const { title, dueDate } = req.body;

  const task = await Task.findOne({ _id: taskId, userId });

  if (!task) {
    throw new apiError(404, "Task not found");
  }

  let isModified = false;

  if (title && title.trim() !== task.title) {
    task.title = title.trim();
    isModified = true;
  }

  if (dueDate) {
    const newDueDate = new Date(dueDate);
    if (
      !task.dueDate ||
      newDueDate.getTime() !== new Date(task.dueDate).getTime()
    ) {
      task.dueDate = newDueDate;
      isModified = true;
    }
  }

  if (!isModified) {
    return res
      .status(200)
      .json(new apiResponse(200, task, "No changes detected"));
  }

  await task.save();

  return res
    .status(200)
    .json(new apiResponse(200, task, "Task updated successfully"));
});

const deleteTask = asyncHandler(async (req, res) => {
  const taskId = req.params.id;
  const userId = req.user?._id;

  const task = await Task.findOne({ _id: taskId, userId });

  if (!task) throw new apiError(404, "Task not found");

  await task.deleteOne();

  res.status(200).json(new apiResponse(200, {}, "Task deleted successfully"));
});
export { createTask, getTasks, getTaskById, updateTask, deleteTask };
