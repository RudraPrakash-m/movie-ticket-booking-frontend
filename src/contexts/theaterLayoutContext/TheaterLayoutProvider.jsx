import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export const TheaterLayoutContext = createContext();

const TheaterLayoutProvider = ({ children }) => {
  const [theaterLayouts, setTheaterLayouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL;

  const fetchTheaters = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_URL}/api/theater-layout`);

      if (res.data.success) {
        setTheaterLayouts(res.data.data);
      } else {
        setError("Failed to fetch layouts");
      }
    } catch (err) {
      console.error(err);
      setError("Server error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTheaters();
  }, []);

  return (
    <TheaterLayoutContext.Provider
      value={{
        theaterLayouts,
        loading,
        error,
        refetchTheaters: fetchTheaters,
      }}
    >
      {children}
    </TheaterLayoutContext.Provider>
  );
};

export default TheaterLayoutProvider;
