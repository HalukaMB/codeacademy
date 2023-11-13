import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './Home.tsx';
import About from './About.tsx';
import CountryCardDetail from './CountryCardDetail.tsx';
import { ReducedDataContextProvider } from './context/reducedDataContext.tsx';
import { AuthenticationContext, AuthenticationContextProvider } from './context/AuthenticationContext.tsx';
import ProtectedRoute from './ProtectedRoute.tsx';
import Login from './Login.tsx';
import Logout from './Logout.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/logout",
    element: 
    <ProtectedRoute>
    <Logout />
    </ProtectedRoute>
,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Login />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/:countryid",
    
      element: 
      <ProtectedRoute>
      <CountryCardDetail />
      </ProtectedRoute>

  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  
  <React.StrictMode>
    <AuthenticationContextProvider>
    <ReducedDataContextProvider>
    <RouterProvider router={router} />
    </ReducedDataContextProvider>
    </AuthenticationContextProvider>
  </React.StrictMode>,
)
