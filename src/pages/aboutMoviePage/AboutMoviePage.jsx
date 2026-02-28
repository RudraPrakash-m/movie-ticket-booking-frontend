import React, { useContext } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { allMovies } from "../../contexts/allMoviesContext/AllMoviesContext";

const createSlug = (title) =>
  title
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .trim()
    .replace(/\s+/g, "-");

const AboutMoviePage = () => {
  const navigate = useNavigate();
  const { slug } = useParams();
  const { state } = useLocation();
  const { movies } = useContext(allMovies);

  const movie =
    state?.movie || movies.find((m) => createSlug(m.title) === slug);

  if (!movie) {
    return (
      <div className="pt-24 min-h-screen bg-gray-950 text-white flex items-center justify-center">
        <h2 className="text-xl">Movie not found</h2>
      </div>
    );
  }

  const googleSearchLink = `https://www.google.com/search?q=${encodeURIComponent(
    movie.title + " movie",
  )}`;

  return (
    <div className="pt-24 min-h-screen bg-gray-950 text-white">
      {/* ================= HERO ================= */}
      <div
        className="relative h-[70vh] bg-cover bg-center"
        style={{ backgroundImage: `url(${movie.poster})` }}
      >
        <div className="absolute inset-0 bg-black/70"></div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-16 h-full flex flex-col justify-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">{movie.title}</h1>

          <div className="flex flex-wrap gap-4 text-gray-300 mb-4">
            <span>{movie.year}</span>
            <span>•</span>
            <span>{movie.duration}</span>
            <span>•</span>
            <span>{movie.genres.join(", ")}</span>
          </div>

          <p className="text-gray-300 max-w-2xl mb-6">{movie.description}</p>

          <div className="flex flex-wrap gap-4">
            {movie.status === "released" && (
              <button
                onClick={() =>
                  navigate(`/booking/${createSlug(movie.title)}`, {
                    state: { movie },
                  })
                }
                className="px-8 py-3 bg-red-600 hover:bg-red-700 rounded-md text-lg font-medium transition"
              >
                Book Now
              </button>
            )}

            <a
              href={googleSearchLink}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 bg-gray-700 hover:bg-gray-600 rounded-md text-lg transition"
            >
              Read More
            </a>

            <button
              onClick={() => navigate(-1)}
              className="px-8 py-3 bg-gray-800 hover:bg-gray-700 rounded-md text-lg transition"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>

      {/* ================= DETAILS ================= */}
      <div className="max-w-6xl mx-auto px-6 md:px-16 py-12">
        <div className="grid md:grid-cols-2 gap-10">
          <img
            src={movie.poster}
            alt={movie.title}
            className="w-full max-w-sm rounded-lg shadow-lg"
          />

          <div>
            <h2 className="text-2xl font-semibold mb-6">Movie Details</h2>

            <p className="mb-3 text-gray-400">
              ⭐ Rating: <span className="text-white">{movie.rating}</span>
            </p>

            <p className="mb-3 text-gray-400">
              Year: <span className="text-white">{movie.year}</span>
            </p>

            <p className="mb-3 text-gray-400">
              Duration: <span className="text-white">{movie.duration}</span>
            </p>

            <p className="mb-3 text-gray-400">
              Genres:{" "}
              <span className="text-white">{movie.genres.join(", ")}</span>
            </p>

            <p className="mb-3 text-gray-400">
              Cast: <span className="text-white">{movie.cast.join(", ")}</span>
            </p>

            {movie.status === "released" && (
              <p className="mb-3 text-gray-400">
                Price: <span className="text-white">₹{movie.price}</span>
              </p>
            )}
          </div>
        </div>
      </div>

      {/* ================= SHOWTIMES ================= */}
      <div className="max-w-6xl mx-auto px-6 md:px-16 py-10">
        <h2 className="text-2xl font-semibold mb-6">Show Information</h2>

        {movie.status === "released" ? (
          movie.shows && movie.shows.length > 0 ? (
            <div className="grid md:grid-cols-3 gap-6">
              {movie.shows.map((show, index) => (
                <div
                  key={index}
                  className="bg-gray-900 p-5 rounded-lg border border-gray-800"
                >
                  <p className="text-gray-300">
                    Date: <span className="text-white">{show.date}</span>
                  </p>

                  <p className="text-gray-300">
                    Time: <span className="text-white">{show.time}</span>
                  </p>

                  <p className="text-gray-300">
                    Ticket Price:{" "}
                    <span className="text-white">₹{show.price}</span>
                  </p>

                  <p className="text-gray-300">
                    Booked Seats:{" "}
                    <span className="text-white">
                      {show.bookedSeats.length}
                    </span>
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400">No shows available right now.</p>
          )
        ) : (
          <div className="bg-gray-900 p-6 rounded-lg border border-gray-800 text-center">
            <p className="text-xl text-yellow-400 font-semibold">
              🎬 Coming Soon
            </p>

            <p className="text-gray-400 mt-2">
              This movie is not released yet. Showtimes will be available soon.
            </p>

            {movie.releaseDate && (
              <p className="text-white mt-3">
                Expected Release: {movie.releaseDate}
              </p>
            )}
          </div>
        )}
      </div>

      {/* ================= TRAILER ================= */}
      {movie.trailer && (
        <div className="max-w-6xl mx-auto px-6 md:px-16 py-16">
          <h2 className="text-3xl font-bold mb-8">Watch Trailer</h2>

          <div className="aspect-video rounded-xl overflow-hidden shadow-2xl">
            <iframe
              className="w-full h-full"
              src={`${movie.trailer}?autoplay=1&mute=1`}
              allow="autoplay; encrypted-media"
              allowFullScreen
              title={movie.title}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AboutMoviePage;
