import React from "react";
import cretaeRoot, { createRoot } from "react-dom/client";
import App from "./App";
import AllMoviesContext from "./contexts/allMoviesContext/AllMoviesContext";

createRoot(document.getElementById("root")).render(
  <AllMoviesContext>
    <App />
  </AllMoviesContext>,
);
