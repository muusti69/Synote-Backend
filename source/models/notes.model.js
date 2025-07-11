import mongoose, { Schema } from "mongoose";

const noteSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: Schema.Types.Mixed,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    summary: {
      content: {
        type: String,
      },
      lastUpdated: {
        type: Date,
      },
    },
  },
  { timestamps: true }
);

export const Notes = mongoose.model("Notes", noteSchema);
