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
  to="/loginlogout"
  className={({ isActive, isPending }) => { }
  }
>
Login
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
          <div className="headerelements">
            <input type="checkbox" id="trigger" />
            <label htmlFor="trigger" className="hamburger-logo">
                    <span></span>
                    <span></span>
                    <span></span>
                </label>

                <nav>
                    <ul>
                        <li><a href="index.html">Lost</a></li>
                        <li><a href="found.html">Found</a></li>
                        <li><a href="connected.html">Connected</a></li>
                        <li><a href="about.html">About</a></li>
                    </ul>
                </nav>
        </div>

    </div>
  )
}
