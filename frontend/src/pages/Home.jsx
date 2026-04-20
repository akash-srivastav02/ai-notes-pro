import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Home = () => {
  const navigate = useNavigate();
  const [showGuide, setShowGuide] = useState(false);
  const [mode, setMode] = useState("text");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-black text-white">

      {/* TOP BAR */}
      <div className="flex justify-between items-center p-6">
        <h1 className="text-xl font-bold">AI Notes</h1>

        <button
          onClick={() => setShowGuide(true)}
          className="bg-slate-700 hover:bg-slate-600 px-4 py-2 rounded-lg"
        >
          How to Use
        </button>
      </div>

      {/* HERO */}
      <div className="flex flex-col items-center text-center px-6 mt-10">
        <h1 className="text-5xl font-bold mb-4">
          🚀 AI Notes Summarizer
        </h1>

        <p className="text-gray-400 max-w-xl mb-8">
          Convert long text and PDFs into smart, concise summaries instantly using AI.
        </p>

        <button
          onClick={() => navigate("/summarize")}
          className="bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-xl text-lg font-semibold shadow-lg transition"
        >
          Get Started
        </button>
      </div>

      {/* FEATURES */}
      <div className="mt-20 grid md:grid-cols-3 gap-6 px-6 max-w-5xl mx-auto">

        <div className="bg-white/5 border border-white/10 p-6 rounded-xl text-center">
          <h3 className="text-lg font-semibold mb-2">⚡ Instant Summaries</h3>
          <p className="text-gray-400 text-sm">
            Convert long notes into short, clear summaries instantly.
          </p>
        </div>

        <div className="bg-white/5 border border-white/10 p-6 rounded-xl text-center">
          <h3 className="text-lg font-semibold mb-2">📄 PDF Support</h3>
          <p className="text-gray-400 text-sm">
            Upload PDFs and extract meaningful summaries in seconds.
          </p>
        </div>

        <div className="bg-white/5 border border-white/10 p-6 rounded-xl text-center">
          <h3 className="text-lg font-semibold mb-2">🧠 AI Powered</h3>
          <p className="text-gray-400 text-sm">
            Smart summarization using advanced AI models.
          </p>
        </div>

      </div>

      {/* HOW IT WORKS */}
      <div className="mt-20 text-center px-6">
        <h2 className="text-2xl font-semibold mb-6">How It Works</h2>

        <div className="flex flex-col md:flex-row justify-center gap-6 text-gray-400">
          <p>1. Paste text or upload PDF</p>
          <p>2. Click Summarize</p>
          <p>3. Get instant results</p>
        </div>
      </div>

      {/* FINAL CTA */}
      <div className="mt-20 text-center mb-16">
        <button
          onClick={() => navigate("/summarize")}
          className="bg-green-500 hover:bg-green-600 px-6 py-3 rounded-xl text-lg font-semibold"
        >
          Try It Now 🚀
        </button>
      </div>

      {/* HOW TO USE MODAL */}
      {showGuide && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">

          <div className="bg-slate-900 p-6 rounded-2xl w-[90%] max-w-lg">

            {/* HEADER */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">How to Use</h2>
              <button onClick={() => setShowGuide(false)}>✖</button>
            </div>

            {/* MODE SWITCH */}
            <div className="flex gap-3 mb-4">
              {["text", "pdf"].map((m) => (
                <button
                  key={m}
                  onClick={() => setMode(m)}
                  className={`px-4 py-1 rounded-full ${
                    mode === m ? "bg-blue-500" : "bg-slate-700"
                  }`}
                >
                  {m.toUpperCase()}
                </button>
              ))}
            </div>

            {/* STEPS */}
            <div className="text-gray-300 space-y-2 mb-6">

              {mode === "text" && (
                <>
                  <p>1. Select TEXT option</p>
                  <p>2. Paste your notes</p>
                  <p>3. Click Summarize</p>
                  <p>4. Get instant AI summary</p>
                </>
              )}

              {mode === "pdf" && (
                <>
                  <p>1. Select PDF option</p>
                  <p>2. Upload your file</p>
                  <p>3. Click Summarize</p>
                  <p>4. Get summarized content</p>
                </>
              )}

            </div>

            {/* CTA */}
            <button
              onClick={() => {
                setShowGuide(false);
                navigate("/summarize");
              }}
              className="w-full bg-green-500 hover:bg-green-600 py-2 rounded-lg"
            >
              Now Do It 🚀
            </button>

          </div>
        </div>
      )}

    </div>
  );
};

export default Home;