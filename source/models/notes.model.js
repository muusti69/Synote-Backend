import mongoose, { Schema } from "mongoose";

const noteSchema = new Schema(
  {
    title:{
        type:String,
        required:true,
        trim:true,
    },
    content:{
        type:String,
    }
  },
  { timestamps: true }
);


export const Notes = mongoose.model("Notes", noteSchema);
