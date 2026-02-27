import React, { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import DateSelector from "../../components/DateSelector/DateSelector";
import MovieCard from "../../components/MovieCard/MovieCard";
import HomepageMoviesSection from "../../components/HomepageMoviesSection/HomepageMoviesSection";

const MovieBooking = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const movie = location.state?.movie;

    useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // ⭐ fallback guard
  if (!movie) {
    return (
      <div className="h-screen flex items-center justify-center text-white bg-gray-950">
        Movie not found
      </div>
    );
  }

  // ⭐ extract unique dates from shows
  const dates = [...new Set(movie.shows.map((show) => show.date))];

  // ⭐ controlled selected date
  const [selectedDate, setSelectedDate] = useState(dates[0]);

  // ⭐ filter showtimes (future use)
  const showTimes = movie.shows.filter((s) => s.date === selectedDate);

  // ⭐ ref for scroll target
  const dateSectionRef = useRef(null);

  // ⭐ scroll handler with navbar offset
  const scrollToDates = () => {
    const y =
      dateSectionRef.current.getBoundingClientRect().top +
      window.pageYOffset -
      100; // adjust if navbar height changes

    window.scrollTo({ top: y, behavior: "smooth" });
  };

  return (
    <>
      <section className="min-h-screen bg-gray-950 text-white px-6 md:px-16 pt-24 pb-10">
        {/* back */}
        <button
          onClick={() => navigate(-1)}
          className="mb-6 text-sm text-gray-400 hover:text-white"
        >
          ← Back
        </button>

        {/* layout */}
        <div className="grid md:grid-cols-2 gap-10 items-center">
          {/* poster */}
          <div className="rounded-xl overflow-hidden shadow-xl max-w-md">
            <img
              src={movie.poster}
              alt={movie.title}
              className="w-full h-[520px] object-cover"
            />
          </div>

          {/* details */}
          <div className="space-y-5">
            <h1 className="text-4xl font-bold">{movie.title}</h1>

            <p className="text-gray-400">
              ⭐ {movie.rating} • {movie.duration} • {movie.year}
            </p>

            {/* genres */}
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

            {/* description */}
            <p className="text-gray-200 leading-relaxed max-w-xl">
              {movie.description}
            </p>

            {/* cast */}
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

            {/* ⭐ booking CTA with scroll */}
            <button
              onClick={scrollToDates}
              className="mt-4 px-8 py-3 bg-red-600 hover:bg-red-700 rounded-md font-semibold"
            >
              Book Ticket
            </button>
          </div>
        </div>

        {/* ⭐ Date selector with ref */}
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
