import React from 'react'
import { NavLink } from 'react-router-dom'

export const Navbar = () => {
  return (
      <div className="headernav">
        <input type="checkbox" id="trigger" />
        <label htmlFor="trigger" className="hamburger-logo">
          <span></span>
          <span></span>
          <span></span>
        </label>
        <div className="navbarHideShow">
          <div className='navlink'>
            <NavLink
              to="/"
              className={({ isActive, isPending }) => { }
              }
            >
              Found
            </NavLink>
          </div>
          <div className='navlink'>
            <NavLink
              to="/cleaned"
              className={({ isActive, isPending }) => { }
              }
            >
              Cleaned
            </NavLink>
          </div>
          <div className='navlink'>
            <NavLink
              to="/about"
              className={({ isActive, isPending }) => { }
              }
            >
              About
            </NavLink>
          </div>
        </div>
      </div>

  )
}
