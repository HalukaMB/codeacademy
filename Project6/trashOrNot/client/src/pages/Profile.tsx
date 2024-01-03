import React, { useContext, useState } from 'react'
import { AuthenticationContext } from '../context/AuthenticationContext';
import checkedin from '../utils/checkedin';
import { TopSection } from '../components/topSection';

export const Profile = () => {

  const { userChecked, setUserChecked } = useContext(AuthenticationContext)


  const getToken = () => {
    const localtoken = localStorage.getItem("token")
    return localtoken
}

const isUserLoggedIn = () => {
    const token = getToken()
    return token ? true : false
}
const userLogout = () => {
    localStorage.removeItem("token")
    setUserChecked(false)
}

checkedin()
  console.log(userChecked)
  return <>
      <div>
        <TopSection></TopSection>

        <div>This is the profile page</div>
        <button onClick={userLogout}>Logout</button>
      </div>
    </>;
}
