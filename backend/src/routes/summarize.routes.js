import express from "express";
import multer from "multer";
import { summarizeHandler } from "../controllers/summarize.controller.js";

const router = express.Router();

const upload = multer({ dest: "uploads/" });

router.post("/", upload.single("file"), summarizeHandler);

export default router;