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

const updateNote = asyncHandler(async (req, res) => {
  const noteId = req.params.id;
  const userId = req.user?._id;
  const { title, content } = req.body;

  const note = await Notes.findOne({ _id: noteId, userId });

  if (!note) {
    throw new apiError(404, "Note not found");
  }

  let isModified = false;

  if (title && title.trim() !== note.title) {
    note.title = title.trim();
    isModified = true;
  }

  if (content && content.trim() !== note.content) {
    note.content = content.trim();
    isModified = true;
  }

  if (!isModified) {
    return res
      .status(200)
      .json(new apiResponse(200, note, "No changes detected"));
  }

  await note.save();

  return res
    .status(200)
    .json(new apiResponse(200, note, "Note updated successfully"));
});

const deleteNote = asyncHandler(async (req, res) => {
  const noteId = req.params.id;
  const userId = req.user?._id;

  const note = await Notes.findOne({ _id: noteId, userId });

  if (!note) {
    throw new apiError(404, "Note not found");
  }

  await note.deleteOne();

  return res
    .status(200)
    .json(new apiResponse(200, {}, "Note deleted successfully"));
});
export { createNote, getNotes, getNoteById, updateNote,deleteNote };
