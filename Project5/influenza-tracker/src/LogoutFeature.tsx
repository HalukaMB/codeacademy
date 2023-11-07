import React, { useContext, useEffect, useState } from 'react'
import { AuthenticationContext } from './context/AuthenticationContext'
import { useNavigate } from 'react-router';



const LoginFeature = () => {
    const { user, login, logout } = useContext(AuthenticationContext);
    const navigate = useNavigate();
    const authenticationContext=useContext(AuthenticationContext)
    console.log("authenticationContext :>> ", authenticationContext);
    const userstate=authenticationContext.user



    const changeStatus=()=>{
        console.log("status checked: ",user)

        if(user==null){
            authenticationContext.signin()
        }
        if(user!=null){
            authenticationContext.logout()
            navigate("/signup");
        }
    }
    
    console.log(user)
  return (
    <>
    <div>Here is the current state: {String(authenticationContext.user)} </div>
    <button onClick={()=>{console.log("CLICKED");
    changeStatus()}
}>Change Status</button>

    </>
  )
}

export default LoginFeature