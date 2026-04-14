import Note from "../models/note.model.js";
import { summarizeWithAI } from "../services/ai.service.js";
import { extractTextFromPDF } from "../services/pdf.service.js";

export const summarizeHandler = async (req, res) => {
  try {
    let text = "";
    let inputType = "";

    // TEXT
    if (req.body.text) {
      text = req.body.text;
      inputType = "text";
    }

    // PDF
    if (req.file) {
      text = await extractTextFromPDF(req.file.path);
      inputType = "pdf";
    }

    if (!text) {
      return res.status(400).json({ message: "No input provided" });
    }

    const summary = await summarizeWithAI(text);

    const note = await Note.create({
      inputType,
      originalContent: text,
      summary,
    });

    res.json({ summary, note });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};