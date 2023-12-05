import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { LocationContextProvider } from './context/LocationContext.tsx'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import About from './About.tsx'
import { LoginOrRegister } from './LoginOrRegister.tsx'
import { AuthenticationContextProvider } from './context/AuthenticationContext.tsx'
import { Cleaned } from './Cleaned.tsx'


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
    element: <LoginOrRegister />,
  },
 
]
)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthenticationContextProvider>
    <LocationContextProvider>
    <RouterProvider router={router} />
    </LocationContextProvider>
    </AuthenticationContextProvider>
  </React.StrictMode>,
)
