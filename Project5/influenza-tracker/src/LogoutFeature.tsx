import React, { useContext } from 'react'
import { AuthenticationContext } from './context/AuthenticationContext'



const LogoutFeature = () => {
    const { user } = useContext(AuthenticationContext);
    const { favorites, changeFavorites } = useContext(AuthenticationContext)
    const { updateFavoritesChangeTime } = useContext(AuthenticationContext)


    const authenticationContext=useContext(AuthenticationContext)
    const removeCountry=(e:any)=>{
        const item = e.target.value

        const newFaves = favorites.filter((favourite)=>{
            return favourite !=item;
        })
        changeFavorites(newFaves)
        updateFavoritesChangeTime()
    
    }

    const changeStatus=()=>{

        if(user!=null){
            authenticationContext.logout()
            console.log("logging out")
        }
    }
    
  return (
    <>
    <div className="explainerBlock">Here is your list of favorite countries:</div>
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