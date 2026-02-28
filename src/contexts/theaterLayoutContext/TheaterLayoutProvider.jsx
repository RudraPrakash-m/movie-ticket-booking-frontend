import React, { createContext } from "react";

export const TheaterLayoutContext = createContext();

const TheaterLayoutProvider = ({ children }) => {
  const theaterLayouts = [
    {
      id: 1,
      name: "Screen 1",
      rows: ["A", "B", "C", "D", "E"],
      seatsPerRow: 8,
    },
    {
      id: 2,
      name: "Screen 2",
      rows: ["A", "B", "C", "D", "E", "F"],
      seatsPerRow: 10,
    },
  ];

  return (
    <TheaterLayoutContext.Provider value={{ theaterLayouts }}>
      {children}
    </TheaterLayoutContext.Provider>
  );
};

export default TheaterLayoutProvider;
