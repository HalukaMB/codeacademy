import React, { useContext, useEffect, useState } from 'react'
import { LoginLogout } from '../components/LoginLogout'
import { Register } from '../components/Register'
import { TopSection } from '../components/TopSection'
import checkedin from '../hooks/checkedin'
import { AuthenticationContext } from '../context/AuthenticationContext'

export const LoginOrRegister = ({ children }: any) => {

    const [registerOrLogin, setRegisterOrLogin] = useState<string>("register")
    checkedin()
    const { userChecked } = useContext(AuthenticationContext);

    const clickToggle = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const clickedOnElement = (event.target as HTMLInputElement)
        setRegisterOrLogin(clickedOnElement.innerHTML.toLowerCase())

    }
    useEffect(() => {
        const registerbutton=document.getElementById("registerbutton")
        console.log(registerbutton)
        registerbutton?.focus()
    
      return () => {
        
      }
    }, [])
    return <>
        {(userChecked["name"] != "") ? children :

            <div>  <TopSection></TopSection>

                <div className="loginRegisterSection">
                    <div className="toggleSection">
                        <button id="registerbutton" onClick={clickToggle}>Register</button>
                        <button onClick={clickToggle}>Login</button>
                    </div>
                    <div className="loginRegisterSectionLow">
                        {(registerOrLogin == "register") ?
                            <div className="toggleRegisterLogin">
                                <Register></Register>
                            </div> :
                            <div className="toggleRegisterLogin">
                                <LoginLogout></LoginLogout>
                            </div>}
                    </div>
                </div>

            </div>
        }</>
}
