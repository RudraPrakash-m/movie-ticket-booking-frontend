import React, { useContext, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Heart, X } from "lucide-react";
import { userCon } from "../../contexts/userContext/UserContext";
import { allMovies } from "../../contexts/allMoviesContext/AllMoviesContext";

/* 🔥 Slug Generator */
const createSlug = (title) =>
  title
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .trim()
    .replace(/\s+/g, "-");

const Favouritepage = () => {
  const { movies } = useContext(allMovies);
  const { user, toggleFavourite } = useContext(userCon);
  const navigate = useNavigate();

  const [trailerMovie, setTrailerMovie] = useState(null);

  /* ✅ Favourite Movies */
  const favouriteMovies = useMemo(() => {
    if (!user?.favourites) return [];
    return movies.filter((m) => user.favourites.includes(m.id));
  }, [movies, user]);

  return (
    <div className="min-h-screen bg-gray-950 text-white pt-24 px-6 md:px-16 pb-14">
      <div className="mb-10">
        <h1 className="text-2xl font-semibold">My Favourites</h1>
        <p className="text-gray-400 text-sm">
          {favouriteMovies.length} movies saved
        </p>
      </div>

      {favouriteMovies.length === 0 ? (
        <p className="text-gray-400">
          You have not added any favourite movies yet.
        </p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {favouriteMovies.map((movie) => {
            const isFav = user.favourites.includes(movie.id);

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

                  {/* ❤️ Favourite */}
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
                        isFav ? "text-red-500 fill-red-500" : "text-white"
                      }
                    />
                  </button>
                </div>

                <div className="p-4">
                  <h3 className="font-semibold mb-2">{movie.title}</h3>

                  <p className="text-sm text-gray-400 mb-3">
                    ⭐ {movie.rating}
                    {movie.status === "released" && <> • ₹{movie.price}</>}
                  </p>

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
      )}

      {/* 🎬 Trailer Modal */}
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
                src={`${trailerMovie.trailer}?autoplay=1&mute=1`}
                allow="autoplay; encrypted-media"
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

export default Favouritepage;
