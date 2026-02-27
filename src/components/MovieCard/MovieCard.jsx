import React, { useContext } from "react";
import { Heart } from "lucide-react";
import { allMovies } from "../../contexts/allMoviesContext/AllMoviesContext";

const MovieCard = () => {
  const { movies } = useContext(allMovies);

  return (
    <div className="p-6 bg-gray-900 text-white">
      {movies.map((movie) => (
        <div
          key={movie.id}
          className="max-w-4xl mx-auto bg-gray-800 rounded-xl overflow-hidden shadow-lg"
        >
          {/* Poster */}
          <img
            src={movie.poster}
            alt={movie.title}
            className="w-full h-80 object-cover"
          />

          <div className="p-6 space-y-4">
            {/* Title + fav */}
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold">{movie.title}</h1>

              {/* Favourite */}
              <button className="p-2 hover:bg-red-600 rounded-full transition">
                <Heart />
              </button>
            </div>

            {/* Meta */}
            <p className="text-sm text-gray-400">
              ⭐ {movie.rating} • {movie.duration} • {movie.genres} • {movie.year}
            </p>

            {/* About */}
            <p className="text-gray-200">{movie.description}</p>

            {/* Cast */}
            <div>
              <h3 className="font-semibold mb-2">Cast</h3>

              <div className="flex flex-wrap gap-3">
                {movie.cast.map((actor, i) => (
                  <a
                    key={i}
                    href={`https://www.google.com/search?q=${actor}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-400 hover:underline text-sm"
                  >
                    {actor}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MovieCard;