import React, { useState } from 'react'
import { LoginLogout } from './components/LoginLogout'
import { Register } from './components/Register'
import { Navbar } from './components/Navbar'
import { TopSection } from './components/topSection'

export const LoginOrRegister = () => {

    const [registerOrLogin, setRegisterOrLogin]=useState<string>("register")

    const clickToggle = (event:React.MouseEvent<HTMLButtonElement, MouseEvent> )=>{
        const clickedOnElement=(event.target as HTMLInputElement)
        setRegisterOrLogin(clickedOnElement.value)
        
    }

    return (
        <>  <TopSection></TopSection>
           
            <div className="loginSection">
            <div className="toggleSection">
                <button value="register" onClick={clickToggle}>Register</button>
                <button value="login" onClick={clickToggle}>Login</button>
            </div>
            {(registerOrLogin=="register")?
                <div className="toggleRegisterLogin">
                    <Register></Register>
                </div>:
                <div className="toggleRegisterLogin">
                    <LoginLogout></LoginLogout>
                </div>}
            </div>

        </>
    )
}
