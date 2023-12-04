import React, { useState } from 'react'
import { LoginLogout } from './components/LoginLogout'
import { Register } from './components/Register'
import { TopSection } from './components/topSection'

export const LoginOrRegister = () => {

    const [registerOrLogin, setRegisterOrLogin] = useState<string>("register")

    const clickToggle = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const clickedOnElement = (event.target as HTMLInputElement)
        setRegisterOrLogin(clickedOnElement.innerHTML.toLowerCase())

    }

    return (
        <>  <TopSection></TopSection>

            <div className="loginSection">
                <div className="toggleSection">
                    <div onClick={clickToggle}>Register</div>
                    <div onClick={clickToggle}>Login</div>
                </div>
                {(registerOrLogin == "register") ?
                    <div className="toggleRegisterLogin">
                        <Register></Register>
                    </div> :
                    <div className="toggleRegisterLogin">
                        <LoginLogout></LoginLogout>
                    </div>}
            </div>

        </>
    )
}
