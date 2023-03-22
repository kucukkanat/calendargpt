import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
// @ts-ignore
import { iNoBounce } from "./inobounce.js";
iNoBounce.enable();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
