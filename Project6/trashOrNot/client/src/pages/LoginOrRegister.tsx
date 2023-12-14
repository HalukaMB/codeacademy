import React, { useState } from 'react'
import { LoginLogout } from '../components/LoginLogout'
import { Register } from '../components/Register'
import { TopSection } from '../components/topSection'
import checkedin from '../utils/checkedin'

export const LoginOrRegister = () => {

    const [registerOrLogin, setRegisterOrLogin] = useState<string>("register")
    checkedin()

    const clickToggle = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const clickedOnElement = (event.target as HTMLInputElement)
        setRegisterOrLogin(clickedOnElement.innerHTML.toLowerCase())

    }

    return (
        <>  <TopSection></TopSection>

            <div className="loginRegisterSection">
                <div className="toggleSection">
                    <button onClick={clickToggle}>Register</button>
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

        </>
    )
}
