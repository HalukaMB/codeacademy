import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './Home.tsx';
import About from './About.tsx';
import CountryCardDetail from './CountryCardDetail.tsx';
import { ReducedDataContextProvider } from './context/reducedDataContext.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/:countryid",
      element: <CountryCardDetail />
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  
  <React.StrictMode>
    <ReducedDataContextProvider>
    <RouterProvider router={router} />
    </ReducedDataContextProvider>
  </React.StrictMode>,
)
