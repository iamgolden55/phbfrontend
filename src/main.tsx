/*
 * PHB Hospital System - Main Application Entry Point
 * Copyright (c) 2025 ERUWA NINIORITSE GREAT (Public Health Bureau)
 * 
 * Licensed under CC BY-NC-SA 4.0
 * Commercial use is strictly prohibited.
 * See LICENSE file for details.
 */

import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Failed to find root element");
}

createRoot(rootElement).render(<App />);