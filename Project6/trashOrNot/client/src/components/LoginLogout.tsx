import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { Navbar } from './Navbar';

type UserImageType = {
    userImage: string;
};

interface User extends UserImageType {
    username: string;
    email: string;
    password: string;
}

export const LoginLogout = () => {

    const [existingUser, setExistingUser] = useState<User | null>(null);
    const [warnings, setWarnings] = useState<string[] | []>([])
    const [success, setSuccess] = useState<string | null>(null)



    const handleLoginInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        console.log("e.target.name :>> ", e.target.name);
        console.log("e.target.value :>> ", e.target.value);


        setExistingUser({ ...existingUser!, [e.target.name]: e.target.value });
    };
    const login = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        const urlencoded = new URLSearchParams();

        if (existingUser?.email && existingUser?.password) {
            urlencoded.append("email", existingUser.email);
            urlencoded.append("password", existingUser.password);
        }


        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
        };

        try {
            const response = await fetch("http://localhost:3000/users/login", requestOptions)
            if (response.ok) {
                const result = await response.json()
                console.log(result)
                if (result.token){
                    localStorage.setItem("token",result.token)
                }
            }
            if (!response.ok){
                const result = await response.json()
                console.log(result)
            }
        } catch (error) {
            console.log(error)

        }
    }
    const getToken=()=>{
        const localtoken=localStorage.getItem("token")
        return localtoken
    }

    const isUserLoggedIn=()=>{
        const token = getToken()

        return token? true: false

    }
    const userLogout=()=>{
        localStorage.removeItem("token")
    }
 

    useEffect(()=>{
        const userIn = isUserLoggedIn()
        if (userIn){
            console.log("logged in")
        }
        else{
            console.log("token not found")
        }
        
    }, [])

    return (
        <div>
            <div className="input-container-login">
                <form onSubmit={login} action="" className="input-container">

                    <label htmlFor="email">Mailadress</label>
                    <input
                        type="text"
                        name="email"
                        id="email"
                        onChange={handleLoginInputChange}
                    />
                    <label htmlFor="password">Password</label>
                    <input
                        type="text"
                        name="password"
                        id="password"
                        onChange={handleLoginInputChange}
                    />
                    <button>Login</button>
                </form>
                <button onClick={userLogout}>Logout</button>

                {success && <div className='success'>{success}</div>}
                {warnings && warnings.map((element, index) => {
                    console.log(element)
                    return (
                        <div className="warnings" key={index}>
                            {element}
                        </div>)
                }
                )
                }
            </div>
        </div>
    )
}
