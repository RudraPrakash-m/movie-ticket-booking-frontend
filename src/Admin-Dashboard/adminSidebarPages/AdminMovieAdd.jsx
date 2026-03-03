import React, { useContext, useRef, useState } from "react";
import { allMovies } from "../../contexts/allMoviesContext/AllMoviesContext";
import { toast } from "react-toastify";
import { TheaterLayoutContext } from "../../contexts/theaterLayoutContext/TheaterLayoutProvider";

const initialMovieForm = {
  title: "",
  addedAt: "",
  releaseDate: "",
  rating: "",
  duration: "",
  genres: "",
  year: "",
  status: "released",
  poster: "",
  trailer: "",
  description: "",
  cast: "",
};

const initialShowForm = {
  date: "",
  time: "",
  price: "",
  screenId: "",
};

const AdminMovieAdd = () => {
  const { movies, addMovie, updateMovie, deleteMovie, addShow } =
    useContext(allMovies);

  const { theaterLayouts } = useContext(TheaterLayoutContext);

  const [movieForm, setMovieForm] = useState(initialMovieForm);
  const [showForm, setShowForm] = useState(initialShowForm);
  const [editingId, setEditingId] = useState(null);
  const [manageShowId, setManageShowId] = useState(null);

  const showSectionRef = useRef(null);

  const handleMovieChange = (e) => {
    setMovieForm({ ...movieForm, [e.target.name]: e.target.value });
  };

  const handleShowChange = (e) => {
    setShowForm({ ...showForm, [e.target.name]: e.target.value });
  };

  const handleMovieSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        ...movieForm,
        rating: movieForm.rating ? Number(movieForm.rating) : undefined,
        year: Number(movieForm.year),
        genres: movieForm.genres.split(",").map((g) => g.trim()),
        cast: movieForm.cast.split(",").map((c) => c.trim()),
      };

      if (editingId) {
        await updateMovie(editingId, payload);
        toast.success("Movie updated successfully");
        setEditingId(null);
      } else {
        await addMovie(payload);
        toast.success("Movie added successfully");
      }

      setMovieForm(initialMovieForm);
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const handleEdit = (movie) => {
    setEditingId(movie.id);
    setMovieForm({
      ...movie,
      genres: movie.genres.join(", "),
      cast: movie.cast.join(", "),
    });
    toast.info("Editing movie");
  };

  const handleDelete = async (id) => {
    try {
      await deleteMovie(id);
      toast.success("Movie deleted successfully");
    } catch {
      toast.error("Failed to delete movie");
    }
  };

  const handleAddShow = async (e) => {
    e.preventDefault();
    if (!manageShowId) return;

    try {
      const payload = {
        ...showForm,
        price: Number(showForm.price),
        screenId: Number(showForm.screenId),
        bookedSeats: [],
        tempSelectedSeats: [],
      };

      await addShow(manageShowId, payload);
      toast.success("Show added successfully");
      setShowForm(initialShowForm);
    } catch {
      toast.error("Failed to add show");
    }
  };

  const handleManageShowsClick = (movieId) => {
    setManageShowId(movieId);

    setTimeout(() => {
      showSectionRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
  };

  const selectedMovie = movies.find((m) => m.id === manageShowId);

  return (
    <div className="min-h-screen bg-gray-950 text-gray-200">
      {/* HEADER */}
      <div className="border-b border-gray-800 px-10 py-5">
        <h1 className="text-2xl font-semibold tracking-wide">
          Movie Management
        </h1>
      </div>

      <div className="px-10 py-8 space-y-10">
        {/* MAIN GRID */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {/* MOVIE FORM */}
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 shadow-lg">
            <h2 className="text-lg font-semibold mb-6">
              {editingId ? "Edit Movie" : "Add Movie"}
            </h2>

            <form onSubmit={handleMovieSubmit} className="space-y-5">
              {/* TITLE */}
              <div>
                <label className="block text-sm mb-2 text-gray-400">
                  Movie Title
                </label>
                <input
                  className="inputDark"
                  name="title"
                  placeholder="Enter movie title"
                  value={movieForm.title}
                  onChange={handleMovieChange}
                  required
                />
              </div>

              {/* ADDED DATE */}
              <div>
                <label className="block text-sm mb-2 text-gray-400">
                  Added Date
                </label>
                <input
                  className="inputDark"
                  type="date"
                  name="addedAt"
                  value={movieForm.addedAt}
                  onChange={handleMovieChange}
                  required
                />
              </div>

              {/* RELEASE DATE */}
              <div>
                <label className="block text-sm mb-2 text-gray-400">
                  Release Date (Optional)
                </label>
                <input
                  className="inputDark"
                  type="date"
                  name="releaseDate"
                  value={movieForm.releaseDate}
                  onChange={handleMovieChange}
                />
              </div>

              {/* RATING */}
              <div>
                <label className="block text-sm mb-2 text-gray-400">
                  Rating (Optional)
                </label>
                <input
                  className="inputDark"
                  name="rating"
                  placeholder="e.g. 8.5"
                  value={movieForm.rating}
                  onChange={handleMovieChange}
                />
              </div>

              {/* DURATION */}
              <div>
                <label className="block text-sm mb-2 text-gray-400">
                  Duration
                </label>
                <input
                  className="inputDark"
                  name="duration"
                  placeholder="e.g. 2h 15m"
                  value={movieForm.duration}
                  onChange={handleMovieChange}
                  required
                />
              </div>

              {/* GENRES */}
              <div>
                <label className="block text-sm mb-2 text-gray-400">
                  Genres
                </label>
                <input
                  className="inputDark"
                  name="genres"
                  placeholder="Action, Drama, Sci-Fi"
                  value={movieForm.genres}
                  onChange={handleMovieChange}
                  required
                />
              </div>

              {/* YEAR */}
              <div>
                <label className="block text-sm mb-2 text-gray-400">
                  Release Year
                </label>
                <input
                  className="inputDark"
                  name="year"
                  placeholder="e.g. 2024"
                  value={movieForm.year}
                  onChange={handleMovieChange}
                  required
                />
              </div>

              {/* POSTER */}
              <div>
                <label className="block text-sm mb-2 text-gray-400">
                  Poster Image URL
                </label>
                <input
                  className="inputDark"
                  name="poster"
                  placeholder="Paste image URL"
                  value={movieForm.poster}
                  onChange={handleMovieChange}
                  required
                />
              </div>

              {/* TRAILER */}
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">
                  YouTube Trailer URL (Embed Format Required)
                </label>

                <input
                  className="inputDark"
                  name="trailer"
                  placeholder="https://www.youtube.com/embed/VIDEO_ID"
                  value={movieForm.trailer}
                  onChange={handleMovieChange}
                  required
                />

                <div className="mt-2 text-xs text-gray-500 space-y-1">
                  <p>⚠ Must be in embed format.</p>
                  <p className="text-gray-400">
                    Example: https://www.youtube.com/embed/0PfErHA3zzQ
                  </p>
                  <p className="text-gray-400">
                    Do NOT use: https://www.youtube.com/watch?v=0PfErHA3zzQ
                  </p>
                </div>
              </div>

              {/* DESCRIPTION */}
              <div>
                <label className="block text-sm mb-2 text-gray-400">
                  Description
                </label>
                <textarea
                  className="inputDark"
                  name="description"
                  placeholder="Write movie description"
                  rows="3"
                  value={movieForm.description}
                  onChange={handleMovieChange}
                  required
                />
              </div>

              {/* CAST */}
              <div>
                <label className="block text-sm mb-2 text-gray-400">
                  Cast Members
                </label>
                <input
                  className="inputDark"
                  name="cast"
                  placeholder="Actor 1, Actor 2, Actor 3"
                  value={movieForm.cast}
                  onChange={handleMovieChange}
                  required
                />
              </div>

              <button className="w-full bg-blue-600 hover:bg-blue-700 transition py-2 rounded-md font-medium">
                {editingId ? "Update Movie" : "Add Movie"}
              </button>
            </form>
          </div>

          {/* MOVIE LIST */}
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 shadow-lg max-h-[75vh] overflow-y-auto">
            <h2 className="text-lg font-semibold mb-6">All Movies</h2>

            {movies.map((movie) => (
              <div
                key={movie.id}
                className="border-b border-gray-800 py-4 last:border-none"
              >
                <h4 className="font-medium">{movie.title}</h4>
                <p className="text-sm text-gray-400 mt-1">
                  {movie.year} • {movie.status} • Shows:{" "}
                  {movie.shows?.length || 0}
                </p>

                <div className="flex gap-3 mt-3">
                  <button
                    onClick={() => handleEdit(movie)}
                    className="bg-yellow-500 hover:bg-yellow-600 transition px-3 py-1 rounded-md text-sm"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(movie.id)}
                    className="bg-red-600 hover:bg-red-700 transition px-3 py-1 rounded-md text-sm"
                  >
                    Delete
                  </button>

                  <button
                    onClick={() => handleManageShowsClick(movie.id)}
                    className="bg-green-600 hover:bg-green-700 transition px-3 py-1 rounded-md text-sm"
                  >
                    Manage Shows
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SHOW SECTION */}
        {selectedMovie && (
          <div
            ref={showSectionRef}
            className="bg-gray-900 border border-gray-800 rounded-lg p-8 shadow-lg"
          >
            <h2 className="text-xl font-semibold mb-8">
              Manage Shows — {selectedMovie.title}
            </h2>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
              {/* ADD SHOW */}
              <form onSubmit={handleAddShow} className="space-y-4">
                <input
                  className="inputDark"
                  type="date"
                  name="date"
                  value={showForm.date}
                  onChange={handleShowChange}
                  required
                />

                <input
                  className="inputDark"
                  type="time"
                  name="time"
                  value={showForm.time}
                  onChange={handleShowChange}
                  required
                />

                <input
                  className="inputDark"
                  type="number"
                  name="price"
                  placeholder="Price"
                  value={showForm.price}
                  onChange={handleShowChange}
                  required
                />

                <select
                  className="inputDark"
                  name="screenId"
                  value={showForm.screenId}
                  onChange={handleShowChange}
                  required
                >
                  <option value="">Select Screen</option>

                  {theaterLayouts.map((screen) => (
                    <option key={screen.id} value={screen.id}>
                      {screen.name} (ID: {screen.id})
                    </option>
                  ))}
                </select>

                <button className="w-full bg-green-600 hover:bg-green-700 transition py-2 rounded-md font-medium">
                  Add Show
                </button>
              </form>

              {/* SHOW LIST */}
              <div className="space-y-4 max-h-[60vh] overflow-y-auto">
                {selectedMovie.shows?.map((show, index) => (
                  <div
                    key={index}
                    className="border border-gray-800 rounded-md p-4"
                  >
                    <p>
                      📅 {show.date} | ⏰ {show.time}
                    </p>
                    <p className="text-sm text-gray-400 mt-1">
                      ₹{show.price} • Screen {show.screenId}
                    </p>
                  </div>
                ))}

                {selectedMovie.shows?.length === 0 && (
                  <p className="text-gray-500">No shows added yet.</p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminMovieAdd;
