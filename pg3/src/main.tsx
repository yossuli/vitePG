import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import App2 from "./App2.tsx";

const path = window.location.pathname;

const validPath = path.endsWith("/") ? path.slice(0, -1) : path;

console.log(`Valid path: ${validPath}`);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {validPath === "/1" && <App />}
    {validPath === "/2" && <App2 />}
  </StrictMode>
);
