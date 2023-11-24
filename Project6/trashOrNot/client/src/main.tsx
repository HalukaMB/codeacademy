import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { NewLocationContextProvider } from './context/NewLocationContext.tsx'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import About from './About.tsx'


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/about",
    element: <About />,
  },
 
]
)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <NewLocationContextProvider>
    <RouterProvider router={router} />
    </NewLocationContextProvider>
  </React.StrictMode>,
)
