import React, { useContext, useEffect, useState } from 'react'
import { AuthenticationContext } from './context/AuthenticationContext'
import { useNavigate } from 'react-router';



const LoginFeature = () => {
    const { user, signin, logout } = useContext(AuthenticationContext);
    const navigate = useNavigate();
    const authenticationContext=useContext(AuthenticationContext)
    console.log("authenticationContext :>> ", authenticationContext);
    const userstate=authenticationContext.user

    const validatePassword = (password: string, repeatPassword: string) => {
        return password === repeatPassword;
      };
    

    const changeStatus=()=>{
        console.log("status checked: ",user)

        if(user==null){
            authenticationContext.signin()
        }
        if(user!=null){
            authenticationContext.logout()
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