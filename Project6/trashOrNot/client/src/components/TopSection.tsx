import React, { useContext } from 'react'
import { Navbar } from './Navbar'
import { AuthenticationContext } from '../context/AuthenticationContext'

import loginsvg from '../assets/login-svgrepo-com.svg';
import logoutsvg from '../assets/logout-svgrepo-com.svg';
import { Link } from 'react-router-dom';

export const TopSection = () => {
  const { userChecked, loginOrLogout } = useContext(AuthenticationContext)
  return (
    <div>
      <div className="topSection">
        <div className="leftTop"><Navbar></Navbar></div>
        <div className="centerTop">Clean Berlin</div>
        <div className="loginLogoutIcon"><Link to="/loginlogout">{userChecked?<img className="svglogout" src={logoutsvg}></img>:<img className="svglogin" src={loginsvg}></img>}</Link></div>
      </div>
    </div>
  )
}
