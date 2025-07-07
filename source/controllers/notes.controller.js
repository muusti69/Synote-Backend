import { Notes } from "../models/notes.model.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// Create a new note
const createNote = asyncHandler(async (req, res) => {
  const userId = req.user?._id;
  const { title, content } = req.body;

  if (!title?.trim()) {
    throw new apiError(400, "Note title is required");
  }

  const newNote = await Notes.create({
    userId,
    title: title.trim(),
    content,
  });

  return res.status(201).json(new apiResponse(201, newNote, "Note created successfully"));
});

// Get all notes for the authenticated user
const getNotes = asyncHandler(async (req, res) => {
  const userId = req.user?._id;

  const notes = await Notes.find({ userId }).sort({ updatedAt: -1 });

  return res.status(200).json(new apiResponse(200, notes, "All notes fetched successfully"));
});

// Get a specific note by ID
const getNoteById = asyncHandler(async (req, res) => {
  const { id: noteId } = req.params;
  const userId = req.user?._id;

  if (!noteId) {
    throw new apiError(400, "Note ID is required");
  }

  const note = await Notes.findOne({ _id: noteId, userId });
  if (!note) {
    throw new apiError(404, "Note not found");
  }

  return res.status(200).json(new apiResponse(200, note, "Note fetched successfully"));
});

// Update a note
const updateNote = asyncHandler(async (req, res) => {
  const { id: noteId } = req.params;
  const userId = req.user?._id;
  const { title, content } = req.body;

  if (!noteId) {
    throw new apiError(400, "Note ID is required");
  }

  const note = await Notes.findOne({ _id: noteId, userId });
  if (!note) {
    throw new apiError(404, "Note not found");
  }

  let isModified = false;

  if (title?.trim() && title.trim() !== note.title) {
    note.title = title.trim();
    isModified = true;
  }

  if (typeof content !== "undefined" && JSON.stringify(content) !== JSON.stringify(note.content)) {
    note.content = content;
    isModified = true;
  }

  if (!isModified) {
    return res.status(200).json(new apiResponse(200, note, "No changes detected"));
  }

  const updatedNote = await note.save();

  return res.status(200).json(new apiResponse(200, updatedNote, "Note updated successfully"));
});

// Delete a note
const deleteNote = asyncHandler(async (req, res) => {
  const { id: noteId } = req.params;
  const userId = req.user?._id;

  if (!noteId) {
    throw new apiError(400, "Note ID is required");
  }

  const note = await Notes.findOne({ _id: noteId, userId });
  if (!note) {
    throw new apiError(404, "Note not found");
  }

  await note.deleteOne();

  return res.status(200).json(new apiResponse(200, {}, "Note deleted successfully"));
});

export { createNote, getNotes, getNoteById, updateNote, deleteNote };
