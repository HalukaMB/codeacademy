import React, { useContext, useState } from 'react'
import { AuthenticationContext } from '../context/AuthenticationContext';
import checkedin from '../utils/checkedin';
import { TopSection } from '../components/topSection';

export const Profile = () => {

  const { userChecked, setUserChecked } = useContext(AuthenticationContext)

  const userLogout = () => {
    localStorage.removeItem("token")
    setUserChecked({ "name": "", "id": "", "foundTrashPlaces": null, "cleanedTrashPlaces": null })
  }




  checkedin()

  console.log(userChecked)


  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
  const idOfUser = userChecked["id"]

  const baseUrl = (import.meta.env.VITE_BASE_URL_API)
  const profileInfoUrl = baseUrl + "users/profile?q="+idOfUser

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
  };

  fetch(profileInfoUrl, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      console.log(result)
      const userobject=result["user"]

      setUserChecked({...userChecked,"name":userobject["username"],"foundTrashPlaces":userobject["reportedby"],"cleanedTrashPlaces":userobject["cleanedby"]})
    })

  return <>
    <div>
      <TopSection></TopSection>
      <div>This is the profile page of {userChecked["name"]}</div>

      {userChecked["foundTrashPlaces"] != null &&
        <div> You have reported {userChecked.foundTrashPlaces.length} trash places
        </div>
      }
      {userChecked["cleanedTrashPlaces"] != null &&
        <div> And you have cleaned up {userChecked.cleanedTrashPlaces.length} places
        </div>
      }

      <button onClick={userLogout}>Logout</button>
    </div>
  </>;
}
