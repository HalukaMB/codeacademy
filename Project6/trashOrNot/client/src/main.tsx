import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { NewLocationContextProvider } from './context/NewLocationContext.tsx'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import About from './About.tsx'
import { LoginOrRegister } from './LoginOrRegister.tsx'


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
    path: "/loginlogout",
    element: <LoginOrRegister />,
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
