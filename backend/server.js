import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Fix __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 🔥 FORCE LOAD .env
dotenv.config({ path: path.join(__dirname, ".env") });

import app from "./src/app.js";
import { connectDB } from "./src/config/db.js";

//console.log("ENV CHECK:", process.env.GEMINI_API_KEY); // debug

connectDB();

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});