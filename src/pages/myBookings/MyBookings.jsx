import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import LoadingPage from "../loadingPage/LoadingPage";

const MyBookings = () => {
  const API_URL = import.meta.env.VITE_API_URL;

  const [bookings, setBookings] = useState([]);
  const [search, setSearch] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/user/my-bookings`, {
        withCredentials: true,
      });

      setBookings(res.data.bookings || []);
    } catch (error) {
      console.error("Booking fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredBookings = useMemo(() => {
    return bookings.filter((booking) => {
      const movieTitle = booking.movieId?.title?.toLowerCase() || "";

      const matchesSearch = movieTitle.includes(search.toLowerCase());

      const matchesDate = dateFilter
        ? new Date(booking.createdAt).toISOString().split("T")[0] === dateFilter
        : true;

      return matchesSearch && matchesDate;
    });
  }, [bookings, search, dateFilter]);

  const totalTickets = filteredBookings.reduce(
    (acc, b) => acc + b.seats.length,
    0,
  );

  const totalSpent = filteredBookings.reduce((acc, b) => acc + b.amount, 0);

  if (loading) return <LoadingPage/>

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white pt-28 pb-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* TITLE */}
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center md:text-left">
          My Bookings
        </h1>

        {/* SEARCH + FILTER */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <input
            type="text"
            placeholder="Search movie..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-4 py-2 rounded bg-white/10 border border-white/10 w-full md:w-64"
          />

          <input
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="px-4 py-2 rounded bg-white/10 border border-white/10 w-full md:w-48"
          />
        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          <div className="bg-white/10 p-4 rounded-lg text-center">
            <p className="text-gray-400 text-sm">Bookings</p>
            <p className="text-2xl font-bold">{filteredBookings.length}</p>
          </div>

          <div className="bg-white/10 p-4 rounded-lg text-center">
            <p className="text-gray-400 text-sm">Total Tickets</p>
            <p className="text-2xl font-bold">{totalTickets}</p>
          </div>

          <div className="bg-white/10 p-4 rounded-lg text-center">
            <p className="text-gray-400 text-sm">Total Spent</p>
            <p className="text-2xl font-bold">₹{totalSpent}</p>
          </div>
        </div>

        {/* BOOKINGS GRID */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredBookings.map((booking) => (
            <div
              key={booking._id}
              className="bg-white/10 border border-white/10 rounded-xl overflow-hidden hover:scale-[1.02] transition"
            >
              <img
                src={booking.movieId?.poster}
                alt=""
                className="h-52 w-full object-cover"
              />

              <div className="p-4">
                <h2 className="text-lg font-semibold mb-2">
                  {booking.movieId?.title}
                </h2>

                <p className="text-gray-400 text-sm">
                  Show Time: {booking.showId?.time}
                </p>

                <p className="text-gray-400 text-sm">
                  Seats: {booking.seats.join(", ")}
                </p>

                <p className="text-gray-400 text-sm">
                  Tickets: {booking.seats.length}
                </p>

                <p className="text-gray-400 text-sm">
                  Booked On: {new Date(booking.createdAt).toLocaleDateString()}
                </p>

                <p className="text-green-400 font-bold mt-2">
                  ₹{booking.amount}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* EMPTY STATE */}
        {filteredBookings.length === 0 && (
          <div className="text-center mt-20 text-gray-400">
            No bookings found
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookings;
