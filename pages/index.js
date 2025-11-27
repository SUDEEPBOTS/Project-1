import { useState } from "react";
import CodeBox from "../components/CodeBox";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  async function generateCode() {
    if (!prompt.trim()) return alert("Enter a prompt");

    setLoading(true);
    setCode("");

    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt })
    });

    const data = await res.json();
    setCode(data.code || "// No code generated.");
    setLoading(false);
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>AI Code Generator</h1>

      <textarea
        placeholder="Write prompt..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        style={{
          width: "100%",
          height: 120,
          padding: 10,
          borderRadius: 8,
          background: "#0f172a",
          color: "white",
          border: "1px solid #334155"
        }}
      />

      <button
        onClick={generateCode}
        style={{
          marginTop: 10,
          padding: "10px 20px",
          background: "#38bdf8",
          border: "none",
          borderRadius: 6,
          cursor: "pointer"
        }}
      >
        {loading ? "Generating…" : "Generate Code"}
      </button>

      <CodeBox code={code} loading={loading} />
    </div>
  );
}
