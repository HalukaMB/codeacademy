import React, { useContext } from 'react'
import { AuthenticationContext } from './context/AuthenticationContext'



const LoginFeature = () => {
    const authenticationContext=useContext(AuthenticationContext)
    console.log("authenticationContext :>> ", authenticationContext);
    const userstate=authenticationContext.user
    const changeStatus=()=>{
        console.log("status checked: ",authenticationContext.user)

        if(authenticationContext.user==false){
            authenticationContext.login()
        }
        if(authenticationContext.user==true){
            authenticationContext.logout()
        }
    }
    
    console.log(authenticationContext.user)
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