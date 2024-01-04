import React, { useContext, useState } from 'react'
import { AuthenticationContext } from '../context/AuthenticationContext';
import checkedin from '../utils/checkedin';
import { TopSection } from '../components/topSection';

export const Profile = () => {

  const { userChecked, setUserChecked } = useContext(AuthenticationContext)


const userLogout = () => {
    localStorage.removeItem("token")
    setUserChecked({"name":""})
}

  console.log(userChecked)
  return <>
      <div>
        <TopSection></TopSection>

        <div>This is the profile page of {userChecked["name"]}</div>
        <button onClick={userLogout}>Logout</button>
      </div>
    </>;
}
