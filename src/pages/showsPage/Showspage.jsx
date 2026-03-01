import React, { useContext, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { allMovies } from "../../contexts/allMoviesContext/AllMoviesContext";
import { userCon } from "../../contexts/userContext/UserContext";
import { X, Heart } from "lucide-react";

/* 🔥 Utility: Slug Generator (use everywhere) */
const createSlug = (title) =>
  title
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .trim()
    .replace(/\s+/g, "-");

const Showspage = () => {
  const { movies } = useContext(allMovies);
  const { user, toggleFavourite } = useContext(userCon);

  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [sortBy, setSortBy] = useState("latest");
  const [trailerMovie, setTrailerMovie] = useState(null);

  /* 🔥 Generate Genres */
  const genres = useMemo(() => {
    const allGenres = movies.flatMap((m) => m.genres);
    return ["All", ...new Set(allGenres)];
  }, [movies]);

  /* 🔥 Filtering Logic */
  const filteredMovies = useMemo(() => {
    let result = [...movies];

    if (selectedStatus !== "All") {
      result = result.filter((m) => m.status?.toLowerCase() === selectedStatus);
    }

    if (search) {
      result = result.filter((m) =>
        m.title.toLowerCase().includes(search.toLowerCase()),
      );
    }

    if (selectedGenre !== "All") {
      result = result.filter((m) => m.genres.includes(selectedGenre));
    }

    if (sortBy === "latest") {
      result.sort((a, b) => new Date(b.addedAt) - new Date(a.addedAt));
    } else if (sortBy === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "price") {
      result = result.filter((m) => m.status === "released");
      result.sort((a, b) => a.price - b.price);
    }

    return result;
  }, [movies, search, selectedGenre, sortBy, selectedStatus]);

  return (
    <div className="min-h-screen bg-gray-950 text-white pt-24 px-6 md:px-16 pb-14">
      <h1 className="text-4xl font-bold mb-8">Browse Shows</h1>

      {/* STATUS FILTER */}
      <div className="flex gap-3 mb-6">
        {["All", "released", "upcoming"].map((status) => (
          <button
            key={status}
            onClick={() => setSelectedStatus(status)}
            className={`px-5 py-2 rounded-full text-sm font-medium transition ${
              selectedStatus === status
                ? "bg-red-600 text-white"
                : "bg-gray-800 hover:bg-gray-700 text-gray-300"
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      {/* FILTER BAR */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-12 w-full">
        <div className="flex gap-3 overflow-x-auto scrollbar-hide whitespace-nowrap w-full lg:w-auto">
          {genres.map((genre) => (
            <button
              key={genre}
              onClick={() => setSelectedGenre(genre)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition flex-shrink-0 ${
                selectedGenre === genre
                  ? "bg-red-600 text-white"
                  : "bg-gray-800 hover:bg-gray-700 text-gray-300"
              }`}
            >
              {genre}
            </button>
          ))}
        </div>

        <div className="flex gap-4 flex-col sm:flex-row w-full lg:w-auto">
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-4 py-2 bg-gray-800 rounded-md outline-none w-full sm:w-64"
          />

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 bg-gray-800 rounded-md outline-none min-w-[140px]"
          >
            <option value="latest">Latest</option>
            <option value="rating">Top Rated</option>
            <option value="price">Price</option>
          </select>
        </div>
      </div>

      {/* MOVIE GRID */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {filteredMovies.map((movie) => {
          const isFav = user?.favourites?.includes(movie.id);

          return (
            <div
              key={movie.id}
              onClick={() =>
                navigate(`/about-movie/${createSlug(movie.title)}`, {
                  state: { movie },
                })
              }
              className="bg-gray-900 rounded-lg overflow-hidden shadow hover:scale-105 transition duration-300 cursor-pointer"
            >
              <div className="relative">
                <img
                  src={movie.poster}
                  alt={movie.title}
                  className="w-full h-64 object-cover"
                />

                {movie.status === "upcoming" && (
                  <div className="absolute top-3 left-3 bg-yellow-500 text-black text-xs font-bold px-3 py-1 rounded">
                    Coming Soon
                  </div>
                )}

                {/* ⭐ Favourite */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavourite(movie.id);
                  }}
                  className="absolute top-3 right-3 p-2 bg-black/60 rounded-full"
                >
                  <Heart
                    size={18}
                    className={
                      isFav
                        ? "text-red-500 fill-red-500"
                        : "text-white hover:text-red-500"
                    }
                  />
                </button>
              </div>

              <div className="p-4">
                <h3 className="font-semibold mb-2">{movie.title}</h3>

                {movie.status === "released" ? (
                  <p className="text-sm text-gray-400 mb-3">
                    ⭐ {movie.rating} • ₹{movie.price}
                  </p>
                ) : (
                  <p className="text-sm text-gray-400 mb-3">
                    ⭐ {movie.rating}
                  </p>
                )}

                <div className="flex gap-2">
                  {movie.status === "released" && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/booking/${createSlug(movie.title)}`, {
                          state: { movie },
                        });
                      }}
                      className="flex-1 bg-red-600 hover:bg-red-700 py-2 rounded text-sm"
                    >
                      Book
                    </button>
                  )}

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setTrailerMovie(movie);
                    }}
                    className="flex-1 bg-gray-700 hover:bg-gray-600 py-2 rounded text-sm"
                  >
                    Trailer
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* TRAILER MODAL */}
      {trailerMovie && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 px-4">
          <div className="bg-gray-900 rounded-lg w-full max-w-4xl relative">
            <button
              onClick={() => setTrailerMovie(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <X />
            </button>

            <div className="aspect-video">
              <iframe
                className="w-full h-full"
                src={`${trailerMovie.trailer}?autoplay=1`}
                allowFullScreen
                title={trailerMovie.title}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Showspage;
