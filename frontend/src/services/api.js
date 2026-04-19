import axios from "axios";

const API = axios.create({
  baseURL: "https://ai-notes-pro.onrender.com/api",
});

export const summarizeAPI = (formData) => {
  return API.post("/summarize", formData);
};