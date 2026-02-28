import React from 'react'
import "./index.css"
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import MainLayout from './layouts/mainLayout/MainLayout'
import Homepage from './pages/homePage/Homepage'
import Showspage from './pages/showsPage/Showspage'
import Releasepage from './pages/releasePage/Releasepage'
import Favouritepage from './pages/favouritesPage/Favouritepage'
import MovieBooking from './pages/movieDetails/MovieBooking'
import RootErrorPage from './pages/errorPage/RootErrorPage/RootErrorPage'
import Auth from './pages/LoginRegisterPage/Auth'
import ForgotPassword from './pages/ForgotPassword/ForgotPassword'

const App = () => {

  const routes = createBrowserRouter([
    {
      path:"/",
      element:<MainLayout/>,
      errorElement:<RootErrorPage/>,
      children:[
        {
          index:true,
          element:<Homepage/>
        },
        {
          path:"/shows",
          element:<Showspage/>
        },
        {
          path:"/release",
          element:<Releasepage/>
        },
        {
          path:"/favourite",
          element:<Favouritepage/>
        },
        {
          path:"/booking/:slug",
          element:<MovieBooking/>
        }
      ]
    },
    {
      path:"/auth",
      element:<Auth/>
    },
    {
      path:"/forgot-password",
      element:<ForgotPassword/>
    }
  ])


  return <RouterProvider router={routes}></RouterProvider>
}

export default App