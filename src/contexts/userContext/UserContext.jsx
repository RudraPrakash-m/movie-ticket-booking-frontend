import React, { createContext, useState, useEffect } from "react";

export const userCon = createContext();

const UserContext = ({ children }) => {
  // -------------------------------
  // 🔐 INITIAL USER STATE
  // -------------------------------
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("userData");

    if (stored) return JSON.parse(stored);

    return {
      id: "u_001",
      name: "Rudra Prakash Mallick",
      email: "rudra@email.com",
      role: "user",

      favourites: [],

      bookedTickets: [],

      createdAt: "2026-01-01",
    };
  });

  // Persist user in localStorage
  useEffect(() => {
    localStorage.setItem("userData", JSON.stringify(user));
  }, [user]);

  // ======================================================
  // ⭐ FAVOURITE FUNCTIONS
  // ======================================================

  const addFavourite = (movieId) => {
    setUser((prev) => {
      if (prev.favourites.includes(movieId)) return prev;

      return {
        ...prev,
        favourites: [...prev.favourites, movieId],
      };
    });
  };

  const removeFavourite = (movieId) => {
    setUser((prev) => ({
      ...prev,
      favourites: prev.favourites.filter((id) => id !== movieId),
    }));
  };

  const toggleFavourite = (movieId) => {
    setUser((prev) => {
      const isFav = prev.favourites.includes(movieId);

      return {
        ...prev,
        favourites: isFav
          ? prev.favourites.filter((id) => id !== movieId)
          : [...prev.favourites, movieId],
      };
    });
  };

  const clearFavourites = () => {
    setUser((prev) => ({
      ...prev,
      favourites: [],
    }));
  };

  // ======================================================
  // 🎟 BOOKING FUNCTIONS
  // ======================================================

  const bookTicket = ({
    movieId,
    movieTitle,
    showDate,
    showTime,
    seats,
    pricePerSeat,
  }) => {
    if (!seats || seats.length === 0) return;

    const newBooking = {
      bookingId: "b_" + Date.now(),

      movieId,
      movieTitle,

      showDate,
      showTime,

      seats,

      pricePerSeat,
      totalAmount: seats.length * pricePerSeat,

      paymentStatus: "paid", // simulate
      bookingStatus: "confirmed",

      bookedAt: new Date().toISOString().split("T")[0],
    };

    setUser((prev) => ({
      ...prev,
      bookedTickets: [...prev.bookedTickets, newBooking],
    }));
  };

  const cancelBooking = (bookingId) => {
    setUser((prev) => ({
      ...prev,
      bookedTickets: prev.bookedTickets.map((booking) =>
        booking.bookingId === bookingId
          ? { ...booking, bookingStatus: "cancelled" }
          : booking,
      ),
    }));
  };

  const removeBooking = (bookingId) => {
    setUser((prev) => ({
      ...prev,
      bookedTickets: prev.bookedTickets.filter(
        (booking) => booking.bookingId !== bookingId,
      ),
    }));
  };

  const clearBookings = () => {
    setUser((prev) => ({
      ...prev,
      bookedTickets: [],
    }));
  };

  // ======================================================
  // 🔐 AUTH STYLE FUNCTIONS (Basic)
  // ======================================================

  const updateProfile = (updatedData) => {
    setUser((prev) => ({
      ...prev,
      ...updatedData,
    }));
  };

  const logout = () => {
    localStorage.removeItem("userData");
    setUser(null);
  };

  const login = (userData) => {
    setUser(userData);
  };

  // ======================================================

  return (
    <userCon.Provider
      value={{
        user,
        setUser,

        // Favourite
        addFavourite,
        removeFavourite,
        toggleFavourite,
        clearFavourites,

        // Booking
        bookTicket,
        cancelBooking,
        removeBooking,
        clearBookings,

        // Auth
        login,
        logout,
        updateProfile,
      }}
    >
      {children}
    </userCon.Provider>
  );
};

export default UserContext;
