import { useEffect, useState } from "react";

export default function CodeBox({ code, loading }) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    if (loading || !code) {
      setDisplayed("");
      return;
    }

    let i = 0;
    const interval = setInterval(() => {
      i += 3;
      setDisplayed(code.slice(0, i));
      if (i >= code.length) clearInterval(interval);
    }, 10);

    return () => clearInterval(interval);
  }, [code, loading]);

  function copyCode() {
    navigator.clipboard.writeText(code);
    alert("Copied!");
  }

  function downloadCode() {
    const blob = new Blob([code], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "generated-code.txt";
    a.click();
  }

  return (
    <div style={{ marginTop: 20 }}>
      <h3>Output</h3>

      <pre
        style={{
          background: "#0f172a",
          padding: 15,
          borderRadius: 8,
          color: "#e2e8f0",
          maxHeight: 300,
          overflow: "auto"
        }}
      >
        {loading ? "// Generating…" : displayed || "// Your code will appear here."}
      </pre>

      <button onClick={copyCode} style={{ marginRight: 10 }}>Copy</button>
      <button onClick={downloadCode}>Download</button>
    </div>
  );
}
