import React from 'react'
import { LoginLogout } from './components/LoginLogout'
import { Register } from './components/Register'
import { Navbar } from './components/Navbar'
import { TopSection } from './components/topSection'

export const LoginOrRegister = () => {

    const clickToggle = (event)=>{
        console.log(event)
        
    }

    return (
        <>  <TopSection></TopSection>
            <div>
                <div className="toggleRegisterLogin">
                    <Register></Register>
                </div>
                <div className="toggleRegisterLogin">

                    <LoginLogout></LoginLogout>
                </div>
            </div>

        </>
    )
}
