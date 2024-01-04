import React, { useContext, useState } from 'react'
import { AuthenticationContext } from '../context/AuthenticationContext';
import checkedin from '../utils/checkedin';
import { TopSection } from '../components/topSection';

export const Profile = () => {

  const { userChecked, setUserChecked } = useContext(AuthenticationContext)


const userLogout = () => {
    localStorage.removeItem("token")
    setUserChecked({"name":"", "id":"","foundTrashPlaces":null,"cleanedTrashPlaces":null})
}

  console.log(userChecked)
  return <>
      <div>
        <TopSection></TopSection>
        <div>This is the profile page of {userChecked["name"]}</div>
        
       {userChecked["foundTrashPlaces"]!=null&&
       <div> You have reported {userChecked.foundTrashPlaces.length}
        trash places
       </div>
}
{userChecked["cleanedTrashPlaces"]!=null&&
       <div> And you have reported {userChecked.cleanedTrashPlaces.length}
        trash places
       </div>
}

        <button onClick={userLogout}>Logout</button>
      </div>
    </>;
}
