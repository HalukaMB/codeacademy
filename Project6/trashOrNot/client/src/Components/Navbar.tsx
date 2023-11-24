import React from 'react'
import { NavLink } from 'react-router-dom'

export const Navbar = () => {
  return (
    <div className="navbar">
      <div>
        <NavLink
            to="/"
            className={({ isActive, isPending }) => { }
            }
          >
            Found
          </NavLink>
          </div>
          <div>

          <NavLink
            to="/about"
            className={({ isActive, isPending }) => { }
            }
          >
            Cleaned
          </NavLink>
          </div>

          <div>

        <NavLink
            to="/about"
            className={({ isActive, isPending }) => { }
            }
          >
            About
          </NavLink>

          </div>

    </div>
  )
}
