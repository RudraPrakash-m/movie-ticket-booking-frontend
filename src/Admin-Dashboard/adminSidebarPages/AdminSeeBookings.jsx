import React, { useContext, useMemo, useState } from "react";
import { allMovies } from "../../contexts/allMoviesContext/AllMoviesContext";

const AdminSeeBookings = () => {
  const { movies } = useContext(allMovies);

  const [search, setSearch] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [sortBy, setSortBy] = useState("latest");

  /* =============================
     FLATTEN BOOKINGS
  ==============================*/

  const bookingData = useMemo(() => {
    const bookings = [];

    movies.forEach((movie) => {
      movie.shows?.forEach((show) => {
        const seats = show.bookedSeats || [];

        if (seats.length > 0) {
          bookings.push({
            movieTitle: movie.title,
            date: show.date,
            time: show.time,
            seatsCount: seats.length,
            pricePerSeat: show.price,
            totalAmount: seats.length * show.price,
          });
        }
      });
    });

    return bookings;
  }, [movies]);

  /* =============================
     SUMMARY STATS
  ==============================*/

  const summary = useMemo(() => {
    const totalBookings = bookingData.length;
    const totalSeats = bookingData.reduce((acc, b) => acc + b.seatsCount, 0);
    const totalRevenue = bookingData.reduce((acc, b) => acc + b.totalAmount, 0);

    return { totalBookings, totalSeats, totalRevenue };
  }, [bookingData]);

  /* =============================
     FILTER + SEARCH + SORT
  ==============================*/

  const filteredBookings = bookingData
    .filter((b) => b.movieTitle.toLowerCase().includes(search.toLowerCase()))
    .filter((b) => (dateFilter ? b.date === dateFilter : true))
    .sort((a, b) => {
      if (sortBy === "revenue") return b.totalAmount - a.totalAmount;

      if (sortBy === "seats") return b.seatsCount - a.seatsCount;

      return new Date(b.date) - new Date(a.date);
    });

  /* =============================
     UI
  ==============================*/

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black text-gray-200 p-8">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* HEADER */}
        <div className="border-b border-gray-800 pb-6">
          <h1 className="text-3xl font-bold tracking-tight">
            Booking Management
          </h1>
          {/* <p className="text-gray-400 mt-2 text-sm">
            Monitor all ticket bookings and revenue performance
          </p> */}
        </div>

        {/* SUMMARY CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard title="Total Bookings" value={summary.totalBookings} />
          <StatCard title="Total Seats Booked" value={summary.totalSeats} />
          <StatCard
            title="Total Revenue"
            value={`₹ ${summary.totalRevenue.toLocaleString()}`}
          />
        </div>

        {/* FILTER SECTION */}
        <div className="bg-gray-900/70 border border-gray-800 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
          <input
            type="text"
            placeholder="Search by movie..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 w-full md:w-1/3 focus:ring-1 focus:ring-indigo-500 outline-none"
          />

          <input
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2"
          />

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2"
          >
            <option value="latest">Sort by Date</option>
            <option value="revenue">Sort by Revenue</option>
            <option value="seats">Sort by Seats</option>
          </select>
        </div>

        {/* BOOKINGS TABLE */}
        <div className="bg-gray-900/70 border border-gray-800 rounded-2xl p-6 shadow-xl">
          <h2 className="text-xl font-semibold mb-6">All Bookings</h2>

          {filteredBookings.length === 0 ? (
            <p className="text-gray-500">No bookings found</p>
          ) : (
            <div className="space-y-4">
              {filteredBookings.map((booking, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center border-b border-gray-800 pb-3"
                >
                  <div>
                    <p className="font-medium">{booking.movieTitle}</p>
                    <p className="text-xs text-gray-400">
                      {booking.date} | {booking.time}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-sm">Seats: {booking.seatsCount}</p>
                    <p className="text-green-400 font-semibold">
                      ₹ {booking.totalAmount.toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

/* =============================
   STAT CARD
=============================*/

const StatCard = ({ title, value }) => (
  <div className="bg-gray-900/70 border border-gray-800 rounded-2xl p-6 shadow-xl hover:scale-[1.02] transition">
    <p className="text-sm text-gray-400 mb-2">{title}</p>
    <h3 className="text-2xl font-bold text-indigo-400">{value}</h3>
  </div>
);

export default AdminSeeBookings;
