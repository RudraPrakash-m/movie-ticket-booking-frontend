import React, { createContext, useState, useEffect } from "react";

export const userCon = createContext();

const demoUser = {
  id: "u_001",
  name: "Rudra Prakash Mallick",
  email: "rudra@email.com",
  role: "user",
  favourites: [],
  bookedTickets: [],
  createdAt: "2026-01-01",
};

const UserContext = ({ children }) => {
  const [user, setUser] = useState(() => {
    // const stored = localStorage.getItem("userData");
    // return stored ? JSON.parse(stored) : null;
    return null;
    // For now demo user auto loads
    // Later change demoUser → null for real auth
  });

  // Persist user
  // useEffect(() => {
  //   if (user) {
  //     localStorage.setItem("userData", JSON.stringify(user));
  //   }
  // }, [user]);

  // ==============================
  // ❤️ FAVOURITES
  // ==============================

  const addFavourite = (movieId) => {
    if (!user) return;

    setUser((prev) => {
      if (prev.favourites.includes(movieId)) return prev;

      return {
        ...prev,
        favourites: [...prev.favourites, movieId],
      };
    });
  };

  const removeFavourite = (movieId) => {
    if (!user) return;

    setUser((prev) => ({
      ...prev,
      favourites: prev.favourites.filter((id) => id !== movieId),
    }));
  };

  const toggleFavourite = (movieId) => {
    if (!user) return;

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
    if (!user) return;

    setUser((prev) => ({
      ...prev,
      favourites: [],
    }));
  };

  // ==============================
  // 🎟 BOOKINGS
  // ==============================

  const bookTicket = ({
    movieId,
    movieTitle,
    showDate,
    showTime,
    seats,
    pricePerSeat,
  }) => {
    if (!user || !seats?.length) return;

    const newBooking = {
      bookingId: "b_" + Date.now(),
      movieId,
      movieTitle,
      showDate,
      showTime,
      seats,
      pricePerSeat,
      totalAmount: seats.length * pricePerSeat,
      paymentStatus: "paid",
      bookingStatus: "confirmed",
      bookedAt: new Date().toISOString().split("T")[0],
    };

    setUser((prev) => ({
      ...prev,
      bookedTickets: [...prev.bookedTickets, newBooking],
    }));
  };

  const cancelBooking = (bookingId) => {
    if (!user) return;

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
    if (!user) return;

    setUser((prev) => ({
      ...prev,
      bookedTickets: prev.bookedTickets.filter(
        (booking) => booking.bookingId !== bookingId,
      ),
    }));
  };

  const clearBookings = () => {
    if (!user) return;

    setUser((prev) => ({
      ...prev,
      bookedTickets: [],
    }));
  };

  // ==============================
  // 🔐 AUTH STYLE
  // ==============================

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    // localStorage.removeItem("userData");
    setUser(null);
  };

  const updateProfile = (updatedData) => {
    if (!user) return;

    setUser((prev) => ({
      ...prev,
      ...updatedData,
    }));
  };

  // ==============================

  return (
    <userCon.Provider
      value={{
        user,
        setUser,

        // Favourites
        addFavourite,
        removeFavourite,
        toggleFavourite,
        clearFavourites,

        // Bookings
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
