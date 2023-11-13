import React, { useContext, useEffect, useState } from 'react'
import { AuthenticationContext } from './context/AuthenticationContext'
import { useNavigate } from 'react-router';



const LogoutFeature = () => {
    const { user, login, logout } = useContext(AuthenticationContext);
    const { favorites, changeFavorites } = useContext(AuthenticationContext)
    const { updateFavoritesChangeTime } = useContext(AuthenticationContext)


    const navigate = useNavigate();
    const authenticationContext=useContext(AuthenticationContext)
    console.log("authenticationContext :>> ", authenticationContext);
    const removeCountry=(e)=>{
        console.log(e.target)
        const item = e.target.value

        const newFaves = favorites.filter((favourite)=>{
            console.log('favourite', favourite,' item',item)
            return favourite !=item;
        })
        console.log('newFaves', newFaves)
        changeFavorites(newFaves)
        updateFavoritesChangeTime()
    }

    console.log(favorites)
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
    
  return (
    <>
    <div>Here is the current state: {String(authenticationContext.user)} </div>
    <button onClick={()=>{console.log("CLICKED");
    changeStatus()}
}>Log Out</button>
{favorites.map((element, index)=>{
    return(<button value={element} key={index} onClick={(removeCountry)}>{element}</button>)
})}

    </>
  )
}

export default LogoutFeature