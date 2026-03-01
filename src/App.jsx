import React, { useContext } from "react";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./layouts/mainLayout/MainLayout";
import Homepage from "./pages/homePage/Homepage";
import Showspage from "./pages/showsPage/Showspage";
import Releasepage from "./pages/releasePage/Releasepage";
import Favouritepage from "./pages/favouritesPage/Favouritepage";
import MovieBooking from "./pages/movieDetails/MovieBooking";
import RootErrorPage from "./pages/errorPage/RootErrorPage/RootErrorPage";
import Auth from "./pages/LoginRegisterPage/Auth";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import SearchPage from "./pages/searchPage/SearchPage";
import AboutMoviePage from "./pages/aboutMoviePage/AboutMoviePage";
import BookTicketPage from "./pages/bookTicketPage/BookTicketPage";
import TheaterLayoutProvider from "./contexts/theaterLayoutContext/TheaterLayoutProvider";
import ProtectedRouting from "./routing/protectedRouting/ProtectedRouting";
import PaymentPage from "./pages/paymentPage/PaymentPage";
import MyBookings from "./pages/myBookings/MyBookings";
import LoadingPage from "./pages/loadingPage/LoadingPage";
import { userCon } from "./contexts/userContext/UserContext";

const App = () => {
  const { authLoading } = useContext(userCon);
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      errorElement: <RootErrorPage />,
      children: [
        {
          index: true,
          element: <Homepage />,
        },
        {
          path: "/shows",
          element: <Showspage />,
        },
        {
          path: "/release",
          element: <Releasepage />,
        },
        {
          path: "/favourite",
          element: <Favouritepage />,
        },
        {
          path: "/booking/:slug",
          element: <MovieBooking />,
        },
        {
          path: "/search",
          element: <SearchPage />,
        },
        {
          path: "/about-movie/:slug",
          element: <AboutMoviePage />,
        },
        {
          path: "/book-ticket",
          element: (
            <TheaterLayoutProvider>
              <BookTicketPage />
            </TheaterLayoutProvider>
          ),
        },
        {
          path: "/my-bookings",
          element: (
            <ProtectedRouting>
              <MyBookings />
            </ProtectedRouting>
          ),
        },
      ],
    },
    {
      path: "/auth",
      element: <Auth />,
    },
    {
      path: "/forgot-password",
      element: <ForgotPassword />,
    },
    {
      path: "/payment",
      element: (
        <ProtectedRouting>
          <PaymentPage />
        </ProtectedRouting>
      ),
    },
  ]);

  if (authLoading) return <LoadingPage/>

  return <RouterProvider router={routes}></RouterProvider>
};

export default App;
