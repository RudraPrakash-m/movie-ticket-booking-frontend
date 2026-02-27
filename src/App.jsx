import React from 'react'
import "./index.css"
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import MainLayout from './layouts/mainLayout/MainLayout'
import Homepage from './pages/homePage/Homepage'
import Showspage from './pages/showsPage/Showspage'
import Releasepage from './pages/releasePage/Releasepage'
import Favouritepage from './pages/favouritesPage/Favouritepage'
import MovieBooking from './pages/movieDetails/MovieBooking'

const App = () => {

  const routes = createBrowserRouter([
    {
      path:"/",
      element:<MainLayout/>,
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
    }
  ])


  return <RouterProvider router={routes}></RouterProvider>
}

export default App