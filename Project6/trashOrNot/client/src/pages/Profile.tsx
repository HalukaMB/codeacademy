import React, { useContext, useEffect, useState } from 'react'
import { AuthenticationContext } from '../context/AuthenticationContext';
import checkedin from '../hooks/checkedin';
import { TopSection } from '../components/topSection';

export const Profile = () => {

  const { userChecked, setUserChecked } = useContext(AuthenticationContext)

  const userLogout = () => {
    localStorage.removeItem("token")
    setUserChecked({ "name": "", "id": "", "foundTrashPlaces": null, "cleanedTrashPlaces": null })
  }


  const onLoad = async () => {


    const localtoken = await localStorage.getItem("token")
    if (localtoken) {
      console.log("token found")
      const jwtinfo = (JSON.parse(atob(localtoken.split(".")[1])))
      console.log(userChecked)

      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
      const idOfUser = jwtinfo["sub"]
      console.log(idOfUser)

      const baseUrl = (import.meta.env.VITE_BASE_URL_API)
      const profileInfoUrl = baseUrl + "users/profile?q=" + idOfUser

      const requestOptions = {
        method: "GET",
        headers: myHeaders,
      };
      console.log(profileInfoUrl)

      console.log(requestOptions)
      fetch(profileInfoUrl, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          console.log(result)
          const userobject = result["user"]

          setUserChecked({ ...userChecked, "name": userobject["username"], "foundTrashPlaces": userobject["reportedby"], "cleanedTrashPlaces": userobject["cleanedby"] })
        })
    }
  }
  useEffect(() => {
    onLoad()
  }, [])


  return <>
    <div>
      <TopSection></TopSection>
      <div className="profileTop">This is the profile page of: <div className="userName">{userChecked["name"]}</div> </div>

      {userChecked["foundTrashPlaces"] != null &&
        <div className="trashPlacesStats"> You have reported <span className="highlightStats">{userChecked.foundTrashPlaces.length} {(userChecked.foundTrashPlaces.length!=1)?"places":"place"}</span> with trash
        </div>
      }
      {userChecked["cleanedTrashPlaces"] != null &&
        <div className="cleanPlacesStats"> And you have cleaned up <span className="highlightStats"> {userChecked.cleanedTrashPlaces.length} {(userChecked.cleanedTrashPlaces.length!=1)?"cleaned places":"place"}</span>
        </div>
      }

      <button onClick={userLogout}>Logout</button>
    </div>
  </>;
}
