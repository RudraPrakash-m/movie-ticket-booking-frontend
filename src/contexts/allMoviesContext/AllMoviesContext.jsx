import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export const allMovies = createContext();

const AllMoviesContext = ({ children }) => {
  const [movies, setMovies] = useState([]);

  const API = `${import.meta.env.VITE_API_URL}/api`;

  // ---------------- FETCH ALL ----------------
  const fetchMovies = async () => {
    try {
      const res = await axios.get(`${API}/all-movies`);
      setMovies(res.data.data);
    } catch (error) {
      console.error("Failed to fetch movies", error);
    }
  };

  // ---------------- ADD MOVIE ----------------
  const addMovie = async (movieData) => {
    try {
      const res = await axios.post(`${API}/add-movie`, movieData);
      setMovies((prev) => [...prev, res.data.data]);
    } catch (error) {
      console.error("Failed to add movie", error);
    }
  };

  // ---------------- UPDATE MOVIE ----------------
  const updateMovie = async (id, updatedData) => {
    try {
      const res = await axios.put(`${API}/update-movie/${id}`, updatedData);

      setMovies((prev) =>
        prev.map((movie) => (movie.id === id ? res.data.data : movie)),
      );
    } catch (error) {
      console.error("Failed to update movie", error);
    }
  };

  // ---------------- DELETE MOVIE ----------------
  const deleteMovie = async (id) => {
    try {
      await axios.delete(`${API}/delete-movie/${id}`);

      setMovies((prev) => prev.filter((movie) => movie.id !== id));
    } catch (error) {
      console.error("Failed to delete movie", error);
    }
  };

  const addShow = async (movieId, showData) => {
    try {
      const res = await axios.post(`${API}/add-show/${movieId}`, showData);

      setMovies((prev) =>
        prev.map((movie) => (movie.id === movieId ? res.data.data : movie)),
      );
    } catch (error) {
      console.error("Failed to add show", error);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <allMovies.Provider
      value={{
        movies,
        addMovie,
        updateMovie,
        deleteMovie,
        fetchMovies,
        addShow,
      }}
    >
      {children}
    </allMovies.Provider>
  );
};

export default AllMoviesContext;
