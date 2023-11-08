import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = props => {
  return (
    <div className="navBar">
        <div className="menuBlocks">
          <NavLink
            to="/login"
            className={({ isActive, isPending }) => { console.log(isActive) }
            }
          >
            Signup/Login
          </NavLink>
        </div>
        <div className="menuBlocks">
          <NavLink
            to="/"
            className={({ isActive, isPending }) => { console.log(isActive) }
            }
          >
            Home
          </NavLink>
        </div>
        <div className="menuBlocks">
          <NavLink
            to="/About"
            className={({ isActive, isPending }) => { console.log("are we on about?", isActive) }
            }
          >
            About
          </NavLink>
        </div>
      </div>
  )
}

export default Navbar