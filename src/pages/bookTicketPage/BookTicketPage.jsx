import React, { useState, useRef, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import { TheaterLayoutContext } from "../../contexts/theaterLayoutContext/TheaterLayoutProvider";
import TheaterLayout from "../../components/TheaterLayout/TheaterLayout";

const BookTicketPage = () => {
  const location = useLocation();
  const { movie, selectedDate } = location.state || {};

  const { theaterLayouts } = useContext(TheaterLayoutContext);

  const [selectedShow, setSelectedShow] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [loadingSeats, setLoadingSeats] = useState(false);

  const theaterRef = useRef(null);

  if (!movie) {
    return (
      <div className="min-h-screen bg-black text-white p-10 pt-28">
        No booking data found.
      </div>
    );
  }

  const availableShows = movie.shows.filter(
    (show) => show.date === selectedDate,
  );

  const selectedScreen = theaterLayouts.find(
    (screen) => screen.id === selectedShow?.screenId,
  );

  const totalPrice = selectedSeats.length * (selectedShow?.price || 0);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto",
    });
  }, []);

  // Smooth scroll to theater section
  useEffect(() => {
    if (selectedShow) {
      setLoadingSeats(true);

      const timer = setTimeout(() => {
        setLoadingSeats(false);
        theaterRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [selectedShow]);

  return (
    <div className="min-h-screen bg-black text-white px-6 md:px-16 pt-28 pb-16">
      {/* ================= MOVIE HEADER ================= */}
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-10 mb-14">
        <div>
          <img
            src={movie.poster}
            alt={movie.title}
            className="rounded-xl shadow-xl border border-gray-800"
          />
        </div>

        <div className="md:col-span-2">
          <h1 className="text-4xl font-bold mb-4">{movie.title}</h1>

          <p className="text-gray-400 mb-3">
            {selectedDate} • {movie.duration} • ⭐ {movie.rating}
          </p>

          <p className="text-gray-500 mb-6">{movie.genres.join(" • ")}</p>

          <div className="flex gap-4 flex-wrap">
            {availableShows.map((show, index) => (
              <button
                key={index}
                onClick={() => {
                  setSelectedShow(show);
                  setSelectedSeats([]);
                }}
                className={`px-6 py-3 rounded-lg border transition ${
                  selectedShow?.time === show.time
                    ? "bg-red-600 border-red-600"
                    : "border-gray-700 hover:bg-gray-800"
                }`}
              >
                {show.time}
                <span className="block text-sm text-gray-300">
                  ₹{show.price}
                </span>
              </button>
            ))}
          </div>

          {!selectedShow && (
            <div className="mt-10 text-gray-500">
              Select a show time to continue
            </div>
          )}
        </div>
      </div>

      {/* ================= THEATER SECTION ================= */}
      {selectedShow && selectedScreen && (
        <div
          ref={theaterRef}
          className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-10 mt-10"
        >
          {/* Seats Section */}
          <div className="lg:col-span-2 bg-gray-900 p-8 rounded-2xl border border-gray-800">
            {loadingSeats ? (
              <div className="animate-pulse space-y-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="h-6 bg-gray-800 rounded" />
                ))}
              </div>
            ) : (
              <>
                <TheaterLayout
                  selectedShow={selectedShow}
                  selectedSeats={selectedSeats}
                  setSelectedSeats={setSelectedSeats}
                  rows={selectedScreen.rows}
                  seatsPerRow={selectedScreen.seatsPerRow}
                  screenName={selectedScreen.name}
                />

                {/* Legend */}
                <div className="flex justify-center gap-6 mt-8 text-sm text-gray-400">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-gray-800 rounded"></div>
                    Available
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-red-600 rounded"></div>
                    Selected
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-gray-600 rounded"></div>
                    Booked
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Summary */}
          <div className="bg-gray-900 p-8 rounded-2xl border border-gray-800 h-fit sticky top-32 shadow-xl">
            <h3 className="text-xl font-semibold mb-6">Booking Summary</h3>

            <div className="space-y-4 text-gray-400 text-sm">
              <div>
                <p>Screen</p>
                <p className="text-white font-medium">{selectedScreen.name}</p>
              </div>

              <div>
                <p>Show Time</p>
                <p className="text-white font-medium">{selectedShow.time}</p>
              </div>

              <div>
                <p>Seats</p>
                <p className="text-white font-medium">
                  {selectedSeats.length > 0 ? selectedSeats.join(", ") : "None"}
                </p>
              </div>

              <div>
                <p>Total</p>
                <p className="text-2xl text-white font-bold">₹{totalPrice}</p>
              </div>
            </div>

            <button
              disabled={selectedSeats.length === 0}
              className="w-full mt-8 bg-red-600 hover:bg-red-700 disabled:bg-gray-700 py-3 rounded-lg font-semibold transition"
            >
              Proceed to Payment
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookTicketPage;
