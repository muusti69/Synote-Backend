import { Notes } from "../models/notes.model.js";
import { summarizeNote } from "../services/ai.notes.service.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const getNoteSummary = asyncHandler(async (req, res) => {
  const userId = req.user?._id;
  const noteId = req.params.noteId;

  const note = await Notes.findOne({ _id: noteId, userId });

  if (!note) {
    throw new apiError(404, "No note found for summarizing");
  }

  const { title, content } = note;

  if (!content?.trim()) {
    throw new apiError(400, "Note content is empty. Cannot summarize.");
  }

  const summary = await summarizeNote(title, content);

  return res
    .status(200)
    .json(new apiResponse(200, { summary }, "Note summarized successfully"));
});
