import React, { useContext, useMemo, useState } from "react";
import { allMovies } from "../../contexts/allMoviesContext/AllMoviesContext";
import { Heart } from "lucide-react";
import { userCon } from "../../contexts/userContext/UserContext";

const Releasepage = () => {
  const { movies } = useContext(allMovies);
  const { user, toggleFavourite } = useContext(userCon);

  const [search, setSearch] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [sortBy, setSortBy] = useState("latest");

  // ✅ Only upcoming movies
  const upcomingMovies = useMemo(() => {
    return movies.filter((m) => m.status?.toLowerCase() === "upcoming");
  }, [movies]);

  // ✅ Extract genres
  const genres = useMemo(() => {
    const allGenres = upcomingMovies.flatMap((m) => m.genres);
    return ["All", ...new Set(allGenres)];
  }, [upcomingMovies]);

  // ✅ Filter + Search + Sort
  const filteredMovies = useMemo(() => {
    let result = [...upcomingMovies];

    if (search) {
      result = result.filter((m) =>
        m.title.toLowerCase().includes(search.toLowerCase()),
      );
    }

    if (selectedGenre !== "All") {
      result = result.filter((m) => m.genres.includes(selectedGenre));
    }

    if (sortBy === "latest") {
      result.sort((a, b) => new Date(a.releaseDate) - new Date(b.releaseDate));
    } else if (sortBy === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [upcomingMovies, search, selectedGenre, sortBy]);

  return (
    <div className="min-h-screen bg-gray-950 text-white pt-24 px-6 md:px-16 pb-14">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-100">
          Upcoming Releases
        </h1>
        <p className="text-sm text-gray-400">
          Movies arriving soon in theatres
        </p>
      </div>

      {/* FILTER BAR */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-10">
        <div className="flex gap-3 overflow-x-auto scrollbar-hide whitespace-nowrap">
          {genres.map((genre) => (
            <button
              key={genre}
              onClick={() => setSelectedGenre(genre)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition ${
                selectedGenre === genre
                  ? "bg-red-600 text-white"
                  : "bg-gray-800 hover:bg-gray-700 text-gray-300"
              }`}
            >
              {genre}
            </button>
          ))}
        </div>

        <div className="flex gap-4 flex-col sm:flex-row">
          <input
            type="text"
            placeholder="Search upcoming..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-4 py-2 bg-gray-800 rounded-md outline-none w-full sm:w-64"
          />

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 bg-gray-800 rounded-md outline-none"
          >
            <option value="latest">Release Date</option>
            <option value="rating">Top Rated</option>
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
              className="bg-gray-900 rounded-lg overflow-hidden shadow hover:scale-105 transition duration-300"
            >
              <div className="relative">
                <img
                  src={movie.poster}
                  alt={movie.title}
                  className="w-full h-64 object-cover"
                />

                <div className="absolute top-3 left-3 bg-yellow-500 text-black text-xs font-bold px-3 py-1 rounded">
                  Coming Soon
                </div>

                {/* ⭐ Favourite from Context */}
                <button
                  onClick={() => toggleFavourite(movie.id)}
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

                <p className="text-sm text-gray-400 mb-2">⭐ {movie.rating}</p>

                <p className="text-sm text-gray-300">
                  Releasing on:{" "}
                  <span className="text-white font-medium">
                    {movie.releaseDate}
                  </span>
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {filteredMovies.length === 0 && (
        <p className="text-gray-400 mt-10">No upcoming movies found.</p>
      )}
    </div>
  );
};

export default Releasepage;
