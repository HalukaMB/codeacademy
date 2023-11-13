import React, { useContext, useEffect, useState } from 'react'
import { AuthenticationContext } from './context/AuthenticationContext'
import { useNavigate } from 'react-router';



const LogoutFeature = () => {
    const { user, login, logout } = useContext(AuthenticationContext);
    const { favorites, changeFavorites } = useContext(AuthenticationContext)
    const { updateFavoritesChangeTime } = useContext(AuthenticationContext)


    const navigate = useNavigate();
    const authenticationContext=useContext(AuthenticationContext)
    const removeCountry=(e)=>{
        const item = e.target.value

        const newFaves = favorites.filter((favourite)=>{
            return favourite !=item;
        })
        changeFavorites(newFaves)
        updateFavoritesChangeTime()
    }

    const changeStatus=()=>{
        if(user==null){
            authenticationContext.signin()

        }
        if(user!=null){
            authenticationContext.logout()
            console.log("logging out")
        }
    }
    
  return (
    <>
    <div>Here is the current state: {String(authenticationContext.user)} </div>
    <button onClick={()=>{
    changeStatus()}
}>Log Out</button>
{favorites.map((element, index)=>{
    return(<button value={element} key={index} onClick={(removeCountry)}>{element}</button>)
})}

    </>
  )
}

export default LogoutFeature