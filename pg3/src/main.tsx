import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import App2 from "./App2.tsx";
import { Minesweeper } from "./Minesweeper.tsx";
import { Minesweeper2 } from "./Minesweeper2.tsx";
import { Minesweeper3 } from "./Minesweeper3.tsx";
import { Minesweeper4 } from "./Minesweeper4.tsx";
import { Minesweeper5 } from "./Minesweeper5.tsx";

const path = window.location.pathname;

const validPath = path.endsWith("/") ? path.slice(0, -1) : path;

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {validPath === "" && (
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <a href="/1">1</a>
        <a href="/2">2</a>
        <a href="/minesweeper">minesweeper</a>
        <a href="/minesweeper2">minesweeper2</a>
        <a href="/minesweeper3">minesweeper3</a>
        <a href="/minesweeper4">minesweeper4</a>
        <a href="/minesweeper5">minesweeper5</a>
      </div>
    )}
    {validPath === "/1" && <App />}
    {validPath === "/2" && <App2 />}
    {validPath === "/minesweeper" && <Minesweeper />}
    {validPath === "/minesweeper2" && <Minesweeper2 />}
    {validPath === "/minesweeper3" && <Minesweeper3 />}
    {validPath === "/minesweeper4" && <Minesweeper4 />}
    {validPath === "/minesweeper5" && <Minesweeper5 />}
  </StrictMode>,
);
