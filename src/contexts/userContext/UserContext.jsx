import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const userCon = createContext();

axios.defaults.withCredentials = true;

const UserContext = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authLoading, setAuthLoading] = useState(true);
  const API = import.meta.env.VITE_API_URL;

  // ==============================
  // 🔐 AUTH
  // ==============================

  const fetchMe = async () => {
    try {
      const res = await axios.get(`${API}/api/me`);
      setUser(res.data.data);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
      setAuthLoading(false);
    }
  };

  useEffect(() => {
    fetchMe();
  }, []);

  const login = async (email, password) => {
  try {
    const res = await axios.post(
      `${API}/api/login`,
      { email, password },
      { withCredentials: true }
    );

    await fetchMe();
    return res.data;

  } catch (err) {
    // 🔥 If backend says OTP required
    if (err.response?.data?.requiresOtp) {
      throw err; // Let Auth.jsx handle showing OTP
    }

    // All other errors (401, 404 etc)
    throw err;
  }
};

  const register = async (data) => {
    // console.log(data);
    return axios.post(`${API}/api/register`, data, {
      withCredentials: true,
    });
  };

  const logout = async () => {
    await axios.post(`${API}/api/logout`);
    setUser(null);
  };

  const updateProfile = (updatedData) => {
    setUser((prev) => ({
      ...prev,
      ...updatedData,
    }));
  };

  // ==============================
  // ❤️ FAVOURITES (Frontend only for now)
  // ==============================

  const toggleFavourite = async (movieId) => {
    // console.log(movieId, typeof(movieId));

    if (!user) return;

    try {
      const res = await axios.patch(
        `${API}/api/user/toggle-favourite`,
        { movieId },
        { withCredentials: true },
      );

      const { action } = res.data;

      setUser((prev) => {
        if (!prev) return prev;

        if (action === "removed") {
          return {
            ...prev,
            favourites: prev.favourites.filter((id) => id !== movieId),
          };
        }

        if (action === "added") {
          return {
            ...prev,
            favourites: [...prev.favourites, movieId],
          };
        }

        return prev;
      });
    } catch (error) {
      console.error("Toggle favourite failed:", error.response?.data?.message);
    }
  };

  // ==============================
  // 🎟 BOOKINGS (Frontend demo logic)
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
      bookedTickets: [...(prev.bookedTickets || []), newBooking],
    }));
  };

  return (
    <userCon.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        updateProfile,
        toggleFavourite,
        bookTicket,
        authLoading,
      }}
    >
      {children}
    </userCon.Provider>
  );
};

export default UserContext;
