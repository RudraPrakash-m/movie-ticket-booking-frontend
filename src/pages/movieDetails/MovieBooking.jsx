import React, { useState, useRef, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Heart } from "lucide-react";
import DateSelector from "../../components/DateSelector/DateSelector";
import HomepageMoviesSection from "../../components/HomepageMoviesSection/HomepageMoviesSection";
import { userCon } from "../../contexts/userContext/UserContext";

const MovieBooking = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const movie = location.state?.movie;

  const { user, toggleFavourite } = useContext(userCon);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [movie]);

  if (!movie) {
    return (
      <div className="h-screen flex items-center justify-center text-white bg-gray-950">
        Movie not found
      </div>
    );
  }

  const isFav = user?.favourites?.includes(movie.id);

  const dates = [...new Set(movie.shows.map((show) => show.date))];
  const [selectedDate, setSelectedDate] = useState(dates[0]);

  const showTimes = movie.shows.filter((s) => s.date === selectedDate);

  const dateSectionRef = useRef(null);

  const scrollToDates = () => {
    const y =
      dateSectionRef.current.getBoundingClientRect().top +
      window.pageYOffset -
      100;

    window.scrollTo({ top: y, behavior: "smooth" });
  };

  return (
    <>
      <section className="min-h-screen bg-gray-950 text-white px-6 md:px-16 pt-24 pb-10">
        {/* Back */}
        <button
          onClick={() => navigate(-1)}
          className="mb-6 text-sm text-gray-400 hover:text-white"
        >
          ← Back
        </button>

        <div className="grid md:grid-cols-2 gap-10 items-center">
          {/* Poster */}
          <div className="rounded-xl overflow-hidden shadow-xl max-w-md relative">
            <img
              src={movie.poster}
              alt={movie.title}
              className="w-full h-[520px] object-cover"
            />

            {/* ⭐ Favourite Button */}
            <button
              onClick={() => toggleFavourite(movie.id)}
              className="absolute top-4 right-4 p-3 bg-black/60 rounded-full"
            >
              <Heart
                size={20}
                className={
                  isFav
                    ? "text-red-500 fill-red-500"
                    : "text-white hover:text-red-500"
                }
              />
            </button>
          </div>

          {/* Details */}
          <div className="space-y-5">
            <div className="flex items-center gap-4">
              <h1 className="text-4xl font-bold">{movie.title}</h1>

              {isFav && (
                <span className="text-red-500 text-sm font-medium">
                  ♥ In Favourites
                </span>
              )}
            </div>

            <p className="text-gray-400">
              ⭐ {movie.rating} • {movie.duration} • {movie.year}
            </p>

            <div className="flex flex-wrap gap-2">
              {movie.genres.map((g, i) => (
                <span
                  key={i}
                  className="bg-gray-800 px-3 py-1 rounded-full text-sm"
                >
                  {g}
                </span>
              ))}
            </div>

            <p className="text-gray-200 leading-relaxed max-w-xl">
              {movie.description}
            </p>

            <div>
              <h3 className="font-semibold mb-2">Cast</h3>
              <div className="flex flex-wrap gap-2">
                {movie.cast.map((c, i) => (
                  <span
                    key={i}
                    className="text-sm text-gray-300 bg-gray-800 px-2 py-1 rounded"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>

            <button
              onClick={scrollToDates}
              className="mt-4 px-8 py-3 bg-red-600 hover:bg-red-700 rounded-md font-semibold"
            >
              Book Ticket
            </button>
          </div>
        </div>

        <div ref={dateSectionRef} className="mt-10">
          <DateSelector
            dates={dates}
            selectedDate={selectedDate}
            onSelect={setSelectedDate}
          />
        </div>
      </section>

      <HomepageMoviesSection />
    </>
  );
};

export default MovieBooking;