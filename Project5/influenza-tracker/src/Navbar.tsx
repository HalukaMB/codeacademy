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
            className={({ isActive, isPending }) => { }
            }
          >
            Login
          </NavLink>:
           <NavLink
           to="/logout"
           className={({ isActive, isPending }) => {  }
           }
         >
           Log Out
         </NavLink>}
         
        </div>

        <div className="menuBlocks">
          <NavLink
            to="/"
            className={({ isActive, isPending }) => { }
            }
          >
            Influenza Tracker
          </NavLink>
        </div>
        <div className="menuBlocks">
          <NavLink
            to="/About"
            className={({ isActive, isPending }) => {  }
            }
          >
            About
          </NavLink>
        </div>
      </div>
  )
}

export default Navbar