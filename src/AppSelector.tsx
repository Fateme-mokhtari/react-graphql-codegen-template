import { useState } from "react";
import App from "./App";
import { CharactersInfinite } from "./CharactersInfinite";

type ViewMode = "pagination" | "infinite";

function AppSelector() {
  const [mode, setMode] = useState<ViewMode>(() => {
    // Check URL param for mode
    const params = new URLSearchParams(window.location.search);
    return (params.get("mode") as ViewMode) || "pagination";
  });

  const handleModeChange = (newMode: ViewMode) => {
    setMode(newMode);
    // Update URL without reload
    const url = new URL(window.location.href);
    url.searchParams.set("mode", newMode);
    window.history.replaceState({}, "", url);
  };

  return (
    <>
      <div
        style={{
          position: "fixed",
          top: 12,
          right: 12,
          zIndex: 1000,
          display: "flex",
          gap: 8,
        }}
      >
        <button
          onClick={() => handleModeChange("pagination")}
          style={{
            padding: "8px 12px",
            borderRadius: "6px",
            border:
              mode === "pagination" ? "2px solid #7c3aed" : "1px solid #ccc",
            background: mode === "pagination" ? "#ede9fe" : "white",
            cursor: "pointer",
            fontWeight: mode === "pagination" ? "600" : "400",
          }}
        >
          Pagination
        </button>
        <button
          onClick={() => handleModeChange("infinite")}
          style={{
            padding: "8px 12px",
            borderRadius: "6px",
            border:
              mode === "infinite" ? "2px solid #7c3aed" : "1px solid #ccc",
            background: mode === "infinite" ? "#ede9fe" : "white",
            cursor: "pointer",
            fontWeight: mode === "infinite" ? "600" : "400",
          }}
        >
          Infinite Scroll
        </button>
      </div>

      {mode === "pagination" ? <App /> : <CharactersInfinite />}
    </>
  );
}

export default AppSelector;
