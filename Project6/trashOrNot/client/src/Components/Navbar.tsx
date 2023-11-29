import React from 'react'
import { NavLink } from 'react-router-dom'

export const Navbar = () => {
  return (
    <div className="headernav">
      <div className="headerelements">
        <input type="checkbox" id="trigger" />
        <label htmlFor="trigger" className="hamburger-logo">
          <span></span>
          <span></span>
          <span></span>
        </label>
      </div>
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
            to="/loginlogout"
            className={({ isActive, isPending }) => { }
            }
          >
            Login
          </NavLink>
        </div>

        <div className='navlink'>

          <NavLink
            to="/about"
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
