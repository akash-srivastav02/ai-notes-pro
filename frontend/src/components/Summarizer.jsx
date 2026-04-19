import { useState } from "react";
import { summarizeAPI } from "../services/api";

const Summarizer = () => {
  const [activeTab, setActiveTab] = useState("text");
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleReset = () => {
    setText("");
    setFile(null);
    setSummary("");
    setError("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async () => {
    setError("");
    setSummary("");

    try {
      setLoading(true);

      const formData = new FormData();

      if (activeTab === "text") {
        if (!text) return setError("Enter text");
        formData.append("text", text);
      }

      if (activeTab === "pdf") {
        if (!file) return setError("Upload PDF");
        formData.append("file", file);
      }

      const res = await summarizeAPI(formData);
      setSummary(res.data.summary);

    } catch (err) {
      setError(err.response?.data?.message || "Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-black text-white flex flex-col items-center p-6">

      {/* Title */}
      <h1 className="text-4xl font-bold mb-2 text-center">
        🚀 AI Notes Summarizer
      </h1>
      <p className="text-gray-400 mb-6 text-center">
        Turn long content into short, smart summaries instantly
      </p>

      {/* Tabs */}
      <div className="flex gap-4 mb-6">
        {["text", "pdf"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-2 rounded-full transition-all duration-200 ${
              activeTab === tab
                ? "bg-blue-500 shadow-lg"
                : "bg-slate-700 hover:bg-slate-600"
            }`}
          >
            {tab.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Main Card */}
      <div className="w-full max-w-4xl backdrop-blur-lg bg-white/5 border border-white/10 p-6 rounded-2xl shadow-xl">

        {/* INPUT */}
        {activeTab === "text" && (
          <>
            <textarea
              className="w-full h-48 p-4 rounded-xl bg-slate-900 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none overflow-y-auto"
              placeholder="Paste your notes..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />

            {/* Character Count */}
            <p className="text-right text-sm text-gray-400 mt-1">
              {text.length} characters
            </p>
          </>
        )}

        {activeTab === "pdf" && (
          <label className="w-full flex flex-col items-center justify-center border-2 border-dashed border-slate-600 rounded-xl p-6 cursor-pointer hover:border-blue-500 transition">

            <span className="text-gray-400 mb-2">
              Click to upload PDF
            </span>

            <span className="text-sm text-gray-500">
              {file ? file.name : "No file selected"}
            </span>

            <input
              type="file"
              accept="application/pdf"
              className="hidden"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </label>
        )}
        
        {file && (
          <p className="text-xs text-gray-400 mt-2">
            {(file.size / 1024).toFixed(2)} KB
          </p>
        )}

        {/* BUTTON */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className={`mt-5 w-full py-3 rounded-xl font-semibold transition ${
            loading
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-green-500 hover:bg-green-600 shadow-lg"
          }`}
        >
          {loading ? "Summarizing..." : "Summarize"}
        </button>

        {/* ERROR */}
        {error && (
          <p className="text-red-400 mt-3 text-center">{error}</p>
        )}
      </div>

      {/* RESULT */}
      {summary && (
        <div className="w-full max-w-4xl mt-6 backdrop-blur-lg bg-white/5 border border-white/10 p-6 rounded-2xl shadow-xl">

        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Summary</h2>

          <div className="flex gap-2">
          {/* Copy */}
          <button
            onClick={() => navigator.clipboard.writeText(summary)}
            className="bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded text-sm"
          >
            Copy
          </button>

          {/* New Summary */}
          <button
            onClick={handleReset}
            className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-sm"
          >
            New
          </button>
          </div>
        </div>

        <p className="whitespace-pre-line text-gray-300 leading-relaxed">
          {summary}
        </p>
        </div>
      )}
    </div>
  );
};

export default Summarizer;