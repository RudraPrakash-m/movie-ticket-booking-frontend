import React from "react";
import cretaeRoot, { createRoot } from "react-dom/client";
import App from "./App";
import AllMoviesContext from "./contexts/allMoviesContext/AllMoviesContext";
import UserContext from "./contexts/userContext/UserContext";
import TheaterLayoutProvider from "./contexts/theaterLayoutContext/TheaterLayoutProvider";

createRoot(document.getElementById("root")).render(
  <AllMoviesContext>
    <UserContext>
      <TheaterLayoutProvider>
        <App />
      </TheaterLayoutProvider>
    </UserContext>
  </AllMoviesContext>,
);
