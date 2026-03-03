import React, { useContext, useMemo, useState } from "react";
import { allMovies } from "../../contexts/allMoviesContext/AllMoviesContext";
import { userCon } from "../../contexts/userContext/UserContext";

const AdminDashboard = () => {
  const { movies } = useContext(allMovies);
  const { user } = useContext(userCon);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  /* ===============================
     CORE CALCULATIONS
  ================================*/

  const dashboardData = useMemo(() => {
    let totalMovies = movies.length;
    let totalShows = 0;
    let totalSeatsBooked = 0;
    let totalRevenue = 0;

    const movieStats = movies.map((movie) => {
      let movieRevenue = 0;
      let movieSeats = 0;
      let movieShows = movie.shows?.length || 0;

      movie.shows?.forEach((show) => {
        const seats = show.bookedSeats?.length || 0;
        movieSeats += seats;
        movieRevenue += seats * show.price;
        totalSeatsBooked += seats;
        totalRevenue += seats * show.price;
        totalShows += 1;
      });

      return {
        title: movie.title,
        revenue: movieRevenue,
        seats: movieSeats,
        shows: movieShows,
      };
    });

    // Top performing movie
    const topMovie =
      movieStats.sort((a, b) => b.revenue - a.revenue)[0] || null;

    return {
      totalMovies,
      totalShows,
      totalSeatsBooked,
      totalRevenue,
      movieStats,
      topMovie,
    };
  }, [movies]);

  /* ===============================
     SEARCH + FILTER
  ================================*/

  const filteredMovies = dashboardData.movieStats
    .filter((m) =>
      m.title.toLowerCase().includes(search.toLowerCase()),
    )
    .filter((m) => {
      if (filter === "profitable") return m.revenue > 0;
      if (filter === "empty") return m.seats === 0;
      return true;
    });

  /* ===============================
     UI
  ================================*/

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black text-gray-200 p-8">
      <div className="max-w-7xl mx-auto space-y-10">

        {/* ================= HEADER ================= */}
        <div className="flex justify-between items-center border-b border-gray-800 pb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Administration Control Panel
            </h1>
            {/* <p className="text-gray-400 mt-2 text-sm">
              Real-time platform performance & operational analytics
            </p> */}
          </div>

          <div className="text-right">
            <p className="text-sm text-gray-400">
              Logged in as
            </p>
            <p className="font-medium">{user?.name}</p>
            <p className="text-xs text-gray-500">
              {new Date().toLocaleString()}
            </p>
          </div>
        </div>

        {/* ================= STAT CARDS ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

          <StatCard
            title="Total Movies"
            value={dashboardData.totalMovies}
          />

          <StatCard
            title="Total Shows"
            value={dashboardData.totalShows}
          />

          <StatCard
            title="Seats Booked"
            value={dashboardData.totalSeatsBooked}
          />

          <StatCard
            title="Total Revenue"
            value={`₹ ${dashboardData.totalRevenue.toLocaleString()}`}
          />
        </div>

        {/* ================= SEARCH + FILTER ================= */}
        <div className="bg-gray-900/70 border border-gray-800 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row gap-4 md:items-center md:justify-between">

          <input
            type="text"
            placeholder="Search movie..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 w-full md:w-1/3 focus:ring-1 focus:ring-indigo-500 outline-none"
          />

          <div className="flex gap-3">
            <FilterButton
              label="All"
              active={filter === "all"}
              onClick={() => setFilter("all")}
            />
            <FilterButton
              label="Profitable"
              active={filter === "profitable"}
              onClick={() => setFilter("profitable")}
            />
            <FilterButton
              label="No Bookings"
              active={filter === "empty"}
              onClick={() => setFilter("empty")}
            />
          </div>
        </div>

        {/* ================= TOP MOVIE ================= */}
        {dashboardData.topMovie && (
          <div className="bg-gray-900/70 border border-gray-800 rounded-2xl p-6 shadow-xl">
            <h2 className="text-xl font-semibold mb-4">
              Highest Revenue Generator
            </h2>

            <div className="flex justify-between">
              <span>{dashboardData.topMovie.title}</span>
              <span className="text-green-400 font-medium">
                ₹ {dashboardData.topMovie.revenue.toLocaleString()}
              </span>
            </div>
          </div>
        )}

        {/* ================= MOVIE TABLE ================= */}
        <div className="bg-gray-900/70 border border-gray-800 rounded-2xl p-6 shadow-xl">
          <h2 className="text-xl font-semibold mb-6">
            Movie Performance Overview
          </h2>

          {filteredMovies.length === 0 ? (
            <p className="text-gray-500">No matching records</p>
          ) : (
            <div className="space-y-4">
              {filteredMovies.map((movie) => (
                <div
                  key={movie.title}
                  className="flex justify-between items-center border-b border-gray-800 pb-3"
                >
                  <div>
                    <p className="font-medium">{movie.title}</p>
                    <p className="text-xs text-gray-400">
                      Shows: {movie.shows} | Seats: {movie.seats}
                    </p>
                  </div>

                  <p
                    className={`font-semibold ${
                      movie.revenue > 0
                        ? "text-green-400"
                        : "text-gray-500"
                    }`}
                  >
                    ₹ {movie.revenue.toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

/* ===============================
   REUSABLE COMPONENTS
================================*/

const StatCard = ({ title, value }) => (
  <div className="bg-gray-900/70 border border-gray-800 rounded-2xl p-6 shadow-xl hover:scale-[1.02] transition">
    <p className="text-sm text-gray-400 mb-2">{title}</p>
    <h3 className="text-2xl font-bold text-indigo-400">
      {value}
    </h3>
  </div>
);

const FilterButton = ({ label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded-lg text-sm transition ${
      active
        ? "bg-indigo-600 text-white"
        : "bg-gray-800 hover:bg-gray-700 text-gray-300"
    }`}
  >
    {label}
  </button>
);

export default AdminDashboard;