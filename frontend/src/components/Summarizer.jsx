import { useState } from "react";
import { summarizeAPI } from "../services/api";

const Summarizer = () => {
  const [activeTab, setActiveTab] = useState("text");

  const [text, setText] = useState("");
  const [file, setFile] = useState(null);

  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
    <div style={{ maxWidth: "900px", margin: "auto", padding: "20px" }}>
      <h1 style={{ textAlign: "center" }}>🚀 AI Notes Summarizer</h1>

      {/* Tabs */}
      <div style={{ display: "flex", justifyContent: "center", gap: "10px", margin: "20px 0" }}>
        {["text", "pdf"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: "10px 20px",
              borderRadius: "8px",
              border: "none",
              background: activeTab === tab ? "#3b82f6" : "#1e293b",
              color: "white",
            }}
          >
            {tab.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Card */}
      <div style={{
        background: "#1e293b",
        padding: "20px",
        borderRadius: "12px"
      }}>
        {activeTab === "text" && (
          <textarea
            style={{
              width: "97%",
              height: "180px",        // fixed height
              padding: "10px",
              borderRadius: "8px",
              resize: "none",         // prevent manual resize
              overflowY: "auto",      // enable vertical scroll
              outline: "none",
              scrollBehavior: "smooth",
              border: "1px solid #334155",
              background: "#0f172a",
              color: "white"
            }}
            placeholder="Paste your notes..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        )}

        {activeTab === "pdf" && (
          <input
            type="file"
            accept="application/pdf"
            onChange={(e) => setFile(e.target.files[0])}
          />
        )}

        <button
          onClick={handleSubmit}
          style={{
            marginTop: "15px",
            padding: "10px 20px",
            background: "#22c55e",
            border: "none",
            borderRadius: "8px",
            color: "white",
            width: "100%",
          }}
        >
          {loading ? "Processing..." : "Summarize"}
        </button>
      </div>

      {/* Error */}
      {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}

      {/* Result */}
      {summary && (
        <div style={{
          marginTop: "20px",
          background: "#1e293b",
          padding: "20px",
          borderRadius: "12px"
        }}>
          <h2>Summary</h2>
          <p>{summary}</p>
        </div>
      )}
    </div>
  );
};

export default Summarizer;