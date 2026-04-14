import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
  inputType: {
    type: String,
    enum: ["text", "pdf", "youtube"],
  },
  originalContent: String,
  summary: String,
}, { timestamps: true });

export default mongoose.model("Note", noteSchema);