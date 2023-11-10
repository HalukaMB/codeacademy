import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { AuthenticationContext } from './context/AuthenticationContext';

const Navbar = props => {
  const { user, signup, login } = useContext(AuthenticationContext);

  return (
    <div className="navBar">
        <div className="menuBlocks">
        {!user? <NavLink
            to="/login"
            className={({ isActive, isPending }) => { console.log(isActive) }
            }
          >
            Login
          </NavLink>:
           <NavLink
           to="/logout"
           className={({ isActive, isPending }) => { console.log(isActive) }
           }
         >
           Log Out
         </NavLink>}
         
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