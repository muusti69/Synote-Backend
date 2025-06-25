import { Notes } from "../models/notes.model.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createNote = asyncHandler(async (req, res) => {
  const userId = req.user?._id;
  const { title, content } = req.body;

  if (!title?.trim()) throw new apiError(400, "Note title is required");

  const note = await Notes.create({
    title: title.trim(),
    content: content?.trim() || "",
    userId,
  });

  if (!note || !note._id) throw new apiError(500, "Failed to create note");

  return res
    .status(201)
    .json(new apiResponse(201, note, "Note created successfully"));
});

const getNotes = asyncHandler(async (req, res) => {
  const userId = req.user?._id;

  const notes = await Notes.find({ userId }).sort({ updatedAt: -1 });

  return res
    .status(200)
    .json(new apiResponse(200, notes, "All notes for the user fetched"));
});

const getNoteById = asyncHandler(async (req, res) => {
  const noteId = req.params.id;
  const userId = req.user?._id;

  const note = await Notes.findOne({ _id: noteId, userId });

  if (!note) {
    throw new apiError(404, "Note not found");
  }

  return res
    .status(200)
    .json(new apiResponse(200, note, "Fetched the specific note"));
});

export { createNote, getNotes, getNoteById };
