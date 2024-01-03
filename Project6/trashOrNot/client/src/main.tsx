import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './pages/App.tsx'
import { LocationContextProvider } from './context/LocationContext.tsx'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import About from './pages/About.tsx'
import { LoginOrRegister } from './pages/LoginOrRegister.tsx'
import { AuthenticationContextProvider } from './context/AuthenticationContext.tsx'
import { Cleaned } from './pages/Cleaned.tsx'
import { UpdateContextProvider } from './context/UpdateContext.tsx'
import { Profile } from './pages/Profile.tsx'


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/cleaned",
    element: <Cleaned/>,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/loginlogout",
    element:  <LoginOrRegister><Profile /></LoginOrRegister>,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
 
]
)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <UpdateContextProvider>
    <AuthenticationContextProvider>
    <LocationContextProvider>
    <RouterProvider router={router} />
    </LocationContextProvider>
    </AuthenticationContextProvider>
    </UpdateContextProvider>
  </React.StrictMode>,
)
