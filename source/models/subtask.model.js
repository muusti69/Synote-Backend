import mongoose, { Schema } from "mongoose";

const subtaskSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
      trim: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    taskId: {
      type: Schema.Types.ObjectId,
      ref: "Task",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Subtask = mongoose.model("Subtask", subtaskSchema);
