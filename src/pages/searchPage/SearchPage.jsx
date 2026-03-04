import React, { useContext, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { allMovies } from "../../contexts/allMoviesContext/AllMoviesContext";
import { userCon } from "../../contexts/userContext/UserContext";
import { Heart } from "lucide-react";

const SearchPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  

  const { movies } = useContext(allMovies);
  const { user, toggleFavourite } = useContext(userCon);

  const queryParams = new URLSearchParams(location.search);
  const movieName = queryParams.get("q");

  const filteredMovies = useMemo(() => {
    if (!movieName) return [];

    return movies.filter((movie) =>
      movie.title.toLowerCase().includes(movieName.toLowerCase()),
    );
  }, [movies, movieName]);

  return (
    <div className="min-h-screen bg-gray-950 text-white pt-24 px-6 md:px-16 pb-14">
      <h1 className="text-3xl font-bold mb-10">
        Search Results for "{movieName}"
      </h1>

      {filteredMovies.length === 0 ? (
        <p className="text-gray-400">No movies found.</p>
      ) : (
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

                  {/* ⭐ Favourite */}
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
                  <h3 className="font-semibold mb-3">{movie.title}</h3>

                  <button
                    onClick={() =>
                      navigate(`/shows`, {
                        state: { movie },
                      })
                    }
                    className="w-full bg-red-600 hover:bg-red-700 py-2 rounded text-sm"
                  >
                    See More
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SearchPage;
