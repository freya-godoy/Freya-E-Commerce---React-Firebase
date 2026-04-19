import React from "react";
import ReactDOM from "react-dom/client";
import { CartProvider } from "./context/CartContext";
import "./index.css";
import App from "./App.jsx";

// 👉 Dark mode al iniciar
const darkMode = localStorage.getItem("darkMode");
if (darkMode === "true") {
  document.body.classList.add("dark");
}

// 👉 UNA SOLA VEZ createRoot
ReactDOM.createRoot(document.getElementById("root")).render(
  <CartProvider>
    <App></App>
  </CartProvider>,
);
